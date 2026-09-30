/**
 * 리뷰어 10 — ko-html-diff.mjs가 걷어내는 <script> 안쪽 중 JSON-LD와 <head> 메타를 따로 전수 비교한다.
 *
 * 사용: node docs/tools/reviewer-10/jsonld-diff.mjs <기준 .next/server/app> <작업 .next/server/app>
 *
 * 1) 기준 HTML 전부에 대해 `application/ld+json` 블록 목록(파싱한 JSON)을 비교한다.
 * 2) <head> 안의 meta·link(rel=canonical/alternate) 태그 목록을 비교한다(hreflang alternate는 따로 센다).
 * 3) 각 파일의 언어 전환 nav 개수가 정확히 1개인지 센다(의도된 추가분이 파일당 1회만 들어갔는지).
 */
import fs from 'node:fs'
import path from 'node:path'

const [baseDir, workDir] = process.argv.slice(2)
function listHtml(root) {
  const out = []
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) walk(full)
      else if (e.name.endsWith('.html')) out.push(path.relative(root, full))
    }
  }
  walk(root)
  return out.sort()
}
const jsonld = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
const head = (html) => {
  const h = html.slice(0, html.indexOf('</head>'))
  return [...h.matchAll(/<(?:meta|link rel="(?:canonical|alternate)")[^>]*\/>/g)]
    .map((m) => m[0].replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*').replace(/\/_next\/static\/[^"]+/g, '*'))
    .filter((t) => !/rel="(?:preload|stylesheet)"/.test(t))
}

const base = listHtml(baseDir)
let ldSame = 0, ldBlocks = 0, headSame = 0, navOnce = 0
const ldDiff = [], headDiff = [], navBad = []
for (const f of base) {
  const b = fs.readFileSync(path.join(baseDir, f), 'utf8')
  const w = fs.readFileSync(path.join(workDir, f), 'utf8')
  const lb = jsonld(b), lw = jsonld(w)
  ldBlocks += lb.length
  if (JSON.stringify(lb) === JSON.stringify(lw)) ldSame++
  else ldDiff.push(f)
  const hb = head(b)
  const hw = head(w).filter((t) => !/rel="alternate" hrefLang=/.test(t))
  let hbAdj = hb
  if (f === '_not-found.html') {
    hbAdj = hb.filter((t) => !/og:image|twitter:image/.test(t)).map((t) => t.replace('content="index, follow"', 'content="noindex, follow"'))
    hbAdj = [...new Set(hbAdj)]
  }
  if (JSON.stringify(hbAdj) === JSON.stringify(hw)) headSame++
  else headDiff.push({ f, only_base: hbAdj.filter((x) => !hw.includes(x)), only_work: hw.filter((x) => !hbAdj.includes(x)) })
  const navs = (w.match(/<nav aria-label="언어 선택"/g) ?? []).length
  if (navs === 1) navOnce++
  else navBad.push(`${f}:${navs}`)
}
console.log(`기준 HTML ${base.length}개 · JSON-LD 블록 ${ldBlocks}개`)
console.log(`JSON-LD 동일: ${ldSame}/${base.length}${ldDiff.length ? ` — 차이: ${ldDiff.slice(0, 20).join(', ')}` : ''}`)
console.log(`<head> meta·canonical 동일(hreflang 제외): ${headSame}/${base.length}`)
for (const d of headDiff.slice(0, 10)) console.log(`✗ ${d.f}\n  기준만: ${d.only_base.join(' | ')}\n  작업만: ${d.only_work.join(' | ')}`)
console.log(`언어 nav 정확히 1개: ${navOnce}/${base.length}${navBad.length ? ` — ${navBad.join(', ')}` : ''}`)
process.exit(ldDiff.length || headDiff.length || navBad.length ? 1 : 0)
