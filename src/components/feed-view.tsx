import { Pagination } from '@/components/pagination'
import { PostGrid } from '@/components/post-grid'
import { TagNav } from '@/components/tag-nav'
import type { TagSummary } from '@/lib/content/load'
import type { PostCardView } from '@/lib/content/view'

interface FeedViewProps {
  heading: string
  lead?: string
  /** `/` 또는 `/tag/{slug}` — "더 보기" 링크의 기준 경로. */
  basePath: string
  posts: PostCardView[]
  page: number
  totalPages: number
  totalItems: number
  tags: TagSummary[]
  activeTag?: string
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
}: FeedViewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{heading}</h1>
        {lead ? <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{lead}</p> : null}
      </div>

      <TagNav tags={tags} activeTag={activeTag} />

      <div className="flex items-baseline justify-between gap-4 border-t pt-6">
        <h2 className="text-sm font-semibold">최신 게시물</h2>
        <p className="text-xs text-muted-foreground">
          전체 {totalItems}건 · {page} / {totalPages} 페이지
        </p>
      </div>

      <PostGrid posts={posts} />
      <Pagination basePath={basePath} page={page} totalPages={totalPages} />
    </div>
  )
}
