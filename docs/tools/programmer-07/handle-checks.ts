/**
 * 프로그래머 07 — 출처 표기 핸들 정규식(`handlesIn`, 리뷰 12 P2-2) 단위 검사 + 실데이터 전수 비교.
 *
 * 사용: npx tsx docs/tools/programmer-07/handle-checks.ts   (저장소 루트에서)
 *
 * 1. 모서리 단위 검사: 끝 마침표 · 이메일 · 괄호 · 점이 든 핸들 등 → 기대 목록과 정확히 같아야 한다.
 * 2. validateTranslation 경유: 원본 핸들 + 끝 마침표 / 이메일 덧붙임에 핸들 경고가 0이어야 한다(리뷰 12가 본 잘못된 경고).
 * 3. 실데이터 전수: content/posts·content/posts-en 전 파일의 attribution을 옛 정규식과 새 정규식으로 뽑아 비교한다.
 *    두 결과가 다른 파일은 하나씩 출력한다(오탐이 줄어든 것인지 눈으로 확인). 실데이터에서 두 결과가 같으면 기존 경고 결과도 같다.
 * 4. 실데이터 전수: 영어본마다 validateTranslation(영어본 그대로, 원본 대비)을 돌려 핸들 경고 수를 센다.
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getAllPosts } from '../../../src/lib/content/load'
import { handlesIn, validateTranslation } from '../../../src/lib/content/translation'

const OLD = (text: string) => text.match(/@[A-Za-z0-9._]+/g) ?? []
let pass = 0
let fail = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`)
}
const same = (a: string[], b: string[]) => a.length === b.length && a.every((v, i) => v === b[i])

// 1. 모서리
const cases: [string, string[]][] = [
  ['@2.pro.official.', ['@2.pro.official']],
  ['Instagram @2.pro.official.', ['@2.pro.official']],
  ['editor@example.com', []],
  ['Instagram @a_b (contact: editor@example.com)', ['@a_b']],
  ['(@a_b)', ['@a_b']],
  ['@a.b', ['@a.b']],
  ['@a..', ['@a']],
  ['@.', []],
  ['@', []],
  ['john_@example.com', []],
  ['first.last+tag@example.co.kr', []],
  ['인스타그램@im_nowandhere', ['@im_nowandhere']],
  ['인스타그램 @im_nowandhere (나우앤히어)', ['@im_nowandhere']],
  ['@kim_1 · @lee.2', ['@kim_1', '@lee.2']],
  ['스레드 @a_b, @c.d.', ['@a_b', '@c.d']],
  ['@Upper.Case_9', ['@Upper.Case_9']],
]
for (const [input, expected] of cases) {
  const got = handlesIn(input)
  check(`모서리 ${JSON.stringify(input)}`, same(got, expected), `기대 ${JSON.stringify(expected)} · 결과 ${JSON.stringify(got)}`)
}

// 2. validateTranslation 경유 — 리뷰 12가 본 잘못된 경고가 사라졌는지
const posts = getAllPosts()
const sample = posts.find((p) => handlesIn(p.attribution).length > 0)
if (!sample) throw new Error('핸들이 있는 게시물이 없어 기준 원본을 정할 수 없다')
const handle = handlesIn(sample.attribution)[0] ?? ''
const handleNotices = (attribution: string, original = sample) =>
  validateTranslation(
    { id: original.id, title: 'T', description: 'D', translatedAt: '2026-10-01', attribution },
    'Body',
    `${original.id}.md`,
    original,
  ).notices.filter((n) => /계정 핸들/.test(n))
console.log(`[기준 원본] ${sample.id} — "${sample.attribution}"`)
check('핸들 뒤 마침표 → 핸들 경고 0', handleNotices(`${sample.attribution}.`).length === 0, handleNotices(`${sample.attribution}.`).join(' / '))
check(
  '이메일 덧붙임 → 핸들 경고 0',
  handleNotices(`${sample.attribution} (contact: editor@example.com)`).length === 0,
  handleNotices(`${sample.attribution} (contact: editor@example.com)`).join(' / '),
)
check('핸들 빠짐 → 누락 경고 유지', handleNotices(sample.attribution.replace(handle, '')).length === 1)
check('다른 핸들 추가 → 추가 경고 유지', handleNotices(`${sample.attribution} @someone_else`).length === 1)

// 3. 실데이터 전수 — 옛 정규식 ↔ 새 정규식
const dirs = ['content/posts', 'content/posts-en']
let files = 0
let withAttribution = 0
let withHandles = 0
let handleCount = 0
const differ: string[] = []
for (const dir of dirs) {
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md').sort()) {
    files += 1
    const { data } = matter(fs.readFileSync(path.join(dir, name), 'utf8'))
    const attribution = (data as Record<string, unknown>).attribution
    if (typeof attribution !== 'string') continue
    withAttribution += 1
    const before = OLD(attribution)
    const after = handlesIn(attribution)
    if (after.length > 0) withHandles += 1
    handleCount += after.length
    if (!same(before, after)) differ.push(`${dir}/${name}: "${attribution}" 옛 ${JSON.stringify(before)} → 새 ${JSON.stringify(after)}`)
  }
}
console.log(
  `[실데이터] 파일 ${files}(${dirs.join(' + ')}) · attribution 문자열 ${withAttribution} · 핸들 포함 ${withHandles} · 핸들 ${handleCount}개`,
)
for (const line of differ) console.log(`  차이 ${line}`)
check('실데이터 옛/새 정규식 결과 차이 0', differ.length === 0, `${differ.length}건`)

// 4. 실데이터 전수 — 영어본 그대로 validateTranslation, 핸들 경고 수
const byId = new Map(posts.map((p) => [p.id, p]))
let enFiles = 0
const enHandleNotices: string[] = []
for (const name of fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md') && f !== 'README.md').sort()) {
  const { data, content } = matter(fs.readFileSync(path.join('content/posts-en', name), 'utf8'))
  const original = byId.get(name.replace(/\.md$/, ''))
  if (!original) continue
  enFiles += 1
  const notices = validateTranslation(data, content, name, original).notices.filter((n) => /계정 핸들/.test(n))
  for (const n of notices) enHandleNotices.push(`${name}: ${n}`)
}
for (const line of enHandleNotices) console.log(`  경고 ${line}`)
console.log(`[실데이터] 영어본 ${enFiles}건(한국어 원본 ${posts.length}건) · 핸들 경고 ${enHandleNotices.length}건`)
check('실데이터 영어본 핸들 경고 0', enHandleNotices.length === 0)

console.log(`검사 ${pass + fail}개 · 통과 ${pass} · 실패 ${fail}`)
process.exit(fail ? 1 : 0)
