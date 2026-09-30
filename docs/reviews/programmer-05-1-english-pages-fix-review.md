# 리뷰 보고서 — 프로그래머 05-1 · 영어 페이지 리뷰 지적 수정 (간이 재확인)

**작성일**: 2026-09-30 10:40 | **작성 세션**: 리뷰어 (Opus 5.5)
**md오더**: `instructions/reviewer/processed/11-programmer-05-1-recheck.md`
**검토 대상**: 미커밋 작업 트리 — 05-1 변경분(수정 전 05 상태 대비 `src` 신규 4 · 수정 5 · `content/README.md` · 샘플 영어본) + 05 전체(HEAD 대비)
**선행 검토**: 리뷰 10(§1 D1 · §4 · §5 · §7) · 05-1 오더(processed) · 핸드오프 · 트리거 · CLAUDE.md
**코드 수정**: 0건 · 커밋 0건. 수정안·파괴 시험은 **스크래치 사본에서만** 했다.

> ⚠️ **측정 기준 시점**: 핸드오프 이후 슈퍼바이저 게시 커밋으로 HEAD가 `7f654c6 → f9df347`로 움직였다(한국어 게시물 128 → **129**). 그래서 세 트리를 스크래치에 새로 떠서 **같은 콘텐츠·같은 이미지**로 다시 빌드해 대조했다(`content/posts` 해시 `6b145f6…`, `public` 해시 `31a0c47…` 세 트리 일치).
> - **HEAD**: `git archive f9df347`
> - **수정 전(05 상태)**: 프로그래머 05-1 스크래치 `pre` 사본. 신뢰 확인 — 리뷰어 10이 따로 떠 둔 05 작업 트리 사본에서 리뷰어 패치 2개를 뺀 것과 `src`·`next.config.ts`·`scripts`·README·`posts-en` **전부 동일**(독립 사본 2개 일치)
> - **수정 후**: 실제 작업 트리 rsync — `src`·`content` `diff -rq` 차이 0 확인
>
> 절댓값이 핸드오프와 다른 이유는 게시물 +1(정적 +3, HTML +3)이다. 증감폭은 핸드오프와 같다.

---

## 판정: ✅ 승인 — 커밋 가능

리뷰 10의 D1(P1)은 해소됐다. 범위 밖 `?page=` 3경로가 다시 사이트 404로 렌더되고 상태 404를 유지한다. `/en?page=99`는 `lang="en"`·배너 없는 영어 404다.
정적 HTML은 수정 전 대비 **365/367 동일**이다. 차이 2건은 핸드오프가 밝힌 두 건(`_not-found.html` JSON-LD, 영어 샘플 상세)과 조각 단위까지 같다. HEAD 대비 한국어 의도 외 차이는 **0**이다.
포커스 가림 전수는 재실행하지 않았다. 대신 **하이드레이션 후 DOM과 탭 정지점을 367경로 전부** 수정 전·후로 비교했고, 한국어 경로는 전부 동일했다(§2-4).
새 결함은 없다. P2 3건과 후속 과제 1건만 적는다.

---

## 1. 확정 결함
**없음.**

## 2. 재실측 숫자 (리뷰어 직접 실행)

### 2-1. 게이트 (수정 후 사본)
| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 130건(한국어 129 · 영어본 1) 통과 130 · 실패 0 · **영어본 1건 / 전체 129건** · 영어본 경고 0 |
| typecheck | 오류 0 |
| lint | **0 errors** · 3 warnings — `reviewer-04/keyboard-tab.mjs:36` 1 · `reviewer-10/html-same.mjs` 2(리뷰어 도구, 05-1 변경 파일 0). ※ 리뷰 10 §2-1이 `reviewer-10` 경고를 0으로 적은 것은 잘못이다(핸드오프 미해결 3 지적이 맞다). 커밋은 막지 않음 |
| build | 성공 · 정적 **HEAD 371 → 수정 전 375 → 수정 후 375** · HTML **364 → 367 → 367** (그룹 `not-found.tsx`는 정적 페이지를 만들지 않음) |

