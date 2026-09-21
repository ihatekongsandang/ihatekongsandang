import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/config'

/**
 * GA4 스크립트. 측정 ID(`NEXT_PUBLIC_GA_ID`)가 없으면 아무것도 넣지 않는다.
 * v0.1.5에서 새 속성의 측정 ID를 환경 변수로 주입하면 그때부터 동작한다.
 * CSP를 Report-Only에서 강제로 올릴 때 googletagmanager 도메인 허용이 필요하다(vercel.json 참조).
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
