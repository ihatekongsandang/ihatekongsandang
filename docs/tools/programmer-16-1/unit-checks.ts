/**
 * 프로그래머 16-1 — C11 `src/lib/content/moved-ids.ts` 단위 시험. 프로그래머 16의 46건을 그대로 두고(맥락 필드만 새 구조로)
 * 리뷰 36 P2-1(f는 frontmatter id만)·P3-1(0건이면 영어본 안 읽음·YAML 오류에 파일 이름) 사례를 더했다.
 * 사용(저장소 루트): npx tsx docs/tools/programmer-16-1/unit-checks.ts
 * 디스크 시험은 저장소 밖 임시 폴더에 작은 content 트리를 만들어 쓴다(저장소 content는 읽지 않는다 — 마지막 "실제 저장소" 항목만 읽기).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  checkMovedIds,
  collectMovedIdErrors,
  movedIdRedirects,
  parseMovedIds,
  readMovedIds,
  readTranslationIds,
  translationMismatchErrors,
  type MovedIdsContext,
} from '../../../src/lib/content/moved-ids'
import { ID_PATTERN } from '../../../src/lib/content/schema'

let pass = 0
let fail = 0
function check(label: string, ok: boolean, detail = ''): void {
  if (ok) pass++
  else fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${!ok && detail ? ` — ${detail}` : ''}`)
}
const has = (errors: string[], tag: string) => errors.some((e) => e.includes(`[${tag}]`))
const only = (errors: string[], tag: string) => errors.length > 0 && errors.every((e) => e.includes(`[${tag}]`))

// ---------- ID_PATTERN export ----------
check('ID_PATTERN export = /^[a-z0-9]+(?:-[a-z0-9]+)*$/', String(ID_PATTERN) === '/^[a-z0-9]+(?:-[a-z0-9]+)*$/', String(ID_PATTERN))

// ---------- parse (a·b·c·g) ----------
const realFile = fs.readFileSync('content/moved-ids.txt', 'utf8')
const realParsed = parseMovedIds(realFile)
check('실제 저장소 content/moved-ids.txt: 실제 줄 0 · 오류 0(예시는 주석)', realParsed.entries.length === 0 && realParsed.errors.length === 0, JSON.stringify(realParsed))
check('실제 파일에 주석 예시 줄 `# 예: example-old-id example-new-id` 있음', realFile.includes('# 예: example-old-id example-new-id'))
check('대조: 그 예시 줄을 주석 없이 쓰면 실제 규칙 1줄이 된다', parseMovedIds('example-old-id example-new-id\n').entries.length === 1)

const ok = parseMovedIds('# 주석\n\nold-a new-a   # 뒤 주석\n  old-b\tnew-b  \n')
check('정상: 주석·빈 줄·뒤 주석·탭·앞뒤 공백 → 2줄, 오류 0', ok.errors.length === 0 && ok.entries.length === 2 && ok.entries[0]!.from === 'old-a' && ok.entries[1]!.to === 'new-b' && ok.entries[1]!.line === 4, JSON.stringify(ok))
for (const [label, text] of [
  ['토큰 1개', 'old-a\n'],
  ['토큰 3개', 'old-a new-a extra\n'],
] as const) {
  const r = parseMovedIds(text)
  check(`a 위반(${label}) → [a] 오류만, 줄 0`, only(r.errors, 'a') && r.entries.length === 0, JSON.stringify(r))
}
for (const [label, text] of [
  ['옛 id 대문자', 'Old-a new-a\n'],
  ['새 id 밑줄', 'old-a new_a\n'],
  ['끝 하이픈', 'old-a- new-a\n'],
  ['한글', 'old-a 새글\n'],
  ['경로 문자', 'old-a ../x\n'],
  ['와일드카드 문자', 'old-:path new-a\n'],
] as const) {
  const r = parseMovedIds(text)
  check(`b 위반(${label}) → [b] 오류만, 줄 0`, only(r.errors, 'b') && r.entries.length === 0, JSON.stringify(r))
}
{
  const r = parseMovedIds('same-id same-id\n')
  check('c 위반(옛 = 새) → [c] 오류만', only(r.errors, 'c') && r.entries.length === 0, JSON.stringify(r))
}
{
  const r = parseMovedIds('old-a new-a\nold-a new-b\n')
  check('g 위반(옛 id 중복) → [g], 2행을 가리킴', only(r.errors, 'g') && r.errors[0]!.includes('2행') && r.errors[0]!.includes('1행'), JSON.stringify(r.errors))
}
{
  const r = parseMovedIds('old-a mid-b\nmid-b new-c\n')
  check('g 위반(사슬 A→B, B→C) → [g] 1건(1행)', only(r.errors, 'g') && r.errors.length === 1 && r.errors[0]!.includes('1행'), JSON.stringify(r.errors))
}
{
  const r = parseMovedIds('old-a old-b\nold-b old-a\n')
  check('g 위반(순환 A↔B) → [g] 2건', only(r.errors, 'g') && r.errors.length === 2, JSON.stringify(r.errors))
}

// ---------- check (d·e·f·h·i) ----------
const entries = parseMovedIds('old-a new-a\n').entries
const baseCtx = (): MovedIdsContext => ({
  retired: new Set(['old-a']),
  koIds: new Set(['new-a', 'other']),
  koFileNames: new Set(['new-a', 'other']),
  enIds: new Set(['new-a']),
  enFileNames: new Set(['new-a']),
  files: [
    { name: 'content/posts/new-a.md', text: '---\nid: new-a\n---\n[다른 글](/post/other) · [영어](/en/post/other) · /post/old-a-longer · https://x.example/repost/old-a' },
  ],
  imageDirExists: () => false,
})
check('정상 맥락 → 오류 0(다른 id 링크·옛 id로 시작하는 더 긴 id·/repost/ 는 잡지 않음)', checkMovedIds(entries, baseCtx()).length === 0, JSON.stringify(checkMovedIds(entries, baseCtx())))
const cases: [string, string, (c: MovedIdsContext) => void][] = [
  ['d 옛 id가 retired-ids에 없음', 'd', (c) => c.retired.delete('old-a')],
  ['e 옛 id 한국어 게시물이 남음', 'e', (c) => c.koIds.add('old-a')],
  ['e 옛 id 영어본만 남음', 'e', (c) => c.enIds.add('old-a')],
  ['e 옛 id가 한국어 파일명으로만 남음', 'e', (c) => c.koFileNames.add('old-a')],
  ['e 옛 id가 영어본 파일명으로만 남음', 'e', (c) => c.enFileNames.add('old-a')],
  ['f 새 id 게시물 없음', 'f', (c) => (c.koIds.delete('new-a'), c.koFileNames.delete('new-a'))],
  ['f(P2-1) 파일명만 새 id — frontmatter id는 오타(new-a-typo)', 'f', (c) => (c.koIds.delete('new-a'), c.koIds.add('new-a-typo'))],
  ['f(P2-1) 새 id가 영어본에만 있음(한국어 frontmatter id 없음)', 'f', (c) => (c.koIds.delete('new-a'), c.koFileNames.delete('new-a'))],
  ['f 새 id가 retired-ids에 있음', 'f', (c) => c.retired.add('new-a')],
  ['h 한국어 본문 상대 링크 /post/옛', 'h', (c) => c.files.push({ name: 'content/posts/x.md', text: '[옛](/post/old-a)' })],
  ['h 영어 링크 /en/post/옛', 'h', (c) => c.files.push({ name: 'content/posts-en/x.md', text: 'see /en/post/old-a.' })],
  ['h 절대 주소 https://site/post/옛?q', 'h', (c) => c.files.push({ name: 'content/posts/x.md', text: '<https://site.example.com/post/old-a?utm=1>' })],
  ['h 끝 슬래시 /post/옛/', 'h', (c) => c.files.push({ name: 'content/posts/x.md', text: '(/post/old-a/)' })],
  ['h frontmatter sources url', 'h', (c) => c.files.push({ name: 'content/posts/x.md', text: '---\nsources:\n  - url: https://site.example.com/en/post/old-a\n---' })],
  ['i 옛 이미지 폴더 남음', 'i', (c) => (c.imageDirExists = (id) => id === 'old-a')],
  ['i 게시물이 /images/옛/ 참조', 'i', (c) => c.files.push({ name: 'content/posts/x.md', text: 'image:\n  src: /images/old-a/thumb.jpg' })],
]
for (const [label, tag, mutate] of cases) {
  const ctx = baseCtx()
  mutate(ctx)
  const errors = checkMovedIds(entries, ctx)
  check(`${label} → [${tag}]`, has(errors, tag) && only(errors, tag), JSON.stringify(errors))
}
{
  const ctx = baseCtx()
  ctx.koIds.delete('new-a')
  ctx.koIds.add('new-a-typo')
  const errors = checkMovedIds(entries, ctx)
  check('f(P2-1) 메시지가 파일은 있지만 frontmatter id가 다르다고 알린다', errors.length === 1 && errors[0]!.includes('content/posts/new-a.md') && errors[0]!.includes('frontmatter id'), JSON.stringify(errors))
}
{
  const ctx = baseCtx()
  ctx.koFileNames.delete('new-a')
  ctx.koFileNames.add('2026-01-01-new-a')
  check('f 음성: 파일명이 달라도 frontmatter id가 새 id면 통과', checkMovedIds(entries, ctx).length === 0, JSON.stringify(checkMovedIds(entries, ctx)))
}

// ---------- 리다이렉트 규칙 ----------
const rules = movedIdRedirects(new Map([['old-a', 'new-a'], ['old-b', 'new-b']]), new Set(['new-a']))
check(
  '규칙: 2건 → 4개, ko는 /post/새, en은 영어본 있으면 /en/post/새·없으면 /post/새, 모두 permanent(308)',
  JSON.stringify(rules) ===
    JSON.stringify([
      { source: '/post/old-a', destination: '/post/new-a', permanent: true },
      { source: '/en/post/old-a', destination: '/en/post/new-a', permanent: true },
      { source: '/post/old-b', destination: '/post/new-b', permanent: true },
      { source: '/en/post/old-b', destination: '/post/new-b', permanent: true },
    ]),
  JSON.stringify(rules),
)
check('규칙: 빈 목록 → 0개', movedIdRedirects(new Map(), new Set(['x'])).length === 0)
check('규칙: source에 와일드카드·정규식 문자(: * ( ? ) 0', rules.every((r) => !/[:*()?+]/.test(r.source)))

// ---------- 영어 분기 불일치 검사 ----------
const moved = new Map([['old-a', 'new-a']])
check('번역 맵 일치 → 오류 0', translationMismatchErrors(moved, new Set(['new-a']), new Set(['new-a'])).length === 0)
check('번역 맵 불일치(frontmatter엔 있고 검증 맵엔 없음) → 오류 1', translationMismatchErrors(moved, new Set(['new-a']), new Set()).length === 1)
check('번역 맵 불일치(반대) → 오류 1', translationMismatchErrors(moved, new Set(), new Set(['new-a'])).length === 1)

// ---------- 디스크(임시 content 트리) ----------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'p16-moved-'))
const w = (rel: string, text: string) => {
  fs.mkdirSync(path.dirname(path.join(tmp, rel)), { recursive: true })
  fs.writeFileSync(path.join(tmp, rel), text)
}
try {
  w('content/posts/new-a.md', '---\nid: new-a\n---\n본문 [다른 글](/post/other)\n')
  w('content/posts/other.md', '---\nid: other\n---\n')
  w('content/posts-en/en-file-name-differs.md', '---\nid: new-a\n---\nbody\n')
  w('content/retired-ids.txt', '# 주석\nold-a\n')
  check('디스크: moved-ids.txt 없음 → readMovedIds 빈 맵 · collect 오류 0', readMovedIds(tmp).size === 0 && collectMovedIdErrors(tmp).length === 0)
  w('content/moved-ids.txt', '# 예: example-old-id example-new-id\n')
  check('디스크: 주석뿐 → 빈 맵 · 오류 0', readMovedIds(tmp).size === 0 && collectMovedIdErrors(tmp).length === 0)
  w('content/moved-ids.txt', 'old-a new-a\n')
  check('디스크: 정상 1줄 → 오류 0', collectMovedIdErrors(tmp).length === 0, JSON.stringify(collectMovedIdErrors(tmp)))
  check('디스크: readTranslationIds는 파일명이 아니라 frontmatter id(new-a)', readTranslationIds(tmp, readMovedIds(tmp)).has('new-a') && !readTranslationIds(tmp, readMovedIds(tmp)).has('en-file-name-differs'))
  check('디스크: 영어본 있음 → /en/post/old-a → /en/post/new-a', movedIdRedirects(readMovedIds(tmp), readTranslationIds(tmp, readMovedIds(tmp)))[1]!.destination === '/en/post/new-a')
  fs.rmSync(path.join(tmp, 'content/posts-en'), { recursive: true })
  check('디스크: 영어본 폴더 없음 → /en/post/old-a → /post/new-a', movedIdRedirects(readMovedIds(tmp), readTranslationIds(tmp, readMovedIds(tmp)))[1]!.destination === '/post/new-a')
  w('content/moved-ids.txt', 'old-a new-a extra\n')
  let threw = ''
  try {
    readMovedIds(tmp)
  } catch (e) {
    threw = String(e)
  }
  check('디스크: 형식 위반이면 readMovedIds가 던진다(next.config에서 빌드 시작 전 중단)', threw.includes('[a]'), threw)
  w('content/moved-ids.txt', 'old-a new-a\n')
  // P2-1 디스크 재현(리뷰 36 c11-edge-checks 5번과 같은 꼴): 파일명 zz-new.md + frontmatter id zz-new-typo, 목록 zz-old zz-new
  w('content/posts/zz-new.md', '---\nid: zz-new-typo\n---\n')
  w('content/retired-ids.txt', '# 주석\nold-a\nzz-old\n')
  w('content/moved-ids.txt', 'zz-old zz-new\n')
  {
    const errors = collectMovedIdErrors(tmp)
    check('디스크(P2-1): 파일명 zz-new.md · frontmatter id zz-new-typo · 목록 zz-old zz-new → [f]', has(errors, 'f') && only(errors, 'f'), JSON.stringify(errors))
  }
  w('content/moved-ids.txt', 'zz-old zz-new-typo\n')
  check('디스크(P2-1) 음성: 같은 파일에 목록을 frontmatter id(zz-new-typo)로 적으면 오류 0', collectMovedIdErrors(tmp).length === 0, JSON.stringify(collectMovedIdErrors(tmp)))
  fs.rmSync(path.join(tmp, 'content/posts/zz-new.md'))
  w('content/retired-ids.txt', '# 주석\nold-a\n')
  w('content/moved-ids.txt', 'old-a new-a\n')
  w('content/posts/old-a.md', '---\nid: old-a-renamed\n---\n')
  check('디스크: e — 파일명이 옛 id인 게시물도 잡는다', has(collectMovedIdErrors(tmp), 'e'))
  fs.rmSync(path.join(tmp, 'content/posts/old-a.md'))
  fs.mkdirSync(path.join(tmp, 'public/images/old-a'), { recursive: true })
  check('디스크: i — public/images/old-a/ 폴더를 잡는다', has(collectMovedIdErrors(tmp), 'i'))
  fs.rmSync(path.join(tmp, 'public/images/old-a'), { recursive: true })

  // P3-1: 0건이면 영어본을 읽지 않는다 · YAML 오류는 파일 이름을 붙여 다시 던진다
  w('content/posts-en/broken-yaml.md', '---\nid: [깨진\n---\nbody\n')
  w('content/posts-en/good.md', '---\nid: new-a\n---\nbody\n')
  {
    let threwEmpty = ''
    let size = -1
    try {
      size = readTranslationIds(tmp, new Map()).size
    } catch (e) {
      threwEmpty = String(e)
    }
    check('P3-1: 옮긴 id 0건 → 깨진 영어본이 있어도 읽지 않고 빈 집합(던지지 않음)', threwEmpty === '' && size === 0, threwEmpty || `size ${size}`)
    let threw: unknown
    try {
      readTranslationIds(tmp, new Map([['old-a', 'new-a']]))
    } catch (e) {
      threw = e
    }
    const message = threw instanceof Error ? threw.message : String(threw)
    check('P3-1: 옮긴 id 1건 + 깨진 영어본 → 던지고 메시지에 파일 이름 content/posts-en/broken-yaml.md', threw instanceof Error && message.includes('content/posts-en/broken-yaml.md'), message)
    check('P3-1: 다시 던진 오류의 cause = 원래 YAML 오류', threw instanceof Error && threw.cause instanceof Error && threw.cause !== threw, String(threw instanceof Error ? threw.cause : ''))
    w('content/moved-ids.txt', '# 주석뿐\n')
    {
      let threwDefault = ''
      try {
        readTranslationIds(tmp)
      } catch (e) {
        threwDefault = String(e)
      }
      check('P3-1: moved 인자 생략 + 디스크 목록 0건 → 깨진 영어본을 읽지 않음(기본값 readMovedIds)', threwDefault === '', threwDefault)
    }
    check('P3-1: 디스크 목록 0건 → movedIdRedirects(readMovedIds, readTranslationIds) 0개, 던지지 않음', movedIdRedirects(readMovedIds(tmp), readTranslationIds(tmp, readMovedIds(tmp))).length === 0)
    fs.rmSync(path.join(tmp, 'content/posts-en/broken-yaml.md'))
    w('content/moved-ids.txt', 'old-a new-a\n')
    w('content/posts-en/broken-yaml.md', '---\nid: [깨진\n---\nbody\n')
    {
      let threwDefault = ''
      try {
        readTranslationIds(tmp)
      } catch (e) {
        threwDefault = String(e)
      }
      check('P3-1: moved 인자 생략 + 디스크 목록 1건 + 깨진 영어본 → 파일 이름 붙여 던짐', threwDefault.includes('content/posts-en/broken-yaml.md'), threwDefault)
    }
    fs.rmSync(path.join(tmp, 'content/posts-en/broken-yaml.md'))
    check('P3-1: 깨진 파일을 치우면 1건 목록에서 frontmatter id를 읽는다', readTranslationIds(tmp, readMovedIds(tmp)).has('new-a'))
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}

// ---------- 실제 저장소 ----------
check('실제 저장소: collectMovedIdErrors 오류 0 · readMovedIds 0건', collectMovedIdErrors().length === 0 && readMovedIds().size === 0)

console.log(`합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
process.exit(fail ? 1 : 0)
