# 프로그래머 16 — C3(주제)·C4(안내문·소개)·C5(이동 경로) + C11(옮긴 id 308 리다이렉트) 검증 도구·결과

모두 저장소 루트에서 실행한다. 출력에 남은 저장소·임시 경로는 `.`·`<tmp>`·`$HOME`으로 바꿨다.
"변경 전" 기준 빌드는 작업 시작 때 작업 트리(= HEAD `0c0239a`, src·content 변경 없음)를 저장소 밖 사본으로 복사해 같은 `.env.local`로 빌드한 것이다.
"단위 A" 빌드는 C3·C4·C5만 넣은 상태, 최종 빌드는 A+B(C11) 상태다. 픽스처·시험 사본은 모두 저장소 밖 임시 폴더에서 만들고 지웠다.
픽스처 id는 `zz-fixture-*`만 쓴다(실제 게시물 id·옛 #1 id 없음). 사이트 주소는 예시 도메인 `https://site.example.com`.

## 커밋 단위 A (C3·C4·C5)
| 파일 | 내용 | 결과 |
|---|---|---|
| `copy-exact-c3-c4.py` → `copy-exact-c3-c4-output.txt` | 기대값을 기획 문서에서 직접 읽는다(계획 §2.2 ko 목록·en 블록, v0.9 §2.1 표, 리뷰 34 §2.4 ko 6줄·en 6줄과 계획 문안 대조). ko·en 소개 절 항목·하위 항목 글자 그대로·굵게 범위·절 순서, 안내문 ko·en 상세 209+209쪽, C3 /tags h1·title·aria·메타·보조 문장, 빌드 HTML 796개 전수 "태그"(content 원문 글자 제외), /tag/* 설명, llms.txt | **58/58** |
| `copy-exact-c3-c4-positive-control.txt` | 같은 검사를 변경 전 빌드에 | 42건 FAIL 검출(소스를 읽는 항목만 PASS) |
| `copy-exact-check-output.txt` | 기존 `programmer-12/copy-exact-check.py`(약관·소개 #1~#9) | **38/38** |
| `c3-substitute.mjs` → `a-c3-substitute-output.txt`·`a-all-substitute-output.txt` | 변경 전 빌드 사본에 C3 문구 치환만(또는 `--all`: + C4 안내문·C5 class·상세 보조 열 이름) 적용. content 원문의 같은 문구 0회도 센다 | 치환 규칙별 횟수 기록, content 오치환 0 |
| `seo-parity-raw-output.txt` → `seo-parity-after-c3-substitution.txt` | `programmer-14/seo-parity.mjs`(도구 변경 없음) | 원본 대조 464 같음·338 다름 → **C3 치환 뒤 802/802 같음**(head 메타 23,443 · JSON-LD 2,333 · .body 6). 차이는 전부 "태그→주제" |
| `html-parity.mjs`(programmer-15 사본 + `--ignore-text-sep`) → `a-html-markup-strict-output.txt`·`html-markup-ignore-text-sep-output.txt` | `--all` 치환 사본 대 변경 후, 화면 마크업 | 엄격: 769 같음·33 다름(소개 2 + 영어 상세 31). 31쪽은 React 글자 구분 주석 `<!-- -->` 위치만 다름 → 주석 무시 **800/802, 남은 2 = about.html·en/about.html(C4)** |
| `a-copy-text-parity-output.txt` | `programmer-14/copy-text-parity.py` | 약관 ko·en 같음, 소개 ko·en 다름(C4 — 위 copy-exact가 글자를 확인) |
| `breadcrumb-measure.mjs` → `breadcrumb-before-output.txt`·`breadcrumb-after-output.txt`, `screens/` 12장 | 상세 ko·en·태그 피드 × 7폭: 홈 링크 상자, 글자→구분자 간격, 글자 왼쪽 = h1 왼쪽, 상자 안 9점 elementFromPoint, 가로 넘침 | 전·후 모두 **21/21**. 간격 ko 37.9→**7.9px**, en 11.8→**6px**. 상자 ko 44×44·en 68.3×44 유지, 9점 모두 링크, 정렬 차 0 |

## 커밋 단위 B (C11)
| 파일 | 내용 | 결과 |
|---|---|---|
| `unit-checks.ts` → `unit-checks-output.txt` | `moved-ids.ts`: ID_PATTERN export, 실제 파일 주석뿐, a·b(6종)·c·g(중복·사슬·순환), d·e(ko·en)·f(없음·폐기)·h(상대·영어·절대·끝 슬래시·frontmatter)·i(폴더·참조), 음성(다른 id·더 긴 id·/repost/), 규칙 생성(영어 분기·308·와일드카드 문자 0), 번역 맵 불일치, 디스크(없음·주석뿐·정상·frontmatter id 기준·영어 폴더 없음·형식 위반 시 던짐·파일명 e·폴더 i), 실제 저장소 0건 | **46/46** |
| `mutation-check.sh` → `mutation-check-output.txt` | 규칙을 하나씩 끈 사본 16개에 같은 단위 시험 | **16/16 검출** |
| `build-fail.sh` → `build-fail-output.txt` | 사례 13개(정상 대조 + a·b·c·d·e·f·g 2·h 2·i 2) × `npm run build`·`npx next build` | **26/26** — 위반은 모두 종료 1·BUILD_ID 없음·규칙 표지 출력, 정상은 둘 다 통과. 형식 위반(a·b·c·g)은 직접 빌드에서 `next.config`가, d·e·f·h·i는 로더가 막는다 |
| `fixtures/` · `fixture-build.sh` · `redirect-check.mjs` → `fixture-build-output.txt` | 픽스처 2건(영어본 있음 a·없음 b) 포함 프로덕션 빌드 → `next start` → `curl -I` 8개 + 시험표 1~10 | **45/45** |
| `redirect-check-positive-control.txt` | 같은 검사를 리다이렉트 0개 서버(변경 전)에 | 27건 FAIL 검출 |
| `vercel-env-check.sh` → `vercel-env-check-output.txt` | 픽스처 사본을 `VERCEL=1`·없음으로 빌드해 routes-manifest 대조 | **4/4** — 두 환경 모두 사용자 리다이렉트 4개(308), 같음. headers는 VERCEL 없음 1·VERCEL=1 0(기존 설계) |
| `html-parity-a-vs-b-output.txt` | 단위 A 빌드 대 최종(A+B) 빌드, 전체 파일(스크립트 포함) | **802/802 같음** — 실제 목록 0건이면 화면·RSC 변화 없음 |
| `validate-output-diff.txt` | 변경 전·후 `validate:content` 출력 | 1줄 추가("옮긴 id 목록 … 0건 · 규칙 0개 · 오류 0개")뿐 |

## 공통
| 파일 | 결과 |
|---|---|
| `typecheck-output.txt` · `lint-output.txt` | exit 0 · **0 errors**, 경고 17 = 프로그래머 15의 16개 + `planner-16/count-self-images.mjs` 1개(이 오더 밖 도구). 이 폴더 도구 경고 0 |
| `a11y-e2e.mjs`(programmer-15 사본, 화면 위치만) → `a11y-e2e-output.txt`, `screens-e2e/` · `build-output-ga-dummy.txt` | GA 더미 빌드 + `next start -p 3113`: **184/184**, PASS/FAIL 라벨 184개가 프로그래머 15와 같다 |
| `regression-*-output.txt` | programmer-15 117/117 · programmer-13 104/104 · programmer-14-1 64/64 · programmer-05 53/53 · programmer-06 35/35 · programmer-13 hotlink-cases 10/10 |
| `gate-worktree.log` | `programmer-07/clean-clone-gate.sh --worktree` **통과**(npm ci → typecheck → lint → build, VERCEL=1) |
| `build-output.txt` | 최종 **일반 빌드**: 검증 418건 통과 · 정적 804/804 · GA 더미 ID가 든 파일 0 |
| `word-grep.sh` → `word-grep-output.txt` | 바꾸거나 만든 글자 파일 73개(핸드오프·트리거·오더 포함 재실행): 훅 패턴 0 · 절대/임시 경로 0 · 옛 #1 id 0 · 이름 로마자 0. 양성 대조 각 1건 |

## 실행 방법
```bash
npm run typecheck && npm run lint
npx tsx docs/tools/programmer-16/unit-checks.ts
bash docs/tools/programmer-16/mutation-check.sh
bash docs/tools/programmer-16/build-fail.sh          # 26회 빌드, 수 분
bash docs/tools/programmer-16/fixture-build.sh
bash docs/tools/programmer-16/vercel-env-check.sh
npm run build                                         # 일반 빌드
python3 docs/tools/programmer-12/copy-exact-check.py
python3 docs/tools/programmer-16/copy-exact-c3-c4.py [server/app]
node docs/tools/programmer-16/c3-substitute.mjs <변경 전 server/app> <출력> [--all]
node docs/tools/programmer-14/seo-parity.mjs <치환 사본> .next/server/app
node docs/tools/programmer-16/html-parity.mjs <--all 치환 사본> .next/server/app --markup-only --ignore-text-sep
npx next start -p 3116 & node docs/tools/programmer-16/breadcrumb-measure.mjs http://127.0.0.1:3116 after docs/tools/programmer-16/screens
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3113 & node docs/tools/programmer-16/a11y-e2e.mjs http://127.0.0.1:3113
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
npm run build                                         # 최종 일반 빌드
bash docs/tools/programmer-16/word-grep.sh
```
