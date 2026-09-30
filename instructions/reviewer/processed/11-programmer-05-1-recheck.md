# md오더: 리뷰어 (Opus 5.5) - 11-programmer-05-1-recheck

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 11
**세션**: 새 세션 권장 (리뷰어 10 세션을 이어 써도 됨).
**대상**: 프로그래머 05-1 — 리뷰 10 지적사항 수정 (05 + 05-1 모두 미커밋 작업 트리)

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5). 리뷰 10(🟡 조건부 승인)의 D1과 P2 반영을 **간이 재확인**하고 최종 판정한다. 코드 직접 수정 금지 · 🔴 커밋 금지. 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- 리뷰 10: `docs/reviews/programmer-05-english-pages-review.md` (§1 D1 · §4 · §5 · §7)
- 오더: `instructions/programmer/processed/05-1-english-pages-fix.md`
- 핸드오프: `docs/handoffs/programmer-05-1-english-pages-fix.md` (재실측 숫자·결정 1~8·미해결 1~5)
- 트리거: `docs/triggers/programmer-05-1-english-pages-fix-COMPLETE.md`

## 임무 (간이 재확인 — 핸드오프 §다음 세션 가이드 기준)
1. **D1**: `render-404-checks.mjs` 전수(144건) + `reviewer-10/render-404.mjs` HEAD↔작업 6경로. 범위 밖 `?page=` 3경로가 사이트 404로 돌아왔는지, 상태 404 유지, `/en?page=99` 영어 404.
2. **정적 동일성**: 수정 전(05 상태) ↔ 수정 후 정적 HTML 비교 — 차이가 핸드오프가 밝힌 2건(`_not-found.html` JSON-LD · 샘플 영어 상세)뿐인지 숫자로 확인. HEAD 대비 한국어 의도 외 차이 0.
3. **attribution**: 규칙 25건 실행 · 핸들 누락 경고 · `MixedLangText`가 한국어 페이지 출력을 바꾸지 않는지(정적 비교로) · README §9 안내 확인.
4. **P2-1·P2-3·P2-4** 반영 확인.
5. validate · typecheck · lint · build 게이트, 독립 grep 0.
6. 포커스 가림 전수는 정적 동일성 확인으로 대체 가능(차이 2건이 탭 정지점에 영향 없는지 판단 근거를 적을 것).
7. 핸드오프 미해결 1(그룹 404 robots 메타 중복, HEAD 동일)은 판단만 적어 달라 — 후속 과제 여부.

## 산출물 · 핸드오프
- 리뷰: `docs/reviews/programmer-05-1-english-pages-fix-review.md` (판정 · 재실측 숫자 · 지적사항 · 커밋 대상 파일 목록 확인)
- 🔴 트리거: `docs/triggers/reviewer-11-programmer-05-1-recheck-COMPLETE.md` (필수)
- 이 오더를 `instructions/reviewer/processed/`로 이동 · history 기록
- **커밋 금지** — 승인 시 슈퍼바이저가 05 + 05-1 + 리뷰 10·11 산출물을 함께 커밋

## 완료 보고 양식
```
📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 11-programmer-05-1-recheck
- 판정 · 재실측 숫자 · 지적사항(P0/P1/P2) · 후속 과제
```
