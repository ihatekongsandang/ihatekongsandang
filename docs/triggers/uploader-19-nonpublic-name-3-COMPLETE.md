# uploader-19 — 비공인 실명 정리 3차 (직위 확인 22명 · 태그 · 문서 잔존) — COMPLETE

- 담당: 반공-업로더 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-10
- 오더: `instructions/uploader/processed/19-nonpublic-name-3.md`(이동)
- 선행 문서: CLAUDE.md, guide §2·§4·§4-1, PRD §6③(예외 4종·공통 제외·id 규칙), 정책 §3.1·§3.1-1·§3.7, 리뷰어 52 B-3·C·부록 (다), 판정표(가림본), 리뷰어 56 P2-1·7절·P3-1, 업로더 17·18 오더·트리거, `content/README.md` §6-1
- 빌드 0, git add·commit·push 0, `src/`·설정 수정 0. 파일 이동은 일반 `mv`. `updatedAt`·갱신 이력 변경 0.
- 이 트리거에는 22명을 P번호로만 적는다(공인·예외 인물 포함). 이름 패턴·기사 HTML은 저장소 밖 임시 폴더에만 있다.
- 기사 열람: 아래 근거 URL은 모두 직접 받아 본문에서 해당 문구를 확인했다(HTTP 200). 법령은 국가법령정보 현행본을 조회했다.

---

## 1. (다) 직위 확인 22명

