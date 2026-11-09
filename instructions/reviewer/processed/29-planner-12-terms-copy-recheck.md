# md오더: 리뷰어 (Opus 5.5) - 29-planner-12-terms-copy-recheck

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 29

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지.

## 배경
기획자 12가 `planning/terms-page-copy.md` 본문을 배포 문구(커밋 8a6f4d3)와 맞췄고, 아포스트로피 규칙을 적었다. 이번 일은 커밋 전 짧은 문서 게이트다.

## 선행 검토 문서 (Required)
- `docs/triggers/planner-12-terms-copy-body-sync-COMPLETE.md`, `docs/tools/planner-12/` 전부
- `git diff -- planning/terms-page-copy.md`
- 리뷰 28 트리거, 배포 소스 `src/app/(ko)/terms/page.tsx`·`src/app/(en)/en/terms/page.tsx`

## 임무
1. 바뀐 문장 7건과 개정일 줄이 배포 소스와 같은지 직접 대조한다. #6은 규칙상 1자 차이를 허용한다.
2. 재현 결과를 재현한다. ko 31/31, en 30/32이고, MISS 2건의 원인 설명이 맞는지 본다. #6은 실제 차이이고, #8은 도구가 `&apos;`를 정규화하지 않아서 생긴다는 설명이다.
3. 아포스트로피 규칙 문구와 §C·§D 정리가 리뷰 28 지적과 맞는지 본다.
4. 저장소 독립 grep 0.

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-12-terms-copy-body-sync-review.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-29-planner-12-terms-copy-recheck-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 결함
  - 커밋 대상 경로 최종 목록
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 수정 금지. git 쓰기 금지(`git diff` 허용). 빌드 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 29-planner-12-terms-copy-recheck`
- history append
