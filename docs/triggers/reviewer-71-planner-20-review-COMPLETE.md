# 리뷰어 71 — 기획 20(이미지 최대화: 라이선스·대상 범위 확대) 검토 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/reviewer/processed/71-planner-20-review.md`(이동)
- 대상:
  - 트리거 `docs/triggers/planner-20-image-max-license-scope-COMPLETE.md`
  - `git diff -- planning/`(정책 +36/−11 · 업로더 지침 +6/−5 · PRD +2/−1)
- 선행 검토: 정책 §4.5·§8·§11, 업로더 단계 2-2, 리뷰 67·69·70, `src/lib/content/schema.ts`의 `CC_LICENSE_PATH`·`matchesCcLicenseUrl`(:77~100·:710), `src/components/card-media.tsx`(:113·:130 `object-cover`)
- 파일 수정 0(이 트리거와 오더 이동만), git 쓰기 0, 빌드 0.
- 받은 법률 문서 HTML은 저장소 밖 `$TMPDIR/r71`에만 두었다.
- 기준: "법적으로 안전하고 사실을 오도하지 않는 범위 안에서 최대한 넓게". 과하게 보수적인 판단도 지적했다.

## 판정: 🟡 조건부 통과 — P0 0 · P1 1 · P2 5 · P3 6
- **커밋 가능 여부**: P1·P2를 문서에 반영한 뒤 커밋할 수 있다. 반영분은 리뷰어 짧은 재확인으로 충분하다. 지금 그대로 커밋하면 업로더 지침이 정책과 서로 어긋난다(P2-2).
- 확대 방향은 대부분 타당하다: CC BY-SA, 한국판 2.0 KR, 버전 확인 위계, 공공누리 A-2, 재사용 6건, 3a 풍경, §4.5-5 (나).
- 법적 근거를 바꿔야 할 곳은 `us-gov` 하나다.
- 과하게 보수적인 곳은 두 곳이다: PD 보호기간 계산(1955 → 실제는 1962), ND 보류.

## 1. 직접 연 근거
### 1-1. CC legalcode (curl로 받아 글자 대조)
| 문서 | 원문에서 찾은 글자 | 기획 인용 |
|---|---|---|
| BY-SA 4.0 `legalcode.en` | §2(a)(4) "simply making modifications authorized by this Section 2(a)(4) never produces Adapted Material" · §3(b) "if You Share Adapted Material You produce, the following conditions also apply" · §1(a) "Adapted Material means material … derived from or based upon the Licensed Material and in which the Licensed Material is … modified in a manner requiring permission" | ✅ |
| BY-SA 3.0 `legalcode` | §3 "the right to make such modifications as are technically necessary to exercise the rights in other media and formats" · §4(b) "You may Distribute or Publicly Perform an Adaptation only under: (i) the terms of this License; (ii) a later version …" · §4(c)(iv) "in the case of an Adaptation, a credit identifying the use of the Work in the Adaptation" | ✅ |
| BY-SA 2.0 `legalcode` | §3 같은 "technically necessary" 문장 · §4(b) "a Derivative Work only under the terms of this License, a later version of this License with the same License Elements …" | ✅ |
| BY-ND 4.0 `legalcode.en` | §2(a)(1)(B) "produce and reproduce, but not Share, Adapted Material" · §2(a)(4) 같은 문장 | ✅ |
| 한국판 BY 2.0 KR `legalcode.ko` | 제3조 "…각기 다른 매체 및 형식으로 이용하기 위하여 기술적으로 수정하는 것도 포함됩니다. **이용허락자는 본 이용허락에 따른 저작물의 이용에 대하여 저작인격권을 행사하지 않습니다.**" · 제4조 가 "본 이용허락의 조건에 따라서만 … 통일자원식별부호(URI)를 포함시켜야" · 제1조 "2차적 저작물" 정의 | ✅. 굵은 문장은 기획 인용에 없지만 유리한 근거다(P3-1) |
| 한국판 BY-SA 2.0 KR | 제3조 같은 문장(저작인격권 불행사 포함) · 제4조 "…동일한 이용허락의 요소를 포함하는 … 이용허락의 조건에 따라서만 2차적 저작물을 배포…" | ✅ |

### 1-2. 위키미디어·미국 기관 페이지 (WebFetch)
- `Template:PD-USGov`: "This work is in the public domain in the United States."
  - 범위는 "only applies to original works of the Federal Government and not to the work of any individual U.S. state, territory, …".
  - **미국 밖의 보호에 대해서는 아무 말도 하지 않는다.**
