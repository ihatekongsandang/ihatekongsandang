import { SITE_EN } from '@/lib/config'

/** 영어 피드 제목 — 확정 표기 "공산당이싫어요 (Korea Politics & Security Brief)", 한국어 부분에 `lang="ko"`. */
export function EnglishSiteHeading() {
  return (
    <>
      <span lang="ko">{SITE_EN.nameKo}</span> <span className="inline-block">{SITE_EN.subtitle}</span>
    </>
  )
}
