# md오더: 기획자 (Sonnet 5) - 08-3-check-log-media-arbitration-fix

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 08-3

## 자격·역할 (Required)
기획자 (Sonnet 5). CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지.

## 배경
리뷰 23(`docs/reviews/planner-08-2-news-format-scoped-recheck-review.md`)이 조건부 승인했다. 커밋 조건은 R-P1-1 정정이다. 08-2 트리거·§10은 "check-log §2 전면 정정"으로 보고했지만, 실제 49~54행은 08-1 문구("등록된 사업자 … 이 사이트에 적용되지 않는다") 그대로다.

## 임무
1. 🔴 **R-P1-1**: `docs/tools/planner-08/check-log.md` §2(언론중재법)를 정정한다. `docs/tools/reviewer-21/law-check-log.md` A·B를 재인용하고, 결론은 "적용 여부 확인 필요(§1.0 해당성에 종속)"로 쓴다. 고친 뒤 파일을 다시 Read해 실제 반영을 확인한다(보고와 파일 불일치 재발 방지).
2. 리뷰 23 P3 7건을 같이 고친다(리뷰 §해당 절 지시 그대로). 주제 전환 갱신 3건의 분류, §2.2(b) 11/08 3건, check-log §5 "구글 1차 채널", 366행 "D3 확정", 구 핸드오프 §44의2①3호→§2①3호, 서울신문 "03-31", 언론중재법 18·19호 서술이다.
3. 핸드오프 `docs/handoffs/planner-08-3-check-log-media-arbitration-fix.md`를 작성한다. 고친 행 번호와 고치기 전후 문구를 적는다.

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-08-3-check-log-media-arbitration-fix-COMPLETE.md` **완료 트리거 파일 생성 필수** (R-P1-1 정정 전후 문구 원문 인용·P3 7건 반영 표)
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 제약
- 지정 위치 외 수정·코드·content·PRD·guide 수정 금지. git 금지. 빌드 불필요.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 기획자 (Sonnet 5) · 08-3-check-log-media-arbitration-fix`. history/2026-11-08.md append. 완료 시 반공-슈퍼바이저에 SendMessage.
