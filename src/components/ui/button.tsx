import { cva } from 'class-variance-authority'

/** 링크에 버튼 모양을 입힐 때 쓴다. v0.1에는 <button> 요소가 필요한 화면이 없다. */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] border text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        outline: 'border-border bg-background hover:bg-surface-strong',
        ghost: 'border-transparent hover:bg-surface-strong',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
      },
    },
    defaultVariants: { variant: 'outline', size: 'default' },
  },
)
