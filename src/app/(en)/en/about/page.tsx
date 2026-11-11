import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { ContactPendingNotice, PageSection as Section } from '@/components/page-section'
import { SITE, SITE_EN } from '@/lib/config'
import { termsPath } from '@/lib/i18n'
import { aboutJsonLd, languageAlternates } from '@/lib/seo'

/**
 * 영어 소개. 본문 문구는 슈퍼바이저 확정값(프로그래머 05 오더 §5): 사이트 설명 + 번역 안내 +
 * 정정·삭제 요청 안내(한국어 소개와 같은 채널·같은 처리 기준).
 * 프로그래머 11: 헤더 문단을 D1 영어 전문(`SITE_EN.aboutIntro`)으로, 연락처를 "준비 중" 상자로 바꾸고 약관 링크를 더했다.
 */
export const metadata: Metadata = {
  title: 'About',
  description: `How ${SITE_EN.name} works, how English versions are made, and how to request a correction or removal.`,
  alternates: { canonical: '/en/about', languages: languageAlternates('/about', '/en/about') },
}

export default function EnglishAboutPage() {
  return (
    <PageFrame locale="en" languageLinks={{ ko: '/about', en: '/en/about' }}>
      <div className="reading-page mx-auto w-full space-y-10 pt-5">
        <header className="space-y-3">
          <h1 className="text-[26px] leading-[1.3] font-bold tracking-[-0.02em] md:text-[30px]">About</h1>
          <p className="text-muted-foreground">{SITE_EN.aboutIntro}</p>
        </header>

        <Section id="translation" title="English versions">
          <p className="text-sm">
            English versions are translated by the editor from the Korean originals. Where the English and Korean
            differ, the Korean version prevails.
          </p>
        </Section>

        {/* 프로그래머 16(C4): planning/q1-redirect-q2-sns-image-plan.md §2.2 en 문안(리뷰 34 §2.4 정정 문안 포함)을 글자 그대로 둔다. */}
        <Section id="copyright" title="Quotes, images and copyright">
          <ul className="space-y-2 text-sm">
            <li>
              We quote only the metadata of an external article (title and summary) and link to the original. We do
              not republish the body.
            </li>
            <li>
              A card&apos;s main image depends on the post.
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  When a post uses a photo from a news article, the photo is loaded directly from the news
                  outlet&apos;s address rather than copied to this site. Below the photo, we credit the rights holder
                  or outlet and link to the original.
                </li>
                <li>
                  When we use public photos released under the Korea Open Government License (KOGL), the license type
                  is shown below the photo (none are in use now).
                </li>
                {/* 프로그래머 19: 기획자 19-2 §3 A-2 줄 en 문안을 글자 그대로 둔다(KOGL 줄은 유지 — 정책 §4.5). */}
                <li>
                  Archive photos with no people in them (such as places and buildings) are used only if they are marked
                  as free to use — for example under KOGL, a Creative Commons license or in the public domain. Below
                  the photo we credit the author, state the license, link to the original, and note that it was not
                  taken at the time of the event.
                </li>
                <li>If a post has no image, or an image fails to load, a replacement image is shown.</li>
              </ul>
            </li>
            <li>
              Photos from news articles and public sources show people only in the public activities of public
              figures (for example, parliamentary or government events, press conferences, diplomatic events).
              Photos of official events may also show staff, interpreters or attendees performing official duties.
              We do not use photos in which other private individuals, minors, victims, or injured people can be
              recognized. Photos showing people are used only if taken at the event the post covers, and a photo is not evidence for
              what the post says. Photos on posts about allegations, investigations or trials carry a caption
              saying who took them, when and where.
            </li>
            <li>Share previews use this site&apos;s own image.</li>
          </ul>
        </Section>

        <Section id="correction" title="Corrections and removal requests">
          <p className="text-sm">
            To report inaccurate content, ask us to stop using an image from the original, or request that a post be
            removed, contact us below.
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
                Contact channel: pending a decision. This page will be updated once it&rsquo;s finalized.
              </ContactPendingNotice>
              <p className="text-xs text-muted-foreground">
                The handling standards below apply once the contact channel is finalized.
              </p>
            </>
          )}
          <ul className="space-y-2 text-sm">
            <li>We send a first reply within 3 business days of receiving a request (our own standard, not a legal deadline).</li>
            <li>
              We recheck the original sources and then correct or unpublish the post as needed. Requests to stop using
              an image are handled by replacing it with a placeholder as soon as they are confirmed.
            </li>
          </ul>
          <p className="text-sm">
            For the full handling standards and operating principles, see the{' '}
            <Link href={termsPath('en')} className="text-link underline underline-offset-2">
              Terms and Operating Policy
            </Link>
            .
          </p>
        </Section>

        <p className="border-t pt-6 text-sm">
          <Link href="/en" className="inline-flex min-h-11 items-center text-link underline underline-offset-2">
            See the latest posts
          </Link>
        </p>

        <JsonLd data={aboutJsonLd('en')} />
      </div>
    </PageFrame>
  )
}
