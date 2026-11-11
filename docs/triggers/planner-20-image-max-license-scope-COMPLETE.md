# planner-20 — 이미지 최대화: 라이선스·대상 범위 확대 정책 — COMPLETE

- 실제 모델 ID: `claude-sonnet-5-5` (기획자, Sonnet 5.5) · 2026-11-11 · 사용자 지시 "최대한 이미지 많이 사용할 수 있는 방법으로 ㄱㄱ"
- 오더: `instructions/planner/processed/20-image-max-license-scope.md`(이동). 수정: `planning/card-image-policy.md`·`planning/card-image-uploader-steps.md`·`planning/prd.md`와 이 트리거. `src/`·`scripts/`·`content/`·`docs/poster/guide.md`·git·빌드 0. 사진 저작자 이름·비공개 실명·옛 id·계정·홈 경로 0.
- 선행으로 읽은 것: 정책 §4.5·§8·§11, 업로더 단계 2-2, 리뷰 67·68·69·70, 업로더 26·27 트리거, `schema.ts`의 `OPEN_LICENSES`·`openLicenseRejectReason`·`matchesCcLicenseUrl`(읽기만).
- **표기 규칙**: 이 트리거의 모든 확대는 "**기획 권장안**(사용자 지시의 범위 안 — 슈퍼바이저 확인 후 확정, 사용자 이의 시 변경)"이다. 법률 문서·법령 인용은 이번에 직접 열어 확인한 것만 "직접 열람"으로 적었고, 열지 못한 것은 "확인 필요"로 남겼다(문구는 요약 모델 경유 인용).

## 직접 연 근거 (이번 조사)
| 대상 | 확인한 것 |
|---|---|
| CC BY-SA 4.0 legalcode | §2(a)(4) "simply making modifications authorized by this Section 2(a)(4) never produces Adapted Material" · §3(b) "if You Share Adapted Material You produce, the following conditions also apply" · §1 "Adapted Material" 정의 "derived from or based upon the Licensed Material" · §3(a)(1)(B) "indicate if You modified…" |
| CC BY-SA 3.0 legalcode | §3 "the right to make such modifications as are technically necessary to exercise the rights in other media and formats" · §4(b) "You may Distribute or Publicly Perform an Adaptation only under" · §4(c) 저작자·제목·URI·"a credit identifying the use of the Work in the Adaptation" · §1(b) "A work that constitutes a Collection will not be considered an Adaptation" |
| CC BY-SA 2.0 legalcode | §3 같은 "technically necessary" 문장 · §4(b) "a Derivative Work only under the terms of this License"(후속 버전 허용) · §1 "Derivative Work" 정의 "a work based upon the Work…" |
| CC BY-ND 4.0 | §2(a)(1) "reproduce and Share the Licensed Material, in whole or in part"·"produce and reproduce, but not Share, Adapted Material" · §2(a)(4) 같은 "never produces Adapted Material" · §3(a)(1)(B) |
| CC BY-ND 3.0 | §3 "technically necessary" 수정 포함, "but not Adaptations" 문구 없음·명시 허락 없는 권리는 유보 · §4(a)·(b) |
| 한국판 CC BY 2.0 KR (legalcode.ko) | 제3조 "…저작물을 각기 다른 매체 및 형식으로 이용하기 위하여 기술적으로 수정하는 것도 포함됩니다" · 제4조 가항 "본 이용허락의 조건에 따라서만 저작물을 배포…" · 나항 저작자 성명·제호·URI · 제1조 "2차적 저작물" 정의 "번역·편곡·변형·각색·영상제작 그 밖의 방법으로 작성한 창작물" |
| 한국판 CC BY-SA 2.0 KR | 제3조 같은 기술적 수정 문장 · 제4조 2항 "…동일한 이용허락의 요소를 포함하는 … 이용허락의 조건에 따라서만 2차적 저작물을 배포…" |
| 저작권법(현행, MST 285693) | 제39조 1항 "저작자가 생존하는 동안과 사망한 후 70년간 존속한다" · 제41조 "업무상저작물의 저작재산권은 공표한 때부터 70년간 존속한다. 다만, 창작한 때부터 50년 이내에 공표되지 아니한 경우에는 창작한 때부터 70년간" · 제3조 4항 "…그 외국에서 보호기간이 만료된 경우에는 이 법에 따른 보호기간을 인정하지 아니한다" |
| 위키미디어 PD-USGov 틀 | "work prepared by an officer or employee of the United States Federal Government as part of that person's official duties"(미국 연방법 제17편 제105조), 주·지방정부 저작물에는 적용되지 않음 |
| 열지 못한 것 | 위키미디어 PD-self·PD-old 틀과 한국 관련 라이선스 안내 페이지(404), CC BY-ND 2.0, 그 밖 국가 포팅 버전 — **확인 필요** |

## 항목 1~7: 결정·권장안·근거

### 1. CC BY-SA 2.0/3.0/4.0 — **허용(권장)**
- 조건: 버전 명시, **크기 조정·형식 변환만**(자르기·색 보정·합성·글자 삽입 금지 — 정책 §5.1), 저작자 표기·라이선스 링크 표시, **SA 라이선스 이름과 "크기 조정만(resized only)"을 항상 표시**.
- 근거: SA 의무는 개작물을 만들어 공유할 때만 걸린다(4.0 §3(b), 3.0 §4(b), 2.0 §4(b)). 크기 조정·재인코딩은 4.0에서 명시적으로 개작이 아니고(§2(a)(4)), 2.0·3.0은 "기술적으로 필요한 수정"을 라이선스가 허락한다(§3). 2.0·3.0은 "never produces" 같은 명시 문장이 4.0보다 약하므로, 표시에 SA 라이선스 이름·링크를 항상 적어 **사진 파일이 그 라이선스로 제공됨을 알리는 완충**을 둔다 — 개작으로 보더라도 SA 의무가 충족된다(기획자 해석). 사이트의 글·다른 사진에는 SA가 번지지 않는다(사진 옆에 글을 두는 것은 사진의 개작이 아님, 기획자 해석).
- 표시(ko/en): `사진: {저작자}, 「{저작물명}」({창작년도}) · {출처 사이트명} / CC BY-SA {버전} (크기 조정만)` + [원 페이지] + [라이선스] / `Photo: {Author}, "{Title}" ({year}) · {Source site} / CC BY-SA {version} (resized only)` + [original] + [license].
- 반영: 정책 §4.5-2 표·§4.5-11.

### 2. 퍼블릭 도메인 근거 필드 — **`pdBasis` 4종(권장)**
| `pdBasis` | 쓸 수 있는 근거 | 표시(ko / en) |
|---|---|---|
| `us-gov` | 미국 연방정부 직원이 직무로 만든 저작물(위키미디어 {{PD-USGov}}류 + 기관·직무 촬영을 파일 정보가 밝힘). 주·지방정부·계약업체 제외 | `퍼블릭 도메인 — 미국 연방정부 직원이 직무로 만든 저작물(미국 저작권법 제105조)` / `Public domain — a work of a US federal government employee taken in the course of official duties (17 U.S.C. § 105)` |
| `expired-author-death` | 저작자 명시 + 사망연도 ≤ (올해 − 71)(2026년이면 1955 이전 — 저작권법 제39조 1항) | `퍼블릭 도메인 — 저작자 {연도} 사망, 보호기간 만료` / `Public domain — author died in {year}; the copyright term has expired` |
| `expired-publication` | 기관·법인(업무상저작물) 또는 무명, 공표연도 명시 + 공표연도 ≤ (올해 − 71) + 창작 후 50년 안 공표(제41조) | `퍼블릭 도메인 — {연도} 공표, 업무상저작물 보호기간 만료` / `Public domain — published in {year}; the term for works made for hire has expired` |
| `declared` | 저작자 본인이 올린 파일에 PD 공개 선언(PD-self류)과 대체 허락이 있음 | `저작자가 퍼블릭 도메인으로 공개함` / `Dedicated to the public domain by the author` |
- **쓰지 않는 것**: {{PD-old-assumed}}, 미국 기준 만료만 말하는 {{PD-US-expired}}·{{PD-1923}}·{{PD-US-1978-89}}(한국에서 보호될 수 있음), {{PD-ineligible}}, {{PD-textlogo}}, 다른 나라 기준 만료, 자유 서술 {{PD-because}}류, 한국 정부 저작물 PD 주장(제24조의2는 이용 허락 규정), 미국 주·지방정부, 외국 정부 저작물, "Public Domain Mark"만 있는 것, 무명 사진의 PD 주장. 틀 이름은 단서일 뿐 **근거를 직접 확인한 것만** 쓴다.
- 필드: `pdBasis`(pd 필수), `pdBasisYear`(expired-* 필수), `licenseUrl`=근거 페이지(필수), pd에서 `licenseLabel`은 쓰지 않는다.
- **확인 필요**(정책 §11-18): `us-gov`가 한국에서 "애초에 보호되지 않는 외국 저작물"까지 포섭하는지(제3조 4항은 "보호기간이 만료된 경우"를 말함) · `declared`의 위키미디어 PD-self 본문. 이 둘은 첫 게시 전에 슈퍼바이저가 확인한다.
- 반영: 정책 §4.5-2(표·쓰지 않는 목록)·§4.5-11·§8.

