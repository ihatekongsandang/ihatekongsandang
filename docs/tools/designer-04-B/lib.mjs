// 시안 B 공통: 데이터·마크다운·아이콘·카드/상세 조각. build.mjs 가 변주별 CSS·헤더·탐색을 얹는다.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(HERE, '..', '..', '..')
export const DATA = JSON.parse(fs.readFileSync(path.join(HERE, 'data.json'), 'utf8'))

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ---- 실제 문구(src/lib/config.ts·i18n.ts 에서 옮김) ----
export const T = {
  ko: {
    site: '공산당이싫어요', home: '홈', about: '소개', lang: 'English', langTarget: 'en',
    lead: '여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다.',
    latest: '최신 게시물', count: (t, p, n) => `전체 ${t}건 · ${p} / ${n} 페이지`,
    prev: '이전', next: '다음', pageOf: (p, n) => `${p} / ${n} 페이지`,
    footPolicy: '모든 게시물은 언론 보도·수사기관 발표·판결문 등 공개된 출처에 근거해 정리하며, 원문을 전재하지 않습니다. 제목·요약은 단정하지 않고 보도를 인용하는 형태로 씁니다.',
    footTagline: '정치·시사 이슈를 출처와 원문 링크로 정리하는 카드형 소식지',
    footPolicyLink: '출처·저작권 정책과 정정·삭제 요청 절차', footTerms: '이용약관',
    banner: { title: '이재명 재판재개 촉구 국민 서명운동', sub: '외부 사이트로 이동합니다' },
  },
  en: {
    site: '공산당이싫어요', sub: '(Korea Politics & Security Brief)', home: 'Home', about: 'About', lang: '한국어', langTarget: 'ko',
    lead: 'A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.',
    notice: 'Posts marked "Korean only" have not been translated yet and open in Korean.',
    latest: 'Latest posts', count: (t, p, n) => `${t} posts · Page ${p} of ${n}`,
    prev: 'Previous', next: 'Next', pageOf: (p, n) => `Page ${p} of ${n}`,
    footPolicy: 'Every post is based on public sources such as news reports, announcements by investigative authorities and court rulings, and does not republish the original. Titles and summaries quote the reports rather than stating conclusions.',
    footTagline: 'Korean politics and security issues, summarized with sources and links to the originals',
    footPolicyLink: 'About this site and how to request a correction or removal', footTerms: 'Terms',
  },
}
const MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dateKo = (iso) => { const [y, m, d] = iso.split('-'); return `${y}년 ${Number(m)}월 ${Number(d)}일` }
export const dateEn = (iso) => { const [y, m, d] = iso.split('-'); return `${MONTH_EN[Number(m) - 1]} ${Number(d)}, ${y}` }
export const monthEn = (ym) => { const [y, m] = ym.split('-'); return `${MONTH_EN[Number(m) - 1]} ${y}` }

// ---- 아이콘(인라인 SVG, lucide 스타일 선 아이콘의 단순형) ----
const svg = (inner, size = 18) => `<svg aria-hidden="true" focusable="false" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`
export const I = {
  link: svg('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'),
  x: svg('<path d="M4 4l16 16M20 4L4 20"/>', 16),
  at: svg('<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>'),
  out: svg('<path d="M7 17L17 7M8 7h9v9"/>', 16),
  left: svg('<path d="M15 18l-6-6 6-6"/>'),
  right: svg('<path d="M9 18l6-6-6-6"/>'),
  down: svg('<path d="M6 9l6 6 6-6"/>', 16),
  img: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>', 28),
  menu: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  grid: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', 20),
  house: svg('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>', 20),
  info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', 20),
}

