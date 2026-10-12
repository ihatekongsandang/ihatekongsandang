# md오더: 프로그래머 (Opus 5) - 07-gate-staged-a11y-seo

**작성일**: 2026-10-01 14:05 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 07

---

## 자격·역할 (Required)
프로그래머 (Opus 5) 자격으로 본 임무 수행. CLAUDE.md §1~§9 준수(대전제: 품질 >>> 시간, 추측 금지, 전수 = 전수).
🔴 저장소 독립 원칙: 산출물·주석·로그에 다른 서비스명·계정·홈 디렉터리 절대경로 금지(`$HOME/ihatekongsandang/...` 또는 상대경로).

## 선행 검토 문서 (Required)
- 공통: `CLAUDE.md`, `planning/prd.md`, `history/2026-09-30.md`, `history/2026-10-01.md`
- `docs/handoffs/programmer-06-1-vercel-build-failure.md`
- `docs/reviews/programmer-06-1-vercel-build-failure-review.md` (§2 P2-1·P3-1·P3-2, §5 제안 1~3)
- `docs/reviews/programmer-06-english-feed-all-cards-review.md` (§5 P2-1·P2-2)
- `docs/tools/programmer-06-1/clean-clone-gate.sh`, `docs/tools/reviewer-13/results/alt-tsconfig-build-split.log`
- `docs/handoffs/supervisor-2026-10-01-session-handoff.md` "세션 역할 분담" (업로더와 작업 폴더·git 인덱스 공유)

## 배경
- 작업 폴더를 **반공-업로더**(콘텐츠 게시)와 **반공-슈퍼바이저**(코드 커밋)가 같이 쓴다. 두 세션 모두 자기 파일만 `git add <경로>`로 부분 커밋하며, `git add -A`는 금지다.
- 현재 게이트는 "작업 트리 전체(추적 + 미추적)"를 복사한다 → 업로더의 작성 중 파일이 섞이고, 실제 커밋 내용과 다르다(리뷰 13 P2-1). 리뷰어 권고 ①(`git add -A`)은 우리 운영 규칙과 충돌하므로 **②계열(커밋 내용 그대로 검사)** 로 간다.

## 임무

### A. 🔴 게이트 정비 (최우선) — `docs/tools/programmer-07/` 에 새 버전 작성
1. **`--staged` 모드(기본값으로)**: git 인덱스에 스테이징된 내용만 복제본으로 꺼내 검사(예: `git checkout-index -a --prefix=…` 등 — 방식은 판단). 커밋 직전 "이 커밋이 올라가면 Vercel이 보는 트리"와 같아야 한다. 미추적·미스테이징 변경은 포함하지 않는다.
2. **`--head` 모드**: 커밋 후·푸시 전 HEAD를 깨끗하게 복제(`git clone` 등)해 같은 단계 실행.
3. **`--worktree` 모드**: 기존 동작 유지(선택 사용).
4. 실행 시작 시 모드와 포함 파일 수, **제외된 미스테이징/미추적 경로 목록**을 출력한다(슈퍼바이저가 섞임 여부를 눈으로 확인할 수 있게).
5. P3-1: 임시 폴더 자동 정리(`trap`). 인자로 폴더를 준 경우는 남긴다. P3-2: 주석 순서 정정.
6. 기존 `docs/tools/programmer-06-1/clean-clone-gate.sh`는 수정하지 말고, 새 스크립트 위치와 사용법을 핸드오프에 적는다(슈퍼바이저는 이후 새 스크립트를 쓴다).
7. 🔴 검증(전부 실측 + 로그):
   - 양성: 현재 HEAD를 `--staged`(스테이징 없음 = HEAD와 같음)·`--head`로 각각 exit 0
   - 음성 ①: 스크래치 사본에서 타입 오류 파일을 **스테이징**하면 `--staged` exit ≠ 0
   - 음성 ②: 같은 오류 파일을 **미추적으로만** 두면 `--staged`는 통과하고 제외 목록에 그 경로가 찍힌다
   - 음성 ③: 커밋에 오류가 있는 상태에서 `--head` exit ≠ 0
   - 각 음성 대조에서 `✅` 줄이 찍히지 않는지 확인. 사용자 실제 저장소의 인덱스·작업 트리는 건드리지 말 것(스크래치 복제본에서만 시험).

