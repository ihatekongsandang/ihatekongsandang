import { SITE, SITE_EN, absoluteUrl } from './config'
import type { Post } from './content/schema'
import { homePath, aboutPath, postPath, type Locale } from './i18n'

/**
 * JSON-LD 타입 선택 — 게시물은 `NewsArticle`이 아니라 `Article`을 쓴다.
 *
 * 근거: `NewsArticle`은 뉴스 조직의 자체 취재물을 전제하는 타입이다. 이 사이트는 언론사가 아니고
 * 타 매체 보도를 인용·정리하는 큐레이션 소식지이므로 `NewsArticle`을 붙이면 발행 주체를 오인시킨다
 * (소재가 특정인 관련 의혹이라 오인의 대가가 크다). 구조화 데이터의 대부분 이점(제목·요약·날짜·출처)은
 * 일반 `Article`로도 얻을 수 있고, 근거 출처는 `citation`으로 명시한다.
 * 사건 상태 라벨은 스키마에서 폐지됐고(2026-09-21), 어떤 형태로도 JSON-LD에 판단을 실어 보내지 않는다.
 *
 * 언어별(프로그래머 05): `inLanguage`·URL·사이트명을 페이지 언어로 낸다. 영어 게시물은
 * `translationOfWork`로 한국어 원문을 가리킨다. 한국어 출력은 기존과 같다(`locale` 기본값 `ko`).
 */
function siteFor(locale: Locale) {
  return locale === 'en' ? SITE_EN : SITE
}

function publisherFor(locale: Locale) {
  return {
    '@type': 'Organization',
    name: siteFor(locale).name,
    url: absoluteUrl(homePath(locale)),
  } as const
}

export function websiteJsonLd(locale: Locale = 'ko') {
  const site = siteFor(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl(homePath(locale)),
    description: site.description,
    inLanguage: site.language,
    publisher: publisherFor(locale),
  }
}

export function postJsonLd(post: Post, locale: Locale = 'ko') {
  const publisher = publisherFor(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: siteFor(locale).language,
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(postPath(locale, post.id)) },
    author: publisher,
    publisher,
    ...(post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    ...(locale === 'en'
      ? {
          translationOfWork: {
            '@type': 'Article',
            '@id': absoluteUrl(postPath('ko', post.id)),
            inLanguage: SITE.language,
          },
        }
      : {}),
    citation: post.sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.name,
      url: source.url,
      datePublished: source.date,
      // 출처 기사 제목은 번역하지 않는다(한국어 원문 그대로) — 영어 페이지에서도 언어를 밝혀 둔다.
      ...(locale === 'en' ? { inLanguage: SITE.language } : {}),
    })),
  }
}

export function collectionJsonLd(input: {
  name: string
  description: string
  path: string
  posts: Post[]
  locale?: Locale
}) {
  const locale = input.locale ?? 'ko'
  const site = siteFor(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: site.language,
    isPartOf: { '@type': 'WebSite', name: site.name, url: absoluteUrl(homePath(locale)) },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: input.posts.length,
      itemListElement: input.posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(postPath(locale, post.id)),
        name: post.title,
      })),
    },
  }
}

export function aboutJsonLd(locale: Locale = 'ko') {
  const site = siteFor(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: locale === 'en' ? `About ${site.name}` : `${site.name} 소개`,
    url: absoluteUrl(aboutPath(locale)),
    inLanguage: site.language,
    isPartOf: { '@type': 'WebSite', name: site.name, url: absoluteUrl(homePath(locale)) },
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

/**
 * `hreflang` 대체 링크 묶음 — 짝이 되는 두 언어 페이지 모두에 같은 값을 낸다(양방향).
 * `x-default`는 한국어 페이지. 짝이 없으면(영어본 없는 게시물 등) `undefined` — 대체 링크를 내지 않는다.
 */
export function languageAlternates(koPath: string, enPath: string) {
  return {
    ko: koPath,
    en: enPath,
    'x-default': koPath,
  }
}