### 3. 공공누리 제1유형 자료사진 — **`kind: public`을 A-2에도 쓴다(권장)**
- A-2 public은 **open과 같은 규칙**: 사람 0(점 크기 1% 미만만), 같은 대상, 단정 위험, caption `자료사진: …` 접두, `faceNote: 얼굴 없음(자료사진·건물)`, 재사용 6건, 400px. 표시는 기존 공공누리 서식(§4.3). 같은 사진에 제1유형과 CC가 함께 있으면 **제1유형으로 쓴다**(`kind: public`, 리뷰 69 P3-1 해소).
- 스키마 변경 없음. `validate-content`의 A-2 경고 대상을 public·open 모두로 넓힌다(프로그래머 20).
- 반영: 정책 §4.5-14(신설)·§4.5-10·§8.

### 4. ND·지역판·버전·NC
| 항목 | 판단 | 근거 |
|---|---|---|
| **CC BY-ND** | **보류(이번 제외, 재검토 조건 명시)** | 법률 문서상 크기 조정은 허용된다(4.0 §2(a)(1)·(4), 3.0 §3 — 직접 열람). 그러나 **카드 썸네일이 CSS로 사진을 잘라 보여 주는 문제(정책 §11-1)** 가 무변형 의무와 부딪친다. 카드에서 전체를 자르지 않고 보여 주는 표시가 구현되면 ND 4.0부터 재검토 |
| **지역판** | **한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용**(`cc-by-2.0-kr`·`cc-by-sa-2.0-kr`), 그 밖 포팅 버전은 불가 | 한국판 legalcode를 직접 열어 제3조(기술적 수정)·제4조(표시·SA 조건)가 국제판 2.0과 같은 구조임을 확인. 표시는 국제판과 같고 라이선스 이름만 "CC BY 2.0 KR"·"CC BY-SA 2.0 KR", 링크는 `/kr/` 문서. 다른 나라 포팅은 조문 확인 뒤 값 추가(절차: 리뷰어가 legalcode §3·§4 대조) |
| **버전이 배지에만 있는 경우** | **버전 확인 위계**: ① 본문 문구 ② `rel="license"` 링크 주소(`creativecommons.org/licenses/by/4.0/` 형태) ③ 공식 안내문 글자 순으로 인정. **배지 이미지 파일명·모양만으로는 불가** | 리뷰 69가 인정한 근거가 ②③이다. 배지 대체 텍스트가 "CC BY"뿐이어도 ②·③이 버전을 글자로 밝히면 인정 |
| **CC BY-NC** | **계속 제외** | 수익화 5a는 계획 없음이지만 광고·후원·유료 도입 시 위반 위험이 있고 정책 §10 재검토 트리거와 충돌하며 "비상업" 해석이 모호하다. 사용자가 NC를 허용하겠다고 하면 §10을 먼저 고친다 |
- 반영: 정책 §4.5-2 표·제외 줄·"버전 확인 위계".

### 5. 같은 원본 재사용 상한 — **3건 → 6건 + 보완 3조건(권장)**
- 현재 3건에서 DMZ 풍경 추가분이 "쓸 수 있는 사진이 E 1장뿐이라 3건 한도에서 멈춤"(업로더 27)이었다. 6건으로 올리고 보완: ① 4~6번째 사용은 같은 대상의 다른 허용 사진을 찾아 봤으나 없을 때만(시도 후보를 트리거에 기록) ② **같은 원본이 쓰인 두 게시물은 `date` 정렬에서 5건 이상 떨어져 있을 것**(인접하면 다른 사진·대체 카드, validate 경고) ③ 대상마다 서로 다른 사진 3장 이상 확보 권장(국회의사당 11건이 한 연작에 몰린 리뷰 70 P3-2). 현재 한 원본 최대 사용은 3건이므로 기존 게시물은 영향이 없다. B·인물 사진의 3건 규칙은 유지.
- 반영: 정책 §4.5-6, 업로더 단계 2-2-5.

### 6. "같은 장소·기관" 범위 확대 — **둘 다 허용(권장)**
- **6a 같은 지역 일반 풍경**: 게시물이 지목한 범위를 **광역(DMZ·휴전선 일반) / 구역(철원 GOP 구간·파주 임진각 일대) / 지점(특정 초소·사고 지점)** 으로 나눈다. 사진은 게시물 범위와 **같거나 넓은(광역)** 것만 — (가) 광역 게시물에는 광역 풍경, (나) 구역·지점 게시물에는 **사진 설명이 구역을 특정하지 않는 광역 풍경**만 쓰고 caption에 `{광역} 일반 풍경 — 이 사건 지점이 아닙니다`, (다) **사진 설명이 다른 구역을 명시한 사진은 불가**(리뷰 70 P2의 "철원 게시물에 파주 철책" 판정 유지 — 구역이 명시돼 다른 곳임이 드러남), (라) 군 초소·GP·감시장비·군인 복장 표지가 읽히면 군의 작전·판단을 다루는 게시물에는 불가. 철책 종류(경계 철책 ↔ 민통선 철책)가 다르면 사진 설명이 종류를 밝혀 일치할 때만. 구분 기준 = "사진이 **다른 곳임을 스스로 드러내는가**".
- **6b 같은 기종·종류 장비(사람 없음)**: 게시물이 기종·종류를 이름으로 지목할 때만. 조건: 사진 설명이 기종 명시, **개체 식별 표지(기체번호·함번호·부대 마크·일련번호)가 읽히면 불가**, 교전·피해·시위 장면 불가, 허용 라이선스만(북한 매체 보도 사진 등 허락 없는 사진은 해당 안 됨). caption ko `자료사진: {기종}({촬영연도 또는 '촬영 연도 미상'}) — 이 사건의 장비가 아닙니다.` / en `Archive photo: {model} ({year or 'year unknown'}) — not the equipment involved in this event.`
- 반영: 정책 §4.5-3(3a·3b), 업로더 단계 2-2-1.

### 7. §4.5-5 기관 자체가 의혹 대상인 게시물 — **유지 + 완화(권장)**
- (가) 정당·민간 단체·기업·사업장·종교단체: 의혹 대상이면 건물 외관도 불가(낙인 위험, 유지). (나) **국가기관·지방자치단체·공공기관: 제목이 사실 전달형(보도·발표·결정·발의 전달, 출처 인용형 "~라는 의혹이 제기됨" 포함)이면 건물 외관 허용, 기관의 위법·부정을 단정·암시하는 제목이면 불가**(리뷰 70 P3-4 선례의 정책화). 군·경찰·정보기관의 작전·판단 비판 게시물에는 초소·장비·군인 표지가 읽히는 사진 불가(§4.5-3a-라). 애매하면 불가.
- 반영: 정책 §4.5-5.

