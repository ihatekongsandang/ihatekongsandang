import { FLOATING_BANNER } from './config'
import type { Locale } from './i18n'

/**
 * 플로팅 배너가 본문·페이지네이션·푸터를 가리지 않도록 레이아웃에 더하는 여백.
 * 배너 본체(`FloatingBanner`)뿐 아니라 레이아웃·`PageFrame`·푸터도 여백과 표시 여부를 읽으므로
 * 배너 컴포넌트 파일이 아니라 이 모듈에 둔다(모두 서버 컴포넌트. 클라이언트는 클릭 전송용 `FloatingBannerLink`뿐이다).
 * 배너가 꺼져 있으면(`enabled: false`) 여백도 두지 않는다. 영어 페이지(`showOnEnglish: false`)도 같다.
 *
 * v0.3(프로그래머 14, 사용자 결정 D1) 값:
 * 데스크톱(≥1024px) — 배너는 폭 3rem(48px) 세로 탭으로 화면 우측에 붙는다(현행 유지).
 *   1024~1231px에서는 본문 컨테이너(max-w-6xl, gutter 40px)의 오른쪽 끝이 탭과 겹치거나 붙으므로,
 *   보강안처럼 본문·푸터 안쪽 여백을 gutter + 40px(= pr-20, 80px)로 늘린다. 1232px 이상은 좌우 여백이 탭을 이미 수용한다.
 * 휴대폰·태블릿(<1024px) — 배너는 하단 전폭 띠 52px(`--banner-h`)다.
 *   페이지 맨 아래까지 내렸을 때 푸터 문구·링크가 띠 위로 올라오도록 푸터 아래 여백을 24 + 52px(+ iOS safe-area) 둔다.
 *   키보드 Tab 이동 시 브라우저는 포커스 요소를 화면 아래 끝에 맞춰 스크롤하고 고정 요소를 고려하지 않으므로
 *   문서 스크롤 컨테이너(`html`)에 scroll-padding-bottom(52 + 16px)을 줘 포커스 요소가 띠 위에 멈추게 한다
 *   (WCAG 2.4.11 Focus Not Obscured — 리뷰어 08 D1).
 */
const GUTTER_ON = {
  html: 'max-lg:scroll-pb-[calc(var(--banner-h)+16px+env(safe-area-inset-bottom))]',
  main: 'lg:max-[77rem]:pr-20',
  footer: 'max-lg:pb-[calc(var(--banner-h)+env(safe-area-inset-bottom))] lg:max-[77rem]:[&>div]:pr-20',
} as const
const GUTTER_OFF = { html: '', main: '', footer: '' } as const

/**
 * 이 언어 페이지에 배너를 띄우는가. 영어 페이지는 `showOnEnglish`가 켜져 있을 때만(프로그래머 05 — 기본 off).
 */
export function isFloatingBannerShown(locale: Locale): boolean {
  if (!FLOATING_BANNER.enabled) return false
  return locale === 'ko' || FLOATING_BANNER.showOnEnglish
}

/** 배너를 띄우지 않는 언어에서는 여백도 두지 않는다. */
export function floatingBannerGutter(locale: Locale): { html: string; main: string; footer: string } {
  return isFloatingBannerShown(locale) ? GUTTER_ON : GUTTER_OFF
}
