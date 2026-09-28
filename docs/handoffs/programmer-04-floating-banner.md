# 프로그래머 세션 — 04-floating-banner 핸드오프
**작성일**: 2026-09-28 11:15 | **작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/04-floating-banner.md`

> 🔴 **개정 (2026-09-28 11:53) — 사용자 지시 "베너 닫기 없애"**: 닫기(X) 버튼과 `sessionStorage` 닫힘 로직을 **전부 제거**했다. 배너는 항상 표시되고, 내릴 때는 `FLOATING_BANNER.enabled = false` 한 줄이다. 오더 §1의 닫기 사양(X·sessionStorage·`aria-label="배너 닫기"`)은 사용자 지시로 폐기됐다. 아래 숫자는 모두 개정 후 재측정값이다.

## 요약 (3줄)
1. 전 페이지 우측에 외부 캠페인 링크 플로팅 배너를 추가했다 — 데스크톱(≥1024px)은 우측 세로 중앙의 폭 48px 세로 탭, 모바일·태블릿(<1024px)은 우측 하단 고정 버튼. 설정은 `src/lib/config.ts`의 `FLOATING_BANNER` 한 곳이며 `enabled: false`면 배너와 배너용 여백이 함께 사라진다.
2. 닫기 버튼 없음(사용자 지시로 제거) — 배너는 항상 표시된다. GA가 로드된 경우에만 `floating_banner_click { link_url }`을 보낸다.
3. 검증은 전부 실측이다 — validate 45/45 · typecheck 0 · lint 0 errors · build 정적 142/142 · 기하 검사 8,079회 실패 0 · 동작 31항목 실패 0 · 정적 HTML 135/135 · `enabled:false` 빌드 135/135 · GA 이벤트 확인 · 대비 8/8 · 캡처 19장. 🔴 커밋하지 않음.

## 산출물

### 변경 파일
| 파일 | 구분 | 내용 |
|---|---|---|
| `src/lib/config.ts` | 수정(+13) | `FLOATING_BANNER = { enabled, href, title, subtitle }` 추가. href `https://signforkorea.com/re`(https·`fbclid` 제거), 문구는 오더 확정값 그대로 |
| `src/lib/floating-banner.ts` | 신규 | 레이아웃 여백 클래스 `FLOATING_BANNER_GUTTER`(여백 계산 근거 주석 포함). 서버 컴포넌트가 읽어야 해서 `'use client'` 파일과 분리 |
| `src/components/floating-banner.tsx` | 신규 | 배너 본체(클라이언트 컴포넌트 — 클릭 이벤트 전송 때문). 링크 1개, 닫기 버튼 없음 |
| `src/lib/analytics.ts` | 수정(+2) | `GA_EVENTS.floatingBannerClick = 'floating_banner_click'` |
| `src/app/layout.tsx` | 수정 | `<main>`에 여백 클래스, 푸터 뒤에 `<FloatingBanner />`(탭 순서상 본문·푸터 다음) |
| `src/components/site-footer.tsx` | 수정 | `<footer>`에 여백 클래스 |

### 측정 도구 (`docs/tools/programmer-04/`)
| 파일 | 용도 |
|---|---|
| `cdp.mjs` | 헤드리스 Chrome + DevTools 프로토콜 최소 클라이언트(추가 의존성 0). 외부 요청(캠페인 사이트·GA) 차단 |
| `banner-qa.mjs` | `capture`(캡처 19장) · `geometry`(겹침 기하 검사) · `behavior`(속성·닫기 버튼 없음·항상 표시·키보드·콘솔) · `ga`(dataLayer 이벤트) |
| `static-check.mjs` | 빌드 산출 HTML 전수 검사 `on`/`off` (on은 닫기 버튼 잔존 0도 확인) |
| `contrast-check.mjs` | 배너 색 대비 8쌍 |

