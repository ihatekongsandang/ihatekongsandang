# 프로그래머 20 — 대표 이미지 라이선스 확대(CC BY-SA·BY-ND·한국판 2.0 KR·PD 근거) + 검증·표시·소개 문구 — 완료 트리거

**작성일**: 2026-11-12 07:30 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)
**오더**: `instructions/programmer/processed/20-image-license-expand.md` · **핸드오프**: `docs/handoffs/programmer-20-image-license-expand.md` · **도구**: `docs/tools/programmer-20/`(README에 전체 표)

> git 쓰기 0(add·commit·push 없음). `content/posts*`·`public/images/` 변경 0, 임시 테스트 게시물 0(검증은 단위 테스트의 메모리 안 객체와 저장소 밖 HEAD 사본으로만 했고, 사본은 지웠다).
> 다른 세션의 미커밋 변경(게시물 1쌍 수정·미추적 1쌍, docs·history 등)은 손대지 않았다. 빌드는 이 창에서만 직렬로 했다.
> 저장소 독립: 바꾼·새 파일의 `+` 줄 1,887줄에 pre-commit 패턴 0건, 도구 출력에 홈·임시 절대경로 0건(`$HOME`·`<tmp>`). 사진 저작자·비공인 실명·옛 id 0(테스트 값은 "예시 작가" 등 가상 값).

## 선행 문서 검토
정책 `planning/card-image-policy.md` §4.5(-2 표·버전 위계·PD 근거 표, -3a·3b, -4, -5, -6, -10, -11, -14)·§8, 기획 20 트리거 "## 20-1" §1·§2(명세 최종본 12항)·§3·§4, 리뷰 71·71-1(함정: CC URL 버전 뒤 deed·legalcode만, 인접은 `publishedAt` 기준 — `load.ts:76` 정렬과 같게 구현), 프로그래머 19 트리거·19-1 전부 읽었다. 앞쪽 항목 9(옛 판)는 따르지 않았다.

