# md오더: 리뷰어 (Opus 5.5) - 23-planner-08-2-news-format-scoped-recheck

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 23

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 근거가 없으면 "확인 필요".

## 배경
- 리뷰 21(커밋 91d52e8)이 범위 한정 재수정을 지시했고, 기획자 08-2가 지정 위치 13곳을 고쳤다고 보고했다.

## 선행 검토 문서 (Required)
- 리뷰 21 `docs/reviews/planner-08-1-news-format-conversion-recheck-review.md` §4·§5
- `docs/handoffs/planner-08-2-news-format-conversion-scoped-fix.md`, `docs/triggers/planner-08-2-news-format-conversion-scoped-fix-COMPLETE.md`
- 대상: `planning/news-format-conversion.md`, `docs/tools/planner-08/check-log.md`, `docs/handoffs/planner-08-news-format-conversion-spec.md`(25행 정정)
- 08-1 이후 사실: `docs/tools/programmer-10/instagram-collect-report.md`, `docs/triggers/poster-2026-11-08-instagram-recollect-24-COMPLETE.md`

## 임무
1. 리뷰 21 §4 지시별 반영 여부를 지정 위치에서 확인한다(전수).
2. 고친 위치 주변에 새 오류·모순이 생겼는지 본다(특히 갱신한 수치, 언론중재법 문구, D2·D6).
3. D1~D7이 사용자에게 그대로 보낼 수 있는 상태인지 최종 판정한다.
4. 승인 시 커밋 대상 목록(기획자 08·08-1·08-2 산출물 전부 + 리뷰어 산출물)을 확정한다.

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-08-2-news-format-scoped-recheck-review.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-23-planner-08-2-news-format-scoped-recheck-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·반영 집계·잔여 결함·D1~D7 발송 가능 여부·커밋 대상 경로 목록)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 대상 수정 금지. git add·commit·push 금지. 빌드 불필요.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 23-planner-08-2-news-format-scoped-recheck`
- history/{오늘}.md에 `## [HH:MM] 리뷰어 23 — 지시 → 행동 → 결과` append
- 완료 시 반공-슈퍼바이저에 SendMessage로 완료 보고
- 말미: `— 리뷰어 (Opus 5.5) · 23-planner-08-2-news-format-scoped-recheck 종료 —`
