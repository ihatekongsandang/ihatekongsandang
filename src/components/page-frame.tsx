import { SiteFooter } from '@/components/site-footer'
import { SiteHeader, type LanguageLinks } from '@/components/site-header'
import { floatingBannerGutter } from '@/lib/floating-banner'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * 헤더 + 본문(`<main>`) + 푸터.
 *
 * 레이아웃이 아니라 각 페이지가 그린다 — 헤더의 언어 전환 링크가 "지금 페이지의 상대 언어본"을
 * 가리켜야 하는데(프로그래머 05), 레이아웃은 정적 생성 시 현재 경로를 모른다.
 * 페이지가 자기 짝 경로를 넘기면 서버에서 완성된 링크가 나가므로 JS 없이도 동작하고,
 * 번역된 id 목록을 모든 페이지의 클라이언트 페이로드에 실을 필요도 없다.
 * DOM 순서(건너뛰기 링크 → 헤더 → main → 푸터 → 배너)는 레이아웃에 있을 때와 같다.
 */
export function PageFrame({
  locale,
  languageLinks,
  children,
}: {
  locale: Locale
  languageLinks: LanguageLinks
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader locale={locale} languageLinks={languageLinks} />
      <main id="main" className={cn('mx-auto w-full max-w-6xl flex-1 px-4 py-8', floatingBannerGutter(locale).main)}>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
