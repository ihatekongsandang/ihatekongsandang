# ✅ 완료 트리거 — 리뷰어 22-programmer-10-instagram-collect-review

**완료**: 2026-11-08 22:02 | **세션**: 리뷰어 (Opus 5.5)
**리뷰**: `docs/reviews/programmer-10-instagram-collect-investigation-review.md`

## 판정
✅ **승인** — P1 0 · P2 0 · P3 7 (보고서·도구 정정 6, guide 한 줄 보강 1. 결론 영향 없음)

## 검증 요지
- 보고서 표 ↔ `reproduce-output.tsv` 31/31 일치(불일치 0), 집계 재계산 일치(18: 16/16/16 · 추가 8: 7/8/8 · 대조 5/5/5)
- 당시 UA: plain 99(~10/29 03:38Z) · Chrome/130 25(10/29 03:52Z~11/08 12:18Z, 499,901~512,880B, 마커 출력 18건 전부 0) — 원인 판정 타당. 현재 Chrome UA 대조(C)는 프로그래머 세션 권한 거부 항목이라 리뷰어도 실행하지 않음
- 리뷰어 재요청 2건(guide 명령) 보고서와 동일
- 금지 항목·원문 저장·저장소 독립 위반 0
- guide §3 변경 = 제안 문안과 같은 뜻, 업로더가 그대로 24건 처리 → 따를 수 있음

## P3 7건
1 Des0mDXEZbq "plain·378943B" 출처 없음(tsv 크기 공란) · 2 "23건"→22건 · 3 "26번"→31번 · 4 plain 시기 embed 실패 2→최소 4건 · 5 tsv 머리글 "11/04 이후" 부정확 · 6 reproduce.py 저장소 안 원문 폴더 가드 없음 · 7 guide: 마커 0 + "may be broken" 없음 경우 처리 누락

## 커밋 대상
- 프로그래머 10 산출물(`docs/tools/programmer-10/` 6파일·핸드오프·트리거·오더 processed) — 승인
- `docs/poster/guide.md` §3 — 승인(P3-7 한 줄 커밋 전 추가 권장)
- 리뷰어: 본 리뷰, `docs/tools/reviewer-22/crosscheck.py`·`crosscheck-output.txt`, 본 트리거, `instructions/reviewer/processed/22-programmer-10-instagram-collect-review.md`(이동)

## 제약 준수
- 대상 파일 수정 0 · git add/commit/push 0 · 빌드 0 · 외부 요청 2회(guide 명령)
