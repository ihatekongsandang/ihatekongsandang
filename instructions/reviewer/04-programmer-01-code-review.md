# md오더: 리뷰어 (Fable 5.1) - 04-programmer-01-code-review

**작성일**: 2026-09-21 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 04
**세션**: 🔴 새 세션 — 코드 리뷰는 PRD 리뷰와 다른 영역이고 컨텍스트 소모가 크다.
**범위**: 프로그래머 01 산출물(작업트리 미커밋 코드) 전체. 🔴 **이 판정이 첫 커밋·첫 배포 게이트다.**

---

## 자격·역할 (Required)
리뷰어 (Fable 5.1). 코드 품질·보안·성능·접근성·정책 준수 판정. 산출물 직접 수정 금지(지적만). CLAUDE.md 대전제 + 🔴 저장소 독립 원칙 + §9 배포 도메인 접근 최소화(배포 전이므로 로컬 빌드만).

## 선행 검토 문서 (Required)
- `CLAUDE.md`, `PROJECT_STATUS.md`, `history/2026-09-21.md`
- `planning/prd.md` v0.3(§3·§4·§5·§6·§9·§11) — ⚠️ M1~M4는 기획자 04가 수정 중, 리뷰어 03 보고서 §2 참조
- 🔴 `docs/reviews/planner-02-prd-v0.2-review.md` **§7 제약 15개** (프로그래머 우선 기준)
- 🔴 `docs/reviews/planner-03-prd-v0.3-review.md` **§8 "프로그래머 01 리뷰(04)로 넘길 항목" 10개**
- 프로그래머 오더 `instructions/programmer/processed/01-v0.1-prototype.md`
- 🔴 `docs/handoffs/programmer-01-v0.1-prototype.md`(§7 15항목 → 구현 위치 표, 자체 결정 13건, 검증 숫자, 미해결 6건) · `TECH_STACK.md` · `content/README.md`
- 코드: `src/**`(44파일) · `scripts/` · `content/` · 설정 파일 전부 · `docs/qa/programmer-01/` · `docs/tools/programmer-01/`

## 임무

### 1. 재현 검증 (프로그래머 숫자를 믿지 말고 직접)
- `npm ci` → `npm run validate:content` · `typecheck` · `lint` · `build` 직접 실행, 결과 숫자 기록.
- `npx next start` 로컬 프로덕션: 4화면 + `/?page=2`(404 기대) + `/category/x`(404) + `/post/{id}` 3건 직접 열람. 반응형 390/1280 확인.
- 검증 게이트 6케이스(필수 누락·enum 외·id 중복·alt 누락·폐기 ID·유죄판결 심급 누락)를 **직접 재현**해 빌드가 막히는지 확인 후 원복.
- `curl -I` 보안 헤더 6종, 렌더 HTML의 `rel` 값 전수, sanitize(스크립트/HTML 삽입 시도 1건).
- 저장소 독립 grep(커밋 대상 전체) 0건 재확인 + `git status`에 커밋되면 안 되는 것(`.env.local`·`.next`·`node_modules`) 없음.

### 2. 제약 대조 (전수)
리뷰어 02 §7 15항목 + 리뷰어 03 §8 10항목 = **25항목** 코드 실측 대조표. 특히:
- §8-2 **대표 이미지 필수 여부** — `example-case-a.md`(이미지 없음)가 빌드 통과하는지가 직접 증거.
- §8-1 enum 확장 가능 구조(`기소` 병기·`종결` 사유 하위 필드 추가 시 깨지지 않는지 — 기획자 04 M2·M3 흡수 여지).
- §8-10 예시 게시물 3건이 실존 인물·사건·언론 URL을 지칭하지 않는지.

### 3. 🔴 판정 필요 — `useSourceImage` 기본값 (프로그래머 미해결 1)
PRD v0.3 §3.2① = `true`, 리뷰어 02 §7-6 = `false`, 프로그래머 구현 = `false`. **정책 판정을 내려라.** 슈퍼바이저 의견: `false`가 fail-safe(썸네일에 얼굴이 있어도 실수로 노출되지 않음)이나, 그러면 URL 카드가 기본적으로 플레이스홀더라 사용자 확정 "카드 = 제목 + 이미지"와 시각적으로 멀어진다 — 슈퍼바이저가 매 게시물에서 썸네일을 확인하고 켜는 운영이 현실적인지 포함해 판정. 결과는 기획자 04·프로그래머에게 전달된다.

### 4. 프로그래머 자체 결정 13건 검토
특히 ① 미들웨어 `?page=n` → `/page/n` rewrite가 SEO(canonical·중복)상 안전한지 ② CSP `img-src https:` + `remotePatterns` 비움(핫링크는 `next/image` 미경유?) 의 성능·보안 트레이드오프 ③ JSON-LD `Article` ④ 검증 스크립트 TS(`tsx`) 의존 ⑤ 무한스크롤 이월의 타당성.

### 5. 코드 품질·보안·성능·접근성
읽은 파일 수/전체를 숫자로. XSS·경로 조작(`[id]`·`[slug]`)·의존성 취약점(`npm audit`)·번들 크기·정적 생성 여부·키보드·대비.

### 판정 기준
승인(커밋·배포 가능) / 조건부 승인(경미 수정 후 커밋, 항목 명시) / 재작업. 근거는 파일·행·실측값.

## 산출물 (Required)
- `docs/reviews/programmer-01-v0.1-prototype-review.md` — 판정 + 재현 숫자 + 25항목 대조표 + `useSourceImage` 판정 + 결함/권고 + (필요 시) 프로그래머 02 지시안 + **배포 직후 슈퍼바이저 확인 항목**(curl 1~2회 범위)
- 측정 도구를 썼으면 `docs/tools/reviewer-04/`

## 핸드오프 (Required)
- `docs/handoffs/reviewer-04-programmer-01-code-review.md`
- `docs/triggers/reviewer-04-programmer-01-code-review-COMPLETE.md` — 🔴 반드시 생성
- 본 파일 → processed/, history 기록. ⚠️ 빌드 산출물(`.next`)·`node_modules`는 커밋 대상 아님.

## 완료 보고 양식
```
📋 리뷰 완료 보고 — 리뷰어 (Fable 5.1) · 04-programmer-01-code-review
- 판정 · 재현(validate/typecheck/lint/build/게이트 6케이스/헤더 6) · 대조 N/25 · 결함 N · 권고 N
- useSourceImage 판정
- 보고서·핸드오프·트리거 경로
```
