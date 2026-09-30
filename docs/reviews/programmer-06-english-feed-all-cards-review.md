# 리뷰 보고서 — 프로그래머 06 · 영어 피드 전체 카드 노출 + 리뷰 11 후속(P2-A·B·C)

**작성일**: 2026-09-30 13:55 | **작성 세션**: 리뷰어 (Opus 5.5)
**md오더**: `instructions/reviewer/processed/12-programmer-06-english-feed-all-cards.md`
**검토 대상**: 미커밋 작업 트리 — 코드 14개 파일(`src` 13 + `content/README.md`) · `docs/tools/programmer-06/` · `docs/qa/programmer-06/` · 핸드오프·트리거·오더 이동
**선행 검토**: CLAUDE.md · 프로그래머 06 오더(processed) · 핸드오프 · 트리거 · 리뷰 10 · 리뷰 11 · 캡처 4장
**코드 수정**: 0건 · 커밋 0건. 리뷰 시작 시점에 떠 둔 작업 트리 사본과 끝난 뒤의 `src`·`content`가 `diff -rq` 기준으로 같다.

> **측정 기준**: HEAD는 `bbb5890`이다. 핸드오프 기준 `c99443e`과 비교하면 차이는 리뷰어 오더 md 1개뿐이고(`git diff --stat`), 콘텐츠(한국어 129 · 영어본 6)는 같다.
> 스크래치에 트리 세 개를 떠서 같은 방식(`.env.local` 복사 + `node_modules` 링크)으로 빌드했다.
> - **HEAD**: `git archive HEAD`
> - **작업**: 작업 트리 rsync. `src`·`content` `diff -rq` 차이 0, `content/posts`·`posts-en`·`public`은 HEAD와 같음
> - **GA**: 작업 사본에서 `.env.local`의 측정 ID만 `G-TEST000000`으로 바꾼 것(`src` 동일 확인)
>
> 엄격 비교와 RSC 비교는 두 스크래치 빌드끼리 했다. 모듈 번호가 경로마다 달라서 저장소 빌드와는 비교할 수 없다는 핸드오프 주의사항을 따랐다.

---

## 판정: ✅ 승인 — 커밋 가능

영어 피드가 한국어 피드와 같은 129건을 같은 순서, 같은 페이지 크기(12개씩 11페이지)로 보여 준다.
- 영어본 있는 6건은 영어 카드이고 `/en/post/…`로 간다.
- 영어본 없는 123건은 한국어 원본 카드다. `Korean only` 표시가 붙고 `/post/…`로 간다. 링크에 `lang="ko"`·`hrefLang="ko"`, 이미지에 `lang="ko"`가 달린다.

한국어·404 출력은 HEAD와 전수 비교해서 달라진 게 없다. 비교 범위는 HTML 364/364, 주석까지 남긴 엄격 비교 L1, RSC 페이로드, JSON-LD 1,073블록, `<head>`다.
리뷰 11 후속 P2-A·B·C는 모두 반영됐다. 확정 문구는 한 글자도 다르지 않다.
확정 결함은 없다. 커밋을 막지 않는 P2 3건만 적는다.
핸드오프 미해결 1(`/_next/image` 멈춤)은 이번에 **재현했다**. HEAD에서도 똑같이 재현되므로 이번 변경과는 관계없다(§4).

---

## 1. 확정 결함
**없음.**

## 2. 재실측 숫자 (리뷰어 직접 실행 · 로그 `docs/tools/reviewer-12/results/`)

### 2-1. 게이트
| 항목 | 결과 | 핸드오프 |
|---|---|---|
| `npm run validate:content` (저장소) | 135건(한국어 129 · 영어본 6) 통과 135 · 실패 0 · **영어본 6건 / 전체 129건** · 경고 0 | 일치 |
| typecheck (저장소) | 오류 0 | 일치 |
| lint (저장소) | **0 errors** · 3 warnings(`reviewer-04/keyboard-tab.mjs` 1 · `reviewer-10/html-same.mjs` 2, 기존 리뷰어 도구). 신규 `reviewer-12` 도구 lint 0 | 일치 |
| build | HEAD 정적 **380** · HTML **372** → 작업 정적 **390** · HTML **382**. 늘어난 10개 = `en/page/2~11.html`. 한국어 `page/2~11`과 같은 수 | 일치 |

