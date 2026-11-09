# md오더: 리뷰어 (Opus 5.5) - 31-programmer-13-14-image-responsive-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 31

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행한다. CLAUDE.md §1~§9를 준수한다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않고, 근거가 없으면 "확인 필요"로 적는다.

## 배경
커밋 전 §5 게이트다. 대상은 두 묶음이다.
- 프로그래머 13: 카드 이미지 스키마·검증·상세 크레딧
- 프로그래머 14: 반응형 개편 보강안 구현, `docs/tools/**`에만 적용하는 lint 규칙 1개

사용자 결정은 U1~U5, D1~D7이다(오더 14 배경 참조). 이미지 정책 사용자 결정 중 공인 범위 등 1~5는 아직 정해지지 않았다. 다만 게시물 데이터는 바꾸지 않았으므로 이번 코드에는 영향이 없다.

## 선행 검토 문서 (Required)
- 트리거·핸드오프·도구: `docs/triggers/programmer-13-*`, `programmer-14-*`, `docs/handoffs/programmer-13-*`, `programmer-14-*`, `docs/tools/programmer-13/`, `docs/tools/programmer-14/`
- 오더 `instructions/programmer/processed/13-*`, `14-*`
- `planning/card-image-policy.md`, 리뷰 30 트리거(착수 조건 2 완화책)
- `design/v0.3-responsive/final/`(`mockup.html`·`tokens.md`·`notes.md`), `02-scoring.md`
- 변경 소스 전부: `git diff`와 새 파일

## 임무
1. **13 코드 정확성**
   - 스키마·검증 규칙을 정책과 리뷰 30 완화책에 하나씩 대조한다.
   - 기존 207건이 그대로 통과하는지 본다.
   - 포털 거부와 `sourcePageUrl ∈ sources[]` 조건을 본다.
   - figcaption 문구와 링크 속성을 본다.
   - `referrerpolicy`가 바뀌지 않았는지, OG·JSON-LD에 외부 이미지가 들어가지 않는지 본다.
   - 단위·픽스처 테스트를 재실행한다.
2. **14 구현 충실도**
   - 보강안 구현 범위 1~16과 D1~D7이 반영됐는지 소스에서 확인한다.
   - 기존 기능이 유지되는지 본다: 공유·GA, 갱신 표시, 약관·소개 문구 글자, 영어, 대체 전환, SEO.
3. **실측 재현**
   - 프로그래머가 빌드한 `.next`로 `next start`만 띄운다. 빌드는 하지 않는다.
   - `docs/tools/programmer-14/`의 측정 도구로 수치 16항목을 재현한다.
   - a11y-e2e 184와 copy-exact 38을 재실행한다.
   - 포트는 전용 포트를 쓰고, 끝나면 서버와 Chrome을 종료한다.
4. **프로그래머 결정 판정**: 핸드오프 결정 2~13을 승인할지 고칠지 판정한다. 특히 아래 세 가지를 본다.
   - 날짜 표기
   - 언어 전환에 현재 언어 표시가 빠진 점
   - "주제" 대 "전체 태그" 용어
5. **lint 규칙 변경**: `eslint.config.mjs` 변경의 범위와 근거가 타당한지 본다. `src/`에 영향이 없어야 한다.
6. **접근성**: 하단 띠 배너가 포커스를 가리지 않는지 본다(2.4.11). `scroll-padding`, 터치 44px, 리플로우 320을 본다. 화면 읽기 순서를 DOM 순서와 대조한다.
7. **저장소 독립·보안**: diff와 새 산출물에서 금지어 grep이 0건인지 본다. 외부 요청 0, 비밀값 0을 확인한다.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-13-14-image-responsive-review.md` (도구는 `docs/tools/reviewer-31/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-31-programmer-13-14-image-responsive-review-COMPLETE.md` **완료 트리거 파일을 반드시 만든다**. 다음을 적는다.
  - 판정
  - 결함 P1~P3
  - 차단 항목과 수정안
  - 사용자 결정 필요
  - 커밋 대상 경로 최종 목록(13·14·리뷰 산출물)
- 처리 후 본 파일을 `instructions/reviewer/processed/`로 옮긴다.

## 제약
- 대상 수정 금지
- git 쓰기 금지
- 빌드·의존성 설치 금지. `next start`는 허용한다.

## 완료 보고
- 서두: `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 31-programmer-13-14-image-responsive-review`
- history append
