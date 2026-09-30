# md오더: 리뷰어 (Opus 5.5) - 13-programmer-06-1-hotfix-check (🔴 긴급·간이)

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 13
**세션**: 새 세션 권장.
**대상**: 프로그래머 06-1 — Vercel 배포 실패 수정(도구 파일 2줄) + 커밋 전 깨끗한 복제본 게이트

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5). 06-1 수정이 배포 실패를 해소하는지 **간이 확인**한다. 🔴 현재 `f50ee73` 이후 모든 푸시의 배포가 막혀 있으므로 빠르게 판정한다. 코드 직접 수정 금지 · 커밋 금지.

## 선행 검토 문서 (Required)
- 오더: `instructions/programmer/processed/06-1-vercel-build-failure.md`
- 핸드오프: `docs/handoffs/programmer-06-1-vercel-build-failure.md`
- 트리거: `docs/triggers/programmer-06-1-vercel-build-failure-COMPLETE.md`

## 임무
1. `bash docs/tools/programmer-06-1/clean-clone-gate.sh`를 **현재 작업 트리 그대로**(리뷰 산출물까지 넣은 뒤 한 번 더) 실행 → typecheck·lint·build 통과, exit 0 확인.
2. 게이트 스크립트 검토: 커밋될 파일 집합만 복사하는지, 실패 시 0이 아닌 값으로 끝나는지(음성 대조 로그 확인 또는 직접 1회), 저장소 독립 원칙(홈 경로·계정명 하드코딩 없음).
3. 운영 코드(`src`·`content`·설정) 변경 0 확인(`git diff --stat`).
4. 🔴 **리뷰어 본인 산출물의 `.ts/.tsx`도 저장소 작업 트리에서 `npm run typecheck`로 확인**(이번 원인 재발 방지 — 스크래치 사본 결과로 대신하지 않음).
5. 재발 방지 제안 2·3(도구 작성 규칙, `tsconfig` 구조 분리)에 대한 의견.

## 산출물 · 핸드오프
- 리뷰: `docs/reviews/programmer-06-1-vercel-build-failure-review.md` (판정 · 게이트 실행 결과 · 의견)
- 🔴 트리거: `docs/triggers/reviewer-13-programmer-06-1-hotfix-check-COMPLETE.md` (필수)
- 이 오더를 `instructions/reviewer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 13-programmer-06-1-hotfix-check
- 판정 · 게이트 결과 · 의견
```
