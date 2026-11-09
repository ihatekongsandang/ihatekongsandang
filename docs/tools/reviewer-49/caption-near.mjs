// 리뷰어 49: fetch-og.mjs가 받은 폴더(인자)에서 og:image 파일명이 본문에 나오는 첫 자리의 원문 HTML(태그 제거 전 꺾쇠 크레딧 검사)과 앞뒤 글자를 출력한다(읽기 전용).
// 사용: node docs/tools/reviewer-49/caption-near.mjs <fetch-og 폴더> <번호...>
import fs from 'node:fs'
const [dir, ...ns] = process.argv.slice(2)
const idx = fs.readFileSync(`${dir}/index.tsv`, 'utf8').trim().split('\n').slice(1).map((l) => l.split('\t'))
for (const n of ns) {
  const r = idx.find((x) => x[0] === n); const og = r[4]
  const base = og.split('/').pop().split('?')[0].replace(/_(Z1|R|P1|P3|e|t)\.(jpg|png)$/, '').replace(/\.(jpg|png)$/, '')
  const t = fs.readFileSync(`${dir}/${n}.html`, 'utf8')
  const pos = []; let i = -1
  while ((i = t.indexOf(base, i + 1)) !== -1) pos.push(i)
  // body hits: skip those in <head>
  const headEnd = t.indexOf('</head>')
  const body = pos.filter((p) => p > headEnd)
  console.log(`[${n}] base=${base} hits=${pos.length} body=${body.length}`)
  if (body.length) {
    const p = body[0]
    const raw = t.slice(p, p + 2500)
    // raw (태그 유지) 안의 꺾쇠 크레딧 확인
    const ang = raw.match(/&lt;[^&]{1,40}&gt;|<사진[^>]{0,40}>/g)
    console.log('  angle:', ang ? ang.join(' | ') : '없음')
    console.log('  text:', raw.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 400))
  }
}
