# 리뷰어 67 — 기획자 19·19-1 검토 (이미지 확대: 인물 없는 자료사진 A-2 + 개방 라이선스) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/reviewer/processed/67-planner-19-review.md`(이동)
- 대상:
  - `docs/triggers/planner-19-image-expansion-archive-kogl-COMPLETE.md`(19 + "## 19-1")
  - `git diff`: `planning/card-image-policy.md`(+80/−2), `planning/card-image-uploader-steps.md`(+20/−2), `planning/prd.md`(+4)
- 대조용으로 읽은 것: 현재 `docs/poster/guide.md` §4-1, `src/lib/content/schema.ts`(image 검증), `src/app/(ko)/about`·`(en)/en/about` 현재 문구.
- 파일 수정 0(이 트리거와 오더 이동만), git 쓰기 0, 빌드 0.
- 라이선스 법률 문서와 공유마당 안내는 WebFetch로 열었다. WebFetch는 요약을 거치므로, 같은 주소를 `curl`로도 받아 조문 글자를 직접 찾아 대조했다(받은 HTML은 저장소 밖 `$TMPDIR/r67`).

## 판정: 🟡 조건부 통과 (P1 0 · P2 5 · P3 8)
- 사용자 결정 "1+2"·"1"과 슈퍼바이저 판단 4건은 §4.5·§11-13~16에 글자 그대로 들어가 있다. A·B 인물 사진으로 범위가 새지 않았다.
  - 개방 라이선스는 "A-2에 한한다"(§4.5 머리·§4.2 공유마당 행·§11-14).
  - 점 크기 인물은 1% 미만, news 출처 밖 자료사진은 불채택, BY-SA·NC·ND는 제외.
- 라이선스 인용(CC BY 4.0·2.0, CC0, 공유마당)은 글자 대조 결과 모두 맞다.
- 다만 아래 P2 5건은 **프로그래머 오더 발행과 guide 반영 전에** 문서에서 고쳐야 한다:
  - 4a 상위 규정에 예외 표시가 없다.
  - 표시 서식에 필요한 필드가 목록에 없다.
  - 기증저작물 변형 규칙이 문서끼리 서로 다르다.
  - 트리거에 저작자 이름을 기록하라고 되어 있다.
  - 확인하지 않은 CC 지역판이 허용되어 있다.
- 업로더의 A-2 착수 금지(단계 2-2 "언제")는 이미 걸려 있어, 지금 당장 생기는 위험은 없다.

## 1. 사용자 결정·슈퍼바이저 판단 대조 (항목 1)
| 결정 | 문서 위치 | 결과 |
|---|---|---|
| "1" 인물 없는 자료사진 허용 | 정책 §4.5 머리·1~10항, PRD §5.1 A-2 불릿 | ✅ |
| "2" 정부 공식 사진(제1유형) | 정책 §4.5-9 "현행 A 규칙으로 이미 허용" | ✅ (단 §4.5-9 후반의 `sources[]` 무관 해석은 P3-5) |
| "1"(19-1) A-2 한정 CC BY(버전)·CC0·PD·기증 자유이용 | §4.5-2 표, §11-14, §4.2 공유마당 두 행, PRD v0.9-6 | ✅ "A-2에 한한다"·"인물 사진(A·B)에는 넓히지 않는다" 명시 |
| 공유마당: 제공 기관·저작자 명시 건만 | §4.5-2 · §11-13 | ✅ |
| 점 크기 원경 1% 미만 | §4.5-1 · §11-15 · 단계 2-2-3 | ✅ |
| news `sources[]` 밖 자료사진 불채택 | §11-16 | ✅ |
| BY-SA·NC·ND·불명확 제외 | §4.5-2 제외 줄 · 단계 2-2-3 ⑦ | ✅ |
| 위 결정을 요약하는 상위 표 | 정책 §0 :30, §2 :89, PRD §0.5 :98 | ❌ "제1유형만"이 19-1 뒤에도 그대로 → **P2-1** |

## 2. 라이선스 근거 직접 대조 (항목 2)
| 인용(기획자) | 원문에서 찾은 글자 | 결과 |
|---|---|---|
| CC BY 4.0 §2(a)(1) "reproduce and Share the Licensed Material, in whole or in part" | 같음 | ✅ |
| 4.0 §2(a)(4) "simply making modifications authorized by this Section 2(a)(4) never produces Adapted Material" | 같음. 앞 문장은 "to make technical modifications necessary to do so"(모든 매체·형식에서 권리를 행사하는 데 필요한 기술적 수정) | ✅ |
| 4.0 §3(a)(1)(A)(i)~(v)·(B)·(C), §3(a)(2) | (A) "retain the following if it is supplied by the Licensor" (i)~(v) 같음 · (B) "indicate if You modified the Licensed Material and retain an indication of any previous modifications" · (C) "include the text of, or the URI or hyperlink to, this Public License" · (a)(2) "in any reasonable manner based on the medium, means, and context" | ✅ (4.0 §3(a)(3)은 문서에 없음 → P3-3) |
| CC BY 2.0 §3 "the right to make such modifications as are technically necessary to exercise the rights in other media and formats" | 같음 | ✅ |
| 2.0 §4(a)·(b) | §4(a) "only under the terms of this License, and You must include a copy of, or the Uniform Resource Identifier for, this License" · "You must keep intact all notices that refer to this License and to the disclaimer of warranties" · §4(b) "the name (or pseudonym if applicable) of the Original Author if supplied; the title of the Work if supplied; … the Uniform Resource Identifier, if any, that Licensor specifies" | ✅ |
| CC0 1.0 "overtly, fully, permanently, irrevocably and unconditionally waives" · 출처 표시 조항 없음 · 상표·특허 비포기 | 같음. 출처 표시 조항 없음. §4(c) "Affirmer disclaims responsibility for clearing rights of other persons" | ✅ (§4(c)는 P3-3) |
| 공유마당 기증 안내: 자유이용 표기조건·표시예시·조건부이용 승인 필요 | 같음. "표기조건 : 저작물 ‧ 저작자명 ‧ 출처 및 이용조건 표기 필요, 제한 없이 자유롭게 이용할 수 있습니다." | ✅ 다만 "변경 가능 여부 문장 없음"은 부분적으로만 맞다 → P3-2 |

