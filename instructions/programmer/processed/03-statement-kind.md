# md오더: 프로그래머 (Opus 5) - 03-statement-kind → **개정: 03-remove-status-label**

**작성일**: 2026-09-21 (17:00 전면 개정 — 사용자 지시 "사건 상태 라벨 없애") | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 03
**세션**: 02를 처리한 세션에서 이어서 해도 된다.
**🔴 긴급도**: 사용자가 첫 게시물 2건을 올리려는데 현 스키마(status 필수)가 막고 있다. 이 오더가 끝나야 게시된다.
**⚠️ 이 파일의 이전 버전(kind 2원화·closureReason 등)은 폐기됐다. 아래만 따른다.**

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 게시물 스키마에서 **사건 상태 라벨과 그 파생 필드를 전부 제거**하고 단일 게시물 스키마로 단순화한다. 소재 확장 문구·검증 메타태그 env도 반영. 🔴 커밋 금지(리뷰어 07 판정 후 슈퍼바이저). 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- `CLAUDE.md` 🔴 개정본 — 확정 결정 표 "상태 라벨 폐지·단일 스키마" · 핵심 축 6(출처 기반·단정 금지)
- `planning/prd.md` v0.5 — §1(소재 확장 문구)·§3(스키마 요구사항 중 **라벨 무관 부분만**: id·title·description·publishedAt·sourceType·대표 이미지·alt·`sources[]`·`useSourceImage`)·§4.4·§5(rel·OG·SNS 인용)·§6②④(출처·단정 금지). ⚠️ §3.1 상태 라벨·§3.4 kind·§6①③⑤⑥ 라벨 의존 부분은 **PRD v0.6에서 삭제 예정 — 구현하지 않는다.**
- `docs/reviews/programmer-01-v0.1-prototype-review.md` §6 R4(폐기 ID 검사 공유)
- 게시 예정 초안 2건(내용 수정 금지, 검증용): `docs/supervisor/drafts/2026-09-21-kimeunhye-reel.md` · `docs/supervisor/drafts/2026-09-21-hanmibro-threads-academy.md` — 초안의 `kind`·`statementType` 필드는 **무시**(슈퍼바이저가 게시 시 제거).
- `content/README.md`, `src/lib/content/schema.ts`, `scripts/validate-content.ts`, `src/lib/config.ts`, `src/components/status-badge.tsx`, `src/app/about/page.tsx`, `src/app/llms.txt/route.ts`

## 임무

### 1. 상태 라벨 제거 — 단일 스키마
- `status`·`courtLevel`·`statusHistory[]`·상태 배지 컴포넌트·상태별 통계·`og-draft`의 status 프롬프트·README 라벨 절 **전부 제거**. 검증에서 `status`가 있으면 **오류**(옛 파일 잔존 방지).
- 남는 스키마: 필수 `id`·`title`·`description`·`publishedAt`·`sourceType`(`url|photo|photo_text`)·출처 표기(`attribution`) · 유형별(`sourceUrl`+`og`/`images[]`+`alt`) · **`sources[]` 선택**(`url` 유형에서 `sourceUrl`이 있으면 0건 허용, `photo`·`photo_text`는 최소 1건 유지 — 근거: 사진 게시는 원문 링크가 없어 출처가 유일한 근거) · 선택 `speaker{name, affiliation}` · `tags[]` · `image` · `useSourceImage`(기본 false).
- 카드 = **제목 + 이미지(플레이스홀더)만** (사용자 원안). 상세 = 요약 · 원문 링크(외부 CTA) · 출처 목록("배경 보도" 라벨) · 발언자(있으면) · 태그 · "원문 제목/요약(출처 인용)" 라벨.
- 기존 샘플 3건 → 새 스키마로 수정(status 제거). `retired-ids` 검사를 `load.ts`와 공유(R4).
- 게이트 오류 케이스 실측: status 잔존 / photo에 sources 0 / 필수 누락 / id 중복 / alt 누락.

### 2. 소재 확장 문구
`SITE.tagline/description`·about·llms.txt·JSON-LD·OG alt·footer의 "간첩 행위·간첩 의혹"·"상태 라벨" 문구 전부 교체 — CLAUDE.md 개요 "정치·시사 이슈 큐레이션 전반(정책 비판·발언·논평·안보·간첩)" 기준, 정보 전달형·단정 없음. about에는 출처 정책(§6②)·인용문 표기 원칙(§6④)·정정·삭제 요청 채널만.

### 3. 검색엔진 검증 메타태그 env
`NEXT_PUBLIC_GSC_VERIFICATION`·`NEXT_PUBLIC_NAVER_VERIFICATION` → `<head>` meta(값 없으면 미출력). `.env.example`. ⚠️ `public/google*.html`·`public/naver*.html` 삭제 금지.

### 4. 검증
validate/typecheck/lint/build · 초안 2건을 새 스키마로 변환해 `content/posts/`에 임시 투입 → 빌드 통과 + 카드·상세 캡처(390/1280) → 제거(게시는 슈퍼바이저) · 게이트 케이스 · 독립 grep 0 · 라우트 회귀.

## 산출물 · 핸드오프
`src/**`·`scripts/`·`content/README.md`·`content/posts/example-*`·`.env.example`·`docs/qa/programmer-03/` / `docs/handoffs/programmer-03-remove-status-label.md`(제거 항목 표·초안 2건 변환 frontmatter 전문·검증 숫자) · `docs/triggers/programmer-03-remove-status-label-COMPLETE.md`(🔴 필수) · processed/ · history. **커밋 금지.**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 03-remove-status-label
- 제거 표 · 초안 2건 빌드/렌더 · 게이트 N/N · 빌드 · grep 0 · 자체 결정 · 미해결
```
