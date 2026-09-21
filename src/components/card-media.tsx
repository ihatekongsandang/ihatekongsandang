'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import type { CardMedia } from '@/lib/content/schema'

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-1.5 bg-surface-strong"
      role="img"
      aria-label={label}
    >
      <ImageOff aria-hidden="true" className="size-6 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">이미지 없음</span>
    </div>
  )
}

/**
 * 카드·상세의 대표 이미지 슬롯.
 *
 * - 저장소 보유 이미지(`/images/**`)는 next/image로 최적화한다.
 * - 원문 썸네일(핫링크)은 최적화를 거치지 않는 <img>로 렌더한다. 임의 외부 호스트를
 *   next/image `remotePatterns`에 열면 이미지 최적화 엔드포인트가 제3자에게 열린 프록시가 되기 때문이다.
 * - 핫링크가 4xx/5xx·타임아웃으로 깨지면 onError로 플레이스홀더로 자동 전환한다.
 * - 이미지가 아예 없어도 카드 형태를 유지하도록 항상 같은 비율의 슬롯을 차지한다.
 */
export function CardMedia({ media, priority = false }: { media: CardMedia; priority?: boolean }) {
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
    return <Placeholder label="대표 이미지가 없어 대체 표시된 영역" />
  }

  if (media.kind === 'local') {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-strong">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-strong">
      {/* eslint-disable-next-line @next/next/no-img-element -- 핫링크 썸네일은 의도적으로 최적화 프록시를 거치지 않는다 */}
      <img
        ref={imageRef}
        src={media.src}
        alt={media.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setRemoteFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}
