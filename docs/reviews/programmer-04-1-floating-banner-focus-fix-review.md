# 리뷰 보고서 — 프로그래머 04-1 · 플로팅 배너 포커스 가림 수정 (재검증)

**작성일**: 2026-09-28 15:50 | **작성 세션**: 리뷰어 (Opus 5.5)
**md오더**: `instructions/reviewer/processed/09-programmer-04-1-recheck.md`
**검토 대상**: 미커밋 작업 트리 최종 상태(04 + 04-1) — `src/lib/config.ts` · `src/lib/floating-banner.ts` · `src/lib/analytics.ts` · `src/app/layout.tsx` · `src/components/site-footer.tsx` · `src/components/floating-banner.tsx` · `src/components/floating-banner-link.tsx`(신규) + 도구 `docs/tools/programmer-04-1/` · 증거 `docs/qa/programmer-04-1/` · 04-1 핸드오프·트리거 · 04 핸드오프 정정 표기
**선행 검토**: 본인 08 보고서 · 04-1 핸드오프 · 04 핸드오프(84~89행 "04-1에서 정정") · 04-1 트리거 · history · 도구 3종
**코드 수정**: 0건. 검토 전후 `git diff` 전문과 src 7파일 shasum 동일 확인.

---

## 판정: ✅ 승인 — 커밋 가능

D1(모바일 포커스 가림, WCAG 2.4.11)은 **같은 도구·같은 전수(945건 · 탭 정지점 61,145개)로 완전 가림 0 · 일부 가림 0**을 리뷰어가 직접 재측정했다(보완안 주입 없이 실제 빌드).
R2·R3 서버/클라이언트 분리에 따른 회귀는 전 135경로 × 2폭 하이드레이션 전수 포함 **전 항목 0건**. 확정 결함 없음.

---

## 1. 검토 항목별 재실측 (전부 리뷰어 직접 실행)

### 1-1. D1 재측정 — `review-qa.mjs focus` 전수
| 폭 | 탭 정지점 | 완전 가림 (08 → 09) | 일부 가림 (08 → 09) |
|---|---|---|---|
| 320×640 | 8,735 | 437 → **0** | → **0** |
| 360×740 | 8,735 | 118 → **0** | → **0** |
| 390×844 | 8,735 | 168 → **0** | → **0** |
| 768×1024 | 8,735 | 0 → 0 | 0 |
| 1023×768 | 8,735 | 0 → 0 | 0 |
| 1024×768 | 8,735 | 0 → 0 | 0 |
| 1280×900 | 8,735 | 0 → 0 | 0 |
| **합계** | **61,145** (135경로 × 7폭 = 945건) | **723 → 0** | **2,703 → 0** |

- 배너 도달 945/945 · 고정 헤더 가림 0/0. 로그 `docs/tools/reviewer-09/results/focus.log`. 프로그래머 로그와 수치 일치.
- 증거 캡처 `docs/qa/reviewer-09/focus-recheck--320--home.png` — 08 D1과 같은 조건(320×640 홈, Tab으로 `#알파폰`)에서 포커스 상자 (176,297)–(242,323), 배너 (80,566)–(304,624) → 겹침 없음, 파란 포커스 링이 배너 위쪽에 보임(직접 열람).
- `<html>` 클래스: on 빌드 `<html lang="ko" class="max-lg:scroll-pb-[calc(5.5rem+env(safe-area-inset-bottom))]">` · 계산값 전 경로 390px **88px** / 1280px **auto** (270/270, 아래 1-3).
- **`enabled:false` 빌드**: `<html lang="ko">` — class 속성 없음. HTML 135개 중 scroll-pb 클래스 0.

### 1-2. R2·R3 — 클라이언트 번들
| 항목 | on 빌드 | off 빌드(별도 복사본 `enabled:false`, diff 1줄) |
|---|---|---|
| `static-check.mjs` (04-1판) | **135/135** · 청크 배너 문자열 0/28 | **135/135** · 청크 배너 문자열 **0/28** |
| 리뷰어 독립 grep(`.next/static` 전 JS 28개, 문구·주소·aria 이름·"외부 링크 안내") | 문구·주소 **0** | 0 |
| 루트 layout 청크 | 6,202 B · gzip -9 **2,382 B** | 6,196 B · gzip -9 2,362 B |
| First Load JS shared | 103 kB | 102 kB |
| CSS | 23,704 B | (규칙은 남음 — 아래 참고) |

