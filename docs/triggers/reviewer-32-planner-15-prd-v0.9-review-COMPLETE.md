# 완료 트리거 — 리뷰어 (Opus 5.5) · 32-planner-15-prd-v0.9-review

**완료일**: 2026-11-09 | **모델 ID**: claude-opus-5-5 | **리뷰**: `docs/reviews/planner-15-prd-v0.9-review.md` | **도구**: `docs/tools/reviewer-32/`
대상 수정·git 쓰기·빌드·의존성 설치 없음. `content/` 미수정(임시 사본은 저장소 밖). `validate:content` R=0.

## 판정
**조건부 승인 — P1 0 · P2 5 · P3 10.** 기획자가 P2 5건을 고친 뒤 커밋한다(P3는 같은 오더에 묶기를 권한다).
- 사용자 결정 2안·1a·2b·3b·4a·5a·U1~U5·D1~D7: 5개 문서에 반영됨. 4a 해석 1곳만 충돌(P2-2).
- 리뷰 30 수정표 18/18 반영. 수정표 밖 필수 완화책 L10 누락(P2-1).
- 재현: 포털 46개 파일·59건(daum 33·m.nate 24·nate 2, sourceUrl 0, 영어본 0) · post-recheck 합계 67 · 본문 문장 53건 · 업로더 예시 frontmatter 검증 오류 0.
- 기본값 7개(+4a 건물 해석): 외국 현직 공직자·외국 정상 배우자 2개는 사용자 답 밖 → 비공인 쪽으로 돌린다(영향 거의 0). 나머지 유지. 지금 사용자에게 물을 것 없음.

## 결함
- **P2-1** L10 "자막 단정형 화면 금지"가 정책·PRD·지침에 없다 → 정책 §5.3에 11항 추가.
- **P2-2** 정책 §5.1 판정 2단계가 촬영 시점 미표기 건물 사진을 허용 → 4a와 충돌. 촬영 시점 확인된 것만.
- **P2-3** 소개 페이지 새 문안(C4) "카드 대표 사진은 공공누리 또는 언론 기사 이미지"가 SNS 원문 이미지 저장본 140건과 다르다 → 사실대로 다시 쓴다.
- **P2-4** 정책 §8·README 문안의 `kind: news` 예시에 `license: kogl-1` → 그대로 쓰면 빌드 오류(재현). news·public 예시 분리.
- **P2-5** #1 본문의 정보사 계획처장은 보도상 대령(1심 무죄) → 비공인, 이니셜 필요. 기획자 문구 안에 없음(ko 46행·en 21행).
- P3 10건: 리뷰 §8 표(1a 문장 분리·B 덧씌우기 금지·지침 착수표 낡음/기준 혼재·#57 4a 누락·120자 경고 기준·지도 기준·updatedAt/영어본 잔존·단계 0 순서와 허용 출처 0 되는 8개 파일·제거 절차 저장소 공개 반영·교차 참조).

## 사용자 확인 필요
- **Q1. #1 ID·슬러그의 실명(로마자)** — 위험 **중**. (가) 유지(안정 ID 원칙) (나) 새 id + 옛 id 폐기 등록 + 리다이렉트(코드 필요). 반응·댓글 데이터가 아직 없어 지금이 바꾸는 비용이 가장 낮다. 함께 알릴 것: 직함+이니셜은 사실상 특정됨, 저장소가 공개라 지난 커밋에 실명이 남음.
- (슈퍼바이저가 보고 여부 판단) SNS 원문 이미지 140건 저장과 `/about` "복제해 두지 않습니다" 문장 불일치 — 리뷰 §9.

## 슈퍼바이저 판단
- #1 출처 `name` 3건의 실명 기사 제목: 권고가 아니라 필수로 중립 요지로 바꾸기를 권한다.
- 국방부 조사본부장(소장, 1심 무죄) 실명: PRD §6③ 405행이 1심 무죄에도 걸리는지. 리뷰어 의견은 공인·미확정이라 유지.
- 기획 문서·트리거의 #1 당사자 실명 표기(공개 저장소).

## 프로그래머 오더 범위 제안
- **프로그래머 15 (블로커, 공인 얼굴·의혹 사안 사진 전)**: C1(public·news만 사진 설명 표시, self caption 206건은 계속 숨김) · C2 · C6(P2-4 반영) · C7(깨짐 시 크레딧·설명 숨김 — C1과 함께 필수) · 리뷰 31-1 P3-N1(IPv4 매핑 IPv6·CGNAT).
- **프로그래머 16 (공인 얼굴 사진 첫 묶음 배포 전까지)**: C3 · C4(기획자 정정본) · C5. 현행 `/about` "얼굴이 식별되는 원문 썸네일은 사용하지 않고"가 첫 얼굴 사진 배포와 동시에 거짓이 된다.
- 보류: C8 · C9(A 첫 사용 전) · C10 · P5. 둘 다 빌드 작업이라 차례로.

## 업로더 착수 조건
| 작업 | 조건 |
|---|---|
| 단계 0 포털 교체(46개 파일) | **지금 가능**(슈퍼바이저 지시). 67건 대상 18개 먼저. 허용 출처가 0이 될 수 있는 8개 파일은 첫 묶음 전에 슈퍼바이저가 확인(`docs/tools/reviewer-32/portal-count-output.txt`). 파일 10~15개 묶음 리뷰어 게이트 |
| #1 문구 이니셜화 | 기획자 정정(P2-5 포함) 후 가능. ID는 Q1 답 뒤 |
| 얼굴 없는 사진 B(시범 5건) | 기획자 15-1(P2 5건) 반영·커밋 + guide 반영(D-1) + 주 1회 점검 일정(D-2) |
| 공인 얼굴 사진 B(의혹 사안 여부 무관) | 위 조건 + 프로그래머 15(C1·C2·C6·C7) + 프로그래머 16의 C4 배포 |

## 커밋 대상 경로
- 이 리뷰: `docs/reviews/planner-15-prd-v0.9-review.md` · `docs/tools/reviewer-32/`(`portal-count.ts`·`portal-count-output.txt`·`make-variants.py`·`validate-examples.ts`·`validate-examples-output.txt`) · `docs/triggers/reviewer-32-planner-15-prd-v0.9-review-COMPLETE.md` · `instructions/reviewer/processed/32-planner-15-prd-v0.9-review.md`(이동) · `history/2026-11-09.md`
- 기획자 15 산출물(P2 정정 후): `planning/card-image-policy.md` · `planning/prd.md` · `planning/image-removal-procedure.md` · `planning/card-image-uploader-steps.md` · `planning/v0.9-copy-and-code-list.md` · `docs/triggers/planner-15-prd-v0.9-COMPLETE.md` · `instructions/planner/processed/15-prd-v0.9-card-image-and-redesign.md`
- 저장소 독립 grep(훅 패턴 + 확장 패턴): 이 리뷰 산출물·기획자 15 대상 0건.
