import Link from 'next/link'
import { SITE, SITE_EN } from '@/lib/config'
import { floatingBannerGutter } from '@/lib/floating-banner'
import { aboutPath, t, termsPath, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** 푸터 링크 — 높이 44px, 세로 목록(md 이상 가로 배치). 구현 범위 13. */
const FOOTER_LINK = 'flex min-h-11 items-center text-link underline underline-offset-[3px]'

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = t(locale)
  const site = locale === 'en' ? SITE_EN : SITE

  return (
    <footer className={cn('mt-10 border-t bg-surface', floatingBannerGutter(locale).footer)}>
      <div className="mx-auto w-full max-w-6xl space-y-2 px-4 py-6 text-sm leading-[1.6] text-muted-foreground md:px-8 lg:px-10 xl:px-12">
        <p className="text-[15px] font-bold text-foreground">
          {locale === 'en' ? (
            <>
              <span lang="ko">{SITE_EN.nameKo}</span> {SITE_EN.subtitle}
            </>
          ) : (
            SITE.name
          )}
        </p>
        <p>{site.tagline}</p>
        <p>{dict.footerPolicy}</p>
        <ul className="flex flex-col md:flex-row md:gap-6">
          <li>
            <Link href={aboutPath(locale)} className={FOOTER_LINK}>
              {dict.footerPolicyLink}
            </Link>
          </li>
          <li>
            <Link href={termsPath(locale)} className={FOOTER_LINK}>
              {dict.footerTermsLink}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
