# 프로그래머 19 — `kind: open`(A-2 인물 없는 자료사진) 검증·표시 도구와 결과

모두 저장소 루트에서 실행한다. 출력의 저장소 밖 임시 경로는 `<tmp>`, 홈 경로는 `$HOME`으로 바꿨다.
테스트 주소는 예시 도메인(`example.org`·`example.com`)과 creativecommons.org 라이선스 문서 주소만, 저작자·저작물명은 가상 값만 쓴다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `unit-checks.tsx` → `unit-checks-output.txt` | A 정상(CC BY 2.0/3.0/4.0·CC0·PD·기증 2종·workYear 생략·public workTitle/workYear) · B 거부(버전 없는 cc-by·BY-SA/NC/ND·지역판·public+cc·open+kogl-1·caption 없음·images[]·사진 유형·필수 필드·licenseUrl 버전·기증 licenseLabel·workYear 형식/미래 + 유지 규칙) · C 경고 · D 상세 표시 ko·en 글자 그대로(라이선스 7조합 × 2) · E 카드·JSON-LD·next/image · F 이미지 크기 읽기 | **289/289** |
| `unit-checks-positive-control.txt` | 같은 검사를 HEAD 코드 사본(저장소 밖)에서 실행 | 113개 중 **84 FAIL** 검출(검증 실패로 건너뛴 묶음 제외) |
| `fixture-setup.py` + `fixture-build-check.mjs` → `fixture-validate-output.txt` · `fixture-build-output.txt` · `fixture-build-check-output.txt` | 저장소 밖 사본에 open 게시물 5(ko)·영어본 2·이미지 5를 넣고 `NEXT_PUBLIC_SITE_URL=https://site.example.com` 빌드 → 산출물 .html·.rsc·.body **1,604개** 전수 | 검증 427/427(경고: 640×360 짧은 변·같은 원본 4건째), 정적 807/807, **104/104** |
| `fixture-serve-output.txt` | 같은 사본 `next start -p 3119` | 기증 사진 응답 = 저장 파일 바이트 동일, CC BY 사진은 `/_next/image` 200 webp, 상세·홈 200 |
| `copy-exact-about.py` → `copy-exact-about-output.txt` | 프로그래머 18 도구 사본, 하위 목록 기대값 4개(A-2 줄 추가) | **33/33** |
| `p18-copy-exact-about-output.txt` | 프로그래머 18 도구 원본(하위 3개 기대) | 27/31 — FAIL 4는 의도한 변경(하위 4개, 3번째가 A-2 줄) |
| `p12-copy-exact-check-output.txt` · `p13-unit-checks-output.txt` · `p14-1-unit-checks-output.txt` · `p15-unit-checks-output.txt` · `p13-hotlink-cases-output.txt` | 기존 회귀 도구 | 38/38 · 104/104 · 64/64 · 117/117 · 10/10 |
| `validate-output.txt` · `validate-tracked-only-output.txt` | 작업 트리 / 추적 파일만(HEAD content) | 420/420(다른 세션 미추적 게시물 1쌍 포함) / **418/418**, open 0 |
| `typecheck-output.txt` · `lint-output.txt` · `build-output.txt` · `gate-worktree.log` | | exit 0 · 0 errors(경고 21 전부 기존 `docs/tools/*`) · 정적 799/799 · `--worktree` 게이트 통과 |

## 기존 도구를 고친 곳
- `programmer-13/unit-checks.tsx` 2줄: kind 목록 오류 문구(`self / public / open / news`)와 news license 오류 문구(`라이선스는 kind \`public\`·\`open\`에만`)의 기대 정규식. 거부 자체는 그대로다(줄 위에 "프로그래머 19 갱신" 주석).
- `programmer-18/copy-exact-about.py`는 증거 기록이라 고치지 않았다. 이후 소개 문구 회귀는 이 폴더의 `copy-exact-about.py`를 쓴다.

## 실행 방법
```bash
npm run validate:content && npm run typecheck && npm run lint
npx tsx --tsconfig docs/tools/programmer-19/tsconfig.json docs/tools/programmer-19/unit-checks.tsx
npm run build && python3 docs/tools/programmer-19/copy-exact-about.py
# fixture(저장소 밖 사본) — fixture-setup.py 머리 주석의 순서대로
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
```
