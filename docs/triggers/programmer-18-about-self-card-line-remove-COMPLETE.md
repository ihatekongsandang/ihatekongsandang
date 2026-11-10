# 프로그래머 18 — about-self-card-line-remove 완료 트리거

**작성일**: 2026-11-11 08:52 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)
**오더**: `instructions/programmer/processed/18-about-self-card-line-remove.md` · **핸드오프**: `docs/handoffs/programmer-18-about-self-card-line-remove.md` · **도구**: `docs/tools/programmer-18/`

> git 쓰기 없음(add·commit·push 0). 범위 밖 코드·설정·콘텐츠 수정 0(업로더 25 미커밋 변경 손대지 않음). 빌드는 이 창에서만 했다.
> 저장소 독립: 도구 출력의 경로는 `$HOME`·`<tmp>`로 바꿨다(`docs/tools/programmer-18` 안 홈·임시 경로 grep 0건).

## 바꾼 파일 (2개, 삭제만 — 8줄 삭제·추가 0)
| 파일 | 전 | 후 |
|---|---|---|
| `src/app/(ko)/about/page.tsx` 93~96행 | "카드의 대표 이미지" 하위 목록 2번째 `<li>`: "일부 글은 이 사이트가 게시물 요지를 정리해 만든 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다." (4행) | 해당 `<li>` 통째로 없음. 언론 사진 줄 다음에 공공누리 줄이 바로 이어짐. 다른 줄 글자 변화 0 |
| `src/app/(en)/en/about/page.tsx` 52~55행 | 같은 하위 목록 2번째 `<li>`: "Some posts use a card image this site made to summarize the post. These will also be replaced step by step." (4행) | 해당 `<li>` 통째로 없음. 다른 줄 글자 변화 0 |

전체 diff: `docs/tools/programmer-18/src-diff.txt` (hunk 2개: ko `@@ -90,10 +90,6 @@`, en `@@ -49,10 +49,6 @@`). 변경 전 두 파일은 HEAD와 같았다(작업 전 `git diff --stat -- src/` 출력 없음).
- ko 84행·en 37행 주석("§2.2 … 글자는 그 문서와 같게 둔다")은 "다른 줄은 한 글자도 바꾸지 않는다"에 따라 그대로 뒀다(미해결 1).

## 새 도구 `docs/tools/programmer-18/copy-exact-about.py` (오더 2)
- 기대값을 **코드에 글자 그대로** 적었다: ko·en 각각 절 제목, 바깥 목록 4개, 2번 머리글, 하위 3개(언론 사진·공공누리·대체 이미지), 하위 굵게 범위(ko `언론 기사의 사진을 쓰는 글` 1개, en 0개), 옛 문구 0회(ko 6종·en 5종 — 자체 카드 줄 2종 + SNS 줄 3~4종).
- 빌드 결과: **31/31 PASS** (`copy-exact-about-output.txt`).
- 양성 대조 ① 빌드 HTML 사본에 자체 카드 줄을 다시 넣음 → **21/31, FAIL 10** 검출(하위 수 4·하위 2·3 어긋남·옛 문구 1회, ko·en 각 5) — `copy-exact-about-positive-control.txt`.
- 양성 대조 ② 사본에 SNS 저장 줄을 다시 넣음 → **18/31, FAIL 13** 검출 — `copy-exact-about-positive-control-sns.txt`.
- 기존 도구: `programmer-12/copy-exact-check.py` **38/38** · `programmer-17/copy-exact-about.py` **33/44, FAIL 11**(예상된 것 — 기획 §2.2에 SNS 줄이 없어져 기대값 읽기 3건 FAIL + 하위 4개 기대라 ko·en 각 4건). P17 도구는 증거 기록이라 고치지 않았다. 이후 회귀는 P18 도구를 쓴다.

## grep — 자체 카드 관련 위치 (오더 3, 보고만·수정 0)
`grep -rnE "자체 제작|자체 카드|자체 이미지|이 사이트가 (만든|제작)|운영자 제작|만든 카드|카드 이미지|this site made|site-made|own card|own image|made by this site|직접 만든" src content/README.md public` + `grep -rnE "제작|made by|\bself\b" src` + `sourcePreviewNote`·약관·`llms.txt` 이미지 낱말 확인:

**방문자에게 보이는 문장 — 자체 카드가 있다는 취지: 0건.**
- `src/app/(ko)/about/page.tsx:109` "공유 미리보기 이미지에는 이 사이트의 자체 이미지를 씁니다." · `src/app/(en)/en/about/page.tsx:68` "Share previews use this site's own image." — OG 공유 이미지(무문자 도형) 이야기로 카드 대표 이미지와 무관. 사실과 맞음.
- `sourcePreviewNote` ko·en(`src/lib/i18n.ts:162·245`) — 메타 인용 안내뿐, 이미지 언급 없음.
- 약관 `src/app/(ko)/terms/page.tsx:85·111`, `src/app/(en)/en/terms/page.tsx:87·119` — "원문 이미지 사용 중단 요청"·"이미지 교체" 절차 문장. 자체 카드 언급 없음.
- `src/app/llms.txt/route.ts` — 이미지·사진 낱말 0.
- `public/` — `images/.gitkeep`만(검증용 html 외 해당 문구 0).

