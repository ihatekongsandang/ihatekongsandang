# 프로그래머 세션 — 11-1-review-26-p2-fixes 핸드오프
**작성일**: 2026-11-09 08:15 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- 리뷰 26 배포 차단 P2 4건만 고쳤다: 소개(ko) 개인정보 문장(P2-1)·매체 등록 문장(P2-2), X 공유 예산 초과 시 `url`만(P2-3), `SITE_EN.aboutIntro` 셋째 문장(P2-4).
- 문구 3곳은 오더 원문·기획자 10 트리거 전문과 빌드 HTML에서 글자 단위로 일치(12/12). share-check url만 en 24(리뷰 25 목록 일치)·원제목 388, e2e 176/176(신규 X `text` 확인 4), renewal 34/34.
- typecheck exit 0 · lint 0 errors · build 412 검증·799/799 · clean-clone-gate `--worktree` 통과. P3·content·PRD·시안·planning 손대지 않았다. git 사용 안 함.

## 산출물
| 파일 | 설명 |
|---|---|
| `src/app/(ko)/about/page.tsx` | 운영 방식 셋째 `<li>`(P2-1)·출처 정책 둘째 `<li>`(P2-2) 문장 교체 |
| `src/lib/config.ts` | `SITE_EN.aboutIntro` 셋째 문장 교체(P2-4) + 주석 1줄. `description` 불변 |
| `src/lib/share.ts` | `xShareText`: 예산(256) 초과 시 `''`. `xIntentUrl`: `text`가 비면 `?url=`만. 말줄임 로직·`ELLIPSIS` 상수 제거. 스레드 불변 |
| `docs/tools/programmer-11-1/` | README, `copy-exact-check.py`(🆕), `share-check.ts`(11 사본·P2-3 기대값), `a11y-e2e.mjs`(11 사본 + X `text` 확인), 출력·빌드·게이트 로그, screens 18장 |
| `docs/triggers/programmer-11-1-review-26-p2-fixes-COMPLETE.md` | 완료 트리거(전후 문구·숫자·커밋 대상) |

## 주요 결정사항
1. **`/en/about` 개인정보·매체 등록 문장 확인 → 변경 없음.** `/en/about` 본문에는 개인정보 언급이 없고(렌더 HTML `personal|privacy` 0), 매체 나열도 없다(`news agenc|broadcast` 0). 매체 관련 문구는 aboutIntro 둘째 문장 "outlets registered under Korea's Act on the Promotion of Newspapers and related laws" 하나다. 이 문장은 기획자 10이 "registered가 출처 매체에만 걸린다"고 확정한 문장이어서 그대로 뒀다. 리뷰 26 §6도 "/en/about에는 해당 문장이 없다"고 적었고, 실측 결과가 같다. 새로 만들거나 바꾼 영어 문장은 aboutIntro 셋째 문장(기획자 10 확정문) 하나뿐이다.
2. **검증 도구는 사본으로 갱신.** 리뷰 26이 프로그래머 11 도구를 재실행해 바이트 비교를 했으므로 `docs/tools/programmer-11/`의 원본은 그대로 두었다. 수정본은 `programmer-11-1/`에 사본으로 만들었다(§8 도구 저장 규칙).
3. **e2e 추가 확인은 2종 × 2폭 = 4줄.** ko alaska는 예산 안이라 `text` = h1 제목 그대로인지, en alaska(가중치 350)는 `text` 파라미터가 없고 쿼리 키가 `url` 하나뿐인지 본다. 오더는 "text 없음"만 요구했지만, 예산 안 제목에서 `text`가 빠지지 않는다는 반대쪽도 같이 확인했다.
4. **share-check 최대 가중치 279 → 278.** 종전 279는 잘린 제목의 값이었다. 지금은 자르지 않으므로 text가 있는 388건의 최댓값(278)이 찍힌다.
5. 빌드 순서: 일반 빌드 → GA 더미 빌드(e2e용) → 게이트 → **마지막에 일반 빌드로 `.next`를 되돌림**. 되돌린 뒤 copy-exact-check를 다시 돌려 FAIL 0을 확인했다.

## 미해결·이슈
- **리뷰어 의미 동등 승인**: aboutIntro 셋째 문장(기획자 10 확정문)은 리뷰 26-1에서 재확인할 대상이다. 기획자 10 트리거도 "리뷰어 의미 동등 승인은 별도 단계"라고 적었다.
- 기획 원본(PRD·scope의 소개 문구 기록)을 P2-1·P2-2 새 문장에 맞추는 일은 리뷰 26 §6에 따라 다음 기획 손질로 넘긴다(이번 범위 밖, 손대지 않음).
- P3(리뷰 26 P3-1~)는 손대지 않았다.
- lint 경고 4건은 기존 `docs/tools/reviewer-04·10·26` 도구 파일에서 나온다. 이번 변경과 무관하다.

## 다음 세션 가이드
- **리뷰어 26-1 (Opus 5.5)**: 문구 4곳 diff(트리거 표), `npx tsx docs/tools/programmer-11-1/share-check.ts`(FAIL 0·url만 24·원제목 388), e2e 출력 176/176을 짧게 재확인한다. P2-4 의미 동등도 승인한다.
- **슈퍼바이저**: 리뷰 통과 뒤 `clean-clone-gate.sh --staged`를 돌리고, 트리거의 경로 목록을 지정해 커밋한다.

## 참고 링크
- 오더 `instructions/programmer/processed/11-1-review-26-p2-fixes.md`
- 리뷰 26 `docs/reviews/programmer-11-news-format-v0.2-implement-review.md` §4.2·§5.1·§6
- 기획자 10 트리거 `docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md`
- 직전 핸드오프 `docs/handoffs/programmer-11-news-format-v0.2-implement.md`
