# 프로그래머 14-1 — 리뷰 31 수정(P1-1 · P3-1·2·3·4·7·9) 검증 도구·결과

모두 저장소 루트에서 실행한다. 출력의 저장소·임시 경로는 지우거나 `<scratch>`로 바꿨다. 리뷰어 도구는 원본을 건드리지 않고 이 폴더에 사본을 두었다(출력 위치만 바꿈).

| 파일 | 내용 | 결과 |
|---|---|---|
| `aside-height-all.mjs` → `aside-height-all.json` | 상세 보조 열 높이 **전수**: ko 207 + en 207 × 1024·1280 = 828건(높이 2000 화면에서 sticky 영향 없이) | 누락 0. 최대 1,672px(1024 ko, 출처 9·태그 5 게시물) · 1024 ko 중앙값 814 · 90% 1,092 · 800px 초과 109건 → sticky 기준 높이는 1,776px 이상이 필요하다 → **sticky 제거**(핸드오프 결정 1) |
| `probe-sticky-output.txt` | `docs/tools/reviewer-31/probe-sticky.mjs` 원본 그대로 실행(대진연 게시물) | 1024×768·1024×600·1280×800·1280×600·1440×900 **화면 밖 0**(수정 전 7·8·5·8·0) |
| `probe-sticky-longest.mjs` → `-output.txt` | 같은 탐침, 게시물을 보조 열이 가장 긴 게시물로 | 5개 크기 모두 **화면 밖 0**(보조 열 1,672·1,579px) |
| `focus-full.mjs` → `focus-full-output.json` | reviewer-31 `focus-full.mjs` 사본(출력 위치만). 9화면 × 5폭 × 앞/뒤 Tab 전 정지점 | 90조합 · 5,402정지점 · **화면 밖 0**(수정 전 3). 완전 가림 90 = 건너뛰기 링크(리뷰 31이 오탐으로 확인한 것, 이번에도 전부 그 항목) · 일부 가림 16(리뷰와 같은 수, AAA 참고). 출력의 게시물 제목 3곳은 리뷰어와 같은 방식으로 한 글자를 괄호로 감쌌다 |
| `shot-sticky.mjs` → `screens/` 2장 | reviewer-31 `shot-sticky.mjs` 사본 | 포커스된 `#북한` 칩이 화면 안(1024: top 398/768 · 1280: top 414/800) |
| `unit-checks.ts` → `-output.txt` | P3-1 포털 10 · P3-2 판정·검증 38 + 통과 7 · P3-3 7 등 통과·거부 사례 | **64/64**. 양성 대조(미래 확인일·`localhost` 검사를 끈 schema로) 6건 FAIL 검출 |
| `measure.mjs`·`compare.mjs` → `measure-output.json`·`compare-output.md` | programmer-14 사본(출력 위치만) | **16항목 미달 0**, 표가 programmer-14와 같다(diff 0) |
| `a11y-e2e.mjs` → `-output.txt`, `screens-e2e/` | programmer-14 사본(화면 위치만), **GA 더미 빌드**(`build-output-ga-dummy.txt`) | **184/184** — 리뷰 31이 재현하지 못한 GA `share` 4건 포함 PASS. 라벨이 14와 같다 |
| `p13-unit-checks-output.txt` · `p13-p11-build-check-output.txt` · `p13-hotlink-cases-output.txt` | 프로그래머 13 도구 | 104/104 · 픽스처 빌드 22/22 + 브라우저 52/52 · 핫링크 10/10 |
| `regression-unit-output.txt` | programmer-05 · 06 단위 | 53/53 · 35/35 |
| `copy-exact-check-output.txt` · `copy-text-parity-output.txt` · `seo-parity-output.txt` | 최종 일반 빌드 기준(변경 전 = 14 착수 직전 빌드) | 38/38 · 소개·약관 글자 4/4 같음 · 메타·JSON-LD·사이트맵 799/799 같음 |
| `typecheck-output.txt` · `lint-output.txt` · `gate-worktree.log` · `build-output.txt` | | exit 0 · 0 errors(16 warnings 기존 도구) · **게이트 통과** · 최종 일반 빌드(GA 더미 ID 0건) 검증 414·정적 801/801 |
| `extended-grep-output.txt` | 오더 P3-9의 저장소 전체 확장 grep 결과 파일 목록 | 남은 5개 = 오더 파일 자체 1 + 일반 낱말 "홍보(물)" 오탐 4(content 3·history 1, 수정 금지 영역). 코드·도구·핸드오프 0 |
