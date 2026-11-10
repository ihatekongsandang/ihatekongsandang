# reviewer-63 — 자체 제작 카드 묶음 4(업로더 24) 검토 — COMPLETE

- 담당: 반공-리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 실행: 하위 에이전트
- 오더: `instructions/reviewer/processed/63-poster-image-67-4-review.md`(이동)
- 읽은 것: 업로더 24 오더·트리거 전체, 콘텐츠 diff(ko·en 20파일), #11 게시물 전문, 정책 §3.4 항상 제외·§3.6 얼굴 없음 행·§5.1 4a, 지침 단계 1(정책 결정 필요 5건 해소표 — #48)·단계 2~4, `docs/tools/reviewer-30/post-recheck.tsv`
- 금지 사항 준수: 빌드·git 쓰기·`src/` 수정 0, 콘텐츠 수정 0
- 받은 기사 HTML 10건·사진 10장은 저장소 밖 임시 폴더에만 두었다.

## 판정: 🟡 조건부 통과 — P2-1(#11) 처리 뒤 커밋 (P1 0 · P2 1 · P3 2)

③ 9건은 그대로 커밋해도 된다.

---

## 1. ② #11 `2026-09-26-ccpoutkorea-ocsc-overseas-police` — ❌ ③ 권고 (P2-1)

| 항목 | 직접 확인한 결과 |
|---|---|
| 원본 | 세계일보 2023-01-03 og:image = `image.src`, **680×408**, 200. 기사 HTML의 사용 제한 표기 0 |
| 사진 설명 | "지난 2022년 12월 31일 중국이 해외에서 운영하는 비밀경찰서의 국내 거점으로 지목된 서울의 한 중식당 2층 사무실 모습. 연합뉴스" |
| 4a | 2022-12-31 촬영. 게시물 사안(2022년 12월 의혹 보도·12/29 기자회견·2023년 1월 정부 조사)과 같은 시기다 ✅ |
| 원경 | 사람은 유리문 안 1명뿐이고, 옆모습에 몇 px 크기라 허용 범위다 ✅. 워터마크·덧씌운 글자 없음, 짧은 변 408 ✅ |
| **결합 위험** | ❌ 사진의 주 피사체는 사무실 입구의 **현판 6개**다. 금색 한자로 **민간 단체 이름**이 원본 해상도에서 그대로 읽힌다(재한 중국 교민 단체·평화통일 촉진 단체·국제문화교류 단체·예술단, OCSC에 해당하는 "華助中心" 등). ① 게시물 본문은 일부러 "서울의 한 중식당", "식당 운영자 등은 이름을 적지 않습니다"라고 적어 사업장·관계자를 익명으로 두었다. 그런데 사진이 그 자리의 단체들을 이름으로 드러낸다. ② 게시물 스스로 "비밀경찰서였다는 사실은 공개된 수사 결과나 판결로 확인되지 않았습니다"라고 적는다. 의혹이 확정되지 않았고 결론 보도도 확인하지 못한 상태다. 그런 비공인 단체들이 "비밀경찰서 의혹" 제목 아래 이름과 함께 카드 대표 이미지로 실리면 낙인 효과가 생긴다. ③ 정책에 "비공인 단체의 상호·현판"을 직접 다룬 줄은 없다. 그러나 묶음 3 선례(명패 비공인 실명 → 불가)와 PRD §6③ 비공인 의혹 당사자 보호, "애매하면 쓰지 않는다"는 원칙에 비춰 같은 쪽으로 판단한다 |
| 수사·처분 결과 | 게시물 본문은 "운영자는 이후 별개 혐의(업무상 횡령 등)로 수사를 받은 것으로 보도됐으나, 비밀경찰서 의혹 자체에 대한 결론은 … 확인하지 못했습니다"라고 적는다. 의혹 자체의 결과 보도가 없다. 따라서 결과 문장을 넣을 근거도 없다. 사진은 당사자 쪽이 결론 없이 드러나는 구조가 된다 |
| C1 문구 | 사람 없는 장소 사진이라 "얼굴 없음" 행을 쓴 판단 자체는 맞다. 다만 그 행은 의혹 사안의 낙인 위험을 덜어 주는 문장이 없다. 정책 문구는 `{촬영 시점·장소}의 {대상}(원 기사 사진 설명 기준).`인데, 쉼표를 넣은 지금 문구는 이와도 조금 다르다(③으로 돌리면 해당 없음) |
| 필드 | `license` 0, 사진 기자 이름 0, `sourcePageUrl` = `sources[]`, en `imageAlt`·`imageCaption` 형식 ✅(③으로 돌리면 삭제) |