| P | 분류 | 판정 | 근거(기사 본문 문구 · 법령) | 바꾼 파일:줄(ko / en) |
|---|---|---|---|---|
| P033 | D1 | **공인** | 파이낸셜뉴스 2026-09-27(게시물 출처) 본문 "2022년부터 2년간 병무청장을 역임" — 정부조직법 제36조④ "청장은 정무직" → 공수처법 제2조 1호 사목(중앙행정기관 정무직, 퇴직자 포함) | `posts/2026-09-10-ansanheart-academy-merger.md:43` "(전 병무청장)" / en `:23`. 출처 추가 없음(기존 출처) |
| P077 | D1 | **비공인 → 예외 ①(실명 유지)** → ⚠️ 19-1에서 **이니셜로 변경**(10절) | 세계일보 2026-10-27 https://www.segye.com/newsView/20261027510056 "합참 공보실장(해군 대령)". 대령은 비공인. 다만 합참 공식 정례브리핑 발언 당사자로, 게시물 출처(헤럴드경제·통일뉴스·이투데이 등)가 실명으로 보도했고 형사 절차 서술 없음 → PRD §6③ 예외 ①(공적 직무 중 공식 브리핑). 공통 제외의 "대령 이하 군인"은 괄호대로 "사건 당사자 N1"에만 적용된다고 읽었다 — **해석 확인 요청(아래 결정 1)** | 변경 없음(직함 "합참 공보실장" 이미 있음) |
| P123 | D1 | **공인** | 헤럴드경제(미주판 게재) 2025-09-30 https://www.heraldk.com/article/2025093000064722221 "제45대 합참의장으로 취임한 진○○ 공군 대장" — 공수처법 제2조 1호 너목(장성급). 법령 경로(§3.1-1)는 쓰지 않고 계급 기재 기사로 판정 | `posts/2026-09-29-osj17x-hankiho-president-instruction.md:48`·출처 추가 / en `:19`; `posts/2026-10-08-shindawit-us-nis-cyber-group-excluded.md:62`·출처 추가 / en `:26` "(공군 대장)" |
| P135 | D1 | **공인** | 뉴시스 2026-10-05 https://www.newsis.com/view/NISX20261005_0003814628 사진 설명 "합참 정보분석처장 김○○ 육군 준장" — 너목 | `posts/2026-10-05-shindawit-mdl-south-minefields-20m.md:50`·출처 추가 / en `:21` "(육군 준장)" |
| P026 | D2 | **공인** | 시사뉴스 2025-07-22 https://www.sisa-news.com/mobile/article.html?no=257145 "21일 … 고용노동부 장관 … 임명안을 재가" — 사목(장관) | `posts/2026-08-29-idontknowpolitics-martial-law-nk-policy.md:72`·출처 / en `:19`; `posts/2026-09-24-politicscrush-main-enemy-politicians.md`(본문 1줄)·출처 / en `:19` "(같은 달 고용노동부 장관 임명)" |
| P052 | D2 | **공인** | 서울신문 2018-08-05(게시물 출처) 본문 "바른미래당 … 전 의원" — 나목(국회의원, 퇴직자 포함) | `posts/2026-09-13-geonwoo-brother-hospitalization-case.md:55` "전 국회의원(당시 … 후보)" / en `:20` |
| P062 | D2 | **공인** | SBS Biz 2026-09-18 https://biz.sbs.co.kr/amp/article/20000335665 "김○○ 대법관 후보자에 대한 임명안을 재가" — 다목(대법관). 후보자 청문회 장면을 다루는 글이라 제목의 "후보자"는 그대로 두고 본문에 임명 사실을 넣음 | `posts/2026-09-14-yongkeun-justice-hearing-lee-trial.md:40`·출처 / en `:16`. `minjoojuhee` 게시물은 출처 제목에만 있어 변경 없음 |
| P069 | D2 | **공인 · id 유지** | YTN 2026-08-31 https://www.ytn.co.kr/_ln/0101_202608311825251430 "판사 출신 민주당 재선 의원" — 나목 | `posts/2026-09-15-joojinwoo-kimseungwon-hearing.md:42`·출처 / en `:14`; `posts/2026-09-28-kimjanggyeom-hanjunho-kbs-complaint.md:53`·출처 / en `:19` |
| P080 | D2 | **공인 · id 유지** | 파이낸셜뉴스(뉴스1) 2026-09-21(게시물 출처) "김○○ 전 고용노동부 장관" — 사목 | `posts/2026-09-21-kimmoonsoo-prosecution-abolition.md:40` / en `:20`. 다른 3게시물은 링크 문구뿐이라 변경 없음 |
| P086 | D2 | **공인** | 데일리안 2017-03-28 https://www.dailian.co.kr/news/view/621643/ "바른정당 대선 후보로 유○○ 의원이 28일 선출" — 나목 | `posts/2026-09-24-politicscrush-main-enemy-politicians.md`(본문 1줄)·출처 / en `:18` "(당시 바른정당 국회의원)" |
| P215 | D3 | **공인** | 더팩트 2018-03-14 https://news.tf.co.kr/read/ptoday/1717851.htm "제○○ 더불어민주당 의원" — 나목 | `posts/2026-07-04-idontknowpolitics-2018-freedom-deletion.md:40`·출처 / en `:14` |
| P216 | D3 | **공인** | 서울신문 2018-06-09 https://m.seoul.co.kr/news/2018/06/09/20180609500007 "정○○ 자유한국당 의원" — 나목 | 같은 게시물 `:43`·출처 / en `:17` |
| P182 | D3 | **공인** | 출처 제목에만 이름(국방부 장관 — 판정표 다른 행·게시물 다수에서 (가)로 이미 판정) — 사목 | 변경 없음(출처 제목은 기사 제목 그대로) |
| P039 | D3 | **공인** | YTN 2026-07-02 https://www.ytn.co.kr/_ln/0101_202607020745115809 "◆ 이○○ : 안녕하세요. 이○○ 의원입니다."(더불어민주당 원내대변인 인터뷰) — 나목 | `posts/2026-09-10-freedominnovation-nec-bill.md:66`·출처 / en `:17` |
| P075 | D3 | **비공인 → 예외 ①(실명 유지)** | 빛의 위원회 위원장의 정무직 여부는 보도·법령에서 확인 못 함 → 비공인. 시민단체 대표(광주환경운동연합 이사장 겸 공동의장)가 위원장 지명·위촉이라는 공개 활동으로 세계일보 2026-06-26(게시물 출처)에 실명 보도, 형사 절차 없음 → 예외 ① | 변경 없음(직함 이미 있음) |
| P091 | D3 | **공인** | 파이낸셜뉴스(뉴시스) 2026-07-12 https://www.fnnews.com/news/202607121106113918 "박○○ 더불어민주당 의원 … 재선인 박 의원" — 나목 | `posts/2026-09-26-rekor-dmz-dispute.md:41`·출처 / en `:18`; `posts/2026-09-28-parkchoongkwon-dp-mine-remarks.md:61`·출처 / en `:24` "(국회의원)" |
| P105 | D3 | **비공인 · 예외 불가 → 계정 핸들만 · id 이전** | 게시물 출처 3건(아시아경제·파이낸셜뉴스·디지털타임스) 본문에 이 인물 0회, 웹 검색으로도 이 발언 보도 없음 → 예외 ①의 "근거 출처가 실명 보도" 조건 불충족. 직함 미기재라 D6 방식(핸들만) | 아래 2절 |
| P110 | D3 | **공인** | YTN 2026-01-21 https://www.ytn.co.kr/_ln/0101_202601211304370185 출연자 "신○○ 전 더불어민주당 의원" — 나목(퇴직자) | `posts/2026-09-28-parkchoongkwon-dp-mine-remarks.md:61`·출처 / en `:24` "(전 국회의원)" |
| P121 | D3 | **공인** | 해양경찰법 제11조① "해양경찰청장은 치안총감으로 보한다", 경찰공무원법 제7조①(해양경찰청 소속 경찰공무원 임용)·제3조(치안총감 ⊃ 경무관 이상) → 공수처법 제2조 1호 하목, 퇴직자 포함. 1심 무죄는 이미 같은 문장에 있음(공인은 지위 기준 — PRD §6③ 명확화) | 변경 없음(직함 "전 해경청장" 이미 있음) |
| P158 | D3 | **비공인(확인 불가) · 예외 불가 → 이니셜 ㅇ씨/L** | 비대위원장은 2026-09-10 신설 당헌 제87조로 선임 보도(뉴데일리 2026-09-14 등)되나 조문 원문·"대표" 지위 여부를 확인 못 함 → 정책 §3.1 정당 간부 앵커 해당 확인 불가. 게시물 출처 4건 본문에 이 인물 0회, 이 발언 보도도 검색에 없음 → 예외 ① 불충족 | 아래 2절 · 3절(이미지) |
| P171 | D3 | **비공인 → 예외 ①(실명 유지)** | 뉴시스 2024-01-19(게시물 출처) "김○○ 국민의힘 대변인은 이날 오후 논평" — 비의원 정당 대변인 본인 논평, 실명 보도 | 변경 없음(직함 이미 있음) |
| P160 | D3 | **공인** | 파이낸셜뉴스(뉴스1) 2026-09-02 https://www.fnnews.com/news/202609021121050690 "김○○ 경남경찰청장을 치안정감으로 승진시켜 경찰청 차장으로 임명 … 경찰청장 직무대행" — 하목 | `posts/2026-10-13-yeong573-police-bodycam-china.md:50`·출처 / en `:23` "(경찰청 차장·치안정감)" |

