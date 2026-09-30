import { NotFoundMessage } from '@/components/not-found-message'
import { PageFrame } from '@/components/page-frame'

/**
 * 한국어 그룹 안의 404 (프로그래머 05-1 — 리뷰어 10 D1).
 *
 * 경로 자체가 없는 요청은 `app/global-not-found.tsx`가 받지만, 미들웨어가 `?page=n`을 `/page/n`·`/tag/{slug}/page/n`으로
 * rewrite한 뒤 그 경로가 생성되지 않은 번호(`/?page=999`)면 이 그룹의 루트 레이아웃 안에서 not-found 경계를 찾는다.
 * 이 파일이 없으면 Next 기본 404(헤더·푸터 없음)가 나간다(리뷰어 10 실측).
 * 레이아웃이 이미 `<html lang="ko">`·배너·WebSite JSON-LD를 그리므로 여기서는 헤더·본문·푸터만 그린다.
 */
export default function NotFound() {
  return (
    <PageFrame locale="ko" languageLinks={{ ko: '/', en: '/en' }}>
      <NotFoundMessage locale="ko" />
    </PageFrame>
  )
}
