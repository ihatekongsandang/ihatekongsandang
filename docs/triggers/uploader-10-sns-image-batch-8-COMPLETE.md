# uploader-10-sns-image-batch-8 — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/10-sns-image-batch-8.md` (묶음 8 = TSV batch 8, 10건 — 오더 목록과 TSV 일치 확인)
- 기준: guide §4-1 판단 선례 + 이번 규칙(결과가 보도된 재판·수사 당사자 사진은 caption에 결과 한 문장, 신원 미확인 비공인 근거는 "이름·직위 확인 불가"). 근거 기사 og:image **16장 전부**(중복 주소 포함 고유 14장)를 받아 직접 봤고(목록 시트), 크기는 받은 파일 기준. 단계 0에서 군복 인물의 계급장 보임 여부·방송 진행자 여부를 구분했다. 트리거에 사진 기자·피의자 등 개인 이름 없음.
- 결과: **② 0건 · ③ 10건** · SNS 원문 저장본 **70 → 60**(`count-self-images.mjs` 중간 TSV: self 127 − 자체 제작 67 = 60)
- ② 0건이라 결과 한 문장 규칙을 적용할 caption은 없었다.
- git add·commit·push·빌드 하지 않음.

## 건별 표
| # | id | 단계 0(저장 이미지 직접 열람) | 결과 | 후보 og:image — 직접 본 내용 · 받은 파일 크기 · 판정 | 핫링크 | 지운 파일 |
|---|---|---|---|---|---|---|
| 1 | 2026-09-13-geonwoo-gwangju-rally | 야간 행진 참가자들(일반 시민) 얼굴 + 문구, 군복·진행자 없음 | ③(단계 0 즉시) | `sources[]` 언론 0건(게시물도 "언론 보도는 찾지 못했다"고 적음) | — | public/images/2026-09-13-geonwoo-gwangju-rally/thumb.jpg(+폴더) |
| 2 | 2026-09-13-idontknowpolitics-kangdong-hospital | 대통령(공인) 손 든 사진, 글자 없음 | ③ | 머니투데이 9/14(통일부 대변인 정례 브리핑 — 대변인은 §3.1 범위 밖, "MT 머니투데이" 워터마크, 1200×847 → 2항·워터마크) · 파이낸셜뉴스 9/20(현수막 "강동군병원 준공식 2025년 11월 19일" 앞 북한 지도자 연설, 옆 인물들 이름·직위 확인 불가, YONHAPNEWS 워터마크, 1200×800 → 다른 일정·9항·워터마크) · 허프포스트 9/20(같은 준공식 장면, 설명 "지난해 … 준공식" — 2025년 행사로 게시물의 2026년 지원 준비와 다른 일정, 600×400 → 4a·9항) · 강원일보 10/7(MDL 이남 지뢰 제거 작전 영상 캡처 + YONHAPNEWS 워터마크, 500×374 → 4a·8항·워터마크) · 머니투데이 10/8(북한 사격장 장면, "조선중앙TV 캡처 … 재판매 및 DB 금지", 1200×670 → 7항) · 헤럴드경제 10/5(설명 "지난달 30일 … 파주시 접경지대에서 바라본 북한군 초소", 1280×832 → 게시물(병원 장비 지원)과 다른 사건) | — | public/images/2026-09-13-idontknowpolitics-kangdong-hospital/thumb.jpg(+폴더) |
| 3 | 2026-09-14-yongkeun-justice-hearing-lee-trial | 국회의원(공인) + 대법관 **후보자**(후보자는 §3.1 범위 밖 → 비공인) + 뒤쪽 인물(이름·직위 확인 불가) + 자막, 군복·진행자 없음 | ③(단계 0 즉시) | — | — | public/images/2026-09-14-yongkeun-justice-hearing-lee-trial/thumb.jpg(+폴더) |
| 4 | 2026-09-15-choice-nk-budget-undecided | 대통령(공인) 근접, 글자 없음 | ③ | 이데일리 9/11 ①(대통령 파리 공동언론발표, 연단 글자 "파리 2026년 9월 8일 화요일"·"ÉLYSÉE", 설명 "8일(현지시간) 프랑스 파리 엘리제궁에서 … 공동언론발표" — 대북 예산 집행 사안과 다른 일정, 456×720 → 4a) · 이데일리 9/11 ②(통일부 로고와 "대북 인도지원 예산 현황" 표 **그래픽**, 1000×367 → 4·8항) | — | public/images/2026-09-15-choice-nk-budget-undecided/thumb.jpg(+폴더) |
| 5 | 2026-09-15-jindam-choo-resignation-petition | 광역단체장(공인) 마이크 발언 + 자막·행사명 글자, 군복·진행자 없음 | ③ | 경향 9/15(지사 기자회견, 설명 "지난달 5일 … '경기도 재정 비상 상황' 선언 기자회견" — 다른 일정, 860×573 → 4a) · 파이낸셜뉴스 9/17(지사 근접 + 뒤쪽 이름·직위 확인 불가 인물 + YONHAPNEWS 워터마크, 설명 "사진=연합뉴스"뿐, 1200×800 → 9항·워터마크·4a) | — | public/images/2026-09-15-jindam-choo-resignation-petition/thumb.jpg(+폴더) |
| 6 | 2026-09-15-joojinwoo-kimseungwon-hearing | 국회의원(공인) 셀프 영상 + 자막, 다른 인물 없음 | ③ | JTBC 9/15(청문회장 의원 2명 + 뒤 이름·직위 확인 불가 인물들, 600×337 → 8·9항) · 아시아경제 9/15(후보자가 물을 마시는 장면 + 사진 위 **기자 이름이 든 바이라인 표시**(덧씌운 글자), 745×466 → 워터마크·11항 성격) · 머니투데이 9/19(같은 청문회 의원 항의 장면 + "MT 머니투데이" 워터마크, 1200×803 → 워터마크) | — | public/images/2026-09-15-joojinwoo-kimseungwon-hearing/thumb.jpg(+폴더) |
| 7 | 2026-09-16-idontknowpolitics-2023-warrant-dismissed | 방송 뉴스 화면 — **앵커 얼굴**(방송 진행자 = 비공인) + 자막·로고 | ③(단계 0 즉시) | — | — | public/images/2026-09-16-idontknowpolitics-2023-warrant-dismissed/thumb.jpg(+폴더) |
| 8 | 2026-09-16-pickmag-china-visa-free-petition | 오성홍기·국회 청원 화면 합성 + 문구, 원경 행인 작음 | ③ | 서울신문 9/15(지난해 크루즈터미널로 입국하는 중국인 관광객 — 일반인 정면 얼굴, 1200×756 → 2항·다른 일정) · 디지털타임스 9/15(국회 전자청원 화면 캡처 + 관광객 사진 합성, 1200×691 → 4항) · 서울신문 8/12(체포영장 집행 — 수갑 찬 피의자(얼굴 흐림), 1200×900 → 10항·다른 사건) | — | public/images/2026-09-16-pickmag-china-visa-free-petition/thumb.jpg(+폴더) |
| 9 | 2026-09-16-sisabriefing-nk-budget | 대통령(공인) + 계정 로고·문구 | ③ | #4와 같은 이데일리 9/11 기사 2건 — 파리 공동언론발표 사진(456×720 → 4a) · 예산 표 그래픽(1000×367 → 4·8항) | — | public/images/2026-09-16-sisabriefing-nk-budget/thumb.jpg(+폴더) |
| 10 | 2026-09-17-hagonolza-changwon-spy-indictment | **피고인들 얼굴**(모자이크·마스크, 비공인 확정 전 당사자) + 문구 | ③(단계 0 즉시) | — | — | public/images/2026-09-17-hagonolza-changwon-spy-indictment/thumb.jpg(+폴더) |

