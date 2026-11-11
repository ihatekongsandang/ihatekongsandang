# 리뷰어 73 — 프로그래머 20 검토 (라이선스 확대: CC BY-SA·ND·한국판·PD 근거 · 검증 · 표시 · 소개 문구)

담당: 리뷰어(Opus) · 검토(테스트 실행 가능) · 파일 수정·git 쓰기 금지 · 이 검토 결과가 커밋 게이트

## 대상
- 트리거 `docs/triggers/programmer-20-image-license-expand-COMPLETE.md`
- 핸드오프 `docs/handoffs/programmer-20-image-license-expand.md`
- 도구 `docs/tools/programmer-20/`
- 트리거의 "커밋할 경로"(`git diff`와 새 파일). 업로더 진행분(`content/posts*`·`public/images`), 미추적 게시물(`attendkdz`·`gotdemcatch` 변경)은 대상이 아니다.

## 기준
- `planning/card-image-policy.md` §4.5·§8(커밋 9dab545)
- 기획 20 트리거 "## 20-1" §2 명세 최종본 12항
- 리뷰 71·71-1 트리거(함정: CC URL은 버전 뒤 deed·legalcode만 허용, 인접은 publishedAt, ND 카드는 object-contain)
- 오더 `instructions/programmer/processed/20-image-license-expand.md`

## 검토 항목
1. 스키마:
   - 새 license 값 8개, `pdBasis`·`pdBasisYear`(max(1962, 올해−71)이고 빌드 날짜 기준)
   - pd에 `licenseLabel`을 쓰면 오류
   - CC URL 검증: 국제판↔한국판 오인, 버전 뒤 세그먼트 제한, igo 같은 포트
   - reject 메시지
   - 기존 public·open·news 동작이 바뀌지 않았는지
2. 상세 표시 ko·en이 정책 §4.5-11·명세 7과 글자로 일치하는지 본다.
   - BY-SA·ND의 "(변경 없음·크기 조정 외)"
   - pd 4종 문구, us-gov "미국에서 퍼블릭 도메인"
   - 한국판 라벨
   - 링크 `rel`
   - 라이선스가 요구하는 표시(저작자·제목·URI·원 페이지)를 채우는지
3. ND 카드 object-contain이 실제로 자르지 않는지 본다. CSS와 렌더 경로 전부(피드·관련 글·태그 목록 등 카드가 나오는 모든 곳)를 확인한다.
4. 카드 payload에서 `credit`이 제거됐는지 본다. 리뷰 68 P3-1.
5. OG·JSON-LD·사이트맵에서 open·public A-2가 빠졌는지, `next/image` 처리(기증만 제외)를 본다.
6. validate 경고를 본다.
   - public A-2 대상 판정(caption 접두)
   - 3a·3b caption 형식 ko·en
   - 재사용 6건, 인접 5건 판정(정렬 규칙이 `src/lib/content/load.ts`와 같은지)
   - 새 경고 2건(nowandhere·citynewsmeme 인접, khan en caption)이 정탐인지
7. 소개 페이지 ko·en의 장비 구절이 명세 9와 글자로 같은지, copy-exact 기대값을 본다.
8. 테스트가 충분한지 본다(양성 대조 포함). P19 단위 테스트 실패 12건이 의도한 변경인지 확인한다.
9. 트리거 "남은 확인 필요" 1~10에 권고를 낸다. 슈퍼바이저 기울기는 아래와 같다. 근거가 있으면 반대해도 된다.
   - 1: 괄호 앞 공백을 없애 CC0와 같게
   - 2: 연도를 "1950년"처럼 "{연도}년"으로
   - 3: 지금대로
10. 직접 실행: `npm run validate:content`, typecheck, 단위 테스트. **빌드는 Opus5 창이 쉬고 있을 때만 하고, `.next`를 건드리는 명령은 한 번만 실행한다.**
11. grep 검사: 저장소 독립, 실명, 옛 id, 사진 저작자 이름, 임시 절대경로(`/var/folders`·`/private/tmp`). 대상은 커밋 경로의 + 줄과 새 파일이다.

## 🔴 금지
- 파일 수정 금지, git 쓰기 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-73-programmer-20-review-COMPLETE.md`
  - 판정(통과 / 조건부 통과 / 반려)
  - P1~P3 지적(파일:줄·근거·수정안)
  - 실행한 명령과 결과, 최종 커밋 경로 목록
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
