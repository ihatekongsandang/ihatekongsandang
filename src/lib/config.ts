/** 사이트 전역 상수. 값을 바꿀 곳이 한 군데가 되도록 모아 둔다. */

export const SITE = {
  name: '공산당이싫어요',
  /**
   * 검색 결과·OG에 쓰는 한 줄 설명.
   * 소재가 "정치·시사 이슈 큐레이션 전반"으로 확장되었다(2026-09-21 사용자 확정) —
   * 정책 비판·정치인 발언·논평·안보·간첩 의혹을 모두 포함한다.
   */
  tagline: '정치·시사 이슈를 출처와 원문 링크로 정리하는 카드형 소식지',
  description:
    '정책 비판·정치인 발언·논평·안보 현안 등 정치·시사 이슈를 언론 보도·수사기관 발표·판결문 등 공개된 출처에 근거해 카드로 정리합니다. 원문을 전재하지 않고 요약과 출처 링크로 전달합니다.',
  locale: 'ko_KR',
  language: 'ko',
  /** 정정·삭제·이미지 제거 요청 채널. 사용자 확정 전 플레이스홀더. */
  contactEmail: 'contact@example.invalid',
} as const

/**
 * 피드 한 페이지에 노출할 카드 수.
 *
 * 기본값 12의 근거: 그리드가 모바일 1열 → 태블릿 2열 → 데스크톱 3열/4열로 바뀌는데
 * 12는 1·2·3·4로 모두 나누어져 어떤 화면에서도 마지막 줄이 비지 않는다.
 * 카드가 제목+이미지뿐이라 12장의 문서 무게도 작다.
 * 게시 빈도·볼륨이 미정(사용자 답변 11)이므로 실제 축적량을 보고 이 상수만 조정한다.
 */
export const FEED_PAGE_SIZE = 12

/**
 * 배포 사이트의 절대 URL. canonical·sitemap·OG URL에 쓴다.
 * 도메인 미확정 상태라 값이 없으면 상대 경로로 동작한다(빌드는 막지 않는다).
 */
export function getSiteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return undefined
  return raw.replace(/\/+$/, '')
}

/** 절대 URL이 만들어질 때는 절대 URL을, 아니면 주어진 경로를 그대로 돌려준다. */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  if (!base) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? ''

/**
 * 검색엔진 사이트 소유 확인용 메타 태그 값.
 * `public/` 의 HTML 파일 방식과 병행할 수 있다 — 값이 없으면 메타 태그를 넣지 않는다.
 */
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() ?? ''
export const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_VERIFICATION?.trim() ?? ''
