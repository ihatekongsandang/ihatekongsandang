# uploader-08-sns-image-batch-6 — COMPLETE

- 담당: 반공-업로더 · 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/08-sns-image-batch-6.md` (묶음 6 = TSV batch 6, 10건 — 오더 목록과 TSV 일치 확인)
- 기준: guide §4-1 판단 선례 + 이번 추가 규칙(트리거에 사진 기자 등 개인 이름 금지 — 크레딧은 매체·통신사명까지, 후보 크기 빠짐없이 기록). 근거 기사 og:image **15장 전부**를 받아 직접 봤고(목록 시트 + 후보 확대), 크기는 모두 받은 파일 기준. 사진 설명은 og:image와 같은 파일에 붙은 `img alt`/설명인지 파일명으로 대조했다.
- 결과: **② 2건 · ③ 8건** · SNS 원문 저장본 **90 → 80**(`count-self-images.mjs` 중간 TSV: self 147 − 자체 제작 67 = 80)
- git add·commit·push·빌드 하지 않음.

## 건별 표
| # | id | 단계 0(저장 이미지 직접 열람) | 결과 | 후보 og:image — 직접 본 내용 · 받은 파일 크기 · 판정 | 핫링크 | 지운 파일 |
|---|---|---|---|---|---|---|
| 1 | 2026-09-29-nowandhere-defense-minister-nk-responsibility | 국방장관(공인) 얼굴 + 오른쪽에 **군복 차림 인물 얼굴**(계급·이름 표기 없음 → 비공인) + 인용 문구 | ③(단계 0 즉시) | — | — | public/images/2026-09-29-nowandhere-defense-minister-nk-responsibility/thumb.jpg(+폴더) |
| 2 | 2026-09-29-rekor-hypertension-diabetes-support-cut | 대통령(공인) 얼굴 근접, 글자 없음 | ③ | 의학신문 9/29(교수 2명 — 비공인, 771×477 → 2항) · 의학신문 8/4(교수 1명 — 비공인, 1280×724 → 2항) · 의학신문 9/29(국회 상임위원장 발언, 명패 "이만희", 설명은 직위만·일시 없음, 1280×960 → 4a) | — | public/images/2026-09-29-rekor-hypertension-diabetes-support-cut/thumb.jpg(+폴더) |
| 3 | 2026-09-29-sbsnews-lee-mine-conspiracy-remark | 방송사 화면(로고·자막) — 대통령 + 배경 국무위원들 | **②** | **파이낸셜뉴스 9/29 og:image** — 파란 배경 회의석에서 마이크 두 개·노트북(청와대 로고 스티커)을 두고 말하는 대통령, 다른 인물·덧씌운 글자·워터마크 없음, **1200×980**. 사진 설명(본문 `img id="202609291042588586"` alt, og:image와 같은 파일): "이재명 대통령이 29일 청와대에서 열린 국무회의에서 발언하고 있다. 청와대통신사진기자단" — 게시물이 다루는 9/29 국무회의 발언과 같은 사건·당시 · 그 밖의 후보: SBS 9/29(로고·"바로 이 뉴스"·큰 자막 썸네일, 1280×720 → 4·11항) · 이투데이 9/29(같은 회의 같은 장면, 크레딧 연합뉴스, 657×518 — 통과 가능했으나 더 큰 파이낸셜뉴스 쪽을 택함) | HEAD 200 image/jpeg | public/images/2026-09-29-sbsnews-lee-mine-conspiracy-remark/thumb.jpg(+폴더) |
| 4 | 2026-07-01-amhaengeosa-lee-nk-military-remark | 대통령(공인) 얼굴 + "북한 옹호 발언" 자막 | ③ | 뉴스핌 1/7(만찬장 원경 — 대통령과 참석자들, 400×260 → 8항) · 머니투데이 1/7(상하이 순방기자단 오찬간담회 발언 — 같은 사건이지만 "MT 머니투데이" **워터마크**, 앞쪽 기자들 뒷모습, 1200×845 → 워터마크) | — | public/images/2026-07-01-amhaengeosa-lee-nk-military-remark/thumb.jpg(+폴더) |
| 5 | 2026-07-04-idontknowpolitics-2018-freedom-deletion | 다른 방송사 뉴스 화면(로고·자막) — 당시 원내대변인(국회의원) + 옆 인물 | ③ | 스페셜경제 2018-02-02(개헌 의원총회 — 당시 당 대표와 원내대표, 뒤쪽 의원·참석자 다수, 499×287 → 8항) · 더퍼블릭 2018-02-02(매체 로고 200×200 → 4·8항) | — | public/images/2026-07-04-idontknowpolitics-2018-freedom-deletion/thumb.jpg(+폴더) |
| 6 | 2026-07-05-idontknowpolitics-kctu-appeal | 방송 뉴스 화면 — **앵커 얼굴**(언론인 = §3.1 비공인) + 자막·로고 | ③(단계 0 즉시) | — | — | public/images/2026-07-05-idontknowpolitics-kctu-appeal/thumb.jpg(+폴더) |
| 7 | 2026-07-12-judypia-real-estate-supervisory-bill | **집회 참가 일반인 얼굴**(손팻말 든 시민) + 자막 | ③(단계 0 즉시) | — | — | public/images/2026-07-12-judypia-real-estate-supervisory-bill/thumb.jpg(+폴더) |
| 8 | 2026-07-13-idontknowpolitics-yeonpyeong-crab-remark | 방송 뉴스 화면(자막) — 당시 당 대표(공인) 집회 발언 | **②** | **경기일보 2025-03-02 og:image** — 연단에서 손을 들고 말하는 당시 당 대표, 연단 글자를 직접 읽으면 "106주년 3·1절 / 야5당 공동 내란종식·민주헌정수호를 위한 / 윤석열 파면 촉구 범국민대회"(현장 실물 — 행사명, 게시물 사안을 단정하는 문구 아님), 다른 인물·워터마크 없음, **600×436**. 사진 설명(본문 img alt, 같은 파일 `20250302580053.jpg`): "더불어민주당 이재명 대표가 지난 1일 서울에서 열린 '야 5당 공동 내란종식·민주헌정수호를 위한 윤석열 파면 촉구 범국민대회'에 참석해 발언하는 모습. 연합뉴스". 기사 본문이 같은 집회의 '꽃게밥' 발언과 국민의힘 반발을 전함 → 같은 사건·당시 · 그 밖의 후보: 한국경제 2025-03-02(같은 집회에서 박수 치는 모습, 뒤쪽 **참가 시민 얼굴 다수** 식별, 1200×800 → 2항) · 문화일보 2025-03-02(같은 집회 발언, 540×348 → 8항) | HEAD 200 image/jpeg · GET 200 | public/images/2026-07-13-idontknowpolitics-yeonpyeong-crab-remark/thumb.jpg(+폴더) |
| 9 | 2026-07-19-amhaengeosa-kctu-itaewon-directive | **집회 군중 얼굴**(일반 참가자 정면 다수) + 손팻말·자막 | ③(단계 0 즉시) | — | — | public/images/2026-07-19-amhaengeosa-kctu-itaewon-directive/thumb.jpg(+폴더) |
| 10 | 2026-07-20-yoonsanghyun-special-counsel-filibuster | 국회의원(공인) 본회의 발언 + 자막 | ③ | 이투데이 7/20(본회의장 발언대의 의원 + 뒤 의장석 단상에 앉은 **3명의 정면 얼굴**, 사진 설명·본문에 그 3명의 신원 없음 → 9항, 명패 글자 "의장", 1199×724) · 파이낸셜뉴스 7/20(본회의장 전경, 퇴장하는 의원 등 다수 원경, 1200×697 — 게시물 주인공 식별 어려움·다수 신원 미확인 → 9항) | — | public/images/2026-07-20-yoonsanghyun-special-counsel-filibuster/thumb.jpg(+폴더) |

### ② 2건 점검
- **인물**: #3 현직 대통령(§3.1) — 국무회의 발언(§3.2 정부 회의) — 원 기사 사진 설명. #8 당시 정당 대표(§3.1 정당 간부, 현 대통령) — 야5당 공동 주최 집회 발언(§3.2 "정당의 공식 당무… 당 공식 집회"에 해당한다고 판단 — 외곽 단체 집회가 아님) — 원 기사 사진 설명. 두 사진 모두 다른 인물 없음.
- **의혹 사안 여부**: #3은 대통령 발언 보도, #8은 발언 논란(국민의힘 사과 요구) — 수사·기소·재판 아님 → 사실 서술 caption(#3 55자, #8 75자).
- **제외 11항**: 비공인·신원 미확인 인물 없음 · 로고·그래픽·캡처 아님 · 사용 제한 표기 없음(일반 고지만) · 짧은 변 980·436px · 덧씌운 글자·워터마크 없음(#8 연단 글자는 현장 실물 행사명).
- frontmatter: `kind: news` · `src` = og:image · `sourcePageUrl` = `sources[].url` 글자 그대로 · `creditName` #3 `청와대통신사진기자단`/`Cheong Wa Dae press pool`, #8 `연합뉴스`/`Yonhap News Agency` · `retrievedAt: 2026-11-10` · `license` 없음 · `faceNote` 기재.

## 영어본
- ② 2건: `imageAlt`·`imageCaption` 새 사진 기준으로 교체. ③ 8건: 삭제.
- 10건 ko·en 본문에 사이트 이미지를 가리키는 문장 0(grep).

## updatedAt
- 10건 모두 변경 없음.

## 검증
- `npm run validate:content`: ✅ R=0(418파일 · 오류 0). 대상 id 경고 3건은 **기존 description 길이 경고**(judypia 166자 · yeonpyeong-crab 186자 · nowandhere 168자 — description 미변경).
- `npm run check:hotlinks`: 점검 10건 · 정상 10건 · 깨짐 0건(#3·#8 HEAD 200 image/jpeg).
- `/images/<id>/` 참조 0 · `public/images/<id>/` 폴더 10개 삭제 · `git diff --cached` 비어 있음.

## 바뀐 경로 (커밋 대상 30)
- 수정 20: `content/posts/{10 id}.md` · `content/posts-en/{10 id}.md`
- 삭제 10: `public/images/{10 id}/thumb.jpg`
- 문서: 이 트리거 · `instructions/uploader/processed/08-sns-image-batch-6.md`(이동)

## 리뷰어 확인 요청
1. **#8 이미지 호스트**: 경기일보 og:image가 `…edge.naverncp.com`(네이버 클라우드 플랫폼의 저장소 주소)이다. 매체 자체 이미지 저장소이고 포털 뉴스 주소가 아니며 `schema.ts` 포털 목록(naver.com·naver.net·naver.me 등)에도 없어 검증을 통과했다. 정책 §3.6 README의 "포털 … 이미지 CDN 포함" 금지에 해당한다고 보면 ③으로 내리면 된다(대체 후보 없음).
2. **#8 집회 성격**: 야5당 공동 주최 범국민대회를 "정당 공식 집회"(§3.2 포함)로 보았다.
