import { PostCard } from '@/components/post-card'
import type { PostCardView } from '@/lib/content/view'
import { t, type Locale } from '@/lib/i18n'

/** 모바일 1열 → 태블릿 2열 → 데스크톱 3열 → 와이드 4열. */
export function PostGrid({ posts, locale = 'ko' }: { posts: PostCardView[]; locale?: Locale }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-[var(--radius-card)] border border-dashed p-8 text-center text-sm text-muted-foreground">
        {t(locale).noPosts}
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post, index) => (
        <li key={post.id} className="flex">
          <PostCard post={post} position={index + 1} priority={index < 2} locale={locale} />
        </li>
      ))}
    </ul>
  )
}
