/**
 * 리뷰어 10 — 두 빌드의 HTML을 "보이는 문서 + JSON-LD" 기준으로 전수 비교한다(의도된 차이 분리 없음).
 * 스크립트 중 `type="application/ld+json"`만 남기고 RSC 페이로드·청크 경로·해시는 걷어낸다.
 *   node docs/tools/reviewer-10/html-same.mjs <A app 폴더> <B app 폴더>
 */
import fs from 'node:fs'
import path from 'node:path'
const [a, b] = process.argv.slice(2)
const list = (r) => { const o = []; const w = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? w(f) : e.name.endsWith('.html') && o.push(path.relative(r, f)) } }; w(r); return o.sort() }
const n = (h) => h.replace(/<!--[^>]*-->/g, '')
  .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/g, (m, attrs) => (/type="application\/ld\+json"/.test(attrs) ? m : ''))
  .replace(/<link rel="(?:preload|stylesheet)"[^>]*>/g, '')
  .replace(/\/_next\/static\/[^"')\s]+/g, '*')
  .replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*')
const la = list(a), lb = new Set(list(b))
let same = 0; const diff = []
for (const f of la) {
  if (!lb.has(f)) { diff.push('없음 ' + f); continue }
  n(fs.readFileSync(path.join(a, f), 'utf8')) === n(fs.readFileSync(path.join(b, f), 'utf8')) ? same++ : diff.push(f)
}
console.log(`A ${la.length}개 · B ${lb.size}개 · 동일 ${same}/${la.length} · 차이 ${diff.length}${diff.length ? ': ' + diff.slice(0, 20).join(', ') : ''}`)
process.exit(diff.length ? 1 : 0)
