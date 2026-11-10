# 프로그래머 17 — about-sns-stored-line-remove 완료 트리거

**작성일**: 2026-11-10 12:25 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)
**오더**: `instructions/programmer/processed/17-about-sns-stored-line-remove.md` · **핸드오프**: `docs/handoffs/programmer-17-about-sns-stored-line-remove.md` · **도구**: `docs/tools/programmer-17/`

> git 쓰기 없음(add·commit·push 0). 범위 밖 코드·설정 수정 0. 빌드는 이 창에서만 했다.
> 저장소 독립: 이 트리거·핸드오프·도구 출력에 홈 절대경로·임시 경로·계정명 0(홈·임시 폴더 경로 grep 0건, 출력의 경로는 `$HOME`·`<tmp>`로 바꿈).

## 바꾼 파일 (2개, 삭제만 — 13줄 삭제·추가 0)
| 파일 | 전 | 후 |
|---|---|---|
| `src/app/(ko)/about/page.tsx` 93~99행 | "카드의 대표 이미지" 하위 목록 2번째 `<li>`: "**SNS 게시물을 다룬 글 중 상당수**는 원 게시물의 이미지(썸네일)를 이 사이트에 **저장해** 보여 줍니다. … 이 방식은 **정리하기로 했으며**, 근거 언론 기사의 사진 또는 대체 이미지로 차례로 바꿉니다." (7행) | 해당 `<li>` 통째로 없음. 앞 줄(언론 사진)과 뒤 줄("일부 글은 … 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다")이 바로 이어짐. 다른 줄 글자 변화 0 |
| `src/app/(en)/en/about/page.tsx` 52~57행 | 같은 하위 목록 2번째 `<li>`: "Many posts about social media posts show the original post's image, stored on this site. … We have decided to phase this out and will replace them step by step with a photo from the news article or a replacement image." (6행) | 해당 `<li>` 통째로 없음. 다른 줄 글자 변화 0 |

전체 diff: `docs/tools/programmer-17/src-diff.txt` (hunk 2개: ko `@@ -90,13 +90,6 @@`, en `@@ -49,12 +49,6 @@`).
- ⚠️ ko 84행 주석 "리뷰 34 §2.4 정정 문안 = … §2.2 ko 2번. 글자는 그 문서와 같게 둔다"는 "다른 줄은 한 글자도 바꾸지 않는다"에 따라 **그대로 뒀다**. 이제 화면은 §2.2 ko 2번에서 SNS 줄을 뺀 것이다. 주석·기획 문서 갱신 여부는 슈퍼바이저 판단(아래 미해결 1).

## 검사 기대값 (오더 3)
`grep -rn "저장해\|stored on this site\|상당수\|Many posts\|phase this out\|정리하기로" src scripts tests e2e docs/tools` 전수:
- `src`: 위 2파일뿐(삭제 후 0). `scripts`: 0. `tests`·`e2e` 폴더 없음. `package.json`에 `test` 스크립트 없음(scripts = dev·prebuild·build·start·lint·typecheck·validate:content·check:hotlinks·og:draft).
- 기대값을 가진 검사 2개 — **고치지 않고 새 검사로 대신했다**(과거 세션 증거 도구라서):
  1. `docs/tools/programmer-16/copy-exact-c3-c4.py` — 기대값을 `planning/q1-…-plan.md` §2.2에서 직접 읽는다(기획 문서는 범위 밖). 재실행: **48/58, FAIL 10건 전부 SNS 줄 삭제로 2번 하위 목록이 한 칸씩 당겨진 것**(ko 하위 2~5·항목 수·굵게 범위, en 하위 2~5) → `copy-exact-programmer-16-rerun-output.txt`.
  2. `docs/tools/reviewer-36/serve-check.sh` 32행 `/about '정리하기로 했으며' 1회` — 이제 0회가 맞다(실행 안 함, 리뷰어 도구).