## 명세 1~12 구현 위치 (줄 번호는 변경 후 기준)
| # | 명세 | 파일:줄 |
|---|---|---|
| 1 | license 값 8개 추가(`OPEN_LICENSES` 14개 → `IMAGE_LICENSES` 15개). 한국판 ND·그 밖 포팅 버전 값 없음 | `src/lib/content/schema.ts:61~84` |
| 2 | `CC_LICENSE_PATH`(BY-SA·BY-ND·한국판 `/kr/`까지) · **함정 수정** `CC_LICENSE_TAIL`(머리 뒤는 비어 있음·`deed`·`legalcode`+언어 접미·끝 `/`만 — `.txt` 같은 형식 접미도 거부) · `matchesCcLicenseUrl` · 오류 문구 | `schema.ts:108~126` · `:143~160` · `:899~914` |
| 3 | `openLicenseRejectReason`: BY-NC "허용 라이선스가 아닙니다(상업 이용 금지)" · 지역판 "CC 지역판은 한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용합니다(그 밖은 조문 확인 전)" · 버전 없는 cc-by/-sa/-nd "버전을 적으세요" | `schema.ts:597~614` |
| 4 | `PD_BASES`·`pdExpiredMaxYear`(max(1962, 올해 − 71), `options.today` 주입) · `pdBasis` 필수·값 검사 · `pdBasisYear` `expired-*` 필수·4자리·기준 초과 오류 · 다른 license에서 알림 · **pd `licenseLabel` 오류** · `us-gov` 위키미디어 호스트 경고·`creditNotice` 공란 경고 · 타입 필드 | `schema.ts:89~107` · `:162~171`(호스트) · `:850~896`(licenseLabel 오류 → pdBasis·pdBasisYear) · `:920~927` · `:266~273`·`:306~313` |
| 5 | A-2 caption 3형식(`ARCHIVE_CAPTION`·`archiveCaptionForm`) · public A-2 판정 caption 접두(`isArchiveCaption`) · `archiveCaptionNotices`(연도 미상·10년 → ①②만 "현재 모습", ③ 제외) · public·open 공통 적용(faceNote 경고 포함) · 영어본 | `schema.ts:485~565` · `:930~942` · `src/lib/content/translation.ts:148~163` |
| 6 | 재사용: 같은 원본 = `sourcePageUrl` 또는 **저장 파일 sha256**(union-find) · A-2 묶음 6건 초과 경고(그 밖 public 3건 유지) · `feedOrder`(`publishedAtTime` 내림차순 → `id` 오름차순) 인덱스 차이 5 미만 경고 · 한계 문구 | `scripts/image-reuse.ts`(새 파일) · `scripts/validate-content.ts:33~42`·`:108~121`·`:139~148` |
| 7 | 상세 표시: `ccByName`(BY-SA·BY-ND·KR 라벨, BY-SA·ND에 `(변경 없음·크기 조정 외)`/`(unmodified except resizing)`) · `pdBasisText`(근거별 고정 문구, us-gov "미국에서") · `creditNotice` 줄(기존) · open caption 표시(19에서 이미 구현 — 테스트로 재확인) | `src/components/post-detail.tsx:24~51` · `:96~111` · `src/lib/i18n.ts:99~110`·`:210~218`·`:313~321` |
| 8 | ND 카드·상세 `object-contain`: `CardMedia.contain` 플래그 · `resolveCardMedia` · `card-media.tsx` 클래스(슬롯 `bg-surface`가 남는 자리 채움, 같은 16:9 슬롯이라 레이아웃 이동 0) | `schema.ts:1253~1262`·`:1310` · `src/components/card-media.tsx:50~51`·`:113~116` |
| 9 | 소개 페이지 A-2 줄 ko·en 명세 문안 글자 그대로 · `content/README.md` §3.6(license 값 표·`licenseUrl` 규칙·pd 표·`licenseLabel` 금지·한국판 `/kr/`·ND 조건·public A-2 예시·저작자 이름 크레딧·재사용 규칙)·§8 표 | `src/app/(ko)/about/page.tsx:97~102` · `src/app/(en)/en/about/page.tsx:56~62` · `content/README.md:211~277`·`:486~487` |
| 10 | `next/image`: 기증만 제외(변경 없음, 주석 갱신) — BY-SA·BY-ND·KR·CC0·PD는 최적화 | `schema.ts:1284~1294` |
| 11 | 리뷰 68 P3-1 카드 payload `credit` 제거(`toCardView` → `withoutCredit`, news 포함) · P3-2(`images.localPatterns`)는 제외 | `src/lib/content/view.ts:21~30`·`:50` |
| 12 | 테스트 ①~⑪ | `docs/tools/programmer-20/unit-checks.tsx`(①~⑩) · `build-artifact-check.mjs`(⑨·⑩ 실제 빌드) · `copy-exact-about.py`(⑪) |

