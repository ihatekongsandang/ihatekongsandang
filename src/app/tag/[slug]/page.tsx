import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FeedView } from '@/components/feed-view'
import { JsonLd } from '@/components/json-ld'
import { FEED_PAGE_SIZE, SITE } from '@/lib/config'
import { getAllTags, getPostsByTag, paginate } from '@/lib/content/load'
import { toCardView } from '@/lib/content/view'
import { breadcrumbJsonLd, collectionJsonLd } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  // Next.js가 경로 세그먼트 인코딩을 직접 하므로 여기서는 원문 태그를 그대로 넘긴다.
  // 미리 encodeURIComponent를 하면 퍼센트 기호가 한 번 더 인코딩되어 경로가 어긋난다.
  return getAllTags().map(({ tag }) => ({ slug: tag }))
}

function tagDescription(tag: string): string {
  return `'${tag}' 태그로 묶인 게시물입니다. ${SITE.tagline}`
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tag = decodeURIComponent(slug)
  return {
    title: `#${tag}`,
    description: tagDescription(tag),
    alternates: { canonical: `/tag/${encodeURIComponent(tag)}` },
  }
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tag = decodeURIComponent(slug)
  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  const result = paginate(posts, 1, FEED_PAGE_SIZE)
  const basePath = `/tag/${encodeURIComponent(tag)}`

  return (
    <>
      <FeedView
        heading={`#${tag}`}
        lead={tagDescription(tag)}
        basePath={basePath}
        posts={result.items.map(toCardView)}
        page={result.page}
        totalPages={result.totalPages}
        totalItems={result.totalItems}
        tags={getAllTags()}
        activeTag={tag}
      />
      <JsonLd
        data={collectionJsonLd({
          name: `#${tag}`,
          description: tagDescription(tag),
          path: basePath,
          posts: result.items,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: `#${tag}`, path: basePath },
        ])}
      />
    </>
  )
}
