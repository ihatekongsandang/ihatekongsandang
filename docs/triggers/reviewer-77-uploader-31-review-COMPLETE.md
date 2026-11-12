# 리뷰어 77 — 업로더 31 검토 (자료사진 A-2 묶음 6: 장소 확인 출처·경계 철책·법원·3a 재판정) — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-12
- 오더: `instructions/reviewer/processed/77-uploader-31-review.md`(이동)
- 대상: 업로더 31 트리거 §11 경로(ko·en 각 12건, `public/images/` 9개). gotdemcatch·attendkdz 변경은 제외했다.
- 기준: 정책 §4.5(개정 21), 업로더 지침 단계 2-2, guide §4-1, 리뷰 76
- 파일 수정 0(이 트리거와 오더 이동만), git 쓰기 0, 빌드 0. `npm run validate:content`만 실행했다.
- 원 페이지와 원본은 저장소 밖 `$TMPDIR/r77`에만 받았다.

## 판정: ✅ 통과 (P1 0 · P2 0 · P3 6, 모두 커밋을 막지 않음)

## 1. 채택 8건 + 교체 1건
### 1-1. 라이선스 원 페이지 직접 대조
| 키 | 원 페이지 | 직접 본 것 | 업로더 기록과 |
|---|---|---|---|
| PN | 위키미디어 `File:Palacio_Nacional_square_at_night.jpg` | "licensed under the Creative Commons Attribution-Share Alike 4.0 International license" · Source "Own work" · Date 2022-03-05 · Author = 업로더 | ✅ |
| WT | 위키미디어 `File:WORLD_TRADE_CENTER,_MEXICO_CITY_(…)_-_Flickr.jpg` | CC BY 2.0 · FlickreviewR 2021-05-04 통과(cc-by-2.0) · EXIF 촬영 2017-04-13 · `FoP-Mexico` | ✅ |
| BH | 위키미디어 `File:Blue_House_Seoul_3.jpg` | 업로더 30·리뷰 75에서 확인한 것과 같은 파일(저장본 그대로) | ✅ |
| DE | 공유마당 wrtSn=13320631 | 이용조건 "…의 "DMZ 2712" 은 CC BY 라이선스로 제공됩니다" + 링크 `/licenses/by/4.0/deed.ko` · **키워드 "강원도 철원 전쟁 통일 철책 DMZ …"** · 창작년도 2009-12-15 · 출처 한국저작권위원회 | ✅(키워드에 "군인·총" 없음) |
| DD | 공유마당 wrtSn=13320627 | 같은 이용조건·링크 · **키워드 "강원도 철원 …"** · 창작년도 **2022-09-04** | ✅. caption 2009(EXIF) / `workYear` 2022(원 페이지)는 정책 §4.5-4 그대로 |
| S08 | 서울연구데이터서비스 node/60608 | 06O00703Dc62000 · 2020/06 · 대상지 대법원 · 링크 `/licenses/by/4.0/deed.ko` + 공공누리 배지 | ✅ |
| S11 | node/60611 | 06O00706Dc80000 · 2020/06 · 대상지 대법원(세부대상지에 대검찰청 포함) · 같은 링크 | ✅(P3-2) |
| S33 | node/60733 | 06O02306Dc82000 · 2020/06 · 대상지 법조단지 · 세부대상지 서울고등법원·서울중앙지방법원 · 같은 링크 | ✅ |

### 1-2. 사진 직접 열람
Read로 9장을 모두 열었다. 큰 4장은 저장소 밖에서 축소 사본을 만들어 봤고, `jeichi-front` 철책 부분은 원본 크기로 잘라 따로 봤다.
- **PN**: 국립궁전 야경이다. 광장 인물은 점 크기뿐이고 덧씌운 글자는 없다.
- **WT**: WTC 타워 외벽만 보인다. 사람 0.
- **BH**: 청와대 본관이다. 원경 관람객은 업로더 30 측정 그대로(얼굴 최대 24px / 짧은 변 2680px, 1% 미만).
- **DE**: Y자 지주·윤형 철조망의 경계 철책이다. 원본 크기로 보니 겹 철책 구간일 뿐 초소·감시장비·군인은 없다. 걸린 타이어 두 개는 표지물이다.
- **DD**: 언덕을 가로지르는 철책과 순찰로. 사람·초소 0.
- **S08**: 대법원 청사 항공 정면. 사람 0.
- **S11**: 길 건너에서 본 대법원 청사와 도로. 차량 번호판·현수막 글자는 읽히지 않는다(P3-2).
- **S33**: 서울법원종합청사 항공 정면. 사람 0.
- 짧은 변: 600~1280px, 모두 400px 이상이다.

