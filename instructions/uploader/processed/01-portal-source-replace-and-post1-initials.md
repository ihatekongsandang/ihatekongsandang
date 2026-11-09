# md오더: 업로더 - 01-portal-source-replace-and-post1-initials

**작성일**: 2026-11-09 | **작성자**: 반공-슈퍼바이저 (Opus 5.5) | **순번**: 01

## 자격·역할 (Required)
반공-업로더(게시 담당) 자격으로 수행한다. `docs/poster/guide.md` 전체를 읽고 지킨다(특히 §4-1 신설분). 🔴 저장소 독립 원칙을 지킨다. 추측하지 않는다.

## 배경
사용자 결정(2026-11-09): 자체 텍스트 카드 67건을 실사진으로 바꾼다. 이번에 하는 일은 그 앞 단계다.
- 포털 출처를 원 매체로 바꾼다(지침 단계 0).
- #1 게시물의 비공인 실명을 이니셜로 바꾼다.

사용자 Q1 = b다. #1의 id(주소)도 바꾸지만, 옛 주소를 넘기는 코드(프로그래머 16)가 먼저 배포돼야 한다. 그래서 이번에는 **id·파일명·이미지 폴더를 바꾸지 않는다.**

## 선행 검토 문서 (Required)
- 🔴 `planning/card-image-uploader-steps.md` 단계 0(전부), `planning/card-image-policy.md`
- 🔴 `planning/v0.9-copy-and-code-list.md` §4(#1 판정·고칠 문구 안·다른 4인 계급), §4.4 `updatedAt` 규칙
- `docs/tools/reviewer-32/portal-count-output.txt`(46개 파일 목록, 허용 출처 0이 될 8개 파일)
- `docs/poster/guide.md`, `content/README.md`

## 임무
1. **8개 파일을 먼저 처리한다.** 대상은 포털을 빼면 허용 출처가 0이 되는 파일이다.
   - 지침 단계 0 방침대로 원 매체 주소 → 다른 허용 언론·공식 발표 순으로 찾는다.
   - 결과를 트리거에 건별로 적는다.
   - 대체 출처를 끝내 못 찾은 건은 **비공개하지 말고** 보고한다. 슈퍼바이저가 판단한다.
2. **나머지 38개 파일을 처리한다.** 67건 대상 18개 파일을 먼저 한다.
   - `sources[].url`의 포털 주소(daum·nate)를 같은 기사의 원 매체 주소로 바꾼다.
   - 원 매체 기사가 실제로 열리는지, 제목이 같은지 확인한다(curl `-A "Mozilla/5.0"`).
   - `name`·`date`는 원 매체 기준으로 맞춘다.
   - `http://`는 원 매체가 지원하면 https로 바꾼다.
3. **#1 게시물 문구를 바꾼다**(§4.3 안 그대로).
   - 대상: 제목·description·본문 4줄(당사자), 정보사 계획처장(대령·1심 무죄) 이니셜화
   - 출처 `name` 3건은 중립 요지로 바꾼다(필수).
   - 중심 인물 실명 태그를 삭제한다.
   - `image` 블록과 옛 `thumb.jpg`를 지우고, 본문의 "자체 제작 카드…" 문장을 삭제한다.
   - 영어본을 같은 방식으로 고친다.
   - 직함은 항상 앞에 붙인다. 성 초성이 같으므로 직함으로 구분한다.
   - **id·파일명은 그대로 둔다.**
4. **영어본**: 출처 교체가 영어본 `sources`에도 반영되는지 확인한다. 영어본은 출처를 원본에서 가져온다(지침 기재). 실제 동작을 확인한다.
5. **`updatedAt`**: §4.4 규칙대로 처리한다.
6. **검증**
   - `npm run --silent validate:content`: R=0, 해당 id 경고 0
   - 남은 포털 주소 grep: `grep -rnE 'v\.daum\.net|news\.nate\.com' content/` → 0. 못 바꾼 건은 목록으로 적는다.
7. 🔴 **이번에는 이미지를 넣지 않는다.** A·B 사진 투입은 다음 오더에서 한다.

## 산출물·핸드오프 (Required)
- 🔴 `docs/triggers/uploader-01-portal-source-replace-COMPLETE.md` **완료 트리거 파일 생성 필수**. 다음을 적는다.
  - 파일별 교체 전→후 주소
  - 8개 파일 결과
  - 못 바꾼 목록
  - #1 변경 요약
  - validate 결과
  - 커밋 대상 경로 목록
- 처리 후 본 파일 → `instructions/uploader/processed/`

## 제약
- 🔴 **이번에는 git add·commit·push 하지 않는다.** 리뷰어 게이트 뒤에 슈퍼바이저가 커밋한다.
- `src/`·planning·guide·design 수정 금지. 빌드 금지(validate만 실행한다).
- 원 기사 HTML은 저장소 밖 임시 폴더에만 둔다.

## 완료 보고
- 서두 `📋 작업 완료 보고 — 반공-업로더 (실제 모델명) · 01-portal-source-replace-and-post1-initials`
- history에 append한다.
- 완료 시 반공-슈퍼바이저에 SendMessage를 보낸다.
