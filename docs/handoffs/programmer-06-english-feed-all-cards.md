# 프로그래머 세션 — 06-english-feed-all-cards 핸드오프
**작성일**: 2026-09-30 13:10 | **작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/06-english-feed-all-cards.md` · **사용자 지시 원문**: "지금 english 버튼 누르면 번역된 카드만 노출되는데, 일단 모든카드 노출하는걸로수정해"

## 요약 (3줄)
1. 영어 피드(`/en`·`/en?page=n`)가 한국어 피드와 **같은 게시물 전체(129)·같은 순서·같은 페이지 크기(12, 11페이지)** 로 나온다. 영어본 있는 글(6)은 영어 카드 → `/en/post/{id}`, 없는 글(123)은 한국어 원본 카드 + `Korean only` 표시 → `/post/{id}`(`lang`·`hrefLang="ko"`, 이미지 alt `lang="ko"`). 상단 확정 문구 안내 한 줄 추가.
2. 리뷰 11 후속 반영 — P2-C 그룹 404 robots 중복 해소(`noindex, follow` 한 가지) · P2-A 영어본 `attribution`·`speakerAffiliation` 비문자열 경고 · P2-B 원본에 없는 `@핸들` 경고.
3. validate 135/135 · typecheck 0 · lint 0 errors · build 정적 **380 → 390**(+10 = 영어 피드 2~11페이지, 한국어 피드 페이지 수와 같아짐) · 한국어·404 HTML **364/364 동일** · RSC 371/372 · 피드 대조 752/752 · static-i18n 3,270/3,270 · en-qa 237/237 + GA 15/15 · 404 렌더 144/144 · 규칙 35+53+25 · 캡처 4장 · 독립 grep 0. 🔴 커밋하지 않음.

## 산출물

### 코드
| 파일 | 내용 |
|---|---|
| `src/lib/content/load.ts` | `getAllEnglishPosts`(영어본만) → **`getEnglishFeedPosts`**(전체, `{ post, translated }`). 영어본 있으면 `localizePost` 결과, 없으면 원본 그대로. 다른 호출처 없음(grep 확인) |
| `src/lib/content/view.ts` | `PostCardView.koreanOnly?: true` · `toCardView(post, locale, translated = true)` — 영어 로캘 + 영어본 없음일 때만 `koreanOnly`, 원문 썸네일 alt도 한국어 문구. 한국어 카드 데이터 키는 그대로(단위 검사) · `englishFeedPostHref`(카드·JSON-LD 공용 링크 규칙) |
| `src/components/post-card.tsx` | `koreanOnly` 카드: href `/post/{id}` + `hrefLang="ko"` + `lang="ko"` · 푸터 오른쪽 `Korean only` 표시 · 이미지에 `altLang="ko"`. GA `view_card`·`select_card`는 영어 피드에서 `language: 'en'` + **`translated: true/false`** |
| `src/components/card-media.tsx` | `altLang` prop → `<Image>`/`<img>`에 `lang`. 플레이스홀더(UI 문구)는 해당 없음 |
| `src/components/feed-view.tsx` | `notice` prop — 설명 아래 안내 한 줄. 안내 없을 때는 설명 슬롯 하나만 두어 한국어 피드 서버 트리(RSC)까지 이전과 같게 유지 |
| `src/lib/i18n.ts` | `koreanOnly`(en `Korean only`) · `koreanOnlyFeedNotice`(en 확정 문구 글자 그대로) — 한국어는 빈 값 |
| `src/lib/seo.ts` | `collectionJsonLd`에 선택 `postHref` — 영어 피드 ItemList의 영어본 없는 글 URL을 `/post/{id}`로. 없으면 기존 동작 |
| `src/app/(en)/en/page.tsx` · `en/page/[page]/page.tsx` | `getEnglishFeedPosts` 사용 · `notice` · JSON-LD `postHref`. `generateStaticParams`가 전체 글 기준 → 2~11페이지 생성. h1·메타·canonical·hreflang 불변 |
| `src/app/(ko)/not-found.tsx` · `(en)/not-found.tsx` | `metadata = { robots: { index: false, follow: true } }` (P2-C, 리뷰어 11 시험안 그대로) |
| `src/lib/content/translation.ts` | P2-A 비문자열 경고(목록·숫자·객체·참/거짓 명시) · P2-B 원본에 없는 핸들 경고(중복 핸들은 한 번만) |
| `src/app/llms.txt/route.ts` | English version 줄 — "영어 피드에는 전체 게시물이 나오며, 영어본이 있는 게시물만 영어로 … 나머지는 "Korean only"로 표시되고 한국어 페이지로 연결" (사실이 바뀌어 갱신) |
| `content/README.md` §9 | 경고 표 2행(핸들 추가·비문자열) · 영어 피드 전체 노출 동작 설명 한 줄 |

`scripts/validate-content.ts`는 고치지 않았다 — `validateTranslation` 공용이라 경고 추가가 그대로 반영된다(파이프라인 실행으로 확인).

### 도구·증거 — `docs/tools/programmer-06/`
| 경로 | 내용 |
|---|---|
| `html-diff.mjs` | HEAD ↔ 작업 HTML 전수 **대칭** 비교(한국어·404 / 영어 분리). `programmer-05/ko-html-diff.mjs`는 "기준에 언어 전환 없음"을 전제한 비대칭 정규화라 05 커밋 이후 HEAD에는 쓸 수 없다(실행 시 헤더 차이 364건 오탐 — 실측) |
| `feed-parity.mjs` | 정적 HTML — 한국어·영어 피드 전 페이지 카드 수·순서·링크·lang·hrefLang·alt·`Korean only`·안내·건수·Load more·JSON-LD 대조. 기대값은 `content/posts-en` 직접 파싱 |
| `rsc-same.mjs` | HTML 속 RSC 페이로드 전수 비교(클라이언트 청크 참조·빌드 ID만 정규화) |
| `unit-checks.tsx` (+ `tsconfig.json`) | 35케이스 — toCardView·englishFeedPostHref·CardMedia 렌더(로컬·원문 썸네일·플레이스홀더)·collectionJsonLd·P2-A/P2-B |
| `en-qa.mjs` | 05 도구 갱신판. `checks`(10경로 × 3폭 + 피드 11페이지 하이드레이션 후 카드 대조 + 카드 실제 클릭 + HTTP) · `ga`(측정 ID 넣은 빌드 — 클릭·노출 이벤트 payload) · `capture` |
| `results/` | validate · typecheck · lint · build · html-diff-head · strict-same-head · rsc-same-head · rsc-children-head · feed-parity · feed-parity-head · static-i18n · text-routes-diff · unit-checks(06·05·05-1) · validate-pipeline-p2ab · en-qa-checks · en-qa-ga · render-404-checks · http-404-matrix · capture (.log, 절대경로 치환) |
| `docs/qa/programmer-06/` 4장 | `en-feed--390/1280`(첫 화면 — 1280은 8장 중 Korean only 5 · 390은 Korean only 1장 + 영어 카드 상단) · `en-feed-page2--390/1280` |

## 검증 숫자 (전부 직접 실행 · 최종 빌드)
기준: HEAD `c99443e`(한국어 129 · 영어본 6)를 스크래치에 `git archive` + `.env.local` + `node_modules` 링크로 빌드(정적 380 · HTML 372).

| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 135건(한국어 129 · 영어본 6) 통과 135 · 실패 0 · **영어본 6건 / 전체 129건** |
| typecheck / lint | 오류 0 / **0 errors** · 3 warnings(기존 리뷰어 도구 `reviewer-04/keyboard-tab.mjs` 1 · `reviewer-10/html-same.mjs` 2, 이번 변경 0) |
| build | 성공 · 정적 **380 → 390**, HTML **372 → 382** — 추가 10개 = `en/page/2~11`. 한국어 피드 `page/2~11`과 같은 수 |
| HTML 전수 (`html-diff.mjs`, HEAD ↔ 작업) | 기준 372 전부 존재 · **한국어·404 364/364 동일** · 영어 7 동일(`en/about`·`en/post` 6) · 다름 1(`en.html`, 의도) · 신규 10 |
| 엄격 비교 (`reviewer-11/strict-same.mjs` L1 — React 텍스트 경계 주석 유지) | **371/372 동일** · 차이 `en.html`뿐 (작업 트리도 스크래치에 같은 조건으로 빌드해 비교 — 저장소 빌드와 스크래치 링크 빌드는 webpack 모듈 번호가 달라 L2 비교 불가, 실측) |
| RSC 페이로드 (`rsc-same.mjs`) | **371/372 동일** · 차이 `en.html`뿐. ※ 첫 구현은 234/372 다름 — `FeedView`의 안내 슬롯이 한국어 트리에 `null` 자식 1개를 더했다(HTML은 동일). 슬롯 구조를 고쳐 해소 |
| `reviewer-11/rsc-children-diff.mjs` | 371 차이 없음 · `en.html`만(건수·페이지 문구) |
| 피드 대조 (`feed-parity.mjs`) | **752/752** · 피드 ko 11 · en 11 페이지 · 카드 129 = 129(영어본 6 · Korean only 123) · 영어 상세 HTML 6 = 영어본 6. HEAD 빌드에 돌리면 31/37(실패 6 — 도구가 옛 동작을 잡는 것 확인) |
| `reviewer-10/static-i18n.mjs` | **3,270/3,270** · HTML 382(ko 363 · en 18 · 404 1) · 양방향 32건 (`/en/page/n` 10개 포함: lang en · canonical `/en?page=n` · hreflang 없음 · 전환 링크 `/`) |
| llms.txt · sitemap · robots | llms.txt English 줄만 변경 · **sitemap 동일**(`/en/post/…`는 영어본 6건 그대로) · robots 동일 |
| `en-qa.mjs checks` (로컬 프로덕션) | **237/237** — 10경로 × 3폭 가로 넘침 0·콘솔 오류 0 · lang·canonical·hreflang·전환 클릭 · 피드 11페이지 하이드레이션 후 카드 129장 대조 · 카드 클릭(영어본 없는 카드 → `/post/…` lang=ko, 영어본 카드 → `/en/post/…` lang=en) · HTTP(`/en/post/{영어본 없는 id}` 404 · `/en?page=11` 200 · `/en?page=12` 404 · 404 robots에 `index, follow` 없음) |
| `en-qa.mjs ga` (측정 ID `G-TEST000000` 넣은 스크래치 빌드, 소스 동일 확인) | **15/15** — `/en` Korean only 카드 클릭 `{post_id, position, language:'en', translated:false}` · 영어본 카드 `translated:true` · 한국어 피드 `{post_id, position}`(기존 그대로) · `view_card` `/en` 12건 true·false 둘 다 관측, `/` 12건 language·translated 없음 |
| 404 렌더 (`programmer-05-1/render-404-checks.mjs`) | **144/144** |
| HTTP 404 매트릭스 (`reviewer-11/http-404-matrix.mjs`, HEAD ↔ 작업) | 상태 22/24 일치 · 차이 2 = `/en?page=2`·`/en/page/2` 404 → 200(의도) · 그룹 404 5경로 robots `noindex + index, follow` → **`noindex + noindex, follow`**(P2-C) |
| 규칙 | 06 **35/35** · 05 **53/53** · 05-1 **25/25** |
| P2-A/B 파이프라인 (스크래치 사본에서 샘플 영어본 attribution만 바꿔 `validate-content`) | `123` → "숫자" 경고 · `[…]` → "목록" 경고 · 핸들 추가 → "@extra_handle" 경고. 셋 다 검증 통과(경고만) |
| 독립 grep (pre-commit 패턴 + 홈 계정명) | 변경·신규 45개 파일(PNG 4장 strings 포함) **0건** · 로그 절대경로 치환 후 재확인 0 |

## 주요 결정사항 (자체 판단 + 근거)
| # | 결정 | 근거 |
|---|---|---|
| 1 | `Korean only` 표시는 카드 푸터(날짜·유형 줄) 오른쪽, 테두리 작은 배지 | 오더 "작은 표시". 제목·이미지(카드 = 제목 + 이미지 원칙)를 가리지 않고, 날짜 줄은 이미 메타 정보 자리. 링크 밖 텍스트라 탭 정지점 수 불변 |
| 2 | GA에 `translated: true/false` 추가(영어 피드만) | 같은 영어 피드 안에서 번역 카드·한국어 카드 CTR을 나눠 볼 수 있어 번역 우선순위 판단 근거가 된다. 한국어 payload 불변(실측) |
| 3 | 영어본 없는 글의 원문 썸네일 alt는 한국어 문구(`… — 원문 미리보기 이미지`) | 오더 "alt는 한국어 원본 값 그대로". 원문 썸네일 alt는 제목으로 만든 값이라 제목과 같은 언어로 둔다(현재 해당 카드 0건 — 단위 검사로만 확인) |
| 4 | 플레이스홀더("No image")는 영어 UI 문구 · `lang` 없음 | 게시물 내용이 아닌 UI 문구 → 페이지 언어(현재 해당 카드 0건 — 단위 검사) |
| 5 | 목록 JSON-LD ItemList의 영어본 없는 항목 URL = `/post/{id}`, 이름 = 한국어 제목 | 카드 링크와 구조화 데이터가 어긋나면 존재하지 않는 `/en/post/…`(404)를 가리키게 된다. 카드와 같은 함수(`englishFeedPostHref`)로 만든다 |
| 6 | `FeedView` 안내 슬롯을 "안내 있을 때만 Fragment" 구조로 | HTML만 같고 RSC가 234페이지 달라지는 것을 발견 — 한국어 출력 불변 원칙을 페이로드까지 지킴 |
| 7 | llms.txt 안내 문구 갱신 | "영어본이 있는 게시물만 영어로 제공"은 여전히 참이지만 영어 피드 구성이 바뀌었으므로 AI 인용용 설명에 반영. 한국어 HTML 아님(텍스트 라우트) |
| 8 | P2-A는 `null`(빈 값)은 경고하지 않음 | YAML에서 `attribution:`처럼 비워 두면 null — "비우면 원본 값"(README) 의도와 같다 |
| 9 | 새 비교 도구 `html-diff.mjs`(대칭) 추가, 05 도구는 수정하지 않음 | 05 도구는 05 시점 비교 전용(기록 보존). 오더의 "ko-html-diff" 요구는 같은 정규화 규칙을 대칭으로 적용한 06 도구로 수행 |

## 미해결·이슈
1. **`/_next/image` 응답 멈춤 재현(리뷰 10 P2-2와 같은 현상)** — 첫 en-qa 실행 중 작업 서버에서 `thumb.jpg&w=640` 요청이 브라우저·`curl`(Accept webp/avif) 모두 20초 넘게 응답 없음, 3/3 재현. 같은 시각 HEAD 서버는 정상. **서버 재시작 후 사라졌고** 이후 전 측정에서 재현 안 됨. 이미지 경로·마크업은 HEAD와 동일(HTML 364/364)이라 이번 변경과의 관련 근거 없음 — 원인은 **확인 필요**(최적화 중 끊긴 요청이 남긴 서버 상태로 보이나 검증 안 함). 테스터 단계 배포 도메인 확인 권고 유지.
2. 현재 콘텐츠의 카드 이미지는 전부 저장소 이미지(129/129) — 영어본 없는 카드의 **원문 썸네일·플레이스홀더 분기는 실데이터 0건**, 단위 검사(렌더)로만 확인.
3. 로컬 `.env.local`의 GA 측정 ID가 비어 있어 `checks`는 GA payload를 건너뛴다(SKIP 표시). payload는 스크래치 더미 ID 빌드에서 `ga` 모드로 확인 — `.env.local`은 건드리지 않음.
4. 390px 첫 화면에는 카드가 1장 반만 보여 "섞인 상태"가 Korean only 1장 + 영어 카드 상단이다(1280은 8장 중 5장 Korean only). 추가 캡처가 필요하면 스크롤 캡처로 보완 가능.
5. 영어 피드 페이지가 11개로 늘었다 — `robots.txt`의 `Disallow: /en/page/`와 canonical `/en?page=n`은 그대로(한국어 피드와 같은 방식).
6. 기존 이월: `experimental.globalNotFound`(05) · lint 경고 3건(기존 리뷰어 도구).

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)** — 코드 리뷰 + 재실측
  - 기준: HEAD 스크래치 빌드(`git archive HEAD` + `.env.local` + `node_modules` 링크). 엄격·RSC 비교는 작업 트리도 **같은 방식으로 스크래치에 빌드**해야 한다(모듈 번호가 경로에 따라 다름)
  - `node docs/tools/programmer-06/html-diff.mjs <HEAD app> .next/server/app` (한국어·404 364/364)
  - `node docs/tools/programmer-06/rsc-same.mjs <HEAD app> <작업 스크래치 app>` · `node docs/tools/reviewer-11/strict-same.mjs <HEAD app> <작업 스크래치 app>` (371/372)
  - `node docs/tools/programmer-06/feed-parity.mjs .next/server/app http://localhost:3000` (752/752) · `node docs/tools/reviewer-10/static-i18n.mjs .next/server/app http://localhost:3000` (3,270/3,270)
  - `npx next start -p 3106` → `node docs/tools/programmer-06/en-qa.mjs http://localhost:3106 checks` (237/237). GA는 `.env.local`에 측정 ID를 넣은 **스크래치 사본** 빌드에 `… ga` (15/15)
  - `npx tsx --tsconfig docs/tools/programmer-06/tsconfig.json docs/tools/programmer-06/unit-checks.tsx` (35/35)
  - 중점: `koreanOnly` 카드 접근성(링크 lang·hrefLang, alt lang, 배지 위치) · JSON-LD URL 규칙 · 한국어 출력 불변(HTML·RSC) · P2-A/B 경고 문구
- **슈퍼바이저 (Opus 5)** — 리뷰어 승인 후 커밋. 대상: 위 코드 14개 파일 + `docs/tools/programmer-06/` + `docs/qa/programmer-06/` + 핸드오프·트리거·history + 오더 이동(`git add -A instructions`)

## 참고 링크
- 오더: `instructions/programmer/processed/06-english-feed-all-cards.md`
- 선행: `docs/handoffs/programmer-05-english-pages.md` · `docs/handoffs/programmer-05-1-english-pages-fix.md` · `docs/reviews/programmer-05-1-english-pages-fix-review.md`
