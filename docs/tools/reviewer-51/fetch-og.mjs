// 리뷰어 51: 묶음 14(10건) sources[] 언론 기사 전부의 og:image·사진 설명 후보를 받아 저장소 밖 폴더에 둔다(읽기 전용).
// 사용: node docs/tools/reviewer-51/fetch-og.mjs <저장소 밖 빈 폴더>
// 폴더에 기사 HTML(n.html)·og 이미지(n.img)·index.tsv를 쓴다. 표준 출력은 상대경로·URL만.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const out = process.argv[2]
if (!out || path.resolve(out).startsWith(process.cwd())) {
  console.error('저장소 밖 폴더를 인자로 주세요')
  process.exit(1)
}
fs.mkdirSync(out, { recursive: true })
// 대상 id는 기획자 16 TSV(batch=14)에서 읽는다. 출력에는 id 대신 "#번호 계정약칭"만 쓴다(id 일부에 비공인 이름이 섞인 건이 있어 산출물에 다시 적지 않기 위함).
const ids = fs.readFileSync("docs/tools/planner-16/sns-image-batches.tsv", "utf8").trim().split("\n").slice(1).map((l) => l.split("\t")).filter((c) => c[0] === "14").map((c) => c[2])
const label = (id) => `#${ids.indexOf(id) + 1} ${id.slice(11).split("-")[0]}`
const mask = (s) => ids.reduce((a, id) => a.split(id).join(`<${label(id)}>`), String(s))
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
const decode = (buf, ct) => {
  const head = buf.subarray(0, 4000).toString('latin1')
  const cs = (ct.match(/charset=([\w-]+)/i) || head.match(/charset=["']?([\w-]+)/i) || [])[1] || 'utf-8'
  try { return new TextDecoder(cs.toLowerCase() === 'ks_c_5601-1987' ? 'euc-kr' : cs).decode(buf) } catch { return new TextDecoder('utf-8').decode(buf) }
}
const meta = (html, prop) => {
  const re1 = new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)`, 'i')
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, 'i')
  return (html.match(re1) || html.match(re2) || [])[1] ?? ''
}
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()
const captions = (html) => {
  const res = []
  for (const re of [/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, /<(?:p|div|span|em|dd|td)[^>]+class=["'][^"']*(?:caption|cap|photo_?desc|img_?desc|txt_?photo|desc)[^"']*["'][^>]*>([\s\S]{0,800}?)<\/(?:p|div|span|em|dd|td)>/gi, /alt=["']([^"']{25,400})["']/gi]) {
    let m
    while ((m = re.exec(html))) { const t = strip(m[1]); if (t.length > 10 && !res.includes(t)) res.push(t) }
  }
  return res.slice(0, 8)
}
const rows = ['n\tid\turl\tstatus\togImage\timgStatus\timgType\tbytes\tcaptions']
let n = 0
for (const id of ids) {
  const fm = matter(fs.readFileSync(path.join('content/posts', `${id}.md`), 'utf8')).data
  for (const s of (fm.sources ?? []).filter((x) => x.type === '언론')) {
    n++
    let st = '', og = '', ist = '', ity = '', ib = 0, caps = []
    try {
      const r = await fetch(s.url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(20000) })
      st = String(r.status)
      const html = decode(Buffer.from(await r.arrayBuffer()), r.headers.get('content-type') ?? '')
      fs.writeFileSync(path.join(out, `${n}.html`), html)
      og = meta(html, 'og:image')
      caps = captions(html)
      if (og) {
        const u = new URL(og.replace(/&amp;/g, '&'), s.url).href
        const ir = await fetch(u, { headers: { 'User-Agent': UA, Referer: s.url }, signal: AbortSignal.timeout(20000) })
        ist = String(ir.status); ity = ir.headers.get('content-type') ?? ''
        const b = Buffer.from(await ir.arrayBuffer()); ib = b.length
        fs.writeFileSync(path.join(out, `${n}.img`), b)
      }
    } catch (e) { st = st || `ERR ${e.name}` }
    rows.push([n, id, s.url, st, og, ist, ity, ib, caps.join(' ‖ ')].join('\t'))
    console.log(`${n}\t${label(id)}\t${st}\t${ist} ${ity} ${ib}`)
  }
}
fs.writeFileSync(path.join(out, 'index.tsv'), rows.join('\n') + '\n')
console.log(`기사 ${n}건`)