## 2. ③ 9건 — 9/9 사유 직접 확인, 처리 선례대로

| tsv · id | 직접 확인한 불가 사유 |
|---|---|
| #9 `…nk-agent-private-detective` | 한국경제 사진 설명 "사진은 기사 내용과 관련 없음. /사진=게티이미지뱅크" → 스톡(4항) |
| #22 `…core-tech-leak-china-92` | 매일경제 사진 설명 "기사 이해를 돕기 위한 AI 이미지. [챗GPT]" → 생성 이미지(4항) |
| #24 `…cio-investigation-scope` | 동아일보 og:image(PNG 1109×888)는 "여권 구상 고위공직자범죄수사처 개편 방향" 표다(눈으로 확인) → 글자 중심 그래픽(4항) |
| #28 `…fake-police-protest-sentence` | SBS og:image에 "SBS NEWS" 로고·"자막뉴스" 표지와 단정형 자막 "'올공' 시위 20대 줄줄이 '징역형'"이 박혀 있다(눈으로 확인) → 11항 |
| #34 `…ukraine-korea-oil-claim` | 서울신문 사진 설명 "인공지능 도구로 생성한 자료사진" → 4항 |
| #35 `…nis-chief-nga-visit-report` | 오마이뉴스 사진 설명 "… 지난 9월 30일 국회 정보위 전체회의를 마치고 퇴장" → 게시물 사안(10/7~8 보도)과 다른 일정(4a) |
| #38 `…china-korean-heritage-24` | 이데일리 og:image(1280×1169)는 "중국 국가급 비물질 문화유산 등재현황" 표다(눈으로 확인) → 4항 |
| #57 `…kimyonghyun-drone-appeal` | 연합뉴스 사진 설명 "… [연합뉴스 자료사진]" → 4a. 본문 안 1심 사진은 "재판매 및 DB 금지" 표기가 있고(7항) og:image도 아니다 |
| #61 `…china-53-vessels-taiwan-warning` | 뉴스1 사진 설명 "… 비서장 엑스(X) 갈무리" → SNS 캡처(4항) |

- 9건 모두 ko `image:` 블록 0, en `imageAlt`·`imageCaption` 0, 옛 파일 삭제. 처리 방식은 묶음 1~3과 같다.
- 묶음 3 선례 4개를 지켰다.
  - 명패 실명: ③ 9건에는 해당 없다. ②#11의 현판 문제가 이 선례의 확장이다(P2-1).
  - `sources[]` 한정: 10건 모두 출처 기사만 썼다.
  - 의혹 조직 비공인 정면: 해당 없다.
  - 4.5~5% 재측정: 해당 구간 없음.

