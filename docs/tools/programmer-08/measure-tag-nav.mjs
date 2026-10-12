// 프로그래머 08 — 태그 칩·/tags 링크 전수 대조 (빌드 산출물 기준).
//
// 사용 (저장소 루트에서, `npm run build` 직후):
//   node docs/tools/programmer-08/measure-tag-nav.mjs [--expect-limit 12]
//
// 기대값은 앱 코드(`getAllTags`)를 import 하지 않고 `content/posts/*.md` frontmatter를 직접 읽어 따로 계산한다
// (앱 로직을 그대로 쓰면 같은 버그를 같이 통과시키므로). 정렬 규칙만 같게 맞춘다: 건수 내림차순 → 이름 `localeCompare('ko')`.
//
// 검사 대상(전수): `.next/server/app/` 아래
//   - 메인 `index.html` + 홈 피드 `page/{n}.html` 전부
//   - 태그 피드 `tag/{태그}.html` 전부 + `tag/{태그}/page/{n}.html` 전부
//   - `tags.html` (있으면) — 링크 수 = 전체 태그 수, 순서·건수 일치
//   - `en.html` + `en/page/{n}.html` — 태그 nav 0개
// `--expect-limit` 없이 돌리면(변경 전 기준선) 칩 수만 보고하고 판정하지 않는다.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const args = process.argv.slice(2)
const limitIndex = args.indexOf('--expect-limit')
const LIMIT = limitIndex >= 0 ? Number(args[limitIndex + 1]) : undefined

const ROOT = process.cwd()
const APP = path.join(ROOT, '.next', 'server', 'app')
const POSTS = path.join(ROOT, 'content', 'posts')

