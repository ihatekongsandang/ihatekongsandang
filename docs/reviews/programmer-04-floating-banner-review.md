# 리뷰 보고서 — 프로그래머 04 · 우측 플로팅 배너

**작성일**: 2026-09-28 12:50 | **작성 세션**: 리뷰어 (Opus 5.5)
**md오더**: `instructions/reviewer/processed/08-programmer-04-floating-banner-review.md`
**검토 대상**: 미커밋 작업 트리 — `src/lib/config.ts` · `src/lib/floating-banner.ts` · `src/components/floating-banner.tsx` · `src/lib/analytics.ts` · `src/app/layout.tsx` · `src/components/site-footer.tsx` + 도구 `docs/tools/programmer-04/` · 캡처 `docs/qa/programmer-04/` · 핸드오프·트리거
**코드 수정**: 0건 (판정만. 작업 트리 diff·해시 검토 전후 동일 확인)

---

## 판정: 🟡 조건부 승인 — 확정 결함 1건(D1) 수정·재실측 전 커밋 불가

코드 품질·링크 속성·`enabled:false` 경로·레이아웃 비겹침·CLS·보안·GA 이벤트는 모두 실측으로 통과했다.
단, 핸드오프 미해결 3번 **포커스 가림(WCAG 2.4.11 AA)을 전수 실측한 결과 모바일 폭에서 723건 위반**이 나왔다.
프로젝트 핵심 축 4(WCAG 2.2 AA) 위반이므로 **확정 결함**이다. → **프로그래머 수정 오더(04-1) 필요.**
보완안(`scroll-padding-bottom`)을 주입해 같은 전수 검사를 돌리면 **0건**이 된다(아래 §2-5). 수정 뒤 재실측 수치로 리뷰어 재확인 후 커밋한다.

---

## 1. 확정 결함

| # | 항목 | 근거(실측) | 수정 방향 |
|---|---|---|---|
| **D1** | **모바일에서 Tab 포커스가 배너 뒤에 완전히 가려짐 — WCAG 2.4.11 Focus Not Obscured (Minimum, AA) 위반** | 빌드된 전 HTML 135경로 × 7폭(320·360·390·768·1023·1024·1280) = 945건, 실제 Tab 키로 탭 정지점 **61,145개** 전수 순회. 포커스된 요소가 배너 상자에 **100% 덮인 경우 723건**(320px 437 · 360px 118 · 390px 168), 일부 덮인 경우 2,703건. 768px 이상 완전 가림 0. 두 번 측정해 같은 값. 증거 캡처 `docs/qa/reviewer-08/focus-obscured--320--home.png` — 320×640 홈에서 `#알파폰` 태그 포커스(상자 176,582–242,608)가 배너(80,566–304,624) 안에 완전히 들어가 보이지 않는다. 원인: 브라우저는 포커스 요소를 화면 아래 끝에 맞춰 스크롤하고 고정 요소를 고려하지 않는다. 닫기 버튼이 없어(사용자 결정) 방문자가 치울 수단도 없다 | `<1024px`에서 문서 스크롤 컨테이너(`html`)에 **`scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom))`** — 푸터 여백과 같은 값. `FLOATING_BANNER.enabled`일 때만(기존 `FLOATING_BANNER_GUTTER` 패턴으로 `<html>` className에 `max-lg:scroll-pb-[calc(5.5rem+env(safe-area-inset-bottom))]` 등). 리뷰어 주입 실측: 같은 945건·61,145개에서 **완전 가림 0 · 일부 가림 0**(`docs/qa/reviewer-08/focus-scroll-padding--320--home.png`). 수정 후 프로그래머가 `review-qa.mjs focus` + 기존 geometry·static-check on/off 재실행 |

> 닫기 버튼 제거 자체는 사용자 확정 사항이라 결함으로 보지 않는다. D1은 "닫을 수 없음"이 아니라 **키보드 포커스가 보이지 않게 되는 것**에 대한 판정이며, 닫기 버튼 없이 CSS 한 줄로 해소된다.

## 2. 재실측 숫자 (리뷰어 직접 실행)

