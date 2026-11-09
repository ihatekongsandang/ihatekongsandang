/**
 * 프로그래머 14 — 검색·공유 메타 불변 확인(변경 전 빌드 ↔ 변경 후 빌드).
 * 사용: node docs/tools/programmer-14/seo-parity.mjs <변경 전 server/app 사본> <변경 후 server/app>
 * 비교 대상(전 페이지 .html 전수):
 *  ① <head>의 <title>·<meta>·<link rel=canonical|alternate>(정렬해 집합 비교)
 *  ② JSON-LD 블록 전부(문서 순서대로)
 *  ③ .body 파일(sitemap.xml·robots.txt·llms.txt 등) 글자 그대로
 * 화면 개편은 <body> 마크업만 바꿔야 한다 — 이 셋이 하나라도 다르면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
const [before, after] = process.argv.slice(2)
function walk(root, dir = root) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(root, f))
    else if (/\.(html|body)$/.test(e.name)) out.push(path.relative(root, f))
  }
  return out.sort()
}
const head = (t) => {
  const h = t.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
  return (h.match(/<title>[\s\S]*?<\/title>|<meta [^>]*>|<link rel="(?:canonical|alternate)"[^>]*>/g) ?? []).sort()
}
const ld = (t) => t.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) ?? []
const a = walk(before)
const b = walk(after)
let same = 0
const diffs = []
let metaN = 0
let ldN = 0
for (const f of a) {
  if (!b.includes(f)) { diffs.push(`한쪽에만: ${f}`); continue }
  const ta = fs.readFileSync(path.join(before, f), 'utf8')
  const tb = fs.readFileSync(path.join(after, f), 'utf8')
  if (f.endsWith('.body')) {
    if (ta === tb) same += 1
    else diffs.push(`본문 다름: ${f}`)
    continue
  }
  const ha = head(ta), hb = head(tb), la = ld(ta), lb = ld(tb)
  metaN += ha.length
  ldN += la.length
  const okH = JSON.stringify(ha) === JSON.stringify(hb)
  const okL = JSON.stringify(la) === JSON.stringify(lb)
  if (okH && okL) same += 1
  else diffs.push(`${f}: ${okH ? '' : 'head 메타 다름 '}${okL ? '' : 'JSON-LD 다름'}`)
}
for (const f of b) if (!a.includes(f)) diffs.push(`한쪽에만(후): ${f}`)
console.log(`파일 전 ${a.length} · 후 ${b.length} · 같음 ${same} · 다름 ${diffs.length}`)
console.log(`비교한 head 메타 태그 ${metaN}개 · JSON-LD 블록 ${ldN}개 · .body ${a.filter((f) => f.endsWith('.body')).length}개`)
for (const d of diffs.slice(0, 20)) console.log(`  ${d}`)
if (diffs.length) process.exit(1)
