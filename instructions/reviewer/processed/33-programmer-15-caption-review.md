# md오더: 리뷰어 (Opus 5.5) - 33-programmer-15-caption-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 33

## 자격·역할 (Required)
리뷰어 자격으로 수행한다. CLAUDE.md §1~§9를 지키고, 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다. 근거가 없으면 "확인 필요"로 적는다.

## 배경
커밋 전 §5 게이트다. 프로그래머 15가 사진 설명 표시와 검증을 구현했다. 범위는 C1·C2·C6·C7, P3-N1, 그리고 reviewer-32 도구의 타입 수정이다. 슈퍼바이저는 별도로 guide.md §4-1을 고치고 `docs/operations/` 기록 틀을 만들었다. 두 변경을 함께 본다.

## 선행 검토 문서 (Required)
- `docs/triggers/programmer-15-*`, `docs/handoffs/programmer-15-*`, `docs/tools/programmer-15/`
- 오더 `instructions/programmer/processed/15-*`
- `planning/v0.9-copy-and-code-list.md` §3.2·§2.4, `planning/card-image-policy.md` §3.6·§8·§9
- `git diff`(src·scripts·content/README.md·docs/poster/guide.md), `docs/operations/` 새 파일

## 임무
1. **코드 정확성**
   - C1: public·news만 표시하는지, self가 구조상 막혀 있는지 본다.
   - C2: 필수 조건·160자 경고·영어본 규칙을 본다.
   - C7: 실패 상태가 전파되는지 본다. 하이드레이션 전과 후 모두 확인한다.
   - P3-N1을 본다.
   - 단위·픽스처 테스트를 재실행한다.
   - 빌드는 금지다. 기존 `.next`로 `next start`만 띄워 실브라우저 확인을 재현한다.
2. **README(C6)**: §2.4 문안과 글자 단위로 대조한다. 예시가 검증을 통과하는지 확인한다(임시 사본 사용).
3. **슈퍼바이저 guide 변경 게이트**: guide §4-1·§1-1·§2·§4 수정이 정책·지침·스키마와 맞는지 본다. 틀린 요약이나 빠진 필수 규칙이 있는지 판정한다.
4. **operations 기록 틀**: 개인정보를 적는 칸이 없는지 본다.
5. **회귀**: a11y-e2e(일반 빌드 기준), copy-exact, typecheck, 전체 lint를 돌린다.
6. 저장소 독립 grep 0을 확인한다.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-15-caption-review.md` (도구는 `docs/tools/reviewer-33/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-33-programmer-15-caption-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 결함
  - guide 수정 지적
  - 커밋 대상 경로 최종 목록(guide·operations 포함)
- 처리 후 본 파일 → `instructions/reviewer/processed/`

## 제약
- 대상 수정 금지. git 쓰기 금지. 빌드·의존성 설치 금지(`next start`는 허용).

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 33-programmer-15-caption-review`
- history에 append한다.
