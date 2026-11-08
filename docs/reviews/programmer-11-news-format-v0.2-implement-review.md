# 리뷰: 프로그래머 11 — v0.2 뉴스형 전환 구현(연락처·D1·공유 버튼·약관·카드 갱신)

**리뷰어**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/26-programmer-11-news-format-v0.2-review.md` | **작성**: 2026-11-09 07:30

**대상**: 트리거 "커밋 대상 경로"의 `src/` 18파일(수정 12 · 신규 6 — `git diff`·신규 파일 전문), `docs/tools/programmer-11/` 전부(README·도구 3종·출력·빌드/게이트 로그·화면 18장 중 2장 육안), 핸드오프·트리거
**선행 검토**: 오더 11(슈퍼바이저 판단 1~3), 리뷰 25, 리뷰 24(`planner-09-prd-v0.7-news-format-review.md`), 시안 `design/news-format-v0.2/` 01~05, `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/prd.md` v0.7 §1, CLAUDE.md
**측정 도구** (`docs/tools/reviewer-26/`, 절대경로 없음, 저장소 루트에서 실행)

| 파일 | 내용 | 결과 |
|---|---|---|
| `renewal-check-rerun.txt` | 프로그래머 `renewal-check.ts` 재실행 | 34/34 PASS, 프로그래머 출력과 **바이트 동일** |
| `share-check-rerun.txt` | 프로그래머 `share-check.ts` 재실행 | FAIL 0, 프로그래머 출력과 **동일**. 잘림 en 24 = 리뷰 25 목록 24건 id·가중치 전부 일치 |
| `x-truncation-audit.ts` → `-output.txt` | 🆕 잘린 24건의 남은 문장·잘려 나간 문장을 나란히 출력, 인용부호 짝·전언 표지 집계(`src/lib/share.ts` 실제 함수 사용) | 인용부호 짝 안 맞음 4/24. **반박·단서 절이 잘려 나간 건 다수**(§4.2) |
| `build-output-ga-dummy.txt` | `NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build` | 검증 412건 통과 · 정적 799/799 |
| `a11y-e2e-rerun.txt` | 프로그래머 `a11y-e2e.mjs` 재실행(로컬 `next start -p 3026`) | **172/172 PASS** — 172개 항목 라벨이 프로그래머 출력과 전부 같음(값 차이 2줄은 포커스 외곽선 색 전환 중 표본, 둘 다 PASS) |
| `build-output-no-site-url.txt` + `origin-fallback-check.mjs` → `-output.txt` | 🆕 `NEXT_PUBLIC_SITE_URL` 없이 빌드 → 하이드레이션 뒤 X·스레드 `url`·클립보드 값 | 8/8 PASS(= `location.origin` + 경로) |
| `content-counts.mjs` → `-output.txt` | 🆕 content 412건 frontmatter 전수 집계 | `og.description` 0건 · `updatedAt` ko 30건(11-08 4건) · 사진형 0건 |
| `d1-exact-check.py` → `-output.txt` | 🆕 PRD §1 D1 원문 ↔ `SITE.description` 글자 비교 | 일치(126자). `SITE_EN.description` 157자 |
| `d6-grep-output.txt` | D6 금지어 9종 `src/` 전체 + 신규·추가 줄 | 전부 0 |

배포 도메인 접근: `curl` 1회(`/about` — GA 스크립트 존재·현행 개인정보 문장·`example.invalid` 확인). 빌드·`next start`는 이 세션만 했고, 끝에 기본 `npm run build`(799/799)로 `.next`를 되돌려 두었다. 서버 프로세스 잔존 0.

---

## 1. 판정

### 🟠 조건부 승인 — P2 4건을 고친 뒤 커밋

구현 품질은 높다. 리뷰 25 반영 표 9항목은 코드에서 전부 확인됐고, 프로그래머의 실측 숫자 3종(34/34 · FAIL 0 · 172/172)은 그대로 재현됐다. 외부 스크립트·SDK 0, 클라이언트 번들 비밀값 0, 저장소 독립 위반 0이다. 라이브 결함(`contact@example.invalid` 노출 — 오늘 `curl`로 아직 라이브에 있음 확인)도 고친다.

배포를 막는 것은 4건이다. 셋은 **문구 한 줄 교체**이고, 하나는 **함수 한 곳의 분기 변경**이다.
- **P2-1** 소개(ko) "개인정보를 수집하지 않습니다" ↔ 약관 "GA4로 집계". 라이브에 GA가 실제로 켜져 있다.
- **P2-2** 소개(ko) 매체 등록 문장이 리뷰 24 P3-1에서 오기로 정정된 표현 그대로다. 약관은 정정된 표현을 쓴다.
- **P2-3** X 제목 자르기가 제목 끝의 **반박·단서 절**을 잘라낸다. 사이트가 미리 채운 공유 문구가 게시물과 반대 뜻으로 읽히는 경우가 있다. 실명 정치인에게 "본인 발언이 아니다"라고 정리한 문구를 본인 발언처럼 남기는 사례도 있다.
- **P2-4** 영어 D1 세 번째 문장이 "단정하지 않는다"를 "말하지 않는다"로 옮겨 뜻이 달라졌다.

| 구분 | 건수 |
|---|---|
| 🔴 P1 | 0 |
| 🟠 P2 | 4 (전부 배포 차단) |
| 🟡 P3 | 8 (비차단) |
| 리뷰 25 반영 표 | 9/9 확인 ✅ (범위 밖 4건 P3-4·7·8·11은 미반영 상태 그대로 확인) |
| scope 수용 기준(v0.2 구현 대상 20개) | ✅ 17 · 🟡 2 · ❌ 1 (§2) |
| 재실측 | 34/34 · FAIL 0(24/24 일치) · 172/172 · 대체값 8/8 |
| D6 금지어 | 0 (9종 × src 전체) |
| 저장소 독립 | 위반 0 (검사 파일 48개 + PNG 18장 + history append분, §7) |

---

## 2. scope 수용 기준 대조 (코드 직접 확인)

| § | 수용 기준 | 확인 위치·방법 | 판정 |
|---|---|---|---|
| 2.1-1 | `/about`에 D1 전문 그대로 | `about/page.tsx` 22행 `SITE.description`, `d1-exact-check.py` 글자 일치 | ✅ |
| 2.1-2 | `/en/about` 동등 영어 문구, **기획자 재확인 없이 배포 안 함** | `SITE_EN.aboutIntro`. 의미 비동등 1곳(P2-4). 기획자 재확인 조항은 오더 11 판단 3("리뷰어 게이트")과 관계가 명시되지 않음 → §9 슈퍼바이저 판단 | ❌ → P2-4 |
| 2.1-3 | `SITE(_EN).description` 갱신·160자 | ko 126 · en 157. 렌더된 meta·OG·WebSite JSON-LD에 반영 확인(curl) | ✅ (en meta 축약 P3-6) |
| 2.1-4 | "등록된" 대상 분리 | ko D1 원문. en은 괄호 안 "outlets registered under …" | ✅ |
| 2.2-1 | ko/en 존재 + about 상호 링크 | 빌드 라우트 `/terms`·`/en/terms`, about 정정 절 끝 링크, terms→about 링크, e2e PASS | ✅ |
| 2.2-2 | 6개 항목 | ko·en 각 `h2` 6개(e2e), 문안 6절과 대조 | ✅ |
| 2.2-3 | 연락 경로 임의 채움 금지 | `contactEmail: null`, 4페이지 렌더 `mailto` 0·"준비 중" 상자 있음(curl) | ✅ |
| 2.2-4 | "지체 없이"·3영업일 구분 | terms ko 95~105행, en 102~112행 | ✅ |
| 2.2-5 | 법적 효과 보장 문장 없음 | 문안 원문 + 문안 밖 4문장(§5.2) 모두 보장 표현 없음 | ✅ |
| 2.2-6 | meta title·description·canonical | curl: ko/en title·description·canonical·hreflang 3종 | ✅ |
| 2.3-1 | 상세 ko/en 3종, 카카오 없음 | `share-buttons.tsx`, `post-detail.tsx` 155행 | ✅ |
| 2.3-2 | 서버 상태 불필요 | intent `<a>` + `navigator.clipboard` | ✅ |
| 2.3-3 | 클릭 시 GA4 | `track()` 3곳, e2e dataLayer `share` 확인 | ✅ |
| 2.3-4 | 레이블·키보드 | 네이티브 요소, `aria-label` 0, Tab 순서 e2e | ✅ |
| 2.3-5 | 올바른 게시물 URL | 절대 URL(환경변수) e2e ✅ + 대체값 8/8 ✅ | ✅ |
| 2.4-1 | 텍스트(배지·아이콘 아님) | `post-card.tsx` 91~101행 평문 span, e2e 테두리 0·배경 투명, 화면 육안 | ✅ |
| 2.4-2 | 기준 일수 = 사용자 확정값 | `RENEWAL_DAYS = 7`, 0~6일 표시 | ✅ |
| 2.4-3 | 정렬은 `publishedAt` | `toCardView`는 정렬에 관여하지 않음(로더 무변경, diff 없음) | ✅ |
| 2.4-4 | 상세 갱신 이력과 충돌 없음 | `post-detail.tsx` 기존 "Updated …" 날짜 유지, 카드만 추가 | ✅ |
| 2.5-1·2 | 수단별 이벤트·네이밍 | `share`·`method`·`content_type`·`item_id`(+`language`) | ✅ |
| 2.6-1 | 푸터 링크 | `site-footer.tsx` 29~32행 | ✅ |
| (참고) 2.4 문언 "(확인 후)"·2.2-3 문언 | 4c·5a 결정 전 문장 그대로 — 리뷰 25 P3-11, 기획 손질 대상 | 🟡 ×2 (코드 결함 아님) |

집계: ✅ 17 · 🟡 2 · ❌ 1 = 20(2.5-3 내부 트래픽 필터는 GA 콘솔 작업이라 제외, 2.7 범위 제외).

## 3. 리뷰 25 반영 표 대조 (트리거 표 9항목 + §9-1)

| 항목 | 코드 확인 | 판정 |
|---|---|---|
| P2-1 평문 | `post-card.tsx` — `Badge` import 없음, `<span>` 평문 | ✅ |
| P2-2 sr-only | 보이는 `<time aria-hidden="true">` + `<span className="sr-only">{renewedSr(…)}</span>`. e2e AX 트리에서 전체 날짜만 읽힘 | ✅ |
| P3-1 `aria-label` 제거 | `share-buttons.tsx`에 `aria-label` 0. 이름이 `copyLabel`로 함께 바뀜 | ✅ |
| P3-2 X 280 | 가중치 계산·자르기 — 길이 요건은 충족, **편집 정책 문제는 P2-3** | ✅(길이) |
| P3-3 origin 대체 | `useState(getSiteUrl() ?? '')` + `useEffect`에서만 `window.location.origin` — 하이드레이션 불일치 없음. 대체값 실측 8/8 | ✅ |
| P3-5 경계·시간대 | `renewal.ts` UTC+9 고정, 0~6. 재실행 34/34 | ✅ |
| P3-6 `PostCardView.updatedAt` | `view.ts` — 표시 대상일 때만 싣는다 | ✅ |
| P3-9 about→terms 위치 | 정정·삭제 절 끝(ko 112~118행, en 61~67행) | ✅ |
| P3-10 새 창 sr 안내 | 두 링크에 `dict.opensInNewTab` sr-only | ✅ |
| §9-1 약관 지금 공개 | 사이트맵 2항목(짝 hreflang ko·en·x-default 확인), 푸터·상호 링크 ON, llms.txt 1줄 | ✅ |

## 4. 코드 정확성

### 4.1 갱신 판정
- 경계 0·6·7일, 음수, KST 자정 전후, 월·연·윤년, `TZ` 4종 — 재실행 34/34, 출력 바이트 동일.
- 렌더 대상: content 집계에서 `updatedAt = 2026-11-08`은 ko 4건이다. 빌드일(KST 11-09) 기준 경과 1일이라 표시 대상이 정확히 4건이다. 트리거 "게시물 4건"과 일치. 10-27 갱신분(13일)은 미표시로 맞다.
- 빌드 시점 판정(A안) — `seoulDate(new Date())`가 `toCardView` 기본 인자라 카드마다 다시 계산된다. 빌드가 KST 자정을 걸치면 페이지마다 기준일이 하루 다를 수 있다(빌드 실측 12초라 실제 가능성은 낮음) → P3-1.

### 4.2 X 가중치 자르기 — 🟠 P2-3
길이 로직은 정확하다. 412제목 모두 X 최대 279/280이고, 잘린 24건은 리뷰 25 목록과 id·원래 가중치까지 일치한다. 문제는 **무엇이 잘리느냐**다. 이 사이트 영어 제목은 "주장 — 보도된 사실; 반박·단서" 구조가 많다. 뒤에서 자르면 **반박·단서 절이 먼저 사라진다**(`x-truncation-audit-output.txt` 전문).

| 게시물 | X에 미리 채워지는 끝부분 | 잘려 나간 부분 | 결과 |
|---|---|---|---|
| gotdemcatch-kimminseok-chief-justice-resign | "…the lines 'removing Cho' and 'if he won't listen…" | "to Lee Jae-myung' were not his words" | **본인 발언이 아니라고 정리한 문구를 실명 정치인의 발언 목록처럼 남김**(렌더된 `/en/post/…` href에서 직접 확인) |
| peoplepower7-ukraine-korea-oil-claim | "…'Zelensky: "Korea is communist"' and 'the government supported shipments'…" | "were not confirmed" | 미확인 주장을 확인 여부 없이 나열 |
| swingmag-fake-police-protest-sentence | "…; 'jailed for…" | "shouting' and '…prison' differ from the ruling" | 판결과 다르다는 정정이 사라짐 |
| ccpoutkorea-ocsc-overseas-police | "…whether it was a police station has…" | "not been established from public records" | 핵심 부정어 소실 |
| rekor-15div-mine-field | "…mine-laying south of the MDL is reported…" | "only as 'signs'" | 단서 소실로 더 확정적으로 읽힘 |
| geonwoovibes-defector-repatriation-claim | "…as Minister Chung Dong-young and Democratic…" | "…the ministry called it "completely groundless"" | 당사자 부인이 사라짐 |

그 밖에 toktok·alaska·issueradar·jeichi·shindawit-mdl·wendmag·hagonolza·ribonpig 등도 반박·당국 입장·단서 절이 잘린다. 인용부호 짝이 깨지는 것(미해결 3)은 4/24로, 이 문제의 일부일 뿐이다.

CLAUDE.md 축 6과 PRD §6은 제목·요약을 인용형으로 쓰고, 미확인 주장은 요약에서 빼라고 한다. 이번 공유 문구는 사용자가 아니라 **사이트가 생성해 미리 채우는 문구**다. 작성창에서 고칠 수 있다는 점이 면책이 되지 않는다. 영어 상세 24건에 한정되지만 실명 대상 사례가 있어 **배포 차단**으로 판정한다.

**수정 지시(프로그래머)** — 핸드오프 미해결 3의 대안을 채택한다.
- `xShareText`: 제목 가중치가 예산(256)을 넘으면 **잘라 붙이지 않고 빈 문자열**을 돌려준다.
- `xIntentUrl`: `text`가 비면 `text` 파라미터를 빼고 `https://x.com/intent/tweet?url=…`만 만든다. X는 링크 카드로 페이지 OG 제목 전문을 보여 준다.
- `share-check.ts` 기대값: "잘림 en 24"를 "url만 en 24(리뷰 25 목록과 일치)·나머지 388건 text = 제목 그대로"로 바꾼다.
- `a11y-e2e.mjs`는 `text` 파라미터를 검사하지 않으므로(grep 확인) 그대로 재실행하면 된다. 다만 e2e 상세 대상 `alaska-lng`(en)이 24건에 들어 있다. url만 넘기는 경로가 실측되도록 X href에 `text`가 없는지 확인하는 줄 1개를 더할 것을 권장한다.
- 스레드는 최대 404/500이라 자르지 않는다 — 변경 없음.

