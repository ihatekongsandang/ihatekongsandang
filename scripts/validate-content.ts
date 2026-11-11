/**
 * 콘텐츠 게이트 — `npm run validate:content` (빌드 전 `prebuild`에서 자동 실행).
 *
 * 이 스크립트가 게시 파일의 유일한 관문이다. 콘텐츠 게시는 리뷰어 게이트의 예외이므로,
 * 여기서 막히는 것이 곧 검수다. 하나라도 오류가 있으면 종료 코드 1로 빌드를 세운다.
 *
 * 검사 규칙은 `src/lib/content/schema.ts`에 한 벌만 두고 화면 코드와 공유한다.
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { collectMovedIdErrors, readMovedIdsText, parseMovedIds, readTranslationIds, translationMismatchErrors } from '../src/lib/content/moved-ids'
import { readRetiredIds, retiredIdMessage } from '../src/lib/content/retired-ids'
import { IMAGE_KINDS, isArchiveCaption, validatePost, type Post } from '../src/lib/content/schema'
import { validateTranslation } from '../src/lib/content/translation'
import { readImageSize } from './image-size'
import { imageReuseNotices, type ReuseEntry } from './image-reuse'

const ROOT = process.cwd()
const POSTS_DIR = path.join(ROOT, 'content', 'posts')
/** 영어본(프로그래머 05) — 한국어 원본에 덧붙는 파일. 폴더가 없어도 된다(부분 번역 허용). */
const POSTS_EN_DIR = path.join(ROOT, 'content', 'posts-en')
const PUBLIC_DIR = path.join(ROOT, 'public')

