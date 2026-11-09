import { SITE_EN } from '@/lib/config'

/**
 * 영어 피드 제목 — 확정 표기 "공산당이싫어요 (Korea Politics & Security Brief)", 한국어 부분에 `lang="ko"`.
 * 768 미만에서는 헤더가 한국어 이름만 보이므로(D3) 부제를 h1 둘째 줄(15px)로 두고, 768 이상은 같은 줄(17px)에 붙인다.
 */
export function EnglishSiteHeading() {
  return (
    <>
      <span lang="ko">{SITE_EN.nameKo}</span>{' '}
      <span className="block text-[15px] leading-[22px] font-medium tracking-normal text-muted-foreground md:ml-1.5 md:inline md:text-[17px]">
        {SITE_EN.subtitle}
      </span>
    </>
  )
}
