# reviewer-56 — 업로더 18(비공인 실명 2차) + 기획자 17-4 검증 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10 · 실행: 하위 에이전트(리뷰어 54 이어서)
- 오더: `instructions/reviewer/processed/56-uploader-18-review.md`(이동)
- 읽은 것: 업로더 18 오더·트리거, 기획자 17-4 오더·트리거, `git diff`(HEAD 29aa0e4 기준) 전체, PRD §6③(본문 실명 예외 4종·공통 제외·id 규칙), 정책 §3.7, guide §4 92행, 리뷰어 52 부록, 리뷰어 54 트리거.
- 콘텐츠·코드·설정 수정 0, git add·commit·push·rm·checkout 0, 빌드 0(`npm run validate:content`만). 만든 파일: `docs/tools/reviewer-56/` 3개 + 이 트리거 + 오더 이동.
- 이 트리거와 도구 출력에는 비공인 실명과 옛 id 문자열을 쓰지 않았다. 이름 패턴·기사 HTML·옛 이미지 사본은 저장소 밖 임시 폴더에만 있다.

## 판정: ✅ 통과 — 커밋 가능 (P1 0 · P2 1 · P3 4)

---

## 1. id 이전 5건 — ✅
- `id-move-check.mjs`로 `moved-ids.txt` 8줄 전부(이번 5줄 + 이전 3줄)를 확인했다. 미통과 0.
  - 확인 항목: retired에 있음, 옛 id 문자열 0(`content/`의 두 txt 제외·`src/`·`public/`·`scripts/`·`next.config.ts`·`vercel.json`), 옛 이미지 폴더 없음, 새 id의 ko·en 파일이 있고 frontmatter `id`가 같음, 이미지 참조가 새 폴더의 실제 파일을 가리킴.
- txt 형식은 선례와 같다. `moved-ids.txt` 8~12행은 `옛 새` 한 줄씩이고, `retired-ids.txt` 15~19행도 한 줄씩이다.
- 새 id 5개에는 이름이 없다. 직함 영문 단어(professor·lawyer·singer·former-ambassador)만 쓰고 계정 핸들은 그대로 뒀다. 단 P084②는 계정 자리가 그 인물 이름이라 그 자리를 뺐다.
- 바뀐 내부 링크 8곳(ko·en 4쌍)을 단어 단위 diff로 확인했다. 링크의 id만 바뀌었고, 새 id 게시물 파일이 있다.
- 리다이렉트는 리뷰어 54 1절과 같은 구조라 코드 수정 없이 동작한다. validate 결과 "옮긴 id 8건 · 리다이렉트 규칙 16개 · 오류 0".
- 이름 바뀐 10파일의 `publishedAt`·`translatedAt`·`updatedAt`은 HEAD 옛 파일과 같다. 5쌍 중 4쌍은 `id` 줄만 바뀌었고, P194 쌍만 이니셜 전환이 함께 들어갔다.

## 2. 이니셜 전환·직위 보강 — ✅
- **P194**(ko ㅌ·en T): 게시물 ko·en과 다른 게시물의 출처 제목·본문 3곳을 diff로 확인했다. 제목·설명·alt·출처 제목·본문·태그(삭제)까지 모두 바뀌었다.
- **P196**(ko ㅎ·en H): 게시물 ko·en 전체를 diff로 확인했다. 제목·설명·alt·본문이 모두 바뀌었다. 직함("전 BND 국장"/"former BND chief")은 남았다.
- 두 인물의 이름(전체·성 단독)을 저장소 밖 패턴으로 다시 찾았다. 게시물 418개에서 **0줄**이다. ko·en 초성↔영문 짝도 맞다.
- **P155**(목사 ㅇ씨 ↔ Pastor L): 게시물 안 잔존 0.
- **P204·P205**(활동가 ㅇ씨 ↔ W, 전 홍콩대 교수 ㅌ씨 ↔ T): 게시물 안 잔존 0. 출처 3건을 직접 열었다(3/3 HTTP 200).
  - 경향신문 2024-11-19: 1심 형량 선고 보도다.
  - 서울신문 2019-08-30: 체포 보도다.
  - 연합뉴스 2026-09-02: "유죄 인정 … 선고기일은 추후 정해질 예정" 보도다.
  - "확정"·"상고 기각" 보도는 없다. 따라서 이니셜이 맞다.
