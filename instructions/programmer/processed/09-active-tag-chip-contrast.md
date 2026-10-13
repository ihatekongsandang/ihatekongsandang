# md오더: 프로그래머 (Opus 5) - 09-active-tag-chip-contrast

**작성일**: 2026-10-13 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 09

---

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 코드·주석·핸드오프·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수. 대비값은 계산이 아니라 렌더 결과에서 실측한다. 확인 못 하면 "확인 필요".

## 배경
리뷰어 16 P2-1(`docs/reviews/programmer-08-home-tag-nav-top12-tags-page-review.md` §3·§6): 활성 태그 칩(검정 배경 `bg-foreground`)의 건수 숫자가 `text-muted-foreground`(#52525b on #18181b) 그대로라 대비 **2.29:1** — WCAG 1.4.3 AA(4.5:1) 미달. 프로그래머 08 이전부터 있던 결함이지만, 이제 상위 밖 태그 페이지 289쪽에서 활성 칩이 맨 앞에 와 더 눈에 띈다. 테스터 02(`docs/qa/tester-02/report.md`)는 신규 결함 0건, 이 항목은 기존 결함으로 기록.

## 선행 검토 문서 (Required)
- `CLAUDE.md`, `instructions/README.md`
- 위 리뷰 §3·§6, `docs/qa/tester-02/report.md`, `docs/tools/tester-02/measure-log.md` §2(nav 측정 함수)
- `src/components/tag-nav.tsx`(`TagChip`), `src/components/ui/badge.tsx`, `src/app/globals.css`(색 토큰)

## 임무
1. 활성 칩의 건수 숫자 색을 4.5:1 이상으로 바꾼다. 비활성 칩 숫자(현재 7.03:1)·칩 문구·`/tags` 칩 모양은 그대로 둔다. 최소 변경(`TagChip` 안 클래스 수준) 권고, 새 토큰이 필요하면 근거를 핸드오프에 적는다.
2. 실측: 빌드 산출물(또는 로컬 서버)에서 활성 칩 숫자의 computed color·배경색으로 대비를 계산해 기록(변경 전/후). 비활성 칩 숫자 대비가 바뀌지 않았는지도 기록.
3. 회귀: 칩 HTML이 클래스 외에는 바뀌지 않았는지(변경 전후 `<a>` 비교), `node docs/tools/programmer-08/measure-tag-nav.mjs --expect-limit 12` 통과, typecheck·lint·`npm run validate:content`·build·`bash docs/tools/programmer-07/clean-clone-gate.sh --worktree`.

## 산출물 (Required)
- 코드 변경(위 범위만)
- `docs/tools/programmer-09/` — 대비 실측·회귀 로그
- 핸드오프 `docs/handoffs/programmer-09-active-tag-chip-contrast.md` — **리뷰어에게 넘길 커밋 대상 경로 목록 포함**

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-09-active-tag-chip-contrast-COMPLETE.md` **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 결정 사항·제약
- 🔴 git add·commit·push 금지(리뷰어 게이트 후 슈퍼바이저가 커밋).
- `content/`·`public/` 수정 금지(업로더 동시 작업 중). 새 의존성 설치 금지. `docs/tools/` 안에 `.ts`·`.tsx` 파일을 두지 않는다(typecheck 대상이 됨 — 리뷰 16 §5).
- 빌드는 이 세션에서만 직렬로.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 09-active-tag-chip-contrast`
- 변경 파일 · 대비 전/후 · 검사 결과 · 확인 필요 · 커밋 대상
- history/{오늘}.md에 `## [HH:MM] 프로그래머 09 — 지시 → 행동 → 결과` append
- 말미: `— 프로그래머 (Opus 5) · 09-active-tag-chip-contrast 종료 —`
