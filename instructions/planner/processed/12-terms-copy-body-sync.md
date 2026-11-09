# md오더: 기획자 (Sonnet 5.5) - 12-terms-copy-body-sync

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 12

## 자격·역할 (Required)
기획자 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지.

## 배경
약관·소개 문구 #1~#9가 배포됐다(커밋 8a6f4d3). `planning/terms-page-copy.md` 본문은 아직 개정 전 문장이다. 리뷰 28 P3-2와 다음 기획 손질 항목 1~3을 처리한다.

## 선행 검토 문서 (Required)
- 🔴 리뷰 28 `docs/reviews/programmer-12-terms-about-copy-sync-review.md`, 트리거 `docs/triggers/reviewer-28-programmer-12-terms-about-copy-review-COMPLETE.md`
- `planning/terms-page-copy.md`(§A·§B·§C), `planning/v0.2-post-release-sync.md` §6
- 배포 소스(읽기만): `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx`
- 리뷰 27 재현 도구 `docs/tools/reviewer-27/terms-copy-reproduce.py`

## 임무
1. `terms-page-copy.md` 본문을 배포된 개정 문구로 바꾼다.
   - 대상: #1·#2·#5·#6 옛 문장, #7·#8 덧붙임, #9 개정일 줄
   - 배포 소스와 글자 단위로 같아야 한다. 단 #6 아포스트로피는 아래 2를 따른다.
2. **아포스트로피 규칙을 적는다.** "문안 표의 곧은 `'`는 `&rsquo;`(’)를 뜻한다. 영문 소개 문구(`SITE_EN.aboutIntro`) 인용만 곧은 `'` 그대로 쓴다."
   - #6은 현재 배포가 곧은 `'`라서 규칙과 다르다(리뷰 28 P3-1). 문안에는 규칙대로 적고, "다음 약관 코드 오더에 #6 1자 되돌리기 + `termsLastUpdated` 갱신"을 대기 항목으로 남긴다.
3. §C(개정 대기)를 처리 완료로 바꾼다. 반영된 항목은 §A·§B 방식(원문·근거·배포 커밋)으로 옮긴다.
4. `python3 docs/tools/reviewer-27/terms-copy-reproduce.py`(실행법은 파일 안내를 따른다)를 다시 돌린다.
   - MISS가 0인지 확인한다.
   - 남는 MISS가 있으면 그 원인이 #6 아포스트로피 1건뿐인지 밝힌다.
   - 출력은 `docs/tools/planner-12/`에 저장한다.

## 산출물 (Required)
- 수정: `planning/terms-page-copy.md`
- 재현 출력: `docs/tools/planner-12/`

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-12-terms-copy-body-sync-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 바뀐 문장 목록
  - 재현 결과 숫자
  - 대기 항목
  - 커밋 대상 경로
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 제약
- `src/`·`content/`·시안·guide 수정 금지. git·빌드 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 기획자 (실제 모델명) · 12-terms-copy-body-sync`
- history append