### 2-2. D1 — 404 렌더·상태
| 도구 | 결과 |
|---|---|
| `programmer-05-1/render-404-checks.mjs` 작업 | **144/144** (6경로 × 3폭 × 8항목) · 콘솔 오류 0 · 가로 넘침 0 |
| 같은 도구, 수정 전 서버 | 108/144 · 실패 36 = `/?page=999`·`/tag/dmz?page=99`·`/en?page=99` × 3폭 × 4항목(h1·헤더/main/푸터·언어 nav·홈 링크) — **도구가 D1을 실제로 잡는 것 확인** |
| `reviewer-10/render-404.mjs` HEAD ↔ 작업 | 6경로 모두 작업 = 사이트 404(h1 "페이지를 찾을 수 없습니다", 헤더·푸터·배너). `/en?page=99` 작업 = `lang="en"`·h1 "Page not found"·**배너 없음**. HEAD와의 차이는 헤더 언어 전환(05 의도)뿐 |
| `reviewer-11/http-404-matrix.mjs`(신규 — 6경로 밖 변형 포함 24경로) | 상태 코드 **22/24 HEAD와 일치**. 차이 2 = `/en?page=1`·`/en?page=abc` 404 → 200(HEAD엔 `/en`이 없음, 05 의도). `?page=12`(마지막+1)·`/tag/25사단?page=3`·`/tag/no-such-tag?page=2`·`/en?page=2` 모두 404 유지. `?page=0`·`-1`·`abc`·`2.5` → 200 홈(HEAD 동일, 기존 동작) |

### 2-3. 정적 동일성 (오더 §2)
| 비교 | 결과 |
|---|---|
| 수정 전 ↔ 후 `reviewer-10/html-same.mjs` | **365/367 동일** · 차이 2: `_not-found.html` · `en/post/2026-09-29-nowandhere-defense-minister-nk-responsibility.html` |
| 차이 2건 조각 단위(`programmer-05-1/html-diff-detail.mjs`) | `_not-found.html` — **WebSite JSON-LD `<script>` 1블록 추가뿐**(변경 2조각) · 영어 샘플 — `<dd>` 출처 표기 `인스타그램 …`(`lang="ko"`) → `Instagram @im_nowandhere <span lang="ko">(나우앤히어)</span>` · 원문 확인 링크 안 같은 변경 · 본문 첫 문단 "(in Korean)" → "(some may be available only in Korean)" (변경 10조각). **핸드오프 설명과 일치** |
| 🆕 엄격 비교 `reviewer-11/strict-same.mjs` L1 — HTML 주석(React 텍스트 노드 경계 `<!-- -->`)까지 남기고 빌드 ID만 정규화 | **365/367 동일**, 차이 2건 동일. → `MixedLangText`가 한국어 페이지의 **텍스트 노드 분할까지** 바꾸지 않음 |
| 🆕 RSC 페이로드 L2 | 0/367 동일 — **예상된 차이**. `reviewer-11/rsc-children-diff.mjs`(행 재번호 무시, 문자열 값 multiset)로 성격 확인: 366경로 전부 "그룹 레이아웃 notFound 슬롯 = Next 기본 404(`This page could not be found.`) → 사이트 404 트리(헤더·푸터·안내 문구)"로 바뀐 것뿐. 영어 샘플만 추가로 attribution 2곳. `_not-found.html`은 차이 없음. HEAD도 기존 `app/not-found.tsx` 트리를 페이로드에 실었던 구조와 같다. 크기 영향: 페이지당 약 +2.5KB(홈 362,718 → 365,200 B) |
| HEAD 대비 한국어 `programmer-05/ko-html-diff.mjs` | 기준 364 전부 존재 · **의도된 추가분 제거 후 364/364 동일 · 의도하지 않은 차이 0** (lang-nav 364 · hreflang 9 · read-in-english 1 · 404-robots 1 · 404-english-line 1 · 404 OG 메타 10 빠짐 — 전부 05 의도) |
| HEAD 대비 `reviewer-10/jsonld-diff.mjs` | JSON-LD 블록 1,073개 **364/364 동일**(리뷰 10 당시 355/356 → **P2-1 해소**) · `<head>` meta·canonical 364/364 · 언어 nav 파일당 1개 364/364 |
| `reviewer-10/static-i18n.mjs` (빌드 HTML 전수 367) | **3,085/3,085 통과** · ko 363 · en 3 · 404 1 · 양방향 12건 |
| `programmer-05/en-qa.mjs checks` | **128/128** · 콘솔 오류 0 · 가로 넘침 0 |

