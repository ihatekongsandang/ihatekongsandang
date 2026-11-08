/**
 * 상세 공유 버튼(D4 (가) — 링크 복사·X·스레드) 순수 함수. 프로그래머 11. 클라이언트 컴포넌트가 읽으므로 서버 전용 모듈을 import하지 않는다.
 * intent 주소는 공식 문서 기준(시안 01 §2, 리뷰 25 §3에서 재확인): X `https://x.com/intent/tweet`, 스레드 `https://www.threads.com/intent/post`.
 * 파라미터는 `text`·`url`만, `encodeURIComponent`로 퍼센트 인코딩한다.
 */

export const X_INTENT = 'https://x.com/intent/tweet'
export const THREADS_INTENT = 'https://www.threads.com/intent/post'

/** X 한 게시물 한도(가중치). */
export const X_MAX_WEIGHT = 280
/** X가 `url`을 t.co로 줄인 길이(가중치). */
export const X_URL_WEIGHT = 23
/** X 작성창이 `text`와 `url` 사이에 넣는 공백. */
const X_SEPARATOR_WEIGHT = 1

/**
 * twitter-text 기본 설정(v3)의 글자 가중치 — 이 범위의 코드 포인트는 1, 그 밖(한글·CJK·이모지 등)은 2.
 * 리뷰 25 측정 도구(`docs/tools/reviewer-25/x-title-length.py`)와 같은 규칙이다.
 */
function charWeight(codePoint: number): number {
  return codePoint <= 4351 ||
    (codePoint >= 8192 && codePoint <= 8205) ||
    (codePoint >= 8208 && codePoint <= 8223) ||
    (codePoint >= 8242 && codePoint <= 8247)
    ? 1
    : 2
}

export function xWeight(text: string): number {
  let total = 0
  for (const ch of text) total += charWeight(ch.codePointAt(0) ?? 0)
  return total
}

/**
 * X intent `text` — 제목 + 공백 + 단축 URL(23)이 280 안에 들면 제목 그대로, 넘으면 빈 문자열(리뷰 26 P2-3).
 * 제목 뒤를 잘라 붙이면 영어 제목 끝의 반박·단서 절("…were not his words" 등)이 사라져 게시물과 반대로 읽힐 수 있다.
 * 그래서 자르지 않고 `text`를 비운다 — X는 링크 카드로 페이지 OG 제목 전문을 보여 준다.
 */
export function xShareText(title: string): string {
  const budget = X_MAX_WEIGHT - X_URL_WEIGHT - X_SEPARATOR_WEIGHT
  return xWeight(title) <= budget ? title : ''
}

/** `text`가 비면 파라미터를 빼고 `?url=`만 만든다(리뷰 26 P2-3). */
export function xIntentUrl(title: string, pageUrl: string): string {
  const text = xShareText(title)
  const url = `url=${encodeURIComponent(pageUrl)}`
  return text ? `${X_INTENT}?text=${encodeURIComponent(text)}&${url}` : `${X_INTENT}?${url}`
}

export function threadsIntentUrl(title: string, pageUrl: string): string {
  return `${THREADS_INTENT}?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`
}
