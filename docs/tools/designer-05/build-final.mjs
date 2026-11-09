// 디자인 팀장 05 — 보강안(final) 정적 목업 생성기.
// 실행(저장소 루트): node docs/tools/designer-05/build-final.mjs
// 출력: design/v0.3-responsive/final/mockup.html (외부 요청 없음, 인라인 CSS, 소량 JS)
// 문구·제목은 디자이너 A의 콘텐츠 모듈(실제 게시물 제목·UI 문구)을 읽기만 해서 쓴다.
// 사진은 전부 회색 자리표시다(실제 보도사진 없음). 출처 이름은 자리표시 예시다.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, SITE_SUB, INTRO_KO, EN_NOTICE, BANNER, FOOT_KO, FOOT_EN, CARDS, LONGEST, CARDS_EN, TAGS, TAG_TOTAL, POST_KO, POST_EN } from '../designer-04-A/content.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(HERE, '../../../design/v0.3-responsive/final/mockup.html')
const INTRO_EN_FULL = "A card-style news digest that gathers and organizes reporting from multiple news outlets. We do not do our own reporting; we organize each story with its sources named: news reports (from outlets registered under Korea's Act on the Promotion of Newspapers and related laws), announcements by investigative authorities, and court rulings. We do not make definitive claims about how far the facts have been established; we quote the reports as they are."
const INTRO_EN_SHORT = 'A card-style news digest that gathers reports from multiple news outlets. We do no reporting of our own and cite reports, official announcements and rulings.'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const ICONS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-ext" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
<symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></symbol>
<symbol id="i-noimg" viewBox="0 0 24 24"><path d="M3 3l18 18"/><path d="M10.4 5H19a2 2 0 0 1 2 2v8.6M17.5 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 1.3-1.9"/><path d="m3 16 4.5-4.5 3 3M14 13l1.5-1.5L21 17"/></symbol>
<symbol id="i-chevl" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
<symbol id="i-chevr" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
</svg>`
const svg = (id, cls = '') => `<svg aria-hidden="true" class="ic ${cls}"><use href="#${id}"/></svg>`

// 이미지 슬롯: photo(회색 자리표시 = 실제 사진 자리) / none(새 대체 카드)
function media(k, { big = false, lang = 'ko' } = {}) {
  if (k === 'none') {
    const label = lang === 'en' ? 'No representative image' : '대표 이미지 없음'
    return `<span class="m none" role="img" aria-label="${label}">${svg('i-noimg')}<span class="nt">${label}</span></span>`
  }
  return `<span class="m photo${big ? ' big' : ''}" role="img" aria-label="${lang === 'en' ? 'Photo placeholder (mockup)' : '사진 자리표시(목업)'}"></span>`
}

const hdr = (lang, cur) => {
  const ko = lang === 'ko'
  const nav = ko
    ? `<a href="?view=home"${cur === 'home' ? ' aria-current="page"' : ''}>홈</a><a href="?view=about"${cur === 'about' ? ' aria-current="page"' : ''}>소개</a><a class="lang" href="?view=en" hreflang="en" lang="en">English</a>`
    : `<a href="?view=en"${cur === 'home' ? ' aria-current="page"' : ''}>Home</a><a href="?view=about">About</a><a class="lang" href="?view=home" hreflang="ko" lang="ko">한국어</a>`
  return `<a class="skip" href="#main-${cur}-${lang}">${ko ? '본문 바로가기' : 'Skip to content'}</a>
