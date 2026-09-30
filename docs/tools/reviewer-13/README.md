# 리뷰어 13 — 프로그래머 06-1 간이 확인 재현 절차

새 `.ts/.tsx` 도구는 만들지 않았다. 아래 명령으로 같은 결과를 다시 얻을 수 있다(`$SCRATCH`는 임의 임시 폴더).

1. 게이트(현재 작업 트리): `bash docs/tools/programmer-06-1/clean-clone-gate.sh "$SCRATCH/gate1"; echo $?` → `results/gate-run1.log`
2. 음성 대조: 작업 트리를 `rsync -a --exclude node_modules --exclude .next ./ "$SCRATCH/negsrc/"`로 복사 →
   사본에서 `git apply -R docs/tools/programmer-06-1/results/fix.patch` → 사본에서 게이트 실행 → exit 2 기대. 원본 작업 트리는 건드리지 않는다.
   → `results/gate-negative-fix-reverted.log`
3. 분리안 실측(제안 3 의견용): 2의 게이트 결과 폴더(`$SCRATCH/gateneg/repo`, 수정 되돌린 상태·`node_modules` 설치됨)에
   `tsconfig.build.json`(`extends ./tsconfig.json` + `exclude ["node_modules","docs"]`)을 만들고 `next.config.ts`에
   `typescript: { tsconfigPath: "tsconfig.build.json" }`를 넣은 뒤 `VERCEL=1 CI=1 …` `npm run build` / `npm run typecheck` /
   도구 4종 `npx tsx --tsconfig <도구>/tsconfig.json <도구>.tsx` → `results/alt-tsconfig-build-split.log`
4. 저장소 작업 트리 `npm run typecheck` (리뷰 산출물 추가 뒤) → `results/typecheck-worktree.log`
