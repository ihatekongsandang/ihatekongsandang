# 프로그래머 09 — 활성 태그 칩 건수 숫자 대비 실측·회귀 로그

측정 시점: 2026-10-13 10:59~11:03. 변경 전 빌드는 HEAD `c2cde5f` 작업 트리, 변경 후 빌드·게이트 시점 HEAD는 `02f51bc`
(그 사이 업로더 커밋 1건 — 게시물 본문 병합만, `tags:` 줄 변경 0 → 칩 수·건수 영향 없음. 아래 칩 HTML 비교에서 칩 4514개의 건수 숫자까지 전부 같음으로 확인).
로컬 프로덕션 빌드(`npm run build` → `npx next start -p 3109`), Chrome 153, 창 폭 1920px, 라이트(사이트에 다크 토큰 없음).

## 1. 대비 실측 (임무 2)

방법: 각 칩의 배지(`[data-slot="badge"]`) `backgroundColor`와 건수 숫자(`span[aria-hidden]`) `color`를 `getComputedStyle`로 읽고,
1×1 캔버스에 배경 → 글자색 순으로 칠해 **브라우저가 합성한 sRGB 픽셀**을 읽어 WCAG 상대휘도로 대비를 계산한다
(변경 후 색은 `oklab(… / 0.7)` 반투명이라 배경과의 합성을 브라우저에 맡긴다).
범위: ① 실제 페이지 `/tag/1군단` nav ② **전수** — 칩이 있는 328쪽(홈 16 · 태그 피드 311 · `/tags` 1) HTML을 받아 칩 `<a>`를 그대로 현재 문서에 넣어 렌더(같은 CSS) → 칩 4514개 전부.

| | 칩 | 배경 computed | 숫자 computed | 합성 숫자색 | 숫자 대비 | 태그명 대비 | 숫자 글꼴 |
|---|---|---|---|---|---|---|---|
| **변경 전 활성** | 311 | rgb(24,24,27) | rgb(82,82,91) | (82,82,91) | **2.29:1** ❌ | 17.72:1 | 12px/500 |
| **변경 후 활성** | 311 | rgb(24,24,27) | oklab(0.999994 0.0000456 0.0000201 / 0.7) | (186,186,187) | **9.14:1** ✅ | 17.72:1 | 12px/500 |
| 변경 전 비활성 | 4203 | rgb(244,244,245) | rgb(82,82,91) | (82,82,91) | 7.03:1 | 16.12:1 | 12px/500 |
| 변경 후 비활성 | 4203 | rgb(244,244,245) | rgb(82,82,91) | (82,82,91) | **7.03:1 (불변)** | 16.12:1 | 12px/500 |

- 전수 결과는 위 4행이 전부다(변경 전·후 각각 색 조합 종류 2개, 311 + 4203 = 4514 = 스냅샷 칩 수).
- 실제 페이지 `/tag/1군단` nav 13칩 측정도 같은 값(활성 2.29 → 9.14, 비활성 7.03).
- `color-mix` 미지원 브라우저: Tailwind가 앞에 `color: var(--background)`(흰색)를 대체값으로 둔다(빌드 CSS 확인) → 활성 태그명과 같은 #fff/#18181b = 17.72:1(태그명 실측값). 이 경로를 실제 미지원 브라우저에서 렌더해 보지는 않았다 — **확인 필요**(측정 Chrome은 `CSS.supports` true).
- 육안: `before-tag-1gundan-chips.png`(활성 "1"이 거의 안 보임) / `after-tag-1gundan-chips.png`.

## 2. 칩 HTML 전후 비교 (임무 3)

`chip-html-snapshot.mjs` — `.next/server/app/**/*.html` 715개에서 칩 `<a>` 전수 추출 후 비교.

```
변경 전: html 파일 715 · 칩 있는 파일 328 · 칩 4514 · 활성 칩 311
변경 후: html 파일 715 · 칩 있는 파일 328 · 칩 4514 · 활성 칩 311
비교한 칩 4514 · class 외 차이 0
class 차이 종류: 311건 · 활성 | class[2] "text-muted-foreground" → "text-background/70"
✅ class 외 변경 없음
```

## 3. 파일

| 파일 | 내용 |
|---|---|
| `chip-html-snapshot.mjs` | 칩 HTML 전수 스냅샷(`dump`)·비교(`compare`) |
| `chip-snapshot-before.log` · `chip-snapshot-after.log` · `chip-html-compare.log` | 위 실행 결과 |
| `contrast-measure.browser.js.txt` | 대비 실측 브라우저 스크립트(콘솔에 붙여 실행, top-level await). 저장소 lint·typecheck 대상에서 빼려고 `.txt` |
| `serve-url-list.mjs` | 측정 스크립트가 읽을 URL 목록을 CORS 허용으로 내주는 임시 서버(3110) |
| `before-/after-tag-1gundan-chips.png` | `/tag/1군단` 칩 줄 확대 캡처 |
| `build-before.log` · `build-after.log` | 둘 다 정적 723쪽 |
| `measure-tag-nav.log` | `programmer-08/measure-tag-nav.mjs --expect-limit 12` ✅ 전수 대조 통과 |
| `typecheck-lint.log` | typecheck ✅ · lint 오류 0 · 경고 3(기존 `reviewer-04`·`reviewer-10` 파일) |
| `validate-content.log` | ✅ 검증 통과 |
| `clean-clone-gate-worktree.log` | `programmer-07/clean-clone-gate.sh --worktree` ✅ (임시 폴더 경로는 `<mktemp>`로 치환) |

## 4. 재실행

```bash
npm run build
node docs/tools/programmer-09/chip-html-snapshot.mjs dump "$TMPDIR/chips.json"
node -e 'const s=require(process.argv[1]);require("fs").writeFileSync(process.argv[2],JSON.stringify(Object.keys(s).map(f=>"/"+f.replace(/\.html$/,"").replace(/^index$/,"")).map(u=>u.split("/").map(encodeURIComponent).join("/"))))' "$TMPDIR/chips.json" "$TMPDIR/urls.json"
npx next start -p 3109 &
node docs/tools/programmer-09/serve-url-list.mjs "$TMPDIR/urls.json" &
# 브라우저로 http://localhost:3109/tag/1군단 을 열고 contrast-measure.browser.js.txt 내용을 콘솔에서 실행
```
