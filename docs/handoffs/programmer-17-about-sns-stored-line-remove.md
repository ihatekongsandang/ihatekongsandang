# 프로그래머 세션 — 17-about-sns-stored-line-remove 핸드오프
**작성일**: 2026-11-10 12:25 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)

## 요약 (3줄)
- 저장본 0건(정리 묶음 14)에 맞춰 ko `/about`·en `/en/about` "카드의 대표 이미지" 하위 목록에서 SNS 저장 이미지 `<li>`만 지웠다(13줄 삭제, 다른 줄 변화 0).
- 새 검사 `docs/tools/programmer-17/copy-exact-about.py` 44/44(양성 대조 FAIL 16 검출), typecheck·lint(0 errors)·validate·build(796/796)·clean-clone-gate(--worktree) 모두 통과.
- 방문자에게 보이는 다른 곳에 "SNS 이미지 저장" 문장 0건. 내부 문서 `content/README.md` 195행만 옛 표현.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/app/(ko)/about/page.tsx` | SNS 줄 `<li>` 삭제(7행) |
| `src/app/(en)/en/about/page.tsx` | "Many posts about social media posts … stored on this site …" `<li>` 삭제(6행) |
| `docs/tools/programmer-17/copy-exact-about.py` | 계획 §2.2에서 기대값을 읽고 SNS 줄만 빼서 빌드 HTML과 대조 |
| `docs/tools/programmer-17/*-output.txt`·`gate-worktree.log`·`src-diff.txt` | 검증 출력 |
| `docs/triggers/programmer-17-about-sns-stored-line-remove-COMPLETE.md` | 완료 트리거(상세 수치) |

## 주요 결정사항
- `programmer-16/copy-exact-c3-c4.py`와 `reviewer-36/serve-check.sh`는 고치지 않았다. 두 도구는 그 세션 시점의 증거 기록이고, P16 도구는 기대값을 기획 문서(범위 밖)에서 읽기 때문이다. 대신 같은 방식의 P17 검사를 새로 만들었다. P16 도구 재실행 FAIL 10은 전부 삭제로 생긴 한 칸 당김이다(트리거에 기록).
- ko 84행 주석은 "다른 줄은 한 글자도 바꾸지 않는다"를 지켜 그대로 뒀다.

## 미해결·이슈
- 기획 문서 §2.2 문안·ko 84행 주석·`content/README.md` 195행 갱신 여부 — 슈퍼바이저 판단.
- 게이트·빌드는 작업 트리 기준이라 다른 세션의 미커밋 변경이 같이 들어간 상태다. 커밋할 때는 이 오더 파일만 스테이징하고 `--staged` 게이트를 권한다.

## 다음 세션 가이드
- 리뷰어: `src-diff.txt`로 삭제가 두 `<li>`뿐인지 확인하고, `python3 docs/tools/programmer-17/copy-exact-about.py`(빌드 뒤)를 다시 돌려 본다.
- 슈퍼바이저: 리뷰 통과 후 트리거의 "커밋 대상"만 커밋한다.

## 참고 링크
- `planning/q1-redirect-q2-sns-image-plan.md` §2.2(171행)·§3.4 완료 조건 ③
- `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`, `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md`
