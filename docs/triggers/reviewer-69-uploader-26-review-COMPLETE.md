# 리뷰어 69 — 업로더 26 검토 (인물 없는 자료사진 A-2 시범 8건) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/reviewer/processed/69-uploader-26-review.md`(이동)
- 대상:
  - 트리거 `docs/triggers/uploader-26-a2-archive-photo-pilot-COMPLETE.md`(성공 8 · 실패 2)
  - 게시물 8쌍(ko·en), 새 폴더 `public/images/{id}/` 8개
- 🔴 `2026-10-09-gotdemcatch-lee-five-trials-suspended`는 오더대로 **검토하지 않았고 커밋 경로에서도 뺐다**.
- 파일 수정 0(이 트리거와 오더 이동만), git 쓰기 0, 빌드 0(validate만).
- 원 페이지·원본 사진은 저장소 밖 `$TMPDIR/r69`에만 받았다.

## 판정: 🟡 조건부 통과 (P1 0 · P2 1 · P3 5)
- 8건 모두 사진·라이선스·게시물 적합성·frontmatter가 기준을 만족한다.
- 단 사진 C 파일 1개(`2026-11-04-leejinsook-…/thumb.jpg`)의 EXIF에 촬영자 개인 식별자가 들어 있다(P2-1). 이것만 처리하면 커밋할 수 있다.

## 1. 라이선스 (원 페이지 직접 열람)
- 원 페이지 4곳(`data.si.re.kr/node/62226`·`62227`·`62584`·`60607`)을 curl로 받아 HTML을 직접 읽었다. 네 곳 모두 HTTP 200이었다.
- 상세 하단 `div.copyright--bottom`의 표시는 네 곳이 같다:
  - `<img alt="공공누리 제1유형: 출처표시">`(링크 kogl.or.kr licenseType1)
  - `<a rel="license" href="https://creativecommons.org/licenses/by/4.0/deed.ko"><img alt="크리에이티브 커먼즈 라이선스 CC BY" src="https://i.creativecommons.org/l/by/4.0/88x31.png">`
  - "저작권 표기방법 안내" 링크 `/node/65064#photo-rights`
- 안내 페이지 `node/65064` ①의 원문: "자유이용이 가능한 저작물은 「공공누리 제1유형(출처표시)」와 「크리에이티브 커먼즈 라이선스 CC BY 4.0」 두 가지 라이선스가 함께 부착되어 있으므로, 사진 상세페이지에서 해당 표시를 확인한 후 이용해 주십시오." 업로더 인용과 같다.
- 저작자(기관): 네 원본 파일의 EXIF 문자열에 "(Seoul Metropolitan Government)"가 있다. 안내 페이지도 "서울시에서 구축한 공공저작물"이라고 적는다. `creditName: 서울특별시`는 맞다.
- 재업로드 아님: 운영 기관(서울연구원)의 자체 서비스이고 원 저작권자는 서울시다. 상세 페이지 `sourcePageUrl`을 그대로 썼다. ✅
- 각 페이지의 대표 사진 파일명이 통합코드번호와 일치한다: 62226 → 06T00305Da82000, 62227 → 06T00306Da82000, 62584 → 06T05004Dc40053, 60607 → 06O00702Dc82000. ✅
- 사이트 하단의 "CopyrightⒸ The Seoul Institute. All Rights Reserved."는 사이트 전체 공통 문구다. 사진별 라이선스 배지와 안내 ①이 이를 덮는다고 본다.

### 업로더가 요청한 확인 2건
1. **공공누리 제1유형 + CC BY 4.0이 함께 붙은 사진을 `cc-by-4.0`으로 처리한 것 → 인정.**
   - 이용자가 둘 중 하나를 골라 쓰는 병행 제공이고 모순이 아니다. 안내 ①이 "두 가지 라이선스가 함께 부착"이라고 명시한다.
   - 버전: 배지 대체 텍스트("CC BY")에는 버전이 없지만, 같은 영역의 `rel="license"` 링크와 배지 이미지 경로가 4.0이고, 사이트 공식 안내문이 "CC BY 4.0"을 글자로 적는다. 정책 §4.5-2의 "버전을 페이지가 명시"를 충족한다고 판정한다.
   - 공유마당 건(문구 "CC BY"·링크 4.0만, 버전을 적은 안내문 없음)을 불가로 둔 업로더 판단과도 일관된다. 차이는 버전을 글자로 적은 공식 안내문이 있느냐다. 이 기준을 문서에 적어 두라고 권한다(P3-1).
   - 정책 §4.5-10은 "공공누리 제1유형이 있으면 그쪽"을 우선한다. 이번 open 선택은 시범 한정 출처(슈퍼바이저 판단)에 따른 것이다. 시범 뒤 병행 라이선스 사진을 public/kogl-1로 할지 open/cc-by-4.0으로 할지 정해야 한다(P3-1).
