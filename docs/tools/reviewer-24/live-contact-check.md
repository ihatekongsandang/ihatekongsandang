# 리뷰어 24 — 라이브 연락처 placeholder 확인 (2026-11-08 22:47 KST, curl 1회씩)

| URL | HTTP | `contact@example.invalid` 출현 수 | 안내 문구 |
|---|---|---|---|
| https://ihatekongsandang.vercel.app/about | 200 | 4 | "확정 전 임시" 1건 |
| https://ihatekongsandang.vercel.app/en/about | 200 | 4 | "temporary placeholder" 있음 |

- 출처 코드: `src/lib/config.ts` 21행 `contactEmail: 'contact@example.invalid'`, `src/app/(ko)/about/page.tsx` 정정·삭제 요청 절 `mailto:${SITE.contactEmail}`.
- `.invalid`는 예약 최상위 도메인이라 메일이 전달되지 않는다(RFC 2606·6761). 즉 현재 라이브 사이트에서 정정·삭제 요청을 받을 경로가 작동하지 않는다.
- 측정 명령: `curl -s -o <임시파일> -w '%{http_code}' https://ihatekongsandang.vercel.app{/about,/en/about}` 후 `grep -o 'contact@example.invalid' | wc -l`. 응답 원문은 저장하지 않았다.