### 1-3. 메타데이터·caption·재사용
- **EXIF·XMP**: 저장 파일 12개 모두에서 `Artist`가 비어 있고 GPS 0이다.
- 법원 3장의 XMP는 태그 이름을 전부 나열해 확인했다. `dc:creator`·`By-line`·`SerialNumber`·GPS는 없고, 남은 것은 렌즈·편집 이력·드론 자세값이다. 개인정보성 필드는 0이다. ✅
- caption 형식·연도:
  - ko·en 12쌍이 3형식(기본·3a)에 맞는다.
  - 3c 끝 문구(장소 근거)와 법원 결과 문구가 정책 §4.5-3c ④·§4.5-5 ②와 글자가 같다.
  - 2009년 사진에는 "현재 모습과 다를 수 있습니다."가 붙어 있다.
  - 길이는 ko 38~74자, en 83~158자로 모두 160자 이하다.
- 재사용: 같은 원본 최대 3건(BH)으로 6건 한도 안이다. validate의 재사용·인접 경고 0.
- 연작 간격(트리거 §5): DMZ 연작 10·11칸, 대법원 묶음 19칸 이상, 법조단지 15칸 이상. 연작 총 사용 3·5·5건으로 8건 이내다.
- 대상별 하한: 대법원 5건 · 원본 3장, 서울법원 5건 · 원본 3장. 둘 다 max(3, 2) = 3 이상이다. 리뷰 76 P3-4가 해소됐다. ✅

## 2. 장소 확인 출처 2건 (+ 기존 출처 1건)
| id | 확인 | 결과 |
|---|---|---|
| `neveragain` | 아이뉴스24 `inews24.com/view/2009071`(입력 2026.09.25). 원문 "이 대통령은 이날 멕시코 대통령궁인 '팔라시오 나시오날'에서 한-멕시코 정상회담 … 공동언론발표" · "24일(현지 시각) … 정상회담" | ✅ 원 매체·행사명·날짜 일치·장소를 글자로 적음. `sources[]`에 `type: 언론`으로 추가됐다. `updatedAt` 변경 0. caption 끝 "장소는 아이뉴스24 보도 기준입니다." / "Location per iNews24 reporting." |
| `newsbanhana` | 파이낸셜뉴스 `fnnews.com/news/202609260405526032`(2026-09-26). 원문 "이 대통령 부부는 이날 멕시코시티 월드트레이드센터 마야홀에서 열린 K-엑스포 행사장을 방문했다." | ✅ WT 사진은 같은 WTC 타워다(행사장 마야홀은 WTC 단지 안). 같은 건물로 판단한다. 추가·`updatedAt` 불변·끝 문구 ✅ |
| `idaenamright` | 기존 출처 뉴시스의 사진 설명 "3일 청와대에서 열린 국무회의" | ✅ 출처를 더하지 않아도 되는 경우다. 끝 문구로 근거를 밝혔다(P3-6 선택) |

## 3. 법원 3건
- `kctu-appeal`: 제목 "(2025년 대법원 확정)" → 최종 판단 법원은 대법원이다(§4.5-5 ① 끝 문장). 확정 사건이라 결과 문구가 없는 것이 맞다. ✅
- `firstincome`: 제목 "2심 감형 후 대법원 확정" → 대법원 ✅
- `cheongju`: 제목 "관련자 유죄 확정" + 본문 "대법원은 2025년 3월 … 확정"(기획 21 §10 조건) → 대법원 ✅

## 4. 재판 caption 보정 4건
- 미확정 근거는 업로더 트리거 §8 그대로이고, 본문과 대조해 맞다. 리뷰 76에서 본 본문 표기와도 같다.
  - yoon: 1심 무죄
  - 707: 1심, "확정되지"
  - sewodream: 1심(본문의 "대법원 확정"은 별건)
  - eodguri: 항소심 결심
- ko "재판 결과를 뜻하지 않습니다." / en "The photo does not indicate the outcome of the trial." 4건 모두 글자가 같다. en은 134~147자다. sewodream en은 대상 표현을 줄여 160자 안으로 맞췄다. ✅
- `eodguri` 교체: 60733은 라이선스(CC BY 4.0 링크)를 확인했고 대상지가 법조단지(서울고법 포함)라 항소심 법원과 일치한다. caption·`updatedAt`은 그대로다. ✅(판단 요청 ③)

