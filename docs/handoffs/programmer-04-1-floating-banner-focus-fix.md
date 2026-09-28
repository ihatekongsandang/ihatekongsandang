# 프로그래머 세션 — 04-1-floating-banner-focus-fix 핸드오프
**작성일**: 2026-09-28 14:05 | **작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/04-1-floating-banner-focus-fix.md`
**근거 리뷰**: `docs/reviews/programmer-04-floating-banner-review.md` (리뷰어 08, 🟡 조건부 승인 — D1)

## 요약 (3줄)
1. **D1 해소** — `<1024px`에서 `<html>`에 `scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom))`(`FLOATING_BANNER_GUTTER.html`, `enabled`일 때만). 리뷰어 `review-qa.mjs focus` 전수(945건 · 탭 정지점 61,145개) **완전 가림 723 → 0 · 일부 가림 2,703 → 0**.
2. **R2·R3 반영** — 배너 본체를 서버 컴포넌트로 바꾸고 GA 클릭 전송만 `FloatingBannerLink`(클라이언트)로 분리. `enabled:false`·`true` 빌드 모두 **클라이언트 JS 청크 28개 중 배너 문자열 포함 0개**, 루트 layout 청크 gzip 3,051 → **2,382 B(−669 B)**.
3. **R1 정정**(아래 표) · 회귀 재실측 전부 통과 — validate 45/45 · typecheck 0 · lint 0 errors · build 142/142 · geometry 8,079/0 · behavior 31/31 · static on/off 135/135 · GA 3/3(+Enter 1건) · 대비 8/8 · CLS 0. 🔴 커밋하지 않음.

## 산출물

### 변경 파일 (04 작업 트리 대비 이번 04-1 변경분)
| 파일 | 구분 | 내용 |
|---|---|---|
| `src/lib/floating-banner.ts` | 수정 | `FLOATING_BANNER_GUTTER`에 `html: 'max-lg:scroll-pb-[calc(5.5rem+env(safe-area-inset-bottom))]'` 추가(off면 `''`) + 근거 주석(2.4.11·D1) |
| `src/app/layout.tsx` | 수정 | `<html className={FLOATING_BANNER_GUTTER.html \|\| undefined}>` — off면 `class` 속성 자체가 없음(`<html lang="ko">` 확인) |
| `src/components/floating-banner.tsx` | 수정 | `'use client'` 제거 → 서버 컴포넌트. `<a>` 대신 `FloatingBannerLink`에 `href`·`label`·`className`·children 전달 |
| `src/components/floating-banner-link.tsx` | 신규 | `'use client'` 링크 — `target="_blank"` · `rel="noopener nofollow"` · onClick GA 전송만. `config.ts`를 import하지 않는다 |

04에서 바뀐 나머지(`config.ts`·`analytics.ts`·`site-footer.tsx`)는 이번에 손대지 않았다.

### 도구·증거
| 경로 | 내용 |
|---|---|
| `docs/tools/programmer-04-1/static-check.mjs` | 04 도구 확장판 — on: 여백 클래스 4종(`<html>` scroll-padding 포함, `<html>` 태그 안에 있는지까지) · off: 기존 + **`.next/static/**/*.js` 전수에서 배너 문자열 5종(`signforkorea`·`재판재개`·`서명운동`·`외부 사이트로 이동합니다`·`외부 링크 안내`) 0** |
| `docs/tools/programmer-04-1/results/` | `focus.log` · `geometry.log` · `behavior.log` · `ga.log` · `cls.log` · `contrast.log` (이번 실행 원본 로그) |
| `docs/qa/programmer-04-1/focus-fixed--320--home.png` | 리뷰어 D1 증거와 같은 조건(320×640 홈, Tab으로 `#알파폰`)에서 수정 후 화면 — 포커스 상자 (176,297)–(242,323), 배너 (80,566)–(304,624) → 겹침 없음. 보완안을 **주입하지 않고** 실제 빌드로 찍음 |
| `docs/qa/programmer-04-1/home--390--top.png` · `home--390--bottom.png` | 390px 재촬영 — 포인터 화면은 04와 동일(맨 아래에서 푸터 링크가 버튼 위) |

## D1 / R1 / R2 / R3 처리 결과

