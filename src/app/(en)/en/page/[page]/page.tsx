import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CanonicalLink } from '@/components/canonical-link'
import { FeedView } from '@/components/feed-view'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { FEED_PAGE_SIZE, SITE_EN } from '@/lib/config'
import { getEnglishFeedPosts, paginate } from '@/lib/content/load'
import { englishFeedPostHref, pageHref, toCardView } from '@/lib/content/view'
import { t } from '@/lib/i18n'
import { collectionJsonLd } from '@/lib/seo'
import { EnglishSiteHeading } from '@/components/english-site-heading'

/**
 * 영어 피드 2페이지 이후. 한국어 피드와 같은 방식이다 — 공개 URL은 `/en?page=n`이고
 * `src/middleware.ts`가 이 정적 경로로 rewrite한다. canonical은 `/en?page=n`.
 * 게시물 전체(영어본 없는 글 포함)라 페이지 수도 한국어 피드와 같다(프로그래머 06).
 */
export const dynamicParams = false

export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(getEnglishFeedPosts().length / FEED_PAGE_SIZE))
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({ page: String(index + 2) }))
}

function parsePage(raw: string): number | undefined {
  if (!/^\d+$/.test(raw)) return undefined
  const value = Number(raw)
  return value >= 2 ? value : undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const { page } = await params
  const parsed = parsePage(page)
  if (!parsed) return {}
  return {
    title: t('en').pageTitle(parsed),
    description: SITE_EN.description,
  }
}

export default async function EnglishFeedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: rawPage } = await params
  const parsed = parsePage(rawPage)
  if (!parsed) notFound()

  const result = paginate(getEnglishFeedPosts(), parsed, FEED_PAGE_SIZE)
  if (result.page !== parsed) notFound()

  return (
    <PageFrame locale="en" languageLinks={{ ko: '/', en: '/en' }}>
      <CanonicalLink path={pageHref('/en', result.page)} />
      <FeedView
        heading={SITE_EN.name}
        headingNode={<EnglishSiteHeading />}
        lead={SITE_EN.description}
        notice={t('en').koreanOnlyFeedNotice}
        basePath="/en"
        posts={result.items.map(({ post, translated }) => toCardView(post, 'en', translated))}
        page={result.page}
        totalPages={result.totalPages}
        totalItems={result.totalItems}
        tags={[]}
        locale="en"
      />
      <JsonLd
        data={collectionJsonLd({
          name: `${SITE_EN.name} — ${t('en').pageTitle(result.page)}`,
          description: SITE_EN.description,
          path: pageHref('/en', result.page),
          posts: result.items.map(({ post }) => post),
          locale: 'en',
          postHref: englishFeedPostHref(result.items),
        })}
      />
    </PageFrame>
  )
}
