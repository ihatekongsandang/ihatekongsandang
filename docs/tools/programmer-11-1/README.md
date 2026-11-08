# 프로그래머 11-1 — 리뷰 26 P2 4건 수정 검증 도구·결과

모두 저장소 루트에서 실행한다. 절대경로 없음. 로그의 저장소 경로는 상대경로로 바꿔 저장했다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `copy-exact-check.py` → `-output.txt` | 🆕 빌드 HTML(`.next/server/app/about.html`·`en/about.html`·`en.html`)에서 P2-1·P2-2 문장(오더 11-1 원문)과 P2-4 aboutIntro·description(기획자 10 트리거 코드 블록을 직접 읽음)이 글자 그대로인지, 옛 문구 3종이 없는지, `/en/about`에 개인정보·매체 나열 문장이 없는지 확인 | 12건 PASS 12 · FAIL 0 |
| `share-check.ts` → `-output.txt` | 프로그래머 11 `share-check.ts` 사본을 P2-3 기대값으로 바꾼 것. 제목 412건(ko 206 + en 206): url만 = 리뷰 25 측정 24건과 일치, url만 건은 `text` 파라미터 없음·쿼리 키 `url` 하나, 나머지는 `text` = 원제목 그대로·가중치 ≤ 280, 말줄임 생성 0, 인코딩 왕복, 스레드 불변(text = 원제목, ≤ 500) | FAIL 0 · url만 ko 0 / en 24(일치 ✅) · 원제목 388 · X 최대 278 · 스레드 최대 404 |
| `renewal-check-output.txt` | `docs/tools/programmer-11/renewal-check.ts` 재실행(도구 변경 없음) | 34건 PASS 34 · FAIL 0, 프로그래머 11 출력과 동일 |
| `a11y-e2e.mjs` → `-output.txt` | 프로그래머 11 `a11y-e2e.mjs` 사본 + P2-3 확인 2종(ko alaska: X `text` = h1 제목 그대로 · en alaska: X href에 `text` 없음·쿼리 키 `url` 하나). 화면 저장 위치만 `programmer-11-1/screens`로 바꿨다 | 176건 PASS 176 · FAIL 0 (기존 172 + 신규 4 — 라벨 대조 결과 기존 172개 라벨은 프로그래머 11 출력과 전부 같고 추가는 이 4줄뿐) |
| `screens/*.png` | 위 실측 때 찍은 화면 18장 | — |
| `typecheck-output.txt` | `npm run typecheck` | exit 0 |
| `lint-output.txt` | `npm run lint` | 0 errors · 4 warnings(전부 기존 `docs/tools/reviewer-*` 도구 파일, 이번 변경 무관) |
| `build-output.txt` | 최종 `npm run build`(prebuild validate 포함, `.env.local` 값) | 검증 412건 통과 · 정적 799/799 |
| `build-output-ga-dummy.txt` | e2e GA 이벤트 실측용 빌드(`NEXT_PUBLIC_GA_ID=G-TEST000000`) | 검증 412 · 799/799 |
| `gate-worktree.log` | `docs/tools/programmer-07/clean-clone-gate.sh --worktree` | ✅ 게이트 통과(npm ci → typecheck → lint → build) |

## 실행 방법
```bash
npx tsx docs/tools/programmer-11-1/share-check.ts
npx tsx docs/tools/programmer-11/renewal-check.ts
npm run build && python3 docs/tools/programmer-11-1/copy-exact-check.py
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3111 &
node docs/tools/programmer-11-1/a11y-e2e.mjs http://127.0.0.1:3111
```

순서: typecheck → lint → build → renewal-check·share-check·copy-exact-check → GA 더미 빌드 → e2e → 게이트 → 최종 일반 빌드(`.next`를 일반 값으로 되돌림) → copy-exact-check 재실행(FAIL 0).