<header class="hdr"><div class="wrap"><a class="logo" href="?view=${ko ? 'home' : 'en'}"><span lang="ko">${SITE}</span>${ko ? '' : `<span class="sub" lang="en">${SITE_SUB}</span>`}</a><nav aria-label="${ko ? '주 메뉴' : 'Main'}">${nav}</nav></div></header>`
}

const foot = (lang) => {
  const f = lang === 'ko' ? FOOT_KO : FOOT_EN
  return `<footer class="foot"><div class="wrap"><p class="name" lang="ko">${SITE}</p><p>${f.tag}</p><p>${f.policy}</p><ul><li><a href="?view=about">${f.link}</a></li><li><a href="#terms">${f.terms}</a></li></ul></div></footer>`
}

const banner = `<aside class="banner" aria-label="외부 링크 안내"><a href="#campaign" target="_blank" rel="noopener nofollow" aria-label="${BANNER.title} — ${BANNER.sub} (새 창에서 열림)"><span class="t">${BANNER.title}${svg('i-ext')}</span><span class="s">${BANNER.sub}</span></a></aside>`

function card(c, i, lang = 'ko') {
  const ko = lang === 'ko'
  const tl = c.ko ? ' lang="ko"' : ''
  const up = c.up ? ` <span aria-hidden="true">·</span> <span><span aria-hidden="true">${c.up.replace('-', '/')} 갱신</span><span class="sr">2026년 ${+c.up.slice(0, 2)}월 ${+c.up.slice(3)}일 갱신</span></span>` : ''
  const date = ko ? `<time datetime="2026-${c.d}">${c.d.replace('-', '/')}</time>` : `<time datetime="2026">${c.d}</time>`
  const kon = c.ko ? ` <span class="kon" id="kon-${i}">Korean only</span>` : ''
  return `<li class="card"><span class="cm">${media(c.k, { lang })}</span><div class="cb"><h3 class="ct"><a href="?view=${ko ? 'post' : 'post-en'}" title="${esc(c.t)}"${tl}${c.ko ? ` hreflang="ko" aria-describedby="kon-${i}"` : ''}>${esc(c.t)}</a></h3><p class="meta">${date}${up}${kon}</p></div></li>`
}

// 번호형 페이지 이동(B1 차용) — 전부 실제 <a href>. 무한스크롤은 그 위에 얹는 점진적 향상(C8)
function pager(lang, cur = 1, total = 18) {
  const ko = lang === 'ko'
  const nums = [1, 2, 3, 'gap', total].map((n) => n === 'gap' ? '<li class="gap" aria-hidden="true">…</li>'
    : n === cur ? `<li><a class="pg cur" href="?page=${n}" aria-current="page"><span class="sr">${ko ? `${n}페이지, 현재 페이지` : `Page ${n}, current page`}</span><span aria-hidden="true">${n}</span></a></li>`
      : `<li><a class="pg" href="?page=${n}"><span class="sr">${ko ? `${n}페이지` : `Page ${n}`}</span><span aria-hidden="true">${n}</span></a></li>`).join('')
  return `<nav class="pager" aria-label="${ko ? '페이지 이동' : 'Pages'}">
