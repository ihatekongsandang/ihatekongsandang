import { FloatingBannerLink } from '@/components/floating-banner-link'
import { FLOATING_BANNER } from '@/lib/config'

/**
 * 전 페이지 우측 플로팅 배너 — 외부 캠페인 링크(2026-09-28 사용자 지시).
 *
 * - 데스크톱(≥1024px): 화면 우측 세로 중앙에 붙은 폭 3rem 세로 탭.
 * - 모바일·태블릿(<1024px): 우측 하단 고정 버튼(iOS safe-area 반영).
 * 본문을 가리지 않기 위한 레이아웃 여백은 `FLOATING_BANNER_GUTTER`가 맡는다.
 * 닫기 버튼은 두지 않는다(2026-09-28 사용자 지시 "배너 닫기 없애"). 내릴 때는 `FLOATING_BANNER.enabled`.
 * 배너 본체는 서버 컴포넌트다. 클릭 이벤트 전송만 `FloatingBannerLink`(클라이언트)가 맡는다 —
 * 그래서 `enabled: false`면 문구·주소가 HTML뿐 아니라 클라이언트 JS 청크에도 남지 않는다(리뷰어 08 R2·R3).
 *
 * 링크는 운영자 큐레이션 출처가 아니라 외부 캠페인이므로 `ExternalLink`(rel="noopener")를 쓰지 않고
 * `nofollow`를 붙여 검색엔진 추천 신호를 주지 않는다(`FloatingBannerLink`).
 * 이미지 없이 텍스트·CSS만 쓴다(외부 요청·CSP 변경 없음). 애니메이션·자동 팝업 없음.
 *
 * 색은 어두운 면(#18181B) 위 흰 글자(#FFFFFF)·보조 글자(#D4D4D8), 호버 면 #27272A.
 * 대비 실측: docs/tools/programmer-04/contrast-check.mjs.
 * 링크 여백은 물리 속성(pt/pr/pb/pl)만 쓴다 — 데스크톱에서 링크가 세로쓰기(vertical-rl)라
 * 논리 속성(py/px = padding-block/inline)을 쓰면 위아래·좌우가 뒤바뀐다(캡처로 확인하고 고침).
 * 어두운 면 위의 포커스 표시는 사이트 기본 파란 링(대비 부족) 대신 흰 링을 안쪽으로 그린다.
 */
export function FloatingBanner() {
  if (!FLOATING_BANNER.enabled) return null

  const { href, title, subtitle } = FLOATING_BANNER

  return (
    <aside
      aria-label="외부 링크 안내"
      className="fixed right-[calc(1rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-20 flex max-w-[calc(100vw-2rem)] overflow-hidden rounded-[var(--radius-card)] bg-[#18181b] text-white shadow-lg print:hidden lg:top-1/2 lg:right-0 lg:bottom-auto lg:w-12 lg:max-w-none lg:-translate-y-1/2 lg:rounded-r-none"
    >
      <FloatingBannerLink
        href={href}
        label={`${title} — ${subtitle} (새 창에서 열림)`}
        className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 hover:bg-[#27272a] focus-visible:rounded-none focus-visible:outline-white focus-visible:-outline-offset-4 max-lg:pt-2.5 max-lg:pr-3.5 max-lg:pb-2.5 max-lg:pl-3.5 lg:items-center lg:pt-4 lg:pb-4 lg:[writing-mode:vertical-rl]"
      >
        <span className="text-sm leading-snug font-semibold">{title}</span>
        <span className="text-xs leading-snug text-[#d4d4d8]">{subtitle}</span>
      </FloatingBannerLink>
    </aside>
  )
}
