// 리뷰어 56 — moved-ids.txt 전 줄의 이전 상태 확인(옛 id는 출력하지 않고 줄 번호로만 가리킨다).
// 사용: node docs/tools/reviewer-56/id-move-check.mjs
// 각 줄: retired 포함 · 옛 id 문자열이 content(두 txt 제외)·src·public·scripts·next.config.ts·vercel.json에 0 ·
//        옛 이미지 폴더 없음 · 새 id ko·en 파일 존재와 frontmatter id 일치 · 새 id 이미지 참조가 있으면 파일 존재.
import fs from 'node:fs'
import path from 'node:path'

const read = (f) => fs.readFileSync(f, 'utf8')
const lines = read('content/moved-ids.txt').split('\n')
const retired = new Set(read('content/retired-ids.txt').split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean))
const walk = (p) => (!fs.existsSync(p) ? [] : fs.statSync(p).isDirectory() ? fs.readdirSync(p).flatMap((n) => walk(path.join(p, n))) : [p])
const SKIP = new Set(['content/moved-ids.txt', 'content/retired-ids.txt'])
const corpus = ['content', 'src', 'public', 'scripts', 'next.config.ts', 'vercel.json'].flatMap(walk)
  .filter((f) => !SKIP.has(f) && !/\.(jpe?g|png|webp|gif|ico|woff2?)$/i.test(f)).map((f) => [f, read(f)])
let bad = 0
lines.forEach((raw, i) => {
  const body = raw.replace(/#.*/, '').trim()
  if (!body) return
  const [from, to] = body.split(/\s+/)
  const refs = corpus.filter(([, t]) => t.includes(from)).length
  const ko = `content/posts/${to}.md`, en = `content/posts-en/${to}.md`
  const idOf = (f) => (fs.existsSync(f) ? (read(f).match(/^id:\s*(\S+)/m) ?? [])[1] : null)
  const img = fs.existsSync(ko) ? [...read(ko).matchAll(/\/images\/([^/\s"]+)\/([^\s"]+)/g)] : []
  const imgOk = img.every(([, d, f]) => d === to && fs.existsSync(`public/images/${d}/${f}`))
  const checks = { retired: retired.has(from), oldRefs0: refs === 0, oldImgDir0: !fs.existsSync(`public/images/${from}`), koId: idOf(ko) === to, enId: idOf(en) === to, images: imgOk }
  const ok = Object.values(checks).every(Boolean)
  if (!ok) bad++
  console.log(`${ok ? 'OK' : 'NG'} moved-ids.txt:${i + 1} → ${to} ${JSON.stringify(checks)}${img.length ? ` 이미지 ${img.length}` : ''}`)
})
console.log(`결과: 미통과 ${bad}`)
