// 리뷰어 34-1: 기획자 16-1 묶음 재배정 재확인(읽기 전용, 기획자 도구를 쓰지 않음).
// 실행(저장소 루트): node docs/tools/reviewer-34-1/recheck-batches.mjs [게시물 폴더=content/posts]
// 1) 새 TSV 행·고유 id·묶음 합·Tier 수  2) 리뷰 34가 지목한 11건(tier3-annotated-output.txt의 날짜+caption)이 묶음 1·2에 있는지
// 3) TSV id 집합 = 리뷰 34 규칙으로 다시 센 A 집합(옛 TSV는 리뷰 34가 A와 같다고 확인했으므로 A 대조로 옛 집합 동일을 확인)
// 4) 묶음 4~14 최신순 역전 수, 묶음 크기 목록
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import matter from 'gray-matter'

const root = process.cwd()
const dir = path.resolve(process.argv[2] ?? path.join(root, 'content/posts'))
const tsv = fs.readFileSync(path.join(root, 'docs/tools/planner-16/sns-image-batches.tsv'), 'utf8').trim().split('\n')
const head = tsv[0].split('\t')
const rows = tsv.slice(1).map((l) => { const c = l.split('\t'); return Object.fromEntries(head.map((h, i) => [h, c[i]])) })
const ids = rows.map((r) => r.id)
const uniq = new Set(ids)
const per = {}; const tier = {}
for (const r of rows) { per[r.batch] = (per[r.batch] ?? 0) + 1; tier[r.tier] = (tier[r.tier] ?? 0) + 1 }
console.log(`TSV 헤더: ${head.join(',')}`)
console.log(`TSV 행 ${rows.length} / 고유 id ${uniq.size} / 중복 ${rows.length - uniq.size}`)
console.log(`묶음별: ${Object.keys(per).sort((a, b) => a - b).map((k) => `${k}:${per[k]}`).join(' ')} → 묶음 수 ${Object.keys(per).length} · 합 ${Object.values(per).reduce((a, b) => a + b, 0)}`)
console.log(`Tier별: ${Object.entries(tier).sort().map(([k, v]) => `${k} ${v}`).join(' · ')}`)
// Tier와 묶음의 대응
const tb = {}; for (const r of rows) { const k = `${r.batch}/${r.tier}`; tb[k] = (tb[k] ?? 0) + 1 }
console.log(`묶음/Tier: ${Object.entries(tb).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([k, v]) => `${k}=${v}`).join(' ')}`)

// 2) 리뷰 34 지목 11건
const flagged = fs.readFileSync(path.join(root, 'docs/tools/reviewer-34/tier3-annotated-output.txt'), 'utf8').trim().split('\n').map((l) => { const [oldBatch, , date, caption] = l.split('\t'); return { oldBatch, date, caption } })
let in12 = 0, notFound = 0, multi = 0
const flaggedIds = new Set()
for (const f of flagged) {
  const m = rows.filter((r) => r.publishedAt === f.date && r.caption === f.caption)
  if (m.length === 0) { notFound++; console.log(`  못 찾음: ${f.date} ${f.caption}`); continue }
  if (m.length > 1) { multi++; console.log(`  여러 행 일치(${m.length}): ${f.date} ${f.caption}`) }
  for (const r of m) { flaggedIds.add(r.id); if (r.batch === '1' || r.batch === '2') in12++; console.log(`  옛 묶음 ${f.oldBatch} → 새 묶음 ${r.batch} (${r.tier}) ${f.date} ${f.caption.slice(0, 30)}`) }
}
console.log(`리뷰 34 지목 ${flagged.length}건: 묶음 1·2 ${in12} · 못 찾음 ${notFound} · 여러 행 ${multi}`)
const b1 = rows.filter((r) => r.batch === '1'), b2 = rows.filter((r) => r.batch === '2')
console.log(`묶음 1의 지목 건 ${b1.filter((r) => flaggedIds.has(r.id)).length}/${b1.length} · 묶음 2의 지목 건 ${b2.filter((r) => flaggedIds.has(r.id)).length}/${b2.length}`)
// 지목 11건 외에 위험 표기로 올라간 건이 있는지(묶음 1·2의 지목 외 행 caption)
for (const r of [...b1, ...b2].filter((r) => !flaggedIds.has(r.id))) console.log(`  묶음 ${r.batch} 지목 외: ${r.publishedAt} ${r.caption.slice(0, 50)}`)

// 3) A 집합 독립 재계산(리뷰 34 규칙)
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
const hash = crypto.createHash('sha256')
const A = new Set(); let B = 0, U = 0
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8'); hash.update(f + '\0' + raw + '\0')
  const { data } = matter(raw); const cap = String(data.image?.caption ?? '')
  if (/자체 제작|직접 만든/.test(cap)) B++
  else if (/^원문/.test(cap) || /^스레드 /.test(cap)) A.add(String(data.id))
  else U++
}
const onlyT = [...uniq].filter((x) => !A.has(x)), onlyA = [...A].filter((x) => !uniq.has(x))
console.log(`게시물 폴더 sha256 ${hash.digest('hex').slice(0, 16)} · 전체 ${files.length} · A ${A.size} + B ${B} + 미분류 ${U}`)
console.log(`TSV에만 ${onlyT.length} / A에만 ${onlyA.length}`)
// TSV의 publishedAt·caption이 게시물과 같은지
let capDiff = 0
for (const r of rows) { const p = path.join(dir, r.id + '.md'); if (!fs.existsSync(p)) { capDiff++; continue } const { data } = matter(fs.readFileSync(p, 'utf8')); if (String(data.image?.caption ?? '') !== r.caption) capDiff++ }
console.log(`TSV caption ≠ 게시물 caption: ${capDiff}`)

// 4) 묶음 4~14 Tier 3 최신순 역전
const t3 = rows.filter((r) => r.tier === 'T3')
let inv = 0; for (let i = 1; i < t3.length; i++) if (t3[i].publishedAt > t3[i - 1].publishedAt) inv++
console.log(`T3 ${t3.length}행 최신순 역전 ${inv} · T3 첫 행 묶음 ${t3[0]?.batch} · T2 묶음 ${[...new Set(rows.filter((r) => r.tier === 'T2').map((r) => r.batch))].join(',')}`)
