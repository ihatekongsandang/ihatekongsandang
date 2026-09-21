import Image from 'next/image'
import type { PostImage } from '@/lib/content/schema'

/**
 * 사진 게시물의 이미지 열람.
 * 여러 장이면 가로 스와이프(CSS scroll-snap) — JS 캐러셀을 쓰지 않아 스크립트가 없어도 동작하고
 * 키보드·스크린리더로도 그대로 스크롤된다. 과도한 압축을 피하려 품질을 기본값보다 높인다.
 */
export function Gallery({ images }: { images: PostImage[] }) {
  if (images.length === 0) return null

  const isSingle = images.length === 1

  return (
    <div
      className={
        isSingle
          ? 'space-y-2'
          : 'flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]'
      }
      {...(isSingle ? {} : { role: 'group', 'aria-label': `사진 ${images.length}장 — 가로로 넘겨 보세요` })}
    >
      {images.map((image, index) => (
        <figure
          key={image.src}
          className={isSingle ? 'space-y-2' : 'w-[85%] shrink-0 snap-center space-y-2 sm:w-[60%]'}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            quality={90}
            priority={index === 0}
            sizes="(min-width: 768px) 700px, 100vw"
            className="h-auto w-full rounded-[var(--radius-card)] border bg-surface-strong object-contain"
          />
          {image.caption ? (
            <figcaption className="text-xs text-muted-foreground">{image.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  )
}
