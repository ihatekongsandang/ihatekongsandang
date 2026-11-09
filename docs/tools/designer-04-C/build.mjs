/**
 * 디자이너 C 04-C — 방향 C(카드 그리드 중심) 시안 C1·C2·C3 정적 목업 생성기.
 *
 * 실행: node docs/tools/designer-04-C/build.mjs   (저장소 루트에서)
 * - 출력: design/v0.3-responsive/C1|C2|C3/mockup.html (인라인 CSS·인라인 SVG만, 외부 요청 없음)
 * - 제목 문구는 content/posts 의 실제 제목을 읽어 쓴다(읽기 전용). 사진은 회색 자리표시 도형이다(실제 보도사진 없음).
 * - 토큰 대비 계산값도 contrast.json 으로 함께 쓴다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../../..')
const OUT = path.join(ROOT, 'design/v0.3-responsive')

/* ───────── 대비 계산 ───────── */
const lum = (hex) => {
  const c = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
export const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/* ───────── 토큰 ───────── */
export const TOKENS = {
  light: { bg: '#ffffff', fg: '#18181b', fg2: '#3f3f46', muted: '#52525b', surface: '#f4f4f5', hover: '#e4e4e7', line: '#e4e4e7', bd: '#85858e', link: '#1d4ed8', ring: '#1d4ed8', banner: '#18181b', onBanner: '#ffffff', onBanner2: '#d4d4d8' },
  dark: { bg: '#09090b', fg: '#fafafa', fg2: '#d4d4d8', muted: '#a1a1aa', surface: '#18181b', hover: '#27272a', line: '#27272a', bd: '#71717a', link: '#93c5fd', ring: '#93c5fd', banner: '#27272a', onBanner: '#ffffff', onBanner2: '#d4d4d8' },
}

/* ───────── 콘텐츠 ───────── */
function readPosts() {
  const dir = path.join(ROOT, 'content/posts')
  const rows = []
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const txt = fs.readFileSync(path.join(dir, f), 'utf8')
    const head = txt.split(/^---$/m)[1] ?? ''
    const tm = head.match(/^title: (.*)$/m)
    const dm = head.match(/^publishedAt: (\S+)/m)
    if (!tm || !dm) continue
    let t = tm[1].trim()
    if (t.startsWith('"')) {
      try { t = JSON.parse(t) } catch { t = t.slice(1, -1).replace(/\\"/g, '"') }
    } else if (t.startsWith("'")) t = t.slice(1, -1).replace(/''/g, "'")
    rows.push({ title: t, date: dm[1], file: f })
  }
  rows.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.file < b.file ? 1 : -1))
  return rows
}
const posts = readPosts()
const longest = [...posts].sort((a, b) => b.title.length - a.title.length)[0]
const shortest = [...posts].sort((a, b) => a.title.length - b.title.length)[0]
let feed = posts.slice(0, 12)
if (!feed.includes(longest)) feed.splice(3, 1, longest)
if (!feed.includes(shortest)) feed.splice(9, 1, shortest)
const dotDate = (d) => d.replace(/-/g, '.')
const mmdd = (d) => d.slice(5).replace('-', '/')

/** 카드 미디어 배정(12장): photo = 공공 이미지/기사 대표 이미지 자리표시, fb = 사진 없음 대체 카드 */
const MEDIA = [
  { k: 'photo', credit: '사진: 대통령실', g: 1 },
  { k: 'photo', credit: '사진: 언론사', g: 2 },
  { k: 'fb', src: '출처 · 언론 보도' },
  { k: 'photo', credit: '사진: 국방부', g: 3 },
  { k: 'photo', credit: '사진: 국회', g: 4 },
  { k: 'photo', credit: '사진: 언론사', g: 1 },
  { k: 'photo', credit: '사진: 대통령실', g: 2 },
  { k: 'fb', src: '출처 · 인스타그램 게시물' },
  { k: 'photo', credit: '사진: 언론사', g: 3 },
  { k: 'photo', credit: '사진: 국방부', g: 4 },
  { k: 'photo', credit: '사진: 법원', g: 1 },
  { k: 'photo', credit: '사진: 언론사', g: 2 },
]
const RENEWED = new Set([1, 6]) // 갱신 표시가 붙는 카드 순번(0-기준)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const TAGS = ['북한', '국가보안법', '경찰', '국방', '외교', '사법', '국회', '선거', '부동산', '언론', '교육', '인권', '경제', '복지']

