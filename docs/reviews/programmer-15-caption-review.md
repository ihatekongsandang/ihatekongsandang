# 리뷰: 프로그래머 15 — 상세 사진 설명 표시·caption 필수·README·깨진 핫링크 뒤 설명 숨김·P3-N1 (+ 슈퍼바이저 guide §4-1·operations)

**리뷰어**: 리뷰어 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`) | **오더**: `instructions/reviewer/33-programmer-15-caption-review.md` | **작성**: 2026-11-09 17:51

**대상**
- 코드: `git diff -- src/`(schema.ts·card-media.tsx·post-detail.tsx), `content/README.md`, `docs/tools/reviewer-32/validate-examples.ts`, 기존 도구 갱신(programmer-13·14-1)
- 슈퍼바이저: `git diff -- docs/poster/guide.md`(§1-1 2항·§2·§4·§4-1 신설), `docs/operations/hotlink-check-log.md`·`image-removal-log.md`(신규)

**선행 검토**: `CLAUDE.md`, 오더 `instructions/programmer/processed/15-image-caption-display-validation.md`, 핸드오프·트리거 programmer-15, `docs/tools/programmer-15/README.md`, `planning/v0.9-copy-and-code-list.md` §2.4·§3.2·§3.4, `planning/card-image-policy.md` §0·§2~§9, `planning/card-image-uploader-steps.md` 전체, `planning/image-removal-procedure.md` §5, `planning/prd.md` §6③, `src/lib/content/translation.ts`(localizePost·imageCaption 규칙)

**제약 준수**: 빌드·의존성 설치·git 쓰기·대상 수정 0. 실브라우저는 프로그래머의 마지막 일반 빌드(`.next/BUILD_ID` 17:22:39, src·content·scripts·public에 그보다 새 파일 0)를 `npx next start -p 3933`으로만 띄웠다. 종료 후 3933 리스너 0·next-server 0·헤드리스 Chrome 0 확인.

**도구**: `docs/tools/reviewer-33/` — `c7-browser.mjs`(+`-output.txt`·`-positive-control.txt`), `self-caption-scan.mjs`, `readme-vs-plan.py`, `readme-examples.ts`, `ip-cases.ts`, `a11y-e2e.mjs`(programmer-15 사본, 화면 위치만 인자), 각 `*-output.txt`, `regression-output.txt`, `typecheck-output.txt`, `lint-output.txt`

---

## 1. 판정

### 코드(프로그래머 15): ✅ 승인 — 결함 0, P3 메모 3건
### guide·operations(슈퍼바이저): 🟠 조건부 — P2 3건(G1·G2·O1)을 고친 뒤 커밋

코드 쪽은 오더 범위(C1·C2·C6·C7·P3-N1·도구 타입)를 모두 지켰고, 핵심인 C7을 **빌드 없이 기존 일반 빌드 위에서** 하이드레이션 전·후·클라이언트 이동 세 경로 모두 실브라우저로 재현했다(141/141, 양성 대조 16건 검출). guide §4-1은 정책 요약으로서 방향은 맞지만, **C2 뒤 caption 필수 범위를 좁게 적었고(G1), 공인 얼굴 사진의 착수 조건(프로그래머 16 배포 전 금지)이 빠졌다(G2)**. 제거 기록 틀은 절차 §5의 칸과 다르고 자유 서술 칸이 개인정보 유입 경로가 된다(O1).

---

## 2. 재현 숫자

| 항목 | 결과 | 도구·출력 |
|---|---|---|
| 프로그래머 15 단위 | **117/117** | `regression-output.txt` |
| 회귀 단위: p13 104/104 · 핫링크 10/10 · 14-1 64/64 · 05 53/53 · 06 35/35 | 전부 PASS | 같음 |
| `validate:content` | ✅ 통과(self 207 · public 0 · news 0, 영어본 207/207) | 같음 |
| **C7 실브라우저(기존 일반 빌드)** | **141/141** — 375·1280 × ko/en × {실제 상세 대조, ok, fail-early, fail-late, nav-ok, nav-fail}. 문서 응답 바꿈 12회·RSC 바꿈 확인, 콘솔 오류·예외(하이드레이션 불일치 포함) 0 | `c7-browser-output.txt` |
| C7 양성 대조(figcaption을 MediaFigure 밖 형제로) | 141건 중 **24 FAIL**: 실패 4경로 × 2언어 × 2폭 = **16건 "화면 글자에 설명·크레딧 남음" 검출** + 구조 기대 8건, 콘솔 오류 0 | `c7-browser-positive-control.txt` |
| self caption 누출(절대 기준) | 게시물 207 · caption 있음 207(전부 self) · ko/en 상세 .html·.rsc **828개 파일 = 207×4**에서 caption·imageCaption 등장 **0** · 빌드 전체 `data-image-caption` **0** | `self-caption-scan-output.txt` |
| README(C6) vs §2.4 글자 대조 | 대조 단위 37 중 **33 글자 그대로**, 다른 4건은 전부 정당한 각색(§3 아래) · yaml 블록 2/2 동일 | `readme-vs-plan-output.txt` |
| README 예시 검증(임시 사본, 저장소 밖) | **16/16** — news·public 채운 예시 오류 0, 자리표시(`…`) 그대로면 주소 오류만, news+license·caption 없음·공백·kogl-2 오류, 160자 통과·161자 경고, 영어본 imageCaption/imageAlt 없으면 오류 | `readme-examples-output.txt` |
| P3-N1 경계 | 17사례 — 매핑 표기 변형(전개형·대문자)·CGNAT 경계 100.64/100.127 거부, 100.63/100.128·공인 매핑 통과, 10진·16진 IPv4는 URL 파서가 정규화해 거부 | `ip-cases-output.txt` |
| a11y-e2e(일반 빌드) | **180/184** — FAIL 4건은 GA share 이벤트 4개(GA ID 없는 일반 빌드라 예상대로). 나머지 180개 라벨은 프로그래머 GA 더미 출력과 같다. 리뷰 31·31-1의 일반 빌드 결과(180/4)와 같은 모양 | `a11y-e2e-output.txt` |
| copy-exact | **38/38** | `regression-output.txt` |
| typecheck | exit **0**(리뷰어 도구 포함) | `typecheck-output.txt` |
| 전체 lint | **0 errors**, 16 warnings(기존과 같은 수 — 리뷰어 도구는 경고 0) | `lint-output.txt` |

재현하지 않은 것(빌드 필요 — 이번 리뷰에서 금지): 빌드 실패 11/11, 픽스처 빌드 22/22·21/21·161/161, seo-parity·html-parity, GA 더미 a11y 184/184, `clean-clone-gate.sh --worktree`. 이들은 프로그래머 출력 파일을 읽어 숫자·항목이 트리거와 일치하는 것만 확인했다.

---

## 3. 코드 확인

### C1 — public·news만 표시, self는 구조상 차단: ✅
- `post-detail.tsx`: `ImageCreditCaption`은 `media.credit`이 있을 때만 그린다. `credit`은 `resolveCardMedia`가 public·news에만 붙이므로 self caption은 figcaption에 들어갈 경로가 없다. caption은 `post.image?.caption`을 상세가 직접 읽고 `CardMedia`/카드 데이터에는 싣지 않는다 → 피드 HTML·RSC 무변화(README 예시 검증에서도 `caption이 카드 데이터에 있음=false`).
- 영어: `localizePost`가 `withoutCaption` 후 영어본 `imageCaption`이 있을 때만 caption을 넣는다 → 한국어 설명이 영어 페이지에 남지 않는다.
- 렌더는 텍스트 노드(`{caption}`)라 마크업 주입 없음.
- 실측: 실제 빌드 828개 파일 등장 0(위 표). 실브라우저 대조(실제 상세)도 figcaption 없음.

### C2 — 필수·160자 경고·영어본: ✅
- `asTrimmedString` 결과가 없으면 오류(누락·`""`·공백·비문자열). 160 통과·161 경고(재현). 영어본은 기존 규칙(원본 caption 있으면 `imageCaption` 필수)으로 자동 필수 — 재현 확인. 영어 길이 경고 생략(핸드오프 결정 4)은 정책에 영어 수치가 없으므로 타당하다.

### C7 — 실패 전파: ✅
- `CardMedia`가 마운트 시 `complete && naturalWidth === 0`(하이드레이션 전 실패)과 `onError`(뒤 실패) 두 경로에서 `onRemoteFail`을 부르고, `MediaFigure`가 children을 뺀다. 서버 HTML에는 설명 줄이 있으므로(스크립트 없는 환경) 하이드레이션 불일치가 없다 — 실측 콘솔 오류 0.
- **이번 재현 방법**: 실제 content에는 public·news가 0건이라, 실제 상세 1쪽의 문서 응답(SSR 마크업 + 인라인 RSC)과 클라이언트 이동 RSC 응답에서 `MediaFigure` props만 news 핫링크 + figcaption으로 바꿔 줬다(CDP Fetch). 클라이언트 번들·서버는 프로그래머 빌드 그대로다. figcaption 문구는 도구가 만든 고정 문구라 C1 문구 자체는 단위 검사가 본다.
- `eslint-disable-next-line react-hooks/exhaustive-deps`(의존성 `[media]` 유지)는 사유 주석이 있고, `setRemoteFailed`가 렌더마다 새로 만들어져도 동작 차이가 없다(마운트 확인은 media가 바뀔 때만 필요). 수용.

### P3-N1: ✅
- 매핑 IPv6는 URL 파서 정규화(`[::ffff:7f00:1]`) 뒤 16진 두 묶음을 IPv4로 풀어 같은 규칙 적용. CGNAT 100.64/10 경계 정확.

### C6 README: ✅
§2.4와 다른 4건: ① §2.4 머리 메모("반영은 프로그래머…") — 문안 아님 ② §8 행의 "(C2 반영 후)" 삭제 — 반영됐으므로 맞다 ③ "…한 줄을 덧붙인다" 지시문을 실제 한 줄로 바꿈 ④ §9 문장을 목록 항목으로 넣음(문장 글자 그대로). README §8 위쪽 "폐지된 필드" 행(366행)이 실제로 있어 덧붙인 줄의 참조가 맞다.

### P3 메모(코드 — 고치지 않아도 커밋 가능)
- **P3-1** `post-detail.tsx` 주석 "내부 판정 메모가 섞인 206건" — 실측 207(핸드오프 미해결 1과 같은 수치 차이). 주석만의 문제.
- **P3-2** caption 누락 오류 문장이 public에도 "원 기사 사진 설명 기준으로…"라고 안내한다. public의 출처는 기관 페이지다. 정책 §3.6 표현을 따른 것이라 결함은 아니고, 프로그래머 16 등에서 kind별 문구로 다듬을 수 있다.
- **P3-3** IPv4 호환(`[::7f00:1]`, 폐기된 표기)·IPv4 변환(`[::ffff:0:7f00:1]`) 주소는 통과한다(`ip-cases-output.txt`). 오더 범위(매핑·CGNAT) 밖이고, 브라우저가 이미지를 받는 구조라 서버 측 요청 위험은 없다. 기록만.

---

## 4. 슈퍼바이저 guide 변경 게이트

§1-1 2항(보도 기사 A·B만, 게시 불가 SNS 이미지 금지)·§2(사적 개인·미성년자 얼굴 불가)·§4(`image{…}`는 §4-1, 자체 텍스트 카드 신규 제작 중단)는 정책 §9의 충돌 문장 정리 지시와 맞다. §4-1의 A 순서(제1유형만, korea.kr 제외)·B 핫링크·재호스팅·포털·우회 금지·불가 사진 목록·작업 단위·주 1회 점검·제거 절차 참조도 정책 §4·§5·§7과 맞다.

| # | 등급 | 위치 | 지적 |
|---|---|---|---|
| **G1** | **P2 (틀린 요약)** | §4-1 "의혹·수사·재판 사안 사진은 `image.caption`에 설명 필수" | 프로그래머 15 배포 뒤에는 **public·news 이미지 전부 `caption` 필수**(없거나 공백이면 빌드 중단)이고 영어본 `imageCaption`도 필수다. 지금 문장은 의혹 사안에만 필수인 것처럼 읽힌다. 고칠 안: "public·news 이미지는 모두 `image.caption` 필수(빌드가 막는다, 160자 이내 권고). 형식은 정책 §3.6 표 — 의혹·수사·재판 사안 인물 사진은 표 1·2행 문구를 반드시 쓴다. 영어본 `imageCaption`도 필수." |
| **G2** | **P2 (빠진 필수 규칙)** | §4-1 전체 | **착수 조건**이 없다. 업로더 지침 §0: 공인 얼굴 사진은 프로그래머 15(C1·C7)와 **프로그래머 16(C4 — 소개 문구 "얼굴이 식별되는 원문 썸네일은 사용하지 않고")** 배포 뒤에만, 그 전에는 얼굴 없는 사진만. 지금 guide대로면 이번 커밋 직후 공인 얼굴 사진을 올려 소개 문구를 거짓으로 만들 수 있다. 한 줄 추가 안: "🔴 공인 얼굴 사진은 프로그래머 16 배포 뒤부터. 그 전에는 얼굴 없는 사진만(업로더 지침 §0)." |
| G3 | P3 | §4-1 | "캡션(사진 설명) 없는 인물 사진 금지 · 촬영 시점·장소를 밝히지 않은 사진 불가(4a)"가 없다(정책 §5.1-1·§3.6). 불가 목록의 "다른 사건 자료사진"만으로는 캡션 확인 의무가 드러나지 않는다 |
| G4 | P3 | §4-1 | 영어본 옛 `imageAlt`·`imageCaption`("Summary image made by this site…")이 새 사진 아래 남아도 검증이 잡지 못한다(리뷰 32 재현, 업로더 지침 단계 3). 묶음 게이트 체크 ①이라 guide에 한 줄 두는 것을 권한다. `updatedAt` 규칙·옛 `thumb.jpg` 삭제·본문 "자체 제작 카드" 문장 정정도 같은 줄로 지침을 가리키면 된다 |
| G5 | P3 | §4-1 "얼굴" | "정치인"은 정책 앵커(선출직·정당 간부)보다 넓게 읽힌다(정책은 당원·후보 아닌 정치 활동가를 비공인으로 둔다). 정당 간부·공공기관장 누락, "외국 전직 공직자 피의자 제외", "외국 현직 공직자·외국 정상 배우자는 비공인", "직위는 사진 설명·명패·본문으로 확인, 추정 금지"가 빠졌다. "공인 범위는 정책 §3.1 표"로 가리키는 것만 더해도 된다 |
| G6 | P3 | §4 첫 줄 "이미지 `public/images/{id}/thumb.jpg`" | 이제 저장은 A(public)·self만이고 B는 저장 금지다. "A만 저장, B는 핫링크(저장 금지)"로 한정하는 것을 권한다 |
| G7 | P3 | §4 "2026-11-09 사용자 결정 — '별로'" | 규칙 자체는 정책 §6("텍스트 카드를 새로 만들지 않는다")과 맞다. 다만 인용한 사용자 발언은 `history/2026-11-09.md`에서 찾지 못했다 — 확인 필요(출처 기록을 남기거나 "정책 §6"으로 근거를 바꾼다) |
| G8 | P3 | §4-1 "예시는 `content/README.md` §3" | §3.6이 정확하다 |

---

## 5. operations 기록 틀

| # | 등급 | 파일 | 지적 |
|---|---|---|---|
| **O1** | **P2** | `image-removal-log.md` | 칸이 절차 §5와 다르다. 절차: 접수일·접수 경로·대상 id·**이미지 종류**(news/public/self)·**요청 유형**(초상·명예/언론사 사용 중단/저작권/기타)·조치(**제거·유지·교체**)·조치일·**재검토 결과**·**처리자**. 틀: 접수일·접수 경로·대상 id·**요청 요지**(자유 서술)·조치(삭제·교체·**비공개**)·조치일·배포 커밋. 특히 **"요청 요지" 자유 서술 칸은 요청 내용(공개 이슈 본문 등)이 옮겨질 통로**라 절차 §2·§5("기록에는 접수일·id·유형·조치만", "이슈 내용을 기록 파일로 옮기지 않는다")와 충돌한다. 절차 §5 칸으로 맞추고 요청 유형은 분류값만 쓰게 한다(배포 커밋 칸은 추가해도 무방) |
| O2 | P3 | `hotlink-check-log.md` | 머리에 **실제 일정(요일·반복 방식)**이 없다 — 업로더 지침 §0 착수 조건 c("일정 설정, 머리에 적는다")가 아직 미충족이다. "점검자"는 실명이 아닌 역할명(업로더)으로 적는다는 안내를 머리에 두면 개인정보 칸이 생기지 않는다 |

개인정보를 직접 적게 하는 칸(이름·연락처·계정)은 두 파일 모두 없다. 제거 기록 머리의 개인정보 금지 문장은 좋다.

---

## 6. 저장소 독립
리뷰어 산출물(이 리뷰·트리거·`docs/tools/reviewer-33/` 전부·history append)에 pre-commit 훅 패턴 grep **0건**, 홈 절대경로 0건(lint 출력은 `$HOME`으로 치환). 프로그래머 15 산출물의 grep 결과는 `docs/tools/programmer-15/word-grep-output.txt`(전부 0)를 확인했다.

---

## 7. 커밋 대상 경로(최종)
- 프로그래머 15 트리거의 목록 전부(src 3·README·reviewer-32 도구·programmer-13·14-1 도구·`docs/tools/programmer-15/`·핸드오프·트리거·processed 오더)
- `docs/poster/guide.md`(G1·G2 반영 후) · `docs/operations/hotlink-check-log.md` · `docs/operations/image-removal-log.md`(O1 반영 후)
- `docs/reviews/programmer-15-caption-review.md` · `docs/tools/reviewer-33/` · `docs/triggers/reviewer-33-programmer-15-caption-review-COMPLETE.md` · `instructions/reviewer/processed/33-programmer-15-caption-review.md`
- `history/2026-11-09.md`
- ⚠️ 이 묶음과 무관한 작업 트리 변경(`history/2026-10-01.md`·`2026-11-05.md` 수정, tester-01·planner-07·designer 화면 등 미추적)은 이 목록에 넣지 않았다 — 슈퍼바이저 판단.

## 8. 다음
- 슈퍼바이저: G1·G2·O1(문서만) 수정 → 커밋·배포. 배포는 업로더가 public·news 사진을 넣기 **전에**. 공인 얼굴 사진은 프로그래머 16 배포 뒤.
- 프로그래머 16: P3-1·P3-2는 여유가 있으면 함께(필수 아님).
- 디자이너: 사진 설명 줄 위치·간격 확인(핸드오프 미해결 4).
