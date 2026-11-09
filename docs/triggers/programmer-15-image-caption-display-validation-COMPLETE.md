# ✅ COMPLETE — 프로그래머 15 · image-caption-display-validation
**완료**: 2026-11-09 17:40 | **세션**: 프로그래머 (Opus 5.5 — `claude-opus-5-5`)
**핸드오프**: `docs/handoffs/programmer-15-image-caption-display-validation.md` · **도구**: `docs/tools/programmer-15/README.md`

## 항목별 완료
| 항목 | 상태 | 확인 |
|---|---|---|
| C1 상세 사진 설명 표시(public·news만, self 숨김) | ✅ | 단위 C1 렌더 · 픽스처 빌드 21/21 · 실브라우저 ok 8조합 · self 207건 전수 1,340/1,340 |
| C2 caption 필수(빈 값 불가)·160자 경고·영어본 imageCaption 필수 | ✅ | 단위 C2 · 빌드 실패 11/11(news 없음·public `""`·영어본 없음 → `npm run build` 종료 코드 1) |
| C6 `content/README.md` §2.4 문안(news·public 예시 분리, news에 license 없음) | ✅ | §3.1·§3.4·§3.6 신설·§8·§9 |
| C7 깨진 핫링크 → 크레딧·사진 설명 줄 숨김 | ✅ | 실브라우저 fail-early·fail-late 8조합(대체 카드·figcaption 0·화면 글자 0·콘솔 오류 0) |
| P3-N1 IPv4 매핑 IPv6·CGNAT 100.64/10 | ✅ | 거부 18·통과 10 + 기존 회귀 |
| 6. reviewer-32 `validate-examples.ts` 타입 오류 3건 | ✅ | tsc 3 → 0 · 출력 바이트 단위 같음 |
| C3·C4·C5 | ⛔ 손대지 않음(오더 16) | — |

## 검증 숫자
- 단위 **117/117**(양성 대조: 변경 전 코드에서 60 FAIL) · 빌드 실패 **11/11**
- 픽스처 빌드: programmer-13 p11 **22/22** · caption-build-check **21/21** · 실브라우저 **161/161**(사진 설명 대비 7.73)
- self caption 회귀 **1,340/1,340**(content 207건, 상세 1,242 = 207 × 6, 서로 다른 caption 97개 빌드 전체 등장 수 불변, 양성 대조 3 FAIL)
- seo-parity **799/799** · 화면 마크업 **799/799** · RSC 차이 828건 = 전부 MediaFigure 구조 변경(설명 안 됨 0) · 소개·약관 글자 4/4
- copy-exact **38/38** · a11y-e2e(GA 더미) **184/184**(라벨 14-1과 같음)
- 회귀: programmer-13 단위 104/104 · 핫링크 10/10 · 14-1 단위 64/64 · 05 53/53 · 06 35/35
- typecheck exit 0 · 전체 lint **0 errors**(16 warnings 기존) · `clean-clone-gate.sh --worktree` **통과**(reviewer-32 도구 포함)
- 최종 빌드 = 일반 빌드(검증 414 통과·정적 801/801·GA 더미 ID 0건·검증 출력 변경 전과 같음)
- 저장소 독립 grep: `docs/tools/programmer-15/word-grep-output.txt`

## 커밋 대상 경로
```
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
docs/tools/programmer-15/                  (도구·출력·fixtures-fail·screens 16장·screens-e2e)
docs/handoffs/programmer-15-image-caption-display-validation.md
docs/triggers/programmer-15-image-caption-display-validation-COMPLETE.md
instructions/programmer/processed/15-image-caption-display-validation.md   (이동)
history/2026-11-09.md                      (이 세션 append 1건 — 같은 파일의 다른 세션 기록은 슈퍼바이저 판단)
```
⚠️ 작업 트리에 이 세션과 무관한 변경이 있다(`docs/poster/guide.md`, `docs/operations/` 등 슈퍼바이저 D-1·D-2, 그 밖의 미추적 파일). 위 목록에 넣지 않았다.

## 다음
리뷰어(Opus 5.5) 코드 게이트 → 통과 후 슈퍼바이저 커밋. 배포는 업로더가 public·news 사진을 넣기 **전에** 한다.