// --- 기대값: frontmatter 직접 집계 ---
const counts = new Map()
let postCount = 0
for (const name of fs.readdirSync(POSTS).filter((n) => n.endsWith('.md')).sort()) {
  const { data } = matter(fs.readFileSync(path.join(POSTS, name), 'utf8'))
  postCount += 1
  const seen = new Set()
  for (const raw of Array.isArray(data.tags) ? data.tags : []) {
    const tag = String(raw).trim()
    if (!tag || seen.has(tag)) continue
    seen.add(tag)
    counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
}
const expected = [...counts.entries()]
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'))
const TOTAL = expected.length

// --- HTML 파싱 도우미 ---
function navBlocks(html) {
  return [...html.matchAll(/<nav aria-label="태그"[^>]*>([\s\S]*?)<\/nav>/g)].map((m) => m[1])
}
function anchors(fragment) {
  return [...fragment.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => {
    const attrs = m[1]
    const href = /href="([^"]*)"/.exec(attrs)?.[1] ?? ''
    return {
      href,
      current: /aria-current="page"/.test(attrs),
      inner: m[2],
      text: m[2].replace(/<!-- -->/g, '').replace(/<[^>]+>/g, ''),
    }
  })
}
function tagOf(href) {
  const m = /^\/tag\/([^/?#]+)$/.exec(href)
  return m ? decodeURIComponent(m[1]) : undefined
}
function countOf(inner) {
  const m = /<span class="sr-only">게시물 (?:<!-- -->)?(\d+)(?:<!-- -->)?건<\/span>/.exec(inner)
  return m ? Number(m[1]) : undefined
}

const failures = []
const fail = (file, msg) => failures.push(`${file}: ${msg}`)
const rel = (file) => path.relative(APP, file)
const top = LIMIT ? expected.slice(0, LIMIT) : expected

// 태그 칩 nav 1개를 기대값과 대조한다. activeTag가 상위 밖이면 맨 앞에 붙어 있어야 한다.
function checkNav(file, html, activeTag) {
  const blocks = navBlocks(html)
  if (blocks.length !== 1) {
    fail(rel(file), `태그 nav ${blocks.length}개 (기대 1)`)
    return undefined
  }
  const links = anchors(blocks[0])
  const chips = links.filter((a) => tagOf(a.href) !== undefined)
  const extra = links.filter((a) => tagOf(a.href) === undefined)
  if (!LIMIT) return { chips: chips.length, extra: extra.length }

  let want = top
  if (activeTag && !top.some((t) => t.tag === activeTag)) {
    want = [expected.find((t) => t.tag === activeTag), ...top]
  }
  const got = chips.map((a) => tagOf(a.href))
  if (got.join('\n') !== want.map((t) => t.tag).join('\n')) {
    fail(rel(file), `칩 순서/구성 불일치: got [${got.join(', ')}] want [${want.map((t) => t.tag).join(', ')}]`)
  }
  chips.forEach((a, i) => {
    const c = countOf(a.inner)
    if (want[i] && c !== want[i].count) fail(rel(file), `칩 ${got[i]} 건수 ${c} (기대 ${want[i].count})`)
    const shouldBeCurrent = activeTag !== undefined && got[i] === activeTag
    if (a.current !== shouldBeCurrent) fail(rel(file), `칩 ${got[i]} aria-current=${a.current} (기대 ${shouldBeCurrent})`)
  })
  if (extra.length !== 1 || extra[0].href !== '/tags') {
    fail(rel(file), `"전체 태그 보기" 링크 이상: ${JSON.stringify(extra.map((e) => e.href))}`)
  } else {
    const wantText = `전체 태그 보기 (${TOTAL}개)`
    if (!extra[0].text.includes(wantText)) fail(rel(file), `전체 보기 문구 "${extra[0].text}" (기대 포함 "${wantText}")`)
    if (extra[0].current) fail(rel(file), '전체 보기 링크에 aria-current')
  }
  return { chips: chips.length, extra: extra.length }
}

function listHtml(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((n) => n.endsWith('.html')).map((n) => path.join(dir, n))
}

const tally = new Map() // "구분|칩수" → 페이지 수
const bump = (kind, n) => tally.set(`${kind}|${n}`, (tally.get(`${kind}|${n}`) ?? 0) + 1)

// 1) 메인 + 홈 피드 n페이지
const homeFiles = [path.join(APP, 'index.html'), ...listHtml(path.join(APP, 'page'))]
for (const file of homeFiles) {
  const r = checkNav(file, fs.readFileSync(file, 'utf8'), undefined)
  if (r) bump('home', r.chips)
}

// 2) 태그 피드 1페이지 전부 + n페이지 전부
const tagDir = path.join(APP, 'tag')
const tagPageFiles = listHtml(tagDir)
const builtTags = tagPageFiles.map((f) => path.basename(f, '.html').normalize('NFC'))
const expectedSet = new Set(expected.map((t) => t.tag))
const missing = expected.filter((t) => !builtTags.includes(t.tag)).map((t) => t.tag)
const unexpected = builtTags.filter((t) => !expectedSet.has(t))
if (missing.length) fail('tag/', `빌드에 없는 태그 페이지 ${missing.length}개: ${missing.join(', ')}`)
if (unexpected.length) fail('tag/', `기대에 없는 태그 페이지 ${unexpected.length}개: ${unexpected.join(', ')}`)

let tagFeedPages = 0
for (const file of tagPageFiles) {
  const tag = path.basename(file, '.html').normalize('NFC')
  const r = checkNav(file, fs.readFileSync(file, 'utf8'), tag)
  tagFeedPages += 1
  if (r) bump(top.some((t) => t.tag === tag) ? 'tag:top' : 'tag:outside', r.chips)
  const sub = path.join(tagDir, path.basename(file, '.html'), 'page')
  for (const pf of listHtml(sub)) {
    const r2 = checkNav(pf, fs.readFileSync(pf, 'utf8'), tag)
    tagFeedPages += 1
    if (r2) bump(top.some((t) => t.tag === tag) ? 'tag-page-n:top' : 'tag-page-n:outside', r2.chips)
  }
}

// 3) /tags
const tagsFile = path.join(APP, 'tags.html')
let tagsLinks = 'n/a (tags.html 없음)'
if (fs.existsSync(tagsFile)) {
  const html = fs.readFileSync(tagsFile, 'utf8')
  const main = /<main\b[\s\S]*?<\/main>/.exec(html)?.[0] ?? ''
  const links = anchors(main).filter((a) => tagOf(a.href) !== undefined)
  tagsLinks = links.length
  const got = links.map((a) => tagOf(a.href))
  if (got.length !== TOTAL) fail('tags.html', `태그 링크 ${got.length}개 (기대 ${TOTAL})`)
  if (got.join('\n') !== expected.map((t) => t.tag).join('\n')) fail('tags.html', '태그 링크 순서/구성 불일치')
  if (new Set(got).size !== got.length) fail('tags.html', '중복 링크')
  links.forEach((a, i) => {
    const c = countOf(a.inner)
    if (expected[i] && c !== expected[i].count) fail('tags.html', `${got[i]} 건수 ${c} (기대 ${expected[i].count})`)
  })
  if (navBlocks(html).length !== 0) fail('tags.html', '상단 태그 칩 nav가 함께 렌더됨')
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1]
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]
  console.log(`tags.html  <title>=${title}  canonical=${canonical}`)
}

// 4) 영어 피드 — 태그 nav 없어야 함
const enFiles = [path.join(APP, 'en.html'), ...listHtml(path.join(APP, 'en', 'page'))]
for (const file of enFiles) {
  const n = navBlocks(fs.readFileSync(file, 'utf8')).length
  if (n !== 0) fail(rel(file), `영어 페이지에 태그 nav ${n}개`)
  bump('en:nav', n)
}

console.log(`게시물 ${postCount}건 · 전체 태그(frontmatter 직접 집계) ${TOTAL}개 · 기대 상한 ${LIMIT ?? '(기준선 — 판정 없음)'}`)
console.log(`검사 페이지: 홈 ${homeFiles.length} · 태그 피드 ${tagFeedPages}(1페이지 ${tagPageFiles.length}) · 영어 피드 ${enFiles.length} · /tags 링크 ${tagsLinks}`)
console.log('구분|칩 수 → 페이지 수')
for (const [k, v] of [...tally.entries()].sort()) console.log(`  ${k} → ${v}`)
if (LIMIT) {
  console.log(`상위 ${LIMIT}: ${top.map((t) => `${t.tag} ${t.count}`).join(' · ')}`)
  console.log(`${LIMIT + 1}위: ${expected[LIMIT] ? `${expected[LIMIT].tag} ${expected[LIMIT].count}` : '없음'}`)
}
if (failures.length) {
  console.log(`❌ 실패 ${failures.length}건`)
  for (const f of failures.slice(0, 50)) console.log(`  - ${f}`)
  process.exit(1)
}
console.log(LIMIT ? '✅ 전수 대조 통과' : '기준선 기록 완료')
