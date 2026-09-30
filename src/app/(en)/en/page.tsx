import type { Metadata } from 'next'
import { FeedView } from '@/components/feed-view'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { FEED_PAGE_SIZE, SITE_EN } from '@/lib/config'
import { getEnglishFeedPosts, paginate } from '@/lib/content/load'
import { englishFeedPostHref, toCardView } from '@/lib/content/view'
import { t } from '@/lib/i18n'
import { collectionJsonLd, languageAlternates } from '@/lib/seo'
import { EnglishSiteHeading } from '@/components/english-site-heading'

/**
 * 영어 홈 — 한국어 피드와 같은 게시물 전체·같은 순서·같은 페이지 크기(프로그래머 06).
 * 영어본 있는 글은 영어 카드(→ `/en/post/{id}`), 없는 글은 한국어 원본 카드("Korean only", → `/post/{id}`).
 */
export const metadata: Metadata = {
  alternates: { canonical: '/en', languages: languageAlternates('/', '/en') },
}

export default function EnglishHomePage() {
  const entries = getEnglishFeedPosts()
  const page = paginate(entries, 1, FEED_PAGE_SIZE)

  return (
    <PageFrame locale="en" languageLinks={{ ko: '/', en: '/en' }}>
      <FeedView
        heading={SITE_EN.name}
        headingNode={<EnglishSiteHeading />}
        lead={SITE_EN.description}
        notice={t('en').koreanOnlyFeedNotice}
        basePath="/en"
        posts={page.items.map(({ post, translated }) => toCardView(post, 'en', translated))}
        page={page.page}
        totalPages={page.totalPages}
        totalItems={page.totalItems}
        tags={[]}
        locale="en"
      />
      <JsonLd
        data={collectionJsonLd({
          name: SITE_EN.name,
          description: SITE_EN.description,
          path: '/en',
          posts: page.items.map(({ post }) => post),
          locale: 'en',
          postHref: englishFeedPostHref(page.items),
        })}
      />
    </PageFrame>
  )
}
