# uploader-05-sns-image-batch-3 — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/05-sns-image-batch-3.md` (묶음 3 = TSV batch 3, 9건 — 오더 목록과 TSV 일치 확인)
- 기준: guide §4-1 "판단 선례"(리뷰 38·39) — 워터마크·DB 금지 불가, 재판 당사자 공인 + §3.6 2행, 현장 실물 글자 해석, §3.1 밖 직위 = 비공인, 의혹·비난형 제목 + 다른 일정 사진 불가
- 결과: **② 0건 · ③ 9건** · SNS 원문 저장본 **119 → 110**(`count-self-images.mjs` 중간 TSV: self 177 − 자체 제작 67 = 110)
- 근거 기사 og:image **33건**을 받아 사진 설명·크기·사용 제한·인물을 확인했고, 후보 4장(서울신문 9/29·뉴스1 9/29·강원일보 9/29 등)은 직접 열어 봄. 원 이미지는 저장소 밖 임시 폴더에서만. git add·commit·push·빌드 하지 않음.

## 건별 표
| # | id | 단계 0 판정(저장 이미지 직접 열람) | 결과 | 시도한 근거 기사 · 불가 사유 | 핫링크 | 지운 파일 |
|---|---|---|---|---|---|---|
| 1 | 2026-09-28-quickpolitics-song-yeonpyeong-bomb-remark | 방송사 뉴스 화면(로고·자막) — 당시 시장(공인) + 옆 인물(신원 미확인) | ③ | 뉴시스 2010-11-26(피해 주민 얼굴 — 비공인·피해자, 짧은 변 332px) · 경향 2010-11-27(설명 없는 450×352 — 8항) · 서울신문(로고 공유 이미지) | — | public/images/2026-09-28-quickpolitics-song-yeonpyeong-bomb-remark/thumb.jpg(+폴더) |
| 2 | 2026-09-29-limjongdeuk-dmz-operation-criticism | 방송 화면(로고·자막) + 채널 로고 — 국회의원·장관(공인) | ③ | 프리진뉴스(유튜브 캡처 300px) · 국민일보(장관 답변 9/29 — 짧은 변 291px, 8항) · 서울신문 9/29(같은 회의지만 사진 주인공인 합참 작전부장의 계급이 사진 설명·본문에 없어 §3.1 확인 불가 → 비공인, "(왼쪽)" 표기로 다른 인물 동석, 제목 인물과도 다름) | — | public/images/2026-09-29-limjongdeuk-dmz-operation-criticism/thumb.jpg(+폴더) |
| 3 | 2026-09-29-osj17x-hankiho-president-instruction | 방송 중계 화면(로고·자막) — 국회의원·장관(공인) + 배경 인물 | ③ | 강원일보 9/29("국회방송 캡처" — 방송 로고·자막·수어 통역사(비공인) 화면·배경 참석자 얼굴) · 뉴스1 9/29(같은 회의 전경이지만 매체 워터마크, 사진기자·직원 등 신원 미확인 다수) · 뉴스1 9/29 기사(9/28 브리핑 — 다른 일정) | — | public/images/2026-09-29-osj17x-hankiho-president-instruction/thumb.jpg(+폴더) |
| 4 | 2026-09-29-rightmeet-mine-word-press-guideline | 다른 매체 제작 카드(방송사 로고 + 문구), 얼굴 없음 | ③ | 파이낸셜뉴스 9/21 속보(2025년 파일 사진 — 4a) · 파이낸셜뉴스 9/21(9/8 접경지 선전문구 사진 — 다른 일정) · 서울신문 9/21("사진과 기사는 관련 없음" — 4·6항) · YTN 9/21(사진 설명 없음) | — | public/images/2026-09-29-rightmeet-mine-word-press-guideline/thumb.jpg(+폴더) |
| 5 | 2026-09-30-kimeunhye-farmland-china-solar | 국회의원(공인) 셀프 영상 + 대통령·외국 정상 합성 + 주장 자막 | ③ | 매일신문 9/30(다른 인물인 당 대표의 농민 간담회 — 일반 농민 얼굴, 비난형 제목 + 다른 일정) · 뉴스핌 9/30(같은 행사, 400×260 — 8항) | — | public/images/2026-09-30-kimeunhye-farmland-china-solar/thumb.jpg(+폴더) |
| 6 | 2026-09-30-toktok-lee-classified-doc-sns | 대통령(공인) 사진 + 문건 캡처 합성 + "SNS 중독" 자막 | ③ | 국민일보·경향(2건)·시사저널·신아일보·아이뉴스24 — og:image가 모두 "대통령 X 캡처"(SNS 게시물 캡처 — 4항 불가) 또는 다른 일정 의원 사진(아이뉴스24 대표 사진 설명은 다른 의원의 본회의 퇴장) | — | public/images/2026-09-30-toktok-lee-classified-doc-sns/thumb.jpg(+폴더) |
| 7 | 2026-09-17-rekor-light-committee-disclosure | 위원회 현판·사무실 입구 사진 + 문구·계정 로고, 얼굴 없음 | ③ | 뉴데일리 9/17·뉴시스 7/17(7/17 출범 행사 대통령 사진 — 비난형 제목 "홈페이지도 명단도 없다" + 다른 일정) · 뉴시스 3/10(2025년 집회 참가자 — 일반 시민) · 세계일보(150×200 — 8항) · 아시아경제(몽골 순방 — 다른 사건) | — | public/images/2026-09-17-rekor-light-committee-disclosure/thumb.jpg(+폴더) |
| 8 | 2026-07-28-jeichi-amendment-term-claim | 국회·헌법책 연출 삽화 + 문구, 얼굴 없음 | ③ | 데일리안 8/26(대표 사진 설명 확인 불가) · 아시아경제 4/3(국회의장·원내대표 개헌안 기념 촬영 — 게시물의 "연임 = 임기 8년" 주장과 같은 개헌안·같은 시점인지 확인 불가, 4a) · MBC 5/7(사진 설명 없음) | — | public/images/2026-07-28-jeichi-amendment-term-claim/thumb.jpg(+폴더) |
| 9 | 2026-10-03-oct3-gwanghwamun-rally-scale | 스레드 이용자가 올린 고층 원경 집회 사진(얼굴 식별 불가) | ③ | 문화일보·세계일보 10/3(다른 집회 — 가자 규탄 집회) · 한국일보 10/3(숭례문 집회 참석자 구호 — 일반 시민 얼굴) · 주간경향 10/3(당 지도부와 **당원** — 당원은 §3.1 비공인) | — | public/images/2026-10-03-oct3-gwanghwamun-rally-scale/thumb.jpg(+폴더) |

