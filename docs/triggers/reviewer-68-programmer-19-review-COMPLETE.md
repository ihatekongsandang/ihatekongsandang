# reviewer-68 — 프로그래머 19·19-1 검토 (kind: open · 상세 출처 표시 · 소개 문구) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 하위 에이전트
- 오더: `instructions/reviewer/processed/68-programmer-19-review.md`(이동)
- 기준: 정책 `planning/card-image-policy.md` §4.5(1~13)·§8, 기획자 19 트리거 "## 19-2" §2·§3·"## 19-3", 리뷰 67-2 P3-3, 프로그래머 19 오더와 19-1 지시
- 수정한 파일: 이 트리거뿐. git 쓰기 0. 빌드는 1회만 했다(시작 전 `next build/start/dev`·`next-server` 프로세스 0 확인). 다른 세션의 미추적 게시물 1쌍(`2026-11-10-attendkdz-…`)과 게시물 수정 1쌍은 판정 대상이 아니다.

## 판정: **통과** — P1 0 · P2 0 · P3 4 (커밋 게이트 통과)
P3는 모두 첫 open 사진을 게시하기 전에 정하면 되는 후속이다. 단 아래 "업로더 26 착수 전 조건"은 슈퍼바이저가 시범 범위를 정할 때 봐야 한다.

## 검토 항목별 결과
| # | 항목 | 결과 |
|---|---|---|
| 1 | 스키마 | ✅ `IMAGE_KINDS`에 open을 추가했고, `PUBLIC_LICENSES = ['kogl-1']`과 `OPEN_LICENSES` 6개로 나눴다(`schema.ts:53~70`). 거부 확인: public↔open 라이선스 교차 오류(`:613~641`), 버전 없는 cc-by·BY-SA/NC/ND·지역판(`cc-by-2.0-kr`)은 사유별 오류(`openLicenseRejectReason`). open 필수 필드(`workTitle`·`sourceSiteName`·`licenseUrl`, kcc-donated는 `licenseLabel`)가 빠지면 오류다. `licenseUrl` 호스트·경로 버전 대조(`matchesCcLicenseUrl`, kcc-donated는 CC BY 4.0 표시일 때). `sourceType: url` 한정과 `images[]` 금지는 기존 `kind !== 'self'` 분기(`:494~504`)가 open에도 그대로 걸린다. news의 `sources[]` 일치 검사는 news에만(`:600~611`) 남아 있다. src는 `/images/` 저장소 경로만이고 https 핫링크는 거부한다. 기존 public·news 회귀는 P13 104/104 · P14-1 64/64 · P15 117/117로 불변 |
| 2 | 상세 출처 표시 | ✅ `post-detail.tsx` `OpenCreditLine`을 정책 §4.5-11 서식과 글자 단위로 대조했다. CC BY ko·en(창작년도 없으면 괄호 생략 — 67-2 P3-3), CC0, PD, 기증(ko "기증 {기증자}, 공유마당 / {이용조건}", en "donated by …, Gongu Madang / …") 모두 같다. caption이 크레딧 줄 위(19-3), `creditNotice`는 그 아래다. 링크는 기존 `ExternalLink`(같은 `rel`·새 창 안내·44px)다. 라이선스 요구 충족: CC BY 4.0 §3(a)(1) 저작자(`creditName`)·고지(`creditNotice`)·라이선스 링크·원 자료 URI(`sourcePageUrl`), 2.0·3.0 §4(b) 제목(`workTitle` 필수)·URI·§4(a) 라이선스 URI. PD에 [원 페이지]를 더한 것은 정책 서식보다 한 줄 많지만 소개 문구("원문 링크를 적고")와 맞추려는 것이고 라이선스상 해가 없다 → 기획 확정만 필요(P3-3) |
| 3 | next/image | ✅ kcc-donated는 이용조건과 상관없이 전부 `unoptimized`(`needsUnoptimized`). 정책(19-2 §2-3)이 명시적으로 허용한 보수안이고 근거가 트리거에 있다. 실측(fixture 서버 출력): 기증 사진 응답 = 저장 파일 바이트 동일(8,593B), CC BY는 `/_next/image` 200 webp. 그 밖 라이선스(kogl-1·CC BY·CC0·PD)는 리사이즈·재인코딩 허용(정책 §4.5-11 변경 표시 — 기술적 수정은 Adapted Material 아님)이다 |
| 4 | OG·JSON-LD·사이트맵·카드 | ✅ `src/lib/seo.ts`·sitemap·llms.txt에는 이미지 참조가 없다(grep). OG는 사이트 자체 이미지다. fixture 산출물 1,604개 전수 검사(104/104 — "og:image 저장 사진 아님"·"JSON-LD에 사진 경로·설명·저작자 0", 사진 설명·크레딧 글자는 그 상세 .html·.rsc에만)를 출력으로 확인했다. 확인 필요 8·9 위험도는 아래 P3-1·P3-2 |
| 5 | 소개 페이지 | ✅ A-2 줄 ko·en이 19-2 §3 문안과 글자 그대로다. 19-1 보정 ko "사람이 나오는 사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며,"·en "Photos showing people are used only if taken at the event the post covers, and"는 지시와 글자 그대로다. 하위 목록 4개(언론·공공누리·A-2·대체). `programmer-19/copy-exact-about.py` **37/37**(직접 빌드 뒤). 양성 대조를 직접 했다: ko A-2 줄 한 글자("표시된→표기된")와 en 한 낱말을 바꾼 사본 → **35/37**(해당 2건 FAIL) |
| 6 | validate 경고·`image-size.ts` | ✅ 경고만이고 빌드를 막지 않는다: A-2 caption 고정 문구, 연도 미상, 10년, 같은 원본 4번째부터, 400px 미만, faceNote "얼굴 없음", 기증 사이트명, PD 근거. `image-size.ts`는 의존성 0이고 저장소 안 파일만 읽는다. JPEG 루프는 길이 0이어도 앞으로 나가 무한 루프가 없다. 모든 읽기 앞에 버퍼 길이를 검사하고 전체를 try/catch로 감싸 실패하면 undefined → "크기를 읽지 못했습니다" 경고. SOF 판정(C4·C8·CC 제외)과 PNG IHDR, WebP VP8·VP8L·VP8X 오프셋이 규격과 맞다 |
| 7 | 테스트 충분성 | ✅ 단위 289개(A 정상·B 거부·C 경고·D 표시 7조합×2·E 카드/JSON-LD/next/image·F 크기). 날짜는 `TODAY` 고정이라 해가 바뀌어도 깨지지 않는다. HEAD 사본 양성 대조에서 84 FAIL을 검출했다. 대문자·공백 라이선스, 다른 호스트·다른 버전 licenseUrl, https src, 포털 sourcePageUrl까지 들어 있다 |
| 9 | 저장소 독립 등 | ✅ 커밋 경로 수정 파일의 `+` 줄과 새 파일(`scripts/image-size.ts`·`docs/tools/programmer-19/` 전체·핸드오프·트리거·오더): 다른 서비스명·계정·홈 경로·이메일·시스템 임시 절대경로(오더 9번 패턴 3종) **0**, 옛 id(`moved-ids.txt` 9개) **0**. 테스트의 저작자·저작물명은 가상 값("예시 작가" 등), 주소는 example 도메인과 creativecommons.org뿐 — 사진 저작자·비공인 실명 0 |

