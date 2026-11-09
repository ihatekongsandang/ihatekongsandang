import Link from 'next/link'
import { SITE, SITE_EN } from '@/lib/config'
import { LANGUAGE_NAMES, aboutPath, homePath, t, type Locale } from '@/lib/i18n'

/** 언어 전환 대상 — 각 언어로 갈 경로. 현재 페이지의 상대 언어본이 없으면 그 언어의 홈. */
export type LanguageLinks = Record<Locale, string>

/** 헤더 링크 공통 — 높이·폭 44px 이상(보강안 tokens §3 "터치"), 15px. */
const NAV_LINK =
  'inline-flex min-h-11 min-w-11 items-center justify-center px-2.5 text-[15px] whitespace-nowrap text-muted-foreground hover:text-foreground hover:underline'

/**
 * 사이트 헤더 — 한 줄 56px(ko·en 공통, 구현 범위 2 · 보강안 A1).
 *
 * - 불투명 흰 바탕(반투명 헤더의 글자 비침 제거, notes §1).
 * - 영어 확정 표기 "공산당이싫어요 (Korea Politics & Security Brief)"는 768 이상에서만 헤더에 함께 둔다.
 *   768 미만은 한국어 이름만 두고, 부제는 영어 피드 h1 둘째 줄로 옮긴다(사용자 결정 D3, `EnglishSiteHeading`).
 * - 언어 전환은 상대 언어 링크 하나(보강안 목업과 같다). 지금 언어는 `<html lang>`과 헤더 메뉴 언어로 이미 드러난다.
 */
export function SiteHeader({ locale, languageLinks }: { locale: Locale; languageLinks: LanguageLinks }) {
  const dict = t(locale)
  const other: Locale = locale === 'ko' ? 'en' : 'ko'

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-1 px-4 md:px-8 lg:px-10 xl:px-12">
        <Link
          href={homePath(locale)}
          className="inline-flex min-h-11 items-center text-[17px] font-bold tracking-[-0.02em] whitespace-nowrap"
        >
          {locale === 'en' ? (
            <>
              <span lang="ko">{SITE_EN.nameKo}</span>
              <span className="ml-2 hidden text-sm font-medium tracking-normal text-muted-foreground md:inline">
                {SITE_EN.subtitle}
              </span>
            </>
          ) : (
            SITE.name
          )}
        </Link>
        <div className="flex shrink-0 items-center">
          <nav aria-label={dict.mainMenu} className="flex items-center">
            <Link href={homePath(locale)} className={NAV_LINK}>
              {dict.home}
            </Link>
            <Link href={aboutPath(locale)} className={NAV_LINK}>
              {dict.about}
            </Link>
          </nav>
          <nav aria-label={dict.languageNav} className="ml-0.5 flex items-center border-l pl-1">
            <Link href={languageLinks[other]} lang={other} hrefLang={other} className={NAV_LINK}>
              {LANGUAGE_NAMES[other]}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
