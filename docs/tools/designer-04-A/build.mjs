// 시안 A1·A2·A3 정적 목업 생성기. 실행: node docs/tools/designer-04-A/build.mjs (저장소 루트에서)
// 출력: design/v0.3-responsive/A{1,2,3}/mockup.html (인라인 CSS·JS 하나, 외부 요청 없음)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as C from './content.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const VARIANTS = {
  A1: { id: 'A1', card: 'left', share: 'end', bannerMode: 'strip', fs: 17, lh: 1.75, parGap: '1.1em', measureKo: '36em', measureEn: '33em', h2: 20, label: '가로형(썸네일 왼쪽) · 공유 본문 끝 · 17px/1.75 · 배너 하단 전폭 띠' },
  A2: { id: 'A2', card: 'right', share: 'top', bannerMode: 'pill', fs: 18, lh: 1.8, parGap: '1.1em', measureKo: '34em', measureEn: '34em', h2: 21, label: '가로형(썸네일 오른쪽·날짜 위) · 공유 제목 아래+본문 끝 · 18px/1.8 · 배너 우하단 소형 한 줄' },
  A3: { id: 'A3', card: 'mixed', share: 'bar', bannerMode: 'top', fs: 16, lh: 1.75, parGap: '1.5em', measureKo: '36em', measureEn: '36em', h2: 19, label: 'base 가로형 + md 이상 세로형 · 공유 하단 고정 막대 · 16px/1.75+넓은 문단 간격 · 배너 헤더 아래 한 줄' },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function css(v) {
  const mode = v.bannerMode
  return `
:root{
  --bg:#ffffff;--fg:#18181b;--muted:#52525b;--surface:#f4f4f5;--line:#e4e4e7;--line-strong:#82828a;
  --accent:#1d4ed8;--ring:#1d4ed8;--ph:#d4d4d8;--ph-shape:#e4e4e7;--banner-bg:#18181b;--banner-fg:#ffffff;--banner-sub:#d4d4d8;
  --font:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Pretendard','Malgun Gothic','Noto Sans KR','Helvetica Neue',Arial,sans-serif;
  --gutter:16px;--hdr:56px;--thumb:104px;
  --body-fs:${v.fs}px;--body-lh:${v.lh};--par-gap:${v.parGap};--measure-em:${parseFloat(v.measureKo)};--measure:calc(var(--measure-em) * var(--body-fs));--h2:${v.h2}px;
  --banner-h:${mode === 'strip' ? '56px' : mode === 'pill' ? '44px' : '44px'};
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-padding-top:calc(var(--hdr) + 16px)}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--font);font-size:16px;line-height:1.65;text-wrap:pretty}
a{color:inherit}
:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:4px}
.sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:8px;top:-60px;background:var(--fg);color:#fff;padding:10px 14px;z-index:60;border-radius:6px}
.skip:focus{top:8px}
.wrap{width:100%;max-width:1152px;margin:0 auto;padding-inline:var(--gutter)}
/* 보기 전환(목업 전용): ?view=home|post|post-en|en|states, 없으면 전부 세로로 */
.view{display:none}
html[data-view="all"] .view,html[data-view="home"] .view[data-v="home"],html[data-view="post"] .view[data-v="post"],html[data-view="post-en"] .view[data-v="post-en"],html[data-view="en"] .view[data-v="en"],html[data-view="states"] .view[data-v="states"]{display:block}
.vlabel{display:none;background:#fef3c7;color:#18181b;font-size:13px;padding:8px var(--gutter);border-block:1px solid #d4a72c;margin-top:24px}
html[data-view="all"] .vlabel{display:block}
html[data-view="en"] .banner,html[data-view="post-en"] .banner{display:none}
/* 헤더 */
.hdr{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);border-bottom:1px solid var(--line)}
.hdr .wrap{display:flex;align-items:center;justify-content:space-between;gap:4px;height:var(--hdr)}
.logo{display:inline-flex;align-items:center;min-height:44px;font-weight:700;font-size:16px;letter-spacing:-.01em;text-decoration:none;white-space:nowrap}
.logo .sub{display:none;font-size:14px;font-weight:500;color:var(--muted);margin-left:8px}
.nav{display:flex;align-items:center;gap:0}
.nav a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;min-width:44px;padding:0 10px;font-size:14px;color:var(--muted);text-decoration:none;white-space:nowrap}
.nav a:hover{color:var(--fg);text-decoration:underline}
.nav .lang{margin-left:2px;border-left:1px solid var(--line);padding-left:12px}
/* 머리 영역 */
.head{padding:16px 0 4px}
.head h1{margin:0;font-size:22px;line-height:28px;font-weight:700;letter-spacing:-.015em}
.head h1 .sub{display:block;font-size:14px;line-height:20px;font-weight:500;color:var(--muted);letter-spacing:0}
.intro{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:8px;margin-top:4px;min-height:44px}
.intro p{margin:0;font-size:15px;line-height:1.5;color:var(--muted);display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden}
.intro details{justify-self:end}
.intro summary{list-style:none;cursor:pointer;display:inline-flex;align-items:center;min-height:44px;padding:0 4px 0 8px;font-size:14px;color:var(--accent);font-weight:600;white-space:nowrap}
.intro summary::-webkit-details-marker{display:none}
.intro summary .less{display:none}
.intro details[open] summary .more{display:none}
.intro details[open] summary .less{display:inline}
.intro:has(details[open]){grid-template-columns:minmax(0,1fr)}
.intro:has(details[open]) p{-webkit-line-clamp:unset;display:block}
.intro:has(details[open]) details{justify-self:start}
.notice-en{margin:0 0 4px;font-size:14px;line-height:1.45;color:var(--muted)}
.rail-wrap{position:relative;margin-inline:calc(var(--gutter) * -1);overflow:hidden}
.rail{display:flex;gap:0;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:var(--gutter);padding-inline:var(--gutter);scrollbar-width:none;-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 32px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 32px),transparent)}
.rail::-webkit-scrollbar{display:none}
.chip{display:inline-flex;align-items:center;min-height:44px;padding-right:8px;text-decoration:none;white-space:nowrap;scroll-snap-align:start;font-size:14px}
.chip>span{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 13px;border:1px solid var(--line-strong);border-radius:18px;background:var(--bg)}
.chip em{font-style:normal;color:var(--muted)}
.chip.all>span{border-style:dashed;font-weight:600}
.sec{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:8px 0 8px;margin-top:4px}
.sec h2{margin:0;font-size:15px;font-weight:700}
.sec p{margin:0;font-size:13px;color:var(--muted)}
/* 피드 카드 */
.feed{list-style:none;margin:0;padding:0;border-top:1px solid var(--line);display:grid;grid-template-columns:minmax(0,1fr)}
.card{position:relative;display:grid;grid-template-columns:var(--thumb) minmax(0,1fr);gap:12px;padding:12px 0;border-bottom:1px solid var(--line);align-items:start}
.card .thumb{width:100%;grid-column:1;grid-row:1}
.card .txt{grid-column:2;grid-row:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.card h3{margin:0;font-size:15px;line-height:1.38;font-weight:600;letter-spacing:-.01em;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
.card h3 a{text-decoration:none}
.card h3 a::after{content:'';position:absolute;inset:0}
.card:hover{background:var(--surface)}
.card:has(a:focus-visible){outline:2px solid var(--ring);outline-offset:2px}
.card h3 a:focus-visible{outline:none}
.meta{font-size:13px;line-height:1.35;color:var(--muted);display:flex;flex-wrap:wrap;gap:0 6px}
.tagk{border:1px solid var(--line-strong);border-radius:4px;padding:0 6px;font-size:12px;line-height:18px;color:var(--fg);white-space:nowrap}
.card.right{grid-template-columns:minmax(0,1fr) var(--thumb)}
.card.right .thumb{grid-column:2}
.card.right .txt{grid-column:1}
.card.right .txt h3{order:2}
.card.right .txt .meta{order:1}
/* 이미지 슬롯: 사진(자리표시) / 대체 카드 */
.thumb{position:relative;aspect-ratio:16/9;border-radius:6px;overflow:hidden;container-type:inline-size;display:block}
.thumb.photo{background:var(--ph) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90' preserveAspectRatio='xMidYMid slice'%3E%3Ccircle cx='118' cy='28' r='11' fill='%23e4e4e7'/%3E%3Cpath d='M0 90V62l34-24 30 22 28-18 68 36v12z' fill='%23e4e4e7'/%3E%3C/svg%3E") center/cover no-repeat}
.thumb.none{background:var(--surface);border:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:var(--muted)}
.thumb.none svg{width:28px;height:28px;stroke:#71717a;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.thumb.none span{display:none;font-size:13px;line-height:1.3}
@container (min-width:230px){.thumb.none span{display:block}.thumb.none svg{width:36px;height:36px}}
/* 페이지 이동 */
.pager{display:flex;flex-direction:column;align-items:stretch;gap:8px;padding:20px 0 8px}
.pager a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none}
.pager .next{background:var(--accent);color:#fff}
.pager .prev{color:var(--accent);border:1px solid var(--line-strong)}
.pager p{margin:0;text-align:center;font-size:14px;color:var(--muted)}
/* 푸터 */
.foot{margin-top:40px;border-top:1px solid var(--line);background:var(--surface);padding:24px 0 24px}
.foot p{margin:0 0 8px;font-size:14px;line-height:1.6;color:var(--muted)}
.foot p.name{color:var(--fg);font-weight:600;font-size:15px}
.foot ul{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column}
.foot a{display:flex;align-items:center;min-height:44px;color:var(--accent);font-size:14px;text-underline-offset:3px}
/* 상세 */
.crumb{display:flex;align-items:center;font-size:14px;color:var(--muted);padding-top:4px}
.crumb a{display:inline-flex;align-items:center;min-height:44px;min-width:44px;color:var(--accent);text-underline-offset:3px}
.crumb span[aria-hidden]{margin:0 6px}
.post-grid{display:block}
.article{padding-top:2px}
.article h1{margin:4px 0 12px;font-size:23px;line-height:1.34;font-weight:700;letter-spacing:-.02em;text-wrap:balance}
.desc{margin:0 0 14px;font-size:16px;line-height:1.7;color:var(--muted)}
.dl{margin:0 0 16px;display:grid;gap:2px;font-size:14px;line-height:1.55;color:var(--muted)}
.dl div{display:flex;gap:8px;flex-wrap:wrap}
.dl dt{min-width:4.2em}
.dl dd{margin:0;color:var(--fg)}
.cta{display:flex;align-items:center;justify-content:center;gap:8px;min-height:52px;border-radius:8px;background:var(--accent);color:#fff;font-weight:700;font-size:16px;text-decoration:none;width:100%}
.cta svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.lang-alt{display:inline-flex;align-items:center;min-height:44px;font-size:14px;color:var(--accent);text-underline-offset:3px}
.postnote{margin:16px 0;border:1px dashed var(--line-strong);border-radius:8px;padding:12px 14px;font-size:14px;line-height:1.6;color:var(--muted)}
.postnote a{display:flex;align-items:center;min-height:44px;color:var(--accent);text-underline-offset:3px}
.fig{margin:20px 0 0}
.fig .thumb{border-radius:8px}
.fig figcaption{margin-top:6px;font-size:13px;line-height:1.5;color:var(--muted)}
.post-body{margin-top:24px;font-size:var(--body-fs);line-height:var(--body-lh);max-width:var(--measure)}
.post-body p{margin:0 0 var(--par-gap)}
.post-body h2{margin:1.9em 0 .6em;font-size:var(--h2);line-height:1.4;font-weight:700;letter-spacing:-.015em}
.post-body ul{margin:0 0 var(--par-gap);padding-left:1.15em}
.post-body li{margin:0 0 .55em}
.preview{margin-top:24px;border:1px solid var(--line-strong);border-radius:8px;padding:14px;font-size:14px;line-height:1.6;color:var(--muted)}
.preview h2{margin:0 0 6px;font-size:15px;color:var(--fg)}
.preview p{margin:0 0 4px}
.side>section{margin-top:28px}
.sources{border:1px solid var(--line);border-radius:8px;background:var(--surface);padding:16px}
.sources h2,.share h2,.tags h2{margin:0 0 8px;font-size:16px;font-weight:700}
.sources ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.sources li{font-size:15px;line-height:1.55}
.sources .k{display:inline-block;border:1px solid var(--line-strong);border-radius:4px;padding:0 6px;font-size:12px;line-height:18px;margin-right:6px;color:var(--fg)}
.sources a{display:block;padding:9px 0;min-height:44px;color:var(--accent);text-underline-offset:3px}
.sources time{display:block;font-size:13px;color:var(--muted)}
.sources li{display:block}
.sharegrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:44px;padding:0 8px;border:1px solid var(--line-strong);border-radius:8px;background:var(--bg);color:var(--fg);font:inherit;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;line-height:1.2;text-align:center}
.btn svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.sharestat{min-height:22px;margin:6px 0 0;font-size:13px;color:var(--muted)}
.share-top{margin:0 0 16px}
.share-top .sharegrid{max-width:420px}
.tags ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap}
.correct{margin-top:32px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;line-height:1.7;color:var(--muted)}
.correct a{color:var(--accent);text-underline-offset:3px}
.share-bar{display:none}
/* 이미지 상태 모음 */
.states{display:grid;gap:24px;padding:16px 0}
.states h2{margin:0 0 8px;font-size:15px}
.states .row{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.states figure{margin:0}
.states figcaption{margin-top:6px;font-size:13px;color:var(--muted);line-height:1.5}
/* 배너(닫기 없음) */
.banner{position:fixed;z-index:40;background:var(--banner-bg);color:var(--banner-fg)}
.banner a{display:flex;text-decoration:none;color:inherit}
.banner a:focus-visible{outline:2px solid #fff;outline-offset:-4px}
.banner .t{font-size:14px;font-weight:700;line-height:1.3}
.banner .s{font-size:12px;line-height:1.3;color:var(--banner-sub)}
.banner svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.2;vertical-align:-2px;margin-left:4px}
/* lg(1024~): 우측 세로 탭(현행 유지, 폭 3rem) */
@media (min-width:1024px){
  .banner{right:0;top:50%;transform:translateY(-50%);width:3rem;border-radius:8px 0 0 8px}
  .banner a{width:3rem;writing-mode:vertical-rl;flex-direction:row;align-items:center;gap:10px;padding:18px 0;height:auto}
  .banner .s{font-size:12px}
}
${bannerCss(v)}
${v.share === 'bar' ? barCss() : ''}
/* 확장: md(768~) 태블릿 세로 */
@media (min-width:768px){
  :root{--gutter:32px;--thumb:136px}
  .head{padding-top:24px}
  .head h1{font-size:26px;line-height:32px}
  .intro p{font-size:16px;-webkit-line-clamp:unset;display:block;max-width:44em}
  .intro details{display:none}
  .intro{min-height:0;margin-top:8px}
  .rail{flex-wrap:nowrap}
  .feed{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:32px}
  .card h3{font-size:16px}
  .nav a{font-size:15px;padding:0 12px}
  .logo .sub{display:inline}
  .pager{flex-direction:row;justify-content:center;align-items:center}
  .pager a{min-width:200px}
  .pager p{order:2;padding:0 8px}
  .foot ul{flex-direction:row;gap:24px}
  .article h1{font-size:28px}
  .post-grid{max-width:calc(var(--measure) + 0px);margin-inline:auto}
  .post-grid .main,.post-grid .side{max-width:var(--measure)}
  .cta{width:auto;min-width:280px;padding:0 24px}
  .sharegrid{max-width:480px}
  .sources{padding:20px}
  ${v.card === 'mixed' ? mixedCss() : ''}
}
/* lg(1024~) 태블릿 가로·소형 노트북 — 배너는 세로 탭 */
@media (min-width:1024px){
  :root{--gutter:40px;--thumb:160px}
  .feed{column-gap:40px}
  .card{gap:16px;padding:16px 0}
  .card h3{font-size:17px}
  .post-grid{display:grid;grid-template-columns:minmax(0,var(--measure)) minmax(0,16rem);column-gap:48px;max-width:none;justify-content:center;align-items:start}
  .post-grid .main,.post-grid .side{max-width:none}
  .side{position:sticky;top:calc(var(--hdr) + 24px)}
  .side>section:first-child{margin-top:0}
  .post-body{margin-top:24px}
  .sharegrid{grid-template-columns:1fr}
  .cta{width:100%;min-width:0}
  ${v.card === 'mixed' ? '.feed{grid-template-columns:repeat(3,minmax(0,1fr));column-gap:28px}' : ''}
}
/* 1024~1231: 오른쪽 세로 배너 탭(3rem) 때문에 본문을 3.5rem 안쪽으로 */
@media (min-width:1024px) and (max-width:1231px){
  .view>.hdr~main,.view>.foot .wrap{padding-right:calc(var(--gutter) + 40px)}
}
/* xl(1280~) 데스크톱 */
@media (min-width:1280px){
  :root{--gutter:48px;--thumb:192px}
  .head h1{font-size:28px;line-height:36px}
  .card h3{font-size:18px}
  .post-grid{column-gap:64px;grid-template-columns:minmax(0,var(--measure)) minmax(0,18rem)}
  ${v.card === 'mixed' ? mixedXl() : ''}
}
html .en-post{--measure-em:${parseFloat(v.measureEn)};--measure:calc(var(--measure-em) * var(--body-fs))}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
`
}

