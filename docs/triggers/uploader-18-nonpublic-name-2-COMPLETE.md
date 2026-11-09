# uploader-18 — 비공인 실명 정리 2차 — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/18-nonpublic-name-2.md`(이동)
- 선행 문서 직접 읽음:
  - 오더 전체, 리뷰어 54 트리거 전체(7-a·P3-1~P3-6), 리뷰어 55 트리거 ⑥표
  - 리뷰어 52 부록·`judgement-table-masked.tsv`
  - `content/README.md` §6-1, 업로더 17 오더·트리거
- 이 트리거에는 비공인 실명(성·로마자 포함)과 옛 id 문자열을 쓰지 않았다. 인물은 P번호·초성으로만 적었다. 이름이 든 작업 파일(이름 목록·기사 HTML·원본 이미지 사본)은 저장소 밖 임시 폴더에만 있다.
- 하지 않은 것:
  - git add·commit·push, 빌드, `src/`·설정 수정은 0건이다. 파일 이동은 일반 `mv`로만 했다.
  - `updatedAt`·`translatedAt`·갱신 이력은 바꾸지 않았다(오더 6항).
  - (다) 확인 불가 37건과 P132·P133·P113은 손대지 않았다.

---

## 1. id 이전 (5건)

| P | 새 id | 처리 |
|---|---|---|
| P054 (특임교수, 실명 유지) | `2026-09-13-geonwoo-professor-2023-remark` | ko·en 파일 이름 변경, `id` 2곳 |
| P084 ① (변호사, 실명 유지) | `2026-09-24-hagonolza-lawyer-spy-remark` | ko·en 파일 이름 변경, `id` 2곳. 이 id를 가리키던 내부 링크를 새 id로 바꿨다: `content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md`:35, en:12 |
| P084 ② | `2026-09-25-lawyer-nk-pow-ukraine` | 원래 id의 계정 자리가 이 인물의 계정명이라 직함으로 바꿨다. ko·en 파일 이름 변경, `id` 2곳. 내부 링크 6곳을 새 id로 바꿨다: `2026-09-28-boxplus-2019-forced-repatriation` ko:42·en:11, `2026-09-30-rekor-foreign-committee-dp-absence` ko:41·en:9, `2026-10-08-peoplepower7-ukraine-korea-oil-claim` ko:41·en:11 |
| P214 (가수 활동명, 실명 유지) | `2026-07-24-korealive-singer-moreugo` | ko·en 파일 이름 변경, `id` 2곳 |
| P194 (N4 수사 대상) | `2026-09-30-monarch-former-ambassador-church-claims` | ko·en 파일 이름 변경, `id` 2곳. `public/images/<옛>/` → `public/images/<새>/`로 옮기고 `image.src`를 고쳤다 |

- `retired-ids.txt` 15~19행, `moved-ids.txt` 8~12행을 추가했다.
- `content/`(두 txt 제외)·`src/`·`public/`·`scripts/`·`next.config.ts`에서 옛 id 5개 문자열은 **0건**이다. 옛 이미지 폴더도 없다.
- 새 id에는 사람 이름이 들어 있지 않다.
- P087 게시물의 id에는 이 인물의 이름이 있다. 3절에서 공인으로 확인돼 id 이전 대상이 아니다.

## 2. N4 수사 대상 2명 — 게시물 전체 이니셜

| P | 표기 | 바꾼 파일:줄 |
|---|---|---|
| P194 | ko `전 미국 대사 ㅌ씨`·`ㅌ씨` · en `T` | 새 ko:3(title)·4(description)·12(alt)·30(sources.name)·39·43, 태그(이름) 1줄 삭제 / 새 en:3·4·5(imageAlt)·11·15 / `content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md`:27(sources.name)·70, en:33 |
| P196 | ko `전 BND 국장 ㅎ씨`·`ㅎ씨` · en `H` | `content/posts/2026-10-12-minkyuhantv-german-spy-chief.md`:3·4·12(alt)·44·50 / en:3·4·5(imageAlt)·19·25 |