// ---- 미니 마크다운(제목 h2·목록·문단·굵게만) ----
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
export function md(text) {
  const out = []; let list = []
  const flush = () => { if (list.length) { out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join('')}</ul>`); list = [] } }
  for (const raw of text.split('\n')) {
    const l = raw.trimEnd()
    if (!l.trim()) { flush(); continue }
    if (l.startsWith('## ')) { flush(); out.push(`<h2>${inline(l.slice(3))}</h2>`) }
    else if (l.startsWith('- ')) list.push(l.slice(2))
    else { flush(); out.push(`<p>${inline(l)}</p>`) }
  }
  flush(); return out.join('\n')
}
function readPost(dir, id) {
  const t = fs.readFileSync(path.join(ROOT, 'content', dir, id + '.md'), 'utf8')
  const m = t.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  return { front: m[1], body: m[2].trim() }
}
const KO_ID = '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019'
export const KO_POST = (() => {
  const { front, body } = readPost('posts', KO_ID)
  const grab = (k) => { const r = front.match(new RegExp('^' + k + ': (.*)$', 'm')); let v = r[1].trim(); if (v.startsWith('"')) v = JSON.parse(v); return v }
  const sources = [...front.matchAll(/- type: (.*)\n    name: (.*)\n    url: .*\n    date: (.*)/g)].map((m) => ({ type: m[1], name: JSON.parse(m[2].startsWith('"') ? m[2] : JSON.stringify(m[2])), date: m[3] }))
  return { title: grab('title'), desc: grab('description'), attribution: grab('attribution'), published: grab('publishedAt'), body, sources, tags: ['북한', '국가보안법', '경찰'] }
})()
export const EN_POST = (() => {
  const id = DATA.en.find((p) => p.id === KO_ID).id
  const { front, body } = readPost('posts-en', id)
  const g = (k) => { const r = front.match(new RegExp('^' + k + ': (.*)$', 'm')); let v = r ? r[1].trim() : ''; if (v.startsWith('"')) { try { v = JSON.parse(v) } catch { v = v.slice(1, -1) } } return v }
  const paras = body.split(/\n+/).map((p) => p.replace(/^- /, '').trim()).filter((p) => p && !p.startsWith('#')).slice(0, 4)
  return { title: g('title'), desc: g('description'), paras }
})()

// ---- 카드 ----
const TONES = ['ph-a', 'ph-b', 'ph-c']
const CREDITS_KO = ['대통령실', '국회', '국방부', '통일부', '연합뉴스', '조선일보', '합동참모본부', '외교부']
const CREDITS_EN = ['Presidential Office', 'National Assembly', 'Ministry of Defense', 'Ministry of Unification', 'Yonhap', 'Chosun Ilbo']
export function cardSet(locale = 'ko') {
  if (locale === 'en') {
    const en = DATA.en.map((e) => ({ ...e, publishedAt: (DATA.posts.find((p) => p.id === e.id) ?? DATA.posts[0]).publishedAt }))
    return [
      { title: en[0].title, date: en[0].publishedAt, kind: 'photo', credit: CREDITS_EN[0], tag: 'North Korea', src: 'Instagram' },
      { title: DATA.posts[2].title, date: DATA.posts[2].publishedAt, kind: 'fallback', koreanOnly: true, tag: '북한', src: 'Instagram' },
      { title: en[2].title, date: en[2].publishedAt, kind: 'photo', credit: CREDITS_EN[2], tag: 'Military', src: 'Yonhap' },
      { title: en[3].title, date: en[3].publishedAt, kind: 'fallback', tag: 'Military', src: 'Instagram', updated: '2026-11-07' },
    ]
  }
  const p = DATA.posts.slice(0, 12)
  // 실제 최장 제목(115자)을 4번째 자리에 넣는다(브리프 §4: 최장 제목 포함).
  const lg = DATA.longest
  if (!p.slice(0, 12).some((x) => x.id === lg.id)) p.splice(3, 1, lg)
  const fallbackIdx = new Set([1, 4, 8, 10])
  return p.map((x, i) => ({
    title: x.title, date: x.publishedAt, kind: fallbackIdx.has(i) || i === 3 && false ? 'fallback' : 'photo',
    credit: CREDITS_KO[i % CREDITS_KO.length], tone: TONES[i % 3], tag: x.tags[0] ?? '정치', src: ['인스타그램', '스레드', '유튜브', '조선일보', '데일리안', '동아일보'][i % 6],
    updated: i === 2 || i === 6 ? '2026-11-07' : undefined,
  }))
}
export const fmtUpdated = (iso, locale) => { const [, m, d] = iso.split('-'); return locale === 'ko' ? `${m}/${d} 갱신` : `Updated ${MONTH_EN[Number(m) - 1]} ${Number(d)}` }

// ---- 페이지 번호 ----
export function numberedPager(page, total, locale = 'ko', cls = '') {
  const nums = [1, 2, 3, '…', total]
  const lab = locale === 'ko' ? ['이전 페이지', '다음 페이지'] : ['Previous page', 'Next page']
  const txt = locale === 'ko' ? (n) => `${n}페이지` : (n) => `Page ${n}`
  return `<nav class="pager ${cls}" aria-label="${locale === 'ko' ? '피드 페이지 이동' : 'Feed pages'}"><ul>
<li><span class="pg pg-off" aria-disabled="true">${I.left}<span class="sr-only">${lab[0]}</span></span></li>
${nums.map((n) => n === '…' ? '<li aria-hidden="true"><span class="pg-gap">…</span></li>' : n === page ? `<li><a class="pg pg-cur" href="#p${n}" aria-current="page"><span class="sr-only">${txt(n)}, </span>${n}</a></li>` : `<li><a class="pg" href="?page=${n}"><span class="sr-only">${txt(n)}</span><span aria-hidden="true">${n}</span></a></li>`).join('\n')}
<li><a class="pg" href="?page=${page + 1}">${I.right}<span class="sr-only">${lab[1]}</span></a></li>
</ul></nav>`
}
export const FONT = `-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', 'Malgun Gothic', 'Noto Sans KR', 'Helvetica Neue', Arial, sans-serif`
