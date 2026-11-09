import { ExternalLink } from '@/components/external-link'
import type { PostSource } from '@/lib/content/schema'
import { formatDate, langFor, t, type Locale } from '@/lib/i18n'

/**
 * 배경 보도 — 이 게시물의 서술을 뒷받침하는 공개 보도·발표·판결문.
 * 사진 게시물은 원문 링크가 없어 최소 1건이 빌드 검증으로 강제된다.
 * 구현 범위 11: 행마다 종류 표지(12px, 경계 --line-strong) → 링크(블록, 높이 44px 이상) → 날짜(13px).
 */
export function SourceList({ sources, locale = 'ko' }: { sources: PostSource[]; locale?: Locale }) {
  const dict = t(locale)
  return (
    <section aria-labelledby="sources-heading" className="rounded-[var(--radius-card)] border bg-surface p-4 md:p-5">
      <h2 id="sources-heading" className="text-base font-bold">
        {dict.sources}
      </h2>
      {/* 영어 페이지: 출처 기사 제목은 번역하지 않고 한국어 원문 그대로 둔다(프로그래머 05). */}
      {dict.sourcesInKorean ? <p className="mt-1 text-[13px] text-muted-foreground">{dict.sourcesInKorean}</p> : null}
      <ul className="mt-2 grid gap-2.5">
        {sources.map((source) => (
          <li key={`${source.url}-${source.date}`} className="text-[15px] leading-[1.55]">
            <span className="inline-block rounded-[4px] border border-line-strong px-1.5 text-xs leading-[18px] text-foreground">
              {dict.sourceKinds[source.type]}
            </span>
            <ExternalLink
              href={source.url}
              locale={locale}
              lang={langFor(source.name, locale)}
              className="flex min-h-11 items-start py-2"
            >
              {source.name}
            </ExternalLink>
            <time dateTime={source.date} className="block text-[13px] text-muted-foreground">
              {formatDate(source.date, locale)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
