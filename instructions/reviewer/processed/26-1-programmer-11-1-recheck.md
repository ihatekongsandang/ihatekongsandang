# md오더: 리뷰어 (Opus 5.5) - 26-1-programmer-11-1-recheck

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 26-1

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지, 근거 없으면 "확인 필요".

## 배경
리뷰 26이 배포 차단 P2 4건을 냈다. 프로그래머 11-1이 이를 고쳤다. 영어 D1 문구는 기획자 10이 확정했다. 이번 일은 커밋 전에 짧게 재확인하는 것이다. 빌드는 하지 않는다. 프로그래머가 남긴 `.next` 산출물과 기록을 읽는다.

## 선행 검토 문서 (Required)
- 리뷰 26 `docs/reviews/programmer-11-news-format-v0.2-implement-review.md` · 트리거 `docs/triggers/reviewer-26-programmer-11-news-format-v0.2-review-COMPLETE.md`
- `docs/triggers/programmer-11-1-review-26-p2-fixes-COMPLETE.md` · `docs/handoffs/programmer-11-1-review-26-p2-fixes.md` · `docs/tools/programmer-11-1/` 전부
- `docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md` · `planning/en-d1-reconfirm.md`

## 임무
1. **P2 4건 대조**: 각 건의 수정이 리뷰 26 문구 안·기획자 10 최종 문구와 글자 단위로 같은지 소스에서 직접 확인한다.
   - 대상: `src/app/(ko)/about/page.tsx`, `src/lib/share.ts`, `src/lib/config.ts`
2. **P2-3 코드**: `xShareText`·`xIntentUrl` 분기를 확인한다. 256 경계를 넘을 때와 넘지 않을 때, 인코딩, 스레드가 그대로인지 본다.
   - `npx tsx docs/tools/programmer-11-1/share-check.ts`를 재실행해 숫자를 재현한다(빌드 아님).
   - 가능하면 `copy-exact-check.py`도 재실행한다.
3. **범위 이탈 없음**: 11-1 변경이 P2 4건 밖을 건드리지 않았는지 본다.
   - 11 대비 diff는 미커밋이라 `git diff`로 11 원본과 구분할 수 없다. 핸드오프와 소스로 판단한다.
4. **P2-4 의미 동등 승인**: 영어 aboutIntro 셋째 문장이 한국어 D1과 같은 뜻인지 승인한다.
5. **a11y-e2e 결과 검토**: `a11y-e2e-output.txt` 176/176을 읽어 확인한다.
   - 재실행은 하지 않는다. `next start`와 빌드는 하지 않는다.
   - 재실행이 꼭 필요하다고 판단하면 그 이유를 적는다.
6. **저장소 독립**: `docs/tools/programmer-11-1/`과 핸드오프·트리거를 grep한다. 다른 서비스명·계정·홈 절대경로가 0건이어야 한다.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-11-1-review-26-p2-fixes-recheck.md` (도구가 생기면 `docs/tools/reviewer-26-1/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-26-1-programmer-11-1-recheck-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정(승인/반려)
  - 남은 결함
  - 커밋 대상 경로 최종 목록(11·11-1·리뷰 26·26-1·기획자 10 산출물 포함)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 수정 금지. git 쓰기 금지(`git status`·`git diff` 읽기는 허용). 빌드·`next start`·의존성 설치 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 26-1-programmer-11-1-recheck`
- history append
