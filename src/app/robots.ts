import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 페이지네이션의 내부 rewrite 경로. 공개 URL은 `?page=n` 쪽이다.
        disallow: ['/page/', '/tag/*/page/'],
      },
    ],
    ...(siteUrl ? { sitemap: absoluteUrl('/sitemap.xml'), host: siteUrl } : {}),
  }
}