const SVG_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<defs>
<symbol id="ph" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><rect width="160" height="90" style="fill:var(--ph-bg)"/><circle cx="118" cy="30" r="10" style="fill:var(--ph-fg)"/><path d="M0 90 L46 44 L78 76 L104 54 L160 90 Z" style="fill:var(--ph-fg)"/></symbol>
<symbol id="ic-ext" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="ic-img" viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m4 17 5-4.5 3.5 3 3-2.5L20 17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
</defs></svg>`

const EN_CREDIT = { '사진: 대통령실': 'Photo: Presidential Office', '사진: 국방부': 'Photo: Ministry of National Defense', '사진: 국회': 'Photo: National Assembly', '사진: 법원': 'Photo: Court', '사진: 언론사': 'Photo: news outlet' }
const EN_SRC = { '출처 · 언론 보도': 'Source · news report', '출처 · 인스타그램 게시물': 'Source · Instagram post' }
const media = (m, en = false) =>
  m.k === 'photo'
    ? `<div class="media g${m.g}"><svg class="ph" aria-hidden="true"><use href="#ph"/></svg><span class="credit"${en ? ' lang="en"' : ''}>${en ? EN_CREDIT[m.credit] : m.credit}</span></div>`
    : `<div class="media fb" role="img" aria-label="${en ? 'Area shown in place of a missing image' : '대표 이미지가 없어 대체 표시된 영역'}"><svg class="ic" aria-hidden="true"><use href="#ic-img"/></svg><span class="fb-t">${en ? 'No image' : '대표 이미지 없음'}</span><span class="fb-s">${en ? EN_SRC[m.src] : m.src}</span></div>`

function card(p, i, first) {
  const m = MEDIA[i]
  const renewed = RENEWED.has(i) ? `<span aria-hidden="true"> · ${mmdd(p.date)} 갱신</span><span class="sr">최근 갱신: ${p.date}</span>` : ''
  return `<li class="card${first ? ' first' : ''}">
${media(m)}
<div class="cbody"><h3 class="title"><a href="#post" title="${esc(p.title)}">${esc(p.title)}</a></h3>
<p class="meta"><time datetime="${p.date}">${dotDate(p.date)}</time>${renewed}</p></div></li>`
}

const EN_CARDS = [
  { t: 'Joint Chiefs: North Korean landmines suspected at several spots south of the MDL, intruding about 20 m on average', d: '2026-11-08', m: MEDIA[3] },
  { t: '“Don’t decide farmers’ lives from behind a desk” — lawmaker’s reel criticizing the nationwide farmland survey', d: '2026-11-08', m: MEDIA[7] },
  { t: '제주 실종신고 \'허위 종결\' 경찰관 구속 — 담당 실종사건 298건 전수 재점검', d: '2026-11-07', m: MEDIA[1], ko: true },
  { t: 'Zelensky claim that the Lee government helped transport Russian fuel: the criticism was an aide to Ukraine’s presidential office citing a Guardian report, while the claims that “Korea is communist” and “the government helped transport” are unconfirmed', d: '2026-11-07', m: MEDIA[0] },
]
const enDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
const enCard = (c, i) => `<li class="card${i === 0 ? ' first' : ''}">
${media(c.m, true)}
<div class="cbody"><h3 class="title"><a href="#post"${c.ko ? ' lang="ko" hreflang="ko" aria-describedby="ko-only"' : ''} title="${esc(c.t)}">${esc(c.t)}</a></h3>
<p class="meta"><time datetime="${c.d}">${enDate(c.d)}</time>${c.ko ? '<span id="ko-only"> · Korean only</span>' : ''}</p></div></li>`

/* ───────── 공통 조각 ───────── */
const header = (en, cur) => `<header class="site-header"><div class="wrap hdr">
<a class="logo" href="#${cur}"${en ? '' : ''}>공산당이싫어요</a>
<div class="hdr-r">
<nav aria-label="${en ? 'Main menu' : '주요 메뉴'}" class="nav"><a href="#${cur}">${en ? 'Home' : '홈'}</a><a href="#${cur}">${en ? 'About' : '소개'}</a></nav>
<nav aria-label="${en ? 'Language' : '언어 선택'}" class="lang">${en ? '<a lang="ko" hreflang="ko" href="#home">한국어</a><span class="cur" lang="en" aria-current="true">English</span>' : '<span class="cur" lang="ko" aria-current="true">한국어</span><a lang="en" hreflang="en" href="#en">English</a>'}</nav>
</div></div></header>`

const KO_INTRO = '여러 언론 보도를 모아 정리하는 카드형 뉴스 소식지입니다. 직접 취재하지 않고, 언론 보도(신문법 등에 따라 등록된 매체)·수사기관 발표·판결을 출처로 밝혀 정리합니다. 사실 확인 단계는 단정하지 않고 보도 그대로 인용합니다.'
const EN_INTRO = 'A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.'

const footer = (en) => `<footer class="site-footer"><div class="wrap">
<p>${en ? 'Every post is based on publicly available sources such as news reports, official announcements and rulings, and we do not reproduce the originals. Titles and summaries quote the reports rather than asserting facts.' : '모든 게시물은 언론 보도·수사기관 발표·판결문 등 공개된 출처에 근거해 정리하며, 원문을 전재하지 않습니다. 제목·요약은 단정하지 않고 보도를 인용하는 형태로 씁니다.'}</p>
<ul><li><a href="#home">${en ? 'About this site and how to request a correction or removal' : '출처·저작권 정책과 정정·삭제 요청 절차'}</a></li><li><a href="#home">${en ? 'Terms of use' : '이용약관'}</a></li></ul>
</div></footer>`

const pager = (en) => `<nav class="pager" aria-label="${en ? 'Feed pages' : '피드 페이지 이동'}"><a class="btn" href="#home">${en ? 'Load more' : '더 보기'}<span class="sr">${en ? ' — go to page 2' : ' — 2페이지로 이동'}</span></a><p>${en ? 'Page 1 of 18' : '1 / 18 페이지'}</p></nav>`

const homeView = () => `<div class="view" id="home" lang="ko">
${header(false, 'home')}
<main id="main"><div class="wrap">
<section class="home-head">
<h1>공산당이싫어요</h1>
<div class="intro collapsed" id="introbox"><p id="intro">${KO_INTRO}</p><button type="button" class="more" aria-expanded="false" aria-controls="intro">더보기</button></div>
<nav class="tags" aria-label="주제 태그"><ul>${TAGS.map((t) => `<li><a href="#home"><span class="chip">#${t}</span></a></li>`).join('')}</ul></nav>
<div class="feedbar"><h2>최신 게시물</h2><p>전체 207건 · 1 / 18 페이지</p></div>
</section>
<ul class="grid" aria-label="게시물 목록">
${feed.map((p, i) => card(p, i, i === 0)).join('\n')}
</ul>
${pager(false)}
</div></main>
${footer(false)}
</div>`

const enView = () => `<div class="view" id="en" lang="en">
${header(true, 'en')}
<main><div class="wrap">
<section class="home-head">
<h1><span lang="ko">공산당이싫어요</span> <span class="sub">(Korea Politics &amp; Security Brief)</span></h1>
<div class="intro collapsed"><p id="intro-en">${EN_INTRO}</p><button type="button" class="more" aria-expanded="false" aria-controls="intro-en">More</button></div>
<div class="feedbar"><h2>Latest posts</h2><p>207 posts · Page 1 of 18</p></div>
</section>
<ul class="grid" aria-label="Posts">
${EN_CARDS.map(enCard).join('\n')}
</ul>
</div></main>
</div>`

/* 상세 본문(측정 게시물과 같은 구성) */
const POST_TITLE = '인스타그램 "대진연의 과거" — 2019년 2월 광화문 \'김정은 방남 환영\' 회견, 참석자 상당수가 대진연 회원이었다고 보도됨'
const POST_DESC = "인스타그램 @politics_crush가 대진연의 과거 활동을 다룸. 사진 속 회견은 2019년 2월 14일 광화문 '예술인 모임' 회견으로, 참석자 상당수가 대진연 회원이었다고 보도됐습니다. 2018년 고발 사건의 처분 결과 보도는 찾지 못했습니다."

const postView = (v) => {
  const hero = `<figure class="hero"><div class="media g2"><svg class="ph" aria-hidden="true"><use href="#ph"/></svg><span class="credit">사진: 언론사</span></div><figcaption>사진: 언론사 · 기사 대표 이미지(출처 원문 인용) · 원문의 메타 정보(제목·요약·썸네일)만 인용하며 본문은 전재하지 않습니다.</figcaption></figure>`
  const titleBlock = `<h1 class="ptitle">${esc(POST_TITLE)}</h1>
