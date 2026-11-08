# md오더: 리뷰어 (Opus 5.5) - 21-planner-08-1-news-format-recheck

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 21

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·도구·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 법령은 원문 조문으로 확인(korean-law 도구). 근거가 없으면 "확인 필요".

## 배경
- 리뷰 20(커밋 b91835e)이 기획자 08 뉴스형 전환 기획서를 🔴 반려(P1 4·P2 6·P3 5)했다. 기획자 08-1이 15건 전부 반영했다고 보고했다.
- 사용자 결정 이미 내려진 것: D7 = 7b(프로그래머 10 인스타그램 수집 조사 먼저, 2026-11-08 진행 중). 인터넷신문 미등록·편집 정책 비완화는 다시 다투지 않는다.

## 선행 검토 문서 (Required)
- 🔴 리뷰 20 `docs/reviews/planner-08-news-format-conversion-spec-review.md`, `docs/tools/reviewer-20/`
- 대상: `planning/news-format-conversion.md`(전면 재작성), `docs/tools/planner-08/check-log.md`(§9 대조표), `docs/handoffs/planner-08-1-news-format-conversion-revise.md`, `docs/triggers/planner-08-1-news-format-conversion-revise-COMPLETE.md`
- 오더 `instructions/planner/processed/08-1-news-format-conversion-revise.md`
- `docs/poster/guide.md` §1-1, `planning/prd.md`, `src/lib/seo.ts`, `CLAUDE.md`

## 임무
1. **15건 반영 대조**: 리뷰 20의 결함별 "수정 지시"와 기획서 실제 문구를 하나씩 대조해 반영/부분/미반영 판정(15/15 전수). check-log §9 대조표의 위치 표기가 실제와 맞는지도 본다.
2. **재작성으로 새로 생긴 문제**: 전면 재작성 과정의 새 사실 오류·내부 모순·근거 없는 단정·법령 인용 오류(조문 번호·시행일)를 찾는다. 특히 §1.0(등록 해당성)·§1.3(정보통신망법)·§3.2 조건부 섹션(P2-3에서 '연기' 대신 고른 이유가 타당한지).
3. **D1~D7**: 사용자가 번호만 골라도 되는 형태인지, 권장안이 리뷰 20 결론(특히 D3 Article 유지·D6 위험 처리)과 맞는지, D7이 "결정됨"으로 적혔는지.
4. 저작권·인용 분량, 저장소 독립.

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-08-1-news-format-conversion-recheck-review.md`
- 측정·조회 도구가 있으면 `docs/tools/reviewer-21/`

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-21-planner-08-1-news-format-recheck-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·15건 반영 집계·신규 결함·사용자 결정 목록 확정본·커밋 대상)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 대상 문서·코드·content·PRD 수정 금지. 수정은 지시로 적는다. git add·commit·push 금지. 빌드 불필요.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 21-planner-08-1-news-format-recheck`
- 판정 · 15건 반영 집계 · 신규 결함 표 · D1~D7 확정본 · 커밋 대상
- history/{오늘}.md에 `## [HH:MM] 리뷰어 21 — 지시 → 행동 → 결과` append
- 완료 시 반공-슈퍼바이저에 SendMessage로 완료 보고
- 말미: `— 리뷰어 (Opus 5.5) · 21-planner-08-1-news-format-recheck 종료 —`
