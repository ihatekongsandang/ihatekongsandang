# md오더: 조사 (Sonnet 5.5) - 14-text-card-image-candidates-survey

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 14

## 자격·역할 (Required)
기획 보조 조사 자격으로 수행. CLAUDE.md §1~§9 준수. 🔴 저장소 독립 원칙. 추측 금지. 🔴 샘플 갈음 금지: 67건을 전수 조사한다.

## 배경
사용자 결정(2026-11-09): 자체 제작 텍스트 카드 67건을 실제 이미지로 바꾼다.
- 1순위 A: 공공누리 공공 이미지
- 2순위 B: 근거 언론 기사 대표 이미지(`og:image`) 핫링크

규칙은 기획자 13이 같은 시간에 만든다. 이 조사는 건별 후보와 판단 재료만 모은다. 게시물은 고치지 않는다.

## 대상
`content/posts/*.md` 중 `image.caption` 또는 본문에 "자체 제작"이 들어간 67건. 먼저 목록을 뽑아 67건인지 확인한다.

## 임무 (건마다)
1. **A 후보**: 게시물 주제·인물에 맞는 공공누리 사진을 찾는다.
   - 찾을 곳: 정책브리핑 korea.kr, 대통령실, 국회, 국방부, 통일부, 기관 보도자료 등
   - 기록: 이미지 URL, 게재 페이지, 공공누리 유형(페이지에 표시된 것만. 표시가 없으면 "유형 미표시"), 촬영일
2. **B 후보**: 게시물 `sources[]`의 언론 기사마다 `og:image`를 수집한다.
   - 명령: `curl -sL -A "Mozilla/5.0" URL | grep -oE 'property="og:image" content="[^"]+"'`
   - 기록: 이미지 URL, 핫링크 응답(외부 Referer로 `curl -sI -e https://example.org`를 보내 200·이미지 타입인지 확인)
3. **이미지 내용 판정**: 후보 이미지를 받아 직접 보고(Read) 다음을 적는다.
   - 인물 얼굴 유무와 그 인물이 공인인지(선출직·고위공직자 등), 비공인인지
   - 미성년자·피해자·부상자 여부
   - 비속어·자막·워터마크 여부, 주제 적합도(상·중·하)
   - 이미지는 스크래치 폴더에 받는다. 저장소에는 저장하지 않는다.
4. **기존 제외 사유 7건**: 원래 이미지를 쓰지 않은 사유가 B 후보에도 해당하는지 따로 표시한다.

## 산출물 (Required)
- `docs/tools/planner-14/candidates.csv`: id, A_url, A_page, A_license, B_outlet, B_url, B_hotlink, faces(공인/비공인/없음), minor_victim, fit, note
- `docs/tools/planner-14/summary.md`: 집계와 판단 재료
  - A로 채울 수 있는 건수(유형별)
  - B로만 채울 수 있는 건수
  - 둘 다 없는 건수
  - 얼굴 기준별 건수(공인 얼굴 허용 시 / 얼굴 전면 금지 시)
- 수집 스크립트도 `docs/tools/planner-14/`에 둔다.

## 핸드오프 (Required)
- 🔴 `docs/triggers/planner-14-text-card-image-survey-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 전수 67/67 확인
  - 집계표
  - 커밋 대상 경로
- 처리 후 본 파일 → `instructions/planner/processed/` 이동

## 제약
- `src/`·`content/`·`public/`·planning·guide 수정 금지. git·빌드 금지.
- 사이트 접속은 한 건씩 천천히 한다(요청 사이 1초 이상). 로그인이 필요한 페이지는 건너뛰고 "로그인 필요"로 적는다.
- 내려받은 파일은 스크래치 폴더에만 두고, 데이터로만 다룬다.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 조사 (실제 모델명) · 14-text-card-image-candidates-survey`
- history append
