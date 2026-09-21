import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FeedView } from '@/components/feed-view'
import { CanonicalLink } from '@/components/canonical-link'
import { JsonLd } from '@/components/json-ld'
import { FEED_PAGE_SIZE, SITE } from '@/lib/config'
import { getAllPosts, getAllTags, paginate } from '@/lib/content/load'
import { pageHref, toCardView } from '@/lib/content/view'
import { collectionJsonLd } from '@/lib/seo'

/**
 * 홈 피드 2페이지 이후.
 *
 * 공개 URL은 `/?page=n` 하나다 — 카드 아래 "더 보기"가 그 주소를 가리키고,
 * `src/middleware.ts`가 그 요청을 이 정적 경로로 rewrite한다.
 * 이렇게 두면 (a) "더 보기"가 크롤러가 따라갈 수 있는 실제 링크이면서
 * (b) 모든 페이지가 빌드 시점에 정적으로 생성된다. 이 경로 자체는 어디에서도 링크하지 않고
 * canonical을 `/?page=n`으로 돌려 중복 URL이 색인되지 않게 한다.
 */
export const dynamicParams = false

export function generateStaticParams() {
  const total = Math.max(1, Math.ceil(getAllPosts().length / FEED_PAGE_SIZE))
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
  // canonical은 CanonicalLink 컴포넌트가 직접 내보낸다(사유는 그 파일 주석 참조).
  return {
    title: `${parsed}페이지`,
    description: SITE.description,
  }
}

export default async function HomeFeedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: rawPage } = await params
  const parsed = parsePage(rawPage)
  if (!parsed) notFound()

  const posts = getAllPosts()
  const result = paginate(posts, parsed, FEED_PAGE_SIZE)
  if (result.page !== parsed) notFound()

  return (
    <>
      <CanonicalLink path={pageHref('/', result.page)} />
      <FeedView
        heading={SITE.name}
        lead={SITE.description}
        basePath="/"
        posts={result.items.map(toCardView)}
        page={result.page}
        totalPages={result.totalPages}
        totalItems={result.totalItems}
        tags={getAllTags()}
      />
      <JsonLd
        data={collectionJsonLd({
          name: `${SITE.name} — ${result.page}페이지`,
          description: SITE.description,
          path: pageHref('/', result.page),
          posts: result.items,
        })}
      />
    </>
  )
}
