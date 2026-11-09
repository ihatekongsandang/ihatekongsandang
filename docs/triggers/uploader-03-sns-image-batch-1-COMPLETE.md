# uploader-03-sns-image-batch-1 — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/03-sns-image-batch-1.md` (묶음 1 = `docs/tools/planner-16/sns-image-batches.tsv` batch 1, 10건)
- 결과: **② 3건 · ③ 7건** · SNS 원문 저장본 **139 → 129**(`count-self-images.mjs` 중간 TSV에서 self 196 − 자체 제작 67 = 129, 작업 전 self 206 − 67 = 139)
- 원 이미지는 저장소 밖 임시 폴더에서만 열람했고 커밋 대상에 없다. git add·commit·push·빌드 하지 않음.

## 건별 표
| # | id | 단계 0 판정(저장 이미지 직접 열람) | 결과 | 사진 출처 기사 · 사진 설명(크레딧) | 핫링크 응답 | 지운 파일 |
|---|---|---|---|---|---|---|
| 1 | 2026-08-03-pagememo-nk-prosecution-reform-directive | 북한 지도자 얼굴(공인) — 2018-04-27 판문점 사열 장면(다른 사건) + 주장 문구 자막 | ③ | 시도: 뉴데일리 2022-05-01(2018 판문점 사진 → 4a 불가) · 서울신문(로고 공유 이미지) · 서울경제(대표 사진 설명 없음) · 뉴데일리 2025-09-11(og:image 없음) · 뉴스1 2026-07-31(법무부 장관·의원의 7/31 본회의 장면 — 공인·공적 활동이지만 제목 "北 지령… 검찰개혁안 통과" 바로 아래 법안 처리 당사자 얼굴이 놓여 지령과 연결된 것처럼 읽힐 위험이 커 쓰지 않음. 리뷰어 판단 요청) | — | public/images/2026-08-03-pagememo-nk-prosecution-reform-directive/thumb.jpg(+폴더) |
| 2 | 2026-08-25-nowandhere-625-constitution-question | 국무총리 얼굴(공인, 예결위) + 총리 발언이 아닌 인용 자막(11항 성격) | ③ | 시도: 아시아경제 2026-04-05(다른 사건 — 4월 부활절 미사 정당 대표 사진, 4a 불가) · KNN 유튜브 썸네일(방송사 로고·"그럼 6.25는 안 되나?" 등 큰 자막 → 4·11항 불가) | — | public/images/2026-08-25-nowandhere-625-constitution-question/thumb.jpg(+폴더) |
| 3 | 2026-08-29-idontknowpolitics-martial-law-nk-policy | 전직 대통령 얼굴(공인) 방송 화면 + "계엄은 옳았다" 자막 + 다른 채널 로고 | ③ | 시도 안 함: 여러 시점·사건(청문회·경축사·확성기 철거·방첩사 해체 등)을 묶은 정리 글이라 "같은 사건·사건 당시"(4a) 사진을 하나로 정할 수 없어 바로 ③(계획 §3.4 "판단이 오래 걸리면 ③") | — | public/images/2026-08-29-idontknowpolitics-martial-law-nk-policy/thumb.jpg(+폴더) |
| 4 | 2026-09-13-geonwoo-jinjoongkwon-2023-remark | **비공인 얼굴**(교수·평론가 — 정책 §3.1 비공인) + "긴급속보" 자막 | ③(단계 0 즉시) | — | — | public/images/2026-09-13-geonwoo-jinjoongkwon-2023-remark/thumb.jpg(+폴더) |
| 5 | 2026-09-16-hagonolza-country-insult-bill | SNS 글 캡처 + 집회 군중(일반 시민 원경, 앞줄 피켓) + 잘린 인물 | ③ | 시도: 세계일보 2025-11-07(반중 집회 참가자 — 일반 시민 정면 → 불가) · YTN 2025-11-06(국회 기자회견 화면, 사진 설명 없음 → 캡션 없는 인물 사진 불가, 가장자리 신원 미확인 인물) | — | public/images/2026-09-16-hagonolza-country-insult-bill/thumb.jpg(+폴더) |
| 6 | 2026-09-24-hagonolza-kctu-itaewon-claim | SNS 글 캡처(보도와 다른 단정 문구) + 다른 매체 뉴스 화면(북한 국기), 얼굴 없음 | ③ | 시도: 세계일보 2024-11-24(2023-05-10 중간수사 결과 발표 — 1심 선고와 다른 시점 → 4a 불가) · 경향신문 2025-05-15(법원 청사 전경, 촬영 시점 표기 없음 → 4a 불가) · 뉴스1 2025-09-25(2019년 대법원 전경·짧은 변 246px → 4a·8항 불가) | — | public/images/2026-09-24-hagonolza-kctu-itaewon-claim/thumb.jpg(+폴더) |
| 7 | 2026-09-25-minkyuhan-nsl-security-priority | 현직 대통령 얼굴(공인) + 다른 채널 로고·"통째로 폐지" 단정 자막·북한 국기 합성 | **②** | 경향신문 2026-09-25 `og:image` — "이재명 대통령이 24일(현지시간) 멕시코시티 한 호텔에서 열린 동포 만찬간담회에서 인사말을 하고 있다. 연합뉴스" (게시물이 다루는 발언이 나온 같은 행사) · 1200×780 · 사용 제한 표기 없음(일반 고지만) | 200 image/jpeg (curl·check:hotlinks HEAD) | public/images/2026-09-25-minkyuhan-nsl-security-priority/thumb.jpg(+폴더) |
| 8 | 2026-09-26-issue365-lee-nsl-yusimin | 현직 대통령 얼굴(공인) + 보도와 다른 자막 3줄 | **②** | 한국일보 2026-09-25 `og:image` — "이재명 대통령이 24일(현지 시간) 멕시코 멕시코시티에서 열린 동포 간담회에서 인사말을 하고 있다. 멕시코시티=뉴시스" (같은 행사) · 1440×979 · 사용 제한 표기 없음(일반 고지만) | 200 image/jpeg | public/images/2026-09-26-issue365-lee-nsl-yusimin/thumb.jpg(+폴더) |
| 9 | 2026-09-28-facteye-dmz-mine-similar-object | 장병(비공인) — 보호면·측면으로 얼굴 식별 어려움, 손 근접 + "북한 목함지뢰가 맞았다" 단정 자막 | **②** | 파이낸셜뉴스 2026-09-28 `og:image` — "군과 유엔군사령부가 서부전선에서 발생한 지뢰 추정 폭발 사고 현장조사를 위해 지난 26일 비무장지대(DMZ) 내에서 기동로 확보 및 작전환경 조사 활동을 하는 모습. 합참 제공 영상 캡처" · 1200×593 · 얼굴 없음(수풀 속 장병 뒷모습) · 자막·글자 없음 · 사용 제한 표기 없음 | 200 image/jpeg | public/images/2026-09-28-facteye-dmz-mine-similar-object/thumb.jpg(+폴더) |
| 10 | 2026-09-28-themove-hongkong-umbrella-12th | **비공인 얼굴**(2019 홍콩 시위 현장 일반인 — 피해자 성격 장면) + 문구 | ③(단계 0 즉시) | — | — | public/images/2026-09-28-themove-hongkong-umbrella-12th/thumb.jpg(+폴더) |

