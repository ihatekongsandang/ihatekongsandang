import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { TAG_NAV_LIMIT } from '@/lib/config'
import type { TagSummary } from '@/lib/content/load'

/** 태그 칩 하나 — 피드 상단 `TagNav`와 `/tags`(전체 태그)가 같은 모양·같은 스크린리더 안내를 쓴다. */
export function TagChip({ tag, count, isActive = false }: TagSummary & { isActive?: boolean }) {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag)}`}
      aria-current={isActive ? 'page' : undefined}
      className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
    >
      <Badge
        className={
          isActive
            ? 'border-foreground bg-foreground text-background'
            : 'hover:border-foreground/40'
        }
      >
        #{tag}
        {/* 활성 칩은 배경이 검정이라 muted 색(2.29:1)을 못 쓴다 — 글자색의 70%로 낮춰 구분만 남긴다(1.4.3, 프로그래머 09 실측). */}
        <span className={isActive ? 'text-background/70' : 'text-muted-foreground'} aria-hidden="true">
          {count}
        </span>
        <span className="sr-only">게시물 {count}건</span>
      </Badge>
    </Link>
  )
}

/**
 * 태그 탐색. v0.1에 카테고리는 없고 태그만 쓴다(사용자 확정).
 *
 * `tags`는 전체 태그(`getAllTags` 순서 — 건수 내림차순)를 받고, 화면에는 상위 `TAG_NAV_LIMIT`개만 그린 뒤
 * 끝에 "전체 태그 보기" 링크로 `/tags`에 보낸다(프로그래머 08, 시안 A).
 * 지금 보고 있는 태그(`activeTag`)가 상위 밖이면 맨 앞에 붙여 현재 위치가 보이게 한다 — 그때만 상한 + 1개.
 */
export function TagNav({ tags, activeTag }: { tags: TagSummary[]; activeTag?: string }) {
  if (tags.length === 0) return null

  const visible = tags.slice(0, TAG_NAV_LIMIT)
  if (activeTag && !visible.some(({ tag }) => tag === activeTag)) {
    const active = tags.find(({ tag }) => tag === activeTag)
    if (active) visible.unshift(active)
  }

  return (
    <nav aria-label="태그" className="flex flex-wrap items-center gap-2">
      {visible.map(({ tag, count }) => (
        <TagChip key={tag} tag={tag} count={count} isActive={tag === activeTag} />
      ))}
      <Link
        href="/tags"
        className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
      >
        <Badge className="border-dashed bg-transparent font-semibold hover:bg-surface-strong">
          전체 태그 보기 ({tags.length}개)
          <span aria-hidden="true">→</span>
        </Badge>
      </Link>
    </nav>
  )
}
