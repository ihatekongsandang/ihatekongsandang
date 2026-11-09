// 리뷰어 50: caption-near.mjs 보완. og:image 파일명 그대로는 본문에 없는 매체(뉴스1 `high.jpg`·썸네일 `_v150`·`_tc` 등)를 위해
// 사진 번호(경로의 숫자 칸·파일명 앞부분)로 본문 사진 자리를 찾아 태그 제거 전 원문 HTML의 꺾쇠 크레딧과 앞뒤 글자를 출력한다(읽기 전용).
// 사용: node docs/tools/reviewer-50/caption-find.mjs <fetch-og 폴더> <번호...>
// 출력에 사진 기자 이름이 섞일 수 있어 저장소에 저장하지 않는다.
import fs from 'node:fs'
const [dir, ...ns] = process.argv.slice(2)
const idx = fs.readFileSync(`${dir}/index.tsv`, 'utf8').trim().split('\n').slice(1).map((l) => l.split('\t'))
const keys = (og) => {
  const u = og.split('?')[0]
  const parts = u.split('/')
  const file = parts.pop().replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
  const out = [file]
  const stripped = file.replace(/_(Z1|R|P1|P3|P4|O2|e|t|t1|l|web|BIG|tc|v150|m_1|\d+_tc|\d+_v150)$/i, '')
  out.push(stripped)
  const m = stripped.match(/^(\d+_\d+)_\d+$/) // 3620751_3782330_211 → 3620751_3782330
  if (m) out.push(m[1])
  if (/^\d{10,}$/.test(stripped)) out.push(stripped.slice(0, 12))
  if (file === 'high' || file === 'original') out.push(parts.slice(-1)[0]) // news1: …/photos/2024/4/22/6609511/high.jpg
  return [...new Set(out.filter((x) => x && x.length >= 6))]
}
for (const n of ns) {
  const r = idx.find((x) => x[0] === n)
  if (!r || !r[4]) { console.log(`[${n}] og:image 없음`); continue }
  const t = fs.readFileSync(`${dir}/${n}.html`, 'utf8')
  const headEnd = t.indexOf('</head>')
  let hit = -1, used = ''
  for (const k of keys(r[4])) {
    let i = -1
    while ((i = t.indexOf(k, i + 1)) !== -1) if (i > headEnd) { hit = i; used = k; break }
    if (hit !== -1) break
  }
  console.log(`[${n}] keys=${keys(r[4]).join(',')} hit=${hit === -1 ? '없음' : used}`)
  if (hit === -1) continue
  const raw = t.slice(Math.max(0, hit - 300), hit + 2500)
  const ang = raw.match(/&lt;[^&]{1,40}&gt;|<사진[^>]{0,40}>/g)
  console.log('  angle:', ang ? ang.join(' | ') : '없음')
  console.log('  text:', t.slice(hit, hit + 2500).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 450))
}
