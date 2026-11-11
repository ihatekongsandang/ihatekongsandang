# 리뷰어 73 — 프로그래머 20 검토 (라이선스 확대: CC BY-SA·ND·한국판·PD 근거 · 검증 · 표시 · 소개 문구) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-12
- 오더: `instructions/reviewer/processed/73-programmer-20-review.md`(이동)
- 대상:
  - 트리거 `docs/triggers/programmer-20-image-license-expand-COMPLETE.md`
  - 핸드오프 `docs/handoffs/programmer-20-image-license-expand.md`
  - `docs/tools/programmer-20/`
  - 트리거가 적은 커밋 경로의 `git diff`와 새 파일. HEAD는 `246f9ea`이다.
  - 제외: 업로더 진행분(`content/posts*`·`public/images`), `attendkdz`·`gotdemcatch`.
- 기준: 정책 `planning/card-image-policy.md` §4.5·§8(커밋 9dab545), 기획 20 트리거 "## 20-1" §2 명세 12항, 리뷰 71·71-1
- 파일 수정 0(이 트리거와 오더 이동만), git 쓰기 0.
- 빌드는 오더대로 1회 했다. 실행 전에 next 빌드·개발 서버 프로세스가 없음을 확인했고, `.next`는 프로그래머 빌드(07:26) 뒤 다른 작업이 건드리지 않은 상태였다.

## 판정: ✅ 통과 (커밋 게이트 — P1 0 · P2 0 · P3 6, 모두 커밋을 막지 않음)

## 1. 직접 실행한 명령과 결과
| 명령 | 결과 |
|---|---|
| `npm run validate:content` | exit 0 · 420/420 · 오류 0 · `self 0 · public 0 · open 32 · news 33` · 경고 24(기준 22 + 새 2) |
| `npm run typecheck` | exit 0 |
| `npx tsx --tsconfig docs/tools/programmer-20/tsconfig.json docs/tools/programmer-20/unit-checks.tsx` | **514/514** 통과 |
| `npm run build` (1회) | exit 0 · 정적 **799/799** |
| `node docs/tools/programmer-20/build-artifact-check.mjs` | **6,779/6,779** — 산출물 2,444개, og/twitter:image 7,900·JSON-LD 2,317에 `/images/` 0, 카드 페이지 742개에 크레딧 0, 상세 크레딧 figcaption 130 |
| `python3 docs/tools/programmer-20/copy-exact-about.py` | **41/41** |
| 리뷰어 독립 확인 ① | `.next/server/app`의 상세 밖 `.html`·`.rsc` **742개 전수**를 grep했다. `creditName` 0회, `index.rsc`·`page/2.rsc`에 `creditName`·`sourcePageUrl` 호스트 0회 |
| 리뷰어 독립 확인 ② | 빌드 HTML `about.html`·`en/about.html`에서 명세 9 ko·en 문안이 글자 그대로 들어 있음(True/True) |
| 리뷰어 독립 확인 ③ | 상세 `post/2026-09-16-pickmag-…`의 figcaption: caption 줄 + "사진: 서울특별시, 「…」(2020) · 서울연구데이터서비스 / CC BY 4.0 · 원 페이지 · 라이선스". 링크 두 개 모두 `target="_blank" rel="noopener"`로 기존 public·news 링크와 같다 |
| 리뷰어 독립 확인 ④ | `matchesCcLicenseUrl`·`openLicenseRejectReason` 경계값을 저장소 밖 스크립트로 시험했다(아래 3절) |

## 2. 항목별 결과
### 2-1. 스키마 (항목 1) — ✅
- license 값 8개(`cc-by-sa-2.0/3.0/4.0`·`cc-by-nd-2.0/3.0/4.0`·`cc-by-2.0-kr`·`cc-by-sa-2.0-kr`)를 확인했다(`schema.ts:68~83`). 한국판 ND와 그 밖 포트 값은 없다.
- `pdExpiredMaxYear` = `Math.max(1962, todayYear − 71)`이고 `options.today`로 주입된다. 테스트에 1962·1963(2034)·1969(2040)가 있다.
- `pdBasis` 필수·값 검사, `pdBasisYear` 4자리·`expired-*` 필수·기준 초과 오류, 다른 license에서는 알림만, **pd `licenseLabel`은 오류**(:850~856).
- us-gov 경고 두 가지(위키미디어 호스트·`creditNotice` 공란) — 정책 조건 ⓐ·ⓓ와 맞다.
- CC URL은 `CC_LICENSE_TAIL`로 머리 뒤를 비어 있음·`deed`·`legalcode`(+언어 접미)·끝 `/`만 허용한다.
  - 국제판 값에 `kr/`·`igo/`·`us/`, 한국판 값에 국제판 URL을 넣으면 거부된다(테스트 :140~174).
  - `.txt` 같은 형식 접미도 거부된다.