- **리사이즈·포맷 변환 = 변경 없음**: 타당하다.
  - 4.0은 §2(a)(4)가 "기술적 수정은 Adapted Material이 아니다"라고 명시한다.
  - 2.0·3.0은 §3이 "다른 매체·형식에서 권리를 행사하는 데 기술적으로 필요한 수정"을 허락한다.
  - 표시 크기에 맞춘 축소, JPEG/WebP 재인코딩(`next/image` 포함)은 이 범위로 볼 수 있다.
  - 자르기·색 보정·합성을 금지한 것(§4.5-11)도 맞다.
- **`public/images/` 저장 근거**: 타당하다. 4.0 §2(a)(1)·2.0/3.0 §3의 복제·배포 허락, CC0 Waiver, 기증 자유이용 "제한 없이 자유롭게 이용"으로 뒷받침된다.
  - §4.5-8은 2.0의 근거로 §4(a)를 들었다. §4(a)는 제한 조항이고 허락 조항은 §3이다(P3-1).
- **CC BY 3.0(기획자 미확인)**: 리뷰어가 직접 열었다. `creativecommons.org/licenses/by/3.0/legalcode`.
  - §3: "The above rights include the right to make such modifications as are technically necessary to exercise the rights in other media and formats."
  - §4(a): "You must include a copy of, or the Uniform Resource Identifier (URI) for, this License with every copy" · "You must keep intact all notices that refer to this License and to the disclaimer of warranties"
  - §4(b): 저작자(또는 Attribution Parties) 이름, "the title of the Work if supplied", URI.
  - → 2.0과 같은 구조여서 **3.0 허용은 적절하다**. 문서의 "직접 확인한 근거" 칸을 이 확인으로 채운다(P3-1).
- **지역판**(`cc-by-2.0-kr` 등): 법률 문서를 아무도 열지 않았는데 허용 값에 들어가 있다 → **P2-5**.

## 3. 출처 표시 서식 (항목 3, 정책 §4.5-11)
| 라이선스 | 요구(원문 기준) | 서식이 충족하는가 |
|---|---|---|
| CC BY 4.0 | 저작자 식별, (제공 시) 저작권·라이선스·면책 고지 유지, 자료 URI, 변경 표시, 라이선스 링크 | ✅ 저작자 + [원 페이지] + [라이선스] + "고지가 있으면 그대로 옮긴다" + 리사이즈만이라 변경 표시 없음 |
| CC BY 2.0·3.0 | 저작자 이름(필명), 제목(제공 시), Licensor가 지정한 URI, 라이선스 URI, 라이선스·면책 고지 유지 | ✅ `workTitle` 포함. 단 고지 문구를 담을 필드가 없다 → P2-2 |
| CC0 | 표시 의무 없음 | ✅ (관행 표시) |
| PD | 근거 | ✅ 근거 페이지 링크 |
| 기증 자유이용 | 저작물·저작자명·출처·이용조건 | △ 이용조건을 "기증저작물 자유이용"으로 고정했지만, 공식 표시예시의 이용조건 칸은 "CC BY 4.0"이다. 기증자 칸·출처 사이트명은 필드가 없다 → P2-2·P3-2 |
| 공공누리 제1유형(A-2 public) | 기존 §4.3 | ✅ (`workTitle`·`workYear` 착수 조건 유지) |

## 4. A-2 위험 기준과 다른 절의 정합 (항목 4)
- 의혹 대상 기관 건물(§4.5-5)은 §3.3 (나) 5항·§5.3-12와 같은 취지이고, "업무 무대 허용/대상 자체 불가"의 구분도 명확하다. ✅
- "자료사진 — 이 사건 당시 사진이 아닙니다" 문구(§4.5-4)와 ko·en 형식, 160자 제한은 ✅. 다만 "촬영 연도 미상"인 경우 10년 기준을 판단할 수 없다 → P3-4.
- 같은 사진 3건 한도(§4.5-6)는 guide §4-1 :118 "3건 이상 쓰였으면"과 같은 기준(4번째부터 불가)이다. ✅
- 400px(§4.5-7)은 §5.3-8과 같다. ✅
- 공사 중·옛 모습 금지(§4.5-4)는 ✅.
- **모순**: §5.1 4a 2번(:319)은 "기사가 '자료사진'으로 표기했거나 … 촬영 시점 표기·설명이 없으면 불가"이고, §5.3-6(:338)은 "옛 자료사진" 불가다. §5는 B 절이라 직접 충돌은 아니다. 그러나 결정 요약 행(정책 §0 :33 "사용자 결정 4a", §2 :85, PRD §0.5 :95)과 guide §4-1(불가 사진 줄 "다른 사건 자료사진(4a)", :118 "기관이 공개했으나 촬영일이 없는 사진은 쓰지 않는다")에 A-2 예외 표시가 없다 → P2-1.

