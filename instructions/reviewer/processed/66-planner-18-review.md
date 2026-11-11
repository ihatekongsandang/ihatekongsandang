# 리뷰어 66 — 기획자 18(자체 카드 0건 문서 정리·선례 4건 정책 반영) + guide §4-1 검토

담당: 리뷰어(Opus 5.5) · 문서만 · 커밋 금지

## 대상
- `docs/triggers/planner-18-self-card-zero-docs-and-precedents-COMPLETE.md`, `planning/{q1-redirect-q2-sns-image-plan,v0.9-copy-and-code-list,prd,card-image-policy,card-image-uploader-steps}.md`, `content/README.md` 195행
- `docs/poster/guide.md` §4-1 슈퍼바이저 반영분(5줄 추가·2줄 수정: 불가 사진 12항, 명패·현판·간판, sources 한정, 의혹 조직 비공인, faceNote n명 이상)

## 확인할 것
1. 사실 갱신이 실제와 맞는지: 자체 카드 0(`content/posts*` `/images/` 0, `public/images/` `.gitkeep`만), 묶음별 ②/③ 숫자와 커밋 해시, 착수 조건 a~e 근거 커밋(7e8b2fd·0e5fb93·c8375de·6f0f941·059d5a5·f5f2f9e)이 그 내용을 담고 있는지 `git show --stat`로 확인.
2. q1 §2.2 ko·en·v0.9 목록 하위 3개가 소개 화면(`src/app/(ko)/about/page.tsx`·`(en)`)과 글자 그대로 같은지, ※ 문단 앞뒤 빈 줄.
3. 선례 4건 문구: 정책 §5.3-12·§3.3 (나) 5항·업로더 단계 2 1번·§3.5와 guide 반영분이 서로 같은 뜻인지, "슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경" 표기, "11항→12항" 번호 변경이 다른 참조(정책·지침·guide·PRD·트리거 아닌 현행 문서)와 충돌 없는지 grep.
4. 기존 규칙과 충돌: §3.3 (나) 3b·(다) 원경, PRD §6③, guide §2와 모순 없는지.
5. 변경이 문서만인지(`src/`·`content/posts*` 0), 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id·사진 기자 이름 0.

## 🔴 금지
- git 쓰기·빌드·코드 수정 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-66-planner-18-review-COMPLETE.md` — 판정, P1~P3, 커밋 경로.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