<a class="nx" href="?page=${cur + 1}" rel="next">${ko ? '다음 페이지' : 'Next page'}${svg('i-chevr')}<span class="nx-s">${ko ? `${cur + 1} / ${total}` : `${cur + 1} of ${total}`}</span></a>
<ul class="pgs"><li><span class="pg off" aria-disabled="true">${svg('i-chevl')}<span class="sr">${ko ? '이전 페이지 없음' : 'No previous page'}</span></span></li>${nums}<li><a class="pg" href="?page=${cur + 1}">${svg('i-chevr')}<span class="sr">${ko ? '다음 페이지' : 'Next page'}</span></a></li></ul></nav>`
}

const rail = (active) => `<nav class="rail-wrap" aria-label="주제"><ul class="rail">${TAGS.map(([t, n]) => `<li><a class="chip${t === active ? ' on' : ''}" href="?view=tag"${t === active ? ' aria-current="page"' : ''}><span>#${t} <em>${n}</em></span></a></li>`).join('')}<li><a class="chip all" href="#tags"><span>전체 주제 ${TAG_TOTAL}개</span></a></li></ul></nav>`

const feedCards = [CARDS[0], { ...CARDS[1] }, CARDS[2], CARDS[3], { d: '11-02', k: 'photo', t: LONGEST }, ...CARDS.slice(4, 11)]

const home = `<div class="view" data-v="home" lang="ko">${hdr('ko', 'home')}
<main id="main-home-ko"><div class="wrap">
<div class="head"><h1>${SITE}</h1>
<div class="intro"><p id="intro-ko">${INTRO_KO}</p><details><summary aria-controls="intro-ko"><span class="more">더보기</span><span class="less">접기</span></summary></details></div>
${rail()}</div>
<div class="sec"><h2>최신 게시물</h2><p>전체 207건 · 1 / 18 페이지</p></div>
<ul class="feed">${feedCards.map((c, i) => card(c, i)).join('')}</ul>
${pager('ko')}
</div></main>${foot('ko')}</div>`

const tagCards = feedCards.filter((c, i) => [0, 2, 6, 7, 8, 9, 3, 5].includes(i))
const tag = `<div class="view" data-v="tag" lang="ko">${hdr('ko', 'tag')}
<main id="main-tag-ko"><div class="wrap">
<nav class="crumb" aria-label="이동 경로"><a href="?view=home">홈</a><span aria-hidden="true">›</span><span>#dmz</span></nav>
<div class="head tag-head"><h1>#dmz</h1><p class="tag-sub">이 주제로 정리한 게시물 40건</p>
${rail('dmz')}</div>
<div class="sec"><h2>게시물</h2><p>40건 · 1 / 4 페이지</p></div>
<ul class="feed">${tagCards.map((c, i) => card(c, 100 + i)).join('')}</ul>
${pager('ko', 1, 4).replace('<li class="gap" aria-hidden="true">…</li>', '')}
</div></main>${foot('ko')}</div>`

function post(lang) {
  const ko = lang === 'ko'
  const P = ko ? POST_KO : POST_EN
  const crumb = ko ? `<nav class="crumb" aria-label="이동 경로"><a href="?view=home">홈</a><span aria-hidden="true">›</span><span>게시물</span></nav>`
    : `<nav class="crumb" aria-label="Breadcrumb"><a href="?view=en">Home</a><span aria-hidden="true">›</span><span>Post</span></nav>`
  const dl = ko
    ? `<dl class="dl"><div><dt>게시일</dt><dd><time datetime="2026-11-09">${P.date}</time></dd></div><div><dt>원문</dt><dd>${P.attr}</dd></div></dl>`
    : `<dl class="dl"><div><dt>Published</dt><dd><time datetime="2026-11-09">${P.date}</time></dd></div><div><dt>Translated</dt><dd><time datetime="2026-11-09">${P.tr}</time></dd></div><div><dt>Original</dt><dd><span lang="ko">인스타그램</span> @politics_crush (<span lang="ko">정치크러쉬</span>)</dd></div></dl>`
  // 사진 출처 표시(card-image-policy A-3·B-2): 이미지 아래 figcaption, 원 페이지 링크 포함
  const cap = ko
    ? `<figcaption><span class="cr">사진: 대통령실(공공누리 제1유형)</span> · <a href="#kogl-source">원문 페이지</a><span class="cr-full">본 저작물은 대통령실에서 2026년 작성하여 공공누리 제1유형으로 개방한 '(저작물명)'을 이용하였습니다.</span></figcaption>`
    : `<figcaption><span class="cr">Photo: Office of the President (KOGL Type 1)</span> · <a href="#kogl-source">Source page</a></figcaption>`
  const body = P.sections.map((s) => `<h2>${s.h}</h2><ul>${s.ul.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')
  const sources = `<section class="sources" aria-labelledby="src-${lang}"><h2 id="src-${lang}">${ko ? '배경 보도' : 'Background reports'}</h2><ul>${P.sources.map(([k, t, d]) => `<li><span class="k">${k}</span><a href="#src" target="_blank" rel="noopener"${ko ? '' : ' lang="ko"'}>${ko ? t : t}<span class="sr">${ko ? '(새 창에서 열림)' : '(opens in a new tab)'}</span></a><time>${d}</time></li>`).join('')}</ul></section>`
  const share = `<section class="share" aria-labelledby="sh-${lang}"><h2 id="sh-${lang}">${ko ? '공유' : 'Share'}</h2><div class="sharegrid"><button type="button" class="btn" data-copy>${svg('i-link')}${ko ? '링크 복사' : 'Copy link'}</button><a class="btn" href="#x" target="_blank" rel="noopener">X</a><a class="btn" href="#threads" target="_blank" rel="noopener">${ko ? '스레드' : 'Threads'}</a></div><p class="sharestat" role="status" data-stat></p></section>`
  const tags = ko ? `<section class="tags" aria-labelledby="tg-ko"><h2 id="tg-ko">태그</h2><ul>${P.tags.map((t) => `<li><a class="chip" href="?view=tag"><span>#${t}</span></a></li>`).join('')}</ul></section>` : ''
  const preview = `<section class="preview" aria-labelledby="pv-${lang}"><h2 id="pv-${lang}">${ko ? '원문 미리보기' : 'Original preview'}</h2><p>${ko ? '사이트' : 'Site'}: Instagram</p><p>${ko ? '원문 제목' : 'Original title'}: <span lang="ko">"김정은 국무위원장님 사랑해요?"</span></p><p class="pvn">${ko ? '원문 메타 정보만 인용했습니다. 전문은 원문에서 확인하세요.' : 'Only the original metadata is quoted. See the original for the full text.'}</p></section>`
  const alt = ko ? `<a class="lang-alt" href="?view=post-en" hreflang="en" lang="en">Read in English</a>` : `<a class="lang-alt" href="?view=post" hreflang="ko" lang="ko">한국어로 보기</a>`
  const note = ko
    ? `<p class="postnote">이 게시물은 공개된 보도·발표를 정리한 것이며, 사실 확인 단계는 요약과 출처 목록으로 전합니다. <a href="?view=about">운영 원칙 보기</a></p>`
    : `<p class="postnote">This post organizes public reports and announcements; how far the facts are established is conveyed through the summary and source list. <a href="?view=about">How this site works</a></p>`
  const correct = ko
    ? `<p class="correct">사실과 다른 내용이 있으면 <a href="?view=about">정정·삭제 요청 절차</a>로 알려 주세요. 원문은 <a href="#source" target="_blank" rel="noopener">인스타그램 @politics_crush</a>에서 확인할 수 있습니다.</p>`
    : `<p class="correct">If anything here is inaccurate, please use the <a href="?view=about">correction and removal process</a>. The original is at <a href="#source" target="_blank" rel="noopener" lang="ko">인스타그램 @politics_crush</a>.</p>`
  return `<div class="view${ko ? '' : ' en-post'}" data-v="${ko ? 'post' : 'post-en'}" lang="${lang}">${hdr(lang, ko ? 'post' : 'post')}
<main id="main-post-${lang}"><div class="wrap">
<div class="post-grid"><article class="main">${crumb}
<h1${ko ? '' : ''}>${P.title}</h1>
<p class="desc">${P.desc}</p>
${dl}
<a class="cta" href="#source" target="_blank" rel="noopener">${ko ? '원문 기사로 이동' : 'Go to the original'}${svg('i-ext')}<span class="sr">${ko ? '(새 창에서 열림)' : '(opens in a new tab)'}</span></a>
${alt}
${note}
<figure class="fig">${media('photo', { big: true, lang })}${cap}</figure>
<div class="post-body"><p>${P.lead}</p>${body}</div>
${preview}
</article>
<aside class="side" aria-label="${ko ? '보조 정보' : 'Related'}">${sources}${share}${tags}</aside>
<div class="tail">${correct}</div>
</div></div></main>${foot(lang)}</div>`
}