- reject 메시지: NC "상업 이용 금지", 지역판 "한국판 … 만 허용", 버전 없음 "버전을 적으세요". 직접 시험한 값도 같다(`cc-by-nd-2.0-kr`·`cc by nc 4.0`·`cc-by-sa`·`CC-BY-3.0-IGO`).
- 기존 동작은 그대로다: public(`kogl-1`)·news(`sources[]` 대조·license 금지)·open CC BY·CC0·기증. 단위 테스트 불변 검사와 P13·P14-1·P15 회귀가 모두 통과했다.
- **P19 FAIL 12**: 출력 12줄을 직접 읽었다. 전부 의도한 변경이다.
  - pd에 `pdBasis` 필수·`licenseLabel` 금지가 생겼다.
  - BY-SA·BY-ND·한국판이 이제 허용된다.
  - 버전 없음·NC 메시지 문구가 바뀌었다.

### 2-2. 상세 표시 (항목 2) — ✅
- `ccByName`: `CC BY-SA 4.0`·`CC BY-ND 3.0`·`CC BY 2.0 KR`·`CC BY-SA 2.0 KR`. BY-SA·BY-ND(한국판 BY-SA 포함)에만 ` (변경 없음·크기 조정 외)` / ` (unmodified except resizing)`가 붙는다. 정책 §4.5-11·명세 7과 글자가 같다.
- pd 4종 문구(`i18n.ts`)는 정책 PD 표 "화면 표시 문구"와 글자가 같다. us-gov는 "미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)" / "US federal government work — public domain in the United States (17 U.S.C. § 105)".
- 표시 의무: 저작자(`creditName`)·제목(`workTitle`)·원 페이지·라이선스 URI·고지(`creditNotice`)를 모두 채운다. pd는 [원 페이지] + [근거 페이지]. CC BY-SA 2.0·3.0·4.0과 ND 2.0의 표시 의무(리뷰 71·71-1 대조)를 충족한다.

### 2-3. ND 카드 `object-contain` (항목 3) — ✅
- 카드가 나오는 모든 경로를 확인했다.
  - 목록: `(ko)` 피드·`page/[page]`·`tag/[slug]`·`tag/[slug]/page/[page]`, `(en)` 피드·`page/[page]`는 모두 `toCardView` → `PostGrid` → `PostCard` → `CardMedia`를 거친다.
  - 상세: `MediaFigure` → `CardMedia variant="figure"`를 거친다.
  - 다른 렌더 경로는 없다(grep).
- `resolveCardMedia`(schema.ts:1310)가 `open` + `cc-by-nd-*`일 때만 `contain: true`를 준다. `card-media.tsx`의 local 분기(:113~116)가 이를 `object-contain`으로 그리고, 16:9 슬롯의 `bg-surface`가 남는 자리를 채운다.
- remote 분기(:130 `object-cover`)는 news 핫링크 전용이다. ND는 open(저장 파일) 전용이라 이 분기로 오지 않는다.
- 같은 local 분기가 카드(thumb)와 상세(figure)에 함께 쓰이므로 둘 다 자르지 않는다. 테스트 ⑧(ND contain · CC BY cover)도 통과했다.

### 2-4. 카드 payload `credit` 제거 (항목 4) — ✅
- `view.ts:21~30` `withoutCredit` → `toCardView`. news 포함.
- 빌드 산출물 742개 전수에서 0회를 확인했다(1절 ①). 상세는 `resolveCardMedia`를 직접 써서 크레딧을 유지한다(130개).

### 2-5. OG·JSON-LD·사이트맵·`next/image` (항목 5) — ✅
- 산출물 검사로 og/twitter:image·JSON-LD·sitemap/robots/llms.txt에 `/images/` 0을 확인했다.
- `needsUnoptimized`는 `kcc-donated`만 해당한다(:1284~1294). BY-SA·BY-ND·KR·CC0·PD는 최적화한다(명세 10).