### 2-4. 포커스 가림 전수 대체 근거 (오더 §6)
정적 비교에 더해, 하이드레이션까지 끝난 화면을 직접 비교했다(`reviewer-11/hydrated-dom-same.mjs`, 390px, 수정 전·후 서버, **빌드 HTML 367경로 전부**).

| 항목 | 결과 |
|---|---|
| 하이드레이션 후 body DOM | **366/367 동일** · 차이 1 = 영어 샘플 상세 |
| 탭 정지점 목록(순서·태그·href·텍스트) | **366/367 동일** · 합계 55,340개 · 차이 1 = 영어 샘플(19 → 19, 출처 링크 텍스트만 변경) |
| 콘솔 오류·예외 | 수정 전 0 · 수정 후 0 |

**판단**: 한국어 363경로 + 404는 탭 정지점의 순서·대상·보이는 DOM이 수정 전과 같다. 리뷰 10의 포커스 가림 전수(368,221 정지점 가림 0)는 수정 전 상태에서 잰 것이므로 결과가 그대로 유효하다. `_not-found.html`의 차이(JSON-LD `<script>`)는 렌더되지 않고 포커스도 받지 않는다(하이드레이션 후 DOM 비교에서 스크립트를 뺀 결과 동일). 영어 샘플은 포커스 전수 대상(`/en/**` 제외)이 아니고, 정지점 수가 같으며 링크 텍스트만 바뀌었다. **재실행 불필요.**
측정 조건: 리뷰 10 P2-2 회피를 위해 `/_next/image` 요청을 막았다. 이미지는 고정 비율 상자라 레이아웃에 영향이 없다. 폭은 390px 1종이다. 한국어 DOM 동일성은 폭과 무관한 정적 비교(365/367)가 함께 받쳐 준다.

### 2-5. attribution (오더 §3)
| 항목 | 결과 |
|---|---|
| `programmer-05-1/unit-checks.tsx` | **25/25** · 기존 `programmer-05/unit-checks.ts` **53/53** |
| 핸들 누락 경고 | 단위(`Instagram (나우앤히어)` → 경고 · 대소문자 변경 → 경고 · 핸들 없는 언론사 원본 → 경고 없음) + **검증 스크립트 전 파이프라인**(샘플을 스크래치에서 바꿔 `validate:content` 실행)에서도 경고 출력 · 종료 0(빌드 막지 않음 — 오더대로) |
| 괄호 밖 한글 경고 | 단위 + 전 파이프라인 모두 경고 출력(`인스타그램` 지목). 홑낫표 `「나우앤히어」`도 괄호 밖으로 보아 경고 |
| 🆕 리뷰어 모서리 시험 `reviewer-11/attribution-edge.tsx` | 중첩 괄호 `(Now and Here (나우앤히어))` → 안쪽만 `<span lang="ko">` · 전각 괄호 → 정상 · 괄호 병기 2곳 → 각각 감쌈 · 원본 핸들 2개 중 1개 누락 → 누락분만 경고 · **비문자열 값(숫자·배열·객체·null) → 오류·경고 없이 원본 값 사용**(P2-A) · **원본에 없는 핸들 추가 → 경고 없음**(P2-B) |
| `MixedLangText` 한국어 불변 | 단위(한국어 페이지 = 문자열 그대로) + **정적 L1(주석 유지) 한국어 363경로 동일** + 하이드레이션 후 DOM 동일. 발언자 소속이 있는 한국어 상세(발언자 표기 49건)도 모두 포함된 결과다 |
| README §9 | `attribution` 형식 줄 · "선택 — 없으면 원본 값" · 규칙 표(한글 섞임에 speakerAffiliation·attribution 추가, 핸들 누락 경고 행) · **플랫폼명만 번역**(Instagram·Threads·YouTube·Facebook) · 핸들·괄호 안 원문 유지 · 공식 영문 표기를 모르는 언론사명은 번역 금지 — 오더 요구와 일치 |
| 샘플 | `attribution: "Instagram @im_nowandhere (나우앤히어)"` — 원본 `인스타그램 @im_nowandhere (나우앤히어)`에서 플랫폼명만 바꿈. 핸들·괄호 병기 보존 |

