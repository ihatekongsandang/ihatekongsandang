'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, CopyX, Link2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { GA_EVENTS, trackEvent } from '@/lib/analytics'
import { getSiteUrl } from '@/lib/config'
import { postPath, t, type Locale } from '@/lib/i18n'
import { threadsIntentUrl, xIntentUrl } from '@/lib/share'
import { cn } from '@/lib/utils'

type CopyState = 'idle' | 'success' | 'error'
type ShareMethod = 'copy_link' | 'x' | 'threads'

const RESET_MS = 2000
const buttonClass = cn(buttonVariants({ variant: 'outline' }), 'h-11 min-w-0 flex-1 justify-center px-2 text-center leading-tight sm:flex-none sm:px-4')

/**
 * 상세 공유 버튼 (D4 (가) — 링크 복사·X·스레드). 프로그래머 11, 시안 01 + 리뷰 25 P3-1·2·3·10.
 *
 * - 외부 SDK·스크립트 없음: X·스레드는 web intent `<a href>`, 복사는 `navigator.clipboard`만. 카카오톡은 범위 밖.
 * - 접근성 이름 = 보이는 텍스트(`aria-label` 없음, P3-1 — 복사 상태가 바뀌면 이름도 같이 바뀐다).
 *   복사 결과는 처음부터 DOM에 있는 `role="status"` 영역으로 알린다. `alert()`를 쓰지 않는다.
 * - 새 창으로 여는 두 링크에는 sr-only "(새 창에서 열림)"을 붙인다(P3-10, 기존 `opensInNewTab` 문구).
 * - 공유 URL: `NEXT_PUBLIC_SITE_URL`이 있으면 그 절대 URL(서버 렌더와 같은 값), 없으면 마운트 뒤 `window.location.origin`(P3-3).
 * - GA4 추천 이벤트 `share`(`method`·`content_type`·`item_id`). 영어 상세는 기존 카드 이벤트처럼 `language: 'en'`을 더한다.
 */
export function ShareButtons({ id, title, locale }: { id: string; title: string; locale: Locale }) {
  const dict = t(locale)
  const path = postPath(locale, id)
  const [origin, setOrigin] = useState(() => getSiteUrl() ?? '')
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [announcement, setAnnouncement] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (!getSiteUrl()) setOrigin(window.location.origin)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const pageUrl = `${origin}${path}`

  function track(method: ShareMethod) {
    trackEvent(GA_EVENTS.share, {
      method,
      content_type: 'post',
      item_id: id,
      ...(locale === 'en' ? { language: 'en' } : {}),
    })
  }

  function settle(state: Exclude<CopyState, 'idle'>) {
    setCopyState(state)
    setAnnouncement(state === 'success' ? dict.shareCopiedAnnounce : dict.shareCopyFailedAnnounce)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setCopyState('idle')
      setAnnouncement('')
    }, RESET_MS)
  }

  async function handleCopy() {
    track('copy_link')
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(pageUrl)
      settle('success')
    } catch {
      settle('error')
    }
  }

  const CopyIcon = copyState === 'success' ? Check : copyState === 'error' ? CopyX : Link2
  const copyLabel =
    copyState === 'success' ? dict.shareCopied : copyState === 'error' ? dict.shareCopyFailed : dict.shareCopyLink

  return (
    <section aria-labelledby="share-heading" className="space-y-3">
      <h2 id="share-heading" className="sr-only">
        {dict.shareHeading}
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-start">
        <button type="button" onClick={handleCopy} className={buttonClass}>
          <CopyIcon aria-hidden="true" className="size-4" />
          <span>{copyLabel}</span>
        </button>
        <a href={xIntentUrl(title, pageUrl)} target="_blank" rel="noopener" onClick={() => track('x')} className={buttonClass}>
          <span>{dict.shareX}</span>
          <span className="sr-only">{dict.opensInNewTab}</span>
        </a>
        <a
          href={threadsIntentUrl(title, pageUrl)}
          target="_blank"
          rel="noopener"
          onClick={() => track('threads')}
          className={buttonClass}
        >
          <span>{dict.shareThreads}</span>
          <span className="sr-only">{dict.opensInNewTab}</span>
        </a>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  )
}
