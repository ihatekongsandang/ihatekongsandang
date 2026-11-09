# 프로그래머 세션 — 13-card-image-schema-credit 핸드오프
**작성일**: 2026-11-09 14:43 | **작성 세션**: 프로그래머 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`. 오더·CLAUDE.md §6은 프로그래머를 Opus 5로 적고 있으나 이 세션의 실제 모델은 5.5라 사실대로 적는다)

## 요약 (3줄)
1. 대표 이미지 `image`에 `kind`(self/public/news)·크레딧·확인일·`faceNote`를 더하고 검증 규칙(포털 거부, `sourcePageUrl` ∈ `sources[]`, public은 kogl-1만, kogl-3 오류)을 넣었다. 기존 207건은 그대로 통과하고 빌드 출력 799개가 변경 전과 같다(정규화 후 799/799).
2. news → `remote`(`<img>` 직접 참조, alt = `image.alt`), 상세에만 figcaption `사진: {creditName}` / `Photo: {creditNameEn}` + 원 페이지 링크(public은 공공누리 유형 + 공식 문구 요지). 카드 UI·`referrerpolicy`·CSP·`next.config` 무변경.
3. 비차단 `npm run check:hotlinks` 추가. 픽스처 빌드로 og:image·JSON-LD·사이트맵에 A·B 이미지 0을 고정 확인. 단위 104/104, 빌드 통합 22/22, 브라우저 52/52, 핫링크 경로 10/10, a11y-e2e 184/184. 🔴 clean-clone-gate `--worktree`는 **디자이너 04-A 미추적 도구의 lint 오류 7건**으로 실패(제외 재현 시 통과).

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/content/schema.ts` | `IMAGE_KINDS`·`IMAGE_LICENSES`·`PORTAL_HOSTS`·`isPortalUrl`·`ImageCredit`, `PostImage` 필드 7개, `validateImageEntry` 규칙, `CardMedia.credit`, `resolveCardMedia` news → remote |
| `src/lib/content/translation.ts` | `localizePost`가 영어본 `image`에 kind·크레딧·확인일·faceNote를 원본에서 그대로 가져옴(alt·caption만 번역값). 이전 동작(영어 캡션 없으면 캡션 없음) 유지 |
| `src/components/post-detail.tsx` | `ImageCreditCaption` — 링크형 상세 원문 미리보기의 이미지를 `<figure>`로 감싸고 figcaption. credit 없는 이미지(self)는 이전 마크업 그대로 |
| `src/lib/i18n.ts` | `photoCreditLabel`·`koglType`·`koglNotice`·`photoSourceLink` ko/en |
| `scripts/check-hotlinks.ts` · `package.json` | `npm run check:hotlinks` (빌드·prebuild와 분리, 종료 코드 항상 0) |
| `scripts/validate-content.ts` | 요약에 "대표 이미지 종류: self N · public N · news N" 한 줄 추가(검사 규칙 변화 없음) |
| `docs/tools/programmer-13/` | 검증 도구·출력·픽스처·화면 26장(README 참조) |

