# 프로그래머 세션 — 05-english-pages 핸드오프
**작성일**: 2026-09-29 18:45 | **작성 세션**: 프로그래머 (Opus 5)
**md오더**: `instructions/programmer/processed/05-english-pages.md`

## 요약 (3줄)
1. 게시물 영어본을 같은 사이트 `/en` 경로로 제공하는 구조를 만들었다 — `/en`(피드, `/en?page=n`)·`/en/post/[id]`·`/en/about`, 영어본은 `content/posts-en/{id}.md`(번역 필드만, 나머지는 한국어 원본 상속). 샘플 1건 작성.
2. `/en/**`은 `<html lang="en">` — 라우트 그룹별 루트 레이아웃 `(ko)`·`(en)` + `experimental.globalNotFound`. 한국어 URL은 그대로이고, 한국어 HTML **350/350**이 의도된 추가분(헤더 언어 전환·hreflang·Read in English·404 robots) 외 **차이 0**(HEAD 빌드와 전수 비교).
3. validate 124/124(영어본 1건 / 전체 123건) · typecheck 0 · lint 0 errors · build 정적 357→**361**(+4, 한국어 감소 0) · 브라우저 검사 128/128 · 규칙 케이스 53/53 · 캡처 8장 · 독립 grep 0. 🔴 커밋하지 않음.

## 산출물

### 코드 — 이동(내용은 PageFrame 감싸기·hreflang 외 동일)
| 파일 | 내용 |
|---|---|
| `src/app/layout.tsx` → `src/app/(ko)/layout.tsx` | 한국어 루트 레이아웃(`<html lang="ko">`). 메타데이터는 `rootMetadata('ko')`(값 동일). 헤더·main·푸터는 각 페이지의 `PageFrame`으로 이동 |
| `src/app/{page,page/[page],post/[id],about,tag/[slug],tag/[slug]/page/[page]}` → `src/app/(ko)/…` | `PageFrame locale="ko"`로 감쌈. 홈·about에 hreflang, 상세는 `PostDetail` 사용 + 영어본 있을 때만 hreflang·Read in English |
| `src/app/not-found.tsx` → 삭제, `src/app/global-not-found.tsx` 신규 | 루트 레이아웃이 둘이라 기존 not-found가 동작하지 않음(실측: Next 기본 404, `<html>`에 lang 없음) → 전역 404가 `<html lang="ko">`부터 그림. 기존 문구 + 영어 안내 한 줄(`lang="en"`) |

### 코드 — 신규
| 파일 | 내용 |
|---|---|
| `src/app/(en)/layout.tsx` | 영어 루트 레이아웃 `<html lang="en">`, 배너·배너 여백 없음 |
| `src/app/(en)/en/page.tsx` · `page/[page]/page.tsx` | 영어 피드(영어본 있는 글만, 한국어와 같은 그리드·12개). 공개 URL `/en?page=n` → 미들웨어가 `/en/page/n`으로 rewrite(한국어와 같은 방식) |
| `src/app/(en)/en/post/[id]/page.tsx` | 영어 상세. `generateStaticParams`=영어본 id만, `dynamicParams=false` → 영어본 없는 id 404 |
| `src/app/(en)/en/about/page.tsx` | 영어 소개(§5 확정 문구 + 정정·삭제 안내, 같은 채널) |
| `src/app/(en)/en/opengraph-image.tsx` | 한국어와 같은 자체 OG 이미지, alt만 영어 |
| `src/lib/i18n.ts` | `ko`/`en` UI 문구 사전, `formatDate`(영어 `Sep 29, 2026`), 경로 헬퍼, `hasHangul`·`langFor` |
| `src/lib/content/translation.ts` | 영어본 스키마 `validateTranslation`(검증 스크립트·로더 공용) + `localizePost`(원본+영어본 병합) |
| `src/lib/site-metadata.ts` | 루트 메타데이터 빌더(한국어 값은 기존과 동일) |
| `src/components/page-frame.tsx` | 헤더+main+푸터. 페이지가 자기 짝 경로를 넘겨 언어 전환 링크를 서버에서 완성 |
| `src/components/post-detail.tsx` | 상세 본문 공용(한국어 출력은 기존과 동일 — 전수 비교로 확인) |
| `src/components/english-site-heading.tsx` | 영어 피드 h1(한국어 부분 `lang="ko"`) |
| `content/posts-en/2026-09-29-nowandhere-defense-minister-nk-responsibility.md` | 샘플 영어본 1건(원본 범위 안 번역, 인명 로마자+괄호 한글 병기) |

