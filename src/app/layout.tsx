import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@/components/analytics/ga-script'
import { JsonLd } from '@/components/json-ld'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { GSC_VERIFICATION, NAVER_VERIFICATION, SITE, getSiteUrl } from '@/lib/config'
import { websiteJsonLd } from '@/lib/seo'
import './globals.css'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={websiteJsonLd()} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
