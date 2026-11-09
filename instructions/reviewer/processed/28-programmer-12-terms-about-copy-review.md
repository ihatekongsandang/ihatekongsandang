# md오더: 리뷰어 (Opus 5.5) - 28-programmer-12-terms-about-copy-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 28

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지, 근거 없으면 "확인 필요".

## 배경
프로그래머 12가 약관·소개 문구 #1~#9를 반영했다. #1~#8은 리뷰 27 승인본이고, #9 개정일은 슈퍼바이저 판단이다. 커밋 전 §5 게이트다. 빌드는 하지 않는다. 프로그래머가 남긴 `.next`(일반 빌드)와 기록을 읽는다. 배포일은 2026-11-09로 예정한다.

## 선행 검토 문서 (Required)
- `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md`, `docs/handoffs/programmer-12-terms-about-copy-sync.md`, `docs/tools/programmer-12/` 전부
- 오더 `instructions/programmer/processed/12-terms-about-copy-sync.md`
- `planning/v0.2-post-release-sync.md` §6, 리뷰 27 트리거(승인 문구), `planning/terms-page-copy.md`
- 변경 소스 5개: ko/en terms·about `page.tsx`, `src/lib/config.ts`

## 임무
1. **문구 대조 재현**: `copy-exact-check.py`를 재실행해 38/38을 재현한다. 기대값은 sync §6에서 직접 읽는다. 소스·빌드 HTML과 글자 단위로 대조한다.
2. **프로그래머 판단 4건 판정**
   1. #5·#6 약관 약속 완화: 리뷰 27의 판단이 실제 렌더에서도 유지되는지 본다. 고지 위치와 굵게 범위를 확인한다.
   2. #6 아포스트로피: `’`가 `'`로 1자 바뀌었다. 승인본·기획 원문과 어느 쪽이 맞는지 판정한다.
   3. #1·#2 `#correction` 링크를 넣지 않은 판단
   4. #9: 날짜 상수와 `<time dateTime>`이 맞는지 본다. JSON-LD `dateModified`를 넣지 않은 판단도 판정한다.
3. **범위 이탈 없음**: 변경 소스가 #1~#9 밖을 건드리지 않았는지 본다. 직전 커밋 대비 `git diff`로 확인한다.
4. **결과 기록 검토**: `og.description` 0/207·0/207, D6·저장소 독립 grep 0, e2e 184/184를 기록에서 확인한다. 재실행할 수 있는 것은 재실행한다. 빌드·`next start`는 하지 않는다.
5. **planning 불일치**: 리뷰 27 재현 도구의 MISS ko 2·en 2는 `terms-page-copy.md` 본문이 개정 전 문장이라 생긴다. 이것이 커밋을 막는지 판정한다. 막지 않으면 다음 기획 손질 항목으로 적는다.

## 산출물 (Required)
- 리뷰 `docs/reviews/programmer-12-terms-about-copy-sync-review.md` (도구는 `docs/tools/reviewer-28/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-28-programmer-12-terms-about-copy-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 결함 P1~P3
  - 다음 기획 손질 항목
  - 커밋 대상 경로 최종 목록(리뷰 산출물 포함)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 수정 금지. git 쓰기 금지(`git diff`·`git status` 허용). 빌드·`next start`·의존성 설치 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 28-programmer-12-terms-about-copy-review`
- history append
