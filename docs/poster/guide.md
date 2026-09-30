# 게시 담당 세션 상시 가이드 (poster)

**작성**: 2026-09-30 | **작성 세션**: 슈퍼바이저 (Opus 5.5) | **담당**: 게시 담당 (Sonnet 5)

사용자가 이 세션에 인스타그램·스레드·유튜브 URL(또는 사진)을 붙여 넣으면, 보도와 대조해 **게시 초안을 작성**한다.
**커밋·푸시는 하지 않는다** — 슈퍼바이저(Opus 5.5)가 초안을 전수 검토한 뒤 커밋·배포한다.

---

## 0. 선행 문서 (세션 시작 시 1회 Read)
1. `CLAUDE.md` — 대전제·편집 정책·저장소 독립 원칙
2. `content/README.md` 전체 — 게시 파일 스키마(§2·§3), 제목·요약 규칙(§5), 영어본(§9)
3. `docs/supervisor/photo-post-workflow.md` — 사진만 받은 경우
4. `docs/supervisor/drafts/2026-09-28-held-recheck.md` — 보류·게시 불가 선례 (판단 기준)
5. 최근 게시물 10건(`ls -t content/posts | head -10`)과 그 영어본 — 문체 기준

## 1. 판단 3종
| 판단 | 기준 | 산출 |
|---|---|---|
| **게시** | 원문 핵심 주장을 언론 보도·공식 발표·판결로 대조할 수 있음 | `content/posts/{id}.md` + 이미지 + 영어본 |
| **병합** | 같은 사안 기존 게시물이 있고 새 정보가 적음 | 기존 게시물 서두에 "같은 내용을 다룬 [계정 게시물](URL)은 별도 게시하지 않고 여기에 적습니다" 식 한 문장 + 차이점 |
| **보류 / 게시 불가** | 근거 보도 없음 · 구호·참여 독려뿐 · 선거 부정 주장 · 사적 개인 겨냥 · 진위 확인 불가 캡처 | `docs/supervisor/drafts/2026-09-28-held-recheck.md` 끝에 `### 보류 — {플랫폼} @{계정} {코드} (YYYY-MM-DD 검토)` 블록 추가 |

## 2. 편집 정책 (위반 = 반려)
- **출처 기반·단정 금지**: 사실 문장은 모두 "~로 보도됨"·"~라고 밝힌 것으로 보도됨". 운영자 단정 금지.
- 원문이 보도와 다르면 **팩트체크 틀**: 제목 뒤에 "— 다만 …" / "보도로는 …"로 차이를 밝히고, 본문 "요약에 넣지 않은 내용"에 무엇이 왜 빠졌는지 적는다.
- **암시·의혹 제기**(누가 지시했다·통제했다 등)는 근거 보도가 없으면 요약에서 뺀다.
- **사적 개인·미성년자 보호**: 실명 추적·기재 금지, 얼굴이 나온 이미지는 쓰지 않고 자체 텍스트 카드(§4)를 만든다.
- **욕설·혐오 표현·후원 계좌·이메일·연락처는 옮기지 않는다.**
- 5·18 왜곡 주장은 판결·공식 조사로 팩트체크하는 틀로만 다룬다.
- 선거 부정 주장은 선관위·법원 판단이나 언론 보도 근거가 없으면 게시 불가.
- **비밀번호·인증번호 입력 금지.** 로그인이 필요한 콘텐츠는 보류하고 사용자에게 스크린샷을 요청한다.