### 4.3 URL 인코딩·origin
- `encodeURIComponent`로 `text`·`url`을 인코딩한다. 재실행 결과 412건 모두 왕복 일치. `'`는 RFC 3986 하위 구분자라 인코딩하지 않아도 유효하다(렌더 HTML에서 `&#x27;` 확인).
- `NEXT_PUBLIC_SITE_URL`이 있으면 서버·클라이언트 모두 같은 절대 URL을 쓴다. 없으면 SSR HTML에는 상대 경로가 들어가고, 하이드레이션 뒤 `origin`으로 바뀐다. 실측 8/8. 하이드레이션 전에 누르면 상대 경로가 나간다. 운영은 환경변수가 설정돼 있어 해당하지 않는다(정보).

### 4.4 GA
`trackEvent`는 측정 ID가 없거나 `window.gtag`가 없으면 즉시 반환한다(`analytics.ts` 32~35행, 코드 확인). 공유 버튼 쪽 호출은 `track()` 하나로 모여 있고 다른 전역 접근이 없다. 측정 ID가 **빈 상태의 빌드는 이번에 따로 돌리지 않았다**(로컬 `.env.local`에 ID가 있음). 안전성 근거는 위 코드 분기다. 더미 ID 빌드에서 이벤트 3종 실측은 e2e로 재현했다.

