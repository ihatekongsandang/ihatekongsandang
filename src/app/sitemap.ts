import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/config'
import { getAllPosts, getAllTags } from '@/lib/content/load'

/**
 * `sitemap.xml` 자동 생성 — `content/posts/`를 빌드 시 스캔한다.
 *
 * 페이지네이션 경로(`/page/n`, `/tag/{slug}/page/n`)는 넣지 않는다. 그 주소는 미들웨어의
 * rewrite 대상일 뿐이고 공개 URL은 `?page=n`이며, 2페이지 이후는 1페이지에서 링크로 도달할 수 있다.
 *
 * ⚠️ 절대 URL을 내려면 `NEXT_PUBLIC_SITE_URL`이 설정되어 있어야 한다(도메인 확정 후 Vercel 환경 변수).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latest = posts[0]?.updatedAt ?? posts[0]?.publishedAt

  return [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'daily',
      priority: 1,
      ...(latest ? { lastModified: new Date(`${latest}T00:00:00Z`) } : {}),
    },
    {
      url: absoluteUrl('/about'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...getAllTags().map(({ tag }) => ({
      url: absoluteUrl(`/tag/${encodeURIComponent(tag)}`),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/post/${post.id}`),
      lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
