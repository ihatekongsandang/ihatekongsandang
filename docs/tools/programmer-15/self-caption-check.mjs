/**
 * 프로그래머 15 — C1 회귀: self 이미지 caption(실제 content 전수)이 상세 화면에 새로 나오지 않는지, 변경 전·후 빌드를 비교한다.
 * 사용(저장소 루트): node docs/tools/programmer-15/self-caption-check.mjs <변경 전 server/app> <변경 후 server/app>
 *
 *  - content/posts의 대표 이미지 `image.caption`이 있는 게시물 전부(kind 생략·self)에 대해,
 *    그 게시물 ko 상세(.html·.rsc)와 영어본이 있으면 en 상세(.html·.rsc)에서 caption 글자(ko 원본, en은 영어본 imageCaption) 등장 횟수가 변경 전과 같고 0인지
 *  - 서로 다른 caption 문자열 전부에 대해, 빌드 전체(.html·.rsc·.body) 등장 횟수가 변경 전과 같은지
 *  - 변경 후 빌드 전체에 `data-image-caption`(C1 사진 설명 줄 표지) 0 — 실제 content에는 public·news가 0건이다
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const [before, after] = process.argv.slice(2)
let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  if (!ok || process.env.VERBOSE) console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}
const read = (dir, rel) => {
  const file = path.join(dir, rel)
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
}
const count = (text, needle) => (text ? text.split(needle).length - 1 : 0)
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
}

const posts = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md')).sort()
const distinct = new Set()
let withCaption = 0
let pageChecks = 0
let kinds = {}
for (const file of posts) {
  const { data } = matter(fs.readFileSync(path.join('content/posts', file), 'utf8'))
  const kind = data.image ? (data.image.kind ?? 'self') : 'none'
  kinds[kind] = (kinds[kind] ?? 0) + 1
  const caption = typeof data.image?.caption === 'string' ? data.image.caption.trim() : ''
  if (!caption) continue
  withCaption += 1
  distinct.add(caption)
  const targets = [[`post/${data.id}`, caption]]
  const enFile = path.join('content/posts-en', file)
  if (fs.existsSync(enFile)) {
    const en = matter(fs.readFileSync(enFile, 'utf8')).data
    const enCaption = typeof en.imageCaption === 'string' ? en.imageCaption.trim() : ''
    targets.push([`en/post/${data.id}`, caption]) // 한국어 caption이 영어 상세에 새로 나오지 않는지
    if (enCaption) {
      targets.push([`en/post/${data.id}`, enCaption])
      distinct.add(enCaption)
    }
  }
  for (const [page, needle] of targets) {
    for (const ext of ['html', 'rsc']) {
      const b = count(read(before, `${page}.${ext}`), needle)
      const a = count(read(after, `${page}.${ext}`), needle)
      if (read(after, `${page}.${ext}`) === null) {
        check(`${page}.${ext} 있음`, false)
        continue
      }
      pageChecks += 1
      check(`${page}.${ext}: "${needle.slice(0, 20)}…" 등장 ${b} → ${a}`, a === b && a === 0)
    }
  }
}
console.log(`content/posts ${posts.length}건 · 대표 이미지 종류 ${JSON.stringify(kinds)} · caption 있는 대표 이미지 ${withCaption}건 · 서로 다른 caption(ko+en) ${distinct.size}개`)
console.log(`상세 페이지 검사 ${pageChecks}건(.html·.rsc × ko 상세 + en 상세의 ko caption·en caption)`)

const filesAfter = walk(after).filter((f) => /\.(html|rsc|body)$/.test(f))
const filesBefore = walk(before).filter((f) => /\.(html|rsc|body)$/.test(f))
const all = (files) => files.map((f) => fs.readFileSync(f, 'utf8')).join('\n')
const textAfter = all(filesAfter)
const textBefore = all(filesBefore)
console.log(`빌드 전체 파일: 변경 전 ${filesBefore.length} · 변경 후 ${filesAfter.length}`)
let same = 0
for (const caption of distinct) {
  const b = count(textBefore, caption)
  const a = count(textAfter, caption)
  if (a === b) same += 1
  check(`빌드 전체 "${caption.slice(0, 24)}…" 등장 ${b} → ${a}`, a === b)
}
console.log(`서로 다른 caption ${distinct.size}개 중 빌드 전체 등장 횟수가 변경 전과 같은 것 ${same}개`)
check('변경 후 빌드 전체 data-image-caption 0', count(textAfter, 'data-image-caption') === 0, String(count(textAfter, 'data-image-caption')))

console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
