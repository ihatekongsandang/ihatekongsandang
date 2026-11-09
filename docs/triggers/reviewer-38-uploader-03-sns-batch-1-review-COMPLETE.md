# reviewer-38 — 업로더 03 SNS 저장본 묶음 1 커밋 전 게이트 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10 · 실행: 하위 에이전트
- 오더: `instructions/reviewer/processed/38-uploader-03-sns-batch-1-review.md`(이동)
- 선행 문서 직접 읽음: 업로더 03 트리거·오더, `docs/poster/guide.md` §2·§4·§4-1, `planning/card-image-policy.md` §3·§5.1~5.3, `planning/q1-redirect-q2-sns-image-plan.md` §3.3~3.5, `planning/card-image-uploader-steps.md` 단계 3·3-1, `content/README.md` §3.6
- 업로더 보고를 믿지 않고 직접 확인: 기사 3건 HTML·og:image·사진 설명을 curl로 받음, ② 이미지 3장과 HEAD 저장본 10장(`git show HEAD:public/images/<id>/thumb.jpg`), #1 업로더가 거른 뉴스1 사진 1장까지 **14장 전부 저장소 밖 임시 폴더에 받아 눈으로 봄**. 저장소에 이미지 넣지 않음.

## 전체 판정: ✅ 통과 (차단 결함 0 · P3 권고 1)

## 건별 판정
| # | id | 결과 | 단계 0(HEAD 저장본 직접 열람) | 리뷰어 확인 | 판정 |
|---|---|---|---|---|---|
| 1 | 2026-08-03-pagememo-nk-prosecution-reform-directive | ③ | 북한 지도자 판문점 사열 장면 + 주장 자막 — 업로더 기록과 일치 | ko image·en imageAlt/Caption 0, 폴더 없음, 참조 0, 이미지 외 diff 0 | ✅ |
| 2 | 2026-08-25-nowandhere-625-constitution-question | ③ | 국무총리 얼굴 + 인용 자막 + 채널 로고 — 일치 | 같음 | ✅ |
| 3 | 2026-08-29-idontknowpolitics-martial-law-nk-policy | ③ | 전직 대통령 연단 + "계엄은 옳았다" 자막 + 채널 로고 — 일치 | 같음 | ✅ |
| 4 | 2026-09-13-geonwoo-jinjoongkwon-2023-remark | ③(단계 0) | 교수(정책 §3.1 비공인) 얼굴 근접 + "긴급속보" 자막 — **비공인 얼굴 판정 맞음** | 같음 | ✅ |
| 5 | 2026-09-16-hagonolza-country-insult-bill | ③ | SNS 글 캡처 + 광장 집회 원경 + 오른쪽 잘린 인물 — 일치 | 같음 | ✅ |
| 6 | 2026-09-24-hagonolza-kctu-itaewon-claim | ③ | 글 캡처 + 다른 매체 뉴스 화면(북한 국기), 얼굴 없음 — 일치 | 같음 | ✅ |
| 7 | 2026-09-25-minkyuhan-nsl-security-priority | ② | 대통령 얼굴 + 채널 로고·"통째로 폐지" 자막·북한 국기 — 일치 | 아래 ② 표 | ✅ (P3-1) |
| 8 | 2026-09-26-issue365-lee-nsl-yusimin | ② | 대통령 얼굴 + 보도와 다른 자막 3줄 — 일치 | 아래 ② 표 | ✅ |
| 9 | 2026-09-28-facteye-dmz-mine-similar-object | ② | 장병(보호면) + 목함지뢰 모형 + 단정 자막 — 일치 | 아래 ② 표 | ✅ |
| 10 | 2026-09-28-themove-hongkong-umbrella-12th | ③(단계 0) | 지하철 객차 안 일반인이 쓰러진 사람을 안은 장면(피해자 성격) — **비공인 얼굴 판정 맞음** | 같음 | ✅ |

### ② 3건 상세
| 항목 | #7 경향신문 | #8 한국일보 | #9 파이낸셜뉴스 |
|---|---|---|---|
| `sourcePageUrl` = `sources[]` 언론 url 글자 그대로 | 일치(끝 `/` 포함) | 일치 | 일치 |
| 기사 페이지 og:image = `src` | 일치 | 일치 | 일치 |
| 이미지 GET / HEAD | 200 image/jpeg · 1200×780 | 200 image/jpeg · 1440×979 | 200 image/jpeg · 1200×593 |
| 원 기사 사진 설명(직접 추출) | 9/24(현지) 멕시코시티 호텔 동포 만찬간담회 인사말, 크레딧 연합뉴스 | 9/24(현지) 멕시코시티 동포 간담회 인사말, 크레딧 뉴시스 | 9/26 DMZ 내 지뢰 추정 폭발 사고 현장조사 기동로 확보·작전환경 조사, "합참 제공 영상 캡처" |
| 사용 제한 표기 | 없음 | 일반 고지("무단 전재 및 재배포 금지")만 | 일반 고지만 |
| 눈으로 본 내용 | 대통령 연단 발언, 배경 "…26. 9. 24.(목)", 앞쪽 참석자 머리는 흐림·뒷모습(§3.3-4 허용). 덧씌운 자막·로고·워터마크 없음 | 대통령 "멕시코 동포 간담회" 연단 발언, 다른 인물 없음, 자막·워터마크 없음 | 수풀 비탈의 헬멧 쓴 장병 뒷모습(흐린 영상 프레임), 얼굴 없음, 글자 없음 |
| 같은 사건·당시(4a) | 게시물이 비판하는 발언이 나온 그 행사 — 충족 | 같음 — 충족 | 판단 요청 (나) 참조 — 충족 |
| caption(ko) | 78자, 사진 설명과 일치, 단정 없음 | 74자, 일치 | 106자, 일치 |
| creditName / En | 연합뉴스 / Yonhap News Agency | 뉴시스 / Newsis | 합참 제공 / Joint Chiefs of Staff(정책 §5.2 예시 표기) |
| faceNote | 직위·활동·근거·부수 인물 기재 | 직위·활동·근거 | 얼굴 없음 |
| retrievedAt·license | 2026-11-10 · 없음 | 같음 | 같음 |
| 영어 imageAlt·imageCaption | 사진과 일치(오른손 들어 말함 — 화면 왼쪽 손이 본인 오른손, 맞음), 단정 없음 | 일치 | 일치 |

