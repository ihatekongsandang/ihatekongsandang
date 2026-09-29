# md오더: 프로그래머 (Opus 5) - 05-english-pages

**작성일**: 2026-09-29 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 05
**세션**: 새 세션 권장 (04-1 이후 컨텍스트 불필요).
**사용자 지시 원문**: "영어 번역 기능 추가하려면 복잡해지나?" → 슈퍼바이저가 A(번역 위젯)·B(`/en` 별도 영어 페이지)·C(별도 사이트) 제시 → 사용자 "B ㄱㄱ"

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 게시물 영어본을 **같은 사이트의 `/en` 경로**로 제공하는 구조를 만든다. 번역문 작성(콘텐츠)은 슈퍼바이저 몫이다 — 프로그래머는 구조·검증·샘플 1건까지만.
🔴 커밋 금지(리뷰어 판정 후 슈퍼바이저). 대전제 + 저장소 독립 원칙(산출물·커밋에 다른 서비스명·계정·홈 경로 금지).

## 선행 검토 문서 (Required)
- `CLAUDE.md` — 저장소 독립 원칙 · 핵심 축(출처 기반·단정 금지) · 세션 프로토콜
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/page/[page]`, `src/app/post/[id]/page.tsx`, `src/app/tag/[slug]`, `src/app/about/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/app/llms.txt`
- `src/lib/config.ts`, `src/lib/seo.ts`, `src/lib/content/{load,schema,view,markdown}.ts`, `scripts/validate-content.ts`
- `src/components/{site-header,site-footer,post-card,feed-view,source-list,floating-banner}.tsx`
- 기존 게시물 형식 예시: `content/posts/2026-09-29-nowandhere-defense-minister-nk-responsibility.md`

## 임무

### 1. 콘텐츠 형식 — 영어본은 별도 파일, 한국어 원본에 "덧붙는" 구조
- 경로: `content/posts-en/{id}.md` — **파일명·`id`는 한국어 원본과 동일**. 원본이 없는 영어 파일은 검증 실패.
- 영어 파일 frontmatter는 **번역이 필요한 필드만** 가진다. 나머지(publishedAt·sourceUrl·attribution·speaker·image.src·sources·tags·og)는 한국어 원본에서 가져온다.
  ```yaml
  id: 2026-09-29-...            # 원본과 동일
  title: ...                    # 필수
  description: ...              # 필수 (160자 권장 경고는 한국어와 동일 기준)
  imageAlt: ...                 # 원본에 image가 있으면 필수
  imageCaption: ...             # 원본 caption이 있으면 필수
  speakerAffiliation: ...       # 원본 speaker가 있으면 선택 (없으면 원본 값 그대로)
  translatedAt: 2026-09-29      # 필수
  ```
- 본문(마크다운)은 영어로 작성. 본문 내부 링크 `/post/{id}`는 **영어 페이지 렌더 시 `/en/post/{id}`로 자동 치환**하되, 대상 영어본이 없으면 한국어 페이지 링크를 그대로 둔다.
- 출처(sources)의 기사 제목은 한국어 원문 그대로 노출(번역하지 않음). 영어 페이지 출처 목록 위에 "Sources are in Korean" 한 줄 안내.
- 태그: 영어 페이지에서는 태그 칩을 **표시하지 않는다**(한국어 태그 페이지로 보내지 않기 위해). 영어 태그 페이지는 이번 범위 밖.
- 한국어 게시물은 영어본이 없어도 된다(부분 번역 허용).

### 2. 경로 · 화면
- `/en` — 영어본이 있는 게시물만 최신순 피드(한국어 피드와 같은 카드 그리드·페이지 크기). 페이지네이션 `/en/page/[page]`.
- `/en/post/[id]` — 영어 상세. 영어본이 없는 id는 404.
- `/en/about` — 영어 소개 페이지(문구는 아래 §5 확정값).
- 🔴 **`/en/**`는 `<html lang="en">`으로 렌더**되어야 한다. 현재 루트 레이아웃이 `lang="ko"` 고정이므로 구현 방식(라우트 그룹별 루트 레이아웃 등)은 프로그래머 판단. 한국어 페이지 URL·동작은 **바뀌면 안 된다**.
- **언어 전환**
  - 헤더에 `한국어 / English` 전환 링크. 현재 페이지의 상대 언어본이 있으면 그 페이지로, 없으면 상대 언어 홈으로.
  - 한국어 상세 페이지에서 영어본이 있으면 제목 근처에 `Read in English` 링크, 영어 상세에는 `한국어 원문 보기` 링크.
- **UI 문구 사전**: 헤더·푸터·페이지네이션·"원문 보기"·날짜 표기 등 고정 문구를 `ko`/`en` 사전으로 분리. 영어 날짜는 `Sep 29, 2026` 형식.
- **플로팅 배너**: 국내 서명운동 링크라 **영어 페이지에서는 표시하지 않는다**(배너용 여백도 없앤다). `FLOATING_BANNER`에 `showOnEnglish: false` 같은 설정값으로.

### 3. SEO
- 양방향 `hreflang`: 영어본이 있는 게시물은 한국어·영어 상세 모두에 `ko`·`en`·`x-default(=ko)` alternate. 홈(`/`↔`/en`)·about도 동일.
- canonical은 각 언어 페이지 자기 자신.
- `sitemap.ts`에 `/en`, `/en/about`, `/en/post/{id}` 추가(alternates 포함 가능하면 포함).
- 영어 페이지 OG: `og:locale=en_US`, 제목·설명은 영어본. OG 이미지는 원본 썸네일 재사용.
- JSON-LD `inLanguage` 언어별로.
- `llms.txt`에 영어 페이지 존재 한 줄 추가.

### 4. 검증 스크립트 (`scripts/validate-content.ts`)
- `content/posts-en/*.md` 검사 추가: id 일치·원본 존재·필수 필드·`translatedAt` 날짜 형식·원본 image/caption/speaker 여부에 따른 조건부 필수.
- 경고(실패 아님): 영어 title/description/본문에 한글이 섞여 있으면 경고(고유명사 병기 `Chung Dong-young (정동영)`은 허용하도록 괄호 안 한글은 제외).
- 요약에 "영어본 N건 / 전체 M건" 출력.

### 5. 문구 (슈퍼바이저 확정 — 임의 변경 금지)
- 영어 사이트명 표기: `공산당이싫어요 (Korea Politics & Security Brief)` — 헤더에서는 공간이 좁으면 괄호 부분만 줄바꿈 허용.
- 영어 tagline: `Korean politics and security issues, summarized with sources and links to the originals`
- 영어 description: `A card-style digest of Korean politics and security issues — policy criticism, politicians' remarks, commentary and national security — based on news reports, official announcements and court records. Each card summarizes the original post and links to its sources instead of republishing it.`
- `/en/about` 본문: 위 description + `English versions are translated by the editor from the Korean originals. Where the English and Korean differ, the Korean version prevails.` + 정정·삭제 요청 안내(한국어 about과 같은 채널).
- 영어 상세 상단 안내 한 줄: `Translated from the Korean original.`

### 6. 샘플 1건
- 구조 확인용으로 `content/posts-en/2026-09-29-nowandhere-defense-minister-nk-responsibility.md` 1건만 작성(영어 번역은 원본 내용 범위 안에서, 단정 추가 금지). 나머지 번역은 슈퍼바이저가 한다.

### 7. 검증
- `npm run validate:content` · typecheck · lint · build 통과. 빌드 결과에 기존 한국어 페이지 수가 줄지 않았는지 숫자 대조.
- `/`·`/post/{샘플id}`·`/en`·`/en/post/{샘플id}`·`/en/about` 각각 `<html lang>` 값, hreflang, canonical, 언어 전환 링크 동작 확인.
- 영어본 없는 id로 `/en/post/{id}` → 404 확인.
- 영어 페이지에 플로팅 배너 미표시 · 한국어 페이지 배너 그대로 확인.
- 390px / 1280px 캡처: `/en`, `/en/post/{샘플id}`, 한국어 상세(전환 링크 보이는 상태).
- 독립 grep 0건.

## 산출물 · 핸드오프
- 코드: `src/**`, `scripts/validate-content.ts`, `content/posts-en/`(샘플 1건)
- 캡처: `docs/qa/programmer-05/`
- 핸드오프: `docs/handoffs/programmer-05-english-pages.md` (변경 파일 표 · 영어본 파일 형식 요약 · 캡처 목록 · 검증 숫자 · 자체 결정 · 미해결)
- 🔴 트리거: `docs/triggers/programmer-05-english-pages-COMPLETE.md` (필수)
- 이 오더를 `instructions/programmer/processed/`로 이동 · history 기록
- **커밋 금지** — 리뷰어 판정 후 슈퍼바이저가 커밋

## 결정 사항 · 제약
- 방식: 사용자 확정 B안(같은 사이트 `/en` 경로). 기계번역 위젯·외부 번역 API 사용 금지(빌드·런타임 모두).
- 한국어 페이지의 기존 URL·레이아웃·검증 규칙은 바꾸지 않는다(추가만).
- 별도 도메인·서브도메인은 범위 밖.

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 05-english-pages
- 변경 파일 · 캡처 N장 · 빌드/검증 결과(한국어 페이지 수 전후 대조 포함) · 자체 결정 · 미해결
```
