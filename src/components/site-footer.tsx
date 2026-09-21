import Link from 'next/link'
import { SITE } from '@/lib/config'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-surface">
      <div className="mx-auto w-full max-w-6xl space-y-2 px-4 py-8 text-sm text-[#3f3f46]">
        <p className="font-medium text-foreground">{SITE.name}</p>
        <p>{SITE.tagline}</p>
        <p>
          모든 게시물은 언론 보도·수사기관 발표·판결문 등 출처에 근거해 정리하며, 원문을 전재하지 않습니다.
          사실 확인 단계는 게시물마다 상태 라벨로 표기합니다.
        </p>
        <p>
          <Link href="/about" className="text-link underline underline-offset-2">
            출처·저작권 정책과 정정·삭제 요청 절차
          </Link>
        </p>
      </div>
    </footer>
  )
}
