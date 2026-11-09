/**
 * 리뷰어 32 — 기획 문서의 frontmatter 예시를 실제 검증기(schema.ts·translation.ts)에 넣어 본다.
 * content/는 건드리지 않는다. 저장소 밖 임시 폴더에 make-variants.py로 사본을 만든 뒤 저장소 루트에서:
 *   python3 docs/tools/reviewer-32/make-variants.py content/posts/{id}.md content/posts-en/{id}.md <임시폴더> <sources[]의 언론 url>
 *   npx tsx docs/tools/reviewer-32/validate-examples.ts <임시폴더>
 * today는 2026-11-09로 고정(retrievedAt 미래 검사 재현용).
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { validatePost, resolveCardMedia } from '../../../src/lib/content/schema'
import { validateTranslation } from '../../../src/lib/content/translation'

// 프로그래머 15: 타입만 좁힌다(tsc TS2345 3건 — 아래 path.join 15~17행). 실행 동작은 같다 — 인자가 없으면 전처럼 path.join이 TypeError를 낸다.
const dir = process.argv[2] as string
const enRaw = fs.readFileSync(path.join(dir, 'base-en.md'), 'utf8')
for (const f of fs.readdirSync(path.join(dir, 'posts')).sort()) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, 'posts', f), 'utf8'))
  const r = validatePost(data, content, `${data.id}.md`, { localImageExists: () => true, today: '2026-11-09' })
  console.log(`=== ${f} errors=${r.errors.length} notices=${r.notices.length}`)
  for (const e of r.errors) console.log(`  E ${e}`)
  for (const n of r.notices) console.log(`  N ${n}`)
  if (!r.post) continue
  const m = resolveCardMedia(r.post, 'ko') as { kind: string; credit?: unknown }
  console.log(`  media.kind=${m.kind} credit=${JSON.stringify(m.credit ?? null)} caption이 media에 있음=${'caption' in m}`)
  const en = matter(enRaw)
  const t1 = validateTranslation(en.data, en.content, `${data.id}.md`, r.post)
  console.log(`  EN(기존 영어본 그대로) errors=${t1.errors.length} ${t1.errors.join(' | ')}`)
  const d2 = { ...en.data, imageAlt: 'A person in a suit speaking at the National Assembly rostrum', imageCaption: 'Example English caption.' }
  const t2 = validateTranslation(d2, en.content, `${data.id}.md`, r.post)
  console.log(`  EN(imageAlt·imageCaption 교체) errors=${t2.errors.length} ${t2.errors.join(' | ')} notices=${t2.notices.join(' | ')}`)
}