const enHome = `<div class="view" data-v="en" lang="en">${hdr('en', 'home')}
<main id="main-home-en"><div class="wrap">
<div class="head"><h1><span lang="ko">${SITE}</span> <span class="h1sub">${SITE_SUB}</span></h1>
<div class="intro"><p id="intro-en">${INTRO_EN_SHORT}</p><details><summary aria-controls="intro-en"><span class="more">More</span><span class="less">Less</span></summary></details></div>
<p class="notice-en">${EN_NOTICE}</p></div>
<div class="sec"><h2>Latest posts</h2><p>207 posts · Page 1 of 18</p></div>
<ul class="feed">${CARDS_EN.map((c, i) => card(c, 200 + i, 'en')).join('')}</ul>
${pager('en', 1, 18)}
</div></main>${foot('en')}</div>`

const about = `<div class="view" data-v="about" lang="ko">${hdr('ko', 'about')}
<main id="main-about-ko"><div class="wrap"><div class="page">
<h1>소개</h1>
<div class="post-body about">
<p class="lead">${INTRO_KO}</p>
<h2>운영 방식</h2><ul><li>이 사이트는 <strong>익명으로 운영</strong>합니다. 운영자의 실명·소속·직함을 공개하지 않습니다.</li><li>정책 비판·정치인 발언·논평·안보 현안 등 정치·시사 이슈를 공개된 보도와 자료에서 골라 카드로 정리합니다.</li><li>열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다.</li></ul>
<h2>출처 정책</h2><ul><li>게시물은 <strong>공개된 출처에 근거해서만</strong> 올립니다. 근거로 삼는 것은 언론사 보도, 수사기관(검찰·경찰·국가정보원 등)의 공식 발표·보도자료, 공개된 법원 판결문입니다.</li><li>언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다.</li></ul>
<h2>정정·삭제 요청</h2><p>사실과 다른 내용, 원문 이미지 사용 중단, 게시물 삭제 요청은 아래로 알려주세요.</p>
<p class="pending">연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.</p>
<p class="fine">아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.</p>
<ul><li>접수 후 3영업일 이내에 1차 답변을 드립니다(법정 기한이 아닌 자체 기준입니다).</li></ul>
<p class="fine">(목업은 소개 페이지의 일부 절만 옮겼다. "인용·저작권" 절의 얼굴 사진 문장은 사진 정책 확정 뒤 기획자가 고친다.)</p>
</div></div></div></main>${foot('ko')}</div>`

