# 프로그래머 13 — 카드 이미지 스키마·크레딧(P1~P4·P6·P7·P9·P11) 검증 도구·결과

모두 저장소 루트에서 실행한다. 절대경로 없음(출력의 저장소·임시 폴더 경로는 지우거나 `<scratch>`·`<tmp>`·`<work>`로 바꿔 저장했다).
픽스처 주소는 예시 도메인(`example.org`·`example.com`·`example.invalid`)만 쓴다. 실제 언론 이미지 URL은 없다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `unit-checks.tsx` → `unit-checks-output.txt` | 검증 규칙 통과·거부, `isPortalUrl`, `resolveCardMedia`, 영어본 `localizePost`, 상세·카드 렌더(react-dom/server), JSON-LD(P11) | 104건 PASS 104 · FAIL 0. 양성 대조: `sourcePageUrl` 대조와 figcaption을 일부러 지우면 16건 FAIL(되돌린 뒤 104/104) |
| `fixtures/posts/*.md`·`fixtures/posts-en/*.md` | news 1건·public 1건 픽스처 게시물(+영어본). **저장소 `content/`에는 넣지 않는다** — 아래 스크립트가 임시 복사본에만 넣는다 | — |
| `p11-build-check.sh` (+ `p11-build-check.mjs`, `figcaption-a11y.mjs`) → `p11-build-check-output.txt` | 작업 트리를 임시 폴더에 복사(node_modules 링크, .git·.next·.env.local 제외)하고 픽스처를 넣어 `NEXT_PUBLIC_SITE_URL=https://site.example.com`으로 프로덕션 빌드 → 빌드 HTML 798·RSC 798·sitemap 전수 검사. `--serve`면 그 빌드를 띄워 실브라우저로 figcaption 확인 | 빌드 검사 22건 PASS 22(og:image·twitter:image 메타 7,970개·JSON-LD 2,339블록·sitemap에 픽스처 이미지 0, og:image 전부 자체 주소) · 브라우저 52건 PASS 52(대비 7.73/링크 6.7, 링크 AX 이름, 375px 가로 스크롤 없음, 연결 불가 핫링크 → 플레이스홀더) |
| `screens-figcaption/*.png` | 위 브라우저 확인 화면 8장(ko/en × news/public × 375·1280) | — |
| `html-parity.mjs` → `html-parity-output.txt` | 변경 전 빌드(작업 시작 직후)와 최종 빌드의 `.html`·`.body` 799개를 짝지어 비교. 빌드 ID·해시 자산 경로·번들러 청크 태그/모듈 참조만 지우고 글자 단위 비교 | 799/799 같음. 양성 대조(버튼 문구 1글자·RSC alt 1글자 변경) 2/2 검출 |
| `scripts/check-hotlinks.ts`(코드) → `check-hotlinks-output.txt` | `npm run check:hotlinks` 실제 content(207건, news 0)·픽스처 폴더(연결 불가 주소)·없는 폴더 | 3회 모두 종료 코드 0. 픽스처는 BROKEN(네트워크 오류)으로 출력 |
| `hotlink-cases.mjs` → `hotlink-cases-output.txt` | 127.0.0.1 자체 서명 https 서버로 판정 경로 전수: 정상(HEAD)·HEAD 405→GET·404·이미지 아님·시간 초과·DNS 실패·검증 실패 건너뜀·Referer 값 | 10건 PASS 10 · 종료 코드 0. 서버가 받은 Referer는 전부 사이트 출처만(`https://site.example.com/`) |
| `headers-output.txt` | 로컬 `next start` 응답 머리 + 배포 도메인 `curl -I` 1회 | `Referrer-Policy: strict-origin-when-cross-origin`(로컬·배포 같음), CSP는 **Report-Only**이며 `img-src 'self' data: https:` |
| `a11y-e2e.mjs` → `a11y-e2e-output.txt`, `screens/` | `programmer-12/a11y-e2e.mjs` 사본(바뀐 것: 사용 예 경로·화면 저장 위치뿐). GA 더미 빌드(`build-output-ga-dummy.txt`) + `next start -p 3113` | 184건 PASS 184 · FAIL 0. PASS/FAIL 라벨 184개가 12의 출력과 같다. 세부 값이 다른 곳 3줄은 모바일 상세 `:focus-visible` 외곽선 색 실측값(12에서도 같은 항목이 프레임마다 다른 값을 보였다 — 두 출력 모두 PASS) |
| `gate-worktree.log` | `docs/tools/programmer-07/clean-clone-gate.sh --worktree` | 🔴 **lint 단계에서 종료 코드 1.** 오류 7건 전부 `docs/tools/designer-04-A/build.mjs`(디자이너 세션의 미추적 도구, 이번 변경과 무관). 같은 복제본에서 그 폴더만 lint에서 빼고 남은 단계 재현: lint 0 errors · build 통과(검증 414·정적 801/801) |
| `typecheck-output.txt` | `npm run typecheck` | exit 0 |
| `lint-output.txt` | `npm run lint`(저장소 전체) | 🔴 7 errors(전부 `docs/tools/designer-04-A/build.mjs`) · 16 warnings(기존 도구) |
| `lint-changed-output.txt` | `npx eslint src scripts docs/tools/programmer-13 next.config.ts` | 0 problems |
| `build-output.txt` | 최종 `npm run build`(일반 값, `.env.local`) | 검증 414건 통과 · 경고 22건(변경 전과 같은 목록) · 대표 이미지 종류 self 207 · public 0 · news 0 · 정적 801/801 |
| `word-grep.sh` → `word-grep-output.txt` | 변경 파일 7개 저장소 독립 패턴(pre-commit 훅에서 읽음)·화면 문구 파일 D6 금지어 9종·이 폴더·홈 절대경로 | 전부 0 · 양성 대조(훅 파일) 1 |

## 실행 방법
```bash
npm run typecheck && npx eslint src scripts docs/tools/programmer-13 next.config.ts
npx tsx --tsconfig docs/tools/programmer-13/tsconfig.json docs/tools/programmer-13/unit-checks.tsx
bash docs/tools/programmer-13/p11-build-check.sh --serve
node docs/tools/programmer-13/hotlink-cases.mjs
npm run check:hotlinks
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3113 &
node docs/tools/programmer-13/a11y-e2e.mjs http://127.0.0.1:3113
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
npm run build   # 최종 일반 빌드(.next를 일반 값으로 되돌림)
node docs/tools/programmer-13/html-parity.mjs <변경 전 server/app 사본> <변경 후 server/app 사본>
sh docs/tools/programmer-13/word-grep.sh
```
변경 전 사본은 작업 시작 직후 빌드의 `.next/server/app`에서 `.html`·`.body`만 스크래치 폴더로 복사한 것이다(저장소에 두지 않음).

## 회귀 확인(기존 도구 재실행, 변경 없음)
- `regression-unit-output.txt`: `npx tsx docs/tools/programmer-05/unit-checks.ts` → 53/53
- `npx tsx --tsconfig docs/tools/programmer-06/tsconfig.json docs/tools/programmer-06/unit-checks.tsx` → 35/35