## 항목 8: 고친 파일 (전 → 후)
| 파일:절 | 전 → 후 |
|---|---|
| `planning/card-image-policy.md` 머리 | 개정(19-3)까지 → **개정(20)** 줄 |
| 같은 문서 §0 표 | 이미지 최대화 행 추가 |
| 같은 문서 §4.5-2 허용 라이선스 표 | CC BY 행 유지, **CC BY-SA 2.0/3.0/4.0 행·한국판 2.0 KR 행 추가**, PD 행 → `pdBasis` 4종 참조, 제외 목록 "CC BY-SA 제외" → "NC 제외·**ND 보류**", **버전 확인 위계**·**PD 근거 표·쓰지 않는 PD 목록** 신설 |
| 같은 문서 §4.5-3 | "같은 대상"에 **3a 같은 지역 풍경(광역·구역·지점)·3b 같은 기종 장비** 추가 |
| 같은 문서 §4.5-5 | (가) 비공공 조직 불가 유지 / (나) 공공기관 사실 전달형 외관 허용 |
| 같은 문서 §4.5-6 | 3건 → **6건** + 보완 3조건 |
| 같은 문서 §4.5-10·**§4.5-14(신설)** | A-2 안의 우선순위(public 우선), 공공누리 A-2 규칙 |
| 같은 문서 §4.5-11 | CC BY-SA·한국판 서식, PD `pdBasis`별 문구 |
| 같은 문서 §8 | `license` 값에 `cc-by-sa-*`·`cc-by-*-kr` 추가, `pdBasis`·`pdBasisYear` 주석, public A-2 불릿 |
| 같은 문서 §11-18·19, §14 | 슈퍼바이저 확인 필요 항목, EXIF 독립 메모, 20 행 |
| `planning/card-image-uploader-steps.md` 머리·단계 2-2(1·3·5·7번) | 개정(20), 범위 3단계·장비 기종·기관 의혹 확인, CC BY-SA·지역판·PD 근거 확인, 재사용 6건·연속 방지, frontmatter(public A-2, `pdBasis`) |
| `planning/prd.md` 버전 이력 v0.9-7 · §0.5 "1+2" 행 · §5.1 A-2 불릿 | 확대 반영(권장안, 슈퍼바이저 확인 후 시행) |

## guide(`docs/poster/guide.md` §4-1) 반영 문장 (guide는 고치지 않았다 — 슈퍼바이저 몫, 확정 뒤)
1. **A-2 허용 라이선스 줄 보정**: "허용 라이선스는 공공누리 제1유형·CC BY 2.0/3.0/4.0(버전 명시, 지역판 불가)·CC0·PD(근거 명시)·공유마당 기증 '자유이용'뿐이고 CC BY-SA·NC·ND·…" → "허용 라이선스는 공공누리 제1유형·CC BY·**CC BY-SA** 2.0/3.0/4.0(버전 명시)·**한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR**·CC0·**PD(근거 4종 `pdBasis` 중 하나)**·공유마당 기증 '자유이용'뿐이고 **CC BY-NC·CC BY-ND·그 밖 지역판**·버전 불명·기증 '조건부이용'·저작자 미상·재업로드는 쓰지 않는다. 버전은 본문 문구·`rel=license` 주소·공식 안내문 글자로 확인하고 배지 이미지 모양만으로는 인정하지 않는다."
2. **BY-SA 줄**: "CC BY-SA 사진은 크기 조정·형식 변환만 하고 표시에 `CC BY-SA {버전} (크기 조정만)`과 라이선스 링크를 적는다. 자르기·색 보정·합성·글자 삽입은 하지 않는다."
3. **PD 줄**: "퍼블릭 도메인은 `pdBasis` 근거(미국 연방정부 직원 직무 저작물 · 저작자 사망 70년 경과(올해−71년 이하) · 업무상저작물 공표 70년 경과 · 저작자 본인 PD 선언·본인 업로드)를 파일 정보에서 직접 확인한 것만 쓴다. {{PD-old-assumed}}·미국 기준 만료·PD-ineligible·한국 정부 저작물 PD 주장은 쓰지 않는다."
4. **대상 줄(같은 대상)**: "같은 지역의 일반 풍경(광역·구역·지점 3단계: 사진은 게시물 범위와 같거나 넓은 광역 풍경만, 다른 구역을 명시한 사진은 불가, 구역·지점 게시물에는 caption에 '{광역} 일반 풍경 — 이 사건 지점이 아닙니다')과 같은 기종·종류 장비(사람 없음, 개체 식별 표지가 읽히면 불가, caption '자료사진: {기종}(연도) — 이 사건의 장비가 아닙니다.')를 허용한다. 정책 §4.5-3."
5. **반복 한도 줄(:118 부근 보정)**: "같은 장면(같은 원본 사진)이 이미 **3건 이상** 게시물에 쓰였으면…" → "…**3건 이상**(인물·B 사진) 게시물에 쓰였으면…. **A-2 자료사진은 6건**까지이고 같은 원본이 쓰인 두 게시물은 날짜순으로 5건 이상 떨어뜨린다."
6. **기관 의혹 줄**: "의혹 대상이 그 기관·조직 자체이면 쓰지 않는다" → "의혹 대상이 정당·민간 단체·기업·사업장이면 건물 외관도 쓰지 않는다. 국가기관·공공기관은 제목이 사실 전달형이면 건물 외관을 허용하고, 기관의 위법·부정을 단정·암시하는 제목이면 쓰지 않는다. 군·경찰·정보기관의 작전·판단 비판 게시물에는 초소·장비·군인 표지가 읽히는 사진을 쓰지 않는다."
7. **공공누리 A-2 줄**: "공공누리 제1유형 자료사진도 `kind: public`으로 A-2에 쓰며 caption·faceNote 규칙은 open과 같다. 제1유형과 CC가 함께 붙은 사진은 제1유형으로 쓴다."
8. **frontmatter 줄(:120 부근)**: `license`에 `cc-by-sa-2.0/3.0/4.0`·`cc-by-2.0-kr`·`cc-by-sa-2.0-kr` 추가, "`pd`이면 `pdBasis`·`pdBasisYear`·`licenseUrl`(근거 페이지), `licenseLabel`은 쓰지 않는다."

