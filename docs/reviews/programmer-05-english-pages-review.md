# 리뷰 보고서 — 프로그래머 05 · 영어 페이지(`/en`)

**작성일**: 2026-09-30 01:40 | **작성 세션**: 리뷰어 (Opus 5.5)
**md오더**: `instructions/reviewer/processed/10-programmer-05-english-pages.md`
**검토 대상**: 미커밋 작업 트리 — `src/**`·`next.config.ts`·`scripts/validate-content.ts`(git 기준 수정 25 · 삭제 8 · src 신규 파일 20) · `content/README.md` §9 · `content/posts-en/`(샘플 1건) · 도구 `docs/tools/programmer-05/` · 캡처 `docs/qa/programmer-05/` · 핸드오프·트리거·오더
**선행 검토**: CLAUDE.md · 프로그래머 05 오더(processed) · 핸드오프 · 트리거 · 리뷰 08·09 · `content/README.md` §9 · 샘플 영어본과 한국어 원본 대조
**코드 수정**: 0건. 검토 전후 `git diff` + 신규 src·content·scripts 파일 해시가 같다(`9e3aa7ed…` 전후 일치). 수정안 검증은 **스크래치 복사본에서만** 했다.

> ⚠️ 측정 기준 시점: 검토 중에도 슈퍼바이저가 게시물을 커밋해 HEAD가 `fa0077d → 0fa34ef → efa2c3a → 6dee3ca`로 움직였다. 모든 대조 측정은 **HEAD `efa2c3a` 콘텐츠(한국어 126건)** 에 맞춰 작업 트리와 HEAD 스크래치를 **같은 콘텐츠로 다시 빌드**해서 했다(두 트리의 `content/posts` 해시 일치 확인 후 빌드). 그래서 핸드오프 숫자(357→361, 350개)와 절댓값이 다르고 증가폭은 같다.

---

## 판정: 🟡 조건부 승인 — 확정 결함 1건(D1) 수정 후 커밋

영어 페이지 구조·스키마 견고성·hreflang/canonical/sitemap·한국어 불변성·배너 회귀는 전수 실측으로 통과했다.
단 **범위 밖 페이지 번호(`/?page=999`·`/tag/{slug}?page=99`·`/en?page=99`)에서 사이트 404 대신 Next 기본 404 화면이 나오는 회귀**를 확인했다(D1, P1).
핸드오프 미해결 1은 "HEAD도 같다"고 적었지만, 그건 서버 HTML 셸만 비교한 결과다. **브라우저 렌더 결과는 HEAD에서는 사이트 404(헤더·푸터·한국어 안내)이고, 작업 트리에서는 Next 기본 404("404 This page could not be found.", 헤더·푸터 없음)다.**
수정안(라우트 그룹별 `not-found.tsx` 2개)을 스크래치에 넣어 확인했다. 세 경우 모두 사이트 404로 돌아왔고 정적 HTML 359/359는 그대로였다. → **프로그래머 05-1 소규모 수정 후 리뷰어 재확인(간이) → 커밋.**

---

## 1. 확정 결함

| # | 심각도 | 항목 | 근거(실측) | 수정 방향 |
|---|---|---|---|---|
| **D1** | **P1** | **범위 밖 `?page=` 요청이 Next 기본 404로 렌더됨 — 한국어 페이지 동작 변경(오더 "한국어 URL·동작 불변" 위반)** | `render-404.mjs`(헤드리스 Chrome 390px, 하이드레이션 후 DOM) HEAD vs 작업: `/?page=999`·`/tag/dmz?page=99` — **HEAD** h1 "페이지를 찾을 수 없습니다", 헤더·푸터 있음 / **작업** h1 "404", 본문 "This page could not be found.", 헤더·푸터 없음(배너만 남음). `/en?page=99` 작업도 같은 기본 404. 상태 코드는 둘 다 404. 원인: 미들웨어 rewrite(`?page=n → /page/n`)로 들어온 `dynamicParams=false` 미생성 경로는 **그룹 루트 레이아웃 안의 not-found 경계**로 렌더되는데, 기존 `app/not-found.tsx`를 지우고 `global-not-found.tsx`만 둬서 그룹 안에 not-found가 없다(`/page/999`처럼 직접 경로는 global-not-found가 받아 정상) | `src/app/(ko)/not-found.tsx`(`PageFrame locale="ko"` + 기존 404 문구) · `src/app/(en)/not-found.tsx`(`PageFrame locale="en"` + 영어 문구). **리뷰어 스크래치 검증**: 세 경우 모두 사이트 404로 렌더되고 상태 404 유지. `/en?page=99`는 `lang="en"`·배너 없는 영어 404. `/page/999`·`/post/no-such`·`/en/post/no-such`는 변화 없음. 수정 전후 정적 HTML **359/359 동일**(JSON-LD 포함). 참고 초안 `docs/tools/reviewer-10/patch-proposal/`(문구는 프로그래머 판단) |

