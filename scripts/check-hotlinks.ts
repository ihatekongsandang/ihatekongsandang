/**
 * 핫링크 점검 — `npm run check:hotlinks` (프로그래머 13 · 정책 P9).
 *
 * `image.kind: news`(근거 기사 og:image 핫링크) 주소가 지금도 이미지로 열리는지 확인하고 깨진 목록을 출력한다.
 *
 * - **빌드와 분리**되어 있다. `prebuild`·`validate:content`가 부르지 않는다.
 * - **비차단**: 네트워크 실패·깨진 이미지가 있어도 종료 코드는 0이다. 결과는 목록으로만 알린다.
 *   (검증 규칙 위반으로 게시물을 읽지 못한 경우도 여기서는 건너뛰고 알리기만 한다 — 그 판정은 `validate:content`가 한다.)
 * - 이미지를 **내려받아 저장하지 않는다**. HEAD로 묻고, HEAD를 받지 않는 서버에만 GET을 보내 응답 머리만 보고 본문은 버린다.
 * - 브라우저와 같은 조건으로 묻기 위해 `Referer`에 사이트 출처(origin)만 싣는다. 사이트의
 *   `Referrer-Policy: strict-origin-when-cross-origin`에서 브라우저가 다른 출처로 보내는 값과 같다(차단 우회가 아니다).
 *   사이트 주소는 `NEXT_PUBLIC_SITE_URL`(환경 변수, 없으면 `.env.local`의 같은 키)에서 읽는다. 없으면 Referer 없이 묻는다.
 *
 * 사용: `npm run check:hotlinks` · 다른 폴더(테스트 픽스처 등): `npm run check:hotlinks -- <posts 폴더>`
 * 선택: `--timeout <ms>`(기본 10000)
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { validatePost } from '../src/lib/content/schema'

interface Target {
  fileName: string
  id: string
  src: string
  sourcePageUrl?: string
}

interface CheckResult {
  target: Target
  ok: boolean
  status?: number
  contentType?: string
  method: 'HEAD' | 'GET'
  reason?: string
}

function parseArgs(argv: string[]): { dir: string; timeout: number } {
  let dir = path.join(process.cwd(), 'content', 'posts')
  let timeout = 10_000
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] as string
    if (arg === '--timeout') {
      const value = Number(argv[index + 1])
      if (Number.isFinite(value) && value > 0) timeout = value
      index += 1
    } else if (!arg.startsWith('--')) {
      dir = path.resolve(arg)
    }
  }
  return { dir, timeout }
}

/** `NEXT_PUBLIC_SITE_URL` — 환경 변수 우선, 없으면 `.env.local`에서 그 한 줄만 읽는다. */
function siteOrigin(): string | undefined {
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) {
    const envFile = path.join(process.cwd(), '.env.local')
    if (fs.existsSync(envFile)) {
      const line = fs
        .readFileSync(envFile, 'utf8')
        .split(/\r?\n/)
        .find((item) => item.startsWith('NEXT_PUBLIC_SITE_URL='))
      raw = line?.slice('NEXT_PUBLIC_SITE_URL='.length).trim().replace(/^["']|["']$/g, '')
    }
  }
  if (!raw) return undefined
  try {
    return new URL(raw).origin
  } catch {
    return undefined
  }
}

function collectTargets(dir: string): { targets: Target[]; fileCount: number; skipped: string[] } {
  const fileNames = fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()
  const targets: Target[] = []
  const skipped: string[] = []
  for (const fileName of fileNames) {
    let parsed: matter.GrayMatterFile<string>
    try {
      parsed = matter(fs.readFileSync(path.join(dir, fileName), 'utf8'))
    } catch {
      skipped.push(`${fileName}: frontmatter 파싱 실패`)
      continue
    }
    const result = validatePost(parsed.data, parsed.content, fileName)
    if (!result.post) {
      // 검증 실패 게시물이라도 news 이미지를 쓰려던 흔적이 있으면 알린다(판정은 validate:content).
      const image = (parsed.data as { image?: { kind?: unknown } } | undefined)?.image
      if (image && image.kind === 'news') skipped.push(`${fileName}: 검증 실패로 건너뜀(npm run validate:content로 확인)`)
      continue
    }
    const image = result.post.image
    if (image?.kind === 'news') {
      targets.push({ fileName, id: result.post.id, src: image.src, sourcePageUrl: image.sourcePageUrl })
    }
  }
  return { targets, fileCount: fileNames.length, skipped }
}

async function request(url: string, method: 'HEAD' | 'GET', timeout: number, referer?: string): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        Accept: 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8',
        ...(referer ? { Referer: `${referer}/` } : {}),
      },
    })
    // 본문은 받지 않는다(저장 금지). GET이면 스트림을 바로 닫는다.
    if (method === 'GET') await response.body?.cancel().catch(() => undefined)
    return response
  } finally {
    clearTimeout(timer)
  }
}

