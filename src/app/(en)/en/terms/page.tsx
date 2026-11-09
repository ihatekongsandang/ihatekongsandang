import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { ContactPendingNotice, PageSection as Section } from '@/components/page-section'
import { SITE, SITE_EN } from '@/lib/config'
import { aboutPath } from '@/lib/i18n'
import { languageAlternates, termsJsonLd } from '@/lib/seo'

/**
 * Terms and Operating Policy(영어, 프로그래머 11). 구조는 한국어 약관과 같고, 문안은 `planning/terms-page-copy.md` "English copy" 원문 그대로다
 * (작성 이력 메모 "Added/Fixed 09-1 — review 24 …"는 옮기지 않았다).
 * 문안에 없는 두 문장 — 머리 소개 문장과 "처리 기준은 연락 창구가 확정된 뒤부터 적용" 문장 — 은 한국어 시안(02 §2·§3.1)을 프로그래머 11이 옮겼다.
 */
export const metadata: Metadata = {
  title: 'Terms and Operating Policy',
  description: `What ${SITE_EN.name} does, its sourcing principles, how correction and removal requests are handled, and how the site is run.`,
  alternates: { canonical: '/en/terms', languages: languageAlternates('/terms', '/en/terms') },
}

export default function EnglishTermsPage() {
  return (
    <PageFrame locale="en" languageLinks={{ ko: '/terms', en: '/en/terms' }}>
      <div className="reading-page mx-auto w-full space-y-10 pt-5">
        <header className="space-y-3">
          <h1 className="text-[26px] leading-[1.3] font-bold tracking-[-0.02em] md:text-[30px]">Terms and Operating Policy</h1>
          <p className="text-xs text-muted-foreground">
            Last updated: <time dateTime={SITE.termsLastUpdated}>{SITE.termsLastUpdated}</time>
          </p>
          <p className="text-muted-foreground">
            This page explains how this site is run, which sources it uses, and how to reach us if there is a problem.
          </p>
        </header>

        <Section id="purpose" title="What this site does">
          <p className="text-sm">
            This site collects publicly reported political and current-affairs stories (policy criticism, politicians&rsquo;
            statements, commentary, security developments, etc.) and presents them as cards. We do not do our own
            reporting — what we do is gather and organize stories that have already been published.
          </p>
        </Section>

        <Section id="no-reporting" title="We do not do our own reporting">
          <p className="text-sm">
            Every post on this site is written from <strong className="font-semibold">sources that have already been published</strong>:
            news reports, official announcements, or court rulings. We do not go into the field or independently verify
            facts to produce new reporting. Titles and summaries stay within what the source actually reported, and we leave
            out anything the source doesn&rsquo;t confirm. When we cover a statement or post by a politician or public
            official, we link to the original and also list, as &ldquo;background reporting,&rdquo; any coverage that
            supports or gives context for it.
          </p>
        </Section>

        <Section id="sourcing" title="Sourcing principles">
          <ul className="space-y-2 text-sm">
            <li>
              We rely on: news coverage, official announcements or press releases from investigative authorities (e.g., the
              prosecution, police, National Intelligence Service), and published court rulings.
            </li>
            <li>
              &ldquo;News outlet&rdquo; means a newspaper or internet newspaper <strong className="font-semibold">registered</strong>{' '}
              under Korea&rsquo;s Act on the Promotion of Newspapers (meeting Article 2, items 1–2), a news agency under the
              Act on the Promotion of News Agencies, or a broadcaster under the Broadcasting Act. Unregistered outlets,
              independent media, and YouTube channels are not used as a sole basis. The phrase &ldquo;outlets registered
              under Korea&apos;s Act on the Promotion of Newspapers and related laws&rdquo; in the About intro is shorthand
              for this whole standard. The legal basis and procedure (registration, license, approval, etc.) differ by type
              of outlet; the governing laws are as named above.
            </li>
            <li>
              Every post links to its original source. We write the summary ourselves and only quote short phrases where
              needed —{' '}
              <strong className="font-semibold">
                the summaries and text we write never copy a news article&apos;s summary or body text
              </strong>
              . The &ldquo;Original post preview&rdquo; box on a post page may show the title and summary the source itself
              published, unedited and labeled as quoted, with a note saying so.
            </li>
            <li>
              Titles and summaries are written as quotations, not assertions (e.g., &ldquo;reportedly ...&rdquo;,
              &ldquo;allegedly ...&rdquo;).
            </li>
          </ul>
        </Section>

        <Section id="correction" title="How to request a correction or removal, and how we handle it">
          <p className="text-sm">
            If something is inaccurate, or you want us to stop using an image from the original, or you want a post removed,
            please contact us below.
          </p>
          {SITE.contactEmail ? (
            <p className="rounded-[var(--radius-card)] border bg-surface p-4 text-sm">
              Email{' '}
              <a href={`mailto:${SITE.contactEmail}`} className="text-link underline underline-offset-2">
                {SITE.contactEmail}
              </a>
            </p>
          ) : (
            <>
              <ContactPendingNotice>
                <strong className="font-semibold">Contact channel: pending a decision.</strong> This page will be updated
                once it&rsquo;s finalized.
              </ContactPendingNotice>
              <p className="text-xs text-muted-foreground">
                The handling standards below apply once the contact channel is finalized.
              </p>
            </>
          )}
          <p className="text-sm">
            <strong className="font-semibold">Two separate standards:</strong>
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong className="font-semibold">Our own service standard</strong>: we send a first reply within{' '}
              <strong className="font-semibold">3 business days</strong> of receiving a request. This is our own standard,
              not a legal deadline.
            </li>
            <li>
              <strong className="font-semibold">&ldquo;Without delay&rdquo;</strong>: once we&rsquo;ve reviewed a request, we
              take the necessary action (correcting the post, unpublishing it, replacing an image, etc.){' '}
              <strong className="font-semibold">without delay</strong>. If it&rsquo;s hard to judge whether a right has been
              infringed, or a dispute seems likely, we may temporarily restrict access while we look into it. Any such
              temporary restriction follows an operating cap of <strong className="font-semibold">at most 30 days</strong>,
              within which we decide whether to keep it or resolve it.
            </li>
            <li>
              This process is a <strong className="font-semibold">self-adopted operating policy</strong>. Whether specific
              Korean statutes (e.g., Article 44-2 of the Act on Promotion of Information and Communications Network
              Utilization and Information Protection, etc.) apply to this site is{' '}
              <strong className="font-semibold">still being confirmed</strong>; we run this process regardless of that
              determination.{' '}
              <strong className="font-semibold">If it is confirmed that a statute applies, we follow the procedure it sets out</strong>{' '}
              (Article 44-2 of that Act, and Articles 14 and 17-2 of the Act on Press Arbitration and Remedies, etc. for
              Damage Caused by Press Reports, where applicable).
            </li>
          </ul>
        </Section>

        <Section id="anonymous" title="Anonymous operation and contact">
          <p className="text-sm">
            This site is run <strong className="font-semibold">anonymously</strong> — we don&rsquo;t disclose the
            operator&rsquo;s real name, affiliation, or title. There&rsquo;s no sign-up, no comments, and no donations. We
            don&rsquo;t collect personal information for things like sign-up or payment, but visit statistics are collected
            via GA4, and any contact details (e.g., an email address) you send with a correction or removal request are used
            only to respond to you. Whether this description fully meets what Korea&rsquo;s personal-data-protection law
            requires is <strong className="font-semibold">still being confirmed</strong>. The only way to reach the operator
            is through the contact channel in the &ldquo;How to request a correction or removal, and how we handle
            it&rdquo; section above.
          </p>
        </Section>

        <Section id="nature" title="What kind of content this is">
          <p className="text-sm">
            Posts on this site are <strong className="font-semibold">summaries of already-published reporting</strong>. This
            description doesn&rsquo;t determine whether the site counts as an internet newspaper or internet news service
            under Korea&rsquo;s Act on the Promotion of Newspapers — it&rsquo;s simply how we describe what we do, not a
            legal classification.
          </p>
        </Section>

        <p className="border-t pt-6 text-sm">
          <Link href={aboutPath('en')} className="inline-flex min-h-11 items-center text-link underline underline-offset-2">
            Back to About
          </Link>
        </p>

        <JsonLd data={termsJsonLd('en')} />
      </div>
    </PageFrame>
  )
}