- 독립 grep에서 layout·공유 819 청크에 걸린 것은 **이벤트 이름 `floating_banner_click` 1개뿐**(`analytics.ts`의 `GA_EVENTS` 상수, 카드 이벤트와 같은 객체) — 문구·주소가 아니므로 R2 목적에 부합.
- `config.ts`: layout 청크에 `GSC/NAVER_VERIFICATION` 등 일부가 보이지만 이는 `analytics.ts → GA_MEASUREMENT_ID` 경로(04 이전부터 있던 카드 컴포넌트 경로)이며, `FLOATING_BANNER` 객체·`SITE` 문구("공산당이싫어요") 모두 청크에 0 → **배너 경로로는 `config.ts`가 실리지 않음** 확인. `floating-banner-link.tsx`는 `analytics.ts`만 import(코드 확인).
- 번들 변화: 08 측정 04 layout gzip 3,051 B → **2,382 B(−669 B)**, 배너 이전 HEAD(1,997 B) 대비 +385 B. off 빌드 gzip 2,362 B는 프로그래머 기재 2,365 B와 3 B 차이 — 청크 해시 문자열 차이 수준으로 판정 영향 없음.

### 1-3. 서버/클라이언트 분리 회귀
| 항목 | 결과 |
|---|---|
| **하이드레이션 전수** (신규 `docs/tools/reviewer-09/hydration-qa.mjs`, 135경로 × 390·1280 = **270건**) | 하이드레이션 후 DOM 링크 속성(href·target·rel·aria-label) 기대값 일치 **270/270** · React `onClick` 부착 **270/270** · scroll-padding 계산값 기대값 **270/270** · 콘솔 오류·예외(하이드레이션 경고 포함) **0 — 270/270** |
| 정적 HTML 링크 속성 | `href="https://signforkorea.com/re" target="_blank" rel="noopener nofollow"` **135/135** |
| GA 클릭 (`banner-qa ga`, `NEXT_PUBLIC_GA_ID=G-QATEST0000` 별도 빌드·포트 3105) | **3/3** — `["event","floating_banner_click",{"link_url":"https://signforkorea.com/re"}]` 1건 |
| GA Enter 키 (`extra-qa enter`) | **1건** (동일 페이로드) |
| 키보드·포커스 링 (`banner-qa behavior`) | **31/31** · 콘솔 오류 0 · 배너 = 8번째 Tab(직전 푸터 정책 링크) · 다음 Tab 배너 밖 · 흰 2px 실선 offset −4px (390·1280) |
| 접근성 트리 (`review-qa ax`) | complementary "외부 링크 안내" 1개 최상위 · 접근 이름 2.5.3 · 마지막 탭 정지점 104/104 · 양수 tabindex 0 |
| CLS (`review-qa cls`) | 60회 · 최대 **0.0000** · 배너 원인 shift 0 |
| 대비 (`contrast-check`) | 8/8 |
| 외부 요청 (`extra-qa net`) | 308건 중 외부 0 · 배너 주소 요청 0 |

### 1-4. 빌드 게이트
| 항목 | 작업 트리 | off 복사본 |
|---|---|---|
| validate:content | 45/45 · 오류 0 | 45/45 |
| typecheck | 0 | 0 |
| lint | 0 errors · 1 warning(`docs/tools/reviewer-04/keyboard-tab.mjs:36` 기존) · 신규 `docs/tools/reviewer-09` 0 | eslint src 0 |
| build | 142/142 · HTML 135 | 142/142 · HTML 135 |

### 1-5. geometry
`banner-qa geometry` 재실행 **8,079회 · 실패 0** (동일 전수: 대표 6경로 × 320~1440px 1px 간격 + 전 135경로 × 경계 폭 10종 1,350건 + 낮은 높이 3) · 배너 렌더 135/135 · 데스크톱 최소 가로 간격 8.0px(`/` @1024). 로그 `docs/tools/reviewer-09/results/geometry.log`.

### 1-6. R1 정정 수치
- geometry 로그 실측: 1024×600 172~428px · 1280×640 192~448px · 1440×700 222~478px → 탭 높이 **256px** 확인.
- 헤더 bottom 57px → (vh − 256)/2 < 57 ⇔ **vh < 370** 확인.
- 04 핸드오프는 원문(296·410) 유지 + "04-1에서 정정" 줄 추가(84~89행 확인) — CLAUDE.md 기록 보존 방식과 부합.

