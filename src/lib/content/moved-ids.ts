import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { readRetiredIds } from './retired-ids'
import { ID_PATTERN } from './schema'

/**
 * 옮긴 게시물 id 목록(`content/moved-ids.txt`) — 옛 주소를 새 주소로 넘기는 영구 리다이렉트(308)의 원본(프로그래머 16, C11).
 *
 * 사양: `planning/q1-redirect-q2-sns-image-plan.md` §1.3~§1.5.
 * - `retired-ids.txt` = 그 id를 다른 게시물에 다시 쓰지 못하게 막는다. `moved-ids.txt` = 그 옛 주소를 어디로 보낼지 정한다.
 *   옮긴 옛 id는 **두 파일 모두**에 적는다(검증 d).
 * - `next.config.ts`(리다이렉트 규칙)·`scripts/validate-content.ts`·로더(`load.ts`)가 **이 파일의 같은 함수**를 쓴다.
 *   한쪽에만 규칙이 있으면 `npx next build`를 직접 쳤을 때 잘못된 이동 규칙이 그대로 배포된다(`retired-ids.ts`와 같은 이유).
 * - `next.config.ts`가 이 파일을 부르므로 무거운 의존성(마크다운 처리 등)을 import하지 않는다.
 *
 * 함수는 모두 저장소 루트(`root`, 기본 `process.cwd()`)를 받는다 — 시험 픽스처 폴더를 넘기기 위해서다.
 */

export interface MovedIdEntry {
  /** 옛 id */
  from: string
  /** 새 id */
  to: string
  /** `moved-ids.txt`의 줄 번호(1부터) */
  line: number
}

export interface MovedIdsParseResult {
  entries: MovedIdEntry[]
  /** 파일만 보고 알 수 있는 위반(a·b·c·g) */
  errors: string[]
}

export interface RedirectRule {
  source: string
  destination: string
  permanent: true
}

function movedIdsFile(root: string): string {
  return path.join(root, 'content', 'moved-ids.txt')
}

const at = (line: number) => `content/moved-ids.txt ${line}행`

/**
 * 파일 글자를 줄 목록으로 읽는다. `#` 뒤는 주석, 빈 줄은 건너뛴다.
 * 이 단계에서 막는 것: (a) 한 줄이 `옛id 새id` 두 토큰이 아님 · (b) id 형식 위반 · (c) 옛 id = 새 id ·
 * (g) 옛 id 중복, 또는 새 id가 다른 줄의 옛 id(이동 사슬·순환 금지 — 최종 id로 직접 적는다).
 */
