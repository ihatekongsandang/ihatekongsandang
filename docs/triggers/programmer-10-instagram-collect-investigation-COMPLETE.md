# ✅ COMPLETE — 프로그래머 10 · 10-instagram-collect-investigation
**완료**: 2026-11-08 | **세션**: 프로그래머 (Opus 5)

- **검사 수**: 31건 = 수집 실패 18 + 추가 실패 8(11/05~11/08) + 대조군 5. 측정 방식은 guide §3 A(embed/captioned)와 B(og:draft)를 코드당 1회씩 실행했다.
- **원인**: 10/29 03:52 UTC 이후 업로더가 guide와 다른 데스크톱 Chrome/130 전체 UA로 요청했다. 이 UA로는 JS 전용 페이지(약 50만B, 마커 0)가 왔고, 실패 25건이 전부 이 경우다. 그 밖에 삭제·비공개 2건, embed 차단 1건이 있다. 10/21 1건은 원인 확인이 필요하다.
- **대안별 성공 수** (실패 18 / 추가 8):
  - A guide 명령 그대로: **16/18 · 7/8**
  - B og:draft: **16/18 · 8/8**
  - A 또는 B: **16/18 · 8/8**
  - C Chrome UA 재요청, D `/embed/`: 권한 분류기 거부로 미시험
  - 크롤러 UA 위장: 금지(시험 안 함)
  - 공식 oEmbed: 토큰 필요(요청 안 함)
- **권고**: **(가)** guide §3 명령으로 23건을 재수집하고, 1건은 og:draft로 확인한다. 캡처가 필요한 것은 2건(`DfFKqzZTmpx`, `DfFk6b4zmLk`)뿐이다. guide §3에 UA 고정 문구를 보강한다(제안 문안은 보고서 §5).
- **사용자 작업 필요 여부**: 캡처 2건 제공(또는 열람 불가 처리 결정)이 필요하다. 계정·키는 필요 없다. C·D 대조가 꼭 필요할 때만 권한 판단이 필요하다.
- 보고서: `docs/tools/programmer-10/instagram-collect-report.md` · 핸드오프: `docs/handoffs/programmer-10-instagram-collect-investigation.md`
