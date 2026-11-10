# 리뷰어 64 — 자체 제작 카드 마무리 묶음 5(업로더 25) 검토 — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11
- 오더: `instructions/reviewer/processed/64-poster-image-67-5-review.md`(이동)
- 대상: `docs/triggers/poster-image-67-5-COMPLETE.md`, 작업 트리 변경(게시물 ko 29·en 29, `public/images/` 29개 삭제)
- 빌드 0, git 쓰기 0, `src/` 수정 0. `npm run validate:content`만 돌렸다. 받은 기사 HTML 23건과 og:image 22장은 저장소 밖 임시 폴더(`$TMPDIR/r64`)에만 두었다.

## 판정: ✅ 통과 (P1 0 · P2 0 · P3 4)
- 29건 모두 ③(B 6 · 이미지 없음 23)이 맞다. 처리 방식, 마무리 조건(자체 카드 0 · `public/images` 0 · 깨진 참조 0 · validate self 0 · news 33)도 모두 직접 확인했다.
- P3는 업로더 트리거의 판정 사유 문구 2곳, 작업 트리에 동시에 생긴 다른 오더 변경 1건, 5번 문구 목록 후속 1건이다. 29건의 결과는 바뀌지 않는다.

## 1. B 6건 — 원문·사진 직접 확인 (기사 23건 전부 받음)
`sources[]` 23건을 모두 다시 받았다. 받은 기사의 og:image와 사진 설명을 읽었고, 크기는 `sips`로, 얼굴은 Vision으로 쟀다. 건마다 불가 사유를 하나 이상 직접 확인했다.

| tsv | id | 직접 확인한 불가 사유 | 업로더 판정과 |
|---|---|---|---|
| #32 | `2026-10-08-focusone-ganghwa-drifting-mine` | 한국경제: 사진 설명이 "지난 8월 12일 … 유실지뢰를 탐색" — 게시물 사안(10/8 발견)과 다른 날 작업(4a)<br>아주경제: "5일 … 국방부 … 브리핑" — 다른 일정(4a)<br>강원도민일보: 800×374, 짧은 변 374 < 400(8항) | 같음 |
| #33 | `2026-10-08-monarch-us-congress-ccp-influence-korea` | VOA 9/30: "(2026년 1월 5일 / 자료사진)" 정상회담(4a)<br>VOA 10/6: "미국 의회 전경", 촬영 시점 없음(4a)<br>서울경제: 의회 전경, 시점 없음(4a)<br>Washington Times: 직접 요청해도 **HTTP 403**(5,993바이트 확인 화면). 우회하지 않았다. 판정할 수 없어 불가(§5.1) | 같음 |
| #36 | `2026-10-09-gotdemcatch-lee-five-trials-suspended` | 법률신문: 600×400, 사진 설명 없음(촬영 시점·장소 없음, 4a)<br>머니투데이: "9일 … 헌법재판소 전경"(다른 대상, 4a)<br>경향: "… 교수. 경향신문 자료사진"(4a — P3-2)<br>연합: "14일 청와대 … 국무회의에 입장"(다른 일정, 4a). 배석자 2명이 정면<br>동아 2021: "© News1 DB"(4a)<br>동아 2026: "2026.4.14 … 청문회에서 발언"(다른 일정, 4a — P3-1) | ③ 같음. 사유 문구 2곳은 P3 |
| #37 | `2026-10-09-themovemag-chinese-residents-1m` | 한경 10/5: 대림동 거리, 촬영 시점 없음(장소 사진 4a)<br>한경 2025: "지난 14일 국회 … 국정감사 … 답변"(다른 사안, 4a)<br>한경 9/20: figcaption "사진=뉴스1"만 있고 시점·장소 없음(4a)<br>한경 5/29: 사진 설명 없음(직접 봄: 전망대 원경 시민, 4a)<br>매일: "자료사진 연합뉴스"(4a), 523×334(8항) | 같음 |
| #42 | `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial` | 프리진: og 300×180(8항), "ⓒ 독자 제공"<br>펜앤: 300×293(8항), "[온라인 커뮤니티 캡처]"(4항)<br>뉴시스: 2019-03-29 기사, "천도제 (사진=독자 제공)" — 다른 해 다른 행사(4a)<br>tsv `B 조건부`의 조건(권리자 확인·옛 사진 아님)을 채우지 못함 | 같음 |
| #56 | `2026-10-20-monarchreport25-lee-kim-held-back-2025` | 한국일보 "지난 21일 … CNN과 인터뷰", 경향 "지난 22일 … CNN과 인터뷰" — 두 사진 설명의 날짜가 엇갈려 판정할 수 없다<br>경향 사진: 왼쪽 배석자(신원 미확인)가 정면. Vision은 측면·가림 때문에 대통령 1명(8.4%)만 잡았고, 배석자는 눈으로 짧은 변의 5%를 넘는다(9항) | 같음 |

