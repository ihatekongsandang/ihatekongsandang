# md오더: 프로그래머 (Opus 5) - 06-1-vercel-build-failure (🔴 긴급)

**작성일**: 2026-09-30 | **작성자**: 슈퍼바이저 (Opus 5.5) | **순번**: 06-1
**세션**: 새 세션 권장.

---

## 자격·역할 (Required)
프로그래머 (Opus 5). 커밋 `f50ee73`(프로그래머 06 + 리뷰어 12 승인분)의 **Vercel 배포 실패** 원인을 찾아 고친다. 🔴 커밋 금지(리뷰어 간이 확인 후 슈퍼바이저). 대전제 + 저장소 독립 원칙.

## 상황
- 로컬 작업 트리 빌드·리뷰어 12 재실측은 전부 통과했으나, 푸시 후 Vercel 배포가 `failure`.
  - 배포 ID: `dpl_Cu2PSVudRo6GRZeWZCd2HWaym1wG`
  - 로그 확인 명령(로그인 필요): `npx vercel inspect dpl_Cu2PSVudRo6GRZeWZCd2HWaym1wG --logs`
- 운영 사이트는 직전 성공 배포(`853df27` 이후 콘텐츠 커밋)로 계속 서비스 중 — `/en`은 아직 영어본 6건만 노출.
- 직전 성공 배포와의 차이: 코드 14개 파일 + `docs/tools/programmer-06/`(27개) · `docs/tools/reviewer-12/`(tsx·mjs 포함) · 문서.

## 임무
1. **원인 파악**: Vercel 로그 확인(로그인 가능하면) 또는 **깨끗한 복제본에서 재현** — `git clone` → `npm ci` → 운영과 같은 환경 변수(`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID` 등 값이 채워진 상태)로 `npm run build`. 작업 트리에만 있고 저장소에 없는 파일·`.gitignore`·`docs/tools/**`의 `.tsx`가 빌드 타입 검사·lint 대상에 들어가는지 등을 점검.
2. **수정**: 원인에 맞게 최소 수정. 운영 코드 동작(06 기능)은 바꾸지 않는다.
3. **검증**: 깨끗한 복제본 빌드 성공 · validate · typecheck · lint · 한국어 HTML 전수 불변(06 기준) · 독립 grep 0.
4. 원인과 재발 방지책(예: 커밋 전 깨끗한 복제본 빌드 게이트)을 핸드오프에 적는다.

## 산출물 · 핸드오프
- 핸드오프: `docs/handoffs/programmer-06-1-vercel-build-failure.md` (원인 · 증거 로그 · 수정 · 재발 방지)
- 🔴 트리거: `docs/triggers/programmer-06-1-vercel-build-failure-COMPLETE.md` (필수)
- 이 오더를 `instructions/programmer/processed/`로 이동 · history 기록
- **커밋 금지**

## 완료 보고 양식
```
📋 작업 완료 보고 — 프로그래머 (Opus 5) · 06-1-vercel-build-failure
- 원인 · 수정 파일 · 깨끗한 복제본 빌드 결과 · 재발 방지책
```
