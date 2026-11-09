/**
 * 리뷰어 31 — 카드 이미지 스키마 경계 사례(프로그래머 13 단위 104건 밖). 판정이 아니라 현재 동작을 기록한다.
 * 사용(저장소 루트): npx tsx docs/tools/reviewer-31/schema-edge.ts
 * 주소는 예시 도메인과, 포털 판정용으로 경로만 붙인 포털 호스트 문자열만 쓴다.
 */
import { isPortalUrl, validatePost } from '../../../src/lib/content/schema'

const ARTICLE = 'https://news.example.org/article/1'
function post(image: Record<string, unknown>, sources?: unknown[]): Record<string, unknown> {
  return {
    id: 'edge-post', title: '예시', description: '예시 요약', publishedAt: '2026-11-09', sourceType: 'url',
    sourceUrl: 'https://www.example.com/p/1', attribution: '예시',
    sources: sources ?? [{ type: '언론', name: '예시일보', url: ARTICLE, date: '2026-11-08' }],
    tags: ['예시'], image,
  }
}
const news = (over: Record<string, unknown> = {}) => ({
  kind: 'news', src: 'https://img.example.org/1.jpg', alt: '예시 사진', creditName: '예시일보', creditNameEn: 'Example Daily',
  sourcePageUrl: ARTICLE, retrievedAt: '2026-11-09', faceNote: '얼굴 없음(건물)', ...over,
})
const rows: [string, boolean][] = []
function run(name: string, data: Record<string, unknown>) {
  const r = validatePost(data, '', 'edge-post.md')
  rows.push([name, r.errors.length === 0])
  console.log(`${r.errors.length === 0 ? '통과' : '거부'}  ${name}${r.errors.length ? ' — ' + (r.errors[0] ?? '').slice(0, 90) : ''}`)
}
// 포털 판정
for (const u of ['https://naver.me/x', 'https://news.kakao.com/x', 'https://v.daum.net/x', 'https://m.news.nate.com/x', 'https://news.zum.com/x',
  'https://imgnews.pstatic.net/x.jpg', 'https://t1.daumcdn.net/x.jpg', 'https://news.google.com/x', 'https://www.msn.com/ko-kr/x', 'https://NEWS.NAVER.COM./x'])
  console.log(`isPortalUrl ${isPortalUrl(u) ? '참' : '거짓'}  ${u}`)
// 경계
run('news sourcePageUrl 끝 슬래시만 다름', post(news({ sourcePageUrl: ARTICLE + '/' })))
run('news src localhost https', post(news({ src: 'https://localhost/x.jpg' })))
run('news src 사설 IP https', post(news({ src: 'https://192.168.0.1/x.jpg' })))
run('news retrievedAt 미래 2099-01-01', post(news({ retrievedAt: '2099-01-01' })))
run('news faceNote 공백만', post(news({ faceNote: '   ' })))
run('news src에 이미지 아닌 html 주소', post(news({ src: 'https://news.example.org/article/1' })))
run('news 단축주소 출처(naver.me) — sources에도 같은 값', post(news({ sourcePageUrl: 'https://naver.me/abc' }), [{ type: '언론', name: '예시일보', url: 'https://naver.me/abc', date: '2026-11-08' }]))
run('public src 외부 https', post({ kind: 'public', src: 'https://img.example.org/1.jpg', alt: 'a', creditName: '예시청', creditNameEn: 'Ex', sourcePageUrl: 'https://www.example.com/k', license: 'kogl-1', retrievedAt: '2026-11-09', faceNote: '얼굴 없음' }))
run('public license 대문자 KOGL-1', post({ kind: 'public', src: '/images/edge/1.jpg', alt: 'a', creditName: '예시청', creditNameEn: 'Ex', sourcePageUrl: 'https://www.example.com/k', license: 'KOGL-1', retrievedAt: '2026-11-09', faceNote: '얼굴 없음' }))
run('kind 빈 문자열', post({ kind: '', src: '/images/edge/1.jpg', alt: 'a' }))
console.log(`\n사례 ${rows.length}개 기록`)
