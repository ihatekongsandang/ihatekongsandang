import Link from 'next/link'
import { SITE, SITE_EN } from '@/lib/config'
import { LANGUAGE_NAMES, LOCALES, aboutPath, homePath, t, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** 언어 전환 대상 — 각 언어로 갈 경로. 현재 페이지의 상대 언어본이 없으면 그 언어의 홈. */
export type LanguageLinks = Record<Locale, string>

export function SiteHeader({ locale, languageLinks }: { locale: Locale; languageLinks: LanguageLinks }) {
  const dict = t(locale)

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4',
          locale === 'en' ? 'min-h-14 py-2' : 'h-14',
        )}
      >
        <Link href={homePath(locale)} className="text-base font-semibold tracking-tight">
          {locale === 'en' ? (
            <>
              {/* 확정 표기 "공산당이싫어요 (Korea Politics & Security Brief)" — 좁은 화면에서는 괄호 부분만 다음 줄로 */}
              <span lang="ko">{SITE_EN.nameKo}</span>{' '}
              <span className="inline-block text-sm font-medium text-muted-foreground">{SITE_EN.subtitle}</span>
            </>
          ) : (
            SITE.name
          )}
        </Link>
        <div className="flex shrink-0 items-center gap-4 text-sm">
          <nav aria-label={dict.mainMenu} className="flex items-center gap-4">
            <Link href={homePath(locale)} className="text-muted-foreground hover:text-foreground">
              {dict.home}
            </Link>
            <Link href={aboutPath(locale)} className="text-muted-foreground hover:text-foreground">
              {dict.about}
            </Link>
          </nav>
          <nav aria-label={dict.languageNav} className="flex items-center gap-1.5 text-muted-foreground">
            {LOCALES.map((target, index) => (
              <span key={target} className="flex items-center gap-1.5">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {target === locale ? (
                  <span lang={target} aria-current="true" className="font-semibold text-foreground">
                    {LANGUAGE_NAMES[target]}
                  </span>
                ) : (
                  <Link
                    href={languageLinks[target]}
                    lang={target}
                    hrefLang={target}
                    className="underline-offset-2 hover:text-foreground hover:underline"
                  >
                    {LANGUAGE_NAMES[target]}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
