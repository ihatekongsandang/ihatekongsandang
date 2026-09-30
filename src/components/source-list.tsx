import { ExternalLink } from '@/components/external-link'
import { Badge } from '@/components/ui/badge'
import type { PostSource } from '@/lib/content/schema'
import { formatDate, langFor, t, type Locale } from '@/lib/i18n'

/**
 * 배경 보도 — 이 게시물의 서술을 뒷받침하는 공개 보도·발표·판결문.
 * 사진 게시물은 원문 링크가 없어 최소 1건이 빌드 검증으로 강제된다.
 */
export function SourceList({ sources, locale = 'ko' }: { sources: PostSource[]; locale?: Locale }) {
  const dict = t(locale)
  return (
    <section aria-labelledby="sources-heading" className="rounded-[var(--radius-card)] border bg-surface p-4">
      <h2 id="sources-heading" className="text-sm font-semibold">
        {dict.sources}
      </h2>
      {/* 영어 페이지: 출처 기사 제목은 번역하지 않고 한국어 원문 그대로 둔다(프로그래머 05). */}
      {dict.sourcesInKorean ? <p className="mt-1 text-xs text-muted-foreground">{dict.sourcesInKorean}</p> : null}
      <ul className="mt-3 space-y-2.5">
        {sources.map((source) => (
          <li key={`${source.url}-${source.date}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
            <Badge>{dict.sourceKinds[source.type]}</Badge>
            <ExternalLink href={source.url} locale={locale} lang={langFor(source.name, locale)}>
              {source.name}
            </ExternalLink>
            <time dateTime={source.date} className="text-xs text-muted-foreground">
              {formatDate(source.date, locale)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
