import type { Metadata } from 'next'
import { FeedView } from '@/components/feed-view'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { FEED_PAGE_SIZE, SITE_EN } from '@/lib/config'
import { getAllEnglishPosts, paginate } from '@/lib/content/load'
import { toCardView } from '@/lib/content/view'
import { collectionJsonLd, languageAlternates } from '@/lib/seo'
import { EnglishSiteHeading } from '@/components/english-site-heading'

/** 영어 홈 — 영어본이 있는 게시물만 최신순(한국어 피드와 같은 카드 그리드·페이지 크기). */
export const metadata: Metadata = {
  alternates: { canonical: '/en', languages: languageAlternates('/', '/en') },
}

export default function EnglishHomePage() {
  const posts = getAllEnglishPosts()
  const page = paginate(posts, 1, FEED_PAGE_SIZE)

  return (
    <PageFrame locale="en" languageLinks={{ ko: '/', en: '/en' }}>
      <FeedView
        heading={SITE_EN.name}
        headingNode={<EnglishSiteHeading />}
        lead={SITE_EN.description}
        basePath="/en"
        posts={page.items.map((post) => toCardView(post, 'en'))}
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
          posts: page.items,
          locale: 'en',
        })}
      />
    </PageFrame>
  )
}
