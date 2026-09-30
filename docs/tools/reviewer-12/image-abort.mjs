/**
 * 리뷰어 12 — URL 목록 전부를 동시에 요청하고 n ms 뒤 모두 끊는다(브라우저 이동 중 끊긴 이미지 요청 흉내).
 * 사용: node docs/tools/reviewer-12/image-abort.mjs <baseUrl> <URL 목록 파일> <ms>
 */
import fs from 'node:fs'
const [base, file, ms] = process.argv.slice(2)
const list = fs.readFileSync(file, 'utf8').trim().split('\n'); let a = 0, f = 0
await Promise.all(list.map(async (u) => { const c = new AbortController(); setTimeout(() => c.abort(), +ms); try { const r = await fetch(base + u, { headers: { accept: 'image/avif,image/webp,*/*' }, signal: c.signal }); await r.arrayBuffer(); f++ } catch { a++ } }))
console.log(`${base} ${ms}ms 뒤 끊기 · 끊김 ${a} · 완료 ${f}`)