## 직접 실행한 명령과 결과
| 명령 | 결과 |
|---|---|
| `npm run validate:content` | exit 0 · "✅ 검증 통과" · `self 0 · public 0 · open 0 · news 33` · 영어본 210/210(작업 트리 — 미추적 게시물 1쌍 포함) |
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 · 0 errors · 경고 21(기존 `docs/tools/*`) |
| `npx tsx --tsconfig docs/tools/programmer-19/tsconfig.json docs/tools/programmer-19/unit-checks.tsx` | **289/289** |
| 회귀 P13 `unit-checks.tsx` · P14-1 `unit-checks.ts` · P15 `unit-checks.tsx` | 104/104 · 64/64 · 117/117 |
| `npm run build` (1회) | exit 0 · 정적 799/799 |
| `python3 docs/tools/programmer-19/copy-exact-about.py` | 37/37 (내 양성 대조 35/37) |
| `python3 docs/tools/programmer-12/copy-exact-check.py` | 38/38 |

## 결함 (P3만)
- **P3-1 카드 데이터에 open 크레딧 전체가 실림**(확인 필요 8) — `src/lib/content/view.ts:39`의 `toCardView` → `resolveCardMedia`가 `credit`(저작자·저작물명·`creditNotice`·`donorName` 등)을 카드 RSC 데이터에 그대로 싣는다.
  - 위험도 **낮음**. 화면에는 나오지 않고, 같은 값은 상세에서 라이선스상 공개해야 하는 정보다. news도 프로그래머 13부터 같은 동작이다.
  - 다만 `PostCardView` 주석의 "카드 데이터 최소화" 원칙과 어긋나고, 피드 페이지마다 사진 저작자 이름이 반복해 실린다.
  - 수정안(별도 코드 오더, 첫 open 게시 전후 어느 쪽이든): `toCardView`에서 `media.credit`을 빼고, `unoptimized`는 남긴다.
- **P3-2 `/_next/image` 직접 요청으로 기증 사진 재인코딩 가능**(확인 필요 9) — 사이트는 기증 사진을 최적화 주소로 만들지 않는다. 그러나 제3자가 `/_next/image?url=/images/…`를 부르면 서버가 재인코딩본을 만들어 준다.
  - 위험도 **낮음~중간**. 무변형 의무가 있는 것은 이용조건이 CC BY 4.0이 아닌 기증 사진뿐이고, 지금은 0건이다.
  - 수정안: 그런 기증 사진을 처음 게시하기 **전에** `next.config.ts` `images.localPatterns`로 최적화 대상 경로를 좁히는 코드 오더를 낸다(예: 기증 사진은 `/images/donated/…` 같은 하위 경로에 저장하고 패턴에서 뺀다). 아니면 시범을 그런 기증 사진 없이 시작한다.
