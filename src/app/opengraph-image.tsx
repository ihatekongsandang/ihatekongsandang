import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE.name} — ${SITE.tagline}`

/**
 * 사이트 자체 OG 이미지.
 *
 * 원문 썸네일은 이 사이트 명의 소셜 공유 미리보기로 절대 재사용하지 않는다(인용 범위·초상권).
 * 그래서 게시물 상세도 이 이미지를 공유 미리보기로 쓴다.
 *
 * 문자를 넣지 않은 이유: ImageResponse의 내장 폰트는 한글 글리프가 없어 한글을 그리면 두부가 된다.
 * 한글 서체 파일을 저장소에 넣는 것은 브랜드 서체 결정(v0.2 디자이너)과 묶여야 하므로,
 * v0.1은 무문자 도형으로 둔다. 타이포 OG는 v0.2 과제다.
 */
const BARS = ['#FDE68A', '#BFDBFE', '#DDD6FE', '#FECACA', '#E4E4E7']

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          background: '#09090B',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {BARS.map((color, index) => (
            <div
              key={color}
              style={{
                width: 560 - index * 72,
                height: 34,
                borderRadius: 17,
                background: color,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  )
}
