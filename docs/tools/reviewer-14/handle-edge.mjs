/**
 * 리뷰어 14 — 프로그래머 07 D 핸들 정규식(`handlesIn`) 독립 모서리 검사 + 오더 문구(앞 글자 영숫자만 제외)와의 차이 대조.
 * 사용(저장소 루트): npx tsx docs/tools/reviewer-14/handle-edge.mjs
 *   .mjs라 루트 typecheck 대상이 아니다(allowJs false). tsx로 돌려 TS 원본을 그대로 import 한다.
 *
 * 열 셋: 입력 · 작업 코드(handlesIn) 기대 · "오더 문구대로"(앞 글자가 영숫자일 때만 제외) 정규식 결과.
 * 둘이 다른 줄 = 경계를 넓혀 생긴 차이(이메일 로컬 파트가 . _ % + - 로 끝나는 경우, 그리고 그 글자 바로 뒤에 붙은 핸들).
 */
import { handlesIn } from '../../../src/lib/content/translation.ts'

const ORDER_LITERAL = (t) => t.match(/(?<![A-Za-z0-9])@[A-Za-z0-9._]*[A-Za-z0-9_]/g) ?? []
const OLD = (t) => t.match(/@[A-Za-z0-9._]+/g) ?? []

// [입력, 작업 코드 기대값]
const CASES = [
  ['@2.pro.official.', ['@2.pro.official']],
  ['editor@example.com', []],
  ['(@a_b)', ['@a_b']],
  ['@a.b', ['@a.b']],
  ['인스타그램 @abc_', ['@abc_']],
  ['인스타그램 @ri_bon__pig 재공유', ['@ri_bon__pig']],
  ['출처: @abc, @def.', ['@abc', '@def']],
  ['x.com/@abc', ['@abc']],
  ['유튜브·@abc', ['@abc']],
  ['님@abc', ['@abc']],
  ['@abc', ['@abc']],
  ['@a', ['@a']],
  ['@.', []],
  ['@', []],
  ['@@abc', ['@abc']],
  ['john_@example.com', []],
  ['a.b@example.com', []],
  ['a+tag@example.com', []],
  ['a-b@example.com', []],
  ['a%b@example.com', []],
  ['문의 contact@example.invalid', []],
  ['Threads@abc', []],
  ['출처.@abc', []],
  ['출처-@abc', []],
  ['＠abc', []],
  ['@abc..', ['@abc']],
  ['@abc...def', ['@abc...def']],
]

let pass = 0
let fail = 0
const widened = []
for (const [input, want] of CASES) {
  const got = handlesIn(input)
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (ok) pass += 1
  else fail += 1
  const lit = ORDER_LITERAL(input)
  if (JSON.stringify(lit) !== JSON.stringify(got)) widened.push(`${JSON.stringify(input)}: 작업 ${JSON.stringify(got)} · 오더 문구 ${JSON.stringify(lit)}`)
  console.log(`${ok ? 'PASS' : 'FAIL'} ${JSON.stringify(input)} → ${JSON.stringify(got)}${ok ? '' : ` (기대 ${JSON.stringify(want)})`} · 이전 ${JSON.stringify(OLD(input))}`)
}
console.log(`\n경계 확장으로 오더 문구와 결과가 다른 입력 ${widened.length}건:`)
for (const w of widened) console.log('  ' + w)
console.log(`\n검사 ${pass + fail} · 통과 ${pass} · 실패 ${fail}`)
process.exit(fail ? 1 : 0)
