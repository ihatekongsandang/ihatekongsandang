// 리뷰어 51: 업로더 16 SNS 저장본 묶음 14(10건, 마지막) 커밋 전 점검(읽기 전용).
// 리뷰어 50 batch13-check.mjs를 묶음 14 대상(② 1건: #8, 본문 정리 6건: #1·#2·#3·#6·#7·#8 — 줄 수는 파일별)으로 바꾼 것. 저장소 루트에서 `node docs/tools/reviewer-51/batch14-check.mjs`. 출력은 표준 출력(상대경로만).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import matter from 'gray-matter'

const root = process.cwd()
// 대상 id는 기획자 16 TSV(batch=14)에서 읽는다. 출력에는 id 대신 "#번호 계정약칭"만 쓴다(id 일부에 비공인 이름이 섞인 건이 있어 산출물에 다시 적지 않기 위함).
const ids = fs.readFileSync("docs/tools/planner-16/sns-image-batches.tsv", "utf8").trim().split("\n").slice(1).map((l) => l.split("\t")).filter((c) => c[0] === "14").map((c) => c[2])
const label = (id) => `#${ids.indexOf(id) + 1} ${id.slice(11).split("-")[0]}`
const mask = (s) => ids.reduce((a, id) => a.split(id).join(`<${label(id)}>`), String(s))
// 이번 묶음 ② 1건
const expectNews = new Set([ids[7]])
// 본문 "원문 …" 정리 6건(파일별 -n +n — 업로더 16 보고 기준, 아래에서 실제 줄을 모두 출력해 대조)
const bodyFix = new Set([0, 1, 2, 5, 6, 7].map((i) => ids[i]))
const bodyFixLines = { [`content/posts/${ids[5]}.md`]: 2, [`content/posts-en/${ids[5]}.md`]: 2 }
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

const log = (m) => console.log(mask(m))
let fail = 0
const bad = (m) => { fail++; log(`  ✗ ${m}`) }
log('id\tresult\tko-image\ten-alt/caption\trefs\tdir\tdiff-other-lines')
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
  log(`${id}\t${result}\t${kind}\t${en.imageAlt ? 'alt' : '-'}/${en.imageCaption ? 'cap' : '-'}\t${refs.length}\t${dir ? '있음' : '없음'}\t${other.length}`)
  log(`  HEAD 파일: ${headHas.join(', ')}`)
  if (bodyFix.has(id)) {
    for (const f of [`content/posts/${id}.md`, `content/posts-en/${id}.md`]) {
      const o = git(['diff', '--', f]).split('\n').filter((l) => /^[-+]/.test(l) && !/^(\+\+\+|---)/.test(l) && !allowed.test(l))
      const m = o.filter((l) => l.startsWith('-')).length
      const p = o.filter((l) => l.startsWith('+')).length
      log(`  본문 수정 ${f}: -${m} +${p}`)
      for (const l of o) log(`    ${l}`)
      const want = bodyFixLines[f] ?? 1
      if (m !== want || p !== want) bad(`${f} 이미지 외 변경 줄 수가 -${want} +${want}이 아님`)
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
    log(`  caption ${[...String(im.caption)].length}자 · imageCaption ${[...String(en.imageCaption ?? '')].length}자 · imageAlt ${[...String(en.imageAlt ?? '')].length}자 · retrievedAt ${ra}`)
    if (!en.imageAlt || !en.imageCaption) bad('영어 imageAlt/imageCaption 없음')
    if (/original post/i.test(`${en.imageAlt} ${en.imageCaption}`)) bad('영어에 옛 문구 남음')
  } else {
    if (ko.image || ko.images) bad('ko image 블록 남음')
    if (en.imageAlt !== undefined || en.imageCaption !== undefined) bad('en imageAlt/imageCaption 남음')
  }
}

// 작업 트리에서 지워진 public/images 경로(HEAD 기준)
const deleted = git(['diff', '--name-only', '--diff-filter=D', '--', 'public/images']).trim().split('\n').filter(Boolean)
log(`\n삭제된 public/images 파일 ${deleted.length}개`)
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
log(`\nHEAD: 게시물 ${headFiles.length} · self ${hd.self} · 자체 제작 ${hd.own} · SNS 원문 저장본 ${hd.self - hd.own}`)
log(`작업 트리: self ${wt.self} · 자체 제작 ${wt.own} · SNS 원문 저장본 ${wt.self - wt.own}`)
log(fail ? `\n결함 ${fail}건` : '\n결함 0건')
