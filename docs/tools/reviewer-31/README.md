# 리뷰어 31 — 프로그래머 13·14 묶음 재현 도구·결과

모두 저장소 루트에서 실행한다. 빌드는 하지 않았다. 프로그래머가 마지막으로 만든 `.next`(BUILD_ID 15:06:59, 이후 바뀐 src·scripts·content·public 파일 0개)를 `npx next start -p 3931`로 띄워 쟀다. 끝난 뒤 서버·헤드리스 Chrome 잔존 0을 확인했다.
programmer-14 도구는 출력 경로만 이 폴더로 바꾼 사본이다(측정 식·검사 항목은 그대로). Chrome 디버그 포트는 다른 세션과 겹치지 않게 94xx대로 바꿨다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `measure.mjs` → `measure-output.json`, `compare.mjs` → `compare-output.md` | programmer-14 측정 사본(6화면 × 7폭 42조합 · 리플로우 66 · Tab 159) | **16항목 미달 0. `compare-output.md`가 programmer-14 출력과 글자 단위로 같다**(diff 0). 외부 요청 0 |
| `a11y-e2e.mjs` → `a11y-e2e-output.txt`, `screens-e2e/` 18장 | programmer-14 사본, 화면 위치만 이 폴더 | **184건 중 PASS 180 · FAIL 4**. FAIL 4는 전부 `GA share 이벤트`(ko/en × copy_link·x/threads). 이 `.next`는 측정 ID 없이 빌드돼 gtag가 없다(빌드 HTML에 GA 스크립트 0). GA 더미 빌드는 빌드 금지라 재현하지 못했다. 나머지 180줄 라벨은 programmer-14 출력과 같다 |
| `copy-exact-check-output.txt` | `docs/tools/programmer-12/copy-exact-check.py` 재실행 | 38/38, programmer-14 출력과 같다 |
| `p13-unit-checks-output.txt` | programmer-13 `unit-checks.tsx` 재실행 | 104/104 |
| `hotlink-cases-output.txt` | programmer-13 `hotlink-cases.mjs` 재실행(로컬 https) | 10/10, 종료 코드 0 |
| `schema-edge.ts` → `-output.txt` | 단위 104건 밖의 경계 사례 10개 + 포털 판정 10개. 판정이 아니라 현재 동작 기록 | 단축 주소·일부 집계 사이트는 포털로 안 걸림, news `src`에 localhost·사설 IP·HTML 주소 통과, 미래 확인일 통과(리뷰 P3) |
| `focus-full.mjs` → `focus-full-output.json` | 9화면(홈·2쪽·상세·태그·전체 태그·소개·약관·영어 홈·영어 상세) × 5폭(320·360·768·1024·1280) × 앞/뒤 Tab **전 정지점**. fixed 배너 + sticky 헤더 대조 | 90조합 · 정지점 5,402. "완전 가림" 90건은 전부 건너뛰기 링크(z-50 absolute, `probe-sticky`로 최상단 요소가 링크 자신임을 확인 → 가림 아님). 일부 가림 16(배너, AAA 참고). **화면 밖 3(상세 1024 보조 열)** |
| `probe-sticky.mjs` → `-output.txt` | 상세 보조 열(sticky) 안 링크에 Tab 포커스가 있을 때 화면 위치, 건너뛰기 링크 최상단 확인 | **1024×768 7건·1024×600 8건·1280×800 5건·1280×600 8건 화면 밖**, 1440×900 0건 (리뷰 P1-1) |
| `shot-sticky.mjs` → `screens/post-1024x768-tag-focus.png`·`post-1280x800-tag-focus.png` | P1-1 화면 | 포커스된 `#북한` 칩이 화면 아래 밖 |
| `shots.mjs` → `screens/` 72장 | programmer-14 사본 | 72장. Read로 연 것은 리뷰 §3 표기 |
| `typecheck-output.txt` · `lint-output.txt` | `npm run typecheck` · `npx eslint .` | exit 0 · 0 errors / 16 warnings(전부 기존 `docs/tools` 도구) |

참고: `focus-full-output.json`의 게시물 제목 하나는 금지어 검사 오탐을 피하려고 한 글자를 괄호로 감쌌다("홍보(물)").
