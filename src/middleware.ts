import { NextResponse, type NextRequest } from 'next/server'

/**
 * 피드 페이지네이션 URL 정규화.
 *
 * 공개·링크되는 URL은 `?page=n` 한 형태다(크롤러가 따라갈 수 있는 실제 링크여야 한다).
 * 그런데 App Router에서 `searchParams`를 읽는 페이지는 정적 생성 대상에서 빠진다.
 * 그래서 페이지별 정적 경로(`/page/n`, `/tag/{slug}/page/n`)를 빌드 시 만들어 두고,
 * 들어온 `?page=n` 요청을 그 경로로 rewrite한다 — 주소창·크롤러가 보는 URL은 그대로 `?page=n`이다.
 *
 * `?page=1`은 기본 경로와 같은 내용이므로 쿼리를 떼어 기본 경로를 그대로 보여준다.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const raw = url.searchParams.get('page')
  if (raw === null) return NextResponse.next()

  url.searchParams.delete('page')

  const page = /^\d+$/.test(raw) ? Number(raw) : Number.NaN
  if (!Number.isInteger(page) || page <= 1) {
    // 1페이지이거나 숫자가 아니면 기본 경로를 보여준다.
    return NextResponse.rewrite(url)
  }

  const base = url.pathname.replace(/\/+$/, '')
  url.pathname = base === '' ? `/page/${page}` : `${base}/page/${page}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/', '/tag/:slug'],
}
