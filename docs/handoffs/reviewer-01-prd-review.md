# 리뷰어 세션 — 01-prd-review 핸드오프
**작성일**: 2026-09-21 10:42 | **작성 세션**: 리뷰어 (Fable 5.1)

## 요약 (3줄)
- 기획자 01 PRD v0.1 초안을 원 오더·CLAUDE.md와 전수 대조(항목 10/10, 확정 사항 7/7, 교차참조 33개, 질문 11/11) → **판정: 재작업(부분)**. 골조·로드맵 순서·추측 금지는 통과.
- **결함 4건**: D1 운영자 링크 `nofollow ugc` 일괄 적용(내부 모순 + Google 스펙 오용 + 출처 존중 충돌 — 슈퍼바이저 의문 타당, 운영자/UGC 링크 이원화 판정) · D2 계정 분리 원칙 누락(commit 29cce99 10:18 < 기획자 10:21로 시점 확인) · D3 OG 썸네일 저장·재사용 정책 공백 · D4 교차참조 오류 7건.
- **권고(상) 6건 · 권고(하) 7건 · 이월 4건**(서비스명 등 답변 1~5, view 화면, 🔴 편집 정책 절 신설, 6개 축). 기획자 02 오더에 병합할 지시안을 보고서 §6에 코드블록으로 제공.

## 산출물 (파일 경로 + 한 줄 설명)
| 경로 | 설명 |
|---|---|
| `docs/reviews/planner-01-prd-draft-review.md` | 판정 + 결함 4/권고 13/이월 4 + 근거 인용(파일:행) + 통과 항목 표 + 재작업 지시안 |
| `docs/handoffs/reviewer-01-prd-review.md` | 본 문서 |
| `docs/triggers/reviewer-01-prd-review-COMPLETE.md` | 완료 트리거 |

## 주요 결정사항 (자체 판단 + 근거)
1. **판정을 "조건부 승인"이 아닌 "재작업(부분)"으로** — 리뷰 오더 판정 기준상 결함 확정(사용자 결정 누락·정책 충돌)이 1건이라도 있으면 재작업. 단 골조가 유효하므로 전면 재작성이 아닌 부분 수정으로 범위 한정.
2. **`nofollow ugc` 판정 근거를 Google 공식 문서 원문 인용으로 고정** — "ugc = 댓글·포럼 등 UGC 링크", "통상 링크는 rel 불필요"(qualify-outbound-links). `noreferrer`는 MDN 원문(noopener는 Referer 유지, noreferrer는 차단)으로 출처 존중 충돌 판정.
3. **D2 공정성 기록** — 원 오더 확정 표에도 계정 분리가 없었음을 병기. 기획자 누락으로 판정한 근거는 §0.5가 같은 CLAUDE.md의 다른 절(기술 스택·운영 체계)은 가져왔기 때문.
4. **검토 중 확정된 사용자 결정(A~D)은 결함이 아닌 이월로 분리** — 기획자가 알 수 없었던 사항으로 판정을 왜곡하지 않기 위함.
5. **편집 정책(핵심 축 6)을 v0.2 게이트 최우선 항목으로 예고** — CLAUDE.md가 "구체 규칙은 PRD에서 정하고 리뷰어가 게이트한다"고 명시.
6. 산출물은 한 글자도 수정하지 않았다(오더 "직접 수정 금지").

## 미해결·이슈 (다음 세션이 알아야 할 것)
- `planning/prd.md`·`user-questions.md`는 **커밋 보류** — 기획자 02 반영 + 리뷰어 02 통과 후 커밋. 슈퍼바이저 고유 문서(CLAUDE.md·PROJECT_STATUS·history·user-tasks·리뷰어 산출물)는 게이트 대상 아님.
- D3(OG 썸네일)·R4(제보 이용 허락·개인정보)·이월 C(명예훼손·초상권)는 **법적 리스크 식별**이며 법률 자문 필요 여부는 사용자 결정.
- 권고 r4(반응형 SEO 근거)는 리뷰어 미확인 → "확인 필요".
- 슈퍼바이저 오더 작성 시 "사용자 확정 사항" 표를 CLAUDE.md 확정 결정 표와 동기화할 것(D2 재발 방지).

## 다음 세션 가이드 (누가·무엇을·어떻게)
- **슈퍼바이저 (Opus 5)**: 본 핸드오프 + 리뷰 보고서 §0·§6 직접 Read → 기획자 02 오더(`instructions/planner/02-…`)에 보고서 §6 지시안(필수 4 + 권고 6 + 이월 4) 포함 → 사용자에게 판정·결함 3건 요약 보고. 커밋은 리뷰어 산출물·슈퍼바이저 문서만.
- **기획자 (Sonnet 5, 02)**: 보고서 §1 D1~D4 필수 수정, §2 R1~R6 반영, §4 A~D 반영. 수정 시 보고서의 "파일:행" 인용을 기준으로 대조.
- **리뷰어 (Fable 5.1, 02)**: v0.2 재검토 — D1~D4 해소 확인 + 편집 정책 절(§4-C ①~⑥) 게이트 최우선.
- **프로그래머 (Opus 5)**: v0.2 승인 전 착수 금지(스키마 필드·링크 rel·OG 이미지 정책이 바뀔 예정).

## 참고 링크
- 리뷰 오더: `instructions/reviewer/processed/01-prd-review.md`
- 원 오더: `instructions/planner/processed/01-prd-draft.md`
- Google — Qualify outbound links: https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- Google — Pagination & incremental loading: https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- MDN — rel=noopener: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener
