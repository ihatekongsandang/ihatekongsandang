# 리뷰어 68 — 프로그래머 19·19-1 검토 (kind: open · 상세 출처 표시 · 소개 문구)

담당: 리뷰어(Opus) · 검토(테스트 실행 가능) · 파일 수정·git 쓰기 금지 · 이 검토 결과가 커밋 게이트

## 대상
- 트리거 `docs/triggers/programmer-19-image-kind-open-a2-COMPLETE.md`(19 + "## 19-1"), 핸드오프 `docs/handoffs/programmer-19-image-kind-open-a2.md`, 도구 `docs/tools/programmer-19/`
- 트리거의 "커밋할 경로"(`git diff`와 새 파일). 다른 세션의 미추적 게시물 1쌍(`2026-11-10-attendkdz-…`)은 대상이 아니다.

## 기준
- `planning/card-image-policy.md` §4.5·§8, 기획자 19 트리거 "## 19-2" §2·§3과 "## 19-3", 리뷰 67-2 P3-3(en workYear 괄호 생략)
- 오더 `instructions/programmer/processed/19-image-kind-open-a2.md`, 19-1 지시: ko "사람이 나오는 사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며," / en "Photos showing people are used only if taken at the event the post covers, and"

## 검토 항목
1. 스키마: kind↔license 조합, 버전 없는 cc-by·지역판·BY-SA 거부, open 필수 필드, `sourceType: url` 한정, `images[]` 금지, news `sources[]` 검사 유지, 기존 public·news 동작 불변.
2. 상세 출처 표시 ko·en이 정책 §4.5-11 서식과 글자로 일치하는가(CC BY·CC0·PD·기증, workYear 생략, caption 표시, 링크 `rel`). 라이선스 요구(저작자·제목·라이선스 링크·원 페이지) 충족.
3. next/image: kcc-donated 최적화 제외 구현과 실측 근거. 다른 라이선스 처리.
4. OG·JSON-LD·사이트맵에서 open 제외, 카드 표시. 확인 필요 8(카드 RSC 페이로드 credit)·9(`/_next/image` 직접 요청)의 위험도 평가.
5. 소개 페이지 ko·en: 19-2 §3 A-2 줄 글자 그대로 + 19-1 보정, 하위 목록 4개, copy-exact 기대값.
6. validate 경고(A-2 caption·연도 미상·3건 초과·400px)와 `scripts/image-size.ts`의 안전성(외부 입력, 의존성 추가 여부).
7. 테스트 충분성(양성 대조 포함), 남은 확인 필요 1~6·10의 처리 방향 제안(첫 게시 전 필요 여부 구분).
8. 직접 실행: `npm run validate:content`, typecheck, 단위 테스트. **빌드는 Opus5 창이 쉬고 있을 때만 하고, `.next`를 건드리는 명령은 한 번만 실행한다.**
9. 저장소 독립·실명·옛 id·사진 저작자 이름·임시 절대경로(`/var/folders`·`/private/tmp`) grep(커밋 경로의 + 줄과 새 파일).

## 🔴 금지
- 파일 수정 금지, git 쓰기 금지.

## 산출물
- 🔴 **완료 트리거 생성 필수**: `docs/triggers/reviewer-68-programmer-19-review-COMPLETE.md`
  - 판정(통과 / 조건부 통과 / 반려)
  - P1~P3 지적(파일:줄·근거·수정안)
  - 실행한 명령과 결과, 최종 커밋 경로 목록
- 끝나면 이 오더를 `instructions/reviewer/processed/`로 옮긴다.
