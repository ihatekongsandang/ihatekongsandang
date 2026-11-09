# 리뷰어 36-1 — 프로그래머 16-1 재확인(커밋 B 전 게이트) 도구·출력

모두 저장소 루트에서 실행했다. 빌드(`next build`·`npm run build`)는 돌리지 않았다. 빌드가 필요한 시험은 프로그래머 16-1 출력 파일만 읽었다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `typecheck-output.txt` | `npx tsc --noEmit` | exit 0 |
| `lint-output.txt` | `npx eslint .`(경로는 `.`로 바꿈) | 0 errors · 17 warnings(바뀐 파일·16·16-1·36·36-1 도구 경고 0) |
| `validate-output.txt` | `npm run --silent validate:content` | 418건 통과 · 옮긴 id 0건 · 규칙 0개 · 오류 0 |
| `rerun-16-1-unit-output.txt` | `npx tsx docs/tools/programmer-16-1/unit-checks.ts` | 61/61 |
| `rerun-16-1-mutation-output.txt` | `bash docs/tools/programmer-16-1/mutation-check.sh` | 25/25 검출 |
| `rerun-16-unit-output.txt` · `rerun-16-mutation-output.txt` | 프로그래머 16 단위·돌연변이(16-1에서 고친 판) | 46/46 · 16/16. 시험 이름 목록이 리뷰 36 재실행 출력과 같다(diff 0) |
| `rerun-reviewer-36-edge-output.txt` | `npx tsx docs/tools/reviewer-36/c11-edge-checks.ts` | 14/14. P2-1 재현(관찰) FAIL→PASS, P3-1 NOTE 던짐 true→false |
| `gray-matter-cache-check.mjs` → `-output.txt` | 16-1 결정 2 재현 | 옵션 없음 1회째 던짐·2회째 안 던짐 · 옵션 `{}` 두 번 다 던짐 |
| `rerun-16-1-word-grep-output.txt` | `bash docs/tools/programmer-16-1/word-grep.sh` | 90개 파일 · 훅 0 · 경로 0 · 옛 id 0 · 로마자 0 · 양성 1·1 |
| `repo-independence-grep.sh` → `repo-independence-grep-output.txt` | 커밋 B 경로 전체 + 36-1 산출물. 검색식은 파일에 없고 `PAT` 환경 변수로 받는다 | 트리거 참조 |