<dl class="pmeta"><div><dt>게시</dt><dd><time datetime="2026-11-09">2026년 11월 9일</time></dd></div><div><dt>출처 표기</dt><dd>인스타그램 @politics_crush (정치크러쉬)</dd></div></dl>`
  const cta = `<section aria-labelledby="sp" class="cta"><h2 id="sp" class="sr">원문 미리보기</h2><a class="btn" href="#post" target="_blank" rel="noopener">원문 기사로 이동<svg class="ic" aria-hidden="true"><use href="#ic-ext"/></svg><span class="sr"> (새 창에서 열림)</span></a></section>`
  const summary = `<p class="summary">${esc(POST_DESC)}</p>
<p class="notice">공개된 보도·발표·자료를 정리한 글입니다. 아래 원문과 배경 보도에서 직접 확인할 수 있습니다. <a href="#home">출처·표기 원칙 보기</a></p>`
  const share = `<section class="share" aria-labelledby="sh"><h2 id="sh">공유</h2><div class="sgrid"><button type="button" class="sbtn">링크 복사</button><a class="sbtn" href="#post">X에 공유</a><a class="sbtn" href="#post">스레드에 공유</a></div><p role="status" class="sr"></p></section>`
  const body = `<section aria-labelledby="bh"><h2 id="bh" class="sr">본문</h2><div class="post-body">