### 2-6. validate 경고 (항목 6) — ✅, 새 경고 2건은 정탐
- public A-2 판정은 caption 접두 `자료사진:`(`isArchiveCaption`)로 한다. faceNote로 판정하지 않는다.
- 3형식 판정(`archiveCaptionForm`):
  - ko·en 모두 `prefix` + ` — {끝 문구}.` 포함 여부로 본다.
  - en ②는 `Archive photo: general view of `로 시작해야 한다.
  - ③ 장비에는 "현재 모습" 문구를 요구하지 않는다.
- 재사용·인접(`scripts/image-reuse.ts`):
  - "같은 원본" = `sourcePageUrl` 또는 저장 파일 sha256(union-find).
  - A-2가 낀 묶음은 6건, 그 밖은 3건까지다.
  - `feedOrder`는 `b.publishedAtTime - a.publishedAtTime || a.id.localeCompare(b.id)`이다. `src/lib/content/load.ts:76`과 **식이 같다**.
  - 피드 집합은 검증을 통과한 게시물 전체(`validPosts`)다.
- **새 경고 ① 정탐**:
  - `2026-08-25-nowandhere-625-constitution-question`·`2026-08-12-citynewsmeme-parksangyong-oath-refusal`은 같은 `sourcePageUrl`(같은 서울 기록사진 노드)을 쓴다.
  - 리뷰어가 같은 정렬 식으로 직접 계산하니 메인 피드 204·205번, 1칸 차이다.
- **새 경고 ② 정탐**: `posts-en/2026-10-29-khan-nk-srbm-launch-wonsan` imageCaption은 `… — not taken at the time of this event, nor the launch site. …`다.
  - 끝 문구 바로 뒤가 마침표가 아니라 쉼표라 3형식 밖이다.
  - ko는 `… 이 사건 당시 사진이 아닙니다. 발사 지점도 아닙니다. …`로 끝 문구 뒤에 문장을 따로 둬서 통과한다. 규칙대로 판정된 것이다.

### 2-7. 소개 문구 (항목 7) — ✅
- ko `about/page.tsx:97~102`·en `:56~62`가 명세 9 문안과 글자로 같다. 빌드 HTML에서도 확인했다.
- copy-exact 41/41이다. P19 원본 도구의 FAIL 2는 의도한 A-2 줄 변경이다.

### 2-8. 테스트 (항목 8) — ✅
- 514개, 양성 대조 354개 중 172 FAIL 검출(HEAD 코드).
- 경계값이 있다: 1962/1963, 한국판·국제판 교차, `igo`, `deed.ko/extra`, `www.` 호스트. 산출물 6,779 검사, 회귀 5종.
- 부족한 점은 3절 P3-1·P3-2(테스트에 없는 두 경계)뿐이다.

## 3. P 목록 (모두 P3 — 커밋 비차단)
- **P3-1** `matchesCcLicenseUrl`이 끝 `/`가 없는 주소를 거부한다
  - 예: `https://creativecommons.org/licenses/by/4.0` → false, `…/by/2.0/kr` → false(리뷰어 직접 시험).
  - 오류가 나는 쪽이라 안전하지만, 업로더가 흔히 쓰는 형태라 불필요한 빌드 오류가 날 수 있다.
  - 수정안: 경로 머리의 끝 `/`를 선택으로 비교한다(`pathname === head.slice(0, -1)` 허용). 테스트에 양성 한 줄을 더한다.
- **P3-2** 언어 접미 정규식이 `deed.igo`도 받는다(직접 시험 true)
  - 실제로 그런 CC 문서는 없어(IGO는 `/3.0/igo/` 경로) 오인 위험은 없다.
  - 원하면 언어 접미를 `[a-z]{2}(?:-[a-z0-9]{2,8})*`로 좁힌다.
- **P3-3** ko 3a(②)는 끝 문구만 보고 "일반 풍경"은 보지 않는다. en ②는 `general view of` 시작을 요구한다(트리거 남은 확인 4). 양쪽을 맞추려면 ko에 `일반 풍경(` 포함 검사를 넣는다(선택).
- **P3-4** 새 경고 2건의 콘텐츠 정리(업로더·슈퍼바이저)
  - ① 두 게시물 중 하나를 같은 연작의 다른 사진으로 바꾼다.
  - ② en을 `… — not taken at the time of this event. Not the launch site either. It may differ from how it looks today.`처럼 끝 문구 뒤에 마침표를 둔다.
