// 시안 B1·B2·B3 정적 목업 생성. 실행: node build.mjs  → design/v0.3-responsive/B{1,2,3}/mockup.html
// 외부 요청 없음(인라인 CSS·인라인 SVG만). 경로는 전부 상대경로.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DATA, T, FONT, I, esc, md, KO_POST, EN_POST, cardSet, dateKo, dateEn, fmtUpdated, numberedPager, monthEn } from './lib.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, '..', '..', '..', 'design', 'v0.3-responsive')

// ===== 공통 CSS (토큰은 tokens.md 와 같은 값) =====
const BASE_CSS = `
:root{color-scheme:light;--bg:#fff;--fg:#18181b;--muted:#52525b;--surface:#f4f4f5;--line:#e4e4e7;--line-strong:#8a8a94;--link:#1d4ed8;--ring:#1d4ed8;--r:10px;--fb-text:#3f3f46;--fb-icon:#71717a;--gutter:16px;
--font:${FONT};--bn-bg:#18181b;--bn-fg:#fff;--bn-sub:#d4d4d8;--pad-bottom:0px}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--font);line-height:1.65;font-size:16px;text-wrap:pretty}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:4px}
.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
.wrap{max-width:72rem;margin:0 auto;padding-inline:var(--gutter)}
@media(min-width:768px){:root{--gutter:24px}}
ul,ol{margin:0;padding:0;list-style:none}
h1,h2,h3,p{margin:0}
.mock-bar{background:#fafafa;border-bottom:1px solid var(--line);color:var(--muted);font-size:13px;padding:6px 16px}
.screen{position:relative;margin:0 auto 48px;padding-bottom:var(--pad-bottom)}
body[data-only] .mock-bar{display:none}
body[data-only] .screen{margin-bottom:0}
body[data-only="home"] .screen:not(#home),body[data-only="post"] .screen:not(#post),body[data-only="en"] .screen:not(#en),body[data-only="post-en"] .screen:not(#post-en){display:none}
.skip{position:absolute;left:8px;top:-60px;background:#fff;border:2px solid var(--ring);padding:10px 14px;z-index:99}
.skip:focus{top:8px}
.tap{display:inline-flex;align-items:center;min-height:44px;min-width:44px;justify-content:center}
/* 헤더 공통 */
.logo{font-weight:700;font-size:16px;letter-spacing:-.01em;display:inline-flex;align-items:center;min-height:44px}
.hnav{display:flex;align-items:center}
.hnav a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;min-width:44px;padding:0 10px;font-size:14px;color:var(--muted)}
.hnav a:hover{color:var(--fg)}
.hnav a[aria-current]{color:var(--fg);font-weight:600}
/* 칩·레일 */
.chip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 14px;border:1px solid var(--line-strong);border-radius:999px;font-size:14px;white-space:nowrap;background:var(--bg)}
.chip .n{font-size:13px;color:var(--muted)}
.chip-on{background:var(--fg);color:#fff;border-color:var(--fg)}
.chip-on .n{color:#fff}
.chip-more{border-style:dashed;font-weight:600}
.rail{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:var(--gutter);-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:2px var(--gutter) 2px;mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent);-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent)}
.rail::-webkit-scrollbar{display:none}
.rail>*{scroll-snap-align:start;flex:none}
.rail::after{content:"";flex:none;width:28px}
.rail:focus-visible{outline-offset:-2px}
.rail,.pager,.share,.tags,.hnav,.srclist,.same,.pn,.tchips,.enpanel,.menu,.fine,.box,.dl,.cbody,.prev{position:relative}
/* 소개 접기(U3=a) */
details.intro summary{list-style:none;display:flex;align-items:center;gap:8px;min-height:44px;cursor:pointer}
details.intro summary::-webkit-details-marker{display:none}
.intro-t{flex:1;min-width:0;font-size:14px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.intro-btn{flex:none;display:inline-flex;align-items:center;gap:2px;min-height:44px;padding:0 4px 0 8px;font-size:14px;font-weight:600;color:var(--link)}
.intro-btn .less{display:none}
details.intro[open] .intro-t{white-space:normal;overflow:visible;text-overflow:clip}
details.intro[open] summary{align-items:flex-start}
details.intro[open] .intro-btn .more{display:none}
details.intro[open] .intro-btn .less{display:inline}
details.intro[open] .intro-btn svg{transform:rotate(180deg)}
.notice{font-size:13px;color:var(--muted)}
@media(min-width:768px){.intro-t{white-space:normal;overflow:visible;font-size:16px;max-width:48rem}.intro-btn{display:none}details.intro summary{pointer-events:none;min-height:0}}
/* 피드 머리 */
.h-title{font-size:22px;line-height:1.3;font-weight:700;letter-spacing:-.01em}
.h-title .sub{display:block;font-size:14px;font-weight:500;color:var(--muted);letter-spacing:0}
@media(min-width:768px){.h-title{font-size:30px}.h-title .sub{display:inline;font-size:20px}}
.countrow{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.countrow h2{font-size:15px;font-weight:600}
.countrow p{font-size:13px;color:var(--muted)}
/* 카드 공통 */
.grid{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
.card{position:relative;display:flex;flex-direction:column;background:var(--bg);min-width:0}
.card a.ttl{color:var(--fg)}
.card a.ttl::after{content:"";position:absolute;inset:0}
.card:has(a.ttl:focus-visible){outline:2px solid var(--ring);outline-offset:2px}
.card a.ttl:focus-visible{outline:none}
.media{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--surface)}
.ph{width:100%;height:100%;background-repeat:no-repeat;background-position:center;background-size:34px}
.ph-a{background-color:#d4d4d8}.ph-b{background-color:#c4c4cc}.ph-c{background-color:#e4e4e7}
.ph{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='M21 15l-5-5L5 21'/%3E%3C/svg%3E")}
.mockmark{position:absolute;right:8px;top:6px;font-size:11px;color:#3f3f46;line-height:1}
.ttl-wrap{font-size:16px;line-height:1.45;font-weight:600;letter-spacing:-.005em;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-clamp:3;overflow:hidden;word-break:keep-all;overflow-wrap:anywhere}
.meta{display:flex;flex-wrap:wrap;align-items:center;gap:2px 8px;font-size:13px;color:var(--muted);line-height:1.4}
.meta .dot{color:var(--muted)}
.credit{font-size:12px;line-height:1.4;color:var(--muted)}
.korean-only{border:1px solid var(--line-strong);border-radius:4px;padding:1px 6px;font-size:12px;line-height:1.4;color:var(--fg)}
.fb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:100%;height:100%;background:var(--surface);color:var(--fb-text);text-align:center;padding:12px}
.fb svg{color:var(--fb-icon)}
.fb .fb-t{font-size:14px;line-height:1.3}
.fb .fb-s{font-size:13px;color:var(--muted);line-height:1.3}
/* 페이지 번호 */
.pager ul{display:flex;flex-wrap:wrap;justify-content:center;gap:4px}
.pg,.pg-gap{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;border:1px solid var(--line-strong);border-radius:8px;font-size:15px;background:var(--bg);color:var(--fg)}
.pg-gap{border-color:transparent;min-width:28px;color:var(--muted)}
.pg-cur{background:var(--fg);color:#fff;border-color:var(--fg);font-weight:700}
.pg-off{color:#6b6b74;border-color:var(--line);background:var(--surface)}
/* 배너(닫기 없음). lg 이상은 현행 세로 탭 유지 */
.bn{position:fixed;z-index:40;background:var(--bn-bg);color:var(--bn-fg);display:flex}
.bn a{display:flex;flex-direction:column;justify-content:center;gap:1px;min-height:48px;padding:6px 16px;width:100%;color:var(--bn-fg)}
.bn a:hover{background:#27272a}
.bn a:focus-visible{outline:2px solid #fff;outline-offset:-4px;border-radius:0}
.bn .t{font-size:14px;font-weight:600;line-height:1.3;display:flex;align-items:center;gap:4px}
.bn .s{font-size:12px;line-height:1.3;color:var(--bn-sub)}
@media(min-width:1024px){.bn{top:50%;right:0;bottom:auto!important;left:auto!important;width:48px;transform:translateY(-50%);border-radius:10px 0 0 10px}.bn a{writing-mode:vertical-rl;align-items:center;padding:16px 0;width:48px;min-height:0}.bn .t svg{display:none}}
/* 상세 */
.art{margin-inline:auto}
.crumb{font-size:13px;color:var(--muted);display:flex;align-items:center;flex-wrap:wrap}
.crumb a{display:inline-flex;align-items:center;justify-content:flex-start;min-height:44px;min-width:44px;color:var(--muted)}
.art h1{font-size:26px;line-height:1.35;font-weight:700;letter-spacing:-.015em;word-break:keep-all;overflow-wrap:anywhere}
@media(min-width:768px){.art h1{font-size:30px}}
.desc{font-size:16px;color:var(--muted);line-height:1.7}
.cta{display:flex;align-items:center;justify-content:center;gap:6px;min-height:48px;padding:0 20px;background:var(--fg);color:#fff;border-radius:8px;font-weight:600;font-size:16px}
.cta:hover{background:#27272a}
.cta:focus-visible{outline-offset:3px}
.dl{display:flex;flex-wrap:wrap;gap:2px 20px;font-size:13px;color:var(--muted);margin:0}
.dl div{display:flex;gap:6px}.dl dt{margin:0}.dl dd{margin:0}
.box{border:1px dashed var(--line-strong);border-radius:var(--r);padding:12px 14px;font-size:14px;color:var(--muted);line-height:1.6}
.box a,.lnk{color:var(--link);text-decoration:underline;text-underline-offset:3px}
.box a{display:flex;align-items:center;min-height:44px}
.share{display:flex;gap:8px}
.share button,.share a{flex:1;min-width:0;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:48px;padding:0 8px;border:1px solid var(--line-strong);border-radius:8px;background:var(--bg);color:var(--fg);font:inherit;font-size:14px;line-height:1.2;cursor:pointer}
.share-h{font-size:14px;font-weight:600;margin-bottom:8px}
.prev{border:1px solid var(--line-strong);border-radius:var(--r);overflow:hidden}
.prev .pbody{padding:12px 14px;display:grid;gap:6px;font-size:14px}
.prev .pnote{font-size:13px;color:var(--muted)}
.sec-h{font-size:15px;font-weight:600}
.post-body{font-size:17px;line-height:1.75}
.post-body>*+*{margin-top:1rem}
.post-body h2{margin-top:2.25rem;font-size:20px;line-height:1.4;font-weight:700;letter-spacing:-.01em}
.post-body ul{padding-left:1.25rem;list-style:disc}
.post-body li+li{margin-top:.4rem}
.post-body strong{font-weight:700}
.en .post-body{font-size:17px}
.srclist li{border-top:1px solid var(--line);padding:12px 0;display:grid;gap:2px}
.srclist li:first-child{border-top:0}
.srclist a{color:var(--link);text-decoration:underline;text-underline-offset:3px;font-size:15px;line-height:1.5;display:inline-block;padding:6px 0;min-height:44px}
.srclist .m{font-size:13px;color:var(--muted)}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.pn{display:grid;gap:8px}
.pn a{display:grid;gap:2px;border:1px solid var(--line-strong);border-radius:var(--r);padding:12px 14px;min-height:44px}
.pn .k{font-size:13px;color:var(--muted)}
.pn .v{font-size:15px;font-weight:600;line-height:1.45;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;word-break:keep-all}
.same{display:grid;gap:0}
.same a{display:block;padding:10px 0;border-top:1px solid var(--line);font-size:15px;line-height:1.5;min-height:44px}
.same a:first-child{border-top:0}
.fine{border-top:1px solid var(--line);padding-top:20px;font-size:13px;color:var(--muted);line-height:1.65}
.fine a{color:var(--link);text-decoration:underline;text-underline-offset:3px}
/* 푸터 */
.ftr{margin-top:48px;border-top:1px solid var(--line);background:var(--surface)}
.ftr .wrap{padding-block:24px;display:grid;gap:8px;font-size:14px;color:var(--muted)}
.ftr .nm{font-weight:600;color:var(--fg)}
.ftr ul{display:flex;flex-wrap:wrap;gap:0 20px}
.ftr li a{display:inline-flex;align-items:center;min-height:44px;min-width:44px;color:var(--link);text-decoration:underline;text-underline-offset:3px}
`