## 항목 9: 프로그래머 20 명세 (코드 오더용 — 슈퍼바이저 확인·확정 뒤 발행)
1. **license 값 추가**(`OPEN_LICENSES`·`IMAGE_LICENSES`): `cc-by-sa-2.0` · `cc-by-sa-3.0` · `cc-by-sa-4.0` · `cc-by-2.0-kr` · `cc-by-sa-2.0-kr`. 기존 `cc-by-2.0/3.0/4.0`·`cc0-1.0`·`pd`·`kcc-donated`는 그대로.
2. **`CC_LICENSE_PATH` 확장**: `cc-by-sa-2.0`→`/licenses/by-sa/2.0/`, `-3.0`→`/licenses/by-sa/3.0/`, `-4.0`→`/licenses/by-sa/4.0/`, `cc-by-2.0-kr`→`/licenses/by/2.0/kr/`, `cc-by-sa-2.0-kr`→`/licenses/by-sa/2.0/kr/`. **`matchesCcLicenseUrl`는 `startsWith(pathHead)`라 `cc-by-2.0`이 `/licenses/by/2.0/kr/`도 통과시킨다 → 국제판 값은 `/kr/` 등 두 글자 국가 코드 세그먼트가 뒤따르면 거부**(지역판 URL에 국제판 값을 쓰는 실수 방지).
3. **`openLicenseRejectReason`**: BY-SA는 허용 값이 됨에 따라 `/^cc-?by-?(sa|nc|nd)/` 메시지를 `nc|nd`로 좁히고 ND는 "보류(정책 §4.5-2) — 카드 표시가 무변형을 보장하기 전까지 쓸 수 없습니다", NC는 "허용 라이선스가 아닙니다(상업 이용 금지)". 허용 목록에 없는 지역판(`cc-by-2.0-de` 등)은 기존 "CC 지역판 … 조문 확인 전" 메시지에 "한국판 2.0 KR(`cc-by-2.0-kr`·`cc-by-sa-2.0-kr`)만 허용"을 덧붙인다.
4. **새 필드**: `pdBasis`(`'us-gov' | 'expired-author-death' | 'expired-publication' | 'declared'`, `license: pd`일 때 필수·그 밖에선 무시 알림), `pdBasisYear`(`YYYY`, `expired-*`일 때 필수, 값 ≤ 올해 − 71이 아니면 **오류** — 빌드 날짜 기준 계산), `licenseUrl`(pd는 근거 페이지, 기존 필수 유지). **pd에서 `licenseLabel`은 오류/경고**(표시 문구는 `pdBasis`가 정한다 — 기존 게시물에 pd가 0건이므로 마이그레이션 없음, 확인 필요: `license: pd` 현재 0건 — 이 저장소 content에서 직접 센 값).
5. **검증 규칙 요약**: BY-SA·지역판은 `licenseUrl`이 그 라이선스·버전 문서(`by-sa/{버전}/`, 한국판 `/kr/`)여야 하고 `workTitle`·`sourceSiteName`·`creditName`·`creditNameEn` 필수(기존 open과 같음). `kind: public`의 A-2(`faceNote`가 `얼굴 없음(자료사진`으로 시작)도 A-2 경고(접두 `자료사진:`·"이 사건 당시 사진이 아닙니다"·연도 미상 문구·400px·재사용)를 적용. 장비 caption은 `자료사진: {기종}` + "이 사건의 장비가 아닙니다"로 경고 판정(둘 중 하나의 접미).
6. **재사용 상한 경고**: 같은 원본(`sourcePageUrl` 또는 저장 파일 해시) 사용 게시물 수가 **6건을 넘으면** 경고(기존 3건 → 6건), 그리고 같은 원본이 쓰인 두 게시물이 `date` 정렬에서 **5건 이내로 인접**하면 경고. 경고만이고 빌드를 막지 않는다.
7. **상세 표시 문구(한/영)**: CC BY-SA·한국판은 CC BY 서식에 라이선스 이름만 바꾸고 **`(크기 조정만)` / `(resized only)`를 항상 덧붙인다**: ko `사진: {creditName}, 「{workTitle}」({workYear}) · {sourceSiteName} / CC BY-SA {버전} (크기 조정만)` + [원 페이지] + [라이선스], en `Photo: {creditNameEn}, "{workTitle}" ({workYear}) · {sourceSiteName} / CC BY-SA {version} (resized only)` + [original] + [license]. 한국판 라벨은 `CC BY 2.0 KR`·`CC BY-SA 2.0 KR`. **pd**는 `pdBasis`별 고정 문구: us-gov `퍼블릭 도메인 — 미국 연방정부 직원이 직무로 만든 저작물(미국 저작권법 제105조)` / `Public domain — a work of a US federal government employee taken in the course of official duties (17 U.S.C. § 105)`, expired-author-death `퍼블릭 도메인 — 저작자 {pdBasisYear} 사망, 보호기간 만료` / `Public domain — author died in {year}; the copyright term has expired`, expired-publication `퍼블릭 도메인 — {pdBasisYear} 공표, 업무상저작물 보호기간 만료` / `Public domain — published in {year}; the term for works made for hire has expired`, declared `저작자가 퍼블릭 도메인으로 공개함` / `Dedicated to the public domain by the author` + [원 페이지] + [근거 페이지(`licenseUrl`)]. `workYear` 없으면 `({workYear})` 괄호 생략(기존).
8. **소개 페이지·`content/README.md`**: 소개 ko·en의 A-2 줄("공공누리·CC 라이선스·퍼블릭 도메인 등 자유 이용이 표시된 것만 쓰며 …")은 이미 BY-SA·PD를 덮으므로 **문구 변경 불필요**(확인 필요: 프로그래머가 현재 화면 문구 그대로 확인). 장비 caption 때문에 "해당 사건 당시 사진이 아니라고 밝힙니다"가 "이 사건의 장비가 아님을 밝힙니다"까지 포괄하도록 **소개 문구에 한 구절 추가 제안**: ko "…(장비 사진은 이 사건의 장비가 아니라고 밝힙니다)"·en "(equipment photos are noted as not the equipment involved)" — 슈퍼바이저 선택. `content/README.md` §3.6: license 값 표, `pdBasis`·`pdBasisYear`·`licenseUrl` 필수 규칙, 지역판 `/kr/` URL, public A-2 사용 예시, pd에서 `licenseLabel` 금지.
9. **`next/image` 적용 여부**: **CC BY-SA·지역판·CC BY·CC0·PD는 최적화 허용**(리사이즈·재인코딩은 위 근거로 개작이 아님). 기증저작물은 기존 정책(전부 제외 유지). 최적화 경로는 변경 없음.
10. **리뷰 68 P3 병행 여부**: **P3-1(카드 payload에서 `credit` 제거) — 함께 넣을 것을 권장**(이번 확대로 open 게시물이 늘면 피드 페이지마다 사진 저작자 이름이 카드 RSC 데이터에 반복해 실리는 양이 커진다, 작은 변경). **P3-2(`images.localPatterns`) — 이번에는 넣지 않는다**: 무변형 의무가 있는 기증 사진(CC BY 4.0이 아닌 것)이 0건이고 ND를 보류했으므로 제3자 `/_next/image` 재인코딩이 문제가 되는 사진이 없다. 기증 비-CC BY 4.0 사진이나 ND를 처음 게시하기 전에 별도 오더로.
11. **테스트 항목**: ① 새 license 값 5개 통과 + 버전·`licenseUrl` 불일치 거부(예: `cc-by-sa-4.0`에 `by/4.0` URL) ② 국제판 값에 `/kr/` URL 거부, 한국판 값에 국제판 URL 거부 ③ `cc-by-nc-4.0`·`cc-by-nd-4.0`·`cc-by-2.0-de` 거부와 메시지 ④ pd: `pdBasis` 없음·값 오류·`expired-*`에 `pdBasisYear` 없음·`pdBasisYear > 올해−71` 거부, `licenseLabel` 사용 거부 ⑤ 렌더: BY-SA 표시 ko·en(`크기 조정만`·`resized only` + 두 링크), pd 4종 문구 ko·en, 한국판 라벨 ⑥ 재사용 6건·연속 인접 경고(양성·음성) ⑦ public A-2 경고 적용 ⑧ 카드 payload에 `credit` 없음(P3-1 포함 시) ⑨ OG·JSON-LD·사이트맵에 open/public 이미지 미사용 회귀 ⑩ `copy-exact`(소개) 변경이 있으면 기대값 갱신.

