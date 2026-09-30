import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/config'
import { getAllPosts, getAllTags, getAllTranslations } from '@/lib/content/load'
import { postPath } from '@/lib/i18n'

/**
 * `sitemap.xml` 자동 생성 — `content/posts/`·`content/posts-en/`을 빌드 시 스캔한다.
 *
 * 페이지네이션 경로(`/page/n`, `/tag/{slug}/page/n`, `/en/page/n`)는 넣지 않는다. 그 주소는 미들웨어의
 * rewrite 대상일 뿐이고 공개 URL은 `?page=n`이며, 2페이지 이후는 1페이지에서 링크로 도달할 수 있다.
 *
 * 영어 페이지(프로그래머 05): `/en`·`/en/about`·`/en/post/{id}`(영어본 있는 것만)를 넣고, 짝이 있는
 * 한국어·영어 항목 모두에 `xhtml:link` 대체 언어(ko·en·x-default=ko)를 단다 — 페이지의 hreflang과 같은 값.
 *
 * ⚠️ 절대 URL을 내려면 `NEXT_PUBLIC_SITE_URL`이 설정되어 있어야 한다(도메인 확정 후 Vercel 환경 변수).
 */
function languages(koPath: string, enPath: string) {
  return {
    alternates: {
      languages: { ko: absoluteUrl(koPath), en: absoluteUrl(enPath), 'x-default': absoluteUrl(koPath) },
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const translations = getAllTranslations()
  const latest = posts[0]?.updatedAt ?? posts[0]?.publishedAt
  const englishPosts = posts.filter((post) => translations.has(post.id))
  const latestEnglish = englishPosts[0]

  return [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'daily',
      priority: 1,
      ...(latest ? { lastModified: new Date(`${latest}T00:00:00Z`) } : {}),
      ...languages('/', '/en'),
    },
    {
      url: absoluteUrl('/about'),
      changeFrequency: 'yearly',
      priority: 0.3,
      ...languages('/about', '/en/about'),
    },
    ...getAllTags().map(({ tag }) => ({
      url: absoluteUrl(`/tag/${encodeURIComponent(tag)}`),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(postPath('ko', post.id)),
      lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      ...(translations.has(post.id) ? languages(postPath('ko', post.id), postPath('en', post.id)) : {}),
    })),
    {
      url: absoluteUrl('/en'),
      changeFrequency: 'daily',
      priority: 0.7,
      ...(latestEnglish
        ? { lastModified: new Date(`${latestEnglish.updatedAt ?? latestEnglish.publishedAt}T00:00:00Z`) }
        : {}),
      ...languages('/', '/en'),
    },
    {
      url: absoluteUrl('/en/about'),
      changeFrequency: 'yearly',
      priority: 0.2,
      ...languages('/about', '/en/about'),
    },
    ...englishPosts.map((post) => {
      const translatedAt = translations.get(post.id)?.translatedAt
      const modified = [post.updatedAt ?? post.publishedAt, translatedAt ?? ''].sort().at(-1) as string
      return {
        url: absoluteUrl(postPath('en', post.id)),
        lastModified: new Date(`${modified}T00:00:00Z`),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        ...languages(postPath('ko', post.id), postPath('en', post.id)),
      }
    }),
  ]
}
