import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/**
 * 운영자가 큐레이션한 외부 링크.
 * `rel`은 `noopener`만 — `nofollow`·`ugc`·`noreferrer`를 붙이지 않는다(출처에 유입 신호를 돌려준다).
 * 검수 없이 노출되는 UGC 링크(v0.6 댓글)는 이 컴포넌트를 쓰지 않고 `nofollow ugc noopener`를 적용한다.
 * 시각적으로도 외부 이동임을 알 수 있게 아이콘을 붙이고, 아이콘은 스크린리더용 문구와 짝지운다.
 */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn('inline-flex items-baseline gap-1 text-link underline underline-offset-2', className)}
    >
      <span>{children}</span>
      <ExternalLinkIcon aria-hidden="true" className="size-3.5 shrink-0 translate-y-0.5" />
      <span className="sr-only"> (새 창에서 열림)</span>
    </a>
  )
}