### 2-6. P2 반영 (오더 §4)
| # | 확인 |
|---|---|
| P2-1 | 전역 404에 `JsonLd websiteJsonLd('ko')` 추가 → HEAD 대비 JSON-LD **364/364**. **반영됨** |
| P2-3 | `src/lib/floating-banner.ts` 주석 — "배너 본체·레이아웃·`PageFrame`·푸터 모두 서버 컴포넌트, 클라이언트는 `FloatingBannerLink`뿐". 실측: `'use client'`는 `floating-banner-link.tsx` 1곳뿐 · 이 모듈을 읽는 파일은 전역 404·두 그룹 레이아웃·`floating-banner.tsx`·`site-footer.tsx`·`page-frame.tsx`. **사실과 일치, 반영됨** |
| P2-4 | README §9 — "(in Korean)"을 링크 문구·링크 바로 뒤에 붙이지 않음, 목록 앞 한 번만 `(some may be available only in Korean)`, `/about`·`/tag` 링크는 자동 전환되지 않으므로 `/en/about` 직접·태그 링크 금지. 샘플 본문 내부 링크는 `/post/…` 4개뿐이고 "(in Korean)" 잔존 0. **반영됨** |

### 2-7. 저장소 독립 grep
pre-commit 훅 패턴 + 홈 계정명. `git diff HEAD` 추가줄 **0** · 변경·신규 파일 116개(png 제외, 리뷰어 11 도구 포함) **0** · PNG 8장(strings) **0** · 리뷰어 로그는 스크래치 절대경로를 `./`로 치환 후 저장. 본 보고서·트리거·history 작성 후 재확인 **0**(§7).

## 3. 코드 리뷰 소견
| 대상 | 소견 |
|---|---|
| `(ko)`·`(en)` `not-found.tsx` | 리뷰 10 수정안과 같은 구조다. 레이아웃이 `<html lang>`·배너·WebSite JSON-LD를 그리므로 본문만 둔 판단이 맞다(그룹 404에 JSON-LD 중복 없음). `/en` 그룹 404의 언어 전환 링크 `ko: '/'`·`en: '/en'`은 적절하다 |
| `NotFoundMessage` | 전역·그룹 3곳이 문구를 공유한다. 한국어 마크업 불변은 L1 비교로 확인했다. 결정 2(그룹 404엔 영어 안내 줄 없음)는 그룹 안에서 언어가 정해져 있으므로 타당하다 |
| `translation.ts` | `attribution`을 `INHERITED_FIELDS`에서 빼고 `TRANSLATION_FIELDS`에 넣었다. 한글 검사·병합·`localizePost` 폴백(`?? original.attribution`)이 한 흐름에 있다. `hangulOutsideParentheses`는 `stripParentheses`를 재사용하도록 바뀌었는데, 동작은 같다(기존 53/53) |
| `langForTranslatable`·`MixedLangText` | 괄호 밖 한글이 있으면 요소 전체를 `lang="ko"`로 두고, 괄호 안에만 있으면 그 부분만 감싼다. WCAG 3.1.2 관점에서 기존 `langFor`보다 정확하다. 한국어 페이지는 기존과 같은 단일 문자열을 내므로 출력 불변이다. 중첩 괄호에서는 안쪽 괄호만 감싸고 바깥 괄호 문자는 영어 텍스트로 남는데, 읽기에는 문제가 없다 |
| 전역 404 JSON-LD | 배너 뒤·GA 앞 `<body>` 안에 있다. HEAD 404와 JSON-LD 블록 내용이 같다(`jsonld-diff` 364/364 — 블록 내용 비교이며 DOM 위치는 비교 대상 아님) |