### 2-1. 빌드 게이트
| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 45/45 통과 · 오류 0 |
| typecheck (`tsc --noEmit`) | 오류 0 (exit 0) |
| lint | 0 errors · 1 warning — `docs/tools/reviewer-04/keyboard-tab.mjs:36` 기존 경고(이번 변경 무관) |
| build | 성공 · 정적 페이지 142/142 · 산출 HTML 135개 |
| 신규 리뷰어 도구 lint (`docs/tools/reviewer-08`) | 0 |

### 2-2. 링크 속성 (정적 HTML 전수)
- `static-check.mjs on`: **135/135 통과**.
- 독립 grep: `aside aria-label="외부 링크 안내"` 포함 HTML 135/135 · 배너 `<a>` 태그 135개 **모두 동일 문자열** `href="https://signforkorea.com/re" target="_blank" rel="noopener nofollow" aria-label="이재명 재판재개 촉구 국민 서명운동 — 외부 사이트로 이동합니다 (새 창에서 열림)"` (uniq 1종) · https · `fbclid` 0.

### 2-3. `enabled:false` 경로
- 작업 트리를 건드리지 않도록 **별도 복사본**에서 `enabled: false`로 바꿔(diff 1줄) validate 45/45 · typecheck 0 · lint 0 · build 142/142 → `static-check.mjs off` **135/135 통과**(배너 0 · 배너 주소 0 · 여백 클래스 0).
- 원본 작업 트리: 검토 전후 `git diff --stat` 동일 · 3파일 shasum 동일 · `enabled: true` 유지 → **diff 0**.
- 참고: off 빌드에서도 배너 문자열이 클라이언트 JS 청크 2개(`layout`·공유 청크)와 서버 route 번들에 **데이터로 남는다**(렌더·HTML·RSC에는 없음). 권고 R2.

### 2-4. 레이아웃 회귀
| 항목 | 결과 |
|---|---|
| 프로그래머 `geometry` 재실행 | **8,079회 · 실패 0** — 대표 6경로 × 320~1440px 1px 간격 6,726 · 전 135경로 × 경계 폭 10종(320·390·768·1023·1024·1100·1231·1232·1280·1440) 1,350 · 낮은 높이 3 · 배너 렌더 135/135 · 데스크톱 최소 가로 간격 8.0px(`/` @1024) · 가로 스크롤 0. 로그 `docs/tools/reviewer-08/results/programmer-geometry.log` |
| CLS (`review-qa.mjs cls`) | 대표 6경로 × 경계 폭 10종 = 60회 · **최대 CLS 0.0000** · 배너가 원인인 layout-shift 0 (서버 렌더 고정 요소, 하이드레이션 후 변화 없음) |
| 텍스트 간격 1.4.12 (`text`) | 7개 뷰포트 × 기본/강제 = 21항목 통과 · 잘림 0 · 가로 뷰포트 이탈 0. 데스크톱 탭 48×256 → 간격 강제 48×297 |
| 캡처 확인 | `home--390--top/bottom`·`home--1100--top` 직접 열람 — 1100px에서 태그 칩 행 끝과 탭 사이 여백 유지, 390px 맨 아래에서 푸터 링크가 배너 위로 올라옴 |

**기하 판정 기준의 타당성 — 타당하다고 판단.**
- 데스크톱 "가로 비겹침": 탭은 세로 중앙 고정이라 스크롤하면 본문 모든 요소가 그 높이를 지나간다. 따라서 세로 위치와 무관하게 "배너 왼쪽 끝을 넘는 본문 요소 0"은 필요충분 조건이다. 투명 컨테이너를 내용 상자로 재는 보정도 옳다(padding 영역엔 그려지는 것이 없음). 가로로 넘친 자식은 그대로 측정되므로 오히려 보수적이다.
- 모바일 "맨 아래에서 겹침 0": 스크롤 중 겹침은 플로팅 버튼의 본질이고 방문자가 스크롤로 비켜 볼 수 있다. 다만 **이 기준은 포인터 사용자 기준**이라 키보드 포커스 가림은 잡지 못한다 — 그 공백이 D1로 드러났다.