## 영어본
- 10건 모두 `imageAlt`·`imageCaption` 삭제(ko `image:`·en image 필드 0 — grep).
- 10건 ko·en 본문에 사이트 이미지를 가리키는 문장 0(grep).

## updatedAt
- 10건 모두 변경 없음.

## 검증
- `npm run validate:content`: ✅ R=0(418파일 · 오류 0). 대상 id 경고 0.
- `npm run check:hotlinks`: 점검 12건 · 정상 12건 · 깨짐 0건(이번 ② 0건 — 앞 묶음 12건 재확인).
- `/images/<id>/` 참조 0 · `public/images/<id>/` 폴더 10개 삭제 · `git diff --cached` 비어 있음.

## 바뀐 경로 (커밋 대상 30)
- 수정 20: `content/posts/{10 id}.md` · `content/posts-en/{10 id}.md`
- 삭제 10: `public/images/{10 id}/thumb.jpg`
- 문서: 이 트리거 · `instructions/uploader/processed/10-sns-image-batch-8.md`(이동)

## 리뷰어 참고
1. #3 대법관 후보자를 §3.1 범위 밖(비공인)으로 봤다 — 후보자 본인이 현직 법관인지 사진·설명으로 확인되지 않았다.
2. #6 아시아경제 사진의 기자 바이라인 표시는 이미지에 얹힌 글자라 워터마크와 같게 보았다(트리거에 그 이름은 적지 않음).
