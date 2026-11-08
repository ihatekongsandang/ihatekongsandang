# 완료 트리거 — 프로그래머 (Opus 5) · 11-1-review-26-p2-fixes

**완료일**: 2026-11-09 08:15
**핸드오프**: `docs/handoffs/programmer-11-1-review-26-p2-fixes.md`
**검증 기록**: `docs/tools/programmer-11-1/`

## P2 4건 전후

### P2-1 `src/app/(ko)/about/page.tsx` 운영 방식 셋째 항목
- 전: 열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 방문자에게서 개인정보를 수집하지 않습니다.
- 후: 열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다.

### P2-2 같은 파일 출처 정책 둘째 항목
- 전: 언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문, 뉴스통신사, 방송사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.
- 후: 언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.
- `/en/about` 확인 결과: 개인정보 문장·매체 나열 문장 없음(렌더 HTML 실측) → en 변경 없음. 새로 만든 영어 문장 없음.

### P2-3 `src/lib/share.ts`
- 전: 제목 가중치가 256을 넘으면 뒤를 잘라 "…"를 붙인다 → `?text=<잘린 제목>&url=…`
- 후: 256을 넘으면 `xShareText` = `''`, `xIntentUrl` = `https://x.com/intent/tweet?url=…`(`text` 파라미터 없음). 예산 안 제목은 `?text=<원제목>&url=…` 그대로. 스레드 변경 없음.

### P2-4 `src/lib/config.ts` `SITE_EN.aboutIntro` 셋째 문장
- 전: We do not state how far the facts have been confirmed; we quote the reports as they are.
- 후: We do not make definitive claims about how far the facts have been established; we quote the reports as they are.
- aboutIntro 전문 = 기획자 10 트리거 최종 문구와 일치(빌드 HTML 대조). `description` 불변(157자, 기획자 10 문구와 일치).

## 검증 숫자
| 항목 | 결과 |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | 0 errors · 4 warnings(기존 리뷰어 도구 파일, 무관) |
| `npm run build` | 검증 412건 통과 · 정적 799/799 (일반·GA 더미 둘 다) |
| copy-exact-check(🆕) | 12/12 PASS — P2-1·P2-2·P2-4·description 일치, 옛 문구 3종 × 2페이지 0, en 개인정보·매체 나열 0 |
| share-check | FAIL 0 · 412제목 · X url만 ko 0 / en 24(리뷰 25 목록 일치 ✅, `text` 파라미터 0) · 원제목 text 388 · X 최대 278/280 · 스레드 최대 404/500 |
| renewal-check | 34/34 PASS(프로그래머 11 출력과 동일) |
| a11y-e2e | 176/176 PASS = 기존 172(라벨 전부 동일) + P2-3 신규 4(ko text = 제목 · en text 없음 × 2폭) |
| clean-clone-gate `--worktree` | ✅ 통과 |
| 옛 문구 grep | `src`·`public`·`scripts` 0 · `.next/server/app` 0 |

## 커밋 대상 경로 (11 목록 + 11-1 추가분)
```
src/lib/config.ts                 (11 · 11-1 수정)
src/lib/i18n.ts
src/lib/analytics.ts
src/lib/seo.ts
src/lib/share.ts                  (11 · 11-1 수정)
src/lib/content/view.ts
src/lib/content/renewal.ts
src/components/share-buttons.tsx
src/components/page-section.tsx
src/components/post-detail.tsx
src/components/post-card.tsx
src/components/site-footer.tsx
src/app/sitemap.ts
src/app/llms.txt/route.ts
src/app/(ko)/about/page.tsx       (11 · 11-1 수정)
src/app/(en)/en/about/page.tsx
src/app/(ko)/terms/page.tsx
src/app/(en)/en/terms/page.tsx
docs/tools/programmer-11/         (11 목록 그대로)
docs/handoffs/programmer-11-news-format-v0.2-implement.md
docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md
instructions/programmer/processed/11-news-format-v0.2-implement.md
# ── 11-1 추가분 ──
docs/tools/programmer-11-1/       (README.md, copy-exact-check.py·-output.txt, share-check.ts·-output.txt, renewal-check-output.txt, a11y-e2e.mjs·-output.txt, typecheck-output.txt, lint-output.txt, build-output.txt, build-output-ga-dummy.txt, gate-worktree.log, screens/*.png 18장)
docs/handoffs/programmer-11-1-review-26-p2-fixes.md
docs/triggers/programmer-11-1-review-26-p2-fixes-COMPLETE.md
instructions/programmer/processed/11-1-review-26-p2-fixes.md   (이동)
history/2026-11-09.md
```
리뷰 26 산출물(`docs/reviews/…`·`docs/tools/reviewer-26/`·리뷰 트리거)과 기획자 10 산출물의 커밋 여부는 슈퍼바이저 판단이다. 다른 미추적·수정 파일은 이번 범위가 아니다.

## 다음
리뷰어 26-1 짧은 재확인(P2-4 의미 동등 승인 포함) → 슈퍼바이저 `clean-clone-gate.sh --staged` → 경로 지정 커밋
