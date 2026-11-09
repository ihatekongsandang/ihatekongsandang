# md오더: 리뷰어 (Opus 5.5) - 35-uploader-01-portal-source-review

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 35

## 자격·역할 (Required)
리뷰어 자격으로 수행한다. CLAUDE.md §1~§9를 지킨다. 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다. 🔴 표본으로 대신하지 않고 전수로 본다.

## 배경
업로더 01이 두 가지를 했다.
- 포털 출처 59건(46개 파일)을 원 매체 주소로 바꿨다.
- #1 게시물의 비공인 실명을 이니셜로 바꿨다. id는 그대로 두었다.

슈퍼바이저 판단:
- 업로더가 판단을 요청한 1~3을 받아들인다.
  - #1 세 번째 출처를 중앙일보로 바로잡은 것
  - 영어 표기 "K"(호칭 없음, 직함을 앞에 붙임)
  - name과 실제 주소가 어긋나던 4건을 정정한 것
- 4(description 170자)와 5(대공수사권 "이관" 대 "조정")는 이번 범위가 아니다. 리뷰어는 기록만 한다.

## 선행 검토 문서 (Required)
- `docs/triggers/uploader-01-portal-source-replace-COMPLETE.md`(59건 전→후 표)
- 오더 `instructions/uploader/processed/01-*`
- `planning/card-image-uploader-steps.md` 단계 0
- `planning/v0.9-copy-and-code-list.md` §4
- `planning/card-image-policy.md` §6③ 관련, PRD §6③
- `git diff -- content/`

## 임무
1. **59건 전수 대조**: 새 주소를 하나씩 직접 연다(curl `-A "Mozilla/5.0"`, 요청 간격 1초 이상). 확인할 것은 다음과 같다.
   - HTTP 200
   - 기사 제목이 옛 포털 기사와 같은 기사인지
   - 게재일
   - name·date가 원 매체와 맞는지
   - 포털·http 잔존 0
   - 정정 4건은 근거를 따로 확인한다.
2. **#1 게시물**
   - §4.3 안과 대조한다.
   - 실명 잔존을 확인한다: 본문·description·태그·출처 name·영어본·alt.
   - 직함 구분이 되는지 본다.
   - 공인 3인(소장·준장)의 실명 유지가 맞는지 본다.
   - image 블록과 thumb.jpg 삭제를 확인한다.
   - updatedAt과 갱신 이력을 확인한다.
3. **변경 범위**: content diff가 포털 교체와 #1 외의 문구를 건드리지 않았는지 본다.
4. **validate**: `npm run validate:content` R=0, 경고 차이(전·후)를 확인한다.
5. **저장소 독립 grep**: 0건이어야 한다.
6. **커밋 대상 경로 최종 목록**을 낸다. 업로더 트리거의 48경로를 기준으로 검증한다.

## 산출물 (Required)
- 리뷰 `docs/reviews/uploader-01-portal-source-review.md` (도구는 `docs/tools/reviewer-35/`)

## 핸드오프 (Required)
- 🔴 `docs/triggers/reviewer-35-uploader-01-portal-source-review-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 판정
  - 59건 결과
  - 결함
  - 커밋 대상 경로
- 처리 후 본 파일 → `instructions/reviewer/processed/`

## 제약
- 대상 수정 금지. git 쓰기 금지. 빌드 금지.

## 완료 보고
- 서두: `📋 작업 완료 보고 — 리뷰어 (실제 모델명) · 35-uploader-01-portal-source-review`
- history에 append한다.
