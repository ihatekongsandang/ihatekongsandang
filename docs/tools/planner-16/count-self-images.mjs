// 기획자 16: 게시물 대표 이미지 집계(읽기 전용). 저장소 루트에서 `node docs/tools/planner-16/count-self-images.mjs`.
// 출력: 전체 규모, 이미지 종류별 수, self 이미지의 caption·원문 호스트별 수, 로컬 파일 존재 수.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const dir = path.join(root, 'content', 'posts')
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
const tally = (m, k) => m.set(k, (m.get(k) ?? 0) + 1)
const byKind = new Map(), byCaption = new Map(), byHost = new Map(), bySrcType = new Map()
const rows = []
let noImage = 0, missingFile = 0, gallery = 0

for (const f of files) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  tally(bySrcType, data.sourceType ?? '(없음)')
  if (Array.isArray(data.images) && data.images.length) gallery++
  const img = data.image
  if (!img) { noImage++; tally(byKind, '(대표 이미지 없음)'); continue }
  const kind = img.kind ?? 'self'
  tally(byKind, kind)
  if (kind !== 'self') continue
  let host = '(sourceUrl 없음)'
  try { host = new URL(data.sourceUrl).hostname.replace(/^www\./, '') } catch {}
  const exists = typeof img.src === 'string' && img.src.startsWith('/') && fs.existsSync(path.join(root, 'public', img.src))
  if (!exists) missingFile++
  const cap = String(img.caption ?? '(caption 없음)')
  tally(byCaption, cap)
  tally(byHost, host)
  rows.push({ id: data.id, host, caption: cap, src: img.src, exists, sourceType: data.sourceType })
}
const show = (title, m) => { console.log(`\n## ${title}`); for (const [k, v] of [...m].sort((a, b) => b[1] - a[1])) console.log(`${v}\t${k}`) }
console.log(`전체 게시물 ${files.length}건 (images[] 갤러리가 있는 글 ${gallery}건)`)
show('sourceType', bySrcType)
show('대표 이미지 kind', byKind)
show('self 이미지 — caption', byCaption)
show('self 이미지 — sourceUrl 호스트', byHost)
console.log(`\nself 이미지 ${rows.length}건 중 로컬 파일 없음 ${missingFile}건`)
const out = process.env.SELF_TSV ?? path.join(os.tmpdir(), 'planner16-self-images.tsv')
fs.writeFileSync(out, ['id\thost\tcaption\tsrc\texists\tsourceType', ...rows.map((r) => [r.id, r.host, r.caption, r.src, r.exists, r.sourceType].join('\t'))].join('\n') + '\n')
console.log(`중간 파일: ${out}`)
