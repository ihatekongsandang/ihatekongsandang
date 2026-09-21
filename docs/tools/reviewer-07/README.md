# 리뷰어 07 측정 도구 — 코드(프로그래머 03) + PRD v0.6 + 초안 3건 게시 게이트

모든 명령은 프로젝트 루트(`$HOME/ihatekongsandang`)에서 실행한다. 절대경로 없음.

| 파일 | 용도 | 실행 |
|---|---|---|
| `gate-cases.sh` | 단일 스키마 검증 게이트 오류 케이스 17건(프로그래머 03의 7케이스 중 검증기 케이스 6 + 폐기 ID 7a + 리뷰어 추가 10). 임시 파일 생성 → 검증 → 삭제, `retired-ids.txt` 원복. 각 줄에 기대 exit와 실측 exit, OK/MISMATCH 표기 | `sh docs/tools/reviewer-07/gate-cases.sh` |
| `xref.mjs` | PRD·핸드오프의 `§N.N`·`§N①` 참조가 실제 헤딩에 있는지 전수 대조 | `node docs/tools/reviewer-07/xref.mjs planning/prd.md` |
| `approved-posts/*.md` | 🔴 리뷰어가 승인한 첫 게시 파일 3건(검증·빌드·렌더 실측 통과본). 슈퍼바이저는 그대로 `content/posts/`로 복사 | `cp docs/tools/reviewer-07/approved-posts/*.md content/posts/ && npm run validate:content` |

## 재현 절차 (리뷰어 07이 실제 수행한 순서)

```bash
npm ci
npm run validate:content && npm run typecheck && npm run lint && npm run build
npx next start -p 3411 &        # 라우트 18건 · 헤더 · og:image · 라벨 문자열 잔존 · llms.txt — curl+grep
sh docs/tools/reviewer-07/gate-cases.sh
# 케이스 7b(R4): retired-ids.txt에 example-case-a 추가 → `npx next build` 직행 → "콘텐츠 검증 실패 1건" 확인 → 원복
# 초안 3건 렌더 + 검증 메타태그 "값 있음" 상태 (임시 투입 → 반드시 제거)
cp docs/tools/reviewer-07/approved-posts/*.md content/posts/
NEXT_PUBLIC_GSC_VERIFICATION=test-gsc-token NEXT_PUBLIC_NAVER_VERIFICATION=test-naver-token npm run build
npx next start -p 3412 &        # 상세 3건 200 · 발언자 배지 · 배경 보도 · 원문 링크 · meta 2개 · 브라우저 렌더
rm content/posts/2026-09-20-*.md && npm run build   # 값 없음 상태(meta 0) · git status 원복 확인
```
⚠️ 초안 3건을 `content/posts/`에 남기면 그대로 배포된다. 게시는 슈퍼바이저가 결정한다.