> 핸드오프 미해결 1 정정: "HEAD에서도 `/?page=999`·`/tag/dmz?page=99`가 똑같다"는 **서버 HTML 셸(`__next_error__`)만 본 결과**다. HEAD 셸의 RSC 페이로드에는 사이트 404 트리가 들어 있어 하이드레이션 후 사이트 404가 보인다. 작업 트리 셸에는 그 트리가 없다(작업 셸 본문 "페이지를 찾을 수 없습니다" 0회, HEAD 1회).

## 2. 재실측 숫자 (리뷰어 직접 실행)

### 2-1. 빌드 게이트
| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 127건(한국어 126 · 영어본 1) 통과 127 · 실패 0 · **영어본 1건 / 전체 126건** |
| typecheck | 오류 0 (빌드 전·후) |
| lint | 0 errors · 1 warning(`docs/tools/reviewer-04/keyboard-tab.mjs:36` 기존) · 신규 `docs/tools/reviewer-10` 0 |
| build | 성공 · 정적 **HEAD 363 → 작업 367(+4)** · HTML **356 → 359(+3)** — 증가분 `/en`·`/en/about`·`/en/post/{샘플}`(+ `/en/opengraph-image`) · 한국어 감소 0 |

### 2-2. 한국어 불변 — HEAD 스크래치(`git archive efa2c3a`)와 전수 비교
| 도구 | 결과 |
|---|---|
| `ko-html-diff.mjs`(프로그래머) | 기준 356 전부 존재 · **의도된 추가분 제거 후 356/356 동일 · 의도하지 않은 차이 0** · 추가분: lang-nav 356 · hreflang 9 · Read in English 1 · 404 robots 1 · 404 영어 안내 1 · 404 OG 이미지 메타 10개 빠짐 |
| `jsonld-diff.mjs`(리뷰어 신규 — 위 도구가 걷어내는 `<script>` 중 JSON-LD와 `<head>` 메타 전수) | JSON-LD 블록 1,049개 · **355/356 동일** — 차이는 `_not-found.html` 1건(WebSite JSON-LD 빠짐, P2-1) · `<head>` meta·canonical(hreflang 제외) **356/356 동일** · 언어 nav 파일당 정확히 1개 **356/356** |
| 도구 신뢰 확인 | 리뷰어 스크래치 복사본(작업 트리 rsync) 빌드 ↔ 실제 작업 트리 빌드 `html-same.mjs` **359/359 동일** |

### 2-3. 영어 페이지·언어 전환·SEO
| 항목 | 결과 |
|---|---|
| `en-qa.mjs checks`(프로그래머) | **128/128** (8경로 × 3폭 + HTTP 9) · 콘솔 오류 0 · 가로 넘침 0 |
| `static-i18n.mjs`(리뷰어 신규 — **빌드 HTML 전수 359개**) | **3,018/3,018 통과** — 파일마다 `<html lang>`(ko 355 · en 3 · 404 1) · canonical 1개·자기 자신(공개 URL 형태 `?page=n`·퍼센트 인코딩 태그 포함) · hreflang(짝 있는 6경로만 ko·en·x-default=ko, 나머지 0) · **양방향 12건 일치** · 언어 nav(현재 언어 `aria-current` span + 상대 언어 링크 `lang`·`hrefLang`·목적지) · 배너(ko 1개 + `<html>` scroll-pb 클래스 / en 0개·class 없음·여백 클래스 0) · 상세 Read in English(영어본 있는 1건만) · 영어 상세 한국어 원문 링크·`og:locale en_US`·자체 OG 이미지(`/en/opengraph-image`)·"Translated from the Korean original."·"Sources are in Korean."·태그 링크 0 |
| sitemap | `<url>` **343** = 홈 1 + about 1 + 태그 212 + 게시물 126 + 영어 3 · alternates 6항목 × 3 = `xhtml:link` 18 · **343개 URL 전부 HTTP 200** |
| robots.txt | `Disallow: /page/` · `/tag/*/page/` · **`/en/page/`** 확인 |
| llms.txt | "English version … (1건, 편집자 번역) … 한국어 원문이 우선" 한 줄 확인 |
| 경로 상태 | `/en` 200 · `/en?page=1` 200(본문 `/en`과 동일) · `/en?page=2`·`/en/page/1`·`/en/page/2` 404 · `/en/post/{영어본 없는 id}`·`/en/post/no-such`·`/en/tag/dmz` 404 · `/en/` → 308 `/en` |

