# 프로그래머 16-1 — 리뷰 36 지적 반영(P2-1·P3-1·P3-3·P3-4) 검증 도구·결과

모두 저장소 루트에서 실행한다. 출력에 남은 저장소·임시 경로는 `.`·`<tmp>`·`$HOME`으로 바꿨다.
픽스처는 프로그래머 16의 `docs/tools/programmer-16/fixtures/`(id `zz-fixture-*`만, 사이트 주소는 예시 도메인)를 그대로 쓴다.
모든 수치는 **최종 코드**(마지막 변경 = `scripts/validate-content.ts` try/catch) 기준 재실행 값이다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `unit-checks.ts` → `unit-checks-output.txt` | 프로그래머 16의 46건(맥락 필드만 새 구조) + P2-1(파일명만 새 id ×2, 메시지, 음성, 디스크 `zz-new.md`·id `zz-new-typo`·목록 `zz-old zz-new`와 그 음성) + e 파일명 ×2 + P3-1(0건이면 안 읽음 ×2, 1건이면 파일 이름 붙여 던짐 ×2, cause, 0건 규칙 0개, 정상 읽기) | **61/61** |
| `mutation-check.sh` → `mutation-check-output.txt` | 규칙을 하나씩 끈 사본 25개(16의 16개, e는 4갈래로 나눔 + P2-1 되돌림 2·메시지 1 + P3-1 0건 생략·파일 이름·gray-matter 캐시 우회 3) | **25/25 검출** |
| `build-fail.sh` → `build-fail-output.txt` | 사례 16개(16의 13 + P2-1 파일명만 새 id + 그 음성 + P3-1 영어본 YAML 깨짐) × `npm run build`·`npx next build` | **32/32**. P2-1은 두 경로 모두 `[f]`로 종료 1·BUILD_ID 없음, 음성은 둘 다 통과. P3-1은 두 경로 모두 파일 이름을 붙인 오류로 멈추고, `npm run build`는 요약 줄까지 전체 보고서를 찍는다 |
| `fixture-build-output.txt` | `bash docs/tools/programmer-16/fixture-build.sh`(도구 변경 없음) | **45/45** |
| `vercel-env-check-output.txt` | `bash docs/tools/programmer-16/vercel-env-check.sh`(도구 변경 없음) | **4/4** |
| `regression-programmer-16-unit-output.txt` · `regression-programmer-16-mutation-output.txt` | 프로그래머 16 단위·돌연변이(맥락 필드 2개와 e 치환 글자만 맞춤) | **46/46 · 16/16** |
| `regression-reviewer-36-edge-output.txt` | 리뷰어 36 `c11-edge-checks.ts`(손대지 않음) | **14/14**. 5번(P2-1 재현)이 이제 PASS, 6번 NOTE "0건인데 던짐: false" |
| `typecheck-output.txt` · `lint-output.txt` | `npm run typecheck`(docs/tools 포함) · `npm run lint` | exit 0 · **0 errors**, 경고 17(프로그래머 16과 같음, 이 폴더·16 폴더 도구 경고 0) |
| `validate-output.txt` | `npm run validate:content` | 418건 통과 · 옮긴 id 0건 · 규칙 0개 · 오류 0 |
| `a11y-e2e.mjs`(16 사본, 화면 위치만) → `a11y-e2e-output.txt`, `screens-e2e/` · `build-output-ga-dummy.txt` | GA 더미 빌드 + `next start -p 3113` | **184/184**, PASS/FAIL 라벨 184개가 프로그래머 16과 같음(diff 0) |
| `build-output.txt` | 최종 **일반 빌드** | 검증 418건 통과 · 정적 804/804 · GA 더미 ID가 든 파일 0 · routes-manifest 리다이렉트 = Next 내장 끝 슬래시 1개뿐 |
| `gate-worktree.log` | `programmer-07/clean-clone-gate.sh --worktree` | **통과**(npm ci → typecheck → lint → build, VERCEL=1) |
| `word-grep.sh` → `word-grep-output.txt` | 16 도구 + 대상에 16-1 폴더·문서 추가 + ⑤ 두 word-grep.sh 안 홈·임시 경로 글자 | 대상 글자 파일 90개(트리거·핸드오프·오더 포함 재실행) → 훅 패턴 0 · 절대/임시 경로 0 · 옛 #1 id 0 · 이름 로마자 0 · ⑤ 0줄·0줄. 양성 대조 각 1건 |

## 실행 방법
```bash
npm run typecheck && npm run lint
npx tsx docs/tools/programmer-16-1/unit-checks.ts
bash docs/tools/programmer-16-1/mutation-check.sh
bash docs/tools/programmer-16-1/build-fail.sh         # 빌드 32회, 수십 분
bash docs/tools/programmer-16/fixture-build.sh
bash docs/tools/programmer-16/vercel-env-check.sh
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3113 & node docs/tools/programmer-16-1/a11y-e2e.mjs http://127.0.0.1:3113
npm run build                                         # 최종 일반 빌드
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
bash docs/tools/programmer-16-1/word-grep.sh
```
