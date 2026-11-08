// 리뷰어 26: content frontmatter 전수 집계 (og.title·og.description·updatedAt·sourceType)
// 실행: node docs/tools/reviewer-26/content-counts.mjs  (저장소 루트에서)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
for (const dir of ['content/posts', 'content/posts-en']) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
  const c = { files: files.length, ogTitle: 0, ogDesc: 0, updatedAt: 0, nonUrl: 0 }
  const upd = []
  for (const f of files) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
    if (data.og?.title) c.ogTitle++
    if (data.og?.description) c.ogDesc++
    if (data.updatedAt) { c.updatedAt++; upd.push(`${String(data.updatedAt instanceof Date ? data.updatedAt.toISOString().slice(0,10) : data.updatedAt)} ${f}`) }
    if (data.sourceType && data.sourceType !== 'url') c.nonUrl++
  }
  console.log(dir, JSON.stringify(c))
  for (const u of upd.sort()) console.log('  updatedAt', u)
}