실행: `npm run build && npx next start -p 3104` 후 `node docs/tools/programmer-04/banner-qa.mjs http://localhost:3104 <mode> [outDir]`.
`ga` 모드는 `NEXT_PUBLIC_GA_ID=G-QATEST0000 npm run build` 빌드에서 돌린다(GA 스크립트 요청은 차단되고 인라인 초기화의 `gtag`→`dataLayer`만 확인).

### 캡처 19장 (`docs/qa/programmer-04/`)
| 페이지 | 390px | 768px | 1280px |
|---|---|---|---|
| 홈 `/` | `home--390--top` · `home--390--bottom` | `home--768--top` · `home--768--bottom` | `home--1280--top` · `home--1280--bottom` |
| 상세 `/post/2026-09-27-rekor-dmz-mine-testimony` | `post--390--top` · `post--390--bottom` | `post--768--top` · `post--768--bottom` | `post--1280--top` · `post--1280--bottom` |
| about `/about` | `about--390--top` · `about--390--bottom` | `about--768--top` · `about--768--bottom` | `about--1280--top` · `about--1280--bottom` |

보조 1장: `home--1100--top`(여백 예약 구간 1024~1231px의 대표 폭).
`--top`은 첫 화면, `--bottom`은 맨 아래까지 스크롤한 화면(페이지네이션·푸터와의 관계 확인용). 뷰포트 크기 그대로 찍었다(전체 페이지 캡처는 고정 요소 위치가 왜곡되므로 쓰지 않음).

## 검증 숫자 (최종 빌드 기준, 전부 직접 실측)
| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 45/45 통과 (작업 중 슈퍼바이저 게시로 41→45건 증가, 최종값) |
| typecheck | 오류 0 |
| lint | 0 errors · 1 warning — `docs/tools/reviewer-04/keyboard-tab.mjs:36` **기존 경고**(이번 변경과 무관, 03 핸드오프에도 동일 기록) |
| build | 성공 · 정적 142/142 |
| 정적 HTML 전수 `static-check on` | **135/135** — 배너 정확히 1개 · `href="https://signforkorea.com/re" target="_blank" rel="noopener nofollow"` · `fbclid` 0 · 여백 클래스 3종 존재 · 닫기 버튼 0 |
| `enabled:false` 빌드 `static-check off` | **135/135** — 배너 0 · 배너 주소 0 · 여백 클래스 0 (확인 후 `enabled: true` 원복, diff 확인) |
| 기하 ① 대표 6경로(`/`·`/?page=4`·상세·`/about`·`/tag/이재명`·404) × 폭 320~1440px **1px 간격(1,121폭)** | 6,726회 실패 0 |
| 기하 ② 빌드된 전 HTML 경로 **135개** × 경계 폭 10종(320·390·768·1023·1024·1100·1231·1232·1280·1440) | 1,350회 실패 0 · 배너 렌더 135/135 |
| 기하 ③ 낮은 데스크톱 높이 1024×600·1280×640·1440×700 | 3/3 — 헤더(bottom 57px)와 비겹침 |
| 기하 합계 | **8,079회 · 실패 0** · 데스크톱 최소 가로 간격 **8.0px**(설계값과 일치, `/` @1024px) · 가로 스크롤 발생 0 |
| 동작 `behavior` | **31/31 PASS** · 콘솔 오류·예외 0 |
| GA `ga` | 3/3 — `["event","floating_banner_click",{"link_url":"https://signforkorea.com/re"}]` 정확히 1건 |
| 대비 | 8/8 — 제목 17.72:1 · 보조 11.99:1 · 호버 시 14.89:1/10.08:1 · 포커스 링·배너 경계 ≥ 14.89:1 |
| 저장소 독립 grep(`src`·`docs/tools/programmer-04`·`docs/qa/programmer-04`·오더) | 0건 |

