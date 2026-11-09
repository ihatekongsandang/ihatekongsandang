// 리뷰어 54 — 리뷰어 52 부록(N1·N1S·D6)의 파일:줄이 업로더 17에서 전부 바뀌었는지 확인한다.
// 사용: node docs/tools/reviewer-54/appendix-line-check.mjs
// 부록의 가린 경로(`…`)는 같은 폴더 파일명으로 맞추고, 옛 id는 moved-ids.txt로 새 파일에 잇는다.
// 각 위치에서 HEAD 줄과 현재 줄이 다른지만 본다(이름은 읽지도 출력하지도 않는다). 줄 수가 HEAD와 다르면 따로 표시한다.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const trig = fs.readFileSync('docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md', 'utf8')
const appendix = trig.slice(trig.indexOf('## 부록'))
const moved = new Map(fs.readFileSync('content/moved-ids.txt', 'utf8').split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean).map((l) => l.split(/\s+/)))
const SKIP = new Set(['P020', 'P177']) // P020 보류(업로더 17), P177 채널명 유지(오더 4항)
let cur = null
const items = []
for (const line of appendix.split('\n')) {
  const h = line.match(/^- \[(N1S?|D6)\] (P\d+)/)
  if (h) { cur = { cls: h[1], p: h[2] }; continue }
  if (/^- \[/.test(line)) { cur = null; continue }
  const m = cur && line.match(/^\s+(content\/posts(?:-en)?)\/(.+?)\.md: (.+)$/)
  if (!m) continue
  for (const loc of m[3].split(', ')) {
    const n = loc.match(/^(\d+)\(/)
    items.push({ ...cur, dir: m[1], pat: m[2], line: n ? Number(n[1]) : null, field: loc })
  }
}
const git = (a) => { try { return execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 26 }) } catch { return null } }
const headFiles = git(['ls-tree', '--name-only', 'HEAD', 'content/posts/', 'content/posts-en/']).split('\n')
const resolve = (dir, pat) => {
  const re = new RegExp('^' + dir + '/' + pat.split('…').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.+') + '\\.md$')
  const hits = headFiles.filter((f) => re.test(f))
  return hits.length === 1 ? hits[0] : null
}
let ok = 0, bad = 0, skipped = 0, idOk = 0
const out = []
for (const it of items) {
  if (SKIP.has(it.p)) { skipped++; continue }
  const headPath = resolve(it.dir, it.pat)
  if (!headPath) { bad++; out.push(`?? 경로 해석 실패 ${it.p} ${it.dir}/${it.pat}`); continue }
  const oldId = headPath.replace(/^.*\//, '').replace(/\.md$/, '')
  const nowPath = moved.has(oldId) ? headPath.replace(oldId, moved.get(oldId)) : headPath
  const masked = nowPath.includes('…') ? nowPath : `${it.dir}/${it.pat}.md`
  if (it.line === null) { // id·파일명
    const pass = moved.has(oldId) && fs.existsSync(nowPath) && !fs.existsSync(headPath)
    pass ? idOk++ : bad++
    out.push(`${pass ? 'OK' : 'NG'} ${it.p} ${masked} id·파일명 → ${pass ? '이전됨' : '미이전'}`)
    continue
  }
  const before = git(['show', `HEAD:${headPath}`]).split('\n')
  const after = fs.readFileSync(nowPath, 'utf8').split('\n')
  const changed = before[it.line - 1] !== after[it.line - 1]
  const sameLen = before.length === after.length
  changed ? ok++ : bad++
  out.push(`${changed ? 'OK' : 'NG'} ${it.p} ${masked}:${it.line}${sameLen ? '' : ' (줄 수 변동)'}`)
}
console.log(`부록 위치 ${items.length}개 · 대상 ${items.length - skipped}개(P020·P177 ${skipped}개 제외) · 줄 바뀜 ${ok} · id 이전 ${idOk} · 미변경/실패 ${bad}`)
for (const l of out) console.log(l)
