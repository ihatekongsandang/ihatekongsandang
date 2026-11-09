# md오더: 리뷰어 (Opus 5.5) - 34-planner-16-q1-q2-plan-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 34

## 자격·역할 (Required)
리뷰어 자격으로 수행한다. CLAUDE.md §1~§9를 준수한다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다.

## 배경
기획자 16이 사용자 결정 Q1=b, Q2=b를 받아 계획을 냈다.
- Q1=b: #1 id 이전 + 308 리다이렉트
- Q2=b: SNS 저장본 139건을 정리하고 소개 문구를 고친다
- 함께 낸 것: 프로그래머 16의 범위(C3·C4·C5·C11)

이 계획을 받아 슈퍼바이저가 정한 것:
- 영어 소개에 "Images on cards" 절을 추가한다.
- 새 SNS 게시물은 원 이미지를 저장하지 않는다. guide에 이미 반영했다.
- 측정 기록 19개 파일에 남은 옛 id는 시점 기록이라 고치지 않는다.
- guide에 "id에 비공인 실명 금지"를 넣었다. `content/README.md`에는 프로그래머 16이 넣는다.

## 선행 검토 문서 (Required)
- `planning/q1-redirect-q2-sns-image-plan.md`, `docs/triggers/planner-16-q1-q2-plan-COMPLETE.md`, `docs/tools/planner-16/`
- `git diff -- planning/v0.9-copy-and-code-list.md docs/poster/guide.md`
- 리뷰 30·32, 현행 코드(`next.config.ts`, `src/lib/content/`, 사이트맵·llms.txt), Next.js redirects 공식 문서

## 임무
1. **리다이렉트 사양 정확성**: 다음을 확인한다. 공식 문서도 직접 대조한다.
   - `next.config.ts`의 `redirects()`가 SSG/Vercel에서 동작하는지
   - 308 처리, 영어 주소 분기, 끝 슬래시·쿼리 처리
   - `next.config.ts`에서 `src/` 파일을 import할 수 있는지
   - Vercel 리다이렉트 개수 한도
   - 검증 8가지와 시험표 9항이 충분한지
2. **C4 문안**: 사실과 맞는지 판정한다(139건 저장 사실, "정리 중"). 과장과 거짓이 없어야 하고 D6·저작권 표현을 지켜야 한다. 영어 "Images on cards" 문안의 의미 동등성도 본다.
3. **139건 집계 재현**: 207건 전수를 다시 세어 139 + 68 = 207을 확인한다. 묶음 배정 tsv의 합이 맞는지 본다.
4. **핫링크 시험 판정**: ① 채택 불가 결론이 근거와 맞는지 판정한다(서명·만료 주소).
5. **guide 슈퍼바이저 추가 2줄**: 정책·사용자 결정과 맞는지 본다.
6. **프로그래머 16 범위**: C3·C4·C5·C11의 최종 범위와 커밋 분할 권고가 타당한지 판정한다.
7. 저장소 독립 grep 0, 비공인 실명 0(산출물)을 확인한다.

## 산출물 (Required)
- 리뷰 `docs/reviews/planner-16-q1-q2-plan-review.md` (도구는 `docs/tools/reviewer-34/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-34-planner-16-q1-q2-plan-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 결함
  - 사용자 확인 필요
  - 프로그래머 16 최종 범위
  - 커밋 대상 경로
- 처리 후 본 파일 → `instructions/reviewer/processed/`

## 제약
- 대상 수정 금지, git 쓰기 금지, 빌드 금지.

## 완료 보고
- 서두: `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 34-planner-16-q1-q2-plan-review`
- history에 append한다.
