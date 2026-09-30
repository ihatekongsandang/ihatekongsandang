import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleAnalytics } from '@/components/analytics/ga-script'
import { FloatingBanner } from '@/components/floating-banner'
import { JsonLd } from '@/components/json-ld'
import { NotFoundMessage } from '@/components/not-found-message'
import { PageFrame } from '@/components/page-frame'
import { SITE } from '@/lib/config'
import { floatingBannerGutter } from '@/lib/floating-banner'
import { t } from '@/lib/i18n'
import { websiteJsonLd } from '@/lib/seo'
import { rootMetadata, rootViewport } from '@/lib/site-metadata'
import './globals.css'

/**
 * 경로가 없는 요청의 404 (프로그래머 05).
 *
 * 루트 레이아웃이 언어별 라우트 그룹 두 개로 나뉘면서 `app/not-found.tsx`가 감쌀 루트 레이아웃이 없어졌다.
 * 그대로 두면 Next 기본 404(`<html>`에 lang 없음, 헤더·푸터 없음)가 나간다(실측).
 * 그래서 `experimental.globalNotFound`(Next 15.4+)로 이 파일이 `<html>`부터 직접 그린다.
 * `/post/{없는 id}`·`/en/post/{영어본 없는 id}` 모두 여기로 온다(`dynamicParams = false`).
 * 단 `?page=n` rewrite로 들어온 범위 밖 번호는 그룹 루트 레이아웃 안에서 렌더되므로 `(ko)`·`(en)`의 `not-found.tsx`가 받는다(05-1).
 *
 * 정적 파일이라 요청 경로를 모른다 — 한국어가 기본이고, 영어 방문자를 위해 영어 안내 한 줄과
 * 영어 홈 링크를 `lang="en"`으로 함께 둔다. 문구는 기존 한국어 404와 같다.
 */
export const metadata: Metadata = {
  // 제목·OG 등은 기존 404와 같게 한국어 루트 메타데이터를 쓰고, 색인만 막는다.
  ...rootMetadata('ko'),
  robots: { index: false, follow: true },
}
export const viewport = rootViewport

export default function GlobalNotFound() {
  return (
    <html lang={SITE.language} className={floatingBannerGutter('ko').html || undefined}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          {t('ko').skipToContent}
        </a>
        <PageFrame locale="ko" languageLinks={{ ko: '/', en: '/en' }}>
          <NotFoundMessage locale="ko">
            <p lang="en" className="pt-4 text-sm text-muted-foreground">
              Page not found. The address may have changed, or the post may have been removed.{' '}
              <Link href="/en" className="text-link underline underline-offset-2">
                Go to the English home
              </Link>
            </p>
          </NotFoundMessage>
        </PageFrame>
        <FloatingBanner locale="ko" />
        {/* 기존 404와 같게 WebSite JSON-LD를 낸다(리뷰어 10 P2-1). */}
        <JsonLd data={websiteJsonLd('ko')} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
