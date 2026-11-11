# 프로그래머 19 — 대표 이미지 `kind: open`(A-2 인물 없는 자료사진) 구현 · 상세 출처 표시 · 소개 문구 — 완료 트리거

**작성일**: 2026-11-11 19:20 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)
**오더**: `instructions/programmer/processed/19-image-kind-open-a2.md` · **핸드오프**: `docs/handoffs/programmer-19-image-kind-open-a2.md` · **도구**: `docs/tools/programmer-19/`(README에 전체 표)

> git 쓰기 0(add·commit·push 없음). 실제 게시물(`content/posts*`)·이미지(`public/images/`) 변경 0 — 임시 open 게시물·이미지는 **저장소 밖 사본**에만 만들고 지웠다(저장소에 `p19-fx` 0건 확인).
> 빌드는 이 창에서만 직렬로 했다. 다른 세션의 미커밋 변경(게시물 2쌍 수정·미추적 1쌍, docs·history 등)은 손대지 않았다.
> 저장소 독립: 바꾼·새 파일의 `+` 줄에 pre-commit 패턴 0건, 홈·임시 경로 0건(출력은 `$HOME`·`<tmp>`). 사진 저작자·비공인 실명·옛 id 0(테스트 값은 "예시 작가" 등 가상 값).

## 선행 문서 검토
정책 `planning/card-image-policy.md` §4.3·§4.5(1~13)·§8 · 기획자 19 트리거 19-2 §2·§3·19-3 · 리뷰 67 / 67-1 / 67-2(P3-3) 전부 읽고 그대로 구현했다.

