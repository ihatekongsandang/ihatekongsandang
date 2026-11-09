# md오더: 리뷰어 (Opus 5.5) - 30-card-image-policy-legal-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 30

## 자격·역할 (Required)
리뷰어 (Opus 5.5) 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지, 근거 없으면 "확인 필요".

## 배경
사용자는 자체 제작 텍스트 카드 67건을 실제 이미지로 바꾸기로 했다(2026-11-09).
- 순서: 1순위 A 공공누리, 2순위 B 근거 언론 기사 `og:image` 핫링크
- 🔴 사용자 결정(얼굴 기준 2안): "정치인 등 공인의 공적 활동 사진은 허용". 비공인·미성년자·피해자·부상자는 제외한다.
- 기획자 13이 정책(`planning/card-image-policy.md`)을 만들었다. 이 문서는 사용자 결정 전에 쓰여 3안을 권장한다. 그러니 2안 기준으로 읽는다.
- 조사 14는 67건을 전수 조사했다. 공인 얼굴을 허용하면 A 13, B만 38, B 조건부 5, 둘 다 없음 11이다.

이번 일은 PRD v0.9 반영과 프로그래머·업로더 착수 전에 하는 법률·정책 게이트다.

## 선행 검토 문서 (Required)
- `planning/card-image-policy.md`, `docs/triggers/planner-13-card-image-policy-COMPLETE.md`
- `docs/tools/planner-14/summary.md`·`candidates-by-post.csv`·`image-judgments.tsv`, `docs/triggers/planner-14-text-card-image-survey-COMPLETE.md`
- `planning/prd.md` v0.8 §5·§6③, `content/README.md` §3, `docs/poster/guide.md`
- 저작권법 제7조·제24조의2·제28조·제35조의5, 초상권·퍼블리시티 관련 판례(한국 법령·판례 조회 도구가 있으면 쓴다)

## 임무
1. **법률 판단**
   - B 핫링크가 저작권법상 복제·전송에 해당하는지 판례로 확인한다. 대법원 판례 등 원문을 찾는다.
   - 카드 대표 이미지로 보도사진을 쓰는 것이 제28조 인용이나 제35조의5 공정이용 요건을 충족할 여지가 있는지 판단한다.
   - 공인 얼굴 사진의 초상권 판례 기준을 정리한다.
   - 결론마다 위험 등급(상·중·하)과 완화책을 적는다.
2. **정책 문서 정합**: `card-image-policy.md`를 사용자 2안 기준으로 읽는다.
   - 고칠 곳을 표로 만든다(3안 권장 문구, 제외 기준 등).
   - 제4유형(청와대 사진 자료실 5건)을 제외하는 판단이 맞는지 본다.
   - korea.kr "텍스트에 한하여" 발견을 반영했는지 본다.
3. **조사 결과 검증**: `image-judgments.tsv`에서 다음 항목을 표본 없이 전수 대조한다.
   - "공인" 판정
   - 제외 사유가 되살아나는 4건(#49·#53·#66·#67)
   - 신원 확인 필요 33장
   - 대조할 수 있는 범위에서 판정 오류를 적는다.
4. **진행 조건**: 아래 셋 각각에 착수 조건과 필수 완화책을 정한다. 하나만 고르는 질문이 아니다.
   - 업로더 적용
   - 프로그래머 코드 변경(P1~P12)
   - 연락 창구 미확정 상태에서 B를 시작하는 것

## 산출물 (Required)
- 리뷰 `docs/reviews/card-image-policy-legal-review.md` (도구는 `docs/tools/reviewer-30/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-30-card-image-policy-legal-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 법률 위험 등급표
  - 정책 문서 수정표
  - 판정 오류 목록
  - 착수 조건
  - 사용자 결정 필요
  - 커밋 대상 경로
- 처리 후 본 파일 → `instructions/reviewer/processed/` 이동

## 제약
- 대상 수정 금지. git 쓰기 금지. 빌드 금지.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 30-card-image-policy-legal-review`
- history append
