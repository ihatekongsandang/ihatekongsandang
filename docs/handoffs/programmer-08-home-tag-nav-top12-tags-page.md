# 프로그래머 세션 — 08-home-tag-nav-top12-tags-page 핸드오프
**작성일**: 2026-10-12 16:35 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- `TagNav`가 상위 12개(`TAG_NAV_LIMIT`)만 그리고 끝에 "전체 태그 보기 (N개)" → `/tags` 링크를 단다. 현재 태그가 상위 밖이면 맨 앞에 붙여 `aria-current="page"`(13개). 서버 컴포넌트 유지.
- 신규 정적 페이지 `/tags`(전체 태그 건수 순 단일 목록, `TagChip` 공용) + sitemap 항목 추가. 미들웨어·robots는 `/tags`에 걸리지 않음을 실측.
- 빌드 산출물 전수 대조: 홈 16쪽 칩 12 · 태그 피드 311쪽(상위 태그 22쪽 12개 / 상위 밖 289쪽 13개) · `/tags` 링크 301 = 전체 태그 301 · 영어 16쪽 nav 0. 정적 페이지 722 → 723.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/config.ts` | `TAG_NAV_LIMIT = 12` 상수 추가(근거 주석) |
| `src/components/tag-nav.tsx` | `TagChip` 분리(기존 마크업·`aria-current`·`sr-only "게시물 N건"`·포커스 링 그대로) + 상한·activeTag 앞붙임·"전체 태그 보기" 링크 |
| `src/app/(ko)/tags/page.tsx` | 신규 `/tags` — title "전체 태그", description(태그 수 포함), canonical `/tags`, BreadcrumbList JSON-LD, `<ul role="list" aria-label="태그 목록">` |
| `src/app/sitemap.ts` | `/tags` 항목 1개(weekly · 0.5, 대체 언어 없음) |
| `docs/tools/programmer-08/` | 측정 스크립트 + 실측 로그(README 참조) |

## 실측 결과
| 항목 | 결과 |
|---|---|
| 전체 태그(frontmatter 직접 집계) | 301개 (게시물 184건) — 디자이너 01 실측 297 이후 업로더 게시로 증가 |
| 상위 12 | dmz 40 · 이재명 26 · 25사단 17 · 목함지뢰 16 · 중국 15 · 합참 14 · 국가보안법 13 · 국민의힘 11 · 지뢰 11 · 더불어민주당 10 · 북한 10 · 집회 10 (13위 통일부 9) |
| 메인 `/` + `/page/2~16` | 16쪽 전부 칩 12 + 전체 보기 1 |
| `/tag/{상위 12}` 1페이지 | 12쪽 전부 칩 12, 해당 칩 `aria-current` |
| `/tag/{상위 밖}` 1페이지 | 289쪽 전부 칩 13(활성 칩 맨 앞), 예: `/tag/1군단`(1건) |
| `/tag/{태그}/page/n` | 10쪽(전부 dmz 등 상위 태그) 칩 12 |
| `/tags` | 태그 링크 301 = 전체 301, 순서·건수 전수 일치, 상단 칩 nav 없음 |
| `/en`·`/en/page/n` | 16쪽 태그 nav 0 |
| 정적 페이지 | 722 → 723 (+1, 오더의 "708"은 작성 시점 값 — 그 사이 게시물·태그 증가) |
| sitemap `<url>` | 674 (= 홈·about 2 + /tags 1 + 태그 301 + 게시물 184 + /en·/en/about 2 + 영어 게시물 184) |
| 화면(1280px) | 메인 태그 nav 높이 61px, 첫 카드 top 531px(뷰포트 779px 안) |
| 라우팅 | `/tags` 200 · `/tags?page=2` 200(본문 동일, 미들웨어 미적용) · `/tags/` 308→`/tags` · `/tag/tags` 404 · `/en/tags` 404(global-not-found, `lang="ko"`, `noindex` — 다른 없는 `/en/*` 경로와 동일 동작) |
| robots | 변경 없음. `Disallow: /page/`·`/tag/*/page/`·`/en/page/` — 모두 `/tags`와 접두 불일치 |
| 검사 | typecheck ✅ · lint 오류 0(경고 3 = 기존 `docs/tools/reviewer-04`·`reviewer-10`) · validate:content ✅ · build ✅ · clean-clone-gate `--worktree` ✅ |

## 주요 결정사항 (자체 판단 + 근거)
- **상수 위치 `config.ts`**: `FEED_PAGE_SIZE`와 같은 곳에 둬 "값 바꿀 곳 한 군데" 원칙 유지.
- **`TagChip` 분리**: `/tags`가 TagNav와 "같은 방식"의 건수·스크린리더 안내를 써야 해서 마크업을 공용화. 렌더 HTML은 기존 칩과 동일 구조(측정 스크립트가 같은 정규식으로 양쪽 건수 확인).
- **"전체 태그 보기" 링크에 `aria-label` 미사용**: 목업은 `aria-label="전체 태그 285개 더 보기"`였으나 보이는 문구와 달라 WCAG 2.5.3(Label in Name) 위반 소지 → 보이는 텍스트 그대로 접근 이름으로 쓰고 화살표만 `aria-hidden`. 태그 수가 12 이하가 돼도 링크는 항상 표시(오더 "끝에 링크").
- **`/tags` OG**: 기존 `/about`·`/tag/[slug]`와 같은 구성 — title·description·canonical만 페이지에서 내고 OG·twitter는 루트 메타데이터(사이트 기본 제목·자체 OG 이미지)를 상속. 실측으로 `/about`과 og 태그 세트 동일 확인. (그래서 `og:title`은 "전체 태그"가 아니라 사이트 기본값 — 기존 태그 페이지와 같은 동작)
- **`/tags` 언어 전환 링크**: 영어 짝이 없어 태그 피드와 같이 `en: '/en'`. hreflang 대체 링크·sitemap languages는 달지 않음.
- **`<ul role="list">`**: Tailwind preflight가 목록 기호를 없애면 Safari VoiceOver가 목록 의미를 버리는 문제 대응. eslint `no-redundant-roles`는 현 설정에서 보고되지 않아 disable 주석 없이 둠.

## 미해결·이슈 (다음 세션이 알아야 할 것)
- **확인 필요(기존 동작, 이번 변경 아님)**: 활성 칩(검정 배경)의 건수 숫자가 `text-muted-foreground`라 대비가 낮아 보임(스크린샷 `/tag/1군단`). 변경 전부터 같은 클래스 — 디자이너/리뷰어 판단 필요.
- **확인 필요**: 키보드 실탭으로 "전체 태그 보기" 링크 포커스 링 육안 확인은 하지 않음(칩과 같은 focus-visible 클래스 사용만 코드로 확인) — 테스터 영역.
- 모바일 폭 nav 높이는 실측하지 않음(브라우저 창 1280px 고정). 테스터 확인 권장.
- `llms.txt`는 기존대로 전체 태그 목록을 내므로 손대지 않음.
- 태그 표기 통일(`dmz`·`6-25전쟁`/`625전쟁`)은 범위 밖 — 손대지 않음.
- 업로더 게시가 계속되면 태그 수·정적 페이지 수는 바뀐다. 리뷰 시 `measure-tag-nav.mjs --expect-limit 12`를 다시 돌리면 그 시점 기준으로 재판정된다.

## 🔴 커밋 대상 경로 (리뷰어 게이트 후 슈퍼바이저 커밋)
```
src/lib/config.ts
src/components/tag-nav.tsx
src/app/(ko)/tags/page.tsx
src/app/sitemap.ts
docs/tools/programmer-08/README.md
docs/tools/programmer-08/measure-tag-nav.mjs
docs/tools/programmer-08/before-baseline.log
docs/tools/programmer-08/after-full-check.log
docs/tools/programmer-08/routing-check.log
docs/tools/programmer-08/browser-check.log
docs/tools/programmer-08/build-before.log
docs/tools/programmer-08/build-after.log
docs/tools/programmer-08/typecheck-lint.log
docs/tools/programmer-08/validate-content.log
docs/tools/programmer-08/clean-clone-gate-worktree.log
docs/handoffs/programmer-08-home-tag-nav-top12-tags-page.md
docs/triggers/programmer-08-home-tag-nav-top12-tags-page-COMPLETE.md
instructions/programmer/processed/08-home-tag-nav-top12-tags-page.md   (instructions/programmer/08-… 삭제로 잡힘 — 이동)
```
⚠️ 작업 트리에는 다른 세션의 미추적 파일(`docs/design/`, `docs/tools/planner-07/`, `docs/qa/tester-01/` 등)과 `history/` 변경이 섞여 있다. 위 경로만 스테이징할 것. `content/`·`public/`은 건드리지 않았다.

## 다음 세션 가이드 (누가·무엇을·어떻게)
- **리뷰어 (Opus 5.5)**: 접근성(`aria-current`·`sr-only`·Label in Name), SEO(`/tags` canonical·sitemap·내부링크 보존), SSG(`/tags` ○ Static), 미들웨어·robots 영향 없음 확인. `npm run build && node docs/tools/programmer-08/measure-tag-nav.mjs --expect-limit 12`로 재현.
- **테스터 (Sonnet 5)**: 모바일 폭 칩 영역 높이, 키보드 탭 순서(칩 → 전체 보기 → 피드), VoiceOver 목록 낭독.
- **슈퍼바이저**: 리뷰어 판정 후 위 경로만 커밋 → `clean-clone-gate.sh --staged` → 푸시 → Vercel status 확인.

## 참고 링크
- 오더: `instructions/programmer/processed/08-home-tag-nav-top12-tags-page.md`
- 시안: `docs/design/designer-01/proposal.md` §2 시안 A, `mockup-a-top-n-tags-page.html`
