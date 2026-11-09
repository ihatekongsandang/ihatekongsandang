/**
 * 리뷰어 33 — 기존 일반 빌드(.next)에서 self 이미지 caption이 상세에 나오지 않는지 전수로 본다(변경 전 빌드 없이 절대 기준).
 * 게시물 전부(content/posts·posts-en)의 image.caption / imageCaption 문자열이 그 게시물 ko·en 상세 .html·.rsc에 몇 번 나오는지 센다.
 * 0이 아니면 그 문자열이 다른 필드(alt·본문 등)에도 있는지 함께 적어 원인을 가린다. `data-image-caption`은 빌드 전체에서 센다.
 * 사용(저장소 루트): node docs/tools/reviewer-33/self-caption-scan.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const APP = '.next/server/app'
const ko = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md'))
let posts = 0, withCaption = 0, files = 0, hits = 0, explained = 0, selfKinds = 0
const unexplained = []
const htmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
for (const f of ko) {
  const id = f.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(path.join('content/posts', f), 'utf8'))
  posts += 1
  if (!data.image?.caption) continue
  withCaption += 1
  if (!data.image.kind || data.image.kind === 'self') selfKinds += 1
  const enPath = path.join('content/posts-en', f)
  const en = fs.existsSync(enPath) ? matter(fs.readFileSync(enPath, 'utf8')) : null
  const targets = [
    { lang: 'ko', cap: String(data.image.caption).trim(), others: [data.image.alt, data.title, data.description, content].join('\n'), base: path.join(APP, 'post', id) },
  ]
  if (en?.data.imageCaption) targets.push({ lang: 'en', cap: String(en.data.imageCaption).trim(), others: [en.data.imageAlt, en.data.title, en.data.description, en.content].join('\n'), base: path.join(APP, 'en', 'post', id) })
  for (const t of targets) {
    for (const ext of ['.html', '.rsc']) {
      const file = t.base + ext
      if (!fs.existsSync(file)) { unexplained.push(`${file} 없음`); continue }
      files += 1
      const s = fs.readFileSync(file, 'utf8')
      const n = s.split(t.cap).length - 1 + (ext === '.html' && htmlEsc(t.cap) !== t.cap ? s.split(htmlEsc(t.cap)).length - 1 : 0)
      if (n === 0) continue
      hits += n
      if (t.others.includes(t.cap)) explained += n
      else unexplained.push(`${id} ${t.lang}${ext} ×${n}: ${t.cap.slice(0, 40)}`)
    }
  }
}
let marker = 0
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(html|rsc|body)$/.test(e.name)) marker += fs.readFileSync(p, 'utf8').split('data-image-caption').length - 1 } }
walk(APP)
console.log(`게시물 ${posts} · caption 있음 ${withCaption} (그중 self ${selfKinds}) · 확인 파일 ${files}`)
console.log(`caption 문자열 등장 ${hits} (다른 필드와 같은 문자열이라 설명됨 ${explained}) · 설명 안 됨 ${unexplained.length}`)
for (const u of unexplained) console.log(`  ✗ ${u}`)
console.log(`빌드 전체 data-image-caption ${marker}`)
console.log(unexplained.length === 0 && marker === 0 ? 'PASS' : 'FAIL')
