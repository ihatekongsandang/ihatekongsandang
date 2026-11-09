# 프로그래머 14 — 반응형 개편(보강안 final) 구현 검증 도구·결과

모두 저장소 루트에서 실행한다. 절대경로 없음(출력의 저장소·임시 폴더 경로는 지우거나 `<scratch>`로 바꿨다).
"변경 전" 사본 = 프로그래머 13 최종 빌드(이 세션, 14 착수 직전)의 `.next/server/app` 중 `.html`·`.body` 799개를 스크래치 폴더에 복사한 것(저장소에 두지 않음).

| 파일 | 내용 | 결과 |
|---|---|---|
| `measure.mjs` → `measure-output.json` | `docs/tools/designer-05/measure.mjs`의 측정 식(MEASURE)·Tab 탐침·폭·리플로우 폭을 **글자 그대로** 옮기고 어댑터(실제 경로·선택자)만 바꿈. 6화면(홈·상세·영어 홈·영어 상세·태그·소개) × 7폭(360·390·768·834·1024·1280·1440) = 42조합, 리플로우 6 × 11폭 = 66조합, Tab 40단계 × 4 | 외부 요청 0 |
| `compare.mjs` → `compare-output.md` | 실측과 보강안 측정값(`designer-05/measure-output-final.json`)을 나란히 + 브리프 §5 목표 판정 | **판정 16항목 · 미달 0**(표는 트리거에 그대로) |
| `shots.mjs` → `screens/` | ko/en × 홈·상세·태그·소개·약관 × 360·768·1024·1280, 첫 화면 + 전체 | **72장**(9화면 × 4폭 × 2). 영어 태그 페이지는 없다(영어 사이트는 태그 칩·태그 페이지를 두지 않는다, 프로그래머 05) |
| `a11y-e2e.mjs` → `a11y-e2e-output.txt`, `screens-e2e/` | programmer-13 사본. 바꾼 것 = 공유 위치 검사 1종(header 바로 뒤 → 보조 열 aside 안 배경 보도 바로 뒤, 보강안 상세 순서). GA 더미 빌드(`build-output-ga-dummy.txt`) + `next start` | **184건 PASS 184 · FAIL 0**. 라벨은 13과 비교해 위치 검사 4줄(2폭 × 상세 2)만 다르고 나머지 180줄 같다 |
| `copy-exact-check-output.txt` | `docs/tools/programmer-12/copy-exact-check.py` 재실행(도구 변경 없음) | **38건 PASS 38 · FAIL 0** |
| `copy-text-parity.py` → `-output.txt` | 소개·약관 ko/en `<main>`의 보이는 글자 전체를 변경 전 빌드와 글자 단위 비교 | **4/4 같음**(1,467 · 2,172 · 1,354 · 4,897자) |
| `seo-parity.mjs` → `-output.txt` | 전 페이지 `<head>` title·meta·canonical·hreflang(23,344개), JSON-LD 2,324블록, `.body` 6개(sitemap·robots·llms 등)를 변경 전 빌드와 비교 | **799/799 같음**. 양성 대조(og:type·JSON-LD @type·sitemap 각 1곳 변경) 3/3 검출 |
| `p13-unit-checks-output.txt` · `p13-p11-build-check-output.txt` | 프로그래머 13 도구 재실행. 상세 개편으로 figcaption 마크업(`<figcaption data-credit>`)·링크 문구(목업 문구)가 바뀐 기대값만 13 도구에서 고쳤다(항목 수 같음) | 단위 104/104 · 픽스처 빌드 22/22 · 브라우저 figcaption 52/52(13의 `screens-figcaption/` 8장은 새 배치로 다시 찍힘) |
| `regression-unit-output.txt` | programmer-05 단위 · 06 단위 · 13 핫링크 경로 | 53/53 · 35/35 · 10/10 |
| `typecheck-output.txt` · `lint-output.txt` | `npm run typecheck` · `npm run lint`(저장소 전체) | exit 0 · **0 errors**, 16 warnings(전부 기존 `docs/tools/*` 도구) |
| `gate-worktree.log` | `docs/tools/programmer-07/clean-clone-gate.sh --worktree` | ✅ **게이트 통과**(npm ci → typecheck → lint → build) |
| `build-output.txt` | 최종 일반 빌드 | 검증 414 통과 · 경고 22(변경 전과 같은 수) · 대표 이미지 self 207 · 정적 801/801 |
| `word-grep.sh` → `-output.txt` | 변경 파일 23개 × 저장소 독립 패턴·D6 금지어 9종, 13·14 도구 폴더·src·scripts 홈 절대경로 | 전부 0 · 양성 대조 1 |

## 실행 순서
```bash
npm run typecheck && npm run lint
npm run build && npx next start -p 3114 &
node docs/tools/programmer-14/measure.mjs http://127.0.0.1:3114
node docs/tools/programmer-14/compare.mjs > docs/tools/programmer-14/compare-output.md
node docs/tools/programmer-14/shots.mjs http://127.0.0.1:3114
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3114 &
node docs/tools/programmer-14/a11y-e2e.mjs http://127.0.0.1:3114
python3 docs/tools/programmer-12/copy-exact-check.py
npx tsx --tsconfig docs/tools/programmer-13/tsconfig.json docs/tools/programmer-13/unit-checks.tsx
bash docs/tools/programmer-13/p11-build-check.sh --serve
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
npm run build   # 최종 일반 빌드
python3 docs/tools/programmer-14/copy-text-parity.py <변경 전 사본> .next/server/app
node docs/tools/programmer-14/seo-parity.mjs <변경 전 사본> .next/server/app
sh docs/tools/programmer-14/word-grep.sh
```
측정·화면·e2e 뒤에 바뀐 것은 상세 크레딧 `figcaption`에 `data-credit` 속성을 단 것 하나다. 그 요소는 public·news 이미지에만 나오고 현재 207건에는 0곳이다(최종 빌드 HTML grep 0) — 측정 대상 화면 출력에는 영향이 없다.
