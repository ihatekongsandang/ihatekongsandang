# md오더: 프로그래머 (Opus 5) - 02-review-fixes

**작성일**: 2026-09-21 | **작성자**: 슈퍼바이저 (Opus 5) | **순번**: 02
**세션**: 01을 처리한 세션에서 이어서 해도 된다(자기 코드 수정, 판정은 리뷰어 04가 이미 했다).

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 리뷰어 04 판정(조건부 승인)의 결함 D1·D2 + 권고 상 R1·R2·R3 반영. 🔴 **커밋하지 않는다** — 수정 후 슈퍼바이저가 확인 명령으로 검증하고 첫 커밋·푸시한다(리뷰어 재호출 불필요 — 리뷰어 04 판정). 대전제 + 저장소 독립 원칙.

## 선행 검토 문서 (Required)
- 🔴 `docs/reviews/programmer-01-v0.1-prototype-review.md` 전문 — §5 D1·D2·D3, §6 R1~R11, §3 `useSourceImage=false` 확정, §8 지시안
- `docs/reviews/planner-04-prd-v0.4-review.md` §10 (K3 — `closureReason` enum 재정의 예정 → 이번엔 구현 금지)
- `docs/handoffs/programmer-01-v0.1-prototype.md`(본인), `CLAUDE.md`

## 임무 (리뷰어 04 §8 그대로)

### 필수 (D1·D2)
1. **D1** `src/app/post/[id]/page.tsx` `generateMetadata` — `openGraph.images`에 루트 `opengraph-image` 상속(`parent.openGraph.images`) 또는 `'/opengraph-image'` 명시. `twitter:image`도 함께 나오는지.
   확인: 로컬 프로덕션 `curl -s http://localhost:3000/post/example-case-a | grep -c 'property="og:image"'` ≥1, `twitter:image` ≥1 — 3건 전부.
2. **D2** `package.json` `engines.node ">=20.11.0"` 또는 `next.config.ts`를 `fileURLToPath(new URL('.', import.meta.url))` 방식으로. 확인: `npm run build` 통과.

### 함께 (R1·R2·R3)
3. **R1** `markdown.ts` sanitize 스키마에서 `img` 제거(본문 이미지는 frontmatter `images[]`로만 — alt·useSourceImage 게이트 우회 차단) + `content/README.md` "본문 이미지 금지" 1문장. 확인: `docs/tools/reviewer-04/fixture-sanitize.md` 렌더에 `<img>` 0.
4. **R2** `og-draft.mjs` — `title`/`description`을 원문 헤드라인 복사 대신 빈 값 + TODO 주석(§6④ 인용문 형태로 운영자가 쓰도록), 안내 문구 옵트인 능동형. README §1·§5 반영.
5. **R3** `TECH_STACK.md` §5 — "CSP Report-Only 위반은 현재 devtools 수동 확인, `report-to`는 v0.1.5 과제" 명시.
6. **D3** 핸드오프 숫자 정정(42파일·2,665줄·86파일) — 산출 명령 병기.
7. `content/README.md` §5 실명 규칙은 PRD v0.5 확정 후(기획자 05) 갱신 — 이번엔 "PRD §6③ 최신본 참조" 한 줄만.

### 이월 (구현 금지 — PRD v0.5 K3 확정 후 프로그래머 03)
- R6 `closureReason`(enum 재정의 예정)·`priorVerdict` 필드 + README §3.4·§4·§5 + R4 retired 검사 공유.

## 검증·보고
- `npm run validate:content`·`typecheck`·`lint`·`build` 재실행 결과, 위 확인 명령 **출력 원문**, 저장소 독립 grep 0건, 바꾼 파일 목록.

## 핸드오프 (Required)
- `docs/handoffs/programmer-02-review-fixes.md` · `docs/triggers/programmer-02-review-fixes-COMPLETE.md`(🔴 필수) · processed/ 이동 · history.

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 02-review-fixes
- D1·D2·R1·R2·R3·D3 반영 표 · 확인 명령 출력 · 빌드 결과 · grep 0
```