- 선례 4개 준수:
  - 사진은 모두 `sources[]` 기사에서만 골랐다. 출처 밖 후보는 0이다.
  - 명패·현판으로 실명이 읽히는 사진은 해당 없음(②가 없음).
  - 의혹 대상 조직의 비공인 정면 사진은 해당 없음.
  - 4.5~5% 구간 재측정은 해당 없음(②가 없음).
- B 결과: **② 0 · ③ 6**.

## 2. 이미지 없음 23건 — 목록 전수 대조
`post-recheck.tsv` 67행의 옛 id를 `content/moved-ids.txt`로 새 id에 맞췄다. 그다음 바뀐 ko 29개 파일 id와 하나씩 대조했다(스크립트 대조, 결과는 임시 폴더에만 둠).

- tsv `없음` **20**: #2·#4·#7·#13·#14·#19·#27·#30·#39·#40·#41·#45·#49·#51·#53·#59·#60·#62·#64·#65.
- tsv `없음(권고)` **1**: #67.
- tsv `정책 결정 필요` **1**: #48. 지침 단계 1 해소표 110행이 "1a에서 제외(피의자) → 이미지 없음"으로 정했다.
- tsv 밖 **1**: `2026-09-30-2pro-unc-armistice-violation`.
- B **6**: #32·#33·#36·#37·#56 `B`, #42 `B 조건부`.
- 합 23 + 6 = **29**. 업로더 표와 한 건도 다르지 않다. 29개 모두 현재 파일이 있다.
- **#1** `2026-08-06-owloffreedom-707-commander-sentencing`:
  - ko·en 모두 이번 diff가 없다(파일을 바꾸지 않음).
  - `image`·`imageAlt` 0, `public/images` 폴더 0.
  - 이니셜 표기 ko 11곳·en 12곳.
  - `updatedAt: 2026-11-09`(이전 정리 값). 지침 단계 1 "#1 게시물과 #67"과 충돌 없음.
- **#67**: 바뀐 것은 image 4줄, en 2줄, 문장 1곳씩뿐이다. 이니셜 처리된 부분은 건드리지 않았다. 충돌 없음.
- **1~3차 실명 정리와 충돌 여부**:
  - 바뀐 58개 파일과 #1 ko·en 2개에 실명 패턴(1~3차 인물 47행, 임시 폴더)을 돌렸다.
  - 범위 없는(전역) 패턴 중 맞은 것은 P020(가 G1 공인)과 P146 채널명 2곳뿐이다.
  - P146 채널명 2곳(`2026-11-01-eodguri-war-term-extension-claim` ko)은 HEAD에도 그대로 있고 이번 diff 밖이다. 리뷰어 57이 "출처 채널 표기라 결함 아님"으로 정리한 것과 같다.
  - 범위 있는 짧은 패턴이 그 범위 밖 영어 파일에서 맞은 것은 오탐이라 세지 않았다(지난 묶음과 같은 방식).
  - 이번 diff가 새로 넣은 글자는 "쓰지 않았습니다"·"did not use" 계열뿐이다. **충돌 없음.**

