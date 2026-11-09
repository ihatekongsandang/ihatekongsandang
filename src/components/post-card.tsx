'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CardMedia } from '@/components/card-media'
import { GA_EVENTS, trackEvent } from '@/lib/analytics'
import type { PostCardView } from '@/lib/content/view'
import { formatDate, formatShortUpdated, postPath, t, type Locale } from '@/lib/i18n'

interface PostCardProps {
  post: PostCardView
  /** 피드 안에서의 1-기준 순서. GA 이벤트에 같이 보낸다. */
  position: number
  /** 첫 화면 카드는 이미지를 우선 로딩한다. */
  priority?: boolean
  locale?: Locale
}

/**
 * 피드 카드 = 제목 + 이미지(없으면 플레이스홀더). 본문·요약은 노출하지 않는다.
 * 사건 상태 배지는 폐지됐다(2026-09-21 사용자 지시) — 사실 확인 단계는 상세의 요약·출처로만 전달한다.
 * 카드 전체가 상세 페이지로 가는 하나의 링크다 — 제목을 링크로 두고 가상 요소로 카드 전면을 덮어
 * 탭 정지점은 하나, 링크의 접근성 이름은 제목이 되게 한다(이미지 alt는 별도로 읽힌다).
 *
 * 영어 피드의 영어본 없는 글(`post.koreanOnly`, 프로그래머 06)은 한국어 원본 카드다 — 제목·alt에 `lang="ko"`,
 * 링크는 한국어 상세(`/post/{id}`, `hrefLang="ko"`), 날짜 옆에 "Korean only" 표시.
 * 그 표시는 링크의 접근성 설명(`aria-describedby`)으로 연결한다(프로그래머 07, 리뷰 12 P2-1) — 링크 단위로 이동해도
 * "한국어 페이지로 간다"가 들리게. 표시 문구는 영어라 `lang="ko"` 링크 안에 넣지 않고 링크 밖에 둔다(탭 정지점도 1개 유지).
 * id는 게시물 id(`[a-z0-9-]`, 스키마 검증)로 만든다 — 한 피드 페이지에 같은 게시물은 한 번만 나온다.
 *
 * 배치(프로그래머 14, 구현 범위 6): 768 미만은 가로형(왼쪽 112px 썸네일 + 제목), 768 이상은 세로형(이미지 위·제목 아래).
 * 제목은 3줄까지 보이고(같은 행 카드 높이 편차 제거) 전체 문구는 `title`·상세에서 본다. 유형 라벨("링크")은 뺐다(사용자 결정 D7 —
 * 207건 전부 같은 값이라 정보가 아니다). 사진 출처 글자는 카드에 두지 않는다(D4, 정책 A-3 "카드에는 이미지만").
 *
 * 갱신 표시(사용자 결정 5a, 프로그래머 11): `post.updatedAt`이 있으면(=빌드 시점 기준 갱신 후 7일 이내, `toCardView`에서 판정)
 * 날짜 뒤에 "·" + "11/04 갱신"을 **평문**으로 붙인다 — `Badge`를 쓰지 않는다(리뷰 25 P2-1, scope 2.4-1 "배지·아이콘 아님").
 * 보이는 축약 표기는 `aria-hidden`, 스크린리더에는 sr-only로 전체 날짜를 읽힌다(리뷰 25 P2-2 — generic `span`에 `aria-label` 금지).
 */
export function PostCard({ post, position, priority = false, locale = 'ko' }: PostCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reported = useRef(false)
  const koreanOnly = post.koreanOnly === true
  const dict = t(locale)
  // 영어 피드 이벤트는 피드 언어 기준 `language: 'en'` + 영어본 여부. 한국어 이벤트 payload는 그대로.
  const translated = !koreanOnly
  const koreanOnlyId = koreanOnly ? `korean-only-${post.id}` : undefined

  // 카드 노출 이벤트 — CTR의 분모. 측정 ID가 없으면 trackEvent가 no-op이다.
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || reported.current) continue
          reported.current = true
          trackEvent(GA_EVENTS.viewCard, { post_id: post.id, position, ...(locale === 'en' ? { language: 'en', translated } : {}) })
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [post.id, position, locale, translated])

  return (
    <div
      ref={ref}
      data-slot="card"
      className="relative grid grid-cols-[112px_minmax(0,1fr)] items-start gap-3 rounded-[6px] py-3 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[var(--ring)] md:grid-cols-1 md:grid-rows-[auto_1fr] md:gap-2.5 md:rounded-[var(--radius-card)] md:py-0"
    >
      <CardMedia media={post.media} priority={priority} locale={locale} altLang={koreanOnly ? 'ko' : undefined} />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="line-clamp-3 text-[15px] leading-[1.4] font-semibold tracking-[-0.01em] md:text-[17px] md:leading-[1.42] xl:text-lg">
          <Link
            href={postPath(koreanOnly ? 'ko' : locale, post.id)}
            hrefLang={koreanOnly ? 'ko' : undefined}
            lang={koreanOnly ? 'ko' : undefined}
            aria-describedby={koreanOnlyId}
            title={post.title}
            onClick={() =>
              trackEvent(GA_EVENTS.selectCard, { post_id: post.id, position, ...(locale === 'en' ? { language: 'en', translated } : {}) })
            }
            className="underline-offset-[3px] after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <div
          data-slot="card-footer"
          className="flex flex-wrap items-center gap-x-1.5 text-[13px] leading-[1.4] text-muted-foreground"
        >
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          {post.updatedAt ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                <time dateTime={post.updatedAt} aria-hidden="true">
                  {formatShortUpdated(post.updatedAt, locale)}
                </time>
                <span className="sr-only">{dict.renewedSr(formatDate(post.updatedAt, locale))}</span>
              </span>
            </>
          ) : null}
          {koreanOnly ? (
            <span
              id={koreanOnlyId}
              className="ml-auto shrink-0 rounded-[4px] border border-line-strong px-1.5 text-xs leading-[18px] text-foreground"
            >
              {dict.koreanOnly}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
