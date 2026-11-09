# reviewer-29 대조 도구·출력
저장소 루트에서 실행.
- `python3 -I docs/tools/reviewer-29/body-sync-check.py > docs/tools/reviewer-29/body-sync-check-output.txt` : 문안 본문의 바뀐 문장 6건(#1·#2·#5·#6·#7·#8)과 #9 개정일 줄(ko·en)을 배포 소스와 글자 단위로 대조한다. JSX 공백 규칙과 html 엔티티를 풀고, §C 아포스트로피 규칙(곧은 `'` = `’`, #8 인용만 예외)을 적용한다. 결과 7/8, DIFF는 #6 1자(`’` vs `'`).
- 리뷰 27 도구 재실행 결과와 `&apos;` 정규화 사본·D1 모의 결과는 리뷰 보고서 §2에 숫자로 적었다(임시 사본은 지웠다. 대상 파일은 고치지 않았다).
