import { PostCard } from '@/components/post-card'
import type { PostCardView } from '@/lib/content/view'
import { t, type Locale } from '@/lib/i18n'

/**
 * 피드 목록(구현 범위 5): 768 미만 1열 가로형(카드 사이 구분선) → 768 2열 세로형 → 1024 이상 3열 세로형.
 * 4열은 쓰지 않는다(카드 268px에서 이미지·제목이 작아지는 문제, 보강안 tokens §4).
 */
export function PostGrid({ posts, locale = 'ko' }: { posts: PostCardView[]; locale?: Locale }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-[var(--radius-card)] border border-dashed border-line-strong p-8 text-center text-sm text-muted-foreground">
        {t(locale).noPosts}
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-1 border-t md:grid-cols-2 md:gap-x-6 md:gap-y-7 md:border-t-0 md:pt-2 lg:grid-cols-3 lg:gap-y-8">
      {posts.map((post, index) => (
        <li key={post.id} className="border-b md:border-b-0">
          <PostCard post={post} position={index + 1} priority={index < 2} locale={locale} />
        </li>
      ))}
    </ul>
  )
}
