// 목업용 샘플 데이터 추출(읽기 전용): content/posts·posts-en 에서 제목·날짜·태그 건수만 뽑아 data.json 으로 저장한다.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(HERE, '..', '..', '..')
const fm = (file) => {
  const t = fs.readFileSync(file, 'utf8')
  const m = t.match(/^---\n([\s\S]*?)\n---/)
  const y = m[1]
  const get = (k) => { const r = y.match(new RegExp('^' + k + ': (.*)$', 'm')); if (!r) return ''; let v = r[1].trim(); if (v.startsWith('"')) { try { v = JSON.parse(v) } catch { v = v.slice(1, -1) } } return v }
  const tags = []; const tm = y.match(/^tags:\n((?:  - .*\n?)+)/m); if (tm) for (const l of tm[1].split('\n')) { const x = l.match(/^  - (.*)$/); if (x) tags.push(x[1].replace(/^"|"$/g, '')) }
  return { id: get('id'), title: get('title'), publishedAt: get('publishedAt'), updatedAt: get('updatedAt'), tags }
}
const dir = path.join(ROOT, 'content', 'posts')
const posts = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => fm(path.join(dir, f)))
posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.id < b.id ? 1 : -1))
const counts = {}
for (const p of posts) for (const t of p.tags) counts[t] = (counts[t] ?? 0) + 1
const tags = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
const months = {}
for (const p of posts) { const k = p.publishedAt.slice(0, 7); months[k] = (months[k] ?? 0) + 1 }
const en = fs.readdirSync(path.join(ROOT, 'content', 'posts-en')).filter((f) => f.endsWith('.md')).map((f) => fm(path.join(ROOT, 'content', 'posts-en', f)))
en.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
fs.writeFileSync(path.join(HERE, 'data.json'), JSON.stringify({ total: posts.length, posts: posts.slice(0, 13).map(({ id, title, publishedAt, updatedAt, tags }) => ({ id, title, publishedAt, updatedAt, tags })), longest: [...posts].sort((a, b) => b.title.length - a.title.length)[0], tags, months: Object.entries(months).sort((a, b) => (a[0] < b[0] ? 1 : -1)), enTotal: en.length, en: en.slice(0, 12) }, null, 1))
console.log(posts.length, tags.length, tags.slice(0, 16).map((t) => t.join(':')).join(' '), 'en', en.length)
