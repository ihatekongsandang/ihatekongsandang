# 리뷰어 17 — 재현 명령·결과 로그 (프로그래머 09 + 테스터 02)

측정 시점: 2026-10-13 오전~12:15 · HEAD `545a720`(프로그래머 09 측정 때의 `02f51bc` 이후 docs 1건만 추가, `content/`·`src/` 변경 0 — `git diff --stat 02f51bc HEAD` = `docs/supervisor/drafts/…` 1파일).
빌드는 이 세션에서만 직렬로 3회(변경 전 복사본 → 변경 후 복사본 → 저장소) + 게이트 내부 1회.

## 1. 변경 전·후 빌드 분리 방법

작업 트리를 건드리지 않으려고(`git stash` 금지) 세션 임시 폴더에 복사본 2개를 만들었다.

```bash
git archive HEAD | tar -x -C <임시>/before                     # 변경 전 = HEAD 그대로
git archive HEAD | tar -x -C <임시>/after
cp src/components/tag-nav.tsx <임시>/after/src/components/       # 변경 후 = HEAD + 작업 트리 tag-nav.tsx 1파일
cp -cR node_modules <임시>/before/ ; cp -cR node_modules <임시>/after/   # APFS 복제
(cd <임시>/before && npm run build) ; (cd <임시>/after && npm run build)   # 둘 다 exit 0
```
두 복사본의 차이는 `tag-nav.tsx` 하나뿐이다(콘텐츠·업로더 작업 영향 없음).

## 2. 칩 HTML 회귀 — `chip-compare.log`

- 프로그래머 도구 `chip-html-snapshot.mjs` 재실행: 715 html · 328쪽 · 칩 4514 · 활성 311, class 외 차이 0, class 차이 311건(활성, `text-muted-foreground → text-background/70`) — **프로그래머 수치와 동일**.
- 독립 도구 `dom-compare.py`(정규식이 아니라 HTML 파서로 715쪽 **전체 DOM**을 요소 단위 비교, script/style/link/meta 제외, class는 따로 집계):
  비교 요소 **95,544개**, class 외 차이 파일 **0**, class 차이는 **311건 한 종류뿐**. → 칩뿐 아니라 사이트 전 페이지에서 바뀐 것은 활성 칩 숫자 class 311곳이 전부.

## 3. 대비 실측 — `contrast-sweep.browser.js.txt`

로컬 `npx next start`(변경 전 :3108, 변경 후 :3109), Chrome, 창 폭 1920, `/tag/1군단`에서 실행. `CSS.supports('color','color-mix(in lab, red, red)')` = true.
프로그래머 스크립트와 독립: 알파 합성을 직접 계산(캔버스 합성 아님). 변경 후 측정은 빌드 산출물에서 뽑은 328쪽 목록을 넣어 돌렸고, 변경 전 측정은 목록을 `/tags`에서 재구성(본 파일 스크립트, 328쪽 · 실패 0)했다.

| | 칩 | 배경 | 숫자 computed | 합성 숫자색 | 대비 |
|---|---|---|---|---|---|
| 변경 전 활성 | 311 | rgb(24,24,27) | rgb(82,82,91) | (82,82,91) | **2.292** |
| 변경 전 비활성 | 4203 | rgb(244,244,245) | rgb(82,82,91) | (82,82,91) | **7.032** |
| 변경 후 활성 | 311 | rgb(24,24,27) | oklab(0.999994 … / 0.7) | (185.2,185.2,186.2) | **9.061** |
| 변경 후 비활성 | 4203 | rgb(244,244,245) | rgb(82,82,91) | (82,82,91) | **7.032** |