### 2-2. 한국어 출력 불변 (HEAD ↔ 작업 스크래치 빌드, 전수)
| 도구 | 결과 |
|---|---|
| `programmer-06/html-diff.mjs` | 기준 372개가 작업 쪽에 전부 있음 · **한국어·404 364/364 동일** · 영어 7 동일 · 다름 1(`en.html`, 의도한 변경) · 신규 10(`en/page/2~11`) |
| `reviewer-11/strict-same.mjs` L1(React 텍스트 경계 주석 유지) | **371/372 동일** · 차이는 `en.html`뿐 |
| `programmer-06/rsc-same.mjs`(청크 참조 정규화) | **371/372 동일** · 차이는 `en.html`뿐. ※ strict-same L2(정규화 없음)는 138/372다. 클라이언트 청크 번호가 바뀐 탓이고, 아래 행으로 내용 차이가 아님을 확인했다 |
| `reviewer-11/rsc-children-diff.mjs` | 371개 "차이 없음" · `en.html`만 차이(건수·페이지 문구) |
| 🆕 `reviewer-12/jsonld-head-same.mjs`(대칭 비교) | 한국어·404 **JSON-LD 364/364**(블록 1,073개) · **`<head>` 364/364** · 영어 차이는 `en.html` JSON-LD뿐(ItemList) |

`html-diff`는 `<script>`를 지우고 비교하므로 JSON-LD가 빠진다. `reviewer-10/jsonld-diff.mjs`는 05 이전 HEAD를 전제로 만든 도구라 지금은 오탐을 낸다(실행해 확인). 그래서 대칭 비교 도구를 따로 만들어 이 빈틈을 채웠다.

### 2-3. 영어 피드 대조
| 도구 | 결과 · 커버리지 |
|---|---|
| `programmer-06/feed-parity.mjs` 작업 | **752/752**. 피드 ko 11 · en 11페이지 · 카드 129 = 129(영어본 6 · Korean only 123) · 영어 상세 HTML 6 = 영어본 6. **검사 수 산식**: 페이지 11 × 10 + 전역 3 + 영어 카드 6 × 4 + Korean only 123 × 5 = **752** (전체 규모와 일치) |
| 같은 도구, HEAD | 31/37 · 실패 6(페이지 수·카드 수·순서·안내·건수·Load more) — 도구가 옛 동작을 실제로 잡는다 |
| 🆕 리뷰어 교차 집계(다른 방식 — 정규식 카운트) | 영어 피드 11파일: `Korean only` 배지 **123** · `/post/` 카드 링크 123 전부 `lang="ko"`+`hrefLang="ko"` · `img lang="ko"` **123** · `/en/post/` 링크 **6** · 안내 문구 **11**(페이지당 1) · 한국어·404 HTML 364개 중 "Korean only" 포함 **0** |
| `reviewer-10/static-i18n.mjs` | **3,270/3,270** · HTML 382(ko 363 · en 18 · 404 1) · 양방향 32건 |
| sitemap · robots · llms.txt (HEAD ↔ 작업 서버) | **sitemap 동일**(`<loc>` 356, `/en/post/` 6) · robots 동일(`Disallow: /en/page/` 유지) · llms.txt는 English 줄 하나만 바뀜(사실 반영) |

