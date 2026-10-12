# 리뷰 — 프로그래머 08 · home-tag-nav-top12-tags-page
**작성일**: 2026-10-12 18:53 | **작성 세션**: 리뷰어 (Opus 5.5) | **오더**: `instructions/reviewer/processed/16-programmer-08-home-tag-nav-top12-tags-page.md`

## 판정: ✅ 승인 (커밋·배포 가능)
- P1 0건. 이번 변경이 새로 만든 결함은 없다.
- P2 1건은 **변경 전부터 있던** 접근성 결함(활성 칩 건수 숫자 대비 2.29:1)이다. 이번 묶음은 막지 않고, 별도 오더로 처리할 것을 권한다.
- 근거 로그: `docs/tools/reviewer-16/` (README 참조)

---

## 1. 재현 (임무 1)
측정 시점의 게시물 184건 · 태그 301개로, 프로그래머 08 측정 때와 같다(업로더 게시로 인한 변동 없음, `content/`·`public/` git 변경 0).

| 항목 | 프로그래머 08 | 리뷰어 재현 | 방법 |
|---|---|---|---|
| 빌드 정적 페이지 | 723 | **723** | `npm run build` (`build.log`) |
| `measure-tag-nav.mjs --expect-limit 12` | ✅ | **✅** 같은 수치 | `measure-tag-nav.log` |
| 홈 `/`·`?page=2~16` | 16쪽 × 칩 12 | **16쪽 × 칩 12**, 17쪽 404 | 독립 대조(아래) |
| 태그 피드 | 311쪽 (12: 22 / 13: 289) | **311쪽 (12: 22 / 13: 289)** | 독립 대조 |
| `/tags` 링크 | 301 = 전체 301 | **301 = 301**, li 301, 순서·건수 전수 일치 | 독립 대조 |
| 영어 `/en`·`?page=2~16` | nav 0 | **16쪽 nav 0, `/tags` 링크 0** | 독립 대조 |
| sitemap `<url>` | 674 | **674**, `/tags` 포함, `/tag/*` 301 전부 `/tags`에서 링크됨 | 독립 대조 |

**독립 대조**: 프로그래머 스크립트를 그대로 믿지 않으려고 (1) 기대값을 frontmatter에서 따로 집계하고 (2) 정규식 대신 브라우저 DOMParser로 (3) 빌드 파일 대신 공개 URL(`?page=n` → 미들웨어 rewrite 경유)로 343쪽 + sitemap을 전수 확인했다. 실패 0건 (`browser-independent-check.log` §1).

## 2. 코드 리뷰 (임무 2)
대상: `src/lib/config.ts`, `src/components/tag-nav.tsx`, `src/app/(ko)/tags/page.tsx`(신규), `src/app/sitemap.ts`.

| 점검 | 결과 |
|---|---|
| 정렬 | `getAllTags()` 순서(건수↓ → `localeCompare('ko')`) 그대로 `slice`. 동점 경계에서도 결정적 |
| 상한·앞붙임 | `slice`가 새 배열이라 `unshift`가 원본을 바꾸지 않음(경계 스크립트 `input mutated: false`). 상위 안에 있으면 붙이지 않아 key 중복 없음 |
| 경계값 렌더 (`tagnav-edge-cases.log`) | 0개 → 렌더 없음 · 5개 → 칩 5 + 전체 보기(5개) · 12개 → 12 · **12위 활성 → 12, 그 칩 aria-current** · **13위·꼴찌 활성 → 맨 앞 13** · 없는 태그 → 12, aria-current 없음 · 공백·`/`·`?`·`#`·`%` 태그 → `%20%2F%3F%23%25`로 인코딩 |
| 실데이터 경계 | 12위 `집회`(10) → 12칩, 13위 `통일부`(9) → 13칩 (독립 대조에서 확인) |
| `TagChip` 분리 회귀 | 배포본(HEAD) `/tag/dmz`와 로컬 `/tag/dmz`의 상위 12칩 `<a>` HTML **바이트 동일 12/12**, nav 여는 태그 동일 |
| 서버 컴포넌트 | `'use client'` 없음. 새 의존성 없음(`package.json` 무변경) |
| 하드코딩 | "(N개)"는 `tags.length` |
| 부수 효과 | `/tag/dmz` HTML 479,215 B → 102,754 B (−78.6%) |

태그 0개일 때 `TagNav`가 null이라 "전체 태그 보기"도 사라지지만, `/tags`는 "아직 태그가 없습니다"를 내므로 문제없다.

