/**
 * 리뷰어 11 — `?page=` 변형·404 경로의 HTTP 상태를 기준(HEAD)·작업 서버에서 나란히 잰다.
 * 404 응답은 서버 HTML의 `<html lang>`·robots 메타·사이트 404 문구(RSC 포함) 유무도 적는다.
 *   node docs/tools/reviewer-11/http-404-matrix.mjs <기준 baseUrl> <작업 baseUrl>
 */
const [baseA, baseB] = process.argv.slice(2)
const paths = [
  '/?page=1', '/?page=11', '/?page=12', '/?page=999', '/?page=0', '/?page=-1', '/?page=abc', '/?page=2.5',
  '/tag/dmz?page=99', `/tag/${encodeURIComponent('25사단')}?page=2`, `/tag/${encodeURIComponent('25사단')}?page=3`,
  '/tag/no-such-tag', '/tag/no-such-tag?page=2',
  '/en?page=1', '/en?page=2', '/en?page=99', '/en?page=abc',
  '/page/1', '/page/999', '/post/no-such', '/en/post/no-such', '/en/tag/dmz', '/en/page/2', '/no/such/path',
]
const info = async (base, p) => {
  const r = await fetch(base + p, { redirect: 'manual' })
  const h = await r.text()
  const lang = h.match(/<html[^>]*\blang="([^"]*)"/)?.[1] ?? '-'
  const robots = [...h.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]).join(' + ') || '-'
  const ko = h.includes('페이지를 찾을 수 없습니다'), en = h.includes('Page not found'), nextDefault = h.includes('This page could not be found')
  return { status: r.status, lang, robots, site404: `${ko ? 'ko' : ''}${en ? '+en' : ''}` || '-', nextDefault }
}
let same = 0
for (const p of paths) {
  const a = await info(baseA, p), b = await info(baseB, p)
  if (a.status === b.status) same++
  console.log(`${a.status === b.status ? 'SAME' : 'DIFF'}  ${decodeURIComponent(p)}  기준 ${a.status} · 작업 ${b.status} | 작업 lang=${b.lang} robots=[${b.robots}] 사이트404문구=${b.site404} | 기준 robots=[${a.robots}]`)
}
console.log(`상태 코드 일치 ${same}/${paths.length}`)
