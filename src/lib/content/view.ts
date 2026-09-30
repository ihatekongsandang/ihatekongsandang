import { postPath, type Locale } from '../i18n'
import { resolveCardMedia, type CardMedia, type Post, type SourceType } from './schema'

/** 카드가 실제로 쓰는 필드만 골라낸다 — 클라이언트 컴포넌트로 넘기는 데이터를 최소화한다. */
export interface PostCardView {
  id: string
  title: string
  publishedAt: string
  sourceType: SourceType
  media: CardMedia
  /**
   * 영어 피드에 나오는 영어본 없는 글(프로그래머 06). 제목·이미지 alt는 한국어 원본 그대로이고,
   * 카드는 한국어 상세로 링크하며 "Korean only"를 표시한다. 한국어 피드에서는 항상 없다(카드 데이터 불변).
   */
  koreanOnly?: true
}

/**
 * `translated`는 영어 피드에서만 의미가 있다 — `false`면 한국어 원본 카드(`koreanOnly`)로 만든다.
 */
export function toCardView(post: Post, locale: Locale = 'ko', translated = true): PostCardView {
  const koreanOnly = locale === 'en' && !translated
  return {
    id: post.id,
    title: post.title,
    publishedAt: post.publishedAt,
    sourceType: post.sourceType,
    // 영어본 없는 글의 원문 썸네일 alt도 한국어 원본 제목으로 만든다(제목과 같은 언어).
    media: resolveCardMedia(post, koreanOnly ? 'ko' : locale),
    ...(koreanOnly ? { koreanOnly: true as const } : {}),
  }
}

/** 피드 페이지 링크. 1페이지는 쿼리 없이 기본 경로를 쓴다(중복 URL 방지). */
export function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`
}

/**
 * 영어 피드 항목의 상세 경로 — 영어본 있으면 `/en/post/{id}`, 없으면 한국어 상세 `/post/{id}`(프로그래머 06).
 * 카드 링크(`PostCard`)와 같은 규칙을 목록 JSON-LD에 쓰기 위해 둔다.
 */
export function englishFeedPostHref(entries: { post: Post; translated: boolean }[]): (post: Post) => string {
  const translated = new Set(entries.filter((entry) => entry.translated).map((entry) => entry.post.id))
  return (post) => postPath(translated.has(post.id) ? 'en' : 'ko', post.id)
}