## 5. §11-17 사진 저작자 이름 (항목 5)
- 해석 자체는 타당하다.
  - CC BY 2.0/3.0 §4(b)는 "name (or pseudonym if applicable) of the Original Author"를, 4.0 §3(a)(1)(A)(i)는 저작자 식별을 요구한다.
  - 사진 저작자는 게시물이 다루는 인물이 아니므로 PRD §6③(비공인 실명 규칙)의 대상이 아니다.
  - 이니셜로 바꾸면 표시 의무를 지키지 못한다.
- 그러나 **콘텐츠 크레딧(frontmatter·화면)과 운영 기록(오더·트리거·커밋·history)의 구분이 문서에 없다.**
  - 오히려 §4.5-12(:308)와 단계 2-2-8(:187)이 트리거에 "저작자"를 적으라고 요구한다. 이는 "운영 기록에는 사진 저작자 이름을 쓰지 않는다"는 운영 규칙과 정면으로 부딪친다 → **P2-4**.

## 6. 프로그래머 오더용 목록 (트리거 19-1 §3, 항목 6)
| 항목 | 있음 | 비고 |
|---|---|---|
| `kind: open` 신설과 비교(§8) | ✅ | 권장 ① 타당. 소개 문구·`koglTypeNumber` 보호 |
| license 값 | ✅ | 지역판은 P2-5 |
| `licenseUrl`·`workTitle`·`workYear` | ✅ | |
| 상세 표시 | ✅ | 필드 부족 → P2-2 |
| OG·JSON-LD·사이트맵 제외 | ✅ | |
| `next/image` | △ | 기증만 제외한다는 것과 정책 §4.5-11 "리사이즈 제외(허용)"가 어긋남 → P2-3 |
| 소개 문구 ko·en | ✅ | 현재 화면 문구와 대조함: ko "공공누리로 개방된 공공 사진을 쓸 때는 사진 아래에 공공누리 유형을 적습니다(현재 쓰는 사진은 없습니다)."·en KOGL 문장 — 기획자 서술이 맞다. 제안 문안은 P3-6 |
| validate 경고 | ✅ | |
| README | ✅ | |
| 현재 스키마 서술 | ✅ | `schema.ts`: `IMAGE_KINDS = ['self','public','news']`, `IMAGE_LICENSES = ['kogl-1']`, `sources[]` 대조는 `kind === 'news'`에만(:455~463), `faceNote`·`retrievedAt`·`sourcePageUrl` 필수 — 기획자 서술과 같다 |
| 빠진 것 | ❌ | {출처 사이트명}·{기증자}·저작권/면책 고지 필드, open의 `faceNote`·`caption` 필수와 `sourceType: url` 한정 명시, 표시 철회 요청 절차(`planning/image-removal-procedure.md`) → P2-2·P3-3 |

## 7. guide §4-1 반영 문안 (트리거 19-1 §4, 항목 7)
- 1~6번 문안은 정책과 맞는다.
- 현재 guide에서 함께 고쳐야 할 줄이 빠졌다 → P2-1·P3-8.
  - :103 "public·news 이미지는 모두 `image.caption` 필수" → open 추가.
  - 불가 사진 줄(:100) "다른 사건 자료사진(4a — 그 사건 당시 사진만)" → "A-2(§4.5) 제외".
  - :118 "기관이 공개했으나 촬영일이 없는 사진은 쓰지 않는다" → 인물 사진·사건 사진 한정으로 범위를 밝힌다.
  - :119 frontmatter 줄 "`sourcePageUrl`(= `sources[].url` 그대로)" → "news만. public·open은 라이선스를 본 원 페이지".

## 8. 저장소 독립·실명 grep (항목 8)
- 범위: 세 문서 diff의 `+` 줄 103줄과 기획자 19 트리거.
- pre-commit 패턴 0. 홈 경로·계정·메일 0. 1~3차 인물 패턴(전역) 0. 옛 id(`content/moved-ids.txt` 왼쪽 열) 0. 사진 기자 이름 0.
- 공유마당 공식 표시예시를 인용한 부분에 역사 인물(고인)의 이름 1곳이 있다(정책 :289, 기획자 트리거 :122). 공식 예시 인용이고 PRD §6③ D5(역사 인물) 예외라 결함이 아니다. 원하면 "{저작물}, 기증 {저작자}, 공유마당, {이용조건}" 형식으로 바꿀 수 있다(선택).

## 9. P 목록
### P2
- **P2-1 4a 상위 규정·요약 행이 A-2 예외와 19-1을 반영하지 않음**
  - 위치:
    - 정책 :30("**공공누리 제1유형**으로 허용"), :89("제1유형만"), :33·:85(4a 행)
    - PRD :98("공공누리 제1유형만"), :95(4a 행), :320 "순서" 불릿(A → B → 대체 카드)
    - guide §4-1 :96 순서, :100 불가 사진, :118 촬영일 없는 사진
  - 근거: 업로더·리뷰어는 요약 행과 guide를 먼저 읽는다. 이대로면 A-2 사진을 4a로 반려하거나, 19-1의 개방 라이선스를 모르고 지나간다.
  - 수정안:
    - 정책 :30·:89, PRD :98에 "(19-1: A-2 한정 CC BY(버전)·CC0·PD·기증 자유이용 추가)"를 덧붙인다.
    - 4a 행 세 곳에 "단 인물 없는 자료사진 A-2는 §4.5 예외(사용자 결정 2026-11-11)"를 넣는다.
    - PRD 순서 불릿을 A → B → A-2 → 대체 카드로 고친다.
    - guide 반영 문안(트리거 §4)에 :100·:118 보정 두 줄을 더한다.
