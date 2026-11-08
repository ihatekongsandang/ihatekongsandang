/**
 * 카드 "갱신" 표시(사용자 결정 5a — 갱신 후 7일 동안) 판정. 프로그래머 11.
 *
 * 방식(오더 11 슈퍼바이저 판단 2 · 리뷰 25 §5 A안): **빌드 시점 기준**. 카드 데이터(`toCardView`)를 만드는 서버 렌더에서
 * 한 번 판정해 정적 HTML에 고정한다. 클라이언트에서 `Date.now()`로 다시 계산하지 않는다(하이드레이션 불일치 방지).
 * 정기 재배포·ISR은 쓰지 않는다 — 다음 배포가 없으면 7일이 지나도 표시가 남지만, 표시에 날짜가 있어 독자를 속이지 않는다.
 *
 * 경계(리뷰 25 P3-5): 갱신일 당일을 1일째로 센다 → 경과일 = 오늘 − 갱신일, **0~6이면 표시**, 7 이상·음수(미래 날짜)는 표시하지 않는다.
 * 기준 시간대: `updatedAt`은 시각 없는 한국 날짜이므로 "오늘"도 Asia/Seoul 날짜다. 한국은 1988년 이후 서머타임이 없어
 * UTC+9 고정 오프셋으로 계산한다 — 빌드 서버의 TZ·ICU 데이터에 영향받지 않는다.
 * 검증: `docs/tools/programmer-11/renewal-check.ts`(경계 0·6·7일, 음수, KST 자정 전후, 월·연 경계).
 */

/** 갱신 표시를 켜는 기간(일). 갱신일 포함 7일. */
export const RENEWAL_DAYS = 7

const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/** 주어진 순간의 Asia/Seoul 날짜(`YYYY-MM-DD`). */
export function seoulDate(now: Date): string {
  return new Date(now.getTime() + SEOUL_OFFSET_MS).toISOString().slice(0, 10)
}

function dayNumber(iso: string): number | undefined {
  const match = ISO_DATE.exec(iso)
  if (!match) return undefined
  const value = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return Number.isNaN(value) ? undefined : Math.round(value / DAY_MS)
}

/** `today − updatedAt`(일). 형식이 틀리면 `undefined`. */
export function daysSince(updatedAt: string, today: string): number | undefined {
  const from = dayNumber(updatedAt)
  const to = dayNumber(today)
  if (from === undefined || to === undefined) return undefined
  return to - from
}

/** 갱신 표시 여부. `today`는 Asia/Seoul 날짜(`seoulDate`). */
export function isRecentlyUpdated(updatedAt: string | undefined, today: string): boolean {
  if (!updatedAt) return false
  const elapsed = daysSince(updatedAt, today)
  return elapsed !== undefined && elapsed >= 0 && elapsed < RENEWAL_DAYS
}
