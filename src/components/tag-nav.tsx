import Link from 'next/link'
import { TAG_NAV_LIMIT } from '@/lib/config'
import type { TagSummary } from '@/lib/content/load'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * 칩 링크 공통 모양(보강안 tokens §3): 보이는 알약은 36px, 누르는 링크 상자는 44px(알약 위아래 4px).
 * 포커스 링은 링크 상자에 **안쪽으로**(offset -2px) 그린다 — 레일이 가로 스크롤 컨테이너라 바깥 링은 위아래가 잘린다.
 * 링크 상자와 알약 폭이 같도록 칩 사이 간격은 목록의 gap이 맡는다.
 */
export const CHIP_LINK =
  'group inline-flex min-h-11 shrink-0 items-center rounded-full text-sm whitespace-nowrap focus-visible:rounded-full focus-visible:-outline-offset-2'
export function chipFace(isActive = false, extra?: string) {
  return cn(
    'inline-flex min-h-9 items-center gap-1.5 rounded-full border px-[13px]',
    isActive ? 'border-foreground bg-foreground font-semibold text-white' : 'border-line-strong bg-background group-hover:bg-surface',
    extra,
  )
}

/** 태그 칩 하나 — 피드 상단 `TagNav`와 `/tags`(전체 태그)가 같은 모양·같은 스크린리더 안내를 쓴다. */
export function TagChip({ tag, count, isActive = false }: TagSummary & { isActive?: boolean }) {
  return (
    <Link href={`/tag/${encodeURIComponent(tag)}`} aria-current={isActive ? 'page' : undefined} className={CHIP_LINK}>
      <span className={chipFace(isActive)}>
        #{tag}
        {/* 활성 칩은 검정 면이라 muted 색을 못 쓴다 — #e4e4e7(13.96:1, tokens §1). */}
        <span className={isActive ? 'text-[#e4e4e7]' : 'text-muted-foreground'} aria-hidden="true">
          {count}
        </span>
        <span className="sr-only">게시물 {count}건</span>
      </span>
    </Link>
  )
}

/**
 * 태그 탐색 레일(구현 범위 4 · 보강안 A1). v0.1에 카테고리는 없고 태그만 쓴다(사용자 확정).
 *
 * 한 줄 가로 스크롤 레일(끝 페이드) — 예전 flex-wrap 칩 묶음이 모바일 첫 화면을 3화면 넘게 차지하던 문제(진단)를 없앤다.
 * `tags`는 전체 태그(`getAllTags` 순서 — 건수 내림차순)를 받고, 상위 `TAG_NAV_LIMIT`개만 그린 뒤
 * 끝에 "전체 주제 N개" 칩으로 `/tags`에 보낸다(프로그래머 08). 지금 보고 있는 태그(`activeTag`)가 상위 밖이면 맨 앞에 붙인다.
 * 레일은 화면 가장자리까지 닿도록 좌우 gutter만큼 바깥으로 넓히고, 같은 값만큼 안쪽 여백을 준다.
 */
export function TagNav({ tags, activeTag }: { tags: TagSummary[]; activeTag?: string }) {
  if (tags.length === 0) return null
  const dict = t('ko')

  const visible = tags.slice(0, TAG_NAV_LIMIT)
  if (activeTag && !visible.some(({ tag }) => tag === activeTag)) {
    const active = tags.find(({ tag }) => tag === activeTag)
    if (active) visible.unshift(active)
  }

  return (
    // `relative`: 칩 안 sr-only(position: absolute)가 스크롤 컨테이너를 벗어나 문서 폭을 늘리지 않게 한다(360 실측 1187px로 넓어졌다).
    <nav aria-label={dict.tagRail} className="relative -mx-4 mt-1 overflow-hidden md:-mx-8 lg:-mx-10 xl:-mx-12">
      <ul className="tag-rail relative flex gap-x-2 snap-x snap-proximity overflow-x-auto scroll-px-4 px-4 md:scroll-px-8 md:px-8 lg:scroll-px-10 lg:px-10 xl:scroll-px-12 xl:px-12">
        {visible.map(({ tag, count }) => (
          <li key={tag} className="shrink-0 snap-start">
            <TagChip tag={tag} count={count} isActive={tag === activeTag} />
          </li>
        ))}
        <li className="shrink-0 snap-start">
          <Link href="/tags" className={CHIP_LINK}>
            <span className={chipFace(false, 'border-dashed font-semibold')}>{dict.allTopics(tags.length)}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