### ② 3건 점검 기록
- **인물 판정**(#7·#8): 현직 대통령(정책 §3.1 고위공직자) — 해외 순방 중 동포 간담회 인사말(§3.2 공식 일정) — 근거는 원 기사 사진 설명. #7 앞쪽 참석자는 초점 밖 흐림·뒷모습(§3.3 4항 허용). #8 다른 인물 없음.
- **같은 사건·사건 당시(4a)**: #7·#8 게시물은 9/24(현지시간) 멕시코 동포간담회 발언을 다룬다 — 사진 설명의 "24일(현지시간) 멕시코시티 … 동포 (만찬)간담회"와 일치. 화면 뒤 "2026. 9. 24.(목)" 표기도 보임(#7). #9 게시물은 DMZ 지뢰 추정 폭발 사고(9/21) 현장조사에서 나온 목격 진술(9/28 브리핑)을 다룬다 — 사진 설명 "지난 26일 … 현장조사를 위해 … 조사 활동"으로 같은 사건의 조사 장면이고 촬영일 9/26 명시. 브리핑 당일 사진은 아니어서 리뷰어 확인 요청.
- **제외 11항**: 1(7종) 해당 없음 · 2·3 비공인 얼굴 없음 · 4 로고·그래픽·SNS 캡처 아님(#9는 "합참 제공 영상 캡처" — 기관 제공 영상의 장면이며 기사·SNS 화면 캡처 아님, 판단 근거로 적음) · 5 해당 없음 · 6 맥락 일치 · 7 사용 제한 표기 없음(각 기사 하단 일반 고지만) · 8 짧은 변 780·979·593px ≥400 · 9 신원 미확인 인물 없음 · 10 해당 없음 · 11 이미지에 의혹·판결 서술 글자 없음(#7 배경 행사 현수막 글자는 일반 현수막).
- **의혹 사안 여부**: #7·#8은 발언 논평, #9는 군 발표 — 의혹·수사·재판 사안 아님. caption은 정책 §3.6 3열 "얼굴 없음"(#9)·사실 서술(#7·#8) 형식, 160자 이내.
- **frontmatter**: `kind: news`, `src` = og:image 그대로, `sourcePageUrl` = 각 게시물 `sources[].url` 글자 그대로(#7 경향 주소 끝 `/` 포함), `retrievedAt: 2026-11-10`, `license` 없음, `faceNote` 기재. 덧씌우기 없음.

## 영어본
- ② 3건: `imageAlt`·`imageCaption`을 새 사진 기준으로 교체(옛 "Thumbnail of the original post" 문구 0).
- ③ 7건: `imageAlt`·`imageCaption` 삭제.
- 본문에서 "원문의 썸네일·첨부 이미지"를 설명하는 문장은 원 게시물 설명이라 그대로 둠(사이트가 보여 주는 이미지를 가리키는 문장은 ko·en 모두 0건 — grep 확인).

## updatedAt
- 10건 모두 변경 없음(이미지 교체·삭제만 — card-image-uploader-steps 단계 3 규칙).

## 검증
- `npm run validate:content`: ✅ R=0. 대상 id 경고 3건은 모두 **기존 description 길이 경고**(pagememo 168자·kctu 165자·facteye 167자 — 이번에 description을 건드리지 않음). 이미지·caption 관련 경고 0.
- `npm run check:hotlinks`: 점검 3건 · 정상 3건 · 깨짐 0건(모두 HEAD 200 image/jpeg).
- `/images/<id>/` 참조: 10건 ko·en 모두 0. `public/images/<id>/` 폴더 10개 삭제.
- `git diff --cached`: 비어 있음(스테이징 없음).

## 바뀐 경로 (커밋 대상 30)
- 수정 20: `content/posts/{10 id}.md` · `content/posts-en/{10 id}.md`
- 삭제 10: `public/images/{10 id}/thumb.jpg`
- 문서: 이 트리거 · `instructions/uploader/processed/03-sns-image-batch-1.md`(이동)

## 리뷰어 판단 요청
1. #1 뉴스1 사진(장관·의원 7/31 본회의) — 정책상 허용 가능하나 "北 지령" 제목과의 결합 위험으로 ③. 이 판단을 유지할지.
2. #9 사진 날짜(9/26 현장조사) vs 게시물 핵심(9/28 브리핑) — 같은 사건의 조사 장면으로 보아 ②.
3. 단계 0 위험 단계 변경: 없음(10건 모두 Tier 1 유지). #4·#10은 단계 0에서 비공인 얼굴로 즉시 ③.