### 1-7. 저장소 독립 grep
- 패턴: pre-commit 훅과 동일 + 홈 계정명. 대상: `git diff` 추가줄 · `src` · `docs/tools/programmer-04`·`-04-1`·`reviewer-08`·`reviewer-09` · 04/04-1 핸드오프·트리거 · 08 리뷰·트리거 · 오더(processed 포함) · `history/2026-09-28.md` — 파일 93개 **0건** · PNG 24장(programmer-04·04-1·reviewer-08) strings **0건**. 본 보고서·트리거·신규 캡처는 작성 후 재확인(아래 §5).

## 2. 코드 검토 소견 (정적)
- `floating-banner.tsx`: `'use client'` 제거, `enabled` 가드 후 `href`·`label`·`className`·children만 클라이언트 컴포넌트로 전달 — 설계대로. 문구 span이 children(서버 렌더)이라 클라이언트 JS에 문구 0이 실측과 일치.
- `floating-banner-link.tsx`: `target`·`rel` 고정, `config.ts` 미참조, hooks 없음 → 서버 HTML과 하이드레이션 결과 동일(270/270 오류 0).
- `layout.tsx`: `FLOATING_BANNER_GUTTER.html || undefined`로 off 시 class 속성 자체 제거 — 확인.
- scroll-padding-bottom은 하단 정렬 스크롤에만 작용 — 건너뛰기 링크(`#main`, 상단 정렬)에는 영향 없음.

## 3. 권고 (결함 아님 — 커밋을 막지 않음)
| # | 내용 | 근거 |
|---|---|---|
| R6 | `src/lib/floating-banner.ts` 5행 주석 "`'use client'` 배너 파일과 분리해 둔다"는 04-1 이후 사실과 다름(배너 본체는 이제 서버 컴포넌트). 다음 수정 때 "배너 본체·레이아웃·푸터가 함께 읽는다" 정도로 정정 | 코드 확인 |
| R7 | off 빌드 CSS에도 scroll-pb·footer pb 규칙이 남음(Tailwind가 소스 문자열을 스캔). 어떤 요소에도 붙지 않아 동작 영향 0, 크기 +163 B 수준 | off 빌드 CSS grep 1건 · HTML 0 |
| R4·R5 | 08 권고 그대로 이월 — 1024~1231px 좌우 비대칭(v0.2 디자인) · iOS 실기기 safe-area 확인(테스터) | 04-1 핸드오프 미해결 1·2와 일치 |

## 4. 측정 도구·증거
| 경로 | 내용 |
|---|---|
| `docs/tools/reviewer-09/hydration-qa.mjs` | 신규 — 전 경로 × 2폭 하이드레이션 후 링크 속성·onClick 부착·scroll-padding 계산값·콘솔 오류 |
| `docs/tools/reviewer-09/results/` | `focus.log` · `geometry.log` · `hydration.log` · `behavior.log` · `ga.log` · `enter.log` · `cls.log` · `ax.log` · `net.log` |
| `docs/qa/reviewer-09/focus-recheck--320--home.png` | D1 재현 조건 수정 후 화면 |

재현: `npm run build && npx next start -p 3104` 후 `node docs/tools/reviewer-08/review-qa.mjs http://localhost:3104 focus`(약 10~25분) · `node docs/tools/reviewer-09/hydration-qa.mjs http://localhost:3104`. off는 `enabled:false` 복사본 빌드 후 그 복사본에서 `node docs/tools/programmer-04-1/static-check.mjs off`.

## 5. 커밋 가능 여부 · 다음 단계
- **커밋 가능.** 슈퍼바이저 (Opus 5) 커밋 대상: 04-1 핸드오프 "다음 세션 가이드"의 목록 + 리뷰어 09 산출물(본 보고서 · 트리거 · `docs/tools/reviewer-09/` · `docs/qa/reviewer-09/` · processed 오더) · history.
- 커밋 전 pre-commit 훅 grep 통과 필요(본 보고서·트리거·도구·캡처 작성 후 리뷰어 재grep 0건).
- R6은 커밋 차단 사유 아님 — 다음 프로그래머 오더에 한 줄로 포함 권장.
