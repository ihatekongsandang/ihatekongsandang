# 완료 트리거 — 기획자 12 · terms-copy-body-sync
**작성일**: 2026-11-09 | **작성 세션**: 기획자 (Sonnet 5.5)

## 바뀐 문장 (`planning/terms-page-copy.md`, 본문 7건 + §C·§D)
- #1 ko §5 마지막 문장("위 4항" → ‘정정·삭제 요청 방법과 처리 기준’ 절)
- #2 en §5 마지막 문장("Section 4" → “How to request … handle it” section above)
- #5 ko §3 셋째 항목(굵은 구절 변경 + 원문 미리보기 고지 문장)
- #6 en §3 셋째 항목(굵은 구절 변경 + Original post preview 문장). 아포스트로피는 규칙대로 `&rsquo;` 의미로 기재
- #7 ko §3 둘째 항목 끝 덧붙임 2문장
- #8 en §3 둘째 항목 끝 덧붙임 2문장(인용이라 곧은 `'`)
- #9 ko·en 개정일 줄: "페이지 위치·제목" 절에 확정 기재(2026-11-09)
- 머리 메모 추가, §C를 "개정 처리 완료"(원문·근거·배포 커밋 8a6f4d3) 표로, §D(대기 항목) 신설
- 아포스트로피 규칙 명문화(§C 머리): 곧은 `'`는 `&rsquo;`, 예외는 `SITE_EN.aboutIntro` 인용뿐

## 재현 결과 (`python3 -I docs/tools/reviewer-27/terms-copy-reproduce.py`)
- 개정 전: ko 27/29 · en 27/29 (MISS 4)
- 개정 후: **ko 31/31 · en 30/32** (MISS 2, 영문만)
- 남은 MISS 2건은 모두 아포스트로피 때문이다. #6(실제 1자 차이: 배포 `&apos;` vs 규칙 `&rsquo;`)과 #8(도구가 `&apos;`를 정규화하지 않는 도구 한계. 규칙과 배포는 일치). 즉 **원인은 #6 1건만이 아니라 #6 + 도구 한계(#8) 2건**이다.
- 분리 확인: `docs/tools/planner-12/apostrophe-check.py` → #8 OK, #6 DIFF.
- 리뷰 27 도구는 수정하지 않았다.

## 대기 항목
- D1 다음 약관 코드 오더: #6 `article&apos;s` → `article&rsquo;s` 1자 되돌리기 + `src/lib/config.ts` `termsLastUpdated` 갱신
- D2 (선택) 검증 도구 2종의 날짜 고정값을 상수 읽기로 변경
- (선택) 리뷰 27 도구 `norm()`에 `&apos;` 정규화 추가하면 MISS가 0이 된다. D1 반영 후에는 도구 수정 없이도 en MISS가 #8 1건만 남는다. 도구 수정은 리뷰어 영역

## 커밋 대상 경로
- `planning/terms-page-copy.md`
- `docs/tools/planner-12/`(README.md, reproduce-output.txt, apostrophe-check.py, apostrophe-check-output.txt)
- `docs/triggers/planner-12-terms-copy-body-sync-COMPLETE.md`
- `instructions/planner/processed/12-terms-copy-body-sync.md`
- `history/2026-11-09.md`
