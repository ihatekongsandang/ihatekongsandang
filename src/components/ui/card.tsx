import type * as React from 'react'
import { cn } from '@/lib/utils'

/** shadcn/ui Card 패턴 — v0.1은 CLI 없이 같은 구조를 직접 두어 v0.2 디자이너가 그대로 이어받게 한다. */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-background',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('flex flex-1 flex-col gap-2 p-4', className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('text-base leading-snug font-semibold tracking-tight', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-2 px-4 pb-4 text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Card, CardContent, CardTitle, CardFooter }