## 바꾼 파일:줄 (줄 번호는 변경 후 기준)
| 파일 | 위치 | 내용 |
|---|---|---|
| `src/lib/content/schema.ts` | :53 | `IMAGE_KINDS`에 `open` |
| | :60·:67·:68 | `PUBLIC_LICENSES = ['kogl-1']`, `OPEN_LICENSES` 6개(`cc-by-2.0`·`cc-by-3.0`·`cc-by-4.0`·`cc0-1.0`·`pd`·`kcc-donated`) → `IMAGE_LICENSES` 7개. 지역판 값 없음 |
| | :77~:101 | `CC_LICENSE_PATH`(라이선스 → creativecommons.org 경로 머리), `isCcBy40Label`, `matchesCcLicenseUrl` |
| | :187~:200 · :212~:239 | `ImageCredit`·`PostImage`에 `licenseUrl`·`workTitle`·`workYear`·`sourceSiteName`·`creditNotice`·`donorName`·`licenseLabel` |
| | :390~:463 | `OPEN_ONLY_FIELDS`·`WORK_FIELDS`, `CREDIT_FIELDS`(self 무시 경고 대상 확장), `ARCHIVE_CAPTION` 고정 문구, `ARCHIVE_OLD_YEARS = 10`, `readOptionalText`, `readWorkYear`(4자리·미래 불가), `openLicenseRejectReason` |
| | :613~:641 | license 검증: public ↔ `kogl-1`(open 값이면 "kind open으로"), open ↔ `OPEN_LICENSES`(버전 없는 cc-by·kogl·BY-SA/NC/ND·지역판 사유별 오류), news에 license 금지 유지 |
| | :643~:752 | `workTitle`·`workYear`(public·open), open 필수(`workTitle`·`sourceSiteName`·`licenseUrl`, kcc-donated `licenseLabel`), `licenseUrl` 버전 대조(cc·cc0·기증 CC BY 4.0), 무시 필드 경고, 권장 경고(:720~) |
| | :1051~:1103 | `CardMedia.local.unoptimized`, `imageCredit`이 open 필드 전달, `needsUnoptimized`(kcc-donated 전부), `resolveCardMedia` |
| | (기존 유지) | open도 kind≠self 공통 제한으로 `image`만·`sourceType: url`만(:494~:504 기존 분기), `sources[]` 대조는 news만, caption·faceNote 등 공통 필수 |
| `src/components/post-detail.tsx` | :1 | `import type { ReactNode }` |
| | :25~:133 | `ccByVersion`, `Value`(en에서 한글이면 `lang="ko"`), `OpenCreditLine` — 정책 §4.5-11 서식 |
| | :135~:176 | `ImageCreditCaption`: open이면 caption → `OpenCreditLine` → `creditNotice` 줄. public·news 분기는 글자 그대로. 주석의 옛 "206건"을 현재 사실(self 대표 이미지 0건)로 |
| `src/lib/i18n.ts` | :83~:105 · :193~:204 · :288~:299 | `openCredit` 낱말(ko·en) |
| `src/components/card-media.tsx` | :29 | 옛 주석 "그 이미지 파일 207건은 … 그대로 보인다" → "모두 정리돼 지금 `public/images/`에는 `.gitkeep`만 있다" |
| | :50~:52 · :112 | 저장소 이미지에 open 추가, `unoptimized={media.unoptimized}` |
| `src/lib/content/translation.ts` | :13 · :148~:161 | open 영어 `imageCaption` 권장 경고(`Archive photo:`·"not taken at the time of this event"·연도 미상·10년) |
| `scripts/validate-content.ts` | :15~:17 · :29~:33 · :52~:56 · :101~:113 · :123~:133 · :206 | 저장 파일 짧은 변 400px 미만 경고(public·open), 같은 원본(`sourcePageUrl`) 3건 초과 경고(4번째부터), 종류 집계를 `IMAGE_KINDS`로(open 포함) |
| `scripts/image-size.ts` | 새 파일 | JPEG(SOF)·PNG(IHDR)·WebP(VP8/VP8L/VP8X) 머리만 읽는 크기 함수(의존성 추가 0) |
| `src/app/(ko)/about/page.tsx` | :97~:101 | A-2 줄 ko — 19-2 §3 문안 글자 그대로, 공공누리 줄 다음 |
| `src/app/(en)/en/about/page.tsx` | :56~:62 | A-2 줄 en — 글자 그대로 |
| `content/README.md` | :192~:193 · :197~:243 · :245 · :247~:248 · :457~:458 · :501 | public `workTitle`·`workYear`, open 예시·license 값 표·필수 필드 표·`sourceType: url` 한정·권장 경고, §8 검증 표, §9 영어본 |
| `docs/tools/programmer-13/unit-checks.tsx` | :135 · :165 | 오류 문구가 바뀐 2건의 기대 정규식만(거부는 그대로, "프로그래머 19 갱신" 주석) |

### 상세 출처 표시 — 실제 렌더(테스트·fixture 빌드에서 글자 그대로 확인)
| 라이선스 | ko | en |
|---|---|---|
| CC BY 4.0 | `사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스` | `Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY 4.0 · Original · License` |
| CC BY, workYear 없음 | `사진: 예시 작가, 「예시 청사 전경」 · 공유마당 / CC BY 2.0 · …` | `Photo: Example Author, "예시 청사 전경" · 공유마당 / CC BY 2.0 · …`(67-2 P3-3 — en도 괄호 생략) |
| CC0 | `사진: 예시 작가(CC0 1.0 — 저작권 포기) · 원 페이지 · 라이선스` | `Photo: Example Author (CC0 1.0 — public domain dedication) · Original · License` |
| PD | `사진: 예시 작가(퍼블릭 도메인 — 근거: {licenseLabel}) · 원 페이지 · 근거 페이지` | `Photo: Example Author (Public domain — basis: …) · Original · Basis page` |
| 기증 | `사진: 예시 작가, 「예시 청사 전경」, 기증 예시 기증자, 공유마당 / CC BY 4.0 · 원 페이지 · 라이선스` | `Photo: Example Author, "예시 청사 전경", donated by 예시 기증자, Gongu Madang / CC BY 4.0 · Original · License` |
- 사진 설명(`caption`/영어 `imageCaption`)이 figcaption 첫 줄, 크레딧이 둘째 줄, `creditNotice`가 있으면 셋째 줄. 링크는 모두 `ExternalLink`(public·news와 같은 `rel="noopener"`·`target="_blank"`·새 창 sr-only 안내).
- 기증 `licenseLabel`이 CC BY 4.0이 아니면 [라이선스] 링크 없음. 기증자는 `donorName`, 없으면 저작자.

