import { SITE, absoluteUrl } from './config'
import type { Post } from './content/schema'

/**
 * JSON-LD 타입 선택 — 게시물은 `NewsArticle`이 아니라 `Article`을 쓴다.
 *
 * 근거: `NewsArticle`은 뉴스 조직의 자체 취재물을 전제하는 타입이다. 이 사이트는 언론사가 아니고
 * 타 매체 보도를 인용·정리하는 큐레이션 소식지이므로 `NewsArticle`을 붙이면 발행 주체를 오인시킨다
 * (소재가 특정인 관련 의혹이라 오인의 대가가 크다). 구조화 데이터의 대부분 이점(제목·요약·날짜·출처)은
 * 일반 `Article`로도 얻을 수 있고, 근거 출처는 `citation`으로 명시한다.
 * 상태 라벨은 유죄·무죄에 대한 기계 판독 가능한 주장이 되지 않도록 JSON-LD에 넣지 않는다.
 */
const publisher = {
  '@type': 'Organization',
  name: SITE.name,
  url: absoluteUrl('/'),
} as const

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: absoluteUrl('/'),
    description: SITE.description,
    inLanguage: SITE.language,
    publisher,
  }
}

export function postJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: SITE.language,
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/post/${post.id}`) },
    author: publisher,
    publisher,
    ...(post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    citation: post.sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.name,
      url: source.url,
      datePublished: source.date,
    })),
  }
}

export function collectionJsonLd(input: {
  name: string
  description: string
  path: string
  posts: Post[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: SITE.language,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: absoluteUrl('/') },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: input.posts.length,
      itemListElement: input.posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/post/${post.id}`),
        name: post.title,
      })),
    },
  }
}

export function aboutJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${SITE.name} 소개`,
    url: absoluteUrl('/about'),
    inLanguage: SITE.language,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: absoluteUrl('/') },
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  }
}