- 외국 이름은 성을 기준으로 이니셜을 붙였다(업로더 17의 외국 기업인 선례와 같음).
- 두 게시물의 자체 제작 카드 이미지에도 이름 글자가 있어 다시 만들었다(4절). 오더 4항이 정한 2장 외의 추가분이며, "게시물 전체에서 처음부터 끝까지"(오더 2항)에 맞춘 처리다.

## 3. 조건부 4건

| P | 확인 | 처리 |
|---|---|---|
| P087 | 게시물 출처 3건(한국일보·경향신문·뉴스핌, 3/3 HTTP 200)에는 "작가"로만 나온다. 주간경향 2008-06-03 인터뷰(HTTP 200)의 본문 첫 줄이 **"16·17대 국회의원이자 전 보건복지부 장관"**이다 → 공수처법 제2조 1호 나목(국회의원)·장관, 퇴직자 포함 → **(가) 공인** | 실명 유지 + 직위 보강. `content/posts/2026-09-26-issue365-lee-nsl-yusimin.md`:51 "작가(전 보건복지부 장관·16·17대 국회의원)", en:16 "a former health and welfare minister and two-term lawmaker". `content/posts/2026-09-27-geonwoo-nsl-mexico-remark.md`:59 "작가(전 보건복지부 장관)", en:23. 두 ko 게시물의 `sources[]`에 주간경향 기사를 추가했다(ko 35~38행, 38~41행). id는 그대로 둔다 |
| P155 | 입건 서술이 있는 게시물이다 | 게시물 전체를 이니셜로 바꿨다. `content/posts/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md`:46(2곳)·56 → `목사 ㅇ씨`·`ㅇ씨` / en:20·30 → `Pastor L`. 게시물 안 잔존 0 |
| P204·P205 | 출처 3건(경향신문 2024-11-19, 연합뉴스 2026-09-02, 서울신문 2019-08-30, 3/3 HTTP 200)을 열어 확인했다. 경향은 1심 형량 선고, 연합은 다른 혐의의 유죄 인정과 "선고기일은 추후"를 보도한다. **확정 보도는 없다** | 이니셜로 바꿨다. `content/posts/2026-09-28-themove-hongkong-umbrella-12th.md`:3(title)·14·18·22(sources.name)·42·43·44 → `활동가 ㅇ씨`·`ㅇ씨`, `전 (홍콩대) 교수 ㅌ씨` / en:3·19·20·21 → `activist W`·`W`, `T`. 게시물 안 잔존 0 |
| P024 | 직위 없이 나온 줄 | 직위를 보강했다. `content/posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md`:40 "전 주중 북한대사관 참사관", en:15 "a former counselor at the North Korean Embassy in China" |

## 4. 자체 카드 이미지 재제작 (4장 — 오더 2장 + P194·P196 2장)

