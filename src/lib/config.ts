/** 사이트 전역 상수. 값을 바꿀 곳이 한 군데가 되도록 모아 둔다. */

export const SITE = {
  name: '공산당이싫어요',
  /**
   * 검색 결과·OG에 쓰는 한 줄 설명.
   * 소재가 "정치·시사 이슈 큐레이션 전반"으로 확장되었다(2026-09-21 사용자 확정) —
   * 정책 비판·정치인 발언·논평·안보·간첩 의혹을 모두 포함한다.
   */
  tagline: '정치·시사 이슈를 출처와 원문 링크로 정리하는 카드형 소식지',
  /**
   * 소개 문구 — PRD v0.7 §1 "소개 문구"(D1 안 3, 2026-11-08 사용자 확정) 전문. 의역·축약하지 않는다(126자, 160자 이하).
   * `/about` 헤더 문단·meta description·OG·WebSite JSON-LD·피드 머리 문단이 모두 이 값을 쓴다(프로그래머 11).
   */
  description:
    '여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다.',
  locale: 'ko_KR',
  language: 'ko',
  /**
   * WebSite JSON-LD `alternateName` — 브랜드 검색 보조(프로그래머 07). 슈퍼바이저 지정값이다.
   * 띄어 쓴 표기로 검색하는 경우와 슬러그(도메인·레포 이름)를 같은 사이트로 묶는다.
   */
  alternateName: ['공산당이 싫어요', 'ihatekongsandang'],
  /**
   * 정정·삭제·이미지 제거 요청 채널. 사용자가 아직 정하지 않았다(2026-11-08 사용자 결정 4c: "연락 창구 준비 중" 표시).
   * `null`이면 `/about`·`/terms`(ko/en)가 "연락 창구 준비 중" 상자를 그린다. 실제 주소를 임의로 채우지 않는다 —
   * 사용자가 정한 값으로만 바꾼다(프로그래머 11, 종전 `.invalid` 예약 도메인 플레이스홀더는 메일이 전달되지 않아 제거).
   */
  contactEmail: null as string | null,
  /**
   * 약관(`/terms`·`/en/terms`) "최종 개정"/"Last updated" 날짜(YYYY-MM-DD, Asia/Seoul). ko·en이 이 값 하나를 쓴다.
   * 약관 문구를 고칠 때마다 함께 갱신한다(리뷰 27 P3-6 → 슈퍼바이저 판단, 프로그래머 12).
   */
  termsLastUpdated: '2026-11-09',
} as const

/** 영어 사이트명의 괄호 영문 부제(괄호 제외). 슈퍼바이저 확정값(프로그래머 05 오더 §5). */
const EN_SUBTITLE = 'Korea Politics & Security Brief'

/**
 * 영어 페이지(`/en/**`)의 사이트 표기. 문구는 슈퍼바이저 확정값이다(프로그래머 05 오더 §5) — 임의로 바꾸지 않는다.
 * 사이트명은 한국어 이름 + 괄호 영문 부제 한 덩어리다. 화면에서는 `nameKo`에 `lang="ko"`를 달고
 * 괄호 부분(`subtitle`)만 줄바꿈할 수 있게 나눠 그린다. `<title>`·OG처럼 문자열만 쓰는 곳은 `name`.
 */
export const SITE_EN = {
  name: `${SITE.name} (${EN_SUBTITLE})`,
  nameKo: SITE.name,
  subtitle: `(${EN_SUBTITLE})`,
  tagline: 'Korean politics and security issues, summarized with sources and links to the originals',
  /**
   * meta description·OG·WebSite JSON-LD·영어 피드 머리 문단용 한 줄(160자 이하). D1 영어 전문(`aboutIntro`)을 같은 취지로 줄였다.
   * 프로그래머 11 번역 — 의미 동등성은 리뷰어 게이트(오더 11 슈퍼바이저 판단 3).
   */
  description:
    'A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.',
  /**
   * `/en/about` 헤더 문단 — D1(PRD v0.7 §1 안 3) 한국어 전문의 영어 번역(프로그래머 11). 시안 03 §1.2에는 위치만 있고
   * 영어 문구가 없어(리뷰 25 §2 2.1-2) 한국어 확정문을 직접 옮겼다. "registered"는 출처 매체에만 걸리게 괄호로 분리했다(scope 2.1-4).
   * 프로그래머 11-1: 셋째 문장을 리뷰 26 P2-4 수정 문구로 교체(기획자 10 재확인 최종 문구, "단정하지 않고" 의미 동등).
   */
  aboutIntro:
    "A card-style news digest that gathers and organizes reporting from multiple news outlets. We do not do our own reporting; we organize each story with its sources named: news reports (from outlets registered under Korea's Act on the Promotion of Newspapers and related laws), announcements by investigative authorities, and court rulings. We do not make definitive claims about how far the facts have been established; we quote the reports as they are.",
  locale: 'en_US',
  language: 'en',
  /**
   * 영어 WebSite JSON-LD `alternateName`(프로그래머 07 판단). 영어 사이트명은 "한국어 이름 + 괄호 영문 부제" 한 덩어리라
   * 그 구성 요소를 각각 다른 이름으로 둔다: 한국어 이름 단독(영어 페이지 머리글·바닥글도 이 이름을 따로 그린다 — `nameKo`) ·
   * 한국어 띄어쓰기 표기 · 영문 부제 단독(괄호 없이) · 슬러그. 한국어 쪽 값과 같은 출처(`SITE`)에서 만들어 어긋나지 않게 한다.
   */
  alternateName: [SITE.name, SITE.alternateName[0], EN_SUBTITLE, SITE.alternateName[1]],
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
 * 피드 상단 태그 칩(`TagNav`)에 노출할 최대 개수. 나머지는 `/tags`(전체 태그)에서 본다.
 *
 * 12의 근거(디자이너 01 시안 A, 2026-10-12 사용자 채택): 실측 당시 "게시물 10건 이상" 태그가 정확히 12개였다.
 * 태그가 297개까지 늘어 칩 영역이 모바일 3화면 이상을 차지하던 문제를 줄이기 위한 상한이다.
 */
export const TAG_NAV_LIMIT = 12

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

/**
 * 전 페이지 우측 플로팅 배너(외부 캠페인 링크). 2026-09-28 사용자 지시로 추가.
 * 문구는 슈퍼바이저 확정값이다 — 임의로 바꾸지 않는다.
 * 내릴 때는 `enabled`만 `false`로 바꾼다. 그러면 배너와 배너용 여백이 함께 사라진다.
 * `showOnEnglish`: 국내 서명운동 링크라 영어 페이지(`/en/**`)에서는 배너와 배너용 여백을 모두 두지 않는다(프로그래머 05).
 * `href`에는 추적 파라미터(`fbclid` 등)를 붙이지 않는다.
 */
export const FLOATING_BANNER = {
  enabled: true,
  showOnEnglish: false,
  href: 'https://signforkorea.com/re',
  title: '이재명 재판재개 촉구 국민 서명운동',
  subtitle: '외부 사이트로 이동합니다',
} as const
