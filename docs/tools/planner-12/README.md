# planner-12 재현 도구·출력
저장소 루트에서 실행.
- `python3 -I docs/tools/reviewer-27/terms-copy-reproduce.py > docs/tools/planner-12/reproduce-output.txt` : 리뷰 27 도구 재실행(도구는 수정하지 않았다). ko 31/31, en 30/32. 영문 MISS 2건은 모두 곧은 `'` 때문이다(도구가 `&apos;`를 정규화하지 않음).
- `python3 -I docs/tools/planner-12/apostrophe-check.py` : MISS 2건의 원인 분리. #8은 규칙과 배포가 같고(도구 한계), #6만 실제 1자 차이(대기 항목 D1).