<p>이 게시물은 원문 캡션과 첫 장 이미지(영상 화면 1장)를 기준으로 정리했으며, 영상과 나머지 장은 확인하지 않았습니다. 원문은 2026년 11월 8일 게시됐지만 사진 속 장면은 <strong>2019년 2월 14일</strong> 서울 광화문광장 기자회견으로, 펼침막 문구("김정은 국무위원장님, 서울방문 환영 예술공연을 꼭 보여드리고 싶습니다")가 당시 보도 내용과 일치합니다. 참석자 얼굴이 식별되는 원문 이미지 대신 자체 제작 카드를 썼습니다.</p>
<h2>원문 주장 (게시자 의견)</h2>
<ul><li>"김정은 국무위원장님 사랑해요?"라는 제목으로 '대진연의 과거'를 소개함.</li><li>캡션에서 "이러고 안잡혔나요?"라고 물음.</li></ul>
<h2>보도로 확인된 내용</h2>
<ul><li>2019년 2월 14일 오전 광화문광장 세종대왕상 앞에서 '김정은 국무위원장님 서울방문 환영공연을 준비하는 (남측) 예술인 모임'이 김 위원장의 서울 방문을 환영하는 기자회견을 열었고, 참석자들은 "사랑합니다 김정은 위원장님"을 연호한 것으로 보도됨(데일리안, 조선일보).</li><li>조선일보는 이 모임의 참석자 상당수가 한국대학생진보연합(대진연) 소속 회원이었고, 대진연이 이날 연극·노래 공연을 했다고 보도함.</li><li>같은 기사는 대진연이 2018년 11월 '백두칭송위원회' 등 김정은 환영 단체 결성에 주도적으로 참여했고, 보수단체로부터 국가보안법 위반 혐의로 고발됐다고 전함.</li></ul>
<h2>"안 잡혔나"에 대해 확인된 범위</h2>
<ul><li>2018년 11월 보수 성향 단체가 백두칭송위 관계자들을 국가보안법 위반 혐의로 고발했고, 검찰은 같은 해 12월 서울경찰청에 수사를 지휘한 것으로 보도됨.</li><li>2020년 10월 서울경찰청 보안수사대는 찬양·고무 혐의로 불구속 입건된 대진연 전 공동대표 등 백두칭송위 관계자들에게 출석을 요구했다고 밝혔고, "수사는 연말까지 마무리할 계획"이라고 말한 것으로 보도됨(조선일보). 고발 약 2년 만의 첫 출석 조사여서 '늑장 수사'라는 지적이 나왔다고 같은 기사는 전함.</li><li>이후 송치·기소 등 처분 결과를 다룬 보도는 이번에 찾지 못했습니다. 따라서 처벌 여부는 적지 않았습니다.</li></ul>
<h2>요약에 넣지 않은 내용</h2>
<ul><li>원문 캡션의 "미친 거 아닙니까?"는 게시자 의견이어서 요약에 옮기지 않았습니다. 사진 속 참석자 개인의 신원은 다루지 않았습니다.</li></ul>
</div></section>`
  const enBodyCheck = `<section class="post-body" lang="en" aria-label="English body sample (line length check)" id="en-sample"><h2>Line-length check (English body)</h2><p>The photo shows a press conference held in Gwanghwamun Square on February 14, 2019. Reports at the time said that many of the attendees were members of a student group, and that a complaint filed in November 2018 led to a first police summons in October 2020. We could not find reports on the outcome of the case, so this post does not say whether anyone was punished.</p></section>`
  const sources = `<section class="sources" aria-labelledby="bg"><h2 id="bg">배경 보도</h2><ul>
<li><a href="#post"><span class="stype">언론</span><span class="sname">조선일보 — '예술인이라더니' 親北 대학생 단체… 서울 한복판서 "김정은 사랑해요"</span><time datetime="2019-02-14">2019.02.14</time></a></li>
<li><a href="#post"><span class="stype">언론</span><span class="sname">데일리안 — "김정은 위원장님 사랑합니다!"…그가 온다, 갈등과 함께</span><time datetime="2019-02-14">2019.02.14</time></a></li>
<li><a href="#post"><span class="stype">언론</span><span class="sname">조선일보 — 경찰, '김정은 찬양' 백두칭송위에 고발 2년 만에 출석 요구</span><time datetime="2020-10-30">2020.10.30</time></a></li></ul></section>`
  const tags = `<section class="ptags" aria-labelledby="th"><h2 id="th">태그</h2><ul><li><a href="#home"><span class="chip">#북한</span></a></li><li><a href="#home"><span class="chip">#국가보안법</span></a></li><li><a href="#home"><span class="chip">#경찰</span></a></li></ul></section>`
  const corr = `<p class="corr">사실과 다른 내용이 있으면 <a href="#home">정정·삭제 요청 절차</a>를 통해 알려주세요. 원문 확인: <a href="#post">인스타그램 @politics_crush (정치크러쉬)</a></p>`
  const crumb = `<nav class="crumb" aria-label="현재 위치"><ol><li><a href="#home">홈</a></li><li><span class="sep" aria-hidden="true">›</span><a href="#home">게시물</a></li></ol></nav>`
  const lead = v === 'C3' ? `${crumb}${hero}${titleBlock}` : `${crumb}${titleBlock}${hero}`
  const mid = v === 'C1' ? `${cta}${summary}${share}${body}` : `${cta}${summary}${body}${share}`
  return `<div class="view" id="post" lang="ko">
${header(false, 'home')}
<main><article class="post wrap-post">
${lead}
${mid}
${sources}
${tags}
${corr}
${enBodyCheck}
</article></main>
${footer(false)}
</div>`
}

