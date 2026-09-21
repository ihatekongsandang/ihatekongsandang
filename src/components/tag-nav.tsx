import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { TagSummary } from '@/lib/content/load'

/** 태그 탐색. v0.1에 카테고리는 없고 태그만 쓴다(사용자 확정). */
export function TagNav({ tags, activeTag }: { tags: TagSummary[]; activeTag?: string }) {
  if (tags.length === 0) return null

  return (
    <nav aria-label="태그" className="flex flex-wrap items-center gap-2">
      {tags.map(({ tag, count }) => {
        const isActive = tag === activeTag
        return (
          <Link
            key={tag}
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
              <span className="text-muted-foreground" aria-hidden="true">
                {count}
              </span>
              <span className="sr-only">게시물 {count}건</span>
            </Badge>
          </Link>
        )
      })}
    </nav>
  )
}