- 페이지 328 · 칩 4514(= 311 + 4203) 전후 동일. `/tag/1군단` 실제 nav 13칩도 같은 두 종류.
- 활성 9.06 vs 프로그래머 9.14 차이: 캔버스의 알파가 8비트(0.7 → 178/255 = 0.698)로 양자화되는 데서 오는 합성값 차이(185.2 vs 186). 수학적 정확값(#fff 70% over #18181b = (185.7,185.7,186.6))은 **9.105**. 어느 값이든 AA 4.5·AAA 7 충족 — 결론 불변.
- 수학 교차검산(python, WCAG 상대휘도): #52525b/#18181b 2.292 · #52525b/#f4f4f5 7.032 · #fff/#18181b 17.717 · #18181b/#f4f4f5 16.118.

## 4. `color-mix` 미지원 경로 — 빌드 CSS 직접 확인

변경 후 빌드 CSS(`.next/static/css/*.css` 1개)에서 해당 규칙 전문:
```
.text-background,.text-background\/70{color:var(--background)}
@supports (color:color-mix(in lab,red,red)){.text-background\/70{color:color-mix(in oklab,var(--background) 70%,transparent)}}
```
`@supports`가 거짓이면 앞 규칙만 남아 숫자색 = `--background`(#ffffff) → #fff/#18181b = **17.72:1**(계산). 대비 미달 경로는 없다. 다만 위계(숫자가 태그명보다 약함)는 그 경로에서 사라진다. 실제 미지원 브라우저 렌더는 하지 않았다 — **확인 필요**(위험 낮음: CSS 캐스케이드상 결정적).

## 5. 저장소 검사 — `repo-checks.log` · `clean-clone-gate-worktree.log`

| 검사 | 결과 |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | 오류 0 · 경고 3(기존 `reviewer-04/keyboard-tab.mjs`·`reviewer-10/html-same.mjs`) — `programmer-09/*.mjs`에서 경고 0 |
| `npm run validate:content` | ✅ 검증 통과 |
| `npm run build` | exit 0 · 정적 723쪽 |
| `measure-tag-nav.mjs --expect-limit 12` | ✅ 전수 대조 통과(홈 12×16 · 상위 12 ×12 · 상위 밖 13×289 · 2쪽+ 12×10 · en 0×16 · `/tags` 301) |
| `clean-clone-gate.sh --worktree` | ✅ 통과(HEAD 545a720, 미추적 71 · 미스테이징 2 포함) |

## 6. 배포본 소량 재확인 (요청 3회, 12:09:39 +0900)

`curl` `/tags`(헤더 포함) · `/` · `/en`:
- `/tags`: 200, `x-vercel-cache: PRERENDER`, `<ul aria-label="태그 목록">` 안 `<li>` **301** · 링크 301 · 첫 `dmz` · 마지막 `kbs`
- `/`: 태그 nav 칩 **12**, "전체 태그 보기 (**301**개)", `#dmz` 숫자 40 · sr-only "게시물 40건"
- `/en`: `nav[aria-label="태그"]` **0**
- 헤더: `x-frame-options: DENY` 확인. CSP는 **`content-security-policy-report-only`** 헤더(강제 아님)에 `frame-ancestors 'none'`이 있다.
- 배포본에는 아직 `text-background/70` 없음(커밋 전이므로 정상).

## 7. 테스터 02 도구 메모 재현 (claude-in-chrome, 각 1회 — 소표본)

로컬 :3108 `/tag/1군단`, nav 첫 칩에 `.focus()` 후(`document.hasFocus()` = false, `visibilityState` = hidden):
1. 스크린샷 없이 `key Tab` → 포커스 **안 움직임**(`/tag/1군단` 그대로), 이후 `hasFocus` = true
2. `screenshot` → `key Tab` → `/tag/dmz`로 이동
3. **스크린샷 없이** `key Tab` → `/tag/이재명`으로 이동

→ "직전 screenshot이 없으면 Tab이 전달되지 않는다"는 일반 규칙으로는 성립하지 않았다(3번). 관찰된 사실은 "페이지가 포커스를 갖지 않은 상태의 첫 키가 소비됐다"까지다. 원인은 확인 필요.
`resize_window(390,844)` → 도구는 "Successfully resized" 반환, `innerWidth` 1920 불변(1회) — 테스터 관찰과 일치.

## 8. 저장소 독립 grep

A·B 커밋 후보 32파일(이미지 10장 포함, `grep -a -i -E`)에 pre-commit 훅(`.git/hooks/pre-commit`)의 `PATTERN` 전체 + 홈 디렉터리명·메일 도메인·다른 프로젝트 폴더명 + 임시 경로(`/private/`·`/var/folders`·`/tmp/`) 패턴 → **0건**. (다른 서비스명은 이 문서에 적지 않는다 — 패턴 원문은 훅 파일 참조.)
이미지 메타: JPEG 8장 마커 APP0(JFIF)·DQT·SOF0·DHT뿐(EXIF·XMP·COM 없음), PNG 2장 청크 IHDR·iCCP(프로파일명 `_`)·IDAT·IEND뿐(tEXt·iTXt·eXIf 없음). 확장 속성: 이미지 0 · `contrast-measure.browser.js.txt`에 Spotlight 메타(`kMDItem…`, git에 안 실림)만.
본 폴더 로그는 홈 경로를 `$HOME`, 임시 폴더를 `<mktemp>`·`<scratch>`로 치환했다.

## 9. 파일

| 파일 | 내용 |
|---|---|
| `README.md` | 본 문서 |
| `dom-compare.py` | 빌드 산출물 전 페이지 DOM 비교(독립 도구, `.py` — lint·typecheck 대상 아님) |
| `contrast-sweep.browser.js.txt` | 대비 전수 측정 브라우저 스크립트(독립 구현) |
| `chip-compare.log` | §2 실행 결과 |
| `repo-checks.log` | §5 typecheck·lint·validate·build·measure-tag-nav |
| `clean-clone-gate-worktree.log` | §5 게이트 전문 |