### 2-4. 브라우저·HTTP (로컬 프로덕션 서버)
| 도구 | 결과 |
|---|---|
| `programmer-06/en-qa.mjs checks` | **237/237** · 콘솔 오류 0 · 가로 넘침 0 · GA payload는 SKIP 표시(측정 ID 없는 빌드 — 아래 `ga`에서 확인) |
| `programmer-06/en-qa.mjs ga`(측정 ID 넣은 빌드, 번들에 `G-TEST000000` 들어간 것 확인) | **15/15**. `/en` Korean only 카드 클릭 → `{post_id, position:1, language:'en', translated:false}`, 도착 `/post/…`(lang=ko). 영어 카드 → `translated:true`, 도착 `/en/post/…`(lang=en). 한국어 피드 → `{post_id, position}`(바뀌지 않음). `view_card` `/en`에서 true·false 둘 다 관측, `/` payload 이상 0 |
| `programmer-05-1/render-404-checks.mjs` | **144/144** |
| `reviewer-11/http-404-matrix.mjs` HEAD ↔ 작업 | 상태 **22/24** 일치 · 차이 2 = `/en?page=2`·`/en/page/2` 404 → 200(의도한 변경). 그룹 404 경로(`/?page=12`·`/?page=999`·`/tag/dmz?page=99`·`/tag/25사단?page=3`·`/tag/no-such-tag?page=2`·`/en?page=99`)의 robots가 `noindex + index, follow` → **`noindex + noindex, follow`**(P2-C) |
| 리뷰어 추가 HTTP | `/en?page=11` 200 · `/en?page=12` 404(`noindex` 둘). `/en/page/2`를 직접 열면 200에 canonical `/en?page=2`, `/page/2`(한국어)도 200에 canonical `/?page=2` → **한국어와 같은 방식** |
| 🆕 `reviewer-12/a11y-cards.mjs` — 접근성 트리 전수(390px, 하이드레이션 후 `getFullAXTree`) | **650/650**. 영어 피드 11페이지 · 카드 129(Korean only 123 · 영어 6). 산식: 11 + 129 × 3 + 6 × 1 + 123 × 2 = 650. 확인 항목: 링크 접근성 이름 = 제목 · 읽기 순서 이미지 → 링크 · 카드당 탭 정지점 1 · 배지는 링크 밖에 있고 AX 순서상 마지막 |

### 2-5. 단위·경고 규칙
| 도구 | 결과 |
|---|---|
| `programmer-06/unit-checks.tsx` | **35/35** |
| `programmer-05/unit-checks.ts` · `programmer-05-1/unit-checks.tsx` | **53/53** · **25/25** |
| 🆕 `reviewer-12/attribution-edge.tsx` — 실데이터 전수 | 한국어 게시물 **129/129**(모두 핸들 포함)의 원본 attribution을 그대로 영어 표기로 넣었을 때 핸들 경고(누락·추가) **0건** → P2-B가 실제 표기에서는 오탐하지 않는다 |
| 같은 도구 — 모서리 관찰 | Date 값 → "날짜" 경고 · 빈 문자열 → 경고 없음(원본 폴백, 의도대로) · 발언자 없는 원본에 `speakerAffiliation: 1` → 경고 · **핸들 뒤 마침표·이메일 주소 → 잘못된 경고**(P2-2) |

### 2-6. 저장소 독립 grep
pre-commit 훅 패턴 + 홈 계정명으로 검사했다. `git diff HEAD` 추가줄 **0** · 변경·신규 파일 **55개**(PNG 4장은 strings, 리뷰어 12 도구 포함) **0**. 리뷰어 로그는 스크래치 절대경로와 홈 경로를 치환해 저장했고, 치환 후 잔존 **0**. 보고서·트리거·history 작성 후 다시 검사했다(§7).

## 3. 코드 리뷰 소견 (오더 §2 중점)

