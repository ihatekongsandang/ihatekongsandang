import Link from 'next/link'
import { SITE, SITE_EN } from '@/lib/config'
import { floatingBannerGutter } from '@/lib/floating-banner'
import { aboutPath, t, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = t(locale)
  const site = locale === 'en' ? SITE_EN : SITE

  return (
    <footer className={cn('mt-16 border-t bg-surface', floatingBannerGutter(locale).footer)}>
      <div className="mx-auto w-full max-w-6xl space-y-2 px-4 py-8 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
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
        <p>
          <Link href={aboutPath(locale)} className="text-link underline underline-offset-2">
            {dict.footerPolicyLink}
          </Link>
        </p>
      </div>
    </footer>
  )
}
