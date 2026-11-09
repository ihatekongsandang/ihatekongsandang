# 리뷰어 34 — planner-16-q1-q2-plan-review 완료 트리거

**작성일**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5, `claude-opus-5-5`)
**리뷰**: `docs/reviews/planner-16-q1-q2-plan-review.md` · **도구**: `docs/tools/reviewer-34/`

## 판정
**조건부 승인 — P1 0 · P2 4 · P3 11.**
- P2-1~3은 프로그래머 16 착수 전에 고친다(기획자 16-1 또는 프로그래머 16 오더에 리뷰 §2.4 정정 문안을 넣는다). 고친 뒤 계획 문서를 커밋한다.
- P2-4는 SNS 묶음 1 전까지 고친다.

## 결함
- **P2-1**: `moved-ids.txt` 예시 줄(`example-old-id example-new-id`)이 주석이 아니다. 검증 d·f에 걸려 빌드가 실패하거나 404 이동이 생긴다. 예시는 주석으로 둔다.
- **P2-2**: C4 ko 2번의 "언론 기사를 근거로 든 글은 … 불러와 보여 줍니다"는 현재형인데 `kind: news`가 0건이다. 언론 근거 글 5건은 자체 카드 4 + 스레드 사진 저장 1이다. 사이트 제작 이미지 68건도 설명에 없다. 정정 문안은 리뷰 §2.4.
- **P2-3**: 영어 "Images on cards"가 한국어보다 엄격하다(수행원·통역 예외 없음). 첫 공식 일정 사진에서 거짓이 된다. 같은 사건 사진·근거 아님·의혹 사진 설명 고지와 공공누리 줄이 빠졌다. 정정 문안은 리뷰 §2.4.
- **P2-4**: 자막·문구 불일치, 다른 시점 장면, 제3자 캡처 표기 11건이 Tier 3(묶음 4·7·9·11·12·14)에 있다. 묶음 1·2 범위로 올리고 묶음 크기 규칙을 갱신한다.
- P3 11건: 리뷰 §8 표.
  - 주요 항목: 네이버·다음의 308 처리는 확인 필요, `redirects`는 Vercel 조건 밖에 둔다, 시험표에 음성 대조 추가, 핫링크 "모두 깨진다" 단정 표현 수정(만료 후는 미실측), guide 86행 "self·public만".

## 확인한 사실
- 공식 문서로 확인: 308, 처리 순서(headers → redirects → middleware → 파일시스템), 쿼리 전달, 끝 슬래시 기본 리다이렉트(2단 이동 예상), export 모드에서 redirects 불가(현행은 export 아님), Vercel 한도 2,048개 · 4,096자.
- `next.config.ts`에서 `src/` import: Next 15.5.25 소스(require 훅) 기준으로 가능하다. 실측은 프로그래머 16.
- 집계: A 139 + B 68 + 미분류 0 = 207을 독립 재현했다. TSV는 139행이고 A 집합과 정확히 같다. 묶음 합 139.
- 업로더 01 작업 중(45개 파일)에는 출처 수치만 달라진다: 원 매체 134 → 135, 2곳 이상 116 → 125. A·B·TSV는 변함없다.
- 핫링크 재시험 1건: 만료 표식이 같고, 서명을 바꾸면 403. ① 채택 불가 결론은 유지된다.
- 저장소 독립 grep(훅 패턴 + 홈 디렉터리명)과 옛 id 문자열 grep: 대상 문서·planner-16 도구·트리거 16·이 리뷰·reviewer-34 도구·이 트리거 **모두 0건**.

## 사용자 확인 필요
1. 핫링크를 쓸 수 없으므로, 언론 사진이 안 되는 저장본을 대체 카드로 내리는 데 동의하는지.
2. (알림) 옛 id 문자열이 공개 저장소에 남는다: `moved-ids`·`retired-ids`, git 이력, 측정 기록 17개 파일.
3. (알림) 새 SNS 게시물은 원 이미지를 저장하지 않는다(슈퍼바이저 판단).

## 프로그래머 16 최종 범위
- **C3**: 주제 통일.
- **C4**: `sourcePreviewNote`에서 "썸네일" 삭제. 소개 ko는 16 재정정본에 P2-2를 반영한다. 영어 절 추가는 P2-3을 반영한다. `copy-exact` 갱신.
- **C5**: 이동 경로 간격.
- **C11**:
  - `moved-ids.txt`(예시는 주석만)와 공유 함수 `moved-ids.ts`
  - `redirects()`: Vercel 조건 밖에 둔다, 308(301 선택지는 슈퍼바이저 판단), 영어 분기는 번역 맵 기준
  - 검증 a~h(+옛 이미지 폴더), `ID_PATTERN` export
  - README의 moved-ids 절과 id 행
  - 시험 §1.7 1~9 + 음성 대조
  - #1은 옮기지 않는다
- 커밋 분할: C3·C4·C5 → C11 (타당).
- 착수: 업로더 01 종료 뒤.

## 커밋 대상 경로
- 기획자 16 산출물(P2-1~3 정정 후):
  - `planning/q1-redirect-q2-sns-image-plan.md`
  - `planning/v0.9-copy-and-code-list.md`
  - `docs/tools/planner-16/`
  - `docs/triggers/planner-16-q1-q2-plan-COMPLETE.md`
  - `instructions/planner/processed/16-q1-redirect-q2-sns-image-plan.md`
- 슈퍼바이저 guide: `docs/poster/guide.md`
- 리뷰어 34:
  - `docs/reviews/planner-16-q1-q2-plan-review.md`
  - `docs/tools/reviewer-34/`
  - `docs/triggers/reviewer-34-planner-16-q1-q2-plan-review-COMPLETE.md`
  - `instructions/reviewer/processed/34-planner-16-q1-q2-plan-review.md`
- `history/2026-11-09.md`
- ⚠️ `content/`의 업로더 01 작업 중 변경(45개 파일)은 이 커밋에 넣지 않는다.
