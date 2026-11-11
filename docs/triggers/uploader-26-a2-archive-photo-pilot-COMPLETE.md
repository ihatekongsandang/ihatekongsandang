# 업로더 26 완료 — 인물 없는 자료사진(A-2) 시범 10건

- 작성: 2026-11-11 · 반공-업로더 (Opus 5.5) · 오더 `instructions/uploader/processed/26-a2-archive-photo-pilot.md`
- 착수: 슈퍼바이저의 코드 배포 완료 알림(커밋 0a1c8da) 수신 뒤
- 결과: **10건 중 성공 8 · 실패 2**(DMZ·철책 2건 — 이번 한정 출처에 맞는 사진 없음)
- 빌드·git 쓰기 없음. `src/`·설정 수정 없음.

## 선행 문서 검토
CLAUDE.md · docs/poster/guide.md §4-1 · planning/card-image-policy.md §4.5·§8 · planning/card-image-uploader-steps.md 단계 2-2 · content/README.md §3.6(open 예시·필드 표) · docs/triggers/programmer-19-image-kind-open-a2-COMPLETE.md

## 출처 — 서울연구데이터서비스 「사진으로 본 서울」(서울연구원 운영)
- 저작자 구분: **기관**(서울특별시). 사진 EXIF 저작권 항목(Tag 33432) 값 `서울특별시(Seoul Metropolitan Government)`로 확인 → `creditName: 서울특별시`, `creditNameEn: Seoul Metropolitan Government`.
- 라이선스를 본 위치 ① 각 사진 상세 페이지 하단 저작권 영역: 배지 대체 텍스트 `공공누리 제1유형: 출처표시` + `크리에이티브 커먼즈 라이선스 CC BY`, CC 배지 링크 `https://creativecommons.org/licenses/by/4.0/deed.ko`(배지 이미지 경로 `/l/by/4.0/88x31.png`). ② 같은 영역의 "저작권 표기방법 안내"(https://data.si.re.kr/node/65064) 원문 한 줄: "자유이용이 가능한 저작물은 「공공누리 제1유형(출처표시)」와 「크리에이티브 커먼즈 라이선스 CC BY 4.0」 두 가지 라이선스가 함께 부착되어 있으므로, 사진 상세페이지에서 해당 표시를 확인한 후 이용해 주십시오."
- 버전: **CC BY 4.0**(안내 페이지 문구와 상세 페이지 링크가 4.0으로 일치). 이번 시범 한정에 따라 공공누리 제1유형이 아니라 **CC BY 4.0으로 표시**(`kind: open`, `license: cc-by-4.0`). 두 라이선스가 함께 붙은 것은 모순이 아니라 병행 제공으로 판단함 — 🟡 리뷰어 확인 요청. 상세 페이지 배지 대체 텍스트 자체에는 버전 글자가 없고 링크·안내 문구에 있다는 점도 함께 봐 주세요.
- 재업로드 아님: 서울시 경관기록화 사업 사진을 서울연구원이 운영하는 자체 서비스에 직접 공개한 기관 원 저작물. 위키미디어 공용에 같은 계열 사진의 재업로드본이 있으나 쓰지 않고 원 페이지를 `sourcePageUrl`로 씀.
- 안내 페이지 ③(개인·단체와 저작권을 공유한 자료는 이용 금지)은 두 배지가 붙지 않은 자료에 해당 — 쓴 4장 모두 상세 페이지에 두 배지 있음.
- 🟡 확인 필요: 안내 페이지가 권하는 표기 "서울경관기록화 사업 YYYY, 서울특별시"의 YYYY(사업 연도 — 상세 "출처" 참고)는 상세 페이지에 "출처" 항목이 보이지 않아 확인하지 못함 → `creditNotice`는 넣지 않음(추측 금지). 필요하면 기관 문의.
- 저장: 상세 페이지 이미지(`/sites/default/files/photos6/{통합코드번호}.jpg`)를 그대로 복사. 리사이즈·변환·자르기·보정 없음(받은 파일 = 저장 파일).

## 사진 4장
| 키 | 원 페이지 | 통합코드번호 | 대상 | 촬영년/월(상세) | 원본=저장 해상도 | 용량(B) | 사람 확인 | 사용 건수 |
|---|---|---|---|---|---|---|---|---|
| A | https://data.si.re.kr/node/62226 | 06T00305Da82000 | 국회의사당 항공 정면(앞마당·한강) | 2020/02 | 900×651 | 301,651 | 항공 원경, 알아볼 수 있는 사람 없음(차량만) | 3 |
| B | https://data.si.re.kr/node/62227 | 06T00306Da82000 | 국회의사당 항공(주변 건물·한강 다리) | 2020/02 | 900×613 | 288,211 | 항공 원경, 사람 없음 | 3 |
| C | https://data.si.re.kr/node/62584 | 06T05004Dc40053 | 한강 건너편 국회의사당(당산철교 쪽) | 2020/10 | 900×581 | 191,411 | 강 건너 원경, 사람 없음(물 위 부표·새) | 1 |
| D | https://data.si.re.kr/node/60607 | 06O00702Dc82000 | 대법원 청사 항공 정면 | 2020/06 | 900×618 | 292,590 | 항공, 사람 없음(정문 앞 도로 차량만, 펜스 현수막 글자는 원본 해상도에서 읽히지 않음) | 1 |
- 워터마크·로고·덧씌운 글자: 4장 모두 없음(직접 열람). 공사 중·옛 모습 아님. 촬영 2020년(6년 전, 10년 미만) → "현재 모습과 다를 수 있습니다" 붙이지 않음.
- 같은 원본 3건 한도: A 3·B 3·C 1·D 1(한도 안). 작업 전 저장소 사용 0건(`data.si.re.kr` 검색).

## 건별 기록
| # | id | 고른 이유(§4.5-3·5 점검) | 사진 | 바꾼 파일:줄 ko / en · 저장 | 저장 해상도 | 결과 |
|---|---|---|---|---|---|---|
| 1 | `2026-09-16-pickmag-china-visa-free-petition` | 국회 국민동의청원 법사위 회부 — 국회가 업무 무대(§4.5-5 허용), 국회 비난형 아님 | A | `content/posts/2026-09-16-pickmag-china-visa-free-petition.md:11-25` / `content/posts-en/2026-09-16-pickmag-china-visa-free-petition.md:5-6` · `public/images/2026-09-16-pickmag-china-visa-free-petition/thumb.jpg` | 900×651 | 성공 |
| 2 | `2026-11-05-dduddd-kimtaekyu-expulsion-resolution` | 본회의 결의안 가결 보도 — 국회 업무 무대, 제목은 표결 사실 전달형 | A | `content/posts/2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md:10-24` / `content/posts-en/2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md:5-6` · `public/images/2026-11-05-dduddd-kimtaekyu-expulsion-resolution/thumb.jpg` | 900×651 | 성공 |
| 3 | `2026-09-27-hoon2-jeonhyunhee-land-lease` | 국회 발의 법안 팩트체크 — 국회 법안 게시물 → 국회의사당(§4.5-3 예시) | A | `content/posts/2026-09-27-hoon2-jeonhyunhee-land-lease.md:13-27` / `content/posts-en/2026-09-27-hoon2-jeonhyunhee-land-lease.md:5-6` · `public/images/2026-09-27-hoon2-jeonhyunhee-land-lease/thumb.jpg` | 900×651 | 성공 |
| 4 | `2026-09-30-rekor-foreign-committee-dp-absence` | 외통위 현안질의 — 비판 대상은 특정 정당의 불참이지 국회 자체가 아님 | B | `content/posts/2026-09-30-rekor-foreign-committee-dp-absence.md:10-24` / `content/posts-en/2026-09-30-rekor-foreign-committee-dp-absence.md:5-6` · `public/images/2026-09-30-rekor-foreign-committee-dp-absence/thumb.jpg` | 900×613 | 성공 |
| 5 | `2026-09-14-yongkeun-justice-hearing-lee-trial` | 대법관 후보자 인사청문회 질의(국회) — 국회 업무 무대 | B | `content/posts/2026-09-14-yongkeun-justice-hearing-lee-trial.md:13-27` / `content/posts-en/2026-09-14-yongkeun-justice-hearing-lee-trial.md:5-6` · `public/images/2026-09-14-yongkeun-justice-hearing-lee-trial/thumb.jpg` | 900×613 | 성공 |
| 6 | `2026-09-28-instagram-chief-justice-audit-witness` | 법사위의 대법원장 국감 증인 채택 — 국회 업무 무대, 국회 위법 단정 없음 | B | `content/posts/2026-09-28-instagram-chief-justice-audit-witness.md:10-24` / `content/posts-en/2026-09-28-instagram-chief-justice-audit-witness.md:5-6` · `public/images/2026-09-28-instagram-chief-justice-audit-witness/thumb.jpg` | 900×613 | 성공 |
| 7 | `2026-11-04-leejinsook-martial-law-soldiers-presser` | 국회 기자회견 — 국회 업무 무대 | C | `content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md:13-27` / `content/posts-en/2026-11-04-leejinsook-martial-law-soldiers-presser.md:5-6` · `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg` | 900×581 | 성공 |
| 8 | `2026-09-22-taekyu-chief-justice-refusal` | 대법관 제청권·대법원장 관련 논평 — 대법원이 주제 기관, 의혹·비난 대상 아님 | D | `content/posts/2026-09-22-taekyu-chief-justice-refusal.md:13-27` / `content/posts-en/2026-09-22-taekyu-chief-justice-refusal.md:5-6` · `public/images/2026-09-22-taekyu-chief-justice-refusal/thumb.jpg` | 900×618 | 성공 |
| 9 | `2026-09-21-oreunboy-dmz-mine-explosion` | DMZ 지뢰 사고 → DMZ 일반 풍경 예정 | — | 변경 없음 | — | **실패** |
| 10 | `2026-11-08-tessa-gop-fence-animal-judgment` | 철원 GOP 철책 → 철책 일반 풍경 예정 | — | 변경 없음 | — | **실패** |

- 공통 frontmatter: `kind: open` · `caption: 자료사진: {국회의사당|대법원 청사}(2020) — 이 사건 당시 사진이 아닙니다.` · `sourceSiteName: 서울연구데이터서비스` · `license: cc-by-4.0` · `licenseUrl: https://creativecommons.org/licenses/by/4.0/deed.ko` · `workTitle: {상세 제목}({통합코드번호})` · `workYear: 2020` · `retrievedAt: 2026-11-11` · `faceNote: 얼굴 없음(자료사진·{대상})`. en: `imageAlt` + `imageCaption: Archive photo: … (2020) — not taken at the time of this event.`
- 본문 문장은 바꾸지 않음(일부 게시물의 "원문 사진은 … 쓰지 않았습니다" 문장은 원문 SNS 사진에 관한 것이라 그대로 사실). `updatedAt` 변경 없음(이미지 추가).

## 실패 사유(검색처별) — #9·#10 DMZ·철책
- 공유마당: ① 개인 저작자의 "DMZ" 연작(CCL BY, 창작 2010년 전후) — 상세 이용조건 문구가 "…은 CC BY 라이선스로 제공됩니다"로 버전이 없고 링크만 `/by/4.0/` → 정책의 「버전 불명·CC BY만 적힌 건 불가」에 걸려 **참고 후보**(예: wrtSn=13323812, 북한 초소·철책). ② 다른 개인 저작자의 "DMZ_군사분계선"·"DMZ_철책 너머 군사분계선 표지"·"DMZ_벙커가 보이는 … 산 풍경" 등 — 배지 "기증저작물 자유이용"만 있고 이용조건이 CC BY 4.0으로 표시되지 않음 → 이번 시범 제외, **참고 후보**(wrtSn=13313177·13313191·13313213). ③ 판문점·돌아오지 않는 다리(한국정책방송원, wrtSn=13071611·13071765) — 공공누리 제1유형 → 이번 시범 제외, **참고 후보**. 공유마당 사진은 2009~2010년 촬영이 많아 쓰게 되면 "현재 모습과 다를 수 있습니다"가 필요.
- 위키미디어 공용: DMZ 관련 CC BY·CC0 파일은 공연·인물 사진이거나, 공유마당 기증본을 다른 사람이 CC0로 다시 올린 것(재업로드이고 원 페이지 표시와도 다름 → 불가)뿐. 철원 산 풍경(CC BY 4.0, 본인 촬영)은 DMZ·GOP가 아닌 다른 지점이라 §4.5-3 불가. 검색 중 API 요청 제한에 한 번 걸려 간격을 두고 재시도함.
- 서울연구데이터서비스: 서울 지역만 다뤄 DMZ 없음.
- 참고: 헌법재판소는 서울연구데이터서비스에 1996년 사진 1장뿐(30년 전)이라 대상에 넣지 않음. 정부서울청사는 같은 서비스 검색 0건, 통일부 게시물은 통일부 비판형이 많아 대상에서 뺌.

## 고르지 않은 게시물(예)
- `2026-09-21-leeprenotion-assembly-holiday-bonus`(국회의원 명절휴가비 비판) — 비난 대상이 국회(의원) 자체 → §4.5-5 불가.
- `2026-09-11-currentwaves-nk-hr-report-classified`(통일부 비공개 비판) · `2026-10-13-brieftag-kadiz-data-withheld`(군 답변 거부) — 기관 자체 비판형.
- `2026-10-05-wendmag-cio-investigation-scope`(대통령·국회의원 수사 제외 개편) — 국회의원이 이해당사자로 읽힐 수 있어 애매 → 불가.
- 전 민주노총 간부 간첩 사건 3건(대법원 확정) — 제목 주제가 간첩 사건이고 대법원은 부차적이라 애매 → 이번에 넣지 않음.

## 검증
- `npm run validate:content`: **R=0**, 경고 22건(작업 전과 같음), 대상 8개 id 경고 0. 영어본 210/210.
- 저장 파일 8개: 위 표(짧은 변 581~651px, 191~302KB).

## 소요 시간 · 확장 추정
- 실측: 대상 고르기 시작(19:21)부터 트리거 작성(19:33)까지 약 12분, 그 전 오더·선행 문서 검토 약 5분. 시간 대부분은 출처 탐색(사이트 검색 방식 확인·라이선스 문구 확인)이었음.
- 서울 소재 기관(국회·대법원 등)은 서울연구데이터서비스 1곳으로 빠르게 처리 가능 — 국회 사진은 같은 연작의 미사용 후보(06T00301·06T00302·06T00303·06T00304, 모두 2020/02 항공)로 3건 한도 안에서 최대 12건 더, 대법원은 06O00703·06O00704 등 후보 있음.
- 서울 밖(DMZ·철책·판문점 등)은 이번 한정(CC BY 버전 명시·CC0·기증 CC BY 4.0)으로는 0건. 공공누리 제1유형 표시 문안, 공유마당 "CC BY"(문구 무버전·링크 4.0) 판단이 정해지면 DMZ 계열 다수를 처리할 수 있을 것으로 추정.

## git status --short (전체, 작업 시점)
- 이번 오더 변경: 위 8개 ko·en 게시물과 `public/images/` 8개 폴더. 그 밖의 줄은 같은 날 앞선 게시 담당 처리분이거나 다른 세션의 미커밋 파일.
```
 M content/posts-en/2026-09-14-yongkeun-justice-hearing-lee-trial.md
 M content/posts-en/2026-09-16-pickmag-china-visa-free-petition.md
 M content/posts-en/2026-09-22-taekyu-chief-justice-refusal.md
 M content/posts-en/2026-09-27-hoon2-jeonhyunhee-land-lease.md
 M content/posts-en/2026-09-28-instagram-chief-justice-audit-witness.md
 M content/posts-en/2026-09-30-rekor-foreign-committee-dp-absence.md
 M content/posts-en/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts-en/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/posts-en/2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md
 M content/posts/2026-09-14-yongkeun-justice-hearing-lee-trial.md
 M content/posts/2026-09-16-pickmag-china-visa-free-petition.md
 M content/posts/2026-09-22-taekyu-chief-justice-refusal.md
 M content/posts/2026-09-27-hoon2-jeonhyunhee-land-lease.md
 M content/posts/2026-09-28-instagram-chief-justice-audit-witness.md
 M content/posts/2026-09-30-rekor-foreign-committee-dp-absence.md
 M content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/posts/2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md
 M docs/supervisor/drafts/2026-09-28-held-recheck.md
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
 M history/2026-11-11.md
?? content/posts-en/2026-11-10-attendkdz-police-university-abolition-review.md
?? content/posts/2026-11-10-attendkdz-police-university-abolition-review.md
?? docs/handoffs/tester-01-deployed-image-loading.md
?? docs/qa/tester-01/
?? docs/tools/designer-03/screens/
?? docs/tools/designer-05/screens/
?? docs/tools/designer-05/sheets/
?? docs/tools/planner-07/38north_article.html
?? docs/tools/planner-07/38north_rss.xml
?? "docs/tools/planner-07/datago_\352\265\255\352\260\200\354\240\225\353\263\264\354\233\220\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? "docs/tools/planner-07/datago_\352\265\255\353\260\251\353\266\200\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? "docs/tools/planner-07/datago_\355\225\251\353\217\231\354\260\270\353\252\250\353\263\270\353\266\200\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? docs/tools/planner-07/dod_rss.xml
?? docs/tools/planner-07/jcs_afp.html
?? docs/tools/planner-07/jcs_main.html
?? docs/tools/planner-07/jcs_root.html
?? docs/tools/planner-07/korea_rss_list.html
?? docs/tools/planner-07/korea_rss_notice.html
?? docs/tools/planner-07/mnd_main.html
?? docs/tools/planner-07/mnd_root.html
?? docs/tools/planner-07/mnd_rss.xml
?? docs/tools/planner-07/nknews_article.html
?? docs/tools/planner-07/nknews_rss.xml
?? docs/tools/planner-07/rfa_rss.xml
?? docs/tools/planner-07/unikorea_openapi.html
?? docs/tools/planner-07/unikorea_rss.xml
?? docs/tools/planner-07/usfk_root.html
?? docs/tools/planner-07/yna_nk_rss.xml
?? docs/tools/programmer-14/screens-e2e/
?? docs/tools/programmer-14/screens/
?? docs/tools/reviewer-31/screens-e2e/
?? docs/tools/reviewer-31/screens/
?? docs/tools/tester-01/
?? docs/triggers/poster-2026-10-09-gotdemcatch-lee-five-trials-suspended-merge-DfhVryWha8y-COMPLETE.md
?? docs/triggers/poster-2026-11-10-attendkdz-police-university-abolition-review-COMPLETE.md
?? docs/triggers/poster-hold-czchurch-DfbpZ-zSDVk-COMPLETE.md
?? docs/triggers/poster-hold-rightrightgogo-DfjY-mHE1Fg-COMPLETE.md
?? docs/triggers/tester-01-deployed-image-loading-COMPLETE.md
?? history/2026-10-02.md
?? history/2026-10-03.md
?? history/2026-10-04.md
?? history/2026-10-05.md
?? history/2026-10-06.md
?? history/2026-10-07.md
?? history/2026-10-08.md
?? history/2026-10-09.md
?? history/2026-10-10.md
?? history/2026-10-11.md
?? history/2026-10-12.md
?? history/2026-10-13.md
?? history/2026-10-14.md
?? history/2026-10-15.md
?? history/2026-10-19.md
?? history/2026-10-20.md
?? history/2026-10-21.md
?? history/2026-10-22.md
?? history/2026-10-25.md
?? history/2026-10-27.md
?? history/2026-10-29.md
?? history/2026-10-30.md
?? history/2026-11-01.md
?? history/2026-11-02.md
?? history/2026-11-03.md
?? history/2026-11-04.md
?? history/2026-11-06.md
?? history/2026-11-08.md
?? instructions/tester/processed/01-deployed-image-loading.md
?? public/images/2026-09-14-yongkeun-justice-hearing-lee-trial/
?? public/images/2026-09-16-pickmag-china-visa-free-petition/
?? public/images/2026-09-22-taekyu-chief-justice-refusal/
?? public/images/2026-09-27-hoon2-jeonhyunhee-land-lease/
?? public/images/2026-09-28-instagram-chief-justice-audit-witness/
?? public/images/2026-09-30-rekor-foreign-committee-dp-absence/
?? public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/
?? public/images/2026-11-05-dduddd-kimtaekyu-expulsion-resolution/
```

## 26-1 — 리뷰어 69 P2-1 반영: 저장 사진 메타데이터의 개인정보 제거 (2026-11-11)

- 근거: `docs/triggers/reviewer-69-uploader-26-review-COMPLETE.md` P2-1(사진 C의 EXIF Artist에 촬영자 개인 식별자), P3-5(Artist 미점검).
- 🔴 지운 값은 이 기록·히스토리·메시지 어디에도 옮기지 않았다. 아래에는 필드 이름과 있음/없음만 적는다.
- 도구: exiftool·exiv2가 없어 JPEG 세그먼트를 직접 다루는 스크립트를 썼다(저장소 밖 임시 폴더, 작업 뒤 삭제).
  - 재인코딩 없음. 압축 이미지 데이터(SOS 이후)와 양자화·허프만·SOF 표는 건드리지 않았다.
  - EXIF: 해당 IFD 항목을 목록에서 빼고(개수 감소, 남은 칸 0 채움) 값이 있던 바이트를 0으로 덮었다. 파일 크기·다른 오프셋은 그대로다.
  - XMP: 해당 요소를 같은 길이의 공백으로 바꿨다(XML 구조 유지).
  - IPTC: 해당 데이터셋을 빼고 Photoshop 자원·APP13 길이를 맞췄다. 사진 C만 해당하며 34바이트 줄었다.
- 처리 전 원본은 임시 폴더에 백업해 아래 비교에 쓰고, 작업 뒤 지웠다.

### 점검·제거 결과 (8장)

| 필드 | A 3장(pickmag·kimtaekyu·hoon2) | B 3장(foreign-committee·yongkeun·audit-witness) | C 1장(leejinsook) | D 1장(taekyu) | 처리 |
|---|---|---|---|---|---|
| EXIF Artist | 없음 | 없음 | **있음** | 없음 | C 제거 |
| EXIF XPAuthor | 없음 | 없음 | 없음 | 없음 | — |
| EXIF GPS IFD | 있음 | 있음 | 있음 | 있음 | 8장 모두 제거(포인터와 GPS IFD 전체) |
| EXIF BodySerialNumber(카메라 일련번호) | 있음 | 있음 | 있음 | 있음 | 8장 모두 제거 |
| EXIF LensSerialNumber | 없음 | 없음 | 있음 | 없음 | C 제거 |
| EXIF CameraOwnerName(소유자명) | 없음 | 없음 | 없음 | 없음 | — |
| EXIF MakerNote | 없음 | 없음 | 없음 | 없음 | — |
| XMP dc:creator | 없음 | 없음 | 있음 | 없음 | C 제거 |
| XMP aux:SerialNumber | 있음 | 있음 | 있음 | 있음 | 8장 모두 제거 |
| XMP aux:LensSerialNumber | 없음 | 없음 | 있음 | 없음 | C 제거 |
| XMP drone-dji:GpsLatitude·GpsLongitude·AbsoluteAltitude | 있음 | 있음 | 없음 | 있음 | 7장 제거 |
| XMP drone-dji:SelfData(사용자 정의 칸) | 있음 | 있음 | 없음 | 있음 | 7장 제거(내용 불명이라 함께 제거) |
| IPTC By-line(2:80) | 없음 | 없음 | 있음 | 없음 | C 제거 |
| IPTC By-lineTitle·Contact·Writer | 없음 | 없음 | 없음 | 없음 | — |
| EXIF Copyright(서울시 저작권 표기) | 있음 | 있음 | 있음 | 있음 | **유지**(값이 처리 전과 같음을 바이트 비교로 확인) |

### 확인
- 픽셀 불변(8장 모두):
  - 압축 이미지 데이터(SOS부터 파일 끝까지) SHA-256이 처리 전과 같다.
  - DQT·DHT·SOF 세그먼트 바이트가 같다.
  - 디코딩한 RGB 픽셀 SHA-256과 크기가 같다.
  - `sips`로 읽기 정상(가로 900).
- 남은 값 점검: 처리 전 EXIF의 Artist·BodySerialNumber·LensSerialNumber 값 바이트를 새 파일 전체에서 찾아봤다. 8장 모두 0건이다(XMP·IPTC 포함).
- 남은 EXIF 필드(8장 합집합, 이름만):
  - IFD0: Make, Model, XResolution, YResolution, ResolutionUnit, Software, DateTime, Copyright, ExifIFD
  - ExifIFD: ExposureTime, FNumber, ExposureProgram, ISO, SensitivityType, RecommendedExposureIndex, ExifVersion, DateTimeOriginal, DateTimeDigitized, ShutterSpeedValue, ApertureValue, ExposureBiasValue, MaxApertureValue, MeteringMode, LightSource, Flash, FocalLength, SubSecTimeOriginal, SubSecTimeDigitized, ColorSpace, FocalPlaneXResolution, FocalPlaneYResolution, FocalPlaneResolutionUnit, FileSource, SceneType, CustomRendered, ExposureMode, WhiteBalance, DigitalZoomRatio, FocalLengthIn35mmFilm, SceneCaptureType, GainControl, Contrast, Saturation, Sharpness, LensSpecification, LensModel
  - IFD1(내장 썸네일): Compression, XResolution, YResolution, ResolutionUnit, JPEGInterchangeFormat, JPEGInterchangeFormatLength
  - 개인정보성 필드(Artist·XPAuthor·GPS·일련번호·소유자명·MakerNote): 없음
- 파일 크기: A 301,651B·B 288,211B·D 292,590B는 그대로다. C는 191,411B에서 191,377B가 됐다(IPTC 데이터셋 제거분). 해상도는 변화 없다.
- `npm run validate:content`: **R=0**, 경고 22건(이전과 같다).
- 그 밖에 남은 것(개인정보 아님, 참고): XMP의 편집 설정(crs:*), 처리 이력(xmpMM:History), 렌즈 모델명, 드론 자세값(Flight/Gimbal 각도·RelativeAltitude), cc:license, Photoshop 내장 썸네일. IPTC 다이제스트(8BIM 0x0425)는 C만 IPTC 변경으로 불일치하게 됐다. 표시에는 영향이 없다.
- 제안(P3-5와 함께): 업로더 지침 단계 2-2에 "저장 전 EXIF·XMP·IPTC 개인정보(Artist·dc:creator·By-line·GPS·일련번호) 점검·제거"를 추가.
- 바꾼 파일: `public/images/{위 8개 id}/thumb.jpg` 8개. 게시물 md는 바꾸지 않았다. 빌드·git 쓰기 없음.