## 4. 핸드오프 미해결 판단
| # | 판단 |
|---|---|
| **1. 그룹 404 robots 메타 중복**(오더 §7) | **후속 과제(소규모, 커밋 차단 아님).** 실측: `/?page=999`·`/tag/dmz?page=99`·`/en?page=99`에 `noindex`(Next 자동) + `index, follow`(레이아웃) 두 개가 나가고 HEAD도 같다(`http-404-matrix.log`). 응답이 HTTP 404라 검색엔진이 색인하지 않으므로 실제 영향은 없다. 다만 서로 모순되는 지시라 정리할 가치는 있다. **확인 필요였던 "not-found.tsx가 metadata를 지원하는지"** → Next 15.5.25 `resolve-metadata.js`가 error convention(not-found) 모듈의 `metadata`를 레이아웃 뒤에 병합하는 것을 소스로 확인했다. **스크래치 시험**: 두 그룹 `not-found.tsx`에 `export const metadata = { robots: { index: false, follow: true } }` 한 줄을 넣고 빌드했다. 세 경로 모두 `noindex` + `noindex, follow`(전역 404와 같은 형태)가 됐고, 200 경로(`/?page=2`·`/en`)는 `index, follow` 그대로였다. 정적 HTML **367/367 동일**(초안 `docs/tools/reviewer-11/robots-experiment/ko-not-found.tsx.txt`). 다음 프로그래머 작업에 한 줄씩 넣으면 된다 |
| 2. 그룹 404 서버 셸(`__next_error__`, JS 없으면 셸만 보임) | HEAD와 같은 기존 동작이다. 동의 — 조치 불필요 |
| 3. lint 경고 `reviewer-10/html-same.mjs` 2건 | 리뷰어 10 도구 문제이고 리뷰 10의 "0" 기록이 틀렸다(§2-1). 커밋과 무관. 이번 리뷰어 11 도구는 lint 0 |
| 4. 리뷰 10 P2-2(`/_next/image` 멈춤) | 이번에도 이미지 요청을 막고 쟀으므로 재현 여부의 근거는 없다. 테스터 단계 배포 도메인 확인 권고를 유지한다 |
| 5. `experimental.globalNotFound` | 유지. `next` 정확 버전 고정 중 — 업그레이드 시 재확인 |

## 5. 지적사항 (P2 — 커밋을 막지 않음)
| # | 내용 | 근거 |
|---|---|---|
| P2-A | 영어본 `attribution`(과 같은 규칙을 쓰는 `speakerAffiliation`)에 문자열이 아닌 값(숫자·배열·객체)을 적으면 **오류·경고 없이 원본 값으로 조용히 폴백**한다. 오타(`attribution: [Instagram …]`)를 알아채기 어렵다. 선택 필드라 빌드를 막을 일은 아니고, "문자열이 아니라 무시됨" 경고 한 줄을 권한다 | `attribution-edge.log` · 전 파이프라인 `attribution: 123` → validate 경고 0 |
| P2-B | 핸들 검사는 **누락만** 본다. 원본에 없는 핸들을 영어 표기에 더해도 경고가 없다. 출처 표기에 원본에 없는 계정을 넣지 않는다는 README 원칙(원본 범위 안 번역)과 맞추려면 "원본에 없는 핸들" 경고도 대칭으로 두는 편이 낫다 | `attribution-edge.log` [핸들 추가] |
| P2-C | 그룹 404 robots 메타 중복 — §4-1. 수정안 검증 완료(한 줄 × 2파일, 정적 367/367 불변) | `http-404-matrix.log` · `build-e2e-robots.log` |

## 6. 커밋 대상 파일 목록 확인 (슈퍼바이저 커밋용)
`git status` 전수 대조 — 의도하지 않은 파일(`.env*`·`.next`·`tsconfig.tsbuildinfo`·로그 외 산출물) **없음**.
- **05 + 05-1 코드**: 수정 `next.config.ts` · `scripts/validate-content.ts` · `content/README.md` · `src/app/llms.txt/route.ts` · `src/app/robots.ts` · `src/app/sitemap.ts` · `src/middleware.ts` · `src/components/{card-media,external-link,feed-view,floating-banner,gallery,pagination,post-card,post-grid,site-footer,site-header,source-list}.tsx` · `src/lib/{config,floating-banner,seo,utils}.ts` · `src/lib/content/{load,markdown,schema,view}.ts`
  / 삭제(그룹 이동) `src/app/{layout,page,not-found}.tsx` · `src/app/about/page.tsx` · `src/app/page/[page]/page.tsx` · `src/app/post/[id]/page.tsx` · `src/app/tag/[slug]/page.tsx` · `src/app/tag/[slug]/page/[page]/page.tsx`
  / 신규 `src/app/(ko)/**`(layout · not-found · page · about · page/[page] · post/[id] · tag/[slug] · tag/[slug]/page/[page]) · `src/app/(en)/**`(layout · not-found · en/page · en/about · en/opengraph-image · en/page/[page] · en/post/[id]) · `src/app/global-not-found.tsx` · `src/components/{english-site-heading,mixed-lang-text,not-found-message,page-frame,post-detail}.tsx` · `src/lib/{i18n,site-metadata}.ts` · `src/lib/content/translation.ts` · `content/posts-en/2026-09-29-nowandhere-defense-minister-nk-responsibility.md`