- `Template:PD-self`: "I, the copyright holder of this work, release this work into the public domain. This applies worldwide." · "In some countries this may not be legally possible; if so:" · "I grant anyone the right to use this work for any purpose, without any conditions, unless such conditions are required by law."
- 미국 국방부 영상 배포처 저작권 안내(`dvidshub.net/about/copyright`):
  - 직무로 만든 영상물이라는 서술: "works of authorship prepared by U.S. Government employees as part of their official duties"
  - 단서: "some VI … may be subject to copyright … owned by non-DoW parties, regardless of whether the VI is marked with a copyright notice"
  - 표장: "insignia, seals, symbols and similar marks may be protected"
  - 초상: "do not waive any publicity or privacy rights"
  - 보증 부인: "does not imply or constitute DoW endorsement"
  - **전 세계 이용 허락 문구는 없다.**

### 1-3. 저작권법 (korean-law로 원문 조회)
- 현행 MST 285693:
  - 제3조 ① "외국인의 저작물은 대한민국이 가입 또는 체결한 조약에 따라 보호된다." · ④ "…그 외국에서 보호기간이 만료된 경우에는 이 법에 따른 보호기간을 인정하지 아니한다."
  - 제7조(보호받지 못하는 저작물) 1~5호: 법령·고시·판결·그 편집물·시사보도. **외국 정부 저작물은 없다.**
  - 제13조 ② 5호 "그 밖에 저작물의 성질이나 그 이용의 목적 및 형태 등에 비추어 부득이하다고 인정되는 범위 안에서의 변경"
  - 제14조 ② 사망 후 저작인격권 보호
  - 제40조 무명 저작물 "공표된 때부터 70년"
  - 제44조 "…다음 해부터 기산"
- 2011.6.30 법률 제10807호(MST 114443) 부칙:
  - 제1조 "제39조부터 제42조까지의 개정규정은 「대한민국과 유럽연합 … 자유무역협정」이 발효한 후 2년이 되는 날부터 시행"(= 2013.7.1)
  - 제2조 "이 법 시행 전에 종전의 규정에 따라 저작권 … 의 전부 또는 일부가 소멸하였거나 보호를 받지 못한 저작물등에 대하여는 그 부분에 대하여 이 법을 적용하지 아니한다."
- 1986.12.31 법률 제3916호(MST 57808, 1987.7.1 시행) 부칙:
  - 제2조 ① 같은 취지
  - 제3조 "종전의 규정에 의한 보호기간이 … 짧은 때에는 이 법에 의한다"
- 1957 제정법(MST 29306):
  - 제30조 ① "저작자의 생존간 및 사후 30연간"
  - 제35조 ① "사진저작권은 10연간 존속한다."
  - 제39조(기산)는 제30~34조에만 적용되고, 제35조의 기산 시점은 명시되지 않았다.

## 2. 점검 항목별 결과
### 2-1. CC BY-SA (항목 1) — ✅ 허용 타당
- SA 의무는 개작물을 공유할 때만 생긴다(4.0 §3(b), 3.0 §4(b), 2.0 §4(b)). 크기 조정·재인코딩은 4.0에서 명시적으로 개작이 아니고, 2.0·3.0은 §3의 "technically necessary" 허락 범위다.
- 사이트에 함께 싣는 것은 2.0의 "Collective Work", 3.0의 "Collection"이라 개작이 아니다. 글·다른 사진으로 SA가 번지지 않는다는 해석이 맞다.
- 표시 의무 대조:

| 요구 | 충족 여부 |
|---|---|
| 저작자 | ✅ |
| 제목(2.0·3.0 "if supplied") | ✅ `workTitle` |
| 라이선스 URI | ✅ [라이선스] |
| 저작권·면책 고지 유지 | ✅ `creditNotice` |
| 변경 표시(4.0 §3(a)(1)(B), 개작이 아니면 불필요) | ✅ |

- 다만 "(크기 조정만)" 문구는 저장 파일이 원본과 바이트까지 같은 경우(리뷰 69 사례)에 사실과 다르다 → P3-3.

### 2-2. PD 4종 (항목 2)
- **`us-gov` — P1.**
  - 제3조 ④는 "보호기간이 만료된 경우"만 다룬다. 처음부터 보호가 없는 미국 연방정부 저작물에는 해당하지 않는다.
  - 베른협약 제5조(2)는 보호가 본국 보호와 무관하다고 정하고, 제3조 ①은 조약에 따라 보호한다고 정한다. 제7조에도 외국 정부 저작물 제외 규정이 없다.
  - 따라서 **한국에서는 보호되는 저작물로 볼 여지가 남는다**. PD-USGov 틀도 "public domain in the United States"만 말한다.
  - 실제 분쟁 위험은 낮다. 그러나 "퍼블릭 도메인"을 근거로 쓰는 것은 법적으로 성립하지 않고, 화면 문구 "퍼블릭 도메인 — …"도 한국 기준으로는 사실보다 강하다.
