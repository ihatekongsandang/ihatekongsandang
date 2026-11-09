# ✅ COMPLETE — 리뷰어 33 · programmer-15-caption-review
**완료**: 2026-11-09 17:55 | **세션**: 리뷰어 (Opus 5.5 — `claude-opus-5-5`)
**리뷰**: `docs/reviews/programmer-15-caption-review.md` · **도구**: `docs/tools/reviewer-33/`

## 판정
- **코드(프로그래머 15)**: ✅ 승인 — 결함 0, P3 메모 3건(주석 206→207, public에도 "원 기사" 안내 문구, IPv4 호환·변환 표기 통과는 범위 밖 기록)
- **guide·operations(슈퍼바이저)**: 🟠 조건부 — P2 3건(G1·G2·O1) 수정 후 커밋

## 재현 숫자(빌드 없이, 기존 일반 빌드 `.next` 17:22:39 + `next start -p 3933`)
- 단위 117/117 · 회귀 104/10/64/53/35 전부 PASS · validate 통과 · copy-exact 38/38 · typecheck 0 · lint 0 errors(16 warnings 그대로)
- **C7 실브라우저 141/141**(375·1280 × ko/en × 대조·ok·fail-early·fail-late·nav-ok·nav-fail, 콘솔 오류 0) · 양성 대조 16건 검출
- self caption 누출 0(828 파일 = 207×4, `data-image-caption` 0)
- README §2.4 대조 37 중 33 글자 그대로 + 4건 정당한 각색, yaml 2/2 · 예시 검증 16/16(임시 사본)
- a11y-e2e 일반 빌드 180/184(FAIL 4 = GA share 4건, GA ID 없는 빌드라 예상대로, 나머지 라벨 프로그래머와 같음)
- 재현 안 함(빌드 필요): 빌드 실패 11/11·픽스처 빌드·seo/html parity·GA 더미 e2e·worktree 게이트 — 프로그래머 출력만 확인

## 결함
- 코드: 없음
- **O1 (P2)** `docs/operations/image-removal-log.md` 칸이 `planning/image-removal-procedure.md` §5와 다르다(이미지 종류·요청 유형·재검토 결과·처리자 없음, 조치 값 다름). 자유 서술 "요청 요지" 칸은 요청 내용이 옮겨질 통로라 절차 §2·§5와 충돌 → 분류값 칸으로
- O2 (P3) `hotlink-check-log.md` 머리에 실제 점검 요일·반복 방식이 없다(업로더 착수 조건 c 미충족). 점검자는 역할명으로

## guide 수정 지적
- **G1 (P2, 틀린 요약)** §4-1 "의혹·수사·재판 사안 사진은 caption 필수" → 배포 뒤 **public·news 전부 caption 필수(빌드 중단)·영어본 imageCaption 필수**. 의혹 사안 인물 사진은 정책 §3.6 표 1·2행 문구 필수
- **G2 (P2, 빠진 필수 규칙)** 공인 얼굴 사진은 **프로그래머 16(C4 소개 문구) 배포 뒤부터**, 그 전엔 얼굴 없는 사진만(업로더 지침 §0) — 한 줄 추가
- G3~G8 (P3): 캡션·촬영 시점 없는 인물 사진 불가 / 영어본 옛 alt·caption 교체(검증 사각) / 공인 범위 요약("정치인" 모호, 정당 간부·공공기관장·피의자 전직 제외·추정 금지) / §4 thumb.jpg 저장은 A·self만 / "별로" 인용 출처 확인 필요 / README §3 → §3.6

## 커밋 대상 경로(최종)
```
# 프로그래머 15 (트리거 목록 그대로)
src/lib/content/schema.ts
src/components/card-media.tsx
src/components/post-detail.tsx
content/README.md
docs/tools/reviewer-32/validate-examples.ts
docs/tools/programmer-13/unit-checks.tsx
docs/tools/programmer-13/p11-build-check.mjs
docs/tools/programmer-13/hotlink-cases.mjs
docs/tools/programmer-13/figcaption-a11y.mjs
docs/tools/programmer-13/fixtures/posts/zz-fixture-news-image.md
docs/tools/programmer-13/fixtures/posts/zz-fixture-public-image.md
docs/tools/programmer-13/fixtures/posts-en/zz-fixture-news-image.md
docs/tools/programmer-13/fixtures/posts-en/zz-fixture-public-image.md
docs/tools/programmer-14-1/unit-checks.ts
docs/tools/programmer-15/
docs/handoffs/programmer-15-image-caption-display-validation.md
docs/triggers/programmer-15-image-caption-display-validation-COMPLETE.md
instructions/programmer/processed/15-image-caption-display-validation.md
# 슈퍼바이저 (G1·G2·O1 반영 후)
docs/poster/guide.md
docs/operations/hotlink-check-log.md
docs/operations/image-removal-log.md
# 리뷰어 33
docs/reviews/programmer-15-caption-review.md
docs/tools/reviewer-33/
docs/triggers/reviewer-33-programmer-15-caption-review-COMPLETE.md
instructions/reviewer/processed/33-programmer-15-caption-review.md
# 공통
history/2026-11-09.md
```
⚠️ 무관한 작업 트리 변경(`history/2026-10-01.md`·`2026-11-05.md` 수정, tester-01·planner-07·designer 화면 등 미추적)은 넣지 않았다 — 슈퍼바이저 판단.

## 다음
슈퍼바이저: G1·G2·O1 수정 → 커밋·배포(업로더의 public·news 사진 투입 전). 공인 얼굴 사진은 프로그래머 16 배포 뒤.
