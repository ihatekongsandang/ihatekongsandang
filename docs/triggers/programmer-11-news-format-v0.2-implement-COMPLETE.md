# ✅ COMPLETE — 프로그래머 (Opus 5) · 11-news-format-v0.2-implement
**완료**: 2026-11-09 06:50 | 핸드오프: `docs/handoffs/programmer-11-news-format-v0.2-implement.md`
git add·commit·push 미실행. 의존성 추가 0. content/·PRD·guide·시안 수정 0.

## 임무별 완료 여부
| # | 임무 | 상태 | 근거 |
|---|---|---|---|
| 1 | 연락처 박스 교체 | ✅ | `contactEmail: null`, about ko/en "준비 중" 상자. 빌드 산출물 `example.invalid` 0파일. 실측 4페이지 × 2폭 mailto 0 |
| 2 | D1 소개 문구 | ✅ | `SITE.description` = D1 전문 126자. `SITE_EN.description` 157자. `/en/about` 헤더 = D1 영어 전문(프로그래머 번역 — 시안에 영어 문구가 없음, 리뷰어 게이트) |
| 3 | 공유 버튼 (가) | ✅ | ko/en 상세, `x.com/intent/tweet`·`www.threads.com/intent/post`. 클립보드 + `role=status`, `aria-label` 없음, sr-only 새 창 안내, origin 대체값, 영어 24건 자르기. SDK 0. GA `share` |
| 4 | 약관 `/terms`·`/en/terms` | ✅ | 6절, 메타·canonical·hreflang 3종, JSON-LD WebPage, 사이트맵 2항목, 푸터 링크, about 정정·삭제 절 끝 → terms 링크, terms → about 링크 |
| 5 | 카드 갱신 7일 | ✅ | 빌드 시점, Asia/Seoul, 0~6일. CardFooter 평문, Badge 미사용, sr-only. 경계 검증 34/34 |
| 6 | D6 자칭 금지 grep | ✅ | `src/` 전체에서 기자·속보·본지·편집국·바이라인·reporter·breaking·newsroom·byline 각 0건 |
| 7 | 검증 | ✅ | 아래 숫자 |

## 빌드·검증 숫자
- `npm run build`: 콘텐츠 검증 412건(ko 206·en 206) 통과·오류 0, 정적 페이지 799/799. 기존 content description 160자 초과 경고는 그대로(이번 변경 무관)
- `npm run typecheck`: 통과. `npm run lint`: 0 errors(경고 3건은 기존 docs/tools 파일)
- 깨끗한 복제본 게이트 `--worktree`: ✅ 통과(포함 1477파일)
- `renewal-check.ts`: 34건 PASS 34 / FAIL 0
- `share-check.ts`: 제목 412개. X 최대 279/280, 잘림 en 24 = 리뷰 25 목록과 일치(ko 0), 스레드 최대 404/500, FAIL 0
- `a11y-e2e.mjs`(헤드리스 Chrome, 로컬 `next start`, 375·1280px): 172건 PASS 172 / FAIL 0
  - 대비: 버튼 17.72, 포커스 외곽선 12.2, 갱신 7.73, 푸터 6.42
  - Tab 순서와 AX 이름 확인, 실제 클릭 복사 성공·실패, GA copy_link·x·threads
- 갱신 표시 렌더 수(빌드일 KST 2026-11-09): ko 20곳(피드 4페이지 + 태그 페이지 16 = 게시물 4건의 태그 합 16과 일치), en 4곳. 2026-10-27 갱신분(13일)은 미표시
- 화면 18장: `docs/tools/programmer-11/screens/`

## 리뷰 25 반영 표
| 항목 | 반영 | 위치 |
|---|---|---|
| P2-1 갱신 표시 Badge → 평문 | ✅ 테두리 0·배경 투명(실측) | `post-card.tsx` |
| P2-2 `aria-label` → sr-only | ✅ 보이는 축약 `aria-hidden`, AX에서 전체 날짜 읽힘 | `post-card.tsx`, `i18n.ts` `renewedSr` |
| P3-1 복사 버튼 `aria-label` 제거 | ✅ 3개 모두 없음, 이름이 상태와 함께 바뀜(실측) | `share-buttons.tsx` |
| P3-2 영어 제목 280 초과 | ✅ 가중치 자르기, 24/24 일치 | `lib/share.ts` |
| P3-3 `window.location.origin` 대체 | ✅ | `share-buttons.tsx` |
| P3-5 경계·시간대 | ✅ 0~6일, Asia/Seoul(UTC+9 고정) | `lib/content/renewal.ts` |
| P3-6 `PostCardView.updatedAt` | ✅ | `lib/content/view.ts` |
| P3-9 about → terms 링크 위치 | ✅ 정정·삭제 요청 절 끝 | about ko/en |
| P3-10 새 창 sr 안내 | ✅ 기존 `opensInNewTab` 문구 | `share-buttons.tsx` |
| P3-4·7·8·11 | 범위 밖(시안·기획 문서 정정). P3-8 문안 밖 문장은 핸드오프 결정 3에 목록화 | — |
| §9-1 약관 지금 공개 | ✅ 슈퍼바이저 판단 1대로 공개, 사이트맵·푸터·상호 링크 ON | — |

## 리뷰어 확인 요청
- 영어 D1 번역의 의미 동등성
- 문안 밖 문장 4개
- 소개·약관 문구 불일치 2건(개인정보·매체 등록)
- 약관 "위 4항" 번호
- X 말줄임 시 인용부호

상세는 핸드오프 '미해결'을 본다.

## 커밋 대상 경로
```
src/lib/config.ts
src/lib/i18n.ts
src/lib/analytics.ts
src/lib/seo.ts
src/lib/share.ts
src/lib/content/view.ts
src/lib/content/renewal.ts
src/components/share-buttons.tsx
src/components/page-section.tsx
src/components/post-detail.tsx
src/components/post-card.tsx
src/components/site-footer.tsx
src/app/sitemap.ts
src/app/llms.txt/route.ts
src/app/(ko)/about/page.tsx
src/app/(en)/en/about/page.tsx
src/app/(ko)/terms/page.tsx
src/app/(en)/en/terms/page.tsx
docs/tools/programmer-11/   (README.md, renewal-check.ts·-output.txt, share-check.ts·-output.txt, a11y-e2e.mjs·-output.txt, build-output.txt, build-output-ga-dummy.txt, gate-worktree.log, screens/*.png 18장)
docs/handoffs/programmer-11-news-format-v0.2-implement.md
docs/triggers/programmer-11-news-format-v0.2-implement-COMPLETE.md
instructions/programmer/processed/11-news-format-v0.2-implement.md   (이동)
history/2026-11-09.md   (이 세션 기록 append)
```
작업 트리에 있는 다른 미추적·수정 파일(`docs/user-tasks.md`, `history/2026-10-01·10-05·11-05`, `history/2026-10-02·10-03`, `docs/tools/planner-07/*`, tester-01 관련)은 이번 범위가 아니다. 경로를 지정해 커밋한다.