### 코드 — 수정
| 파일 | 내용 |
|---|---|
| `src/lib/config.ts` | `SITE_EN`(§5 확정 문구) · `FLOATING_BANNER.showOnEnglish: false` |
| `src/lib/floating-banner.ts` | `FLOATING_BANNER_GUTTER` 상수 → `floatingBannerGutter(locale)`·`isFloatingBannerShown(locale)` (한국어 값 동일) |
| `src/lib/content/load.ts` | `getAllTranslations`(잘못된 영어본 있으면 빌드 중단)·`hasTranslation`·`getAllEnglishPosts`·`getEnglishPostById` |
| `src/lib/content/markdown.ts` | `renderEnglishMarkdown` — 본문 `/post/{id}` → 영어본 있으면 `/en/post/{id}`(쿼리·해시 보존), 새 창 안내 영어. 한국어 렌더 결과 동일 |
| `src/lib/content/schema.ts` · `view.ts` | `resolveCardMedia`·`toCardView`에 `locale`(원문 썸네일 alt 언어). `SOURCE_TYPE_LABELS`는 사전으로 이동 |
| `src/lib/utils.ts` | `formatKoreanDate` 삭제 → `i18n.formatDate` |
| `src/lib/seo.ts` | JSON-LD `inLanguage`·URL·사이트명 언어별, 영어 기사 `translationOfWork`, `languageAlternates` |
| `src/components/{site-header,site-footer,feed-view,post-grid,post-card,pagination,card-media,external-link,source-list,gallery,floating-banner}.tsx` | `locale` 받아 사전 문구 사용. 헤더에 `한국어 / English` 전환(현재 언어는 `aria-current`, 링크에 `lang`·`hrefLang`). 영어 피드는 태그 칩 없음, 출처 목록 위 "Sources are in Korean." |
| `src/app/sitemap.ts` | `/en`·`/en/about`·`/en/post/{id}` 추가 + 짝 있는 ko·en 항목에 `xhtml:link` alternates |
| `src/app/robots.ts` | `Disallow: /en/page/` |
| `src/app/llms.txt/route.ts` | 주요 페이지에 English version 한 줄(건수 포함) |
| `src/middleware.ts` | matcher에 `/en` |
| `next.config.ts` | `experimental: { globalNotFound: true }` |
| `scripts/validate-content.ts` | `content/posts-en/*.md` 검사 + 요약 `영어본 N건 / 전체 M건` |
| `content/README.md` | §9 영어본 작성 가이드(형식·규칙 표) |

### 도구·증거
| 경로 | 내용 |
|---|---|
| `docs/tools/programmer-05/ko-html-diff.mjs` | HEAD 빌드 vs 작업 빌드 한국어 HTML 전수 비교(의도된 추가분 분리 집계) |
| `docs/tools/programmer-05/en-qa.mjs` | `checks`(8경로 × 3폭: lang·canonical·hreflang·전환 링크 목적지+실제 클릭·배너·여백·가로 넘침·콘솔 오류·HTTP 404) / `capture` |
| `docs/tools/programmer-05/unit-checks.ts` | 영어본 검증 규칙·링크 치환·날짜 표기 53케이스 |
| `docs/tools/programmer-05/results/` | `validate.log` · `ko-html-diff.log` · `en-qa-checks.log` · `unit-checks.log` · `capture.log` (최종 빌드 실행 원본) |
| `docs/qa/programmer-05/` 8장 | `en-home--390/1280` · `en-post--390/1280` · `ko-post--390/1280`(Read in English 보이는 첫 화면) · `en-post--390--full` · `en-post--1280--full` |

## 영어본 파일 형식 요약
```yaml
id: {한국어 원본과 동일, 파일명도 동일}   # 필수
title / description                       # 필수 (description 160자 초과 경고)
imageAlt                                  # 원본 image 있으면 필수
imageCaption                              # 원본 image.caption 있으면 필수
images: [{alt, caption}]                  # 원본이 사진 유형(images[])이면 같은 개수로 필수 (자체 추가, 아래 결정 2)
speakerAffiliation                        # 원본 speaker에 소속 있을 때 선택
translatedAt: YYYY-MM-DD                  # 필수
```
오류(빌드 중단): 원본 없음·검증 실패 원본 · 파일명≠id · 필수·조건부 필수 누락 · 날짜 형식 · 본문 script/iframe.
경고: 괄호 밖 한글(title·description·imageAlt·imageCaption·speakerAffiliation·본문) · 원본 상속 필드 기재 · 모르는 필드 · 원본이 번역 뒤 갱신(`updatedAt > translatedAt`) · 원본에 없는 캡션·소속.

