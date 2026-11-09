/**
 * 리뷰어 32 — 포털 출처 집계 재현. 저장소 루트에서 실행:
 *   npx tsx docs/tools/reviewer-32/portal-count.ts docs/tools/reviewer-30/post-recheck.tsv
 * 검증기와 같은 isPortalUrl(PORTAL_HOSTS 전체)로 sources[].url·sourceUrl·og.image를 센다. 읽기만 한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { isPortalUrl } from '../../../src/lib/content/schema'

const recheck = process.argv[2]
const ids67 = new Set<string>()
if (recheck) {
  for (const line of fs.readFileSync(recheck, 'utf8').split('\n').slice(1)) {
    const id = line.split('\t')[1]
    if (id) ids67.add(id)
  }
}
for (const dir of ['content/posts', 'content/posts-en']) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
  let portalFiles = 0, sourcesHits = 0, sourceUrlHits = 0, ogImageHits = 0, in67 = 0
  const hosts = new Map<string, number>()
  const noAllowedLeft: string[] = []
  for (const f of files) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
    const srcs = (Array.isArray(data.sources) ? data.sources : []) as { url?: string; type?: string }[]
    let hit = false
    for (const s of srcs) {
      if (typeof s.url === 'string' && isPortalUrl(s.url)) {
        sourcesHits++; hit = true
        const h = new URL(s.url).hostname
        hosts.set(h, (hosts.get(h) ?? 0) + 1)
      }
    }
    if (typeof data.sourceUrl === 'string' && isPortalUrl(data.sourceUrl)) { sourceUrlHits++; hit = true }
    if (typeof data.og?.image === 'string' && isPortalUrl(data.og.image)) ogImageHits++
    if (!hit) continue
    portalFiles++
    const id = f.replace(/\.md$/, '')
    if (ids67.has(id)) in67++
    const left = srcs.filter((s) => typeof s.url === 'string' && !isPortalUrl(s.url) && ['언론', '수사기관', '법원'].includes(String(s.type))).length
    if (left === 0) noAllowedLeft.push(id + (ids67.has(id) ? ' [67건 대상]' : ''))
  }
  console.log(`${dir}: 파일 ${files.length} · 포털 포함 파일 ${portalFiles}(67건 대상 ${in67}) · sources[] 포털 ${sourcesHits} · sourceUrl 포털 ${sourceUrlHits} · og.image 포털 ${ogImageHits} · 호스트 ${JSON.stringify([...hosts])}`)
  if (noAllowedLeft.length) console.log(`  포털을 빼면 허용 출처(언론·수사기관·법원)가 0이 되는 파일 ${noAllowedLeft.length}:\n  - ${noAllowedLeft.join('\n  - ')}`)
}
