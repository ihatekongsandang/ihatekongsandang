# md오더: 기획자 (Sonnet 5) - 08-1-news-format-conversion-revise

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 08-1

---

## 자격·역할 (Required)
기획자 (Sonnet 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 기획서·도구·핸드오프·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 근거가 없으면 "확인 필요".

## 배경
- 기획자 08 산출물(`planning/news-format-conversion.md`)이 리뷰 20에서 🔴 반려(P1 4 · P2 6 · P3 5)됐다. 리뷰의 **수정 지시를 전부 반영**해 재검토에 올린다.
- 사용자 확정 사항(다시 다투지 않음): 형식만 뉴스형 · 인터넷신문 등록 안 함(운영자 익명 유지) · 편집 정책 완화 안 함.

## 선행 검토 문서 (Required)
- 🔴 `docs/reviews/planner-08-news-format-conversion-spec-review.md` (리뷰 20, 커밋 b91835e) — §3 결함별 "수정 지시", §2 법적 선 결론, §5 사용자 결정 목록 수정본
- `docs/tools/reviewer-20/law-check-log.md`, `today-issue-empty-days-output.txt`
- 기존 산출물: `planning/news-format-conversion.md`, `docs/tools/planner-08/check-log.md`, `docs/handoffs/planner-08-news-format-conversion-spec.md`
- `instructions/planner/processed/08-news-format-conversion-spec.md`(원 오더, §통계)
- `docs/poster/guide.md` §1-1, `docs/reviews/supervisor-topic-pivot-policy-review.md`(리뷰 18 정정치)

## 임무
1. P1-1~P1-4, P2-1~P2-6, P3-1~P3-5의 **수정 지시를 하나씩 반영**한다. 지시가 선택지를 주면(예: P2-3 조건부 섹션 vs 연기) 하나를 고르고 이유를 적는다.
2. 법적 선(P1-1·P1-2): 리뷰 §2 결론("확인 필요")과 위험 완화 운영 방식을 기획서에 새 절로 넣는다. "해당하지 않는다"고 단정하지 않는다. 게시 빈도 목표를 적는 곳마다 이 쟁점을 함께 적는다.
3. 사용자 결정 목록을 리뷰 §5 수정본(D1~D7)으로 바꾼다. 각 항목에 번호 선택지·장단점·권장안을 적는다(사용자가 그대로 고를 수 있게).
4. check-log에 수정 반영 대조표(결함 번호 → 고친 위치·전후 요지)를 추가한다.

## 산출물 (Required)
- 수정: `planning/news-format-conversion.md`, `docs/tools/planner-08/check-log.md`
- 핸드오프 `docs/handoffs/planner-08-1-news-format-conversion-revise.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-08-1-news-format-conversion-revise-COMPLETE.md` **완료 트리거 파일 생성 필수** (결함별 반영 여부 표 15행·D1~D7 요약·변경 파일)
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 결정 사항·제약
- 코드·content·PRD·guide 수정 금지. git add·commit·push 금지. 빌드 불필요.
- 리뷰 지시와 다르게 하려면 이유를 핸드오프에 적는다(임의 생략 금지).

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 기획자 (Sonnet 5) · 08-1-news-format-conversion-revise`
- 결함별 반영 표 · D1~D7 · 변경 파일
- history/{오늘}.md에 `## [HH:MM] 기획자 08-1 — 지시 → 행동 → 결과` append
- 완료 시 반공-슈퍼바이저에 SendMessage로 완료 보고
- 말미: `— 기획자 (Sonnet 5) · 08-1-news-format-conversion-revise 종료 —`