- **`expired-author-death`·`expired-publication` — 계산이 과하게 보수적(P2-1).**
  - 2011 개정의 70년은 2013.7.1부터 시행됐다. 그 전에 50년이 끝난 저작물, 즉 **1962년 이전 사망 저작자와 1962년 이전 공표된 업무상·무명 저작물**은 부칙 제2조로 보호가 되살아나지 않는다(50년 계산: 1962년 사망 → 1963.1.1부터 50년 → 2012.12.31 소멸).
  - 1957년법(사후 30년)도 1987년 부칙 제2조·제3조로 50년에 흡수되므로 결론은 같다.
  - 그러므로 2026년 기준값은 1955가 아니라 **1962**이고, 2034년부터는 "올해 − 71"이 더 커진다.
  - "올해 − 71" 자체는 순수 70년 계산으로는 맞다(제44조 다음 해 기산).
- **무명 모순(P2-1에 포함)**:
  - 정책 :305는 `expired-publication`에 "무명이어도 … 공표연도 명시"를 허용한다.
  - 같은 절 :308 "쓰지 않는 것"에는 "사진가 불명 '무명' 사진의 PD 주장"이 있다.
  - 제40조(무명은 공표 후 70년)가 근거이므로, 공표연도가 명시된 무명 사진은 허용하고 "공표연도 없는 무명"만 제외하도록 고친다.
- **`declared` — ✅ 허용 가능.**
  - PD-self 본문에 대체 허락("I grant anyone the right to use this work for any purpose, without any conditions")이 있다.
  - 한국법에는 저작재산권 포기를 정한 조문이 없지만, 대체 허락이 이용허락(제46조) 역할을 하므로 정책 조건("대체 허락 문구가 함께 있는 것")이면 충분하다.
  - 단 **저작인격권은 일신전속(제14조)이라 포기되지 않는다**. CC0·PD·declared 사진도 저작자 이름이 알려져 있으면 크레딧에 적는다(P3-5).
- **쓰지 않는 PD 목록**: 대체로 적절하다.
  - `PD-US-expired`·`PD-1923`·`PD-ineligible` 제외는 맞다.
  - 부족한 것: 미국 정부 사진이라도 원 페이지가 제3자 저작물(계약업체·통신사)일 수 있다는 위 안내 단서를 확인 항목에 넣어야 한다(P1 수정안에 포함).
  - 1957년법 사진 10년(제35조)에 따른 국내 옛 사진 만료는 추가 근거가 될 수 있다. 다만 기산 시점이 명시되지 않았고, 외국 사진은 1996 회복 보호와 얽혀 있으므로 지금은 추가하지 않는다(확인 필요, P3-5).

### 2-3. 공공누리 A-2 `kind: public` (항목 3) — ✅, 우선 규칙만 P3-2
- 기존 public 규칙(제1유형 마크 직접 확인, 저장, `kogl-1`, §4.3 표시)과 충돌하지 않는다. A-2 caption·faceNote 규칙을 공유하는 것도 맞다.
- "제1유형과 CC가 함께 붙으면 제1유형으로"는 법적 필요가 없다. 둘 다 유효한 병행 제공이다.
- 그리고 업로더 26·27이 같은 서울 기록사진을 `open/cc-by-4.0`으로 이미 게시했으므로, 규칙대로면 기존 게시물이 규칙 위반이 된다 → P3-2.

### 2-4. ND 보류·한국판만·NC 제외·버전 위계 (항목 4)
- **ND 보류 — 과하게 보수적(P3-1).**
  - 카드의 `object-cover`(card-media.tsx:113·:130)는 저장 파일을 바꾸지 않는 브라우저 표시 영역 조정이다. 4.0 §1(a)의 Adapted Material("modified in a manner requiring permission")로 보기 어렵다.
  - 상세 화면에서 원본 전체를 보여 주고, 한국법상 동일성유지권도 제13조 ② 5호(이용 형태상 부득이한 변경)의 범위다.
  - 그래도 의심을 없애려면 **ND 사진만 카드에서 `object-contain`(여백 채움)으로 그리게** 하면 된다. 작은 코드 변경이다. 그 조건으로 ND 4.0(그리고 3.0)을 바로 허용하자고 권한다.
- 한국판만 허용: ✅. 조문을 직접 대조한 두 값만 넣은 것은 리뷰 67 P2-5 기준과 같다.
- NC 제외: ✅. 5a·§10과 맞는다.
- 버전 위계: ✅. `rel="license"` 주소는 저작자가 다는 기계 판독용 공식 표시이므로 ②만으로 인정해도 된다. 셋이 서로 다르면 불가로 둔 것도 맞다.