### 2-5. 접근성
| 항목 | 결과 |
|---|---|
| 랜드마크 (`ax`, CDP 접근성 트리) | 390·1280 모두 complementary 1개 "외부 링크 안내" · 다른 랜드마크 안에 있지 않음(최상위) |
| 링크 이름 2.5.3 | 접근 이름 "이재명 재판재개 촉구 국민 서명운동 — 외부 사이트로 이동합니다 (새 창에서 열림)" — 표시 문구로 시작 · 새 창 안내 포함 |
| 키보드 순서 | 배너 링크가 문서 순서 **마지막 탭 정지점**(104/104, 직전 = 푸터 "출처·저작권 정책…") · 양수 tabindex 0 · 945건 전부 Tab 순회로 배너 도달. 프로그래머 `behavior` 재실행 **31/31**, 콘솔 오류 0 |
| 포커스 표시 | 흰 2px 실선 · offset −4px(안쪽) 실측. 흰/#18181B 17.72:1 · 흰/#27272A 14.89:1 (1.4.11 기준 3:1). 전역 `:focus-visible { outline: 2px solid }`에 유틸리티가 색·offset만 덮어쓰는 구조 — CSS 산출물에서 확인 |
| 대비 | `contrast-check` 8/8 — 색값을 `globals.css`(`--background #fff`·`--surface #fafafa`)·컴포넌트 클래스와 대조해 일치 확인 |
| **포커스 가림 2.4.11** | **🔴 723건 위반 → D1** · 보완안 주입 시 0 |
| (참고) 고정 헤더 가림 | 헤더 자신의 링크·건너뛰기 링크를 제외하면 완전·일부 가림 0 (첫 실행에서 헤더 링크를 센 도구 오탐 3,780건을 확인하고 도구를 고쳐 재실행) |

### 2-6. 보안·성능
| 항목 | 결과 |
|---|---|
| 외부 요청 | 홈·about·상세 × 390/1280 로드+맨 아래 스크롤, 요청 308건 중 **외부 0 · 배너 주소 요청 0**. 배너는 `next/link`가 아닌 일반 `<a>`라 프리페치 없음, 이미지 없음 |
| CSP (`vercel.json`) | 변경 없음 · 새 리소스 로드 없음 → 영향 없음. `rel="noopener"`로 opener 차단. Referrer-Policy `strict-origin-when-cross-origin`이라 캠페인 사이트에는 origin만 전달 |
| 번들 (HEAD 빌드와 비교, 같은 node_modules·같은 env) | First Load JS 공유 102 → **103 kB** · 루트 layout 청크 5,378 → 7,346 B(gzip 1,997 → **3,051 B, +1,054 B**) · CSS 21,367 → 23,541 B(gzip 4,999 → **5,524 B, +525 B**). 미들웨어 소스 동일·산출 크기 동일(104,447 B, 빌드 표의 33.9/34.1/34.3 kB 차이는 해시 차이) |

### 2-7. GA 이벤트
- `NEXT_PUBLIC_GA_ID=G-QATEST0000` 별도 복사본 빌드(포트 3105): 프로그래머 `ga` **3/3** — `["event","floating_banner_click",{"link_url":"https://signforkorea.com/re"}]` 정확히 1건.
- 추가: 포커스 후 **Enter 키 활성화도 1건**(`extra-qa.mjs enter`).
- GA 미설정 빌드(3104, 로컬 `.env.local`의 GA 값이 비어 있어 HTML에 측정 ID 없음 확인): 클릭 시 오류 0 (`behavior`).

### 2-8. 저장소 독립 grep
- 패턴(pre-commit 훅과 동일 + 홈 계정명): 변경 src 6파일 · git diff 추가줄 · `docs/tools/programmer-04` · `docs/qa/programmer-04` 19장(strings) · 핸드오프·트리거·오더 · `history/2026-09-28.md` · 리뷰어 도구·캡처·결과 로그 → **0건**.

## 3. 권고 (결함 아님 — 수정 오더 04-1에 함께 넣을지는 슈퍼바이저 판단)

