/**
 * 리뷰어 12 — /_next/image URL 목록을 제한 시간·동시 요청으로 다시 받아 멈춤 수를 폭별로 센다.
 * 사용: node docs/tools/reviewer-12/image-probe.mjs <baseUrl> <URL 목록 파일> [제한ms=3000] [동시=16]
 * URL 목록: 피드 전 페이지 srcSet의 /_next/image 경로를 한 줄에 하나(results/image-hang-repro.log 절차).
 */
import fs from 'node:fs'
const [base, file, limit = '3000', conc = '16'] = process.argv.slice(2)
const list = fs.readFileSync(file, 'utf8').trim().split('\n')
const out = []; let i = 0
async function w() { while (i < list.length) { const u = list[i++]; const c = new AbortController(); const t = setTimeout(() => c.abort(), +limit); const s = Date.now()
  try { const r = await fetch(base + u, { headers: { accept: 'image/avif,image/webp,*/*' }, signal: c.signal }); await r.arrayBuffer(); out.push([r.status, Date.now() - s, u]) } catch { out.push(['HANG', Date.now() - s, u]) } finally { clearTimeout(t) } } }
await Promise.all(Array.from({ length: +conc }, w))
const hang = out.filter((o) => o[0] === 'HANG')
const byW = {}; for (const h of hang) { const k = h[2].match(/w=(\d+)/)[1]; byW[k] = (byW[k] ?? 0) + 1 }
console.log(`${base} 요청 ${out.length} · 200 ${out.filter((o) => o[0] === 200).length} · 멈춤 ${hang.length} · 폭별 멈춤 ${JSON.stringify(byW)}`)
for (const h of hang.slice(0, 3)) console.log('  ', h[2])
