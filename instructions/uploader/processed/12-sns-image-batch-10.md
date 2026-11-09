# 업로더 12 — SNS 원문 이미지 저장본 정리 묶음 10 (10건)

**발주**: 반공-슈퍼바이저 (Opus 5.5) · 2026-11-10 · 실행: 반공-업로더 창
**사용자 결정**: Q2 = b(저장본 단계적 정리) · Q3 = a(언론 이미지 불가 시 대체 카드, 저장 파일 삭제) · 공인의 공적 활동 사진 허용. 소개 문구(C4)는 6f0f941로 배포됨.
**선례**: 묶음 1~8(마지막 커밋 bf39223). 판단 기준은 `docs/poster/guide.md` §4-1 "판단 선례"(c6c4dc8에서 판사·검사·청문 후보자 1줄 추가)와 리뷰어 38~45 트리거를 따른다. 후보 og:image 전부 직접 열기·크기는 받은 파일에서·계급은 본문 전체에서·글자는 읽은 그대로·트리거에 개인 이름 금지·단계 0에 계급장/방송 진행자 구분·결과 보도 사안 caption 결과 한 문장·신원 미확인 근거 표현(모두 계속). 🔴 리뷰 46: ① 영어 인명 표기는 같은 영어본의 기존 표기와 맞춘다(새로 음역하지 않는다) ② caption은 원 사진 설명이 밝힌 것만 — 촬영 순간을 출처보다 좁혀 특정하지 않는다 ③ 본문에 '이미지'가 원문 이미지를 가리키면 '원문 이미지'로 쓴다 ④ 불가 사유에 사진 설명 유무·인원수를 실제대로 적는다. 단계 0에 저장본 위 덧씌운 글자·다른 계정 로고도 적는다.

## 선행 문서 (모두 읽기)
- `docs/poster/guide.md` §2(비공인 표기), §4·§4-1(카드 이미지 — 우선순위·얼굴 기준·caption 필수·frontmatter)
- `planning/q1-redirect-q2-sns-image-plan.md` §3.3~§3.5(교체 방법·단계 0)
- `planning/card-image-uploader-steps.md` 단계 1~4, `planning/card-image-policy.md` §3·§5.3
- `content/README.md` §3.6(image 필드), `docs/tools/planner-16/sns-image-batches.tsv`(batch=10 10건)

## 대상 — 묶음 10 (TSV batch 10, 10건)
`2026-09-22-taekyu-ppp-rally-report` · `2026-09-24-hagonolza-kimgyeri-spy-remark` · `2026-09-26-newsbanhana-lee-kexpo-mexico` · `2026-09-26-nonjeomjikjin-dmz-chae-standard` · `2026-09-26-rekor-dmz-dispute` · `2026-09-26-wikipost-dmz-injury-rumor` · `2026-09-27-geonwoo-farmland-survey` · `2026-09-27-geonwoo-nsl-mexico-remark` · `2026-09-27-hoon2-jeonhyunhee-land-lease` · `2026-09-27-leejinsook-lee-parents-grave-farmland`

## 건마다
0. **단계 0**: 저장된 이미지를 직접 보고 얼굴(공인·비공인·미성년자·피해자·부상자)과 방송·기사 화면 포함 여부를 판정해 기록. 비공인 얼굴이면 바로 ③.
1. **②**: `sources[]`의 언론 기사에서 og:image(또는 기사 대표 사진)를 찾는다. guide §4-1·정책 §3·§5.3을 통과하면 `image.kind: news` + creditName·creditNameEn·sourcePageUrl(= sources의 그 기사 url)·retrievedAt·faceNote·caption, 영어본 `imageAlt`·`imageCaption`. 핫링크 실제 응답(200, image/*)을 확인.
2. **③**: 통과하는 사진이 없거나 판단이 오래 걸리면 `image` 블록(ko·en의 image 관련 필드)을 지워 대체 카드로 둔다.
3. ②·③ 모두 `public/images/<id>/` 저장 파일과 폴더를 지운다. 본문의 `/images/<id>/` 참조도 0.
4. 근거 없는 새 사실·단정 표현을 caption·alt에 쓰지 않는다. 사진이 다른 사건·시점이면 쓰지 않는다.

## 검증
- `npm run validate:content` 통과, `npm run check:hotlinks`(②만 대상) 결과 기록.
- `node docs/tools/planner-16/count-self-images.mjs`로 저장본 수 50 → 40 확인.
- 빌드 금지(게이트에서 한다).

## 금지
git add·commit·push 금지. 대상 10건 외 게시물 수정 금지. 새 SNS 원문 이미지 저장 금지. 비공인 실명·다른 서비스명·계정명·홈 절대경로 금지. 로그인·비밀번호 필요한 페이지는 쓰지 않는다.

## 🔴 완료 트리거 (필수)
`docs/triggers/uploader-12-sns-image-batch-10-COMPLETE.md`: 실제 모델 ID, 건별 표(id · 단계 0 판정 · ②/③ · 사진 출처 기사 · 핫링크 응답 · 지운 파일), ②·③ 건수, 저장본 수 전/후, validate·hotlinks 결과, 바뀐 경로 목록(삭제 포함). 오더는 `processed/`로. 완료 시 반공-슈퍼바이저에 SendMessage.
