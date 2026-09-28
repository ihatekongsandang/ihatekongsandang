'use client'

import { GA_EVENTS, trackEvent } from '@/lib/analytics'

interface FloatingBannerLinkProps {
  href: string
  /** 접근 이름. 표시 문구로 시작해야 한다(WCAG 2.5.3). */
  label: string
  className?: string
  children: React.ReactNode
}

/**
 * 플로팅 배너의 링크 — 클릭 시 GA 이벤트 전송(onClick)만 맡는 클라이언트 컴포넌트.
 * 배너 문구·주소는 서버 컴포넌트(`FloatingBanner`)가 props·children으로 넘긴다.
 * 이 파일은 `config.ts`를 읽지 않는다 — 배너가 꺼져 있으면 문구·주소가 클라이언트 JS에 남지 않게 하기 위해서다.
 *
 * 외부 캠페인 링크라 `ExternalLink`(rel="noopener")가 아니라 `noopener nofollow`를 쓴다.
 */
export function FloatingBannerLink({ href, label, className, children }: FloatingBannerLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener nofollow"
      aria-label={label}
      onClick={() => trackEvent(GA_EVENTS.floatingBannerClick, { link_url: href })}
      className={className}
    >
      {children}
    </a>
  )
}
