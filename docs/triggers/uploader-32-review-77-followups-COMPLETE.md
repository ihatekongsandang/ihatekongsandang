# 🔴 COMPLETE — 업로더 32 리뷰 77 후속 정리
**작성일**: 2026-11-13 08:35 | **작성 세션**: 반공-업로더 (Opus 5.5)
**오더**: `instructions/uploader/processed/32-review-77-followups.md` · 근거: `docs/triggers/reviewer-77-uploader-31-review-COMPLETE.md` P3-1·P3-2·P3-5·P3-6

## 요약
| 항목 | 결과 |
|---|---|
| P3-1 `shindawit-nk-mdl-50-crossings` caption | ✅ 리뷰 77 수정안 그대로(ko·en). `updatedAt` 그대로 |
| P3-5 `issueradar` 장소 재탐색 | ❌ 유지 — 원 매체·공식 브리핑에서 장소 문장을 찾지 못함 |
| P3-2 `firstincome` alt | ✅ 리뷰 77 권고 문구로(ko), en도 같은 뜻으로 |
| P3-6 `idaenamright` caption | ⏸ 적용 후 되돌림 — en caption이 160자를 넘음(아래) |
| validate | R=0, 경고 22. 업로더 31 뒤 로그와 **전체 diff 0**(새 경고 0) |

---

## 1. P3-1 shindawit
- `content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md` caption
  - 전: `자료사진: 비무장지대 철책 일반 풍경(2009) — 이 사건 지점·당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.`
  - 후: `자료사진: 강원 철원 비무장지대 철책(2009) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다.`
- `content/posts-en/…` imageCaption → `Archive photo: DMZ fence in Cheorwon, Gangwon (2009) — not taken at the time of this event. It may differ from how it looks today.` (130자)
- 형식 경고 없음. `jeichi-front`와 같은 (가) 기본 형식.

## 2. P3-5 issueradar — ❌ 유지
§4.5-3c 근거(원 매체 원문 또는 청와대·국가안보실 공식 발표)에서 "청와대에서 열린" 같은 장소 문장을 찾지 못했다.

| 시도 | 결과 |
|---|---|
| 조선일보 원 매체 주소 | 이 세션의 도구로는 열 수 없는 도메인(사이트 측 접근 차단). 사용자 브라우저로 우회하지 않았다 |
| https://www.fnnews.com/news/202610060853472668 | "지난 1일 열린 NSC에서" — 장소 없음 |
| https://news.nate.com/view/20261005n17135 (뉴시스 전재) | 외교부 당국자 "NSC 관련 사안에 대해서는 구체적으로 확인해드리기 어려움" — 장소 없음 |
| https://news.nate.com/view/20261006n00226 (중앙일보 사설 전재) | "지난 1일 … 소집된 국가안전보장회의(NSC)" — 장소 없음 |
| 게시물 출처 4건(헤럴드경제·디지털타임스·아주경제·뉴스토마토) | 업로더 31에서 확인한 대로 장소 없음 |
| 청와대·국가안보실 공식 브리핑 검색(10월 1일 NSC) | 해당 날짜 공식 브리핑 게시물 찾지 못함. 검색되는 공식 개최 보도는 7월 16일·10월 22일 회의뿐 |

- 외교부가 회의 내용 확인을 거부했고 보도는 익명 전언 기반이라, 공식 발표로 장소가 나올 가능성도 낮다.

## 3. P3-2 firstincome alt — ✅
- 사실 확인: 서울연구데이터서비스 node/60611 원 페이지 "대상지 대법원 · 세부대상지 반포대로, 대법원, 법원전시관, 대검찰청, 서초경찰서"(curl 직접 확인). 저장 사진을 직접 열어 보니 왼쪽 탑 건물 외에 오른쪽에 큰 청사 건물이 따로 있다.
- 오른쪽 건물 이름을 단정하지 않는 리뷰 77 문구를 썼다.
  - ko alt: `길 건너편에서 본 대법원 청사와 앞 도로` → `길 건너편에서 본 대법원 청사와 주변 법조단지 건물, 앞 도로`
  - en imageAlt: `The Supreme Court building seen from across the road` → `The Supreme Court building and nearby court-complex buildings seen from across the road`
- caption("대법원 청사(2020)")은 그대로 두었다.

## 4. P3-6 idaenamright — ⏸ 되돌림
- `청와대 경내 본관(2022)` / `main building in the Cheong Wa Dae compound (2022)`로 고쳐 봤지만, en caption이 **174자**(한도 160)가 됐다. 이 caption 끝에는 장소 근거 문구 `Location per Newsis reporting.`가 고정으로 붙어 있어 줄일 여지가 없다.
- 더 짧은 영어 표현(`Cheong Wa Dae compound, main building` 166자 등)도 한도를 넘어서, ko·en 둘 다 원래 문구로 되돌렸다. 파일 변경은 0이다.
- 리뷰 77이 말한 대로 기존 청와대 게시물과 같은 표기라 그대로 둬도 된다. 정밀화가 꼭 필요하면 기획자가 en 고정 문구 정책을 함께 정해야 한다.

## 5. validate
- `npm run validate:content`: exit 0. 420건 통과, 오류 0, 🟡 경고 22.
- 업로더 31 뒤 로그와 전체 출력 diff 0이라 새 경고는 0건이다.

## 6. 최종 커밋 경로
- `content/posts/2026-09-30-shindawit-nk-mdl-50-crossings.md`
- `content/posts-en/2026-09-30-shindawit-nk-mdl-50-crossings.md`
- `content/posts/2026-09-28-firstincome-kctu-spy-case-summary.md`
- `content/posts-en/2026-09-28-firstincome-kctu-spy-case-summary.md`
- `docs/triggers/uploader-32-review-77-followups-COMPLETE.md`
- `instructions/uploader/processed/32-review-77-followups.md` (이동)
- `history/2026-11-13.md` 해당 항목
- ⚠️ 작업 트리에는 다른 세션이 바꾼 `gotdemcatch`·`attendkdz` 파일이 함께 있다. 위 경로만 골라 담는다.