## 3. 처리 방식 전수 (diff 줄 수 대조)
- `git diff --numstat`, 58개 파일:
  - ko 23개 1+/5−, ko 6개 0+/4−.
  - en 23개 1+/3−, en 6개 0+/2−.
- 지운 줄을 종류별로 셌다:
  - `image:` 29 · `src: /images/…` 29 · `alt:` 29 · `caption:` 29(ko 블록 4줄 × 29).
  - `imageAlt:` 29 · `imageCaption:` 29(en).
  - 그 밖에 지운 줄 46 = 더한 줄 46. 모두 문장을 바꾼 1:1 짝이다.
  - **다른 필드·본문 삭제 0, `updatedAt` 변경 0**(선례 묶음 1~4와 같음).
- 지운 `src`는 29건 모두 `/images/{자기 id}/thumb.jpg`다(불일치 0).
- 지운 `public/images` 29개 폴더는 ko 29개 id와 1:1이다. ko·en 파일 목록도 1:1이다.
- 문장 짝 46개는 공통 앞뒤를 잘라 바뀐 부분만 전부 읽었다:
  - ko 23: "대신 자체 제작 카드를 썼" → "는/은 쓰지 않았"(17). 나머지는 "원문 썸네일은 쓰지 않았" 3, "쓰지 않았" 2, 앞 문장과 합친 "…고 자체 제작 카드를 썼" → "…았" 2.
  - leejinsook 1건은 그 문장만 지웠다.
  - en 23: "used a card made by this site (instead of)" → "did not use (the original …/it)" 등. leejinsook 1건은 "We used a card made by this site."만 지웠다.
  - 고친 문장 8건을 앞뒤 문맥과 함께 다시 읽었다. 뜻이 통하고 사실과 맞다.
- 남은 "자체 제작"·"made by this site"·"텍스트 카드": 29개 ko·en 모두 **0**.

## 4. 마무리 (직접 셈)
- `content/posts`·`content/posts-en`의 `/images/` 줄: **0**.
- `image:` 블록이 있는 ko 33개는 모두 `kind: news`다(33).
- `public/images/`: `.gitkeep` 1개뿐(`find` 1). 폴더 0. 깨진 참조 0(참조 자체가 0).
- `npm run validate:content`:
  - 종료 코드 0, 418/418 통과, "✅ 검증 통과".
  - **대표 이미지 종류: self 0 · public 0 · news 33**, 이미지 alt 33.
  - 경고 22개는 묶음 2 기준선과 한 줄도 다르지 않다(diff 0).

## 5. 자체 카드 0이 되어 사실과 달라진 문구 (보고만 · 고치지 않음)
### 방문자 문구
- `src/app/(ko)/about/page.tsx`
  - 위치: HEAD 93~96행 `<li>`.
  - 문구: "일부 글은 이 사이트가 게시물 요지를 정리해 만든 카드 이미지를 씁니다. 이 이미지도 차례로 바꿉니다."
  - 지금은 사실이 아니다.
- `src/app/(en)/en/about/page.tsx`
  - 위치: HEAD 52~55행 `<li>`.
  - 문구: "Some posts use a card image this site made … replaced step by step." 같은 취지다.
  - → 두 줄 모두 **프로그래머 18 오더(`instructions/programmer/18-about-self-card-line-remove.md`)가 작업 트리에서 지우는 중**이다(P3-3).
- 그 밖에 맞지 않는 방문자 문구는 0이다. 확인한 곳:
  - 약관 ko 85·111행, en 87·119행: "원문 이미지 사용 중단"·"이미지 교체" — news 이미지에도 그대로 맞다.
  - `src/app/llms.txt/route.ts`: 이미지 언급 0.
  - `src/lib/i18n.ts`: `noImage`·`sourcePreview*`는 자체 카드 언급 없음.
  - 소개 "공공누리 … (현재 쓰는 사진은 없습니다)": public 0이라 맞다.
