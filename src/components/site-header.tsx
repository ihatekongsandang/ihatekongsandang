import Link from 'next/link'
import { SITE } from '@/lib/config'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {SITE.name}
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            홈
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">
            소개
          </Link>
        </nav>
      </div>
    </header>
  )
}