| 중점 | 소견 |
|---|---|
| **Korean only 카드 접근성** | 링크(`h3 > a`)에 `lang="ko"`·`hrefLang="ko"`가 있고 `href="/post/{id}"`다. 링크 텍스트가 한국어 제목이라 WCAG 3.1.2(부분 언어)를 충족한다. 이미지 `<img lang="ko">`는 Next `<Image>`가 `lang`을 그대로 넘기는 것을 HTML로 확인했다(123/123). 플레이스홀더("No image")는 UI 문구라서 `lang`을 두지 않았는데, 이 판단이 맞다(실데이터 0건 — 단위 검사로만 확인됨) |
| 배지 위치·명도 대비 | 카드 푸터 오른쪽(`ml-auto`)에 있고 링크 밖이라 탭 정지점이 늘지 않는다(AX 전수). 글자 `#52525b`의 대비는 배경 `#ffffff`에서 **7.73:1**, 호버 배경 `#fafafa`에서 **7.41:1**로 AA를 충족한다(계산). 테두리 `#e4e4e7`은 1.27:1이지만 뜻은 글자가 전하는 장식용 테두리이고 조작 요소가 아니라 1.4.11 대상이 아니다. 320·390·1280에서 가로 넘침 0(en-qa). 캡처 4장을 직접 확인했다 — 제목·이미지를 가리지 않는다 |
| 스크린리더 읽기 순서 | 이미지 alt(ko) → 링크 "제목"(ko) → 날짜 → 유형("Link") → "Korean only". 배지는 카드 끝에서 읽히지만 **링크 이름에는 들어가지 않는다** → P2-1 |
| JSON-LD ItemList URL | `englishFeedPostHref`를 카드와 같은 규칙으로 만들어 쓴다. 영어본 없는 글은 `/post/{id}` + 한국어 제목, 영어본은 `/en/post/{id}`다. feed-parity가 11페이지 전부에서 ItemList url·name이 카드 href·제목과 같음을 확인했다. 한국어 피드 ItemList는 바뀌지 않았다(`postHref` 기본값이 기존 동작이고 JSON-LD 364/364) |
| 한국어 출력 불변 | `FeedView`는 안내가 없을 때 설명 슬롯 하나만 둬서 RSC 트리를 보존한다. 결정 6이 실제로 효과가 있음을 확인했다(RSC 371/372). `toCardView`는 `locale==='en' && !translated`일 때만 `koreanOnly` 키를 넣는다 → 한국어 카드 props 불변. `ko` 사전의 두 키는 빈 값이고 한국어 경로에서는 렌더되지 않는다(0/364) |
| `getEnglishFeedPosts` | 옛 `getAllEnglishPosts` 호출처가 남아 있지 않다(`src`·`scripts` grep 0). `generateStaticParams`·`paginate`가 같은 목록을 써서 페이지 수와 404 경계(`/en?page=12`)가 한국어 피드와 같다 |
| **P2-A** | `attribution`·`speakerAffiliation`이 `undefined`·`null`이 아니면서 문자열도 아니면 경고한다. 문구는 "…: 문자열이 아니라 무시됩니다(받은 값: 목록/숫자/객체/참·거짓/날짜) — 따옴표로 감싼 한 줄 문자열로 적으세요. 지금은 한국어 원본 값이 나갑니다." 원인·조치·현재 동작이 한 줄에 다 있다. `null`을 경고하지 않는 결정 8은 README의 "비우면 원본 값"과 맞는다 |
| **P2-B** | 원본에 없는 핸들은 `Set`으로 중복을 없앤 뒤 한 번만 지목한다. 핸들 누락 경고와 대칭이다. README §9 표 2행과 문구도 맞다 |
| **P2-C** | 두 그룹 `not-found.tsx`에 `metadata = { robots: { index: false, follow: true } }`가 들어갔고, 리뷰어 11 시험안과 같다. 결과 `noindex`(Next 자동) + `noindex, follow`(메타데이터)로 **서로 모순되던 지시가 없어졌다**. 전역 404와 같은 형태다. 메타 태그가 두 개 나가는 것은 Next 자동 삽입 때문이고 둘 다 noindex라 문제없다. 200 경로(`/`·`/en`·`/?page=2`)는 `index, follow` 그대로다 |
| **확정 문구** | `i18n.ts`의 `Posts marked "Korean only" have not been translated yet and open in Korean.`가 오더와 **바이트 단위로 같다**(따옴표는 ASCII `"`). 렌더된 HTML은 `&quot;` 이스케이프(feed-parity가 이스케이프 형태 그대로 11페이지에서 1회씩 대조). 캡처에서도 같은 글자로 보인다 |
| llms.txt | 영어 피드 구성이 바뀐 사실을 반영했다. HTML에는 영향이 없다 |
| 문서(README §9) | 경고 표 2행 추가 · 영어 피드 동작 설명 한 줄. 코드와 일치한다 |