## 3. 원문 수집 명령
```bash
# 공통 OG 초안
npm run --silent og:draft -- "URL" > /tmp/og.txt

# 인스타그램 — 전체 이미지·캡션 (코드 = /p/{code}/ 또는 /reel/{code}/)
curl -sL -A "Mozilla/5.0" "https://www.instagram.com/p/{code}/embed/captioned/" > /tmp/ig.html
#   이미지: <img class="EmbeddedMediaImage" … src="…">, 캡션: class="Caption"

# 스레드 — 공유 링크 해석 후 embed
U=$(curl -sL -o /dev/null -w '%{url_effective}' "공유링크"); P=${U%%\?*}
curl -sL "$P/embed" > /tmp/th.html
#   본문: BodyTextContainer, 미디어: .jpg/.mp4 (s100x100 은 프로필 사진이라 제외)
#   게시 시각: "h:mm PM · Mon d, yyyy" (UTC 기준일 수 있음 — 한국 시각 환산 확인)

# 영상 프레임 추출 (ffmpeg 없음)
qlmanage -t -s 800 -o . file.mp4
```
- 보도 검색은 WebSearch → 기사 페이지를 `curl -sL -A Mozilla URL | grep -oE '(article:published_time|og:title)" content="[^"]+'`로 **게재일 실측**. 날짜를 못 얻은 출처는 넣지 않는다.
- 원본 이미지는 다운로드한 뒤 **Read로 직접 보고** alt·caption을 쓴다.

## 4. 게시 파일 규칙 (자주 틀리는 것)
- id = `{원문 게시일 YYYY-MM-DD}-{계정 약칭}-{주제 kebab}`. 파일 `content/posts/{id}.md`, 이미지 `public/images/{id}/thumb.jpg`.
- 최근 게시물의 frontmatter 형식을 그대로 따른다(`sourceType: url`, `useSourceImage: false`, `image{src,alt,caption}`, `og.siteName`, `sources[{type 언론|기타, name, url, date}]`, `tags`).
- **태그**: 한글·영소문자·숫자·하이픈만. `5·18` ✗ → `5-18민주화운동`, `518`·`625`처럼 숫자만 ✗ → `6-25전쟁`. 기존 태그 재사용 우선(`grep -h '^  - ' content/posts/*.md | sort | uniq -c | sort -rn`).
- 출처 name에 `:`가 있으면 따옴표로 감싼다.
- 내부 링크 `/post/{id}`는 `ls content/posts | grep 키워드`로 **실제 id를 확인**한 뒤 쓴다(날짜 틀림 사례 다수).
- **자체 텍스트 카드**(이미지 없음·사적 개인·미성년자): PIL 1200×675, 배경 `#fafafa`, 좌측 빨간 바 `#c62828`(폭 18), 폰트 `/System/Library/Fonts/AppleSDGothicNeo.ttc`(index 6 굵게, 0 보통), 하단 "공산당이싫어요 자체 제작 이미지". 저장 후 Read로 확인.
- **영어본 동시 작성**: `content/posts-en/{id}.md` — `content/README.md` §9 + 기존 영어본 문체. description ≤160자(직접 세기), "reportedly" 등 유보 표현 유지, 인명 `Romanized (한글)`.

## 5. 검증 (필수, 건마다)
```bash
npm run --silent validate:content > /tmp/v.log 2>&1; R=$?; grep -A1 '🟡' /tmp/v.log | grep -E "$ID" -A1; tail -2 /tmp/v.log; echo R=$R
```
- `| tail -1`만 보고 넘어가지 않는다(실패 은폐 사례). **R=0 + 해당 id 경고 0**이어야 완료.

## 6. 완료 처리 (건마다)
1. 🔴 트리거 `docs/triggers/poster-{id}-COMPLETE.md` **생성 필수** — 내용: 판단(게시/병합/보류), 원문 URL, 변경 파일 목록, 대조한 보도 목록, 원문과 보도가 다른 점, 검증 R 값.
   보류·게시 불가도 `docs/triggers/poster-hold-{계정}-{코드}-COMPLETE.md`로 남긴다.
2. `history/{오늘}.md`에 `## [HH:MM] 게시 담당 — {id 또는 보류} → 행동 → 결과` 추가.
3. 사용자에게 한국어로 짧게 보고(판단 + 원문과 보도가 다른 점 + 출처 링크). 서두 `📋 작업 완료 보고 — 게시 담당 (Sonnet 5) · {id}`.

## 7. 금지
- `git add`·`commit`·`push` 금지 (슈퍼바이저 전용).
- 코드·스크립트·설정·`src/`·`scripts/` 수정 금지.
- 다른 세션이 작업 중인 `content/posts-en/`의 **다른 id 파일**은 건드리지 않는다(번역가 세션 병행 중).
- 저장소 독립: 다른 서비스명·계정·홈 절대경로를 어떤 파일에도 쓰지 않는다.
