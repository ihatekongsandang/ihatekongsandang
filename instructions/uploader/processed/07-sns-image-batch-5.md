# 업로더 07 — SNS 원문 이미지 저장본 정리 묶음 5 (10건)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 반공-업로더 창
**사용자 결정**: Q2 = b(저장본 단계적 정리) · Q3 = a(언론 이미지 불가 시 대체 카드, 저장 파일 삭제) · 공인의 공적 활동 사진 허용. 소개 문구(C4)는 6f0f941로 배포됨.
**선례**: 묶음 1~4(커밋 a15e15f·d913662·314d76c·a691bac). 판단 기준은 `docs/poster/guide.md` §4-1 "판단 선례"(a691bac에서 갱신)와 리뷰어 38~41 트리거를 따른다. 🔴 리뷰 40·41 P2-1 재발: 트리거 불가 사유가 실제 자료와 두 번 달랐다. ① 후보 og:image는 모두 직접 열어 보고 크기는 받은 파일에서 잰다 ② 계급·직위는 **기사 본문 전체**에서 찾는다 ③ 깃발·현판·명패 글자는 실제로 읽어 그대로 적는다. 이 묶음부터 Tier 3(일반, 최신순)이다.

## 선행 문서 (모두 읽기)
- `docs/poster/guide.md` §2(비공인 표기), §4·§4-1(카드 이미지 — 우선순위·얼굴 기준·caption 필수·frontmatter)
- `planning/q1-redirect-q2-sns-image-plan.md` §3.3~§3.5(교체 방법·단계 0)
- `planning/card-image-uploader-steps.md` 단계 1~4, `planning/card-image-policy.md` §3·§5.3
- `content/README.md` §3.6(image 필드), `docs/tools/planner-16/sns-image-batches.tsv`(batch=5 10건)

## 대상 — 묶음 5 (TSV batch 5, 10건)
`2026-10-01-hagonolza-opcon-transfer-risks` · `2026-10-01-rekor-15div-mine-field` · `2026-09-30-20hoon-prosecution-abolition-victim-guide` · `2026-09-30-rekor-foreign-committee-dp-absence` · `2026-09-30-shindawit-nk-mdl-50-crossings` · `2026-09-30-taekyu-assassins-film-fund-china` · `2026-09-29-2pro-prosecution-sign-removal-cost` · `2026-09-29-finf-jcs-terrain-change-year` · `2026-09-29-finf-jinsungjoon-mine-intent` · `2026-09-29-leejinsook-assassins-film-distortion`

## 건마다
0. **단계 0**: 저장된 이미지를 직접 보고 얼굴(공인·비공인·미성년자·피해자·부상자)과 방송·기사 화면 포함 여부를 판정해 기록. 비공인 얼굴이면 바로 ③.
1. **②**: `sources[]`의 언론 기사에서 og:image(또는 기사 대표 사진)를 찾는다. guide §4-1·정책 §3·§5.3을 통과하면 `image.kind: news` + creditName·creditNameEn·sourcePageUrl(= sources의 그 기사 url)·retrievedAt·faceNote·caption, 영어본 `imageAlt`·`imageCaption`. 핫링크 실제 응답(200, image/*)을 확인.
2. **③**: 통과하는 사진이 없거나 판단이 오래 걸리면 `image` 블록(ko·en의 image 관련 필드)을 지워 대체 카드로 둔다.
3. ②·③ 모두 `public/images/<id>/` 저장 파일과 폴더를 지운다. 본문의 `/images/<id>/` 참조도 0.
4. 근거 없는 새 사실·단정 표현을 caption·alt에 쓰지 않는다. 사진이 다른 사건·시점이면 쓰지 않는다.

## 검증
- `npm run validate:content` 통과, `npm run check:hotlinks`(②만 대상) 결과 기록.
- `node docs/tools/planner-16/count-self-images.mjs`로 저장본 수 100 → 90 확인.
- 빌드 금지(게이트에서 한다).

## 금지
git add·commit·push 금지. 대상 10건 외 게시물 수정 금지. 새 SNS 원문 이미지 저장 금지. 비공인 실명·다른 서비스명·계정명·홈 절대경로 금지. 로그인·비밀번호 필요한 페이지는 쓰지 않는다.

## 🔴 완료 트리거 (필수)
`docs/triggers/uploader-07-sns-image-batch-5-COMPLETE.md`: 실제 모델 ID, 건별 표(id · 단계 0 판정 · ②/③ · 사진 출처 기사 · 핫링크 응답 · 지운 파일), ②·③ 건수, 저장본 수 전/후, validate·hotlinks 결과, 바뀐 경로 목록(삭제 포함). 오더는 `processed/`로. 완료 시 반공-슈퍼바이저에 SendMessage.
