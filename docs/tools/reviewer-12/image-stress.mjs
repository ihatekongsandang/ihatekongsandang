/**
 * 리뷰어 12 — `/_next/image` 응답 멈춤(리뷰 10 P2-2 · 프로그래머 06 핸드오프 미해결 1) 재현 시험.
 *
 * 사용: node docs/tools/reviewer-12/image-stress.mjs <baseUrl> [동시요청=8] [제한초=20] [반복=2]
 *
 * 피드 전 페이지(한국어 `/`·`/?page=n`, 영어 `/en`·`/en?page=n`) HTML의 `<img srcset>`에서 `/_next/image` URL을
 * **전부** 모아(폭별 후보 전부) 브라우저와 같은 Accept(avif·webp)로 요청한다. 제한 시간 안에 본문까지 다 받지 못하면 "멈춤".
 * 첫 회차는 최적화(캐시 생성) 경로, 두 번째 회차부터는 캐시 경로를 탄다. 멈춤이 하나라도 있으면 종료 코드 1.
 */
const [base, concArg = '8', limitArg = '20', repeatArg = '2'] = process.argv.slice(2)
if (!base) {
  console.error('사용: node image-stress.mjs <baseUrl> [동시요청] [제한초] [반복]')
  process.exit(2)
}
const CONC = Number(concArg)
const LIMIT = Number(limitArg) * 1000
const REPEAT = Number(repeatArg)
const ACCEPT = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'

async function pagesOf(first, param) {
  const urls = [first]
  const html = await (await fetch(base + first)).text()
  const m = html.match(/(\d+) \/ (\d+) 페이지|Page \d+ of (\d+)/)
  const total = Number(m?.[2] ?? m?.[3] ?? 1)
  for (let n = 2; n <= total; n += 1) urls.push(`${first === '/' ? '/' : first}${param}${n}`)
  return urls
}

const pages = [...(await pagesOf('/', '?page=')), ...(await pagesOf('/en', '?page='))]
const images = new Set()
for (const p of pages) {
  const html = await (await fetch(base + p)).text()
  for (const [, srcset] of html.matchAll(/srcSet="([^"]+)"/g)) {
    for (const part of srcset.split(',')) {
      const u = part.trim().split(/\s+/)[0].replace(/&amp;/g, '&')
      if (u.startsWith('/_next/image')) images.add(u)
    }
  }
}
const list = [...images]
console.log(`피드 페이지 ${pages.length}개 · /_next/image 고유 URL ${list.length}개 · 동시 ${CONC} · 제한 ${LIMIT / 1000}s · 반복 ${REPEAT}`)

// ABORT_MS=n 이면 본 회차 전에 "0회차"로 모든 URL을 요청한 뒤 n ms 만에 끊는다 — 브라우저가 이동하며 끊은 요청이
// 서버에 멈춘 상태를 남기는지(핸드오프 미해결 1 가설) 본다. 캐시를 비우고 재시작한 서버에 쓴다.
const ABORT_MS = Number(process.env.ABORT_MS ?? 0)
if (ABORT_MS > 0) {
  let aborted = 0
  let finished = 0
  await Promise.all(
    list.map(async (u) => {
      const ctrl = new AbortController()
      setTimeout(() => ctrl.abort(), ABORT_MS)
      try {
        const res = await fetch(base + u, { headers: { accept: ACCEPT }, signal: ctrl.signal })
        await res.arrayBuffer()
        finished += 1
      } catch {
        aborted += 1
      }
    }),
  )
  console.log(`0회차(${ABORT_MS}ms 뒤 끊기, 동시 ${list.length}): 끊김 ${aborted} · 완료 ${finished}`)
}

let hung = 0
for (let round = 1; round <= REPEAT; round += 1) {
  let ok = 0
  const bad = []
  let maxMs = 0
  let index = 0
  async function worker() {
    while (index < list.length) {
      const u = list[index++]
      const started = Date.now()
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), LIMIT)
      try {
        const res = await fetch(base + u, { headers: { accept: ACCEPT }, signal: ctrl.signal })
        const buf = await res.arrayBuffer()
        const ms = Date.now() - started
        maxMs = Math.max(maxMs, ms)
        if (res.status === 200 && buf.byteLength > 0) ok += 1
        else bad.push(`${res.status} ${u}`)
      } catch (e) {
        bad.push(`${e.name === 'AbortError' ? '멈춤' : e.name} ${u}`)
      } finally {
        clearTimeout(timer)
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker))
  const hangs = bad.filter((b) => b.startsWith('멈춤')).length
  hung += hangs
  console.log(`회차 ${round}: 200 ${ok}/${list.length} · 실패 ${bad.length}(멈춤 ${hangs}) · 최장 ${maxMs}ms`)
  for (const b of bad.slice(0, 10)) console.log(`  ${b}`)
}
process.exit(hung ? 1 : 0)
