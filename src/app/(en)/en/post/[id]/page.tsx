import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { PageFrame } from '@/components/page-frame'
import { PostDetail } from '@/components/post-detail'
import { SITE, SITE_EN } from '@/lib/config'
import { getAllTranslations, getEnglishPostById, hasTranslation } from '@/lib/content/load'
import { renderEnglishMarkdown } from '@/lib/content/markdown'
import { postPath } from '@/lib/i18n'
import { languageAlternates } from '@/lib/seo'

/** 영어 상세. 영어본이 있는 id만 생성한다 — 영어본 없는 id는 404(`dynamicParams = false`). */
export const dynamicParams = false

export function generateStaticParams() {
  return [...getAllTranslations().keys()].map((id) => ({ id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params
  const post = getEnglishPostById(id)
  if (!post) return {}

  /*
   * 한국어 상세와 같은 이유로 상위(영어 `opengraph-image`)의 이미지를 다시 얹는다.
   * OG 이미지는 한국어 원본 상세와 같은 사이트 자체 이미지다 — 원문 썸네일은 쓰지 않는다(인용 범위·초상권).
   */
  const parentImages = (await parent).openGraph?.images ?? []
  const enPath = postPath('en', post.id)

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: enPath,
      languages: languageAlternates(postPath('ko', post.id), enPath),
    },
    openGraph: {
      type: 'article',
      siteName: SITE_EN.name,
      locale: SITE_EN.locale,
      alternateLocale: [SITE.locale],
      title: post.title,
      description: post.description,
      url: enPath,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      images: parentImages,
    },
  }
}

export default async function EnglishPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getEnglishPostById(id)
  const translation = getAllTranslations().get(id)
  if (!post || !translation) notFound()

  const body = post.body.trim().length > 0 ? await renderEnglishMarkdown(post.body, hasTranslation) : ''
  const koPath = postPath('ko', post.id)

  return (
    <PageFrame locale="en" languageLinks={{ ko: koPath, en: postPath('en', post.id) }}>
      <PostDetail
        post={post}
        body={body}
        locale="en"
        otherLanguageHref={koPath}
        translatedAt={translation.translatedAt}
      />
    </PageFrame>
  )
}
