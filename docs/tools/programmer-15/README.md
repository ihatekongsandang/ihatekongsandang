# 프로그래머 15 — 상세 사진 설명(C1)·caption 필수(C2)·README(C6)·깨진 핫링크 뒤 설명 숨김(C7)·P3-N1 검증 도구·결과

모두 저장소 루트에서 실행한다. 출력에 남은 저장소·임시 경로는 지우거나 `<tmp>`·`$HOME`으로 바꿨다.
테스트 주소는 예시 도메인(`example.org`·`example.com`·`example.test`·`example.invalid`)과 문서·예약 IP 표기만 쓴다. 실제 언론 이미지 주소는 없다.
비교 기준 빌드("변경 전")는 HEAD의 `schema.ts`·`post-detail.tsx`·`card-media.tsx`(읽기 전용으로 꺼냄)에 **현재 content**를 합친 사본 트리를 저장소 밖에서 빌드한 것이다.
작업 시작 때 있던 `.next`(15:58)는 그 뒤에 수정된 게시물 1건(ko·en)이 빠져 있어 기준으로 쓰지 않았다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `unit-checks.tsx` → `unit-checks-output.txt` | C2 검증(누락·빈 값·공백·null·숫자·목록, 160/161자 경계, 앞뒤 공백, self 제외) · C2 영어본(imageCaption 필수·공백 불가) · C1 렌더(ko/en × news/public 사진 설명 줄 위치·순서·언어, self caption 미표시, 카드 HTML·카드 데이터·JSON-LD에 caption 0) · C7 서버 HTML · P3-N1 거부 18·통과 10 + 14-1 회귀 6 | **117/117** |
| `unit-checks-positive-control.txt` | 같은 검사를 **변경 전 코드** 사본에서 실행 | 60건 FAIL 검출(C1 7·C2 15·C7 2·P3-N1 36) |
| `build-fail.sh` → `build-fail-output.txt`, `fixtures-fail/` | 사례마다 작업 트리 사본에 픽스처 하나만 넣고 실제 `npm run build` | news caption 없음·public caption `""`·영어본 imageCaption 없음 → 3건 모두 **종료 코드 1·오류 문장·`.next/BUILD_ID` 없음**, 대조(정상 픽스처) 검증 통과 — **11/11** |
| `fixture-build.sh --serve` → `fixture-build-output.txt` | 작업 트리 사본 + programmer-13 news·public 픽스처(이번에 caption·imageCaption 추가)로 `NEXT_PUBLIC_SITE_URL=https://site.example.com` 빌드 → ① programmer-13 `p11-build-check.mjs` ② `caption-build-check.mjs` ③ `caption-browser.mjs` | ① **22/22** ② **21/21** ③ **161/161** |
| `caption-build-check.mjs` | 빌드 .html 798·.rsc 798·.body 6 전수: 상세 figcaption 첫 줄 = 사진 설명, 둘째 줄 = 크레딧, `<head>`·JSON-LD에 0, 사진 설명이 나오는 파일 = 그 상세 페이지(.html·.rsc)뿐, `data-image-caption` = 픽스처 상세 4쪽뿐 | 21/21 |
| `caption-browser.mjs` → `screens/` 16장 | 375·1280 × ko/en × news(ok·fail-early·fail-late)·public. news 이미지 응답은 CDP `Fetch`로 주입(ok = 그 자리에서 만든 단색 PNG, fail = 404, fail-late = 하이드레이션 뒤까지 응답을 잡아 두었다가 404). 사진 설명 글자·첫 줄·사진→설명→크레딧 배치·대비·화면 안, 실패 시 대체 카드·figcaption 0·화면 글자에 설명/크레딧 0·`data-media-failed`, 가로 스크롤, 콘솔 오류·예외 0 | 161/161. 사진 설명 줄 대비 실측 7.73(8조합 모두) |
| `self-caption-check.mjs` → `-output.txt` | 실제 content 207건 전부(self, caption 있음 207): ko 상세·en 상세의 .html·.rsc에서 ko caption·en imageCaption 등장 횟수 변경 전 = 변경 후 = 0, 서로 다른 caption 97개의 빌드 전체 등장 횟수 변경 전 = 후, `data-image-caption` 0 | **1,340/1,340**(상세 1,242 = 207 × 6) |
| `self-caption-check-positive-control.txt` | 변경 후 빌드 사본의 ko 상세 1쪽에 caption 줄을 일부러 넣음 | 3건 FAIL 검출 |
| `html-parity.mjs` → `html-parity-output.txt` · `html-parity-markup-output.txt` | programmer-13 사본(빌드 ID 읽기만 고침 — 아래). 전체 비교 / `--markup-only`(스크립트 뺀 화면 마크업) | 전체: 799 중 385 같음·414 다름(= 이미지 있는 상세 207 × ko/en, 아래 분류로 전부 설명) · **화면 마크업 799/799 같음** |
| `rsc-diff-classify.mjs` → `-output.txt` · `-positive-control.txt` | .html·.rsc·.body 1,592개 전수: 다른 파일에 "MediaFigure → 서버 figure + CardMedia" 되돌림 치환을 해서 변경 전과 같아지는지 | 같음 764 + 치환으로 같아짐 **828** + 설명 안 됨 **0** · 양성 대조 1건 검출 |
| `seo-parity-output.txt` | `programmer-14/seo-parity.mjs`(도구 변경 없음) | **799/799 같음**(head 메타 23,344 · JSON-LD 2,324 · .body 6) |
| `copy-text-parity-output.txt` | `programmer-14/copy-text-parity.py` | 소개·약관 ko/en 4/4 같음 |
| `copy-exact-check-output.txt` | `programmer-12/copy-exact-check.py`, 최종 일반 빌드 기준 | **38/38** |
| `a11y-e2e.mjs` → `-output.txt`, `screens-e2e/` | programmer-14-1 사본(화면 위치만), **GA 더미 빌드**(`build-output-ga-dummy.txt`) + `next start -p 3113` | **184/184**, PASS/FAIL 라벨 184개가 14-1과 같다 |
| `p13-unit-checks-output.txt` · `p14-1-unit-checks-output.txt` · `p13-hotlink-cases-output.txt` · `regression-unit-output.txt` | 기존 도구(픽스처에 caption만 추가 — 아래) · programmer-05·06 | 104/104 · 64/64 · 10/10 · 53/53 · 35/35 |
| `reviewer-32-validate-examples-check.txt` | 6번: 원본·수정본을 같은 입력으로 실행 | 출력 바이트 단위 같음(34줄), 인자 없을 때 같은 TypeError, tsc TS2345 3건 → 0 |
| `typecheck-output.txt` · `lint-output.txt` · `gate-worktree.log` · `build-output.txt` | | exit 0 · **0 errors**(16 warnings 기존 도구, 14-1과 같은 수) · **`--worktree` 게이트 통과**(reviewer-32 도구 포함) · 최종 일반 빌드(검증 414·정적 801/801, GA 더미 ID 0건, 검증 출력이 변경 전과 같음) |

