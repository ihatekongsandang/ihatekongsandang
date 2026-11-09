'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import type { CardMedia } from '@/lib/content/schema'
import { t, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * 이미지 슬롯을 쓰는 자리.
 * - `thumb`: 피드 카드. 768 미만은 가로형 카드의 왼쪽 112px 썸네일(모서리 6), 768 이상은 카드 위 전폭(모서리 8).
 * - `figure`: 상세 사진(모서리 8, 본문 폭 612px).
 */
type MediaVariant = 'thumb' | 'figure'

const FRAME: Record<MediaVariant, string> = {
  thumb: 'rounded-[6px] md:rounded-[var(--radius-card)]',
  figure: 'rounded-[var(--radius-card)]',
}
const SIZES: Record<MediaVariant, string> = {
  thumb: '(min-width: 1024px) 336px, (min-width: 768px) 50vw, 112px',
  figure: '(min-width: 768px) 612px, 100vw',
}

/**
 * 새 대체 카드(구현 범위 7 · 보강안 notes §1): 연한 면(`--surface`) + 안쪽 1px 장식선 + 이미지 없음 아이콘(`--icon`, 4.4:1)
 * + 폭 200px 이상이면 "대표 이미지 없음" 글자(컨테이너 쿼리). 같은 16:9 슬롯이라 레이아웃 이동이 없다.
 * 옛 회색 + 빨간 줄 텍스트 카드는 쓰지 않는다(그 이미지 파일 207건은 콘텐츠가 바뀔 때까지 `image`로 그대로 보인다).
 */
function Placeholder({ label, text, variant }: { label: string; text: string; variant: MediaVariant }) {
  return (
    <div
      className={cn(
        '@container flex aspect-[16/9] w-full flex-col items-center justify-center gap-1.5 overflow-hidden bg-surface text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]',
        FRAME[variant],
      )}
      role="img"
      aria-label={label}
    >
      <ImageOff aria-hidden="true" strokeWidth={1.6} className="size-[26px] text-icon @min-[200px]:size-8" />
      <span className="hidden text-[13px] leading-[1.3] @min-[200px]:block">{text}</span>
    </div>
  )
}

/**
 * 카드·상세의 대표 이미지 슬롯.
 *
 * - 저장소 보유 이미지(`/images/**` — self·public)는 next/image로 최적화한다.
 * - 원문 썸네일·언론 기사 대표 이미지(핫링크 — `og.image`, `image.kind: news`)는 최적화를 거치지 않는 `<img>`로 렌더한다.
 *   임의 외부 호스트를 next/image `remotePatterns`에 열면 이미지 최적화 엔드포인트가 제3자에게 열린 프록시가 되고,
 *   언론 사진을 복제·전송하게 된다(리뷰 30 L1·L4). `referrerpolicy`는 바꾸지 않는다(정책 P6 — 차단 우회 금지).
 * - 핫링크가 4xx/5xx·타임아웃으로 깨지면 onError로 같은 대체 카드로 자동 전환한다.
 * - 이미지가 아예 없어도 카드 형태를 유지하도록 항상 같은 비율의 슬롯을 차지한다.
 */
export function CardMedia({
  media,
  priority = false,
  locale = 'ko',
  altLang,
  variant = 'thumb',
}: {
  media: CardMedia
  priority?: boolean
  locale?: Locale
  /** 대체 텍스트가 페이지 언어와 다를 때(영어 피드의 한국어 원본 카드 → `'ko'`). 플레이스홀더 문구는 UI 문구라 해당 없음. */
  altLang?: 'ko'
  variant?: MediaVariant
}) {
  const [remoteFailed, setRemoteFailed] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  /*
   * 서버에서 미리 만든 HTML이라 이미지 로드는 하이드레이션보다 먼저 끝난다.
   * 그 사이에 실패하면 error 이벤트는 React가 핸들러를 붙이기 전에 지나가 버리므로
   * onError만으로는 깨진 핫링크를 잡지 못한다. 마운트 시점에 이미 끝난 로드의 결과를 직접 확인한다.
   * (로드가 끝났는데 naturalWidth가 0이면 실패다.)
   */
  useEffect(() => {
    const image = imageRef.current
    if (!image) return
    if (image.complete && image.naturalWidth === 0) setRemoteFailed(true)
  }, [media])

  if (media.kind === 'placeholder' || (media.kind === 'remote' && remoteFailed)) {
    const dict = t(locale)
    return <Placeholder label={dict.noImageLabel} text={dict.noImage} variant={variant} />
  }

  if (media.kind === 'local') {
    return (
      <div className={cn('relative aspect-[16/9] w-full overflow-hidden bg-surface', FRAME[variant])}>
        <Image
          src={media.src}
          alt={media.alt}
          lang={altLang}
          fill
          priority={priority}
          sizes={SIZES[variant]}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className={cn('relative aspect-[16/9] w-full overflow-hidden bg-surface', FRAME[variant])}>
      {/* eslint-disable-next-line @next/next/no-img-element -- 핫링크 썸네일은 의도적으로 최적화 프록시를 거치지 않는다 */}
      <img
        ref={imageRef}
        src={media.src}
        alt={media.alt}
        lang={altLang}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setRemoteFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}
