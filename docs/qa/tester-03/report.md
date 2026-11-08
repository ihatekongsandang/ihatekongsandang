# 테스터 03 — 배포본 QA: v0.2 뉴스형 전환(공유 버튼·약관·소개·카드 갱신)

**측정일**: 2026-11-09 | **측정자**: 테스터 (Sonnet 5) | **대상**: `https://ihatekongsandang.vercel.app`(배포 프로덕션, 커밋 ba699e3)
**오더**: `instructions/tester/processed/03-deployed-news-format-v0.2.md` | **선행 검토**: 리뷰어 26·26-1, 프로그래머 11·11-1 핸드오프, 기획자 09 scope·terms-page-copy, 테스터 02

---

## 0. 판정 요약

**통과** — 오더 임무 1~6 전수 검사 **209건 · PASS 209 · FAIL 0**. 375px·1280px 두 폭 모두 확인했다.

| 항목 | 결과 |
|---|---|
| 공유 버튼(링크 복사·X·스레드, ko/en, 실제 클릭) | 결함 0건. 전수 Tab 순회(ko 35개·en 28개)도 DOM 순서와 완전 일치 |
| 약관 `/terms`·`/en/terms` | 문안·"준비 중"·상호 링크·메타(canonical·hreflang 3종)·h2 6개 전부 일치, 결함 0건 |
| 소개 `/about`·`/en/about` | 고친 문장 3곳(P2-1·P2-2·en aboutIntro) 신규 문구 포함·옛 문구 0건, `example.invalid`·mailto 0 |
| 카드 갱신 표시(전수) | ko·en 각 **207건 전체 피드(18페이지) 순회** → 5건·같은 id, 독립 재계산과 완전 일치. sr-only·대비(7.73:1) 확인 |
| 키보드·접근성 | 상세·약관·소개 ko/en 전부 전수 Tab 순회 = DOM 순서 일치, `:focus-visible` 전부 표시. 본문·푸터·갱신 표시 대비 전부 4.5 이상 |
| 회귀(홈 피드·태그 내비·영어 피드·이미지) | 결함 0건 |
| 확인 필요 | 실제 VoiceOver 음성·iOS Safari 실기기(§7), GA 실제 네트워크 전송 자체(§1 각주 — 운영 데이터 오염 방지로 대체 확인) |
| 신규 결함 | **0건**(P1/P2/P3 전부) |

도구·전체 로그: `docs/tools/tester-03/README.md`, `docs/tools/tester-03/e2e-deployed-output.txt`.
🔴 claude-in-chrome 확장이 이 세션에서 **연결되지 않았다**(`list_connected_browsers` = `[]`, 재시도 2회 동일) — 대신 헤드리스 Chrome+CDP로
실제 Chrome에서 전수 실측했다(사유·방법은 README 참조, programmer-11·tester-02의 같은 선례).

---

## 1. 공유 버튼 (임무 1) — ko·en 상세, 375px·1280px

대상: `/post/2026-10-02-alaska-lng-vs-dmz-mine-response`(ko, 예산 안 — X에 `text` 있음) ·
`/en/post/2026-10-02-alaska-lng-vs-dmz-mine-response`(en, 예산 초과 — 리뷰 25가 측정한 24건 중 1, X에 `text` 없음·`url`만).

| 확인 항목 | 결과 |
|---|---|
| X href `url` = canonical, `text` = 제목 그대로(ko) | ✅ |
| X href `text` 없음·쿼리 키 `url` 하나(en, 예산 초과) | ✅ |
| 스레드 href `url`·`text` = 제목 그대로(ko·en 둘 다 — 스레드는 500자 한도라 자르지 않음) | ✅ |
| 실제 마우스 클릭(디스패치) → 링크 복사: 클립보드 값 = 페이지 절대 URL | ✅ (ko·en) |
| 버튼 문구 "복사됨"/"Copied" → 2초 뒤 "링크 복사"/"Copy link"로 복귀 | ✅ |
| `role=status` 안내 "링크가 복사되었습니다."/"Link copied." → 2초 뒤 빈 값 | ✅ |
| GA `share` 이벤트(`copy_link`·`x`·`threads`, `method`·`content_type: 'post'`[·`language: 'en'`]) — `dataLayer`로 확인(§GA 각주) | ✅ |
| Tab 3회 = 공유 3버튼 순서, `:focus-visible` 외곽선 2px solid | ✅ |
| **상세 페이지 전체 전수 Tab 순회**(헤더·본문 링크·공유·배경 보도·관련 게시물·태그·푸터 전부) = DOM 순서와 완전 일치 | ✅ ko 35개 · en 28개, 둘 다 FAIL 0 |

