// 리뷰어 52: content/posts(ko)·content/posts-en(en) 전 파일에서 사람 이름 후보를 뽑는다(읽기 전용).
// 사용: node docs/tools/reviewer-52/extract-names.mjs <저장소 밖 폴더>
// 이름이 든 결과(occurrences.tsv·names.tsv)는 인자로 준 저장소 밖 폴더에만 쓴다.
// 표준 출력에는 이름을 쓰지 않는다(파일 수·후보 수만).
//
// 후보를 잡는 방법(서로 보완):
//  A. en  "Romanized Name (한글)" 쌍 — 영어본 인명 표기 규칙(guide §4-1 끝 줄)
//  B. ko  직함·호칭 앞뒤의 2~4글자 한글 낱말(○○ 의원 · 의원 ○○ · ○○ 씨 …)
//  C. ko  A·B·D로 모은 한글 이름 사전 전체를 ko 전 파일에서 다시 찾기
//  D. en  한국식 로마자 이름(성 + 이름 하이픈) · A 사전 로마자 다시 찾기
//  E. id·파일명 조각 — A 사전 로마자를 공백·하이픈 없이 소문자로 바꾼 것과 맞으면
//  F. ko  sources name 의 "○○○ 기자" 바이라인, attribution 괄호 안 표시 이름
import fs from 'node:fs'
import path from 'node:path'

const out = process.argv[2]
if (!out || path.resolve(out).startsWith(process.cwd())) {
  console.error('저장소 밖 폴더를 인자로 주세요')
  process.exit(1)
}
fs.mkdirSync(out, { recursive: true })

const DIRS = [['ko', 'content/posts'], ['en', 'content/posts-en']]
const files = []
for (const [lang, dir] of DIRS) {
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) files.push({ lang, rel: `${dir}/${f}`, id: f.replace(/\.md$/, '') })
}

// 줄마다 어느 필드인지(frontmatter 키 경로 또는 body)
function fieldMap(lines) {
  const res = []
  let fm = 0
  const stack = []
  for (const line of lines) {
    if (line.trim() === '---' && fm < 2) { fm++; res.push(fm === 1 ? 'fm-start' : 'fm-end'); continue }
    if (fm !== 1) { res.push('body'); continue }
    const m = line.match(/^(\s*)(-\s+)?([A-Za-z_][\w.]*):/)
    if (m) {
      const ind = m[1].length + (m[2] ? m[2].length : 0)
      while (stack.length && stack[stack.length - 1].ind >= ind) stack.pop()
      stack.push({ ind, key: m[3] })
      res.push(stack.map((s) => s.key).join('.'))
    } else {
      res.push(stack.map((s) => s.key).join('.') || 'fm')
    }
  }
  return res
}