## 주요 결정사항 (자체 판단 + 근거)
1. **public·news는 대표 이미지 `image`에만, 그리고 `sourceType: url` 게시물에만 허용**(그 밖은 오류). 근거: `images[]`는 갤러리가 next/image(최적화 프록시)로 그려 news 핫링크 금지(리뷰 30 L1·L4)에 걸리고 크레딧 표시가 없다. 사진 유형 상세는 `images[]`만 그려 대표 이미지의 크레딧이 화면에 나오지 않는다. 현재 207건 전부 `url` 유형이고 B 대상도 같은 게시물들이다. 사진 유형에 필요해지면 갤러리 크레딧 구현과 함께 연다.
2. **news의 `sourcePageUrl`은 `sources[].url`과 글자 그대로 같고 그 출처 `type`이 `언론`이어야 한다.** 정책 B-1 "그 게시물의 `sources[]`에 들어 있는 언론 기사". 정규화(쿼리 제거 등)는 다른 기사를 같은 것으로 볼 수 있어 하지 않았다(앞뒤 공백만 제거). `sourceUrl`(게시물 원문, 대부분 SNS)은 대상이 아니다 — 정책 문언대로.
3. **포털 목록**(하위 도메인 포함): `naver.com`·`naver.net`·`pstatic.net`·`daum.net`·`daumcdn.net`·`kakaocdn.net`·`nate.com`·`nateimg.co.kr`·`zum.com`. news의 `src`·`sourcePageUrl`, public의 `sourcePageUrl`에 적용. 이미지 CDN도 포털 전재 이미지라 함께 막았다. `blog.naver.com` 등 포털 블로그도 걸린다(의도). 목록 확정은 리뷰어 판단 대상.
4. **`faceNote`는 public·news에서 무조건 필수**(오더 문언). 얼굴 없는 사진은 "얼굴 없음(건물)"처럼 적는다. 화면에는 나오지 않는다.
5. **news에 `license`가 있으면 오류**, self에 크레딧 필드가 있으면 경고만(무시). `kind` 오타는 오류.
6. `PostImage.kind`는 타입상 선택(`undefined` = self). 검증을 거친 값은 항상 채워진다. 이유: 기존 측정 도구(programmer-05·06)의 손으로 만든 픽스처가 깨지지 않게(두 도구 53/53·35/35 그대로).
7. **figcaption 위치·모양**: 원문 미리보기 상자 안 이미지 바로 아래, `text-xs text-muted-foreground`(기존 상자 안 문구와 같은 토큰). 크레딧 이름은 평문, 링크는 "사진 출처 기사"/"Source article"(public은 "사진 원문 페이지"/"Original page") — 크레딧 이름을 링크 문구로 쓰면 "예시일보 (새 창에서 열림)"만으로는 어디로 가는지 알기 어려워서. `ExternalLink` 재사용(`rel="noopener"`, 아이콘 + sr-only 안내).
8. **공공누리 공식 문구는 요지만**: `본 저작물은 {creditName}에서 공공누리 제1유형으로 개방한 저작물을 이용하였습니다.` 정책 A-3 예시의 `{작성연도}`·`'{저작물명}'`은 스키마에 필드가 없어 넣지 않았다(아래 미해결 2).
9. **핫링크 점검의 Referer**: 브라우저가 이 사이트에서 보내는 값과 같게 사이트 출처(origin)만 싣는다(`Referrer-Policy: strict-origin-when-cross-origin`). 차단을 피하려는 값이 아니라 브라우저에서 깨지는지를 똑같이 재현하려는 것이다. 사이트 주소는 `NEXT_PUBLIC_SITE_URL`(없으면 `.env.local`). 본문은 받지 않는다(HEAD, 실패 시 GET 후 스트림 즉시 취소).

## P6·P7 현황
- **Referrer-Policy**: `strict-origin-when-cross-origin` — `vercel.json` 한 곳 선언, 로컬 `next start`(next.config가 같은 선언 적용)와 배포 도메인 `curl -I` 1회 모두 같은 값(`headers-output.txt`). 핫링크 요청에는 이 사이트의 출처(`https://{도메인}/`)만 Referer로 간다. 바꾸지 않았다. `<img>`에 `referrerpolicy` 속성 없음(단위·빌드 HTML·브라우저 확인).
- **CSP**: `Content-Security-Policy-Report-Only`(강제 아님)의 `img-src 'self' data: https:` — 외부 https 이미지 허용. 바꾸지 않았다. ⚠️ 헤더가 Report-Only라는 점은 오더 문구("CSP img-src https: 확인")에 없던 사실이라 알린다.

