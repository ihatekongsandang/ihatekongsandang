import type { Metadata } from 'next'
import { FeedView } from '@/components/feed-view'
import { JsonLd } from '@/components/json-ld'
import { PageFrame } from '@/components/page-frame'
import { FEED_PAGE_SIZE, SITE } from '@/lib/config'
import { getAllPosts, getAllTags, paginate } from '@/lib/content/load'
import { toCardView } from '@/lib/content/view'
import { collectionJsonLd, languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: languageAlternates('/', '/en') },
}

export default function HomePage() {
  const posts = getAllPosts()
  const page = paginate(posts, 1, FEED_PAGE_SIZE)
  const tags = getAllTags()

  return (
    <PageFrame locale="ko" languageLinks={{ ko: '/', en: '/en' }}>
      <FeedView
        heading={SITE.name}
        lead={SITE.description}
        basePath="/"
        posts={page.items.map((post) => toCardView(post))}
        page={page.page}
        totalPages={page.totalPages}
        totalItems={page.totalItems}
        tags={tags}
      />
      <JsonLd
        data={collectionJsonLd({
          name: SITE.name,
          description: SITE.description,
          path: '/',
          posts: page.items,
        })}
      />
    </PageFrame>
  )
}
