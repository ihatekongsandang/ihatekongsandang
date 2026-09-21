import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-muted-foreground">
        주소가 바뀌었거나 삭제된 게시물일 수 있습니다.
      </p>
      <Link href="/" className={buttonVariants()}>
        홈으로 가기
      </Link>
    </div>
  )
}
