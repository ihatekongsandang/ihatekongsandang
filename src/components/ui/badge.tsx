import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'border-border bg-surface-strong text-foreground',
        doubt:
          'border-[var(--status-doubt-border)] bg-[var(--status-doubt-bg)] text-[var(--status-doubt-fg)]',
        investigating:
          'border-[var(--status-investigating-border)] bg-[var(--status-investigating-bg)] text-[var(--status-investigating-fg)]',
        indicted:
          'border-[var(--status-indicted-border)] bg-[var(--status-indicted-bg)] text-[var(--status-indicted-fg)]',
        convicted:
          'border-[var(--status-convicted-border)] bg-[var(--status-convicted-bg)] text-[var(--status-convicted-fg)]',
        closed:
          'border-[var(--status-closed-border)] bg-[var(--status-closed-bg)] text-[var(--status-closed-fg)]',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

function Badge({ className, tone, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ tone }), className)} {...props} />
}

export { Badge, badgeVariants }
