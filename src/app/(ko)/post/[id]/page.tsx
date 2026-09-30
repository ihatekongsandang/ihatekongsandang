import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { PageFrame } from '@/components/page-frame'
import { PostDetail } from '@/components/post-detail'
import { getAllPosts, getPostById, hasTranslation } from '@/lib/content/load'
import { renderMarkdown } from '@/lib/content/markdown'
import { postPath } from '@/lib/i18n'
import { languageAlternates } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ id: post.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params
  const post = getPostById(id)
  if (!post) return {}

  /*
   * Next는 `openGraph`를 깊은 병합하지 않는다. 여기서 객체를 새로 돌려주는 순간
   * 루트 `opengraph-image.tsx`가 만든 이미지가 이 경로에서 떨어져 나가고,
   * `twitter:image`는 `openGraph.images`에서 파생되므로 함께 사라진다.
   * 공유되는 URL이 바로 이 게시물 상세라 미리보기 이미지가 비면 안 된다.
   * 상위 메타데이터에서 이미지를 받아 명시적으로 다시 얹는다.
   * 원문 썸네일은 여기에 절대 쓰지 않는다 — 자체 OG 이미지만 쓴다(인용 범위·초상권).
   */
  const parentImages = (await parent).openGraph?.images ?? []
  const koPath = postPath('ko', post.id)

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: koPath,
      // 영어본이 있을 때만 양방향 hreflang(프로그래머 05). 없으면 대체 링크를 내지 않는다.
      ...(hasTranslation(post.id) ? { languages: languageAlternates(koPath, postPath('en', post.id)) } : {}),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: koPath,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      images: parentImages,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  const body = post.body.trim().length > 0 ? await renderMarkdown(post.body) : ''
  const enPath = hasTranslation(post.id) ? postPath('en', post.id) : undefined

  return (
    <PageFrame locale="ko" languageLinks={{ ko: postPath('ko', post.id), en: enPath ?? '/en' }}>
      <PostDetail post={post} body={body} locale="ko" otherLanguageHref={enPath} />
    </PageFrame>
  )
}