기하 검사 판정 기준:
- 데스크톱: 배너가 세로 중앙 고정이라 스크롤하면 본문 전체가 그 높이를 지나간다 → `main`·`footer`의 어떤 요소도 배너 왼쪽 끝을 넘지 않아야 통과(가로 비겹침). 배경·테두리가 보이는 요소는 테두리 상자, 투명 컨테이너는 내용 상자로 잰다(첫 실행에서 투명 푸터 컨테이너의 padding 영역 8px를 겹침으로 잡은 오탐을 확인하고 기준을 바로잡음 — 해당 영역에 그려지는 것은 없다).
- 모바일: 맨 아래까지 스크롤했을 때 배너와 겹치는 `main`·`footer` 요소 0개(테두리 상자 기준).

동작 31항목: 390·1280 각각 속성 8(닫기 버튼 0·배너 안 탭 정지점 1 포함) + 링크 클릭 무오류·클릭 후 유지 2 + 내부 이동·직접 진입 후 표시 2 = 24 · 키보드(390·1280 각 3: 링크 도달·흰 포커스 링·다음 Tab은 배너 밖) 6 · 전 과정 콘솔 0 1.

## 주요 결정사항 (자체 판단 + 근거)
| 결정 | 근거 |
|---|---|
| **데스크톱 = 폭 48px 세로 탭(세로쓰기)** | 1280px에서 본문 오른쪽 바깥 여백이 80px뿐이라 가로 카드형 배너는 카드 그리드를 가린다. 세로 탭은 문구를 줄이지 않고(문구 임의 변경 금지) 좁은 폭에 담을 수 있다 |
| **1024~1231px 구간만 본문·푸터 오른쪽 여백 예약** | 본문 컨테이너(1152px)의 오른쪽 끝이 탭보다 8px 이상 왼쪽이려면 `vw ≥ 1232px`. 그 미만에서만 `main` pr-14, 푸터 pr-10을 준다. 1232px 이상은 레이아웃 무변경 |
| **모바일 푸터 아래 여백 `5.5rem + safe-area`** | 맨 아래까지 내렸을 때 푸터 링크가 버튼 위로 올라오게 한다(캡처 `*--390--bottom`·`*--768--bottom`에서 확인) |
| **닫기 버튼 없음** | 사용자 지시("베너 닫기 없애"). 저장소·상태 코드가 사라져 서버 렌더와 화면이 항상 같다(하이드레이션 후 변화 없음) |
| **`ExternalLink` 컴포넌트를 쓰지 않음** | 그 컴포넌트는 큐레이션 출처용이라 `rel="noopener"`만 붙인다(유입 신호 반환). 캠페인 링크는 오더대로 `noopener nofollow` |
| **포커스 표시 = 흰 2px 실선, 안쪽 4px** | 사이트 기본 파란 링(#1D4ED8)은 어두운 배너 면 위에서 대비가 부족하다. 흰 링 17.72:1 |
| **색은 배너 전용 hex 고정**(#18181B·#27272A·#D4D4D8·흰색) | 대비 실측 도구와 1:1 대응시키기 위해. v0.2 디자인에서 토큰화 대상 |
| **DOM 위치 = 푸터 뒤** | 키보드 사용자가 본문을 먼저 지나가게 한다(실측: 푸터 링크 다음 Tab이 배너 링크, 그다음 Tab은 배너 밖) |
| **`print:hidden`** | 인쇄물에 고정 배너가 찍히지 않게 |
| **`aside aria-label="외부 링크 안내"`** | 보조 랜드마크로 둬 스크린리더가 본문과 구분한다. 링크 이름은 표시 문구로 시작(WCAG 2.5.3) + "(새 창에서 열림)" |

## 미해결·이슈 (다음 세션이 알아야 할 것)
1. **닫기 버튼 제거에 따른 접근성 메모** — 모바일에서 버튼이 스크롤 도중 카드 일부를 계속 가리고, 방문자가 치울 수단이 없다. 맨 아래에서는 겹침 0, 가로 스크롤 0을 전수 확인했다. 포커스 가림(WCAG 2.4.11)은 실측하지 않았다 — 아래 3번. 사용자 지시 사항이라 그대로 반영.
2. **iOS safe-area** — `env(safe-area-inset-bottom/right)`를 반영했지만 현재 viewport에 `viewport-fit=cover`가 없어 iOS에서 값은 0이다(이 경우 Safari가 레이아웃을 안전 영역 안에 두므로 가려지지 않는다). 전역 viewport 변경은 전 페이지 가로 배치에 영향을 주므로 이 오더 범위에서 하지 않았다. **실기기(iOS) 확인은 하지 않았다** — 헤드리스 Chrome 에뮬레이션만 실측.
3. **포커스 가림(WCAG 2.4.11)** — 모바일에서 Tab으로 이동할 때 포커스된 요소가 화면 하단에 오면 고정 버튼 뒤에 일부 가려질 수 있다(브라우저가 포커스 요소를 화면 안으로 스크롤하지만 고정 요소는 고려하지 않음). 이번에 실측하지 않았다 — **확인 필요**. 필요 시 `scroll-padding-bottom`으로 보완 가능.
   → 리뷰어 08 D1(완전 가림 723건) 확정 · 04-1에서 수정(723 → 0).
4. **아주 낮은 데스크톱 높이** — 탭 높이 296px(실측) 세로 중앙이라 계산상 화면 높이 410px 미만이면 헤더(57px)와 겹친다. 실측은 600px 높이까지만 했다(3/3 통과).
   → 수치(296px·410px)는 04-1에서 정정 — `docs/handoffs/programmer-04-1-floating-banner-focus-fix.md` R1.
5. **모바일 중간 스크롤 중 겹침** — 우측 하단 고정 버튼이라 스크롤 도중에는 카드 일부 위에 떠 있다(플로팅의 본질). 맨 아래에서는 겹침 0을 전수 확인했다. 닫기 버튼이 없어 방문자가 치울 수는 없다(사용자 지시).
6. **편집 정책 관련 메모(코드 판단 아님)** — 사이트 톤(정보 전달형·단정 금지, 핵심 축 6)은 게시물 규칙이고, 배너 문구는 사용자 지정·슈퍼바이저 확정값이라 그대로 반영했다. 캠페인 링크를 사이트 전역에 거는 것의 정책 적합성은 사용자·슈퍼바이저 확정 사항으로 두고, 코드는 `enabled` 한 줄로 즉시 내릴 수 있게만 했다.
7. 작업 도중 슈퍼바이저 게시 커밋이 들어와 게시물이 41→45건이 됐다. 위 숫자는 모두 **최종 빌드(45건, HTML 135개)** 기준으로 다시 돌린 값이다.

## 다음 세션 가이드
- **리뷰어 (Fable 5.1)**: 변경 파일 6개(`src/**`) 코드 품질·접근성·CLS·보안(rel·외부 요청 없음) 검토. 도구 4종으로 재실측 가능. 특히 미해결 1·3(닫기 없는 고정 버튼의 가림) 판단.
- **슈퍼바이저 (Opus 5)**: 리뷰어 판정 후 커밋. 커밋 대상 = `src/` 6파일 + `docs/tools/programmer-04/` + `docs/qa/programmer-04/` + 본 핸드오프·트리거·processed 오더 · history. 배포 후 `curl` 1회로 배너 `href`/`rel` 확인 권장. 배너를 내릴 때는 `FLOATING_BANNER.enabled = false` 한 줄(프로그래머 경유).
- **디자이너 (v0.2)**: 배너 색 4종 hex를 토큰으로 편입할지, 세로 탭 형태 유지 여부.

## 참고 링크
- 오더: `instructions/programmer/processed/04-floating-banner.md`
- 이전 핸드오프: `docs/handoffs/programmer-03-remove-status-label.md`
- 캡처 도구 원형: `docs/tools/programmer-01/qa-screenshots.mjs`
- 외부 링크 rel 정책: `src/components/external-link.tsx` 주석
- CSP: `vercel.json`(변경 없음 — 이미지·외부 스크립트를 쓰지 않음)
