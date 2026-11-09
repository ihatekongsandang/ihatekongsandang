import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
 * 보여 줄 쪽 번호 — 첫 쪽·끝 쪽·현재 쪽 앞뒤 1쪽, 그리고 1쪽에 있을 때는 1·2·3(보강안 목업 "1 2 3 … 18").
 * 빠진 구간은 `'gap'`(…) 하나로 줄인다. 구간이 한 쪽뿐이면 …대신 그 번호를 그린다.
 */
export function pageWindow(page: number, totalPages: number): (number | 'gap')[] {
  const wanted = new Set<number>([1, totalPages, page - 1, page, page + 1])
  if (page <= 2) [2, 3].forEach((n) => wanted.add(n))
  if (page >= totalPages - 1) [totalPages - 1, totalPages - 2].forEach((n) => wanted.add(n))
  const pages = [...wanted].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b)
  const out: (number | 'gap')[] = []
  pages.forEach((n, index) => {
    const prev = pages[index - 1]
    if (prev !== undefined && n - prev === 2) out.push(prev + 1)
    else if (prev !== undefined && n - prev > 2) out.push('gap')
    out.push(n)
  })
  return out
}

const PAGE_BOX =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-card)] border px-2.5 text-[15px] font-semibold'

/**
 * 피드 페이지 이동(사용자 결정 D2 · 보강안 B1 · 구현 범위 8).
 *
 * "다음 페이지 2 / 18" 큰 버튼 + 이전·1·2·3·…·끝·다음 쪽 번호. **전부 실제 `<a href="?page=n">` 링크**다 —
 * 크롤러는 버튼 클릭·JS 트리거를 따라가지 않으므로 링크가 아니면 2페이지 이후 카드가 색인되지 않는다.
 * 보이는 글자가 숫자뿐인 쪽 번호에는 sr-only로 "N페이지"를 붙이고, 현재 쪽은 `aria-current="page"`.
 * 첫·끝 쪽의 "이전"·"다음"은 링크가 아닌 표시용 `<span>`으로 자리를 지킨다(레이아웃이 흔들리지 않게). 역할 없는 요소라
 * `aria-disabled`는 의미가 없어 달지 않고, "이전 페이지 없음"·"다음 페이지 없음" sr-only 문구로 전한다(리뷰 31 P3-7).
 */
export function Pagination({ basePath, page, totalPages, locale = 'ko' }: PaginationProps) {
  if (totalPages <= 1) return null
  const dict = t(locale)

  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <nav
      aria-label={dict.paginationNav}
      className="grid justify-items-center gap-3 pt-5 pb-2 md:grid-cols-[auto_auto] md:items-center md:justify-center md:gap-4"
    >
      {hasNext ? (
        <Link
          href={pageHref(basePath, page + 1)}
          rel="next"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-card)] bg-foreground px-5 text-base font-bold text-white md:order-2 md:w-auto md:min-w-[220px]"
        >
          {dict.nextPage}
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="text-sm font-medium text-[#d4d4d8]">{dict.nextPageOf(page + 1, totalPages)}</span>
        </Link>
      ) : null}

      <ul className="flex flex-wrap justify-center gap-1.5">
        <li>
          {hasPrev ? (
            <Link
              href={pageHref(basePath, page - 1)}
              rel="prev"
              className={cn(PAGE_BOX, 'border-line-strong bg-background text-foreground')}
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              <span className="sr-only">{dict.prevPage}</span>
            </Link>
          ) : (
            <span className={cn(PAGE_BOX, 'border-border text-[#a1a1aa]')}>
              <ChevronLeft aria-hidden="true" className="size-4" />
              <span className="sr-only">{dict.noPrevPage}</span>
            </span>
          )}
        </li>
        {pageWindow(page, totalPages).map((item, index) =>
          item === 'gap' ? (
            <li key={`gap-${index}`} aria-hidden="true" className="inline-flex min-h-11 items-center px-0.5 text-muted-foreground">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={pageHref(basePath, item)}
                aria-current={item === page ? 'page' : undefined}
                className={cn(
                  PAGE_BOX,
                  item === page
                    ? 'border-foreground bg-foreground text-white'
                    : 'border-line-strong bg-background text-foreground hover:bg-surface',
                )}
              >
                <span className="sr-only">{item === page ? dict.currentPageSr(item) : dict.pageNumberSr(item)}</span>
                <span aria-hidden="true">{item}</span>
              </Link>
            </li>
          ),
        )}
        <li>
          {hasNext ? (
            <Link
              href={pageHref(basePath, page + 1)}
              className={cn(PAGE_BOX, 'border-line-strong bg-background text-foreground')}
            >
              <ChevronRight aria-hidden="true" className="size-4" />
              <span className="sr-only">{dict.nextPage}</span>
            </Link>
          ) : (
            <span className={cn(PAGE_BOX, 'border-border text-[#a1a1aa]')}>
              <ChevronRight aria-hidden="true" className="size-4" />
              <span className="sr-only">{dict.noNextPage}</span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
