# md오더: 프로그래머 (Opus 5) - 12-terms-about-copy-sync

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 12

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지 · 빌드·검증 직접 수행.

## 배경
v0.2 배포 후 남은 문구 9건을 약관·소개 페이지에 반영한다. 리뷰 27이 #1~#8 최종 문구를 승인했다. #9(약관 개정일 표기)는 슈퍼바이저 판단이다. 기획 문서는 커밋 9d969d8로 확정됐다. 기능 변경은 없고 문구만 바꾼다.

## 선행 검토 문서 (Required)
- 🔴 `planning/v0.2-post-release-sync.md` §6(#1~#9 전문·현행 대조) — 이 전문을 글자 그대로 쓴다
- 리뷰 27 `docs/reviews/planner-11-v0.2-decisions-sync-review.md` · 트리거 `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md`
- `docs/triggers/planner-11-1-review-27-doc-fixes-COMPLETE.md`
- `planning/terms-page-copy.md` §C
- 직전 핸드오프 `docs/handoffs/programmer-11-1-review-26-p2-fixes.md`, `docs/tools/programmer-11-1/README.md`

## 임무
1. **#1~#8 반영**: `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx`, `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`(필요하면 `i18n.ts`)에 sync §6 전문을 그대로 넣는다.
   - #3·#4는 `contactEmail`이 `null`일 때만 보인다.
   - #8의 aboutIntro 인용은 `SITE_EN.aboutIntro` 원문과 같아야 한다.
2. **#9 약관 개정일**: ko·en 약관 제목 아래 첫 줄에 "최종 개정: YYYY-MM-DD" / "Last updated: YYYY-MM-DD"를 둔다.
   - 날짜는 코드 상수 하나로 둔다. 값은 이번 작업일(Asia/Seoul) 2026-11-09로 한다.
   - `<time dateTime>`을 쓴다.
   - JSON-LD에 `dateModified`가 있으면 같은 값으로 맞춘다.
3. **`og.description` 사용 수 재측정**: content 전체에서 `og.description`을 쓰는 게시물이 0건인지 다시 센다(리뷰 27 조건).
4. **D6 금지어·저장소 독립 grep**: 변경 파일에서 각각 0건.
5. **검증**
   - build·typecheck·lint
   - 문구 대조 스크립트: `programmer-11-1/copy-exact-check.py` 방식으로 9건 × 빌드 HTML을 글자 단위로 대조
   - `a11y-e2e`: `programmer-11-1` 사본을 재실행하고, 약관·소개 항목 숫자를 기록한다
   - `clean-clone-gate.sh --worktree`
   - 결과는 `docs/tools/programmer-12/`에 남긴다.

## 산출물 (Required)
- 코드 변경, 검증 기록 `docs/tools/programmer-12/`, 핸드오프 `docs/handoffs/programmer-12-terms-about-copy-sync.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - #1~#9 전후 문구
  - 검증 숫자
  - `og.description` 수
  - 커밋 대상 경로 목록
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 제약
- #1~#9 밖의 수정 금지. `content/`·planning·guide·시안 수정 금지. 새 의존성 금지. git 금지. 빌드는 이 세션만.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 12-terms-about-copy-sync`
- history append
- 완료 시 반공-슈퍼바이저에 SendMessage