- **P2-2 표시 서식에 필요한 값이 프로그래머 목록·§8 예시에 없음**
  - 위치: 정책 §4.5-11(:302 CC BY `{출처 사이트명}`, :306 기증 `{기증자}`, :302 "저작자가 요구한 고지 … 그대로 옮긴다"), §8 open 예시(:405~419), 트리거 19-1 §3-1.
  - 근거: 2.0/3.0 §4(a) "keep intact all notices that refer to this License and to the disclaimer of warranties", 4.0 §3(a)(1)(A)(ii)·(iv). 기증 표기조건 "저작물 ‧ 저작자명 ‧ 출처 및 이용조건".
  - 수정안:
    - `sourceSiteName`(또는 호스트에서 정하는 고정 규칙), 기증자(`creditName`으로 갈음할지 명시), 원 페이지 고지 문구 `creditNotice`(선택) 중 무엇을 쓸지 §8에 정한다.
    - open의 필수 필드에 `faceNote`·`caption`을 명시한다.
    - "open도 `sourceType: url` 게시물의 `image`에만"을 적는다.
- **P2-3 기증저작물의 변형 규칙이 세 곳에서 다름**
  - 위치:
    - 정책 §4.5-11 기증 줄(:306): "무변형(리사이즈 제외)으로만", 즉 리사이즈는 허용.
    - 단계 2-2-6(:185): "기증저작물은 무변형", 리사이즈도 불가로 읽힌다.
    - 트리거 19-1 §3-3: "기증에는 `next/image`를 쓰지 않는 쪽".
  - 근거(리뷰어 직접 열람): 공유마당 안내에 "저작권 기증은 2차적저작물작성권을 포함한 저작재산권의 전부를 기증하는 것"이라는 문장이 있고, 자유이용 표시예시의 이용조건이 "CC BY 4.0"이다.
  - 수정안: 하나로 정한다.
    - 권장: "상세 페이지 이용조건이 CC BY 4.0으로 표시된 기증 자유이용은 CC BY 4.0과 같이 다룬다(리사이즈·재인코딩 허용, 자르기 금지)".
    - 이용조건 표기가 다르면 무변형 + `next/image` 제외.
- **P2-4 운영 기록에 사진 저작자 이름을 적게 하는 문구**
  - 위치: 정책 §4.5-12(:308) "저작자", 단계 2-2-8(:187) "저작자(제공 기관)", §11-17(:458).
  - 근거: 운영 규칙(오더·트리거·커밋·history에 사진 저작자 이름 금지). §11-17은 콘텐츠 크레딧에 대한 해석이다.
  - 수정안:
    - 트리거에는 "저작자 표기 확인 — 개인/기관 구분, 이름은 frontmatter에만"으로 적고, 개인 이름은 쓰지 않는다. 기관명은 써도 된다.
    - §11-17과 guide 문안 5번에 "콘텐츠 크레딧과 운영 기록은 다르다 — 운영 기록에는 이름을 쓰지 않는다" 한 줄을 넣는다.
- **P2-5 법률 문서를 확인하지 않은 CC 지역판이 허용 값에 있음**
  - 위치: 정책 §4.5-2 표(:286 "지역판은 이름 명시, 예: 한국 2.0"), §8 예시(:412 `cc-by-2.0-kr`), 트리거 19-1 §3-1.
  - 근거: 정책 스스로 "라이선스 표시를 직접 보고" 쓰고, 근거 칸에 직접 열람을 요구한다(§4.5-2·12). 지역판은 조문이 별도 문서다. 기획자도 "지역판 개별 조문 못 봄"이라고 적었다.
  - 수정안:
    - 지역판은 "조문 확인 전까지 불가"로 두고, 값 목록에서 빼거나 "확인 후 추가"로 표시한다.
    - 확인할 때는 리뷰어가 해당 legalcode의 §3(기술적 수정)·§4(표시)를 대조한다.

### P3
- **P3-1** §4.5-2 표 "직접 확인한 근거" 칸에 3.0 항목을 더한다. 근거는 이 리뷰의 §3·§4(a)·§4(b) 대조(2절)다. §4.5-8의 2.0 저장 근거는 §4(a) 대신 §3(허락 조항)으로 바꾼다.
- **P3-2** 기증 안내 페이지 서술을 보완한다.
  - "변경 가능 여부 문장 없음"(§4.5-2 표 :289, §11-14) 옆에, 리뷰어가 직접 본 두 문장을 근거로 덧붙인다: 2차적저작물작성권을 포함한 전부 기증, 표시예시 이용조건 "CC BY 4.0".
  - 기증 서식의 이용조건 칸은 고정값 "기증저작물 자유이용" 대신 **상세 페이지에 표시된 이용조건 글자**를 쓴다.
  - 상업 이용 여부는 여전히 문장이 없다. 안내 페이지의 담당 부서 문의는 확인 필요로 유지한다.
- **P3-3** 표시 철회와 다른 권리.
  - 4.0 §3(a)(3) "If requested by the Licensor, You must remove any of the information required by Section 3(a)(1)(A)", 2.0/3.0 §4(a)도 같은 취지다. CC0 §4(c)는 다른 사람의 권리를 처리하지 않는다고 명시한다.
  - `planning/image-removal-procedure.md`와 §4.5에 "저작자가 표시 삭제를 요청하면 표시를 지우거나 사진을 내린다", "CC0·PD도 건물 외 제3자 권리(상표·초상)는 따로 본다"를 한 줄씩 넣는다.
