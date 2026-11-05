# md오더: 리뷰어 (Opus 5.5) - 19-topic-pivot-policy-recheck

**작성일**: 2026-11-05 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 19

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수.
- 🔴 **저장소 독립 원칙**: 리뷰·도구·트리거에 다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- **대전제**: 추측 금지 · 실측 기반. 근거가 없으면 "확인 필요".

## 배경
- 리뷰 18(`docs/reviews/supervisor-topic-pivot-policy-review.md`)은 🟠 조건부 승인(P1 2 · P2 5 · P3 5)이었다.
- 슈퍼바이저가 P1·P2·P3를 **전부** 반영했다. 리뷰 18 §7은 "P2-1·P2-2 문안을 새로 쓴 경우 리뷰어 재확인을 권한다"고 했으므로 재확인을 요청한다.
- 반영 내용 요약(슈퍼바이저 결정 포함):
  - P1-1 → §1-1 6항(기존 게시물이 있으면 새 보도만 갱신 절, SNS 링크 문장 금지, 새 보도가 없으면 기록만)
  - P1-2 → §1-1 0항 적격성(제외 4종)
  - P2-1 → §1 표 "별개의 사실" 정의 + 3항 하위 2줄(주장에 대한 보도의 인용형·제목 규칙, 팩트체크 틀과의 경계)
  - P2-2 → 5항 (a)~(d). **시의성 기준은 슈퍼바이저가 30일로 정했다.**
  - P2-3 → 1항 id 규칙
  - P3-4 → 1항 `sources[].url` 포털 금지 + 8항 트리거 자기 점검 체크리스트(검증 스크립트 반영은 이번 범위 밖, 프로그래머 오더 후보로 둔다)
  - P3-5 → 7항
  - P2-4·P2-5·P3-1~3 → `docs/supervisor/link-selection-guide.md` 전면 반영

## 선행 검토 문서 (Required)
- `docs/reviews/supervisor-topic-pivot-policy-review.md`(리뷰 18) 전체
- `git diff -- docs/poster/guide.md` 및 `docs/poster/guide.md` 전체
- `docs/supervisor/link-selection-guide.md` 전체
- `planning/prd.md` §5.4·§6, `content/README.md` §1·§3

## 임무
1. 리뷰 18의 P1-1·P1-2·P2-1~P2-5·P3-1~P3-5가 각각 의도대로 반영됐는지 항목별로 판정한다(반영/부분/미반영).
2. 새로 쓴 문안이 **새 충돌**을 만들지 않았는지 확인한다. 대상: §1 표, §2, §4 id 규칙, PRD §6, `content/README.md` §1(og 수정 금지)·§3. 0~8항의 번호 체계가 §1 표·리뷰 18의 참조와 어긋나지 않는지도 본다.
3. 30일 시의성 기준을 리뷰 18 §5 선례표 #1·3·6·7·10·25에 적용했을 때 리뷰 18의 "권고" 열 판정과 결과가 같은지 대조한다.
4. 링크 선별 안내의 수치가 `docs/tools/reviewer-18/count-output.txt`와 같은지 확인한다.
- 빌드 불필요(문서만 변경). 대상 문서는 수정하지 않는다. 수정이 필요하면 지시로 적는다.

## 산출물 (Required)
- 리뷰 `docs/reviews/supervisor-topic-pivot-policy-recheck-review.md`
- 측정 도구가 있으면 `docs/tools/reviewer-19/`

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-19-topic-pivot-policy-recheck-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·결함 수·커밋 대상 목록)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- git add·commit·push 금지(슈퍼바이저 전용). 코드·content·가이드 수정 금지.
- 인터넷신문 미등록, 편집 정책 비완화는 다시 다투지 않는다.

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 19-topic-pivot-policy-recheck`
- 판정 · 항목별 반영 표 · 신규 결함 · 커밋 대상
- history/{오늘}.md에 `## [HH:MM] 리뷰어 19 — 지시 → 행동 → 결과` append
- 말미: `— 리뷰어 (Opus 5.5) · 19-topic-pivot-policy-recheck 종료 —`
