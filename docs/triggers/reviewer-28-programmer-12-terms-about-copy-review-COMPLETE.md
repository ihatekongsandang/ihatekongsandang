# 완료 트리거 — 리뷰어 (Opus 5.5) · 28-programmer-12-terms-about-copy-review

**완료일**: 2026-11-09 | **리뷰 보고서**: `docs/reviews/programmer-12-terms-about-copy-sync-review.md` | **도구**: `docs/tools/reviewer-28/`

## 판정
**승인**: P1 0 · P2 0 · P3 3. 커밋 조건은 하나다. 배포가 **2026-11-09(Asia/Seoul) 안**에 이뤄져야 한다. 11/10 이후면 `src/lib/config.ts`의 `termsLastUpdated`를 고치고, `docs/tools/programmer-12/copy-exact-check.py`와 `a11y-e2e.mjs`의 기대 날짜도 함께 고친 뒤 커밋한다.

## 재현 숫자
- 문구 대조: `copy-exact-check.py` 재실행 **38/38**, 리뷰어 독립 도구(html.parser·JSX 풀이·h2/i18n/aboutIntro 인용 대조) **38/38**
- `og.description` 0/207 · 0/207(재실행). D6·저장소 독립 grep 50줄 전부 0(재실행). typecheck exit 0, lint 0 errors / 4 warnings(기존)
- e2e 184/184(약관·소개 76)는 기록으로 확인했다(`next start` 금지). build 801/801과 `--worktree` 게이트 통과도 로그로 확인했다
- 범위: 직전 커밋 대비 단어 diff 조각 18개가 전부 #1~#9에 속한다. 그 밖의 변경은 0이다

## 프로그래머 판단 4건
1. #5·#6 완화: ✅ 굵게 범위가 §6 `**`과 같고 마침표는 밖에 있다. 미리보기 상자 안 figcaption·안내문이 "같은 자리 고지" 약속과 맞는다
2. #6 아포스트로피: **`’`(`&rsquo;`)가 맞다.** §6 엔티티 관례가 그렇고, §6 "현행" 칸의 `'`도 직전 소스의 `’`를 평문으로 적은 것이다. #8 인용의 `'`만 aboutIntro와 맞춰야 하는 예외다. P3-1로 두고 커밋은 막지 않는다
3. #1·#2 링크 미삽입: ✅ (선택 항목이다. Tab 기준을 지켰다)
4. #9: ✅ 상수와 `<time dateTime>`·화면 텍스트가 일치한다. JSON-LD에는 date 키가 0개이므로 `dateModified`를 넣지 않은 판단이 맞다

## 결함
- **P3-1** `/en/terms` #6 `article's`(곧은 `'`). 화면에 `’` 13 · `'` 2가 섞인다. 다음 약관 손질 때 `&rsquo;`로 1자 되돌린다
- **P3-2** `planning/terms-page-copy.md` 본문이 개정 전 문장이다(리뷰 27 재현 MISS ko 2·en 2). §C가 정한 "반영 후 환원" 순서이므로 커밋은 막지 않는다
- **P3-3** 개정일이 상수 1곳과 검증 도구 2곳에 고정값으로 들어 있다. 배포일이 밀리면 함께 고친다. 도구가 상수를 읽게 바꾸기를 권한다(선택)

## 다음 기획 손질 항목 (배포 뒤 기획자)
1. `terms-page-copy.md` 한국어·English 본문을 개정 문구로 바꾼다. 대상은 #1·#5 / #2·#6 옛 문장 4개와 #7·#8 덧붙임, #9 개정일 줄이다. 그다음 §C를 §A·§B 방식으로 환원하고, 리뷰 27 재현 도구가 전부 일치하는지 확인한다
2. 아포스트로피 규칙을 적는다. "표의 곧은 `'`는 `&rsquo;`를 뜻하고, aboutIntro 인용만 예외다"
3. 다음 약관 문구 오더에 #6 1자 되돌리기를 넣고, `termsLastUpdated`도 함께 갱신한다

## 커밋 대상 경로 (최종)
- `src/app/(ko)/terms/page.tsx`
- `src/app/(en)/en/terms/page.tsx`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `src/lib/config.ts`
- `docs/tools/programmer-12/`
- `docs/handoffs/programmer-12-terms-about-copy-sync.md`
- `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md`
- `instructions/programmer/processed/12-terms-about-copy-sync.md`
- `docs/reviews/programmer-12-terms-about-copy-sync-review.md`
- `docs/tools/reviewer-28/`
- `docs/triggers/reviewer-28-programmer-12-terms-about-copy-review-COMPLETE.md`
- `instructions/reviewer/processed/28-programmer-12-terms-about-copy-review.md`
- `history/2026-11-09.md`

⚠️ 작업 트리에는 이 묶음과 상관없는 변경이 있다. 수정된 `history/2026-10-01.md`·`2026-11-05.md`, tester-01·planner-07 미추적 산출물, 그 밖의 history 파일이다. 이번 커밋에서는 빼고, 경로를 하나씩 지정해 스테이징한다.