- **P3-4** §4.5-4(:294) "촬영 연도 미상"이면 10년 기준을 판단할 수 없다. "미상이면 `현재 모습과 다를 수 있습니다.`를 항상 붙인다" 또는 "미상은 불가" 중 하나를 정한다.
- **P3-5** §4.5-9(:299) "A(public)는 `sources[]`와 무관하게 쓸 수 있다"는 사용자 결정 2의 글자에 없는 **기획자 해석**이다. A는 인물이 나오는 사진이다. "기획자 해석 — 슈퍼바이저 확인"으로 표시하거나, 슈퍼바이저 판단 표기를 붙인다.
- **P3-6** 소개 문구 제안(트리거 19-1 §3-5).
  - ko·en 모두 "공공누리 … 유형을 적습니다" 줄은 A(행사 당일 공식 사진, 인물 포함)도 덮는 문장이다. 그대로 두고 "(현재 쓰는 사진은 없습니다)"만 실제 사용 시점에 지운다. A-2 줄은 **별도 줄로 추가**한다. 지금 문안의 "이 문안으로 교체"는 KOGL 줄 삭제로 읽힌다.
  - "저작자가 허용한 개방 라이선스(CC BY 등)"에는 PD가 맞지 않는다. "공공누리·CC 라이선스·퍼블릭 도메인 등 자유 이용이 표시된 것만"처럼 고치기를 권한다.
- **P3-7** 묵은 참조 2곳.
  - 단계 지침 :190 "사용 확정은 사용자 결정 대기 — 정책 §4.5·§11-13" → §11-13은 결정 완료(19-1).
  - 정책 §4.2 공유마당 행(:258) "§19 조사표" → 정책에 §19는 없다. "기획자 19 트리거 §1-A"로 고친다.
- **P3-8** guide 반영 문안(트리거 19-1 §4)에 현재 guide 두 줄 보정을 더한다: :103 caption 필수에 open 추가, :119 frontmatter 줄 `sourcePageUrl` 설명.

## 10. 직접 연 근거 URL
- https://creativecommons.org/licenses/by/4.0/legalcode.en (WebFetch + curl 글자 대조)
- https://creativecommons.org/licenses/by/3.0/legalcode (WebFetch + curl)
- https://creativecommons.org/licenses/by/2.0/legalcode (WebFetch + curl)
- https://creativecommons.org/publicdomain/zero/1.0/legalcode (WebFetch), https://creativecommons.org/publicdomain/zero/1.0/legalcode.en (curl)
- https://gongu.copyright.or.kr/gongu/main/contents.do?menuNo=200092 (WebFetch + curl 글자 대조)
- 저장소 안: 현재 `docs/poster/guide.md` §4-1(:95~124), `src/lib/content/schema.ts`(:51·:58·:320·:444~470), `src/app/(ko)/about/page.tsx`·`src/app/(en)/en/about/page.tsx`(현재 작업 트리)

## 11. 커밋 경로 (이 리뷰 산출물)
- `docs/triggers/reviewer-67-planner-19-review-COMPLETE.md`
- `instructions/reviewer/processed/67-planner-19-review.md`
- (검토 대상 기획 문서 3개와 기획자 트리거·오더는 기획자 19 묶음 경로이며, P2 수정 뒤 함께 커밋)

## 67-1 (기획자 19-2 재확인 — 모델 ID `claude-opus-5-5`, 2026-11-11)
- 대상: 기획자 트리거 "## 19-2" 절.
- 확인한 diff: `git diff -- planning/card-image-policy.md planning/card-image-uploader-steps.md planning/prd.md planning/image-removal-procedure.md`(+113/−8).
- 대조한 현재 파일: `docs/poster/guide.md` §4-1(diff 없음), `src/components/post-detail.tsx`.
- 파일 수정은 이 절 추가뿐이다. git 쓰기 0.

### 판정: 🟡 조건부 통과 (리뷰 67의 P2 5·P3 8 모두 해소 · 새 P2 1 · 새 P3 8)
- 새 P2 1건은 `workYear` 필수와 생략 허용이 부딪치는 문제다(아래 67-1-P2-1). 한 줄만 고치면 되며, 프로그래머 오더를 내기 전에 정한다.

