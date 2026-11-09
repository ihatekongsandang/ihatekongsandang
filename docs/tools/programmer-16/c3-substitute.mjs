/**
 * 프로그래머 16 — seo-parity·copy-text-parity 차이 설명용. 변경 전 빌드 사본(server/app)을 복사해 C3 문구 치환만 적용한다.
 * 사용: node docs/tools/programmer-16/c3-substitute.mjs <변경 전 server/app> <출력 폴더>
 * 치환(기획 v0.9 §1 표 + 같은 원칙의 /tags 보조 문장 2개)은 아래 RULES뿐이다. 치환 뒤 seo-parity가 "전부 같음"이면 차이는 C3만으로 설명된다.
 * 치환 횟수를 규칙별로 센다. 같은 문구가 content 원문에 있으면 오치환이 되므로 content 전체에서 각 문구 등장 횟수도 센다(0이어야 한다).
 */
import fs from 'node:fs'
import path from 'node:path'
const [src, out, mode] = process.argv.slice(2)
// --all: 화면 마크업 대조용으로 C4 안내문·C5 이동 경로 class·상세 보조 열 이름까지 바꾼다(소개 페이지 C4 절은 바꾸지 않는다 — 따로 copy-exact로 본다).
const ALL = mode === '--all'
const RULES = [
  [/' 태그로 묶인 게시물입니다\./g, "' 주제로 묶인 게시물입니다.", ["' 태그로 묶인", '&#x27; 태그로 묶인']],
  [/' 태그 게시물 (\d+)페이지/g, "' 주제 게시물 $1페이지", null],
  [/&#x27; 태그로 묶인 게시물입니다\./g, '&#x27; 주제로 묶인 게시물입니다.', null],
  [/&#x27; 태그 게시물 (\d+)페이지/g, '&#x27; 주제 게시물 $1페이지', null],
  [/\\u0027 태그로 묶인 게시물입니다\./g, '\\u0027 주제로 묶인 게시물입니다.', null],
  [/전체 태그/g, '전체 주제', null],
  [/의 태그 (\d+)개를/g, '의 주제 $1개를', null],
  [/태그 (\d+)개 · 게시물이 많은 순/g, '주제 $1개 · 게시물이 많은 순', null],
  [/(<!-- -->)?태그(<!-- -->)? ?(<!-- -->)?(\d+)(<!-- -->)?개 · 게시물이 많은 순/g, '$1주제$2 $3$4$5개 · 게시물이 많은 순', null],
  [/aria-label="태그 목록"/g, 'aria-label="주제 목록"', null],
  [/아직 태그가 없습니다\./g, '아직 주제가 없습니다.', null],
  [/## 태그\n/g, '## 주제\n', null],
  ...(ALL ? [
    [/font-bold">태그<\/h2>/g, 'font-bold">주제</h2>', null],
    [/\(제목·요약·썸네일\)만 인용하며/g, '(제목·요약)만 인용하며', null],
    [/\(title, summary, thumbnail\) is quoted/g, '(title and summary) is quoted', null],
    [/"inline-flex min-h-11 min-w-11 items-center text-link underline underline-offset-\[3px\]"/g, '"-mx-[15px] inline-flex min-h-11 min-w-11 items-center px-[15px] text-link underline underline-offset-[3px]"', null],
    [/<span aria-hidden="true" class="mx-1\.5">›<\/span>/g, '<span aria-hidden="true" class="pointer-events-none mx-1.5">›</span>', null],
  ] : []),
]
const counts = RULES.map(() => 0)
let files = 0
function walk(d, o) {
  fs.mkdirSync(o, { recursive: true })
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const s = path.join(d, e.name), t = path.join(o, e.name)
    if (e.isDirectory()) walk(s, t)
    else if (/\.(html|body|rsc)$/.test(e.name)) {
      let txt = fs.readFileSync(s, 'utf8')
      RULES.forEach(([re, rep], i) => { txt = txt.replace(re, (...m) => { counts[i]++; return m[0].replace(re, rep) }) })
      fs.writeFileSync(t, txt); files++
    } else fs.copyFileSync(s, t)
  }
}
walk(src, out)
console.log(`파일 ${files}개 처리`)
RULES.forEach(([re], i) => console.log(`  ${String(re)} → ${counts[i]}회`))
let corpus = ''
for (const dir of ['content/posts', 'content/posts-en']) for (const f of fs.readdirSync(dir)) corpus += fs.readFileSync(path.join(dir, f), 'utf8')
for (const w of ['태그로 묶인', '태그 게시물', '전체 태그', '태그 목록', '태그가 없습니다', '## 태그']) console.log(`  content 원문의 "${w}" 등장 ${corpus.split(w).length - 1}회`)
