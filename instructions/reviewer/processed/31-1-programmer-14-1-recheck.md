# md오더: 리뷰어 (Opus 5.5) - 31-1-programmer-14-1-recheck

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 31-1

## 자격·역할 (Required)
리뷰어 자격으로 수행한다. CLAUDE.md §1~§9를 준수한다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다.

## 배경
리뷰 31에서 차단 결함 P1-1이 나왔다. 프로그래머 14-1은 sticky를 아예 빼는 대안으로 이를 고쳤다. P3 6건도 함께 처리했다. 이번 일은 커밋 전에 하는 짧은 재확인이다.

## 선행 검토 문서 (Required)
- `docs/triggers/programmer-14-1-review-31-fixes-COMPLETE.md`
- `docs/handoffs/programmer-14-1-review-31-fixes.md`
- `docs/tools/programmer-14-1/`
- 리뷰 31 본문·트리거, `docs/tools/reviewer-31/`

## 임무
1. **P1-1 재현**: 기존 `.next`(일반 빌드)로 `next start`만 띄운다. `probe-sticky.mjs`·`focus-full.mjs`를 재실행해 화면 밖 포커스가 0인지 확인한다. sticky 제거 판단(보조 열 실측 근거)을 판정한다.
2. **P3 수정 검증**: P3-1·2·3·4·7·9 수정과 테스트 64/64를 확인한다. P3-3을 "오류로 막기"로 처리한 것이 맞는지 판정한다(리뷰 31은 "경고"를 권했다). 13 핫링크 테스트 도메인 변경도 판정한다.
3. **회귀 확인**: 수치 16항목을 재측정한다. a11y-e2e는 일반 빌드 기준 180 + GA 4건이고, GA 4건은 프로그래머 기록으로 확인한다. copy-exact 38, typecheck, 전체 lint도 확인한다.
4. **확장 grep 잔여 5건**: 각 건을 확인해 오탐인지, 커밋을 막는지 판정한다. 대상은 오더 파일 1건과 일반 낱말 4건이다.
5. **커밋 대상 경로 최종 목록을 확정한다.** 범위는 13+14+14-1과 리뷰 31·31-1 산출물이다.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-14-1-review-31-recheck.md` (도구는 `docs/tools/reviewer-31-1/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-31-1-programmer-14-1-recheck-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 남은 결함
  - grep 잔여 판정
  - 커밋 대상 경로 최종 목록
- 처리 후 본 파일을 `instructions/reviewer/processed/`로 옮긴다.

## 제약
- 대상 수정 금지
- git 쓰기 금지
- 빌드·의존성 설치 금지(`next start`는 허용)

## 완료 보고
- 서두: `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 31-1-programmer-14-1-recheck`
- history에 append한다.
