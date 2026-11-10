# reviewer-65 — 프로그래머 18(소개 자체 카드 줄 삭제) 검토 — COMPLETE

- 담당: 리뷰어 (Opus 5.5) · 실제 모델 ID `claude-opus-5-5` · 2026-11-11 · 하위 에이전트
- 오더: `instructions/reviewer/processed/65-programmer-18-review.md`(이동). 기준: `instructions/programmer/processed/18-about-self-card-line-remove.md`, 선례 리뷰어 58·58-1
- 빌드 1회(시작 전 `next build/start/dev` 프로세스 0 확인). `next start -p 3165`로 렌더를 확인한 뒤 종료했다. git 쓰기·src·설정·콘텐츠 수정 0. 업로더 25 변경(리뷰어 64 대상)은 판정하지 않고 사실만 확인했다.
- 수정한 파일: 이 트리거뿐. 양성 대조 사본은 scratch에만 두었다.

## 판정: **통과** — P1 0 · P2 0 · P3 1
src 변경은 그대로 커밋해도 된다. 오더대로 업로더 25(묶음 5)가 먼저 배포돼야 하는데, 커밋은 253bcef로 이미 끝났다. 배포(Vercel success)를 확인한 뒤 이 변경을 커밋하면 된다.

## 확인 결과
| # | 항목 | 결과 |
|---|---|---|
| 1 | src diff | ✅ hunk 2개(ko `@@ -90,10 +90,6 @@`, en `@@ -49,10 +49,6 @@`). 둘 다 `<li>…</li>` 4줄 삭제만 있고 추가 0, 다른 글자 변화 0. 앞 `</li>`와 뒤 `<li>`가 바로 이어진다(typecheck·build 통과). 남은 하위 목록은 **3개**(언론 사진 · 공공누리 · 대체 이미지) |
| 2 | 사실 | ✅ 작업 트리 기준 `content/posts*`의 `/images/` 참조 **0**(`image.src`·`images[]` 포함, 어떤 형태든 0). `public/images/` 파일은 `.gitkeep` 1개뿐. 리뷰 도중 업로더 25가 **253bcef**("묶음 5 — 자체 카드 0건")로 커밋돼, 다시 세어 보니 HEAD 기준으로도 `/images/` 참조 0, 추적 중인 `public/images` 이미지 0이다. 커밋 순서 조건(묶음 5 먼저)은 충족됐다 — 남은 것은 배포 확인뿐이다 |
| 3 | 새 도구 `programmer-18/copy-exact-about.py` | ✅ 직접 재실행 **31/31 PASS**. 기대 문자열 8개(ko·en 머리글·하위 3개)가 모두 기획 §2.2의 기존 문안(굵게 표시 제거)에 글자 그대로 있다 — 손으로 옮긴 오타 없음. 양성 대조도 직접 만들었다: ① 자체 카드 줄을 다시 넣은 사본 → **21/31**(FAIL 10, 프로그래머 기록과 같음) ② 하위 2번에서 한 글자만 바꾼 사본(ko "개방된→개방한", en "are→is") → **29/31**(해당 2건 FAIL) — 글자 한 개 차이도 잡는다 |
| 4 | 방문자 문구 grep | ✅ 빌드 HTML 전체에서 "만든 카드 이미지"·"card image this site made"가 나오는 곳은 게시물 1건의 갱신 안내("자체 제작 카드 이미지는 내렸습니다")뿐이고, 이는 지금 사실과 맞다. `about`의 "자체 이미지"(공유 미리보기)·"own image"는 OG 이미지 이야기라 무관하다는 판단이 맞다. 약관·`llms.txt`에 자체 카드 취지 문장 0 |
| 5 | 검증 | 아래 표 |
| 7 | 저장소 독립·실명·옛 id | 비공인 실명 0, `moved-ids.txt` 옛 id 9개 grep 0. 다른 서비스명·계정·홈 경로 0. ⚠️ 임시 절대경로 1곳 → P3-1 |