## 5. ❌ 6건 판정
| id | 판정 | 리뷰어 |
|---|---|---|
| `solsol` | 17건 중 10건은 장소가 없다(장소가 둘 이상) | ✅ 맞다(§4.5-3c ② — 장소가 둘 이상이면 그 수준까지만, 10건은 도시도 불명) |
| `issueradar` | 장소 근거가 포털 전재본뿐 | ✅ 맞다(§4.5-3c ①). 다만 다시 해 볼 길이 있다(P3-5) |
| `tessa` | 지점 → 구역 비명시 광역 사진 후보 0 | ✅ 맞다(판단 요청 ①) |
| `kctu-itaewon` | 쓸 수 있는 대법원 사진이 모두 같은 촬영 묶음이라 89와 3칸 | ✅ 정책 ⑤대로. 다른 출처 사진이 없어 보수적이라 할 수 없다 |
| `bbang630-518` | 제목의 판단 주체 "법원" = 광주고법(하급심)으로 읽힘, 광주고법 사진 없음 | ✅ "애매하면 불가". kctu-appeal은 제목에 "대법원 확정"이 적혀 있어 경우가 다르므로 일관된다 |
| `changwon` | 창원지법 후보가 "저작자 미상·출처 공란" | ✅ §4.5-2 |
| 정부서울청사 교체 2건 | 최근 사진 0 → 유지 | ✅ §4.5-6 ⑦ 후단(문구 이미 있음) |

## 6. 판단 요청 4건 — 리뷰어 권고
1. **tessa: 지점 게시물로 보고 ❌ 유지.**
   - 제목이 "철원 민간인 GOP 철책 접근 사건"이라는 **특정 사고**다. 파주 25사단 사고 10건(본문에 지역명 + 특정 사고 = 지점)과 같은 구조라, 같게 판정해야 일관된다.
   - 기획 21 §10의 "✅ 조건부" 예상은 이 정의와 어긋난다. 정책 §4.5-3a (나)에 **"특정 사고·사건을 다루면 본문이 지역을 적어도 지점"**이라는 판정 순서를 넣어 달라고 기획자에게 요청한다(P3-3).
   - 초안(트리거 §7)은 구역 비명시 광역 철책 사진을 찾을 때까지 보류한다.
2. **서울연구데이터서비스 연작 = "같은 대상지 촬영 묶음" 해석을 받아들인다. cheongju(208)는 그대로 둔다.**
   - 정책 ⑤ "같은 저작자·같은 촬영 시기"를 글자대로 읽으면, 기관이 찍은 서울 전역 기록사진 수십 장이 한 연작이 된다. 그러면 8건 상한이 이미 깨져 규칙이 쓸모없어진다.
   - 규칙의 취지(리뷰 75 1-3: 피드에서 같은 장면처럼 보이는 것을 막기)에 맞는 단위는 대상지 묶음이다.
   - 206(서울법원종합청사 항공)과 208(대법원 항공)은 다른 건물이라 같은 사진의 반복으로 보이지 않는다.
   - 이 해석을 정책 ⑤에 명문화해 달라고 기획자에게 요청한다(P3-4).
3. **eodguri 교체: 승인.** 라이선스·대상(서울고법 항소심 ↔ 법조단지)이 맞다. 하한 ⑥을 채우는 데도 도움이 되고, 이미지 교체 규칙대로 `updatedAt`은 그대로다.
4. **shindawit-nk-mdl-50 caption: 고친다(다음 묶음, P3-1).**
   - 광역 게시물((가))에 철원 구역 사진(키워드 "강원도·철원", wrtSn=13320620)을 썼으므로 caption에 구역을 적고 (가) 기본 형식을 써야 한다.
   - 수정안 ko `자료사진: 강원 철원 비무장지대 철책(2009) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.` / en `Archive photo: DMZ fence in Cheorwon, Gangwon (2009) — not taken at the time of this event. It may differ from how it looks today.`
   - 이번 묶음의 `jeichi-front`와 같은 형식이다.

## 7. validate
- `npm run validate:content`: exit 0, 420/420, 오류 0, **경고 22**. 대표 이미지는 `self 0 · public 1 · open 52 · news 33`.
- 리뷰 73 시점 경고 24건과 비교하면, 차이는 리뷰 73의 새 경고 2건(nowandhere 인접·khan en caption)이 사라진 것뿐이다(업로더 30-1이 고친 것). **새 경고 0.**
- 대상 12건 중 경고가 있는 곳은 `yoon`·`neveragain`의 description 길이 경고뿐이고, 둘 다 이전부터 있던 것이다.

