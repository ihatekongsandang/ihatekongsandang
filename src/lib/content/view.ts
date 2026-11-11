import { postPath, type Locale } from '../i18n'
import { isRecentlyUpdated, seoulDate } from './renewal'
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
  /** 내용을 고친 날(`YYYY-MM-DD`). 갱신 표시(5a)가 켜진 카드에만 싣는다(리뷰 25 P3-6 — 카드 데이터 최소화). */
  updatedAt?: string
}

/**
 * 카드 데이터에서 사진 크레딧(`credit`)을 뺀다(리뷰 68 P3-1 · 프로그래머 20 명세 11).
 * 카드 UI는 크레딧을 그리지 않으므로 클라이언트로 넘기는 RSC 페이로드에 저작자·고지 원문 등을 싣지 않는다. 상세는 `resolveCardMedia`를 직접 쓴다.
 */
function withoutCredit(media: CardMedia): CardMedia {
  if (media.kind === 'placeholder' || !media.credit) return media
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- credit만 빼고 나머지를 그대로 넘긴다
  const { credit, ...rest } = media
  return rest
}

/**
 * `translated`는 영어 피드에서만 의미가 있다 — `false`면 한국어 원본 카드(`koreanOnly`)로 만든다.
 * `today`(Asia/Seoul 날짜)는 갱신 표시 판정 기준이다. 기본값은 이 함수가 실행되는 순간 = 정적 생성(빌드) 시점(오더 11 A안).
 */
export function toCardView(
  post: Post,
  locale: Locale = 'ko',
  translated = true,
  today: string = seoulDate(new Date()),
): PostCardView {
  const koreanOnly = locale === 'en' && !translated
  const renewed = isRecentlyUpdated(post.updatedAt, today)
  return {
    id: post.id,
    title: post.title,
    publishedAt: post.publishedAt,
    sourceType: post.sourceType,
    // 영어본 없는 글의 원문 썸네일 alt도 한국어 원본 제목으로 만든다(제목과 같은 언어).
    media: withoutCredit(resolveCardMedia(post, koreanOnly ? 'ko' : locale)),
    ...(koreanOnly ? { koreanOnly: true as const } : {}),
    ...(renewed && post.updatedAt ? { updatedAt: post.updatedAt } : {}),
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