- **P024**: 추가한 "전 주중 북한대사관 참사관"(en "a former counselor at the North Korean Embassy in China")은 출처와 맞다. 출처 세계일보 2026-06-08 본문이 "리○○ 북한 대남 공작원(**전 주중 북한대사관 참사관**)"이라고 쓴다(직접 열람).
  - TV조선·연합뉴스 출처에는 이 직위가 없다.
- 문장 점검: 조사 중복·빈 괄호·이중 공백 없음. 직함·관계는 모두 남았다.

## 3. P087 공인 판정 — ✅ 업로더 판정이 맞다 (공인 (가))
- **기사 직접 열람**: 주간경향 `weekly.khan.co.kr/article/17680`(HTTP 200)을 열었다.
  - 게시 시각은 `article:published_time` 2008-06-03.
  - 본문 첫 문단에 "**16·17대 국회의원이자 전 보건복지부 장관**인 ○○○ 의원"이 있다.
- **법령**: 공수처법 제2조 1호는 재직자 또는 퇴직자를 포함한다(리뷰어 54가 원문 조회). 이 인물은 두 목에 해당한다.
  - 나목: 국회의원.
  - 사목: 중앙행정기관의 정무직공무원(장관).
- 게시물 문장이 기사와 맞다. 두 ko 게시물은 "작가(전 보건복지부 장관·16·17대 국회의원)"와 "작가(전 보건복지부 장관)"이고, en은 "a former health and welfare minister and two-term lawmaker"와 "a former health and welfare minister"다. 모두 기사 표현과 같다.
- **추가한 출처의 형식**: 두 ko 게시물 `sources[]` 끝에 들어갔다.
  - 필드: `type: 언론` · `name: 주간경향 — <기사 제목 그대로>` · `url` · `date: 2008-06-03`. 기존 항목과 같은 형식이다.
  - 날짜는 기사 메타와 같다. validate가 통과했고 새 경고도 0이다.
- 공인이므로 id·파일명·태그의 이름은 guide §4(비공인 대상)에 걸리지 않는다. id를 두는 것은 맞다.
- 리뷰어 52 판정표의 P087 행(N2)은 (가)로 고쳐야 한다(P3-3).

## 4. 카드 이미지 4장 — ✅ 4장 모두 통과
4장 모두 직접 열어 글자를 읽었다. 4장 모두 1200×675 JPEG이고, 아래에 "공산당이싫어요 자체 제작 이미지" 표기가 있다.

| 이미지 | 글자 판독(줄 구분 `/`) | 실명 | ko alt·en imageAlt 일치 |
|---|---|---|---|
| `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg` | "대장동 새로운 증거 통화녹취"는 / 2025년 11월 12일 이미 공개된 녹취 / 유튜버 ㅂ씨, 국회 소통관 기자회견에서 공개 / 피고인 ㄴ씨·ㅇ씨 2023년 봄 통화로 설명 — 피고인 간 대화 / 대화 속 "교감이 있었던 거 같다"는 추정 발언 | 0 | ✅ |
| `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg` | 이진숙 "계엄 명령 따른 군인들, / 내란범 낙인·중징계" 비판 / (구분선) / 11월 4일 국회 소통관 기자회견 (보도) / 중령 ㅇ씨 동석 — 계엄 당시 특전사 대대장 / 국방부 입장은 확인한 보도에 없음 | 0(이름은 현직 의원뿐) | ✅ |
| `public/images/2026-09-30-monarch-former-ambassador-church-claims/thumb.jpg` | 전 미국 대사 ㅌ씨 "교회 압수수색·선교사 / 수감·과세 50%" 주장 — 보도와 대조 / (몬아크 리포트 영상, 9월 30일) / 미국인 6명 대북 페트병 살포 시도 — 2025년 불구속 송치, 수감 아님 / 종교법인 해산 민법 개정안 — 2026년 1월 발의, 국회 계류 / 선교사 소득 최대 50% 과세 — 보도에서 확인 안 돼 | 0 | ✅ |
| `public/images/2026-10-12-minkyuhantv-german-spy-chief/thumb.jpg` | 독일 전 BND 국장 ㅎ씨 간첩 혐의 체포 / (10월 6일) — "러시아 스파이"는 보도와 달라 / 옛 비서실장에게 돈 주고 기밀문서 약 2천 건 넘겨받은 혐의 / 獨 매체: 러시아와는 관련 없는 사건 — 검찰은 전달 국가 미공개 / 원문의 박지원·정동영 비교는 게시자 의견 | 0(이름은 공인뿐) | ✅ |

