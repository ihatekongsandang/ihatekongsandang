# md오더: 기획자 (Sonnet 5.5) - 11-1-review-27-doc-fixes

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 11-1

## 자격·역할 (Required)
기획자 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지.

## 배경
리뷰 27은 기획자 11을 조건부 승인했다. 문서에서 고칠 것은 아래와 같다. 코드 반영 문구 8건은 리뷰어가 최종 문구를 확정했다. 그 확정본을 기획 문서에도 같게 옮긴다.

슈퍼바이저 판단(P3-6): 약관에 개정일을 표기한다. 표기는 "최종 개정: YYYY-MM-DD" / "Last updated: YYYY-MM-DD"이고, 날짜는 코드 반영 배포일로 한다.

## 선행 검토 문서 (Required)
- 🔴 리뷰 27 `docs/reviews/planner-11-v0.2-decisions-sync-review.md`
- 리뷰 27 트리거 `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md`(승인 문구 #1~#8 전문)
- `planning/prd.md`, `planning/news-format-v0.2-scope.md`, `planning/terms-page-copy.md`, `planning/v0.2-post-release-sync.md`

## 임무
1. **P2-1** `planning/prd.md` 76행 근처의 "카드 갱신 표시 추가 여부는 사용자가 아직 결정하지 않았다"를 "5a로 확정"으로 고친다.
2. **P3-1** PRD 366행 근처와 scope §1 표 2행의 `/terms` "제안"을 "확정"으로 바꾼다.
3. **P3-7** 문서 정리
   - terms-copy §C "§4-2"를 "§4.2"로 고친다.
   - sync §5·§8과 기획자 11 트리거의 "법령 확인 필요"는 "리뷰 27 §4로 해소"로 바꾸고 확인 결과를 한 줄로 적는다.
   - PRD "(오더 11·…)"를 "프로그래머 오더 11"로 고친다.
4. **확정 문구 반영**
   - `planning/v0.2-post-release-sync.md` §6과 `terms-page-copy.md` 개정 대기(§C)를 리뷰 27 승인본 #1~#8 전문으로 바꾼다.
   - 위 슈퍼바이저 판단의 개정일 표기를 #9로 추가한다(ko·en 약관 각 1줄).
5. **잔여 확인**: 위 키워드("아직 결정하지", "제안", "확인 필요")로 남은 모순을 grep해 0건임을 확인한다.

## 산출물 (Required)
- 수정: 위 4개 planning 문서

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-11-1-review-27-doc-fixes-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 고친 행(전·후)
  - 코드 반영 최종 목록 #1~#9
  - 커밋 대상 경로
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 제약
- `src/`·`content/`·시안·guide 수정 금지. git·빌드 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 기획자 (실제 모델명) · 11-1-review-27-doc-fixes`
- history append
