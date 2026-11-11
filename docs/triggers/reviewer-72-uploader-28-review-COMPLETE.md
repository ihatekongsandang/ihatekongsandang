# reviewer-72 — 업로더 28 검토 (인물 없는 자료사진 A-2 묶음 3, 14건) — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 하위 에이전트 · 검토만(파일 수정·git 쓰기·빌드 0)
- 오더: `instructions/reviewer/processed/72-uploader-28-review.md`(이동). 선행: 리뷰 69·70 트리거, 업로더 28 트리거·오더, 정책 §4.5
- 대상: 게시물 14쌍, `public/images/{id}/` 14개, `docs/qa/uploader-28-candidates.md`. 🔴 `gotdemcatch`·`attendkdz`는 검토하지 않았고 커밋 경로에서도 뺐다.
- 수정한 파일: 이 트리거뿐. 원본 내려받기와 메타데이터 검사는 저장소 밖 scratch에서만 했다. 이 기록에는 사진 저작자 개인 이름·Flickr 계정명을 쓰지 않는다.

## 판정: 🟡 **조건부 통과** — P1 0 · P2 1 · P3 3
- **13건 통과.**
- **1건(#5 `wendmag`)은 불가**(P2-1). 이 게시물의 이미지만 빼면 나머지 13건을 커밋할 수 있다.

## 0. 경계 사례·원산 사진
| 사례 | 판정 | 근거 |
|---|---|---|
| #4 `2026-09-16-hagonolza-country-insult-bill` — 의원 발의 형법 개정안 + 국회의원회관(Q2) | ✅ **허용** | 제목은 "징역 5년?"이라는 소문을 바로잡는 사실 확인형이다("5년은 허위사실 명예훼손 조항"). 비판의 초점은 법안 내용이지 국회나 의원의 위법이 아니다. 업무 무대(법안 발의 → 국회)이고, 리뷰 70 #10·#11 선례(제목이 사실 전달형이면 허용)와 같다 |
| #5 `2026-10-05-wendmag-cio-investigation-scope` — 공수처 수사 대상에서 대통령·**국회의원을 빼는** 개편 + **국회의원회관**(Q2) | ❌ **불가** | 제목 "대통령·민주당 의원 수사 금지?"가 겨냥하는 것은 **의원들이 자신을 수사 대상에서 빼려 한다는 의혹**이다. 그 비난 대상이 의원들의 사무 건물인 국회의원회관 자체다 → 정책 §4.5-5 "의혹·비난 대상이 사진 속 기관·조직 자체이면 쓰지 않는다". 사실 전달형이라도 사진 대상과 비난 대상이 같아 결합 위험이 #4보다 분명히 크다. 국회의사당(Q1) 사진으로 바꿔도 대상(국회의원)이 같아 마찬가지다 |
| #14 `2026-10-29-khan-nk-srbm-launch-wonsan` — 합참 "원산 일대서 발사" + 원산 시내 해안 | ✅ **허용** | 리뷰 70 tessa 기준(게시물과 **다른 구역·다른 대상**이면 불가)에 비춰 보면, 이 사진은 게시물이 지목한 **"원산 일대"와 같은 도시**다. 발사 지점은 보도에도 "일대"로만 나온다. §4.5-3 특정 지점 규칙대로 caption이 "발사 지점도 아닙니다"라고 밝혔다. 비난 대상 기관도 없다 |
| #12 공소청 현판(S) — `20hoon` 검찰청 폐지·공소청 출범 안내 | ✅ **허용** | 게시물 주제인 기관(공소청)의 현판이다. 현판 글자는 공적 기관 이름이라 §5.3-12 대상이 아니다. 촬영(10-02)이 게시물 날짜(09-30)보다 늦지만, A-2는 사건 당시 사진이 아니어도 된다. caption이 그 점을 밝혔다 |
| #13 서초동 대검 일대(X) — `kimmoonsoo` "대검 앞 기자회견" | ✅ **허용** | 원 페이지 대상지는 "검찰청", 세부대상지는 대검찰청·대법원·서울고등법원·서울중앙지방검찰청이다. 기자회견 장소(대검 앞)가 들어 있는 일대 사진이고, caption도 "대검찰청 일대"로 적어 특정 건물이라 하지 않았다. 대검은 장소이지 비난 대상이 아니다(비판 대상은 정부의 검찰청 폐지) |

- **위키미디어 Flickr 이전 파일 W**: 파일 원문에서 `{{cc-by-2.0}}` + `{{User:FlickreviewR/reviewed-pass|…|2017-03-22…|cc-by-2.0|}}`를 확인했다(검증 틀이 실제로 있다). 원 Flickr 페이지를 직접 열어 보니 **지금도 CC BY 2.0**(라이선스 링크 `licenses/by/2.0/`)이다 ✅
- **S**: `{{self|cc-by-4.0}}`, `source={{own}}`(본인 촬영), 삭제·침해 틀 없음 ✅

## 1. 라이선스 (원 페이지 직접 열람)
| 키 | 원 페이지(대상지·촬영) | 라이선스 | 결과 |
|---|---|---|---|
| Q1 | `data.si.re.kr/node/48322` — 05T01004Dc8000, 2014/10, 대상지 국회의사당, **촬영 장소 "금산빌딩 11층 옥상"** | CC BY 4.0 배지(`licenses/by/4.0/deed.ko`) + 서비스 공통 표기 안내, 기관 | ✅ (P3-1) |
| Q2 | `/node/48323` — 05T01101Dc2000, 2015/1, 강변남로, 대상지 국회의원회관 | 같음 | ✅ |
| R | `/node/62223` — 06T00302Dc12000, 2020/02, 국회의사당 | 같음 | ✅ |
| L | `/node/60732` — 리뷰 70에서 확인함(저장 파일 해시 같음) | 같음 | ✅ |
| N | `/node/60734` — 06O02307Dc72000, 2020/06, 법조단지(세부대상지 서울고등법원·서울중앙지방법원·서울법원종합청사·대법원 등) | 같음 | ✅ |
| D | `/node/60607` — 리뷰 69에서 확인함(해시 같음) | 같음 | ✅ |
| X | `/node/47222` — 05O00802Dc8000, 2015/2, 대상지 검찰청 | 같음 | ✅ |
| S | 위키미디어 `File:Signboard_of_Supreme_prosecutors_office_20261002_112214_HDR.jpg` | `{{self|cc-by-4.0}}`, API "CC BY 4.0", 원본 4624×3468, 개인 | ✅ |
| W | `File:Wonsan_waterfront_(2937890043).jpg` | `{{cc-by-2.0}}` + FlickreviewR pass(2017), 원 Flickr 지금도 CC BY 2.0, 개인 | ✅ |

## 2. 사진 (고유 9장 Read로 직접 열람 · 14파일 해시 대조 · 원본 대조)
- 14개 파일의 해시가 고유 9장과 맞는다: Q1 ×3, Q2 ×3, N ×2, R·L·D·X·S·W 각 ×1. L·D는 이미 커밋된 파일과 해시가 같다.
- **원본 대조**:
  - Q1·Q2·R·N·X: 서비스 표시본과 디코딩 픽셀 **동일**
  - S·W: 위키미디어 1280px 축소본과 **바이트 동일**
  - → 변형 없음
- **사람**:
  - Q2·R·N·D·S: 없음(차량만)
  - Q1: 오른쪽 아래 보도에 점 크기 몇 명
  - X: 옥상에 점 크기
  - W: 산책로에 보행자 약 4명(키 15px 안팎, 얼굴 몇 px / 짧은 변 853 → 1% 미만)
  - 군인·경찰 복장 없음 ✅
- **공사 중·옛 모습**: 사진 대상은 없다. R 왼쪽 아래 끝의 다른 건물 공사 현장은 대상 밖이다. 10년 이상인 Q1(2014)·Q2(2015)·X(2015)·W(2008)에는 "현재 모습과 다를 수 있습니다."가 있다 ✅
- **품질·표시**: 짧은 변 601~960px. 워터마크·로고·덧씌운 글자 없음. Q2의 도로 표지판과 D의 울타리 띠 글자는 원본 해상도에서 읽히지 않는다.
- **메타데이터**(태그 이름만 확인, 값은 옮기지 않음):
  - 14개 모두 EXIF Artist·XPAuthor·MakerNote·UserComment·CameraOwnerName·BodySerialNumber·GPS **0**, XMP `dc:creator`·`aux:SerialNumber`·`dji:Gps*`·`dji:SelfData` **0**(파일 바이트 직접 검색으로도 0), IPTC By-line·위치 **0**
  - Q1·Q2·X: EXIF·XMP·IPTC 없음, COM은 인코더 표기("CREATOR: gd-jpeg…")뿐
  - S·W: 메타데이터 없음(W는 ICC 색 프로필만)
  - R·L·N·D: Copyright(기관 고지)·드론 자세값·IPTC 날짜·키워드만 남음 — 리뷰 69·70에서 허용한 범위와 같다 ✅

## 3. 같은 원본 3건 한도·반복 위험
- 작업 트리 open 33건의 `sourcePageUrl`을 전수로 셌다(a339b3b·9fe175d 포함).
  - 3건: 62226 · 62227 · 60732(L) · 48323(Q2) · 48322(Q1) · 도라전망대(E)
  - 2건: 62224 · 62222 · 60734(N) · 60607(D)
  - 1건: 나머지
- **모두 3건 이하**이고 업로더 표와 맞다. #5를 빼면 Q2는 2건이 된다.
- **국회 쏠림**(리뷰 70 P3-2): 국회 사진은 33건 중 18건이다. 지상 사진을 섞었고(Q2) 항공 연작 비중도 줄였지만 여전히 절반이 넘는다. 여기에 법조단지·대법원·검찰 계열이 8건이다. 피드에서 비슷한 기관 사진이 이어질 위험은 남아 있다(P3-2).

## 4. 게시물 적합성 (건별)
| # | id | 사진 | 같은 대상 | 결합 위험 | 판정 |
|---|---|---|---|---|---|
| 1 | `2026-08-12-citynewsmeme-parksangyong-oath-refusal` | Q1 | 국회 국정조사 청문회 → 국회 | 증인 행동 전달형, 국회 비난 아님 | ✅ |
| 2 | `2026-08-25-nowandhere-625-constitution-question` | Q1 | 국회 예결위 질의 → 국회 | 없음 | ✅ |
| 3 | `2026-09-29-osj17x-hankiho-president-instruction` | Q1 | 국방위 현안질의 → 국회 | 비판 대상은 대통령 지시 | ✅ |
| 4 | `2026-09-16-hagonolza-country-insult-bill` | Q2 | 의원 발의 법안 → 국회(의원회관) | 0절 | ✅(경계) |
| 5 | `2026-10-05-wendmag-cio-investigation-scope` | Q2 | 국회 법안 | ❌ 비난 대상(의원) = 사진 기관 | ❌ P2-1 |
| 6 | `2026-09-22-emong-nk-contact-law` | Q2 | 의원 발의 개정안 → 국회 | 사실 전달형 | ✅ |
| 7 | `2026-09-28-nakyungwon-mine-report-deletion` | R | 국회 기자회견 → 국회 | 비판 대상은 군 보고서 | ✅ |
| 8 | `2026-08-06-owloffreedom-707-commander-sentencing` | L | 서울중앙지법 1심 → 서울법원종합청사 | 법원 비난 아님 | ✅ |
| 9 | `2026-09-24-sewodream-nk-agent-private-detective` | N | 서울중앙지법 1심 → 같은 청사 | 없음 | ✅ |
| 10 | `2026-09-16-idontknowpolitics-2023-warrant-dismissed` | N | 서울중앙지법 영장 기각 → 같은 청사 | 검찰 주장과 기각 사실 전달, 법원 비난 아님 | ✅ |
| 11 | `2026-09-17-idontknowpolitics-sergeant-leak-china` | D | 대법원 확정 → 대법원 | 없음 | ✅ |
| 12 | `2026-09-30-20hoon-prosecution-abolition-victim-guide` | S | 공소청 출범 안내 → 공소청 현판 | 없음 | ✅ |
| 13 | `2026-09-21-kimmoonsoo-prosecution-abolition` | X | 대검 앞 회견 → 대검 일대 | 없음 | ✅ |
| 14 | `2026-10-29-khan-nk-srbm-launch-wonsan` | W | 원산 일대 → 원산 시내(지점 아님 명시) | 없음 | ✅ |

## 5. frontmatter (ko·en 14쌍 diff 직접 확인)
- ko 각 +15줄(image 블록), en 각 +2줄(`imageAlt`·`imageCaption`), 삭제 0. `title`·`description`·`publishedAt`·`updatedAt`·본문 변경 **0**.
- image 블록 키 14개(`kind`·`src`·`alt`·`caption`·`creditName`·`creditNameEn`·`sourcePageUrl`·`sourceSiteName`·`license`·`licenseUrl`·`workTitle`·`workYear`·`retrievedAt`·`faceNote`)가 14건 모두 같은 순서로 있다.
  - `license`: cc-by-4.0 13건 · cc-by-2.0 1건
  - `licenseUrl`: 버전 경로와 일치
  - `faceNote`: "얼굴 없음(자료사진·…)"
- caption은 모두 `자료사진: …(연도) — 이 사건 당시 사진이 아닙니다.` 형식이다. 10년 문구는 위 2절에서 확인했다. en caption은 81~157자로 160자 이내다. alt는 사진에 보이는 것만 적었다.

## 6. validate
- `npm run validate:content` **R=0**, 경고 22건. 대상 14개 id의 경고는 0건이다. `open 33`, 검사한 alt 66.

## 7. 운영 기록·저장소 독립
- 업로더 28 트리거·업로더 오더·`docs/qa/uploader-28-candidates.md`·이 오더를 확인했다.
  - S·W 저작자 표기(frontmatter `creditName` 값)와 W의 Flickr 계정 경로 대조 결과 **0**
  - 후보 파일은 "author 인자도 지움"이라 적혀 있고, 실제로 저작자 이름·Flickr 계정 0이다. 파일 이름 59개 중 "by_" 같은 저작자 표기형 이름도 0
  - 다른 서비스명·계정·홈·임시 절대경로 **0**, 옛 id **0** → 후보 파일은 커밋 경로에 포함해도 된다

## P 목록
- **P2-1 #5 `wendmag` 이미지 불가**(0절)
  - 수정안: 아래 셋을 지워 대체 카드로 되돌리고, 커밋 경로에서도 뺀다.
    - `content/posts/2026-10-05-wendmag-cio-investigation-scope.md`의 image 블록 15줄
    - `content/posts-en/2026-10-05-wendmag-cio-investigation-scope.md`의 `imageAlt`·`imageCaption` 2줄
    - `public/images/2026-10-05-wendmag-cio-investigation-scope/` 폴더
  - 업로더 28 트리거의 결과는 "성공 13"으로, Q2 사용 수는 2로 정정한다(트리거 기록).
  - 기준 보충 제안(기획자): §4.5-5에 "법안이 의원·정당 자신의 이해(수사·처벌 면제 등)를 다룬다는 비판이면 국회 사진 불가"를 리뷰 70 P3-4 문안과 함께 넣는다.
- **P3-1 Q1 촬영 위치 기록 오류**: 업로더 트리거 "국회 사진 분산" 절은 Q1을 "앞마당 높이에서 촬영한 지상 사진"이라고 적었다. 원 페이지 촬영 장소는 "금산빌딩 11층 옥상"이라 건물 높이 사진이다. 판정에는 영향이 없다. 트리거 기록만 고친다.
- **P3-2 기관 사진 쏠림**: open 33건 중 국회 18건, 법조·검찰 8건이다. 다음 묶음은 국회·법조 대상 게시물을 더 채우기보다 다른 대상을 먼저 찾기를 권한다. 기획 20(라이선스 확대) 시행 뒤 청와대·정부청사 등이 후보다. "같은 대상 연속 노출" 기준을 기획자에게 요청한 리뷰 70 P3-2를 유지한다.
- **P3-3 W 보행자 수 기록**: 업로더는 3명이라 적었지만 열람하면 약 4명이다(모두 1% 미만). 판정에는 영향이 없다. 다음부터 "약 n명"으로 적기를 권한다.

## 직접 연 URL
- `https://data.si.re.kr/node/48322` · `/node/48323` · `/node/62223` · `/node/60734` · `/node/47222`, 그리고 각 표시본 `https://data.si.re.kr/sites/default/files/photos/05T01004Dc8000.jpg` · `photos/05T01101Dc2000.jpg` · `photos6/06T00302Dc12000.jpg` · `photos6/06O02307Dc72000.jpg` · `photos/05O00802Dc8000.jpg`
- `https://commons.wikimedia.org/w/index.php?title=File:Signboard_of_Supreme_prosecutors_office_20261002_112214_HDR.jpg&action=raw` · `…title=File:Wonsan_waterfront_(2937890043).jpg&action=raw`
- `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1280&titles=…`(위 2개) → `https://upload.wikimedia.org/…/1280px-…`(축소본 2개, 대조용으로 내려받음)
- W 원 Flickr 사진 페이지(`flickr.com/photos/…/2937890043/` — 계정 경로는 기록하지 않음, 200·CC BY 2.0)

## 최종 커밋 경로 (P2-1 처리 뒤 — `wendmag`·`gotdemcatch`·`attendkdz` 제외, 13건)
게시물 ko·en 13쌍:
- `content/posts/2026-08-12-citynewsmeme-parksangyong-oath-refusal.md` · `content/posts-en/…`(같은 이름)
- `content/posts/2026-08-25-nowandhere-625-constitution-question.md` · `content/posts-en/…`
- `content/posts/2026-09-29-osj17x-hankiho-president-instruction.md` · `content/posts-en/…`
- `content/posts/2026-09-16-hagonolza-country-insult-bill.md` · `content/posts-en/…`
- `content/posts/2026-09-22-emong-nk-contact-law.md` · `content/posts-en/…`
- `content/posts/2026-09-28-nakyungwon-mine-report-deletion.md` · `content/posts-en/…`
- `content/posts/2026-08-06-owloffreedom-707-commander-sentencing.md` · `content/posts-en/…`
- `content/posts/2026-09-24-sewodream-nk-agent-private-detective.md` · `content/posts-en/…`
- `content/posts/2026-09-16-idontknowpolitics-2023-warrant-dismissed.md` · `content/posts-en/…`
- `content/posts/2026-09-17-idontknowpolitics-sergeant-leak-china.md` · `content/posts-en/…`
- `content/posts/2026-09-30-20hoon-prosecution-abolition-victim-guide.md` · `content/posts-en/…`
- `content/posts/2026-09-21-kimmoonsoo-prosecution-abolition.md` · `content/posts-en/…`
- `content/posts/2026-10-29-khan-nk-srbm-launch-wonsan.md` · `content/posts-en/…`

이미지 폴더 13개(같은 id 이름):
- `public/images/2026-08-12-citynewsmeme-parksangyong-oath-refusal/`
- `public/images/2026-08-25-nowandhere-625-constitution-question/`
- `public/images/2026-09-29-osj17x-hankiho-president-instruction/`
- `public/images/2026-09-16-hagonolza-country-insult-bill/`
- `public/images/2026-09-22-emong-nk-contact-law/`
- `public/images/2026-09-28-nakyungwon-mine-report-deletion/`
- `public/images/2026-08-06-owloffreedom-707-commander-sentencing/`
- `public/images/2026-09-24-sewodream-nk-agent-private-detective/`
- `public/images/2026-09-16-idontknowpolitics-2023-warrant-dismissed/`
- `public/images/2026-09-17-idontknowpolitics-sergeant-leak-china/`
- `public/images/2026-09-30-20hoon-prosecution-abolition-victim-guide/`
- `public/images/2026-09-21-kimmoonsoo-prosecution-abolition/`
- `public/images/2026-10-29-khan-nk-srbm-launch-wonsan/`

기록:
- `docs/triggers/uploader-28-a2-archive-photo-batch-3-COMPLETE.md`
- `instructions/uploader/processed/28-a2-archive-photo-batch-3.md`
- `docs/qa/uploader-28-candidates.md`
- `docs/triggers/reviewer-72-uploader-28-review-COMPLETE.md`
- `instructions/reviewer/processed/72-uploader-28-review.md`

뺄 것:
- `wendmag` 2파일·폴더(P2-1을 처리하면 HEAD와 같아진다)
- `gotdemcatch`·`attendkdz`와 그 poster 트리거
- 다른 오더의 미커밋 변경: `planning/*`·`docs/poster/guide.md`·`docs/triggers/uploader-27-…`(수정분)·planner 20/reviewer 71 기록·`instructions/programmer/20-…`
- `docs/supervisor/drafts/…`
- `history/*`