## 항목 10: 예상 효과 (이미지가 늘 게시물 수 — 어림, 근거 포함)
- **기준선**: 대표 이미지 있는 게시물 52/209(커밋 9fe175d). 이미지 없는 게시물 **157**(`content/posts/`를 읽어 센 값, 낱말 집계는 158행으로 나옴 — 1건 차이는 낱말 집계 시 제목·설명·태그 문자열 방식 차이). 이 중 낱말 일치 상한(중복 포함): DMZ 25 · 합참·국방부 21 · 대통령·청와대·대통령실 35 · 국회 14 · 통일부 13 · 경찰 14 · 법원·검찰·헌재 19 · 국정원 7 · 지뢰 24 · 판문점·MDL 6 · 철책·GOP 2 · 미사일·발사 3 · 드론 3 · 함정 1 · 항공기 2. 국방·북한·대통령 계열 낱말 합집합 81, 장소·기관 낱말 전체 합집합(중국 제외) 114.
- **어림 방법**: 낱말 일치 상한 × 통과율. 통과율의 관측 근거는 업로더 26(시도 10 → 성공 8)·27(시도 20 → 성공 12, 실패 9건 중 **라이선스 없음이 주요 사유**) 두 묶음의 실제 결과다. 대상에서 빠지는 것은 인물·SNS 발언·기관 비판형 게시물(업로더 27이 기관 자체 비판형 5건·집회 2건·원전 1건·민주노총 3건을 제외)이다.
| 확대 항목 | 늘 게시물 수(어림) | 근거 |
|---|---|---|
| ① **CC BY-SA 허용** | **+8~15** | 업로더 27 참고 후보 표: 국방부 청사 BY-SA 28(PD 6)·정부과천청사 21·광화문 39·청와대 46 — 27의 실패 9건 중 국방부·합참(2건)·과천(1건)·광화문(1건)이 BY-SA로 풀릴 가능성(+4) + 청와대(대통령 계열 35 중 장소 중심·단정 위험 통과 약 3~6) + 경찰·검찰·법조(법원·검찰·헌재 19 중 일부). 상한 낱말 합 수십 건 × 통과율 약 20~30% |
| ② **PD 근거 4종** | **+6~12** | 위키미디어 표본(슈퍼바이저 확인): DMZ 철책 PD 14, 판문점 PD 32, 국회 PD 22, 통일전망대 PD 35 — 판문점 PD가 많은 것은 미국 연방정부(미군) 사진일 가능성이 높아 `us-gov`가 큰 몫(개별 확인 필요). 판문점·MDL 6 · DMZ 25 · 국회 14 낱말 상한 중 인물이 없고 대상 일치하는 것 |
| ③ **공공누리 A-2(`kind: public`)** | **+1~3** | 시범 조사에서 판문점·돌아오지 않는 다리 제1유형 2건만 확인(공유마당), 판문점·MDL 게시물 6건 |
| ④ **ND·지역판·버전 배지** | **+0~3** | ND는 보류(0). 한국판 2.0 KR은 공유마당·서울 아카이브 일부(업로더 26의 서울 아카이브 사례는 이미 CC BY 4.0). 버전 배지 위계는 공유마당 DMZ CC BY 연작이 풀리는 정도(업로더 26·27에서 "버전 없음"으로 제외된 연작) — DMZ 계열과 겹침 |
| ⑤ **재사용 상한 6** | **+6~12(DMZ 계열 중심)** | 업로더 27: DMZ 추가분이 "쓸 수 있는 DMZ 사진이 1장뿐이라 3건에서 멈춤" — 허용 사진 N장 × 6건이 가능(N=2~3이면 12~18). DMZ 25건 중 ④⑥과 겹치므로 별도 합산하지 않고 아래 합계에서 중복 제거 |
| ⑥ **같은 지역 풍경·같은 기종 장비** | **+8~16** | 지역 풍경: 업로더 26이 DMZ·철책 2건을 "한정 출처에 맞는 사진 없음"으로 실패 — 광역 풍경 허용으로 DMZ 25·철책 2·판문점 6 중 구역 불일치로 막혔던 것이 풀림(상한 중 20~40%, 군 판단 비판형 제외). 장비: 지뢰 24(목함지뢰 등 종류 지목 일부)·미사일 3·드론 3·함정 1·항공기 2 중 기종 지목·허용 사진 있는 것(+3~8, 확인 필요: 장비 사진 공급은 이번에 조사하지 않았다) |
| ⑦ **§4.5-5 완화** | **+2~5** | 업로더 27이 제외한 "기관 자체 비판형" 5건(통일부·군·경찰·정보기관 포함)과 리뷰 69·70이 경계 허용한 3건 선례 — 군·경찰·정보기관 비판형은 계속 막히므로 사실 전달형 공공기관 건물 게시물만(국회·법원·정부청사 계열) |
- **합계(중복 제거 어림)**: **+25~45건** → 대표 이미지 있는 게시물 약 **77~97건/209**(37~46%). 하한(+25)은 BY-SA·PD·DMZ 풍경이 모두 보수적으로 맞아떨어질 때, 상한(+45)은 DMZ·판문점 PD·SA 공급이 표본대로 대상 일치 사진으로 이어질 때다.
- **확인 필요(어림의 불확실성)**: ① 위키미디어 표본 건수는 대상 일치 여부를 개별 확인하지 않은 검색 결과 수다(업로더 27도 "경찰대 PD 15건 중 다수는 다른 나라 경찰대 사진" — 실제 후보 수는 더 적다) ② 장비 사진 공급 미조사 ③ `us-gov`·`declared`의 법률·틀 확인 전에는 ②의 PD 몫이 줄 수 있음(하한에 반영) ④ 낱말 일치는 "장소·기관이 주제"임을 보장하지 않는다. 첫 묶음(예: 20건)을 해 보고 통과율을 실측해 이 표를 갱신한다.

## 슈퍼바이저 확인 필요 요약
1. 정책 §4.5-2·3·5·6의 확대안 전체(사용자 지시 범위 안의 기획 권장안) — 확정 여부.
2. `us-gov`의 한국 적용(저작권법 제3조 4항 해석)과 `declared`의 PD-self 본문 — 첫 PD 게시 전 확인.
3. 소개 문구에 장비 사진 구절을 넣을지(프로그래머 20 명세 8).
4. 프로그래머 20 오더 발행(위 명세 1~11), guide 반영(위 8줄).

## 20-1 (리뷰 71 반영 — 슈퍼바이저 결정 2026-11-11 "법적으로 안전한 범위에서 최대한", 사용자 이의 시 변경 — 모델 ID `claude-sonnet-5-5`)
- 기준: `docs/triggers/reviewer-71-planner-20-review-COMPLETE.md`(P1 1 · P2 5 · P3 6). 수정 파일: `planning/card-image-policy.md`·`planning/card-image-uploader-steps.md`·`planning/prd.md`·이 트리거. src·scripts·content·guide·git·빌드 0, 사진 저작자 이름·실명·옛 id·계정·홈 경로 0.
- **이 절의 "프로그래머 20 명세(최종본)"와 "guide 반영 문장(최종본)"이 위 항목 9·guide 8줄을 대체한다.** 위쪽 20 절의 옛 문구(us-gov 문구, ND 보류, "크기 조정만", `date`, 1955 기준)는 역사 기록이다.

