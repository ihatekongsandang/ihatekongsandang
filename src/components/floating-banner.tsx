import { FloatingBannerLink } from '@/components/floating-banner-link'
import { FLOATING_BANNER } from '@/lib/config'
import { isFloatingBannerShown } from '@/lib/floating-banner'
import type { Locale } from '@/lib/i18n'

/**
 * 전 페이지 플로팅 배너 — 외부 캠페인 링크(2026-09-28 사용자 지시).
 *
 * - 데스크톱(≥1024px): 화면 우측 세로 중앙에 붙은 폭 3rem 세로 탭(현행 유지).
 * - 휴대폰·태블릿(<1024px): **하단 전폭 띠 52px**, 제목 + 부제 2줄(부제가 계속 보인다), iOS safe-area만큼 아래를 더 채운다
 *   (사용자 결정 D1, 보강안 A1 · 구현 범위 12). 본문·원문 이동을 가리지 않는 레이아웃 여백은 `floatingBannerGutter(locale)`가 맡는다.
 * 닫기·숨김은 두지 않는다(2026-09-28 "배너 닫기 없애", U1). 내릴 때는 `FLOATING_BANNER.enabled`.
 * 영어 페이지(`/en/**`)에는 띄우지 않는다 — 국내 서명운동 링크다(`FLOATING_BANNER.showOnEnglish`, 프로그래머 05).
 * 배너 본체는 서버 컴포넌트다. 클릭 이벤트 전송만 `FloatingBannerLink`(클라이언트)가 맡는다 —
 * 그래서 `enabled: false`면 문구·주소가 HTML뿐 아니라 클라이언트 JS 청크에도 남지 않는다(리뷰어 08 R2·R3).
 *
 * 링크는 운영자 큐레이션 출처가 아니라 외부 캠페인이므로 `ExternalLink`(rel="noopener")를 쓰지 않고
 * `nofollow`를 붙여 검색엔진 추천 신호를 주지 않는다(`FloatingBannerLink`).
 * 이미지 없이 텍스트·CSS만 쓴다(외부 요청·CSP 변경 없음). 애니메이션·자동 팝업 없음.
 *
 * 색은 어두운 면(#18181B) 위 흰 글자(#FFFFFF, 17.72:1)·보조 글자(#D4D4D8, 11.99:1), 호버 면 #27272A.
 * 링크 여백은 물리 속성(pt/pr/pb/pl)만 쓴다 — 데스크톱에서 링크가 세로쓰기(vertical-rl)라
 * 논리 속성(py/px = padding-block/inline)을 쓰면 위아래·좌우가 뒤바뀐다(캡처로 확인하고 고침).
 * 어두운 면 위의 포커스 표시는 사이트 기본 파란 링(대비 부족) 대신 흰 링을 안쪽으로 그린다.
 */
export function FloatingBanner({ locale }: { locale: Locale }) {
  if (!isFloatingBannerShown(locale)) return null

  const { href, title, subtitle } = FLOATING_BANNER

  return (
    <aside
      aria-label="외부 링크 안내"
      className="fixed inset-x-0 bottom-0 z-40 flex bg-[#18181b] pb-[env(safe-area-inset-bottom)] text-white print:hidden lg:inset-x-auto lg:top-1/2 lg:right-0 lg:bottom-auto lg:w-12 lg:-translate-y-1/2 lg:overflow-hidden lg:rounded-l-[var(--radius-card)] lg:pb-0 lg:shadow-lg"
    >
      <FloatingBannerLink
        href={href}
        label={`${title} — ${subtitle} (새 창에서 열림)`}
        className="flex min-w-0 flex-1 flex-col items-center justify-center hover:bg-[#27272a] focus-visible:rounded-none focus-visible:outline-white focus-visible:-outline-offset-4 max-lg:h-[var(--banner-h)] max-lg:pr-4 max-lg:pl-4 lg:gap-0.5 lg:pt-4 lg:pb-4 lg:[writing-mode:vertical-rl]"
      >
        <span className="text-sm leading-[1.3] font-bold">{title}</span>
        <span className="text-xs leading-[1.3] text-[#d4d4d8]">{subtitle}</span>
      </FloatingBannerLink>
    </aside>
  )
}
