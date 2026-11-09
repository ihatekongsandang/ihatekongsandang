# 프로그래머 12 — 약관·소개 문구 #1~#9 반영 검증 도구·결과

모두 저장소 루트에서 실행한다. 절대경로 없음. 로그의 저장소 경로는 상대경로로 바꿔 저장했다.

| 파일 | 내용 | 결과 |
|---|---|---|
| `copy-exact-check.py` → `-output.txt` | 🆕 `programmer-11-1/copy-exact-check.py` 방식. 기대 문장을 `planning/v0.2-post-release-sync.md` §6 표 "최종 문구" 칸에서 직접 읽는다(뺀 것은 기획 메모 "(…링크는 선택)"·"(링크 선택)"·"(뒤에 추가)"와 `**`뿐, 따옴표·아포스트로피는 그대로 비교). 빌드 HTML `terms`·`en/terms`·`about`·`en/about`에서 #1~#8이 놓일 자리(절·`<li>` 순서·준비 중 상자 바로 다음)에 글자 그대로 있는지, 굵게 범위, 각 1회, 옛 문구 0, #8 인용 ⊂ `SITE_EN.aboutIntro`(소스·`/en/about` 빌드), #9 h1 바로 다음 줄·문구·`<time dateTime>`·작은 글씨·JSON-LD `dateModified`, #3·#4가 소스에서 `contactEmail` null 분기 안에만 있는지 확인 | 38건 PASS 38 · FAIL 0 |
| `og-description-count.mjs` → `-output.txt` | 🆕 `content/posts`·`content/posts-en` 전체 frontmatter를 gray-matter(기존 의존성)로 읽어 `og.description` 키·값 수를 세고, 줄 단위 grep으로 교차 확인. 양성 대조: 같은 방식으로 `og` 블록 207·`og.siteName` 207·`og.title` 1 검출 | posts 207 · posts-en 207 · 키 0 · 값 0 · 줄 0 |
| `word-grep.sh` → `word-grep-output.txt` | 🆕 변경 5파일 × (D6 자칭 금지어 9종 — 리뷰어 26 목록 + 저장소 독립 패턴), 파일 전체와 diff 추가 줄 각각. 저장소 독립 패턴은 로컬 pre-commit 훅에서 읽는다(이 폴더에 다른 서비스명을 적지 않으려고). 이 폴더 산출물에도 같은 패턴 grep | 50줄 전부 0 · 이 폴더 합계 0 · 양성 대조(훅 파일 자체 1줄 일치) |
| `a11y-e2e.mjs` → `-output.txt` | `programmer-11-1/a11y-e2e.mjs` 사본. 화면 저장 위치를 `programmer-12/screens`로 바꾸고 3절에 2종 × 2폭 추가: 약관 ko/en 개정일 줄(h1 바로 다음 `p.text-xs`, `time[datetime=2026-11-09]`), 소개 ko/en 처리 기준 문장(준비 중 상자 바로 다음 `p.text-xs`) | 184건 PASS 184 · FAIL 0 (기존 176 + 신규 8. 라벨 대조 결과 기존 176개 라벨은 11-1 출력과 같고 추가는 이 8줄뿐). 약관·소개 항목 76건(11-1은 68건) |
| `screens/*.png` | 위 실측 때 찍은 화면 18장 | — |
| `reviewer-27-reproduce-rerun.txt` | `docs/tools/reviewer-27/terms-copy-reproduce.py` 재실행(도구 변경 없음, 참고용) | ko·en 각 정방향 29개 중 27개 일치. 일치하지 않은 2개는 이번에 바꾼 옛 문장(#1·#5 / #2·#6)이다. 이 도구는 `planning/terms-page-copy.md`의 한국어 문안·English copy 본문(개정 전 문장)과 비교하고, 개정 문구는 §C에 따로 있다. 기획 본문 환원은 기획 영역이라 손대지 않았다 |
| `typecheck-output.txt` | `npm run typecheck` | exit 0 |
| `lint-output.txt` | `npm run lint` | 0 errors · 4 warnings(전부 기존 `docs/tools/reviewer-04·10·26` 파일, 이번 변경과 무관) |
| `build-output.txt` | 최종 `npm run build`(prebuild validate 포함, `.env.local` 값) | 검증 414건(posts 207 + posts-en 207) 통과 · 정적 801/801 |
| `build-output-ga-dummy.txt` | e2e GA 이벤트 실측용 빌드(`NEXT_PUBLIC_GA_ID=G-TEST000000`) | 검증 통과 · 801/801 |
| `gate-worktree.log` | `docs/tools/programmer-07/clean-clone-gate.sh --worktree` | ✅ 게이트 통과(npm ci → typecheck → lint → build) |

## 실행 방법
```bash
npm run typecheck && npm run lint
npm run build && python3 docs/tools/programmer-12/copy-exact-check.py
node docs/tools/programmer-12/og-description-count.mjs
sh docs/tools/programmer-12/word-grep.sh
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3112 &
node docs/tools/programmer-12/a11y-e2e.mjs http://127.0.0.1:3112
bash docs/tools/programmer-07/clean-clone-gate.sh --worktree
```

순서: typecheck → lint → build → copy-exact-check → GA 더미 빌드 → e2e → 게이트 → 최종 일반 빌드(`.next`를 일반 값으로 되돌림, `G-TEST000000` 0건 확인) → copy-exact-check 재실행(38/38).
