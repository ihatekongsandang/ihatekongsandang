import { Badge } from '@/components/ui/badge'
import type { CourtLevel, StatusLabel } from '@/lib/content/schema'

const TONE_BY_STATUS = {
  의혹: 'doubt',
  수사중: 'investigating',
  기소: 'indicted',
  유죄판결: 'convicted',
  종결: 'closed',
} as const satisfies Record<StatusLabel, string>

interface StatusBadgeProps {
  status: StatusLabel
  /** `유죄판결`은 심급을 반드시 병기한다 — 배지 한 단어로 심급 정보가 사라지지 않게 한다. */
  courtLevel?: CourtLevel
}

export function StatusBadge({ status, courtLevel }: StatusBadgeProps) {
  const label = status === '유죄판결' && courtLevel ? `${status} · ${courtLevel}` : status
  return (
    <Badge tone={TONE_BY_STATUS[status]}>
      <span className="sr-only">사실 확인 단계: </span>
      {label}
    </Badge>
  )
}