## 3. 접근성 (임무 3)
| 점검 | 결과 |
|---|---|
| `aria-current="page"` | 태그 피드 311쪽 전부 현재 태그 칩 1개에만, 홈·전체 보기 링크에는 없음 |
| `sr-only "게시물 N건"` | 칩·`/tags` 전부 유지, 건수 = 기대값 |
| "전체 태그 보기" 접근 이름 | `aria-label` 없음 → 보이는 문구 "전체 태그 보기 (301개)"가 곧 이름, 화살표만 `aria-hidden` → **Label in Name(2.5.3) 충족**. 목업의 `aria-label="… 더 보기"`를 따르지 않은 판단은 옳다 |
| `/tags` 구조 | h1 1개("전체 태그"), `<ul role="list" aria-label="태그 목록">` > `<li>` 301. `<html lang="ko">` |
| 포커스 | 양수 tabindex 0. 순서 칩 13 → 전체 보기 → 첫 카드. 실제 Tab 키로 "전체 태그 보기" 포커스 링 육안 확인 |
| 대상 크기 | 칩·링크 높이 26.4px ≥ 24px (2.5.8) |
| 문구 대비 | 전체 보기 17.72:1 · 비활성 칩 숫자 7.03:1 |
| **활성 칩 건수 숫자** | **2.29:1** (rgb(82,82,91) / rgb(24,24,27), 12px·500) → 1.4.3 AA 4.5:1 미달. `aria-hidden`이어도 보이는 글자라 적용 대상. HEAD에서도 같은 클래스 → **기존 결함, P2** (아래) |

사이트에는 다크 모드 토큰이 없다(`globals.css`에 `prefers-color-scheme`·`.dark` 없음) → 라이트 한 가지만 측정.

## 4. SEO·라우팅 (임무 4)
| 점검 | 결과 |
|---|---|
| `/tags` head | title "전체 태그 · 공산당이싫어요", description(태그 수 포함), canonical `/tags`, robots `index, follow` |
| JSON-LD | BreadcrumbList(홈 → 전체 태그) + 루트 WebSite |
| OG | 루트 상속(사이트 기본 제목) — `/about`·`/tag/[slug]`와 같은 구성. og:url·hreflang 없음도 세 페이지 공통 |
| sitemap | `/tags` weekly · 0.5 · 대체 언어 없음 |
| robots | 변경 없음. `Disallow: /page/`·`/tag/*/page/`·`/en/page/` 어느 것도 `/tags`와 접두 불일치 |
| 미들웨어 | matcher `['/', '/tag/:slug', '/en']` — `/tags` 미포함 → `/tags?page=2`는 본문 동일 200, canonical이 `/tags`라 중복 위험 없음 |
| `/tags/` | 308 → `/tags` |
| `/en/tags` | 404 global-not-found(`lang="ko"`, noindex) — 다른 없는 `/en/*` 경로와 같음. 영어 사이트에 태그 칩이 없다는 기존 정책(프로그래머 05)과 일치 |
| 내부 링크 그래프 | sitemap의 `/tag/*` 301개 전부 `/tags`에서 1회씩 링크(누락 0, 중복 0). 홈→`/tags`→각 태그로 2단계 도달 |

참고(기존 동작, 범위 밖): 404 HTML에 robots meta가 2개(`noindex` / `noindex, follow`) 들어간다. 배포본 `/en/nonexistent-xyz`도 같다.

## 5. 게이트 (임무 5)
| 검사 | 결과 |
|---|---|
| typecheck | ✅ |
| lint | 오류 0 · 경고 3(기존 `docs/tools/reviewer-04`·`reviewer-10`) |
| validate:content | ✅ 368건 통과, 오류 0 |
| build | ✅ 723쪽 |
| `clean-clone-gate.sh --worktree` | ✅ 게이트 통과 (포함 1222파일, npm ci → typecheck → lint → build) |
| 저장소 독립 grep | 커밋 후보 텍스트 32파일 + jpg 4개(문자열·메타) — pre-commit 훅 패턴보다 넓은 패턴(다른 서비스명·계정·홈 경로·임시 경로)으로 **0건** |

⚠️ 리뷰 중 제 경계값 스크립트를 처음에 `.tsx`로 저장해 typecheck가 한 번 실패했다(tsconfig가 `**/*.tsx` 포함). `.tsx.txt`로 바꾼 뒤 위 결과를 다시 얻었다. 커밋할 때 `docs/tools/` 안에 `.ts/.tsx`를 두지 않도록 주의.

## 6. 결함
| 등급 | 내용 | 조치 |
|---|---|---|
| **P2-1 (기존)** | 활성 칩(검정 배경) 건수 숫자 대비 **2.29:1** — WCAG 1.4.3 미달. 이번 변경으로 생긴 것이 아니라 HEAD부터 같다. 다만 이제 상위 밖 태그 289쪽에서 활성 칩이 맨 앞에 와 더 눈에 띈다 | 이번 커밋을 막지 않는다. 후속 프로그래머 오더로 활성 칩 숫자 색을 바꿀 것(예: `text-background/70` 류 — 계산상 9:1 안팎이나 **적용 후 실측 필수**) |
| P3-1 | 프로그래머 핸드오프 커밋 목록 주석 "`instructions/programmer/08-…` 삭제로 잡힘 — 이동"은 사실과 다르다. 원본 오더는 한 번도 추적되지 않았다(`git ls-files` 0건) → `processed/` 파일 신규 추가만 잡힌다 | 커밋 영향 없음. 슈퍼바이저 참고 |
| P3-2 (정보) | 태그가 12개 이하가 돼도 "전체 태그 보기"가 항상 나온다 | 오더("끝에 링크")대로. 현재 301개라 영향 없음 |