**코드 주석·내부 문서 (방문자 비노출):**
- `src/lib/content/schema.ts:47` "`self`: 운영자가 만든 이미지(기존 텍스트 카드 등). 생략하면 이 값이다." — 타입 설명. 현재 self 0건이지만 스키마 값 자체는 유효.
- `src/lib/content/schema.ts:51·139·151~152·319·338~395·787·795` — `self` 기본값·검증 분기 코드·주석.
- `src/components/card-media.tsx:50` "저장소 보유 이미지(`/images/**` — self·public)는 next/image로 최적화한다."
- `src/components/post-detail.tsx:31` "self 이미지의 caption(내부 판정 메모가 섞인 206건)은 여기로 오지 않고 계속 숨는다." — "206건"은 이제 옛 수치.
- `scripts/validate-content.ts:91·174` — kind 기본값 `self`·종류별 집계 출력.
- `src/app/(en)/en/opengraph-image.tsx:5`·`src/app/(en)/en/post/[id]/page.tsx:28` — OG "사이트 자체 이미지" 주석(공유 이미지, 무관).
- `content/README.md:87` "`kind`를 생략하면 `self`(운영자 제작 이미지)" · `:195` "`kind`를 생략하면 `self`(운영자 제작 카드 이미지)다. SNS 원문 이미지 저장본은 정리가 끝나 0건이다." — 자체 카드도 0건이 된 사실은 미반영. `:155·185·347` `/images/…` 예시 경로.

## 검증 (오더 4)
| 명령 | 결과 | 출력 |
|---|---|---|
| `npm run typecheck` | exit 0 | `typecheck-output.txt` |
| `npm run lint` | exit 0 · **0 errors**, 경고 21 — 전부 `docs/tools/*`, `src` 0 | `lint-output.txt` |
| `npm run validate:content` | exit 0 · "✅ 검증 통과" · 영어본 209/209 | `validate-output.txt` |
| `npm run build` | exit 0 · 정적 **796/796** | `build-output.txt` |
| 렌더(`next start -p 3118`) | `/about`·`/en/about` 둘 다 HTTP 200, 하위 목록 **3개**, 옛 문구 ko 5종·en 5종 각 **0회** | `render-check-output.txt` |
| `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree` | exit 0 · "✅ 깨끗한 복제본 게이트 통과 (--worktree)" | `gate-worktree.log` |

렌더 하위 목록(빌드 결과 그대로):
- ko: 1. 언론 기사의 사진을 쓰는 글은 그 사진을 이 사이트에 복제해 두지 않고 원 매체 주소에서 그대로 불러와 보여 줍니다. 사진 아래에 출처(사진 권리자 또는 매체)와 원문 링크를 적습니다. / 2. 공공누리로 개방된 공공 사진을 쓸 때는 사진 아래에 공공누리 유형을 적습니다(현재 쓰는 사진은 없습니다). / 3. 사진이 없거나 불러오지 못하면 대체 이미지를 보여 줍니다.
- en: 1. When a post uses a photo from a news article, the photo is loaded directly from the news outlet's address rather than copied to this site. Below the photo, we credit the rights holder or outlet and link to the original. / 2. When we use public photos released under the Korea Open Government License (KOGL), the license type is shown below the photo (none are in use now). / 3. If a post has no image, or an image fails to load, a replacement image is shown.

⚠️ 빌드·게이트는 **작업 트리 기준**이라 업로더 25의 미커밋 변경(`content/posts*` 58개 수정, `public/images` 29장 삭제)이 함께 들어간 상태로 통과했다. 오더대로 묶음 5 배포 뒤 이 오더 파일만 스테이징하고 `--staged` 게이트를 권한다.

## 커밋 대상 (이 오더 것만)
- `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`
- `docs/tools/programmer-18/`(전체), `docs/handoffs/programmer-18-about-self-card-line-remove.md`, 이 트리거, `instructions/programmer/processed/18-about-self-card-line-remove.md`(이동 — 원 위치는 미추적이었음), `history/2026-11-11.md`(이 세션 append 1건 — 파일에 다른 세션 기록도 섞여 있음)

## 미해결 (슈퍼바이저 판단)
1. 기획 §2.2 ko·en 문안(자체 카드 줄 포함)과 ko 84행·en 37행 주석이 "§2.2와 글자 같게"를 가리킨다 — 기획자 §2.2 갱신 필요(§3.4 표 288행 "셋째 줄 … 유지"도 옛 상태).
2. `content/README.md:87·195`, `src/lib/content/schema.ts:47`, `src/components/post-detail.tsx:31`("206건") 설명 갱신 여부.
3. `programmer-17/copy-exact-about.py`는 이제 FAIL 11이 정상 — 회귀에는 P18 도구를 쓴다.

## `git status --short` (이 오더 관련 줄, 08:51 기준 · 나머지는 다른 세션 변경)
```
 M src/app/(en)/en/about/page.tsx
 M src/app/(ko)/about/page.tsx
?? docs/tools/programmer-18/
?? instructions/programmer/processed/18-about-self-card-line-remove.md
```
(트리거·핸드오프 작성 후 추가: `?? docs/triggers/programmer-18-…-COMPLETE.md`, `?? docs/handoffs/programmer-18-….md`, `M history/2026-11-11.md`)
