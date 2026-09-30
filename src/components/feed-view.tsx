import { Pagination } from '@/components/pagination'
import { PostGrid } from '@/components/post-grid'
import { TagNav } from '@/components/tag-nav'
import type { TagSummary } from '@/lib/content/load'
import type { PostCardView } from '@/lib/content/view'
import { t, type Locale } from '@/lib/i18n'

interface FeedViewProps {
  heading: string
  lead?: string
  /** `/`·`/tag/{slug}`·`/en` — "더 보기" 링크의 기준 경로. */
  basePath: string
  posts: PostCardView[]
  page: number
  totalPages: number
  totalItems: number
  tags: TagSummary[]
  activeTag?: string
  locale?: Locale
  /** 제목을 문자열 대신 직접 그릴 때(영어 사이트명의 한국어 부분에 `lang`을 달기 위해). */
  headingNode?: React.ReactNode
  /** 설명 아래 안내 한 줄(영어 피드의 "Korean only" 안내, 프로그래머 06). */
  notice?: string
}

export function FeedView({
  heading,
  lead,
  basePath,
  posts,
  page,
  totalPages,
  totalItems,
  tags,
  activeTag,
  locale = 'ko',
  headingNode,
  notice,
}: FeedViewProps) {
  const dict = t(locale)
  const leadNode = lead ? <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{lead}</p> : null
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{headingNode ?? heading}</h1>
        {/* 안내가 없을 때는 설명 한 슬롯만 둔다 — 한국어 피드의 서버 트리(RSC)를 이전과 같게 유지(프로그래머 06). */}
        {notice ? (
          <>
            {leadNode}
            <p className="max-w-3xl text-sm text-muted-foreground">{notice}</p>
          </>
        ) : (
          leadNode
        )}
      </div>

      {/* 영어 페이지는 태그 칩을 두지 않는다 — 한국어 태그 페이지로 보내지 않기 위해(프로그래머 05). */}
      {locale === 'ko' ? <TagNav tags={tags} activeTag={activeTag} /> : null}

      <div className="flex items-baseline justify-between gap-4 border-t pt-6">
        <h2 className="text-sm font-semibold">{dict.latestPosts}</h2>
        <p className="text-xs text-muted-foreground">
          {dict.feedCount(totalItems, page, totalPages)}
        </p>
      </div>

      <PostGrid posts={posts} locale={locale} />
      <Pagination basePath={basePath} page={page} totalPages={totalPages} locale={locale} />
    </div>
  )
}
