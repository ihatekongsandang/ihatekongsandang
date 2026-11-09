// 프로그래머 12 — content 전체(posts·posts-en)에서 og.description을 쓰는 게시물 수(리뷰 27 조건: 0 기대).
// 실행(저장소 루트): node docs/tools/programmer-12/og-description-count.mjs
// frontmatter를 gray-matter(기존 의존성)로 파싱해 og 객체에 description 키가 있는지(빈 값 포함)와 비어 있지 않은 값인지 따로 센다.
// 파서 판정과 별개로 원문 줄 단위 grep(`description:`이 og: 블록 안에 들여쓰기돼 있는지)도 교차 확인한다.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

let fail = 0
for (const dir of ['content/posts', 'content/posts-en']) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
  let key = 0, nonEmpty = 0, lineHits = 0
  const hits = []
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8')
    const { data } = matter(raw)
    const og = data.og
    if (og && typeof og === 'object' && 'description' in og) {
      key++
      if (String(og.description ?? '').trim()) nonEmpty++
      hits.push(f)
    }
    const fm = raw.split(/^---$/m)[1] ?? ''
    let inOg = false
    for (const line of fm.split('\n')) {
      if (/^og:\s*$/.test(line)) { inOg = true; continue }
      if (inOg && /^\S/.test(line)) inOg = false
      if (inOg && /^\s+description\s*:/.test(line)) lineHits++
    }
  }
  console.log(`${dir}: 파일 ${files.length} · og.description 키 ${key} · 값 있음 ${nonEmpty} · 줄 grep ${lineHits}${hits.length ? ' · ' + hits.join(', ') : ''}`)
  if (key || nonEmpty || lineHits) fail++
}
console.log(fail ? 'FAIL' : 'PASS  og.description 사용 0')
process.exit(fail ? 1 : 0)