- 편집 정책: 단정 표현이 새로 생기지 않았다. 문구는 원래 카드와 같고 이름 자리만 바뀌었다.
  - 원문 주장은 "주장"·"게시자 의견"으로 표시돼 있다.
  - 사실 문장은 "보도"·"보도와 달라"·"확인 안 돼"로 근거를 밝힌다.
- **범위를 넘긴 2장(P194·P196)은 정당하다.** 오더 2항이 "게시물 전체에서 처음부터 끝까지"였다. 카드 이미지 글자는 게시물의 일부이고, 피드·공유 미리보기에서 가장 먼저 보이는 곳이다. 이미지를 두면 alt와 이미지 글자가 달라지는 리뷰어 54 P2-1과 같은 결함이 생긴다. 같은 원칙(비공인 실명 제거)이라 범위 안으로 본다.
- P194 이미지는 새 id 폴더로 옮겨졌다. 옛 폴더는 ` D` 상태이고, `image.src`가 새 경로를 가리키며 파일도 있다.

## 5. 리뷰어 54 P3 정정 — ✅
- P3-1: 업로더 17 트리거 63행이 "en 7 = 18파일"로 바뀌었고 정정 표기가 붙었다.
- P3-2: #6 ko description이 157자가 됐고 경고는 사라졌다. validate 경고 목록을 리뷰어 54와 대조하니 이 1건만 빠졌다.
- P3-3: en 20행 "K was charged".
- P3-4: 4줄 모두 이름 0. 표시 이름 2곳은 서술로, 성 표기 2곳은 이니셜·일반 서술로 바뀌었다.

## 6. updatedAt·validate — ✅
- diff에서 `updatedAt`·`translatedAt`·`publishedAt` 변경은 0이다. 이름 바뀐 10파일도 HEAD와 같다.
- `npm run validate:content`: ✅ 418/418, 오류 0. 리뷰어 54 때와 비교해 새 경고 0, 해소 1.

## 7. 범위 밖 잔존 14파일 — 목록은 맞다(분류 1곳만 다름)
- 추적 파일 14개는 내 검사 결과와 같다.
  - 문서 3개: `docs/reviews/card-image-policy-legal-review.md`, `docs/supervisor/drafts/2026-09-28-held-recheck.md`, `docs/tools/designer-04-B/data.json`
  - reviewer-14 로그 6개
  - 측정 출력 2개: `reviewer-24/forbidden-terms-output.txt`, `reviewer-26/x-truncation-audit-output.txt`
  - reviewer-30 3개: `gen.py`·`image-recheck.tsv`·`post-recheck.tsv`
- 분류: `docs/supervisor/drafts/2026-09-28-held-recheck.md`는 P194·P196이 아니라 **P155**(341행)다.
- 3차 입력에 더할 **미추적** 파일은 아래와 같다. 업로더는 추적 파일만 검사했다.
  - `history/2026-10-08.md`:34(P155)
  - `history/2026-10-11.md`:21·38(P194)
  - `history/2026-10-12.md`:3(P196)
  - `history/2026-10-08.md`:36(**P146 전체 이름 — 1차 인물**)

## 8. 기획자 17-4 — ✅
- `planning/prd.md` 20행(v0.9-3)·420행 "id 규칙", `planning/card-image-policy.md` 211행·435행(§14), `docs/poster/guide.md` 92행(슈퍼바이저 추가 1줄)이 서로 맞는다.
  - 예외 4종 인물의 기존 id도 이전한다.
  - 역사 인물·사건명 id만 이전하지 않는다.
  - git 이력은 고치지 않는다.