## 검증 숫자 (최종 빌드, 전부 직접 실행 · HEAD `a84d893` 기준)
| 항목 | 결과 |
|---|---|
| `npm run validate:content` | 124건(한국어 123 · 영어본 1) 통과 124 · 실패 0 · **영어본 1건 / 전체 123건** |
| typecheck | 오류 0 (빌드 전·후 모두) |
| lint | 0 errors · 1 warning(`docs/tools/reviewer-04/keyboard-tab.mjs:36` 기존) |
| build | 성공 · 정적 **357(HEAD) → 361(+4: `/en`·`/en/about`·`/en/post/{샘플}`·`/en/opengraph-image`)** · HTML 350 → 353 |
| 한국어 HTML 전수 비교 | 기준 350개 전부 존재(누락 0) · 의도된 추가분 제거 후 **350/350 동일 · 의도하지 않은 차이 0** · 추가분: 언어 전환 nav 350 · hreflang 9(홈·about·샘플 상세 × 3) · Read in English 1 · 404 robots 1 · 404 영어 안내 1 · 404 OG 이미지 메타 10개 빠짐(의도) |
| `en-qa checks` | **128/128** — `/`·`/post/{샘플}`·`/post/{영어본 없음}`·`/about`·`/tag/dmz`·`/en`·`/en/post/{샘플}`·`/en/about` × 320/390/1280 |
| `<html lang>` | `/` ko · `/post/{샘플}` ko · `/en` en · `/en/post/{샘플}` en · `/en/about` en |
| hreflang | 짝 있는 6경로 ko·en·x-default(=ko) 3개씩 양방향 일치 · 짝 없는 경로(영어본 없는 상세·태그) 0개 |
| canonical | 8경로 모두 1개·자기 자신 (`/en?page=2`는 `/en?page=2`) |
| 언어 전환 클릭 | 8/8 도착 URL·lang 일치(영어본 없는 한국어 상세·태그 → `/en`) |
| 404 | `/en/post/{영어본 없는 id}`·`/en/post/no-such-id` → 404, `<html lang="ko">` 전역 404 |
| 플로팅 배너 | 한국어 5경로 표시·여백 클래스 유지 / 영어 3경로 미표시·`<html>` class 없음·main·footer 여백 없음 |
| 가로 넘침 | 24회(8경로 × 3폭) 전부 0 · 콘솔 오류 0 |
| 규칙 케이스 | **53/53** |
| 페이지네이션(스크래치 복사본에 임시 영어본 14건 추가, 총 15건) | `/en` 12장·"Load more" `/en?page=2` · `/en?page=2` 200·3장·canonical `/en?page=2` · `/en?page=3` 404 · 샘플 본문 링크 중 영어본 생긴 1개만 `/en/post/…`로 치환 |
| sitemap | `<url>` 328개(에 `/en` 3종 포함) · alternates 6개 항목 |
| 독립 grep | 변경·신규 71개 파일, pre-commit 패턴 포함 **0건** |

