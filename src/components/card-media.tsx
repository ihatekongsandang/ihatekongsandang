'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
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
 * 옛 회색 + 빨간 줄 텍스트 카드는 쓰지 않는다(그 이미지 파일은 모두 정리돼 지금 `public/images/`에는 `.gitkeep`만 있다).
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
 * - 저장소 보유 이미지(`/images/**` — self·public·open)는 next/image로 최적화한다.
 *   `media.contain`(CC BY-ND — 프로그래머 20)은 카드·상세 모두 `object-contain`으로 자르지 않고 보인다(같은 16:9 슬롯, 남는 자리는 배경 면).
 *   단 `media.unoptimized`(공유마당 기증저작물 — 정책 §4.5-11 무변형 보수안, 프로그래머 19)는 `unoptimized`로 저장 파일을 그대로 보낸다
 *   (리사이즈·재인코딩 없음 — 최적화 엔드포인트 `/_next/image`를 거치지 않는다).
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
  onRemoteFail,
}: {
  media: CardMedia
  priority?: boolean
  locale?: Locale
  /** 대체 텍스트가 페이지 언어와 다를 때(영어 피드의 한국어 원본 카드 → `'ko'`). 플레이스홀더 문구는 UI 문구라 해당 없음. */
  altLang?: 'ko'
  variant?: MediaVariant
  /** 핫링크가 깨져 대체 카드로 바뀌는 순간 한 번 알린다(`MediaFigure`가 크레딧·사진 설명 줄을 숨길 때 쓴다). */
  onRemoteFail?: () => void
}) {
  const [remoteFailed, setRemoteFailedState] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const setRemoteFailed = (failed: true) => {
    setRemoteFailedState(failed)
    onRemoteFail?.()
  }

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
    // setRemoteFailed는 렌더마다 새로 만들어지지만 media가 같으면 다시 볼 필요가 없다(이전 동작과 같은 의존성).
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          unoptimized={media.unoptimized}
          // CC BY-ND(프로그래머 20 명세 8): 자르지 않고 전체를 보인다 — 남는 자리는 슬롯 배경(`bg-surface`)이 채운다.
          className={media.contain ? 'object-contain' : 'object-cover'}
          data-fit={media.contain ? 'contain' : undefined}
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

/**
 * 상세 사진 자리(프로그래머 15 C7 · 프로그래머 13 미해결 5).
 * `CardMedia` + 그 아래 설명 줄(`children` — 사진 설명·크레딧 figcaption)을 한 `<figure>`로 묶고,
 * 핫링크가 깨져 대체 카드로 바뀌면 설명 줄도 함께 뺀다. 사진이 안 보이는데 "사진: ○○"·"…하는 모습" 설명만
 * 대체 카드 아래 홀로 남아 다른 장면을 가리키는 것처럼 읽히는 일을 막는다.
 * 서버 HTML에는 설명 줄이 들어 있고(스크립트 없이도 사진과 함께 보인다), 깨짐은 브라우저에서만 알 수 있어
 * 하이드레이션 뒤 `CardMedia`가 알려 주면 뺀다. 저장소 이미지(local)는 이 경로로 깨지지 않는다.
 */
export function MediaFigure({
  media,
  locale = 'ko',
  className,
  children,
}: {
  media: CardMedia
  locale?: Locale
  className?: string
  children?: ReactNode
}) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={className} data-media-failed={failed ? '' : undefined}>
      <CardMedia media={media} priority locale={locale} variant="figure" onRemoteFail={() => setFailed(true)} />
      {failed ? null : children}
    </figure>
  )
}