### 2-5. 재사용 6건·인접 5건 (항목 5)
- 운영은 할 수 있다. 다만 기준 필드가 **`date`로 적혀 있는데 frontmatter 필드는 `publishedAt`**이다. 피드 정렬의 동점 처리(같은 날 여러 건)도 정해져 있지 않다 → P2-4.
- 검증으로 잡을 수 있는 것은 "메인 피드 순서" 하나뿐이다. 태그·검색 페이지에서 연달아 보이는 것은 잡지 못한다는 한계를 문서에 적는다.

### 2-6. 3a 같은 지역 풍경 · 3b 같은 기종 장비 (항목 6)
- 리뷰 70 P2(철원 게시물에 파주 철책 불가)와 일관된다: (다) "다른 구역을 명시한 사진은 불가". ✅
- **caption만으로 충분한가** — 상세 화면에서는 충분하다. 그러나 **피드 카드에는 caption이 없다**(카드 = 제목 + 이미지).
  - 3a 광역 풍경은 장소 일반이라 위험이 낮다.
  - 3b 장비(예: 미사일 발사 게시물에 같은 기종의 다른 발사·전시 사진)는 피드에서 "그 사건 사진"으로 읽힐 위험이 건물보다 크다 → P2-5.
- 3a caption의 형식이 완결되지 않았다. `{광역} 일반 풍경 — 이 사건 지점이 아닙니다`가 `자료사진:` 접두와 "이 사건 당시 사진이 아닙니다"를 대체하는지 덧붙는지 불명이고, en 형식도 없다. 프로그래머 명세 5는 장비 접미만 예외로 둬서, 3a caption이 오경고를 받는다 → P2-3.

### 2-7. §4.5-5 완화 (항목 7) — ✅, 예시 보강 P3-6
- (가) 비공공 조직 유지, (나) 공공기관 사실 전달형 허용은 명확하고, 리뷰 69 P3-4·70 P3-4 선례와 맞는다.
- "암시"의 경계에는 예시 1~2개를 붙이면 업로더 판단이 흔들리지 않는다(예: 「○○부, 자료 은폐」 = 단정, 「○○부 자료 비공개 논란 보도」 = 사실 전달).

### 2-8. 프로그래머 20 명세 (항목 8)
- 1~4·7·9·10은 구현할 수 있다.
- 함정·누락은 다음과 같다:
  - **`matchesCcLicenseUrl` 함정 확장(P2-4)**: 기획은 "두 글자 국가 코드 세그먼트"만 거부하자고 했다. 그러나 3.0에는 **`/licenses/by/3.0/igo/`(3글자)** 같은 포트가 있다. 버전 뒤에 오는 세그먼트는 **`deed`·`legalcode`(+ `.ko` 같은 언어 접미)만 허용하고 나머지는 모두 거부**해야 안전하다. 테스트에 `deed.ko`·`legalcode.ko`가 통과하는지, `igo/`·`us/`·`kr/`(국제판 값일 때)가 거부되는지 넣는다.
  - `pdBasisYear` 규칙: "값 ≤ 올해 − 71이 아니면 오류" → "값 ≤ max(1962, 올해 − 71)"(P2-1). `context.today` 주입이 이미 있어 테스트할 수 있다.
  - "pd에서 `licenseLabel` 오류/경고"는 하나로 정한다(권고: 오류). P3-6.
  - public A-2를 `faceNote`가 "얼굴 없음(자료사진"으로 시작하는지로 판정하는 것은 깨지기 쉽다. caption 접두 `자료사진:`/`Archive photo:`로 판정하거나 둘 다 보라고 권한다(P3-6).
  - 재사용 인접 검사의 정렬 키는 `publishedAt` + 피드와 같은 동점 규칙(P2-4).
  - 3a caption 접미("이 사건 지점이 아닙니다")를 A-2 경고의 허용 형식에 넣는다(P2-3).
  - 한·영 문구: BY-SA "(크기 조정만)" → P3-3. us-gov 문구 → P1 수정안.
  - `next/image`: BY·BY-SA·KR·CC0·PD 최적화 허용은 타당하다. ND를 허용하면 ND만 `object-contain`으로 하고, 재인코딩은 4.0 §2(a)(4) 범위라 허용한다.
  - 소개 문구: 현재 A-2 줄("공공누리·CC 라이선스·퍼블릭 도메인 등 자유 이용이 표시된 것만")은 BY-SA·KR을 덮는다. 장비 구절 추가를 권한다(아래 슈퍼바이저 확인 3).
- 리뷰 68 P3-1(카드 payload에서 `credit` 제거) 병행: 찬성한다.

### 2-9. guide 반영 8줄 (항목 9)
- 1·2·4·5·7·8줄은 정책과 글자가 맞는다.
- 3줄: PD 연도는 P2-1에 따라 함께 고친다.
- 6줄: 정책 (가)의 "종교단체"와 (나)의 "지방자치단체"가 빠졌다 → P3-4.