### 1. 리뷰 67 지적 해소 확인 (직접 Read)
| 지적 | 확인한 위치 | 결과 |
|---|---|---|
| P2-1 | 정책 :31(A-2 행에 19-1 확대)·:34(4a 행 "단 … A-2는 §4.5 예외")·:86·:90 / PRD 4a 행·"1+2" 행·순서 불릿(A → B → A-2 → 대체 카드, "A·B·A-2(open 포함) … `sourceType: url`") / guide :96·:100·:118 보정 문안(트리거 19-2 §4) | ✅ |
| P2-2 | 정책 §4.5-11(:303 필드 대응, `sourceSiteName`·`creditNotice`), :307(`licenseLabel`) · §8 예시 :417~419·필수 불릿 :424 · 프로그래머 목록 1·2 | ✅ (필드 사이 어긋남은 2절) |
| P2-3 | 정책 :307 · 업로더 단계 2-2-6 :185 · 프로그래머 목록 3 | ✅ 세 곳 문구가 같다("CC BY 4.0 표시면 CC BY 4.0과 같이, 아니면 무변형·`next/image` 제외"). 목록 3의 "kcc-donated 전부 제외" 선택안은 더 보수적이라 허용 범위 안이다 |
| P2-4 | 정책 §4.5-12 :309 · §11-17 · 단계 2-2-8 :187 · guide 추가 줄 4 | ✅ 콘텐츠 크레딧과 운영 기록을 구분해 적었고, 트리거에는 "개인/기관 구분만" 적게 했다 |
| P2-5 | 정책 :287 · §8 :414 · 단계 2-2-3 ②·2-2-7 · 프로그래머 목록 1 | ✅ `cc-by-2.0-kr`은 0회(grep). 지역판은 "조문 확인 전 불가" |
| P3-1 | :287(3.0 근거) · :299(2.0·3.0 §3 허락, §4(a)는 제한 조항) | ✅ |
| P3-2 | :290 · :307 | ✅ |
| P3-3 | 정책 §4.5-13 :310 · `image-removal-procedure.md` 끝 1줄 | ✅ |
| P3-4 | 정책 :295 | ✅ (업로더 단계 2-2-4는 그대로 → 67-1-P3-2) |
| P3-5 | :300 "기획자 해석 — 슈퍼바이저 확인 필요" 표시 | ✅ (다만 이번 확정은 아직 반영되지 않음 → 67-1-P3-1) |
| P3-6 | 트리거 19-2 §3 | ✅ 공공누리 줄은 유지하고, A-2 줄을 따로 추가했다 |
| P3-7 | 단계 :190 · 정책 :259("기획자 19 트리거 §1-A 조사표") | ✅ |
| P3-8 | 트리거 19-2 §4 표 :103·:119~120 | ✅ |

### 2. 새 필드의 일치 (`sourceSiteName`·`creditNotice`·`licenseLabel`)
| 필드 | 서식(§4.5-11) | §8 예시·필수 불릿 | 프로그래머 목록 1·2 | 업로더 2-2-7 | guide 문안 |
|---|---|---|---|---|---|
| `sourceSiteName` | {출처 사이트명}, open 필수 | 예시 있음 · 필수 | 필수 | 있음 | frontmatter 줄 있음 · 착수 조건 줄 있음 |
| `creditNotice` | 고지 원문(선택) + 기증자가 저작자와 다를 때 | 예시 "선택: 고지 원문" | 선택 · 고지 원문 | 선택 · 고지 원문 | 있음 |
| `licenseLabel` | 기증 이용조건 칸 | kcc-donated 필수 | kcc-donated 필수 | 있음 | 있음 |
- 세 필드 이름과 필수 여부는 네 곳에서 같다. ✅
- 어긋나는 곳:
  - `workYear`: 필수(§8 :424·목록 1)인데 §8 예시 주석(:420)은 "없으면 생략" → **67-1-P2-1**
  - `creditNotice`를 기증자 칸으로도 쓴다 → 67-1-P3-4
  - §8 필수 불릿에 `licenseUrl`·`creditName`·`creditNameEn`이 없다(목록 1에는 있음) → 67-1-P3-5

### 3. guide 반영 문안과 현재 guide 줄 대조 (`docs/poster/guide.md`는 diff 없음)
- :96 순서 줄, :100 불가 사진 줄, :102 `sources[]` 줄, :103 caption 줄, :118 "기관이 공개했으나 촬영일이 없는 사진은 쓰지 않는다." — 트리거 19-2 §4의 "전" 글자와 현재 줄이 모두 같다. ✅
- frontmatter 줄은 현재 **:120**이다(:119는 수어 통역사 줄). 트리거 표의 ":119~120"은 내용으로 찾으면 된다. 리뷰 67 본문의 ":119" 표기도 :120으로 정정한다.
- 추가 줄 2(`sources[]` 보정)의 "(A는 슈퍼바이저 확인 필요 — 정책 §4.5-9)"는 이번 확정과 맞지 않는다 → 67-1-P3-1.

### 4. 소개 문구 ko·en (트리거 19-2 §3)
- 공공누리 줄을 유지한 것은 맞다. 현재 화면의 ko·en KOGL 문장과 같고, A(인물이 있는 공식 사진)까지 덮는다. ✅
- A-2 줄 ko "공공누리·CC 라이선스·퍼블릭 도메인 등 자유 이용이 표시된 것만"은 PD·CC0·기증까지 포괄하므로 정확하다. en도 같은 뜻이다. ✅
- 다만 "사진 아래에 … 해당 사건 당시 사진이 아니라고 밝힙니다"가 사실이 되려면 open도 caption을 figcaption에 보여야 한다.
  - 현재 `post-detail.tsx:29~41`의 `ImageCreditCaption`은 credit이 있는 public·news에만 caption을 그린다.
  - 프로그래머 목록 2에 "open도 caption을 크레딧 줄 위에 표시"를 명시해야 한다 → 67-1-P3-6.
  - 첫 A-2 사진 게시 전 조건이므로 지금 문안이 틀린 것은 아니다.

### 5. 새 모순·남은 지적
- **67-1-P2-1** `workYear` 필수 vs 생략
  - 위치: 정책 §8 예시 주석 :420 "없으면 생략하고 caption에 '촬영 연도 미상'" ↔ §8 필수 불릿 :424 "`workYear` 필수" ↔ 프로그래머 목록 1 "필수".
  - 근거: §4.5-4가 "촬영 연도 미상" 사진을 허용하고(19-2에서 문구까지 정함), 업로더 단계 2-2-3은 창작년도를 상세 페이지에서 읽는다. 스키마가 필수로 구현되면 연도 미상 사진은 올릴 수 없다.
  - 수정안: "`workYear`는 상세 페이지에 창작년도가 있으면 필수, 없으면 생략(caption에 '촬영 연도 미상' + '현재 모습과 다를 수 있습니다.')"로 세 곳을 맞추고, 서식의 `({창작년도})` 괄호도 생략 규칙을 적는다.