### 1. 지적별 처리 (정책 = `planning/card-image-policy.md`, 업로더 = `planning/card-image-uploader-steps.md`; 줄은 반영 직후 기준)
| 지적 | 위치 | 전 → 후 |
|---|---|---|
| **P1-1 us-gov** | 정책 §4.5-2 PD 표 `us-gov` 행(:305) | 표시 "퍼블릭 도메인 — 미국 연방정부 직원이 직무로 만든 저작물(…)" → ko `미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)` / en `US federal government work — public domain in the United States (17 U.S.C. § 105)`. 근거에서 저작권법 제3조 ④를 근거로 삼는 서술 삭제, **"한국에서 보호될 여지가 남는다"(제3조 ①④·제7조·베른 제5조(2))를 근거 칸과 §11-18에 기록**. 조건 ⓐ 원 기관 페이지(공식 배포처)에서 직무 촬영 확인(위키미디어 틀만 불가) ⓑ 제3자 크레딧(계약업체·통신사)이 있으면 불가 ⓒ 군 표장이 주된 피사체이면 불가 ⓓ 기관의 보증 부인 문구는 `creditNotice` — 근거로 미국 국방부 영상 배포처 안내(제3자 저작물 단서·표장·초상권·보증 부인, 전 세계 이용 허락 문구 없음)를 직접 열람한 내용을 적음. 시행 전 슈퍼바이저가 사용자에게 한 줄로 알린다(§11-18) |
| P1-1 | 업로더 단계 2-2-3 ④ | "`us-gov` 연방정부 직원 직무 촬영 명시" → "원 기관 페이지(또는 공식 배포처)에서 직무 촬영 확인·제3자 크레딧이면 중단·군 표장이 주된 피사체이면 중단·보증 부인 문구는 `creditNotice`" |
| **P2-1 PD 기준** | 정책 `expired-author-death`(:306)·`expired-publication`(:307)·§8 `pdBasisYear` 주석 | "≤ (올해 − 71)(2026년 1955)" → "**≤ max(1962, 올해 − 71)**(2026년 1962년 이전)". 근거: 2011.6.30 법률 제10807호 부칙 제1조(70년 개정은 2013.7.1 시행)·제2조(시행 전 소멸한 저작물에는 새 법 불적용), 1987 시행 법률 부칙 제2조·제3조(1957년법 사후 30년은 50년에 흡수) — 1962 사망 → 2012.12.31 소멸 |
| P2-1 무명 | 정책 :307·쓰지 않는 것 줄 | `expired-publication`에 **무명 저작물**(제40조 공표 후 70년) 추가, 쓰지 않는 것의 "무명 사진" → "**공표연도가 확인되지 않는 무명 사진**"으로 좁혀 모순 해소. 표시 문구 "업무상저작물 보호기간 만료" → "보호기간 만료" |
| **P2-2 업로더 옛 문구 5곳** | 업로더 2-2-1(:183 끝)·2-2-2(:184 "CC BY만, BY-SA·NC·ND 제외")·2-2-3 ②(:185 지역판)·⑦(:185 "BY-SA·NC·ND…중단")·2-2-7(:189 "지역판 값은 없다") | 1: "의혹·비난 대상이 그 기관·조직 자체이면 중단"류 → 정책 §4.5-5 (가)(나) 따름(종교단체·지방자치단체·사실 전달형 예외·군·경찰·정보기관 비판 시 군 표지 사진 중단) + 3b 특정 사건 장면 중단. 2: "CC BY만" → "CC BY·BY-SA·BY-ND만(NC 제외, ND는 카드 object-contain 뒤)". 3 ②: "지역판 조문 확인 전 불가" → "한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용, 그 밖 불가". 3 ⑦: "BY-SA·NC·ND … 중단" → "BY-NC … 중단(BY-SA·ND는 ② 조건대로 허용)". 7: "CC 지역판 값은 없다" → 한국판 두 값 + nd 값 3개 명시 |
| **P2-3 3a caption** | 정책 §4.5-3a (나)(:313) | 형식 미완결 → ko `자료사진: {광역} 일반 풍경({촬영연도 또는 '촬영 연도 미상'}) — 이 사건 지점·당시 사진이 아닙니다.` / en `Archive photo: general view of {area} ({year or 'year unknown'}) — not the location or time of this event.` — **기본 형식을 대체**(덧붙이지 않음), (가) 광역 게시물은 기본 형식 그대로, 10년·연도 미상 문구 덧붙임. 검증 예외는 아래 명세 5 |
| **P2-4 명세 두 함정** | 정책 §4.5-6 ②(:317) · 업로더 2-2-5 · 아래 명세 2·6 | `date` 기준 → **`publishedAt` 내림차순 + 같은 날 `id` 오름차순(`getAllPosts`와 같은 규칙: `publishedAtTime` 내림차순 → `id.localeCompare`)**, "메인 피드만 본다" 한계 명시. CC URL: "두 글자 국가 코드 세그먼트 거부" → "**버전 뒤에는 `deed`·`legalcode`(+ `.ko` 같은 언어 접미)만 허용**, 나머지(`kr/`·`igo/`·`us/` 등) 거부" — 명세 2 |
| **P2-5 3b** | 정책 §4.5-3b(:314) | 조건 ⑤ 추가: "제목이 그 장비의 **특정 사건 장면(발사·격추·나포·침몰·피격 등)** 을 전하는 게시물에는 쓰지 않는다 — 기종·제도·배치·도입·성능을 다루는 게시물에만". 업로더 2-2-1 ④에도 반영 |
| **P3-1 ND** | 정책 §4.5-2 표·제외 줄 | "CC BY-ND 보류" → **`cc-by-nd-2.0`·`cc-by-nd-3.0`·`cc-by-nd-4.0` 조건부 허용** 행 신설: 크기 조정·형식 변환만, **ND 사진은 카드 `object-contain`(자르지 않음)·상세 원본 전체 표시**, 표시 `CC BY-ND {버전} (변경 없음·크기 조정 외)`. 근거 4.0 §2(a)(1)(A)(B)·§2(a)(4)·§1(a)(리뷰 71 직접 열람), 3.0 §3(직접 열람), 한국판 BY 2.0 KR 제3조 저작인격권 불행사, 저작권법 제13조 2항 5호. **한국판 ND는 조문 확인 때만 값 추가, 2.0 ND는 첫 사용 전 §3·§4 대조(직접 열람 못 함 — 확인 필요)**. ND 사진은 object-contain 구현 전에는 올리지 않음(업로더 2-2-7) |
| **P3-2 이중 표시** | 정책 §4.5-10(:321)·§4.5-14(:322)·§6 우선순위(:381) | "제1유형과 CC가 함께면 제1유형으로" → "**둘 중 어느 쪽으로 써도 된다(병행 제공 — 법적 우선순위 없음), 기존 `open/cc-by-4.0` 게시물은 그대로**" |
| **P3-3 표시 문구** | 정책 §4.5-2 BY-SA 행·§4.5-11 BY-SA 줄·§11-18 | "(크기 조정만)"/"(resized only)" → "**(변경 없음·크기 조정 외)** / **(unmodified except resizing)**"(원본을 바이트 그대로 저장한 경우에도 사실). BY-SA·BY-ND에 항상 붙임 |
| **P3-4 guide 6줄** | 아래 guide 문장 6 | 정책 (가)에 이미 있는 "종교단체"·(나)의 "지방자치단체"를 guide 문안에 추가 |
| **P3-5 크레딧** | 정책 §4.5-11 CC0 줄·PD 줄 | "저작자 이름이 알려져 있으면 크레딧에 적는다(저작인격권 제12조·제14조는 포기되지 않음)" 추가. **1957년법 제35조(사진 10년)는 근거로 쓰지 않고** §11-20에 "기산 시점 확인 뒤 검토"로 메모 |
| **P3-6 명세 다듬기** | 정책 §4.5-5·§4.5-14·§8 `licenseLabel` · 아래 명세 4·5 | §4.5-5 (나)에 예시: 단정 「○○부, 자료 은폐」·「○○청 수사 방해는 사실」, 암시 「○○부는 왜 숨기나」, 사실 전달 「○○부 자료 비공개 논란 보도」·「○○부, 해당 자료 비공개 결정 발표」. public A-2 판정은 **caption 접두 `자료사진:`/`Archive photo:`**. pd의 `licenseLabel` 사용은 **오류**. 재사용 인접 검사는 메인 피드만 본다는 한계 명시 |
| 소개 문구(슈퍼바이저 결정) | 아래 명세 9 | 장비 구절 포함 확정 문구(ko·en) |
| 정책 머리·§11-18·19·20·§14, PRD v0.9-8 | — | 개정(20-1)·§11-18 개정(us-gov 기록, `declared` 확정, ND 조건부)·§11-20 신설(1957년법 메모)·§14 20-1 행·PRD 버전 행 |