- **문서·도구**: 핸드오프 05·05-1 · 트리거 05·05-1·리뷰어 10·리뷰어 11 · 리뷰 10·11 · `docs/qa/programmer-05/` · `docs/tools/{programmer-05,programmer-05-1,reviewer-10,reviewer-11}/` · `history/2026-09-29.md`·`2026-09-30.md`
- **오더 이동**: `instructions/programmer/{05,05-1}…` → `processed/` · `instructions/reviewer/{10,11}…` → `processed/` (삭제 + 신규로 보이므로 `git add -A instructions`)
- 파일 이동이 있어 `git add -A src/app` 필요(05 핸드오프와 같음).

## 7. 측정 도구·증거 — `docs/tools/reviewer-11/`
| 경로 | 내용 |
|---|---|
| `strict-same.mjs` | 두 빌드 HTML 전수 — L1(HTML 주석 유지, 빌드 ID 정규화) · L2(RSC 페이로드) 동일성 |
| `rsc-children-diff.mjs` | RSC 문자열 값 multiset 차이를 파일별로 뽑아 같은 차이끼리 묶음(재번호 무시) |
| `hydrated-dom-same.mjs` | 전 경로 × 두 서버, 하이드레이션 후 body DOM·탭 정지점·콘솔 오류 비교 |
| `http-404-matrix.mjs` | `?page=` 변형·404 경로 24개 HTTP 상태·lang·robots — 기준↔작업 |
| `attribution-edge.tsx` (+ `tsconfig.json`) | attribution 모서리 관찰(비문자열·핸들 추가·중첩/전각 괄호 렌더) |
| `robots-experiment/ko-not-found.tsx.txt` | P2-C 스크래치 시험 초안(확장자 변경 — 빌드·lint 제외) |
| `results/` | `validate` · `typecheck` · `lint` · `build-{head,pre,work,e2e-robots}` · `html-same-pre-work` · `static-diff-detail` · `strict-pre-work` · `rsc-children-pre-work` · `ko-html-diff` · `jsonld-head-diff` · `static-i18n` · `en-qa-checks` · `render-404-checks-{work,pre}` · `render-404-head-vs-work` · `http-404-matrix` · `hydrated-dom-390` · `unit-checks` · `unit-checks-05` · `attribution-edge` (.log) |

재현: 세 트리를 스크래치에 만들고(§머리말) 각각 `.env.local` 복사 → `npx next build` → `npx next start -p 3201/3202/3203` 후
`node docs/tools/reviewer-11/hydrated-dom-same.mjs <수정 전>/.next/server/app http://localhost:3202 http://localhost:3203 390`(약 8분) ·
`node docs/tools/reviewer-11/strict-same.mjs <수정 전 app> <수정 후 app>` · `node docs/tools/reviewer-11/http-404-matrix.mjs http://localhost:3201 http://localhost:3203`.

## 8. 다음 단계
1. **슈퍼바이저 (Opus 5)** → 05 + 05-1 + 리뷰어 10·11 산출물 함께 커밋(§6 목록) → 푸시·배포 → 배포 도메인에서 `/en`·`/?page=999` 반영 확인 `curl` 1~2회.
2. **후속(선택, 소규모)** — 프로그래머: P2-C(그룹 404 robots 한 줄 × 2) · P2-A/P2-B(attribution 경고 보강). 다음 프로그래머 오더에 묶어도 된다.
3. **테스터 (Sonnet 5)** → 리뷰 10 P2-2(배포 도메인 이미지 로딩) 확인 권고 유지.
