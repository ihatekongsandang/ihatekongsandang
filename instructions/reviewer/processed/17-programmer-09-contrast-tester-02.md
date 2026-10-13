# md오더: 리뷰어 (Opus 5.5) - 17-programmer-09-contrast-tester-02

**작성일**: 2026-10-13 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 17

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·로그·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지. 커밋 후보 전수 grep(이미지 메타 포함).
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수. 프로그래머·테스터 수치를 그대로 믿지 말고 직접 재현한다. 확인 못 하면 "확인 필요".

## 대상 (두 묶음)
**A. 프로그래머 09 — 활성 태그 칩 건수 숫자 대비** (리뷰 16 P2-1 후속)
- 오더 `instructions/programmer/processed/09-active-tag-chip-contrast.md`, 핸드오프 `docs/handoffs/programmer-09-active-tag-chip-contrast.md`, 트리거, 로그 `docs/tools/programmer-09/`
- 코드: `src/components/tag-nav.tsx` (`git diff -- src`, 2줄)
- 주장: 활성 2.29:1 → 9.14:1(311칩 전수), 비활성 7.03:1 불변(4203칩), 칩 `<a>` 4514개 class 외 차이 0

**B. 테스터 02 — 배포본 QA(태그 nav 상위 12 + `/tags`)** (코드 변경 없음, 커밋 전 검증)
- 오더 `instructions/tester/processed/02-deployed-tag-nav-top12.md`, 보고서 `docs/qa/tester-02/report.md`, 로그 `docs/tools/tester-02/measure-log.md`, 핸드오프·트리거, 스크린샷 8장
- 참고: 테스터 01은 요약 수치가 본문 표와 맞지 않아 리뷰 14에서 P2를 받았다. 같은 유형을 중점 확인.

## 임무
1. **A 코드·재현**: diff 검토, 대비를 직접 재현(`docs/tools/programmer-09/README.md` §4 또는 독립 방법). 비활성·`/tags` 칩 회귀, `measure-tag-nav.mjs --expect-limit 12`, typecheck·lint·validate:content·build·`clean-clone-gate.sh --worktree`. `color-mix` 미지원 대체 경로(핸드오프 확인 필요 항목)를 빌드 CSS로 확인.
2. **A 도구 파일**: `docs/tools/programmer-09/`의 `.mjs` 스크립트가 lint·typecheck·빌드에 영향 없는지, 임시 서버 스크립트가 커밋해도 되는 내용인지.
3. **B 보고서 검증**: 요약 표 ↔ 본문 표 ↔ 로그 수치 일치(전 항목), "확인 필요" 범위가 실제로 못 한 것만 담는지, 결론이 과장되지 않았는지. 배포본으로 핵심 수치(칩 12, `/tags` 301 또는 측정 시점 값, `/en` nav 0) 소량 재확인.
4. **B 도구 메모**: `resize_window` 무반응, `X-Frame-Options: DENY`, "screenshot 선행 시에만 key 전달" 메모가 사실 서술 수준인지(추측 단정 없는지).
5. **커밋 대상 확정**: A·B 각 핸드오프 목록을 검토해 한 묶음 최종 목록 작성. `history/*`는 넣지 않는다(슈퍼바이저가 별도 판단).

## 산출물 (Required)
- `docs/reviews/programmer-09-contrast-tester-02-review.md` — A·B 각각 판정(승인/조건부/반려) · 결함(P1/P2/P3) · 커밋 대상 최종 목록
- `docs/tools/reviewer-17/` — 재현 명령·결과 로그(`.ts`·`.tsx` 파일 두지 않기)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-17-programmer-09-contrast-tester-02-COMPLETE.md` **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 🔴 코드·보고서 수정, git add·commit·push 금지. 판정과 수정 지시만 리뷰에 적는다.
- `content/`·`public/` 건드리지 않는다(업로더 동시 작업 중). 빌드는 이 세션에서만 직렬로.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 17-programmer-09-contrast-tester-02`
- A·B 판정 · 리뷰 경로 · 재현 수치 · 결함 · 커밋 대상
- history/{오늘}.md에 `## [HH:MM] 리뷰어 17 — 지시 → 행동 → 결과` append
- 말미: `— 리뷰어 (Opus 5.5) · 17-programmer-09-contrast-tester-02 종료 —`
