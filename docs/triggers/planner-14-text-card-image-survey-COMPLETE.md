# 완료 트리거 — 조사 14 (텍스트 카드 67건 이미지 후보 조사)

**완료일**: 2026-11-09 | **작성 세션**: 조사 (Sonnet 5.5, 모델 ID claude-sonnet-5-5) | **오더**: `instructions/planner/14-text-card-image-candidates-survey.md`

## 전수 확인
- **67/67 전수 확인.** 대상 목록은 `image.caption`에 "자체 제작"이 든 게시물 67건이며, 본문까지 넓힌 검색도 같은 67건.
- 언론 출처 193건(URL 190개) 전부에서 og:image 수집 시도. 이미지 확보 185건, 수집 불가 5건(봇 확인 페이지 2, 빈 응답 2, og:image 없음 1). 185장 모두 직접 열어 판정.
- 핫링크 시험(외부 Referer): HEAD 200 이미지 159건, GET 재확인 포함 184/185건 정상.

## 집계
| 얼굴 기준 | A 가능 | B만 가능 | B 조건부(신원 확인 필요) | 둘 다 없음 |
|---|---|---|---|---|
| 공인 얼굴 허용 | 13 | 38 | 5 | 11 |
| 얼굴 전면 금지 | 1 | 29 | 0 | 37 |

- A 13건 유형: 제1유형 8(통일부·국가유산청·공공누리 누리집), 제4유형 5(청와대 사진 자료실). A 후보가 있으나 주제 연관 약함 8건은 제외한 수.
- 핵심 발견: 정책브리핑(korea.kr) 사진 페이지의 공공누리 문구는 "텍스트에 한하여"이고 사진은 저작권자 허락이 필요해 A로 쓸 수 없다. 국방부·국회·국정원·대법원 페이지는 사진에 공공누리 유형이 표시되지 않는다. 경찰청·법무부·외교부 본 사이트 등은 자동 수집이 막혀 "확인 필요".

## 커밋 대상 경로
- `docs/tools/planner-14/summary.md`
- `docs/tools/planner-14/candidates.csv`
- `docs/tools/planner-14/candidates-by-post.csv`
- `docs/tools/planner-14/image-judgments.tsv`
- `docs/tools/planner-14/judgments.json`
- `docs/tools/planner-14/collect.py`, `hotlink_retry.py`, `contact_sheet.py`, `kogl_check.py`, `grep_notice.py`, `build_judgments.py`, `build_csv.py`, `make_summary_tables.py`
- `docs/triggers/planner-14-text-card-image-survey-COMPLETE.md`
- `instructions/planner/processed/14-text-card-image-candidates-survey.md`
- `history/2026-11-09.md`

수정하지 않은 것: `src/`·`content/`·`public/`·`planning/`·guide. git·빌드 미실행.
