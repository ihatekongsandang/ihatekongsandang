/**
 * URL 유형 게시물의 frontmatter 초안 생성기.
 *
 *   npm run --silent og:draft -- https://example.com/article
 *   npm run --silent og:draft -- https://example.com/article > content/posts/<id>.md
 *
 * 파일로 리다이렉트할 때 `--silent`가 없으면 npm의 실행 배너까지 파일에 섞여 frontmatter가 깨진다.
 * 안내 문구는 stderr로 나가므로 리다이렉트해도 화면에 그대로 남는다.
 *
 * 주어진 URL의 OG 메타(제목·요약·썸네일·사이트명)를 읽어 붙여 쓸 수 있는 frontmatter를 출력한다.
 * 추출이 실패해도 멈추지 않고 해당 필드를 빈 값으로 남긴다 — 손으로 채우면 된다.
 * 출력은 초안이며, 그대로 게시하면 검증에서 막힌다(상태 라벨·근거 출처·출처 표기는 사람이 판단할 항목).
 *
 * 의존성 없이 동작한다. HTML 파서를 쓰지 않고 <meta> 태그만 훑기 때문에,
 * JS로 메타를 그려 넣는 사이트나 비표준 마크업에서는 값이 비어 나올 수 있다(그때는 수동 입력).
 */
import process from 'node:process'

const TIMEOUT_MS = 10_000
const USER_AGENT = 'Mozilla/5.0 (compatible; og-draft/0.1; +static site frontmatter helper)'

function parseAttributes(tag) {
  const attributes = {}
  const pattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
  let match
  while ((match = pattern.exec(tag)) !== null) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? ''
  }
  return attributes
}

function decodeEntities(value) {
  return value
    .replace(/&(?:#(\d+)|#x([0-9a-fA-F]+));/g, (_, dec, hex) =>
      String.fromCodePoint(dec ? Number(dec) : Number.parseInt(hex, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim()
}

function extractMeta(html) {
  const meta = new Map()
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0])
    const key = attributes.property ?? attributes.name
    const content = attributes.content
    if (!key || content === undefined) continue
    if (!meta.has(key.toLowerCase())) meta.set(key.toLowerCase(), decodeEntities(content))
  }
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (titleMatch?.[1] && !meta.has('og:title')) {
    meta.set('og:title', decodeEntities(titleMatch[1].replace(/\s+/g, ' ')))
  }
  return meta
}

/** YAML 스칼라로 안전하게 쓰기 위해 항상 큰따옴표로 감싼다. */
function yamlString(value) {
  if (!value) return "''"
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function slugCandidate(url) {
  const segments = url.pathname.split('/').filter(Boolean)
  const last = segments.at(-1) ?? url.hostname
  const cleaned = last
    .replace(/\.(?:html?|php|aspx?)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return cleaned.length >= 3 ? cleaned : 'change-me'
}

async function main() {
  const target = process.argv[2]
  if (!target) {
    console.error('사용법: npm run og:draft -- <URL>')
    process.exit(1)
  }

  let url
  try {
    url = new URL(target)
  } catch {
    console.error(`🔴 URL 형식이 아닙니다: ${target}`)
    process.exit(1)
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    console.error(`🔴 http(s) URL만 받습니다: ${target}`)
    process.exit(1)
  }

  let meta = new Map()
  let fetchError

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml' },
    })
    if (!response.ok) {
      fetchError = `HTTP ${response.status} ${response.statusText}`
    } else {
      meta = extractMeta(await response.text())
    }
  } catch (error) {
    fetchError = error instanceof Error ? error.message : String(error)
  }

  if (fetchError) {
    console.error(`🟡 OG 메타를 읽지 못했습니다(${fetchError}) — 빈 필드로 초안만 출력합니다.`)
  }

  const today = new Date().toISOString().slice(0, 10)
  const ogTitle = meta.get('og:title') ?? ''
  const ogDescription = meta.get('og:description') ?? meta.get('description') ?? ''
  const ogImage = meta.get('og:image') ?? ''
  const ogSiteName = meta.get('og:site_name') ?? url.hostname

  const lines = [
    '---',
    `id: ${slugCandidate(url)}   # 확정 후 변경 금지. 소문자 영숫자와 하이픈만.`,
    "title: ''            # TODO 운영자가 인용형으로 쓴다 (예: \"…로 기소된 것으로 보도됨\"). 원문 제목 복사 금지.",
    "description: ''      # TODO 운영자가 1~2문장 요약을 쓴다. 원문 문장을 그대로 복제하지 않는다.",
    `publishedAt: ${today}`,
    'sourceType: url',
    `attribution: ${yamlString(ogSiteName)}`,
    '# speaker:              # 발언·논평을 정리한 글이면 누구의 말인지 적는다(선택)',
    '#   name: ""',
    '#   affiliation: ""',
    'sources: []             # 배경 보도(선택). 주장을 뒷받침하는 보도를 찾았으면 아래 형태로 넣는다.',
    '# sources:',
    '#   - type: 언론         # 언론 | 수사기관 | 법원 | 기타',
    '#     name: "매체명 — 기사 제목"',
    '#     url: "https://..."',
    '#     date: 2026-01-01',
    'tags: []',
    `sourceUrl: ${yamlString(url.toString())}`,
    'useSourceImage: false   # 원문 썸네일을 미리보기로 쓸 때만 true. 얼굴이 식별되면 false로 둔다.',
    'og:',
    `  title: ${yamlString(ogTitle)}`,
    `  description: ${yamlString(ogDescription)}`,
    `  image: ${yamlString(ogImage)}`,
    `  siteName: ${yamlString(ogSiteName)}`,
    '# titleOverride: ""        # title을 이미 쓴 뒤 다시 갈아끼울 때만. 평소엔 title을 고친다.',
    '# descriptionOverride: ""  # description을 이미 쓴 뒤 다시 갈아끼울 때만.',
    '---',
    '',
    '<!-- URL 유형은 본문이 없어도 됩니다. 운영자 메모를 남기려면 여기에 마크다운으로 씁니다. -->',
    '',
  ]

  console.log(lines.join('\n'))
  console.error(
    [
      '',
      '── 다음 할 일 (사람이 해야 하는 판단) ──',
      '1. title·description을 직접 쓴다. 비워서 내보냈고, 비면 빌드가 막힌다.',
      '   원문 헤드라인을 그대로 옮기지 않는다 — "…로 보도됨"·"…라는 의혹이 제기됨" 같은 인용형으로 쓴다.',
      '   (원문 제목·요약은 og.title·og.description에 그대로 보존되며 상세에 "출처 인용"으로 표시된다.)',
      '2. sources(배경 보도)는 URL 게시물에서는 비어 있어도 된다 — 원문 링크 자체가 근거이기 때문이다.',
      '   주장을 뒷받침하는 보도를 찾았으면 허용 출처(등록 언론사·수사기관·법원)인지 확인하고 채운다.',
      '3. useSourceImage는 false로 나간다. 원문 썸네일을 카드에 쓰려면 og.image 주소를 브라우저로 직접 열어',
      '   확인하고, 인물의 얼굴이 식별되지 않을 때만 true로 켠다. 판단이 애매하면 false로 둔다.',
      '4. content/posts/<id>.md 로 저장한 뒤 `npm run validate:content` 를 돌린다.',
    ].join('\n'),
  )
}

await main()
