# 프로그래머 18 — 소개 페이지 "사이트가 만든 카드 이미지" 줄 삭제 (자체 카드 0건 후속)

담당: Opus5 창(공산당이싫어요 `~/ihatekongsandang`) · 빌드 있음 · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 배경
- 자체 제작 카드 67건 정리가 끝났다(묶음 1~5, 업로더 21~25). `content/posts*`에서 `image.src`가 `/images/…`인 게시물 0, `public/images/`는 `.gitkeep`만. 묶음 5는 리뷰어 64 검토 중이며 커밋은 그 뒤 — **이 오더의 변경은 묶음 5 배포 뒤에 커밋된다.**
- 그래서 소개 페이지 "카드의 대표 이미지" 하위 목록의 "일부 글은 이 사이트가 게시물 요지를 정리해 만든 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다."(en "Some posts use a card image this site made to summarize the post. These will also be replaced step by step.")는 사실과 다르다.
- 사용자 승인: 2026-11-11 "1 ㄱㄱ"(67건 정리) 후속으로 슈퍼바이저가 지시. 선례: 프로그래머 17(같은 목록 SNS 줄 삭제).

## 선행 문서 (반드시 읽기)
1. `CLAUDE.md`, `instructions/programmer/processed/17-about-sns-stored-line-remove.md`와 그 트리거·핸드오프(같은 방식)
2. `planning/q1-redirect-q2-sns-image-plan.md` §2.2(현재 문안, 17-5-1 ※ 줄)

## 할 일
1. `src/app/(ko)/about/page.tsx`·`src/app/(en)/en/about/page.tsx`에서 해당 `<li>` 하나씩 통째로 삭제. 다른 줄은 한 글자도 바꾸지 않는다. 남는 하위 목록은 3개(언론 사진 · 공공누리 · 대체 이미지).
2. 회귀 도구: `docs/tools/programmer-17/copy-exact-about.py`는 기획 §2.2를 읽어 SNS 줄을 찾는 전제로 짜여 있어 지금 FAIL이 난다(리뷰어 58-1 기록). 새 도구 `docs/tools/programmer-18/copy-exact-about.py`를 만들어 **기대 목록을 코드에 직접 적어**(ko·en 하위 3개 글자 그대로) 빌드 HTML과 대조 + 옛 문구 2종(SNS 줄·자체 카드 줄) 0회 확인. 양성 대조 포함.
3. grep 보고(고치지 않음): 자체 카드가 있다는 취지의 방문자 문구(약관·안내문·`llms.txt`·메타·`sourcePreviewNote` 등)와 `kind: self` 관련 코드 주석·README 설명 위치를 트리거에 목록화.
4. 검증: typecheck·lint·`npm run build`·`/about`·`/en/about` 렌더(하위 목록 3개, 옛 문구 0)·`npm run validate:content`·`bash docs/tools/programmer-07/clean-clone-gate.sh --worktree`.

## 🔴 금지
- git add·commit·push 금지. 범위 밖 코드·설정·콘텐츠 수정 금지(작업 트리에 업로더 25 미커밋 변경이 있음 — 손대지 않음).
- 다른 서비스명·계정명·홈 디렉터리 절대경로·비공인 실명·옛 id 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/programmer-18-about-self-card-line-remove-COMPLETE.md` — 바꾼 파일:줄(전후), 새 도구 결과·양성 대조, grep 목록, 검증 결과, 이 오더 대상만의 커밋 경로, `git status --short`.
- 끝나면 이 오더를 `instructions/programmer/processed/`로 옮기고 반공-슈퍼바이저에 SendMessage 한 줄.
