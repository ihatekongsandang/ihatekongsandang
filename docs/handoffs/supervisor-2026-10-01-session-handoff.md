# 슈퍼바이저 세션 — 2026-10-01 세션 교체 핸드오프
**작성일**: 2026-10-01 | **작성 세션**: 슈퍼바이저 (Opus 5.5) | **사유**: 웹 검색 한도(세션당 200회) 소진
**인수 세션 이름**: 반공-업로더 (슈퍼바이저, Opus 5.5)

## 요약 (3줄)
- 사용자가 보내는 인스타그램·스레드 URL을 보도·법령과 대조해 게시(한국어+영어본 동시)·병합·보류·게시 불가로 처리하고, 커밋·배포·라이브 확인까지 하는 상시 업무를 이어받는다.
- 게시물 전체에 영어본이 있다(2026-10-01 기준 한국어 = 영어본, 140건 안팎). 새 게시물은 영어본을 함께 쓴다.
- 보류 건 중 '빛의위원회'(rekor) 건은 웹 검색만 되면 바로 처리 가능 — 새 세션 첫 작업.

## 산출물·기준 문서
| 경로 | 설명 |
|---|---|
| `CLAUDE.md` | 대전제·편집 정책·저장소 독립 원칙·리뷰어 게이트 |
| `content/README.md` | 게시 파일 스키마(§2·§3), 제목·요약 규칙(§5), 영어본(§9) |
| `docs/poster/guide.md` | 게시 작업 절차 요약(원문 수집 명령·파일 규칙·검증) — 슈퍼바이저도 그대로 따른다 |
| `docs/supervisor/drafts/2026-09-28-held-recheck.md` | 보류·게시 불가 기록(판단 선례). 새 판단은 이 파일 끝에 추가 |
| `history/2026-09-30.md` · `history/2026-10-01.md`(없으면 생성) | 작업 기록 |
| `instructions/translator/processed/02-english-batch-2-opus.md` | 영어 번역 체크리스트 10항목(영어본 작성 시 동일 적용) |

## 작업 절차 (건마다)
1. **원문 수집**
   - 인스타그램: `curl -sL -A "Mozilla/5.0" "https://www.instagram.com/p/{code}/embed/captioned/"` → 캡션(`class="Caption"`)·첫 이미지(`EmbeddedMediaImage`)·계정(`UsernameText`). 게시일: `curl -sL -A "facebookexternalhit/1.1" "https://www.instagram.com/p/{code}/" | grep -oE ' on [A-Z][a-z]+ [0-9]+, 20[0-9]{2}'`
   - 스레드: 공유 링크 `curl -sL -o /dev/null -w '%{url_effective}'`로 해석 → `{post}/embed`에서 `BodyTextContainer`·미디어(`t51.82787-15` 이미지, mp4). "Thread not available"이면 보류.
   - 영상 프레임: `qlmanage -t -s 800 -o . file.mp4`
   - 이미지는 반드시 Read로 직접 본다.
2. **대조**: WebSearch → 기사 `article:published_time`·`og:title`을 curl로 실측. 법령은 korean-law 도구(`search_law` → `get_law_text(mst, efYd, jo)`). 날짜 없는 출처는 넣지 않는다.
3. **판단**: 게시 / 기존 게시물에 병합(같은 사안이면 서두에 "별도 게시물 대신 여기에 함께 적습니다" + `updatedAt`, 영어본 `translatedAt` 갱신) / 보류 / 게시 불가.
   - 게시 불가 선례: 선거 부정 주장·집회 참여 독려·사생활 의혹·외모/신체 근거 암시·신원 불명 개인 계정 캡처·근거 없는 간첩/공산화 단정·의견 구호뿐인 글.
4. **작성**: `content/posts/{id}.md` + `public/images/{id}/thumb.jpg`(사적 개인·이미지 없음이면 PIL 자체 카드) + `content/posts-en/{id}.md`.
   - 섹션: 원문 주장 (게시자 의견) / 보도로 확인된 내용 / 요약에 넣지 않은 내용. 원문과 보도가 다르면 제목 "— …"로 명시.
   - 영어 description ≤160자(python `len()`), "reportedly" 유지, 인명 `Romanized (한글)`(대통령 제외), 국방장관 `Kang Shin-chul (강신철)`.
   - 태그: 한글·영소문자·숫자·하이픈만(`5·18` ✗ → `5-18민주화운동`, `625` ✗ → `6-25전쟁`). 출처명에 `:` 있으면 따옴표.
