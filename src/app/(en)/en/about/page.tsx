import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { SITE, SITE_EN } from '@/lib/config'
import { aboutJsonLd, languageAlternates } from '@/lib/seo'

/**
 * 영어 소개. 본문 문구는 슈퍼바이저 확정값(프로그래머 05 오더 §5): 사이트 설명 + 번역 안내 +
 * 정정·삭제 요청 안내(한국어 소개와 같은 채널·같은 처리 기준).
 */
export const metadata: Metadata = {
  title: 'About',
  description: `How ${SITE_EN.name} works, how English versions are made, and how to request a correction or removal.`,
  alternates: { canonical: '/en/about', languages: languageAlternates('/about', '/en/about') },
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function EnglishAboutPage() {
  return (
    <PageFrame locale="en" languageLinks={{ ko: '/about', en: '/en/about' }}>
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">About</h1>
          <p className="text-muted-foreground">{SITE_EN.description}</p>
        </header>

        <Section id="translation" title="English versions">
          <p className="text-sm">
            English versions are translated by the editor from the Korean originals. Where the English and Korean
            differ, the Korean version prevails.
          </p>
        </Section>

        <Section id="correction" title="Corrections and removal requests">
          <p className="text-sm">
            To report inaccurate content, ask us to stop using an image from the original, or request that a post be
            removed, contact us below.
          </p>
          <p className="rounded-[var(--radius-card)] border bg-surface p-4 text-sm">
            Email{' '}
            <a href={`mailto:${SITE.contactEmail}`} className="text-link underline underline-offset-2">
              {SITE.contactEmail}
            </a>
            <br />
            <span className="text-xs text-muted-foreground">
              ※ This is a temporary address until the contact channel is finalized. This page will be updated when it
              is.
            </span>
          </p>
          <ul className="space-y-2 text-sm">
            <li>We send a first reply within 3 business days of receiving a request (our own standard, not a legal deadline).</li>
            <li>
              We recheck the original sources and then correct or unpublish the post as needed. Requests to stop using
              an image are handled by replacing it with a placeholder as soon as they are confirmed.
            </li>
          </ul>
        </Section>

        <p className="border-t pt-6 text-sm">
          <Link href="/en" className="text-link underline underline-offset-2">
            See the latest posts
          </Link>
        </p>

        <JsonLd data={aboutJsonLd('en')} />
      </div>
    </PageFrame>
  )
}