## 영어본
- 9건 모두 `imageAlt`·`imageCaption` 삭제(ko `image:`·en image 필드 0 — grep).

## 본문 보완 1건 (#9)
- 사이트가 보여 주던 사진을 가리키던 문장을 원 게시물 설명으로 바꿈(사진이 내려가 "위 사진"이 가리킬 대상이 없어짐).
  - ko 53행: "…위 사진도 10월 4일에 공유된 것이며 촬영 시각은 원문에 표시되지 않았습니다." → "…10월 4일에 공유된 세종대로 일대 사진도 촬영 시각이 원문에 표시되지 않았습니다."
  - en 25행: "The photo above was also shared on Oct. 4, and the time it was taken is not shown in the original." → "A photo of the Sejong-daero area shared on Oct. 4 also does not show when it was taken."
  - 사실 내용은 같음 → `updatedAt` 변경 없음(리뷰 39의 minkyuhan 한 줄 처리와 같은 기준). 다른 8건 본문에 사이트 이미지를 가리키는 문장 0.

## updatedAt
- 9건 모두 변경 없음.

## 검증
- `npm run validate:content`: ✅ R=0. 대상 id 경고 1건은 **기존 description 길이 경고**(quickpolitics 162자 — description 미변경). 이미지 경고 0.
- `npm run check:hotlinks`: 점검 5건 · 정상 5건 · 깨짐 0건(이번 묶음 ② 0건 — 묶음 1·2의 5건 재확인).
- `/images/<id>/` 참조: 9건 ko·en 0. `public/images/<id>/` 폴더 9개 삭제.
- `git diff --cached`: 비어 있음.

## 바뀐 경로 (커밋 대상 27)
- 수정 18: `content/posts/{9 id}.md` · `content/posts-en/{9 id}.md`(#9는 본문 한 줄 포함)
- 삭제 9: `public/images/{9 id}/thumb.jpg`
- 문서: 이 트리거 · `instructions/uploader/processed/05-sns-image-batch-3.md`(이동)

## 리뷰어 참고
1. ② 0건 — Tier 1 나머지는 방송·국회 중계 화면, SNS 캡처 보도, 다른 일정 사진이 대부분이라 통과 사진이 없었다. 판정 근거 기사는 위 표에 모두 적음.
2. #2 서울신문 사진: 합참 작전부장의 계급을 사진 설명·본문에서 확인하지 못해 §3.1 기준(직위 확인한 것만)으로 비공인 처리. 계급을 다른 자료로 확인해 허용할지는 정책상 "사진 설명·명패·기사 본문" 한정이라 하지 않음.
3. #9 본문 한 줄 수정의 `updatedAt` 유지 판단.
