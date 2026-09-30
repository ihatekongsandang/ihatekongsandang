'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { CardMedia } from '@/components/card-media'
import { GA_EVENTS, trackEvent } from '@/lib/analytics'
import type { PostCardView } from '@/lib/content/view'
import { formatDate, postPath, t, type Locale } from '@/lib/i18n'

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
 */
export function PostCard({ post, position, priority = false, locale = 'ko' }: PostCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reported = useRef(false)
  const koreanOnly = post.koreanOnly === true
  const dict = t(locale)
  // 영어 피드 이벤트는 피드 언어 기준 `language: 'en'` + 영어본 여부. 한국어 이벤트 payload는 그대로.
  const translated = !koreanOnly

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
    <Card
      ref={ref}
      className="relative transition-colors hover:bg-surface has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[var(--ring)]"
    >
      <CardMedia media={post.media} priority={priority} locale={locale} altLang={koreanOnly ? 'ko' : undefined} />
      <CardContent>
        <CardTitle>
          <Link
            href={postPath(koreanOnly ? 'ko' : locale, post.id)}
            hrefLang={koreanOnly ? 'ko' : undefined}
            lang={koreanOnly ? 'ko' : undefined}
            onClick={() =>
              trackEvent(GA_EVENTS.selectCard, { post_id: post.id, position, ...(locale === 'en' ? { language: 'en', translated } : {}) })
            }
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        <span aria-hidden="true">·</span>
        <span>{dict.sourceTypes[post.sourceType]}</span>
        {koreanOnly ? (
          <span className="ml-auto shrink-0 rounded-sm border px-1.5 py-0.5 leading-none">{dict.koreanOnly}</span>
        ) : null}
      </CardFooter>
    </Card>
  )
}