의혹·수사·재판 사안 아님(#7·#8 발언 논평, #9 군 발표) → §3.6 고지 문구 불요. 영어 imageCaption은 162~233자(ko 160자 권고는 ko caption 기준, 검증 경고 없음).

## 업로더 판단 요청에 대한 답
- **(가) #1 ③ 유지 — 타당.** 뉴스1 og:image를 직접 받아 보니 사진 설명은 "법무부장관과 무소속 의원이 7/31 본회의에서 형사소송법 개정안 필리버스터를 경청"이고, 화면 오른쪽 아래 매체 워터마크가 있다. ① 게시물이 다루는 사건은 2022년 보도된 북한 지령·충북동지회 사건이고 7/31 본회의는 원문이 다시 소개한 계기일 뿐이라 4a(같은 사건·당시)부터 맞지 않는다. ② "北 지령" 제목 아래 법안 처리 현장의 공인 2명 얼굴이 놓이면 지령과 연결된 것처럼 읽힐 위험이 있고 본문도 "직접 증거는 확인되지 않았다"고 적는다. ③이 맞다.
- **(나) #9 같은 사건으로 봄 — 타당.** 게시물은 9/21 DMZ 폭발 사고의 **조사 경과**(9/28 브리핑에서 공개된 목격 진술)를 다룬다. 사진은 그 사고 현장조사 장면이고 사진 설명이 촬영일(9/26)과 목적("지뢰 추정 폭발 사고 현장조사를 위해")을 밝힌다. 다른 사건 자료사진이 아니고 caption이 날짜·조사 장면임을 그대로 적어 브리핑 당일 사진으로 오인될 문구도 없다. "합참 제공 영상 캡처"는 기관 제공 영상의 장면이며 §5.3-4의 기사·SNS 화면 캡처가 아니다. 얼굴 없음. 허용.
- 단계 0 위험 단계 변경 없음 확인(10장 직접 열람 결과 업로더 기록과 모두 일치).

## 결함
- 차단(P1·P2): **0건**
- **P3-1(권고, 커밋 차단 아님)**: #7 본문 "이미지의 '국가보안법 통째로 폐지'는…"(ko 15행)·"The image's …"(en 15행). 이제 사이트에는 다른 사진(경향 og:image)이 보이므로 "원문 이미지의"/"The original image's"로 바꾸면 화면 사진과 헷갈리지 않는다. 다른 9건의 같은 계열 문장은 "썸네일 자막"·"첨부 이미지"·"원문 캡션과 썸네일"처럼 원문을 가리키는 말이라 문제없음. 업로더 트리거의 "사이트 이미지를 가리키는 문장 0건"은 #7 한 문장이 경계에 있다.
- 참고(범위 밖): 작업 트리에 `history/2026-10-01.md`·`2026-11-05.md`·`2026-11-09.md` 수정이 있다. 이 묶음 산출물이 아니므로 커밋 경로에 넣을지는 슈퍼바이저가 따로 확인.

## 수치
- 대상 10건 × ko·en = 20파일: 이미지 관련 줄 외 변경 **0줄**(`batch1-check.mjs`가 diff 전 줄 대조). `updatedAt`·description·본문 변경 0.
- `/images/<id>` 참조(content·src·public·scripts 전수): **0** × 10. `public/images/<id>/` 폴더: **0/10** 남음(HEAD에는 각 thumb.jpg 1개씩 10개).
- 저장본 수 재현: HEAD self 206 − 자체 제작 67 = **139** → 작업 트리 self 196 − 67 = **129**. `count-self-images.mjs`도 self 196 · news 3 · 이미지 없음 10(209건) 재현.
- `npm run validate:content`: 418파일 통과 · 오류 0 · news 3. 대상 id 경고 3건은 기존 description 길이(168·165·167자, 이번에 안 바뀜).
- `npm run check:hotlinks`: 점검 3 · 정상 3 · 깨짐 0(HEAD 200 image/jpeg).
- 저장소 독립 grep(대상 20 + 업로더 트리거·오더 + 이 오더 + 리뷰어 도구 4 = 27파일, '홍보물' 제외): **0건**.

## 도구 (`docs/tools/reviewer-38/`)
- `batch1-check.mjs` — 건별 필드·diff·참조·폴더·저장본 수(HEAD·작업 트리) 점검(.mjs라 tsc·eslint 대상 아님)
- `batch1-check-output.txt` · `validate-output.txt` · `hotlinks-output.txt` — 실행 출력(절대경로 0)

## 커밋 경로 목록
- 수정 20: `content/posts/{10 id}.md` · `content/posts-en/{10 id}.md`
- 삭제 10: `public/images/{10 id}/thumb.jpg`
- 업로더 문서 2: `docs/triggers/uploader-03-sns-image-batch-1-COMPLETE.md` · `instructions/uploader/processed/03-sns-image-batch-1.md`
- 리뷰어 문서: 이 트리거 · `instructions/reviewer/processed/38-uploader-03-sns-batch-1-review.md` · `docs/tools/reviewer-38/`(4파일)