## 주요 결정사항 (자체 판단 + 근거)
| # | 결정 | 근거 |
|---|---|---|
| 1 | **라우트 그룹별 루트 레이아웃 + `experimental.globalNotFound`** | `<html lang>`은 루트 레이아웃만 그리고, 정적 생성 시 레이아웃은 경로를 모른다. 미들웨어로 전체 경로를 `/[locale]`에 rewrite하는 방식은 모든 요청에 미들웨어가 붙고 한국어 URL 동작을 건드린다. 그룹 방식은 URL 불변. 단 전역 404가 필요 — 없으면 Next 기본 404(lang 없음, 헤더 없음)가 나감을 스크래치 빌드로 실측. `globalNotFound`는 Next 15.4+ 공식 문서화된 실험 플래그(15.5.25 내장 확인) |
| 2 | 영어본에 `images: [{alt, caption}]` 추가(원본이 사진 유형일 때 필수) | 오더 필드 목록은 `image`만 다룸. 없으면 사진 게시물 영어 페이지 갤러리에 한국어 alt가 나감(현재 사진 유형 0건이라 실사용 영향 없음) |
| 3 | 헤더·main·푸터를 레이아웃에서 각 페이지(`PageFrame`)로 | 전환 링크가 "현재 페이지의 상대 언어본"이어야 함. 번역 id 목록을 클라이언트로 보내 `usePathname`으로 푸는 방식은 모든 페이지 페이로드가 번역 수만큼 커지고 JS 없이는 틀린 링크. DOM 순서는 기존과 같음(전수 비교로 확인) |
| 4 | "OG 이미지는 원본 썸네일 재사용"을 **한국어 원본 상세와 같은 사이트 자체 OG 이미지**로 해석 | 기존 정책(원문 썸네일은 공유 미리보기로 절대 쓰지 않음 — 인용 범위·초상권, `post/[id]` 주석)을 뒤집을 근거가 오더에 없음. 영어 전용 `opengraph-image`는 alt만 영어. 슈퍼바이저 확인 요청 |
| 5 | 전역 404는 한국어 + 영어 안내 한 줄 | 정적 404라 요청 경로(언어)를 모름. `robots`는 기존 "noindex"(자동)와 "index, follow"(레이아웃)가 함께 나가던 모순을 "noindex, follow" 하나로 |
| 6 | 영어 UI 문구(§5 확정값 외) | 헤더·푸터·페이지네이션·상세 라벨 등은 한국어 문구를 그대로 옮겨 번역(`src/lib/i18n.ts` 한 곳). 출처 종류 배지(언론→News 등)도 번역. 확정 문구는 글자 그대로 |
| 7 | 영어 상세에 "Translated {날짜}" 표기, 한국어 인용(OG 제목·요약·출처 표기·기사 제목·발언자 이름)에 `lang="ko"` | 스크린리더 발음·검색엔진 언어 판별(WCAG 3.1.2) |
| 8 | GA 카드 이벤트: 영어 페이지에서만 `language: 'en'` 파라미터 추가 | 같은 post_id가 두 언어에서 섞여 CTR이 합쳐지지 않게. 한국어 이벤트 payload는 그대로 |
| 9 | 한글 경고 검사 대상에 imageAlt·imageCaption·speakerAffiliation도 포함 | 영어 페이지에 노출되는 번역 필드 전부 같은 기준 |
| 10 | 샘플 번역 인명 표기 | 공식 영문 표기를 확인하지 못한 인명은 국어의 로마자 표기법(Kang Sin-cheol 등) + 괄호 한글 병기. 원본에 없는 이름·단정은 넣지 않음("이 대통령" → "President Lee") |

## 미해결·이슈
1. **범위 밖 페이지 번호 404 셸** — `/en?page=99`처럼 없는 페이지를 `?page=`로 요청하면 `__next_error__` 404 셸이 나간다. **HEAD에서도 `/?page=999`·`/tag/dmz?page=99`가 똑같다**(기준 빌드 실측) — 이번 변경 원인 아님, 영어도 같은 동작. 직접 경로 `/page/999`는 정상 404.
2. **기존 전수 도구의 기대값** — `docs/tools/programmer-04*/static-check`·`reviewer-08/09` 도구는 "전 HTML에 배너"를 기대한다. 이제 영어 HTML 3개는 배너가 없는 것이 정상이므로 재실행 시 `/en/**` 제외가 필요. 배너 기하·포커스 가림 전수(약 25분)는 재실행하지 않았다 — 한국어 HTML이 헤더 언어 nav 외 동일(350/350)하고 헤더 높이 `h-14` 불변이지만, 헤더 내용이 늘었으므로 리뷰어 재확인 권장.
3. `experimental.globalNotFound` — 실험 플래그. Next 업그레이드 시 동작 재확인 필요.
4. OG 이미지 해석(결정 4)·영어 UI 문구(결정 6)는 슈퍼바이저 확인 필요.
5. 영어 tagline·description 등 확정 문구는 오더 그대로 반영. 영어 404 전용 페이지·영어 태그 페이지는 범위 밖.

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)**: 코드 리뷰 + 재실측
  - `npm run build && npx next start -p 3105` 후 `node docs/tools/programmer-05/en-qa.mjs http://localhost:3105 checks`
  - HEAD를 스크래치에 `git archive` + `.env.local` 복사 후 빌드 → `node docs/tools/programmer-05/ko-html-diff.mjs <HEAD>/.next/server/app .next/server/app`
  - `npx tsx docs/tools/programmer-05/unit-checks.ts`
  - 중점: 루트 레이아웃 분리·globalNotFound 판단, `PostDetail` 공용화의 한국어 불변, 영어본 스키마 견고성, hreflang·sitemap, 샘플 번역의 원본 범위 준수
- **슈퍼바이저 (Opus 5)**: 리뷰어 승인 후 커밋. 번역 추가는 `content/README.md` §9 형식. 파일 이동(삭제 9 + `(ko)` 신규)은 `git add -A src/app`로 함께 스테이징해야 rename으로 잡힌다.

## 참고 링크
- 오더: `instructions/programmer/processed/05-english-pages.md`
- 이전 핸드오프: `docs/handoffs/programmer-04-1-floating-banner-focus-fix.md`
