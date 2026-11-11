# 기획자 18 — 자체 카드 0건 문서 정리 + 묶음 1~5 선례 정책 반영

담당: 기획자(Sonnet) · 문서만 · 커밋 금지

## 배경
- 자체 제작 카드 67건 정리 완료(묶음 1~5, 커밋 e7ff1cd·665f66c·4e732d3·05319ff·253bcef). 결과 ② 10 · ③ 57, `public/images/` `.gitkeep`만, validate self 0 · news 33.
- 소개 ko·en의 자체 카드 줄은 프로그래머 18(f5f2f9e)로 삭제됨. 하위 목록은 언론 사진·공공누리·대체 이미지 3개.
- 근거: `docs/triggers/reviewer-64-poster-image-67-5-review-COMPLETE.md` 5번 목록, `docs/triggers/reviewer-65-programmer-18-review-COMPLETE.md`, 묶음 트리거 `docs/triggers/poster-image-67-{1..5}-COMPLETE.md`, 리뷰어 59~63 트리거.

## 할 일
1. **사실 갱신**(현재 화면·데이터와 글자 그대로 맞춘다):
   - `planning/q1-redirect-q2-sns-image-plan.md` §2.2 ko·en 문안에서 자체 카드 줄을 빼고(17-5-1과 같은 ※ 일반 문단 방식, 앞뒤 빈 줄 — 리뷰어 58-1 P3-1), §3.4 완료 조건 표(:287·:288 부근) 상태 갱신.
   - `planning/v0.9-copy-and-code-list.md` C4 행·목록 같은 방식.
   - `planning/prd.md:325` 부근 "67건은 남아 있다" 등 자체 카드 잔존 서술.
   - `planning/card-image-policy.md` 머리·§0·§11 등 "자체 제작 텍스트 카드 67건" 대상 서술에 완료 상태 한 줄(본문 규칙은 유지 — 앞으로 새 게시물에도 적용).
   - `planning/card-image-uploader-steps.md` 머리 착수 조건 a~e 표를 현재 상태로(충족 근거 커밋), 67건 작업 완료 표시.
   - `content/README.md:195` `self` 설명(현재 0건).
2. **묶음 선례를 정책 문구로**(사용자 결정이 아니라 슈퍼바이저 판단 선례 — "슈퍼바이저 판단(2026-11-11), 사용자 이의 시 변경"으로 표기):
   - (a) 정책 §5.3 제외 목록에 한 항목: 사진 속 명패·이름표·현판·간판으로 **비공인 실명** 또는 **의혹 대상으로 지목된 비공인 단체·사업장 이름**이 원본 해상도에서 읽히면 불가(묶음 3 #5, 묶음 4 #11).
   - (b) §3.3 (나) 3b에 한 줄: 의혹 사안에서 의혹 대상 조직 소속 비공인(직원·배석자)이 정면으로 크게 나오면 3b를 적용하지 않는다(묶음 3 #25).
   - (c) 업로더 지침 단계 2 1번에 명시: 후보 사진은 게시물 `sources[]` 기사에서만 고르고, 사진만을 위해 출처를 더하지 않는다. 출처 밖 후보는 "참고 후보"로 기록만(묶음 3 #25).
   - (d) §3.5 faceNote 원경 형식에 "인원이 많아 세기 어려우면 `원경 인물 n명 이상`" 허용(리뷰어 59 P3-1).
   - guide §4-1에 반영할 문안 4줄을 트리거에 따로 적는다(guide는 슈퍼바이저가 고친다).
3. 문서 머리 변경 기록에 기획자 18 한 줄씩.

## 🔴 금지
- `src/`·설정·`content/posts*`·`docs/poster/guide.md` 수정 금지, git 쓰기 금지. 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id·사진 기자 이름 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/planner-18-self-card-zero-docs-and-precedents-COMPLETE.md` — 바꾼 파일:줄(전후), guide 반영 문안, grep 결과(자체 카드 잔존 서술 0 — 이력·기록 표기 제외).
- 끝나면 이 오더를 `instructions/planner/processed/`로 옮긴다.