function localImageExists(src: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, src.replace(/^\//, '')))
}

/** 저장 사진(public·open) 짧은 변 최소값(정책 §4.5-7 · §5.3-8). 못 미치면 경고. */
const MIN_SHORT_SIDE = 400
/** 같은 원본 사진 반복 한도·피드 인접 검사는 `scripts/image-reuse.ts`(프로그래머 20 — A-2 6건, 그 밖 3건, 메인 피드 5칸). */

/** 저장 파일 해시(같은 원본 판정용). 읽지 못하면 undefined. */
function fileHash(filePath: string): string | undefined {
  try {
    return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
  } catch {
    return undefined
  }
}

interface FileReport {
  fileName: string
  errors: string[]
  notices: string[]
}

function main(): void {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`🔴 게시물 폴더가 없습니다: content/posts`)
    process.exit(1)
  }

  const fileNames = fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith('.md')).sort()
  const retired = readRetiredIds()
  const reports: FileReport[] = []
  const idOwner = new Map<string, string>()
  const typeCount = new Map<string, number>()
  let imageCount = 0
  /** 대표 이미지(`image`) 종류별 수 — self·public·open·news(프로그래머 13 · 19). */
  const imageKindCount = new Map<string, number>()
  /** public·open 대표 이미지를 쓴 게시물 — 같은 원본 반복·피드 인접 경고용(프로그래머 19 · 20). */
  const reuseEntries: ReuseEntry[] = []
  let sourceCount = 0
  let speakerCount = 0
  /** 검증을 통과한 한국어 원본 — 영어본이 짝을 찾는 대상. id 중복·폐기 id는 제외한다. */
  const validPosts = new Map<string, Post>()

  for (const fileName of fileNames) {
    const errors: string[] = []
    const notices: string[] = []
    const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8')

    let parsed: matter.GrayMatterFile<string> | undefined
    try {
      parsed = matter(raw)
    } catch (error) {
      errors.push(`frontmatter(YAML) 파싱 실패: ${error instanceof Error ? error.message : String(error)}`)
    }

    if (parsed) {
      const result = validatePost(parsed.data, parsed.content, fileName, { localImageExists })
      errors.push(...result.errors)
      notices.push(...result.notices)

      const id = typeof parsed.data?.id === 'string' ? parsed.data.id.trim() : undefined
      if (id) {
        const owner = idOwner.get(id)
        if (owner) {
          errors.push(`id \`${id}\`가 ${owner}와 중복됩니다. 안정 ID는 게시물마다 하나여야 합니다.`)
        } else {
          idOwner.set(id, fileName)
        }
        if (retired.has(id)) {
          errors.push(retiredIdMessage(id))
        }
      }

      if (result.post && idOwner.get(result.post.id) === fileName && !retired.has(result.post.id)) {
        validPosts.set(result.post.id, result.post)
      }

      if (result.post) {
        typeCount.set(result.post.sourceType, (typeCount.get(result.post.sourceType) ?? 0) + 1)
        imageCount += result.post.images.length + (result.post.image ? 1 : 0)
        if (result.post.image) {
          const kind = result.post.image.kind ?? 'self'
          imageKindCount.set(kind, (imageKindCount.get(kind) ?? 0) + 1)
          if ((kind === 'public' || kind === 'open') && result.post.image.sourcePageUrl) {
            const storedPath = path.join(PUBLIC_DIR, result.post.image.src.replace(/^\//, ''))
            reuseEntries.push({
              fileName,
              id: result.post.id,
              publishedAtTime: result.post.publishedAtTime,
              sourcePageUrl: result.post.image.sourcePageUrl,
              fileHash: fileHash(storedPath),
              archive: kind === 'open' || isArchiveCaption(result.post.image.caption, 'ko'),
            })
            const size = readImageSize(storedPath)
            if (!size) {
              notices.push(`image.src: 저장 파일의 크기를 읽지 못했습니다(JPEG·PNG·WebP만 읽습니다) — 짧은 변 ${MIN_SHORT_SIDE}px 이상인지 직접 확인하세요.`)
            } else if (Math.min(size.width, size.height) < MIN_SHORT_SIDE) {
              notices.push(
                `image.src: 저장 파일이 ${size.width}×${size.height}px입니다 — 짧은 변 ${MIN_SHORT_SIDE}px 이상을 씁니다(정책 §4.5-7 · §5.3-8).`,
              )
            }
          }
        }
        sourceCount += result.post.sources.length
        if (result.post.speaker) speakerCount += 1
      }
    }

    reports.push({ fileName, errors, notices })
  }

  // --- 같은 원본 사진 반복·메인 피드 인접(public·open) — 경고만(프로그래머 20 명세 6, 정책 §4.5-6) ---
  // 피드는 검증을 통과한 게시물 전체(id 중복·폐기 id 제외 — getAllPosts와 같은 집합)다.
  const reuse = imageReuseNotices(
    reuseEntries.filter((entry) => validPosts.get(entry.id)?.fileName === entry.fileName),
    [...validPosts.values()],
  )
  for (const [fileName, messages] of reuse) {
    reports.find((item) => item.fileName === fileName)?.notices.push(...messages)
  }

  // --- 영어본 content/posts-en/*.md ---
  const enFileNames = fs.existsSync(POSTS_EN_DIR)
    ? fs.readdirSync(POSTS_EN_DIR).filter((name) => name.endsWith('.md')).sort()
    : []
  const enIds = new Set<string>()
  for (const fileName of enFileNames) {
    const errors: string[] = []
    const notices: string[] = []
    const raw = fs.readFileSync(path.join(POSTS_EN_DIR, fileName), 'utf8')

    let parsed: matter.GrayMatterFile<string> | undefined
    try {
      parsed = matter(raw)
    } catch (error) {
      errors.push(`frontmatter(YAML) 파싱 실패: ${error instanceof Error ? error.message : String(error)}`)
    }

    if (parsed) {
      const id = typeof parsed.data?.id === 'string' ? parsed.data.id.trim() : undefined
      const result = validateTranslation(parsed.data, parsed.content, fileName, id ? validPosts.get(id) : undefined)
      errors.push(...result.errors)
      notices.push(...result.notices)
      if (result.translation) enIds.add(result.translation.id)
    }

    reports.push({ fileName: `posts-en/${fileName}`, errors, notices })
  }

  // --- 옮긴 id 목록 content/moved-ids.txt (프로그래머 16, C11) — 검증 a~h + 옛 이미지 폴더. 로더도 같은 함수로 한 번 더 막는다 ---
  const moved = parseMovedIds(readMovedIdsText(ROOT))
  const movedErrors = collectMovedIdErrors(ROOT)
  if (movedErrors.length === 0) {
    const movedMap = new Map(moved.entries.map((entry) => [entry.from, entry.to]))
    try {
      movedErrors.push(...translationMismatchErrors(movedMap, readTranslationIds(ROOT, movedMap), enIds))
    } catch (error) {
      // 영어본 YAML 오류(파일 이름이 붙어 있다)는 여기서 받아 보고서에 싣는다 — 던지게 두면 아래 전체 보고서가 찍히지 않는다.
      movedErrors.push(error instanceof Error ? error.message : String(error))
    }
  }
  const failed = reports.filter((report) => report.errors.length > 0)
  const noticed = reports.filter((report) => report.notices.length > 0)

  console.log(`콘텐츠 검증 — content/posts/*.md ${fileNames.length}건 · content/posts-en/*.md ${enFileNames.length}건`)

  for (const report of noticed) {
    console.log(`\n🟡 ${report.fileName}`)
    for (const notice of report.notices) console.log(`   · ${notice}`)
  }

  for (const report of failed) {
    console.log(`\n🔴 ${report.fileName}`)
    for (const error of report.errors) console.log(`   ✗ ${error}`)
  }

  if (movedErrors.length > 0) {
    console.log(`\n🔴 content/moved-ids.txt`)
    for (const error of movedErrors) console.log(`   ✗ ${error}`)
  }

  const errorTotal = failed.reduce((sum, report) => sum + report.errors.length, 0)

  console.log(
    [
      '',
      '── 요약 ──',
      `검사 파일 ${fileNames.length + enFileNames.length}건(한국어 ${fileNames.length} · 영어본 ${enFileNames.length}) · 통과 ${reports.length - failed.length}건 · 실패 ${failed.length}건 (오류 ${errorTotal}개)`,
      `고유 id ${idOwner.size}개 · 폐기 id 목록 ${retired.size}개`,
      `옮긴 id 목록(moved-ids.txt) ${moved.entries.length}건 · 리다이렉트 규칙 ${moved.entries.length * 2}개 · 오류 ${movedErrors.length}개`,
      `유형별: ${[...typeCount.entries()].map(([key, value]) => `${key} ${value}`).join(' · ') || '없음'}`,
      `배경 보도 출처: ${sourceCount}건 · 발언자 표기: ${speakerCount}건`,
      `검사한 이미지 alt ${imageCount}개`,
      `대표 이미지 종류: ${IMAGE_KINDS.map((kind) => `${kind} ${imageKindCount.get(kind) ?? 0}`).join(' · ')}`,
      `영어본 ${enIds.size}건 / 전체 ${validPosts.size}건`,
    ].join('\n'),
  )

  if (failed.length > 0 || movedErrors.length > 0) {
    console.error('\n🔴 검증 실패 — 위 항목을 고친 뒤 다시 실행하세요. 빌드를 진행하지 않습니다.')
    process.exit(1)
  }

  console.log('\n✅ 검증 통과')
}

main()