두 폭(375·1280) 모두에서 href·버튼 구조 동일(링크 URL은 폭과 무관). 실제 클릭·Tab 순회는 375px 1회로 충분하다고 판단했다
(JS 동작은 뷰포트에 의존하지 않는다 — 판단 근거는 핸드오프 참조).

---

## 2. 약관 `/terms`·`/en/terms` (임무 2)

| 확인 항목 | 결과 |
|---|---|
| h1·h2 6개(운영 목적·직접 취재하지 않음·출처 원칙·정정·삭제 요청 방법과 처리 기준·익명 운영과 연락 경로·게시물 성격 / 영어 대응) | ✅ |
| "연락 창구 준비 중" 상자(`contactEmail: null`이라 이메일 아님) | ✅ |
| about↔terms 상호 링크(본문 링크로 확인) | ✅ |
| 푸터 "이용약관"/"Terms" 링크, 대비 6.42:1 | ✅ |
| `example.invalid`·`mailto:` 0건 | ✅ |
| meta canonical·hreflang(ko·en·x-default 3개) | ✅ |
| 본문 글자 대비 4.5 미만 0건, 가로 스크롤 없음 | ✅ |
| 전수 Tab 순회(ko 9개·en 8개) = DOM 순서 일치, `:focus-visible` 전부 표시 | ✅ |

---

## 3. 소개 `/about`·`/en/about` (임무 3)

고친 문장 3곳(프로그래머 11-1, 리뷰 26 P2 반영) 전수 확인:

| 문장 | 신규 문구 포함 | 옛 문구 0건 |
|---|---|---|
| P2-1 개인정보("가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다") | ✅ | ✅ |
| P2-2 매체 구분(언론사/뉴스통신사/방송사업자 근거 법률 분리) | ✅ | ✅ |
| en aboutIntro 3문장("We do not make definitive claims about how far the facts have been established…") | ✅ | ✅ |

`example.invalid`·`mailto:` 0건, 그 외 §2와 같은 메타·대비·Tab 전수 순회 항목 전부 PASS(ko 10개·en 9개).

---

## 4. 카드 갱신 표시 — 전수(임무 4)

**전체 규모와 검사 수**: `content/posts/*.md` 207건 전부. 피드 페이지네이션 ko·en 각 **18페이지**(1페이지 12건 × 17 + 마지막 1페이지 3건 = 207건)를
**1페이지부터 18페이지까지 전부** 순회해 갱신 표시가 붙은 카드를 모두 모았다(샘플 갈음 없음).

**독립 재계산**: 앱 로직(`src/lib/content/renewal.ts`)과 무관하게 `content/posts/*.md` frontmatter의 `updatedAt`을 직접 파싱하고,
오늘(시스템 시계 기준 Asia/Seoul) `2026-11-09`로부터 7일 이내(0~6일 전)인 건을 독립적으로 계산했다 — `updatedAt` 보유 31건 중 **5건**:

| id | updatedAt | 경과일 |
|---|---|---|
| 2026-08-29-idontknowpolitics-martial-law-nk-policy | 2026-11-09 | 0일 |
| 2026-09-10-freedominnovation-nec-bill | 2026-11-08 | 1일 |
| 2026-09-28-drumtong119-jinsungjoon-nsl-past | 2026-11-08 | 1일 |
| 2026-09-30-hagonolza-lee-case-dismissal-two-routes | 2026-11-08 | 1일 |
| 2026-10-05-issueradar-nsc-cyber-sanctions-clash | 2026-11-08 | 1일 |

(이 5건은 모두 영어본이 있어 en 피드에도 같은 `updatedAt`이 상속되어 표시된다 — `src/lib/content/translation.ts`가 `updatedAt`을 공유 필드로
원본에서 그대로 가져온다는 것을 코드로 확인했다.)

실측 결과 **ko·en 둘 다 정확히 5건**, id·날짜까지 독립 재계산과 **완전 일치**(하나도 더하거나 빠지지 않음). 세부:

| 확인 항목 | 결과 |
|---|---|
| 갱신 카드 수 = 5건(ko·en 각각) | ✅ |
| id 집합 일치(독립 재계산 대비) | ✅ |
| 평문(테두리 0·배경 투명·`aria-label` 없음 — Badge 아님) | ✅ |
| 보이는 축약 표기(ko "11/08 갱신" 등 · en "Updated Nov 8" 등) | ✅ 5건 전부 |
| sr-only 전체 날짜(ko "최근 갱신: 2026년 11월 8일" · en "Recently updated: Nov 8, 2026") | ✅ 5건 전부 |
| `dateTime` 속성 = frontmatter 값 | ✅ 5건 전부 |
| 글자 대비 | ✅ 7.73:1(5건 전부 동일 — `text-muted-foreground`) |