- 대신 **`docs/tools/programmer-17/copy-exact-about.py`** 신설: 같은 §2.2에서 기대값을 읽고 SNS 줄 하나만 빼서(ko 굵게 3개 포함) 빌드 HTML과 대조 + 페이지 전체에 옛 문구 0회 → **44/44 PASS**. 양성 대조(빌드 HTML 사본에 SNS 줄을 다시 넣음) → **28/44, FAIL 16 검출**(`copy-exact-about-positive-control.txt`).
- 기존 `programmer-12/copy-exact-check.py`(약관·소개 #1~#9) → **38/38**.

## grep — 사이트 다른 곳 (오더 4, 보고만)
`grep -rnE "저장해|저장한|저장된|저장본|stored|썸네일|thumbnail|원 게시물의 이미지|original post.s image" src public content/README.md` + `grep -rnE "SNS|social media|소셜" src`(주석 제외):
- **방문자에게 보이는 문장: 0건.** `src`의 해당 낱말은 전부 코드 주석(`opengraph-image.tsx`·`post/[id]/page.tsx`의 "원문 썸네일은 공유 미리보기로 쓰지 않는다", `card-media.tsx`·`schema.ts`·`view.ts`·`markdown.ts`의 핫링크·`useSourceImage` 설명). `llms.txt/route.ts`·약관·메타 설명에 SNS 이미지 저장 문장 없음. `public/`에는 검증용 html 2개와 `images/`뿐.
- 사이트 밖 내부 문서 1곳(고치지 않음): `content/README.md` 195행 "`kind`를 생략하면 `self`(운영자 제작·SNS 원문 이미지 저장본)다" — 저장본 0건이 된 지금은 "SNS 원문 이미지 저장본" 부분이 옛 설명. 갱신 여부 슈퍼바이저 판단.

## 검증 (오더 5)
| 명령 | 결과 | 출력 |
|---|---|---|
| `npm run typecheck` | exit 0 | `typecheck-output.txt` |
| `npm run lint` | exit 0 · **0 errors**, 경고 21 — 전부 `docs/tools/*`(13개 파일), `src` 0 | `lint-output.txt` |
| `npm run validate:content` | exit 0 · "✅ 검증 통과" · 영어본 209/209 | `validate-output.txt` |
| `npm run build` | exit 0 · prebuild 검증 통과 · 정적 **796/796** | `build-output.txt` |
| test | `test` 스크립트 없음 → copy-exact 3종으로 대신(위: P17 44/44 · P12 38/38 · P16 48/58 예상된 FAIL 10) | |
| 렌더(`next start -p 3117`) | `/about`·`/en/about` 둘 다 HTTP 200, "카드의 대표 이미지" 하위 목록 **4개**, 옛 문구 6종 각 **0회** | `render-check-output.txt` |
| `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree` | exit 0 · "✅ 깨끗한 복제본 게이트 통과 (--worktree)" | `gate-worktree.log` |

렌더 텍스트(하위 목록, 빌드 결과 그대로):
- ko: 1. 언론 기사의 사진을 쓰는 글은 그 사진을 이 사이트에 복제해 두지 않고 원 매체 주소에서 그대로 불러와 보여 줍니다. … / 2. 일부 글은 이 사이트가 게시물 요지를 정리해 만든 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다. / 3. 공공누리로 개방된 공공 사진을 쓸 때는 … / 4. 사진이 없거나 불러오지 못하면 대체 이미지를 보여 줍니다.
- en: 1. When a post uses a photo from a news article, … / 2. Some posts use a card image this site made to summarize the post. These will also be replaced step by step. / 3. When we use public photos released under the Korea Open Government License (KOGL), … / 4. If a post has no image, or an image fails to load, a replacement image is shown.

⚠️ 게이트·빌드는 **작업 트리 기준**이라 다른 세션의 미커밋 변경(`content/posts*` 수정·삭제, `public/images` 1장 등)도 함께 들어간 상태로 통과했다. 이 오더의 변경만 커밋할 때는 아래 커밋 대상만 스테이징하고 `--staged` 게이트를 권한다.

## 커밋 대상 (이 오더 것만)
- `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`
- `docs/tools/programmer-17/`(전체), `docs/handoffs/programmer-17-about-sns-stored-line-remove.md`, 이 트리거, `instructions/programmer/processed/17-about-sns-stored-line-remove.md`(이동), `history/2026-11-10.md`(append)

## 미해결 (슈퍼바이저 판단)
1. 기획 문서 §2.2 ko·en 문안과 ko 84행 주석은 아직 SNS 줄을 포함한 문안을 가리킨다 — 기획자가 §2.2에 "P17로 SNS 줄 삭제" 표시를 넣을지, 주석을 고칠지.
2. `content/README.md` 195행 "SNS 원문 이미지 저장본" 표현.
3. `programmer-16/copy-exact-c3-c4.py`·`reviewer-36/serve-check.sh`는 이제 SNS 줄 항목에서 FAIL이 정상 — 이후 회귀에는 `programmer-17/copy-exact-about.py`를 쓴다.

## `git status --short` (이 오더 관련 줄, 12:20 기준 · 전체 146줄은 다른 세션 변경 포함)
```
 M src/app/(en)/en/about/page.tsx
 M src/app/(ko)/about/page.tsx
?? docs/tools/programmer-17/
?? instructions/programmer/17-about-sns-stored-line-remove.md   (→ processed/로 이동함)
```
(트리거·핸드오프 작성 후 추가: `?? docs/triggers/programmer-17-…-COMPLETE.md`, `?? docs/handoffs/programmer-17-….md`, `M history/2026-11-10.md`)
