import { GA_MEASUREMENT_ID } from './config'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_EVENTS = {
  /** 카드가 화면에 실제로 보인 순간 — CTR의 분모. */
  viewCard: 'view_card',
  /** 카드 클릭 — CTR의 분자. */
  selectCard: 'select_card',
} as const

export function isAnalyticsEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0
}

/**
 * GA4 이벤트 전송. 측정 ID가 없으면 아무 일도 하지 않는다(no-op).
 * v0.1.5에서 측정 ID를 주입하면 그 시점부터 바로 수집된다.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!isAnalyticsEnabled()) return
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