2. **`creditNotice` 생략 → 지금은 허용(P3-2로 보완 권고).**
   - CC BY 4.0 §3(a)(1)(A)(i)은 저작자 식별을 "in any reasonable manner requested by the Licensor"로 요구한다.
   - 현재 표시는 저작자(서울특별시)·저작물명·연도·사이트명·라이선스·원 페이지·라이선스 링크를 모두 갖춰 식별 요건을 채운다.
   - 기관이 요청한 표기("서울경관기록화 사업 YYYY, 서울특별시 / 서울연구데이터서비스, 서울연구원")의 사업명은 빠졌다.
   - YYYY는 "사진 촬영년도가 아님 … 상세보기의 '출처' 참고"인데, 상세 HTML에 "출처" 항목이 없는 것을 리뷰어도 확인했다. 안내문의 "2019/2020년 총 6차 사업"만으로 연도를 단정하면 추측이 된다. 업로더가 넣지 않은 판단은 맞다.

## 2. 사진 (저장 파일 8개 직접 열람 + 원본 대조)
- **원본 대조**: 원본 `…/photos6/{코드}.jpg` 4장을 직접 받아 md5를 비교했다. 저장 파일 8개는 모두 원본과 **바이트가 같다**. 리사이즈·변환·자르기·보정이 없다. ✅

| 키 | md5(앞 6자) | 크기 | 쓴 게시물 | 사람 | 공사 중·옛 모습 | 워터마크·글자 |
|---|---|---|---|---|---|---|
| A 06T00305 | 2afa2e | 900×651 · 301,651B | pickmag · hoon2 · dduddd (3) | 항공 원경, 사람 식별 불가(점 크기도 1% 미만) | 아님(2020/02) | 없음 |
| B 06T00306 | 16a7ee | 900×613 · 288,211B | yongkeun · instagram-chief · rekor (3) | 항공 원경, 사람 없음 | 아님 | 없음 |
| C 06T05004 | 5b6953 | 900×581 · 191,411B | leejinsook (1) | 강 건너 원경, 사람 없음(수면 위 부표·새) | 아님(2020/10) | 없음 |
| D 06O00702 | 0251a6 | 900×618 · 292,590B | taekyu-chief (1) | 정문 앞 도로 차량만, 사람 식별 불가 | 아님(2020/06) | 없음. 펜스 현수막 글자는 900px에서 읽히지 않음 |

- 짧은 변은 모두 400px 이상(581~651)이다. ✅
- **EXIF**(P2-1): C 파일에 EXIF Artist 필드가 있고, 그 값이 촬영자 개인 계정명과 숫자열(전화번호 형태)이다. 값은 이 기록에 옮기지 않는다.
  - A·B·D에는 Artist가 없다(`sips -g artist`).
  - 이 파일은 `public/images/…`에서 원본 그대로 공개 경로로 배포된다.

## 3. 같은 원본 3건 한도·반복 위험
- 실제 사용 수(md5 기준): A 3 · B 3 · C 1 · D 1. 업로더 표와 같고 한도(3) 안이다. 작업 전 저장소의 `data.si.re.kr` 사용은 0이었다. ✅
- 피드 위치(`publishedAt` 내림차순, 210건, 한 쪽 12건): C 5번째 · A 10번째. **첫 쪽에 국회의사당 사진이 두 번** 나온다. 사진은 서로 다르다(항공/강 건너).
  - 나머지는 B 69 · B 103 · A 117 · D 130 · A 142 · B 147로 흩어져 있어, 같은 사진이 이웃하지는 않는다.
  - 반복처럼 보일 위험은 낮다. 다만 국회 게시물이 많아질수록 같은 대상이 첫 쪽에 몰린다. 연작의 미사용 후보(06T00301~00304)로 사진을 분산하라고 권한다(P3-3).