const bannerHtml = `<aside class="banner" aria-label="외부 링크 안내"><a href="#home" aria-label="이재명 재판재개 촉구 국민 서명운동 — 외부 사이트로 이동합니다 (새 창에서 열림)"><span class="bt">이재명 재판재개 촉구 국민 서명운동</span><span class="bs">외부 사이트로 이동합니다</span><svg class="ic" aria-hidden="true"><use href="#ic-ext"/></svg></a></aside>`

/* ───────── CSS ───────── */
const T = TOKENS.light
const baseCss = `
:root{--bg:${T.bg};--fg:${T.fg};--fg2:${T.fg2};--muted:${T.muted};--surface:${T.surface};--hover:${T.hover};--line:${T.line};--bd:${T.bd};--link:${T.link};--ring:${T.ring};--banner:${T.banner};--gut:16px;--sans:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Pretendard','Malgun Gothic','Noto Sans KR','Helvetica Neue',Arial,sans-serif;--ph-bg:#d4d4d8;--ph-fg:#e9e9ec}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--sans);font-size:16px;line-height:1.65;text-wrap:pretty}
a{color:inherit}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:4px}
.skip{position:absolute;left:-9999px;top:8px;background:var(--fg);color:#fff;padding:10px 14px;z-index:60}
.skip:focus{left:8px}
.wrap{max-width:1152px;margin:0 auto;padding:0 var(--gut)}
.ic{width:16px;height:16px;flex:none}
.view{display:block}
.view+.view{margin-top:48px;border-top:8px solid var(--surface)}
html[data-view="home"] .view:not(#home),html[data-view="post"] .view:not(#post),html[data-view="en"] .view:not(#en){display:none}
html[data-view] .view{margin:0;border:0}
html[data-view="en"] .banner{display:none}
/* 헤더 */
.site-header{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.96);border-bottom:1px solid var(--line)}
.hdr{display:flex;align-items:center;justify-content:space-between;gap:8px;height:56px}
.logo{font-size:17px;font-weight:700;letter-spacing:-.03em;text-decoration:none;white-space:nowrap;min-height:44px;display:inline-flex;align-items:center}
.hdr-r{display:flex;align-items:center;gap:4px;font-size:14px}
.nav,.lang{display:flex;align-items:center}
.nav a,.lang a{min-height:44px;min-width:44px;justify-content:center;display:inline-flex;align-items:center;padding:0 10px;color:var(--muted);text-decoration:none}
.nav a:hover,.lang a:hover{color:var(--fg);text-decoration:underline}
.lang .cur{font-weight:700;color:var(--fg);padding:0 10px}
.lang .cur{display:none}
/* 홈 머리 */
.home-head{padding-top:14px}
.home-head h1{margin:0;font-size:22px;line-height:1.3;font-weight:700;letter-spacing:-.03em}
.home-head h1 .sub{font-size:15px;font-weight:500;color:var(--muted);letter-spacing:0;display:inline-block}
.intro{display:flex;align-items:center;gap:2px;margin-top:2px}
.intro p{margin:0;flex:1;min-width:0;font-size:14px;line-height:1.55;color:var(--muted)}
.intro.collapsed p{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.more{min-height:44px;min-width:56px;padding:0 6px;background:none;border:0;font:inherit;font-size:14px;color:var(--link);text-decoration:underline;text-underline-offset:2px;cursor:pointer}
.tags ul{display:flex;gap:4px;margin:0;padding:0;list-style:none;overflow-x:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 32px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 32px),transparent)}
.tags ul::-webkit-scrollbar{display:none}
.tags li{flex:none}
.tags a,.ptags a{display:flex;align-items:center;min-height:44px;text-decoration:none}
.chip{display:inline-flex;align-items:center;min-height:32px;padding:0 12px;border:1px solid var(--bd);border-radius:999px;font-size:14px;line-height:1;white-space:nowrap;background:var(--bg)}
a:hover .chip{border-color:var(--fg)}
.feedbar{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-top:4px;padding-top:6px}
.feedbar h2{margin:0;font-size:15px;font-weight:600}
.feedbar p{margin:0;font-size:13px;color:var(--muted)}
/* 카드 공통 */
.grid{list-style:none;margin:10px 0 0;padding:0;display:grid;align-items:stretch}
.card{position:relative;display:flex;flex-direction:column;min-width:0}
.media{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--ph-bg)}
.media.g1{--ph-bg:#d4d4d8;--ph-fg:#e9e9ec}.media.g2{--ph-bg:#c4c4ca;--ph-fg:#dadade}.media.g3{--ph-bg:#b9b9c0;--ph-fg:#d0d0d5}.media.g4{--ph-bg:#cdcdd3;--ph-fg:#e3e3e6}
.ph{position:absolute;inset:0;width:100%;height:100%}
.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);padding:2px 7px;border-radius:4px;background:rgba(24,24,27,.82);color:#fff;font-size:13px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.media.fb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:var(--surface);color:var(--muted);box-shadow:inset 0 0 0 1px var(--bd);text-align:center;padding:8px}
.media.fb .ic{width:26px;height:26px}
.fb-t{font-size:14px;font-weight:600;color:var(--fg2);line-height:1.3}
.fb-s{font-size:13px;line-height:1.3}
.cbody{display:flex;flex-direction:column;justify-content:space-between;gap:6px;flex:1;min-width:0}
.title{margin:0;font-weight:600;letter-spacing:-.01em;line-height:1.45;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;-webkit-line-clamp:var(--clamp,3)}
.title a{text-decoration:none}
.title a::after{content:'';position:absolute;inset:0}
.card:has(a:focus-visible){outline:2px solid var(--ring);outline-offset:2px;border-radius:8px}
.title a:focus-visible{outline:none}
.meta{margin:0;font-size:13px;line-height:1.4;color:var(--muted)}
.pager{display:flex;flex-direction:column;align-items:center;gap:8px;margin:28px 0 0}
.pager p{margin:0;font-size:13px;color:var(--muted)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 24px;background:var(--fg);color:#fff;font-size:16px;font-weight:600;text-decoration:none}
.pager .btn{width:100%}
.btn:hover{background:#27272a}
.site-footer{margin-top:40px;border-top:1px solid var(--line);padding:20px 0 28px;font-size:14px;color:var(--muted)}
.site-footer p{margin:0 0 4px;line-height:1.6}
.site-footer ul{margin:0;padding:0;list-style:none}
.site-footer a{display:flex;align-items:center;min-height:44px;color:var(--fg2);text-decoration:underline;text-underline-offset:3px}
/* 상세 */
.wrap-post{max-width:720px;margin:0 auto;padding:0 var(--gut) 8px}
.crumb ol{display:flex;align-items:center;margin:0;padding:0;list-style:none;font-size:14px;color:var(--muted)}
.crumb li{display:flex;align-items:center}.crumb a{display:inline-flex;align-items:center;min-height:44px;min-width:44px;padding:0 6px 0 0;color:var(--muted)}.crumb .sep{padding:0 8px 0 2px}
.ptitle{margin:4px 0 10px;font-size:22px;line-height:1.38;font-weight:700;letter-spacing:-.03em;overflow-wrap:anywhere}
.pmeta{display:flex;flex-wrap:wrap;gap:2px 16px;margin:0;font-size:13px;color:var(--muted);line-height:1.5}
.pmeta div{display:flex;gap:6px}.pmeta dt,.pmeta dd{margin:0}
.hero{margin:14px 0 0}
.hero .media{border-radius:var(--r)}
.hero figcaption{margin-top:6px;font-size:13px;line-height:1.5;color:var(--muted)}
.cta{margin-top:14px}
.cta .btn{width:100%;border-radius:var(--r)}
.summary{margin:18px 0 0;font-size:17px;line-height:1.7;color:var(--fg2)}
.notice{margin:14px 0 0;padding:12px 14px;font-size:14px;line-height:1.6;color:var(--muted);border-radius:var(--r)}
.notice a{color:var(--link)}
.share{margin-top:24px}
.share h2{margin:0 0 8px;font-size:15px;font-weight:600}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.sbtn{display:flex;align-items:center;justify-content:center;min-height:44px;padding:0 6px;border:1px solid var(--bd);border-radius:var(--r);background:var(--bg);font:inherit;font-size:14px;color:var(--fg);text-decoration:none;cursor:pointer;text-align:center}
.sbtn:hover{border-color:var(--fg)}
.post-body{margin-top:28px;font-size:17px;line-height:1.75;max-width:38em;overflow-wrap:anywhere}
.post-body[lang=en]{max-width:66ch;margin-top:8px}
.post-body p{margin:0 0 1.1em}
.post-body h2{margin:1.8em 0 .5em;font-size:19px;line-height:1.45;font-weight:700;letter-spacing:-.02em}
.post-body ul{margin:0 0 1em;padding-left:1.2em}.post-body li{margin:.35em 0}
.sources{margin-top:32px}.sources h2,.ptags h2{margin:0 0 6px;font-size:15px;font-weight:600}
.sources ul{margin:0;padding:0;list-style:none}
.sources li{border-top:1px solid var(--line)}.sources li:last-child{border-bottom:1px solid var(--line)}
.sources a{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;align-items:start;min-height:44px;padding:10px 0;text-decoration:none;font-size:15px;line-height:1.5}
.sources a:hover .sname{text-decoration:underline}
.stype{font-size:13px;color:var(--muted);border:1px solid var(--bd);border-radius:4px;padding:0 6px;line-height:1.5;margin-top:2px}
.sources time{grid-column:2;font-size:13px;color:var(--muted)}
.ptags{margin-top:28px}.ptags ul{display:flex;flex-wrap:wrap;gap:4px 6px;margin:0;padding:0;list-style:none}
.corr{margin:28px 0 0;padding-top:16px;border-top:1px solid var(--line);font-size:14px;line-height:1.7;color:var(--muted)}
.corr a{color:var(--link)}
/* 배너 공통 */
.banner{position:fixed;z-index:40;background:var(--banner);color:#fff}
.banner a{display:flex;color:#fff;text-decoration:none}
.banner a:hover{background:#27272a}
.banner a:focus-visible{outline:2px solid #fff;outline-offset:-4px;border-radius:0}
.bt{font-size:14px;font-weight:600;line-height:1.35}.bs{font-size:13px;line-height:1.35;color:#d4d4d8}
.banner .ic{width:16px;height:16px;flex:none}
/* ≥1024: 오른쪽 세로 탭(현행 유지) */
@media (min-width:1024px){
.banner{top:50%;right:0;bottom:auto;left:auto;width:48px;transform:translateY(-50%);border-radius:8px 0 0 8px;overflow:hidden}
.banner a{flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:16px 0;writing-mode:vertical-rl;min-height:0}
.banner .ic{display:none}
.bt{font-size:14px}.bs{font-size:13px}
body{padding-bottom:0!important}
}
@media (min-width:1024px) and (max-width:1231.98px){.wrap,.wrap-post{padding-right:56px}}
@media (min-width:768px){
:root{--gut:24px}
.home-head{padding-top:24px}
.home-head h1{font-size:28px}
.home-head h1 .sub{font-size:17px}
.intro p,.intro.collapsed p{font-size:16px;display:block;-webkit-line-clamp:unset;max-width:46em}
.more{display:none}
.tags ul{flex-wrap:wrap;overflow:visible;-webkit-mask-image:none;mask-image:none;margin-top:2px}
.lang .cur{display:inline-flex;align-items:center;min-height:44px}
.hdr-r{gap:12px;font-size:15px}
.feedbar{margin-top:10px;border-top:1px solid var(--line);padding-top:14px}
.feedbar h2{font-size:16px}.feedbar p{font-size:14px}
.pager .btn{width:auto;min-width:240px}
.ptitle{font-size:26px;margin-top:8px}
.cta .btn{width:auto;min-width:240px}
.share .sgrid{grid-template-columns:repeat(3,minmax(0,160px))}
.pmeta{font-size:14px}
.sources a{grid-template-columns:auto 1fr auto;align-items:baseline}.sources time{grid-column:auto}
}
@media (min-width:1280px){.ptitle{font-size:30px}}
`