## next/image 선택과 근거
**보수안 — `kcc-donated`는 이용조건 표시와 상관없이 전부 최적화 제외**(`unoptimized`, `schema.ts` `needsUnoptimized`). 그 밖(kogl-1·CC BY·CC0·PD)은 리사이즈·재인코딩 허용.
- `licenseLabel`은 페이지 글자를 그대로 옮긴 자유 문구다. 글자 판정이 틀리면 무변형이어야 할 사진을 재인코딩하게 되어 라이선스 위반이 된다. 반대로 보수안의 손해는 기증 사진이 원본 파일 크기로 나가는 것뿐이다(지금 0건).
- 상세 [라이선스] 링크와 `licenseUrl` 검사는 같은 판정(`isCcBy40Label`, 공백·대소문자만 무시)을 쓴다 — 여기서 틀리면 링크 하나가 빠지거나 오류가 나는 정도라 위험이 작다.
- 실측: fixture 서버에서 기증 사진 응답이 저장 파일과 **바이트 단위로 같고**(8,593B), 상세·카드 `<img>`가 `/images/…` 직접·`srcset` 없음. CC BY 사진은 `/_next/image` 200 `image/webp`.

## 카드·OG·JSON-LD·사이트맵
open도 public과 같다: 카드에는 이미지만, OG(og:image·twitter:image)는 사이트 자체 이미지, JSON-LD·sitemap·robots·llms.txt에 사진 경로·설명·저작자 0. 단위 테스트 E절 + fixture 빌드 산출물 1,604개 전수로 고정했다.

## 검증 명령과 결과
| 명령 | 결과 |
|---|---|
| `npm run validate:content` | exit 0 · **420/420**(작업 트리 — 다른 세션의 미추적 게시물 1쌍 포함) · `self 0 · public 0 · open 0 · news 33` · R(실패) 0 |
| 추적 파일만(HEAD content + 작업 트리 src·scripts, 저장소 밖 사본) | **418/418** · open 0 (`validate-tracked-only-output.txt`) |
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 · 0 errors · 경고 21(전부 기존 `docs/tools/*`, 프로그래머 18과 같은 수) |
| `npm run build` | exit 0 · 정적 **799/799** |
| 단위 테스트 `docs/tools/programmer-19/unit-checks.tsx` | **289/289** · 양성 대조(HEAD 코드 사본) 84 FAIL 검출 |
| fixture 빌드(저장소 밖, open 5·영어본 2) | 검증 427/427 + 경고 2(640×360 · 같은 원본 4건째), 정적 807/807, `fixture-build-check.mjs` **104/104**, 서버 응답 확인 |
| 소개 문구 `programmer-19/copy-exact-about.py` | **33/33**(하위 목록 4개, A-2 줄 글자 그대로) · P18 원본 도구 27/31(FAIL 4 = 의도한 하위 4개) |
| 회귀 | P12 copy-exact 38/38 · P13 unit 104/104 · P14-1 unit 64/64 · P15 unit 117/117 · P13 hotlink 10/10 |
| 🔴 `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree` | **exit 0** · "✅ 깨끗한 복제본 게이트 통과 (--worktree)" (`gate-worktree.log`, 임시 경로 `<tmp>`) |