| # | 내용 | 근거 |
|---|---|---|
| R1 | 핸드오프 수치 정정: 데스크톱 탭 높이 **296px → 실측 256px**, 헤더 겹침 한계 **410px → 370px**((vh−256)/2 < 57) | 프로그래머 자신의 geometry 로그(1024×600에서 172~428px)와 리뷰어 `text` 실측(48×256) 모두 256px |
| R2 | `enabled:false`여도 문구·주소가 클라이언트 JS에 데이터로 남음. 완전 제거가 필요하면 배너를 서버 컴포넌트로 렌더하고 클릭 전송만 작은 클라이언트 컴포넌트로 분리(props로 href 전달) | §2-3. 화면·HTML에는 없으므로 실제 영향은 작다 |
| R3 | 같은 분리로 `config.ts` 전체가 클라이언트 청크에 들어가는 것도 줄일 수 있음(layout 청크 gzip +1,054 B의 대부분) | §2-6 |
| R4 | 1024~1231px 구간은 본문 오른쪽 여백만 56px라 좌우 비대칭 — v0.2 디자인 검토 항목 | 캡처 `home--1100--top` |
| R5 | iOS 실기기(safe-area·`viewport-fit` 미설정) 확인은 테스터 단계에서 | 핸드오프 미해결 2 — 헤드리스 에뮬레이션만 실측됨(리뷰어도 동일) |

## 4. 참고 (판정 대상 아님)
- 배너를 거는 결정·링크 대상·문구·닫기 없음은 사용자 확정 사항. 정보 전달형·단정 금지(핵심 축 6)는 게시물 규칙이고, 사이트 전역에 특정 캠페인 링크를 두는 것은 사이트 성격 인식에 영향을 줄 수 있다는 점만 기록해 둔다. 코드는 `enabled` 한 줄로 즉시 내릴 수 있게 되어 있다.
- `rel`에 `noreferrer`를 넣지 않은 것은 결함이 아니다(origin만 전달, 유입 확인은 캠페인 측에 유리).
- 핸드오프 "다음 세션 가이드"의 리뷰어 모델 표기(Fable 5.1)는 작성 당시 기록이라 그대로 둔다(CLAUDE.md §6).

## 5. 코드 검토 소견 (정적)
- `cn()`(twMerge)로 여백 클래스를 합칠 때 `px-4`와 `lg:max-[77rem]:pr-14`는 변형이 달라 둘 다 남는다 — HTML 135/135에서 확인. CSS 산출물에 `@media not all and (min-width:77rem)` 등 규칙 생성 확인.
- `'use client'`는 onClick 때문 — hooks·저장소 없음, 서버 렌더와 하이드레이션 결과가 같다(CLS 0으로 확인).
- 세로쓰기에서 물리 여백을 쓴 이유 주석, 여백 산식 주석이 정확하다(1232px 경계에서 간격 8.0px 실측과 일치).
- `print:hidden` · `z-20`(헤더 `z-10`과 위치상 겹치지 않음) · 이미지 0 · 애니메이션 0 — 오더 사양과 일치.

## 6. 측정 도구·증거
| 경로 | 내용 |
|---|---|
| `docs/tools/reviewer-08/review-qa.mjs` | `focus`(포커스 가림 전수, `--scroll-padding=` 보완안 주입) · `cls` · `ax` · `text` |
| `docs/tools/reviewer-08/extra-qa.mjs` | `net`(외부 요청) · `enter`(Enter 키 GA) · `shot`(가림 캡처) |
| `docs/tools/reviewer-08/results/` | `focus-baseline.log`(723건) · `focus-scroll-padding.log`(0건) · `programmer-geometry.log`(8,079회) |
| `docs/qa/reviewer-08/` | `focus-obscured--320--home.png` · `focus-scroll-padding--320--home.png` |

실행: `npm run build && npx next start -p 3104` 후 `node docs/tools/reviewer-08/review-qa.mjs http://localhost:3104 focus` (약 25분).

## 7. 다음 단계
1. **슈퍼바이저 (Opus 5)** → 프로그래머 04-1 수정 오더: D1(필수) + R1(핸드오프 수치 정정). R2·R3는 선택.
2. **프로그래머 (Opus 5)** → 수정 후 `review-qa.mjs focus` 완전 가림 0 · geometry 8,079/0 · static-check on/off 135/135 · build 재실측.
3. **리뷰어 (Opus 5.5)** → 재검증 후 승인 → 슈퍼바이저 커밋·배포.
