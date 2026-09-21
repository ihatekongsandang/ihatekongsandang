# md오더: 프로그래머 (Opus 5) - 03-statement-kind

**작성일**: 2026-09-21 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 03
**세션**: 02를 처리한 세션에서 이어서 해도 된다.
**🔴 긴급도**: 사용자가 첫 게시물 2건(발언·논평 유형)을 올리려는데 현 스키마가 막고 있다. 이 오더가 끝나야 게시된다.

---

## 자격·역할 (Required)
프로그래머 (Opus 5). PRD v0.5의 게시물 2원화(`kind: case | statement`)를 코드에 반영하고, 소재 확장 문구·검증 메타태그 env를 추가한다. 🔴 커밋 금지(리뷰어 07 판정 후 슈퍼바이저). 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- 🔴 `planning/prd.md` **v0.5** — §0.5·§1(소재 확장·용어)·§3.1(`kind`·`closureReason`·`closureNote`·`priorVerdict`)·§3.3(빌드 검증 kind 분기)·**§3.4(발언·논평 게시물 스키마)**·§4.4(배지 체계)·§5.4(SNS 인용)·§6 적용 범위
- `docs/handoffs/planner-05-prd-v0.5.md` "프로그래머 03 스키마 변경 목록" 표
- `docs/reviews/programmer-01-v0.1-prototype-review.md` §6 R4·R6(이월분), §7 제약
- ⚠️ 리뷰어 06이 PRD v0.5를 병행 판정 중이다(`docs/triggers/reviewer-06-*` 생기면 보고서 §를 읽고 `closureReason` enum·`kind` 정의에 변경이 있으면 반영). 없으면 v0.5 그대로.
- 게시 예정 초안 2건(내용 수정 금지, 스키마 검증용): `docs/supervisor/drafts/2026-09-21-kimeunhye-reel.md` · `docs/supervisor/drafts/2026-09-21-hanmibro-threads-academy.md`
- `content/README.md`, `src/lib/content/schema.ts`, `scripts/validate-content.ts`, `src/lib/config.ts`, `src/app/about/page.tsx`, `src/app/llms.txt/route.ts`

## 임무

### 1. `kind` 2원화 (스키마·검증·렌더)
- `kind: case | statement` 필수. **기존 3건 샘플은 `kind: case`로 하위 호환**(누락 시 기본 `case` 허용 여부는 명시 결정·근거).
- `case`: 현행 필수 필드 유지 + `closureReason`(PRD v0.5 §3.1 10값 enum, `종결`일 때 필수) + `closureNote`(`기타`일 때 필수) + `priorVerdict`(`기소` 선택 병기, 자유 텍스트). 대응 상태가 아닐 때 이 필드가 있으면 오류(h3).
- `statement`: `status` **불요**(있으면 오류). 필수 `statementType`(PRD §3.4 enum — 발언/논평/정책 등 PRD 값 그대로) · `speaker{name, affiliation, publicFigure}` · `sourceUrl` · `sources[]`는 PRD §3.4 조건부 규칙 그대로(원문 링크가 있으면 0건 허용) · 공통 필수(`id`·`title`·`description`·`publishedAt`·`sourceType`·`tags` 선택).
- 카드 배지: `case` → 상태 배지(현행), `statement` → 유형 배지(`statementType`), **시각 구분**(색·아이콘 — 디자이너 전이라 최소한만).
- 상세: `statement`는 발언자(이름·소속) · 원문 링크(외부 CTA) · 보도 출처 목록(있으면 "배경 보도"로 라벨 — 기획자 05 권고: 발언 자체 보도가 아닐 수 있음) · "원문 캡션(출처 인용)" 라벨 표시.
- 빌드 검증 kind 분기 + 게이트 오류 케이스(statement에 status / case에 statementType / 종결인데 closureReason 없음 / 기타인데 closureNote 없음) 실측.
- `content/README.md` §에 `kind` 필드·statement 완성 예시·enum 표 갱신. `og-draft.mjs`에 `kind` 프롬프트(기본 `statement`? 판단·근거).

### 2. 소재 확장 문구 (`SITE`·about·llms.txt·JSON-LD·OG alt)
PRD v0.5 §1 서비스 정의 문구 기준으로 "간첩 행위·간첩 의혹" 한정 문구 전부 교체 — 정치·시사 이슈 큐레이션 전반, 형사 사건은 상태 라벨·발언은 유형 배지. about 페이지에 두 종류 설명 + §6 요약 갱신. 문구는 PRD 문장에서 가져오되 단정·선동 표현 없이 정보 전달형.

### 3. 검색엔진 검증 메타태그 env
`NEXT_PUBLIC_GSC_VERIFICATION`·`NEXT_PUBLIC_NAVER_VERIFICATION` → `<head>` `<meta name="google-site-verification">`·`<meta name="naver-site-verification">` (값 없으면 미출력). `.env.example` 갱신. ⚠️ `public/google*.html`·`public/naver*.html` 은 **삭제하지 않는다**(현재 소유확인 수단).

### 4. 검증
validate/typecheck/lint/build · 로컬 프로덕션에서 초안 2건을 `content/posts/`에 임시 투입해 **빌드 통과 + 카드·상세 렌더 캡처**(모바일 390/데스크톱 1280) 후 제거(게시는 슈퍼바이저) · 게이트 오류 케이스 실측 · 독립 grep 0 · 기존 샘플 3건 회귀.

## 산출물
`src/**` 변경분 · `scripts/validate-content.ts` · `content/README.md` · `.env.example` · `docs/qa/programmer-03/`

## 핸드오프
`docs/handoffs/programmer-03-statement-kind.md`(PRD §3.1·§3.3·§3.4 요구 → 구현 위치 표, 초안 2건 검증 결과, 자체 결정) · `docs/triggers/programmer-03-statement-kind-COMPLETE.md`(🔴 필수) · processed/ · history. **커밋 금지.**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 03-statement-kind
- 구현 표 · 초안 2건 빌드/렌더 결과 · 게이트 케이스 N/N · 빌드 결과 · grep 0 · 자체 결정 · 미해결
```
