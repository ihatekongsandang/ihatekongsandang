/**
 * 프로그래머 14-1 — 상세 보조 열(배경 보도·공유·태그) 높이 전수 측정. sticky 기준 높이(P1-1)를 정하는 근거.
 * 사용(저장소 루트, 로컬 프로덕션 서버 실행 중): node docs/tools/programmer-14-1/aside-height-all.mjs <baseUrl> [출력 json]
 * content/posts 전체(ko) + content/posts-en 전체(en) × 1024·1280폭. 화면 높이와 무관하게 열 높이를 잰다(높이 2000으로 열어 sticky 영향 제거).
 */
import fs from 'node:fs'
import { withChrome, delay } from '../programmer-04/cdp.mjs'
const base = process.argv[2]
const out = process.argv[3] ?? 'docs/tools/programmer-14-1/aside-height-all.json'
const ko = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))
const en = fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))
const pages = [...ko.map((id) => ['ko', `/post/${id}`, id]), ...en.map((id) => ['en', `/en/post/${id}`, id])]
const rows = []
await withChrome(9441, async (client) => {
  for (const w of [1024, 1280]) {
    await client.setViewport(w, 2000, false)
    for (const [lang, path, id] of pages) {
      await client.navigate(`${base}${path}`)
      await delay(60)
      const r = await client.evaluate(`(() => { const a = document.querySelector('main aside'); if (!a) return null; const b = a.getBoundingClientRect(); return { h: Math.round(b.height), sources: a.querySelectorAll('#sources-heading ~ ul > li').length, tags: a.querySelectorAll('#tags-heading ~ ul > li').length } })()`)
      rows.push({ w, lang, id, ...r })
    }
  }
})
fs.writeFileSync(out, JSON.stringify(rows, null, 1))
for (const w of [1024, 1280]) for (const lang of ['ko', 'en']) {
  const rs = rows.filter((r) => r.w === w && r.lang === lang && r.h)
  const max = rs.reduce((m, r) => (r.h > m.h ? r : m), rs[0])
  console.log(`${w} ${lang}: ${rs.length}건 · 최대 ${max.h}px (${max.id}, 출처 ${max.sources}·태그 ${max.tags}) · 최소 ${Math.min(...rs.map((r) => r.h))}px`)
}
console.log(`측정 ${rows.length}건(누락 ${rows.filter((r) => !r.h).length})`)