## 검증 (직접 실행)
| 명령 | 결과 |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 · 0 errors · 경고 21(전부 `docs/tools/*`, `src` 0) |
| `npm run validate:content` | exit 0 · "✅ 검증 통과" |
| `npm run build` | exit 0 · 정적 796/796 |
| 렌더 `/about`·`/en/about` | 둘 다 HTTP 200. 옛 문구 6종(자체 카드 줄 ko·en 각 2종, SNS 저장 줄 ko·en 각 1종) 각 0회 |
| `programmer-18/copy-exact-about.py` | 31/31 (양성 대조 21/31 · 29/31) |

## 결함
- **P3-1 `docs/tools/programmer-18/gate-worktree.log` 787·796·804행 등 14줄**: 게이트가 출력한 시스템 임시 절대경로(`/var/folders/…/T/tmp.…`, `/private/var/folders/…`)가 그대로 남아 있다. 그런데 트리거에는 "홈·임시 경로 grep 0건"이라고 적혀 있다(기록 부정확). 홈 디렉터리명은 아니고, 이미 커밋된 `programmer-11-1`·`programmer-12`의 같은 로그에도 같은 형태가 있어 차단하지는 않는다. 커밋 전에 `<tmp>`로 바꾸기를 권한다(프로그래머가 하는 짧은 후속 또는 슈퍼바이저 판단).

## 미해결에 대한 의견 (오더 6)
1. **기획 §2.2 문안은 갱신이 필요하다(기획자 오더 권장, 이 커밋과 같은 배포 전후).** 지금 §2.2 ko·en과 `planning/v0.9-copy-and-code-list.md` 59행 부근에는 자체 카드 줄이 남아 있어 화면(하위 3개)과 다르다. §3.4 표의 "셋째 줄 … 유지"도 옛 상태다. 갱신 방식은 17-5-1과 같다: 줄을 빼고, 목록 밖에 ※ 기록 문단을 둔다. 이번에는 ※ 줄 **앞뒤에 빈 줄**을 넣는다(리뷰 58-1 P3-1).
2. **ko 84행·en 37행 주석**("§2.2와 글자 같게")은 기획 §2.2가 갱신되면 다시 사실이 되므로 코드는 고치지 않아도 된다. 회귀 기준은 이제 P18 도구(기대값을 코드에 적음)이니, 다음에 소개 페이지를 고치는 오더에서 주석을 "기대값은 `docs/tools/programmer-18/copy-exact-about.py`"로 바꾸면 충분하다.
3. `content/README.md` 87·195행("self = 운영자 제작 카드 이미지")은 자체 카드 0건 사실을 한 줄로 반영하기를 권한다(기획자 문서 정리와 함께). `schema.ts:47`·`post-detail.tsx:31`("206건")은 방문자에게 보이지 않는 주석이라 급하지 않다 — 다음 코드 오더에서 함께 고친다.

## 커밋 경로 (이 오더 대상만 — 업로더 25는 253bcef로 커밋 완료, 작업 트리의 `content/posts*`·`public/images` 미커밋 변경 0)
- `src/app/(ko)/about/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `docs/tools/programmer-18/`(폴더 전체 — P3-1 정리 권장)
- `docs/handoffs/programmer-18-about-self-card-line-remove.md`
- `docs/triggers/programmer-18-about-self-card-line-remove-COMPLETE.md`
- `instructions/programmer/processed/18-about-self-card-line-remove.md`
- `docs/triggers/reviewer-65-programmer-18-review-COMPLETE.md`
- `instructions/reviewer/processed/65-programmer-18-review.md`

(`history/2026-11-11.md`는 여러 세션 기록이 섞인 슈퍼바이저 파일이라 따로 처리한다. 스테이징한 뒤 `clean-clone-gate.sh --staged`를 권한다.)