## 기존 도구를 고친 곳(검사 항목 수·기대 문구는 그대로)
C2로 public·news caption이 필수가 되어, caption 없는 news·public 픽스처를 쓰는 기존 도구가 검증에서 막혔다. 각 파일 머리에 "프로그래머 15 갱신"을 적었다.
- `programmer-13/unit-checks.tsx`: NEWS·PUBLIC에 caption, 영어본 입력에 imageCaption. "사진: …"으로 시작하는지 보는 4곳은 사진 설명 줄을 뺀 크레딧 줄로 본다.
- `programmer-13/fixtures/posts*/*.md`: caption·imageCaption 한 줄씩.
- `programmer-13/p11-build-check.mjs`: `caption()`이 사진 설명 줄을 뺀 크레딧 줄을 돌려준다.
- `programmer-13/hotlink-cases.mjs`·`programmer-14-1/unit-checks.ts`: 픽스처에 caption 한 줄.
- `programmer-13/figcaption-a11y.mjs`: **코드는 그대로 두고 머리 주석만** 달았다. 이 도구의 news 픽스처는 연결되지 않는 주소라 C7 뒤로 news 4조합의 "figcaption 있음"이 FAIL이 맞다. 실브라우저 확인은 `caption-browser.mjs`가 이어받았다.

## `html-parity.mjs` 사본에서 고친 것
원본의 `<!--([^-]+)-->`는 빌드 ID에 하이픈이 있으면 ID를 읽지 못한다. 이번 기준 빌드 ID가 `ol20W-320…`였다. 실측해 보니 HTML 첫 주석에는 하이픈이 밑줄로 바뀐 값이 들어가고, RSC `"b"`에는 원래 값이 들어간다. 사본은 주석에서 ID를 읽고, 밑줄 자리를 `[-_]`로 맞춰 두 표기를 모두 지운다. `rsc-diff-classify.mjs`는 여기에 더해 RSC 전송 조각 경계(`"])</script><script>self.__next_f.push([1,"`)를 이어 붙인다. 페이로드 길이가 바뀌면 같은 내용이 다른 자리에서 잘리기 때문이다(실측 71개 파일).

## 실행 방법
```bash
npm run typecheck && npm run lint
npx tsx --tsconfig docs/tools/programmer-15/tsconfig.json docs/tools/programmer-15/unit-checks.tsx
bash docs/tools/programmer-15/build-fail.sh
bash docs/tools/programmer-15/fixture-build.sh --serve
npm run build    # 일반 빌드 → 변경 전 사본과 비교
node docs/tools/programmer-15/self-caption-check.mjs <변경 전 server/app 사본> .next/server/app
node docs/tools/programmer-15/html-parity.mjs <변경 전 사본> .next/server/app [--markup-only]
node docs/tools/programmer-15/rsc-diff-classify.mjs <변경 전 사본> .next/server/app
node docs/tools/programmer-14/seo-parity.mjs <변경 전 사본> .next/server/app
python3 docs/tools/programmer-14/copy-text-parity.py <변경 전 사본> .next/server/app
python3 docs/tools/programmer-12/copy-exact-check.py
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3113 &
node docs/tools/programmer-15/a11y-e2e.mjs http://127.0.0.1:3113
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
npm run build    # 최종 일반 빌드
sh docs/tools/programmer-15/word-grep.sh
```
