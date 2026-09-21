import { ExternalLink } from '@/components/external-link'
import type { StatusChange } from '@/lib/content/schema'
import { formatKoreanDate } from '@/lib/utils'

/**
 * 상태 갱신 이력.
 * 사건이 진행되면 새 게시물을 만들지 않고 같은 id의 상태 라벨을 갱신하므로,
 * 어떤 단계를 거쳐 현재 라벨이 되었는지 독자가 볼 수 있어야 정보 왜곡을 막을 수 있다.
 */
export function StatusHistory({ history }: { history: StatusChange[] }) {
  if (history.length === 0) return null

  return (
    <section aria-labelledby="status-history-heading" className="rounded-[var(--radius-card)] border p-4">
      <h2 id="status-history-heading" className="text-sm font-semibold">
        상태 갱신 이력
      </h2>
      <ol className="mt-3 space-y-2 text-sm">
        {[...history].reverse().map((entry) => (
          <li key={`${entry.date}-${entry.from}-${entry.to}`} className="flex flex-wrap items-baseline gap-x-2">
            <time dateTime={entry.date} className="text-xs text-muted-foreground">
              {formatKoreanDate(entry.date)}
            </time>
            <span>
              {entry.from} → <strong className="font-semibold">{entry.to}</strong>
            </span>
            {entry.note ? <span className="text-muted-foreground">{entry.note}</span> : null}
            {entry.sourceUrl ? <ExternalLink href={entry.sourceUrl}>근거 보기</ExternalLink> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