5. **검증**: `npm run --silent validate:content > /tmp/v.log 2>&1; R=$?` → R=0, 해당 id 경고 0. (`| tail -1`만 보지 않는다)
6. **커밋**: 해당 파일만 `git add`(다른 세션 작업물 섞지 않기) → 커밋 메시지 끝에 Co-Authored-By·Claude-Session 줄 → push → `api.github.com/repos/ihatekongsandang/ihatekongsandang/commits/$H/status`가 success → `/post/{id}?v=$RANDOM`·`/en/post/{id}?v=$RANDOM` 200 확인.
7. **보고**: 한국어, `---` 구분, 원문과 보도의 차이 + 출처 링크.

## 미해결·이슈 (다음 세션이 알아야 할 것)
1. **🔴 보류 — 검색 가능해지면 처리**
   - @rekor.rgt DdYPDiPAcQw '빛의위원회' 130억 예산·위원 명단 비공개(뉴데일리 9/17 단독, 정책브리핑 3/10, 조선비즈 2/9 인용). 위원 개인 이력은 이름 없이.
   - @graciahtv_official Dd8BFcdGn9O(@chanhyeokgim 카드 "우리 돈 쓰임 비공개") — 원 카드 링크 필요, 빛의위원회 건과 같은 사안인지 확인.
2. **보류 — 사용자 자료 대기**: @sharer0628(원문 열람 불가), @chanhyeokgim Dd74jvBh_86(국군의 날 연설 영상 내용 미확인), @2guaman Dc2xOtntOeN·Dd0qvezGJf_, tantanroad, vok_original, kingcong09 — 상세는 보류 기록 파일.
3. **검색 노출(2026-10-01 확인)**: 구글은 메인·태그·게시물 색인 중, 메인 스니펫이 옛 설명문 → 사용자에게 GSC "URL 검사 → 색인 생성 요청" 안내함. 네이버는 브라우저 도구 차단으로 미확인 → 사용자 확인 대기. 브랜드명 검색은 이승복 결과에 밀림.
4. **영어본 잔여 정리(선택)**: 성씨 '정' Jung/Jeong 혼재, 한국어 원본 description 160자 초과 경고 20여 건(권고 수준).
5. **후속 프로그래머 오더 후보(미발행)**: "Korean only" 접근성 이름, 핸들 정규식 오탐, 도구 tsconfig 빌드 분리, 클린 클론 게이트의 미추적 파일 처리.
6. 서브에이전트에 스크래치패드 파일을 쓰게 할 때 파일명이 겹치지 않게 한다(공용 이름 덮어쓰기 사고 1회).

## 다음 세션 가이드
- 슈퍼바이저(Opus 5.5) 새 세션이 위 문서를 Read한 뒤 1번(빛의위원회) → 사용자가 보내는 URL 순으로 처리.
- 코드·빌드 수정이 필요하면 직접 하지 말고 md오더(프로그래머 → 리뷰어).

## 참고 링크
- 사이트: https://ihatekongsandang.vercel.app · 영어: /en
- 레포: https://github.com/ihatekongsandang/ihatekongsandang

## 세션 역할 분담 (2026-10-01 사용자 결정)
| 세션 | 담당 | 하지 않는 것 |
|---|---|---|
| **반공-업로더** (Opus 5.5) | 사용자가 보내는 URL 전담 — 원문 수집·보도 대조·게시/병합/보류/게시 불가 판단·한·영 작성·`content/`·`public/images/` 커밋·배포·라이브 확인, held-recheck·history 기록 | md오더 발행, 코드·설정 변경 |
| **반공-슈퍼바이저** (Opus 5.5) | 사용자 커뮤니케이션(기능·운영), md오더 발행(프로그래머·리뷰어·테스터·기획자·디자이너·번역가), 담당 세션 완료 확인(트리거·핸드오프 Read), 리뷰어 게이트 후 코드 커밋·배포, 검색 노출·백로그·user-tasks 관리, 업로더 판단 기준(편집 정책) 정비 | URL 게시 작업(업로더에게 넘김), 코드 직접 수정 |

- 두 세션이 같은 작업 폴더·git 인덱스를 쓴다. **각자 자기 파일만 `git add <경로>` 후 바로 커밋**하고 `git add -A`·`git commit -a`는 쓰지 않는다. push 전 `git status --porcelain`으로 남의 변경이 섞이지 않았는지 확인.
- 빌드(`npm run build`)는 슈퍼바이저 쪽 담당 세션만 돌린다(업로더는 `validate:content`만).
- held-recheck·history는 둘 다 append만 한다(덮어쓰기 금지).