## 미해결·이슈
1. 🔴 **`npm run lint`(저장소 전체)·clean-clone-gate가 지금 실패한다.** 원인: `docs/tools/designer-04-A/build.mjs`(디자이너 세션, 미추적, 13:41 생성)의 `react-hooks/rules-of-hooks` 오류 7건. 이 오더 범위 밖이라 손대지 않았다. `--worktree`·`--staged` 어느 쪽이든 그 파일이 트리에 있으면 막힌다. 처리안(슈퍼바이저 결정): 디자이너가 도구를 고치거나, `eslint.config.mjs` ignores에 `docs/tools/designer-*/**`처럼 넣는 별도 오더, 또는 그 도구를 커밋하지 않기.
2. 공공누리 공식 문구 전문에는 `작성연도`·`저작물명`이 필요하다. 필드 추가 여부(예: `workTitle`·`workYear`)는 기획자 결정(P12와 함께).
3. 크레딧 필드를 "사진 권리자"와 "기사 매체"로 나눌지(리뷰 30 수정표 #17)는 미결. 지금은 `creditName` 하나(기사 속 사진 크레딧이 확인되면 그 표기, 없으면 언론사명 — 정책 B-2).
4. 원문 미리보기 상자 아래 안내문 "원문의 메타 정보(제목·요약·썸네일)만 인용하며…"는 news(다른 근거 기사의 사진)·public(공공저작물) 이미지에는 정확하지 않다. 문구는 기획 영역이라 그대로 두었다 → 기획자 검토 필요.
5. 핫링크가 깨져 플레이스홀더로 바뀌어도 figcaption(크레딧 줄)은 남는다(브라우저 실측 — `CardMedia` 실패 상태가 클라이언트 안에만 있어서). 크레딧과 원 기사 링크가 남는 것이라 해롭지 않다고 판단했지만, 숨기려면 `CardMedia` 구조를 바꿔야 해 카드 UI와 함께 다루는 편이 낫다(오더 14).
6. `.env.local`의 `NEXT_PUBLIC_SITE_URL`이 `http://localhost:3000`이라 로컬에서 `check:hotlinks`를 돌리면 Referer가 localhost가 된다. 실제 배포 조건으로 보려면 `NEXT_PUBLIC_SITE_URL=https://ihatekongsandang.vercel.app npm run check:hotlinks`.
7. 기존 `og.image` + `useSourceImage` 핫링크 경로(현재 0건)는 바꾸지 않았다 — 크레딧 없음·일반 alt 그대로(단위 확인).
8. a11y-e2e 세부 값 3줄(모바일 상세 `:focus-visible` 외곽선 실측 색)이 12의 출력과 다르다. 두 출력 모두 PASS이고 12에서도 같은 항목이 프레임마다 다른 값을 보였다(전환 중 색을 잰 것으로 보이나 원인은 확인 안 함).

## P12 — `content/README.md` 갱신 문안 초안 (반영하지 않음, 기획자·슈퍼바이저 검토용)
**§3.1 표 `image` 행 교체**
| `image` | | `{kind, src, alt, caption, creditName, creditNameEn, sourcePageUrl, license, retrievedAt, faceNote}` | 카드 대표 이미지. `kind`를 생략하면 `self`(운영자 제작 이미지). 공공누리·언론 기사 사진은 아래 §3.6 |

**§3.4 `useSourceImage` 판단 기준 문단 교체**
> 🔴 `useSourceImage`(원문 썸네일)는 지금도 `false`로 둔다. 카드에 실제 사진을 쓸 때는 `useSourceImage`가 아니라 `image.kind: public`·`news`(§3.6)를 쓴다. 인물 사진은 PRD v0.9의 얼굴 기준(2안: 공인의 공적 활동 사진 허용, 비공인·미성년자·피해자·부상 장병 제외)을 따르고 근거를 `faceNote`에 적는다.

**§3.6 신설 — 대표 이미지 `image.kind`**
```yaml
image:
  kind: news                       # self(생략 시) | public | news
  src: https://…/og-image.jpg      # news: 근거 기사 og:image(https 핫링크, 내려받지 않는다) · self·public: /images/{id}/…
  alt: "사진에 보이는 사실만 쓴 문장"
  creditName: 예시일보               # public·news 필수. 기사 속 사진 크레딧이 확인되면 그 표기
  creditNameEn: Example Daily      # public·news 필수
  sourcePageUrl: https://…         # public·news 필수. news는 이 게시물 sources[]의 언론 기사 url과 글자 그대로 같아야 한다
  license: kogl-1                  # public만 필수. kogl-1만 받는다(kogl-3은 아직 막혀 있다)
  retrievedAt: 2026-11-09          # public·news 필수. 확인일
  faceNote: 공인(현직 국회의원) 공적 활동 — 원 기사 사진 설명 기준   # public·news 필수. 얼굴 없으면 "얼굴 없음(건물)"
```
- public·news는 `sourceType: url` 게시물의 `image`에만 쓴다. `images[]`(사진 유형 갤러리)는 self만 받는다.
- 포털(네이버·다음·네이트·줌 계열, 이미지 CDN 포함) 주소는 `src`·`sourcePageUrl` 모두 막힌다. 원 매체 기사를 쓴다.
- 상세 페이지 이미지 아래에 `사진: {creditName}` + 원 페이지 링크가 자동으로 나온다(영어 상세는 `creditNameEn`). 카드에는 나오지 않는다. 공유 미리보기(OG)·구조화 데이터에는 들어가지 않는다.
- 이미지를 내릴 때는 `image` 블록을 지우고 배포하면 된다(플레이스홀더로 바뀐다).
- 깨진 핫링크 점검: `npm run check:hotlinks`(빌드를 막지 않는다. 주 1회 권장 — 리뷰 30 §4-3).

**§8 표에 추가**
| `image.kind` 값 오류, news `src`가 https 아님·포털, `sourcePageUrl`이 `sources[]` 언론 기사와 다름·포털, public·news 필수 필드 누락, public `license`가 kogl-1 아님, news에 `license`, `images[]`나 사진 유형에 public·news | 빌드 중단 |
| self 이미지에 크레딧 필드 | 경고만 |
(§8의 "폐지된 필드 … `kind`"는 **최상위** `kind`(게시물 종류)다. `image.kind`와 다르다는 한 줄을 덧붙이는 것을 권한다.)

**§9 영어본**: `imageAlt`는 news·public에서도 필수(기존 규칙 그대로). 크레딧은 영어본에 따로 적지 않는다 — 원본의 `creditNameEn`이 쓰인다.

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: 코드 게이트. 중점 — 결정 1(사진 유형·`images[]` 차단), 2(글자 그대로 대조·언론 type 요구), 3(포털 목록), 9(Referer), 미해결 1(lint·게이트 실패 원인이 이번 변경이 아님을 `gate-worktree.log` 2차 재현으로 확인). 실행: `docs/tools/programmer-13/README.md`의 명령.
- **슈퍼바이저**: 미해결 1 처리 결정(커밋 전 게이트가 막힌다). 리뷰 통과 후 커밋 대상은 트리거의 경로 목록.
- **기획자**: 미해결 2·3·4, P12 초안 검토(PRD v0.9 뒤).
- **업로더**: 배포 전에는 `image.kind`를 쓰지 말 것(리뷰 30 착수 조건 1-2).
- **프로그래머 14**: 카드 UI 변경 시 미해결 5(깨진 핫링크 뒤 크레딧 줄) 함께 검토.

## 참고 링크
- 오더: `instructions/programmer/processed/13-card-image-schema-credit.md`
- 정책: `planning/card-image-policy.md` §2.2·§4.2·§5 · 리뷰 30: `docs/reviews/card-image-policy-legal-review.md` §4-2
- 도구: `docs/tools/programmer-13/README.md`