// ===== 공통 조각 =====
const arrowOut = I.out
function banner(extra = '') {
  return `<aside class="bn" aria-label="외부 링크 안내" ${extra}><a href="#banner-link" rel="nofollow noopener" aria-label="${T.ko.banner.title} — ${T.ko.banner.sub} (새 창에서 열림)"><span class="t">${T.ko.banner.title}${arrowOut}</span><span class="s">${T.ko.banner.sub}</span></a></aside>`
}
const mockImg = (tone) => `<div class="ph ${tone}" role="img" aria-label="(목업) 사진 자리표시 이미지"></div>`
function fallbackInner(v, c) {
  if (v === 'B1') return `<div class="fb">${I.img}<span class="fb-t">대표 이미지 없음</span></div>`
  if (v === 'B2') { const ch = (c.src || '출')[0]; return `<div class="fb"><span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;border:1.5px solid var(--fb-icon);font-size:22px;font-weight:700;color:var(--fb-text)">${esc(ch)}</span><span class="fb-t" style="font-weight:600">${esc(c.src)}</span><span class="fb-s">원문에서 확인</span></div>` }
  return `<div class="fb" style="border:1.5px dashed var(--fb-icon);margin:0;width:100%;height:100%"><span aria-hidden="true" style="font-size:26px;font-weight:700;color:var(--fg);letter-spacing:-.02em">#${esc(c.tag)}</span><span class="fb-s">${c.lang === 'en' ? 'No featured image' : '대표 이미지 없음'}</span></div>`
}