### 코드 주석 (방문자에게 안 보임)
- `src/components/card-media.tsx:29`: "그 이미지 파일 207건은 콘텐츠가 바뀔 때까지 `image`로 그대로 보인다" → 지금은 0건.
- `src/components/post-detail.tsx:31`: "self 이미지의 caption(내부 판정 메모가 섞인 206건)" → 지금은 0건.
- `src/lib/content/schema.ts:47`: `self` 정의 "운영자가 만든 이미지(기존 텍스트 카드 등). 생략하면 이 값이다" — 정의로는 맞지만 지금 쓰는 게시물은 0이다(바꿀지는 선택).
### 내부 문서
- `planning/prd.md:325`: "사이트가 만든 텍스트 카드 이미지 67건은 별도 단계로 남아 있다" → **사실과 다름**(0건).
- `planning/q1-redirect-q2-sns-image-plan.md` §3.4 완료 조건 표:
  - :287 ② 근거 칸 "`public/images/` 폴더 67개 = 자체 제작 카드 67건" → 지금은 0개.
  - :288 ③ "셋째 줄(자체 제작 카드 "차례로 바꿉니다")은 67건이 남아 있는 동안 유지" → 삭제 조건이 채워졌다(프로그래머 18).
- `planning/card-image-policy.md`:
  - :6 "대상: 자체 제작 텍스트 카드 67건"과 :75 방향 행 — 대상 정의로는 맞다.
  - §11(:388 부근)에는 "자체 카드 정리 완료·0건(② 10 · ③ 57)" 같은 현재 사실 줄이 없다. 추가 권고.
- `planning/card-image-uploader-steps.md:198`(약 53개 문장 갱신)과 `planning/v0.9-copy-and-code-list.md:261`(같은 항목) — 작업 항목 상태가 "완료"로 적혀 있지 않다.
- `content/README.md`:
  - :87·:195 `self` 설명("운영자 제작 카드 이미지")은 정의로는 맞다.
  - :195에 "SNS 저장본 0건"은 적혀 있지만 "자체 카드도 0건"은 없다. 추가 권고.
- `planning/prd.md:87`과 q1 계획 :148·:205는 당시 건수 기록이라 그대로 두어도 된다.
- 67건 전체 결과(묶음 1~5 트리거 합): ② 10(4·3·3·0·0), ③ 57(1·9·8·10·29).

## 6. P 목록
- **P1 0 · P2 0.**
- **P3-1** 업로더 트리거 1절 #36 동아 2026 사유
  - 문구: "다른 인물(퇴직 지방 부지사 — §3.1 공인 범위 밖)".
  - 리뷰어 57이 고친 판정표 P020 = **가 G1(공인)**과 어긋난다.
  - ③ 결론은 그대로다(사진 설명 "2026.4.14 … 청문회" = 다른 일정, 4a). 트리거 문구만 다음에 고칠지 판단.
- **P3-2** 업로더 트리거 1절 #36 경향
  - 문구: "사진 설명 없음(파일명 2026-06-02)". 실제로는 og:image와 같은 사진에 설명 "… 교수. 경향신문 자료사진"이 있다.
  - 사진 속 인물은 게시물이 이니셜로 처리한 사람이다.
  - ③ 결론은 그대로다(자료사진 4a).
- **P3-3** 동시 변경
  - 리뷰 중(08:49) 작업 트리에 ` M src/app/(ko)/about/page.tsx`, ` M src/app/(en)/en/about/page.tsx`가 생겼다. 각 4줄 삭제이고, 프로그래머 18 오더 변경이다.
  - 업로더 25 변경이 아니고, 이 리뷰는 이 변경을 검토하지 않았다. **아래 커밋 경로에서 뺐다.**
  - 업로더 트리거 6절 `git status`에 없는 것은 시점 차이다.
  - 프로그래머 18이 빌드하므로, 묶음 5 커밋 전에 슈퍼바이저가 경로를 나눠서 add해야 한다.
