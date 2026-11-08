# md오더: 리뷰어 (Opus 5.5) - 24-planner-09-prd-v0.7-review

**작성일**: 2026-11-08 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 24

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지 · 법령은 원문 확인 · 근거 없으면 "확인 필요".

## 배경
사용자가 뉴스형 전환 D1~D6을 "전부 권장"으로 확정했다(2026-11-08). 기획자 09가 세 문서를 썼다: PRD v0.7, 약관·운영정책 문안(ko/en), v0.2 구현 범위. 금지 표현도 전수 조사했다.

## 선행 검토 문서 (Required)
- 대상: `planning/prd.md`(v0.7 — `git diff -- planning/prd.md`), `planning/terms-page-copy.md`, `planning/news-format-v0.2-scope.md`, `docs/handoffs/planner-09-prd-v0.7-news-format.md`, `docs/triggers/planner-09-prd-v0.7-news-format-COMPLETE.md`
- 오더 `instructions/planner/processed/09-prd-v0.7-news-format.md`(D1~D6 확정표)
- `planning/news-format-conversion.md`(커밋 1c090a7), 리뷰 20·21·23, `docs/tools/planner-08/check-log.md`, `docs/tools/reviewer-21/law-check-log.md`
- `src/lib/config.ts`, `src/app/(ko)/about/`, `src/app/(en)/en/about/`

## 임무
1. **확정 사항 반영**: D1~D6이 PRD에 빠짐없이, 확정된 대로만 들어갔는지 본다. 결정되지 않은 것을 확정처럼 쓴 곳이 있는지 본다.
2. **약관 문안**: 법적 효과를 보장하는 표현, "법정 의무" 표현, 근거 없는 단정이 있는지 본다. "지체 없이"·"3영업일" 같은 처리 기준이 실제로 운영 가능한지 본다. 익명 운영 원칙과 충돌하는지 본다. ko/en이 같은 뜻인지 본다.
3. **§6⑥ 적용 범위 단서**("운영자 자칭 문구에만 적용, 보도 인용 제외")가 D6 취지와 맞는지 본다.
4. **금지 표현 전수 조사**를 검증한다. 건수(기자 26파일/61건, 속보 20파일/37건, src 0건)를 재측정하고, "운영자 자칭 0건"이라는 분류 판정을 확인한다.
5. **scope 문서**: 수용 기준을 테스트할 수 있는지, "오늘의 이슈"가 빠졌는지, 연락 경로를 사용자 결정으로 남겼는지 본다.
6. 현재 `contactEmail`이 placeholder로 라이브에 노출되는지 확인하고 사실만 기록한다(수정은 지시로).

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-09-prd-v0.7-news-format-review.md` (측정 도구는 `docs/tools/reviewer-24/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-24-planner-09-prd-v0.7-review-COMPLETE.md` **완료 트리거 파일 생성 필수** (판정·결함·사용자 결정 필요·커밋 대상 경로 목록)
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
대상 수정 금지. git 금지. 빌드 불필요.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (Opus 5.5) · 24-planner-09-prd-v0.7-review`
- history append. 완료 시 반공-슈퍼바이저에 SendMessage