// 카드: 변주별 사진 출처(credit) 자리가 다르다
function card(v, c, locale, i) {
  const en = locale === 'en'
  const d = en ? dateEn(c.date) : dateKo(c.date)
  const upd = c.updated ? `<span class="dot" aria-hidden="true">·</span><span><time aria-hidden="true">${fmtUpdated(c.updated, locale)}</time><span class="sr-only">${en ? 'Recently updated' : '최근 갱신'}: ${en ? dateEn(c.updated) : dateKo(c.updated)}</span></span>` : ''
  const kor = c.koreanOnly ? `<span id="ko-only-${i}" class="korean-only" style="margin-left:auto">Korean only</span>` : ''
  const photo = c.kind === 'photo'
  const cr = photo ? (en ? `Photo: ${c.credit}` : `사진: ${c.credit}`) : ''
  c.lang = locale
  const tl = c.koreanOnly ? ' lang="ko"' : ''
  let media, after = '', metaCredit = ''
  const mm = `<span class="mockmark" aria-hidden="true">목업 자리표시</span>`
  if (v === 'B1') {
    media = `<div class="media">${photo ? mockImg(c.tone || 'ph-a') + `<span class="credit-chip">${cr}</span>` : fallbackInner(v, c)}</div>`
  } else if (v === 'B2') {
    media = `<div class="media">${photo ? mockImg(c.tone || 'ph-a') : fallbackInner(v, c)}</div>`
    if (photo) after = `<p class="credit cap">${cr}</p>`
  } else {
    media = `<div class="media">${photo ? mockImg(c.tone || 'ph-a') : fallbackInner(v, c)}</div>`
    if (photo) metaCredit = `<span class="credit">${cr}</span><span class="dot" aria-hidden="true">·</span>`
  }
  return `<article class="card"><div class="card-in">${media}${after}<div class="cbody"><h3 class="ttl-wrap"><a class="ttl" href="#post"${tl}${c.koreanOnly ? ` hreflang="ko" aria-describedby="ko-only-${i}"` : ''} title="${esc(c.title)}">${esc(c.title)}</a></h3><p class="meta">${metaCredit}<time>${d}</time>${upd}${kor}</p></div></div></article>`
}

function intro(locale, id) {
  const t = T[locale]
  const more = locale === 'ko' ? '더보기' : 'More', less = locale === 'ko' ? '접기' : 'Less'
  return `<details class="intro"><summary aria-label="${locale === 'ko' ? '소개 전문 펼치기·접기' : 'Expand or collapse the introduction'}"><span class="intro-t">${esc(t.lead)}</span><span class="intro-btn"><span class="more">${more}</span><span class="less">${less}</span>${I.down}</span></summary></details>`
}

function footer(locale) {
  const t = T[locale]
  const nm = locale === 'en' ? `<span lang="ko">${t.site}</span> ${t.sub}` : t.site
  return `<footer class="ftr"><div class="wrap"><p class="nm">${nm}</p><p>${t.footTagline}</p><p>${t.footPolicy}</p><ul><li><a href="#about">${t.footPolicyLink}</a></li><li><a href="#terms">${t.footTerms}</a></li></ul></div></footer>`
}

