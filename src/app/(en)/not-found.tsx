import { NotFoundMessage } from '@/components/not-found-message'
import { PageFrame } from '@/components/page-frame'

/**
 * 영어 그룹 안의 404 (프로그래머 05-1 — 리뷰어 10 D1).
 *
 * `/en?page=99`처럼 미들웨어가 `/en/page/n`으로 rewrite한 뒤 생성되지 않은 번호면 이 그룹의 루트 레이아웃 안에서 렌더된다.
 * 그래서 `<html lang="en">`이고 배너가 없다. 경로 자체가 없는 요청(`/en/post/{영어본 없는 id}`)은 전역 404가 받는다.
 */
export default function NotFound() {
  return (
    <PageFrame locale="en" languageLinks={{ ko: '/', en: '/en' }}>
      <NotFoundMessage locale="en" />
    </PageFrame>
  )
}