- 집계: **공인 17**(P033·P123·P135·P026·P052·P062·P069·P080·P086·P215·P216·P182·P039·P091·P110·P121·P160), 비공인·예외 ① 실명 유지 3(P077·P075·P171), 비공인·예외 불가 2(P105 핸들, P158 이니셜). 17+3+2 = 22.
- 출처 추가: 위 표에서 "출처"로 적은 ko 게시물 13개의 `sources[]` 끝에 `type: 언론` 형식으로 추가(기존 형식·날짜는 기사 메타 그대로). 공인으로 판정된 사람의 id(P069·P080)는 그대로 둔다.
- 문장 점검: 넣은 괄호는 모두 직함 앞뒤 조사와 맞췄다(…장관(…)은/…후보자(…)도 등). 영어본은 같은 자리에 관계절·동격으로 넣었다.

## 2. id 이전 · 이니셜 전환

**P105 — id 이전 1건**
- 새 id: `2026-09-28-instagram-chief-justice-audit-witness` (계정 자리가 인물 이름이라 `instagram`으로 바꿈 — 업로더 18 P084② 선례)
- ko·en 파일 `mv`, frontmatter `id` 2곳, 내부 링크 2곳(`posts/2026-10-07-gotdemcatch-kimminseok-chief-justice-resign.md:39`·en `:12`), `retired-ids.txt`·`moved-ids.txt` 각 1줄 추가. 이미지 폴더 없음.
- 문안: 제목 "인스타그램 게시물 \"…\"" / en "Instagram post: \"…\"", 설명·attribution의 괄호 표시 이름 삭제(핸들만). ko `:2·3·4·8`, en `:2·3·4·5`.
- 옛 id 문자열: `content/`(두 txt 제외)·`src/`·`public/`·`scripts/`·`next.config.ts`·`vercel.json` **0건**. validate "옮긴 id 9건 · 리다이렉트 규칙 18개 · 오류 0".
- 기록 문서(`docs/`·`instructions/` 추적 16파일)에는 옛 id 문자열이 그대로 있다 — 리뷰어 54 P3-6·56 P3-4와 같은 처리(측정 기록 유지)로 손대지 않았다.

**P158 — 게시물 전체 이니셜(ko ㅇ씨 · en L)**
- `posts/2026-10-12-hagonolza-equal-earth-dokdo.md`: description `:4`, speaker.name `:10`, image.alt `:15`, 태그 줄 삭제, 본문 `:47`·`:58` (모두 6곳, 이전 실명 6회 → 0)
- en: description `:4`, imageAlt `:5`, 본문 `:17`·`:28`
- 직함 "개혁신당 비대위원장 / Reform Party emergency committee chair"는 남김.

## 3. 카드 이미지 재제작 1장 (P158)

