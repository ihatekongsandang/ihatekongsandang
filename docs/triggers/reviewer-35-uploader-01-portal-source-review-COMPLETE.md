# 완료 트리거 — 리뷰어 35: 업로더 01 포털 출처 교체·#1 이니셜화 리뷰

**작성**: 2026-11-09 | **작성 세션**: 리뷰어 (Opus 5.5, 모델 ID claude-opus-5-5) | **오더**: `instructions/reviewer/processed/35-uploader-01-portal-source-review.md`
**리뷰**: `docs/reviews/uploader-01-portal-source-review.md` | **도구**: `docs/tools/reviewer-35/`
**제약 준수**: 대상 수정 0, git 쓰기 0, 빌드 0(validate만). 기사 HTML·HEAD 스냅숏은 저장소 밖 임시 폴더에만 두었다.

## 판정
**승인(조건 1건) — P1 0 · P2 1 · P3 3.** content·public 48경로는 그대로 커밋해도 된다. P2-1(업로더 오더 문서 1행)은 커밋 전에 고친다.

## 59건 결과 (전수, 표본 없음 — 옛 포털 59 + 새 주소 59 = 118건 수집)
| 항목 | 결과 |
|---|---|
| 새 주소 HTTP 200 | **59/59**(#7 데일리안은 1회 리다이렉트 후 200) |
| 같은 기사 | **59/59**(자동 53 + 수동 6) |
| `date` = 원 매체 게재일(KST) | **59/59**(국민일보 10-16→10-17 변경이 맞다. 조선일보 2건 유지가 맞다) |
| `name` 매체 접두 = 원 매체 | **59/59** |
| 포털 잔존 / http:// | **0 / 0** |
| 허용 출처 0 위험 8개 파일 | **8/8 해소**(16건 모두 원 매체) |
| 정정 4건 + #1 세 번째 출처 | 포털 원문으로 근거를 모두 확인했다(네이트 JSON-LD author 중앙일보·뉴시스, 다음 주소가 한겨레의 다른 기사였던 것, 데일리안 실제 제목) |
| #1 | §4.3 안과 맞다. 실명 잔존 0(ko·en·content·src·public). 공인 3인 유지가 맞다. image·thumb.jpg 삭제, updatedAt·갱신 이력 확인 |
| 변경 범위 | 45개 파일의 바뀐 줄 164줄이 모두 name·url·date |
| validate | 전·후 R=0, 🟡 22→22(같음), 이미지 alt 207→206 |
| 저장소 독립 grep | 대상 0 · 리뷰 산출물 0 |

## 결함
- **P2-1** `instructions/uploader/processed/01-portal-source-replace-and-post1-initials.md` 34행: #1 당사자의 한글 실명(태그 이름)이 있다. 커밋 전에 "중심 인물 실명 태그"로 바꾼다(슈퍼바이저).
- **P3-1** 영어본 "What reports confirm" 둘째 줄: "took K into custody"와 "; K appealed"에 직함이 없다. "the former 707th commander"를 붙인다. 다음 #1 편집 때 함께 고쳐도 된다.
- **P3-2** 업로더 트리거 §6 일부 메모가 diff와 다르다(momamour·monarch 세계일보는 접두만 바뀜, jcs 2건은 "—"로 적혔지만 주소 정정임). §7 "48개"에 문서 2개를 더하면 50이다.
- **P3-3** #7 데일리안 주소는 1회 리다이렉트된다. 이후 news 이미지 `sourcePageUrl`과 같은 문자열로 맞출 것.
- 기록만: (4) shindawit-cxmt description 170자는 원래 있던 경고다. (5) hagonolza-kimgyeri 본문 "이관"은 원문에서 "조정"이다(확인함, 범위 밖).

## 커밋 대상 경로
- **A. content·public 48**: `content/posts/*.md` 46개(업로더 트리거 §7 목록 = `git status` = HEAD 포털 파일 46), `content/posts-en/<#1 id>.md`, `public/images/<#1 id>/thumb.jpg`(삭제)
- **B. 업로더 문서 2**: `docs/triggers/uploader-01-portal-source-replace-COMPLETE.md`, `instructions/uploader/processed/01-portal-source-replace-and-post1-initials.md`(**P2-1 고친 뒤**)
- **C. 리뷰어 35**(슈퍼바이저 Read 후): `docs/reviews/uploader-01-portal-source-review.md`, `docs/tools/reviewer-35/`(6개 파일), 이 트리거, `instructions/reviewer/processed/35-uploader-01-portal-source-review.md`, `history/2026-11-09.md`(다른 세션 변경이 섞여 있으니 판단)
- **제외**: `docs/poster/guide.md`, `planning/v0.9-copy-and-code-list.md`, `history/2026-10-01.md`·`2026-11-05.md`, 그 밖의 다른 세션 파일. 경로를 지정해 커밋한다.
