# 프로그래머 세션 — 12-terms-about-copy-sync 핸드오프
**작성일**: 2026-11-09 11:20 | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- `planning/v0.2-post-release-sync.md` §6의 #1~#9를 약관(ko/en)과 소개(ko/en)에 반영했다. #1~#8은 리뷰 27 승인본 그대로 넣었고, #9는 상수 `SITE.termsLastUpdated = '2026-11-09'` 하나와 `<time dateTime>`으로 넣었다. 기능 변경은 없다.
- 빌드 HTML과 §6 원문을 글자 단위로 대조해 38/38이 맞았다(#8 인용 ⊂ `SITE_EN.aboutIntro` 포함). `og.description`은 0/207(ko)·0/207(en)이고, D6 금지어·저장소 독립 grep은 0이다. e2e는 184/184(기존 176 + 신규 8)다.
- typecheck exit 0, lint 0 errors(기존 경고 4), build 414 검증·801/801, clean-clone-gate `--worktree` 통과. content·planning·guide·시안은 손대지 않았고 git은 쓰지 않았다.

## 산출물
| 파일 | 설명 |
|---|---|
| `src/app/(ko)/terms/page.tsx` | #1 anonymous 마지막 문장, #5 sourcing 셋째 `<li>`, #7 sourcing 둘째 `<li>` 덧붙임, #9 h1 아래 "최종 개정" 줄 |
| `src/app/(en)/en/terms/page.tsx` | #2, #6, #8, #9 "Last updated" 줄 |
| `src/app/(ko)/about/page.tsx` | #3: `contactEmail` null 분기에서 준비 중 상자 아래 `p.text-xs` 문장 |
| `src/app/(en)/en/about/page.tsx` | #4: 같은 분기, 영어 문장 |
| `src/lib/config.ts` | #9 상수 `SITE.termsLastUpdated: '2026-11-09'` + 주석 |
| `docs/tools/programmer-12/` | README, `copy-exact-check.py`, `og-description-count.mjs`, `word-grep.sh`, `a11y-e2e.mjs`(11-1 사본 + 8줄), 출력·빌드·게이트 로그, screens 18장, 리뷰 27 재현 도구 재실행 기록 |
| `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md` | 완료 트리거(전후 문구·숫자·커밋 대상) |

## 주요 결정사항
1. **아포스트로피는 기획 원문 글자 그대로 곧은 `'`(`&apos;`)로 넣었다(#6·#8).** §6 원문은 두 곳 모두 "article's"·"Korea's"처럼 곧은 아포스트로피를 쓴다. #8 인용은 `SITE_EN.aboutIntro`(곧은 `'`)와 같아야 하므로 `&apos;`가 필수다. #6도 같은 목록 안에서 #8과 맞추려고, 또 "글자 그대로" 지시에 따라 `&apos;`로 넣었다. 그래서 #6의 굵은 글씨 속 "article’s"(종전 `&rsquo;`)는 "article's"로 1자가 바뀌었다. 같은 페이지의 다른 아포스트로피(종전 문장들의 `&rsquo;`)는 #1~#9 밖이라 손대지 않았다. 리뷰어가 `&rsquo;`를 원하면 한 글자만 되돌리면 되고, 그 경우 copy-exact-check #6 기대값도 함께 바꿔야 한다.
2. **#1·#2의 `#correction` 링크는 넣지 않았다(평문).** 기획이 "선택"으로 둔 항목이다. 링크를 넣으면 약관 Tab 정지점이 하나 늘어 기존 e2e·테스터 03 Tab 순회 기준이 달라진다. 기능 변경이 없다는 오더 전제와 #1~#9 범위를 지키려고 평문으로 두었다.
3. **#9 위치와 모양**: `<header>` 안 h1 바로 다음 `<p className="text-xs text-muted-foreground">`(기존 약관 "처리 기준 적용" 줄과 같은 작은 글씨 클래스), 내용은 `최종 개정: <time dateTime={SITE.termsLastUpdated}>{SITE.termsLastUpdated}</time>`이다. 상수는 ko·en이 함께 쓰도록 `SITE`(이미 두 페이지가 import함)에 두었다. Next 페이지 파일은 임의 export를 할 수 없어서 lib에 두었다.
4. **JSON-LD `dateModified`는 추가하지 않았다.** `termsJsonLd()`에 `dateModified`가 없고(빌드 HTML JSON-LD 2블록에 0개), 오더는 "있으면 일치"다. 새로 넣는 것은 #9 범위 밖 SEO 변경이라 두지 않았다. 넣을지는 다음 손질에서 판단하면 된다.
5. **#3·#4**는 약관 페이지의 기존 null 분기와 같은 구조(`<>` + 상자 + `p.text-xs`)로 넣었다. 그래서 `contactEmail`이 정해지면 상자와 함께 사라진다. copy-exact-check가 소스에서 문장이 null 분기 안에만 있는지 확인한다.
6. **#5·#6 굵게 범위**: §6 원문의 `**` 범위(새 굵은 구절 전체)를 그대로 따랐다. 마침표는 종전처럼 `</strong>` 밖에 있다.

## 미해결·이슈
- 🔴 **리뷰어 게이트 필요**: #5·#6은 약관 약속을 일부 완화하는 개정이다(sync §6 주의, 리뷰 27). 커밋·배포 전에 리뷰를 거쳐야 한다.
- **#9 날짜 = 배포일 전제**: 상수는 오더 지정값 2026-11-09다. 리뷰 뒤 배포가 2026-11-10(Asia/Seoul) 이후로 밀리면 기획 §6 "#9 = 코드 반영 배포일"과 어긋나므로, 그때는 상수 한 줄(`src/lib/config.ts`)과 copy-exact-check·e2e의 기대 날짜를 함께 고쳐야 한다.
- `planning/terms-page-copy.md`의 한국어 문안·English copy **본문**에는 개정 전 문장이 남아 있고, 개정 문구는 §C에 있다. 그래서 리뷰 27 재현 도구를 다시 돌리면 정방향 MISS가 ko 2·en 2(바뀐 옛 문장)로 나온다(`reviewer-27-reproduce-rerun.txt`). 기획 영역이라 손대지 않았다. 본문까지 맞출지는 기획 판단이다.
- `og.description` 금지는 리뷰 27 조건상 이 반영이 **배포된 뒤** 풀린다. 배포 전까지는 계속 0을 유지해야 한다.
- lint 경고 4건과 콘텐츠 검증 경고 22건은 직전(11-1)과 같은 기존 경고다.

## 다음 세션 가이드
- **리뷰어 (Opus 5.5)**: 트리거의 전후 문구 표와 diff(5파일)를 보고 `python3 docs/tools/programmer-12/copy-exact-check.py`(빌드 후 38/38)와 `node docs/tools/programmer-12/og-description-count.mjs`(0)를 다시 돌린다. 판정할 것은 세 가지다. #5·#6 완화 승인, 결정 1(#6 `'` 1자 변경), 결정 2(링크 미삽입).
- **슈퍼바이저**: 리뷰 통과 뒤 배포일이 2026-11-09인지 확인하고(아니면 상수 갱신 오더), `clean-clone-gate.sh --staged`를 돌리고, 트리거의 경로 목록을 지정해 커밋한다.

## 참고 링크
- 오더 `instructions/programmer/processed/12-terms-about-copy-sync.md`
- 기획 `planning/v0.2-post-release-sync.md` §6 · `planning/terms-page-copy.md` §C
- 리뷰 27 `docs/reviews/planner-11-v0.2-decisions-sync-review.md` · 트리거 `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md`
- 직전 핸드오프 `docs/handoffs/programmer-11-1-review-26-p2-fixes.md`
