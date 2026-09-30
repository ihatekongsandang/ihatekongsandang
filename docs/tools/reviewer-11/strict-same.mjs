/**
 * 리뷰어 11 — 두 빌드 HTML을 리뷰어 10 `html-same.mjs`보다 엄격하게 전수 비교한다.
 *  L1 문서: HTML 주석(`<!-- -->` = React 텍스트 노드 경계)을 **남긴** 채, 일반 스크립트·preload/stylesheet 링크·청크 해시·빌드 ID만 걷어낸다.
 *  L2 RSC: 문서 안 `self.__next_f.push` 페이로드만 모아 청크 해시·빌드 ID를 걷어내고 비교한다(하이드레이션 입력).
 *   node docs/tools/reviewer-11/strict-same.mjs <A app 폴더> <B app 폴더> [--show 파일.html]
 */
import fs from 'node:fs'
import path from 'node:path'
const [a, b, flag, showFile] = process.argv.slice(2)
const list = (r) => { const o = []; const w = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) w(f); else if (e.name.endsWith('.html')) o.push(path.relative(r, f)) } }; w(r); return o.sort() }
const hashes = (s) => s.replace(/\/_next\/static\/[^"')\s\\]+/g, '*').replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*').replace(/static\/chunks\/[^"\\]+/g, '*')
const doc = (h, id) => hashes((id ? h.split(id).join('BUILD_ID') : h)
  .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/g, (m, attrs) => (/type="application\/ld\+json"/.test(attrs) ? m : ''))
  .replace(/<link rel="(?:preload|stylesheet)"[^>]*>/g, ''))
const buildId = (dir) => { try { return fs.readFileSync(path.join(dir, '..', '..', 'BUILD_ID'), 'utf8').trim() } catch { return null } }
const idA = buildId(a), idB = buildId(b)
const rsc = (h, id) => {
  const parts = [...h.matchAll(/<script>self\.__next_f\.push\(([\s\S]*?)\)<\/script>/g)].map((m) => m[1]).join('\n')
  return hashes(id ? parts.split(id).join('BUILD_ID') : parts)
}
const la = list(a), lb = new Set(list(b))
let docSame = 0, rscSame = 0
const docDiff = [], rscDiff = [], missing = []
for (const f of la) {
  if (!lb.has(f)) { missing.push(f); continue }
  const ha = fs.readFileSync(path.join(a, f), 'utf8'), hb = fs.readFileSync(path.join(b, f), 'utf8')
  if (doc(ha, idA) === doc(hb, idB)) docSame++
  else docDiff.push(f)
  if (rsc(ha, idA) === rsc(hb, idB)) rscSame++
  else rscDiff.push(f)
}
console.log(`A ${la.length}개 · B ${lb.size}개 · B에 없음 ${missing.length}${missing.length ? ': ' + missing.join(', ') : ''}`)
console.log(`L1 문서(주석 유지) 동일 ${docSame}/${la.length - missing.length} · 차이 ${docDiff.length}${docDiff.length ? ': ' + docDiff.slice(0, 30).join(', ') : ''}`)
console.log(`L2 RSC 페이로드 동일 ${rscSame}/${la.length - missing.length} · 차이 ${rscDiff.length}${rscDiff.length ? ' (앞 10개: ' + rscDiff.slice(0, 10).join(', ') + ')' : ''}`)
if (flag === '--show' && showFile) {
  const x = rsc(fs.readFileSync(path.join(a, showFile), 'utf8'), idA).split(/(?<=\\n)/), y = rsc(fs.readFileSync(path.join(b, showFile), 'utf8'), idB).split(/(?<=\\n)/)
  const sx = new Set(x), sy = new Set(y)
  console.log(`== ${showFile} RSC 줄 ${x.length} → ${y.length}`)
  for (const l of x) if (!sy.has(l)) console.log('- ' + l.slice(0, 400))
  for (const l of y) if (!sx.has(l)) console.log('+ ' + l.slice(0, 400))
}