### 2-10. 저장소 독립·민감정보 (항목 10)
- 범위: `git diff -- planning/`의 `+` 줄과 기획 20 트리거, 합계 174줄.
- pre-commit 패턴 0, 홈·임시 절대경로 0, 계정·메일 0, 1~3차 실명 전역 패턴 0, 옛 id 0, 사진 저작자 이름 0. ✅

## 3. P 목록 (파일:줄 · 수정안)
### P1
- **P1-1 `us-gov`를 "퍼블릭 도메인"으로 쓰는 근거가 한국법에서 성립하지 않음**
  - 위치: 정책 :303 근거 칸 · 화면 문구, 트리거 항목 2·명세 7, 업로더 단계 2-2-3 ④
  - 근거: 2-2 첫 항목(제3조 ①④, 제7조, 베른 제5조(2), PD-USGov "in the United States").
  - 수정안(이미지를 최대한 쓰는 쪽):
    1. 제3조 ④를 근거로 들지 않는다. 근거는 "미국 법상 저작권 없음(17 U.S.C. §105) + 미국 정부의 공개 배포"로 적는다.
    2. 화면 문구를 ko `미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)` / en `US federal government work — public domain in the United States (17 U.S.C. § 105)`로 바꾼다.
    3. 조건을 더한다: ⓐ 원 기관 페이지(또는 그 기관의 공식 배포처)에서 직무 촬영임을 확인한다 — 위키미디어 틀만으로는 불가. ⓑ 원 페이지가 제3자 저작물(계약업체·통신사 크레딧)을 표시하면 불가. ⓒ 군 표장이 주된 피사체가 아닐 것. ⓓ 그 기관이 요구하는 보증 부인 문구가 있으면 `creditNotice`에 넣는다.
    4. 남는 위험("한국에서는 보호될 여지")을 §11-18에 적고, 슈퍼바이저가 사용자에게 한 줄로 알린 뒤 시행한다.
  - 이 조건이면 판문점 등 미군 사진 다수를 쓸 수 있다.

### P2
- **P2-1 PD 보호기간 계산이 과하게 보수적이고, 무명 사진 규칙이 서로 모순됨**
  - 위치: 정책 :304·:305·:308·§8 `pdBasisYear` 주석(:435), 업로더 2-2-3 ④, 명세 4, guide 3줄
  - 근거: 1-3(2011 부칙 제1조·제2조, 1986 부칙 제2조·제3조, 제40조·제44조).
  - 수정안:
    - "사망연도(공표연도) ≤ max(1962, 올해 − 71)"로 바꾼다. 2026년 기준 1962년 이전 사망·공표면 만료다.
    - 근거 칸에 두 부칙을 적는다.
    - "쓰지 않는 것"의 무명 항목을 "공표연도가 확인되지 않는 무명 사진"으로 좁히고, 공표연도가 있는 무명은 제40조로 `expired-publication`에 넣는다.
- **P2-2 업로더 지침이 정책 확대와 서로 어긋남(남은 옛 문구)**
  - 위치: `planning/card-image-uploader-steps.md`
    - :182 끝 "의혹·비난 대상이 그 기관·조직 자체이면 중단" → 같은 줄 ③(공공기관 사실 전달형 허용)과 충돌
    - :183 (가) "CCL(**CC BY만**, BY-SA·NC·ND 제외)"
    - :184 ⑦ "BY-SA·NC·ND·라이선스 불명확·모순 표기면 중단" → 같은 줄 ③(BY-SA 허용)과 충돌
    - :184 ② "CC 지역판(포팅 버전)은 조문 확인 전 불가라 중단" → "한국판 2.0 KR 제외"를 명시
    - :188 "`license`에 CC 지역판 값은 없다(조문 확인 전 불가)" → 한국판 두 값과 충돌
  - 수정안: 위 다섯 곳을 기획 20 표현으로 고친다(BY-SA 허용, NC·ND 중단, 지역판은 한국판 2.0 KR만, 기관 의혹은 §4.5-5 (가)(나)).
- **P2-3 3a(같은 지역 풍경) caption 형식이 완결되지 않았고 검증 명세가 없음**
  - 위치: 정책 :311 (나), 명세 5, guide 4줄
  - 수정안:
    - ko `자료사진: {광역} 일반 풍경({촬영연도 또는 '촬영 연도 미상'}) — 이 사건 지점·당시 사진이 아닙니다.`(+ 10년·연도 미상 문구)
    - en `Archive photo: general view of {area} ({year}) — not the location or time of this event.`
    - 광역 게시물((가))도 같은 형식으로 할지 정한다.
    - `validate-content`의 A-2 caption 허용 접미에 3a·3b 형식을 모두 넣는다.