function bannerCss(v) {
  if (v.bannerMode === 'strip')
    return `
@media (max-width:1023px){
  .banner{left:0;right:0;bottom:0;height:56px;padding-bottom:env(safe-area-inset-bottom);box-shadow:0 -1px 0 rgba(0,0,0,.2)}
  .banner a{height:56px;flex-direction:column;justify-content:center;align-items:center;padding:0 16px}
  .foot{padding-bottom:calc(24px + 56px + env(safe-area-inset-bottom))}
  html{scroll-padding-bottom:72px}
}`
  if (v.bannerMode === 'pill')
    return `
@media (max-width:1023px){
  .banner{right:calc(12px + env(safe-area-inset-right));bottom:calc(12px + env(safe-area-inset-bottom));max-width:calc(100vw - 24px);border-radius:22px;box-shadow:0 1px 6px rgba(0,0,0,.3)}
  .banner a{height:44px;align-items:center;padding:0 16px;gap:2px}
  .banner .s{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0)}
  .banner .t{font-size:13px;white-space:nowrap}
  .foot{padding-bottom:calc(24px + 68px + env(safe-area-inset-bottom))}
  html{scroll-padding-bottom:80px}
}`
  return `
@media (max-width:1023px){
  .banner{position:sticky;top:var(--hdr);z-index:25}
  .banner a{height:44px;flex-direction:column;justify-content:center;align-items:center;padding:0 16px}
  .banner .t{font-size:13px}
  .banner .s{font-size:12px}
  .banner.hide{transform:translateY(-110%)}
  .banner{transition:transform .2s}
}`
}
function barCss() {
  return `
@media (max-width:1023px){
  .share-bar{display:block;position:fixed;left:0;right:0;bottom:0;z-index:35;background:var(--bg);border-top:1px solid var(--line-strong);padding:8px var(--gutter) calc(8px + env(safe-area-inset-bottom))}
  .share-bar .sharegrid{max-width:520px;margin:0 auto}
  .share-bar .sharestat{margin:4px 0 0;text-align:center;min-height:0}
  html[data-view="all"] .share-bar,html[data-view="post"] .share-bar,html[data-view="post-en"] .share-bar{display:block}
  html:not([data-view="all"]):not([data-view="post"]):not([data-view="post-en"]) .share-bar{display:none}
  .view .share-aside{display:none}
  .view .foot{padding-bottom:calc(24px + 68px)}
}
@media (min-width:1024px){.share-bar{display:none!important}}`
}
// A3: md 이상은 세로형 카드. base 가로형은 그대로.
function mixedCss() {
  return `
  .card{grid-template-columns:minmax(0,1fr);gap:10px;padding:0 0 16px;border-bottom:0}
  .feed{border-top:0;row-gap:24px}
  .card .thumb{grid-column:1;grid-row:1}
  .card .txt{grid-column:1;grid-row:2}
  .card h3{font-size:17px;line-height:1.4;min-height:calc(1.4em * 3)}
  .card:hover{background:transparent}
  .card .thumb.none{border:1px solid var(--line)}
`
}
function mixedXl() {
  return `
  .feed{grid-template-columns:repeat(3,minmax(0,1fr));column-gap:32px;row-gap:32px}
  .card h3{font-size:18px}
`
}
// lg는 3열(A3)
function mixedLg() { return '' }