### 2. 프로그래머 20 명세 (최종본 — 슈퍼바이저 확정 뒤 발행)
1. **license 값**(`OPEN_LICENSES`·`IMAGE_LICENSES`): 기존 `cc-by-2.0`·`cc-by-3.0`·`cc-by-4.0`·`cc0-1.0`·`pd`·`kcc-donated` + 추가 **`cc-by-sa-2.0`·`cc-by-sa-3.0`·`cc-by-sa-4.0`·`cc-by-nd-2.0`·`cc-by-nd-3.0`·`cc-by-nd-4.0`·`cc-by-2.0-kr`·`cc-by-sa-2.0-kr`**. 한국판 ND와 그 밖 포팅 버전은 값을 만들지 않는다.
2. **`CC_LICENSE_PATH`·`matchesCcLicenseUrl`**: 경로 머리 — `cc-by-sa-N`→`/licenses/by-sa/N/`, `cc-by-nd-N`→`/licenses/by-nd/N/`, `cc-by-2.0-kr`→`/licenses/by/2.0/kr/`, `cc-by-sa-2.0-kr`→`/licenses/by-sa/2.0/kr/`. **함정 수정**: 현재 `startsWith(pathHead)`는 국제판 값에 `/licenses/by/2.0/kr/`·`/licenses/by/3.0/igo/` 같은 다른 문서를 통과시킨다. → 경로 머리 **뒤에 남는 부분은 비어 있거나 `deed`·`legalcode`(+ `.ko`·`.en` 같은 언어 접미, 끝 `/` 허용)만 허용하고 그 밖은 모두 거부**(국제판 값의 `kr/`·`igo/`·`us/`, 한국판 값의 국제판 URL 포함). 한국판 값은 머리가 `/kr/`까지이고 같은 규칙을 적용한다.
3. **`openLicenseRejectReason`**: BY-NC는 "허용 라이선스가 아닙니다(상업 이용 금지)", BY-SA·BY-ND는 허용 값이므로 reject 패턴에서 뺀다. 한국판 ND·그 밖 포팅 버전(`cc-by-2.0-de` 등)은 "CC 지역판은 한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR만 허용합니다(그 밖은 조문 확인 전)"로. 버전 없는 `cc-by`·`cc-by-sa`·`cc-by-nd`는 "버전을 적으세요".
4. **새 필드·검증**: `pdBasis`(`us-gov`·`expired-author-death`·`expired-publication`·`declared`) — `license: pd`에서 필수, 그 밖 license에서는 알림. `pdBasisYear`(`YYYY`) — `expired-*`에서 필수이며 **값이 `max(1962, 올해 − 71)`보다 크면 오류**(`context.today` 주입으로 테스트). `licenseUrl` — pd는 근거 페이지(필수). **pd에서 `licenseLabel`이 있으면 오류**(`kcc-donated`에서만 허용). `us-gov`이면 `licenseUrl`이 위키미디어 호스트(`commons.wikimedia.org` 등)이면 경고(정책 조건 ⓐ: 원 기관 페이지 확인)이고 `creditNotice`가 비어 있으면 경고("기관의 보증 부인 문구 확인"). 기존 게시물에 `license: pd`는 **0건**(이 저장소 content에서 직접 센 값) — 마이그레이션 없음.
5. **A-2 caption 경고(public·open 공통)**: A-2 판정은 **caption 접두 `자료사진:`(영어 `Archive photo:`)** 로 한다(`faceNote` 문구만으로 판정하지 않는다). 허용 형식 — ko ① `자료사진: … — 이 사건 당시 사진이 아닙니다.` ② `자료사진: … — 이 사건 지점·당시 사진이 아닙니다.`(3a) ③ `자료사진: … — 이 사건의 장비가 아닙니다.`(3b), en ① `Archive photo: … — not taken at the time of this event.` ② `Archive photo: general view of … — not the location or time of this event.` ③ `Archive photo: … — not the equipment involved in this event.` 세 형식 중 하나가 아니면 경고. **촬영 연도 미상이거나 10년 이상 전이면 ①②에 `현재 모습과 다를 수 있습니다.`** 포함 경고(③은 제외). 짧은 변 400px 미만·faceNote `얼굴 없음` 경고는 기존대로.
6. **재사용 경고**: 같은 원본(`sourcePageUrl` 또는 저장 파일 해시)의 사용 게시물이 **6건을 넘으면** 경고. 같은 원본이 쓰인 두 게시물이 **`getAllPosts`와 같은 정렬(`publishedAtTime` 내림차순, 같은 날은 `id` 오름차순)에서 인덱스 차이 5 미만**이면 경고. **한계(문서화)**: 메인 피드 순서만 본다 — 태그·검색 페이지의 인접은 잡지 못한다. 경고만이고 빌드를 막지 않는다.
7. **상세 표시 문구(한/영)**
   - CC BY: ko `사진: {creditName}, 「{workTitle}」({workYear}) · {sourceSiteName} / CC BY {버전}` + [원 페이지] + [라이선스] / en `Photo: {creditNameEn}, "{workTitle}" ({workYear}) · {sourceSiteName} / CC BY {version}` + [original] + [license].
   - **CC BY-SA·CC BY-ND**: 같은 서식에 라이선스 이름만 바꾸고 **`(변경 없음·크기 조정 외)` / `(unmodified except resizing)`를 항상 덧붙인다**. 한국판 라벨 `CC BY 2.0 KR`·`CC BY-SA 2.0 KR`.
   - `workYear`가 없으면 `({workYear})` 괄호 생략. `creditNotice`가 있으면 함께 표시.
   - CC0: `사진: {creditName}(CC0 1.0 — 저작권 포기)` / `Photo: {creditNameEn} (CC0 1.0 — public domain dedication)`. **저작자 이름이 알려져 있으면 `creditName`에 쓴다**(CC0·PD·declared 공통).
   - **pd(`pdBasis`별 고정 문구) + [원 페이지] + [근거 페이지(`licenseUrl`)]**: `us-gov` ko `미국 연방정부 저작물 — 미국에서 퍼블릭 도메인(미국 저작권법 제105조)` / en `US federal government work — public domain in the United States (17 U.S.C. § 105)`(+ `creditNotice`의 보증 부인 문구 표시) · `expired-author-death` ko `퍼블릭 도메인 — 저작자 {pdBasisYear} 사망, 보호기간 만료` / en `Public domain — author died in {year}; the copyright term has expired` · `expired-publication` ko `퍼블릭 도메인 — {pdBasisYear} 공표, 보호기간 만료` / en `Public domain — published in {year}; the copyright term has expired` · `declared` ko `저작자가 퍼블릭 도메인으로 공개함` / en `Dedicated to the public domain by the author`.
   - **open도 `caption`(영어 `imageCaption`)을 public·news처럼 figcaption의 크레딧 줄 위에 표시한다**(현재 `ImageCreditCaption`은 credit이 있는 public·news만 그림).
