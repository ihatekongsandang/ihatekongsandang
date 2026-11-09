// 리뷰어 34: caption "자체 제작" 게시물 집합과 리뷰 30 post-recheck.tsv의 67건 id 집합 대조(읽기 전용).
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
const dir = path.join(process.cwd(), 'content', 'posts')
const self = new Set()
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  if (/자체 제작/.test(String(data.image?.caption ?? ''))) self.add(String(data.id))
}
const lines = fs.readFileSync('docs/tools/reviewer-30/post-recheck.tsv', 'utf8').trim().split('\n')
const head = lines[0].split('\t'); const col = head.findIndex((h) => /^id$/i.test(h))
const r30 = new Set(lines.slice(1).map((l) => l.split('\t')[col < 0 ? 0 : col]).filter(Boolean))
const a = [...self].filter((x) => !r30.has(x)).length, b = [...r30].filter((x) => !self.has(x)).length
console.log(`자체 제작 ${self.size} / 리뷰30 ${r30.size} / 자체제작에만 ${a} / 리뷰30에만 ${b} (id 열 ${col < 0 ? '0(헤더 없음)' : head[col]})`)