const ICON = {
  noimg: `<symbol id="i-noimg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8M3 3l18 18"/></symbol>`,
  ext: `<symbol id="i-ext" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></symbol>`,
  link: `<symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></symbol>`,
  chev: `<symbol id="i-chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></symbol>`,
  chevl: `<symbol id="i-chevl" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></symbol>`,
}
const use = (id, cls = '') => `<svg aria-hidden="true" class="${cls}"><use href="#i-${id}"/></svg>`

function thumb(card, lang) {
  if (card.k === 'photo')
    return `<span class="thumb photo" role="img" aria-label="${lang === 'en' ? 'Photo placeholder (mockup)' : '사진 자리표시(목업)'}"></span>`
  return `<span class="thumb none" role="img" aria-label="${lang === 'en' ? 'No image' : '대표 이미지가 없어 대체 표시된 영역'}">${use('noimg')}<span>${lang === 'en' ? 'No image' : '이미지 없음'}</span></span>`
}
function cardHtml(card, v, i, lang = 'ko') {
  const cls = v.card === 'right' ? 'card right' : 'card'
  const date = lang === 'ko' ? card.d.replace('-', '/') : card.d
  const full = lang === 'ko' ? `2026-${card.d}` : `2026`
  const credit = card.k === 'photo' ? (lang === 'ko' ? `사진: ${card.c}` : `Photo: ${card.c}`) : ''
  const up = card.up ? `<span aria-hidden="true">·</span><span><span aria-hidden="true">${card.up.replace('-', '/')} 갱신</span><span class="sr">최근 갱신: 2026년 ${Number(card.up.slice(0, 2))}월 ${Number(card.up.slice(3))}일</span></span>` : ''
  const ko = card.ko ? ' lang="ko" hreflang="ko"' : ''
  const koTag = card.ko ? `<span class="tagk" id="ko-${i}">Korean only</span>` : ''
  const sep = (s) => (s ? `<span aria-hidden="true">·</span><span>${s}</span>` : '')
  return `<li class="${cls}">${thumb(card, lang)}<div class="txt"><h3><a href="#post"${ko} title="${escAttr(card.t)}"${card.ko ? ` aria-describedby="ko-${i}"` : ''}>${esc(card.t)}</a></h3><div class="meta"><time datetime="2026-${card.d.length === 5 ? card.d : ''}">${date}</time>${sep(credit)}${up}${koTag}</div></div></li>`.replace('datetime="2026-"', 'datetime="2026"')
}

