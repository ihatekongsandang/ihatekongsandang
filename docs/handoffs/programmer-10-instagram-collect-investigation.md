# 프로그래머 세션 — 10-instagram-collect-investigation 핸드오프
**작성일**: 2026-11-08 21:3x | **작성 세션**: 프로그래머 (Opus 5)

## 요약 (3줄)
- guide §3 명령(`-A "Mozilla/5.0"` embed/captioned)을 그대로 실행하면 수집 실패 18건 중 16건, 추가 실패 8건 중 7건, 대조군 5건 중 5건이 지금 수집된다. 검사 수는 31이다.
- 주원인: 10/29 03:52 UTC부터 업로더가 guide와 다른 데스크톱 Chrome/130 전체 UA로 요청했다. 그 결과 JS 전용 페이지(약 50만B)를 받아 마커 0이 됐고, 이후 실패 25건이 전부 이 경우다. 세션 기록으로 실측했다.
- 권고 (가): 23건은 guide 명령으로 다시 수집하고, 1건(`DfDolMhEoz-`)은 og:draft로 확인한다. 2건(`DfFKqzZTmpx`, `DfFk6b4zmLk`)은 삭제·비공개라 캡처 또는 열람 불가로 처리한다. guide §3에 UA 고정 문구를 보강하자고 제안한다.

## 산출물
| 경로 | 설명 |
|---|---|
| `docs/tools/programmer-10/instagram-collect-report.md` | 보고서(재현 표 31행·원인·대안별 성공 수·권고·guide 제안 문안) |
| `docs/tools/programmer-10/codes.txt` | 검사 대상 31건 |
| `docs/tools/programmer-10/reproduce.py` · `reproduce-output.tsv` | guide §3 A·B 재현(요청 코드당 2회, `--measure-only` 재측정) |
| `docs/tools/programmer-10/uploader-attempts.py` · `uploader-attempts-output.tsv` | 업로더 세션 기록에서 당시 UA·응답 크기 추출(요청 없음) |

## 주요 결정사항
- 검사 범위를 18건에서 26건으로 넓혔다. 11/05~11/08에 생긴 추가 실패 8건까지 모두 포함했다. 조사 중 21:18에 생긴 `Dfa3L7WAcfH`도 넣었다.
- 원인 근거로 업로더 세션 기록(JSONL)의 명령과 출력 숫자를 썼다. 원문은 저장소에 넣지 않았다.
- 크롤러 UA 위장과 비공식 API는 차단 회피에 해당해 시험하지 않았다.

## 미해결·이슈
- **대안 C(Chrome/130 UA 재요청)와 D(`/embed/` 변형)는 자동 모드 권한 분류기가 거부해 미시험이다.** 우회하지 않았다. 원인 판정은 당시 기록 25건으로 대신했다. 지금 대조가 꼭 필요하면 사용자가 권한을 판단해야 한다.
- `Des0mDXEZbq`(10/21)는 당시 plain UA로도 실패했다. 원인은 확인 필요이며, 지금은 성공한다.
- ③ 2건이 삭제인지 비공개인지 연령 제한인지는 로그인 없이 구분할 수 없다(확인 필요).
- 공식 oEmbed가 토큰 없이도 되는지는 2차 출처 하나뿐이라 확인 필요다. 지금은 필요 없다.

## 다음 세션 가이드
- 슈퍼바이저: guide §3에 제안 문안(보고서 §5-4)을 반영할지 정한다. 업로더에게 26건 재처리 오더를 낸다(A 23건 · B 1건 · 캡처 2건). D7 "캡처 일괄 수령"은 2건으로 줄어든다.
- 업로더: 인스타그램 요청 UA를 `Mozilla/5.0` 그대로 둔다. `CaptionUsername` 0이면 og:draft로 확인하고, 그것도 비면 캡처를 요청한다.
- 리뷰어: 보고서 표와 `reproduce-output.tsv`·`uploader-attempts-output.tsv`가 맞는지 대조한다.

## 참고 링크
- Meta oEmbed 문서: https://developers.facebook.com/docs/instagram-platform/oembed
