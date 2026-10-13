# 프로그래머 세션 — 09-active-tag-chip-contrast 핸드오프
**작성일**: 2026-10-13 11:05 | **작성 세션**: 프로그래머 (Opus 5) | **오더**: `instructions/programmer/processed/09-active-tag-chip-contrast.md`

## 요약 (3줄)
- 활성 태그 칩(검정 배경)의 건수 숫자 색을 `text-muted-foreground` → `text-background/70`으로 바꿨다(`TagChip` 안 클래스 1곳). 비활성 칩·칩 문구·`/tags` 모양은 그대로.
- 렌더 결과 computed color 실측: 활성 숫자 **2.29:1 → 9.14:1**(311칩 전수), 비활성 숫자 **7.03:1 불변**(4203칩 전수). WCAG 1.4.3 AA 충족.
- 칩 `<a>` 4514개 전후 비교 class 외 차이 0. measure-tag-nav · typecheck · lint · validate:content · build · clean-clone-gate(--worktree) 전부 통과.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/components/tag-nav.tsx` | `TagChip` 건수 `<span>` 클래스를 활성 여부로 분기 + 이유 주석 1줄 |
| `docs/tools/programmer-09/README.md` | 대비 전/후 표 · 방법 · 칩 HTML 비교 · 재실행법 |
| `docs/tools/programmer-09/chip-html-snapshot.mjs` | 빌드 산출물 칩 `<a>` 전수 스냅샷·비교 |
| `docs/tools/programmer-09/contrast-measure.browser.js.txt` | 대비 실측 브라우저 스크립트(`.txt` — lint·typecheck 제외) |
| `docs/tools/programmer-09/serve-url-list.mjs` | 측정용 URL 목록 임시 서버 |
| `docs/tools/programmer-09/*.log` · `*.png` | 빌드 전후 · 칩 비교 · measure-tag-nav · typecheck/lint · validate · 게이트 로그, 전후 캡처 |

## 주요 결정사항
- **새 토큰 없이 `text-background/70`** (리뷰 16 §6 예시안): 활성 칩의 태그명이 이미 `text-background`(흰색)라 같은 색을 70%로 낮추면 "태그명보다 한 단계 약한 숫자"라는 기존 위계가 유지되고, 토큰·globals.css 변경이 없다. 실측 9.14:1로 AA(4.5)와 AAA(7)를 모두 넘는다.
- 조건부 클래스는 `cn` 없이 삼항으로 썼다 — 두 값이 서로 배타라 병합할 것이 없다. 비활성 쪽 문자열은 이전과 바이트 단위로 같다(칩 비교에서 비활성 class 차이 0).
- 대비는 계산이 아닌 실측: 반투명 `oklab(… / 0.7)`이라 배경과의 합성을 브라우저 캔버스가 하게 하고 그 픽셀로 계산했다. 전수는 칩이 있는 328쪽 HTML의 칩을 실제 CSS로 렌더해 4514개 모두 쟀다.

## 미해결·이슈
- **확인 필요**: `color-mix` 미지원 브라우저 경로. 빌드 CSS에 대체값 `color: var(--background)`(흰색)가 앞에 있어 이론상 17.72:1(활성 태그명 실측값과 같은 색 쌍)이지만, 실제 미지원 브라우저에서 렌더해 보지는 않았다.
- 측정은 창 폭 1920px 한 가지. 칩 색은 브레이크포인트와 무관한 클래스라 폭에 따라 바뀌지 않는다(코드 확인) — 모바일 폭 별도 실측은 하지 않았다.
- 작업 중 HEAD가 `c2cde5f` → `02f51bc`(업로더, 게시물 본문 병합)로 바뀌었다. `tags:` 변경 0이고, 칩 비교에서 4514개 건수 숫자까지 같아 측정 영향 없음.
- lint 경고 3건은 기존 `docs/tools/reviewer-04`·`reviewer-10` 파일(리뷰 16과 동일).

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: `git diff -- src`(2줄) 검토 → `docs/tools/programmer-09/README.md` §4로 대비 재현(활성 9.14 / 비활성 7.03 기대) → 칩 비교 `compare` 재실행.
- **슈퍼바이저**: 리뷰어 승인 후 아래 커밋 대상만 add. `history/2026-10-01.md`(작업 트리 변경)는 이 작업과 무관 — 넣지 않는다.

### 커밋 대상 경로 목록
```
src/components/tag-nav.tsx
docs/tools/programmer-09/README.md
docs/tools/programmer-09/chip-html-snapshot.mjs
docs/tools/programmer-09/contrast-measure.browser.js.txt
docs/tools/programmer-09/serve-url-list.mjs
docs/tools/programmer-09/build-before.log
docs/tools/programmer-09/build-after.log
docs/tools/programmer-09/chip-snapshot-before.log
docs/tools/programmer-09/chip-snapshot-after.log
docs/tools/programmer-09/chip-html-compare.log
docs/tools/programmer-09/measure-tag-nav.log
docs/tools/programmer-09/typecheck-lint.log
docs/tools/programmer-09/validate-content.log
docs/tools/programmer-09/clean-clone-gate-worktree.log
docs/tools/programmer-09/before-tag-1gundan-chips.png
docs/tools/programmer-09/after-tag-1gundan-chips.png
docs/handoffs/programmer-09-active-tag-chip-contrast.md
docs/triggers/programmer-09-active-tag-chip-contrast-COMPLETE.md
instructions/programmer/processed/09-active-tag-chip-contrast.md
history/2026-10-13.md
```
(테스터 02 산출물을 같은 묶음에 넣을지는 슈퍼바이저 결정 — 이 세션은 건드리지 않았다.)

## 참고 링크
- 리뷰 16 §3·§6: `docs/reviews/programmer-08-home-tag-nav-top12-tags-page-review.md`
- 테스터 02: `docs/qa/tester-02/report.md`, `docs/tools/tester-02/measure-log.md`
