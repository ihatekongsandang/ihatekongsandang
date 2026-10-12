/**
 * 리뷰어 14 — 기준(HEAD 코드) ↔ 작업(프로그래머 07 코드) 빌드 출력 전수 비교. 프로그래머 07 `html-diff.mjs`와 따로 만든 독립 검사다.
 *
 * 사용: node docs/tools/reviewer-14/build-diff.mjs <기준 app 폴더> <작업 app 폴더> <기준 BUILD_ID> <작업 BUILD_ID>
 *   (app 폴더 = 빌드의 `.next/server/app` 사본. 두 빌드는 같은 폴더·같은 환경 변수로 만든다.)
 *
 * 검사 (파일 단위, 합집합 기준 — 한쪽에만 있으면 실패):
 *   .html  ① JSON-LD 블록을 전부 JSON.parse. 작업 쪽 `@type: WebSite` 블록의 `alternateName`이 언어별 기대값과 같은지 확인하고
 *            그 키만 지운 뒤 **객체 단위로** 기준과 같아야 한다(블록 수·순서 포함).
 *          ② 그 밖의 마크업: JSON-LD·RSC 스크립트를 뺀 나머지에서 작업 쪽 C 속성(` aria-describedby="korean-only-…"`·
 *            ` id="korean-only-…"`)을 세어 걷어 내고, 정적 청크 경로·빌드 ID만 `*`로 바꾼 뒤 바이트 비교.
 *          ③ RSC: `self.__next_f.push([1,"…"])` 문자열을 풀어 이은 뒤, 작업 쪽 alternateName 직렬화 1회를 걷어 내고 비교.
 *   .rsc   ③과 같은 규칙.
 *   .body · .meta · .json  빌드 ID만 `*`로 바꾸고 바이트 비교.
 *   .js    서버 번들 — 코드가 바뀌었으니 다를 수 있다. 개수만 보고한다.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'

const [baseDir, workDir, baseId, workId] = process.argv.slice(2)
if (!baseDir || !workDir || !baseId || !workId) {
  console.error('사용: node build-diff.mjs <기준 app> <작업 app> <기준 BUILD_ID> <작업 BUILD_ID>')
  process.exit(2)
}

const EXPECTED = {
  ko: ['공산당이 싫어요', 'ihatekongsandang'],
  en: ['공산당이싫어요', '공산당이 싫어요', 'Korea Politics & Security Brief', 'ihatekongsandang'],
}
const localeOf = (rel) => (rel === 'en.html' || rel === 'en.rsc' || rel.startsWith('en/') ? 'en' : 'ko')

const walk = (root) => {
  const out = []
  const go = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) go(full)
      else out.push(path.relative(root, full))
    }
  }
  go(root)
  return out.sort()
}

const ids = (s) => s.split(baseId).join('<BUILD>').split(workId).join('<BUILD>')
// 클라이언트 참조 행 `N:I[모듈ID,[청크ID,청크파일,…],"이름"]`의 청크 목록은 빌드마다 고르는 청크 그룹이 달라질 수 있어
// (실측: 같은 FloatingBannerLink를 기준은 `(en)/layout` 청크, 작업은 `(ko)/layout` 청크로 참조) 모듈 ID·이름만 남기고 목록을 `*`로 바꾼다.
const chunks = (s) =>
  s.replace(/I\[(\d+),\[[^\]]*\]/g, 'I[$1,[*]').replace(/static\/(chunks|css|media)\/[^"'\\\s]+/g, 'static/$1/*')
// 마크업의 청크 로더 `<script src="/_next/static/…">`·`<link rel="preload|stylesheet" href="/_next/static/…">`는 청크 분할이 바뀌면
// 개수·순서가 달라진다(실측: post-card 변경으로 청크 684 해시·로드 순서가 바뀜). 내용이 아니라 로더이므로 통째로 뺀다.
const loaders = (s) =>
  s.replace(/<script src="\/_next\/static\/[^"]*"[^>]*><\/script>/g, '').replace(/<link rel="(?:preload|stylesheet)"[^>]*href="\/_next\/static\/[^"]*"[^>]*\/?>/g, '')

const LD_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
const PUSH_RE = /<script>self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g

function rscOfHtml(html) {
  let out = ''
  for (const m of html.matchAll(PUSH_RE)) {
    const arr = JSON.parse(m[1])
    if (arr[0] === 1) out += arr[1]
  }
  return out
}

const stats = { html: 0, rsc: 0, plain: 0, js: 0, jsDiff: 0, ldBlocks: 0, website: 0, altOk: 0, altKo: 0, altEn: 0, cAttrs: 0, fail: 0 }
const fails = []
// DIFF_CONTEXT=1 이면 다른 지점 앞뒤를 함께 찍는다(원인 확인용).
const ctx = (a, b) => {
  if (!process.env.DIFF_CONTEXT) return ''
  let i = 0
  while (i < a.length && a[i] === b[i]) i++
  let j = 0
  while (j < a.length - i && j < b.length - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++
  return `\n      기준: ${JSON.stringify(a.slice(Math.max(0, i - 80), a.length - j + 40))}\n      작업: ${JSON.stringify(b.slice(Math.max(0, i - 80), b.length - j + 40))}`
}
const fail = (rel, why) => {
  stats.fail += 1
  if (fails.length < 40) fails.push(`${rel}: ${why}`)
}

// RSC 직렬화 속 alternateName — JSON-LD가 `__html` 문자열 안에 있어 따옴표가 이스케이프되고 `&`는 &이 된다.
// 형태를 추측하지 않고, 기대값 배열을 HTML 직렬화 → 문자열 리터럴로 한 번 더 감싼 형태를 후보로 만들어 정확히 1회 걷어 낸다.
function stripAltRsc(text, locale, rel) {
  const html = `"alternateName":${JSON.stringify(EXPECTED[locale])},`
  const once = JSON.stringify(html).slice(1, -1)
  const candidates = [once, once.replace(/&/g, '\\u0026'), JSON.stringify(once).slice(1, -1), JSON.stringify(once).slice(1, -1).replace(/&/g, '\\u0026')]
  for (const c of candidates) {
    const n = text.split(c).length - 1
    if (n === 1) return text.replace(c, '')
    if (n > 1) {
      fail(rel, `RSC alternateName ${n}회`)
      return text
    }
  }
  fail(rel, 'RSC 안에서 alternateName 직렬화를 찾지 못함')
  return text
}

const baseFiles = walk(baseDir)
const workFiles = walk(workDir)
const all = [...new Set([...baseFiles, ...workFiles])].sort()
for (const rel of all) {
  const bp = path.join(baseDir, rel)
  const wp = path.join(workDir, rel)
  if (!fs.existsSync(bp)) { fail(rel, '작업에만 있음'); continue }
  if (!fs.existsSync(wp)) { fail(rel, '기준에만 있음'); continue }
  const b = fs.readFileSync(bp, 'utf8')
  const w = fs.readFileSync(wp, 'utf8')
  const ext = path.extname(rel)
  const locale = localeOf(rel)
  if (ext === '.js') {
    stats.js += 1
    if (b !== w) stats.jsDiff += 1
    continue
  }
  if (ext === '.html') {
    stats.html += 1
    // ① JSON-LD
    const bl = [...b.matchAll(LD_RE)].map((m) => JSON.parse(m[1]))
    const wl = [...w.matchAll(LD_RE)].map((m) => JSON.parse(m[1]))
    stats.ldBlocks += wl.length
    if (bl.length !== wl.length) fail(rel, `JSON-LD 블록 수 ${bl.length}→${wl.length}`)
    let websites = 0
    for (const obj of wl) {
      if (obj['@type'] === 'WebSite') {
        websites += 1
        if (JSON.stringify(obj.alternateName) !== JSON.stringify(EXPECTED[locale])) fail(rel, `alternateName 값 ${JSON.stringify(obj.alternateName)}`)
        else {
          stats.altOk += 1
          stats[locale === 'en' ? 'altEn' : 'altKo'] += 1
        }
        delete obj.alternateName
      } else if ('alternateName' in obj) fail(rel, `WebSite 밖 alternateName (${obj['@type']})`)
    }
    if (websites !== 1) fail(rel, `WebSite 블록 ${websites}개`)
    else stats.website += 1
    if (JSON.stringify(bl) !== JSON.stringify(wl)) fail(rel, 'JSON-LD(alternateName 제외) 다름')
    // ② 마크업
    // RSC push 개수는 페이로드 길이에 따라 바뀐다(alternateName만큼 길어져 조각이 1개 느는 페이지 실측) — 내용은 ③에서 따로 비교하므로 자리표시 1개로 묶는다.
    const strip = (s) => chunks(ids(loaders(s.replace(LD_RE, '<LD>').replace(PUSH_RE, '<RSC>').replace(/(?:<RSC>)+/g, '<RSC>'))))
    let wm = w
    const cHits = wm.match(/ (aria-describedby|id)="korean-only-[a-z0-9-]+"/g) ?? []
    if (cHits.length && locale !== 'en') fail(rel, `한국어 쪽 C 속성 ${cHits.length}`)
    stats.cAttrs += cHits.length
    wm = wm.replace(/ (aria-describedby|id)="korean-only-[a-z0-9-]+"/g, '')
    if (strip(b) !== strip(wm)) fail(rel, '마크업 다름' + ctx(strip(b), strip(wm)))
    // ③ RSC
    const br = chunks(ids(rscOfHtml(b)))
    const wr = chunks(ids(stripAltRsc(rscOfHtml(w), locale, rel)))
    if (br !== wr) fail(rel, 'HTML 속 RSC 다름' + ctx(br, wr))
    continue
  }
  if (ext === '.rsc') {
    stats.rsc += 1
    if (chunks(ids(b)) !== chunks(ids(stripAltRsc(w, locale, rel)))) fail(rel, '.rsc 다름')
    continue
  }
  stats.plain += 1
  if (ids(b) !== ids(w)) fail(rel, `${ext} 바이트 다름`)
}

console.log(`파일 합집합 ${all.length} (기준 ${baseFiles.length} · 작업 ${workFiles.length})`)
console.log(`HTML ${stats.html} · JSON-LD 블록 ${stats.ldBlocks} 파싱 · WebSite 블록 1개인 HTML ${stats.website}`)
console.log(`WebSite alternateName 기대값 일치 ${stats.altOk} (한국어·404 ${stats.altKo} · 영어 ${stats.altEn})`)
console.log(`.rsc ${stats.rsc} · body/meta/json ${stats.plain} · C 속성(작업 HTML) ${stats.cAttrs}개`)
console.log(`서버 .js ${stats.js}개 중 내용 다름 ${stats.jsDiff}개 (코드 변경 반영 — 판정 제외)`)
console.log(`실패 ${stats.fail}`)
for (const f of fails) console.log('  ✗ ' + f)
process.exit(stats.fail ? 1 : 0)
