# 리뷰어 65 — 프로그래머 18(소개 자체 카드 줄 삭제) 검토

담당: 리뷰어(Opus 5.5) · 빌드 1회 허용(다른 창 빌드 없음) · 커밋 금지

## 대상
- `docs/triggers/programmer-18-about-self-card-line-remove-COMPLETE.md`·핸드오프·`docs/tools/programmer-18/`, `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`
- 기준: `instructions/programmer/processed/18-about-self-card-line-remove.md`, 선례 리뷰어 58·58-1

## 확인할 것
1. src diff가 `<li>` 2개 삭제뿐인지(다른 글자 변화 0), JSX 구조 정상, 남은 하위 목록 3개.
2. 사실 확인: 작업 트리 기준 `content/posts*`에 `image.src: /images/…` 0, `public/images/` `.gitkeep`만(업로더 25 미커밋 — 리뷰어 64가 판정 중, 이 리뷰는 사실만 확인).
3. 새 도구 `copy-exact-about.py`의 기대값이 화면과 글자 그대로인지, 양성 대조가 실제로 실패를 잡는지 직접 재실행.
4. 방문자 문구 grep 결과(자체 카드 취지 0, OG "자체 이미지" 문장은 공유 미리보기라 무관하다는 판단)가 맞는지.
5. typecheck·lint·build·`/about`·`/en/about` 렌더·validate.
6. 이 오더 대상만의 커밋 경로 목록(업로더 25 변경 제외). 미해결(ko 84행·en 37행 주석, 기획 §2.2 문안 갱신 필요 여부) 의견.
7. 산출물에 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id 0.

## 🔴 금지
- git 쓰기, `src/`·설정·콘텐츠 수정 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-65-programmer-18-review-COMPLETE.md` — 판정, P1~P3, 커밋 경로, 검증 결과.
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
