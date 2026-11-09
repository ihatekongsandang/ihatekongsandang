// 리뷰어 54 — 업로더 17 이니셜 전환 결과의 이름 잔존 검사.
// 사용: node docs/tools/reviewer-54/name-residual-scan.mjs <저장소 밖 이름 패턴 TSV>
//   TSV 한 줄: `키<TAB>정규식(JS, u 플래그)<TAB>범위(* = 전체, 그 밖 = 경로에 이 글자가 든 파일만)`
// 이름은 이 파일·출력에 쓰지 않는다. 출력은 키·파일:줄·건수만.
// 검사 대상: ① content/posts·content/posts-en 전 파일 ② git 추적 + 미추적(무시 제외) 텍스트 파일 중 content/ 밖.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const [tsv] = process.argv.slice(2)
if (!tsv) { console.error('usage: name-residual-scan.mjs <patterns.tsv>'); process.exit(2) }
const root = process.cwd()
const rows = fs.readFileSync(tsv, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => {
  const [key, re, scope] = l.split('\t')
  return { key, re: new RegExp(re, 'u'), scope: (scope ?? '*').trim() }
})
const list = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).split('\0').filter(Boolean)
const files = [...new Set([...list(['ls-files', '-z']), ...list(['ls-files', '-z', '--others', '--exclude-standard'])])]
  .filter((f) => fs.existsSync(path.join(root, f)) && fs.statSync(path.join(root, f)).isFile())
const SKIP = new Set(['content/moved-ids.txt', 'content/retired-ids.txt'])
let textCount = 0, postCount = 0
const hits = new Map(rows.map((r) => [r.key, []]))
for (const f of files.sort()) {
  const buf = fs.readFileSync(path.join(root, f))
  if (buf.includes(0)) continue // 이진 파일
  textCount++
  if (/^content\/posts(-en)?\/.*\.md$/.test(f)) postCount++
  const lines = buf.toString('utf8').split('\n')
  for (const r of rows) {
    if (r.scope !== '*' && !f.includes(r.scope)) continue
    lines.forEach((line, i) => { if (r.re.test(line)) hits.get(r.key).push(`${SKIP.has(f) ? '(id 목록) ' : ''}${f}:${i + 1}`) })
  }
}
console.log(`검사 텍스트 파일 ${textCount}개 (그중 게시물 ${postCount}개)`)
for (const r of rows) {
  const h = hits.get(r.key)
  const inPosts = h.filter((x) => /^content\/posts/.test(x)).length
  console.log(`\n[${r.key}] 범위 ${r.scope === '*' ? '전체' : '경로 한정'} · 전체 ${h.length}줄 · 게시물 ${inPosts}줄`)
  for (const x of h) console.log(`  ${x}`)
}