- **P2-4 프로그래머 명세의 함정 2건**
  - ① `matchesCcLicenseUrl`: 3글자 포트(`/3.0/igo/`)는 기획안의 "두 글자 세그먼트 거부"를 빠져나간다. 버전 뒤에는 `deed`/`legalcode`(+언어 접미)만 허용하고 나머지는 거부한다.
  - ② 재사용 인접 검사의 키 `date` → `publishedAt` + 피드와 같은 동점 규칙. 정책 :315 ②·업로더 :186·명세 6의 "`date`"를 고친다.
  - 테스트 항목 11에 두 경우의 양성·음성을 더한다.
- **P2-5 3b 장비 사진은 피드 카드에서 "이 사건 사진"으로 읽힐 위험**(카드에는 caption이 없음)
  - 위치: 정책 :312, guide 4줄
  - 수정안(둘 중 하나, 슈퍼바이저 선택):
    - ⓐ 3b는 제목이 그 장비의 **특정 사건 장면**(발사·격추·나포 등)을 전하는 게시물에는 쓰지 않고, 기종·제도·배치를 다루는 게시물에만 쓴다.
    - ⓑ A-2 카드에 이미지 **밖**(아래·옆) "자료사진" 표지를 단다. 이미지 위 덧씌우기는 아니다. 단 카드 = 제목 + 이미지는 사용자 결정이므로 ⓑ는 사용자 확인이 필요하다.
  - 권고는 ⓐ다(코드 변경 없음).

### P3
- **P3-1 ND 보류를 조건부 허용으로**(과하게 보수적). ND 사진만 카드에서 `object-contain`으로 그리면 남은 의심도 사라진다. 근거: 4.0 §1(a)·§2(a)(4), 제13조 ② 5호, 한국판 2.0 제3조 저작인격권 불행사. 정책 :296 "보류"를 "카드 contain 표시 구현 뒤 ND 4.0·3.0 허용"으로 고치고, 명세에 한 항목을 더한다.
- **P3-2 "제1유형과 CC가 함께면 제1유형으로"(:319·§4.5-14 :320)는 법적 필요가 없다.** 업로더 26·27의 기존 `open/cc-by-4.0` 게시물과도 충돌한다. "둘 중 하나를 고르고, 기존 게시물은 그대로"로 바꾼다.
- **P3-3 BY-SA 표시 "(크기 조정만)/(resized only)"**는 원본 그대로 저장한 경우(리뷰 69 사례) 사실과 다르다. "(변경 없음·크기 조정 외)" / "(unmodified except resizing)"로 바꾼다.
- **P3-4 guide 6줄**에 정책 (가)의 "종교단체"와 (나)의 "지방자치단체"를 넣는다.
- **P3-5 PD·CC0·declared 크레딧**: 저작인격권(제12조·제14조)은 포기되지 않으므로, 저작자 이름이 알려져 있으면 항상 크레딧에 적는다고 §4.5-11에 한 줄 넣는다. 1957년법 제35조(사진 10년)에 따른 국내 옛 사진 만료는 기산 시점 확인 뒤 추가 근거 후보로 §11에 메모한다(지금은 쓰지 않는다).
- **P3-6 명세 다듬기**:
  - pd의 `licenseLabel`은 "오류"로 확정한다.
  - public A-2 판정은 caption 접두 기준(또는 faceNote와 함께)으로 한다.
  - §4.5-5 (나)에 "단정·암시" 예시 1~2개를 넣는다.
  - 재사용 인접 검사는 메인 피드만 본다는 한계를 문서에 적는다.

## 4. 슈퍼바이저 확인 필요 항목에 대한 리뷰어 권고
- **2(`us-gov`·`declared`)**:
  - `us-gov`는 P1 수정안 1~4로 바꿔 시행할 것을 권한다. "한국에서는 보호될 여지"가 남는다는 점은 사용자에게 한 줄로 알린다. 실제 위험은 낮고, 미군 판문점·DMZ 사진 공급이 크다.
  - `declared`는 PD-self의 대체 허락 문구를 리뷰어가 직접 확인했으므로 **지금 확정해도 된다**(조건: 본인 업로드 + 대체 허락 문구, 저작자 이름 크레딧).
- **3(소개 문구 장비 구절)**: 3b를 시행한다면 **넣을 것을 권한다**. 현재 문구 "해당 사건 당시 사진이 아니라고 밝힙니다"만으로는 장비 caption("이 사건의 장비가 아닙니다")과 정확히 맞지 않는다. P2-5 ⓐ를 택해도 장비 사진은 남으므로 필요하다.

## 5. 커밋 경로 (이 리뷰 산출물)
- `docs/triggers/reviewer-71-planner-20-review-COMPLETE.md`
- `instructions/reviewer/processed/71-planner-20-review.md`
- 검토 대상(`planning/card-image-policy.md`·`planning/card-image-uploader-steps.md`·`planning/prd.md`·기획 20 트리거·오더)은 P1·P2 반영과 재확인 뒤 함께 커밋한다.

