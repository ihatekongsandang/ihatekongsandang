import { FLOATING_BANNER } from './config'

/**
 * 플로팅 배너가 본문·페이지네이션·푸터를 가리지 않도록 레이아웃에 더하는 여백.
 * 서버 컴포넌트(레이아웃·푸터)가 읽어야 하므로 `'use client'` 배너 파일과 분리해 둔다.
 * 배너가 꺼져 있으면(`enabled: false`) 여백도 두지 않는다.
 *
 * 데스크톱(≥1024px) — 배너는 폭 3rem(48px) 세로 탭으로 화면 우측에 붙는다.
 *   본문 컨테이너(max-w-6xl = 1152px, 좌우 padding 1rem)의 오른쪽 끝이 탭보다 8px 이상 왼쪽에 있으려면
 *   (vw + 1152) / 2 - 16 ≤ vw - 48 - 8  →  vw ≥ 1232px(77rem).
 *   그래서 1024~1231px 구간에서만 본문 내용의 오른쪽 끝을 뷰포트 오른쪽에서 3.5rem(탭 48px + 8px) 안쪽으로 당긴다.
 *   `main`은 자기 padding이 곧 여백이라 pr-14(3.5rem), 푸터는 안쪽 컨테이너 padding(1rem)이 따로 있어 pr-10(2.5rem).
 *   1232px 이상에서는 좌우 여백이 탭을 이미 수용하므로 레이아웃을 건드리지 않는다.
 * 모바일·태블릿(<1024px) — 배너는 우측 하단 고정 버튼이다.
 *   페이지 맨 아래까지 내렸을 때 푸터 문구·링크가 버튼 위로 올라오도록 푸터 아래에 여백을 둔다.
 *   iOS 홈 인디케이터 영역(safe-area)만큼 더한다.
 *   키보드 Tab 이동 시 브라우저는 포커스 요소를 화면 아래 끝에 맞춰 스크롤하고 고정 요소를 고려하지 않는다.
 *   그래서 문서 스크롤 컨테이너(`html`)에 같은 값의 scroll-padding-bottom을 줘 포커스 요소가
 *   버튼 위쪽에 멈추게 한다(WCAG 2.4.11 Focus Not Obscured — 리뷰어 08 D1).
 */
export const FLOATING_BANNER_GUTTER = FLOATING_BANNER.enabled
  ? {
      html: 'max-lg:scroll-pb-[calc(5.5rem+env(safe-area-inset-bottom))]',
      main: 'lg:max-[77rem]:pr-14',
      footer: 'max-lg:pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:max-[77rem]:pr-10',
    }
  : { html: '', main: '', footer: '' }
