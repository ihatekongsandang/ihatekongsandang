# uploader-04-sns-image-batch-2 — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/04-sns-image-batch-2.md` (묶음 2 = `docs/tools/planner-16/sns-image-batches.tsv` batch 2, 10건 — 오더 목록과 TSV 일치 확인)
- 기준: 묶음 1 업로더 03·리뷰어 38 트리거의 판단(같은 사건·사건 당시, 워터마크·덧씌운 자막 없음, 제목과 얼굴의 결합 위험)을 그대로 적용
- 결과: **② 2건 · ③ 8건** · SNS 원문 저장본 **129 → 119**(`count-self-images.mjs` 중간 TSV: self 186 − 자체 제작 67 = 119)
- 원 이미지는 저장소 밖 임시 폴더에서만 열람. git add·commit·push·빌드 하지 않음.

## 건별 표
| # | id | 단계 0 판정(저장 이미지 직접 열람) | 결과 | 사진 출처 기사 · 사진 설명(크레딧) / 불가 사유 | 핫링크 응답 | 지운 파일 |
|---|---|---|---|---|---|---|
| 1 | 2026-09-30-hagonolza-lee-case-dismissal-two-routes | 스레드 글 캡처(만화형 프로필 아이콘) + 글자 도표, 실사 얼굴 없음 | **②** | 월요신문 2026-09-18 `og:image` — "18일 오전 청와대 영빈관에서 열린 기자회견 중 언론사 기자들의 질문에 답변하고 있는 이재명 대통령. 사진=연합뉴스". 기사 본문: 같은 기자회견에서 특검의 공소취소 권한 삭제를 요청 — 게시물 제목의 "대통령은 특검 공소취소 조항 삭제 요청"과 같은 사건·당시. 600×411(짧은 변 ≥400). 다른 인물·워터마크·자막 없음. 재판 당사자 본인 → 정책 §3.6 2행 문구 | 200 image/jpeg (check:hotlinks GET) | public/images/2026-09-30-hagonolza-lee-case-dismissal-two-routes/thumb.jpg(+폴더) |
| 2 | 2026-07-14-kasamo7-cnn-surprise-attack-article | 영어 기사 화면 캡처 + 한글 자막, 얼굴 없음(기자 소형 사진만) | ③ | CNN 2024-12-03(미 법무부 인장 FILE 사진 — 4a 불가) · CNN 2025-08-19(AP/File — 4a 불가) | — | public/images/2026-07-14-kasamo7-cnn-surprise-attack-article/thumb.jpg(+폴더) |
| 3 | 2026-07-25-idontknowpolitics-cheongju-spy-directives | 다른 방송사 뉴스 화면(평양 건물·자막) + 채널 로고, 얼굴 없음 | ③ | 세계일보 2021-08-10(영장실질심사 출석 피의자 — 비공인 → 불가) · 뉴데일리 2023-01-31(2020년 본회의 — 다른 사건) · 서울신문(로고 공유 이미지) · 머니투데이 2025-09-11(대법원 DB 사진 — 4a 불가) | — | public/images/2026-07-25-idontknowpolitics-cheongju-spy-directives/thumb.jpg(+폴더) |
| 4 | 2026-09-08-sonit-criminal-record-card | 다른 계정 SNS 글(문장) 캡처, 얼굴 없음 | ③ | 한국경제 2022-02-25(og:image 없음) · 뉴스1 2026-07-31(묶음 1에서 다른 사건으로 판정된 본회의 사진, "전과자" 카드 제목과 공인 얼굴 결합 위험) | — | public/images/2026-09-08-sonit-criminal-record-card/thumb.jpg(+폴더) |
| 5 | 2026-09-09-pagememo-unmanned-vehicle-budget-cut | 태극기 배경 무인차량 합성 그래픽 + 문구·계정 로고, 얼굴 없음 | ③ | 파이낸셜뉴스 9/5·9/7(업체 제공 장비 사진, 촬영 시점 표기 없음 — 4a 불가) · 서울파이낸스 9/8(엑스포 부스 전시 사진, 예산 사안과 다른 행사 — 4a 불가) | — | public/images/2026-09-09-pagememo-unmanned-vehicle-budget-cut/thumb.jpg(+폴더) |
| 6 | 2026-09-13-geonwoo-leejinsook-518-merit-disclosure | 현직 국회의원 3인(공인) 얼굴 합성 + "공적묻자 제명부터?" 자막 | **②** | 한국일보 2026-08-26 `og:image` — "이진숙 국민의힘 의원이 26일 서울 여의도 국회에서 열린 본회의에서 자신에 대한 제명 촉구 결의안이 상정되자 본회의장을 나서고 있다. 뉴스1". 게시물 제목·요약의 "8월 26일 제명 촉구 결의안"과 같은 사건·당시. 1440×960. 다른 인물·워터마크·자막 없음. (같은 게시물 머니투데이 9/8 기자회견 사진은 매체 워터마크가 있어 쓰지 않음, 경향 8/26 사진도 가능했으나 한국일보 쪽을 택함) | 200 image/jpeg (HEAD) | public/images/2026-09-13-geonwoo-leejinsook-518-merit-disclosure/thumb.jpg(+폴더) |
| 7 | 2026-09-25-kimkyelee-nk-pow-ukraine | 2023년 다른 매체 기사 제목 캡처, 얼굴 없음 | ③ | VOA(외국 정상 SNS 공개 포로 사진 — SNS 사진·비공인 포로 → 불가) · 연합뉴스(7/8 앙카라 정상회담 사진 — 다른 사건) · 서울신문(AI 생성 자료사진 — 불가) | — | public/images/2026-09-25-kimkyelee-nk-pow-ukraine/thumb.jpg(+폴더) |
| 8 | 2026-09-26-neveragain-mexico-tariff-visit | 두 정상 악수(공인) + 외신 발췌·주장 문구·다른 계정 로고 | ③ | 서울신문 9/24("재판매 및 DB 금지" 표기 — 7항 불가) · 파이낸셜뉴스 9/24(공항 도착 장면, 의장대 장병 정면 근접 얼굴·신원 미확인 수행 인물 → 2·9항 불가) · 헤럴드경제 2025-12-31(2025-12-22 멕시코 대통령 회견 — 다른 사건) | — | public/images/2026-09-26-neveragain-mexico-tariff-visit/thumb.jpg(+폴더) |
| 9 | 2026-09-28-kimjanggyeom-hanjunho-kbs-complaint | 현직 국회의원(공인) + 인용 자막·정당 로고 | ③ | 뉴스1 9/28(고발 현장 — 같은 사건이지만 오른쪽 아래 매체 워터마크, 피고발인 이름과 "의혹"이 적힌 고발장이 화면 중앙 → 묶음 1 기준으로 쓰지 않음) · 뉴데일리 9/28(9/22 상임위 언쟁 — 다른 사건) | — | public/images/2026-09-28-kimjanggyeom-hanjunho-kbs-complaint/thumb.jpg(+폴더) |
| 10 | 2026-09-28-parkchoongkwon-dp-mine-remarks | 정당 제작 카드(공인 4인 얼굴 + "망언" 제목) | ③ | 머니투데이 9/29(9/28 국방위 현장 방문 — 게시물이 다루는 발언과 다른 일정, 제목 "망언"과 얼굴 결합 위험) · 한국일보 9/25(다른 의원의 9/24 1인 시위) · 파이낸셜뉴스 9/26(수석대변인 자료 사진, 날짜 없음 — 4a 불가) · 뉴스1 9/29(부상자 헬기 이송 + "재판매 및 DB 금지" — 불가) | — | public/images/2026-09-28-parkchoongkwon-dp-mine-remarks/thumb.jpg(+폴더) |

