import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { pageHref } from '@/lib/content/view'
import { t, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface PaginationProps {
  /** `/`·`/tag/{slug}`·`/en` */
  basePath: string
  page: number
  totalPages: number
  locale?: Locale
}

/**
 * 피드 페이지 이동.
 *
 * "더 보기"는 반드시 실제 `<a href="?page=n">` 링크다 — 크롤러는 버튼 클릭·JS 트리거를
 * 따라가지 않으므로 버튼만 두면 2페이지 이후 카드가 색인되지 않는다.
 * 무한스크롤은 이 링크 위에 얹는 점진적 향상 항목으로 v0.2 이후에 다룬다.
 */
export function Pagination({ basePath, page, totalPages, locale = 'ko' }: PaginationProps) {
  if (totalPages <= 1) return null
  const dict = t(locale)

  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <nav aria-label={dict.paginationNav} className="mt-10 flex flex-col items-center gap-3">
      {hasNext ? (
        <Link href={pageHref(basePath, page + 1)} className={cn(buttonVariants(), 'w-full sm:w-auto sm:min-w-56')}>
          {dict.loadMore}
          <span className="sr-only">{dict.loadMoreSr(page + 1)}</span>
        </Link>
      ) : null}

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        {hasPrev ? (
          <Link
            href={pageHref(basePath, page - 1)}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'px-2')}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
            {dict.prev}
          </Link>
        ) : null}
        <span aria-current="page">
          {dict.pageOf(page, totalPages)}
        </span>
        {hasNext ? (
          <Link
            href={pageHref(basePath, page + 1)}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'px-2')}
          >
            {dict.next}
            <ChevronRight aria-hidden="true" className="size-4" />
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