## 7. 커밋 대상 최종 목록 (임무 6)
디자이너 01 산출물은 **같은 묶음에 넣는다**. 근거: 이번 코드의 근거(시안 A·12의 근거)가 `config.ts` 주석과 오더에서 이 문서들을 가리킨다. 스크린샷 4장 합계 572KB(각 129~155KB)로 기존 `docs/qa/` 스크린샷 관례와 비슷한 크기라 허용한다.

```
# 코드 (4)
src/lib/config.ts
src/components/tag-nav.tsx
src/app/(ko)/tags/page.tsx
src/app/sitemap.ts
# 프로그래머 08 (14)
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
instructions/programmer/processed/08-home-tag-nav-top12-tags-page.md
# 디자이너 01 (11)
docs/design/designer-01/proposal.md
docs/design/designer-01/mockup-a-top-n-tags-page.html
docs/design/designer-01/mockup-b-scroll-chips.html
docs/design/designer-01/mockup-c-collapse-search.html
docs/design/designer-01/current-desktop-1920-home.jpg
docs/design/designer-01/current-desktop-1920-tag.jpg
docs/design/designer-01/current-narrow-585-home.jpg
docs/design/designer-01/current-narrow-585-tag.jpg
docs/handoffs/designer-01-home-tag-nav-cleanup.md
docs/triggers/designer-01-home-tag-nav-cleanup-COMPLETE.md
instructions/designer/processed/01-home-tag-nav-cleanup.md
# 리뷰어 16 (12)
docs/reviews/programmer-08-home-tag-nav-top12-tags-page-review.md
docs/tools/reviewer-16/README.md
docs/tools/reviewer-16/build.log
docs/tools/reviewer-16/measure-tag-nav.log
docs/tools/reviewer-16/browser-independent-check.log
docs/tools/reviewer-16/tagnav-edge-cases.tsx.txt
docs/tools/reviewer-16/tagnav-edge-cases.log
docs/tools/reviewer-16/typecheck-lint.log
docs/tools/reviewer-16/validate-content.log
docs/tools/reviewer-16/clean-clone-gate-worktree.log
docs/triggers/reviewer-16-programmer-08-home-tag-nav-top12-tags-page-COMPLETE.md
instructions/reviewer/processed/16-programmer-08-home-tag-nav-top12-tags-page.md
```
합계 41파일. **넣지 않는 것**: `docs/tools/planner-07/*`, `docs/qa/tester-01/`, `docs/tools/tester-01/`, 테스터 01 핸드오프·트리거·오더, `history/*`(슈퍼바이저 영역 — 슈퍼바이저 판단으로 별도 커밋), `content/`·`public/`.
커밋 뒤 `clean-clone-gate.sh --staged` → 푸시 → Vercel status `success` 확인(기존 절차).

## 8. 테스터 범위 제안 (임무 7, 배포 후)
1. **모바일 390px 실기기/실브라우저**: 홈·`/tag/dmz`·`/tag/1군단`의 태그 nav 높이와 첫 카드 위치. 리뷰어 재현값(srcdoc 방식, 실기기 아님): nav 130px, 첫 카드 top 638~658px(뷰포트 844 안), 가로 넘침 없음. 이 값과 크게 다르면 보고
2. **`/tags` 모바일**: 301칩 목록(재현 높이 2631px) 스크롤·줄바꿈, 가로 넘침 없음
3. **키보드**: 칩 → "전체 태그 보기" → 첫 카드 순서, 포커스 링 표시, Enter로 `/tags` 이동. `/tags`에서 Tab으로 301칩 순회
4. **VoiceOver(iOS Safari·macOS Safari)**: 칩 낭독("#dmz, 게시물 40건" 형태로 이어 읽히는지), 활성 칩 "현재 페이지" 낭독, `/tags` 목록 "목록, 301개 항목" 낭독(`role="list"` 효과), "전체 태그 보기 (301개)" 낭독
5. **배포 도메인 확인(curl 1~2회)**: `/tags` 200 · canonical이 배포 도메인 · sitemap에 `/tags` · `/en/tags` 404
6. 회귀: `/en` 태그 nav 없음, 활성 칩 대비는 P2-1 후속 처리 전까지 "기존 결함"으로만 기록

— 리뷰어 (Opus 5.5)