function header(lang, v) {
  const en = lang === 'en'
  return `<header class="hdr"><div class="wrap">
<a class="logo" href="#home"><span lang="ko">${C.SITE}</span>${en ? `<span class="sub">${C.SITE_SUB}</span>` : ''}</a>
<div class="nav"><nav aria-label="${en ? 'Main menu' : '주요 메뉴'}" style="display:flex"><a href="#home">${en ? 'Home' : '홈'}</a><a href="#about">${en ? 'About' : '소개'}</a></nav><nav aria-label="${en ? 'Language' : '언어 선택'}" style="display:flex">${en ? `<a class="lang" lang="ko" hreflang="ko" href="#home">한국어</a>` : `<a class="lang" lang="en" hreflang="en" href="#en">English</a>`}</nav></div>
</div></header>`
}
function banner() {
  return `<aside class="banner" aria-label="외부 링크 안내"><a href="#campaign" target="_blank" rel="noopener nofollow" aria-label="${C.BANNER.title} — ${C.BANNER.sub} (새 창에서 열림)"><span class="t">${C.BANNER.title}${use('ext')}</span><span class="s">${C.BANNER.sub}</span></a></aside>`
}
function footer(lang) {
  const f = lang === 'en' ? C.FOOT_EN : C.FOOT_KO
  return `<footer class="foot"><div class="wrap">
<p class="name">${lang === 'en' ? `<span lang="ko">${C.SITE}</span> ${C.SITE_SUB}` : C.SITE}</p>
<p>${f.tag}</p><p>${f.policy}</p>
<ul><li><a href="#about">${f.link}</a></li><li><a href="#terms">${f.terms}</a></li></ul></div></footer>`
}
function sectionHead(lang, total) {
  return lang === 'ko'
    ? `<div class="sec"><h2>최신 게시물</h2><p>전체 ${total}건 · 1 / 18 페이지</p></div>`
    : `<div class="sec"><h2>Latest posts</h2><p>${total} posts · Page 1 of 18</p></div>`
}
function pager(lang) {
  return lang === 'ko'
    ? `<nav class="pager" aria-label="피드 페이지 이동"><a class="next" href="#p2">다음 페이지<span class="sr"> — 2페이지로 이동</span>${use('chev')}</a><p aria-current="page">1 / 18 페이지</p></nav>`
    : `<nav class="pager" aria-label="Feed pages"><a class="next" href="#p2">Next page<span class="sr"> — go to page 2</span>${use('chev')}</a><p aria-current="page">Page 1 of 18</p></nav>`
}
function introBlock(lang) {
  const more = lang === 'ko' ? ['더보기', '접기'] : ['More', 'Less']
  return `<div class="intro"><p>${lang === 'ko' ? C.INTRO_KO : C.INTRO_EN}</p><details><summary><span class="more">${more[0]}</span><span class="less">${more[1]}</span></summary></details></div>`
}