- `public/images/2026-10-12-hagonolza-equal-earth-dokdo/thumb.jpg` — 1200×675 JPEG.
- 방법: 원본에서 바뀌는 셋째 본문 줄만 배경색으로 지우고 같은 글꼴(AppleSDGothicNeo 33px, x=80, y=372 — 원본 줄을 같은 설정으로 다시 그려 원본과 픽셀 차이 0을 먼저 확인)으로 새 문구를 그림. 나머지 영역은 원본 그대로.
- 재제작 후 직접 열어 읽은 글자(줄 구분 `/`): 세계지도 이퀄어스 한국어판에서 독도 삭제 / — 제작자 "한·일 대사관과 협의" vs 외교부 "사실 아냐" / 반크가 만들어 6월 공식 등재한 한국어판 지도, 10월 독도 빠져 / 외교부: 일본과 삭제 협의·동의한 사실 전혀 없어, 시정 요구 / 원문이 전한 비대위원장 ㅇ씨 "탄핵감" 발언은 보도로 미확인 / 공산당이싫어요 자체 제작 이미지
- 실명 0. ko image.alt·en imageAlt와 문구 일치.
- P105 게시물은 이미지 없음. 1절의 다른 게시물은 카드 글자를 바꾸지 않았다(공인 직위 추가만이라 이미지 글자와 충돌 없음).

## 4. 태그 삭제 (리뷰어 56 P2-1 + 전수)

- 방법: ko 209개 게시물 frontmatter `tags:` 전체(서로 다른 태그 321개)를 눈으로 훑어 사람 이름 태그 47개를 뽑고, 판정표(가림본)·게시물 문맥으로 인물을 대조했다. 영어본에는 `tags`가 없다(209/209 확인).
- **지운 태그 7줄**(모두 그 태그를 쓴 마지막 게시물이라 태그 주소가 사라짐)

| 태그 인물 | 게시물 | 사유 |
|---|---|---|
| P024 | `posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md` | D4 북한 인사(예외 ④) |
| P059 | `posts/2026-09-30-2pro-unc-armistice-violation.md`, `posts/2026-09-30-shindawit-nk-mdl-50-crossings.md` | D4 북한 인사 |
| P041 | `posts/2026-09-10-geonwoo-…-song-contest.md` | D5 역사 인물 |
| P054 | `posts/2026-09-13-geonwoo-professor-2023-remark.md` | N2 예외 ① |
| P158 | `posts/2026-10-12-hagonolza-equal-earth-dokdo.md` | 1절 이니셜 |
| P089 | `posts/2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard.md` | N1 사건 피해자(성+계급 태그). 오더 목록 밖이나 "사람 이름 태그 전수"에 해당해 삭제 — **확인 요청(결정 3)** |

- **사라지는 태그 주소 6개**(리다이렉트는 코드라 손대지 않음): `/tag/` + 위 6인물의 태그 문자열(P024·P059·P041·P054·P158·P089). 이름이 들어 있어 문자열은 적지 않는다 — 저장소 밖 목록과 `git diff -- content/posts`의 `-  - …` 줄로 확인 가능.
- P041 게시물 id에도 이름이 있으나 역사 인물 id는 이전 대상이 아니다(PRD §6③ id 규칙).
- **유지한 이름 태그 41개** = 공인 40 + 사건·계정 별칭 1. 판정표 (가) 분류와 그 태그를 쓴 게시물의 직함으로 하나씩 대조했다.
  - 대통령·전 대통령(G3, 가목): P163, P010, P009, P118(역사 — 전 대통령, 퇴직자 포함)
  - 국무총리·장관·정무직·대통령실(G4·사목·마목·아목): P022, P007, P164, P011, P150, P071, P080(1절)
  - 국회의원·정당 지도부(G1·G7, 나목·정당 간부): P047, P005, P003/P078 중 해당 게시물 의원, P108, P021, P018, P090, P035, P017, P072, P032, P049, P076, P093, P068/P134, P102, P061, P109
  - 광역단체장(G2): P067, P048(고인 전 시장)
  - 대법원장·검사(G5): P064, P016
  - 외국 정상(G11): P213, P209 / 북한 지도자(G10): P056
  - 대통령 배우자(G9, 1a): P053, P115(역사)
  - 업로더 18 공인 판정: P087
  - 사건·계정 별칭 1개: 대통령 배우자 의혹 관련 익명 계정의 별칭(사람 이름이 아니라 사건명으로 보고 유지 — **확인 요청(결정 3)**)
- 합계 대조: 이름 태그 후보 47 = 삭제 6종(7줄) + 유지 41.

## 5. 문서 잔존 정리

리뷰어 56 7절 추적 14파일 + 미추적 history 4줄 + 1절에서 이니셜이 된 P105·P158의 `content/` 밖 추적 파일 전수(2,100개 중 텍스트 파일) 검사 결과를 고쳤다.