export function parseMovedIds(text: string): MovedIdsParseResult {
  const entries: MovedIdEntry[] = []
  const errors: string[] = []
  text.split('\n').forEach((rawLine, index) => {
    const line = index + 1
    const body = rawLine.replace(/#.*$/, '').trim()
    if (body.length === 0) return
    const tokens = body.split(/\s+/)
    if (tokens.length !== 2) {
      errors.push(`${at(line)}: 한 줄에 \`옛id 새id\` 두 개를 공백으로 나눠 적어야 합니다(받은 토큰 ${tokens.length}개). [a]`)
      return
    }
    const [from, to] = tokens as [string, string]
    let bad = false
    for (const [label, id] of [['옛 id', from], ['새 id', to]] as const) {
      if (!ID_PATTERN.test(id)) {
        errors.push(`${at(line)}: ${label} \`${id}\`가 id 형식(소문자 영숫자·하이픈)이 아닙니다. [b]`)
        bad = true
      }
    }
    if (bad) return
    if (from === to) {
      errors.push(`${at(line)}: 옛 id와 새 id가 같습니다(\`${from}\`). 자기 자신으로 보내면 무한 이동이 됩니다. [c]`)
      return
    }
    entries.push({ from, to, line })
  })

  const firstLineOf = new Map<string, number>()
  for (const entry of entries) {
    const first = firstLineOf.get(entry.from)
    if (first !== undefined) {
      errors.push(`${at(entry.line)}: 옛 id \`${entry.from}\`가 ${first}행에도 있습니다. 옛 id 하나는 한 곳으로만 보냅니다. [g]`)
    } else {
      firstLineOf.set(entry.from, entry.line)
    }
  }
  for (const entry of entries) {
    const chained = firstLineOf.get(entry.to)
    if (chained !== undefined) {
      errors.push(
        `${at(entry.line)}: 새 id \`${entry.to}\`가 ${chained}행의 옛 id입니다. 이동 사슬·순환은 쓰지 않습니다 — 최종 id로 바로 적으세요. [g]`,
      )
    }
  }
  return { entries, errors }
}

export function readMovedIdsText(root: string = process.cwd()): string {
  const file = movedIdsFile(root)
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
}

/**
 * 옛 id → 새 id. 파일 형식 위반(a·b·c·g)이 하나라도 있으면 던진다 — `next.config.ts`에서 부르면 빌드가 시작되지 않는다.
 * 파일이 없거나 주석뿐이면 빈 맵(리다이렉트 0개)이다.
 */
export function readMovedIds(root: string = process.cwd()): Map<string, string> {
  const { entries, errors } = parseMovedIds(readMovedIdsText(root))
  if (errors.length > 0) throw new Error(`content/moved-ids.txt 검증 실패\n  - ${errors.join('\n  - ')}`)
  return new Map(entries.map((entry) => [entry.from, entry.to]))
}

/**
 * 영어본 id 집합 — `content/posts-en/*.md`의 frontmatter `id`(로더 `getAllTranslations()`가 영어본을 원본에 맞추는 기준과 같다).
 * 파일명이 아니라 `id`로 본다(리뷰 34 P3-6). 영어본 검증 자체는 로더·검증 스크립트가 하고, 여기는 리다이렉트 목적지만 정한다.
 * 검증 스크립트·로더는 검증을 통과한 번역 맵과 이 집합이 옮긴 새 id에 대해 같은지 한 번 더 확인한다(`translationMismatchErrors`).
 * - 옮긴 id가 0건(`moved.size === 0`)이면 영어본을 읽지 않고 빈 집합을 돌려준다 — 쓸 곳이 없다(리뷰 36 P3-1).
 *   `moved`를 넘기지 않으면 `readMovedIds(root)`로 읽는다(형식 위반이면 그쪽에서 던진다). 이미 읽은 맵이 있으면 넘겨서 두 번 읽지 않는다.
 * - frontmatter YAML 오류는 파일 이름을 붙여 다시 던진다. `next.config.ts`에서 불리면 검증 스크립트를 거치지 않은 직접 빌드도
 *   어느 파일이 깨졌는지 알려 주고 멈춘다(리뷰 36 P3-1).
 */
export function readTranslationIds(
  root: string = process.cwd(),
  moved: ReadonlyMap<string, string> = readMovedIds(root),
): Set<string> {
  const ids = new Set<string>()
  if (moved.size === 0) return ids
  const dir = path.join(root, 'content', 'posts-en')
  if (!fs.existsSync(dir)) return ids
  for (const name of fs.readdirSync(dir).filter((file) => file.endsWith('.md'))) {
    let data: { id?: unknown }
    try {
      // 옵션 객체를 넘긴다: gray-matter는 옵션이 없으면 파싱 **전에** 입력 글자를 캐시에 넣어, 같은 프로세스에서 같은 깨진 글자를
      // 두 번째로 읽으면 오류 없이 빈 data를 돌려준다(검증 스크립트·로더가 먼저 읽은 뒤일 수 있다). 옵션이 있으면 캐시를 쓰지 않는다.
      data = matter(fs.readFileSync(path.join(dir, name), 'utf8'), {}).data as { id?: unknown }
    } catch (error) {
      throw new Error(
        `content/posts-en/${name}: frontmatter를 읽지 못했습니다(옮긴 id 리다이렉트의 영어 분기 확인 중) — ${error instanceof Error ? error.message : String(error)}`,
        { cause: error },
      )
    }
    if (typeof data.id === 'string' && data.id.trim()) ids.add(data.id.trim())
  }
  return ids
}

/**
 * 리다이렉트 규칙. 옮긴 건 하나에 2개(ko·en). 와일드카드를 쓰지 않는다 — 목록에 없는 주소를 잡지 않게.
 * 영어 주소는 새 id의 영어본이 있으면 `/en/post/새`, 없으면 한국어 `/post/새`로 보낸다(없는 영어 주소로 보내면 404).
 * 상태 코드는 308(`permanent: true`) — 슈퍼바이저 판단(프로그래머 16 오더).
 */
export function movedIdRedirects(moved: Map<string, string>, translationIds: Set<string>): RedirectRule[] {
  const rules: RedirectRule[] = []
  for (const [from, to] of moved) {
    rules.push({ source: `/post/${from}`, destination: `/post/${to}`, permanent: true })
    rules.push({
      source: `/en/post/${from}`,
      destination: translationIds.has(to) ? `/en/post/${to}` : `/post/${to}`,
      permanent: true,
    })
  }
  return rules
}

export interface MovedIdsContext {
  /** `retired-ids.txt`의 id */
  retired: Set<string>
  /** `content/posts`의 게시물 id — frontmatter `id`만(실제 주소 `/post/<id>`를 정하는 값). 검증 e·f */
  koIds: Set<string>
  /** `content/posts`의 파일명(확장자 뺀 것). 검증 e에만 쓴다 — f는 파일명을 인정하지 않는다(리뷰 36 P2-1) */
  koFileNames: Set<string>
  /** `content/posts-en`의 id(frontmatter `id`만). 검증 e */
  enIds: Set<string>
  /** `content/posts-en`의 파일명(확장자 뺀 것). 검증 e */
  enFileNames: Set<string>
  /** 링크 검사 대상 글자(ko·en 게시물 파일 전체 — frontmatter 포함). 이름은 메시지용 */
  files: { name: string; text: string }[]
  /** `public/images/<id>/` 폴더가 있는가 */
  imageDirExists: (id: string) => boolean
}

/**
 * 게시물·폐기 목록과 대조하는 검증(d·e·f·h + 옛 이미지 폴더).
 * - d 옛 id가 `retired-ids.txt`에 있다 · e 옛 id를 쓰는 게시물(ko·en, id 또는 파일명)이 없다
 * - f 새 id 게시물이 `content/posts`에 있고 `retired-ids.txt`에 없다. "있다"는 **frontmatter `id`** 로만 본다 —
 *   파일명이 새 id여도 frontmatter `id`가 다르면 실제 주소는 `/post/<frontmatter id>`라 리다이렉트가 404로 간다(리뷰 36 P2-1)
 * - h 게시물 파일(ko·en, frontmatter 포함)의 `/post/<옛>`·`/en/post/<옛>` 링크 0(절대 주소도 잡는다 — 호스트는 가리지 않는다)
 * - i 옛 id 이미지 폴더 `public/images/<옛>/`가 없고, 게시물 파일에 `/images/<옛>/` 참조가 없다
 */
export function checkMovedIds(entries: MovedIdEntry[], ctx: MovedIdsContext): string[] {
  const errors: string[] = []
  for (const { from, to, line } of entries) {
    if (!ctx.retired.has(from)) {
      errors.push(`${at(line)}: 옛 id \`${from}\`가 content/retired-ids.txt에 없습니다. 옮긴 옛 id는 재사용을 막기 위해 두 파일 모두에 적습니다. [d]`)
    }
    if (ctx.koIds.has(from) || ctx.koFileNames.has(from) || ctx.enIds.has(from) || ctx.enFileNames.has(from)) {
      errors.push(`${at(line)}: 옛 id \`${from}\`를 쓰는 게시물이 아직 있습니다. 살아 있는 글이 리다이렉트에 가려집니다. [e]`)
    }
    if (!ctx.koIds.has(to)) {
      const byName = ctx.koFileNames.has(to) ? ` 파일 content/posts/${to}.md는 있지만 frontmatter id가 \`${to}\`가 아닙니다 — 주소는 frontmatter id로 정해집니다.` : ''
      errors.push(`${at(line)}: 새 id \`${to}\`(frontmatter id) 게시물이 content/posts에 없습니다. 없는 주소로 보내게 됩니다.${byName} [f]`)
    }
    if (ctx.retired.has(to)) {
      errors.push(`${at(line)}: 새 id \`${to}\`가 content/retired-ids.txt에 있습니다. 폐기한 id로 보낼 수 없습니다. [f]`)
    }
    // `/post/<옛>`이 들어 있으면 상대(`/post/…`·`/en/post/…`)·절대(`https://…/post/…`) 주소를 모두 잡는다. 뒤는 id 경계(다른 id의 앞부분은 잡지 않는다).
    // id는 ID_PATTERN(소문자 영숫자·하이픈)을 통과한 값만 오므로 정규식 특수 문자가 없다.
    const link = new RegExp(`/post/${from}(?![A-Za-z0-9_-])`)
    const imageRef = new RegExp(`/images/${from}/`)
    for (const file of ctx.files) {
      if (link.test(file.text)) {
        errors.push(`${file.name}: 옮긴 옛 id \`${from}\`로 가는 링크가 있습니다. 새 id \`${to}\`로 고치세요(리다이렉트에 기대지 않는다). [h]`)
      }
      if (imageRef.test(file.text)) {
        errors.push(`${file.name}: 옮긴 옛 id의 이미지 경로 \`/images/${from}/\`를 참조합니다. 새 id 폴더로 옮기거나 지우세요. [i]`)
      }
    }
    if (ctx.imageDirExists(from)) {
      errors.push(`public/images/${from}/ 폴더가 남아 있습니다. 옮긴 옛 id의 이미지 폴더는 새 id로 옮기거나 지웁니다. [i]`)
    }
  }
  return errors
}

/** 폴더의 frontmatter `id` 집합과 파일명 집합을 **따로** 돌려준다(e는 둘 다, f는 id만 본다 — 리뷰 36 P2-1). */
function idsAndFiles(
  dir: string,
  prefix: string,
): { ids: Set<string>; fileNames: Set<string>; files: { name: string; text: string }[] } {
  const ids = new Set<string>()
  const fileNames = new Set<string>()
  const files: { name: string; text: string }[] = []
  if (!fs.existsSync(dir)) return { ids, fileNames, files }
  for (const name of fs.readdirSync(dir).filter((file) => file.endsWith('.md')).sort()) {
    const text = fs.readFileSync(path.join(dir, name), 'utf8')
    fileNames.add(name.replace(/\.md$/, ''))
    try {
      const data = matter(text).data as { id?: unknown }
      if (typeof data.id === 'string' && data.id.trim()) ids.add(data.id.trim())
    } catch {
      // frontmatter 파싱 오류는 게시물 검증이 따로 막는다(그 파일은 id 집합에 들어가지 않는다 — f는 보수적으로 실패한다).
    }
    files.push({ name: `${prefix}/${name}`, text })
  }
  return { ids, fileNames, files }
}

/** 디스크에서 읽어 검증 a~h(+ 옛 이미지 폴더) 전부를 돌린다. 검증 스크립트와 로더가 이 함수를 같이 쓴다. */
export function collectMovedIdErrors(root: string = process.cwd()): string[] {
  const { entries, errors } = parseMovedIds(readMovedIdsText(root))
  if (entries.length === 0) return errors
  const ko = idsAndFiles(path.join(root, 'content', 'posts'), 'content/posts')
  const en = idsAndFiles(path.join(root, 'content', 'posts-en'), 'content/posts-en')
  return [
    ...errors,
    ...checkMovedIds(entries, {
      retired: readRetiredIds(root),
      koIds: ko.ids,
      koFileNames: ko.fileNames,
      enIds: en.ids,
      enFileNames: en.fileNames,
      files: [...ko.files, ...en.files],
      imageDirExists: (id) => fs.existsSync(path.join(root, 'public', 'images', id)),
    }),
  ]
}

/**
 * 리다이렉트의 영어 분기 기준(`readTranslationIds`, frontmatter id)과 검증을 통과한 번역 맵이 옮긴 새 id에 대해 같은지.
 * 다르면 `/en/post/<옛>`이 404 영어 주소로 가거나 영어본을 두고 한국어로 가게 된다.
 */
export function translationMismatchErrors(moved: Map<string, string>, translationIds: Set<string>, validated: Set<string>): string[] {
  const errors: string[] = []
  for (const to of new Set(moved.values())) {
    if (translationIds.has(to) !== validated.has(to)) {
      errors.push(
        `content/moved-ids.txt: 새 id \`${to}\`의 영어본 판단이 리다이렉트(frontmatter id ${translationIds.has(to) ? '있음' : '없음'})와 번역 맵(${validated.has(to) ? '있음' : '없음'})에서 다릅니다.`,
      )
    }
  }
  return errors
}
