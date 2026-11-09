# 업로더 18 — 비공인 실명 정리 2차 (사용자 결정 반영분 + 카드 이미지 2장)

담당: 반공-업로더 · 빌드 없음(validate만) · 커밋 금지(슈퍼바이저가 리뷰 후 커밋)

## 사용자 결정 (2026-11-10)
- 본문 실명 예외 4종: ① 본인 실명으로 공개 발언·활동한 비공인(그 발언을 다룰 때만) ② 작품 크레딧 ③ 외국 공직자(수사·기소 대상은 이니셜, 외국 정상 배우자 제외) ④ 북한 인사·역사 인물. 피의자·피고인으로 나오는 형사 절차를 서술하면 그 게시물 전체 이니셜(확정 유죄 보도 시 예외, 역사 인물 제외). 실명 허용 ≠ 얼굴 허용.
- **예외 인물이라도 id·파일명에 이름이 있으면 id 이전**(역사 인물·사건명 id 제외).
- git 이력은 그대로.
- 기준 문서: `planning/prd.md` §6③, `docs/poster/guide.md` §2·§4(작업 폴더 최신본 — 아직 커밋 전일 수 있음).

## 선행 문서 (반드시 읽기)
1. `CLAUDE.md`, `docs/poster/guide.md` §2·§4·§4-1, `planning/prd.md` §6③
2. `docs/triggers/reviewer-52-nonpublic-name-audit-COMPLETE.md`(부록 위치), `docs/tools/reviewer-52/judgement-table-masked.tsv`
3. `docs/triggers/reviewer-55-planner-17-2-review-COMPLETE.md` ⑥표(새 기준에서 각 인물 판정)
4. `docs/triggers/reviewer-54-uploader-17-review-COMPLETE.md` 7-a(이미지 2장)·P3-1~P3-6
5. 선례: `instructions/uploader/processed/17-nonpublic-name-initials-1.md`와 그 트리거, id 이전 절차 `content/README.md` §6-1

## 할 일
1. **id 이전**: 예외 인물 이름이 든 id — P054, P084(2건), P214 — 와 N4 수사 대상 P194. 새 id는 직함·역할 영문 단어로. 절차·검증은 업로더 17과 같다(moved/retired txt, content·src·public 옛 id 0).
2. **N4 수사 대상 2명 이니셜**: P194(피고발·출국정지 보도), P196(간첩 혐의 체포 보도). 해당 게시물 전체에서 처음부터 끝까지.
3. **조건부 4건**(리뷰어 55 ⑥): P087(발언 당사자 아님 → 기사로 직위 확인해 공인이면 직위 보강, 아니면 이니셜), P155(입건 서술 → 그 게시물 전체 이니셜), P204·P205(징역 서술 → 출처가 확정을 보도했으면 실명+확정 표기 유지, 아니면 이니셜), P024(직위 없이 "대남공작원"만 있는 줄에 직위 보강). P132·P133(소송 원고·고발인)·P113(역사 사건 범인)은 새 기준상 실명 유지 — 손대지 않음.
4. **자체 카드 이미지 2장 재제작**(리뷰어 54 P2-1): `public/images/2026-10-08-ansanheart-daejangdong-recording-2025/thumb.jpg`, `public/images/2026-11-04-leejinsook-martial-law-soldiers-presser/thumb.jpg`. 게시할 때와 같은 방식으로 다시 만들고, 이미지 속 글자는 각 게시물의 현재 ko `image.alt` 문구(이니셜)와 같게. 같은 경로에 덮어쓰기(크기 1200×675 유지). 만든 뒤 이미지를 열어 글자를 직접 읽어 트리거에 그대로 적는다(실명 없이).
5. **잔존·정정**(리뷰어 54 P3): P3-1 업로더 17 트리거 파일 수 오기 정정, P3-2 #6 ko description을 리뷰어 문안으로 줄이기, P3-3 #6 en 20행 대명사→이니셜, P3-4 범위 밖 잔존 4줄(P176 표시 이름 2곳, P217 성 표기 2곳 — `history/2026-10-25.md`는 미추적 파일이지만 같이 정리).
6. **updatedAt·갱신 이력**: 바꾸지 않는다(업로더 17과 같음).
7. **검증**: `npm run validate:content` 통과, 대상 위치 0건 재확인(이름은 `$TMPDIR`에서만), `git status --short` 전체를 트리거에.

## 🔴 금지
- git add·commit·push 금지(파일 이동은 일반 `mv`). 빌드 금지. 코드(`src/`)·설정 수정 금지 — 필요하면 멈추고 보고.
- 트리거·오더·히스토리에 비공인 실명(성·로마자 포함)과 옛 id 문자열 금지(두 txt 제외). P번호·초성으로만.
- 사진 기자 바이라인·다른 서비스명·계정명·홈 디렉터리 절대경로 금지.
- (다) 확인 불가 37건(D1~D3·D6 제외 나머지)은 이번에 손대지 않는다 — 3차 오더로 따로 보낸다.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/uploader-18-nonpublic-name-2-COMPLETE.md` — 항목별 파일:줄(P번호), id 이전 목록, 이미지 2장 글자 판독, 0건 확인, `git status --short`, validate 결과.
- 끝나면 이 오더를 `instructions/uploader/processed/`로 옮기고 반공-슈퍼바이저에 한 줄로 알린다.