## 4. 핸드오프 미해결 판단
| # | 판단 |
|---|---|
| **1. `/_next/image` 멈춤** | **재현함 — 이번 변경과 무관(HEAD도 같다). 커밋을 막지 않는다. 테스터 배포 도메인 확인 권고를 유지한다.** 실측(`results/image-hang-repro.log`): 캐시를 비운 서버에 피드 전체 이미지 URL 1,290개(129장 × 폭 10)를 동시에 요청하고 **400ms 뒤 모두 끊으면**, 다시 요청했을 때 HEAD **1,097/1,290**, 작업 **896/1,290**이 3초 안에 응답하지 않는다. 폭 10종에 고르게 나타나고, 몇 분 뒤에도 그대로이며, **서버를 재시작하면(캐시 유지) 1,290/1,290 정상**이다. 끊지 않으면 두 서버 모두 1,290 × 2회 멈춤 0이고, 30ms 만에 끊으면 멈춤 0이다. 결론: 로컬 `next start`에서 **최적화 중에 클라이언트가 끊은 이미지 요청은 그 키를 재시작 전까지 멈춘 상태로 남긴다.** 브라우저가 페이지를 빨리 넘기는 QA 도구에서 간헐적으로 나오던 현상(리뷰 10 P2-2, 핸드오프 첫 en-qa 실행)과 조건이 들어맞는다. Next 내부 원인(진행 중 요청 공유 등)은 소스로 확인하지 않았다 — **확인 필요**. Vercel은 이미지 최적화를 플랫폼이 처리하므로 같은 현상이 나는지는 로컬로 판단할 수 없다 → **테스터(Sonnet 5)가 배포 도메인에서 피드를 빠르게 넘기며 이미지 로딩을 확인할 것을 권고한다.** QA 도구 작성 팁: 이미지 요청을 막거나, 측정 전에 서버를 재시작 |
| 2. 원문 썸네일·플레이스홀더 분기 실데이터 0 | 사실이다(카드 이미지 129/129가 저장소 이미지이고 `img lang="ko"` 123). 단위 검사(렌더)로 확인됐다. 동의한다 |
| 3. `.env.local` GA ID 비어 있음 | 사실이다. GA 사본 빌드로 15/15를 재현했다 |
| 4. 390px 첫 화면 | 캡처를 직접 확인했다 — Korean only 1장 + 다음 카드 상단. 1280은 8장 중 5장이 Korean only다. 추가 캡처는 필요 없다(AX·HTML 전수가 뒷받침) |
| 5. 영어 피드 11페이지 · robots `Disallow: /en/page/` | 한국어 피드와 같은 방식이다(§2-4 리뷰어 추가 HTTP). 동의한다 |
| 6. 기존 이월(`globalNotFound` · lint 경고 3) | 유지 |

## 5. 지적사항 (P2 — 커밋을 막지 않음)
| # | 내용 | 근거 · 제안 |
|---|---|---|
| P2-1 | `Korean only`가 **링크 접근성 이름에 포함되지 않는다.** 스크린리더 사용자가 카드를 끝까지 읽으면 들을 수 있지만, 링크 목록이나 링크 단위로 이동하면 "한국어 페이지로 간다"는 정보는 링크 `lang="ko"`로 음성이 바뀌는 것밖에 없다(`hrefLang`은 AX 이름·설명에 나타나지 않음 — AX 트리 실측). 같은 카드 안에 표시가 있으니 WCAG 2.4.4(맥락 속 링크 목적)는 충족한다. 개선안: 배지에 `id`를 주고 링크에 `aria-describedby`로 연결하는 1줄 수정. 배지 문구는 영어이므로 `lang="ko"` 링크 안에 넣지 말고 설명으로 연결할 것 | `results/a11y.log`(읽기 순서 예) |
| P2-2 | 핸들 정규식(`@[A-Za-z0-9._]+`)이 **끝 마침표**(`@2.pro.official.`)나 **이메일 주소**(`editor@example.com` → `@example.com`)까지 핸들로 잡는다. 그러면 누락+추가 경고가 둘 다 뜬다. 경고만 나올 뿐이고 실데이터 129건은 오탐 0이다. 문장부호가 붙을 일이 생기면 끝의 `.` 제외, 앞 글자가 영숫자면 제외하는 규칙을 검토할 것 | `results/attribution-edge.log` |
| P2-3 | `/_next/image` 멈춤(§4-1) — 로컬 전용일 수도 있는 Next 동작이다. 배포 도메인 확인이 필요하다 | `results/image-hang-repro.log` · `img-*.log` |

