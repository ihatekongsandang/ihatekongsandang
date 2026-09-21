import { resolveCardMedia, type CardMedia, type Post, type SourceType } from './schema'

/** 카드가 실제로 쓰는 필드만 골라낸다 — 클라이언트 컴포넌트로 넘기는 데이터를 최소화한다. */
export interface PostCardView {
  id: string
  title: string
  publishedAt: string
  sourceType: SourceType
  media: CardMedia
}

export function toCardView(post: Post): PostCardView {
  return {
    id: post.id,
    title: post.title,
    publishedAt: post.publishedAt,
    sourceType: post.sourceType,
    media: resolveCardMedia(post),
  }
}

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  url: '링크',
  photo: '사진',
  photo_text: '사진+글',
}

/** 피드 페이지 링크. 1페이지는 쿼리 없이 기본 경로를 쓴다(중복 URL 방지). */
export function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`
}
