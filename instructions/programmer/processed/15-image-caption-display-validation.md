# md오더: 프로그래머 - 15-image-caption-display-validation

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 15

## 자격·역할 (Required)
프로그래머 자격으로 수행한다. CLAUDE.md §1~§9를 지킨다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다. 빌드·검증은 직접 한다.

## 배경
기획 v0.9가 확정됐다(커밋 7e8b2fd). 사용자는 2b로 공인 얼굴 사진을 지금 바로 시작하기로 했다. 그 완화책 가운데 "의혹 사안 사진 설명 필수"는 상세 화면에 사진 설명이 실제로 보여야 지킬 수 있다. 그래서 업로더가 사진을 넣기 전에 이 오더를 먼저 배포해야 한다.

## 선행 검토 문서 (Required)
- 🔴 `planning/v0.9-copy-and-code-list.md` §3.2(C1·C2·C6·C7)·§3.4(프로그래머 15)·§2.4(README 문안)
- `planning/card-image-policy.md` §3.6(사진 설명 형식)·§8
- 리뷰 31-1 트리거 P3-N1, 리뷰 32 트리거 §프로그래머 오더 범위
- 프로그래머 13·14·14-1 핸드오프(현행 스키마·`post-detail`·`card-media`)

## 임무
1. **C1**: 상세 figcaption에 `image.caption`을 보여 준다. 영어는 `imageCaption`이다.
   - `kind`가 public·news일 때만 보여 준다. self 이미지 caption 206건은 계속 숨긴다.
2. **C2**: `kind`가 public·news이면 `image.caption`을 필수로 한다. 빈 문자열은 받지 않는다.
   - 길이가 160자를 넘으면 경고한다.
   - 영어본 `imageCaption`이 필수인지 확인하고, 필요하면 같은 규칙을 적용한다.
3. **C6**: `content/README.md`를 §2.4 문안으로 갱신한다. news 예시와 public 예시를 나누고, news 예시에는 `license`를 넣지 않는다.
4. **C7**: 핫링크가 깨져 대체 카드로 바뀌면 크레딧 줄과 사진 설명 줄도 숨긴다. 이를 위해 `CardMedia`의 실패 상태를 figcaption이 알 수 있게 구조를 바꾼다.
5. **P3-N1**: news `src` 거부 목록에 IPv4 매핑 IPv6와 CGNAT 100.64/10을 추가한다.
6. **도구 타입 오류**: `docs/tools/reviewer-32/validate-examples.ts`의 타입 오류 3건(15~17행)을 동작이 바뀌지 않게 고친다. 지금은 이 파일 때문에 커밋 게이트를 못 넘어서 커밋에서 빠져 있다.
7. **테스트**
   - 사진 설명이 ko/en에서 보이는지
   - 핫링크가 깨지면 크레딧·설명이 숨는지
   - self caption이 계속 안 보이는지(회귀)
   - caption이 없을 때 빌드가 실패하는지(픽스처)
   - 새 거부 규칙
   - 테스트 이미지 주소는 예시 도메인만 쓴다.
8. **검증**
   - build·typecheck·전체 lint
   - a11y-e2e: GA 더미 빌드로 184 이상
   - copy-exact 38
   - seo-parity
   - `clean-clone-gate.sh --worktree`. 이때 reviewer-32 도구도 포함한다.
   - 결과는 `docs/tools/programmer-15/`에 남긴다.
   - 마지막 빌드는 일반 빌드로 남긴다.

## 산출물·핸드오프 (Required)
- 핸드오프 `docs/handoffs/programmer-15-image-caption-display-validation.md`
- 🔴 `docs/triggers/programmer-15-image-caption-display-validation-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - C별 완료 여부
  - 검증 숫자
  - 커밋 대상 경로(`docs/tools/reviewer-32/validate-examples.ts` 포함)
- 처리 후 본 파일 → `instructions/programmer/processed/`

## 제약
- C3·C4·C5(용어·문구·간격)는 다음 오더(16) 몫이다. 손대지 않는다.
- `content/posts*`·`public/images`·planning·guide·design 수정 금지. 예외는 C6의 `content/README.md`뿐이다.
- 새 의존성 금지. git 금지. 빌드는 이 세션만 한다.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (실제 모델명) · 15-image-caption-display-validation`
- history append
- 완료 시 반공-슈퍼바이저에 SendMessage