- **P3-4** 5번 목록의 내부 문서 갱신
  - 대상: prd :325, q1 §3.4 :287·:288, 정책 §11, README :195, 코드 주석 2곳.
  - 기획자·프로그래머 후속 오더 입력으로 쓴다. 방문자 문구는 프로그래머 18이 처리 중이다.

## 7. 커밋 경로 (묶음 5 — 87 + 문서 4)
- 게시물 ko 29: `content/posts/` 아래 다음 id의 `.md`
- 게시물 en 29: `content/posts-en/` 아래 같은 id의 `.md`
- 삭제 29: `public/images/{같은 id}/thumb.jpg`
- id 29:
  - `2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract`
  - `2026-09-13-geonwoo-518-list-disclosure-citizen`
  - `2026-09-22-emong-nk-contact-law`
  - `2026-09-29-momamour-westsea-vs-dmz-comparison`
  - `2026-09-30-2pro-unc-armistice-violation`
  - `2026-09-30-monarch-former-ambassador-church-claims`
  - `2026-10-04-ycherish-oct3-rally-media`
  - `2026-10-07-rinha-chosun-column-chongryon-visit`
  - `2026-10-08-ansanheart-daejangdong-recording-2025`
  - `2026-10-08-focusone-ganghwa-drifting-mine`
  - `2026-10-08-monarch-us-congress-ccp-influence-korea`
  - `2026-10-09-gotdemcatch-lee-five-trials-suspended`
  - `2026-10-09-themovemag-chinese-residents-1m`
  - `2026-10-10-news1min-nps-foreigner-late-payment`
  - `2026-10-10-ribonpig-gyeonggi-childcare-budget`
  - `2026-10-10-rocketissue-kei-poll-korea-defense`
  - `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial`
  - `2026-10-12-conpoli88-parkjiwon-nk-remittance-nis`
  - `2026-10-12-minkyuhantv-german-spy-chief`
  - `2026-10-13-brieftag-kadiz-data-withheld`
  - `2026-10-14-2pro-nk-slcm-not-announced`
  - `2026-10-14-knn-fake-mnd-chinese-recruit-poster`
  - `2026-10-20-monarchreport25-lee-kim-held-back-2025`
  - `2026-10-28-donga-nk-submarine-infiltration-drills`
  - `2026-10-29-khan-nk-srbm-launch-wonsan`
  - `2026-11-01-eodguri-war-term-extension-claim`
  - `2026-11-03-wikipost-marine-officer-kimjongun-photo`
  - `2026-11-04-leejinsook-martial-law-soldiers-presser`
  - `2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019`
- 문서 4:
  - `docs/triggers/poster-image-67-5-COMPLETE.md`
  - `instructions/uploader/processed/25-self-card-67-batch-5-final.md`
  - `docs/triggers/reviewer-64-poster-image-67-5-review-COMPLETE.md`(이 파일)
  - `instructions/reviewer/processed/64-poster-image-67-5-review.md`
- **빼는 것**:
  - `src/app/(ko)/about/page.tsx`, `src/app/(en)/en/about/page.tsx`(프로그래머 18).
  - `history/*`, 그 밖에 이전부터 있던 미추적 파일.

## 7-1. 다음 묶음에 대한 의견
- 자체 카드 67건 정리는 이번으로 끝난다(남은 0).
- 이번처럼 B 소수와 일괄 ③을 섞은 29건 묶음도 기사 전수 확인으로 한 번에 검토할 수 있었다. 판정이 필요한 B가 10건을 넘으면 10건 안팎으로 나누기를 권한다.
