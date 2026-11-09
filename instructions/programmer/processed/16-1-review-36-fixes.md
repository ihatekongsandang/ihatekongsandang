# 프로그래머 16-1 — 리뷰 36 지적 반영 (C11 커밋 B 전)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-09 · 실행: Opus5 창(새 세션 — /clear 뒤)

## 선행 문서 (새 세션이므로 먼저 모두 읽기)
- `CLAUDE.md`, 프로그래머 16 오더 `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`
- `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md`, `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md`, `docs/tools/programmer-16/`

## 배경
- 커밋 단위 A는 `6f0f941`로 커밋·푸시됨. 커밋 단위 B(8개 파일)는 아직 작업 트리에만 있다.
- 리뷰: `docs/reviews/programmer-16-review.md`, `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md`

## 할 일
1. **P2-1**: `checkMovedIds` 검증 f(새 id 게시물 존재)는 **frontmatter id만** 기준으로 한다(파일명 일치는 인정하지 않음). 파일명 `zz-new.md` + frontmatter id `zz-new-typo` 사례를 단위 시험·돌연변이 시험·빌드 실패 시험에 추가.
2. **P3-1**: `readTranslationIds`는 moved-ids 항목이 0건이면 영어본을 읽지 않고 빈 집합을 돌려준다. 읽을 때 YAML 오류는 파일 이름을 붙여 다시 던진다.
3. **P3-3**: `docs/tools/programmer-16/word-grep.sh` 5·20행 — 슈퍼바이저 커밋 게이트(추가 줄에 홈 디렉터리 접두 문자열이 있으면 실패)에 걸린다. 정규식을 조각으로 조립하는 등 **그 문자열이 파일에 그대로 나오지 않게** 바꾼다. 같은 폴더의 다른 파일도 같은 기준으로 확인.
4. **P3-4**: `retired-ids.ts` import 뒤 빈 줄 2개 → 1개.
5. P3-2(포커스 외곽선)는 손대지 않는다(디자이너 확인 대상).

## 검증
- 단위·돌연변이·빌드 실패·픽스처 시험표 재실행, typecheck, lint, a11y-e2e(GA 더미), 최종 일반 빌드, `clean-clone-gate.sh --worktree`.
- 출력은 `docs/tools/programmer-16-1/`.

## 금지
git 쓰기 금지. `content/posts*`·`public/` 수정 금지. `history/2026-10-01.md`·`history/2026-11-05.md`는 건드리지 않는다. 저장소 독립(다른 서비스명·계정명·홈 절대경로·비공인 실명·옛 #1 id 금지).

## 🔴 완료 트리거 (필수)
`docs/triggers/programmer-16-1-review-36-fixes-COMPLETE.md`: 실제 모델 ID, 바꾼 파일, 항목별 결과, 검증 수치, 커밋 B 최종 경로 목록. 오더는 `processed/`로.
