# md오더: 리뷰어 (Opus 5.5) - 27-planner-11-v0.2-decisions-sync-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 27

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지, 근거 없으면 "확인 필요".

## 배경
기획자 11은 배포된 v0.2와 기획 문서를 맞췄다. 손질한 문서는 PRD v0.8, scope, terms-page-copy다. 남은 P3 판단은 `planning/v0.2-post-release-sync.md`에 정리했고, 코드 반영이 필요한 문구는 8건으로 모았다. 이번 일은 커밋 전 문서 게이트다. 코드 반영은 이 리뷰를 통과한 뒤 별도 프로그래머 오더로 넘긴다.

## 선행 검토 문서 (Required)
- 대상
  - `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`
  - `planning/v0.2-post-release-sync.md`
  - `git diff -- planning/`(prd·scope·terms-page-copy)
- 오더 `instructions/planner/processed/11-v0.2-decisions-sync.md`
- 리뷰 25·26 P3 항목, `planning/en-d1-reconfirm.md`
- 배포 소스(읽기): `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`, `src/app/(ko)/terms/page.tsx`, `src/app/(en)/en/terms/page.tsx`, `src/lib/config.ts`

## 임무
1. **사실 정합**: PRD v0.8·scope가 실제 배포 상태와 사용자 결정 4c·5a를 정확히 적었는지 본다. 사용자 결정과 슈퍼바이저 판단이 구분돼 있어야 한다.
2. **P3-8 대조 재현**: 약관 문안 ko 29/29·en 29/29 일치 주장을 직접 재현한다. 문안 밖 문장 6개와 차이 10건 표도 확인한다.
3. **코드 반영 8건 문구 게이트**: 아래를 판정하고, 승인할 최종 문구 전문(ko·en)을 확정한다.
   - 각 문구의 정확성
   - D6 자칭 금지
   - 영어 의미 동등(scope 2.1-2 기획자 확인은 기획자 11이 같이 냈다)
   - 🔴 P3-5는 약관 약속을 일부 완화한다. 독자에게 불리하게 바뀌는지, 고지 방식이 충분한지 특히 본다.
4. **D1 "등록된" 풀이와 법령 확인**: 뉴스통신사(「뉴스통신 진흥에 관한 법률」)와 방송사업자(「방송법」)의 법적 지위가 등록·허가·승인 중 무엇인지 법령 원문으로 확인한다. 법령 조회 도구가 있으면 쓰고, 없으면 "확인 필요"로 둔다. 풀이 문장 안이 법령과 맞는지 판정한다.
5. **저장소 독립**: 변경 문서 grep 0건.

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-11-v0.2-decisions-sync-review.md` (도구는 `docs/tools/reviewer-27/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 결함 P1~P3
  - 승인된 코드 반영 최종 문구 전문(파일·현행·변경안)
  - 사용자 결정 필요
  - 커밋 대상 경로 목록
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 수정 금지. git 쓰기 금지(`git diff`·`git status` 허용). 빌드·`next start`·의존성 설치 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 27-planner-11-v0.2-decisions-sync-review`
- history append
