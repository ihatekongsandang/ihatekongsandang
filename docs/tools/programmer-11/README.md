# 프로그래머 11 — 검증 도구·결과 (v0.2 뉴스형 전환 구현)

모두 저장소 루트에서 실행한다. 절대경로 없음.

| 파일 | 내용 | 결과 |
|---|---|---|
| `renewal-check.ts` → `renewal-check-output.txt` | 카드 갱신 7일 판정 경계(0·1·6·7·8·−1일), 형식 오류, 월·연·윤년 경계, KST 자정 전후, `TZ` 4종에서 같은 결과, `toCardView` 실림 여부, 표시 문자열 | 34건 PASS 34 · FAIL 0 |
| `share-check.ts` → `share-check-output.txt` | 제목 전체(ko 206 + en 206 = 412)를 X·스레드 intent에 넣어 검사: X 가중치 ≤ 280, 잘린 목록 = 리뷰 25 측정 24건과 일치, 말줄임·앞부분 일치, 인코딩 왕복, 엔드포인트, 스레드 500자 | FAIL 0 · X 최대 279 · 잘림 ko 0 / en 24(일치 ✅) · 스레드 최대 404 |
| `a11y-e2e.mjs` → `a11y-e2e-output.txt` | 헤드리스 Chrome(CDP, `programmer-04/cdp.mjs` 재사용, 추가 의존성 없음)으로 로컬 프로덕션 서버를 375px·1280px 두 폭에서 실측. 상세 ko/en: 위치·AX 이름·`aria-label` 없음·새 창 sr 안내·44px·글자 넘침·가로 스크롤·대비·Tab 순서·`:focus-visible` 외곽선·실제 마우스 클릭 복사(클립보드 값·status 문구·이름 변화·2초 복귀)·실패 경로·GA `share` 이벤트(copy_link·x·threads). 피드 `/?page=4`·`/en?page=4`: 갱신 표시 평문(테두리·배경·`aria-label` 없음)·sr-only 전체 날짜가 AX 트리에서 읽힘·축약 표기는 안 읽힘·대비. `/about`·`/en/about`·`/terms`·`/en/terms`: `example.invalid`·mailto 0, 준비 중 상자, 상호 링크, 푸터 약관 링크, 본문·푸터 대비, `h2` 6개, `lang` | 172건 PASS 172 · FAIL 0 |
| `screens/*.png` | 위 실측 때 찍은 화면 18장(상세·복사 실패·피드 갱신·소개·약관, 모바일/데스크톱) | — |
| `build-output.txt` | 최종 `npm run build`(prebuild validate 포함) | 검증 412건 통과 · 정적 페이지 799/799 |
| `build-output-ga-dummy.txt` | GA 이벤트 실측용 빌드(`NEXT_PUBLIC_GA_ID=G-TEST000000`) | 799/799 |
| `gate-worktree.log` | `docs/tools/programmer-07/clean-clone-gate.sh --worktree` | ✅ 게이트 통과(npm ci → typecheck → lint 0 errors → build) |

## 실행 방법
```bash
npx tsx docs/tools/programmer-11/renewal-check.ts
npx tsx docs/tools/programmer-11/share-check.ts
# GA 이벤트까지 보려면 측정 ID가 있는 빌드가 필요하다(없으면 trackEvent가 no-op).
NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3011 &
node docs/tools/programmer-11/a11y-e2e.mjs http://127.0.0.1:3011
```

## 접근성 실측 요약 (WCAG 2.2 AA)
| 항목 | 실측값 |
|---|---|
| 공유 버튼 글자 대비 | 17.72:1 (3개 × ko/en × 2폭) |
| 포커스 외곽선 | `:focus-visible` 2px solid, 흰 배경 대비 12.2:1 |
| Tab 순서 | header 마지막 링크 → 링크 복사 → X에 공유 → 스레드에 공유 (ko/en) |
| 접근성 이름 | 버튼 "링크 복사"/"Copy link" → 복사 뒤 "복사됨"/"Copied"(보이는 텍스트와 같이 바뀜, 2.5.3). 링크 "X에 공유 (새 창에서 열림)" 등 |
| 상태 알림 | `role=status aria-live=polite`, 처음엔 빈 값 → 성공/실패 문구 → 2초 뒤 비움. `alert()` 없음 |
| 터치 영역 | 44px(공유 버튼 3개 모두) |
| 375px 레이아웃 | 버튼 글자 넘침 0, 페이지 가로 스크롤 0(상세·소개·약관) |
| 갱신 표시 대비 | 7.73:1(`text-muted-foreground`), 테두리 0·배경 투명 |
| 갱신 표시 스크린리더 | AX 트리 StaticText "최근 갱신: 2026년 11월 8일"/"Recently updated: Nov 8, 2026" 읽힘, "11/08 갱신" 안 읽힘 |
| 푸터 링크 대비 | 6.42:1 |
| 소개·약관 본문 | 4.5:1 미만 글자 0 |

⚠️ 사진형 상세는 실측하지 못했다 — 현재 `content/posts/`에 `sourceType: photo`·`photo_text` 게시물이 0건이다(grep 확인). 공유 버튼은 유형과 관계없이 같은 자리(header 뒤)에 같은 컴포넌트로 그려진다(`post-detail.tsx`).
⚠️ Claude in Chrome 확장은 이번 세션에서 응답하지 않아(`tabs_context_mcp` 시간 초과) 위 헤드리스 CDP 도구로 대신 실측했다.
