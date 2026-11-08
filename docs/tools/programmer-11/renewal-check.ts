/**
 * 프로그래머 11 — 카드 갱신 표시(5a) 판정 경계 검증. 실행(저장소 루트): npx tsx docs/tools/programmer-11/renewal-check.ts
 * 기준(오더 11 슈퍼바이저 판단 2): Asia/Seoul 날짜, 갱신일 당일 = 1일째, 경과일 0~6 표시 · 7 이상·음수 미표시.
 * 하나라도 틀리면 종료 코드 1.
 */
import { daysSince, isRecentlyUpdated, RENEWAL_DAYS, seoulDate } from '../../../src/lib/content/renewal'
import { toCardView } from '../../../src/lib/content/view'
import { formatShortUpdated } from '../../../src/lib/i18n'

let pass = 0
let fail = 0
function check(label: string, actual: unknown, expected: unknown) {
  const ok = actual === expected
  if (ok) pass++
  else fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label} → ${JSON.stringify(actual)} (기대 ${JSON.stringify(expected)})`)
}

console.log(`RENEWAL_DAYS = ${RENEWAL_DAYS}`)
// 1) 경계 — 오늘 2026-11-10 기준
const today = '2026-11-10'
for (const [updated, elapsed, shown] of [
  ['2026-11-10', 0, true],
  ['2026-11-09', 1, true],
  ['2026-11-04', 6, true],
  ['2026-11-03', 7, false],
  ['2026-11-02', 8, false],
  ['2026-11-11', -1, false],
] as const) {
  check(`daysSince(${updated}, ${today})`, daysSince(updated, today), elapsed)
  check(`isRecentlyUpdated(${updated}, ${today})`, isRecentlyUpdated(updated, today), shown)
}
check('isRecentlyUpdated(undefined)', isRecentlyUpdated(undefined, today), false)
check('isRecentlyUpdated(형식 오류)', isRecentlyUpdated('2026/11/10', today), false)

// 2) 월·연·윤년 경계
check('daysSince(2026-10-28, 2026-11-03) 월 경계', daysSince('2026-10-28', '2026-11-03'), 6)
check('isRecentlyUpdated(2026-10-27, 2026-11-03) 월 경계 7일', isRecentlyUpdated('2026-10-27', '2026-11-03'), false)
check('daysSince(2026-12-29, 2027-01-04) 연 경계', daysSince('2026-12-29', '2027-01-04'), 6)
check('daysSince(2028-02-27, 2028-03-01) 윤년', daysSince('2028-02-27', '2028-03-01'), 3)

// 3) 시간대 — UTC 순간 → Asia/Seoul 날짜(KST 00:00 = 전날 UTC 15:00)
check('seoulDate(2026-11-09T14:59:59Z) = KST 23:59:59', seoulDate(new Date('2026-11-09T14:59:59Z')), '2026-11-09')
check('seoulDate(2026-11-09T15:00:00Z) = KST 다음날 00:00', seoulDate(new Date('2026-11-09T15:00:00Z')), '2026-11-10')
check('seoulDate(2026-11-09T00:30:00Z) = KST 09:30', seoulDate(new Date('2026-11-09T00:30:00Z')), '2026-11-09')
check('seoulDate(2026-12-31T15:00:00Z) = KST 새해', seoulDate(new Date('2026-12-31T15:00:00Z')), '2027-01-01')
// UTC 날짜만 쓰면 틀리는 경우: KST 11/10 08:00 = UTC 11/09 23:00 → 11/03 갱신은 7일째(미표시)여야 한다
const kstMorning = seoulDate(new Date('2026-11-09T23:00:00Z'))
check('KST 11/10 08:00 의 오늘', kstMorning, '2026-11-10')
check('KST 11/10 08:00 에 11/03 갱신 표시(UTC 날짜면 6일로 오판)', isRecentlyUpdated('2026-11-03', kstMorning), false)

// 4) 실행 환경 TZ와 무관한지 — process.env.TZ 를 바꿔도 같은 결과
const instant = new Date('2026-11-09T15:30:00Z')
const before = seoulDate(instant)
for (const tz of ['UTC', 'America/Los_Angeles', 'Asia/Seoul', 'Pacific/Kiritimati']) {
  process.env.TZ = tz
  check(`TZ=${tz} seoulDate`, seoulDate(instant), before)
}

// 5) 카드 데이터 — 표시 대상만 updatedAt을 싣는다
const base = {
  id: 'sample', title: 't', description: 'd', publishedAt: '2026-11-01', sourceType: 'photo', attribution: 'a',
  sources: [], tags: [], images: [], body: '',
} as unknown as Parameters<typeof toCardView>[0]
check('toCardView 6일 → updatedAt 실림', toCardView({ ...base, updatedAt: '2026-11-04' }, 'ko', true, today).updatedAt, '2026-11-04')
check('toCardView 7일 → updatedAt 없음', toCardView({ ...base, updatedAt: '2026-11-03' }, 'ko', true, today).updatedAt, undefined)
check('toCardView 갱신 없음 → updatedAt 없음', toCardView(base, 'ko', true, today).updatedAt, undefined)

// 6) 표시 문자열
check('formatShortUpdated ko', formatShortUpdated('2026-11-04', 'ko'), '11/04 갱신')
check('formatShortUpdated en', formatShortUpdated('2026-11-04', 'en'), 'Updated Nov 4')
check('formatShortUpdated en 12월', formatShortUpdated('2026-12-25', 'en'), 'Updated Dec 25')

console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
process.exit(fail === 0 ? 0 : 1)
