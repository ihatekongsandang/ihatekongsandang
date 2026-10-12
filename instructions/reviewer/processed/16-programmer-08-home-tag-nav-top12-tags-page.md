# md오더: 리뷰어 (Opus 5.5) - 16-programmer-08-home-tag-nav-top12-tags-page

**작성일**: 2026-10-12 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 16
(안보 소재 수집기 구현 리뷰는 이후 번호로 미룬다.)

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·로그·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지. 변경 파일 전수 grep 포함.
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수. 프로그래머의 실측 수치를 그대로 믿지 말고 직접 재현한다. 확인 못 하면 "확인 필요".

## 선행 검토 문서 (Required)
- `CLAUDE.md`, `instructions/README.md`
- 오더: `instructions/programmer/processed/08-home-tag-nav-top12-tags-page.md`
- 핸드오프·트리거: `docs/handoffs/programmer-08-home-tag-nav-top12-tags-page.md`, `docs/triggers/programmer-08-home-tag-nav-top12-tags-page-COMPLETE.md`
- 로그: `docs/tools/programmer-08/*`
- 디자인: `docs/design/designer-01/proposal.md`, `docs/handoffs/designer-01-home-tag-nav-cleanup.md`
- 변경 코드: `src/lib/config.ts`, `src/components/tag-nav.tsx`, `src/app/(ko)/tags/page.tsx`(신규), `src/app/sitemap.ts`

## 사용자 확정 사항 (판정 기준)
- 메인 태그 상위 12개 + "전체 태그 보기 (N개)" → `/tags`.
- `/tag/[slug]`도 12개 상한, activeTag가 상위 밖이면 맨 앞에 붙여 13개.
- TagNav 서버 컴포넌트 유지, 새 의존성 없음, content/·public/ 무변경.

## 임무
1. **재현**: `npm run build` 후 `node docs/tools/programmer-08/measure-tag-nav.mjs --expect-limit 12` 실행. 홈·태그 피드·`/tags`·영어 페이지 칩 수와 `/tags` 링크 수 = 전체 태그 수를 **전수** 확인(업로더 게시로 수치가 바뀌었으면 그 시점 기준으로 판정).
2. **코드 리뷰**: 정렬·상한·activeTag 앞붙임 로직의 경계(activeTag가 정확히 12위·13위, 태그 0개·12개 이하, 인코딩이 필요한 태그명), `TagChip` 분리로 기존 칩 HTML이 바뀌지 않았는지(변경 전후 렌더 비교).
3. **접근성**: `aria-current`·`sr-only "게시물 N건"` 유지, "전체 태그 보기" 링크 접근 이름(Label in Name), `/tags`의 목록 의미·제목 구조. 핸드오프가 제기한 "활성 칩 건수 숫자 대비 낮음"(기존 동작)의 실제 대비값 측정과 P 등급 판정.
4. **SEO·라우팅**: `/tags` canonical·title·description·BreadcrumbList, sitemap 항목, robots·미들웨어 영향 없음, `/en/tags` 404 동작이 기존 정책과 맞는지. 내부 링크 그래프(모든 `/tag/*`가 `/tags`에서 1회 이상 링크되는지).
5. **게이트**: typecheck·lint·validate:content·`bash docs/tools/programmer-07/clean-clone-gate.sh --worktree` 재실행 결과.
6. **커밋 대상 확정**: 핸드오프 목록을 검토하고, 디자이너 01 산출물(`docs/design/designer-01/`, 디자이너 핸드오프·트리거, `instructions/designer/processed/01-…`)을 같은 묶음에 넣을지 판정. 스크린샷 용량 포함.
7. **테스터 범위 제안**: 배포 후 테스터가 확인할 항목(모바일 390px 칩 영역 높이, 키보드 탭 순서, 스크린리더 낭독 등).

## 산출물 (Required)
- `docs/reviews/programmer-08-home-tag-nav-top12-tags-page-review.md` — 판정(승인/조건부/반려) · 결함(P1/P2/P3) · 커밋 대상 최종 목록 · 테스터 범위
- `docs/tools/reviewer-16/` — 재현 명령·결과 로그

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-16-programmer-08-home-tag-nav-top12-tags-page-COMPLETE.md` **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 🔴 코드 수정, git add·commit·push 금지. 판정과 수정 지시만 리뷰에 적는다.
- `content/`·`public/` 건드리지 않는다(업로더 동시 작업 중). 빌드는 이 세션에서만 직렬로.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 16-programmer-08-home-tag-nav-top12-tags-page`
- 판정 · 리뷰 경로 · 재현 수치 · 결함 · 커밋 대상 · 테스터 범위
- history/{오늘}.md에 `## [HH:MM] 리뷰어 16 — 지시 → 행동 → 결과` append
- 말미: `— 리뷰어 (Opus 5.5) · 16-programmer-08-home-tag-nav-top12-tags-page 종료 —`
