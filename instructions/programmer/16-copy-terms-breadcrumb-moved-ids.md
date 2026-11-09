# md오더: 프로그래머 - 16-copy-terms-breadcrumb-moved-ids

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 16

## 자격·역할 (Required)
프로그래머 자격으로 수행한다. CLAUDE.md §1~§9를 지킨다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다. 빌드·검증은 직접 한다.

## 배경
사용자 결정은 두 가지다.
- Q1=b: #1 게시물의 id를 옮기고, 옛 주소에서 308로 넘긴다.
- Q2=b: SNS 원 이미지 저장본 139건을 정리한다. 소개 문구도 사실대로 고친다.

이 오더는 공인 얼굴 사진 첫 묶음보다 **먼저** 배포해야 한다(C4).

슈퍼바이저 판단은 다음과 같다.
- C4 문안은 리뷰 34 §2.4의 정정 문안(P2-2·P2-3)을 채택한다.
- `moved-ids.txt` 예시 줄은 주석으로만 둔다(P2-1).
- 상태 코드는 308을 유지한다(`permanent: true`).

## 선행 검토 문서 (Required)
- 🔴 리뷰 34 `docs/reviews/planner-16-q1-q2-plan-review.md`: §1(리다이렉트 사양 결함·P3), §2.4(C4 정정 문안), 트리거의 "프로그래머 16 최종 범위"
- `planning/q1-redirect-q2-sns-image-plan.md`: §1 리다이렉트 사양, 검증 a~h, 시험표 1~9
- `planning/v0.9-copy-and-code-list.md`: §1(용어 "주제"), §2.1(미리보기 안내문), §2.3(이동 경로), C3·C4·C5·C11
- 프로그래머 15 핸드오프, 현행 `next.config.ts`·`src/lib/content/`

## 임무 — 커밋 단위 A (C3·C4·C5)
1. **C3**: 용어를 "주제"로 통일한다. §1 표 8행을 바꾸고, 영어는 `Topics`로 쓴다. URL `/tag`·`/tags`와 frontmatter `tags`는 그대로 둔다.
2. **C4**
   - `sourcePreviewNote`에서 "썸네일"을 뺀다.
   - 한국어 소개 "인용·저작권" 절을 리뷰 34 §2.4 정정 문안으로 바꾼다.
   - 영어 소개에 이미지 절을 추가한다. 절 제목은 **"Quotes, images and copyright"**로 하고 본문은 §2.4 정정 문안(= `planning/q1-redirect-q2-sns-image-plan.md` §2.2 en 문안)을 글자 그대로 쓴다.
   - `copy-exact` 기대값을 갱신한다.
   - 약관 문구는 바꾸지 않는다.
3. **C5**: 이동 경로 간격을 줄인다. 터치 영역 44px는 유지하고, 구분자 간격만 줄인다.

## 임무 — 커밋 단위 B (C11 id 이전 규칙)
4. `content/moved-ids.txt`를 만든다. 예시는 주석으로만 쓰고, 실제 항목은 0개로 둔다.
5. 공유 함수 `src/lib/content/moved-ids.ts`를 만든다.
6. `next.config.ts`의 `redirects()`는 기존 Vercel 조건문 **밖**에 둔다. 상태 코드는 308이다.
7. 영어 주소 분기는 번역 맵 기준으로 한다.
   - 새 id에 영어본이 있으면 `/en/post/새`로 보낸다.
   - 없으면 `/post/새`로 보낸다.
8. 검증 a~h를 넣는다. 여기에 옛 이미지 폴더 검사를 더하고, `ID_PATTERN`을 export한다.
9. `content/README.md`에 moved-ids 절을 추가한다. "id·파일명·태그·이미지 폴더에 비공인 실명 금지" 한 줄도 넣는다.
10. **시험**: 시험표 1~9를 픽스처로 돌린다.
    - 음성 대조를 추가한다: 다른 id는 200, 없는 id는 404.
    - 로컬 프로덕션 서버에서 `curl -I`로 308과 Location을 확인한다.
    - 끝 슬래시와 쿼리도 확인한다.
11. 🔴 **#1 게시물은 옮기지 않는다.** 이전은 다음 업로더 오더에서 한다.

## 공통 검증
- build·typecheck·전체 lint를 돌린다.
- 회귀를 확인한다: a11y-e2e(GA 더미 184), copy-exact, seo-parity(용어 변경으로 달라진 차이는 설명한다), 단위 테스트.
- `clean-clone-gate.sh --worktree`를 돌린다.
- 결과는 `docs/tools/programmer-16/`에 남긴다. 마지막 빌드는 일반 빌드로 한다.

## 산출물·핸드오프 (Required)
- 핸드오프 `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md`
- 🔴 `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 항목별 완료 여부
  - 커밋 단위 A·B의 경로 목록(따로 적는다)
  - 검증 숫자
- 처리를 마치면 본 파일을 `instructions/programmer/processed/`로 옮긴다.

## 제약
- 수정 금지: `content/posts*`, `public/images`, planning, guide, design. 예외는 `content/README.md`·`content/moved-ids.txt`.
- 새 의존성 금지. git 금지. 빌드는 이 세션만 한다.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (실제 모델명) · 16-copy-terms-breadcrumb-moved-ids`
- history에 append한다.
- 완료 시 반공-슈퍼바이저에 SendMessage로 알린다.
