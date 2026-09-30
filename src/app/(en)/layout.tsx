import { GoogleAnalytics } from '@/components/analytics/ga-script'
import { FloatingBanner } from '@/components/floating-banner'
import { JsonLd } from '@/components/json-ld'
import { SITE_EN } from '@/lib/config'
import { floatingBannerGutter } from '@/lib/floating-banner'
import { t } from '@/lib/i18n'
import { websiteJsonLd } from '@/lib/seo'
import { rootMetadata, rootViewport } from '@/lib/site-metadata'
import '../globals.css'

/**
 * 영어 루트 레이아웃 — `/en/**` 전부 `<html lang="en">` (프로그래머 05).
 * 한국어 레이아웃과 구조는 같다. 플로팅 배너는 `showOnEnglish: false`라 그리지 않고 여백도 없다.
 */
export const metadata = rootMetadata('en')
export const viewport = rootViewport

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_EN.language} className={floatingBannerGutter('en').html || undefined}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          {t('en').skipToContent}
        </a>
        {children}
        <FloatingBanner locale="en" />
        <JsonLd data={websiteJsonLd('en')} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
