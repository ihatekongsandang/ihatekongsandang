# 리뷰어 31-1 — 프로그래머 14-1 재확인 도구·결과

저장소 루트에서 실행했다. 빌드는 하지 않았다. 프로그래머의 마지막 일반 빌드 `.next`(BUILD_ID 15:58:13, 이후 바뀐 소스 0개, GA 스크립트 0건)를 `npx next start -p 3932`로 띄워 쟀다. 끝난 뒤 서버·헤드리스 Chrome 잔존 0을 확인했다.
사본 도구는 원본에서 출력 위치와 Chrome 디버그 포트(95xx)만 바꿨다. 검사 식은 그대로다.

| 파일 | 원본 | 결과 |
|---|---|---|
| `probe-sticky.mjs` → `probe-sticky-output.txt` | reviewer-31 | 5개 크기 화면 밖 0, 프로그래머 출력과 같음 |
| `probe-sticky-longest.mjs` → `-output.txt` | programmer-14-1 | 5개 크기 화면 밖 0 |
| `aside-focus-all.mjs` → `-output.json`·`-console.txt` | 신규 | ko·en 414쪽 × 1024×600·1280×600, 보조 열 요소 3,234 × 2 화면 밖 0. 최장 게시물 Tab 완주 5크기 17/17 방문·화면 밖 0 |
| `focus-full.mjs` → `focus-full-output.json`·`-console.txt` | reviewer-31 | 90조합·5,402정지점·화면 밖 0, 완전 가림 90 = 건너뛰기 링크, 일부 가림 16. 게시물 제목 3곳은 금지어 오탐 때문에 한 글자를 괄호로 감쌌다 |
| `measure.mjs`·`compare.mjs` → `measure-output.json`·`compare-output.md`·`measure-console.txt` | programmer-14-1 | 16항목 미달 0, 프로그래머 14·14-1과 diff 0 |
| `a11y-e2e.mjs` → `a11y-e2e-output.txt`·`screens-e2e/` | programmer-14-1 | 180/184, FAIL 4 = GA share(일반 빌드라 gtag 없음). 라벨이 같음 |
| `unit-checks-output.txt` · `p13-unit-checks-output.txt` · `regression-unit-output.txt` | 프로그래머 14-1·13·05·06 | 64/64 · 104/104 · 53/53 · 35/35 |
| `hotlink-cases-output.txt` | programmer-13 | 10/10 |
| `validate-content-output.txt` · `copy-exact-check-output.txt` · `typecheck-output.txt` · `lint-output.txt` | | 207 통과 · 38/38 · exit 0 · 0 errors(16 warnings). lint 출력의 절대경로는 지웠다 |
| `word-grep-rerun-output.txt` | programmer-13·14 `word-grep.sh` | 저장된 출력과 같음 |
| `commit-targets.txt` | | 커밋 대상 경로 50행 |