## 4. 게시물 적합성 (정책 §4.5-3·5, 건별)
| # | id | 사진 | 같은 대상 | 의혹·비난 대상이 그 기관 자체인가 | 판정 |
|---|---|---|---|---|---|
| 1 | `2026-09-16-pickmag-china-visa-free-petition` | A | 국회 국민동의청원·법사위 회부 → 국회 ✅ | 아님(청원 성립 사실) | ✅ |
| 2 | `2026-11-05-dduddd-kimtaekyu-expulsion-resolution` | A | 본회의 결의안 가결 → 국회 ✅ | 비판 대상은 다수당의 표결, 결의안 대상은 의원 개인. 국회는 표결이 일어난 장소(§4.5-5 "그 장소에서 일어난") | ✅ |
| 3 | `2026-09-27-hoon2-jeonhyunhee-land-lease` | A | 국회 발의 법안 → 국회의사당(§4.5-3 예시) ✅ | 아님(SNS 주장 팩트체크) | ✅ |
| 4 | `2026-09-30-rekor-foreign-committee-dp-absence` | B | 외통위 현안질의 → 국회 ✅ | 비판 대상은 특정 정당의 불참(정당 당사가 아니라 국회라 허용) | ✅ |
| 5 | `2026-09-14-yongkeun-justice-hearing-lee-trial` | B | 국회 인사청문회 → 국회 ✅ | 아님 | ✅ |
| 6 | `2026-09-28-instagram-chief-justice-audit-witness` | B | 법사위 증인 채택 → 국회 ✅ | 게시자가 법사위 의결을 비판하지만, 제목은 "법사위, 與 주도로 … 채택"이라는 의결 사실 전달이고 위법 단정 아님. 경계 사례로 기록 | ✅(P3-4) |
| 7 | `2026-11-04-leejinsook-martial-law-soldiers-presser` | C | 국회 기자회견 → 국회 ✅ | 아님(군인 수사·징계 비판 기자회견, 대상은 국회 아님). 평온한 외관 사진이라 계엄 당시 국회 장면으로 읽힐 위험도 낮음 | ✅ |
| 8 | `2026-09-22-taekyu-chief-justice-refusal` | D | 대법관 제청권·대법원장 → 대법원 ✅ | 아님 — 대법원장을 **지지**하는 논평이고 비판 대상은 대통령실 | ✅ |
- 오더 예시("대법원장 관련 게시물에 대법원 사진", "의원 의혹 게시물에 국회 사진")에 걸리는 건은 없다.

## 5. frontmatter (ko·en 전수, diff 직접 확인)
- 8쌍 모두 diff가 ko `image:` 블록 15줄 추가 + en 2줄(`imageAlt`·`imageCaption`) 추가뿐이다. 다른 줄 변경 0, `updatedAt` 변경 0(이미지 추가만 — 규칙과 같다).
- 필수 필드가 8건 모두 있다: `kind: open`·`src`·`alt`·`caption`·`creditName`·`creditNameEn`·`sourcePageUrl`·`sourceSiteName`·`license: cc-by-4.0`·`licenseUrl`·`workTitle`·`workYear: 2020`·`retrievedAt: 2026-11-11`·`faceNote`.
- `licenseLabel`(kcc-donated 전용)·`donorName` 없음은 맞다.
- caption: ko "자료사진: 국회의사당(2020) — 이 사건 당시 사진이 아닙니다." / "자료사진: 대법원 청사(2020) — …". en "Archive photo: … (2020) — not taken at the time of this event."
  - 촬영 6년 전(10년 미만)이라 "현재 모습과 다를 수 있습니다"가 없는 것이 맞다. ✅
- alt는 사진에 보이는 것만 적었다(항공 시점·한강·다리·앞마당). ✅
- `sourcePageUrl` 키·사진 대응: 62226 = A, 62227 = B, 62584 = C, 60607 = D. 8건 모두 저장 파일 md5와 맞다. ✅

## 6. validate
- `npm run validate:content`: **R=0**, 420/420 통과.
- "대표 이미지 종류: self 0 · public 0 · **open 8** · news 33", alt 41.
- 경고 22건은 기준선(`$TMPDIR` 묶음 2 기준)과 diff 0이다. 새 경고는 없다. 8개 id 중 leejinsook의 경고 1건은 기준선에 이미 있던 것이다.

## 7. 운영 기록·저장소 독립
- 업로더 트리거·오더와 diff `+` 줄을 검사했다.
- pre-commit 패턴 0, 홈 디렉터리·시스템 임시 폴더 절대경로 0, 계정·메일 0, 1~3차 실명 패턴 0, 옛 id 0.
- 사진 저작자 개인 이름 0("개인 저작자"로만 적힘). 트리거에는 기관명(서울특별시)만 있다. ✅

