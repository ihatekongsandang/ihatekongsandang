# 프로그래머 세션 — 05-1-english-pages-fix 핸드오프
**작성일**: 2026-09-30 08:20 | **작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/05-1-english-pages-fix.md` · **근거**: `docs/reviews/programmer-05-english-pages-review.md`(리뷰어 10 🟡)

## 요약 (3줄)
1. **D1 해소** — `(ko)`·`(en)` 그룹에 `not-found.tsx`를 추가했다. `/?page=999`·`/tag/dmz?page=99`·`/en?page=99`가 다시 사이트 404(헤더·푸터·안내)로 렌더된다. `/en?page=99`는 `lang="en"`·배너 없는 영어 404. 상태 코드 404 유지.
2. **영어본 `attribution` 선택 필드** 추가(없으면 원본 값, 괄호 밖 한글 경고, 원본 핸들 누락 경고). 샘플에 `Instagram @im_nowandhere (나우앤히어)` 반영, README §9 표 보완. 괄호 안 한국어 병기만 `lang="ko"`로 감싼다. P2-1(전역 404 JSON-LD)·P2-3(주석)·P2-4(README "(in Korean)" 안내·샘플 본문) 반영.
3. validate 129/129 · typecheck 0 · lint 0 errors · build 정적 372(수정 전과 같음) · 수정 전↔후 정적 HTML **362/364 동일**(차이 2 = 의도분) · HEAD 대비 한국어 361/361 의도 외 차이 0 · JSON-LD 361/361 · static-i18n 3,060/3,060 · en-qa 128/128 · 404 렌더 144/144 · 규칙 25/25 + 53/53 · 독립 grep 0. 🔴 커밋하지 않음.

## 산출물

### 코드
| 파일 | 구분 | 내용 |
|---|---|---|
| `src/app/(ko)/not-found.tsx` | 신규 | 한국어 그룹 404 — `PageFrame locale="ko"` + 기존 404 문구(D1) |
| `src/app/(en)/not-found.tsx` | 신규 | 영어 그룹 404 — `PageFrame locale="en"` + 영어 문구, 홈 링크 `/en`(D1) |
| `src/components/not-found-message.tsx` | 신규 | 404 안내 본문 공용(전역·그룹 3곳). 한국어 마크업은 기존 404와 같음 |
| `src/app/global-not-found.tsx` | 수정 | 본문을 `NotFoundMessage`로 교체(출력 동일) · **WebSite JSON-LD 추가(P2-1)** · 주석에 그룹 404 역할 분담 |
| `src/lib/content/translation.ts` | 수정 | `attribution` 선택 필드(검증·병합) · 원본 핸들 누락 경고 · 상속 필드 목록에서 제거 · 괄호 제거는 `i18n.stripParentheses` 재사용 |
| `src/lib/i18n.ts` | 수정 | `stripParentheses` · `langForTranslatable`(괄호 밖 한글이 있을 때만 `lang="ko"`) |
| `src/components/mixed-lang-text.tsx` | 신규 | 영어 표기 안의 괄호 병기 한국어만 `<span lang="ko">`. 한국어 페이지는 문자열 그대로 |
| `src/components/post-detail.tsx` | 수정 | 출처 표기(2곳)·영어 발언자 소속에 `langForTranslatable` + `MixedLangText` |
| `src/lib/floating-banner.ts` | 수정 | 6행 주석을 실제 구조(배너 본체 서버 컴포넌트)로 정정(P2-3) |
| `content/posts-en/2026-09-29-nowandhere-defense-minister-nk-responsibility.md` | 수정 | `attribution` 추가 · 본문 "(in Korean)" → "(some may be available only in Korean)"(P2-4) |
| `content/README.md` | 수정 | §9 — `attribution` 형식·규칙 표·플랫폼명만 번역 안내 · 내부 링크 "(in Korean)" 금지·권장 표기(P2-4) |

`scripts/validate-content.ts`는 고치지 않았다 — 영어본 검증은 `validateTranslation` 하나를 쓰므로 필드 추가가 그대로 반영된다(validate 로그로 확인).

### 도구·증거 — `docs/tools/programmer-05-1/`
| 경로 | 내용 |
|---|---|
| `unit-checks.tsx` (+ `tsconfig.json`) | attribution·`langForTranslatable`·`MixedLangText` 25케이스. `npx tsx --tsconfig docs/tools/programmer-05-1/tsconfig.json docs/tools/programmer-05-1/unit-checks.tsx` |
| `render-404-checks.mjs` | 404 6경로 × 3폭(320·390·1280) — lang·h1·헤더/main/푸터/건너뛰기·배너·언어 nav·홈 링크·가로 넘침·콘솔 오류 단언 |
| `html-diff-detail.mjs` | 두 빌드의 같은 HTML 파일에서 달라진 조각만 출력(정규화는 리뷰어 10 `html-same.mjs`와 같음) |
| `results/` | `validate` · `typecheck` · `lint` · `build` · `unit-checks` · `unit-checks-05` · `ko-html-diff` · `jsonld-head-diff` · `static-i18n` · `en-qa-checks` · `render-404-head-vs-work` · `render-404-checks` · `render-404-checks-pre` · `http-404` · `static-diff-detail` (.log) |

## 재실측 숫자 (전부 직접 실행)
기준: HEAD `7f654c6`(한국어 게시물 128건). 스크래치에 ① HEAD(`git archive`) ② **수정 전 작업 트리 사본**(05 상태)을 떠서 같은 콘텐츠로 빌드하고(`content/posts` 전 파일 동일 확인), 수정 후 작업 트리와 대조했다.

| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 129건(한국어 128 · 영어본 1) 통과 129 · 실패 0 · **영어본 1건 / 전체 128건** · 영어본 경고 0 |
| typecheck | 오류 0 |
| lint | **0 errors** · 3 warnings — 전부 기존 리뷰어 도구(`reviewer-04/keyboard-tab.mjs:36` 1 · `reviewer-10/html-same.mjs` 2). 이번 변경 파일 0 |
| build | 성공 · 정적 **HEAD 368 → 수정 전 372 → 수정 후 372** · HTML 361 → 364 → 364 (not-found 추가로 정적 페이지 수 변화 없음) |
| 수정 전 ↔ 후 정적 HTML (`reviewer-10/html-same.mjs`) | **362/364 동일** · 차이 2 = `_not-found.html`(WebSite JSON-LD 1블록 추가, P2-1) · `en/post/{샘플}.html`(출처 표기 2곳 영어화 + 괄호 병기 `lang="ko"` · 본문 첫 문단 문구). 조각 단위 전문: `results/static-diff-detail.log` |
| 한국어 HTML — HEAD 대비 (`programmer-05/ko-html-diff.mjs`) | 기준 361 전부 존재 · **의도된 추가분 제거 후 361/361 동일 · 의도하지 않은 차이 0** · 추가분: lang-nav 361 · hreflang 9 · read-in-english 1 · 404-robots 1 · 404-english-line 1 · 404 OG 메타 10 빠짐(05 의도) |
| JSON-LD·head — HEAD 대비 (`reviewer-10/jsonld-diff.mjs`) | JSON-LD 블록 1,064개 **361/361 동일**(리뷰 당시 355/356 → P2-1 해소) · `<head>` meta·canonical 361/361 · 언어 nav 파일당 1개 361/361 |
| `reviewer-10/static-i18n.mjs` (빌드 HTML 전수 364) | **3,060/3,060 통과** · ko 360 · en 3 · 404 1 · 양방향 12건 |
| `programmer-05/en-qa.mjs checks` | **128/128** · 콘솔 오류 0 · 가로 넘침 0 (영어 상세의 `MixedLangText` 하이드레이션 포함) |
| `reviewer-10/render-404.mjs` HEAD ↔ 작업 6경로 | 6경로 모두 작업 = 사이트 404(h1 "페이지를 찾을 수 없습니다", 헤더·푸터·배너). `/en?page=99` 작업은 `lang="en"`·h1 "Page not found"·배너 없음(HEAD는 한국어 404) · 차이는 헤더 언어 전환(05 의도)뿐 |
| `render-404-checks.mjs` (신규) | 작업 **144/144** (6경로 × 3폭 × 8항목) · 수정 전 빌드 108/144 — 실패 36 = D1 3경로 × 3폭 × 4항목(도구가 결함을 잡는지 확인) |
| 404 HTTP (curl, HEAD ↔ 작업) | 6경로 모두 **404** 유지. 서버 HTML의 `<html lang>`·robots·404 문구 수는 `results/http-404.log` |
| 규칙 케이스 | 신규 **25/25** · 기존 `programmer-05/unit-checks.ts` **53/53** |
| 독립 grep | pre-commit 패턴 + 홈 계정명 — 변경·신규 코드·README·샘플·`docs/tools/programmer-05-1/**`(로그 포함) **0건** · 본 핸드오프·트리거 작성 후 재확인 0건 |

### 포커스 가림 전수 생략 근거 (오더 §4)
수정 전 ↔ 후 정적 HTML 364개 중 362개가 동일하다. 다른 2개는 ① `_not-found.html` — `<script type="application/ld+json">` 1블록 추가뿐(탭 정지점·레이아웃 변화 없음) ② `/en/post/{샘플}` — 포커스 전수 대상(`/en/**` 제외)이 아니고 텍스트만 바뀜. 그룹 `not-found.tsx`는 정적 HTML을 만들지 않는다(정적 페이지 수 372 → 372). 그래서 재실행하지 않았다.

## 주요 결정사항 (자체 판단 + 근거)
| # | 결정 | 근거 |
|---|---|---|
| 1 | 404 문구를 `NotFoundMessage` 한 곳으로 모음 | 같은 문구가 3곳(전역·ko·en)에 흩어지면 문구 수정 시 어긋난다. 한국어 마크업은 기존과 같음을 정적 비교로 확인(`_not-found.html` 차이는 JSON-LD뿐) |
| 2 | 그룹 404는 영어 안내 한 줄을 넣지 않음 | 그룹 안에서는 언어가 정해져 있다(한국어 그룹 = HEAD와 같은 한국어 404, 영어 그룹 = 영어 404). 전역 404만 요청 언어를 모르므로 두 언어를 함께 둔다 |
| 3 | 영어 404 홈 버튼 "Go to the English home" → `/en` | 리뷰어 초안 문구 그대로. 전역 404의 영어 안내 링크 문구와 같다 |
| 4 | `attribution`에 **원본 핸들 누락 경고** 추가(대소문자 구분) | 출처 표기는 저작권 표시 성격이라 핸들이 바뀌면 안 된다는 리뷰 §4 의견을 검사로 옮김. 경고만(빌드는 막지 않음) — 핸들 없는 원본(언론사명)은 검사 대상 아님 |
| 5 | 영어 표기 출처·소속은 **괄호 안 한국어만** `lang="ko"` | 기존 `langFor`는 한글이 하나라도 있으면 요소 전체를 `lang="ko"`로 만들어 `Instagram @…`까지 한국어로 읽힌다(WCAG 3.1.2). 원본 값(괄호 밖 한글)이면 기존처럼 전체 `lang="ko"`. 한국어 페이지 출력은 불변(단위 검사 + 361/361) |
| 6 | 영어 발언자 소속(`speakerAffiliation`)에도 같은 처리 | 같은 규칙의 필드. 영어 페이지 전용 분기라 한국어 출력 영향 없음(현재 영어본 중 발언자 있는 글 0건 — 단위 검사로만 확인) |
| 7 | 샘플 본문 "(some may be available only in Korean)" | 오더 예시("some in Korean")는 링크가 모두 한국어인 지금도, 일부가 번역된 뒤에도 참이어야 한다 → "may be" 표현. README 권장 예시도 같은 문구 |
| 8 | README §9 플랫폼명 번역 예시(Instagram·Threads·YouTube·Facebook), 공식 영문 표기를 모르는 언론사명은 번역하지 않음 | 추정 표기를 출처 표기에 넣지 않기 위해(필드를 비우면 원본 값) |

## 미해결·이슈
1. **그룹 404의 robots 메타 중복** — `/?page=999` 등 그룹 404 응답에 `noindex`(Next 자동)와 `index, follow`(레이아웃)가 함께 나간다. **HEAD도 같다**(`results/http-404.log`, 수정 전후 동일). 가장 엄격한 값이 적용돼 실제로는 noindex. `not-found.tsx`가 `metadata`를 지원하는지는 확인하지 못했다(**확인 필요**) — 이번 범위에서는 손대지 않음.
2. **그룹 404 서버 HTML 셸** — 그룹 404는 `<html id="__next_error__">` 셸 + RSC 페이로드로 나가고 하이드레이션 후 사이트 404가 그려진다(HEAD와 같은 방식). JS 없이 보면 셸만 보인다. 기존 동작.
3. lint 경고 2건이 `docs/tools/reviewer-10/html-same.mjs`에서 나온다(리뷰어 도구, 리뷰 보고서에는 0으로 기록). 이번 변경과 무관, 손대지 않음.
4. 리뷰 P2-2(`/_next/image` 응답 멈춤) — 범위 밖. 이번 측정 중에는 재현되지 않았다(포커스 전수를 돌리지 않아 판단 근거 없음).
5. 05 핸드오프 미해결 3(`experimental.globalNotFound` 실험 플래그)은 그대로.

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)** — 간이 재확인
  - `npm run build && npx next start -p 3105` → `node docs/tools/programmer-05-1/render-404-checks.mjs http://localhost:3105` (144/144) · `node docs/tools/reviewer-10/render-404.mjs <HEAD> http://localhost:3105`
  - 정적 동일성: 05 상태 빌드(또는 리뷰어 10 스크래치)와 `node docs/tools/reviewer-10/html-same.mjs <수정 전>/.next/server/app .next/server/app` → 차이 2건 내용은 `node docs/tools/programmer-05-1/html-diff-detail.mjs <A> <B> _not-found.html en/post/2026-09-29-nowandhere-defense-minister-nk-responsibility.html`
  - 규칙: `npx tsx --tsconfig docs/tools/programmer-05-1/tsconfig.json docs/tools/programmer-05-1/unit-checks.tsx`
  - 중점: `MixedLangText`의 한국어 불변 · `attribution` 핸들 경고 규칙 · README §9 안내
- **슈퍼바이저 (Opus 5)** — 리뷰어 승인 후 05 + 05-1 + 리뷰어 10 산출물을 함께 커밋. 파일 이동이 있어 `git add -A src/app` 필요(05 핸드오프 참고). 새 영어본을 쓸 때 출처 표기는 README §9대로 `attribution`에 플랫폼명만 영어로.

## 참고 링크
- 오더: `instructions/programmer/processed/05-1-english-pages-fix.md`
- 리뷰: `docs/reviews/programmer-05-english-pages-review.md` · 수정안 초안 `docs/tools/reviewer-10/patch-proposal/`
- 이전 핸드오프: `docs/handoffs/programmer-05-english-pages.md`
