# 완료 트리거 — 기획자 (Sonnet 5.5) · 11-1-review-27-doc-fixes

**완료일**: 2026-11-09 | **근거**: 리뷰 27 `docs/reviews/planner-11-v0.2-decisions-sync-review.md`, `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md`
`src/`·`content/`·`design/`·`docs/poster/guide.md` 수정 없음. git·빌드 사용 안 함.

## 고친 행 (전 → 후)
| 결함 | 파일 | 전 | 후 |
|---|---|---|---|
| P2-1 | `planning/prd.md` 76행 | 카드 "갱신" 표시 추가 여부는 사용자가 아직 결정하지 않았다(아래 미결 표, P2-2). | 카드 "갱신" 표시는 사용자 결정 5a로 확정됐다(2026-11-08, 배포됨 — 위 결정 표 5a 행). |
| P3-1 | `planning/prd.md` §6④(366행) | `/terms` 제안, §4.1 | `/terms` 확정, §4.1 |
| P3-1 | `planning/news-format-v0.2-scope.md` §1 표 2행 | 신규 경로(제안 `/terms`·`/en/terms`) | 신규 경로(확정 `/terms`·`/en/terms`) |
| P3-1 추가 | `planning/terms-page-copy.md` 페이지 위치·제목 | (제안, 확정 아님) 경로·제목 | (확정) — 같은 모순이라 함께 정리 |
| P3-7 | `planning/terms-page-copy.md` §C | 같은 문서 §4-2 | §4.2 (§C 전체는 아래 확정 문구로 교체) |
| P3-7 | `planning/prd.md` 78행 | (오더 11·배포, … | (프로그래머 오더 11·배포, … |
| P3-7 | `planning/v0.2-post-release-sync.md` §5·§7·§8 | 뉴스통신사·방송사업자 지위 … 확인 필요 | 리뷰 27 §4로 해소 — 뉴스통신사 등록(뉴스통신법 제2조3호·제8조①), 방송사업자는 지상파·종합유선·위성·공동체라디오 허가, 방송채널사용사업자 등록·신고·승인(방송법 제9조), 신문·인터넷신문 등록(신문법 제9조①) |
| P3-7 | 본 트리거 대상 `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md` 5항 | …법령 원문 미확인 — 확인 필요. | …리뷰 27 §4로 해소 — (위 확인 결과 한 줄) |
| 문구 | `planning/v0.2-post-release-sync.md` §4.2·§5·§6 | 기획자 안 8건(「」·인용 불일치 등) | 리뷰 27 승인본 #1~#8 전문 + #9(총 9건) |
| 문구 | `planning/terms-page-copy.md` §C | 요지 + 문서 참조 | 승인본 전문 C1~C4(#1·#2·#5~#9) |

## 코드 반영 최종 목록 #1~#9 (프로그래머 오더 입력)
엔티티: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`. 전문·현행 대조는 `planning/v0.2-post-release-sync.md` §6.
1. `src/app/(ko)/terms/page.tsx` `anonymous` 마지막 문장 → “…위 ‘정정·삭제 요청 방법과 처리 기준’ 절의 연락 경로를…” (`#correction` 링크 선택)
2. `src/app/(en)/en/terms/page.tsx` 같은 위치 → “…the contact channel in the “How to request a correction or removal, and how we handle it” section above.”
3. `src/app/(ko)/about/page.tsx` `correction` 절 `contactEmail` null 분기, 준비 중 상자 아래 → “아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.”
4. `src/app/(en)/en/about/page.tsx` 같은 분기 → “The handling standards below apply once the contact channel is finalized.”
5. ko 약관 `sourcing` 셋째 `<li>` → “운영자가 쓰는 요약과 본문에는 …” + ‘원문 미리보기’ 고지 문장
6. en 약관 `sourcing` 셋째 `<li>` → “the summaries and text we write never copy …” + “Original post preview” 고지 문장
7. ko 약관 `sourcing` 둘째 `<li>` 끝 → “소개 문구의 “신문법 등에 따라 등록된 매체”는 위 기준 전체를 줄여 부른 표현입니다. …(등록·허가·승인 등)…”
8. en 약관 `sourcing` 둘째 `<li>` 끝 → “The phrase “outlets registered under Korea's Act on the Promotion of Newspapers and related laws” … shorthand for this whole standard. …” (`SITE_EN.aboutIntro`와 글자 대조)
9. ko·en 약관 제목 아래 첫 줄 → “최종 개정: YYYY-MM-DD” / “Last updated: YYYY-MM-DD” (날짜 = 코드 반영 배포일, Asia/Seoul. 슈퍼바이저 판단, 리뷰 27 P3-6 채택)
- 반영 배포 전까지 게시물에 `og.description` 금지, 반영 오더에서 0/207 재측정. #5·#6 완화이므로 리뷰어 게이트. 반영 후 글자 단위 대조와 terms-copy §C 환원.

## 잔여 확인
"아직 결정하지" 0건. "제안"은 약관 경로 관련 남은 것 없음(나머지는 다른 맥락: USP 가설·OG·rel·KPI 등, 과거 이력 표 B8·B10 포함). "확인 필요"는 이번 대상(D1 방송사·뉴스통신사 지위) 0건, 나머지는 정보통신망법·언론중재법·저작권 등 별건으로 유지.

## 커밋 대상 경로
- `planning/prd.md`
- `planning/news-format-v0.2-scope.md`
- `planning/terms-page-copy.md`
- `planning/v0.2-post-release-sync.md`
- `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`
- `docs/triggers/planner-11-1-review-27-doc-fixes-COMPLETE.md`
- `instructions/planner/processed/11-1-review-27-doc-fixes.md`
- `history/2026-11-09.md`
(리뷰 27 산출물 경로는 리뷰 27 트리거의 커밋 대상 목록을 따른다)