const TITLES = [
  '전 대통령', '대통령', '여사', '전 총리', '국무총리', '총리', '부총리', '장관', '차관', '의원', '전 의원', '대표', '전 대표', '공동대표', '상임대표', '최고위원', '원내대표', '사무총장', '정책위의장', '위원장', '부위원장', '대변인',
  '시장', '지사', '도지사', '군수', '구청장', '교육감', '청장', '처장', '원장', '실장', '수석', '비서관', '보좌관', '특보', '대사', '총영사', '영사',
  '특검', '특별검사', '특검보', '검사', '검사장', '검찰총장', '판사', '대법관', '대법원장', '재판장', '변호사', '헌법재판관', '소장',
  '사령관', '단장', '사단장', '장군', '대령', '중령', '소령', '대위', '중위', '소위', '준장', '소장', '중장', '대장', '원사', '상사', '중사', '하사', '병장', '상병', '일병', '이병',
  '교수', '박사', '기자', '앵커', '논설위원', '칼럼니스트', '작가', '평론가', '목사', '신부', '스님', '회장', '사장', '이사장', '총장', '부장', '국장', '과장', '팀장', '소장',
  '씨', '군', '양', '후보', '후보자', '예비후보', '당선인', '전 장관', '위원', '주석', '국무위원장', '총비서', '부부장', '서기', '선생', '열사', '의사', '지도자', '감독', '선수', '배우', '가수', '유튜버', '감사', '이사', '당원', '고문', '상임고문', '대행', '권한대행',
]
const TITLE_RE = TITLES.sort((a, b) => b.length - a.length).map((t) => t.replace(/ /g, '\\s')).join('|')
const HAN = '[가-힣]'
// ○○ 직함
const KO_AFTER = new RegExp(`(?<![가-힣])(${HAN}{2,4})\\s?(?:${TITLE_RE})(?![가-힣])`, 'g')
// 직함 ○○ (뒤 조사 허용)
const KO_BEFORE = new RegExp(`(?:${TITLE_RE})\\s(${HAN}{2,4})(?=$|[^가-힣]|[은는이가을를의와과도에게께]|씨)`, 'g')
const KO_INITIAL = /(?<![가-힣])[ㄱ-ㅎ]{1,3}\s?씨/g
const EN_PAIR = /([A-Z][A-Za-z'’.-]+(?:\s[A-Z][A-Za-z'’.-]+){0,3})\s\(([가-힣·ㄱ-ㅎ\s]{1,14})\)/g
const KR_SURNAMES = 'Kim|Lee|Yi|Rhee|Park|Pak|Choi|Choe|Jung|Jeong|Chung|Kang|Cho|Jo|Yoon|Yun|Jang|Chang|Lim|Im|Han|Oh|Seo|Suh|Shin|Sin|Kwon|Hwang|Ahn|An|Song|Jeon|Chun|Hong|Yoo|Yu|Ko|Go|Moon|Mun|Yang|Son|Bae|Baek|Paik|Heo|Huh|Nam|Noh|Roh|Ha|Kwak|Sung|Seong|Cha|Joo|Ju|Woo|Koo|Gu|Min|Ryu|Na|Jin|Ji|Uhm|Eom|Chae|Won|Byun|Byeon|Yeo|Choo|Chu|Do|Tak|Pyo|Ban|Bang|Gong|Hyun|Ham|Bok|Seol|Ok|Wang|Maeng|Jegal'
const EN_KR = new RegExp(`\\b(?:${KR_SURNAMES})\\s[A-Z][a-z]+(?:-[a-z]+)?\\b`, 'g')
const BYLINE = new RegExp(`(${HAN}{2,4})\\s?기자`, 'g')

const occ = [] // {lang, rel, line, field, method, hangul, roman, text}
const pairDict = new Map() // hangul -> Set(roman)
const fileLines = new Map()
for (const f of files) {
  const lines = fs.readFileSync(f.rel, 'utf8').split('\n')
  const fields = fieldMap(lines)
  fileLines.set(f.rel, { lines, fields })
}

const add = (f, i, method, hangul, roman, line) => occ.push({ lang: f.lang, rel: f.rel, line: i + 1, field: fileLines.get(f.rel).fields[i], method, hangul: hangul || '', roman: roman || '', text: line.trim().slice(0, 240) })

for (const f of files) {
  const { lines } = fileLines.get(f.rel)
  lines.forEach((line, i) => {
    if (f.lang === 'en') {
      for (const m of line.matchAll(EN_PAIR)) {
        add(f, i, 'A', m[2].trim(), m[1], line)
        const h = m[2].trim()
        if (!pairDict.has(h)) pairDict.set(h, new Set())
        pairDict.get(h).add(m[1])
      }
      for (const m of line.matchAll(EN_KR)) add(f, i, 'D', '', m[0], line)
      for (const m of line.matchAll(/[가-힣]{2,}/g)) add(f, i, 'A-han', m[0], '', line)
    } else {
      for (const m of line.matchAll(KO_AFTER)) add(f, i, 'B', m[1], '', line)
      for (const m of line.matchAll(KO_BEFORE)) add(f, i, 'B', m[1], '', line)
      for (const m of line.matchAll(KO_INITIAL)) add(f, i, 'B-initial', m[0], '', line)
      for (const m of line.matchAll(BYLINE)) add(f, i, 'F-byline', m[1], '', line)
      const at = line.match(/^attribution:.*\(([^)]+)\)/)
      if (at) add(f, i, 'F-attr', at[1], '', line)
    }
  })
}