### 2-4. 영어본 스키마 견고성
| 항목 | 결과 |
|---|---|
| `unit-checks.ts`(프로그래머) | **53/53** |
| 리뷰어 파괴 시험(스크래치 복사본, 7종) | 원본 없음 · id≠파일명 · title 누락 · YAML 파손 · imageAlt 누락 · imageCaption 누락 · translatedAt 형식 오류 — **7/7 모두 `validate:content` 실패 + prebuild를 건너뛴 `next build`도 실패**(로더 `getAllTranslations`가 빌드 중단). 로그 `results/robustness.log` |

### 2-5. 🔴 플로팅 배너 회귀 — 포커스 가림 전수(핸드오프 미해결 2)
`review-qa-ko.mjs focus`(리뷰어 08 도구 사본: `/en/**` 제외 + `/_next/image` 차단, 아래 참고)

| 폭 | 탭 정지점 | 배너 완전 가림 | 일부 가림 |
|---|---|---|---|
| 320×640 | 52,603 | **0** | **0** |
| 360×740 | 52,603 | 0 | 0 |
| 390×844 | 52,603 | 0 | 0 |
| 768×1024 | 52,603 | 0 | 0 |
| 1023×768 | 52,603 | 0 | 0 |
| 1024×768 | 52,603 | 0 | 0 |
| 1280×900 | 52,603 | 0 | 0 |
| **합계** | **368,221** (한국어 356경로 × 7폭 = **2,492건**) | **0** | **0** |

- 배너 도달 **2,492/2,492**. 배너는 여전히 마지막 탭 정지점이다(결정 3 `PageFrame` 이동 후에도 DOM·탭 순서가 그대로임을 확인). 고정 헤더 가림 완전 0 · 일부 0. 소요 46분(00:34~01:20).
- **측정 조건 참고**: 처음 세 번(`results/focus-ko-run1~3-timeout.log`)은 1분 안에 "이벤트 대기 시간 초과"로 멈췄다. 추적해 보니 로컬 `next start`의 `/_next/image` 응답 일부가 끝나지 않아 load 이벤트가 오지 않았다(서버 HTML은 정상). 카드·상세 이미지는 `aspect-[16/9]` 고정 상자에 `fill`로 들어가므로 이미지 로드는 레이아웃과 포커스 위치에 영향이 없다. 그래서 이미지 요청만 막고 측정했다. 원인 조사 결과는 P2-2에 적었다.

### 2-6. 저장소 독립 grep
- 패턴: pre-commit 훅과 같은 패턴 + 홈 계정명. 대상: `git diff` 추가줄 **0** · 변경·신규 파일 81개(png 제외) **0** · 캡처 PNG 8장(strings) **0** · 리뷰어 산출물(`docs/tools/reviewer-10/**`, 본 보고서, 트리거) **0**(작성 후 재확인). 리뷰어 도구 로그의 스택 트레이스에 찍힌 절대경로는 `./`로 치환했다.

## 3. 코드 리뷰 소견 (오더 §2 중점)