function homeView(v) {
  const rail = C.TAGS.map(([t, n], i) => `<a class="chip" href="#tag"><span>#${t} <em aria-hidden="true">${n}</em><span class="sr">게시물 ${n}건</span></span></a>`).join('') +
    `<a class="chip all" href="#tags"><span>전체 태그 보기 (${C.TAG_TOTAL}개) <span aria-hidden="true">→</span></span></a>`
  return `<div class="view" data-v="home" lang="ko">
<div class="vlabel">화면 1 · 홈 피드 (ko)</div>
${header('ko', v)}
<main id="main" class="wrap">
<div class="head"><h1>${C.SITE}</h1>${introBlock('ko')}
<nav class="rail-wrap" aria-label="태그"><div class="rail" tabindex="-1">${rail}</div></nav></div>
${sectionHead('ko', 207)}
<ul class="feed">${C.CARDS.map((c, i) => cardHtml(c, v, i)).join('')}</ul>
${pager('ko')}
</main>
${footer('ko')}
</div>`
}

function shareBlock(v, lang, id) {
  const en = lang === 'en'
  const l = en ? ['Copy link', 'Share on X', 'Share on Threads', 'Share'] : ['링크 복사', 'X에 공유', '스레드에 공유', '공유']
  return `<div class="sharegrid"><button type="button" class="btn" data-copy>${use('link')}<span>${l[0]}</span></button><a class="btn" href="#x" target="_blank" rel="noopener"><span>${l[1]}</span><span class="sr"> ${en ? '(opens in a new tab)' : '(새 창에서 열림)'}</span></a><a class="btn" href="#threads" target="_blank" rel="noopener"><span>${l[2]}</span><span class="sr"> ${en ? '(opens in a new tab)' : '(새 창에서 열림)'}</span></a></div>
<p class="sharestat" role="status" data-stat></p>`
}

