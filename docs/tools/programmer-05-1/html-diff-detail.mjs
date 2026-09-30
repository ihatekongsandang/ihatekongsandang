/**
 * 프로그래머 05-1 — 두 빌드의 같은 HTML 파일을 "보이는 문서 + JSON-LD" 기준으로 정규화한 뒤 달라진 조각만 출력한다.
 * 정규화 규칙은 `docs/tools/reviewer-10/html-same.mjs`와 같다(주석·일반 스크립트·preload/stylesheet 링크·청크 해시 제거).
 *   node docs/tools/programmer-05-1/html-diff-detail.mjs <A app 폴더> <B app 폴더> <상대 경로.html> [...]
 * 태그 경계로 잘라 LCS로 비교하고, 빠진 줄은 `-`, 더해진 줄은 `+`로 찍는다.
 */
import fs from 'node:fs'
import path from 'node:path'
const [a, b, ...files] = process.argv.slice(2)
const n = (h) => h.replace(/<!--[^>]*-->/g, '')
  .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/g, (m, attrs) => (/type="application\/ld\+json"/.test(attrs) ? m : ''))
  .replace(/<link rel="(?:preload|stylesheet)"[^>]*>/g, '')
  .replace(/\/_next\/static\/[^"')\s]+/g, '*')
  .replace(/(opengraph-image|icon\.svg)\?[0-9a-f]+/g, '$1?*')
const tokens = (h) => n(h).split(/(?=<)/)
for (const f of files) {
  const x = tokens(fs.readFileSync(path.join(a, f), 'utf8'))
  const y = tokens(fs.readFileSync(path.join(b, f), 'utf8'))
  const dp = Array.from({ length: x.length + 1 }, () => new Uint32Array(y.length + 1))
  for (let i = x.length - 1; i >= 0; i--) for (let j = y.length - 1; j >= 0; j--) dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
  const out = []
  let i = 0, j = 0
  while (i < x.length && j < y.length) {
    if (x[i] === y[j]) { i++; j++ } else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push('- ' + x[i++]) } else { out.push('+ ' + y[j++]) }
  }
  while (i < x.length) out.push('- ' + x[i++])
  while (j < y.length) out.push('+ ' + y[j++])
  console.log(`== ${f} — 조각 ${x.length} → ${y.length}, 변경 ${out.length}`)
  for (const line of out) console.log(line)
}