### D1 — 모바일 포커스 가림(WCAG 2.4.11) ✅
- 방식: 오더대로 문서 스크롤 컨테이너(`html`)에 `<1024px` 한정 scroll-padding-bottom, 값은 푸터 여백과 동일.
- CSS 산출물 확인: `@media not all and (min-width:64rem){.max-lg\:scroll-pb-[…]{scroll-padding-bottom:calc(5.5rem + env(safe-area-inset-bottom))}}`
- `review-qa.mjs focus`(리뷰어 도구 그대로, `--scroll-padding` 주입 없음) 결과:

| 폭 | 탭 정지점 | 완전 가림 (04 → 04-1) | 일부 가림 (04-1) |
|---|---|---|---|
| 320×640 | 8,735 | 437 → **0** | 0 |
| 360×740 | 8,735 | 118 → **0** | 0 |
| 390×844 | 8,735 | 168 → **0** | 0 |
| 768×1024 | 8,735 | 0 → 0 | 0 |
| 1023×768 | 8,735 | 0 → 0 | 0 |
| 1024×768 | 8,735 | 0 → 0 | 0 |
| 1280×900 | 8,735 | 0 → 0 | 0 |
| **합계** | **61,145** (945건) | **723 → 0** | **2,703 → 0** |

배너 도달 945/945 · 고정 헤더 가림 0/0 (04 값은 리뷰 보고서 §1·`docs/tools/reviewer-08/results/focus-baseline.log`).

### R1 — 핸드오프 수치 정정 ✅
| 항목 | 04 핸드오프 기재 | 정정값 | 근거 |
|---|---|---|---|
| 데스크톱 세로 탭 높이 | 296px | **256px** | 이번 geometry 로그: 1024×600 172~428px · 1280×640 192~448px · 1440×700 222~478px (모두 256px) · 리뷰어 `text` 48×256 |
| 헤더와 겹치기 시작하는 화면 높이 | 410px 미만 | **370px 미만** | (vh − 256) / 2 < 57(헤더 bottom) → vh < 370 |

04 핸드오프에는 해당 위치에 "04-1에서 정정" 한 줄만 추가했다(원문 유지).

### R2·R3 — 서버 컴포넌트 분리 ✅
| 항목 | 04 | 04-1 |
|---|---|---|
| `enabled:false` 빌드 — 클라이언트 JS 청크에 배너 문자열 | 청크 2개(layout·공유 819) | **0개 / 28개** |
| `enabled:true` 빌드 — 클라이언트 JS 청크에 배너 문자열 | 청크 2개 | **0개 / 28개** (문구·주소는 HTML·RSC 페이로드에만) |
| `config.ts`가 클라이언트 청크에 싣는 값 | `GA_MEASUREMENT_ID` + `FLOATING_BANNER` 객체 | 배너 파일 경로로는 `config.ts`를 싣지 않음(`FloatingBannerLink`는 `analytics.ts`만 import — 기존 카드 컴포넌트와 같은 경로) |
| 루트 layout 청크 (on) | 7,346 B · gzip 3,051 B | **6,202 B · gzip 2,382 B** (−669 B) |
| 루트 layout 청크 (off) | — | 6,196 B · gzip 2,365 B |
| First Load JS shared | 103 kB | 103 kB |
| CSS 원본 | 23,541 B(리뷰어 측정) | 23,704 B (+163 B = scroll-padding 규칙 1개) |

gzip은 `gzip -9c` 기준. 04 layout 값은 이번 세션에서 수정 전 같은 방법으로 직접 재측정(3,051 B — 리뷰어 값과 일치). 리뷰어 기록의 HEAD(배너 이전) layout gzip은 1,997 B → 04-1은 HEAD 대비 +385 B.

동작 불변 확인: 클릭 GA 1건(`ga` 3/3) · Enter 키 GA 1건(`extra-qa.mjs enter`) · 키보드 도달·흰 포커스 링·다음 Tab 배너 밖(`behavior` 31/31) · CLS 0.0000(`cls` 60회) · HTML의 `href … target="_blank" rel="noopener nofollow"` 문자열 135/135 동일.

