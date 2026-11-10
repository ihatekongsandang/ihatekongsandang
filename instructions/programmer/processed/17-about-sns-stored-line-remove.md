# 프로그래머 17 — 소개 페이지 "SNS 이미지 저장" 줄 삭제 (C4 후속)

담당: Opus5 창(공산당이싫어요 `~/ihatekongsandang`) · 빌드 있음 · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 배경
- 정리 묶음 14(커밋 0e3d93b, 배포 성공)로 SNS 원 게시물 저장 이미지가 139 → 0건이 됐다.
- 그래서 소개 페이지의 "SNS 게시물을 다룬 글 중 상당수는 … 저장해 보여 줍니다 … 정리하기로 했으며" 줄은 이제 사실과 다르다.
- 근거: `planning/q1-redirect-q2-sns-image-plan.md` §2.2(171행 "저장본이 0건이 되면 해당 줄 삭제")·§3.4 완료 조건 ③(287행). 사용자 승인 2026-11-10("권장대로 ㄱㄱ").

## 선행 문서 (반드시 읽기)
1. `CLAUDE.md`, 위 기획 문서 §2.2·§3.4
2. `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`(C4를 넣은 오더)와 그 트리거·핸드오프

## 할 일
1. `src/app/(ko)/about/page.tsx` "카드의 대표 이미지" 목록에서 **SNS 줄(`<li>` 하나) 통째로 삭제**. 다른 줄은 한 글자도 바꾸지 않는다. 셋째 줄("일부 글은 … 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다")은 자체 제작 카드가 남아 있어 **유지**.
2. `src/app/(en)/en/about/page.tsx`의 같은 줄("Many posts about social media posts … stored on this site …" `<li>`)도 삭제.
3. 이 문구를 기대값으로 가진 검사(`copy-exact` 등 테스트·스크립트·e2e)가 있으면 기대값을 같이 고친다. `grep -rn "저장해\|stored on this site" src scripts tests e2e` 등으로 전수 확인.
4. 사이트 다른 곳(안내문·`llms.txt`·메타 설명 등)에 "SNS 이미지를 저장한다"는 취지 문장이 남았는지 grep해 보고만 한다(이번 범위는 소개 페이지 2곳 — 다른 곳이 나오면 고치지 말고 트리거에 위치 기록).
5. 검증: typecheck·lint·test·`npm run build` 통과, 빌드 결과로 `/about`·`/en/about`을 열어 해당 줄이 없고 나머지 목록이 그대로인지 확인(렌더 텍스트 일부를 트리거에), `npm run validate:content` 통과. `bash docs/tools/programmer-07/clean-clone-gate.sh`(작업 트리 기준) 결과.

## 🔴 금지
- git add·commit·push 금지. 범위 밖 코드·설정 수정 금지.
- 다른 서비스명·계정명·홈 디렉터리 절대경로 금지. 비공인 실명·옛 id 문자열 금지.
- 빌드는 이 창에서만(다른 창과 `.next` 충돌).

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md` — 바꾼 파일:줄(전후), 테스트 기대값 변경, grep 결과, 검증 명령과 결과, `git status --short`.
- 끝나면 이 오더를 `instructions/programmer/processed/`로 옮기고 반공-슈퍼바이저에 SendMessage 한 줄.