const variantCss = {
  C1: `
/* C1: 1/2/3/3 · 테두리형(3:1) · 첫 카드 강조 없음 · 하단 전폭 띠 배너(2줄) */
:root{--r:8px}
body{padding-bottom:60px}
.banner{left:0;right:0;bottom:0;padding:0 0 env(safe-area-inset-bottom)}
.banner a{flex-direction:column;justify-content:center;gap:0;min-height:52px;padding:7px 16px 7px;position:relative}
.banner .ic{position:absolute;right:16px;top:50%;margin-top:-8px}
.bt,.bs{padding-right:28px}
.grid{grid-template-columns:1fr;gap:16px;--clamp:3}
.card{border:1px solid var(--bd);border-radius:var(--r);background:var(--bg);overflow:hidden}
.card .media{border-bottom:1px solid var(--bd)}
.cbody{padding:12px 14px 12px}
.title{font-size:16px}
.card:hover{background:var(--surface)}
.notice{border:1px solid var(--bd);background:var(--bg)}
.hero .media{border:1px solid var(--bd)}
.btn{border-radius:var(--r)}
@media (min-width:1024px){.banner{left:auto;right:0;bottom:auto;padding:0}.banner a{min-height:0;padding:16px 0}.bt,.bs{padding-right:0}.banner .ic{position:static;margin:0}}
@media (min-width:768px){body{padding-bottom:60px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.title{font-size:17px}.cbody{padding:14px 16px 14px}}
@media (min-width:1024px){.grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.title{font-size:16px}}
`,
  C2: `
/* C2: 1/2/3/4 · 면형(테두리 없음, 배경 단차) · md 이상 첫 카드 2칸 · 오른쪽 아래 축소 알약 배너 */
:root{--r:12px}
body{padding-bottom:72px}
.banner{right:calc(12px + env(safe-area-inset-right));bottom:calc(12px + env(safe-area-inset-bottom));max-width:calc(100vw - 24px);border-radius:999px;box-shadow:0 1px 3px rgba(0,0,0,.35)}
.banner a{align-items:center;gap:8px;min-height:44px;padding:0 14px 0 18px;border-radius:999px}
.bs{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.grid{grid-template-columns:1fr;gap:16px;--clamp:3}
.card{background:var(--surface);border-radius:var(--r);overflow:hidden}
.cbody{padding:12px 14px 14px}
.title{font-size:16px}
.card:hover{background:var(--hover)}
.notice{background:var(--surface)}
.hero .media{border-radius:var(--r)}
.btn{border-radius:var(--r)}
.sbtn{background:var(--surface);border-color:transparent;border-bottom:2px solid var(--bd)}
@media (min-width:768px){
body{padding-bottom:72px}
.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;grid-auto-flow:dense}
.card.first{grid-column:1/-1}
.card.first .media{aspect-ratio:2/1}
.card.first .title{font-size:22px;line-height:1.4;--clamp:3}
.card.first .cbody{padding:16px 20px 18px;gap:10px}
.cbody{padding:14px 16px 16px}
.title{font-size:17px}
}
@media (min-width:1024px){
.banner{right:0;bottom:auto;max-width:none;border-radius:8px 0 0 8px;box-shadow:none}
.banner a{border-radius:0;padding:16px 0;min-height:0}
.grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.card.first{grid-column:span 2}
.card.first .media{aspect-ratio:16/9}
.title{font-size:16px}
}
@media (min-width:1280px){
.grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.title{font-size:15px;--clamp:4}
.card.first .title{font-size:24px;--clamp:4}
.card.first .media{aspect-ratio:2/1}
}
`,
  C3: `
/* C3: 2/2/3/4 · 이미지 꽉 참 + 아래 글자 · lg 이상 첫 카드 가로형 전폭 · 하단 전폭 한 줄 띠 배너 */
:root{--r:8px}
body{padding-bottom:44px}
.banner{left:0;right:0;bottom:0;padding:0 0 env(safe-area-inset-bottom)}
.banner a{align-items:center;justify-content:space-between;gap:12px;min-height:44px;padding:0 16px}
.bt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.bs{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.banner .ic{margin-left:auto}
.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 12px;--clamp:5}
.card .media{border-radius:var(--r)}
.cbody{padding:8px 2px 0}
.title{font-size:14px;line-height:1.42}
.meta{font-size:13px}
.card:hover .title{text-decoration:underline;text-underline-offset:3px}
.notice{border-left:3px solid var(--bd);background:var(--bg);border-radius:0;padding:4px 0 4px 12px}
.hero{margin-left:calc(-1 * var(--gut));margin-right:calc(-1 * var(--gut));margin-top:0}
.hero .media{border-radius:0}
.hero figcaption{padding:0 var(--gut)}
.btn{border-radius:var(--r)}
@media (max-width:339px){.grid{grid-template-columns:1fr}}
@media (min-width:1024px){.banner{left:auto;right:0;bottom:auto;padding:0}.banner a{min-height:0;padding:16px 0;justify-content:center}.bt{overflow:visible;white-space:normal;text-overflow:clip}}
@media (min-width:768px){
body{padding-bottom:44px}
.grid{gap:28px 20px;--clamp:3}
.title{font-size:17px}
.hero{margin-left:0;margin-right:0;margin-top:14px}.hero .media{border-radius:var(--r)}.hero figcaption{padding:0}
}
@media (min-width:1024px){
.grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:32px 24px}
.card.first{grid-column:1/-1;flex-direction:row;gap:28px;align-items:stretch}
.card.first .media{flex:0 0 60%;aspect-ratio:16/9}
.card.first .cbody{padding:4px 0 0;justify-content:flex-start;gap:14px}
.card.first .title{font-size:28px;line-height:1.38;--clamp:5}
.card.first .meta{font-size:14px}
.title{font-size:16px}
}
@media (min-width:1280px){
.grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:32px 24px}
.title{font-size:15px;--clamp:4}
}
`,
}