| 파일 | 줄 | 인물 | 바꾼 것 |
|---|---|---|---|
| `docs/reviews/card-image-policy-legal-review.md` | 187 · 188 | P194 · P196 | ㅌ씨 · ㅎ씨 |
| `docs/supervisor/drafts/2026-09-28-held-recheck.md` | 341 | P155(리뷰어 56 P3-1 분류대로) | 목사 ㅇ씨 |
| `docs/tools/designer-04-B/data.json` | (태그 집계 배열) | P194 · P158 | 해당 태그 항목 2개 삭제(태그가 없어졌으므로). JSON 파싱 확인 |
| `docs/tools/reviewer-14/results/` 6개 로그 | 각 1 | P196 | ㅎ씨(커밋 제목이 찍힌 줄 — git 이력 자체는 그대로) |
| `docs/tools/reviewer-24/forbidden-terms-output.txt` | 88 · 98 | P194 | ㅌ씨 |
| `docs/tools/reviewer-26/x-truncation-audit-output.txt` | 25 | P194 | T |
| `docs/tools/reviewer-30/gen.py` | 53 · 138 | P194 · P196 | ㅌ씨 · ㅎ씨 |
| `docs/tools/reviewer-30/image-recheck.tsv` | 32 · 121 | P194 · P196 | ㅌ씨 · ㅎ씨 |
| `docs/tools/reviewer-30/post-recheck.tsv` | 49 | P196 | ㅎ씨 |
| `docs/handoffs/translator-01-english-batch-1.md` | 124 | P105 | 번역 표기표 행을 "계정 핸들로 표기"로 |
| `history/2026-10-08.md`(미추적) | 34 · 36 | P155 · P146 | 목사 ㅇ씨 · 유튜버 ㅂ씨 |
| `history/2026-10-11.md`(미추적) | 21 · 38 | P194 | 전 미국 대사 ㅌ씨(38행 2곳) |
| `history/2026-10-12.md`(미추적) | 3 · 52 | P196 · P158 | ㅎ씨 · ㅇ씨(52행은 이번 1절 인물이라 같이 정리) |

- `history/2026-10-25.md`는 오더대로 그대로 뒀다.
- 이 줄들의 옛 id 문자열(P194·P105 옛 id)은 기록 문서 유지 원칙대로 남겼다.

## 6. 0건 확인

- 1·2·3차 인물(업로더 17·18·19에서 이니셜이 된 인물 전체 — 이름·성·로마자 45개 패턴, 저장소 밖 목록)으로 **추적 파일 전체 + 게시물 418 + `history/` 전체(미추적 포함) = 1,963개 텍스트 파일** 재검사 → **0회**(정리 후). 첫 검사(1,939개)에서 남았던 1줄(`history/2026-10-12.md:52`)을 고친 뒤 다시 돌린 결과다.
- P105·P158 이름: `content/posts`·`content/posts-en` 0회.
- 옛 id(P105): 2절 범위 0건.

## 7. 검증

- `npm run validate:content` → R=0. "검사 파일 418건(한국어 209 · 영어본 209) · 통과 418건 · 실패 0건 (오류 0개)", "옮긴 id 목록 9건 · 리다이렉트 규칙 18개 · 오류 0개". 경고 22개 — 작업 전과 목록 동일(새 경고 0).

## 8. 확인 요청 (결정 필요)