async function check(target: Target, timeout: number, referer?: string): Promise<CheckResult> {
  let method: 'HEAD' | 'GET' = 'HEAD'
  try {
    let response = await request(target.src, 'HEAD', timeout, referer)
    // HEAD를 받지 않거나 다르게 답하는 서버가 있어 실패 응답이면 GET으로 한 번 더 묻는다.
    if (!response.ok) {
      method = 'GET'
      response = await request(target.src, 'GET', timeout, referer)
    }
    const contentType = response.headers.get('content-type') ?? ''
    if (!response.ok) return { target, ok: false, status: response.status, contentType, method, reason: `HTTP ${response.status}` }
    if (!contentType.toLowerCase().startsWith('image/')) {
      return { target, ok: false, status: response.status, contentType, method, reason: `이미지가 아님(content-type: ${contentType || '없음'})` }
    }
    return { target, ok: true, status: response.status, contentType, method }
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError'
      ? `시간 초과(${timeout}ms)`
      : `네트워크 오류: ${error instanceof Error ? error.message : String(error)}`
    return { target, ok: false, method, reason }
  }
}

async function main(): Promise<void> {
  const { dir, timeout } = parseArgs(process.argv.slice(2))
  if (!fs.existsSync(dir)) {
    console.log(`🟡 폴더가 없습니다: ${path.relative(process.cwd(), dir) || dir} — 점검할 것이 없습니다.`)
    return
  }
  const referer = siteOrigin()
  const { targets, fileCount, skipped } = collectTargets(dir)

  console.log(`핫링크 점검 — ${path.relative(process.cwd(), dir) || dir} ${fileCount}건 중 image.kind: news ${targets.length}건`)
  console.log(`Referer: ${referer ? `${referer}/ (사이트 출처만)` : '없음(NEXT_PUBLIC_SITE_URL 미설정)'} · 시간 제한 ${timeout}ms`)
  for (const line of skipped) console.log(`🟡 ${line}`)

  const results: CheckResult[] = []
  // 한 호스트에 몰아서 묻지 않도록 순서대로 하나씩 확인한다.
  for (const target of targets) results.push(await check(target, timeout, referer))

  const broken = results.filter((result) => !result.ok)
  for (const result of results) {
    if (result.ok) console.log(`  OK    ${result.target.fileName} — ${result.method} ${result.status} ${result.contentType}`)
  }
  if (broken.length > 0) {
    console.log('\n🔴 깨진 핫링크 — 플레이스홀더로 표시되는 중입니다. 다른 기사 이미지로 바꾸거나 `image`를 지우세요.')
    for (const result of broken) {
      console.log(`  BROKEN  ${result.target.fileName} (id ${result.target.id}) — ${result.reason}`)
      console.log(`          src: ${result.target.src}`)
      if (result.target.sourcePageUrl) console.log(`          기사: ${result.target.sourcePageUrl}`)
    }
  }
  console.log(`\n── 요약 ── 점검 ${results.length}건 · 정상 ${results.length - broken.length}건 · 깨짐 ${broken.length}건 · 건너뜀 ${skipped.length}건`)
  console.log('(이 점검은 빌드를 막지 않습니다 — 종료 코드는 항상 0)')
}

main().catch((error) => {
  // 예상하지 못한 오류도 빌드·배포를 막지 않는다.
  console.log(`🟡 점검 중 오류: ${error instanceof Error ? error.message : String(error)} — 종료 코드 0으로 끝냅니다.`)
}).finally(() => {
  process.exitCode = 0
})
