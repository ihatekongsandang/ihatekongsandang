# 리뷰어 04 측정 도구 — 프로그래머 01 v0.1 프로토타입 코드 리뷰

모든 명령은 프로젝트 루트(`$HOME/ihatekongsandang`)에서 실행한다. 절대경로 없음.

| 파일 | 용도 | 실행 |
|---|---|---|
| `gate-cases.sh` | 콘텐츠 검증 게이트 오류 케이스 18건(필수 6 + 추가 12) 재현. 임시 파일 생성 → 검증 → 삭제, `retired-ids.txt` 원복 | `sh docs/tools/reviewer-04/gate-cases.sh` |
| `keyboard-tab.mjs` | 헤드리스 Chrome(CDP)으로 Tab N회 눌러 포커스 순서·포커스 링(outline) 실측 | `node docs/tools/reviewer-04/keyboard-tab.mjs http://localhost:3000/ 16` |
| `fixture-sanitize.md` | 본문 sanitize 검증용 임시 게시물(HTML 주석·onerror·onmouseover·javascript:·data:·style·마크다운 이미지). `content/posts/`에 복사 → 빌드 → `/post/zz-sanitize` HTML 확인 → **삭제** | 아래 절차 |
| `fixture-hotlink-broken.md` | 깨진 핫링크 썸네일 폴백 검증용 임시 게시물(`useSourceImage: true` + 존재하지 않는 https 이미지). 프로그래머 01 `qa-screenshots.mjs hotlink` 세트와 같은 id | 아래 절차 |

## 재현 절차 (리뷰어 04가 실제 수행한 순서)

```bash
npm ci
npm run validate:content && npm run typecheck && npm run lint && npm run build
npx next start -p 3411 &
curl -sI http://localhost:3411/ | grep -iE 'strict-transport|x-content-type|x-frame|referrer|permissions|content-security|x-powered'
# 라우트 상태 27건 · rel 전수 · canonical · JSON-LD · sitemap · robots · llms.txt · OG PNG 크기는 curl + grep
node docs/tools/programmer-01/contrast-check.mjs
node docs/tools/programmer-01/qa-screenshots.mjs http://localhost:3411 <outDir> main
sh docs/tools/reviewer-04/gate-cases.sh

# 페이지네이션·sanitize·핫링크 폴백 (임시 변경 → 반드시 원복)
#   src/lib/config.ts FEED_PAGE_SIZE 12 → 2, fixture 2건을 content/posts/에 복사 후 빌드
npx next start -p 3412 &
curl -s 'http://localhost:3412/?page=2' | grep -o '<link rel="canonical"[^>]*>'
node docs/tools/programmer-01/qa-screenshots.mjs http://localhost:3412 <outDir> hotlink
node docs/tools/reviewer-04/keyboard-tab.mjs http://localhost:3412/ 16
#   원복: config.ts 복구(cmp로 바이트 동일 확인) · fixture 삭제 · rm -rf .next && npm run build
```

⚠️ fixture 2건은 `content/posts/`에 남겨 두면 실제 게시물로 배포된다. 검증 후 반드시 삭제하고 `git status`로 확인한다.