### 상세 표시 — 실제 렌더(단위 테스트에서 글자 그대로 확인)
| 라이선스 | ko | en |
|---|---|---|
| CC BY-SA 4.0 | `사진: 예시 작가, 「예시 청사 전경」(2019) · 공유마당 / CC BY-SA 4.0 (변경 없음·크기 조정 외) · 원 페이지 · 라이선스` | `Photo: Example Author, "예시 청사 전경" (2019) · 공유마당 / CC BY-SA 4.0 (unmodified except resizing) · Original · License` |
| CC BY-ND 2.0/3.0/4.0 | 같은 서식, `CC BY-ND {버전} (변경 없음·크기 조정 외)` | `CC BY-ND {version} (unmodified except resizing)` |
| CC BY 2.0 KR | `… / CC BY 2.0 KR · 원 페이지 · 라이선스` (접미 없음) | `… / CC BY 2.0 KR · Original · License` |
| CC BY-SA 2.0 KR | `… / CC BY-SA 2.0 KR (변경 없음·크기 조정 외) · …` | `… / CC BY-SA 2.0 KR (unmodified except resizing) · …` |
| pd us-gov | `사진: 예시 기관 (미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)) · 원 페이지 · 근거 페이지` + 셋째 줄 `creditNotice` | `Photo: Example Agency (US federal government work — public domain in the United States (17 U.S.C. § 105)) · Original · Basis page` |
| pd expired-author-death | `사진: 예시 작가 (퍼블릭 도메인 — 저작자 1950 사망, 보호기간 만료) · …` | `Photo: Example Author (Public domain — author died in 1950; the copyright term has expired) · …` |
| pd expired-publication | `사진: 예시 작가 (퍼블릭 도메인 — 1955 공표, 보호기간 만료) · …` | `Photo: Example Author (Public domain — published in 1955; the copyright term has expired) · …` |
| pd declared | `사진: 예시 작가 (저작자가 퍼블릭 도메인으로 공개함) · …` | `Photo: Example Author (Dedicated to the public domain by the author) · …` |
- CC BY·CC0·기증 표시는 그대로(테스트로 불변 고정). 모든 open은 figcaption 첫 줄이 caption(영어 `imageCaption`).

## 검증 명령과 결과
| 명령 | 결과 |
|---|---|
| `npm run validate:content` | exit 0 · **420/420 · R(실패) 0** · `self 0 · public 0 · open 32 · news 33` (작업 트리 — 업로더 진행분 미추적 1쌍·수정 1쌍 포함) |
| 새 경고(같은 콘텐츠를 HEAD 코드로 검증한 결과와 차이, `validate-new-warnings.diff`) | **2건**, 둘 다 커밋된 게시물(업로더 진행분에서 새 경고 0): ① `2026-08-25-nowandhere-625-constitution-question` — 같은 원본(`sourcePageUrl` 같음)을 쓴 `2026-08-12-citynewsmeme-parksangyong-oath-refusal`와 메인 피드 1칸(인접 경고) ② `posts-en/2026-10-29-khan-nk-srbm-launch-wonsan` imageCaption이 `… — not taken at the time of this event, nor the launch site. …`라 3형식 밖(끝 문구 뒤에 마침표가 아닌 덧말) |
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 · 0 errors · 경고 21(전부 기존 `docs/tools/*`, 19와 같은 수) |
| 단위 테스트 `programmer-20/unit-checks.tsx` | **514/514** · 양성 대조(HEAD 코드 사본) 354개 중 **172 FAIL** 검출 |
| `npm run build` | exit 0 · 정적 **799/799** |
| 빌드 산출물 `build-artifact-check.mjs` | **6,779/6,779** — 파일 2,444개, og/twitter:image 7,900개·JSON-LD 2,317개·sitemap/robots/llms.txt에 `/images/` 0, 상세 밖 카드 페이지 742개에 크레딧 필드 0, 상세 420개 중 크레딧 figcaption 130개(= 대표 이미지 65 × ko·en) |
| 소개 문구 `programmer-20/copy-exact-about.py` | **41/41** · P19 원본 도구는 FAIL 2(의도한 A-2 줄 변경) |
| 회귀 | P12 copy-exact 38/38 · P13 unit 104/104 · P14-1 unit 64/64 · P15 unit 117/117 · P13 hotlink 10/10 · P19 unit 232/244(FAIL 12 전부 의도한 변경 — README 표) |
| 🔴 `bash docs/tools/programmer-07/clean-clone-gate.sh --worktree` | **exit 0** · "✅ 깨끗한 복제본 게이트 통과 (--worktree)" (`gate-worktree.log`, 임시 경로 `<tmp>`) |

⚠️ 게이트·빌드는 작업 트리 기준이라 업로더의 미커밋 게시물이 함께 들어간 상태로 통과했다. 커밋 때는 아래 경로만 스테이징하고 `--staged` 게이트를 권한다.