### 4.5 `contactEmail: null` 분기
- `git grep contactEmail HEAD -- src`: 종전 사용처는 about ko/en 2곳뿐이다. `seo.ts`·`llms.txt`는 종전에도 지금도 쓰지 않는다(전수 grep). 현재 사용처는 about ko/en·terms ko/en 4곳이고 모두 삼항 분기다.
- 렌더 4페이지 `href="mailto` 0, "준비 중" 문구 있음. `.next/server`의 `example.invalid` 0파일. (`mailto:` 문자열 4파일은 분기 코드가 컴파일된 `page.js`이고 렌더 HTML이 아님.)
- 타입 `null as string | null` — 사용자 값이 정해지면 문자열 1곳만 바꾸면 된다. ✅

### 4.6 sitemap·hreflang·canonical·JSON-LD
- sitemap: `/terms`(0.3)·`/en/terms`(0.2) 각각 ko·en·x-default=ko 대체 링크. 페이지 `<link rel=alternate>`와 같은 값.
- canonical: `/terms`·`/en/terms` 자기 참조. `html lang` ko/en.
- JSON-LD `WebPage`(name·url·inLanguage·isPartOf). WebSite JSON-LD·meta·OG description이 D1로 바뀐 것 확인(홈 ko/en curl).

### 4.7 그 밖
- 영어 카드의 갱신 표시는 한국어 원본의 `updatedAt`을 쓴다. 현재 표시 대상 4건은 모두 `translatedAt = 2026-11-08`이라 문제없다. 다만 영어본을 고치지 않은 채 한국어만 갱신하면 영어 카드에 "Updated"가 뜬다. 검증 스크립트는 경고만 낸다 → P3-2.
- `ShareButtons`의 `h2 id="share-heading"`은 상세 페이지당 1회라 id 중복 없음. 링크 `rel="noopener"`(기존 원문 링크와 같은 관례).

