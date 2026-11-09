# 완료 트리거 — 리뷰어 (Opus 5.5) · 27-planner-11-v0.2-decisions-sync-review

**완료일**: 2026-11-09 | **리뷰 보고서**: `docs/reviews/planner-11-v0.2-decisions-sync-review.md` | **도구**: `docs/tools/reviewer-27/terms-copy-reproduce.py`

## 판정
**조건부 승인** — P1 0 · P2 1 · P3 7. P2-1 한 줄을 기획자가 고친 뒤 커밋한다. 슈퍼바이저가 그 행을 Read로 확인하면 되고 재리뷰는 필요 없다.

## 결함
- **P2-1** `planning/prd.md` 76행: "카드 갱신 표시 추가 여부는 사용자가 아직 결정하지 않았다"가 남아 있어 5a와 모순된다. 삭제하거나 "5a로 확정"으로 바꾼다(커밋 전 필수).
- P3-1 PRD 366행·scope §1 표 2행이 `/terms`를 아직 "제안"이라 부른다 → "확정"으로.
- P3-2 sync §4.2 ko 변경안의 주어·서술어가 맞지 않는다 → 아래 #5로 대체.
- P3-3 #8 en 인용이 실제 `aboutIntro`와 다르다("outlets", "Korea's" 빠짐) → 아래 #8로 대체.
- P3-4 D1 풀이가 법령 확인 결과(방송사업자는 허가 중심)를 드러내지 않는다 → 아래 #7·#8로 대체.
- P3-5 절 이름에 「」(약관에서 법령명 전용)를 썼다 → ‘’로(#1).
- P3-6 약관 약속을 완화하는데 개정일 표기가 없다 → 권장(선택): "최종 개정: YYYY-MM-DD" / "Last updated: YYYY-MM-DD"를 넣을지 슈퍼바이저가 판단.
- P3-7 문서 정리: terms-copy §C "§4-2"→"§4.2". sync §5·§8과 트리거의 "법령 확인 필요"는 리뷰 27 §4로 해소. PRD "(오더 11·…)"는 "프로그래머 오더 11"로.

## 확인 결과
- 사실 정합: 4c·5a, 0~6일·빌드 시점·UTC+9·평문, X 256(=280−1−23), 영어 D1, `/terms` 경로를 소스와 대조했다. 사용자 결정과 슈퍼바이저 판단은 따로 적혀 있다 ✅(P2-1·P3-1 제외).
- P3-8 재현: 정방향 ko 29/29·en 29/29, 누락·불일치 0. 역방향으로 뽑은 문안 밖 문장은 §A·§B 기록과 빠짐없이 일치하고, §B 10건도 모두 사실이다.
- `og.description` 사용 0/207(재측정).
- 법령(한국 법령 조회 도구, 현행본): 뉴스통신사업자는 **등록**(뉴스통신법 제2조3호·제8조①). 방송사업자 중 지상파·종합유선·위성·공동체라디오는 **허가**, 방송채널사용사업자는 등록·신고·승인(방송법 제2조3호·제9조①②⑤⑪, 2027-04-21 시행예정본도 제9조 같음). 신문·인터넷신문은 등록(신문법 제9조①). → 약관 §3 현행은 법령과 맞다. D1의 "등록된"은 방송사업자에게 문자 그대로 맞지 않아 풀이 문장을 고쳐 승인했다.
- 저장소 독립 grep 0건.

## 승인된 코드 반영 최종 문구 — 8/8 승인(원안 3: #2·#3·#4, 수정 5: #1·#5·#6·#7·#8)
엔티티 관례: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`. 굵게 범위는 현행을 따른다.

| # | 파일·위치 | 현행 | 변경안 |
|---|---|---|---|
| 1 | `src/app/(ko)/terms/page.tsx` `anonymous` 절 마지막 문장 | 운영자와의 연락은 위 4항의 연락 경로를 통해서만 가능합니다. | 운영자와의 연락은 위 ‘정정·삭제 요청 방법과 처리 기준’ 절의 연락 경로를 통해서만 가능합니다. (`#correction` 링크는 선택) |
| 2 | `src/app/(en)/en/terms/page.tsx` 같은 위치 | The only way to reach the operator is through the contact channel in Section 4. | The only way to reach the operator is through the contact channel in the “How to request a correction or removal, and how we handle it” section above. (링크 선택) |
| 3 | `src/app/(ko)/about/page.tsx` `correction` 절 `contactEmail` null 분기, 준비 중 상자 아래(`text-xs text-muted-foreground`) | (없음) | 아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다. |
| 4 | `src/app/(en)/en/about/page.tsx` 같은 분기 | (없음) | The handling standards below apply once the contact channel is finalized. |
| 5 | `src/app/(ko)/terms/page.tsx` `sourcing` 셋째 `<li>` | 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **기사 요약이나 본문을 그대로 옮기지 않습니다**. | 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다**. 다만 상세 페이지의 ‘원문 미리보기’에는 원문이 공개한 메타 정보(제목·요약)가 인용 표시와 함께 고치지 않은 그대로 나올 수 있으며, 그 사실을 같은 자리에 밝혀 둡니다. |
| 6 | `src/app/(en)/en/terms/page.tsx` `sourcing` 셋째 `<li>` | Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **we never copy a news article's summary or body text**. | Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **the summaries and text we write never copy a news article's summary or body text**. The “Original post preview” box on a post page may show the title and summary the source itself published, unedited and labeled as quoted, with a note saying so. |
| 7 | `src/app/(ko)/terms/page.tsx` `sourcing` 둘째 `<li>` 끝에 덧붙임 | …미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다. | (뒤에 추가) 소개 문구의 “신문법 등에 따라 등록된 매체”는 위 기준 전체를 줄여 부른 표현입니다. 매체 종류에 따라 근거 법령과 절차(등록·허가·승인 등)가 다르며, 근거 법령은 위에 적은 대로입니다. |
| 8 | `src/app/(en)/en/terms/page.tsx` `sourcing` 둘째 `<li>` 끝에 덧붙임 | …Unregistered outlets, independent media, and YouTube channels are not used as a sole basis. | (뒤에 추가) The phrase “outlets registered under Korea's Act on the Promotion of Newspapers and related laws” in the About intro is shorthand for this whole standard. The legal basis and procedure (registration, license, approval, etc.) differ by type of outlet; the governing laws are as named above. |

- #5·#6(약관 약속 완화): 독자에게 실질적으로 불리하지 않다. 미리보기 자리의 라벨과 안내문이 고지로 충분하다. **반영 배포 전까지 게시물에 `og.description`을 넣지 않는다.** 반영 오더에서 0/207을 다시 잰다.
- 반영 후 글자 단위로 대조하고(#8 인용 ↔ `SITE_EN.aboutIntro` 포함), 약관 개정분은 `planning/terms-page-copy.md` §C로 되돌려 적는다.

## 사용자 결정 필요
1. 🔴 연락 창구 확정(기존 미결, `docs/user-tasks.md` §5).
2. 신규 필수 없음. 알림만: D1의 "등록된 매체"는 방송사(허가)에 문자 그대로 맞지 않고, 약관 풀이 문장으로 보완한다. D1을 바꿀지는 원할 때만 결정(리뷰어 비권장).
3. (슈퍼바이저) P3-6 개정일 표기를 넣을지.

## 커밋 대상 경로 (P2-1 수정 후)
- `planning/prd.md`
- `planning/news-format-v0.2-scope.md`
- `planning/terms-page-copy.md`
- `planning/v0.2-post-release-sync.md`
- `docs/triggers/planner-11-v0.2-decisions-sync-COMPLETE.md`
- `instructions/planner/processed/11-v0.2-decisions-sync.md`
- `docs/reviews/planner-11-v0.2-decisions-sync-review.md`
- `docs/tools/reviewer-27/terms-copy-reproduce.py`
- `docs/triggers/reviewer-27-planner-11-v0.2-decisions-sync-review-COMPLETE.md`
- `instructions/reviewer/processed/27-planner-11-v0.2-decisions-sync-review.md`
- `history/2026-11-09.md`
