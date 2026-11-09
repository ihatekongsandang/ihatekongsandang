# 완료 트리거 — 프로그래머 (Opus 5.5) · 13-card-image-schema-credit

**완료일**: 2026-11-09 14:43 | **모델 ID**: claude-opus-5-5 (오더 표기는 Opus 5 — 실제 실행 모델을 적는다) | **오더**: `instructions/programmer/processed/13-card-image-schema-credit.md` | **핸드오프**: `docs/handoffs/programmer-13-card-image-schema-credit.md` | **도구**: `docs/tools/programmer-13/`
content·public/images·planning·guide·design·카드 UI 수정 없음. 새 의존성 없음. git 명령 사용 없음(게이트 스크립트 내부 제외). 빌드는 이 세션만 했다.

## P별 완료
| P | 상태 | 내용 |
|---|---|---|
| P1 스키마 | ✅ | `PostImage` + `kind`·`creditName`·`creditNameEn`·`sourcePageUrl`·`license`·`retrievedAt`·`faceNote`. news만 https `src`, 포털 도메인 거부(`src`·`sourcePageUrl`), self·public은 `/images/` |
| P2 검증 | ✅ | news: `sourcePageUrl` ∈ `sources[].url`(글자 그대로) + 그 출처 type `언론`, 크레딧·확인일·faceNote 필수, license 금지 / public: kogl-1만·kogl-3 오류(P5 미구현)·크레딧·sourcePageUrl·확인일·faceNote 필수 / public·news는 `url` 유형의 `image`에만(`images[]`·사진 유형 오류) / kind 생략 = self, 기존 207건 통과 |
| P3 resolveCardMedia | ✅ | news → `remote`, alt = `image.alt`, `CardMedia.credit`(public·news만, self는 이전 모양) |
| P4 상세 figcaption | ✅ | ko `사진: {creditName}` / en `Photo: {creditNameEn}` + 원 페이지 링크(`rel="noopener"`, 새 창, sr-only 안내). public은 `(공공누리 제1유형)` + 공식 문구 요지. 카드 무변경 |
| P6 핫링크 렌더 | ✅ | `<img>` 직접 참조 유지, `referrerpolicy` 속성 0. Referrer-Policy 현황 아래 |
| P7 CSP | ✅ 확인만 | `img-src 'self' data: https:` — 단 헤더는 **`Content-Security-Policy-Report-Only`**(강제 아님). 변경 없음 |
| P9 점검 스크립트 | ✅ | `npm run check:hotlinks` — prebuild와 분리, 종료 코드 항상 0, 본문 저장 안 함 |
| P11 구조화 데이터 | ✅ | JSON-LD·sitemap·og:image/twitter:image에 A·B 이미지 0(단위 + 픽스처 빌드 전수), 공유 OG는 자체 이미지 |
| P5·P8·P10·P12 | 범위 밖 | P12 `content/README.md` 문안은 핸드오프에 초안만 |

## 검증 숫자
- 단위(`unit-checks.tsx`): **104건 PASS 104 · FAIL 0** (통과 9·거부 41·포털 판정 13·카드 6·영어본 6·렌더 23·P11 6 등). 양성 대조: 규칙 2곳을 일부러 지우면 16건 FAIL
- 픽스처 빌드(`p11-build-check.sh --serve`, 게시물 209·영어본 209, 정적 806/806): **22건 PASS 22** — HTML 798·RSC 798 전수, og:image·twitter:image 메타 7,970개·JSON-LD 2,339블록·sitemap에 픽스처 이미지 0, og:image 전부 자체 주소, 기존 상세 414개 크레딧 figcaption 0
- 실브라우저 figcaption: **52건 PASS 52** — ko/en × news/public × 375·1280, 글자 대비 7.73·링크 6.7, 링크 AX 이름, 가로 스크롤 없음, 연결 불가 핫링크 → 플레이스홀더
- 기존 출력 불변(`html-parity.mjs`, 변경 전 빌드 ↔ 최종 빌드): **799/799 같음** (빌드 ID·해시 자산·번들러 청크 참조만 정규화). 양성 대조 2/2 검출
- 핫링크 판정 경로(`hotlink-cases.mjs`, 로컬 https): **10건 PASS 10**, 종료 코드 0 / 실제 content: news 0건·종료 코드 0
- a11y-e2e(12 사본): **184건 PASS 184 · FAIL 0**, 라벨 184개 12와 같음
- 회귀: programmer-05 단위 53/53 · programmer-06 단위 35/35
- typecheck exit 0 · 변경 범위 lint(`src scripts docs/tools/programmer-13 next.config.ts`) 0 problems · build 검증 414건 통과·경고 22(변경 전과 같은 목록)·정적 801/801 · 대표 이미지 종류 self 207 · public 0 · news 0
- 🔴 **`npm run lint`(전체) 7 errors · clean-clone-gate `--worktree` 실패(lint 단계)** — 오류 7건 전부 `docs/tools/designer-04-A/build.mjs`(디자이너 세션 미추적 도구, 이번 변경 무관). 같은 복제본에서 그 폴더만 lint에서 빼고 재현: lint 0 errors · build 통과(`gate-worktree.log`)
- 저장소 독립 패턴: 변경 파일 7개 0 · 이 도구 폴더 0 · 홈 절대경로 0 · D6 금지어 18조합 0 (양성 대조 1)

## Referrer-Policy 현황
`strict-origin-when-cross-origin` — `vercel.json` 선언 1곳. 로컬 `next start`·배포 도메인(`curl -I` 1회) 응답 모두 같은 값. 외부 핫링크 요청에는 사이트 출처만 Referer로 간다. 변경 없음.

## 🔴 리뷰어 게이트 대상
핸드오프 결정 1(public·news를 `url` 유형 `image`로 제한)·2(글자 그대로 대조 + 언론 type)·3(포털 목록)·9(점검 스크립트 Referer) · 미해결 1(전체 lint·게이트 실패 — 디자이너 도구) · 미해결 4(미리보기 안내문 정확성)

## 커밋 대상 경로
- `src/lib/content/schema.ts`
- `src/lib/content/translation.ts`
- `src/lib/i18n.ts`
- `src/components/post-detail.tsx`
- `scripts/check-hotlinks.ts` (신규)
- `scripts/validate-content.ts`
- `package.json`
- `docs/tools/programmer-13/` (README.md · unit-checks.tsx·-output.txt · tsconfig.json · fixtures/posts 2·posts-en 2 · p11-build-check.sh·.mjs·-output.txt · figcaption-a11y.mjs · screens-figcaption/ 8장 · html-parity.mjs·-output.txt · check-hotlinks-output.txt · hotlink-cases.mjs·-output.txt · headers-output.txt · a11y-e2e.mjs·-output.txt · screens/ 18장 · build-output.txt · build-output-ga-dummy.txt · gate-worktree.log · typecheck-output.txt · lint-output.txt · lint-changed-output.txt · regression-unit-output.txt · word-grep.sh·-output.txt)
- `docs/handoffs/programmer-13-card-image-schema-credit.md`
- `docs/triggers/programmer-13-card-image-schema-credit-COMPLETE.md`
- `instructions/programmer/processed/13-card-image-schema-credit.md`
- `history/2026-11-09.md`