function postView(v, lang) {
  const en = lang === 'en'
  const P = en ? C.POST_EN : C.POST_KO
  const L = en
    ? { crumb: 'Breadcrumb', home: 'Home', post: 'Post', pub: 'Published', tr: 'Translated', attr: 'Source', go: 'Open the original', notice: 'This post summarizes published reports, announcements and records. You can check them yourself in the original and the background reports below.', noticeLink: 'About this site', prev: 'Original post preview', prevNote: 'Only the metadata of the original (title, summary, thumbnail) is quoted; the body is not republished.', src: 'Background reports', srcK: 'Sources are in Korean.', tags: 'Tags', share: 'Share', cb: 'If anything here is inaccurate, please let us know through the ', cl: 'correction and removal request process', ca: '. ', sc: 'Check the original: ', trn: 'Translated from the Korean original.', alt: 'Read the Korean original' }
    : { crumb: '현재 위치', home: '홈', post: '게시물', pub: '게시', tr: '', attr: '출처 표기', go: '원문 기사로 이동', notice: '공개된 보도·발표·자료를 정리한 글입니다. 아래 원문과 배경 보도에서 직접 확인할 수 있습니다.', noticeLink: '출처·표기 원칙 보기', prev: '원문 미리보기', prevNote: '원문의 메타 정보(제목·요약·썸네일)만 인용하며 본문은 전재하지 않습니다.', src: '배경 보도', srcK: '', tags: '태그', share: '공유', cb: '사실과 다른 내용이 있으면 ', cl: '정정·삭제 요청 절차', ca: '를 통해 알려주세요. ', sc: '원문 확인: ', alt: 'Read in English' }
  const body = P.lead ? `<p>${P.lead}</p>` + P.sections.map((s) => `<h2>${s.h}</h2><ul>${s.ul.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('') : ''
  const sources = P.sources.map(([k, name, d]) => `<li><span class="k">${en ? 'News' : k}</span><a href="#src" target="_blank" rel="noopener" lang="ko">${esc(name)}<span class="sr">${en ? ' (opens in a new tab)' : ' (새 창에서 열림)'}</span></a><time>${d}</time></li>`).join('')
  const tags = en ? '' : `<section class="tags" aria-labelledby="tg-${lang}"><h2 id="tg-${lang}">${L.tags}</h2><ul>${P.tags.map((t) => `<li><a class="chip" href="#tag"><span>#${t}</span></a></li>`).join('')}</ul></section>`
  const shareTop = v.share === 'top' ? `<div class="share-top" role="group" aria-label="${L.share}">${shareBlock(v, lang)}</div>` : ''
  const shareEnd = v.share === 'bar' ? `<section class="share share-aside" aria-labelledby="sh-${lang}"><h2 id="sh-${lang}" class="sr">${L.share}</h2>${shareBlock(v, lang)}</section>`
    : `<section class="share" aria-labelledby="sh-${lang}"><h2 id="sh-${lang}">${L.share}</h2>${shareBlock(v, lang)}</section>`
  const bar = v.share === 'bar' ? `<div class="share-bar" role="group" aria-label="${L.share}">${shareBlock(v, lang)}</div>` : ''
  const dl = `<dl class="dl"><div><dt>${L.pub}</dt><dd><time>${P.date}</time></dd></div>${en ? `<div><dt>${L.tr}</dt><dd><time>${P.tr}</time></dd></div>` : ''}<div><dt>${L.attr}</dt><dd lang="ko">${P.attr}</dd></div></dl>`
  const alt = `<a class="lang-alt" href="#alt" lang="${en ? 'ko' : 'en'}" hreflang="${en ? 'ko' : 'en'}">${L.alt}</a>`
  const trn = en ? `<p class="desc" style="margin-bottom:0;font-size:14px">${L.trn} ${alt}</p>` : ''
  return `<div class="view ${en ? 'en-post' : ''}" data-v="${en ? 'post-en' : 'post'}" lang="${lang}">
<div class="vlabel">화면 ${en ? 5 : 2} · 게시물 상세 (${lang})</div>
${header(lang, v)}
<main id="main" class="wrap"><article class="article">
<div class="post-grid"><div class="main">
<nav class="crumb" aria-label="${L.crumb}"><a href="#home">${L.home}</a><span aria-hidden="true">/</span><span>${L.post}</span></nav>
${trn}
<h1${en ? '' : ''}>${esc(P.title)}</h1>
${shareTop}
<p class="desc">${esc(P.desc)}</p>
${dl}
<a class="cta" href="#source" target="_blank" rel="noopener"><span>${L.go}</span>${use('ext')}<span class="sr">${en ? ' (opens in a new tab)' : ' (새 창에서 열림)'}</span></a>
${en ? '' : `<div>${alt}</div>`}
<p class="postnote">${L.notice}<a href="#about">${L.noticeLink}</a></p>
<figure class="fig"><span class="thumb photo" role="img" aria-label="${en ? 'Photo placeholder (mockup)' : '사진 자리표시(목업)'}"></span><figcaption>${P.credit}</figcaption></figure>
<div class="post-body">${body}</div>
<section class="preview" aria-labelledby="pv-${lang}"><h2 id="pv-${lang}">${L.prev}</h2><p>${P.site || 'Instagram'}</p><p>${L.prevNote}</p></section>
</div>
<div class="side">
<section class="sources" aria-labelledby="sr-${lang}"><h2 id="sr-${lang}">${L.src}</h2>${L.srcK ? `<p style="margin:0 0 8px;font-size:13px;color:var(--muted)">${L.srcK}</p>` : ''}<ul>${sources}</ul></section>
${shareEnd}
${tags}
</div></div>
<p class="correct">${L.cb}<a href="#about">${L.cl}</a>${L.ca}${L.sc}<a href="#source" lang="ko">${P.attr}</a></p>
</article></main>
${footer(lang)}
${bar}
</div>`
}

function enView(v) {
  return `<div class="view" data-v="en" lang="en">
<div class="vlabel">화면 3 · 영어 피드 머리 + 카드 4장</div>
${header('en', v)}
<main id="main" class="wrap">
<div class="head"><h1><span lang="ko">${C.SITE}</span><span class="sub">${C.SITE_SUB}</span></h1>${introBlock('en')}<p class="notice-en">${C.EN_NOTICE}</p></div>
${sectionHead('en', 207)}
<ul class="feed">${C.CARDS_EN.map((c, i) => cardHtml(c, v, i, 'en')).join('')}</ul>
${pager('en')}
</main>
${footer('en')}
</div>`
}

function statesView(v) {
  const g = (k, c) => `<span class="thumb ${k}" role="img" aria-label="${k === 'photo' ? '사진 자리표시(목업)' : '대표 이미지가 없어 대체 표시된 영역'}">${k === 'none' ? `${use('noimg')}<span>이미지 없음</span>` : ''}</span>`
  return `<div class="view" data-v="states" lang="ko">
<div class="vlabel">화면 4 · 이미지 상태 모음 (사진+출처 표시 / 대체 카드)</div>
${header('ko', v)}
<main id="main" class="wrap"><div class="states">
<section><h2>사진 카드 — 출처 표시 위치</h2><div class="row">
<figure>${g('photo')}<figcaption>사진: 대통령실 · 공공누리 (1순위: 공공 이미지)</figcaption></figure>
<figure>${g('photo')}<figcaption>사진: 조선일보 (2순위: 언론 기사 대표 이미지)</figcaption></figure></div>
<p style="margin:8px 0 0;font-size:14px;color:var(--muted)">피드 카드에서는 날짜 줄에 "사진: 출처"를 붙이고, 상세에서는 사진 바로 아래 캡션 줄에 씁니다.</p></section>
<section><h2>대체 카드 — 사진이 없거나 깨질 때</h2><div class="row">
<figure>${g('none')}<figcaption>상세·큰 카드(16:9): 아이콘 + "이미지 없음"</figcaption></figure>
<figure style="max-width:104px">${g('none')}<figcaption>피드 썸네일(104px): 아이콘만</figcaption></figure></div>
<p style="margin:8px 0 0;font-size:14px;color:var(--muted)">회색 면 + 붉은 줄 없음. 연한 면 + 가는 테두리 + 선 아이콘. 같은 16:9 슬롯을 차지해 레이아웃이 움직이지 않습니다.</p></section>
</div></main>
${footer('ko')}
</div>`
}

const SCRIPT = `
(function(){
  var q=new URLSearchParams(location.search).get('view')||'all';
  document.documentElement.setAttribute('data-view',q);
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    var s=b.closest('section,div[role=group]');var st=(s&&s.querySelector('[data-stat]'))||b.parentNode.nextElementSibling;
    if(st){st.textContent=document.documentElement.lang==='en'?'Link copied.':'링크가 복사되었습니다.';setTimeout(function(){st.textContent=''},2000)}
  })});
  var ban=document.querySelector('.banner.hide-on-scroll');
  if(ban){var y=window.scrollY;window.addEventListener('scroll',function(){var n=window.scrollY;if(n>y+8&&n>120)ban.classList.add('hide');else if(n<y-8||n<120)ban.classList.remove('hide');y=n},{passive:true})}
})();`

for (const v of Object.values(VARIANTS)) {
  const bannerHtml = banner().replace('class="banner"', v.bannerMode === 'top' ? 'class="banner hide-on-scroll"' : 'class="banner"')
  // 배너가 헤더 아래 한 줄인 A3는 문서 흐름 안(sticky)에 둔다 — 각 view의 헤더 바로 뒤.
  const addBannerAfterHeader = (html) => (v.bannerMode === 'top' ? html.replace(/<\/header>/g, `</header>\n${bannerHtml}`) : html)
  const views = [homeView(v), postView(v, 'ko'), enView(v), postView(v, 'en'), statesView(v)].map(addBannerAfterHeader).join('\n')
  const html = `<!doctype html>
<html lang="ko" data-view="all">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>공산당이싫어요 v0.3 시안 ${v.id} (읽기 중심)</title>
<style>${css(v)}</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.values(ICON).join('')}</defs></svg>
<a class="skip" href="#main">본문으로 건너뛰기</a>
<!-- ${v.id}: ${v.label} · 정적 목업(구현 지시 아님). 보도사진 없음(회색 자리표시). -->
${views}
${v.bannerMode === 'top' ? '' : bannerHtml}
<script>${SCRIPT}</script>
</body>
</html>
`
  fs.writeFileSync(path.join(root, 'design/v0.3-responsive', v.id, 'mockup.html'), html)
  console.log('wrote', v.id, html.length)
}