- **P3-3 PD 표시 근거 필드·링크 미확정**(확인 필요 1·2) — `licenseLabel`을 PD 근거 문구로 쓰고 [원 페이지]를 더한 구현은 합리적이다. 그러나 정책 §4.5-11·§8에 없는 해석이다.
  - 수정안: 기획자가 정책 §8에 "`pd`: `licenseLabel` = 근거 문구(만료 연도·선언·법령), 상세에 [원 페이지]·[근거 페이지] 둘 다"를 적는다. **첫 PD 게시 전에** 해야 한다.
- **P3-4 기획 문안·코드 주석이 화면과 어긋남**(19-1 확인 필요) — `planning/q1-redirect-q2-sns-image-plan.md` §2.2와 `planning/v0.9-copy-and-code-list.md` 목록에는 A-2 줄이 없고 옛 문장("사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며" / "We use only photos taken at the event the post covers")이 남아 있다. 소개 ko 84행·en 37행 주석("§2.2와 글자 같게")도 그래서 지금은 사실이 아니다.
  - 수정안: 기획자 후속 오더로 §2.2 ko·en과 v0.9 목록을 화면에 맞춘다(하위 4개, 3번 줄 보정, ※ 문단 앞뒤 빈 줄). 회귀 기준은 이제 `programmer-19/copy-exact-about.py`다. 커밋 차단 아님.

## 남은 확인 필요 1~6·10 처리 방향 (첫 게시 전 필요 여부)
| # | 내용 | 제안 | 첫 게시 전 필요 |
|---|---|---|---|
| 1·2 | PD 근거 필드·[원 페이지] 링크 | 위 P3-3대로 기획 확정 | **PD 첫 게시 전 필요** |
| 3 | 기증 서식에 창작년도 없음 | 공유마당 공식 예시 그대로가 맞다(연도는 caption에 나온다). 유지 | 불요 |
| 4 | 기증 출처 사이트명 고정값 | 유지(공식 예시). 경고로 충분 | 불요 |
| 5 | 영어 상세의 저작물명·사이트명 원문 표기 | 라이선스상 원 제목을 그대로 쓰는 편이 정확하다. 유지. 필요해지면 `workTitleEn` 선택 필드를 후속으로 | 불요 |
| 6 | public `workTitle`·`workYear` 표시 문안 | 공공누리 공식 출처표시에 저작물명·작성연도가 들어가므로 문안이 필요하다 | **A(public) 첫 게시 전 필요** — 업로더 26 시범이 공공누리 제1유형 사진을 쓰면 그 전에 |
| 10 | `workYear` 생략을 막지 못함 | 코드로는 불가하다. 업로더 단계(상세 페이지 창작년도 확인 기록)와 리뷰어 게이트로 본다. 유지 | 불요(절차로 보완) |

**업로더 26 착수 전 조건(슈퍼바이저 판단용)**: `instructions/uploader/26-a2-archive-photo-pilot.md`는 출처로 공공누리 제1유형·PD·기증 자유이용을 모두 연다. 지금 코드 그대로 바로 쓸 수 있는 것은 **CC BY(버전 명시)·CC0·이용조건 CC BY 4.0인 기증**이다. 공공누리 제1유형은 위 6번, PD는 1·2번, 이용조건이 CC BY 4.0이 아닌 기증은 P3-2를 먼저 정리하거나, 시범 범위에서 빼기를 권한다.

## 최종 커밋 경로 (이 오더 대상만 — 다른 세션의 `content/posts*` 수정·미추적 게시물, `docs/supervisor/drafts/…`, 다른 트리거 제외)
- `src/lib/content/schema.ts`
- `src/lib/content/translation.ts`
- `src/lib/i18n.ts`
- `src/components/post-detail.tsx`
- `src/components/card-media.tsx`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `scripts/validate-content.ts`
- `scripts/image-size.ts`(새 파일)
- `content/README.md`
- `docs/tools/programmer-13/unit-checks.tsx`
- `docs/tools/programmer-19/`(폴더 전체)
- `docs/handoffs/programmer-19-image-kind-open-a2.md`
- `docs/triggers/programmer-19-image-kind-open-a2-COMPLETE.md`
- `instructions/programmer/processed/19-image-kind-open-a2.md`
- `docs/triggers/reviewer-68-programmer-19-review-COMPLETE.md`
- `instructions/reviewer/processed/68-programmer-19-review.md`

(`history/2026-11-11.md`는 여러 세션 기록이 섞인 슈퍼바이저 파일이라 따로 처리한다. 스테이징한 뒤 `clean-clone-gate.sh --staged`를 권한다.)