1. **P077 대령 공보실장의 예외 ① 적용** — 공통 제외 "대령 이하 군인(사건 당사자 N1)"을 사건 당사자에만 적용으로 읽어 실명 유지. 대령 전체에 적용이면 2게시물(`nowandhere-mdl-mine-briefing-reel`·`shindawit-nk-mdl-50-crossings`) ko·en을 직함+이니셜로 바꿔야 한다.
2. **P158 당헌상 지위** — 개혁신당 당헌 제87조가 비대위원장에게 대표 지위를 준다고 확인되면 공인(정당 간부 앵커)으로 실명·태그 복원 가능. 지금은 확인 불가라 이니셜.
3. **태그 판단 2건** — P089 성+계급 태그 삭제(오더 목록 밖), 계정 별칭 태그 유지. 반대로 정하면 되돌린다.
4. **범위 밖 발견 1건(수정 안 함)** — `posts/2026-09-26-rekor-dmz-dispute.md:41`(en `:18`)은 "정부와 군은 북한이 매설한 지뢰일 가능성을 배제한 적이 없다", "모든 가능성을 열어놓고 조사하고 있다"를 수석대변인 발언으로 적었으나, 출처 두 건(파이낸셜뉴스 2026-09-26, 경향신문 2026-09-26 https://khan.co.kr/article/202609261159001)은 이 두 문장을 **같은 날 다른 원내대변인**의 서면브리핑으로 보도한다. 발언자 정정이 필요하다(편집 정책 — 출처와 불일치).
5. P087·P020 판정표 행 (가) 정정은 리뷰어 영역(리뷰어 56 P3-3) — 손대지 않음.

## 9. 같은 세션의 별도 작업(사용자 URL — 오더 밖)

- 인스타그램 릴스 1건 병합: `posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md:34`·en `:12` 서두 1문장. 트리거 `docs/triggers/poster-merge-wikipost_mag-DfUjVLUuRxo-COMPLETE.md`. 아래 git status에 함께 보인다.

## 9-1. `git status --short` 전체 — 19 본 작업 시점 (옛 id 경로 2줄은 "(P105 옛 id)"로 가림)

```
 M content/moved-ids.txt
 M content/posts-en/2026-07-04-idontknowpolitics-2018-freedom-deletion.md
 M content/posts-en/2026-08-29-idontknowpolitics-martial-law-nk-policy.md
 M content/posts-en/2026-09-10-ansanheart-academy-merger.md
 M content/posts-en/2026-09-10-freedominnovation-nec-bill.md
 M content/posts-en/2026-09-13-geonwoo-brother-hospitalization-case.md
 M content/posts-en/2026-09-14-yongkeun-justice-hearing-lee-trial.md
 M content/posts-en/2026-09-15-joojinwoo-kimseungwon-hearing.md
 M content/posts-en/2026-09-21-kimmoonsoo-prosecution-abolition.md
 M content/posts-en/2026-09-24-politicscrush-main-enemy-politicians.md
 M content/posts-en/2026-09-26-rekor-dmz-dispute.md
 D content/posts-en/(P105 옛 id).md
 M content/posts-en/2026-09-28-kimjanggyeom-hanjunho-kbs-complaint.md
 M content/posts-en/2026-09-28-parkchoongkwon-dp-mine-remarks.md
 M content/posts-en/2026-09-29-osj17x-hankiho-president-instruction.md
 M content/posts-en/2026-10-05-shindawit-mdl-south-minefields-20m.md
 M content/posts-en/2026-10-07-gotdemcatch-kimminseok-chief-justice-resign.md
 M content/posts-en/2026-10-08-shindawit-us-nis-cyber-group-excluded.md
 M content/posts-en/2026-10-12-hagonolza-equal-earth-dokdo.md
 M content/posts-en/2026-10-13-yeong573-police-bodycam-china.md
 M content/posts-en/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/posts/2026-07-04-idontknowpolitics-2018-freedom-deletion.md
 M content/posts/2026-08-28-koreatruthnews-jeju-nk-aid-dual-contract.md
 M content/posts/2026-08-29-idontknowpolitics-martial-law-nk-policy.md
 M content/posts/2026-09-10-ansanheart-academy-merger.md
 M content/posts/2026-09-10-freedominnovation-nec-bill.md
 M content/posts/2026-09-10-geonwoo-jeongyulseong-song-contest.md
 M content/posts/2026-09-13-geonwoo-brother-hospitalization-case.md
 M content/posts/2026-09-13-geonwoo-professor-2023-remark.md
 M content/posts/2026-09-14-yongkeun-justice-hearing-lee-trial.md
 M content/posts/2026-09-15-joojinwoo-kimseungwon-hearing.md
 M content/posts/2026-09-21-kimmoonsoo-prosecution-abolition.md
 M content/posts/2026-09-24-politicscrush-main-enemy-politicians.md
 M content/posts/2026-09-26-nonjeomjikjin-dmz-marine-corporal-standard.md
 M content/posts/2026-09-26-rekor-dmz-dispute.md
 D content/posts/(P105 옛 id).md
 M content/posts/2026-09-28-kimjanggyeom-hanjunho-kbs-complaint.md
 M content/posts/2026-09-28-parkchoongkwon-dp-mine-remarks.md
 M content/posts/2026-09-29-osj17x-hankiho-president-instruction.md
 M content/posts/2026-09-30-2pro-unc-armistice-violation.md
 M content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md
 M content/posts/2026-10-05-shindawit-mdl-south-minefields-20m.md
 M content/posts/2026-10-07-gotdemcatch-kimminseok-chief-justice-resign.md
 M content/posts/2026-10-08-shindawit-us-nis-cyber-group-excluded.md
 M content/posts/2026-10-12-hagonolza-equal-earth-dokdo.md
 M content/posts/2026-10-13-yeong573-police-bodycam-china.md
 M content/posts/2026-11-04-leejinsook-martial-law-soldiers-presser.md
 M content/retired-ids.txt
 M docs/handoffs/translator-01-english-batch-1.md
 M docs/reviews/card-image-policy-legal-review.md
 M docs/supervisor/drafts/2026-09-28-held-recheck.md
 M docs/tools/designer-04-B/data.json
 M docs/tools/reviewer-14/results/gate-arg-order.log
 M docs/tools/reviewer-14/results/gate-exit3-symlink.log
 M docs/tools/reviewer-14/results/gate-negative-staged-type-error.log
 M docs/tools/reviewer-14/results/gate-staged-10paths.log
 M docs/tools/reviewer-14/results/sig-INT-pgrp.log
 M docs/tools/reviewer-14/results/sig-TERM.log
 M docs/tools/reviewer-24/forbidden-terms-output.txt
 M docs/tools/reviewer-26/x-truncation-audit-output.txt
 M docs/tools/reviewer-30/gen.py
 M docs/tools/reviewer-30/image-recheck.tsv
 M docs/tools/reviewer-30/post-recheck.tsv
 M history/2026-10-01.md
 M history/2026-11-05.md
 M history/2026-11-09.md
 M history/2026-11-10.md
 M public/images/2026-10-12-hagonolza-equal-earth-dokdo/thumb.jpg
?? content/posts-en/2026-09-28-instagram-chief-justice-audit-witness.md
?? content/posts/2026-09-28-instagram-chief-justice-audit-witness.md
?? docs/handoffs/tester-01-deployed-image-loading.md
?? docs/qa/tester-01/
?? docs/tools/designer-03/screens/
?? docs/tools/designer-05/screens/
?? docs/tools/designer-05/sheets/
?? docs/tools/planner-07/38north_article.html
?? docs/tools/planner-07/38north_rss.xml
?? "docs/tools/planner-07/datago_\352\265\255\352\260\200\354\240\225\353\263\264\354\233\220\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? "docs/tools/planner-07/datago_\352\265\255\353\260\251\353\266\200\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? "docs/tools/planner-07/datago_\355\225\251\353\217\231\354\260\270\353\252\250\353\263\270\353\266\200\353\263\264\353\217\204\354\236\220\353\243\214.html"
?? docs/tools/planner-07/dod_rss.xml
?? docs/tools/planner-07/jcs_afp.html
?? docs/tools/planner-07/jcs_main.html
?? docs/tools/planner-07/jcs_root.html
?? docs/tools/planner-07/korea_rss_list.html
?? docs/tools/planner-07/korea_rss_notice.html
?? docs/tools/planner-07/mnd_main.html
?? docs/tools/planner-07/mnd_root.html
?? docs/tools/planner-07/mnd_rss.xml
?? docs/tools/planner-07/nknews_article.html
?? docs/tools/planner-07/nknews_rss.xml
?? docs/tools/planner-07/rfa_rss.xml
?? docs/tools/planner-07/unikorea_openapi.html
?? docs/tools/planner-07/unikorea_rss.xml
?? docs/tools/planner-07/usfk_root.html
?? docs/tools/planner-07/yna_nk_rss.xml
?? docs/tools/programmer-14/screens-e2e/
?? docs/tools/programmer-14/screens/
?? docs/tools/reviewer-31/screens-e2e/
?? docs/tools/reviewer-31/screens/
?? docs/tools/tester-01/
?? docs/triggers/poster-merge-wikipost_mag-DfUjVLUuRxo-COMPLETE.md
?? docs/triggers/tester-01-deployed-image-loading-COMPLETE.md
?? history/2026-10-02.md
?? history/2026-10-03.md
?? history/2026-10-04.md
?? history/2026-10-05.md
?? history/2026-10-06.md
?? history/2026-10-07.md
?? history/2026-10-08.md
?? history/2026-10-09.md
?? history/2026-10-10.md
?? history/2026-10-11.md
?? history/2026-10-12.md
?? history/2026-10-13.md
?? history/2026-10-14.md
?? history/2026-10-15.md
?? history/2026-10-19.md
?? history/2026-10-20.md
?? history/2026-10-21.md
?? history/2026-10-22.md
?? history/2026-10-25.md
?? history/2026-10-27.md
?? history/2026-10-29.md
?? history/2026-10-30.md
?? history/2026-11-01.md
?? history/2026-11-02.md
?? history/2026-11-03.md
?? history/2026-11-04.md
?? history/2026-11-06.md
?? history/2026-11-08.md
?? instructions/programmer/17-about-sns-stored-line-remove.md
?? instructions/tester/processed/01-deployed-image-loading.md
?? instructions/uploader/19-nonpublic-name-3.md
```

## 10. 19-1 추가 처리 (슈퍼바이저 답 — 8절 확인 요청 1~5)

1. **P077 → 직함+이니셜(ko ㅈ씨 · en J)** — 비공인 확정 표의 "대령 이하 군인"은 사건 당사자로 한정되지 않는다는 슈퍼바이저 판단. 같은 날 병합한 회견 중령(ㅇ씨) 표기와도 맞춤.
   - `content/posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md:43` / en `:14`
   - `content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md:70` / en `:27`
   - 두 게시물의 id·태그·이미지에는 이 인물 이름이 없음(이미지 블록 없음, 태그 확인). 게시물 안 다른 지칭("장 실장" 등)도 0.
   - `content/` 밖 추적 문서 4파일도 정리: `docs/supervisor/drafts/2026-09-21-nowandhere-mdl-mine-reel.md:14·38`, `docs/handoffs/translator-02-english-batch-2-opus.md:133`(표기표에서 항목 삭제), `docs/tools/reviewer-07/approved-posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md:43`, `docs/reviews/programmer-03-remove-status-label-review.md:174·331`
   - 표기 정리라 `updatedAt`·갱신 이력은 바꾸지 않음(2026-09-30 게시물의 기존 `updatedAt`은 그대로).
2. **P158** — 이니셜 유지(변경 없음).
3. **태그 2건** — 판단 유지(P089 태그 삭제 유지, 계정 별칭 태그 유지).
4. **rekor-dmz-dispute 발언자 정정(사실 정정)**
   - 기사 대조: 경향신문 2026-09-26 https://khan.co.kr/article/202609261159001 · 파이낸셜뉴스 2026-09-26(기존 출처) 모두 "정부와 군은 … 배제한 적이 없다", "모든 가능성을 열어놓고 …"를 **원내대변인의 서면브리핑**으로 보도. 수석대변인 몫은 "안보를 정쟁의 도구로 …"뿐.
   - 원내대변인 직위: 오마이뉴스 2026-06-04 https://www.ohmynews.com/NWS_Web/Series/series_premium_pg.aspx?CNTN_CD=A0003240120 "충남 두 번째 여성 국회의원 탄생 … 아산을 당선"(6·3 보궐선거) → 국회의원(공수처법 제2조 1호 나목) → 공인, 실명·직위 표기. (같은 인물이 원내대변인으로 10월 27일 브리핑한 연합뉴스 보도도 확인)
   - ko `content/posts/2026-09-26-rekor-dmz-dispute.md`: `updatedAt: 2026-11-10` 추가(`:6`), 정정 안내 블록 추가(`:32` — 선례 `2026-09-28-2pro-jcs-interim-claim`의 "🔁 정정 (날짜)" 형식), 본문 발언자 정정(`:43`), 출처 2건 추가(경향신문·오마이뉴스, `:28·31` 부근 `sources[]` 끝).
   - en `content/posts-en/2026-09-26-rekor-dmz-dispute.md`: `translatedAt: 2026-11-10`(`:6` — 원본과 함께 고쳐 "번역 이후 갱신" 경고가 나지 않게), Correction 블록(`:11`), 본문 정정(`:20`).
   - 제목·설명은 발언자를 "민주당"으로만 적어 정정 대상이 아님(변경 없음).
5. **판정표 정정** — 리뷰어 몫(손대지 않음).

**0건 재확인**
- 1·2·3차 인물 + P077 이름 패턴 47개(저장소 밖)로 추적 파일 전체 + 게시물 418 + `history/` 전체 + 트리거 = **1,966개 텍스트 파일 → 0회**.
- 이 절과 트리거 전체에 비공인 실명·예외 인물 이름·옛 id 문자열 없음(같은 패턴과 `moved-ids.txt` 옛 id 목록으로 grep 0).

**validate**
- `npm run validate:content` R=0 — 418/418 통과, 오류 0, 옮긴 id 9 · 리다이렉트 18. 경고 22개, 19 본 작업 직후 목록과 동일(새 경고 0).

**`git status --short` 증분 (19 본 작업 시점 → 19-1 후)**
```
+  M content/posts-en/2026-09-20-nowandhere-mdl-mine-briefing-reel.md
+  M content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md
+  M content/posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md
+  M docs/handoffs/translator-02-english-batch-2-opus.md
+  M docs/reviews/programmer-03-remove-status-label-review.md
+  M docs/supervisor/drafts/2026-09-21-nowandhere-mdl-mine-reel.md
+  M docs/tools/reviewer-07/approved-posts/2026-09-20-nowandhere-mdl-mine-briefing-reel.md
+ ?? docs/triggers/uploader-19-nonpublic-name-3-COMPLETE.md
- ?? instructions/uploader/19-nonpublic-name-3.md
+ ?? instructions/uploader/processed/19-nonpublic-name-3.md
```
- `+`는 새로 생긴 줄, `-`는 없어진 줄. 오더 이동 2줄과 이 트리거 1줄은 19 본 작업 마무리분이다. `content/posts/2026-09-26-rekor-dmz-dispute.md`·`content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md`·`content/posts-en/2026-09-26-rekor-dmz-dispute.md`는 19 본 작업에서 이미 ` M`이라 증분에 다시 나오지 않는다.
