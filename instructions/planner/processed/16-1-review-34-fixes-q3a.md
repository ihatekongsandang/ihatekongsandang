# 기획자 16-1 — 리뷰 34 지적 반영 + 사용자 결정 Q3=a 기록

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: 하위 에이전트(sonnet, 빌드 없음)

## 선행 문서 (먼저 읽기)
- `docs/reviews/planner-16-q1-q2-plan-review.md` (특히 §2.4 정정 문안, §8 P3 표)
- `docs/triggers/reviewer-34-planner-16-q1-q2-plan-review-COMPLETE.md`
- `planning/q1-redirect-q2-sns-image-plan.md`, `planning/v0.9-copy-and-code-list.md`
- `docs/tools/planner-16/` (sns-image-batches.tsv 포함), `docs/poster/guide.md` §4·§4-1

## 사용자 결정 (2026-11-09)
- **Q3 = a**: 언론 이미지(B)로 바꿀 수 없는 SNS 저장본은 **대체 카드로 내린다**(저장 파일 삭제). 저장본을 그대로 두는 선택지는 쓰지 않는다.
- (알림 확인) 새 SNS 게시물은 원 이미지를 저장하지 않는다 — guide §4에 이미 반영됨.

## 할 일
1. **P2-1**: 계획 문서의 `moved-ids.txt` 예시를 모두 주석(`#`)으로 바꾼다.
2. **P2-2·P2-3**: 계획 문서·`v0.9-copy-and-code-list.md`의 C4 ko 소개 문안과 영어 "Images on cards" 문안을 리뷰 34 §2.4 정정 문안과 **글자 그대로** 맞춘다(프로그래머 16 오더는 §2.4를 쓴다).
3. **P2-4**: 자막·문구 불일치 / 다른 시점 장면 / 제3자 캡처 표기 11건을 `docs/tools/planner-16/sns-image-batches.tsv`에서 묶음 1·2로 올린다. 묶음 합 139 유지. 계획 문서 §3 묶음 크기·순서 규칙과 표를 갱신한다. 바뀐 묶음별 건수를 표로 적는다.
4. **Q3=a 기록**: 계획 문서 5행 근처 "사용자 결정"에 Q3 = a를 추가하고, §3.5(사용자 확인 필요)를 "확정"으로 바꾼다. "③ 대체 카드"를 ②불가 시 확정 경로로 적는다.
5. P3 중 문서만으로 고칠 수 있는 것(핫링크 "모두 깨진다" 단정 표현 → "만료 후는 미실측"으로 완화, 시험표에 음성 대조 추가)만 반영. 코드가 필요한 P3는 건드리지 않고 목록으로 남긴다.

## 금지
- git 명령(add·commit·push·stash·checkout) 금지. 코드·설정·`content/`·`public/` 수정 금지. 빌드·npm 금지.
- 저장소 독립: 다른 서비스명·계정명·홈 디렉터리 절대경로 금지. 비공인 실명(로마자 포함) 금지. 옛 #1 id 문자열을 새로 쓰지 않는다.

## 🔴 완료 트리거 (필수)
`docs/triggers/planner-16-1-review-34-fixes-q3a-COMPLETE.md` 생성: 작성 세션·실제 모델 ID, 고친 파일 경로 목록, P2-1~4 각각 반영 위치(파일:행), 묶음별 건수 전/후 표(합 139), 남긴 P3 목록, 자체 grep 결과(금지 패턴 0건).
완료 후 이 오더를 `instructions/planner/processed/`로 옮긴다.