## 남은 확인 필요 (슈퍼바이저·기획자 판단)
1. **pd 표시의 괄호 앞 공백**: 정책 §4.5-11 PD 서식이 ko `사진: {저작자 또는 기관} ({pdBasis 문구})`(공백 있음)라 글자 그대로 따랐다. CC0 ko는 `사진: {저작자}(CC0 …)`(공백 없음)라 두 줄의 모양이 다르다. 맞출지 기획자 확정 필요(`i18n.ts` `pdOpen` 한 곳).
2. **`expired-*` 연도 표기**: 정책·명세 문구 `저작자 {연도} 사망`·`{연도} 공표` 그대로라 "저작자 1950 사망"으로 나온다("1950년"이 아님). 바꾸려면 정책 문구부터.
3. **한국판 CC BY 2.0 KR에는 "(변경 없음·크기 조정 외)"를 붙이지 않았다** — 명세 7은 BY-SA·BY-ND에만 "항상" 붙인다고 하고, 국제판 CC BY에도 붙이지 않으므로 같게 했다. BY-SA 2.0 KR에는 붙는다.
4. **영어 3a 형식은 `Archive photo: general view of`로 시작해야 통과**(명세 5 en ② 글자 그대로). ko ②는 명세대로 끝 문구(`이 사건 지점·당시 사진이 아닙니다.`)만 본다 — "일반 풍경" 글자는 검사하지 않는다.
5. **public A-2의 연도 검사**: public은 `workYear`가 선택이라 `workYear` 없음 = 연도 미상으로 보지 않는다. caption에 '촬영 연도 미상'이 있을 때만 "현재 모습" 문구를 요구한다(open은 기존대로 workYear 없음 = 미상). faceNote "얼굴 없음" 경고는 public A-2에도 적용했다(정책 §4.5-14 "open과 같은 규칙").
6. **재사용 한도의 순서**: 7번째 판정은 게시일 오래된 순(같은 날 `id` 순)이다. 인접 경고는 피드 위쪽(더 새 글)에 싣는다. 재사용 묶음의 A-2 여부는 묶음에 A-2가 하나라도 있으면 6건(그 밖 public 3건)으로 했다.
7. **기획 문안 목록 동반 갱신**: 명세 9의 "기획 문안 목록 동반 갱신"(`planning/v0.9-copy-and-code-list.md`·`planning/q1-redirect-q2-sns-image-plan.md` §2.2)은 기획자 영역이라 고치지 않았다(19-1과 같은 처리). 코드 주석은 "기획자 20-1 §2 명세 9"를 기준으로 적었다.
8. **2.0 ND**: 리뷰 71-1 §3에서 legalcode 대조를 마쳤다고 하므로 값 3개를 모두 넣었다(정책 :293 "확인 필요" 문구 정리는 기획자 P3-c).
9. `us-gov` 시행 전 사용자 고지 한 줄은 슈퍼바이저 몫(기획 20-1 §4) — 코드는 준비됐다.
10. 새 경고 2건(위 표)의 게시물 정리는 업로더·슈퍼바이저 판단(경고만, 빌드 진행).

## 커밋할 경로 (이 오더 것만)
- `src/lib/content/schema.ts`, `src/lib/content/translation.ts`, `src/lib/content/view.ts`, `src/lib/i18n.ts`
- `src/components/post-detail.tsx`, `src/components/card-media.tsx`
- `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`
- `scripts/validate-content.ts`, `scripts/image-reuse.ts`(새 파일)
- `content/README.md`
- `docs/tools/programmer-20/`(전체)
- `docs/handoffs/programmer-20-image-license-expand.md`, 이 트리거, `instructions/programmer/processed/20-image-license-expand.md`(이동)
- `history/2026-11-12.md`(이 세션 append 1건)