8. **카드 ND 표시(P3-1)**: `resolveCardMedia`가 `license`가 `cc-by-nd-*`이면 카드 이미지를 `object-contain`으로 그리도록 플래그를 준다(`card-media.tsx:113·:130`의 `object-cover` → ND만 `object-contain` + 배경색 채움). 상세에서도 원본 전체를 보이는지(자르지 않는지) 확인한다. **이 항목이 배포되기 전에는 ND 사진을 올리지 않는다.** ND도 리사이즈·재인코딩(`next/image`)은 허용(4.0 §2(a)(4)).
9. **소개 페이지 문구(확정 — 슈퍼바이저 결정)**: A-2 줄을 장비 구절 포함으로 바꾼다. ko `장소·건물·지형·장비처럼 사람이 나오지 않는 자료사진은 공공누리·CC 라이선스·퍼블릭 도메인 등 자유 이용이 표시된 것만 쓰며, 사진 아래에 저작자·라이선스와 원문 링크를 적고 해당 사건 당시 사진(장비 사진은 이 사건의 장비)이 아니라고 밝힙니다.` / en `Archive photos with no people in them (such as places, buildings and equipment) are used only if they are marked as free to use — for example under KOGL, a Creative Commons license or in the public domain. Below the photo we credit the author, state the license, link to the original, and note that it was not taken at the time of the event (or, for equipment, that it does not show the equipment involved).` `copy-exact` 기대값·기획 문안 목록 동반 갱신. **`content/README.md` §3.6**: license 값 표(위 1), `pdBasis`·`pdBasisYear`·`licenseUrl` 필수 규칙, pd의 `licenseLabel` 금지, 한국판 `/kr/` URL, ND 조건, public A-2 예시, 저작자 이름 크레딧 규칙.
10. **`next/image`**: CC BY·BY-SA·BY-ND·한국판·CC0·PD 최적화 허용(리사이즈·재인코딩은 개작이 아님 — 4.0 §2(a)(4), 2.0·3.0·KR §3 "기술적 수정"). 기증저작물은 기존대로 전부 제외 유지.
11. **리뷰 68 병행**: **P3-1(카드 payload에서 `credit` 제거) 포함**, **P3-2(`images.localPatterns`)는 이번에 제외**(무변형 의무가 있는 기증 비-CC BY 4.0 사진이 0건이고 ND는 재인코딩을 허용하므로 문제가 없다 — 기증 비-CC BY 4.0 사진을 처음 게시하기 전에 별도 오더).
12. **테스트 항목**: ① 새 license 값 8개 통과 + `licenseUrl` 버전·종류 불일치 거부(`cc-by-sa-4.0`에 `by/4.0` URL 등) ② **`deed`·`deed.ko`·`legalcode`·`legalcode.ko`·끝 `/` 통과, 국제판 값의 `kr/`·`igo/`·`us/` 거부, 한국판 값의 국제판 URL 거부** ③ `cc-by-nc-4.0`·`cc-by-2.0-de`·한국판 ND·버전 없는 `cc-by-sa` 거부와 메시지 ④ pd: `pdBasis` 없음·값 오류·`expired-*`에 `pdBasisYear` 없음·`pdBasisYear > max(1962, 올해−71)` 거부(양성 1962·경계 1963 음성), `licenseLabel` 사용 오류, us-gov 위키미디어 호스트·`creditNotice` 공란 경고 ⑤ 렌더: BY-SA·BY-ND 표시 ko·en(`(변경 없음·크기 조정 외)`·`(unmodified except resizing)` + 두 링크), pd 4종 문구 ko·en(us-gov는 "미국에서"), 한국판 라벨, open caption 표시 ⑥ A-2 caption 3형식 ko·en 통과·접두 없는 caption 경고·연도 미상 문구 경고 ⑦ 재사용 6건 초과·인접(같은 날 `id` 순서 포함) 양성·음성 ⑧ **ND 카드 `object-contain`**(CC BY 카드는 `object-cover` 유지) ⑨ 카드 payload에 `credit` 없음 ⑩ OG·JSON-LD·사이트맵에 open/public 이미지 미사용 회귀 ⑪ `copy-exact`(소개) 기대값.

### 3. guide(`docs/poster/guide.md` §4-1) 반영 문장 (최종본 — guide는 고치지 않았다, 슈퍼바이저 몫)
1. **A-2 허용 라이선스 줄 교체**: "허용 라이선스는 공공누리 제1유형·CC BY·CC BY-SA·**CC BY-ND** 2.0/3.0/4.0(버전 명시)·한국판 CC BY 2.0 KR·CC BY-SA 2.0 KR·CC0·PD(근거 4종 `pdBasis`)·공유마당 기증 '자유이용'뿐이고 **CC BY-NC**·한국판 ND 등 그 밖 지역판·버전 불명·기증 '조건부이용'·저작자 미상·재업로드는 쓰지 않는다. 버전은 본문 문구·`rel=license` 주소·공식 안내문 글자로 확인하고 배지 이미지 모양만으로는 인정하지 않는다. CC BY-ND는 카드 `object-contain` 표시가 배포된 뒤에만 올린다."
2. **BY-SA·BY-ND 줄**: "CC BY-SA·BY-ND 사진은 크기 조정·형식 변환만 하고 표시에 `CC BY-SA/BY-ND {버전} (변경 없음·크기 조정 외)`와 라이선스 링크를 적는다. 자르기·색 보정·합성·글자 삽입은 하지 않는다."
3. **PD 줄**: "퍼블릭 도메인은 `pdBasis` 근거를 직접 확인한 것만 쓴다 — `us-gov`(원 기관 페이지에서 미국 연방정부 직원의 직무 촬영 확인, 제3자 크레딧·군 표장이 주된 피사체이면 불가, 기관 보증 부인 문구는 `creditNotice`, 표시는 '미국에서 퍼블릭 도메인'), `expired-author-death`(저작자 사망연도 ≤ max(1962, 올해−71)), `expired-publication`(업무상·무명 저작물, 공표연도 ≤ max(1962, 올해−71)·공표연도 확인 필수), `declared`(저작자 본인 PD 선언·본인 업로드·대체 허락 문구). {{PD-old-assumed}}·미국 기준 만료·PD-ineligible·한국 정부 저작물 PD 주장·공표연도 불명 무명 사진은 쓰지 않는다. CC0·PD도 저작자 이름이 알려져 있으면 크레딧에 적는다."
4. **대상 줄(같은 대상)**: "같은 지역의 일반 풍경(광역·구역·지점 3단계: 사진은 게시물 범위와 같거나 넓은 광역 풍경만, 다른 구역을 명시한 사진은 불가, 구역·지점 게시물의 caption은 `자료사진: {광역} 일반 풍경(연도) — 이 사건 지점·당시 사진이 아닙니다.`)과 같은 기종·종류 장비(사람 없음, 개체 식별 표지가 읽히면 불가, caption `자료사진: {기종}(연도) — 이 사건의 장비가 아닙니다.`, **제목이 그 장비의 특정 사건 장면(발사·격추·나포 등)을 전하면 불가**)를 허용한다. 정책 §4.5-3."
5. **반복 한도 줄**: "…**3건 이상**(인물·B 사진)…. **A-2 자료사진은 6건**까지이고 같은 원본이 쓰인 두 게시물은 메인 피드 정렬(`publishedAt` 내림차순, 같은 날 `id` 오름차순)에서 5건 이상 떨어뜨린다(메인 피드만 확인 가능)."
6. **기관 의혹 줄**: "의혹 대상이 정당·민간 단체·기업·사업장·**종교단체**이면 건물 외관도 쓰지 않는다. 국가기관·**지방자치단체**·공공기관은 제목이 사실 전달형(예: 「○○부 자료 비공개 논란 보도」)이면 건물 외관을 허용하고, 위법·부정을 단정하거나 암시하는 제목(예: 「○○부, 자료 은폐」「○○부는 왜 숨기나」)이면 쓰지 않는다. 군·경찰·정보기관의 작전·판단 비판 게시물에는 초소·장비·군인 표지가 읽히는 사진을 쓰지 않는다."
7. **공공누리 A-2 줄**: "공공누리 제1유형 자료사진도 `kind: public`으로 A-2에 쓰며 caption·faceNote 규칙은 open과 같다. 제1유형과 CC가 함께 붙은 사진은 어느 쪽으로 써도 된다(기존 게시물은 그대로)."
8. **frontmatter 줄(:120 부근)**: `license`에 `cc-by-sa-2.0/3.0/4.0`·`cc-by-nd-2.0/3.0/4.0`·`cc-by-2.0-kr`·`cc-by-sa-2.0-kr` 추가, "`pd`이면 `pdBasis`·`pdBasisYear`·`licenseUrl`(근거 페이지), `licenseLabel`을 쓰면 오류."
9. **A-2 caption 줄 보정**: "…촬영 연도 미상이거나 10년 이상 전이면 '현재 모습과 다를 수 있습니다.'를 붙인다(장비 caption 제외)."

### 4. 슈퍼바이저 알림 필요
- **사용자에게 한 줄**(P1 슈퍼바이저 결정): "미국 연방정부(미군 등) 사진은 미국에서는 퍼블릭 도메인이지만 한국에서 보호될 여지가 남습니다 — 화면에 '미국에서 퍼블릭 도메인'으로 표시하고 원 기관 페이지·제3자 크레딧·군 표장 조건을 걸어 씁니다."
- 남은 확인 필요: 2.0 ND 법률 문서 대조(첫 사용 전), 위키미디어 PD-self 외 틀 본문, 1957년법 제35조 기산 시점(§11-20).