## 71-1 (기획 20-1 재확인 — 모델 ID `claude-opus-5-5`, 2026-11-11)
- 대상:
  - 기획 20 트리거 "## 20-1" 절
  - `git diff -- planning/`(정책 +42/−13 · 업로더 +7/−5 · PRD +3/−1)
- 슈퍼바이저 결정 3건을 기준으로 봤다:
  - ① `us-gov`는 문구·조건을 보완해 시행하고 사용자에게 고지한다
  - ② ND는 `cc-by-nd-2.0/3.0/4.0`을 카드 `object-contain` 조건으로 허용한다
  - ③ 소개 문구에 장비 구절을 넣는다
- 파일 수정은 이 절 추가뿐이다. git 쓰기 0, 빌드 0.

### 판정: ✅ 통과 (P0 0 · P1 0 · P2 0 · P3 4, 모두 커밋을 막지 않음)
- **커밋 가능**: 정책·업로더 지침·PRD·기획 20 트리거·이 트리거.

### 1. 리뷰 71 지적 12건 반영 (정책·업로더 본문 직접 Read)
| 지적 | 확인한 위치 | 결과 |
|---|---|---|
| P1-1 us-gov | 정책 :305 표시 "미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)" / en "…public domain in the United States…" · 조건 ⓐ~ⓓ · 근거 칸의 "한국에서 보호될 여지"(제3조 ①④·제7조·베른 제5조(2)) · §11-18 ③ 사용자 고지 · 업로더 :185 ④ · 명세 4(위키미디어 호스트·`creditNotice` 공란 경고) | ✅ |
| P2-1 PD 기준·무명 | 정책 :306·:307 "≤ max(1962, 올해 − 71)" + 2011 부칙 제1·2조, 1987 부칙 제2·3조 근거 · 제40조 무명 추가 · :310 "공표연도가 확인되지 않는 무명 사진"으로 좁힘 · 업로더 :185 ④ · 명세 4·12④(1962 양성·1963 음성) · guide 3줄 | ✅ |
| P2-2 업로더 옛 문구 5곳 | :183 ③④(§4.5-5 (가)(나)·3b ⑤) · :184 (가) "CC BY·CC BY-SA·CC BY-ND만, BY-NC 제외" · :185 ②(한국판 두 값만) · ⑦("BY-NC … 중단, BY-SA·BY-ND는 허용") · :189(지역판 두 값·ND 조건) | ✅ 다섯 곳 모두 고침 |
| P2-3 3a caption | 정책 :313 (나) ko·en 형식 + "기본 형식을 대체" + (가)는 기본 형식 · 명세 5의 허용 형식 ② · guide 4줄 | ✅ |
| P2-4 명세 함정 | 정책 :317 ② · 업로더 :187 — "`publishedAt` 내림차순, 같은 날 `id` 오름차순". `src/lib/content/load.ts:76` `b.publishedAtTime - a.publishedAtTime \|\| a.id.localeCompare(b.id)`와 같은 규칙인지 직접 확인했다. 명세 2: 버전 뒤에는 `deed`·`legalcode`(+언어 접미)만 허용, `kr/`·`igo/`·`us/` 거부 · 명세 12② | ✅ |
| P2-5 3b 특정 사건 | 정책 :314 ⑤ · 업로더 :183 ④ · guide 4줄 | ✅ |
| P3-1 ND | 정책 :293 ND 행(조건 object-contain·상세 원본 전체·표시 문구) · :298 제외 줄 · §8 :436 · 명세 1·8·12⑧ · 업로더 :184·:185·:189 | ✅ (2.0 대조는 아래 3절에서 마침) |
| P3-2 이중 표시 | 정책 :321·:379 "어느 쪽으로 써도 된다, 기존 게시물 그대로" · 업로더 :189 · guide 7줄 | ✅ |
| P3-3 표시 문구 | 정책 :292·:325 "(변경 없음·크기 조정 외)"/"(unmodified except resizing)". "크기 조정만"·"resized only"는 정책·업로더 본문에 0회(역사 기록인 기획 트리거 20 절만 남음) | ✅ |
| P3-4 guide 6줄 | 20-1 §3-6에 "종교단체"·"지방자치단체" | ✅ |
| P3-5 크레딧 | 정책 §4.5-11 CC0·PD 줄 · 업로더 :185 ⑦ 뒤 · 명세 7 · §11-20(1957년법 메모) | ✅ |
| P3-6 명세 다듬기 | 정책 :316 예시 5개 · :322 caption 접두 판정 · pd `licenseLabel` 오류 · 인접 한계 명시 | ✅ |

