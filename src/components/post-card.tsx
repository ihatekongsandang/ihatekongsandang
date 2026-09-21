'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { CardMedia } from '@/components/card-media'
import { GA_EVENTS, trackEvent } from '@/lib/analytics'
import { SOURCE_TYPE_LABELS, type PostCardView } from '@/lib/content/view'
import { formatKoreanDate } from '@/lib/utils'

interface PostCardProps {
  post: PostCardView
  /** 피드 안에서의 1-기준 순서. GA 이벤트에 같이 보낸다. */
  position: number
  /** 첫 화면 카드는 이미지를 우선 로딩한다. */
  priority?: boolean
}

/**
 * 피드 카드 = 제목 + 이미지(없으면 플레이스홀더). 본문·요약은 노출하지 않는다.
 * 사건 상태 배지는 폐지됐다(2026-09-21 사용자 지시) — 사실 확인 단계는 상세의 요약·출처로만 전달한다.
 * 카드 전체가 상세 페이지로 가는 하나의 링크다 — 제목을 링크로 두고 가상 요소로 카드 전면을 덮어
 * 탭 정지점은 하나, 링크의 접근성 이름은 제목이 되게 한다(이미지 alt는 별도로 읽힌다).
 */
export function PostCard({ post, position, priority = false }: PostCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reported = useRef(false)

  // 카드 노출 이벤트 — CTR의 분모. 측정 ID가 없으면 trackEvent가 no-op이다.
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || reported.current) continue
          reported.current = true
          trackEvent(GA_EVENTS.viewCard, { post_id: post.id, position })
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [post.id, position])

  return (
    <Card
      ref={ref}
      className="relative transition-colors hover:bg-surface has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[var(--ring)]"
    >
      <CardMedia media={post.media} priority={priority} />
      <CardContent>
        <CardTitle>
          <Link
            href={`/post/${post.id}`}
            onClick={() => trackEvent(GA_EVENTS.selectCard, { post_id: post.id, position })}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter>
        <time dateTime={post.publishedAt}>{formatKoreanDate(post.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{SOURCE_TYPE_LABELS[post.sourceType]}</span>
      </CardFooter>
    </Card>
  )
}