- **P3-5** 트리거 "남은 확인 필요" 권고(아래 4절). 1·2를 바꾸려면 정책 §4.5-11·PD 표 문구를 기획자가 먼저 고치고, 그다음 `i18n.ts` 한 곳(`pdOpen`·`pd` 함수)만 바꾼다.
- **P3-6** 커밋할 때 주의
  - 작업 트리에 업로더·게시 담당 미커밋 변경이 섞여 있다. 아래 경로만 스테이징하고 `bash docs/tools/programmer-07/clean-clone-gate.sh --staged`로 확인한다(프로그래머 권고와 같다).
  - `history/2026-11-12.md`는 **미추적 새 파일**이다. 다른 세션 기록이 함께 들어 있을 수 있으니 슈퍼바이저가 내용을 보고 넣는다.

## 4. 트리거 "남은 확인 필요" 1~10에 대한 권고
1. **pd 괄호 앞 공백** — **슈퍼바이저 기울기에 찬성(ko만)**.
   - ko는 `사진: 예시 작가(퍼블릭 도메인 — …)`로 CC0 ko(`사진: {저작자}(CC0 …)`)와 맞춘다.
   - en은 CC0 en(`Photo: {Author} (CC0 …)`)도 공백이 있으므로 그대로 둔다. 영어 표기 관행이다.
   - 정책 §4.5-11 PD 서식 ko 줄부터 고친다.
2. **연도 표기** — **찬성**. ko `저작자 1950년 사망`·`1955년 공표`. en은 그대로(`died in 1950`). 정책 PD 표 문구를 먼저 고친다.
3. **CC BY 2.0 KR에 접미 없음** — **찬성(지금대로)**. 국제판 CC BY와 같은 취급이고, 명세 7이 접미를 BY-SA·BY-ND에만 붙이라고 정한다.
4. 영어 3a 시작 검사 — 지금대로 좋다. ko 대칭은 P3-3(선택).
5. public A-2 연도 — 지금대로 좋다. public은 `workYear`가 선택이므로 caption의 '촬영 연도 미상'으로만 보는 것이 맞다.
6. 재사용 순서 — 지금대로 좋다. 먼저 쓴 글이 자리를 갖고, 경고는 더 새 글에 실려 업로더가 새로 바꾼 쪽을 고치게 된다.
7. 기획 문안 목록 갱신 — 기획자 후속 오더로 넘긴다(`planning/v0.9-copy-and-code-list.md`·`planning/q1-redirect-q2-sns-image-plan.md` §2.2).
8. 2.0 ND — 리뷰 71-1 §3에서 legalcode §3·§4·§1 대조를 마쳤다. 값 3개를 넣은 것이 맞다.
9. us-gov 사용자 고지 — 슈퍼바이저 몫. 첫 us-gov 게시 전에 보낸다.
10. 새 경고 2건 — P3-4.

## 5. 저장소 독립·민감정보 (항목 11)
- 범위: 커밋 경로 `git diff`의 `+` 줄 + 새 파일(`scripts/image-reuse.ts`·`docs/tools/programmer-20/*`·핸드오프·트리거), 합계 2,845줄.
- pre-commit 패턴 0, 홈 디렉터리·시스템 임시 폴더 절대경로 0, 계정·메일 0, 1~3차 실명 전역 패턴 0, 옛 id 0, 사진 저작자 이름 0. 테스트 값은 가상 값이다. ✅

## 6. 최종 커밋 경로
- `src/lib/content/schema.ts`
- `src/lib/content/translation.ts`
- `src/lib/content/view.ts`
- `src/lib/i18n.ts`
- `src/components/post-detail.tsx`
- `src/components/card-media.tsx`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `scripts/validate-content.ts`
- `scripts/image-reuse.ts`(새 파일)
- `content/README.md`
- `docs/tools/programmer-20/`(전체)
- `docs/handoffs/programmer-20-image-license-expand.md`
- `docs/triggers/programmer-20-image-license-expand-COMPLETE.md`
- `instructions/programmer/processed/20-image-license-expand.md`
- `docs/triggers/reviewer-73-programmer-20-review-COMPLETE.md`
- `instructions/reviewer/processed/73-programmer-20-review.md`
- (`history/2026-11-12.md`는 P3-6에 따라 슈퍼바이저가 판단)
- **넣지 않는 것**:
  - `content/posts*`·`public/images/` 업로더 진행분과 `attendkdz`·`gotdemcatch`
  - `docs/supervisor/drafts/…`
  - 그 밖의 history 수정분과 다른 세션의 미추적 파일