- 옛 문구("이전 의무"·"의무를 두지"·"이전은 여전히") 검사: `planning/`·guide·`content/README.md`에서 0이다.
  - 17-2·17-3 트리거에 남은 옛 서술은 앞에 "17-4 메모 … 폐기"·"(a) 폐기 / (b) 채택" 표시가 붙은 기록이다.

## 9. 산출물 이름·옛 id·저장소 독립 — ✅
- 대상 파일: 업로더 18 트리거·오더, 기획 17-4 트리거·오더, `history/2026-11-10.md`, 이 리뷰 오더.
  - 비공인 실명 0, 예외 인물 이름도 0, 옛 id 7개 문자열 0, 홈 경로 0.
- 저장소 독립 검사는 pre-commit 훅 패턴 그대로 했다. 추가된 diff 줄 전체 + 새 게시물·이미지 폴더·두 트리거 → 0건.
- 1·2차 인물 전부의 이름으로 텍스트 파일 1,985개(게시물 418개 포함)를 다시 검사했다. 게시물 안 잔존은 P020(공인) 5줄과 오탐 3줄뿐이다.
  - 오탐 3줄: 공인 이름 음절 2줄, 다른 탈북민 1줄.

---

## 결함·권고

### P1 — 0건

### P2 — 1건
- **P2-1 예외 4종 인물 이름이 태그에 남아 있다.** PRD §6③(420행)·정책 §3.7은 "id·파일명·**태그**·이미지 폴더에는 이 예외로도 이름을 쓰지 않는다"고 정한다. 태그는 `/tag/…` 주소가 된다.
  - 리뷰어 52 부록 기준으로 남은 곳은 5곳이다. 모두 업로더 18 이전부터 있던 것이고 오더 범위 밖이어서, 이번 커밋을 막지 않는다.
    - `content/posts/2026-09-13-geonwoo-professor-2023-remark.md` 태그 1줄(P054)
    - `content/posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md`:33(P024)
    - `content/posts/2026-09-30-2pro-unc-armistice-violation.md`·`content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md` 태그(P059)
    - `content/posts/2026-09-10-geonwoo-…-song-contest.md` 태그(P041, 역사 인물)
  - 고칠 방법: 해당 태그 줄을 삭제한다. 북한 인사·역사 인물 태그를 예외로 두려면 기획자가 PRD·정책 문구에 "태그 예외"를 넣는다.
  - 둘 중 하나를 3차 오더 전에 정해야 한다.