## 8. 저장소 독립·민감정보
- 범위: 대상 24파일 diff의 `+` 줄(`creditName` 줄 제외)과 업로더 트리거, 합계 437줄.
- pre-commit 패턴 0, 홈·임시 절대경로 0, 계정·메일 0, 1~3차 실명 전역 패턴 0, 옛 id 0.
- 업로더 트리거에 이번 `creditName` 값(기관명 제외)이 나오는 곳 0이다. WT 파일 이름 안의 저작자 표기는 트리거에서 `(…)`로 가렸다. frontmatter `sourcePageUrl`에는 원 페이지 주소로서 남는다(콘텐츠 크레딧 범위).
- 이미지 메타데이터: 1-3 참조(개인정보성 필드 0).

## 9. P 목록 (모두 P3)
- **P3-1** `content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md` caption 줄·en `imageCaption` 줄 — 구역(철원) 누락·형식. 수정안은 6-④.
- **P3-2** `2026-09-28-firstincome-kctu-spy-case-summary`의 S11은 원 페이지 세부대상지에 대검찰청이 있고, 사진 오른쪽의 큰 건물도 대검찰청으로 보인다. 제목이 대법원 확정이라 큰 문제는 아니다. 원하면 ko alt를 "길 건너편에서 본 대법원 청사와 주변 법조단지 건물, 앞 도로"로 정확히 바꾼다(선택).
- **P3-3** (기획자) 정책 §4.5-3a (나)에 "특정 사고·사건 게시물 = 지점(본문의 지역명과 관계없이)"을 넣고, 기획 21 §10의 `tessa` 예상을 바로잡는다.
- **P3-4** (기획자) 정책 §4.5-6 ⑤ "연작"의 단위를 "같은 대상지 촬영 묶음(같은 기관의 기록사진은 대상지 단위)"으로 명문화한다.
- **P3-5** `issueradar`는 원 매체(조선일보) 본문이나 청와대 공식 브리핑 게시물에서 "청와대에서 열린 NSC 상임위원회" 원문을 찾으면 다시 할 수 있다(다음 묶음 선택 탐색).
- **P3-6** (선택) `idaenamright` caption "청와대 본관"은 근거 문구 "청와대에서 열린 국무회의"보다 좁다. 이미 게시된 청와대 게시물들과 같은 표기라 유지해도 된다. 정밀하게 하려면 "청와대 본관(청와대 경내)"으로 쓴다.

## 10. 직접 연 근거
- https://www.inews24.com/view/2009071 · https://www.fnnews.com/news/202609260405526032 (WebFetch — 장소 문장)
- 위키미디어 공용 PN·WT 파일 페이지(WebFetch — 라이선스·Source·Date·FlickreviewR·FoP)
- 공유마당 wrtSn=13320631·13320627, 서울연구데이터서비스 node/60608·60611·60733 (curl — 이용조건·키워드·통합코드·대상지·라이선스 링크)

## 11. 최종 커밋 경로 (업로더 31 §11과 같음)
- 콘텐츠 ko 12 · en 12 (`content/posts/{id}.md` · `content/posts-en/{id}.md`)
  - 이미지 추가 8건:
    - `2026-09-26-neveragain-mexico-tariff-visit`
    - `2026-09-26-newsbanhana-lee-kexpo-mexico`
    - `2026-11-03-idaenamright-youth-sns-limit-review`
    - `2026-10-05-jeichi-front-corps-unloaded-guard`
    - `2026-10-01-rekor-15div-mine-field`
    - `2026-07-05-idontknowpolitics-kctu-appeal`
    - `2026-09-28-firstincome-kctu-spy-case-summary`
    - `2026-07-25-idontknowpolitics-cheongju-spy-directives`
  - caption 보정 4건:
    - `2026-07-28-geonwoo-yoon-final-statement-australia`
    - `2026-08-06-owloffreedom-707-commander-sentencing`
    - `2026-09-24-sewodream-nk-agent-private-detective`
    - `2026-10-23-eodguri-kimyonghyun-drone-appeal`
- 이미지:
  - 새 폴더 8개 `public/images/{위 8건 id}/thumb.jpg`
  - 교체 1개 `public/images/2026-10-23-eodguri-kimyonghyun-drone-appeal/thumb.jpg`
- 문서:
  - `docs/triggers/uploader-31-a2-batch-6-place-fence-court-COMPLETE.md`
  - `instructions/uploader/processed/31-a2-batch-6-place-fence-court.md`
  - `docs/triggers/reviewer-77-uploader-31-review-COMPLETE.md`
  - `instructions/reviewer/processed/77-uploader-31-review.md`
  - `history/2026-11-12.md`(업로더가 적은 대로, 이 세션 줄만 — 슈퍼바이저 확인)
- 넣지 않는 것: gotdemcatch·attendkdz 변경, 그 밖의 history·docs/tools 파일