## 6. 커밋 대상 파일 목록 (슈퍼바이저 커밋용)
`git status`를 전수 대조했다. 의도하지 않은 파일(`.env*`·`.next`·`tsconfig.tsbuildinfo` 등)은 **없다**.
- **코드 14**: `content/README.md` · `src/app/(en)/en/page.tsx` · `src/app/(en)/en/page/[page]/page.tsx` · `src/app/(en)/not-found.tsx` · `src/app/(ko)/not-found.tsx` · `src/app/llms.txt/route.ts` · `src/components/{card-media,feed-view,post-card}.tsx` · `src/lib/content/{load,translation,view}.ts` · `src/lib/{i18n,seo}.ts`
- **프로그래머 06 문서·도구**: `docs/handoffs/programmer-06-english-feed-all-cards.md` · `docs/triggers/programmer-06-english-feed-all-cards-COMPLETE.md` · `docs/tools/programmer-06/`(27개 파일) · `docs/qa/programmer-06/`(PNG 4장)
- **리뷰어 12**: 본 보고서 · `docs/triggers/reviewer-12-programmer-06-english-feed-all-cards-COMPLETE.md` · `docs/tools/reviewer-12/`
- **오더 이동**: `instructions/programmer/06-…` → `processed/` · `instructions/reviewer/12-…` → `processed/`. 삭제 + 신규로 보이므로 `git add -A instructions`
- `history/2026-09-30.md`

## 7. 측정 도구 — `docs/tools/reviewer-12/`
| 경로 | 내용 |
|---|---|
| `jsonld-head-same.mjs` | 두 빌드 HTML 전수 — JSON-LD 블록·`<head>`를 대칭 비교(한국어 차이 시 종료 1) |
| `a11y-cards.mjs` | 영어 피드 전 페이지 카드 접근성 트리 — 링크 이름·읽기 순서·탭 정지점·lang/hreflang·배지 위치 |
| `attribution-edge.tsx` (+ `tsconfig.json`) | P2-A·B 실데이터 전수 오탐 검사 + 모서리 관찰 |
| `image-stress.mjs` · `image-abort.mjs` · `image-probe.mjs` | `/_next/image` 멈춤 재현(전체 URL 요청 · n ms 뒤 끊기 · 제한 시간 재요청) |
| `results/` | 게이트(validate·typecheck·lint·build 3종) · html-diff · strict-same · rsc-same · rsc-children · jsonld-head-same · feed-parity(작업·HEAD) · static-i18n · unit 3종 · http404 · render404 · enqa · enqa-ga · a11y · attribution-edge · image-* · `image-urls.txt` |

재현: 위 머리말대로 스크래치 트리를 만들어 빌드한 뒤 `npx next start -p 3201`(HEAD) · `-p 3203`(작업) · `-p 3204`(GA)로 띄운다. 핸드오프 §다음 세션 가이드 명령에 더해 `node docs/tools/reviewer-12/jsonld-head-same.mjs <HEAD app> <작업 app>` · `node docs/tools/reviewer-12/a11y-cards.mjs http://localhost:3203` · `npx tsx --tsconfig docs/tools/reviewer-12/tsconfig.json docs/tools/reviewer-12/attribution-edge.tsx`. 이미지 멈춤 절차는 `results/image-hang-repro.log` 머리말에 있다.

## 8. 다음 단계
1. **슈퍼바이저 (Opus 5)** → §6 목록 커밋 → 푸시·배포 → 배포 도메인에서 `/en`·`/en?page=11` 반영 확인 `curl` 1~2회.
2. **테스터 (Sonnet 5)** — 권고: 배포 도메인에서 영어·한국어 피드를 빠르게 넘기며 이미지 로딩 확인(P2-3). 가능하면 `/en`에서 스크린리더(VoiceOver)로 Korean only 카드를 들어 볼 것(P2-1 판단 자료).
3. **후속(선택, 소규모)** — 프로그래머: P2-1(`aria-describedby` 1줄) · P2-2(핸들 정규식 경계). 다음 프로그래머 오더에 묶어도 된다.