### P3 — 4건
- **P3-1** 업로더 18 트리거 6절: `docs/supervisor/drafts/2026-09-28-held-recheck.md`를 "P194·P196" 아래에 적었다. 실제로는 P155다.
- **P3-2** 7절의 미추적 history 4줄을 3차 오더에 더한다. 그중 `history/2026-10-08.md`:36(P146)은 **리뷰어 54가 검사 출력에서 보고도 보고서에 적지 않은 것**이다. 리뷰어 54가 잡았어야 할 누락으로 정정한다.
- **P3-3** `docs/tools/reviewer-52/judgement-table-masked.tsv`의 P020·P087 행을 (가) G1으로 고친다(리뷰어 54 P3-5와 같다. 다음 리뷰어 오더).
- **P3-4** 리뷰어 54 P3-6(#6 옛 id 속 로마자 이름이 기록 문서에 남는 것)은 `history/2026-10-01.md`:34와 리뷰어 52 오더에서는 해소됐다. A-6 목록의 측정 기록 12파일·20줄에는 그대로 있다. 슈퍼바이저 판단으로 계속 유지한다.

---

## 커밋할 경로

**업로더 18**
- `content/moved-ids.txt`, `content/retired-ids.txt`
- 삭제 11개: `git status`의 ` D content/posts/…` 5줄 · ` D content/posts-en/…` 5줄 · ` D public/images/<P194 옛 폴더>/thumb.jpg` 1줄. 옛 id라 경로를 적지 않는다. `git add -A content/posts content/posts-en public/images`면 함께 잡힌다.
- 새 파일
  - ko·en 각 5: `2026-07-24-korealive-singer-moreugo`, `2026-09-13-geonwoo-professor-2023-remark`, `2026-09-24-hagonolza-lawyer-spy-remark`, `2026-09-25-lawyer-nk-pow-ukraine`, `2026-09-30-monarch-former-ambassador-church-claims`(`.md`)
  - `public/images/2026-09-30-monarch-former-ambassador-church-claims/thumb.jpg`
- 수정 ko·en 각 12: `2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract`, `2026-09-12-peoplepower7-civic-group-head-dp-card`, `2026-09-26-issue365-lee-nsl-yusimin`, `2026-09-27-geonwoo-nsl-mexico-remark`, `2026-09-28-boxplus-2019-forced-repatriation`, `2026-09-28-themove-hongkong-umbrella-12th`, `2026-09-30-rekor-foreign-committee-dp-absence`, `2026-10-08-peoplepower7-ukraine-korea-oil-claim`, `2026-10-09-gotdemcatch-lee-five-trials-suspended`, `2026-10-10-seoulmediatv-paju-kpa-cemetery-memorial`, `2026-10-12-minkyuhantv-german-spy-chief`, `2026-10-23-eodguri-kimyonghyun-drone-appeal`(`.md`)
- 이미지 수정 3: `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg`, `public/images/2026-10-12-minkyuhantv-german-spy-chief/thumb.jpg`, `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`
- 문서: `docs/handoffs/translator-01-english-batch-1.md`, `docs/supervisor/drafts/2026-09-22-geonwoo-kimminsoo-defense-reform-reel.md`, `docs/triggers/uploader-17-nonpublic-name-initials-1-COMPLETE.md`
- 기록: `docs/triggers/uploader-18-nonpublic-name-2-COMPLETE.md`, `instructions/uploader/processed/18-nonpublic-name-2.md`
- `history/2026-10-25.md`: 미추적이다. P3-4로 고친 파일이지만, 다른 미추적 history와 함께 넣을지는 슈퍼바이저가 정한다.

**기획자 17-4**
- `planning/prd.md`, `planning/card-image-policy.md`, `docs/poster/guide.md`(92행)
- `docs/triggers/planner-17-2-user-decisions-names-and-wongyeong-COMPLETE.md`, `docs/triggers/planner-17-3-review-55-fixes-COMPLETE.md`(메모)
- `docs/triggers/planner-17-4-existing-id-move-COMPLETE.md`, `instructions/planner/processed/17-4-existing-id-move.md`

**리뷰어 56**
- 이 트리거, `docs/tools/reviewer-56/`(3개), `instructions/reviewer/processed/56-uploader-18-review.md`
- `history/2026-11-10.md`는 슈퍼바이저 영역이고 다른 세션 기록도 섞여 있다.

**판정하지 않은 변경**: ` M history/2026-11-05.md`·`history/2026-11-09.md`, 미추적 history·`docs/tools/planner-07/`·각 screens 폴더·테스터 01 산출물·리뷰어 52/54 산출물 등 리뷰어 54 목록과 같은 것.

## 도구 (`docs/tools/reviewer-56/`)
| 파일 | 내용 |
|---|---|
| `id-move-check.mjs` · `id-move-check-output.txt` | `moved-ids.txt` 각 줄의 이전 상태 6항목. 옛 id는 출력하지 않고 줄 번호로만 가리킨다 |
| `name-residual-scan-output.txt` | `docs/tools/reviewer-54/name-residual-scan.mjs`를 1·2차 인물 전체 패턴(저장소 밖)으로 다시 돌린 출력(오탐 표기 포함) |

## 수치
- moved-ids 8/8 통과. 바뀐 게시물: 수정 24·새 10. 이름 바뀐 10파일 날짜 불변.
- 기사 직접 열람: P087 1건, P024 출처 3건, P204·P205 출처 3건. 모두 HTTP 200.
- 카드 이미지 4/4를 육안으로 판독했다.
- 이름 검사 텍스트 파일 1,985개(게시물 418/418). validate ✅ 418/418.