- **67-1-P3-1** 슈퍼바이저 확정("A와 A-2는 `sources[]` 한정 규칙과 무관 — news(B)에만", 2026-11-11, 사용자 이의 시 변경)이 아직 반영되지 않았다. 고칠 곳:
  - 정책 §4.5-9 :300 "기획자 해석 — 슈퍼바이저 확인 필요"
  - 트리거 19-2 §4 추가 줄 2 "(A는 슈퍼바이저 확인 필요)"
  - 트리거 19-2 §5 표의 "§4.5-9 … 슈퍼바이저 확인 필요"
  - → "슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경"으로 바꾼다. 업로더 단계 2 1번·2-2 "언제"는 이미 "B에만"이다.
- **67-1-P3-2** 업로더 단계 2-2-4(:183)가 아직 "촬영 10년 이상 전이면"뿐이다. 정책 :295(연도 미상이면 항상 붙임)와 맞춘다.
- **67-1-P3-3** 기증 자유이용의 이용조건이 "CC BY 4.0"일 때
  - CC BY 4.0과 같이 다루므로 4.0 §3(a)(1)(C)대로 라이선스 링크가 필요하다.
  - 그런데 기증 서식(:307)에는 [원 페이지]만 있고, §8 주석(:415)은 `licenseUrl` = "기증제도 안내"로 정해 두었다.
  - 수정안: "`licenseLabel`이 CC BY 4.0이면 `licenseUrl`은 CC BY 4.0 legalcode이고 [라이선스] 링크를 표시, 그 밖이면 기증제도 안내".
- **67-1-P3-4** :307 "{기증자}가 저작자와 다르면 `creditNotice`에 적는다"
  - `creditNotice`는 "원 페이지 고지 원문"으로 정의된 필드라 뜻이 둘이 된다.
  - 수정안: 별도 선택 필드(`donorName` 등)를 두거나, "기증자가 저작자와 다르면 A-2로 쓰지 않는다"로 단순화한다.
- **67-1-P3-5** §8 필수 불릿(:424)에 `licenseUrl`·`creditName`·`creditNameEn`을 더한다(목록 1·예시와 일치시키기).
- **67-1-P3-6** 프로그래머 목록 2에 "open의 `caption`(영어 `imageCaption`)도 public·news처럼 figcaption 크레딧 위에 표시"를 명시한다(소개 문구 A-2 줄의 전제).
  - 같은 맥락에서 §8 :426 "caption은 현재 상세에 표시되지 않는다 → C1"은 프로그래머 15 C1 이후 사실이 아니다(`post-detail.tsx:29`). 기존부터 있던 문장이다.
- **67-1-P3-7** 업로더 단계 2-2 "언제"(:178)의 코드 착수 조건 목록에 `sourceSiteName`·`licenseLabel`이 없다(guide 착수 조건 줄에는 `sourceSiteName`이 있다). 목록을 맞춘다.
- **67-1-P3-8** 리뷰 67 본문 7절의 guide ":119 frontmatter 줄"은 :120이 맞다(리뷰어 표기 정정, 문서 수정 불필요).

### 6. 저장소 독립·실명 (+ 줄 기준)
- 범위: 네 문서 diff의 `+` 줄과 트리거 "## 19-2" 절, 합계 185줄.
- pre-commit 패턴 0. 홈 경로·계정·메일 0. 1~3차 인물 전역 패턴 0. 옛 id 0. 사진 저작자 이름 0.
- 리뷰 67 §8의 역사 인물 이름 인용은 정책·기획 트리거 모두에서 0회가 됐다(grep).

### 커밋 경로(67-1)
- `docs/triggers/reviewer-67-planner-19-review-COMPLETE.md`(이 절 추가)

## 67-2 (기획자 19-3 재확인 + guide §4-1 반영 확인 — 모델 ID `claude-opus-5-5`, 2026-11-11)
- 대상:
  - 기획자 트리거 "## 19-3" 절.
  - `git diff -- planning/card-image-policy.md planning/card-image-uploader-steps.md planning/prd.md planning/image-removal-procedure.md docs/poster/guide.md`(5파일 +127/−14, guide +10/−6).
  - 기획자 트리거 19-2 §2(프로그래머 목록 최종).
- 파일 수정은 이 절 추가뿐이다. git 쓰기 0.

### 판정: ✅ 통과 (커밋 게이트 — P1 0 · P2 0 · P3 4, 모두 커밋을 막지 않음)