| 중점 | 소견 |
|---|---|
| 결정 1 — 그룹별 루트 레이아웃 + `globalNotFound` | 한국어 URL 불변(356/356)과 `<html lang>` 분리는 목적대로다. 위험도: 실험 플래그지만 `next`가 **정확 버전(15.5.25) 고정**이라 업그레이드 전까지 동작은 고정된다. 업그레이드 시 재확인 항목에 올린다(미해결 3 동의). 다만 그룹 분리의 부작용으로 **그룹 안 not-found 경계가 비었고**, 그게 D1이다 — 전역 404만으로는 부족하다 |
| 결정 3 — `PageFrame` | 스킵 링크 → 헤더 → main → 푸터 → 배너 순서 유지(정적 356/356 + 포커스 2,492/2,492 배너 마지막). 짝 경로를 서버에서 완성하는 설계는 JS 없이도 맞는 링크가 나가고 페이로드도 늘지 않아 타당하다 |
| 영어본 스키마·로더 | 검증 함수 하나를 스크립트와 로더가 함께 써서 규칙이 따로 놀지 않는다. 조건부 필수(image/caption/images[])와 상속 필드 무시·경고가 명확하다. 파괴 시험 7/7 차단. YAML 파손 시 로더는 원시 `YAMLException`을 던진다(스크립트는 친절한 메시지) — 빌드는 막히므로 결함은 아님 |
| hreflang·canonical·sitemap·robots | 양방향·x-default=ko·자기 canonical 전수 일치. sitemap 홈 alternates는 `…/`(슬래시), 페이지 hreflang은 슬래시 없는 홈 URL — 루트 경로라 같은 URL로 취급되므로 조치 불필요 |
| 본문 링크 치환 | sanitize 뒤 `href`에만, 정확한 `/post/{slug}` 형태일 때만, 쿼리·해시 보존 — 안전하다. `/about`·`/tag/…` 같은 다른 내부 링크는 한국어 페이지로 남는다(P2-4) |
| 배너 | `isFloatingBannerShown(locale)` 한 곳에서 배너와 여백을 함께 끈다. 영어 3경로는 배너·`<html>` class·여백 클래스 0, 한국어는 그대로 |
| 샘플 번역 범위 | 한국어 원본과 문단 단위로 대조했다. 추가된 사실이나 단정은 없고 "reportedly"로 인용 형태를 지켰다. 영어 description은 원본 두 번째 문장(국방위 답변)을 뺀 축약이다. 빼기만 했으므로 정책 위반은 아니다 |

## 4. 슈퍼바이저 판단 반영 확인 (오더 §3)
- 결정 4(OG = 사이트 자체 이미지): 영어 상세 `og:image`가 `/en/opengraph-image`임을 전수 검사로 확인. 원문 썸네일은 쓰지 않는다. **반영됨.**
- 결정 6(영어 UI 문구 사전): `src/lib/i18n.ts` 한 곳, §5 확정 문구는 `SITE_EN`·about·상세 안내에 글자 그대로 들어 있다. **반영됨.**
- attribution 한국어 노출(후속 과제) — **리뷰어 의견**: 영어본에 **선택 필드 `attribution`(영어 표기)** 을 두는 쪽을 권한다. 플랫폼명만 영어로 바꾸고(`Instagram @im_nowandhere (나우앤히어)`) 계정명·핸들은 원문을 그대로 둔다. 규칙은 `speakerAffiliation`과 같게 하면 된다. 없으면 원본 값을 쓰고, 괄호 밖 한글은 경고한다. 출처 표기는 저작권 표시 성격이라 원본 핸들을 바꾸면 안 되고, 번역은 "Instagram/Threads" 같은 플랫폼명에 한정하는 것이 맞다.

## 5. 지적사항 (P2 — 커밋을 막지 않음)

| # | 내용 | 근거 |
|---|---|---|
| P2-1 | 전역 404가 WebSite JSON-LD를 내지 않는다(기존 404는 냈다). 404는 noindex라 실제 영향은 없고 기록만 한다. D1 수정 때 함께 맞춰도 된다 | `jsonld-diff` 355/356 |
| P2-2 | **확인 필요** — 로컬 `next start`에서 헤드리스 Chrome으로 같은 URL을 여러 폭으로 반복해 열면, 간헐적으로 `/_next/image`(w=640, webp) 응답이 끝나지 않고 그 키가 서버 재시작 전까지 계속 멈춘다. 같은 URL 원본 파일·다른 폭·curl 동시 40건 × 3회는 정상이었다. 작업 트리 복사본으로 한 번은 재현되고 한 번은 통과해서 HEAD와 확정 비교를 하지 못했다(HEAD는 한 번 통과). Vercel 배포는 이미지 최적화를 플랫폼이 처리하므로 운영 영향은 낮다고 보지만 **실측 근거는 없다**. 테스터 단계에서 배포 도메인 이미지 로딩을 확인할 것을 권한다 | `results/focus-ko-run1~3-timeout.log`, 본 보고서 2-5 |
| P2-3 | 리뷰 09 R6 미반영: `src/lib/floating-banner.ts` 6행 주석 "`'use client'` 배너 파일과 분리해 둔다"는 여전히 사실과 다르다(배너 본체는 서버 컴포넌트) | 파일 재확인 |
| P2-4 | 영어 본문의 `/about`·`/tag/…` 내부 링크는 한국어 페이지로 남는다. `content/README.md` §9는 링크 문구에 "(in Korean)"을 붙이라고 안내하는데, 대상 글이 나중에 번역되면 링크는 영어로 자동 전환되고 문구만 "(in Korean)"으로 남는다(샘플 본문 첫 문단이 해당). 안내를 "대상 영어본이 생기면 문구도 고칠 것"으로 보완하거나, 치환된 링크에서는 표기를 빼는 방식을 권한다 | 샘플 본문·README §9 |
| P2-5 | 검토 중 로컬 산출물 `.next/cache/images`(런타임 이미지 캐시)를 한 번 비웠다(P2-2 원인 가설 확인용). 소스·빌드 산출 HTML은 건드리지 않았다. 다음 `next start` 때 다시 채워진다 | 기록 |