// 이미지 상태 모음: 사진(공공누리) / 사진(언론) / 대체 카드 / 깨짐 → 대체 카드
const stateCard = (k, cap) => `<figure><div class="sc">${media(k)}</div><figcaption>${cap}</figcaption></figure>`
const states = `<div class="view" data-v="states" lang="ko">${hdr('ko', 'states')}
<main id="main-states-ko"><div class="wrap"><h1 class="st-h">이미지 상태 모음(목업 확인용)</h1>
<section class="states"><h2>카드 썸네일 — 카드에는 이미지만 둔다(정책 §2.1 A-3)</h2><div class="row">
${stateCard('photo', '① 공공누리 제1유형 사진(저장소 보관) — 카드에는 출처 글자 없음')}
${stateCard('photo', '② 언론 대표 이미지(핫링크) — 카드에는 출처 글자 없음')}
${stateCard('none', '③ 사진 없음 → 새 대체 카드(약 11건 예상)')}
${stateCard('none', '④ 핫링크 깨짐(4xx·시간 초과·0px) → 같은 대체 카드로 자동 전환')}
</div>
<h2>상세 이미지 캡션 — 이미지 바로 아래, 원 페이지 링크 포함</h2>
<div class="caps">
<figure class="fig">${media('photo', { big: true })}<figcaption><span class="cr">사진: 대통령실(공공누리 제1유형)</span> · <a href="#kogl-source">원문 페이지</a><span class="cr-full">본 저작물은 대통령실에서 2026년 작성하여 공공누리 제1유형으로 개방한 '(저작물명)'을 이용하였습니다.</span></figcaption></figure>
<figure class="fig">${media('photo', { big: true })}<figcaption><span class="cr">사진: 연합뉴스</span> · <a href="#article">기사 원문</a></figcaption></figure>
<figure class="fig">${media('none', { big: true })}<figcaption class="none-cap">대표 이미지가 없는 게시물은 캡션을 두지 않는다.</figcaption></figure>
</div></section>
</div></main>${foot('ko')}</div>`

const css = fs.readFileSync(path.join(HERE, 'final.css'), 'utf8')
const html = `<!doctype html>
<html lang="ko" data-view="all">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>보강안 final — v0.3 반응형 목업</title>
<style>${css}</style></head>
<body>${ICONS}
${home}
${post('ko')}
${post('en')}
${enHome}
${tag}
${about}
${states}
${banner}
<script>
(function(){
  var v=new URLSearchParams(location.search).get('view')||'all';
  document.documentElement.setAttribute('data-view',v);
  if(v==='en'||v==='post-en'){document.documentElement.lang='en'}
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    var st=b.closest('section').querySelector('[data-stat]');
    if(st){st.textContent=b.closest('[lang=en]')?'Link copied.':'링크가 복사되었습니다.';setTimeout(function(){st.textContent=''},2000)}
  })});
})();
</script>
</body></html>
`
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, html)
console.log('built', path.relative(process.cwd(), OUT), html.length)
