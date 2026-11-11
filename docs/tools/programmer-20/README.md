# 프로그래머 20 — 대표 이미지 라이선스 확대(CC BY-SA·BY-ND·한국판 2.0 KR·PD 근거) 검증·표시 도구와 결과

모두 저장소 루트에서 실행한다. 출력의 홈 경로는 `$HOME`, 저장소 밖 임시 경로는 `<tmp>`로 바꿨다.
테스트 주소는 예시 도메인·creativecommons.org 라이선스 문서·위키미디어 호스트 이름만, 저작자·저작물명은 가상 값만 쓴다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `unit-checks.tsx` → `unit-checks-output.txt` | 명세 12 ①~⑩(⑩은 JSON-LD·next/image 부분) | **514/514** |
| `unit-checks-positive-control.txt` | 같은 검사를 HEAD 코드 사본(저장소 밖)에서 실행. `pdExpiredMaxYear`만 같은 식의 대체 함수, `scripts/image-reuse.ts`는 새 파일이라 사본에 넣었다(⑦은 대조 불가) | 354개 중 **172 FAIL** 검출(①26 ②52 ③12 ④22 ⑤19 ⑥16 ⑧5 ⑨17 ⑩3) |
| `build-artifact-check.mjs` → `build-artifact-check-output.txt` | 실제 빌드 `.next/server/app` 2,444개 전수: sitemap·robots·llms.txt `/images/` 0, og/twitter:image 7,900개·JSON-LD 2,317개에 `/images/` 0, 상세 밖 카드 페이지 742개(.html·.rsc)에 크레딧 필드 이름 0 | **6,779/6,779** |
| `copy-exact-about.py` → `copy-exact-about-output.txt` | 프로그래머 19 도구 사본 — A-2 줄 기대값을 20-1 명세 9 문안으로, 옛 A-2 문안 0회 검사 4개 추가 | **41/41** |
| `p19-copy-exact-about-output.txt` | 프로그래머 19 도구 원본 | FAIL 2 = 의도한 변경(ko·en A-2 줄) |
| `validate-output.txt` · `validate-head-code-output.txt` · `validate-new-warnings.diff` | 작업 트리 콘텐츠를 새 코드 / HEAD 코드로 검증 → 새 경고 차이 | 420/420 R=0 · 새 경고 **2건**(트리거 참고) |
| `p13-unit-checks-output.txt` · `p14-1-unit-checks-output.txt` · `p15-unit-checks-output.txt` · `p13-hotlink-cases-output.txt` · `p12-copy-exact-check-output.txt` | 기존 회귀 | 104/104 · 64/64 · 117/117 · 10/10 · 38/38 |
| `p19-unit-checks-output.txt` | 프로그래머 19 단위 검사 | 232/244 — FAIL 12 전부 의도한 변경(pd `pdBasis` 필수·`licenseLabel` 금지, BY-SA·BY-ND·한국판 허용, 거부 메시지 문구) |
| `typecheck-output.txt` · `lint-output.txt` · `build-output.txt` · `gate-worktree.log` | | exit 0 · 0 errors(경고 21 전부 기존 `docs/tools/*`) · 정적 799/799 · `--worktree` 게이트 통과 |

## 실행 방법
```bash
npm run validate:content && npm run typecheck && npm run lint
npx tsx --tsconfig docs/tools/programmer-20/tsconfig.json docs/tools/programmer-20/unit-checks.tsx
npm run build && python3 docs/tools/programmer-20/copy-exact-about.py && node docs/tools/programmer-20/build-artifact-check.mjs
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
```
- 프로그래머 19 도구(`unit-checks.tsx`·`copy-exact-about.py`)는 증거 기록이라 고치지 않았다. 이후 회귀는 이 폴더 도구를 쓴다.