### ② 2건 점검 기록
- **인물 판정**: #1 현직 대통령(§3.1 고위공직자) — 청와대 기자회견(§3.2 공식 발언) — 원 기사 사진 설명. #6 현직 국회의원(§3.1 선출직) — 국회 본회의 출석(§3.2) — 원 기사 사진 설명. 두 사진 모두 다른 인물 없음.
- **같은 사건·당시(4a)**: 위 표 근거 문장. #1은 사진 설명의 "18일 … 영빈관 … 기자회견"과 기사 본문의 같은 회견 발언(공소취소 권한 제외 요청). #6은 사진 설명의 "26일 … 본회의 … 제명 촉구 결의안이 상정되자".
- **제외 11항**: 1 해당 없음 · 2·3 비공인 없음 · 4 로고·그래픽·캡처 아님 · 5 해당 없음 · 6 맥락 일치 · 7 사용 제한 표기 없음(기사 하단 일반 고지만) · 8 짧은 변 411·960px · 9 신원 미확인 인물 없음 · 10 조롱·연출 아님(#6 퇴장 장면은 공식 회의 중 이동, 표정 포착·연출 아님) · 11 화면에 글자 없음. 워터마크 없음.
- **의혹 사안**: #1은 대통령 본인 재판의 공소취소 논의 → §3.6 2행("당사자 본인") 문구 사용(ko caption 137자). #6은 결의안 사안(수사·재판 아님) → 사실 서술(85자).
- **frontmatter**: `kind: news` · `src` = 기사 og:image 그대로 · `sourcePageUrl` = 각 `sources[].url` 글자 그대로 · `retrievedAt: 2026-11-10` · `license` 없음 · `faceNote` 기재. 덧씌우기 없음.

## 영어본
- ② 2건: `imageAlt`·`imageCaption`을 새 사진 기준으로 교체(#1 imageCaption은 §3.6 2행 문구 번역 포함).
- ③ 8건: `imageAlt`·`imageCaption` 삭제(10건 ③ 영어본에 image 필드 0 — grep).
- 본문의 "원문 썸네일·첨부 이미지" 설명은 원 게시물 설명이라 그대로 둠. 사이트 이미지를 가리킬 수 있는 문장 0(grep "이미지의/The image's" 계열).

## 추가 — 리뷰 38 P3-1
- `content/posts/2026-09-25-minkyuhan-nsl-security-priority.md` 50행: "이미지의 \"국가보안법 통째로 폐지\"는…" → "원문 이미지의 …".
- `content/posts-en/2026-09-25-minkyuhan-nsl-security-priority.md` 24행: "The image's \"abolish …\" is …" → "In the original post's image, \"abolish …\" is …" (오더 문구 "The original post's image …"를 영어 문장으로 자연스럽게 맞춤). 이 한 줄씩 외 변경 없음.

## updatedAt
- 11개 게시물 모두 변경 없음(이미지 교체·삭제와 원문 지칭 한 단어 보완 — 사실 변경 아님).

## 검증
- `npm run validate:content`: ✅ R=0. 대상 id 경고 1건은 **기존 description 길이 경고**(neveragain 174자 — 이번에 description 미변경). 이미지·caption 경고 0.
- `npm run check:hotlinks`: 점검 5건 · 정상 5건 · 깨짐 0건(묶음 1의 3건 + 이번 2건: #1 GET 200 image/jpeg, #6 HEAD 200 image/jpeg).
- `/images/<id>/` 참조: 10건 ko·en 0. `public/images/<id>/` 폴더 10개 삭제(남은 것 0).
- `git diff --cached`: 비어 있음.

## 바뀐 경로 (커밋 대상 32)
- 수정 20: `content/posts/{10 id}.md` · `content/posts-en/{10 id}.md`
- 수정 2(P3-1): `content/posts/2026-09-25-minkyuhan-nsl-security-priority.md` · `content/posts-en/2026-09-25-minkyuhan-nsl-security-priority.md`
- 삭제 10: `public/images/{10 id}/thumb.jpg`
- 문서: 이 트리거 · `instructions/uploader/processed/04-sns-image-batch-2.md`(이동)

## 리뷰어 판단 요청
1. #1: 재판 당사자 본인(대통령) 얼굴을 §3.6 2행 문구로 쓴 첫 사례. 사진은 제목이 말하는 바로 그 요청을 한 기자회견 장면이다.
2. #9: 같은 사건 사진이지만 워터마크·고발장 문구(피고발인 이름 + "의혹")로 ③. 고발장은 현장 실물이라 11항(덧씌운 자막) 대상은 아니라는 해석도 가능 — 기준 확인 요청.
3. 단계 0 위험 단계 변경: 없음. 단계 0에서 비공인 얼굴로 즉시 ③인 건 없음.
