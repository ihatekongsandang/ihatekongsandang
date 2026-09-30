import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { homePath, type Locale } from '@/lib/i18n'

const MESSAGES: Record<Locale, { title: string; body: string; home: string }> = {
  ko: {
    title: '페이지를 찾을 수 없습니다',
    body: '주소가 바뀌었거나 삭제된 게시물일 수 있습니다.',
    home: '홈으로 가기',
  },
  en: {
    title: 'Page not found',
    body: 'The address may have changed, or the post may have been removed.',
    home: 'Go to the English home',
  },
}

/**
 * 404 안내 본문 — 전역 404(`app/global-not-found.tsx`)와 언어 그룹 안 404(`(ko)`·`(en)`의 `not-found.tsx`)가 함께 쓴다.
 * 한국어 문구·마크업은 기존 404와 같다. `children`은 안내 아래에 덧붙는 내용(전역 404의 영어 안내 한 줄).
 */
export function NotFoundMessage({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const message = MESSAGES[locale]
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{message.title}</h1>
      <p className="text-sm text-muted-foreground">{message.body}</p>
      <Link href={homePath(locale)} className={buttonVariants()}>
        {message.home}
      </Link>
      {children}
    </div>
  )
}
