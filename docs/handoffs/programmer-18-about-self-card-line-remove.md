# 프로그래머 세션 — 18-about-self-card-line-remove 핸드오프
**작성일**: 2026-11-11 08:52 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)

## 요약 (3줄)
- 자체 카드 0건(업로더 21~25)에 맞춰 ko `/about`·en `/en/about` "카드의 대표 이미지" 하위 목록에서 자체 카드 `<li>`만 지웠다(8줄 삭제, 다른 줄 변화 0). 하위 목록 3개.
- 기대값을 코드에 직접 적은 새 검사 `docs/tools/programmer-18/copy-exact-about.py` 31/31(양성 대조 2종 FAIL 10·13 검출), typecheck·lint(0 errors)·validate·build(796/796)·렌더·clean-clone-gate(--worktree) 통과.
- 방문자에게 보이는 다른 곳에 자체 카드 취지 문장 0건. 내부 문서·주석 위치는 트리거에 목록화(수정 0).

## 산출물
| 경로 | 설명 |
|---|---|
| `src/app/(ko)/about/page.tsx` | 자체 카드 줄 `<li>` 삭제(4행) |
| `src/app/(en)/en/about/page.tsx` | "Some posts use a card image this site made …" `<li>` 삭제(4행) |
| `docs/tools/programmer-18/copy-exact-about.py` | 기대값 하드코딩 회귀 검사(옛 문구 2종 0회 포함) |
| `docs/tools/programmer-18/*-output.txt`·`*positive-control*.txt`·`gate-worktree.log`·`src-diff.txt` | 검증 출력 |
| `docs/triggers/programmer-18-about-self-card-line-remove-COMPLETE.md` | 완료 트리거(상세) |

## 주요 결정사항
- 기획 문서에서 기대값을 읽지 않고 코드에 적었다(오더 지시, P17 도구가 기획 문서 변경에 깨진 문제 회피).
- 양성 대조를 자체 카드 줄·SNS 줄 두 종류로 둬 옛 문구 두 갈래 모두 잡히는 것을 확인했다.
- 주석(ko 84행·en 37행)은 "다른 줄 한 글자도 안 바꿈"에 따라 그대로 뒀다.

## 미해결·이슈
- 기획 §2.2 문안·§3.4 표·about 주석·`content/README.md:87·195`·`schema.ts:47`·`post-detail.tsx:31` 갱신 여부 — 슈퍼바이저 판단.
- 빌드·게이트가 업로더 25 미커밋 변경을 포함한 작업 트리 기준. 커밋 시 이 오더 파일만 스테이징 + `--staged` 게이트 권장.

## 다음 세션 가이드
- 리뷰어: `src-diff.txt`로 삭제가 두 `<li>`뿐인지 확인, 빌드 뒤 `python3 docs/tools/programmer-18/copy-exact-about.py` 재실행.
- 슈퍼바이저: 묶음 5 배포 뒤, 리뷰 통과 시 트리거 "커밋 대상"만 커밋.

## 참고 링크
- `instructions/programmer/processed/17-about-sns-stored-line-remove.md`, `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md`
- `planning/q1-redirect-q2-sns-image-plan.md` §2.2
