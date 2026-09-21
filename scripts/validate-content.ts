/**
 * 콘텐츠 게이트 — `npm run validate:content` (빌드 전 `prebuild`에서 자동 실행).
 *
 * 이 스크립트가 게시 파일의 유일한 관문이다. 콘텐츠 게시는 리뷰어 게이트의 예외이므로,
 * 여기서 막히는 것이 곧 검수다. 하나라도 오류가 있으면 종료 코드 1로 빌드를 세운다.
 *
 * 검사 규칙은 `src/lib/content/schema.ts`에 한 벌만 두고 화면 코드와 공유한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { readRetiredIds, retiredIdMessage } from '../src/lib/content/retired-ids'
import { validatePost } from '../src/lib/content/schema'

const ROOT = process.cwd()
const POSTS_DIR = path.join(ROOT, 'content', 'posts')
const PUBLIC_DIR = path.join(ROOT, 'public')

function localImageExists(src: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, src.replace(/^\//, '')))
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
  let sourceCount = 0
  let speakerCount = 0

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

      if (result.post) {
        typeCount.set(result.post.sourceType, (typeCount.get(result.post.sourceType) ?? 0) + 1)
        imageCount += result.post.images.length + (result.post.image ? 1 : 0)
        sourceCount += result.post.sources.length
        if (result.post.speaker) speakerCount += 1
      }
    }

    reports.push({ fileName, errors, notices })
  }

  const failed = reports.filter((report) => report.errors.length > 0)
  const noticed = reports.filter((report) => report.notices.length > 0)

  console.log(`콘텐츠 검증 — content/posts/*.md ${fileNames.length}건`)

  for (const report of noticed) {
    console.log(`\n🟡 ${report.fileName}`)
    for (const notice of report.notices) console.log(`   · ${notice}`)
  }

  for (const report of failed) {
    console.log(`\n🔴 ${report.fileName}`)
    for (const error of report.errors) console.log(`   ✗ ${error}`)
  }

  const errorTotal = failed.reduce((sum, report) => sum + report.errors.length, 0)

  console.log(
    [
      '',
      '── 요약 ──',
      `검사 파일 ${fileNames.length}건 · 통과 ${fileNames.length - failed.length}건 · 실패 ${failed.length}건 (오류 ${errorTotal}개)`,
      `고유 id ${idOwner.size}개 · 폐기 id 목록 ${retired.size}개`,
      `유형별: ${[...typeCount.entries()].map(([key, value]) => `${key} ${value}`).join(' · ') || '없음'}`,
      `배경 보도 출처: ${sourceCount}건 · 발언자 표기: ${speakerCount}건`,
      `검사한 이미지 alt ${imageCount}개`,
    ].join('\n'),
  )

  if (failed.length > 0) {
    console.error('\n🔴 검증 실패 — 위 항목을 고친 뒤 다시 실행하세요. 빌드를 진행하지 않습니다.')
    process.exit(1)
  }

  console.log('\n✅ 검증 통과')
}

main()
