/**
 * 리뷰어 33 — content/README.md §3.6 yaml 예시(news·public)를 실제 검증기에 넣어 본다. content/는 건드리지 않는다.
 * README §7 ① URL 예시 게시물(가상, example.com)을 바탕으로 저장소 밖 <임시폴더>에 사본 .md를 만들고 그 사본을 읽어 검증한다.
 * 변형: verbatim(… 그대로 — 자리표시 주소라 오류가 맞다) / filled(…·{id}만 예시 주소로 채움) / 음성 대조(news+license, caption 삭제, caption 공백, 161자, public kogl-2)
 * 영어본: 예시 기반 영어본에 imageAlt·imageCaption 있음/imageCaption 없음.
 * 사용(저장소 루트): npx tsx docs/tools/reviewer-33/readme-examples.ts <임시폴더>
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { validatePost, resolveCardMedia } from '../../../src/lib/content/schema'
import { validateTranslation } from '../../../src/lib/content/translation'

const dir = process.argv[2] as string
fs.mkdirSync(dir, { recursive: true })
const readme = fs.readFileSync('content/README.md', 'utf8')
const sec36 = readme.slice(readme.indexOf('### 3.6'), readme.indexOf('## 4.'))
const blocks = [...sec36.matchAll(/```yaml\n([\s\S]*?)```/g)].map((m) => m[1] as string)
const ex1 = readme.slice(readme.indexOf('### ① URL 게시물'))
const baseMd = (ex1.match(/```markdown\n([\s\S]*?)\n```/) as RegExpMatchArray)[1] as string
const base = matter(baseMd)
const SRC_URL = 'https://example.com/press/example-case-a'
const today = '2026-11-09'

type Variant = { name: string; image: Record<string, unknown>; expectErrors: boolean }
const parse = (b: string) => (matter(`---\n${b}---\n`).data as { image: Record<string, unknown> }).image
const news = parse(blocks[0] as string)
const pub = parse(blocks[1] as string)
const fillNews: Record<string, unknown> = { ...news, src: 'https://img.example.com/og-image.jpg', sourcePageUrl: SRC_URL }
const fillPub: Record<string, unknown> = { ...pub, src: '/images/example-case-a/thumb.jpg', sourcePageUrl: 'https://example.org/kogl/page-1' }
const { caption: _c, ...newsNoCaption } = fillNews
void _c
const variants: Variant[] = [
  { name: 'news-verbatim', image: news, expectErrors: true },
  { name: 'news-filled', image: fillNews, expectErrors: false },
  { name: 'public-verbatim', image: pub, expectErrors: true },
  { name: 'public-filled', image: fillPub, expectErrors: false },
  { name: 'neg-news-license', image: { ...fillNews, license: 'kogl-1' }, expectErrors: true },
  { name: 'neg-news-no-caption', image: newsNoCaption, expectErrors: true },
  { name: 'neg-public-blank-caption', image: { ...fillPub, caption: '   ' }, expectErrors: true },
  { name: 'neg-public-kogl2', image: { ...fillPub, license: 'kogl-2' }, expectErrors: true },
  { name: 'warn-news-161', image: { ...fillNews, caption: '가'.repeat(161) }, expectErrors: false },
  { name: 'ok-news-160', image: { ...fillNews, caption: '가'.repeat(160) }, expectErrors: false },
]
console.log(`README §3.6 yaml 블록 ${blocks.length}개 · news 예시 caption ${String(news.caption).length}자`)
let pass = 0
let fail = 0
for (const v of variants) {
  const file = path.join(dir, `${v.name}.md`)
  fs.writeFileSync(file, matter.stringify(base.content, { ...base.data, image: v.image }))
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  const r = validatePost(data, content, `${data.id}.md`, { localImageExists: () => true, today })
  const ok = v.expectErrors ? r.errors.length > 0 : r.errors.length === 0
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${v.name} errors=${r.errors.length} notices=${r.notices.length} (기대: ${v.expectErrors ? '오류' : '오류 없음'})`)
  for (const e of r.errors) console.log(`    E ${e}`)
  for (const n of r.notices) console.log(`    N ${n}`)
  if (!r.post) continue
  const m = resolveCardMedia(r.post, 'ko') as { kind: string; credit?: { kind: string } }
  console.log(`    media.kind=${m.kind} credit.kind=${m.credit?.kind ?? '-'} caption이 카드 데이터에 있음=${'caption' in m}`)
  if (v.name.endsWith('-filled')) {
    for (const [label, en, expect] of [
      ['영어본 imageAlt·imageCaption 있음', { imageAlt: 'A sentence describing only what is visible', imageCaption: 'Example English caption.' }, false],
      ['영어본 imageCaption 없음', { imageAlt: 'A sentence describing only what is visible' }, true],
      ['영어본 imageAlt 없음', { imageCaption: 'Example English caption.' }, true],
    ] as const) {
      const enData = { id: data.id, title: 'Example case A reported', description: 'A fictional example post.', translatedAt: today, ...en }
      const enFile = path.join(dir, `${v.name}-en-${expect ? 'neg' : 'ok'}${'imageAlt' in en ? '' : '-noalt'}.md`)
      fs.writeFileSync(enFile, matter.stringify('', enData))
      const parsed = matter(fs.readFileSync(enFile, 'utf8'))
      const t = validateTranslation(parsed.data, parsed.content, `${data.id}.md`, r.post)
      const tok = expect ? t.errors.length > 0 : t.errors.length === 0
      if (tok) pass += 1
      else fail += 1
      console.log(`${tok ? 'PASS' : 'FAIL'}    EN ${label}: errors=${t.errors.length} ${t.errors.join(' | ')}`)
    }
  }
}
console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
