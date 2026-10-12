# md오더: 리뷰어 (Opus 5.5) - 14-programmer-07-gate-staged-a11y-seo

**작성일**: 2026-10-01 15:20 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 14

---

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수(재실측 전수, 추측 금지). 🔴 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- 공통: `CLAUDE.md`, `history/2026-10-01.md`
- 오더: `instructions/programmer/processed/07-gate-staged-a11y-seo.md`
- 핸드오프·트리거: `docs/handoffs/programmer-07-gate-staged-a11y-seo.md`, `docs/triggers/programmer-07-gate-staged-a11y-seo-COMPLETE.md`
- 이전 리뷰: `docs/reviews/programmer-06-1-vercel-build-failure-review.md`(P2-1·P3·제안 3), `docs/reviews/programmer-06-english-feed-all-cards-review.md`(P2-1·P2-2)
- 부수 검토: `docs/handoffs/tester-01-deployed-image-loading.md`, `docs/qa/tester-01/results.md`, `docs/tools/tester-01/image-load-check.js`

## 임무
1. **코드 리뷰**: `next.config.ts`·`tsconfig.build.json`·`src/components/post-card.tsx`·`src/lib/config.ts`·`src/lib/content/translation.ts`·`src/lib/seo.ts` diff.
2. **게이트 스크립트** `docs/tools/programmer-07/clean-clone-gate.sh` 검토 + 직접 실행:
   - 스크래치 clone에 핸드오프 "커밋 대상 10개 경로"만 스테이징 → `--staged` exit 0, 제외 목록에 그 외 경로(업로더 파일·테스터 산출물 등)가 정확히 찍히는지
   - 음성 대조 최소 1종 직접(스테이징된 타입 오류 → exit ≠ 0, `✅` 0줄)
   - `set -euo pipefail` 하의 실패 전파, `trap` 정리, `checkout-index` 수 검증(exit 3) 로직
   - 🔴 사용자 저장소의 인덱스·작업 트리를 바꾸지 말 것(공유 작업 폴더 — 업로더가 동시 작업 중)
3. **판단 요청 3건**: (a) D 핸들 정규식 이메일 경계를 오더보다 넓힌 것, (b) E 영어 `alternateName` 4개 값(특히 `Korea Politics & Security Brief` 단독 별칭의 적정성), (c) B로 새로 생긴 Next 빌드 경고 1줄.
4. **재실측**: 핸드오프 숫자 중 핵심(B build/typecheck 음성 대조, C AX 491/491 변형 콘텐츠, D 22/22·validate 출력 동일, E HTML 544/544 의도 외 0)을 직접 재현. 콘텐츠가 바뀌었으면 그 시점 수로 다시 센다.
5. **테스터 01 산출물 간이 확인**: 결론(배포 도메인 멈춤 미재현)이 데이터로 뒷받침되는지. 특히 이미지 2,268장 대비 `/_next/image` 네트워크 기록 161건의 차이 설명이 타당한지. 커밋해도 되는 문서인지(독립 grep).
6. 독립 grep: 커밋 대상 전 파일 + 테스터 산출물.

## 산출물 (Required)
- `docs/reviews/programmer-07-gate-staged-a11y-seo-review.md` (판정 · 결함/P2 · 커밋 대상 최종 목록: 프로그래머 10경로 + 테스터 산출물 + 리뷰어 산출물)
- `docs/tools/reviewer-14/` (도구·로그, 상대경로)
- 🔴 `docs/tools/**`에 `.ts/.tsx`를 만들었으면 저장소 작업 트리에서 `npm run typecheck` exit 0 확인

## 핸드오프 (Required)
- `docs/triggers/reviewer-14-programmer-07-gate-staged-a11y-seo-COMPLETE.md` 🔴 **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 결정 사항·제약
- 🔴 코드 수정·git add·commit·push 금지. `content/`·`public/images/` 건드리지 말 것.
- 저장소에서 `npm run build` 금지(`.next` 공유) — 빌드는 스크래치에서.
- 배포 도메인 접근 금지(테스터 결과는 문서로만 검토).

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 14-programmer-07-gate-staged-a11y-seo`
- 판정 · 리뷰 경로 · 요약 3줄 · 재실측 숫자 · 판단 3건 답 · 커밋 대상 목록
