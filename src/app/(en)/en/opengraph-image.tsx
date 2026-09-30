import { SITE_EN } from '@/lib/config'
import OpengraphImage from '../../opengraph-image'

/**
 * 영어 페이지 OG 이미지 — 한국어와 같은 사이트 자체 이미지(무문자 도형)를 그대로 쓰고,
 * 대체 텍스트만 영어로 둔다. 원문 썸네일은 공유 미리보기로 쓰지 않는다(인용 범위·초상권).
 * `size`·`contentType`은 Next가 이 파일에서 직접 읽으므로 다시 선언한다(루트 파일과 같은 값).
 */
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_EN.name} — ${SITE_EN.tagline}`

export default function EnglishOpengraphImage() {
  return OpengraphImage()
}
