# md오더: 기획자 (Sonnet 5.5) - 10-en-d1-reconfirm

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 10

## 자격·역할 (Required)
기획자 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙(다른 서비스명·계정명·홈 절대경로 금지). 추측 금지, 근거 없으면 "확인 필요".

## 배경
scope 2.1-2는 "영어 문구는 기획자 재확인 없이 배포하지 않는다"고 정한다. 프로그래머 11이 D1(PRD v0.7 §1 안 3)을 영어로 옮겼다. 리뷰 26 P2-4는 셋째 문장의 의미가 바뀌었다고 지적하고 교체 문구를 냈다.

슈퍼바이저 판단: scope 2.1-2의 기획자 재확인은 리뷰어 게이트로 대체하지 않는다. 기획자 재확인과 리뷰어 의미 동등 승인 둘 다 거친다.

## 선행 검토 문서 (Required)
- `planning/prd.md` v0.7 §1 안 3(한국어 확정문)
- `planning/news-format-v0.2-scope.md` 2.1-2·2.1-4
- `planning/terms-page-copy.md`
- `src/lib/config.ts` `SITE_EN.description`·`SITE_EN.aboutIntro` (읽기만)
- 리뷰 26 `docs/reviews/programmer-11-news-format-v0.2-implement-review.md` P2-4

## 임무
1. 확인 대상은 두 문구다.
   - `SITE_EN.aboutIntro`에 리뷰 26 P2-4 교체 문장을 넣은 결과
   - 셋째 문장 교체 문구: `We do not make definitive claims about how far the facts have been established; we quote the reports as they are.`
   - 함께 볼 `SITE_EN.description`(160자 이하)
2. 각 문장이 한국어 확정문과 같은 뜻인지 판정한다. "registered"는 출처 매체에만 걸려야 한다(scope 2.1-4). 운영자를 언론사·기자로 자칭하는 표현(D6)이 없어야 한다.
3. 결론은 둘 중 하나다.
   - 확정: 이대로 배포해도 된다.
   - 수정안 제시: 바꿀 최종 영어 문구 전문을 적는다. description을 바꾸면 글자 수를 센다.

## 산출물 (Required)
- `planning/en-d1-reconfirm.md`

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md` **완료 트리거 파일 생성 필수**. 판정과 최종 영어 문구 전문(aboutIntro·description)을 적는다.
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 제약
- `src/`·`content/`·PRD·scope 수정 금지. git 금지. 빌드 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 기획자 (Sonnet 5.5) · 10-en-d1-reconfirm`
- history append
