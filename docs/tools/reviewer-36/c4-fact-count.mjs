// 리뷰 36: C4 소개 문구의 사실 근거 재집계 — content/posts/*.md frontmatter image.kind·caption.
// 실행: node docs/tools/reviewer-36/c4-fact-count.mjs (저장소 루트)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
const dir = 'content/posts'
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
const kind = {}
let withImage = 0, noImage = 0, captionOrig = 0, otherSelf = 0, gallery = 0
for (const f of files) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  if (Array.isArray(data.images) && data.images.length) gallery++
  if (!data.image) { noImage++; continue }
  withImage++
  const k = data.image.kind ?? '(없음)'
  kind[k] = (kind[k] ?? 0) + 1
  const cap = String(data.image.caption ?? '')
  if (cap.startsWith('원문')) captionOrig++
  else otherSelf++
}
console.log(`게시물 ${files.length} · 대표 이미지 있음 ${withImage} · 없음 ${noImage} · 갤러리 ${gallery}`)
console.log(`kind: ${JSON.stringify(kind)}`)
console.log(`caption '원문'으로 시작 ${captionOrig} · 그 밖 ${otherSelf}`)