⚠️ 게이트·빌드는 작업 트리 기준이라 다른 세션의 미커밋 게시물 변경이 함께 들어간 상태로 통과했다. 커밋 때는 이 오더 경로만 스테이징하고 `--staged` 게이트를 권한다.

## 남은 확인 필요 (슈퍼바이저·기획자 판단)
1. **PD 근거 문구 필드**: 정책 §4.5-11 PD 서식의 `{만료 연도·선언·법령}`에 쓸 필드가 정책에 없다. `licenseLabel`(pd 선택)을 근거 문구로 쓰게 했고, 없으면 `(퍼블릭 도메인)` + 근거 페이지 링크만 나오며 경고를 낸다. 기획자 확정 필요.
2. **PD 링크**: 서식은 [근거 페이지]뿐이지만 소개 페이지 A-2 줄("원문 링크를 적고")과 맞추려고 [원 페이지]도 함께 건다.
3. **기증 서식에 창작년도 없음**: 공유마당 공식 예시("저작물, 기증 저작자, 공유마당, 이용조건") 그대로라 `workYear`가 있어도 기증 크레딧 줄에는 나오지 않는다(caption에는 나온다).
4. **기증 출처 사이트명**: ko·en 모두 서식대로 고정값 "공유마당"/"Gongu Madang"을 쓴다. `sourceSiteName`이 다른 값이면 경고만 낸다.
5. **영어 상세의 저작물명·사이트명**: 영어 필드가 없어 원문(한글이면 `lang="ko"`)으로 나온다. en 링크 문구는 `Original`·`License`·`Basis page`로 정했다(정책 `[original]`·`[license]`).
6. **public의 `workTitle`·`workYear` 표시**: 스키마는 받지만 공공누리 공식 문구에 넣는 문안이 정해지지 않아 public 상세 표시는 바꾸지 않았다(테스트로 불변 고정). A 첫 게시 전 문안 확정 필요(정책 §4.3).
7. **(19-1에서 해소)** **소개 페이지 다음 줄과의 관계**: 같은 절의 기존 줄 "사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며"(ko)·"We use only photos taken at the event the post covers"(en)는 A-2 예외와 글자상 어긋난다. 오더 범위(A-2 줄만 추가) 밖이라 그대로 뒀다.
8. **카드 RSC 페이로드의 `credit` 객체**: 화면에는 안 나오지만 홈·목록 카드 데이터에 `media.credit`이 실린다. 프로그래머 13부터 news도 같은 기존 동작(실제 빌드 `index.html`에 news credit 1건)이라 바꾸지 않았다. open은 필드가 더 많다(`creditNotice` 등). 원하면 `toCardView`에서 credit을 빼는 별도 오더.
9. **`/_next/image` 직접 요청**: 사이트는 기증 사진을 최적화 주소로 만들지 않지만, 누가 `/_next/image?url=/images/…`를 직접 부르면 Next가 재인코딩해 준다(기존 public 이미지 전체와 같은 구조). 막으려면 `images.localPatterns` 설정 오더가 필요하다.
10. `workYear` 조건부 필수는 코드가 상세 페이지를 볼 수 없어 **생략을 막지 못한다** — 생략 시 caption 문구 경고만 낸다(README에 명시).
11. 검증 숫자 "418/418"은 추적 파일 기준이다. 작업 트리에는 다른 세션의 미추적 게시물 1쌍이 있어 420/420.

## 커밋할 경로 (이 오더 것만)
- `src/lib/content/schema.ts`, `src/lib/content/translation.ts`, `src/lib/i18n.ts`
- `src/components/post-detail.tsx`, `src/components/card-media.tsx`
- `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`
- `scripts/validate-content.ts`, `scripts/image-size.ts`(새 파일)
- `content/README.md`
- `docs/tools/programmer-13/unit-checks.tsx`(기대 정규식 2줄)
- `docs/tools/programmer-19/`(전체)
- `docs/handoffs/programmer-19-image-kind-open-a2.md`, 이 트리거, `instructions/programmer/processed/19-image-kind-open-a2.md`(이동)
- `history/2026-11-11.md`(이 세션 append 1건 — 파일에 다른 세션 기록도 섞여 있음)