**태그 페이지는 추가로 순회하지 않았다.** 갱신 표시는 `toCardView()`가 게시물 데이터(`updatedAt`)와 빌드 시점만으로 정하는 순수 함수라
어느 목록(피드·태그)에 나오든 같은 카드가 같은 상태로 그려진다(`src/components/post-card.tsx` 확인) — 피드 전수 순회가 이미
전체 카드 모집단(ko 207·en 207)을 한 번씩 다 덮는다. 태그 페이지를 또 순회하면 같은 카드를 중복 확인하는 것이라 범위에서 뺐다.

---

## 5. 키보드·접근성 (임무 5)

대상: 상세·약관·소개 ko/en, 375px·1280px.

| 확인 항목 | 결과 |
|---|---|
| 상세 페이지 전수 Tab 순회(ko 35개·en 28개) = DOM 순서 일치 | ✅ |
| 약관·소개 전수 Tab 순회(9·8·10·9개) = DOM 순서 일치(두 폭 모두) | ✅ |
| 모든 이동에서 `:focus-visible` 외곽선 표시(2px 이상 solid) | ✅ 전부 |
| 공유 버튼 Tab 순서·외곽선 | ✅ (§1) |
| 본문·푸터·갱신 표시 색 대비(WCAG 상대휘도 계산) | ✅ 전부 4.5:1 이상(갱신 표시 7.73:1, 푸터 6.42:1) |

axe-core·Lighthouse 자체는 설치·실행하지 않았다 — claude-in-chrome 미연결로 그 도구를 돌릴 통로가 없어, 위의 DOM 전수 순회·
WCAG 대비 직접 계산으로 대신했다(README §왜 헤드리스로 대신했나). **확인 필요**: 실제 VoiceOver 음성(macOS·iOS)·iOS Safari 실기기
— 이 환경에 음성 재생·실기기가 없다(tester-01·02와 같은 한계, §7).

---

## 6. 회귀 (임무 6)

| 확인 항목 | 결과 |
|---|---|
| 홈 피드(ko) 카드 로드(12개) | ✅ |
| 홈 피드(en) 카드 로드(12개) | ✅ |
| 태그 내비(ko) 존재 | ✅ |
| 태그 내비(en) 부재(의도된 동작 — 한국어 태그 페이지로 보내지 않기 위함) | ✅ |
| 이미지 전부 로드 완료(`complete`, ko·en 각 12개) | ✅ |
| 태그 칩 실제 클릭 → `/tag/dmz` 이동 | ✅ |

tester-01·02가 다룬 이미지 로딩·태그 nav 핵심 항목과 일치하며 새로 생긴 회귀는 없다.

---

## 7. 확인 필요 요약

| 항목 | 사유 |
|---|---|
| 실제 VoiceOver 음성(macOS·iOS) | 이 환경에 음성 재생 기능 없음(tester-01·02 동일 한계). 대체: 전수 Tab 순회·`:focus-visible`·sr-only 텍스트 직접 대조(§4·§5)로 간접 확인 |
| iOS Safari 실기기 | 이 환경에 실기기 없음 |
| GA 실제 네트워크 전송(`google-analytics.com/g/collect` 요청 자체) | 운영 중인 실제 GA4 속성이라 테스트 클릭으로 실제 수집 데이터를 오염시키지 않으려고 해당 도메인을 의도적으로 차단했다. 대신 `dataLayer` 실제 push(코드의 `gtag()` 호출까지 실행됐음)로 "전송 시도"를 확인했다(README §GA 이벤트 확인 방법) |
| claude-in-chrome 확장 자체 | 이 세션에서 연결 0건(`list_connected_browsers` = `[]`). 헤드리스 Chrome+CDP로 대체(선례 있음) |

---

## 8. 결함 목록

신규 결함 **0건**(P1/P2/P3 전부). 기존 결함 이월 없음(이번 오더 범위에 이전 결함 항목 없음).

---

## 9. 산출물

- `docs/qa/tester-03/report.md`(본 문서)
- `docs/qa/tester-03/*.png`(3장 — 공유 ko/en 모바일, 홈 피드 회귀)
- `docs/tools/tester-03/README.md`, `e2e-deployed.mjs`, `e2e-deployed-output.txt`, `screens/*.png`(3장)
- `docs/handoffs/tester-03-deployed-news-format-v0.2.md`
- `docs/triggers/tester-03-deployed-news-format-v0.2-COMPLETE.md`
