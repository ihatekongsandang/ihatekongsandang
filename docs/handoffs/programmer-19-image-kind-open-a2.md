# 프로그래머 세션 — 19-image-kind-open-a2 핸드오프
**작성일**: 2026-11-11 19:25 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)

## 요약 (3줄)
- 대표 이미지 `kind: open`(A-2 인물 없는 자료사진)과 license 6값(CC BY 2.0/3.0/4.0·CC0·PD·공유마당 기증)을 스키마·검증·상세 표시·카드에 넣었다. 지역판·BY-SA 등은 값이 없어 막힌다.
- 상세 figcaption은 정책 §4.5-11 서식(ko·en)과 caption 위 배치, 기증저작물은 전부 next/image 최적화 제외(보수안), 소개 페이지 A-2 줄 ko·en 추가.
- validate·typecheck·lint·build·게이트(--worktree) 모두 exit 0, 단위 289/289, fixture 빌드 전수 104/104. 실제 게시물·이미지 변경 0, git 쓰기 0.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/content/schema.ts` | open kind·license·필드·검증·권장 경고·`unoptimized` |
| `src/components/post-detail.tsx` · `src/lib/i18n.ts` | open 크레딧 줄(`OpenCreditLine`)·낱말 |
| `src/components/card-media.tsx` | `unoptimized`, 옛 건수 주석 정정 |
| `src/lib/content/translation.ts` | 영어 caption 권장 경고 |
| `scripts/validate-content.ts` · `scripts/image-size.ts` | 400px·같은 원본 3건 초과 경고, open 집계 |
| `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` | A-2 줄 |
| `content/README.md` §3.6·§8·§9 | open 예시·값 표·필드 표 |
| `docs/tools/programmer-19/` | 도구·출력(README 표) |
| `docs/triggers/programmer-19-image-kind-open-a2-COMPLETE.md` | 파일:줄·검증·확인 필요·커밋 경로 |

## 주요 결정사항
- next/image: kcc-donated 전부 제외(글자 판정 오류 시 무변형 위반 위험 > 원본 크기 손해).
- licenseUrl 버전 대조를 오류로 넣었다(표시 "CC BY 4.0"과 다른 버전 문서 링크 방지). 정책 "버전 명시" 취지 안의 보강.
- PD 근거 문구는 `licenseLabel`(선택)로, PD도 원 페이지 링크를 건다(소개 문구와 일치).
- 10년 이상 전 사진의 "현재 모습과 다를 수 있습니다." 누락도 경고에 넣었다(정책 §4.5-4).
- public `workTitle`·`workYear`는 받기만 하고 표시는 그대로(문안 미확정).

## 미해결·이슈
트리거 "남은 확인 필요" 1~11. 특히 PD 근거 필드(1), public 공식 문구 문안(6), 소개 페이지 "같은 사건 당시의 것만" 줄(7), 카드 RSC 페이로드 credit(8).

## 다음 세션 가이드
- 리뷰어: 트리거의 표시 표·검증 표를 기준으로 `unit-checks.tsx`·`fixture-build-check.mjs`를 다시 돌려 확인. 커밋은 이 오더 경로만 스테이징 후 `--staged` 게이트.
- 업로더: A-2 첫 게시 전 README §3.6 표대로 frontmatter 작성. 첫 사용 시 소개 페이지 "(현재 쓰는 사진은 없습니다)" 삭제는 별도 오더.

## 참고 링크
`planning/card-image-policy.md` §4.5·§8 · `docs/triggers/planner-19-image-expansion-archive-kogl-COMPLETE.md` 19-2·19-3 · `docs/triggers/reviewer-67-planner-19-review-COMPLETE.md` 67-2
