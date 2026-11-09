// 리뷰어 34: sourceUrl이 SNS가 아닌 게시물(언론 기사 근거 글)의 현재 대표 이미지 방식(읽기 전용).
// 저장소 루트에서 `node docs/tools/reviewer-34/news-host-posts.mjs`. C4 문안 2번 첫 줄(언론 기사 근거 글 = 원 매체 핫링크)의 현재 사실 대조용.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
const dir = path.join(process.cwd(), 'content', 'posts')
const sns = /(^|\.)(instagram\.com|threads\.com|threads\.net)$/
let total = 0, nonSns = 0, news = 0
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  total++
  if (data.image?.kind === 'news') news++
  let host = ''
  try { host = new URL(data.sourceUrl).hostname.replace(/^www\./, '') } catch {}
  if (sns.test(host)) continue
  nonSns++
  console.log(`${host}\tkind=${data.image?.kind ?? 'self(생략)'}\tsrc=${String(data.image?.src ?? '').startsWith('/images/') ? '/images/…(저장)' : data.image?.src}\t${data.image?.caption}`)
}
console.log(`전체 ${total} / sourceUrl이 SNS가 아닌 글 ${nonSns} / image.kind=news ${news}`)
