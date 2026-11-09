// 리뷰어 43: 업로더 08 SNS 저장본 묶음 6(10건) 커밋 전 점검(읽기 전용).
// 리뷰어 42 batch5-check.mjs를 묶음 6 대상으로 바꾼 것(본문 수정 예외 없음, ② 2건 필드 점검). 저장소 루트에서 `node docs/tools/reviewer-43/batch6-check.mjs`. 출력은 표준 출력(상대경로만).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import matter from 'gray-matter'

const root = process.cwd()
const ids = [
  '2026-09-29-nowandhere-defense-minister-nk-responsibility',
  '2026-09-29-rekor-hypertension-diabetes-support-cut',
  '2026-09-29-sbsnews-lee-mine-conspiracy-remark',
  '2026-07-01-amhaengeosa-lee-nk-military-remark',
  '2026-07-04-idontknowpolitics-2018-freedom-deletion',
  '2026-07-05-idontknowpolitics-kctu-appeal',
  '2026-07-12-judypia-real-estate-supervisory-bill',
  '2026-07-13-idontknowpolitics-yeonpyeong-crab-remark',
  '2026-07-19-amhaengeosa-kctu-itaewon-directive',
  '2026-07-20-yoonsanghyun-special-counsel-filibuster',
]
const expectNews = new Set(['2026-09-29-sbsnews-lee-mine-conspiracy-remark', '2026-07-13-idontknowpolitics-yeonpyeong-crab-remark'])
// 이번 묶음은 본문 수정 예외 없음
const bodyFix = null
// diff에서 허용하는 줄: 이미지 관련 필드만
const allowed = /^[-+](image:|imageAlt:|imageCaption:| {2}(kind|src|alt|caption|creditName|creditNameEn|sourcePageUrl|retrievedAt|faceNote):)/
const newsKeys = ['kind', 'src', 'alt', 'caption', 'creditName', 'creditNameEn', 'sourcePageUrl', 'retrievedAt', 'faceNote']

const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' })

// 저장소 안 참조 검색 대상(빌드 산출물·node_modules 제외)
const scanDirs = ['content', 'src', 'public', 'scripts']
const scanFiles = []
const walk = (d) => {
  for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(md|mdx|ts|tsx|js|mjs|json|txt|html|css)$/.test(e.name)) scanFiles.push(p)
  }
}
for (const d of scanDirs) if (fs.existsSync(path.join(root, d))) walk(d)
const scanText = scanFiles.map((f) => [f, fs.readFileSync(path.join(root, f), 'utf8')])

