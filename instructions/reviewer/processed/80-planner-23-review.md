# 리뷰 80 — 기획 23(주제 담당 기관 좁은 안 반영 + 공공누리 제3유형 조사) 검토

담당: 반공-리뷰어 · 빌드 없음 · 수정·커밋 금지

## 대상
- `docs/triggers/planner-23-topic-agency-rule-and-kogl3-scope-COMPLETE.md`, `docs/triggers/planner-22-topic-agency-archive-photo-scope-COMPLETE.md`
- `git diff -- planning/card-image-policy.md planning/card-image-uploader-steps.md planning/prd.md`
- 오더: `instructions/planner/processed/23-*.md`, `22-*.md`

## 점검
1. **§4.5-3e 좁은 안**: 조건 ①~⑥과 제외 대상이 기획 22 초안과 같은지, 오도 위험을 막기에 충분한지 본다. §4.5-5(기관 의혹)와 충돌하지 않는지, caption ko·en이 `schema.ts`의 형식 판정에서 경고를 내지 않는지(읽어서 확인) 본다.
2. **판정 순서·연작 정의**(리뷰 77 P3-3·P3-4)가 리뷰 74·75·77 선례와 맞는지.
3. **영어 장소 문구 단축**(리뷰 78 P3-1)이 이미 게시된 게시물(neveragain·newsbanhana)과 충돌하는지. 충돌하면 기존 게시물을 그대로 둘지, 고칠지 권고한다.
4. **기획 22 R1 52건 판정**에서 ✅ 2건과 애매 6건을 몇 건 직접 열어 보고, 판정이 과하게 보수적이거나 느슨하지 않은지 본다.
5. **B 공공누리 제3유형**: 근거 인용이 공식 원문과 맞는지 직접 연다. "✅ 0"이라는 결론과, 정책에 반영하지 않는 권장이 타당한지 본다. 크기 조정이 형식 변경인지 원문에서 확인할 수 있으면 적는다.
6. 리뷰 79 P3-4(국회 06T003 연작이 11건으로 상한 8건 초과·인접)를 새 연작 정의로 다시 셌을 때 결과가 어떤지 적는다.
7. guide 반영 문장이 정책과 같은 뜻인지.
8. 저장소 독립·민감정보 grep.

## 🔴 금지
- 파일 수정, git 쓰기, 빌드. 트리거에 저작자 이름·비공개 실명·옛 id·다른 서비스명·계정·홈 경로를 쓰지 않는다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-80-planner-23-review-COMPLETE.md`(판정·P 목록 파일:줄·수정안·최종 커밋 경로). 끝나면 오더를 processed/로 옮긴다.
