import { ExternalLink } from '@/components/external-link'
import { Badge } from '@/components/ui/badge'
import type { PostSource } from '@/lib/content/schema'
import { formatKoreanDate } from '@/lib/utils'

/** 상태 라벨의 근거가 된 출처. 최소 1건이 빌드 검증으로 강제된다. */
export function SourceList({ sources }: { sources: PostSource[] }) {
  return (
    <section aria-labelledby="sources-heading" className="rounded-[var(--radius-card)] border bg-surface p-4">
      <h2 id="sources-heading" className="text-sm font-semibold">
        근거 출처
      </h2>
      <ul className="mt-3 space-y-2.5">
        {sources.map((source) => (
          <li key={`${source.url}-${source.date}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
            <Badge>{source.type}</Badge>
            <ExternalLink href={source.url}>{source.name}</ExternalLink>
            <time dateTime={source.date} className="text-xs text-muted-foreground">
              {formatKoreanDate(source.date)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