## 재실측 숫자 (최종 빌드 기준, 전부 직접 실행)
| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 45/45 통과 |
| typecheck | 오류 0 |
| lint | 0 errors · 1 warning — `docs/tools/reviewer-04/keyboard-tab.mjs:36` 기존 경고(무관) |
| build | 성공 · 정적 142/142 · HTML 135개 |
| `review-qa.mjs focus` | 945건 · 탭 정지점 61,145 · **완전 가림 0 · 일부 가림 0** · 배너 도달 945/945 |
| `banner-qa.mjs geometry` | **8,079회 · 실패 0** · 데스크톱 최소 가로 간격 8.0px(`/` @1024) · 배너 렌더 135/135 |
| `banner-qa.mjs behavior` | **31/31** · 콘솔 오류 0 |
| `static-check on` (04-1판) | **135/135** · 클라이언트 청크 배너 문자열 0/28 |
| `static-check off` (04-1판, 별도 복사본 `enabled:false`) | **135/135** · 클라이언트 청크 배너 문자열 **0/28** · `<html lang="ko">`(class 없음) · 복사본 validate 45/45 · typecheck 0 · eslint src 0 · build 142/142 |
| `banner-qa.mjs ga` (별도 복사본 `NEXT_PUBLIC_GA_ID=G-QATEST0000`, 포트 3105) | **3/3** — `["event","floating_banner_click",{"link_url":"https://signforkorea.com/re"}]` 1건 · Enter 키 1건 |
| `contrast-check` | **8/8** (색 변경 없음) |
| `review-qa.mjs cls` | 60회 · 최대 CLS 0.0000 · 배너 원인 shift 0 |
| 캡처 | 390 홈 top/bottom 재촬영 + 320 포커스 증거 1장 |
| 저장소 독립 grep | 0건 (아래 미해결 없음) |

`enabled:false` 확인은 작업 트리를 건드리지 않도록 스크래치 복사본에서 했다 — 원본 `config.ts`는 `enabled: true` 그대로.

## 주요 결정사항 (자체 판단 + 근거)
| 결정 | 근거 |
|---|---|
| scroll-padding을 `globals.css`가 아니라 `FLOATING_BANNER_GUTTER.html` 클래스로 | 오더 지시(기존 여백 패턴과 동일) — `enabled:false`면 클래스·규칙 적용 모두 사라짐. off HTML에서 `class` 속성까지 빠지도록 `\|\| undefined` |
| `target`·`rel`은 클라이언트 링크 안에 고정, `href`·`label`·`className`·children만 props | 링크 정책(`noopener nofollow`)을 한 곳에 묶고, 데이터(문구·주소)는 서버에서만 넘어가게 |
| 문구 `<span>`은 children으로 서버에서 렌더 | 클라이언트 청크에 문구 0 (on/off 모두 실측) |
| 도구는 04 원본을 고치지 않고 `programmer-04-1/`에 확장판 | 04 결과의 재현성을 보존. 오더의 산출물 경로 지정 |

## 미해결·이슈
1. **iOS 실기기 미확인** (04 미해결 2 · 리뷰 R5 그대로) — `viewport-fit=cover` 미설정이라 `env(safe-area-inset-*)` 값은 0. 헤드리스 에뮬레이션만 실측. 테스터 단계 확인 필요.
2. **R4(1024~1231px 좌우 비대칭)** — v0.2 디자인 검토 항목, 이번 범위 아님.
3. 높이 370px 미만 데스크톱의 헤더 겹침은 계산값(R1). 실측은 600px까지.
4. 모바일 스크롤 도중 카드 위에 떠 있는 것은 플로팅의 본질(04 미해결 5와 동일). 포인터 사용자는 스크롤로 비켜 볼 수 있고, 키보드 사용자는 이번 수정으로 포커스가 가려지지 않는다.

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)**: 재검증 — `src/` 변경 4파일(위 표) 코드 확인 + `node docs/tools/reviewer-08/review-qa.mjs http://localhost:3104 focus`(약 25분) 완전 가림 0 재확인, `docs/tools/programmer-04-1/static-check.mjs on/off`(off는 `enabled:false` 복사본 빌드).
- **슈퍼바이저 (Opus 5)**: 리뷰어 승인 후 커밋. 커밋 대상 = 04 대상(`src/` 04 변경분 + `docs/tools/programmer-04/` + `docs/qa/programmer-04/` + 04 핸드오프·트리거·processed 오더) + 04-1(`src/components/floating-banner-link.tsx` 포함 src 변경 · `docs/tools/programmer-04-1/` · `docs/qa/programmer-04-1/` · 본 핸드오프·트리거·processed 오더) + 리뷰어 08 산출물 · history.

## 참고 링크
- 리뷰: `docs/reviews/programmer-04-floating-banner-review.md`
- 이전 핸드오프: `docs/handoffs/programmer-04-floating-banner.md`
- 리뷰어 도구: `docs/tools/reviewer-08/` · 04 도구: `docs/tools/programmer-04/`
