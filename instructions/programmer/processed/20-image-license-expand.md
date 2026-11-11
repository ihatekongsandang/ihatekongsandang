# 프로그래머 20 — 대표 이미지 라이선스 확대(CC BY-SA·ND·한국판·PD 근거) + 검증·표시·소개 문구

담당: 프로그래머(Opus) · 코드·빌드 · **커밋 금지**(슈퍼바이저가 리뷰어 게이트 뒤 커밋)

## 배경
- 사용자 지시(2026-11-11): "최대한 이미지 많이 사용할 수 있는 방법으로 ㄱㄱ". 대표 이미지가 있는 게시물은 52/209건이다.
- 기획 20·20-1에서 정책을 정했고, 리뷰 71·71-1이 검토했다.
- 기준 문서(먼저 끝까지 읽을 것):
  - `planning/card-image-policy.md` §4.5(-2 허용 라이선스·버전 확인 위계·PD 근거 표, -3 3a·3b, -6 재사용, -11 표시 서식, -14 공공누리 A-2)와 §8
  - `docs/triggers/planner-20-image-max-license-scope-COMPLETE.md`의 **"## 20-1" §2 프로그래머 20 명세(최종본)**. 이것이 구현 목록이다. 앞쪽 항목 9는 옛 판이니 따르지 않는다.
  - `docs/triggers/reviewer-71-planner-20-review-COMPLETE.md`(71·71-1 절). 함정 지적: CC URL은 버전 뒤에 deed·legalcode만 허용, 인접 검사는 publishedAt 기준.
  - 프로그래머 19 트리거(`docs/triggers/programmer-19-image-kind-open-a2-COMPLETE.md`). 기존 구현 구조를 이해하는 데 쓴다.

## 할 일
1. "## 20-1" §2 명세 1~12를 **모두** 구현한다. 요점:
   - license 값 추가: cc-by-sa-2.0/3.0/4.0, cc-by-nd-2.0/3.0/4.0, cc-by-2.0-kr, cc-by-sa-2.0-kr
   - `pdBasis`·`pdBasisYear` 검증. 보호기간 기준은 max(1962, 올해−71)이다.
   - CC URL 검증: 국제판·한국판 오인 방지, 버전 뒤 세그먼트 제한
   - reject 메시지
   - 상세 표시 ko·en
     - BY-SA·ND는 "(변경 없음·크기 조정 외)"를 붙인다.
     - pd는 근거별 고정 문구다. us-gov 문구는 "미국에서 퍼블릭 도메인"이다.
   - **ND 사진은 카드에서 object-contain(자르지 않음)**으로 표시한다.
   - validate 경고
     - A-2 경고 대상을 public까지 넓힌다(caption 접두 기준).
     - 3a·3b caption 접미를 허용한다.
     - 재사용 상한 6건, publishedAt 인접 5건 이내 경고
   - 카드 payload에서 `credit`을 제거한다(리뷰 68 P3-1).
   - 소개 페이지 ko·en의 장비 구절은 명세 문구를 **글자 그대로** 쓴다.
   - `content/README.md`를 갱신한다.
   - `next/image`: 기증만 제외(기존 유지)
2. 테스트: 명세의 테스트 항목을 전부 넣는다(양성·음성, 렌더 문구 ko·en, ND 카드 object-contain, OG·JSON-LD·사이트맵 회귀).
3. 소개 문구가 바뀌면 copy-exact 기대값도 갱신한다.

## 검증
- `npm run validate:content`(R=0. 지금 게시물 수 기준으로 전부 통과, 새 경고 수를 기록), typecheck, lint, test, build가 모두 통과해야 한다.
- 🔴 `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree`의 exit 0을 확인한다(로그를 남길 경우 임시 경로는 `<tmp>`로 가린다).
- 업로더가 같은 작업 폴더에서 `content/posts*`·`public/images/`를 고치는 중일 수 있다. 그 파일은 건드리지 않는다. validate 결과에 업로더 진행분이 섞이면 따로 적는다.
- 임시 테스트 게시물을 만들어 검증했다면 반드시 지운다.

## 🔴 금지
- git 쓰기(add·commit·push) 금지. 실제 게시물·이미지 추가·수정 금지.
- 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id·사진 저작자 이름 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/programmer-20-image-license-expand-COMPLETE.md`
  - 명세 1~12 각각의 구현 위치(파일:줄)
  - 검증 명령과 결과(R 값·테스트 수), 게이트 exit 코드
  - 남은 확인 필요
  - 커밋할 경로 목록
- 끝나면 이 오더를 `instructions/programmer/processed/`로 옮기고, 반공-슈퍼바이저에 SendMessage로 완료를 알린다.
