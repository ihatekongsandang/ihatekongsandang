// 리뷰어 34: 기획자 16 집계(139 + 68 = 207)의 독립 재현(읽기 전용).
// 저장소 루트에서 `node docs/tools/reviewer-34/recount-sns-images.mjs`.
// 기획자 도구를 쓰지 않고 분류 규칙을 따로 세워 전수 분류한 뒤, 묶음 배정 TSV와 집합 대조한다.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import matter from 'gray-matter'

const root = process.cwd()
const dir = path.join(root, 'content', 'posts')
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
const tally = (m, k) => m.set(k, (m.get(k) ?? 0) + 1)
const hash = crypto.createHash('sha256')

// 분류 규칙(리뷰어 34):
//  B(사이트 제작) = caption에 "자체 제작" 또는 "직접 만든"이 있다
//  A(SNS 원 게시물 이미지 저장) = B가 아니고, caption이 "원문" 또는 "스레드 "로 시작한다
//  U(미분류) = 그 밖(0건이어야 한다)
const A = [], B = [], U = []
const aHost = new Map(), aSrcPrefix = new Map(), kinds = new Map()
let missingFile = 0, galleries = 0
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8')
  hash.update(f + '\0' + raw + '\0')
  const { data } = matter(raw)
  if (Array.isArray(data.images) && data.images.length) galleries++
  const img = data.image
  tally(kinds, img ? (img.kind ?? '(kind 생략=self)') : '(image 없음)')
  const cap = String(img?.caption ?? '')
  const id = String(data.id)
  if (`${id}.md` !== f) U.push(`${f}\t파일명≠id`)
  let host = '(없음)'
  try { host = new URL(data.sourceUrl).hostname.replace(/^www\./, '') } catch {}
  const src = String(img?.src ?? '')
  if (src && !fs.existsSync(path.join(root, 'public', src))) missingFile++
  if (/자체 제작|직접 만든/.test(cap)) B.push(id)
  else if (/^원문/.test(cap) || /^스레드 /.test(cap)) {
    A.push(id); tally(aHost, host); tally(aSrcPrefix, src.startsWith(`/images/${id}/`) ? '/images/{id}/' : src)
  } else U.push(`${id}\t${cap}`)
}
const show = (t, m) => { console.log(`## ${t}`); for (const [k, v] of [...m].sort((a, b) => b[1] - a[1])) console.log(`${v}\t${k}`) }
console.log(`content/posts 스냅숏 sha256 ${hash.digest('hex').slice(0, 16)} (업로더 작업 중간 상태 구분용)`)
console.log(`전체 ${files.length} / 갤러리 있는 글 ${galleries} / 대표 이미지 파일 없음 ${missingFile}`)
show('image.kind', kinds)
console.log(`A ${A.length} + B ${B.length} + 미분류 ${U.length} = ${A.length + B.length + U.length} (전체 ${files.length})`)
for (const u of U) console.log(`  미분류: ${u}`)
show('A의 sourceUrl 호스트', aHost)
show('A의 image.src 위치', aSrcPrefix)

// 묶음 배정 TSV 대조
const tsv = fs.readFileSync(path.join(root, 'docs/tools/planner-16/sns-image-batches.tsv'), 'utf8').trim().split('\n').slice(1).map((l) => l.split('\t'))
const perBatch = new Map(), perTier = new Map()
for (const r of tsv) { tally(perBatch, Number(r[0])); tally(perTier, r[1]) }
const tsvIds = tsv.map((r) => r[2])
const tsvSet = new Set(tsvIds), aSet = new Set(A)
const dup = tsvIds.length - tsvSet.size
const onlyTsv = [...tsvSet].filter((x) => !aSet.has(x)), onlyA = A.filter((x) => !tsvSet.has(x))
console.log(`\nTSV 행 ${tsv.length} / 고유 id ${tsvSet.size} / 중복 ${dup}`)
console.log(`묶음별: ${[...perBatch].sort((a, b) => a[0] - b[0]).map(([b, n]) => `${b}:${n}`).join(' ')} → 합 ${[...perBatch.values()].reduce((a, b) => a + b, 0)}`)
console.log(`Tier별: ${[...perTier].map(([t, n]) => `${t} ${n}`).join(' · ')}`)
console.log(`TSV에만 있음 ${onlyTsv.length} / A에만 있음 ${onlyA.length}`)
for (const x of onlyTsv) console.log(`  TSV에만: ${x}`)
for (const x of onlyA) console.log(`  A에만: ${x}`)
// 묶음 4~14가 최신순인지(publishedAt 내림차순) 확인
const t3 = tsv.filter((r) => Number(r[0]) >= 4)
let orderBreaks = 0
for (let i = 1; i < t3.length; i++) if (t3[i][3] > t3[i - 1][3]) orderBreaks++
console.log(`묶음 4~14 행 ${t3.length}, 최신순 역전 ${orderBreaks}`)
