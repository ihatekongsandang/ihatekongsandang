# 프로그래머 19 — 대표 이미지 `kind: open`(인물 없는 자료사진 A-2) 구현 + 상세 출처 표시 + 소개 문구

담당: 프로그래머(Opus) · 코드·빌드 · **커밋 금지**(슈퍼바이저가 리뷰어 게이트 뒤 커밋)

## 배경
- 사용자 결정(2026-11-11): "1+2"와 "1". 인물이 없는 장소·건물 자료사진(A-2)을 허용하고, 공공누리 제1유형과 CC BY 2.0/3.0/4.0·CC0·퍼블릭 도메인·공유마당 기증 자유이용을 쓸 수 있다. 커밋은 b6ef7cc.
- 기준 문서(먼저 끝까지 읽을 것):
  - `planning/card-image-policy.md` §4.5(특히 -2 허용 라이선스, -8 저장, -11 출처 표시 서식, -12 기록, -13 철회)와 §8 데이터 모델(`kind: open` 예시·필수 불릿)
  - `docs/triggers/planner-19-image-expansion-archive-kogl-COMPLETE.md`의 **"## 19-2" §2 프로그래머 오더용 목록(최종)과 §3 소개 문구**, 그리고 "## 19-3" 변경(workYear 조건부 필수, donorName, open caption 표시, 기증 licenseUrl)
  - `docs/triggers/reviewer-67-planner-19-review-COMPLETE.md`의 67-2 P3-3: `workYear`가 없으면 괄호를 생략하는 규칙은 en 서식에도 적용한다.

## 할 일 (19-2 §2 목록 1~8과 19-3 변경을 그대로 구현한다)
1. 스키마(`src/lib/content/schema.ts`)
   - `open` kind와 license 값 7개를 추가한다. 지역판 값은 만들지 않는다.
   - open 필드: `licenseUrl`·`workTitle`·`workYear`(조건부)·`sourceSiteName`·`creditNotice`·`donorName`·`licenseLabel`.
   - public에도 `workTitle`·`workYear`를 넣는다(선택·권장, 정책 §4.3 착수 조건).
   - kind와 license 조합을 검증한다. 버전 없는 `cc-by`는 거부한다. open은 `sourceType: url` 게시물의 `image`에만 허용한다. news에 license를 쓰지 못하게 하는 기존 금지와 `sources[]` 일치 검사(news만)는 유지한다.
2. 상세 출처 표시
   - `ImageCreditCaption`과 `post-detail.tsx`의 ko·en을 정책 §4.5-11 서식으로 바꾼다. 원 페이지 링크와 라이선스 링크는 기존 public 링크와 같은 `rel`을 쓴다.
   - open도 caption(`imageCaption`)을 크레딧 줄 위에 표시한다.
3. `next/image`: 기증저작물 처리는 19-2 §2-3에서 하나를 택한다. 보수안(kcc-donated는 전부 최적화 제외)도 된다. 택한 근거를 트리거에 적는다. 나머지 라이선스는 리사이즈·재인코딩을 허용한다.
4. 카드·OG·JSON-LD·사이트맵: open을 public과 같이 처리한다. 카드에만 표시하고 OG·JSON-LD에서는 제외한다. 테스트로 고정한다.
5. validate-content 경고(권장): A-2 caption 접두와 문구, 촬영 연도 미상 문구, 같은 원본을 3건 넘게 쓴 경우, 저장 파일 짧은 변 400px 미만. 대표 이미지 종류 집계에 open을 추가한다.
6. 소개 페이지(`src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`)
   - 19-2 §3의 A-2 줄 ko·en을 **글자 그대로** 별도 항목으로 추가한다.
   - 공공누리 줄과 "(현재 쓰는 사진은 없습니다)"는 그대로 둔다. 공공누리 사진이 아직 0건이므로 사실이다.
   - 소개 페이지 하위 목록은 4개가 된다. `copy-exact` 기대값도 함께 바꾼다.
7. `content/README.md` §3.6: open 예시, license 값 표, 필수 필드 표.
8. 코드 주석의 옛 건수를 현재 사실로 바꾼다. 예: `src/components/card-media.tsx`의 "그 이미지 파일 207건은 콘텐츠가 바뀔 때까지 `image`로 그대로 보인다". 지금 `public/images/`에는 `.gitkeep`만 있다. 실측 기록처럼 과거 사실을 적은 주석은 그대로 둔다.
9. 테스트: open 검증 케이스를 추가한다.
   - 정상: CC BY 4.0, CC0, PD, 기증(CC BY 4.0 표시), workYear 생략.
   - 거부: 버전 없는 cc-by, BY-SA 값, public+cc, open+kogl-1, open인데 caption 없음, open이 `images[]`에 들어간 경우.
   - 상세 표시 스냅샷이나 문구 테스트(ko·en)도 넣는다.

## 검증
- `npm run validate:content`(R=0, 418/418, open 0), typecheck, lint, test, build가 모두 통과해야 한다.
- 🔴 `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree`의 exit 0을 확인한다(로그를 남길 경우 임시 경로는 `<tmp>`로 가린다).
- 임시 테스트 게시물을 만들어 검증했다면 반드시 지운다. `content/posts*`의 실제 게시물은 바꾸지 않는다.

## 🔴 금지
- git 쓰기(add·commit·push) 금지. 실제 게시물·이미지 추가 금지.
- 다른 서비스명·계정·홈 절대경로·비공인 실명·옛 id·사진 저작자 이름 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/programmer-19-image-kind-open-a2-COMPLETE.md`
  - 바꾼 파일:줄, 검증 명령과 결과(R 값·테스트 수), 게이트 exit 코드
  - next/image 선택 근거, 남은 확인 필요
  - 커밋할 경로 목록
- 끝나면 이 오더를 `instructions/programmer/processed/`로 옮기고, 반공-슈퍼바이저에 SendMessage로 완료를 알린다.
