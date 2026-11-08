# md오더: 기획자 (Sonnet 5) - 08-2-news-format-conversion-scoped-fix

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 08-2

---

## 자격·역할 (Required)
기획자 (Sonnet 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 기획서·도구·핸드오프·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 근거가 없으면 "확인 필요".

## 배경
- 리뷰 21(커밋 91d52e8)이 08-1을 🔴 반려했다: 리뷰 20 지시 반영 11·부분 4, 신규 P1 1(언론중재법 적용 정정)·P2 5·P3 5. **범위 한정 재수정** — 리뷰 21 §4의 지정 위치만 고친다. 전면 재작성 금지.
- 08-1 이후 확정된 사실: 프로그래머 10(인스타그램 수집 실패 원인 = 업로더 UA 변경, `docs/tools/programmer-10/instagram-collect-report.md`) · 업로더 재처리 26건 완료(커밋 14cd427·9571333 — 게시 5·병합 4·게시 불가 14·보류 1·열람 불가 2, 남은 캡처 0, `docs/triggers/poster-2026-11-08-instagram-recollect-24-COMPLETE.md`). D7은 7b로 결정됐고 이행 완료.

## 선행 검토 문서 (Required)
- 🔴 `docs/reviews/planner-08-1-news-format-conversion-recheck-review.md` — §2 부분 반영 4건, §3 신규 결함, **§4 08-2 수정 지시**, §5 D1~D7 확정본
- `docs/tools/reviewer-21/`(law-check-log.md, published-count-output.txt)
- 위 프로그래머 10 보고서·업로더 재처리 트리거
- 대상: `planning/news-format-conversion.md`, `docs/tools/planner-08/check-log.md`, `docs/handoffs/planner-08-1-news-format-conversion-revise.md`

## 임무
1. 리뷰 21 §4 수정 지시를 **지정 위치에만** 반영한다(부분 반영 4 + N-P1 1 + N-P2 5 + N-P3 5). 지시가 '연기'를 권고한 항목(N-P2-3 §3.2)은 권고대로 한다. 다르게 하려면 이유를 핸드오프에 적는다.
2. 사용자 결정 목록을 리뷰 21 §5 확정본으로 맞춘다(D2·D6 문구 수정, D3 "권고"로, D7 "결정됨·이행 완료").
3. check-log §9 대조표에 08-2 반영 행을 추가한다.

## 산출물 (Required)
- 수정: `planning/news-format-conversion.md`, `docs/tools/planner-08/check-log.md`, (리뷰 지시 시) 08-1 핸드오프 문구
- 핸드오프 `docs/handoffs/planner-08-2-news-format-conversion-scoped-fix.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-08-2-news-format-conversion-scoped-fix-COMPLETE.md` **완료 트리거 파일 생성 필수** (리뷰 21 지시별 반영 표·변경 위치·D1~D7)
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 결정 사항·제약
- 지정 위치 외 수정 금지. 코드·content·PRD·guide 수정 금지. git add·commit·push 금지. 빌드 불필요.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 기획자 (Sonnet 5) · 08-2-news-format-conversion-scoped-fix`
- history/{오늘}.md에 `## [HH:MM] 기획자 08-2 — 지시 → 행동 → 결과` append
- 완료 시 반공-슈퍼바이저에 SendMessage로 완료 보고
- 말미: `— 기획자 (Sonnet 5) · 08-2-news-format-conversion-scoped-fix 종료 —`