## 8. P 목록
- **P2-1** 사진 C 파일 EXIF Artist에 촬영자 개인 식별자(계정명 + 전화번호 형태 숫자열)가 있음
  - 위치: `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`
  - 근거: 저장 파일이 공개 경로로 그대로 배포된다. CLAUDE.md 사적 개인 보호, 운영 기록뿐 아니라 배포물에도 불필요한 개인 정보를 두지 않는 원칙.
  - 라이선스 측면: 저작권 고지(EXIF의 서울시 표기)는 남겨야 하지만, Artist 필드는 고지가 아니다. 메타데이터 삭제는 저작물 변경(Adapted Material)이 아니다.
  - 수정안(업로더 또는 프로그래머): ① 이 파일의 EXIF Artist 한 필드만 지운다. 픽셀 재인코딩 없이 메타데이터만 지우는 도구를 쓰고, 저작권 문자열은 유지한다. ② 또는 같은 연작에서 Artist가 없는 다른 사진으로 바꾼다.
  - 앞으로 A-2 저장 전 점검 항목에 "EXIF 개인정보(Artist·GPS 등)"를 추가한다.
- **P3-1** 정책 §4.5-2·§4.5-10 보완: ① "버전은 배지 링크만이 아니라 페이지나 공식 안내문의 글자로 확인한다"(이번 판정 기준) ② 공공누리 제1유형과 CC BY 4.0이 함께 붙은 사진을 시범 뒤 `public/kogl-1`로 할지 `open/cc-by-4.0`으로 할지 정한다(§4.5-10의 제1유형 우선과 맞추기).
- **P3-2** `creditNotice`에 기관이 요청한 표기 중 확인된 부분 "서울경관기록화 사업, 서울특별시"(연도 없이)를 넣을지 정한다. 연도는 기관 문의 뒤에 넣는다. 지금 생략은 허용한다.
- **P3-3** 국회의사당 사진은 연작의 미사용 후보(06T00301~00304)로 분산한다. 첫 쪽에 같은 대상이 겹치는 것을 줄이기 위해서다.
- **P3-4** #6 `instagram-chief-justice-audit-witness`는 게시자가 국회 법사위 의결을 비판하는 게시물이다. 이번에는 허용했지만(제목이 의결 사실 전달형), §4.5-5 "기관의 결정을 비판하는 게시물" 경계 사례로 다음 묶음 기준에 적어 둔다.
- **P3-5** 업로더 트리거 1절 "사진 EXIF 저작권 항목(Tag 33432)"은 맞다. 다만 같은 EXIF의 Artist 필드를 점검하지 않았다 → P2-1과 함께 업로더 지침 단계 2-2-3에 반영한다.

## 9. 직접 연 URL
- https://data.si.re.kr/node/62226 · https://data.si.re.kr/node/62227 · https://data.si.re.kr/node/62584 · https://data.si.re.kr/node/60607 (상세 HTML)
- https://data.si.re.kr/node/65064 (저작권 표기방법 안내)
- https://data.si.re.kr/sites/default/files/photos6/06T00305Da82000.jpg · …/06T00306Da82000.jpg · …/06T05004Dc40053.jpg · …/06O00702Dc82000.jpg (원본, md5 대조용 — 저장소 밖)

## 10. 최종 커밋 경로 (gotdemcatch 제외 — P2-1 처리 뒤)
- 게시물 ko 8 / en 8 (`content/posts/` · `content/posts-en/` 아래 같은 이름의 `.md`):
  - `2026-09-14-yongkeun-justice-hearing-lee-trial.md`
  - `2026-09-16-pickmag-china-visa-free-petition.md`
  - `2026-09-22-taekyu-chief-justice-refusal.md`
  - `2026-09-27-hoon2-jeonhyunhee-land-lease.md`
  - `2026-09-28-instagram-chief-justice-audit-witness.md`
  - `2026-09-30-rekor-foreign-committee-dp-absence.md`
  - `2026-11-04-leejinsook-martial-law-soldiers-presser.md`
  - `2026-11-05-dduddd-kimtaekyu-expulsion-resolution.md`
- 이미지 8: 위 id마다 `public/images/{id}/thumb.jpg`
- 문서:
  - `docs/triggers/uploader-26-a2-archive-photo-pilot-COMPLETE.md`
  - `instructions/uploader/26-a2-archive-photo-pilot.md`(삭제) + `instructions/uploader/processed/26-a2-archive-photo-pilot.md`(추가)
  - `docs/triggers/reviewer-69-uploader-26-review-COMPLETE.md`
  - `instructions/reviewer/processed/69-uploader-26-review.md`
- **빼는 것**:
  - `content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md`·`content/posts-en/` 같은 파일과 그 poster 트리거
  - 그 밖의 미커밋 파일(attendkdz 게시물·held-recheck·history 등)
