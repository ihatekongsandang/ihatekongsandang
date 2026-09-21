import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FeedView } from '@/components/feed-view'
import { CanonicalLink } from '@/components/canonical-link'
import { JsonLd } from '@/components/json-ld'
import { FEED_PAGE_SIZE, SITE } from '@/lib/config'
import { getAllTags, getPostsByTag, paginate } from '@/lib/content/load'
import { pageHref, toCardView } from '@/lib/content/view'
import { collectionJsonLd } from '@/lib/seo'

/** 태그 피드 2페이지 이후. 공개 URL은 `/tag/{slug}?page=n`이고 미들웨어가 이 경로로 rewrite한다. */
export const dynamicParams = false

export function generateStaticParams() {
  const params: { slug: string; page: string }[] = []
  for (const { tag, count } of getAllTags()) {
    const total = Math.max(1, Math.ceil(count / FEED_PAGE_SIZE))
    for (let page = 2; page <= total; page += 1) {
      params.push({ slug: tag, page: String(page) })
    }
  }
  return params
}

function parsePage(raw: string): number | undefined {
  if (!/^\d+$/.test(raw)) return undefined
  const value = Number(raw)
  return value >= 2 ? value : undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>
}): Promise<Metadata> {
  const { slug, page } = await params
  const parsed = parsePage(page)
  if (!parsed) return {}
  const tag = decodeURIComponent(slug)
  return {
    title: `#${tag} — ${parsed}페이지`,
    description: `'${tag}' 태그 게시물 ${parsed}페이지. ${SITE.tagline}`,
  }
}

export default async function TagFeedPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>
}) {
  const { slug, page: rawPage } = await params
  const parsed = parsePage(rawPage)
  if (!parsed) notFound()

  const tag = decodeURIComponent(slug)
  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  const result = paginate(posts, parsed, FEED_PAGE_SIZE)
  if (result.page !== parsed) notFound()

  const basePath = `/tag/${encodeURIComponent(tag)}`

  return (
    <>
      <CanonicalLink path={pageHref(basePath, result.page)} />
      <FeedView
        heading={`#${tag}`}
        lead={`'${tag}' 태그로 묶인 게시물입니다. ${SITE.tagline}`}
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
          name: `#${tag} — ${result.page}페이지`,
          description: `'${tag}' 태그 게시물 ${result.page}페이지.`,
          path: pageHref(basePath, result.page),
          posts: result.items,
        })}
      />
    </>
  )
}