## 6. 측정 도구·증거
| 경로 | 내용 |
|---|---|
| `docs/tools/reviewer-10/static-i18n.mjs` | 빌드 HTML 전수: lang·canonical·hreflang 양방향·언어 nav·배너·영어 상세 요소 |
| `docs/tools/reviewer-10/jsonld-diff.mjs` | HEAD↔작업 JSON-LD·`<head>` 메타 전수 비교 + 언어 nav 파일당 1개 |
| `docs/tools/reviewer-10/html-same.mjs` | 두 빌드 HTML(보이는 문서 + JSON-LD) 전수 동일성 |
| `docs/tools/reviewer-10/render-404.mjs` | 범위 밖 `?page=`·없는 경로 404의 하이드레이션 후 화면(기준↔작업) |
| `docs/tools/reviewer-10/review-qa-ko.mjs` | 리뷰어 08 `review-qa.mjs` 사본 — `/en/**` 제외 + focus 시 `/_next/image` 차단 |
| `docs/tools/reviewer-10/patch-proposal/` | D1 수정안 초안 2개(`.tsx.txt` — 저장소 빌드·lint에 걸리지 않게 확장자 변경) |
| `docs/tools/reviewer-10/results/` | `gates.log` · `ko-html-diff.log` · `jsonld-head-diff.log` · `en-qa-checks.log` · `unit-checks.log` · `static-i18n.log` · `http.log` · `robustness.log` · `focus-ko.log`(최종) · `focus-ko-run1~3-timeout.log` · `render-404.log` · `render-404-patch.log` · `patch-static-diff.log` |

재현: `npm run build && npx next start -p 3105` 후
`node docs/tools/reviewer-10/static-i18n.mjs .next/server/app http://localhost:3000`(사이트 URL = `.env.local`의 `NEXT_PUBLIC_SITE_URL`) ·
`node docs/tools/reviewer-10/review-qa-ko.mjs http://localhost:3105 focus`(약 45분) ·
HEAD는 `git archive HEAD`를 스크래치에 풀고 `.env.local` 복사 후 빌드 → `node docs/tools/reviewer-10/jsonld-diff.mjs <HEAD>/.next/server/app .next/server/app`.

## 7. 다음 단계
1. **슈퍼바이저 (Opus 5)** → 프로그래머 05-1 수정 오더: **D1(필수)**. P2-1·P2-3·P2-4는 같은 오더에 한 줄씩 넣기를 권한다(선택).
2. **프로그래머 (Opus 5)** → `(ko)`·`(en)` `not-found.tsx` 추가. 재실측 항목: `render-404.mjs`(HEAD↔작업) 6경로, `ko-html-diff` 356/356, `en-qa checks` 128/128, `static-i18n` 전수.
3. **리뷰어 (Opus 5.5)** → 간이 재확인(404 렌더 + 정적 동일성. 포커스 전수는 not-found 추가가 정적 HTML을 바꾸지 않으므로 재실행 불필요, 수정 전후 359/359 동일 실측) → 승인 → 슈퍼바이저 커밋.
4. 커밋 시 이번 리뷰어 산출물(본 보고서 · 트리거 · `docs/tools/reviewer-10/` · processed 오더 · history)을 함께 넣는다.
