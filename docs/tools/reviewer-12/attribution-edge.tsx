/**
 * 리뷰어 12 — P2-A·P2-B 경고의 모서리 관찰 + 실데이터 전수 오탐 검사.
 *
 * 사용: npx tsx --tsconfig docs/tools/reviewer-12/tsconfig.json docs/tools/reviewer-12/attribution-edge.tsx
 *
 * 1. 실데이터 전수: 한국어 게시물 전부(129)의 원본 attribution을 그대로 영어 표기로 넣었을 때
 *    핸들 경고(누락·추가)가 0이어야 한다 — 핸들 정규식이 실제 표기에서 오탐하지 않는지.
 * 2. 모서리(관찰): 끝 마침표·이메일·Date·빈 문자열·원본 발언자 없음 + speakerAffiliation 비문자열.
 * 관찰 항목은 PASS/FAIL이 아니라 출력만 한다. 실데이터 오탐이 있으면 종료 코드 1.
 */
import { getAllPosts } from '../../../src/lib/content/load'
import { validateTranslation } from '../../../src/lib/content/translation'

const posts = getAllPosts()
const HANDLE_NOTICE = /계정 핸들/
let falsePositives = 0
let withHandles = 0
for (const post of posts) {
  const r = validateTranslation(
    { id: post.id, title: 'T', description: 'D', translatedAt: '2026-09-30', attribution: post.attribution },
    'Body',
    `${post.id}.md`,
    post,
  )
  if (/@[A-Za-z0-9._]+/.test(post.attribution)) withHandles += 1
  const hits = r.notices.filter((n) => HANDLE_NOTICE.test(n))
  if (hits.length) {
    falsePositives += 1
    console.log(`오탐 ${post.id}: ${post.attribution} → ${hits.join(' / ')}`)
  }
}
console.log(`[실데이터] 게시물 ${posts.length} · 핸들 포함 attribution ${withHandles} · 원본 그대로 넣었을 때 핸들 경고 ${falsePositives}건`)

const sample = posts.find((p) => /@[A-Za-z0-9_]+/.test(p.attribution)) ?? posts[0]
const noSpeaker = posts.find((p) => !p.speaker) ?? posts[0]
const run = (label: string, data: Record<string, unknown>, original = sample) => {
  const r = validateTranslation(
    { id: original.id, title: 'T', description: 'D', translatedAt: '2026-09-30', ...data },
    'Body',
    `${original.id}.md`,
    original,
  )
  console.log(`[관찰] ${label}\n  errors ${r.errors.length}(${r.errors.map((e) => e.split(':')[0]).join(',')}) · notices: ${r.notices.join(' / ') || '(없음)'}`)
}
console.log(`[관찰 기준 원본] ${sample.id} — attribution "${sample.attribution}"`)
const handle = (sample.attribution.match(/@[A-Za-z0-9._]+/) ?? ['@x'])[0]
run('핸들 뒤 마침표', { attribution: `Instagram ${handle}.` })
run('이메일 주소 포함', { attribution: `Instagram ${handle} (contact: editor@example.com)` })
run('Date 값', { attribution: new Date('2026-09-30') })
run('빈 문자열', { attribution: '' })
run('발언자 없는 원본에 speakerAffiliation 숫자', { speakerAffiliation: 1 }, noSpeaker)
process.exit(falsePositives ? 1 : 0)
