// 기획자 16: 원문 SNS 이미지 저장본 139건을 위험 단계(Tier)·묶음으로 나눈다(읽기 전용).
// 실행(저장소 루트): node docs/tools/planner-16/count-self-images.mjs && node docs/tools/planner-16/make-batches.mjs
// 분류는 이미지 내용을 보지 않고 `image.caption` 문구로만 한 것이다 — 묶음 작업 때 담당자가 이미지를 직접 보고 확정한다.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const tsv = process.env.SELF_TSV ?? path.join(os.tmpdir(), 'planner16-self-images.tsv')
const rows = fs.readFileSync(tsv, 'utf8').trim().split('\n').slice(1).map((l) => {
  const [id, host, caption] = l.split('\t')
  return { id, host, caption }
})
// '원문…'으로 시작하지만 사이트가 직접 만든 요약 이미지(caption에 '직접 만든')인 1건은 저장본이 아니므로 뺀다.
const stored = rows.filter((r) => (/^원문/.test(r.caption) && !/직접 만든/.test(r.caption)) || /jwapaloma/.test(r.caption))

function kind(c) {
  if (RISK.test(c)) return 'T1'
  // 판정 순서가 결과를 바꾼다(삽화 문구가 '현장'을 함께 쓰는 건이 있다): 방송·기사·영상 → 타 제작 카드 → 삽화·연출 → 현장 사진.
  if (/뉴스 화면|중계 화면|기사 캡처|뉴데일리|국회 기자회견|MBN|TV조선|영상|릴스|다른 계정|핀프|국민의힘 제작/.test(c)) return 'T1'
  if (/삽화|연출/.test(c)) return 'T2'
  if (/jwapaloma|현장/.test(c)) return 'T1'
  return 'T3'
}
// 🆕 16-1(리뷰 34 P2-4): 자막·문구가 보도와 다르거나 단정적 / 다른 시점 장면·뉴스 표기 / 제3자 글 캡처 표기 11건은 일반(T3)이 아니라 T1로 올리고, T1 안에서도 맨 앞에 둔다.
const RISK = /보도 ?(된|내용)|단정적|실제 발언이 아닌|긴급속보|2019년 8월 31일|다시보는 과거 뉴스|스레드 글 캡처|SNS 게시글 캡처|게시자의 표현/
const label = { T1: '1(언론 화면·영상 장면·타 제작 카드·현장 사진 가능성)', T2: '2(삽화·연출 이미지)', T3: '3(일반)' }
const items = stored.map((r) => {
  const { data } = matter(fs.readFileSync(path.join(root, 'content/posts', r.id + '.md'), 'utf8'))
  return { ...r, tier: kind(r.caption), publishedAt: String(data.publishedAt instanceof Date ? data.publishedAt.toISOString().slice(0, 10) : data.publishedAt) }
})
// Tier 1(위험 표기 11건 먼저) → 2 → 3 순. Tier 3은 최신순(피드 첫 화면에 보이는 카드부터). 같은 날짜면 id 순.
const order = { T1: 1, T2: 2, T3: 3 }
const risk = (x) => (RISK.test(x.caption) ? 0 : 1)
items.sort((a, b) => order[a.tier] - order[b.tier] || (a.tier === 'T1' ? risk(a) - risk(b) : 0) || (a.tier === 'T3' ? b.publishedAt.localeCompare(a.publishedAt) : a.publishedAt.localeCompare(b.publishedAt)) || a.id.localeCompare(b.id))
// 묶음(16-1): Tier 1 29건(위험 표기 11 + 기존 18)은 10+10+9, 이후 110건은 10건씩 열한 묶음. 14묶음, 합 139.
const t1 = items.filter((x) => x.tier === 'T1').length
if (t1 !== 29) throw new Error(`Tier 1이 ${t1}건 — 묶음 크기 규칙(10+10+9)을 다시 정해야 한다`)
const rest = items.length - 29
if (rest !== 110) throw new Error(`나머지 ${rest}건 — 묶음 크기 규칙(10×11)을 다시 정해야 한다`)
const sizes = [10, 10, 9, ...Array(11).fill(10)]
let i = 0
const out = ['batch\ttier\tid\tpublishedAt\thost\tcaption']
sizes.forEach((n, b) => { for (let k = 0; k < n; k++, i++) { const it = items[i]; out.push([b + 1, it.tier, it.id, it.publishedAt, it.host, it.caption].join('\t')) } })
fs.writeFileSync(path.join(root, 'docs/tools/planner-16/sns-image-batches.tsv'), out.join('\n') + '\n')
const byTier = items.reduce((m, x) => (m[x.tier] = (m[x.tier] ?? 0) + 1, m), {})
console.log(`원문 SNS 이미지 저장본 ${items.length}건 → 묶음 ${sizes.length}개(${sizes.join('+')}) / Tier별 ${Object.entries(byTier).map(([k, v]) => `${label[k]} ${v}`).join(' · ')}`)
console.log(`묶음 건수 합계 ${sizes.reduce((a, b) => a + b, 0)} = 대상 ${items.length}`)
