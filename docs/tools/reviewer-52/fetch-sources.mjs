// 리뷰어 52: 게시물(ko) sources[] 기사 본문을 저장소 밖 폴더에 받고, 주어진 낱말 주변 글을 뽑는다(읽기 전용).
// 사용: node docs/tools/reviewer-52/fetch-sources.mjs <저장소 밖 폴더> <게시물 id> <낱말> [낱말…]
// 출력(표준 출력)에는 이름이 섞일 수 있으므로 저장소 안 파일로 돌려 저장하지 않는다.
import fs from 'node:fs'
import path from 'node:path'

const [out, id, ...terms] = process.argv.slice(2)
if (!out || path.resolve(out).startsWith(process.cwd()) || !id) {
  console.error('사용: <저장소 밖 폴더> <id> <낱말…>')
  process.exit(1)
}
fs.mkdirSync(out, { recursive: true })
const src = fs.readFileSync(`content/posts/${id}.md`, 'utf8')
const urls = [...src.matchAll(/^\s+url:\s*(\S+)/gm)].map((m) => m[1].replace(/^"|"$/g, ''))
const UA = 'Mozilla/5.0'
const decode = (buf, ct) => {
  const head = buf.subarray(0, 4000).toString('latin1')
  const cs = (ct.match(/charset=([\w-]+)/i) || head.match(/charset=["']?([\w-]+)/i) || [])[1] || 'utf-8'
  try { return new TextDecoder(/ks_c_5601|euc-kr/i.test(cs) ? 'euc-kr' : cs).decode(buf) } catch { return new TextDecoder('utf-8').decode(buf) }
}
const text = (html) => html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/\s+/g, ' ')
let n = 0
for (const u of urls) {
  n++
  let status = 'ERR'
  let t = ''
  try {
    const r = await fetch(u, { headers: { 'User-Agent': UA }, redirect: 'follow' })
    status = r.status
    const buf = Buffer.from(await r.arrayBuffer())
    fs.writeFileSync(path.join(out, `${id.slice(0, 10)}-${n}.html`), buf)
    t = text(decode(buf, r.headers.get('content-type') || ''))
  } catch (e) { status = `ERR ${e.message}` }
  console.log(`[${n}] ${status} ${u}`)
  for (const term of terms) {
    const hits = []
    let k = t.indexOf(term)
    while (k >= 0 && hits.length < 3) { hits.push(t.slice(Math.max(0, k - 70), k + term.length + 50)); k = t.indexOf(term, k + term.length) }
    for (const h of hits) console.log(`   ${term}: …${h}…`)
  }
}
