# md오더: 프로그래머 - 14-1-review-31-fixes

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 14-1

## 자격·역할 (Required)
프로그래머 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 빌드·검증 직접 수행.

## 배경
리뷰 31이 13·14 묶음을 조건부 승인했다. 차단 P1-1을 고치고, 작게 고칠 수 있는 P3 일부를 함께 처리한다.

## 선행 검토 문서 (Required)
- 🔴 리뷰 31 `docs/reviews/programmer-13-14-image-responsive-review.md`와 트리거 `docs/triggers/reviewer-31-programmer-13-14-image-responsive-review-COMPLETE.md`
- 리뷰어 도구 `docs/tools/reviewer-31/`. `probe-sticky.mjs`와 `focus-full.mjs`의 실행법은 README에 있다.

## 임무
1. **P1-1 (차단)**: 상세 페이지의 오른쪽 보조 열(sticky)이 화면보다 길면 포커스가 화면 밖으로 나간다. 이를 해소한다.
   - 권장: 화면 높이가 충분할 때만 sticky를 건다. 기준값은 가장 긴 보조 열을 실측해서 정한다.
   - 다른 해법을 쓰면 근거를 적는다.
2. **P3 함께 수정**
   - P3-1: 포털 목록에 naver.me, news.kakao.com, news.google.com, msn.com 등을 추가한다.
   - P3-2: news 이미지 주소에서 localhost·사설 IP·명백한 HTML 주소를 거부한다.
   - P3-3: 미래 날짜 retrievedAt을 거부한다.
   - P3-4: `translation.ts`의 JSDoc 위치를 바로잡는다.
   - P3-7: 비활성 span의 aria-disabled를 정리한다.
   - P3-9: 13·14 `word-grep.sh` 안의 금지 패턴 문자열을 직접 쓰지 않도록 바꾼다. 문자를 나눠 조합하거나 환경변수로 받는다. 저장소 전체 확장 금지어 grep(슈퍼바이저 커밋 게이트와 같은 패턴)이 0건이 돼야 한다.
   - 고친 각 검증 규칙에 통과·거부 테스트를 추가한다.
3. **검증**
   - `probe-sticky.mjs`·`focus-full.mjs`: 화면 밖 포커스 0
   - 수치 16항목 재측정
   - GA 더미 빌드 a11y-e2e 184/184
   - 13 단위·픽스처 테스트
   - copy-exact 38
   - seo-parity
   - build·typecheck·전체 lint
   - `clean-clone-gate.sh --worktree`
   - 결과는 `docs/tools/programmer-14-1/`에 남긴다.
4. 마지막 빌드는 일반 빌드(GA 없음)로 남긴다.

## 산출물·핸드오프 (Required)
- 핸드오프 `docs/handoffs/programmer-14-1-review-31-fixes.md`
- 🔴 `docs/triggers/programmer-14-1-review-31-fixes-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 수정 전후
  - 검증 숫자
  - 커밋 대상 경로(13+14+14-1 합본)
- 처리 후 본 파일 → `instructions/programmer/processed/`

## 제약
- P3-5·6·8(용어·문구·간격)은 기획·디자인 확인 사항이다. 손대지 않는다.
- content·planning·design 수정 금지. 새 의존성 금지. git 금지. 빌드는 이 세션만.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (실제 모델명) · 14-1-review-31-fixes`
- history append. 완료 시 반공-슈퍼바이저에 SendMessage