### 2. 프로그래머 20 명세 12항 ↔ 정책
- 1(값 14개), 2(경로·함정), 3(거부 메시지), 4(`pdBasis`·`pdBasisYear`·us-gov 경고), 5(A-2 caption 3형식 ko·en, ③에서 '현재 모습' 제외), 6(정렬 키·한계), 7(표시 문구 — us-gov "미국에서", BY-SA·ND "(변경 없음·크기 조정 외)", 저작자 이름 크레딧, open caption 표시), 8(ND contain), 9(소개 문구), 10(`next/image`), 11(리뷰 68 병행), 12(테스트 11개).
- 정책 :292·:293·:305~:310·:313·:314·:317·:322·:325·§8 :436과 값·조건·문구가 모두 일치한다.
- 소개 문구 9: 현재 `src/app/(ko)/about/page.tsx:99`의 A-2 줄을 바꾸는 것이다. ko·en 문안은 정확하다(장비 구절이 3b caption과 맞음). `copy-exact` 갱신도 함께 적혀 있다. ✅

### 3. CC BY-ND 2.0 legalcode 직접 대조 (curl, 200)
- §3: "The above rights include the right to make such modifications as are technically necessary to exercise the rights in other media and formats, **but otherwise you have no rights to make Derivative Works.**"
- §4(a): "…only under the terms of this License, and You must include a copy of, or the Uniform Resource Identifier for, this License…" · "You must keep intact all notices that refer to this License and to the disclaimer of warranties."
- §4(b): "the name (or pseudonym if applicable) of the Original Author if supplied; the title of the Work if supplied; … the Uniform Resource Identifier …"
- §1 "Collective Work"는 "the Work **in its entirety in unmodified form**"이다. 카드에서 자르지 않는 `object-contain` 조건이 2.0에서 특히 필요하다는 근거가 되고, 정책 조건과 맞는다.
- → **2.0 ND도 3.0·4.0과 같은 조건으로 허용할 수 있다**. 정책 :293의 "2.0 ND는 첫 사용 전 대조(확인 필요)"는 이 대조로 해소된다(P3-c).

### 4. guide 반영 문장 9줄 ↔ 정책
- 1줄(허용·제외·버전 위계·ND 조건), 2줄(BY-SA·ND 표시), 3줄(PD 4종 조건·1962·무명·크레딧), 4줄(3a·3b caption과 3b ⑤), 5줄(6건·정렬·한계), 6줄(예시), 7줄, 8줄(값·pd 규칙), 9줄(연도 미상·장비 제외).
- 정책 해당 줄과 값·문구가 일치한다. 4줄 caption의 "(연도)"는 정책 "({촬영연도 또는 '촬영 연도 미상'})"을 줄여 쓴 것으로, 기존 3b 표기와 같은 방식이다. ✅

### 5. 새 모순·남은 지적 (P3, 커밋 비차단)
- **P3-a** 허용 라이선스를 나열하는 두 곳에서 BY-ND가 빠졌다(정책 :321은 한국판도 빠짐). 값 목록과 다른 줄에는 들어 있으므로 표현만 맞춘다.
  - 정책 :321 "`kind: open`: CC BY·BY-SA·CC0·PD·기증"
  - 업로더 :189 "그 밖의 허용 라이선스(CC BY·BY-SA·한국판 2.0 KR·CC0·PD·기증)"
- **P3-b** 업로더 :189 영어본 caption 예시가 기본 형식 하나뿐이다. 3a(`Archive photo: general view of … — not the location or time of this event.`)·3b(`… — not the equipment involved in this event.`) 형식도 적거나 "정책 §4.5-3·4 형식"이라고 참조한다.
- **P3-c** 정책 :293·업로더 :185의 "2.0은 첫 사용 전 §3·§4 대조(확인 필요)"를 위 3절 대조 결과("리뷰 71-1 직접 열람")로 바꾼다.
- **P3-d** (운영) `us-gov` 시행 전 사용자 고지 한 줄(기획 20-1 §4)은 슈퍼바이저가 보낸다. 문서에는 이미 적혀 있다.

### 6. 저장소 독립·민감정보 (+ 줄 기준)
- 범위: `git diff -- planning/`의 `+` 줄과 "## 20-1" 절, 합계 113줄.
- pre-commit 패턴 0, 홈·임시 절대경로 0, 계정·메일 0, 1~3차 실명 전역 패턴 0, 옛 id 0, 사진 저작자 이름 0. ✅

### 커밋 경로(71-1)
- `docs/triggers/reviewer-71-planner-20-review-COMPLETE.md`(이 절 추가)
- 게이트 통과 대상:
  - `planning/card-image-policy.md`
  - `planning/card-image-uploader-steps.md`
  - `planning/prd.md`
  - `docs/triggers/planner-20-image-max-license-scope-COMPLETE.md`
  - `instructions/planner/processed/20-image-max-license-scope.md`
  - `instructions/reviewer/processed/71-planner-20-review.md`
