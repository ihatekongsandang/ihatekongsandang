import { GoogleAnalytics } from '@/components/analytics/ga-script'
import { FloatingBanner } from '@/components/floating-banner'
import { JsonLd } from '@/components/json-ld'
import { SITE } from '@/lib/config'
import { floatingBannerGutter } from '@/lib/floating-banner'
import { t } from '@/lib/i18n'
import { websiteJsonLd } from '@/lib/seo'
import { rootMetadata, rootViewport } from '@/lib/site-metadata'
import '../globals.css'

/**
 * 한국어 루트 레이아웃 — `<html lang="ko">`. 한국어 페이지의 URL은 그대로다(`(ko)`는 라우트 그룹이라 경로에 나타나지 않는다).
 *
 * 왜 루트 레이아웃이 둘인가(프로그래머 05): `/en/**`은 `<html lang="en">`으로 렌더해야 하는데
 * `<html>`은 루트 레이아웃만 그릴 수 있고, 정적 생성 시 레이아웃은 현재 경로를 모른다.
 * 라우트 그룹마다 루트 레이아웃을 두면 빌드 시점에 언어가 정해진 HTML이 나온다.
 * 대가: 두 그룹 사이 이동은 전체 페이지 로드가 되고, 경로가 없는 404는 `app/global-not-found.tsx`가 맡는다.
 *
 * 헤더·본문·푸터는 각 페이지가 `PageFrame`으로 그린다(언어 전환 링크가 페이지별로 달라서 — 그 파일 주석 참조).
 */
export const metadata = rootMetadata('ko')
export const viewport = rootViewport

export default function KoreanRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language} className={floatingBannerGutter('ko').html || undefined}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          {t('ko').skipToContent}
        </a>
        {children}
        {/* 본문·푸터 뒤에 두어 탭 순서상 본문을 앞지르지 않게 한다. */}
        <FloatingBanner locale="ko" />
        <JsonLd data={websiteJsonLd('ko')} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
