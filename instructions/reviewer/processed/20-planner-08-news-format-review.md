# md오더: 리뷰어 (Opus 5.5) - 20-planner-08-news-format-review

**작성일**: 2026-11-05 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 20

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·도구·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반 · 전수 지시는 전수. 법령은 원문 조문으로 확인(korean-law 도구), 검색엔진 정책은 공식 문서로 확인. 근거가 없으면 "확인 필요".

## 배경
- 사용자 지시(2026-11-05): "반공 사이트를 뉴스 사이트로 바꾸고 싶다. 더 많은 사람이 보게." 사용자 확정: **형식만 뉴스형, 인터넷신문 등록 안 함(운영자 익명 유지).**
- 기획자 08 산출물이 나왔다. CLAUDE.md §5 기획자 리뷰 중점(정책 충돌·우선순위·사용자 요청 누락·저작권 정책)으로 검토한다.

## 선행 검토 문서 (Required)
- 대상: `planning/news-format-conversion.md`, `docs/tools/planner-08/check-log.md`, `docs/handoffs/planner-08-news-format-conversion-spec.md`, `docs/triggers/planner-08-news-format-conversion-spec-COMPLETE.md`
- 오더: `instructions/planner/processed/08-news-format-conversion-spec.md` (특히 §통계와 슈퍼바이저 해석 메모)
- `CLAUDE.md`, `planning/prd.md`, `src/lib/seo.ts`, `docs/poster/guide.md`(§1-1 확정본, 커밋 f03ea54), `docs/supervisor/link-selection-guide.md`
- `docs/reviews/supervisor-topic-pivot-policy-review.md`(리뷰 18 — 기준선 수치 정정·인스타그램 수집 실패 18건), `docs/reviews/supervisor-topic-pivot-policy-recheck-review.md`(리뷰 19)
- `docs/reviews/planner-07-security-feed-collector-spec-review.md`(리뷰 15)
- 현재 화면 확인용: `src/components/tag-nav.tsx`, `src/app/(ko)/tags/page.tsx`, 홈 페이지 소스

## 임무
1. **🔴 법적 선 재검증 (최우선)**
   - 신문법 제2조 5호 **"인터넷뉴스서비스"**(다른 매체 기사를 "계속적으로 제공하거나 매개"하는 전자간행물)에 이 사이트가 해당할 가능성을 원문 조문·시행령·판례·주무부처 해석으로 검토한다. 기획서는 정의를 인용만 하고 해당 여부를 판단하지 않았다. 해당하면 제9조 등록·제39조 과태료 대상이 되고, "형식만 뉴스형" 전환이 이 위험을 키우는지도 판단한다.
   - 시행령 제2조 인터넷신문 기준(주간 기사 30% 이상 "자체 생산")에서, 이 사이트의 직접 쓴 요약이 "자체 생산 기사"로 볼 여지가 있는지 검토한다.
   - 결론이 불확실하면 "확인 필요"와 함께 위험을 낮추는 운영 방식(예: 표현·구성)을 제안한다. 등록 여부 결정 자체는 다시 다투지 않는다.
2. **기준선·사실관계 대조**
   - §2.1 기준선이 리뷰 18 정정치(게시 불가 22·보류 9·병합 6·신규 7, 인스타그램 수집 실패 18)와 다르다. 영향 범위를 판정한다. 특히 **인스타그램 수집 실패가 게시량 문제의 큰 원인**이라는 점이 소재 확보 비교(§2.2·§2.4)에서 빠졌는지 본다.
   - §2.2 (b)가 "선거 부정 주장류 … 공식 대응 보도가 있는 유형에 직접 들어맞는다"고 쓴 부분이 guide §1-1 0항(선거 부정 주장 보도 제외)과 충돌하는지 본다.
   - §2.2 (a) "이미 이 방식으로 운영 중"이 사실인지 본다(링크 선별 안내는 2026-11-05 신설).
   - §3.4가 기술한 현재 화면(홈 상위 12개 태그 칩 + `/tags` 전체)이 실제 코드와 맞는지, 제안이 이미 구현된 것의 반복인지 본다.
   - §0의 "두 검색엔진 모두에서 성장이 멈추거나 역전" 같은 인과 서술이 오더 §통계의 "인과 확인 필요" 메모보다 단정적인지 본다.
3. **제안의 실효성**
   - §3.2 "오늘의 이슈"(24~48시간): 현재 게시 빈도(10/24~11/04 신규 0)에서 빈 섹션이 되는 문제를 다뤘는지 본다.
   - §4.1 `BackgroundNewsArticle` 다중 타입 제안: schema.org·Google 공식 문서로 검증하고, 기존 `Article` 결정 근거와 비교한다.
   - §4.3 네이버: check-log §4가 2차 출처(업계 블로그·기자협회보)에 기대고 있다. 1차 출처로 확인 가능한지 본다.
   - §4.5 공유 기능 분리 제안이 PRD §7·계정 분리 원칙과 맞는지 본다.
4. **사용자 결정 목록(D1~D5)·확인 필요 목록의 누락**을 점검한다. 특히 위 1번 결과로 사용자 결정 항목이 추가돼야 하는지 판단한다.
5. 저작권·출처 원칙: check-log의 인용 분량이 짧은 인용 범위인지 본다(리뷰 15 P1-1 선례).

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-08-news-format-conversion-spec-review.md`
- 측정·조회 도구가 있으면 `docs/tools/reviewer-20/`

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-20-planner-08-news-format-review-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·결함 수·사용자 결정 필요 목록·커밋 대상)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 대상 문서·코드·content·PRD 수정 금지. 수정은 지시로 적는다. git add·commit·push 금지. 빌드 불필요.
- 인터넷신문 미등록, 편집 정책 비완화는 다시 다투지 않는다.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 20-planner-08-news-format-review`
- 판정 · 결함 표 · 법적 선 결론 · 사용자 결정 필요 목록(수정본) · 커밋 대상
- history/{오늘}.md에 `## [HH:MM] 리뷰어 20 — 지시 → 행동 → 결과` append
- 말미: `— 리뷰어 (Opus 5.5) · 20-planner-08-news-format-review 종료 —`