### B. 빌드 전용 tsconfig (리뷰 13 제안 3, 리뷰어 실측안)
- `tsconfig.build.json`(`extends ./tsconfig.json`, `exclude: ["node_modules","docs"]`) + `next.config.ts` `typescript.tsconfigPath`.
- 확인: `npm run build` 통과 · 루트 `npm run typecheck`는 여전히 `docs/tools/**` 타입 오류를 잡음(음성 대조) · 기존 도구 `tsx` 실행 전부 exit 0(대상 도구 목록·수를 숫자로).
- Vercel 실제 환경 적용 여부는 로컬로 알 수 없음 → 핸드오프에 "배포 후 확인 필요"로 명시.

### C. 접근성 — 리뷰 12 P2-1
- 영어 피드 `Korean only` 배지를 카드 링크의 `aria-describedby`로 연결(배지는 `lang="ko"` 링크 안에 넣지 않는다). id 중복 없게.
- 확인: 영어 피드 전 페이지의 Korean only 카드 전수에서 링크 accessible description에 "Korean only" 포함(AX 트리 실측, 수 = 전체 Korean only 카드 수). 한국어 페이지 출력 불변(HEAD 대비 전수 비교).

### D. 핸들 정규식 — 리뷰 12 P2-2
- 끝 마침표 제외, 앞 글자가 영숫자면(이메일) 핸들로 보지 않도록.
- 확인: 모서리 케이스(`@2.pro.official.`, `editor@example.com`, `(@a_b)`, `@a.b`) 단위 검사 + 실데이터 전수(한국어·영어본 전체) 오탐 0, 기존 경고 결과와 차이 0.

### E. 브랜드 검색 보조 — WebSite JSON-LD `alternateName`
- `src/lib/seo.ts` `websiteJsonLd`에 `alternateName` 추가. 한국어: `["공산당이 싫어요", "ihatekongsandang"]`, 영어: 영어 사이트명 체계에 맞게 판단(근거 기록).
- 값은 사이트 설정(`config.ts` 등)에서 관리하도록 판단. 확인: 한국어·영어 메인 JSON-LD 실측, 그 외 페이지 HTML 출력 차이는 이 항목 외 0.

## 산출물 (Required)
- `docs/tools/programmer-07/` (새 게이트 스크립트·검증 도구·`results/` 로그)
- `tsconfig.build.json`, `next.config.ts`, 접근성·핸들·JSON-LD 관련 `src/**` 변경
- 필요 시 `content/README.md`(핸들 규칙 문구만)
- 🔴 `docs/tools/**`에 `.ts/.tsx`를 만들거나 고쳤으면 보고 직전 **저장소 작업 트리에서** `npm run typecheck` exit 0 확인·로그(리뷰 13 제안 2)

## 핸드오프 (Required)
- `docs/handoffs/programmer-07-gate-staged-a11y-seo.md` (커밋 대상 파일 목록을 경로로 명시 — 슈퍼바이저가 그대로 `git add <경로>` 한다)
- `docs/triggers/programmer-07-gate-staged-a11y-seo-COMPLETE.md` 🔴 **완료 트리거 파일 생성 필수**
- 처리 후 본 파일 → `instructions/programmer/processed/` 이동

## 결정 사항·제약
- 🔴 **git add·commit·push 금지** (리뷰어 게이트 후 슈퍼바이저가 커밋).
- `content/`·`public/images/`는 업로더 영역 — 수정 금지(검증용 읽기만). 작업 트리의 업로더 미추적 파일 건드리지 말 것.
- 빌드·측정은 스크래치 사본 우선. 저장소에서 `npm run build` 시 `.next`를 덮는다는 점 유의(업로더는 빌드하지 않음).
- 배포 도메인 접근은 하지 않는다(CLAUDE.md §9).

## 완료 보고 양식
- 서두: `📋 작업 완료 보고 — 프로그래머 (Opus 5) · 07-gate-staged-a11y-seo`
- 산출물 경로 · 핸드오프 경로 · 요약 3줄 · A~E 실측 숫자 · 미해결