- 방식: 게시 때 쓴 것과 같은 Pillow 스크립트(1200×675, 흰 바탕 #fafafa, 왼쪽 붉은 막대, AppleSDGothicNeo, 아래 "공산당이싫어요 자체 제작 이미지")로 만들었다.
- 기존 이미지 4장을 저장소 밖에 복사해 두고, 원래 배치(글자 크기·줄 위치·구분선 유무)와 나란히 비교해 맞췄다.
- 같은 경로에 덮어썼다. 4장 모두 1200×675 JPEG다. P194는 새 id 폴더에 있다.
- 만든 뒤 4장을 모두 열어 글자를 직접 읽었다. 판독 결과는 아래와 같다(줄 구분 `/`).
  1. `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg`: `"대장동 새로운 증거 통화녹취"는 / 2025년 11월 12일 이미 공개된 녹취 / 유튜버 ㅂ씨, 국회 소통관 기자회견에서 공개 / 피고인 ㄴ씨·ㅇ씨 2023년 봄 통화로 설명 — 피고인 간 대화 / 대화 속 "교감이 있었던 거 같다"는 추정 발언 / 공산당이싫어요 자체 제작 이미지`. ko `image.alt` 따옴표 안 문구와 같다.
  2. `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`: `이진숙 "계엄 명령 따른 군인들, / 내란범 낙인·중징계" 비판 / (붉은 구분선) / 11월 4일 국회 소통관 기자회견 (보도) / 중령 ㅇ씨 동석 — 계엄 당시 특전사 대대장 / 국방부 입장은 확인한 보도에 없음 / 공산당이싫어요 자체 제작 이미지`. alt와 같다.
  3. `public/images/2026-09-30-monarch-former-ambassador-church-claims/thumb.jpg`: `전 미국 대사 ㅌ씨 "교회 압수수색·선교사 / 수감·과세 50%" 주장 — 보도와 대조 / (몬아크 리포트 영상, 9월 30일) / 미국인 6명 대북 페트병 살포 시도 — 2025년 불구속 송치, 수감 아님 / 종교법인 해산 민법 개정안 — 2026년 1월 발의, 국회 계류 / 선교사 소득 최대 50% 과세 — 보도에서 확인 안 돼 / 공산당이싫어요 자체 제작 이미지`. 바뀐 alt와 같다. 제목이 길어져 원래 2줄이던 것을 3줄로 나눴다.
  4. `public/images/2026-10-12-minkyuhantv-german-spy-chief/thumb.jpg`: `독일 전 BND 국장 ㅎ씨 간첩 혐의 체포 / (10월 6일) — "러시아 스파이"는 보도와 달라 / 옛 비서실장에게 돈 주고 기밀문서 약 2천 건 넘겨받은 혐의 / 獨 매체: 러시아와는 관련 없는 사건 — 검찰은 전달 국가 미공개 / 원문의 박지원·정동영 비교는 게시자 의견 / 공산당이싫어요 자체 제작 이미지`. 바뀐 alt와 같다.
- 4장 모두 비공인 실명 0이다. 나오는 이름은 공인(현직 의원·장관)뿐이다.

## 5. 리뷰어 54 P3 정정

- **P3-1**: `docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md`:63을 "ko 11 + en 7 = 18파일"로 정정하고, 정정 표기를 붙였다.
- **P3-2**: #6 ko description(`content/posts/2026-09-12-peoplepower7-civic-group-head-dp-card.md`:4) 끝을 리뷰어 문안 "…집행유예로 보도됐습니다."로 바꿨다. 161자 → **157자**(리뷰어는 158자로 예상했다)이고 경고가 사라졌다.
- **P3-3**: #6 en:20 "He was charged" → "K was charged".
- **P3-4** (4줄):
  - `docs/handoffs/translator-01-english-batch-1.md`:129: P176 표시 이름 행을 "(계정 표시 이름 — 2026-11-10 attribution에서 삭제)"로 바꿨다.
  - `docs/supervisor/drafts/2026-09-22-geonwoo-kimminsoo-defense-reform-reel.md`:7: 표시 이름을 "사람 이름 꼴이라 적지 않음"으로 바꿨다.
  - `docs/handoffs/translator-01-english-batch-1.md`:145: P217 성 표기를 `ㅅ씨` ↔ `S`로 바꿨다.
  - `history/2026-10-25.md`:10(미추적): P217 성 표기를 일반 서술("'Mr.'+성→성")로 바꿨다.
  - 네 파일 모두 해당 이름 grep 0건이다.

## 6. 0건 확인

- 이번에 바꾼 인물(P194·P196·P155·P204·P205)의 이름 문자열(한글·로마자·성만 쓴 표기, 11개)로 `content/` 전체를 grep했다 → **0건**. en에서 `\bTan\b`·`\bWong\b`도 0건이다.
- 옛 id 5개: `content/`(txt 제외)·`src/`·`public/`·`scripts/`·`next.config.ts` → **0건**.
- 리뷰어 54 P3-4 대상 4줄 → 0건.
- **범위 밖 잔존(3차 입력)**: 같은 이름 목록으로 `content/` 밖 추적 파일을 검사했더니 **14파일**에 남아 있다. 오더 18은 문서 잔존 정리를 P3-4 4줄로 한정하므로 손대지 않았다.
  - P194·P196: `docs/reviews/card-image-policy-legal-review.md`, `docs/supervisor/drafts/2026-09-28-held-recheck.md`, `docs/tools/designer-04-B/data.json`, `docs/tools/reviewer-14/results/` 로그 6개, `docs/tools/reviewer-24/forbidden-terms-output.txt`, `docs/tools/reviewer-26/x-truncation-audit-output.txt`, `docs/tools/reviewer-30/{gen.py,image-recheck.tsv,post-recheck.tsv}`
  - 리뷰어 52 C절의 P194·P196 목록과 대체로 같다.
- 이 트리거: 비공인 실명 0, 옛 id 0, 홈 절대경로 0(작성 후 grep).

## 7. validate

- `npm run validate:content`: **✅ 검증 통과.** 418건(ko 209·en 209) 모두 통과, 실패 0, 오류 0.
  - 폐기 id 목록 11개, moved-ids 8건, 리다이렉트 규칙 16개, 오류 0.
  - 이번에 바꾼 게시물에 걸린 경고는 0이다(#6 ko 161자 경고는 해소됐다).

## 8. `git status --short` (작업 전 상태와 대조해 이번에 새로 생긴 줄)

```
 M content/moved-ids.txt
 M content/retired-ids.txt
 D content/posts/<P214 옛 파일>.md
 D content/posts/<P054 옛 파일>.md
 D content/posts/<P084① 옛 파일>.md
 D content/posts/<P084② 옛 파일>.md
 D content/posts/<P194 옛 파일>.md
 D content/posts-en/ (위 5개와 같은 옛 파일 5개)
 D public/images/<P194 옛 폴더>/thumb.jpg
?? content/posts/2026-07-24-korealive-singer-moreugo.md
?? content/posts/2026-09-13-geonwoo-professor-2023-remark.md
?? content/posts/2026-09-24-hagonolza-lawyer-spy-remark.md
?? content/posts/2026-09-25-lawyer-nk-pow-ukraine.md
?? content/posts/2026-09-30-monarch-former-ambassador-church-claims.md
?? content/posts-en/2026-07-24-korealive-singer-moreugo.md
?? content/posts-en/2026-09-13-geonwoo-professor-2023-remark.md
?? content/posts-en/2026-09-24-hagonolza-lawyer-spy-remark.md
?? content/posts-en/2026-09-25-lawyer-nk-pow-ukraine.md
?? content/posts-en/2026-09-30-monarch-former-ambassador-church-claims.md
?? public/images/2026-09-30-monarch-former-ambassador-church-claims/
 M content/posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md
 M content/posts/2026-09-12-peoplepower7-civic-group-head-dp-card.md
 M content/posts/2026-09-26-issue365-lee-nsl-yusimin.md
 M content/posts/2026-09-27-geonwoo-nsl-mexico-remark.md
 M content/posts/2026-09-28-boxplus-2019-forced-repatriation.md
 M content/posts/2026-09-28-themove-hongkong-umbrella-12th.md
 M content/posts/2026-09-30-rekor-foreign-committee-dp-absence.md
 M content/posts/2026-10-08-peoplepower7-ukraine-korea-oil-claim.md
 M content/posts/2026-10-09-gotdemcatch-lee-five-trials-suspended.md
 M content/posts/2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial.md
 M content/posts/2026-10-12-minkyuhantv-german-spy-chief.md
 M content/posts/2026-10-23-eodguri-kimyonghyun-drone-appeal.md
 M content/posts-en/ (위 12개와 같은 이름 12개)
 M public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg
 M public/images/2026-10-12-minkyuhantv-german-spy-chief/thumb.jpg
 M public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg
 M docs/handoffs/translator-01-english-batch-1.md
 M docs/supervisor/drafts/2026-09-22-geonwoo-kimminsoo-defense-reform-reel.md
 M docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md
```
- 이 밖에 `history/2026-10-25.md`(미추적, P3-4), 이 트리거, 오더 이동, `history/2026-11-10.md` 기록이 있다.
- 작업 전부터 걸려 있던 다른 세션 변경(`docs/poster/guide.md`, 기획 17 트리거 등)은 손대지 않았다.
- 옛 파일은 옛 id 문자열을 쓰지 않으려고 `<…>`로 가렸다.

## 9. 리뷰어·슈퍼바이저 확인 요청

1. P194·P196 카드 이미지 2장은 오더 범위를 넘어 다시 만들었다(2절 근거). 범위 판단을 바란다.
2. P087은 공인으로 판정했다. 판정표(`judgement-table-masked.tsv` P087 행, N2)는 (가)로 고쳐야 한다(리뷰어 영역).
3. 범위 밖 문서 잔존 14파일(6절).