const script = `<script>
(function(){
var v=(location.hash||'').slice(1);
if(v==='home'||v==='post'||v==='en')document.documentElement.setAttribute('data-view',v);
document.querySelectorAll('.more').forEach(function(b){b.addEventListener('click',function(){
var box=b.closest('.intro');var open=box.classList.toggle('collapsed')===false;
b.setAttribute('aria-expanded',open?'true':'false');b.textContent=open?(box.closest('[lang=en]')?'Less':'접기'):(box.closest('[lang=en]')?'More':'더보기');});});
})();
</script>`

export function render(v) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>공산당이싫어요 — v0.3 반응형 시안 ${v}</title>
<style>${baseCss}${variantCss[v]}</style>
</head>
<body class="v-${v}">
<a class="skip" href="#main">본문으로 건너뛰기</a>
${SVG_DEFS}
${homeView()}
${postView(v)}
${enView()}
${bannerHtml}
${script}
</body>
</html>
`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const v of ['C1', 'C2', 'C3']) {
    fs.mkdirSync(path.join(OUT, v), { recursive: true })
    fs.writeFileSync(path.join(OUT, v, 'mockup.html'), render(v))
    console.log(`wrote design/v0.3-responsive/${v}/mockup.html`)
  }
  console.log('feed titles:', feed.map((p) => p.title.length).join(','))
}
