# 완료 트리거 — 프로그래머 (Opus 5) · 12-terms-about-copy-sync

**완료일**: 2026-11-09 11:20 | **오더**: `instructions/programmer/processed/12-terms-about-copy-sync.md` | **핸드오프**: `docs/handoffs/programmer-12-terms-about-copy-sync.md` | **도구**: `docs/tools/programmer-12/`
기능 변경 없음. content·planning·guide·시안 수정 없음. 새 의존성 없음. git 사용 안 함. 빌드는 이 세션만 했다.

## #1~#9 전 → 후 (화면 문구, 엔티티 풀어 씀)
| # | 파일·위치 | 전 | 후 |
|---|---|---|---|
| 1 | `src/app/(ko)/terms/page.tsx` anonymous 마지막 문장 | 운영자와의 연락은 위 4항의 연락 경로를 통해서만 가능합니다. | 운영자와의 연락은 위 ‘정정·삭제 요청 방법과 처리 기준’ 절의 연락 경로를 통해서만 가능합니다. (링크 없음, 평문) |
| 2 | `src/app/(en)/en/terms/page.tsx` 같은 위치 | The only way to reach the operator is through the contact channel in Section 4. | The only way to reach the operator is through the contact channel in the “How to request a correction or removal, and how we handle it” section above. (링크 없음) |
| 3 | `src/app/(ko)/about/page.tsx` correction 절 `contactEmail` null 분기, 준비 중 상자 아래 `p.text-xs text-muted-foreground` | (없음) | 아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다. |
| 4 | `src/app/(en)/en/about/page.tsx` 같은 분기 | (없음) | The handling standards below apply once the contact channel is finalized. |
| 5 | ko 약관 sourcing 셋째 `<li>` | 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **기사 요약이나 본문을 그대로 옮기지 않습니다**. | 모든 게시물에 원문 출처 링크를 표시합니다. 요약은 운영자가 직접 쓰고, 기사 문장은 필요한 부분만 짧게 인용합니다 — **운영자가 쓰는 요약과 본문에는 기사 요약이나 본문을 그대로 옮기지 않습니다**. 다만 상세 페이지의 ‘원문 미리보기’에는 원문이 공개한 메타 정보(제목·요약)가 인용 표시와 함께 고치지 않은 그대로 나올 수 있으며, 그 사실을 같은 자리에 밝혀 둡니다. |
| 6 | en 약관 sourcing 셋째 `<li>` | Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **we never copy a news article’s summary or body text**. | Every post links to its original source. We write the summary ourselves and only quote short phrases where needed — **the summaries and text we write never copy a news article's summary or body text**. The “Original post preview” box on a post page may show the title and summary the source itself published, unedited and labeled as quoted, with a note saying so. (⚠️ 아포스트로피 ’→' 1자 변경, 기획 원문 글자 그대로 — 핸드오프 결정 1) |
| 7 | ko 약관 sourcing 둘째 `<li>` 끝 | …미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다. | …단독 근거로 쓰지 않습니다. 소개 문구의 “신문법 등에 따라 등록된 매체”는 위 기준 전체를 줄여 부른 표현입니다. 매체 종류에 따라 근거 법령과 절차(등록·허가·승인 등)가 다르며, 근거 법령은 위에 적은 대로입니다. |
| 8 | en 약관 sourcing 둘째 `<li>` 끝 | …Unregistered outlets, independent media, and YouTube channels are not used as a sole basis. | …not used as a sole basis. The phrase “outlets registered under Korea's Act on the Promotion of Newspapers and related laws” in the About intro is shorthand for this whole standard. The legal basis and procedure (registration, license, approval, etc.) differ by type of outlet; the governing laws are as named above. |
| 9 | ko·en 약관 h1 바로 다음 `p.text-xs text-muted-foreground` | (없음) | ko `최종 개정: <time dateTime="2026-11-09">2026-11-09</time>` · en `Last updated: <time dateTime="2026-11-09">2026-11-09</time>` — 값은 상수 `SITE.termsLastUpdated`(`src/lib/config.ts`) 하나. JSON-LD에는 `dateModified`가 없어서(2블록 중 0개) 추가하지 않음 |

## 검증 숫자
- 문구 대조 `copy-exact-check.py`(기대값 = sync §6 표 직접 읽기, 최종 일반 빌드 HTML): **38건 PASS 38 · FAIL 0** — #1~#8 위치·전문, 굵게 범위 2, 각 1회 6, 옛 문구 0 4, #8 인용 ⊂ `SITE_EN.aboutIntro`(소스·`/en/about`)·`/en/terms` 따옴표째, #9 10항목, #3·#4 null 분기 소스 위치 2
- **`og.description` 사용: 0** — content/posts 0/207 · content/posts-en 0/207(키 0·값 0·줄 grep 0, 양성 대조 og 블록 207·siteName 207 검출)
- D6 금지어 9종 × 변경 5파일(파일 전체·diff 추가 줄): **0** · 저장소 독립 패턴(pre-commit 훅) × 5파일: **0** · `docs/tools/programmer-12/`: **0**
- a11y-e2e(11-1 사본 + 8줄): **184건 PASS 184 · FAIL 0**. 기존 176개 라벨은 11-1과 같다. 약관·소개 항목은 **76건**(11-1은 68건, 신규 = 개정일 줄 ko/en × 2폭 4 + 처리 기준 문장 ko/en × 2폭 4). 새 문장 대비는 "본문 글자 대비 4.5 미만 0" 8건 PASS에 포함된다
- typecheck exit 0 · lint 0 errors / 4 warnings(기존 reviewer 도구) · build 검증 414건(207+207) 통과·콘텐츠 경고 22(기존과 같음)·정적 801/801 · GA 더미 빌드 801/801 · **clean-clone-gate `--worktree` 통과**
- 최종 `.next` = 일반 빌드(`G-TEST000000` 0건), copy-exact-check 재실행 38/38
- 참고: 리뷰 27 재현 도구 재실행 시 정방향 ko 27/29·en 27/29. MISS 4는 이번에 바꾼 옛 문장(#1·#5·#2·#6)이고, 기획 문안 본문이 개정 전 문장이라 생긴다(핸드오프 미해결)

## 🔴 리뷰어 게이트 대상
#5·#6 약관 약속 완화 · 핸드오프 결정 1(#6 `'`)·2(링크 미삽입) · #9 날짜 = 배포일(배포가 11/10 이후면 상수 갱신 필요)

## 커밋 대상 경로
- `src/app/(ko)/terms/page.tsx`
- `src/app/(en)/en/terms/page.tsx`
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `src/lib/config.ts`
- `docs/tools/programmer-12/` (README.md · copy-exact-check.py·-output.txt · og-description-count.mjs·-output.txt · word-grep.sh · word-grep-output.txt · a11y-e2e.mjs·-output.txt · reviewer-27-reproduce-rerun.txt · typecheck-output.txt · lint-output.txt · build-output.txt · build-output-ga-dummy.txt · gate-worktree.log · screens/ 18장)
- `docs/handoffs/programmer-12-terms-about-copy-sync.md`
- `docs/triggers/programmer-12-terms-about-copy-sync-COMPLETE.md`
- `instructions/programmer/processed/12-terms-about-copy-sync.md`
- `history/2026-11-09.md`
