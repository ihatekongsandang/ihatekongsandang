/**
 * 프로그래머 15 — 픽스처 포함 빌드 결과에서 사진 설명(C1)이 어디에 나오고 어디에 나오지 않는지 전수 확인.
 * `fixture-build.sh`가 부른다. 사용: node caption-build-check.mjs <.next/server/app>
 *
 *  - ko/en × news/public 픽스처 상세: figcaption 첫 줄이 사진 설명(글자 그대로), 그다음 크레딧 줄
 *  - 사진 설명 글자가 나오는 빌드 파일(.html·.rsc·.body 전부)은 **그 픽스처 상세 페이지 자신**뿐(카드 피드·태그·sitemap·RSS 등 0)
 *  - 그 상세 페이지에서도 <head>(title·meta·og·twitter)·JSON-LD에는 0
 *  - `data-image-caption` 줄은 빌드 전체에서 픽스처 상세 4쪽에만
 */
import fs from 'node:fs'
import path from 'node:path'

const dir = process.argv[2]
let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
}
const files = walk(dir).filter((f) => /\.(html|rsc|body)$/.test(f))
const rel = (f) => path.relative(dir, f)
console.log(`검사 파일: .html ${files.filter((f) => f.endsWith('.html')).length} · .rsc ${files.filter((f) => f.endsWith('.rsc')).length} · .body ${files.filter((f) => f.endsWith('.body')).length}`)

const CASES = [
  { label: 'ko news', page: 'post/zz-fixture-news-image', caption: '2026년 11월 8일 국회 본회의장에서 예시 의원이 발언하는 모습(원 기사 사진 설명 기준).', credit: '사진: 예시일보 · 기사 원문' },
  { label: 'en news', page: 'en/post/zz-fixture-news-image', caption: 'A sample lawmaker speaking in the plenary hall on Nov. 8, 2026 (per the original photo caption).', credit: 'Photo: Example Daily · Source article' },
  { label: 'ko public', page: 'post/zz-fixture-public-image', caption: '2026년 11월 예시부 청사 전경(원 기사 사진 설명 기준).', credit: '사진: 예시부(공공누리 제1유형) · 원문 페이지' },
  { label: 'en public', page: 'en/post/zz-fixture-public-image', caption: 'The Ministry of Example building, November 2026 (per the original photo caption).', credit: 'Photo: Ministry of Example (KOGL Type 1) · Source page' },
]
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&#x27;/g, "'").replace(/&amp;/g, '&')

for (const c of CASES) {
  const html = fs.readFileSync(path.join(dir, `${c.page}.html`), 'utf8')
  const fig = html.match(/<figcaption data-credit=""[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
  const ps = [...fig.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => strip(m[1]))
  check(`${c.label} 상세: figcaption 첫 줄 = 사진 설명`, fig.startsWith('<p data-image-caption="">') && ps[0] === c.caption, JSON.stringify(ps[0]))
  check(`${c.label} 상세: 둘째 줄 = 크레딧 "${c.credit}"`, (ps[1] ?? '').startsWith(c.credit), JSON.stringify(ps[1]))
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
  check(`${c.label} 상세: <head>(title·meta·og·twitter)에 사진 설명 0`, head.length > 0 && !head.includes(c.caption))
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')
  check(`${c.label} 상세: JSON-LD에 사진 설명 0`, jsonLd.length > 0 && !jsonLd.includes(c.caption), `JSON-LD ${jsonLd.length}자`)
  const where = files.filter((f) => fs.readFileSync(f, 'utf8').includes(c.caption)).map(rel).sort()
  const own = [`${c.page}.html`, `${c.page}.rsc`].filter((f) => fs.existsSync(path.join(dir, f)))
  check(`${c.label}: 사진 설명이 나오는 빌드 파일 = 그 상세 페이지뿐`, JSON.stringify(where) === JSON.stringify(own.sort()), where.join(', '))
}
const withMarker = files.filter((f) => f.endsWith('.html') && fs.readFileSync(f, 'utf8').includes('data-image-caption')).map(rel).sort()
check('data-image-caption이 있는 HTML = 픽스처 상세 4쪽뿐', JSON.stringify(withMarker) === JSON.stringify(CASES.map((c) => `${c.page}.html`).sort()), withMarker.join(', '))

console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
