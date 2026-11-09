# 완료 트리거 — 리뷰어 (Opus 5.5) · 29-planner-12-terms-copy-recheck

**완료일**: 2026-11-09 | **리뷰 보고서**: `docs/reviews/planner-12-terms-copy-body-sync-review.md` | **도구**: `docs/tools/reviewer-29/`

## 판정
**승인**: P1 0 · P2 0 · P3 2. 커밋 가능.

## 재현 숫자
- 독립 대조: 바뀐 문장 6건 + #9 ko·en, **7/8 일치**. DIFF는 #6 1자(`’` vs `'`)로 규칙상 허용 범위다. 배포 소스는 HEAD 대비 변경 0
- 리뷰 27 도구: ko 31/31 · en 30/32. 출력 파일과 diff 0. 개정 전 수치는 27/29 · 27/29로 재현됐다
- `&apos;` 정규화 사본은 en 32/32, D1 모의는 en 31/32(#8만 남음). MISS 원인 설명이 맞다
- 저장소 독립 grep 0건

## 결함
- P3-1 §C 머리 "9건 모두 글자 단위로 같다"가 #6 1자 차이 행과 어긋난다. "9건" 셈 근거도 밝히지 않았다
- P3-2 머리 메모 4행(기획자 11)의 "원문 그대로 두었다"가 낡았다. 5행 규칙 요약에 #8 예외가 빠졌다
(둘 다 다음 문안 손질 때 고친다. 커밋은 막지 않는다)

## 커밋 대상 경로 (최종)
- `planning/terms-page-copy.md`
- `docs/tools/planner-12/`
- `docs/triggers/planner-12-terms-copy-body-sync-COMPLETE.md`
- `instructions/planner/processed/12-terms-copy-body-sync.md`
- `docs/reviews/planner-12-terms-copy-body-sync-review.md`
- `docs/tools/reviewer-29/`
- `docs/triggers/reviewer-29-planner-12-terms-copy-recheck-COMPLETE.md`
- `instructions/reviewer/processed/29-planner-12-terms-copy-recheck.md`
- `history/2026-11-09.md`

⚠️ 작업 트리에 이 묶음과 상관없는 변경이 있다. `history/2026-10-01.md`·`2026-11-05.md` 수정, tester-01·planner-07 미추적 산출물, 그 밖의 미추적 history 파일이다. 이번 커밋에서는 빼고, 경로를 하나씩 지정해 스테이징한다.
