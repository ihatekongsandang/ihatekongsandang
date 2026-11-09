// 기획자 16: self 원문 SNS 이미지 140건 중 근거 언론 기사(sources[] type 언론)가 있는 건 수(읽기 전용).
// 실행: node docs/tools/planner-16/count-news-sources.mjs  (먼저 count-self-images.mjs로 self-images.tsv 생성)
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'
const root = process.cwd()
const rows = fs.readFileSync(process.env.SELF_TSV ?? path.join(os.tmpdir(), 'planner16-self-images.tsv'), 'utf8').trim().split('\n').slice(1).map((l) => l.split('\t'))
const portal = /(^|\.)(naver\.com|daum\.net|nate\.com|zum\.com|kakao\.com|msn\.com)$/
let target = 0, withNews = 0, withNonPortal = 0, withMultiDomain = 0, noSources = 0
const hist = new Map()
for (const [id, , caption] of rows) {
  if (!((/^원문/.test(caption) && !/직접 만든/.test(caption)) || /jwapaloma/.test(caption))) continue
  target++
  const { data } = matter(fs.readFileSync(path.join(root, 'content/posts', id + '.md'), 'utf8'))
  const s = Array.isArray(data.sources) ? data.sources : []
  if (s.length === 0) noSources++
  const news = s.filter((x) => x.type === '언론')
  if (news.length) withNews++
  const hosts = new Set()
  for (const n of news) { try { const h = new URL(n.url).hostname.replace(/^www\./, ''); if (!portal.test(h)) hosts.add(h) } catch {} }
  if (hosts.size) withNonPortal++
  if (hosts.size > 1) withMultiDomain++
  hist.set(hosts.size, (hist.get(hosts.size) ?? 0) + 1)
}
console.log(`대상 ${target}건 / sources 없음 ${noSources} / 언론 type 출처 있음 ${withNews} / 그중 포털 아닌 원 매체 주소 있음 ${withNonPortal} / 원 매체 2곳 이상 ${withMultiDomain}`)
console.log('원 매체 도메인 수별:', [...hist].sort().map(([k, v]) => `${k}곳 ${v}건`).join(', '))