## 3. 남은 B 계열 목록 — 🟡 대체로 맞음, #48은 이미지 없음 대상 (P3-1)
- 남은 자체 카드 29개를 `post-recheck.tsv`와 하나씩 맞췄다. #14는 id 이전 전의 옛 id로 대조했다.
  - `B` 5건: #32·#33·#36·#37·#56
  - `B 조건부` 1건: #42
  - `정책 결정 필요` 1건: #48
  - `없음` 20건·`없음(권고)` 1건(#67)
  - **tsv에 없는 1건**: `2026-09-30-2pro-unc-armistice-violation`. 9/30 게시 때 만든 텍스트 카드로, 리뷰 30의 67건 목록보다 뒤에 생겼다.
  - 합계: 5 + 1 + 1 + 21 + 1 = 29.
- **#48**: 지침 단계 1의 "정책 결정 필요 5건 v0.9 해소" 표가 "#48 독일 정보기관장 체포 — 1a에서 제외(피의자) → **이미지 없음**"으로 이미 정했다. 따라서 남은 B 시도 대상은 **6건**(#32·#33·#36·#37·#42·#56)이고, #48은 `없음` 일괄 전환에 넣어야 한다.
- "없음 22건"도 실제로는 tsv `없음` 계열 21건 + tsv 밖 1건(2pro-unc)이다. 다음 `없음` 일괄 전환 오더에는 #48과 2pro-unc를 함께 넣어 **23건**으로 잡는 것이 맞다.

## 4. 옛 파일·본문·updatedAt·validate — ✅
- 삭제 10개는 `git status` ` D` 10줄과 같다.
- 남은 자체 카드 **29**: 폴더 29 = `src: /images/` 참조 게시물 29. 참조 없는 폴더 0, 깨진 참조 0. validate "self 29 · news 34"와도 같다.
- 10건 ko·en에 "자체 제작"·"텍스트 카드"·"made by this site" 0.
- `updatedAt` 변경 0, `license` 0.
- `npm run validate:content` R=0, 418/418. 경고 목록은 리뷰어 61 때와 같다.
- 핫링크 1/1 200(③으로 돌리면 0건).

## 5. 산출물 — ✅
- 업로더 24 트리거·오더, `history/2026-11-11.md`: 비공인 실명 0(1~3차 패턴), 사진 기자 이름 0, 옛 id 0, 홈 경로 0, 저장소 독립 패턴 0.
- 이 트리거도 같은 패턴으로 검사했다 → 0건. 현판 단체 이름은 여기 한자로 옮기지 않고 종류만 적었다. OCSC에 해당하는 이름 하나는 게시물 제목에 이미 있다.

---

## 결함·권고

### P1 — 0

### P2 — 1건
- **P2-1 #11을 ③으로 돌린다.**
  - 이유: 확정되지 않은 "비밀경찰서 의혹"의 거점으로 지목된 사업장 사진이다. 그런데 사진 속 현판에 비공인 민간 단체 이름 여러 개가 읽힌다. 게시물이 익명으로 둔 대상을 사진이 드러내고, 결론 보도도 없어 낙인 위험이 있다.
  - 처리(#25와 같은 방식):
    - ko `content/posts/2026-09-26-ccpoutkorea-ocsc-overseas-police.md`의 `image:` 블록(10~19행)을 삭제한다.
    - en `content/posts-en/…:5·6`의 `imageAlt`·`imageCaption`을 삭제한다.
    - 본문 "원문 이미지는 쓰지 않았습니다"는 그대로 사실이라 둔다.
    - 옛 파일은 이미 지웠다.
  - 처리 뒤 결과는 묶음 4 기준 ② 0 · ③ 10이 되고, validate는 news 33이 된다.

### P3 — 2건
- **P3-1** 업로더 트리거 1절·4절의 "남은 B 계열 7건"에서 #48은 지침 단계 1에서 이미 "이미지 없음"으로 정해졌다. B 계열은 6건(#32·#33·#36·#37·#42·#56)으로 고치고, #48과 tsv 밖 1건(2pro-unc)을 `없음` 일괄 전환 대상(23건)에 넣는다.
- **P3-2** 정책 정리 권고(결함 아님): 묶음 3(명패 비공인 실명)과 이번(현판 비공인 단체명)이 같은 유형이다. 다음 기획 정리 때 정책 §5.3 제외 항목에 "명패·이름표·현판·간판으로 비공인의 실명이나 의혹 대상 사업장·단체의 이름이 읽히는 사진(특히 의혹 사안)"을 한 줄 넣기를 권한다.

## 다음 묶음 크기 의견
- 남은 B 시도 대상은 6건이고, 그중 #32·#56은 출처를 다 시도했고 #33은 출처가 1건뿐이다. 실제로 새로 시도할 것은 #36·#37·#42 3건이다.
- **B 마지막 묶음(6건)과 `없음` 일괄 전환(23건)을 한 오더로** 묶어도 확인할 양이 적다. 다만 일괄 전환은 사진 판정이 없는 기계적 처리라, 리뷰는 건수 대조·삭제·en 문구 위주로 빠르게 할 수 있다.

## 커밋할 경로 (P2-1 처리 뒤)
- 업로더 24(+P2-1 처리)
  - `content/posts/` ko 10개(`.md`)
    - `2026-09-24-sewodream-nk-agent-private-detective`
    - `2026-09-26-ccpoutkorea-ocsc-overseas-police`(P2-1 처리분)
    - `2026-10-05-shindawit-core-tech-leak-china-92`
    - `2026-10-05-wendmag-cio-investigation-scope`
    - `2026-10-07-swingmag-fake-police-protest-sentence`
    - `2026-10-08-peoplepower7-ukraine-korea-oil-claim`
    - `2026-10-08-shindawit-nis-chief-nga-visit-report`
    - `2026-10-10-insighteye-china-korean-heritage-24`
    - `2026-10-23-eodguri-kimyonghyun-drone-appeal`
    - `2026-10-29-news1-china-53-vessels-taiwan-warning`
  - `content/posts-en/` 같은 이름 10개
  - 삭제 10: `public/images/{위 10개 id}/thumb.jpg`(`git add -A public/images`)
  - `docs/triggers/poster-image-67-4-COMPLETE.md`, `instructions/uploader/processed/24-self-card-67-batch-4.md`
- 리뷰어 63: 이 트리거, `instructions/reviewer/processed/63-poster-image-67-4-review.md`
- 슈퍼바이저 영역(판정 대상 아님): `history/2026-11-11.md` 외 ` M` history 4개
- 넣지 않을 것: `instructions/tester/processed/01-…`, 테스터 01 산출물, 미추적 history·`docs/tools/planner-07/`·screens 폴더

## 수치
- ② 1건 확인 → P2-1. ③ 9/9 사유 확인. 기사 HTML 10건·사진 10장 직접 열람(모두 HTTP 200).
- 자체 카드 29 = 폴더 29 = 참조 29 = tsv 28 + tsv 밖 1.
- validate 418/418.

---

## 63-1 재확인 (업로더 24-1 후속, 2026-11-11)

**판정: ✅ 통과 — 커밋 가능 (P1 0 · P2 0 · P3 0).** P2-1과 P3-1이 해소됐다. P3-2(정책 한 줄 보완)는 기획 정리 때 반영할 권고로 남긴다.

### #11 → ③ — ✅ #25와 같은 방식
- ko `content/posts/2026-09-26-ccpoutkorea-ocsc-overseas-police.md`: `image:` 블록 0.
- en `content/posts-en/…`: `imageAlt`·`imageCaption` 0.
- HEAD와 비교한 변경은 ko 옛 자체 카드 블록 4줄 삭제·본문 1줄 수정, en 2줄 삭제·본문 1줄 수정이다. 리뷰어 62-1에서 확인한 #25의 변경 모양(ko 4줄·en 2줄 삭제 + 본문 1줄씩)과 같다.
- 본문 "원문 이미지는 쓰지 않았습니다 / we did not use the original image"는 그대로 사실이다. `updatedAt`·`translatedAt`·`license` 변경 0. 옛 파일은 24에서 이미 지웠다.

### validate·재집계 — ✅
- `npm run validate:content` R=0, 418/418 통과. "self 29 · news 33"(#11이 news에서 빠짐). 경고 목록은 리뷰어 61 때와 같다(새 경고 0).
- 남은 자체 카드 **29**: `public/images/` 폴더 29 = `src: /images/` 참조 게시물 29. 참조 없는 폴더 0, 깨진 참조 0.

### 남은 B 계열 정정 — ✅
- 업로더 트리거 24-1절이 "남은 B 계열 6건(#32·#33·#36·#37·#42·#56)"으로 정정했다. "#48은 지침 단계 1에서 이미 이미지 없음"이라는 근거도 적었다. 리뷰어 63 3절의 tsv 대조 결과와 같다.
- 참고: 남은 29건은 B 6건 + `없음` 계열 23건이다(tsv `없음` 20·`없음(권고)` 1·`정책 결정 필요` #48·tsv 밖 1건 `2026-09-30-2pro-unc-armistice-violation`).
- 24-1절에는 이 23건 구성까지는 적혀 있지 않다. 다음 일괄 전환 오더에 이 구성을 넣으면 된다(결함 아님).

### 최종 결과
- 묶음 4: **② 0건 · ③ 10건**.

### 최종 커밋 경로
- 업로더 24·24-1
  - `content/posts/` ko 10개(`.md`)
    - `2026-09-24-sewodream-nk-agent-private-detective`
    - `2026-09-26-ccpoutkorea-ocsc-overseas-police`
    - `2026-10-05-shindawit-core-tech-leak-china-92`
    - `2026-10-05-wendmag-cio-investigation-scope`
    - `2026-10-07-swingmag-fake-police-protest-sentence`
    - `2026-10-08-peoplepower7-ukraine-korea-oil-claim`
    - `2026-10-08-shindawit-nis-chief-nga-visit-report`
    - `2026-10-10-insighteye-china-korean-heritage-24`
    - `2026-10-23-eodguri-kimyonghyun-drone-appeal`
    - `2026-10-29-news1-china-53-vessels-taiwan-warning`
  - `content/posts-en/` 같은 이름 10개
  - 삭제 10: `public/images/{위 10개 id}/thumb.jpg`(`git add -A public/images`)
  - `docs/triggers/poster-image-67-4-COMPLETE.md`(24-1절 포함), `instructions/uploader/processed/24-self-card-67-batch-4.md`
- 리뷰어 63·63-1: 이 트리거, `instructions/reviewer/processed/63-poster-image-67-4-review.md`
- 슈퍼바이저 영역(판정 대상 아님): `history/2026-11-11.md` 외 ` M` history 4개
- 넣지 않을 것
  - `instructions/uploader/25-self-card-67-batch-5-final.md`(다음 오더 — 아직 실행 전)
  - `instructions/tester/processed/01-…`, 테스터 01 산출물
  - 미추적 history·`docs/tools/planner-07/`·screens 폴더