### 1. 리뷰 67-1 지적 해소 (직접 Read)
| 지적 | 확인한 위치 | 결과 |
|---|---|---|
| 67-1-P2-1 `workYear` | 정책 §8 예시 주석 :422 · 필수 불릿 :426 · §4.5-11 CC BY 서식 :304(괄호 생략) · 업로더 2-2-7 :187 · 프로그래머 목록 1 · guide :124 "`workYear`(창작년도가 있으면)" | ✅ 다섯 곳 모두 "상세 페이지에 창작년도가 있으면 필수, 없으면 생략" |
| P3-1 슈퍼바이저 확정 | 정책 §4.5-9 :301 · guide :106 · 업로더 :179 | ✅ "슈퍼바이저 판단 2026-11-11, 사용자 이의 시 변경 — news(B)에만". 세 문서에서 "슈퍼바이저 확인 필요"는 0회(grep) |
| P3-2 | 업로더 2-2-4 :184 | ✅ "10년 이상 전이거나 촬영 연도 미상이면" |
| P3-3 | 정책 :308 · §8 :416 · 업로더 :187 | ✅ 기증 `licenseLabel`이 CC BY 4.0이면 `licenseUrl` = CC BY 4.0 legalcode + [라이선스] 링크 |
| P3-4 | 정책 :308 · §8 :419·:426 · 업로더 :187 · 목록 1 · guide :124 | ✅ `donorName` 분리. "`creditNotice`에 적는다"(기증자)는 0회 |
| P3-5 | 정책 :426 | ✅ `creditName`·`creditNameEn`·`licenseUrl` 추가 |
| P3-6 | 정책 §8 :428 · 목록 2 | ✅ "open도 caption을 크레딧 줄 위에 표시". 옛 "표시되지 않는다" 문장도 고침 |
| P3-7 | 업로더 :179 | ✅ `sourceSiteName`·`licenseLabel`·`donorName`·open caption 표시 추가 |
| P3-8 | — | ✅ (문서 수정 불필요) |

### 2. guide §4-1 diff ↔ 트리거 19-2 §4 최종 문안 + 19-3 변경 (글자 대조)
| guide 줄(현재) | 문안 | 결과 |
|---|---|---|
| :96 순서 | 19-2 §4 표 :96 "후" | ✅ 글자 같음 |
| :97 A-2 줄 | 19-2 §4 추가 줄 1 | ✅ 본문 글자 같음(머리만 굵게 `- **A-2 인물 없는 자료사진**(…)` 서식) |
| :98 정부 공식 사진 | 19-2 §4 추가 줄 3 = 19-1 §4-4 | △ 뜻은 같지만 "(통일부 보도자료 페이지 등 — 정책 §4.2 표 참조)"가 "(정책 §4.2)"로 줄었다 → P3-2 |
| :99 크레딧 구분 | 19-2 §4 추가 줄 4 | ✅ 글자 같음(머리 "크레딧 구분:" 추가) |
| :100 착수 조건(A-2) | 19-2 §4 추가 줄 5 + 19-3(`licenseLabel`·`donorName`·open caption) | ✅ 19-3 반영. "공공누리 제1유형 A-2(public)도 `workTitle`·`workYear` 배포 뒤"가 더해졌는데, 업로더 :179와 같은 내용이다 |
| :104 불가 사진 | 19-2 §4 표 :100 "후" | ✅ |
| :106 `sources[]` 줄 | 19-2 §4 추가 줄 2(19-3 괄호 변경) | ✅ |
| :107 caption 필수 | 19-2 §4 표 :103 "후" | ✅ |
| :122 촬영일 없는 사진 | 19-2 §4 표 :118 "후" | ✅ 글자 같음 |
| :124 frontmatter | 19-2 §4 표 :119~120 "후" + 19-3(`workYear` 조건·`donorName`) | ✅ |

### 3. 문서 사이 정합·새 모순
- 정책·업로더 지침·guide·프로그래머 목록은 `workYear`·`donorName`·`licenseLabel`·`licenseUrl`(기증)·`sources[]`(B에만)·caption 표시·착수 조건에서 같은 표현이다.
- 남은 P3(커밋 게이트 아님):
  - **67-2-P3-1** guide :108 기존 줄 "🔴 **착수 조건**: 얼굴 없는 사진은 지금 가능."
    - A-2(얼굴 없는 자료사진)는 코드가 배포되기 전에는 불가(:100)라서, 글자만 보면 서로 어긋난다.
    - 수정안: "(A·B의) 얼굴 없는 사진은 지금 가능, A-2는 위 착수 조건"으로 범위를 밝힌다.
  - **67-2-P3-2** guide :98 정부 공식 사진 줄이 19-1 §4-4 문안보다 줄었다. 예시 "통일부 보도자료 페이지 등"이 빠졌을 뿐 뜻은 같다. 필요하면 되살린다.
  - **67-2-P3-3** 정책 §4.5-11 CC BY 서식의 "`workYear`가 없으면 괄호 생략"은 ko 서식 뒤에만 있다. en `({year})`에도 같이 적용된다고 한 단어를 더한다(프로그래머가 혼동하지 않게).
  - **67-2-P3-4** guide :98~:100의 정부 공식 사진(A)·크레딧 구분·착수 조건이 A-2 줄의 하위 목록으로 들어갔다. 정부 공식 사진은 A 규칙이라 들여쓰기 위치가 어색하다(내용 문제 아님, 선택).

### 4. 저장소 독립·실명·사진 저작자 이름 (+ 줄 기준)
- 범위: 5파일 diff의 `+` 줄과 트리거 "## 19-3" 절, 합계 153줄.
- pre-commit 패턴 0. 홈 경로·계정·메일 0. 1~3차 인물 전역 패턴 0. 옛 id 0. 역사 인물 이름 0. 사진 저작자 이름 0.

### 커밋 경로(67-2)
- `docs/triggers/reviewer-67-planner-19-review-COMPLETE.md`(이 절 추가)
- 이 게이트 대상(통과):
  - `planning/card-image-policy.md`
  - `planning/card-image-uploader-steps.md`
  - `planning/prd.md`
  - `planning/image-removal-procedure.md`
  - `docs/poster/guide.md`
  - `docs/triggers/planner-19-image-expansion-archive-kogl-COMPLETE.md`
  - `instructions/planner/processed/19-image-expansion-archive-kogl.md`
  - `instructions/reviewer/processed/67-planner-19-review.md`
