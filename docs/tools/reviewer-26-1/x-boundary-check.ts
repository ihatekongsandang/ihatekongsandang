/**
 * 리뷰어 26-1 — `xShareText`·`xIntentUrl` 256 경계·인코딩 합성 검사(실제 `src/lib/share.ts` 함수 사용, 빌드 없음).
 * 실행(저장소 루트): npx tsx docs/tools/reviewer-26-1/x-boundary-check.ts
 * 실제 제목 412건에는 가중치 256·257 근처 제목이 없을 수 있으므로 합성 문자열로 경계를 직접 찌른다.
 */
import { X_INTENT, threadsIntentUrl, xIntentUrl, xShareText, xWeight } from '../../../src/lib/share'

let fail = 0
function check(label: string, ok: boolean) {
  if (!ok) fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
}
const PAGE = 'https://example.invalid/en/post/a?b=1&c=#d'
function parts(u: string) {
  const x = new URL(u)
  return { base: `${x.origin}${x.pathname}`, keys: [...x.searchParams.keys()], text: x.searchParams.get('text'), url: x.searchParams.get('url') }
}
const cases: [string, string, boolean][] = [
  ['ASCII 256(예산 딱 맞음)', 'a'.repeat(256), true],
  ['ASCII 257(1 초과)', 'a'.repeat(257), false],
  ['한글 128자 = 가중치 256', '가'.repeat(128), true],
  ['한글 129자 = 가중치 258', '가'.repeat(129), false],
  ['한글 127 + ASCII 2 = 256', '가'.repeat(127) + 'ab', true],
  ['한글 127 + ASCII 3 = 257', '가'.repeat(127) + 'abc', false],
  ['em dash(—, 가중치 1) 256', '—'.repeat(256), true],
  ['이모지 128개 = 256', '😀'.repeat(128), true],
  ['이모지 129개 = 258', '😀'.repeat(129), false],
  ['빈 제목', '', true],
]
for (const [label, title, inBudget] of cases) {
  const t = xShareText(title)
  const p = parts(xIntentUrl(title, PAGE))
  check(`${label}: 가중치 ${xWeight(title)}`, inBudget ? t === title : t === '')
  check(`${label}: 엔드포인트·url 왕복`, p.base === X_INTENT && p.url === PAGE)
  if (inBudget && title !== '') check(`${label}: 키 text,url · text 왕복`, p.keys.join(',') === 'text,url' && p.text === title)
  else check(`${label}: 키 url 하나 · text 파라미터 없음`, p.keys.join(',') === 'url' && p.text === null)
}
// 특수문자 인코딩(&·#·?·%·+·따옴표·줄바꿈)
const special = `A & B #tag ?q=1 100% +plus "quote" 'single'\nline2`
const sp = parts(xIntentUrl(special, PAGE))
check('특수문자 text 왕복', sp.text === special && sp.keys.join(',') === 'text,url')
const raw = xIntentUrl(special, PAGE)
check('생 URL에 인코딩 안 된 & # 공백 없음(구분자 & 1개만)', (raw.match(/&/g) ?? []).length === 1 && !raw.includes('#') && !raw.includes(' '))
// 스레드는 자르지 않음 — 예산 초과 제목도 text 그대로
const long = 'a'.repeat(400)
const th = new URL(threadsIntentUrl(long, PAGE))
check('스레드: 400자 제목 text 그대로·url 왕복', th.searchParams.get('text') === long && th.searchParams.get('url') === PAGE)
console.log(`FAIL ${fail}`)
process.exit(fail ? 1 : 0)