## 19-1 (확인 필요 7 보정 — 슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경 · 모델 ID `claude-opus-5-5`)
- 지시: A-2 사진에는 사람이 나오지 않으므로, 소개 페이지의 "같은 사건 당시" 규칙을 **사람이 나오는 사진**에 한정한다. 확인 필요 1~6·8~10은 바꾸지 않았다(첫 해당 사진 게시 전 별도 처리).
- git 쓰기 0. planning 문서(q1 §2.2·v0.9 목록)는 고치지 않았다.

### 전 → 후
| 파일:줄 | 전 | 후 |
|---|---|---|
| `src/app/(ko)/about/page.tsx:110` | "…쓰지 않습니다. 사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며, 사진은 게시물 내용의 근거가 아닙니다." | "…쓰지 않습니다. **사람이 나오는 사진은** 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며, 사진은 게시물 내용의 근거가 아닙니다." |
| `src/app/(en)/en/about/page.tsx:71` | "…can be recognized. We use only photos taken at the event the post covers, and a photo is not evidence for what the post says." | "…can be recognized. **Photos showing people are used only if taken at the event the post covers**, and a photo is not evidence for what the post says." |
| `docs/tools/programmer-19/copy-exact-about.py` | 바깥 3번 줄 검사 없음 | 바깥 3번 줄(인물 기준) ko·en **전문 글자 그대로** + 옛 문장 ko "쓰지 않습니다. 사진은 게시물이 다루는 사건과"·en "We use only photos taken at the event" 페이지 전체 0회 (검사 33 → 37) |
- 그 밖 글자 변화 0(두 파일 diff는 19의 A-2 줄 + 위 1줄씩뿐).

### 검증 (19-1 출력은 `docs/tools/programmer-19/19-1-*`)
| 명령 | 결과 |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 · 0 errors · 경고 21(전부 기존 `docs/tools/*`, 19와 같음) |
| 단위 테스트 `unit-checks.tsx` | **289/289** |
| `npm run build` | exit 0 · 검증 420/420(작업 트리) · 정적 **799/799** |
| 소개 문구 `copy-exact-about.py` | **37/37** |
| 양성 대조 — 빌드 사본 about.html·en/about.html에 옛 문장을 되돌려 넣음 | **33/37, FAIL 4** 검출(ko·en 3번 줄 글자, 옛 문장 1회씩) — `19-1-copy-exact-about-positive-control.txt` |
| `programmer-12/copy-exact-check.py` | 38/38 (이 줄은 검사 대상 아님) |
| 🔴 `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree` | **exit 0** · "✅ 깨끗한 복제본 게이트 통과 (--worktree)" (`19-1-gate-worktree.log`, 임시 경로 `<tmp>`) |

### 확인 필요 (19-1 추가)
- 7번 → **해소**(위 보정). 
- 🆕 **기획자 반영 대상**: `planning/q1-redirect-q2-sns-image-plan.md` §2.2와 `planning/v0.9-copy-and-code-list.md`의 소개 문안 목록에는 옛 문장("사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며" / "We use only photos taken at the event the post covers")이 그대로 있다. 코드 주석(ko :84·en :37 "§2.2와 글자 같게")과 함께 기획자가 19-1 문안으로 맞춰야 한다. 이번에는 지시대로 고치지 않았다.

### 커밋 경로 변경
- 19 목록 그대로. 추가 변경 파일: `src/app/(ko)/about/page.tsx`·`src/app/(en)/en/about/page.tsx`(이미 목록에 있음), `docs/tools/programmer-19/copy-exact-about.py`(이미 폴더 포함), 새 출력 `docs/tools/programmer-19/19-1-*`(폴더 포함). 새 경로는 없다.
