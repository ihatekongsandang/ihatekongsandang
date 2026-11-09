# 프로그래머 세션 — 15-image-caption-display-validation 핸드오프
**작성일**: 2026-11-09 17:35 | **작성 세션**: 프로그래머 (Opus 5.5 — 실행 모델 ID `claude-opus-5-5`. CLAUDE.md §6은 프로그래머를 Opus 5로 적고 있으나, 실제 모델을 그대로 적는다)

## 요약 (3줄)
1. C1: 상세 사진 아래 figcaption 첫 줄에 사진 설명(ko `image.caption`, en `imageCaption`)이 나오고 그 아래에 크레딧 줄이 온다. 크레딧이 있는 public·news에만 그리므로 self caption은 화면·카드 데이터에 들어가지 않는다. 실제 content 207건 전수에서 변경 전·후 등장 횟수가 0으로 같다(1,340/1,340).
2. C2: public·news에서 caption이 없거나 비어 있으면 빌드가 멈추고, 160자를 넘으면 경고한다. 영어본 `imageCaption`은 기존 규칙에 따라 필수가 된다. C6: README를 §2.4 문안으로 바꿨다. C7: `MediaFigure`가 핫링크 깨짐을 알아 설명 줄·크레딧 줄을 함께 뺀다. 하이드레이션 전에 깨진 경우와 뒤에 깨진 경우를 실브라우저에서 모두 확인했다. P3-N1: IPv4 매핑 IPv6·CGNAT를 거부한다. 6번: reviewer-32 도구 타입 오류 3건을 고쳤고 출력은 바이트 단위로 같다.
3. 검증: 단위 117/117(양성 대조 60 FAIL 검출), 빌드 실패 11/11, 픽스처 빌드 22/22·21/21, 실브라우저 161/161, seo 799/799, 화면 마크업 799/799(RSC 차이 828건 전부 설명됨), a11y-e2e 184/184(GA 더미), copy-exact 38/38, typecheck 0, 전체 lint 0 errors, `--worktree` 게이트 통과. 마지막 빌드는 일반 빌드다.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/content/schema.ts` | `CAPTION_WARN_LENGTH`(160) · public·news `caption` 필수 오류·길이 경고 · `isReservedIpv4`(CGNAT 100.64/10 추가) · `unusableNewsImageReason`에 IPv4 매핑 IPv6 해석 |
| `src/components/card-media.tsx` | `CardMedia`에 `onRemoteFail` 콜백 · 새 클라이언트 컴포넌트 `MediaFigure`(figure + 이미지 + 깨지면 빠지는 children) |
| `src/components/post-detail.tsx` | 상세 사진 자리를 `MediaFigure`로 바꿈 · `ImageCreditCaption`이 `caption`을 받아 첫 줄(`<p data-image-caption>`)에 그림 |
| `content/README.md` | §3.1 `image` 행, §3.4 `useSourceImage` 문단, §3.6 신설(news·public 예시 분리, news에 license 없음), §8 행 2개 + 최상위 `kind` 구분 한 줄, §9 대표 이미지 한 줄 — `planning/v0.9-copy-and-code-list.md` §2.4 문안 그대로 |
| `docs/tools/reviewer-32/validate-examples.ts` | `const dir = process.argv[2] as string`(타입만 좁힘) + 주석 1줄 |
| `docs/tools/programmer-13/{unit-checks.tsx,p11-build-check.mjs,hotlink-cases.mjs,figcaption-a11y.mjs,fixtures/**}` · `docs/tools/programmer-14-1/unit-checks.ts` | C2 때문에 픽스처에 caption·imageCaption을 넣고, 크레딧 줄 기대값을 사진 설명 줄을 뺀 기준으로 맞췄다(항목 수 그대로). `figcaption-a11y.mjs`는 머리 주석만(아래 미해결 3) |
| `docs/tools/programmer-15/` | 검증 도구·출력·화면(README 참조) |

## 주요 결정사항 (자체 판단 + 근거)
1. **사진 설명은 크레딧 줄 위에 둔다.** 기획 C1은 "출처 줄 위(또는 아래)"라고만 했다. 사진이 무엇인지 먼저 읽고 누구 사진인지를 다음에 읽는 순서가 정책 §3.6 형식("…하는 모습(원 기사 사진 설명 기준)")과 이어진다. 글자 모양은 크레딧 줄과 같은 13px `text-muted-foreground`로 두었고, 대비 실측은 7.73이다. 디자인 시안에는 사진 설명 줄이 없어 디자이너 확인 대상이다.
2. **표시 조건은 `media.credit`이 있을 때(= public·news)로 둔다.** 그래서 self caption은 구조상 figcaption에 들어올 수 없다. caption은 `CardMedia`/`ImageCredit`에 싣지 않고, 상세가 `post.image.caption`을 직접 읽는다. 이렇게 하면 카드에 넘기는 데이터(`toCardView`)가 바뀌지 않고, 피드 HTML·RSC에 사진 설명이 들어가지 않는다(전수 확인 결과 사진 설명이 나오는 빌드 파일은 그 상세 .html·.rsc뿐).
3. **C2 길이는 앞뒤 공백을 뺀 `.length`(UTF-16 단위)로 센다.** `description` 160자 경고와 같은 방식이다. 160자는 통과하고 161자부터 경고한다.
4. **영어본 `imageCaption`**: "원본에 caption이 있으면 imageCaption 필수" 규칙이 이미 있다. C2로 public·news 원본 caption이 필수가 되었으므로 영어본도 필수가 되고, 공백만 있는 값도 막힌다(단위·빌드 실패로 확인). **영어 길이 경고는 넣지 않았다.** 160자는 한국어 문장을 기준으로 정한 수치라 같은 내용의 영어는 대개 더 길다. 정책에 영어 수치가 없어서 근거 없이 숫자를 정하지 않았다. 필요하면 기획에서 정한다.
5. **C7 구조**: `MediaFigure`(클라이언트)가 figure·이미지·children(서버에서 만든 figcaption)을 묶는다. `CardMedia`가 실패를 알리면 children을 뺀다. 서버 HTML에는 설명 줄이 그대로 있다(스크립트 없는 환경에서도 사진과 함께 보인다). 실패 감지는 기존 두 경로(마운트 시 `complete && naturalWidth === 0`, `onError`)를 그대로 쓰고, 두 경로 모두 실브라우저에서 확인했다. 시험용 표지 `data-media-failed`를 figure에 둔다(화면 영향 없음). `useEffect` 의존성 경고는 이전과 같은 `[media]`를 유지하려고 사유 주석과 함께 한 줄 끄기로 처리했다.
6. **P3-N1**: URL 파서는 `[::ffff:127.0.0.1]`을 `[::ffff:7f00:1]`로 바꾼다(실측). 그래서 16진 두 묶음 꼴만 풀어서 안에 든 IPv4에 기존 IPv4 규칙을 그대로 적용한다. 공인 IPv4를 담은 매핑 주소(`::ffff:203.0.113.10`)는 막지 않는다(14-1 결정 3 "공인 IP는 막지 않는다"와 같다). CGNAT도 같은 사유 문장("사설·루프백 IP 주소")을 쓴다. NAT64(`64:ff9b::/96`)는 오더 범위 밖이라 넣지 않았고, 통과 사례로 기록했다.
7. **변경 전 비교 빌드**: 작업 시작 때 있던 `.next`(15:58)는 그 뒤 수정된 게시물 1건(ko·en)이 빠져 있었다. 그래서 HEAD의 src 파일 3개를 `git show HEAD:<경로>`로 **읽기만** 해서 저장소 밖 사본 트리에 넣고, 현재 content로 빌드해 기준을 만들었다. 저장소의 git 상태(인덱스·커밋·브랜치)는 건드리지 않았다. `clean-clone-gate.sh`도 안에서 git을 읽는다.
8. **화면 산출물**: news 이미지 응답 본문으로 처음에는 저장소 이미지 첫 장을 썼다. 그런데 그 이미지가 실존 인물의 얼굴 사진이라, 가상의 사진 설명과 짝지은 화면이 남게 됐다. 그 화면은 지우고, 그 자리에서 만든 단색 PNG로 다시 찍었다.

## 미해결·이슈
1. **기획 문서 수치 차이**: `v0.9-copy-and-code-list.md` §3.2와 리뷰 32는 self caption을 206건이라고 적었다. 실측은 207건이다(207개 파일 모두 `image.caption`이 있고 빈 값 0, 서로 다른 문자열 46개). "원문 게시물 썸네일" 139건이라는 수치도, 정확히 그 문자열인 것은 65건이다(접두가 같은 변형을 세는 기준이 다른 것으로 보이며, 원 집계 방식은 확인 필요). 표시 동작에는 영향이 없다(전부 숨김).
2. **스크립트가 꺼진 환경**: 핫링크가 깨지면 깨진 이미지 표시(alt 글자)와 사진 설명이 함께 남는다. 깨짐은 브라우저 스크립트로만 알 수 있어서 서버 HTML로는 막을 수 없다. 스크립트가 켜진 일반 환경은 C7대로 숨는다.
3. `programmer-13/figcaption-a11y.mjs`(`p11-build-check.sh --serve`가 부름)는 news 픽스처 주소가 연결되지 않는다. 그래서 C7 뒤로 news 4조합의 "figcaption 있음"이 FAIL로 나오는 것이 맞다. 코드는 기록으로 두고 머리 주석에 그렇게 적었다. 실브라우저 확인은 `programmer-15/caption-browser.mjs`로 한다.
4. 디자이너 확인: 사진 설명 줄의 위치·글자 모양(결정 1), 사진 설명 줄과 크레딧 줄 사이 간격. 크레딧 줄은 링크 높이 44px 때문에 위아래 여백이 크다(`screens/*-ok-*.png`).
5. C3·C4·C5(오더 16)와 C8~C10은 손대지 않았다. 특히 C4 소개 문구 "얼굴이 식별되는 원문 썸네일은 사용하지 않고"는 그대로다. 공인 얼굴 사진 첫 묶음보다 먼저 오더 16을 배포해야 한다.
6. 확장 grep 오탐 "홍보(물)" 처리(14-1 결정 4)는 이번 산출물과 무관하다. 이번 산출물의 grep 결과는 `word-grep-output.txt`에 있다.

## 다음 세션 가이드
- **리뷰어(Opus 5.5)**: 코드 게이트. 중점은 결정 1·2(self 숨김이 구조로 보장되는지), 4(영어 길이 경고 생략), 5(`MediaFigure`·eslint 한 줄 끄기), 6(매핑 해석·NAT64 제외), 미해결 1·2. `.next`는 일반 빌드라 그대로 띄워도 된다. 실브라우저 C7은 `bash docs/tools/programmer-15/fixture-build.sh --serve`로 한다(픽스처를 넣은 별도 사본을 빌드하므로 `.next`를 건드리지 않는다). a11y-e2e GA 4건은 GA 더미 빌드가 필요하다.
- **슈퍼바이저**: 리뷰를 통과하면 트리거의 커밋 대상 경로를 커밋한다(reviewer-32 도구 포함). 업로더에게는 이 배포 뒤 public·news에 `caption`이 필수이고 영어본 `imageCaption`도 필수라는 점을 알린다(guide 반영). 기획자에게는 미해결 1의 수치를 알린다.
- **프로그래머 16**: C3·C4·C5. `copy-exact` 기대값을 갱신할 때 이 세션의 출력(38/38)이 기준이다.

## 참고 링크
- 오더 `instructions/programmer/processed/15-image-caption-display-validation.md`
- 기획 `planning/v0.9-copy-and-code-list.md` §2.4·§3.2·§3.4 · 정책 `planning/card-image-policy.md` §3.6·§8
- 리뷰 트리거 `docs/triggers/reviewer-31-1-programmer-14-1-recheck-COMPLETE.md`(P3-N1) · `docs/triggers/reviewer-32-planner-15-prd-v0.9-review-COMPLETE.md`
- 도구 `docs/tools/programmer-15/README.md`
