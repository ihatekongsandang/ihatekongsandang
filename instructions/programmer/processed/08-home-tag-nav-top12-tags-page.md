# md오더: 프로그래머 (Opus 5) - 08-home-tag-nav-top12-tags-page

**작성일**: 2026-10-12 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 08
(안보 소재 수집기 구현 오더는 사용자 결정 대기 중이며, 발행 시 09 이후 번호를 쓴다.)

---

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 코드·주석·핸드오프·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수. 확인 못 하면 "확인 필요".

## 선행 검토 문서 (Required)
- `CLAUDE.md`, `instructions/README.md`
- `docs/design/designer-01/proposal.md`(시안 A), `docs/design/designer-01/mockup-a-top-n-tags-page.html`, `docs/handoffs/designer-01-home-tag-nav-cleanup.md`
- `src/components/tag-nav.tsx`, `src/components/feed-view.tsx`, `src/lib/content/load.ts`(`getAllTags` — 건수 내림차순·가나다 정렬), `src/app/sitemap.ts`, `src/app/(ko)/tag/[slug]/`, 미들웨어(있으면)

## 사용자 확정 사항 (2026-10-12)
- **시안 A 채택**: 메인 태그는 상위 12개만 노출 + "전체 태그 보기" 링크 → 신규 `/tags` 페이지.
- **`/tag/[slug]` 페이지에도 같은 12개 상한 적용**. 단 현재 보고 있는 태그(activeTag)가 상위 12개 밖이면 그 태그를 맨 앞에 붙여 `aria-current="page"` 상태로 보이게 한다(이 경우 13개 노출 허용).

## 임무
1. `TagNav`
   - 상한 12개(상수로 분리). 정렬은 `getAllTags` 순서 그대로.
   - 끝에 "전체 태그 보기 (N개)" 링크(N = 전체 태그 수, 하드코딩 금지) → `/tags`.
   - 서버 컴포넌트 유지(`'use client'` 금지). 기존 `aria-current`·`sr-only "게시물 N건"`·포커스 링 유지.
2. `/tags` 신규 페이지 (`src/app/(ko)/tags/page.tsx`, 완전 정적)
   - 전체 태그를 건수 순으로 보여 준다(가나다 정렬 전환이 필요하면 정적으로 두 목록 중 하나만 — 클라이언트 상태 금지, 권고는 건수 순 단일 목록).
   - 각 태그 → `/tag/{encodeURIComponent(tag)}`, 건수 표기와 스크린리더 안내는 TagNav와 같은 방식.
   - 기존 페이지와 같은 metadata 구성(title·description·canonical·OG). 페이지 제목 예: "전체 태그".
   - sitemap에 `/tags` 추가. 미들웨어·robots·canonical 처리에서 `/tags`가 막히거나 `/tag/...`로 오인되지 않는지 확인.
   - 영어 사이트(`/en`)에는 태그 칩이 없으므로 영어 대응 페이지는 만들지 않는다. `/en/tags` 접근 시 동작(404 등)을 실측해 보고.
3. 회귀 확인
   - 메인·`/tag/{상위 태그}`·`/tag/{1건짜리 태그}`·`/tags`·`/en` 렌더 결과를 빌드 산출물에서 확인: 메인/태그 페이지 칩 수(12 또는 13), `/tags` 링크 수 = 전체 태그 수(전수 대조), activeTag 처리.
   - 정적 페이지 수 변화 보고(기존 708 → +1 예상, 실측).
   - `npm run validate:content`, 타입 검사, 빌드, `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree`(또는 리뷰어용으로 적절한 모드) 결과 보고.
4. 범위 밖(하지 말 것): 태그 표기 통일(`dmz`→`DMZ`, `6-25전쟁`/`625전쟁` 등)은 콘텐츠 작업이라 손대지 않는다.

## 산출물 (Required)
- 코드 변경(위 범위만)
- `docs/tools/programmer-08/` — 실측 로그(칩 수·링크 수 전수 대조, 빌드 요약)
- 핸드오프 `docs/handoffs/programmer-08-home-tag-nav-top12-tags-page.md` — **리뷰어에게 넘길 커밋 대상 경로 목록 포함**

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-08-home-tag-nav-top12-tags-page-COMPLETE.md` **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 결정 사항·제약
- 🔴 git add·commit·push 금지(리뷰어 게이트 후 슈퍼바이저가 커밋).
- `content/`·`public/` 수정 금지(업로더 동시 작업 중). 새 의존성 설치 금지.
- 빌드 시 `.next`를 다른 세션과 공유하므로 빌드는 이 세션에서만 직렬로 수행.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 08-home-tag-nav-top12-tags-page`
- 변경 파일 · 실측(칩 수·`/tags` 링크 수·정적 페이지 수) · 검사 결과 · 확인 필요 · 커밋 대상
- history/{오늘}.md에 `## [HH:MM] 프로그래머 08 — 지시 → 행동 → 결과` append
- 말미: `— 프로그래머 (Opus 5) · 08-home-tag-nav-top12-tags-page 종료 —`