// C: ko 전 파일에서 사전(A의 한글 + B의 한글) 다시 찾기
const koDict = new Set([...pairDict.keys(), ...occ.filter((o) => o.method === 'B').map((o) => o.hangul)])
for (const f of files.filter((x) => x.lang === 'ko')) {
  const { lines } = fileLines.get(f.rel)
  lines.forEach((line, i) => {
    for (const h of koDict) {
      if (h.length < 2) continue
      let idx = line.indexOf(h)
      while (idx >= 0) { add(f, i, 'C', h, '', line); idx = line.indexOf(h, idx + h.length) }
    }
  })
}
// D2: en 전 파일에서 A 로마자 다시 찾기
const romanDict = new Set([...pairDict.values()].flatMap((s) => [...s]))
for (const f of files.filter((x) => x.lang === 'en')) {
  const { lines } = fileLines.get(f.rel)
  lines.forEach((line, i) => {
    for (const r of romanDict) if (line.includes(r)) add(f, i, 'D2', '', r, line)
  })
}
// E: id·파일명 조각
const squash = (s) => s.toLowerCase().replace(/[^a-z]/g, '')
const romanSquash = new Map([...romanDict].map((r) => [squash(r), r]))
for (const f of files) {
  const segs = f.id.slice(11).split('-')
  for (let a = 0; a < segs.length; a++) {
    for (let b = a + 1; b <= Math.min(segs.length, a + 3); b++) {
      const s = segs.slice(a, b).join('')
      if (s.length >= 5 && romanSquash.has(s)) occ.push({ lang: f.lang, rel: f.rel, line: 0, field: 'id/filename', method: 'E', hangul: '', roman: romanSquash.get(s), text: f.id })
    }
  }
}

const esc = (s) => String(s).replace(/\t/g, ' ')
fs.writeFileSync(path.join(out, 'occurrences.tsv'), ['lang\tfile\tline\tfield\tmethod\thangul\troman\ttext', ...occ.map((o) => [o.lang, o.rel, o.line, o.field, o.method, o.hangul, o.roman, o.text].map(esc).join('\t'))].join('\n'))
const uniq = new Map()
for (const o of occ) {
  const k = o.hangul || o.roman
  if (!uniq.has(k)) uniq.set(k, { n: 0, files: new Set(), methods: new Set(), roman: new Set() })
  const u = uniq.get(k); u.n++; u.files.add(o.rel); u.methods.add(o.method); if (o.roman) u.roman.add(o.roman)
}
fs.writeFileSync(path.join(out, 'names.tsv'), ['key\tcount\tfiles\tmethods\troman', ...[...uniq].sort((a, b) => b[1].n - a[1].n).map(([k, u]) => [k, u.n, u.files.size, [...u.methods].join(','), [...u.roman].join('|')].map(esc).join('\t'))].join('\n'))
fs.writeFileSync(path.join(out, 'pairs.tsv'), [...pairDict].map(([h, r]) => `${h}\t${[...r].join('|')}`).join('\n'))

const ko = files.filter((x) => x.lang === 'ko').length
const en = files.filter((x) => x.lang === 'en').length
console.log(`검사 파일: ko ${ko} · en ${en} · 합 ${files.length}`)
console.log(`후보 발생 ${occ.length}건 · 고유 키 ${uniq.size}개 · en 이름 쌍 ${pairDict.size}개`)
console.log(`방법별: ${['A', 'A-han', 'B', 'B-initial', 'C', 'D', 'D2', 'E', 'F-byline', 'F-attr'].map((m) => `${m} ${occ.filter((o) => o.method === m).length}`).join(' · ')}`)
console.log('이름이 든 결과는 인자로 준 저장소 밖 폴더에만 썼다.')
