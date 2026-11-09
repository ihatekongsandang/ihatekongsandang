# ✅ 프로그래머 16-1 완료 — 리뷰 36 지적 반영 (C11 커밋 B 전)

- **완료**: 2026-11-09 23:45
- **실행 세션**: 프로그래머 · 실제 모델 ID `claude-opus-5-5` (Opus 5.5)
- **오더**: `instructions/programmer/processed/16-1-review-36-fixes.md`
- **핸드오프**: `docs/handoffs/programmer-16-1-review-36-fixes.md` · **도구**: `docs/tools/programmer-16-1/`
- git 쓰기 0. `content/posts*`·`public/` 수정 0. `history/2026-10-01.md`·`2026-11-05.md` 수정 0.

## 항목별 결과
| 항목 | 결과 |
|---|---|
| P2-1 | ✅ f는 frontmatter `id`(`koIds`)만 본다. 파일명은 `koFileNames`·`enFileNames`로 나눠 e에만 쓴다. `zz-new.md` + id `zz-new-typo` 사례를 단위(맥락 2 + 디스크 1 + 음성 2 + 메시지 1)·돌연변이(되돌림 2 + 메시지 1)·빌드 실패(npm·직접 각 `[f]`, 음성 둘 다 통과) 시험에 넣었다. 리뷰어 36 재현 5번이 이제 PASS |
| P3-1 | ✅ `readTranslationIds(root, moved = readMovedIds(root))`: 0건이면 영어본을 읽지 않고 빈 집합을 돌려준다. YAML 오류는 `content/posts-en/<파일>: …` 형식으로 다시 던진다(`cause` 유지). 추가로 gray-matter 캐시 때문에 두 번째 읽기에서 오류가 사라지는 문제를 피했다(옵션 객체). 검증 스크립트는 그 오류를 받아 보고서에 싣는다 |
| P3-3 | ✅ `docs/tools/programmer-16/word-grep.sh` 5행 주석을 다시 썼다. 20행 검색식은 조각을 이어 만든다(조립 결과 = 원래 정규식, True). 16·16-1 폴더 전체에서 홈 디렉터리 접두·임시 경로 글자 grep 0줄(`word-grep.sh` ②·⑤) |
| P3-4 | ✅ `retired-ids.ts` import 뒤 빈 줄 1개 |
| P3-2 | 손대지 않음(디자이너 확인 대상) |

## 바꾼 파일
- 코드: `src/lib/content/moved-ids.ts` · `next.config.ts` · `scripts/validate-content.ts` · `src/lib/content/load.ts` · `src/lib/content/retired-ids.ts`
- 문서: `content/README.md`(§6-1 f 행)
- 도구: `docs/tools/programmer-16/word-grep.sh` · `docs/tools/programmer-16/unit-checks.ts` · `docs/tools/programmer-16/mutation-check.sh`(typecheck 통과용 맥락 필드·e 치환 글자) · `docs/tools/programmer-16-1/`(신규)
- 기록: 이 트리거 · 핸드오프 · 오더 이동 · `history/2026-11-09.md` 항목 1개

## 검증 수치 (최종 코드 기준)
| 검사 | 결과 |
|---|---|
| 단위 `programmer-16-1/unit-checks.ts` | **61/61** |
| 돌연변이 `programmer-16-1/mutation-check.sh` | **25/25 검출** |
| 빌드 실패 `programmer-16-1/build-fail.sh` | **32/32**(16사례 × npm·직접) |
| 픽스처 시험표 `programmer-16/fixture-build.sh` | **45/45** |
| Vercel 환경 `programmer-16/vercel-env-check.sh` | **4/4** |
| 회귀: 16 단위 · 16 돌연변이 · 리뷰어 36 엣지 | **46/46 · 16/16 · 14/14** |
| typecheck · lint | exit 0 · **0 errors**(경고 17, 이전과 같음) |
| `validate:content` | 418건 통과 · 옮긴 id 0건 · 규칙 0개 · 오류 0 |
| a11y-e2e(GA 더미 빌드) | **184/184**, 라벨이 프로그래머 16과 같음 |
| 최종 일반 빌드 | 정적 **804/804** · GA 더미 잔존 0 · 리다이렉트 = Next 내장 1개뿐 |
| `clean-clone-gate.sh --worktree` | **통과** |
| 저장소 독립 `programmer-16-1/word-grep.sh`(글자 파일 90개) | 훅 패턴 0 · 절대/임시 경로 0 · 옛 #1 id 0 · 이름 로마자 0 · 양성 대조 각 1 |

## 커밋 B 최종 경로 목록
**코드·문서 (8)**
- `src/lib/content/moved-ids.ts`(신규) · `content/moved-ids.txt`(신규) · `next.config.ts` · `scripts/validate-content.ts` · `src/lib/content/load.ts` · `src/lib/content/retired-ids.ts` · `src/lib/content/schema.ts` · `content/README.md`

**프로그래머 16 기록**
- `docs/tools/programmer-16/`(전체, 이번에 고친 3개 포함) · `docs/handoffs/programmer-16-copy-terms-breadcrumb-moved-ids.md` · `docs/triggers/programmer-16-copy-terms-breadcrumb-moved-ids-COMPLETE.md`
- `instructions/programmer/16-copy-terms-breadcrumb-moved-ids.md`(삭제) + `instructions/programmer/processed/16-copy-terms-breadcrumb-moved-ids.md`(신규)

**리뷰 36**
- `docs/reviews/programmer-16-review.md` · `docs/triggers/reviewer-36-programmer-16-review-COMPLETE.md` · `docs/tools/reviewer-36/`(전체, 손대지 않음) · `instructions/reviewer/processed/36-programmer-16-review.md`(신규)

**프로그래머 16-1**
- `docs/tools/programmer-16-1/`(전체) · `docs/handoffs/programmer-16-1-review-36-fixes.md` · `docs/triggers/programmer-16-1-review-36-fixes-COMPLETE.md`
- `instructions/programmer/processed/16-1-review-36-fixes.md`(신규 — 원래 자리는 미추적이라 삭제 항목 없음)

**기록**: `history/2026-11-09.md`

**넣지 않는 것**: `history/2026-10-01.md`·`history/2026-11-05.md`(P3-5), tester-01·designer-03/05·planner-07·programmer-14 screens·reviewer-31 screens 등 이 오더와 무관한 미추적 파일

⚠️ 리뷰 36은 "B는 P2-1 수정 후"라고 했다. 이번 수정의 재리뷰(리뷰어 게이트) 여부는 슈퍼바이저가 정한다.
