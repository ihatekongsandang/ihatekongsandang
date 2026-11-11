# 프로그래머 세션 — 20-image-license-expand 핸드오프
**작성일**: 2026-11-12 07:35 | **작성 세션**: 프로그래머 (Opus 5.5, 실제 모델 ID `claude-opus-5-5`)

## 요약 (3줄)
- 대표 이미지 `kind: open` 라이선스에 CC BY-SA·BY-ND 2.0/3.0/4.0·한국판 CC BY(-SA) 2.0 KR 8개 값을 더하고, CC URL 검증 함정(국제판 값에 `kr/`·`igo/` 통과)을 고쳤으며, pd는 `pdBasis`·`pdBasisYear`(max(1962, 올해 − 71)) 근거 4종으로 바꿨다.
- 상세 표시(BY-SA·ND 접미, pd 근거별 고정 문구 ko·en), ND 카드·상세 `object-contain`, 카드 payload `credit` 제거, A-2 caption 3형식 경고(public 포함), 재사용 6건·피드 인접 경고, 소개 문구·`content/README.md`를 반영했다.
- validate 420/420 R=0(새 경고 2건) · typecheck·lint·build 799/799 · 단위 514/514 · 빌드 산출물 6,779/6,779 · copy-exact 41/41 · `--worktree` 게이트 exit 0. 커밋하지 않았다.

## 산출물
| 경로 | 설명 |
|---|---|
| `src/lib/content/schema.ts` | license 값·`PD_BASES`·`pdExpiredMaxYear`·`CC_LICENSE_PATH`/`CC_LICENSE_TAIL`·거부 사유·pd 검증·A-2 caption 함수·`CardMedia.contain` |
| `src/lib/content/translation.ts` | 영어 caption A-2 경고를 같은 함수로(public A-2 포함) |
| `src/lib/content/view.ts` | `toCardView`에서 `credit` 제거 |
| `src/components/post-detail.tsx` · `src/lib/i18n.ts` | 라이선스 이름·접미·pd 문구 ko·en |
| `src/components/card-media.tsx` | ND `object-contain` |
| `scripts/image-reuse.ts`(새) · `scripts/validate-content.ts` | 같은 원본(주소·파일 해시) 한도·메인 피드 인접 경고 |
| `src/app/(ko)/about/page.tsx` · `src/app/(en)/en/about/page.tsx` | A-2 줄 장비 구절 포함 문안 |
| `content/README.md` | §3.6·§8 |
| `docs/tools/programmer-20/` | 테스트·출력 전부(README 표) |
| `docs/triggers/programmer-20-image-license-expand-COMPLETE.md` | 명세별 파일:줄·검증·확인 필요·커밋 경로 |

## 주요 결정사항 (자체 판단 + 근거)
- CC URL 꼬리: 언어 접미로 보이는 `.txt`·`.htm`·`.rdf`·`.pdf`·`.xml`은 형식 접미라 거부(명세 "그 밖은 모두 거부").
- 한국판 CC BY 2.0 KR에는 "(변경 없음·크기 조정 외)" 미부착(명세 7은 BY-SA·ND만 "항상").
- pd ko 괄호 앞 공백은 정책 §4.5-11 서식 글자대로.
- public A-2는 `workYear` 선택이라 caption의 '촬영 연도 미상'으로만 연도 미상 판단. faceNote 경고도 public A-2에 적용(정책 §4.5-14).
- 재사용 묶음에 A-2가 하나라도 있으면 6건, 아니면 3건. 7번째 판정은 오래된 순, 인접 경고는 피드 위쪽 글에.
- ND는 카드뿐 아니라 상세 figure도 같은 `CardMedia`라 함께 `object-contain`(명세 8 "상세에서도 원본 전체").

## 미해결·이슈
- 트리거 "남은 확인 필요" 1~10. 특히 1(pd 공백)·2("1950" 연도 표기)·7(기획 문안 목록 갱신은 기획자 몫).
- 새 경고 2건: 같은 원본 인접 1건(08-12 ↔ 08-25), 영어 caption 형식 1건(10-29 원산) — 게시물 정리는 업로더·슈퍼바이저.

## 다음 세션 가이드
- 리뷰어(Opus 5.5): 트리거의 명세 1~12 표·테스트·양성 대조 확인 → 판정 뒤 슈퍼바이저 커밋(`--staged` 게이트 권장).
- 업로더: ND 사진은 이 변경이 **배포된 뒤**에만 올린다. pd는 `pdBasis`·`pdBasisYear` 필수, `licenseLabel` 쓰지 않음.

## 참고 링크
- `planning/card-image-policy.md` §4.5·§8 · `docs/triggers/planner-20-image-max-license-scope-COMPLETE.md` "## 20-1" · `docs/triggers/reviewer-71-planner-20-review-COMPLETE.md`
