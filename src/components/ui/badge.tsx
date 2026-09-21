import type * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * 작은 라벨. 출처 종류·유형·태그 표시에 쓴다.
 *
 * 사건 상태 라벨이 폐지되면서(2026-09-21 사용자 지시) 색으로 단계를 구분하던 variant를 전부 없앴다.
 * 남은 것은 중립 한 종류다 — 배지로 판단을 암시하지 않는다.
 */
function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex w-fit shrink-0 items-center gap-1 rounded-full border border-border bg-surface-strong px-2 py-0.5 text-xs font-medium whitespace-nowrap text-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
