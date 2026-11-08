# md오더: 프로그래머 (Opus 5) - 11-1-review-26-p2-fixes

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 11-1

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지 · 빌드·검증 직접 수행.

## 배경
리뷰 26이 프로그래머 11 구현을 조건부 승인했다. P2 4건이 배포를 막는다. 이 4건만 고친다.

슈퍼바이저 판단:
- P2-1·P2-2는 기획자 약관 문안을 그대로 옮긴 리뷰어 문구를 채택한다.
- P2-4 영어 문구는 기획자 10 재확인 결과(`docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md`)의 최종 문구를 쓴다.

## 선행 검토 문서 (Required)
- 🔴 리뷰 26 `docs/reviews/programmer-11-news-format-v0.2-implement-review.md`
- 리뷰 26 트리거 `docs/triggers/reviewer-26-programmer-11-news-format-v0.2-review-COMPLETE.md`
- 🔴 기획자 10 트리거 `docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md`
- 직전 핸드오프 `docs/handoffs/programmer-11-news-format-v0.2-implement.md`
- `docs/tools/programmer-11/README.md`

## 임무
1. **P2-1** `src/app/(ko)/about/page.tsx` 운영 방식 셋째 항목을 다음 문장으로 바꾼다.
   `열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다.`
   - `/en/about`에 같은 취지의 문장이 있으면 함께 맞춘다. 영어 문장을 새로 만들거나 바꾸면 핸드오프에 전문을 적어 리뷰어 게이트로 넘긴다.
2. **P2-2** 같은 파일 출처 정책 둘째 항목을 다음 문장으로 바꾼다.
   `언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.`
   - `/en/about`에 같은 오기가 있는지도 확인한다. 있으면 고치고 1과 같이 처리한다.
3. **P2-3** `src/lib/share.ts`
   - 제목 가중치가 256을 넘으면 `xShareText`는 빈 문자열을 돌려준다.
   - `xIntentUrl`은 `text` 없이 `?url=`만 만든다.
   - 스레드는 바꾸지 않는다.
   - `share-check.ts` 기대값을 바꾼다: url만 24건, 나머지 388건은 원제목.
   - e2e에 "X href에 `text` 없음" 확인을 추가한다.
4. **P2-4** `SITE_EN.aboutIntro`(필요하면 `description`도)를 기획자 10 트리거의 최종 문구 전문으로 바꾼다. 트리거가 없거나 판정이 비어 있으면 멈추고 보고한다.
5. **검증**
   - `npm run build`, typecheck, lint
   - `renewal-check`, `share-check`, `a11y-e2e.mjs` 재실행. 숫자를 기록한다.
   - 결과는 `docs/tools/programmer-11-1/`에 남긴다.
   - `clean-clone-gate.sh --worktree`를 실행한다.

## 산출물 (Required)
- 코드 변경
- 검증 기록 `docs/tools/programmer-11-1/`
- 핸드오프 `docs/handoffs/programmer-11-1-review-26-p2-fixes.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-11-1-review-26-p2-fixes-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - P2 4건 전후 문구(diff 요지)
  - 검증 숫자
  - 커밋 대상 경로 목록(11 목록 + 11-1 추가분)
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 제약
- P2 4건 밖의 수정 금지(P3는 손대지 않는다).
- `content/`·PRD·guide·시안·planning 수정 금지. 새 의존성 금지. git 금지. 빌드는 이 세션만.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 11-1-review-26-p2-fixes`
- history append
- 완료 시 반공-슈퍼바이저에 SendMessage