function shareBlock(locale) {
  const ko = locale === 'ko'
  return `<section aria-labelledby="share-h-${locale}"><h2 id="share-h-${locale}" class="share-h">${ko ? '공유' : 'Share'}</h2><div class="share"><button type="button">${I.link}<span>${ko ? '링크 복사' : 'Copy link'}</span></button><a href="#x">${I.x}<span>${ko ? 'X에 공유' : 'Share on X'}</span><span class="sr-only">${ko ? ' (새 창에서 열림)' : ' (opens in a new tab)'}</span></a><a href="#threads">${I.at}<span>${ko ? '스레드에 공유' : 'Share on Threads'}</span><span class="sr-only">${ko ? ' (새 창에서 열림)' : ' (opens in a new tab)'}</span></a></div><p role="status" class="sr-only"></p></section>`
}

// 상세(ko). 순서: 이동 경로 → 배지 → 제목 → 요약 → [원문 이동] → 메타 → 안내 → 공유 → 미리보기 → 본문 → 배경 보도 → 태그 → 같은 태그·이전/다음 → 정정 안내
function postKo(v) {
  const p = KO_POST
  const photoCredit = '사진: 대통령실'
  const previewMedia = v === 'B1' ? `<div class="media">${mockImg('ph-a')}<span class="credit-chip">${photoCredit}</span></div>` : `<div class="media">${mockImg('ph-a')}</div>`
  const previewCap = v === 'B1' ? '' : `<p class="credit cap" style="padding:6px 14px 0">${photoCredit}</p>`
  const same = DATA.posts.filter((x) => x.tags.includes('북한') && x.id !== '2026-11-08-politicscrush-daejinyeon-kimjongun-welcome-2019').slice(0, 3)
  const prevNext = DATA.posts
  return `<div class="wrap"><article class="art" lang="ko">
<nav class="crumb" aria-label="현재 위치"><a href="#home">홈</a><span aria-hidden="true">&nbsp;/&nbsp;</span><span>게시물</span></nav>
<header class="head-post">
<h1>${esc(p.title)}</h1>
<p class="desc">${esc(p.desc)}</p>
<a class="cta" href="#source" target="_blank" rel="noopener">원문 기사로 이동${I.out}<span class="sr-only"> (새 창에서 열림)</span></a>
<dl class="dl"><div><dt>게시</dt><dd><time>${dateKo(p.published)}</time></dd></div><div><dt>출처 표기</dt><dd>${esc(p.attribution)}</dd></div></dl>
<p class="box">공개된 보도·발표·자료를 정리한 글입니다. 아래 원문과 배경 보도에서 직접 확인할 수 있습니다. <a href="#about">출처·표기 원칙 보기</a></p>
<p style="font-size:14px"><a class="lnk tap" href="#en" lang="en" hreflang="en" style="justify-content:flex-start">Read in English</a></p>
</header>
${shareBlock('ko')}
<section aria-labelledby="pv-h" class="pvs"><h2 id="pv-h" class="sec-h">원문 미리보기</h2><div class="prev">${previewMedia}${previewCap}<div class="pbody"><p class="m" style="font-size:13px;color:var(--muted)">Instagram</p><p class="pnote">원문의 메타 정보(제목·요약·썸네일)만 인용하며 본문은 전재하지 않습니다. 위 제목·요약은 운영자가 고쳐 쓰지 않은 원문 그대로입니다.</p></div></div></section>
<section aria-label="본문"><div class="post-body">${md(p.body)}</div></section>
<section aria-labelledby="src-h"><h2 id="src-h" class="sec-h">배경 보도</h2><ul class="srclist">${p.sources.map((s) => `<li><a href="#bg" target="_blank" rel="noopener">${esc(s.name)}<span class="sr-only"> (새 창에서 열림)</span></a><span class="m">${s.type} · <time>${dateKo(s.date)}</time></span></li>`).join('')}</ul></section>
<section aria-labelledby="tg-h"><h2 id="tg-h" class="sec-h">태그</h2><ul class="tags">${p.tags.map((t) => `<li><a class="chip" href="#tag">#${t}</a></li>`).join('')}</ul></section>
<section aria-labelledby="more-h"><h2 id="more-h" class="sec-h">같은 태그 글 · #북한</h2><div class="same">${same.map((s) => `<a href="#post" title="${esc(s.title)}">${esc(s.title.length > 58 ? s.title.slice(0, 57) + '…' : s.title)}</a>`).join('')}<a href="#tag" class="lnk" style="min-height:44px;display:flex;align-items:center">#북한 글 40건 전체 보기 →</a></div></section>
<nav class="pn" aria-label="이전·다음 글"><a href="#post"><span class="k">${I.left.replace('width="18"', 'width="14"').replace('height="18"', 'height="14"')} 이전 글</span><span class="v">${esc(prevNext[3].title)}</span></a><a href="#post"><span class="k">다음 글 ${I.right.replace('width="18"', 'width="14"').replace('height="18"', 'height="14"')}</span><span class="v">${esc(prevNext[1].title)}</span></a></nav>
<p class="fine">사실과 다른 내용이 있으면 <a href="#about">정정·삭제 요청 절차</a>를 통해 알려주세요. 원문 확인: <a href="#source" target="_blank" rel="noopener">${esc(p.attribution)}<span class="sr-only"> (새 창에서 열림)</span></a></p>
</article></div>`
}
function postEn() {
  const p = EN_POST
  return `<div class="wrap"><article class="art en" lang="en">
<nav class="crumb" aria-label="Breadcrumb"><a href="#en">Home</a><span aria-hidden="true">&nbsp;/&nbsp;</span><span>Post</span></nav>
<header class="head-post">
<p class="desc" style="font-size:14px">Translated from the Korean original. <a class="lnk" href="#post" lang="ko" hreflang="ko" style="display:inline-flex;align-items:center;min-height:44px">한국어 원문 보기</a></p>
<h1>${esc(p.title)}</h1>
<p class="desc">${esc(p.desc)}</p>
<a class="cta" href="#source" target="_blank" rel="noopener">Open the original${I.out}<span class="sr-only"> (opens in a new tab)</span></a>
</header>
<section aria-label="Body"><div class="post-body">${p.paras.map((x) => `<p>${esc(x)}</p>`).join('')}</div></section>
</article></div>`
}

// ===== 변주별 구성 =====
const TOP = DATA.tags.slice(0, 14)
const chipsHtml = (activeAll = true) => `<a class="chip ${activeAll ? 'chip-on' : ''}" href="#home" ${activeAll ? 'aria-current="page"' : ''}>전체<span class="n sr-only">게시물 207건</span><span class="n" aria-hidden="true">207</span></a>` + TOP.map(([t, n]) => `<a class="chip" href="#tag-${t}">#${t}<span class="n" aria-hidden="true">${n}</span><span class="sr-only">게시물 ${n}건</span></a>`).join('') + `<a class="chip chip-more" href="#tags">전체 주제 ${DATA.tags.length}개 ${I.right.replace('width="18"', 'width="14"').replace('height="18"', 'height="14"')}</a>`
const monthChips = () => `<a class="chip chip-on" href="#en" aria-current="page">All<span class="n" aria-hidden="true">${DATA.enTotal}</span></a>` + DATA.months.map(([m, n]) => `<a class="chip" href="#m-${m}">${monthEn(m)}<span class="n" aria-hidden="true">${n}</span><span class="sr-only"> ${n} posts</span></a>`).join('')

const NAV_ARIA = 'aria-label="주제 목록(가로로 스크롤)" role="region" tabindex="0"'
const HDR = {
  // B1: 한 줄 압축 헤더. 영어도 한 줄.
  B1(locale, cur) {
    const t = T[locale]
    const logo = locale === 'en' ? `<a class="logo" href="#en" lang="ko">${t.site}</a>` : `<a class="logo" href="#home">${t.site}</a>`
    return `<header class="hdr"><div class="wrap hdr-in"><div>${logo}</div><nav class="hnav" aria-label="${locale === 'ko' ? '주요 메뉴' : 'Main menu'}"><a href="#${locale === 'ko' ? 'home' : 'en'}" ${cur === 'home' ? 'aria-current="page"' : ''}>${t.home}</a><a href="#about">${t.about}</a><a href="#${t.langTarget === 'en' ? 'en' : 'home'}" lang="${t.langTarget}" hreflang="${t.langTarget}" style="color:var(--link);font-weight:600">${t.lang}</a></nav></div></header>`
  },
  // B2: ko 2단(로고 줄은 스크롤하면 사라지고 내비 줄만 남는다) / en 한 줄 + Menu(details)
  B2(locale, cur) {
    const t = T[locale]
    if (locale === 'en') {
      return `<header class="hdr"><div class="wrap hdr-in"><a class="logo" href="#en" lang="ko">${t.site}</a><details class="menu"><summary class="tap" aria-label="Menu">${I.menu}<span style="margin-left:6px;font-size:14px">Menu</span></summary><div class="menu-p"><a href="#en">Home</a><a href="#about">About</a><a href="#home" lang="ko" hreflang="ko" style="color:var(--link);font-weight:600">한국어</a></div></details></div></header>`
    }
    return `<header class="hdr"><div class="wrap hdr-in"><a class="logo" href="#home">${t.site}</a><a class="tap" href="#en" lang="en" hreflang="en" style="padding:0 10px;font-size:14px;color:var(--link);font-weight:600">English</a></div><div class="navrow"><div class="wrap navrow-in"><nav class="hnav" aria-label="주요 메뉴"><a href="#home" ${cur === 'home' ? 'aria-current="page"' : ''}>홈</a><a href="#about">소개</a></nav><details class="topics"><summary class="tsum"><span>주제별로 보기</span><span class="n">${DATA.tags.length}</span>${I.down}</summary><div class="tpanel"><div class="wrap">${topicGroups()}</div></div></details></div></div></header>`
  },
  // B3: 상단 얇은 막대(로고+언어) + base 하단 탭 막대
  B3(locale, cur) {
    const t = T[locale]
    const home = locale === 'ko' ? '#home' : '#en'
    const logo = `<a class="logo" href="${home}"${locale === 'en' ? ' lang="ko"' : ''}>${t.site}</a>`
    const lg = `<a class="tap lang" href="#${t.langTarget === 'en' ? 'en' : 'home'}" lang="${t.langTarget}" hreflang="${t.langTarget}" style="padding:0 10px;font-size:14px;color:var(--link);font-weight:600">${t.lang}</a>`
    return `<header class="hdr"><div class="wrap hdr-in">${logo}<nav class="hnav top-nav" aria-label="${locale === 'ko' ? '주요 메뉴' : 'Main menu'}"><a href="${home}" ${cur === 'home' ? 'aria-current="page"' : ''}>${t.home}</a><a href="#about">${t.about}</a></nav>${lg}</div></header>`
  },
}
const B3_TABS = (locale) => locale === 'ko'
  ? `<nav class="tabs" aria-label="하단 메뉴"><a href="#home" aria-current="page">${I.house}<span>홈</span></a><a href="#topics-rail">${I.grid}<span>주제</span></a><a href="#about">${I.info}<span>소개</span></a></nav>`
  : `<nav class="tabs" aria-label="Bottom menu"><a href="#en" aria-current="page">${I.house}<span>Home</span></a><a href="#months-rail">${I.grid}<span>Months</span></a><a href="#about">${I.info}<span>About</span></a></nav>`

function topicGroups() {
  const g1 = DATA.tags.filter((x) => x[1] >= 10), g2 = DATA.tags.filter((x) => x[1] >= 3 && x[1] < 10), g3 = DATA.tags.filter((x) => x[1] < 3)
  const ch = (a, lim) => a.slice(0, lim).map(([t, n]) => `<a class="chip" href="#tag-${t}">#${t}<span class="n" aria-hidden="true">${n}</span><span class="sr-only">게시물 ${n}건</span></a>`).join('')
  return `<div class="tg"><h2>10건 이상 <span class="n">${g1.length}개</span></h2><div class="tchips">${ch(g1, 99)}</div></div>
<div class="tg"><h2>3~9건 <span class="n">${g2.length}개</span></h2><div class="tchips">${ch(g2, 8)}<a class="chip chip-more" href="#tags-mid">나머지 ${g2.length - 8}개 보기</a></div></div>
<div class="tg"><h2>1~2건 <span class="n">${g3.length}개</span></h2><div class="tchips"><a class="chip chip-more" href="#tags-low">${g3.length}개 보기 ${I.right.replace('width="18"', 'width="14"').replace('height="18"', 'height="14"')}</a></div></div>
<p class="tall"><a class="lnk tap" href="#tags" style="font-weight:600">전체 주제 ${DATA.tags.length}개 가나다순으로 보기 →</a></p>`
}
function sideB3(locale) {
  if (locale === 'en') {
    return `<aside class="side" aria-label="Browse by month"><h2>Browse by month</h2><ul>${DATA.months.map(([m, n]) => `<li><a href="#m-${m}">${monthEn(m)}<span class="n">${n}</span></a></li>`).join('')}</ul><p class="side-note">New route needed (implementation scope to be confirmed).</p></aside>`
  }
  const rows = DATA.tags.slice(0, 10)
  const g = [[13, '10건 이상'], [45, '3~9건'], [267, '1~2건']]
  return `<aside class="side" aria-label="주제"><h2>주제</h2><ul>${rows.map(([t, n]) => `<li><a href="#tag-${t}">#${t}<span class="n">${n}</span></a></li>`).join('')}</ul><h3>건수별</h3><ul>${g.map(([k, l]) => `<li><a href="#grp">${l}<span class="n">${k}개</span></a></li>`).join('')}<li><a class="side-all" href="#tags">전체 주제 ${DATA.tags.length}개 →</a></li></ul></aside>`
}

// 페이지 이동
const PAGER = {
  B1: (l) => `<div class="pgwrap">${numberedPager(1, 18, l)}<p class="pgc" aria-hidden="true">${T[l].pageOf(1, 18)}</p></div>`,
  B2: (l) => `<div class="pgwrap"><a class="more-btn" href="?page=2"><span>${l === 'ko' ? '다음 12건 보기' : 'Show the next 12'}</span><span class="s">${T[l].pageOf(2, 18)}</span><span class="sr-only">${l === 'ko' ? ' — 2페이지로 이동' : ' — go to page 2'}</span></a>${numberedPager(1, 18, l, 'compact')}</div>`,
  B3: (l) => `<nav class="pgsel" aria-label="${l === 'ko' ? '피드 페이지 이동' : 'Feed pages'}"><span class="pg pg-off" aria-disabled="true">${I.left}<span class="sr-only">${l === 'ko' ? '이전 페이지' : 'Previous page'}</span><span class="lbl" aria-hidden="true">${T[l].prev}</span></span><form class="pgform" action="#" method="get"><label for="pgsel-${l}" class="sr-only">${l === 'ko' ? '페이지 선택' : 'Choose page'}</label><select id="pgsel-${l}" name="page">${Array.from({ length: 18 }, (_, i) => `<option${i === 0 ? ' selected' : ''} value="${i + 1}">${T[l].pageOf(i + 1, 18)}</option>`).join('')}</select><button type="submit">${l === 'ko' ? '이동' : 'Go'}</button></form><a class="pg" href="?page=2"><span class="lbl">${T[l].next}</span>${I.right}<span class="sr-only">${l === 'ko' ? ' 페이지' : ' page'}</span></a></nav>`,
}

function head(v, locale) {
  const t = T[locale]
  if (locale === 'ko') {
    return `<div class="feedhead"><h1 class="h-title">${t.site}</h1>${intro('ko')}</div>`
  }
  return `<div class="feedhead"><h1 class="h-title"><span lang="ko">${t.site}</span> <span class="sub">${t.sub}</span></h1>${intro('en')}<p class="notice">${t.notice}</p></div>`
}
function navFor(v, locale) {
  if (v === 'B1' || v === 'B3') {
    if (locale === 'ko') return `<nav aria-label="주제" class="railnav" id="topics-rail"><div class="rail" ${NAV_ARIA}>${chipsHtml()}</div></nav>`
    return `<nav aria-label="Browse by month" class="railnav" id="months-rail"><div class="rail" tabindex="0" role="region" aria-label="Months (scroll horizontally)">${monthChips()}</div></nav>`
  }
  // B2: ko 는 헤더의 "주제별로 보기" 패널. en 은 월별 details
  if (locale === 'en') return `<details class="topics en-topics"><summary class="tsum" style="min-height:44px"><span>Browse by month</span>${I.down}</summary><div class="enpanel">${DATA.months.map(([m, n]) => `<a class="chip" href="#m-${m}">${monthEn(m)}<span class="n" aria-hidden="true">${n}</span></a>`).join('')}<span class="side-note" style="width:100%">New route needed (implementation scope to be confirmed).</span></div></details>`
  return ''
}

function feedScreen(v, locale) {
  const t = T[locale]
  const cards = cardSet(locale).map((c, i) => card(v, c, locale, i)).join('\n')
  const total = locale === 'ko' ? 207 : 207
  const side = v === 'B3' ? sideB3(locale) : ''
  const main = `<main id="main-${locale}" class="main">${head(v, locale)}${navFor(v, locale)}<div class="countrow"><h2>${t.latest}</h2><p>${t.count(total, 1, 18)}</p></div><div class="grid">${cards}</div>${PAGER[v](locale)}</main>`
  return layout(v, locale, 'home', main, side)
}
function postScreen(v, locale) {
  const side = v === 'B3' ? sideB3(locale) : ''
  const main = `<main id="main-p-${locale}" class="main">${locale === 'ko' ? postKo(v) : postEn()}</main>`
  return layout(v, locale, 'post', main, side)
}
function layout(v, locale, cur, main, side) {
  const id = locale === 'ko' ? (cur === 'home' ? 'home' : 'post') : (cur === 'home' ? 'en' : 'post-en')
  const label = { home: 'ko 홈 피드', post: 'ko 게시물 상세', en: 'en 홈 피드', 'post-en': 'en 게시물 상세 본문 발췌' }[id]
  const showBanner = locale === 'ko'
  const hdr = HDR[v](locale, cur)
  const stack = v === 'B2' && showBanner ? `<div class="stack">${hdr}${banner('data-pos="top"')}</div>` : hdr
  const bn = v === 'B2' ? '' : (showBanner ? banner() : '')
  const tabs = v === 'B3' ? B3_TABS(locale) : ''
  const body = side ? `<div class="wrap shell"><div class="shell-in">${side}<div class="shell-main">${main}</div></div></div>` : `<div class="wrap shell-1">${main}</div>`
  return `<section class="screen" id="${id}" lang="${locale}"><div class="mock-bar">${v} · ${label}${locale === 'en' && showBanner === false ? ' · 영어 페이지에는 배너 없음(현행 규칙)' : ''}</div><a class="skip" href="#main-${locale}">${locale === 'ko' ? '본문으로 건너뛰기' : 'Skip to main content'}</a>${stack}${bn}${body}${footer(locale)}${tabs}</section>`
}

// ===== 변주별 CSS =====
const COMMON_LAYOUT = `
.hdr{background:var(--bg);border-bottom:1px solid var(--line);z-index:30}
.hdr-in{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:56px}
.shell-1,.shell{padding-top:12px}
.main{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;align-content:start}
.feedhead{display:grid;grid-template-columns:minmax(0,1fr);gap:0}
.railnav{margin-inline:calc(var(--gutter)*-1)}
.cbody{display:grid;gap:6px;padding:10px 12px 12px;align-content:start;flex:1}
.card-in{display:flex;flex-direction:column;flex:1;min-width:0}
.pgwrap{display:grid;gap:10px;margin-top:8px}
.pgc{text-align:center;font-size:13px;color:var(--muted)}
.art{max-width:33rem;display:grid;gap:20px}
.head-post{display:grid;gap:14px}
.pvs{display:grid;gap:10px}
.side-note{font-size:13px;color:var(--muted)}
.tsum{display:flex;align-items:center;gap:6px;list-style:none;cursor:pointer;min-height:44px;font-size:14px;font-weight:600}
.tsum::-webkit-details-marker{display:none}
.tsum .n{font-size:13px;color:var(--muted);font-weight:400}
.tchips{display:flex;flex-wrap:wrap;gap:8px}
.tg h2{font-size:14px;font-weight:600;margin-bottom:6px}
.tg h2 .n{font-weight:400;color:var(--muted);font-size:13px;margin-left:6px}
.tg{padding:10px 0;border-top:1px solid var(--line)}
.tg:first-child{border-top:0}
.tall{padding:6px 0 12px}
.menu{position:relative}
.menu summary{list-style:none;cursor:pointer;padding:0 8px;border:1px solid var(--line-strong);border-radius:8px;font-size:14px}
.menu summary::-webkit-details-marker{display:none}
.menu-p{position:absolute;right:0;top:calc(100% + 6px);background:var(--bg);border:1px solid var(--line-strong);border-radius:10px;min-width:180px;display:grid;padding:4px;z-index:50}
.menu-p a{display:flex;align-items:center;min-height:44px;padding:0 12px;font-size:15px}
.enpanel{display:flex;flex-wrap:wrap;gap:8px;padding:6px 0 10px}
.en-topics{border-block:1px solid var(--line)}
.more-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:56px;border-radius:8px;background:var(--fg);color:#fff;font-weight:600;font-size:16px;line-height:1.3;padding:8px 16px}
.more-btn .s{font-size:13px;font-weight:400;color:#e4e4e7}
.more-btn:focus-visible{outline-offset:3px}
.credit-chip{position:absolute;left:8px;bottom:8px;max-width:calc(100% - 16px);background:#18181b;color:#fff;font-size:12px;line-height:1.4;padding:2px 8px;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pgsel{display:flex;align-items:center;justify-content:space-between;gap:8px}
.pgsel .pg{padding:0 12px;gap:4px}
.pgform{display:flex;gap:6px;flex:1;justify-content:center;min-width:0}
.pgform select{min-height:44px;border:1px solid var(--line-strong);border-radius:8px;background:var(--bg);font:inherit;font-size:15px;padding:0 8px;color:var(--fg);min-width:0;flex:1;max-width:11rem}
.pgform button{min-height:44px;padding:0 14px;border:1px solid var(--line-strong);border-radius:8px;background:var(--bg);font:inherit;font-size:15px;color:var(--fg)}
.pgsel .lbl{font-size:14px}
`
const CSS = {
  B1: `
.hdr{position:sticky;top:0}
:root{--pad-bottom:60px}
.card{border:1px solid var(--line-strong);border-radius:var(--r);overflow:hidden}
.card:hover{background:#fafafa}
.bn{left:0;right:0;bottom:0;padding-bottom:env(safe-area-inset-bottom)}
@media(min-width:768px){.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.cbody{padding:12px 14px 14px}.pgwrap{margin-top:16px}}
@media(min-width:1024px){:root{--pad-bottom:0px}.grid{grid-template-columns:repeat(3,minmax(0,1fr))}.shell-1,.shell{padding-right:calc(var(--gutter) + 40px)}}
@media(min-width:1280px){.shell-1,.shell{padding-right:var(--gutter)}}
@media(min-width:768px){.feedhead{gap:6px}.main{gap:20px}}
.pg{min-width:44px}
`,
  B2: `
:root{--surface:#f4f4f5;--bg:#fff}
body{background:var(--surface)}
.mock-bar{background:#fff}
.stack{position:sticky;top:-56px;z-index:30;background:var(--bg)}
.stack .hdr{position:relative}
@media(max-width:1023px){.stack .bn{position:static;display:flex;width:100%}.stack .bn a{min-height:48px;padding:6px 16px}}
.hdr{position:relative}
.screen>.hdr{position:sticky;top:0}
.hdr{border-bottom:0}
.navrow{border-top:1px solid var(--line);position:relative}
.navrow-in{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:48px}
.hnav{margin-left:-10px}
.topics{position:static}
.navrow details.topics>summary{border:1px solid var(--line-strong);border-radius:999px;padding:0 12px;background:var(--bg);min-height:44px}
.tpanel{position:absolute;left:0;right:0;top:100%;background:var(--bg);border-bottom:1px solid var(--line-strong);max-height:calc(100vh - 150px);overflow:auto;z-index:35}
.tpanel .wrap{padding-block:8px}
.stack{border-bottom:1px solid var(--line)}
.main{background:transparent}
.card{background:var(--bg);border-radius:12px;overflow:hidden}
.card .fb{background:#e4e4e7}
.card:hover .ttl{text-decoration:underline;text-underline-offset:3px}
.cbody{padding:12px 14px 14px}
.cap{padding:8px 14px 0}
.pg,.chip{background:var(--bg)}
.pgwrap{margin-top:8px}
.art{background:var(--bg);padding:20px 16px;border-radius:12px;max-width:37rem;margin-inline:auto}
@media(min-width:768px){.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.art{padding:28px 32px}}
@media(min-width:1024px){.grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.shell-1{padding-right:calc(var(--gutter) + 40px)}}
@media(min-width:1280px){.shell-1{padding-right:var(--gutter)}}
.screen[lang=en]>.hdr{border-bottom:1px solid var(--line)}
.hdr .wrap.hdr-in{min-height:56px}
.stack .hdr>.hdr-in{min-height:56px}
.en-topics{background:transparent}
`,
  B3: `
:root{--pad-bottom:110px}
.hdr{position:sticky;top:0}
.hdr-in{min-height:52px}
.top-nav{display:none;margin-right:auto;margin-left:12px}
.tabs{position:fixed;left:0;right:0;bottom:0;z-index:45;background:var(--bg);border-top:1px solid var(--line-strong);display:grid;grid-template-columns:repeat(3,1fr);padding-bottom:env(safe-area-inset-bottom)}
.tabs a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:56px;font-size:13px;color:var(--muted)}
.tabs a[aria-current]{color:var(--fg);font-weight:700;box-shadow:inset 0 3px 0 var(--link)}
.bn{left:0;right:0;bottom:calc(56px + env(safe-area-inset-bottom))}
.card{border-bottom:1px solid var(--line-strong);padding-bottom:12px}
.card .media{border-radius:var(--r);outline:1px solid var(--line)}
.cbody{padding:10px 0 0}
.meta{font-size:13px}
.side{display:none}
@media(min-width:768px){:root{--pad-bottom:56px}.tabs{display:none}.bn{bottom:0}.bn a{min-height:48px}.top-nav{display:flex}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}}
@media(min-width:1024px){:root{--pad-bottom:0px}
.shell-in{display:grid;grid-template-columns:224px minmax(0,1fr);gap:32px;align-items:start}
.shell{padding-right:calc(var(--gutter) + 40px)}
.side{display:block;position:sticky;top:76px;max-height:calc(100vh - 92px);overflow:auto;border-right:1px solid var(--line);padding-right:16px}
.side h2{font-size:14px;font-weight:600;padding:4px 0 6px}
.side h3{font-size:13px;font-weight:600;color:var(--muted);padding:14px 0 4px}
.side li a{display:flex;align-items:center;justify-content:space-between;min-height:44px;font-size:15px;padding:0 4px}
.side li a:hover{background:var(--surface)}
.side .n{font-size:13px;color:var(--muted)}
.side-all{color:var(--link);font-weight:600}
.railnav{display:none}
.grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.shell-main .art{margin-inline:0}}
@media(min-width:1280px){.shell{padding-right:var(--gutter)}.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.pgsel{margin-top:8px}
`,
}

function html(v) {
  const css = BASE_CSS + COMMON_LAYOUT + CSS[v]
  const screens = [feedScreen(v, 'ko'), postScreen(v, 'ko'), feedScreen(v, 'en'), postScreen(v, 'en')]
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${v} 시안 — v0.3 반응형 목업</title>
<style>${css}</style>
</head>
<body>
${screens.join('\n')}
</body>
</html>
`
}
for (const v of ['B1', 'B2', 'B3']) {
  fs.writeFileSync(path.join(OUT, v, 'mockup.html'), html(v))
  console.log(v, fs.statSync(path.join(OUT, v, 'mockup.html')).size)
}