## 5. 문구 게이트

### 5.1 영어 D1(`SITE_EN.aboutIntro`) — 🟠 P2-4

| ko D1 | en | 판정 |
|---|---|---|
| 여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. | A card-style news digest that gathers and organizes reporting from multiple news outlets. | 동등 ✅ |
| 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. | We do not do our own reporting; we organize each story with its sources named: news reports (from outlets registered under Korea's Act on the Promotion of Newspapers and related laws), announcements by investigative authorities, and court rulings. | 동등 ✅ ("등록된"이 출처 매체에만 걸림 — 2.1-4 충족) |
| 사실 확인 단계는 **단정하지 않고** 보도 그대로 인용합니다. | We **do not state** how far the facts have been confirmed; we quote the reports as they are. | ❌ — "단정하지 않는다"가 "말하지 않는다/알리지 않는다"가 됐다. 한국어 소개 표기 원칙("사실 확인이 어디까지 된 일인지는 요약 문장과 출처 목록으로 전달합니다")과도 반대로 읽힌다 |

**수정 문구 안(셋째 문장만 교체)**:
> We do not make definitive claims about how far the facts have been established; we quote the reports as they are.

`SITE_EN.description`(meta 157자)은 세 문장 중 앞 두 문장을 줄였다. "수사기관 발표"가 "official announcements"로 넓어졌고 셋째 문장은 빠졌다. meta 요약으로는 같은 취지 범위라 비차단이다(P3-6).

### 5.2 문안 밖 문장 4개 — 모두 통과

| # | 문장 | 출처 | 판정 |
|---|---|---|---|
| 1 | (ko 약관 머리) "이 페이지는 이 사이트가 어떻게 운영되는지, 어떤 출처를 쓰는지, 문제가 있을 때 어떻게 연락하는지를 안내합니다." | 시안 02 32행 원문 그대로 | ✅ 중립 안내, 보장 표현 없음 |
| 2 | (en 약관 머리) "This page explains how this site is run, which sources it uses, and how to reach us if there is a problem." | 1의 번역 | ✅ 의미 동등 |
| 3 | (en) "The handling standards below apply once the contact channel is finalized." | 시안 02 79행(슈퍼바이저 채택 문장, 오더 11 판단 1)의 번역 | ✅ 의미 동등 |
| 4 | (about ko/en) "처리 기준과 운영 원칙 전문은 이용약관·운영 정책에서 볼 수 있습니다." / "For the full handling standards and operating principles, see the Terms and Operating Policy." | 프로그래머 작성(P3-9 위치) | ✅ ko·en 동등, 링크 문장일 뿐 정책 내용 없음 |

준비 중 상자 문구(ko "연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다." / en "Contact channel: pending a decision. This page will be updated once it's finalized.")는 시안 02·03 원문 그대로다. en 문구는 문안 en §4와 통일돼 있다. 약관 원문 6절은 작성 이력 메모 3곳만 빠졌고, 나머지는 `terms-page-copy.md`와 문장 단위로 대조해 일치한다.

### 5.3 D6
`src/` 전체 9종(기자·속보·본지·편집국·바이라인·reporter·breaking·newsroom·byline) 0건, 신규·추가 줄 0건 — 프로그래머 결과 재현(`d6-grep-output.txt`).

## 6. 🟠 미해결 1~3 배포 차단 판정

| 미해결 | 판정 | 근거 |
|---|---|---|
| 1-a 개인정보 | **차단 → P2-1** | 라이브 `/about`에 GA 스크립트(`googletagmanager.com/gtag/js`)가 있다(curl 1회). 그런데 같은 페이지가 "방문자에게서 개인정보를 수집하지 않습니다"라고 단정한다. 이번 커밋으로 약관 §5("방문 통계는 GA4로 집계 … 개인정보보호법상 고지 충족 여부 확인 필요")가 함께 공개되고, 소개 페이지는 약관으로 직접 링크한다. 개인정보 진술이 두 페이지에서 서로 어긋난 채 나란히 공개된다. 고칠 문장은 리뷰 24를 거친 기획자 약관 문안에 이미 있다 |
| 1-b 매체 등록 | **차단 → P2-2** | 소개(ko) "「신문법」에 따라 등록된 신문·인터넷신문, 뉴스통신사, 방송사업자"는 뉴스통신사·방송사업자도 신문법 등록 대상인 것처럼 읽힌다. 리뷰 24 P3-1이 오기로 확정한 표현이다. 약관 §3은 정정본을 쓴다. 소개에서 약관으로 바로 이어지는 같은 주제의 법령 진술이 서로 다르다. 이것도 정정 문장이 기획자 문안에 이미 있다 |
| 2 "위 4항" | 비차단 → P3-4 | 정정·삭제 절은 실제로 4번째 절이라 순서로 세면 맞다. 번호 없는 제목이라 찾기 불편할 뿐 오기는 아니다. 다음 기획 손질 때 "위 '정정·삭제 요청 방법과 처리 기준' 절"로 바꾸는 안을 권장한다 |
| 3 X 말줄임 | **차단 → P2-3** (범위 확대) | 인용부호 문제(4/24)보다 큰 문제는 반박·단서 절 소실이다(§4.2) |

**P2-1 수정 문구 안** — `src/app/(ko)/about/page.tsx` "운영 방식" 셋째 `<li>`:
> 현행: 열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 방문자에게서 개인정보를 수집하지 않습니다.
> **수정**: 열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다.

**P2-2 수정 문구 안** — 같은 파일 "출처 정책" 둘째 `<li>`:
> 현행: 언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문, 뉴스통신사, 방송사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.
> **수정**: 언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.

두 안 모두 **기획자가 쓰고 리뷰 24를 통과한 약관 문안(§5·§3)의 문장을 그대로 옮긴 것**이다. 그래서 새 기획 확정 없이 슈퍼바이저 채택으로 반영할 수 있다고 판단한다. 기획 원본 쪽(PRD·scope의 소개 문구 기록)은 다음 기획 손질 때 맞춘다. `/en/about`에는 해당 문장이 없어 변경 대상이 아니다.

## 7. 저장소 독립·보안
- 검사 범위: 커밋 대상 `src/` 18 + 핸드오프·트리거·처리된 오더 3 + `docs/tools/programmer-11/` 텍스트 10 + 본 리뷰 산출물(리뷰·트리거·`docs/tools/reviewer-26/` 전부) + 처리된 리뷰 오더 = **48파일**(최종 재검사 수), PNG 18장(문자열 검사). 홈 절대경로·홈 디렉터리명·사용자 계정명·다른 서비스명 패턴 → **0건**. (패턴 목록은 그 자체가 위반이 되므로 문서에 적지 않는다.)
- 외부 스크립트·SDK: 신규 0. 클라이언트 번들 `.next/static` JS 39파일에서 외부 호스트는 라이브러리 문서 주소 외에 `x.com`·`www.threads.com`(intent 링크 문자열)뿐이다. `<script src>`는 기존 GA `next/script` 1곳뿐이다.
- 비밀값: 번들에서 키 형태 패턴(`sk_`·JWT·`service_role`·개인키 머리말·SUPABASE·RESEND) 0. 클라이언트가 새로 읽는 `config.ts` 값은 `NEXT_PUBLIC_*`과 공개 상수뿐이다.

## 8. 결함

### 🟠 P2 (전부 배포 차단)
| # | 위치 | 내용 | 수정 |
|---|---|---|---|
| P2-1 | `src/app/(ko)/about/page.tsx` 35~36행 | 개인정보 "수집하지 않습니다" 단정 ↔ 라이브 GA·약관 §5 | §6 수정 문구 안 |
| P2-2 | `src/app/(ko)/about/page.tsx` 48~49행 | 매체 등록 오기(리뷰 24 P3-1 정정 전 표현) ↔ 약관 §3 | §6 수정 문구 안 |
| P2-3 | `src/lib/share.ts` `xShareText`·`xIntentUrl` | 잘린 X 문구가 반박·단서 절을 잃어 게시물과 반대로 읽힘(실명 사례 포함) | §4.2 — 예산 초과 시 `url`만 |
| P2-4 | `src/lib/config.ts` `SITE_EN.aboutIntro` 셋째 문장 | "단정하지 않고" → "do not state" 의미 변경 | §5.1 수정 문구 안 |

### 🟡 P3 (비차단)
| # | 위치 | 내용 |
|---|---|---|
| P3-1 | `view.ts` `toCardView` 기본 인자 | `today`가 카드마다 다시 계산됨 — 페이지 렌더 단위(또는 모듈 1회)로 고정 권장 |
| P3-2 | 영어 카드 갱신 표시 | 한국어만 갱신하고 영어본을 고치지 않으면 영어 카드에 "Updated"가 뜸(현재 해당 0건). `translatedAt < updatedAt`일 때 영어 카드 표시를 끌지 다음에 정한다 |
| P3-3 | about ko/en 정정 절 | 3영업일 답변 약속 옆에 약관과 같은 "처리 기준은 연락 창구가 확정된 뒤부터 적용" 단서가 없음 |
| P3-4 | 약관 §5 "위 4항"/"Section 4" | 화면 제목에 번호 없음(§6) |
| P3-5 | 약관 §3 "기사 요약이나 본문을 그대로 옮기지 않습니다" ↔ 상세 `og.description` 원문 인용 블록 + `sourcePreviewNote` "원문 그대로" | 현재 `og.description` 있는 게시물 0건이라 실제 모순은 없다. 다만 기능상 가능한 상태라 다음 기획 손질 때 문안이나 기능을 정리해야 한다 |
| P3-6 | `SITE_EN.description` | meta 축약에서 "수사기관"이 "official"로 넓어지고 셋째 문장이 빠짐. 허용 범위지만 "announcements by investigative authorities"로 맞추는 안 권장(길이 재확인 필요) |
| P3-7 | 사진형 상세 | 실측 불가 — content 집계 `sourceType ≠ url` 0건 확인. 같은 컴포넌트·같은 위치라 위험은 낮다. 첫 사진형 게시 때 테스터 확인 |
| P3-8 | 작업 트리 | `--worktree` 게이트였음. 커밋 직전 `--staged` 재실행 필요(핸드오프 미해결 6과 같음) |

## 9. 사용자 결정 필요 / 슈퍼바이저 판단
- **사용자 결정 필요: 신규 없음.** 기존 미결(연락 창구 확정 4c)은 그대로다. 개인정보 고지가 법적으로 충분한지는 약관에 적힌 대로 "확인 필요" 상태를 유지한다.
- **슈퍼바이저 판단 1** — scope 2.1-2 "영어 문구는 … 기획자 재확인 없이 배포하지 않는다"와 오더 11 판단 3("리뷰어가 게이트")의 관계. 리뷰어 게이트로 대체한다면 그 사실을 history에 남긴다. 아니면 P2-4 수정본을 기획자에게 확인받는다. 리뷰어는 P2-4 수정 문구 기준으로 의미 동등을 승인한다.
- **슈퍼바이저 판단 2** — P2-1·P2-2 문구는 기획자 약관 문안을 그대로 옮긴 것이라, 슈퍼바이저 채택으로 프로그래머 수정 오더에 넣는 것을 권장한다.

## 10. 커밋 조건·순서
1. 프로그래머 11-1(수정 오더): P2-1~P2-4 반영 → `share-check.ts` 기대값 갱신·재실행 → build·typecheck·lint → `a11y-e2e.mjs` 재실행.
2. 리뷰어 짧은 재확인(26-1): 문구 4곳 diff와 share-check·e2e 숫자만 본다.
3. 슈퍼바이저: `clean-clone-gate.sh --staged` → 경로 지정 커밋.

## 11. 커밋 대상 경로
프로그래머 11(+ 11-1 수정분)
- `src/lib/config.ts`, `src/lib/i18n.ts`, `src/lib/analytics.ts`, `src/lib/seo.ts`, `src/lib/share.ts`, `src/lib/content/view.ts`, `src/lib/content/renewal.ts`
- `src/components/share-buttons.tsx`, `src/components/page-section.tsx`, `src/components/post-detail.tsx`, `src/components/post-card.tsx`, `src/components/site-footer.tsx`
- `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`, `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx`
- `docs/tools/programmer-11/`(전부), `docs/handoffs/programmer-11-news-format-v0.2-implement.md`, `docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md`, `instructions/programmer/processed/11-news-format-v0.2-implement.md`

리뷰어 26
- `docs/reviews/programmer-11-news-format-v0.2-implement-review.md`
- `docs/tools/reviewer-26/`(전부 — `content-counts.mjs`·`-output.txt`, `d1-exact-check.py`·`-output.txt`, `d6-grep-output.txt`, `x-truncation-audit.ts`·`-output.txt`, `origin-fallback-check.mjs`·`-output.txt`, `renewal-check-rerun.txt`, `share-check-rerun.txt`, `a11y-e2e-rerun.txt`, `build-output-ga-dummy.txt`, `build-output-no-site-url.txt`)
- `docs/triggers/reviewer-26-programmer-11-news-format-v0.2-review-COMPLETE.md`
- `instructions/reviewer/processed/26-programmer-11-news-format-v0.2-review.md`(이동)
- `history/2026-11-09.md`(append분)

(작업 트리의 다른 미추적·수정 파일 — `docs/user-tasks.md`, `history/` 다른 날짜, `docs/tools/planner-07/*`, tester-01 관련 — 은 이번 범위가 아니다. 경로를 지정해 커밋한다.)
