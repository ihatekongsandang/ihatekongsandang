import type { Metadata, Viewport } from 'next'
import { GSC_VERIFICATION, NAVER_VERIFICATION, SITE, SITE_EN, getSiteUrl } from './config'
import type { Locale } from './i18n'

/**
 * 루트 레이아웃 메타데이터 — 언어별 루트 레이아웃(`(ko)`·`(en)`)이 함께 쓴다.
 * 한국어 값은 기존 루트 레이아웃과 같다(프로그래머 05에서 파일만 옮김).
 */
export function rootMetadata(locale: Locale): Metadata {
  const site = locale === 'en' ? SITE_EN : SITE
  const siteUrl = getSiteUrl()

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
    // 검색엔진 소유 확인 메타 태그. 값이 없으면 태그 자체가 나가지 않는다.
    // (`public/google*.html`·`public/naver*.html` 파일 방식과 병행할 수 있다.)
    ...(GSC_VERIFICATION || NAVER_VERIFICATION
      ? {
          verification: {
            ...(GSC_VERIFICATION ? { google: GSC_VERIFICATION } : {}),
            ...(NAVER_VERIFICATION ? { other: { 'naver-site-verification': NAVER_VERIFICATION } } : {}),
          },
        }
      : {}),
    formatDetection: { telephone: false, address: false, email: false },
  }
}

export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}