let fail = 0
const bad = (m) => { fail++; console.log(`  ✗ ${m}`) }
console.log('id\tresult\tko-image\ten-alt/caption\trefs\tdir\tdiff-other-lines')
for (const id of ids) {
  const ko = matter(fs.readFileSync(path.join(root, 'content/posts', `${id}.md`), 'utf8')).data
  const en = matter(fs.readFileSync(path.join(root, 'content/posts-en', `${id}.md`), 'utf8')).data
  const diff = git(['diff', '--', `content/posts/${id}.md`, `content/posts-en/${id}.md`])
  const other = diff.split('\n').filter((l) => /^[-+]/.test(l) && !/^(\+\+\+|---)/.test(l) && !allowed.test(l))
  const refs = scanText.filter(([, t]) => t.includes(`/images/${id}`)).map(([f]) => f)
  const dir = fs.existsSync(path.join(root, 'public/images', id))
  const headHas = git(['ls-tree', '-r', '--name-only', 'HEAD', `public/images/${id}`]).trim().split('\n').filter(Boolean)
  const kind = ko.image ? (ko.image.kind ?? 'self') : '(없음)'
  const result = ko.image ? '②' : '③'
  console.log(`${id}\t${result}\t${kind}\t${en.imageAlt ? 'alt' : '-'}/${en.imageCaption ? 'cap' : '-'}\t${refs.length}\t${dir ? '있음' : '없음'}\t${other.length}`)
  console.log(`  HEAD 파일: ${headHas.join(', ')}`)
  if (id === bodyFix) {
    for (const f of [`content/posts/${id}.md`, `content/posts-en/${id}.md`]) {
      const o = git(['diff', '--', f]).split('\n').filter((l) => /^[-+]/.test(l) && !/^(\+\+\+|---)/.test(l) && !allowed.test(l))
      const m = o.filter((l) => l.startsWith('-')).length
      const p = o.filter((l) => l.startsWith('+')).length
      console.log(`  본문 수정 ${f}: -${m} +${p}`)
      for (const l of o) console.log(`    ${l}`)
      if (m !== 1 || p !== 1) bad(`${f} 이미지 외 변경 줄 수가 -1 +1이 아님`)
    }
  } else if (other.length) bad(`이미지 외 변경: ${other.join(' | ')}`)
  if (refs.length) bad(`참조 남음: ${refs.join(', ')}`)
  if (dir) bad('폴더 남음')
  if (expectNews.has(id)) {
    const im = ko.image ?? {}
    if (im.kind !== 'news') bad('kind news 아님')
    for (const k of newsKeys) if (im[k] === undefined || im[k] === '') bad(`필드 없음: ${k}`)
    if ('license' in im) bad('license 있음')
    const urls = (ko.sources ?? []).filter((s) => s.type === '언론').map((s) => s.url)
    if (!urls.includes(im.sourcePageUrl)) bad('sourcePageUrl이 sources[] 언론 url과 다름')
    const ra = im.retrievedAt instanceof Date ? im.retrievedAt.toISOString().slice(0, 10) : String(im.retrievedAt)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ra)) bad(`retrievedAt 형식: ${ra}`)
    if (!/^https:\/\//.test(String(im.src))) bad('src https 아님')
    console.log(`  caption ${[...String(im.caption)].length}자 · imageCaption ${[...String(en.imageCaption ?? '')].length}자 · imageAlt ${[...String(en.imageAlt ?? '')].length}자 · retrievedAt ${ra}`)
    if (!en.imageAlt || !en.imageCaption) bad('영어 imageAlt/imageCaption 없음')
    if (/original post/i.test(`${en.imageAlt} ${en.imageCaption}`)) bad('영어에 옛 문구 남음')
  } else {
    if (ko.image || ko.images) bad('ko image 블록 남음')
    if (en.imageAlt !== undefined || en.imageCaption !== undefined) bad('en imageAlt/imageCaption 남음')
  }
}

// 작업 트리에서 지워진 public/images 경로(HEAD 기준)
const deleted = git(['diff', '--name-only', '--diff-filter=D', '--', 'public/images']).trim().split('\n').filter(Boolean)
console.log(`\n삭제된 public/images 파일 ${deleted.length}개`)
for (const id of ids) if (!deleted.includes(`public/images/${id}/thumb.jpg`)) bad(`삭제 목록에 없음: ${id}`)
if (deleted.length !== ids.length) bad('삭제 파일 수가 10이 아님')

// 저장본 수: self 이미지 전체와 그중 자체 제작(caption에 '자체 제작' 또는 '직접 만든'). 작업 트리와 HEAD 둘 다
const isOwn = (c) => c.includes('자체 제작') || c.includes('직접 만든')
const tallySelf = (texts) => {
  let self = 0, own = 0
  for (const t of texts) {
    const im = matter(t).data.image
    if (!im || (im.kind ?? 'self') !== 'self') continue
    self++
    if (isOwn(String(im.caption ?? ''))) own++
  }
  return { self, own }
}
const wt = tallySelf(fs.readdirSync(path.join(root, 'content/posts')).filter((x) => x.endsWith('.md')).map((f) => fs.readFileSync(path.join(root, 'content/posts', f), 'utf8')))
const headFiles = git(['ls-tree', '--name-only', 'HEAD', 'content/posts/']).trim().split('\n').filter((f) => f.endsWith('.md'))
const hd = tallySelf(headFiles.map((f) => git(['show', `HEAD:${f}`])))
console.log(`\nHEAD: 게시물 ${headFiles.length} · self ${hd.self} · 자체 제작 ${hd.own} · SNS 원문 저장본 ${hd.self - hd.own}`)
console.log(`작업 트리: self ${wt.self} · 자체 제작 ${wt.own} · SNS 원문 저장본 ${wt.self - wt.own}`)
console.log(fail ? `\n결함 ${fail}건` : '\n결함 0건')
