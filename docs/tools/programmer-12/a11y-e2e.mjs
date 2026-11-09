/**
 * 프로그래머 12 — `docs/tools/programmer-11-1/a11y-e2e.mjs` 사본. 바꾼 것: 화면 저장 위치(programmer-12/screens), 3절에 확인 2종 추가.
 *   추가: 약관 ko/en — h1 바로 다음 요소가 `p.text-xs`이고 그 안 `<time datetime="2026-11-09">` 텍스트 = 같은 날짜("최종 개정:"/"Last updated:" 접두) ·
 *         소개 ko/en — 준비 중 상자 바로 다음 요소가 `p.text-xs` 처리 기준 문장(#3·#4). 새 문장 대비는 기존 "본문 글자 대비 4.5 미만 0" 항목이 함께 잰다.
 * (이하 11-1 설명 그대로)
 * 프로그래머 11-1 — 원본 `docs/tools/programmer-11/a11y-e2e.mjs`에 리뷰 26 P2-3 확인 2종을 더한 사본(나머지 항목·기준 동일, 화면은 programmer-11-1/screens).
 *   추가: X href — 예산 안 제목(ko alaska)은 `text` = 페이지 h1 제목 그대로 · 예산 초과 제목(en alaska, 리뷰 25 목록 24건 중 1)은 `text` 파라미터 없음·쿼리 키 `url` 하나.
 * 프로그래머 11 — 공유 버튼·카드 갱신 표시·소개/약관·푸터 접근성·동작 실측(헤드리스 Chrome + CDP, 추가 의존성 없음).
 * 사용(저장소 루트, 로컬 프로덕션 서버 실행 중): node docs/tools/programmer-12/a11y-e2e.mjs <baseUrl>
 * 확인 항목:
 *  1. 상세 ko/en(링크형·사진형 각 1): 공유 section 위치(header 다음), AX 이름 = 보이는 텍스트(aria-label 없음), 새 창 안내(sr-only),
 *     높이 44px, 375px에서 버튼 글자 넘침 없음·가로 스크롤 없음, Tab 순서·:focus-visible 외곽선(2px, --ring),
 *     실제 마우스 클릭으로 복사 → 클립보드 값 = 그 페이지 절대 URL, role=status 문구, 버튼 이름 "복사됨" → 2초 뒤 복귀,
 *     클립보드 API 없음 → "복사 실패" 문구, GA dataLayer `share` 이벤트(method·content_type·item_id[·language]),
 *     X·스레드 href 엔드포인트·url 파라미터.
 *  2. 피드(갱신 카드가 있는 /?page=4, /en?page=4): 갱신 표시가 Badge 아님(테두리·배경 없음), 보이는 축약은 aria-hidden,
 *     sr-only 전체 날짜가 AX 트리에서 읽힘, 대비.
 *  3. /about·/en/about·/terms·/en/terms: example.invalid 0, 준비 중 상자, about→terms·terms→about 링크, 푸터 약관 링크, 대비.
 * ⚠️ GA 이벤트 확인은 측정 ID가 있는 빌드에서만 가능하다(없으면 trackEvent가 no-op) — 더미 ID로 빌드한 서버에 돌린다:
 *    NEXT_PUBLIC_GA_ID=G-TEST000000 npm run build && npx next start -p 3011  (gtag 원격 스크립트는 cdp.mjs가 차단, dataLayer만 본다)
 * 대비는 계산된 색(getComputedStyle)과 실제 배경(투명이면 조상)을 WCAG 상대휘도로 계산한다. 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const base = process.argv[2]
if (!base) {
  console.error('사용: node a11y-e2e.mjs <baseUrl>')
  process.exit(2)
}
const SHOTS = 'docs/tools/programmer-12/screens'
fs.mkdirSync(SHOTS, { recursive: true })

let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

// 페이지 안에서 쓰는 대비 계산기
const CONTRAST_JS = `
window.__lum = (rgb) => { const [r,g,b] = rgb.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4}); return 0.2126*r+0.7152*g+0.0722*b }
window.__bg = (el) => { for (let e=el; e; e=e.parentElement) { const c=getComputedStyle(e).backgroundColor; const a=c.match(/[\\d.]+/g); if (a && (a.length<4 || Number(a[3])>0)) return c } return 'rgb(255,255,255)' }
window.__ratio = (el) => { const L1=__lum(getComputedStyle(el).color), L2=__lum(__bg(el)); return Math.round(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))*100)/100 }
`

async function axNodes(client) {
  const { nodes } = await client.send('Accessibility.getFullAXTree')
  return nodes
}
function axByRole(nodes, role) {
  return nodes.filter((n) => !n.ignored && n.role?.value === role).map((n) => ({ name: n.name?.value ?? '', id: n.backendDOMNodeId }))
}

async function shot(client, name) {
  const { data } = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  fs.writeFileSync(`${SHOTS}/${name}.png`, Buffer.from(data, 'base64'))
}

async function clickCenter(client, selector) {
  const box = await client.evaluate(`(() => { const e=document.querySelector(${JSON.stringify(selector)}); e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2, y:r.y+r.height/2} })()`)
  for (const type of ['mousePressed', 'mouseReleased']) {
    await client.send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 })
  }
}

const DETAILS = [
  // xText: X href에 text가 있어야 하는가(share-check 기준 — en alaska는 가중치 350 > 280이라 url만)
  { locale: 'ko', path: '/post/2026-10-02-alaska-lng-vs-dmz-mine-response', kind: 'url', xText: true },
  { locale: 'en', path: '/en/post/2026-10-02-alaska-lng-vs-dmz-mine-response', kind: 'url', xText: false },
]

await withChrome(9341, async (client) => {
  await client.send('Accessibility.enable')
  await client.send('Browser.grantPermissions', {
    origin: new URL(base).origin,
    permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
  })

  // 사진형 상세 하나 찾기(한국어·영어 둘 다 있는 것)
  const photoId = fs
    .readdirSync('content/posts-en')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .find((id) => /sourceType:\s*photo/.test(fs.readFileSync(`content/posts/${id}.md`, 'utf-8')))
  if (photoId) {
    DETAILS.push({ locale: 'ko', path: `/post/${photoId}`, kind: 'photo' })
    DETAILS.push({ locale: 'en', path: `/en/post/${photoId}`, kind: 'photo' })
  }

  for (const vp of [
    { name: 'mobile', w: 375, h: 812, mobile: true },
    { name: 'desktop', w: 1280, h: 900, mobile: false },
  ]) {
    await client.setViewport(vp.w, vp.h, vp.mobile)
    for (const d of DETAILS) {
      const label = `[${vp.name}] ${d.path}`
      const ko = d.locale === 'ko'
      const T = ko
        ? { copy: '링크 복사', copied: '복사됨', failed: '복사 실패', x: 'X에 공유', th: '스레드에 공유', ok: '링크가 복사되었습니다.', ng: '복사에 실패했습니다. 주소창에서 직접 복사해 주세요.', nt: '(새 창에서 열림)' }
        : { copy: 'Copy link', copied: 'Copied', failed: 'Copy failed', x: 'Share on X', th: 'Share on Threads', ok: 'Link copied.', ng: 'Copy failed. Please copy the address manually.', nt: '(opens in a new tab)' }
      await client.navigate(`${base}${d.path}`)
      await client.evaluate(CONTRAST_JS)
      const info = await client.evaluate(`(() => {
        const s = document.querySelector('section[aria-labelledby="share-heading"]')
        if (!s) return null
        const ctrls = [...s.querySelectorAll('button, a')]
        return {
          prev: s.previousElementSibling?.tagName, heading: document.getElementById('share-heading')?.textContent,
          ctrls: ctrls.map((e) => ({ tag: e.tagName, aria: e.getAttribute('aria-label'), h: e.getBoundingClientRect().height,
            overflow: e.scrollWidth > e.clientWidth + 1 || [...e.querySelectorAll('span')].some((sp) => sp.getBoundingClientRect().right > e.getBoundingClientRect().right + 0.5),
            ratio: __ratio(e), href: e.getAttribute('href'), target: e.getAttribute('target'), rel: e.getAttribute('rel') })),
          status: (() => { const st = s.querySelector('[role=status]'); return st && { live: st.getAttribute('aria-live'), text: st.textContent } })(),
          hscroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          // 공유 URL은 canonical과 같은 값(NEXT_PUBLIC_SITE_URL이 있으면 그 절대 URL, 없으면 location.origin)이어야 한다
          expectedUrl: document.querySelector('link[rel=canonical]')?.href ?? location.origin + location.pathname,
          h1: document.querySelector('h1')?.textContent?.trim() ?? null,
        }
      })()`)
      check(`${label} 공유 section 존재`, info !== null)
      if (!info) continue
      check(`${label} 위치 = header 바로 뒤`, info.prev === 'HEADER', info.prev)
      check(`${label} 버튼 3개(button 1·a 2)`, info.ctrls.length === 3 && info.ctrls[0].tag === 'BUTTON' && info.ctrls[1].tag === 'A' && info.ctrls[2].tag === 'A')
      check(`${label} aria-label 없음(P3-1)`, info.ctrls.every((c) => c.aria === null))
      check(`${label} 높이 44px`, info.ctrls.every((c) => Math.round(c.h) === 44), info.ctrls.map((c) => c.h).join(','))
      check(`${label} 버튼 글자 넘침 없음`, info.ctrls.every((c) => !c.overflow))
      check(`${label} 페이지 가로 스크롤 없음`, !info.hscroll)
      check(`${label} 버튼 글자 대비 ≥ 4.5`, info.ctrls.every((c) => c.ratio >= 4.5), info.ctrls.map((c) => c.ratio).join(','))
      check(`${label} status aria-live=polite·초기 빈 값`, info.status?.live === 'polite' && info.status.text === '')
      const xu = new URL(info.ctrls[1].href)
      const tu = new URL(info.ctrls[2].href)
      check(`${label} X 엔드포인트·url`, `${xu.origin}${xu.pathname}` === 'https://x.com/intent/tweet' && xu.searchParams.get('url') === info.expectedUrl, xu.searchParams.get('url'))
      if (d.xText === false) {
        check(`${label} X href에 text 없음(P2-3 url만)`, !xu.searchParams.has('text') && [...xu.searchParams.keys()].join(',') === 'url', xu.search)
      } else if (d.xText === true) {
        check(`${label} X href text = 제목 그대로(P2-3)`, xu.searchParams.get('text') === info.h1 && !!info.h1, xu.searchParams.get('text'))
      }
      check(`${label} 스레드 엔드포인트·url`, `${tu.origin}${tu.pathname}` === 'https://www.threads.com/intent/post' && tu.searchParams.get('url') === info.expectedUrl)
      check(`${label} 새 창 링크 rel=noopener`, info.ctrls.slice(1).every((c) => c.target === '_blank' && c.rel === 'noopener'))

      // AX 이름
      let ax = await axNodes(client)
      const buttons = axByRole(ax, 'button').map((b) => b.name)
      const links = axByRole(ax, 'link').map((l) => l.name)
      check(`${label} AX 버튼 이름 = "${T.copy}"`, buttons.includes(T.copy), buttons.join(' | '))
      check(`${label} AX 링크 이름 X(새 창 안내 포함)`, links.some((n) => n.startsWith(T.x) && n.includes(T.nt)), links.find((n) => n.startsWith(T.x)))
      check(`${label} AX 링크 이름 스레드(새 창 안내 포함)`, links.some((n) => n.startsWith(T.th) && n.includes(T.nt)))

      if (vp.name === 'mobile') {
        // Tab 순서: 공유 3개가 연속으로 오고, 포커스 외곽선 2px solid
        // 시작점: 상세 header(공유 section 바로 앞)의 마지막 링크에 포커스 → Tab 3회가 공유 3개를 차례로 거쳐야 한다
        await client.evaluate(`[...document.querySelector('section[aria-labelledby="share-heading"]').previousElementSibling.querySelectorAll('a')].at(-1).focus()`)
        const seq = []
        for (let i = 0; i < 3; i += 1) {
          await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
          await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
          await delay(50)
          seq.push(await client.evaluate(`(() => { const e=document.activeElement; const cs=getComputedStyle(e); return { text: e.textContent, inShare: !!e.closest('section[aria-labelledby="share-heading"]'), fv: e.matches(':focus-visible'), ow: cs.outlineWidth, os: cs.outlineStyle, oc: cs.outlineColor } })()`))
        }
        check(`${label} Tab 3회 = 공유 3개 순서`, seq.every((s) => s.inShare) && seq[0].text.includes(T.copy) && seq[1].text.startsWith(T.x) && seq[2].text.startsWith(T.th), seq.map((s) => s.text).join(' → '))
        check(`${label} :focus-visible 외곽선 2px solid`, seq.every((s) => s.fv && s.ow === '2px' && s.os === 'solid'), seq.map((s) => `${s.ow} ${s.os} ${s.oc}`).join(' / '))
        const ringRatio = await client.evaluate(`(() => { const c=getComputedStyle(document.activeElement).outlineColor; const L1=__lum(c), L2=__lum('rgb(255,255,255)'); return Math.round(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))*100)/100 })()`)
        check(`${label} 포커스 외곽선 대비 ≥ 3`, ringRatio >= 3, String(ringRatio))
        await client.evaluate(`document.activeElement.blur()`)
        await shot(client, `${d.locale}-${d.kind}-detail-${vp.name}`)

        // 복사 성공(실제 마우스 클릭)
        await client.evaluate(`window.dataLayer = window.dataLayer || []; window.__dlStart = window.dataLayer.length`)
        await clickCenter(client, 'section[aria-labelledby="share-heading"] button')
        await delay(300)
        const after = await client.evaluate(`(async () => {
          const s = document.querySelector('section[aria-labelledby="share-heading"]')
          let clip = null; try { clip = await navigator.clipboard.readText() } catch (e) { clip = 'ERR ' + e.message }
          const ev = window.dataLayer.slice(window.__dlStart).map((x) => Array.from(x)).filter((x) => x[0] === 'event' && x[1] === 'share')
          return { btn: s.querySelector('button').textContent, status: s.querySelector('[role=status]').textContent, clip, ev }
        })()`)
        ax = await axNodes(client)
        check(`${label} 복사 성공 → 클립보드 = 페이지 절대 URL`, after.clip === info.expectedUrl, after.clip)
        check(`${label} 복사 성공 → 버튼 "${T.copied}"·AX 이름 동일`, after.btn === T.copied && axByRole(ax, 'button').some((b) => b.name === T.copied))
        check(`${label} 복사 성공 → status "${T.ok}"`, after.status === T.ok, after.status)
        const ev = after.ev[0]?.[2]
        check(`${label} GA share 이벤트(copy_link)`, after.ev.length === 1 && ev.method === 'copy_link' && ev.content_type === 'post' && ev.item_id === d.path.split('/').pop() && (ko ? ev.language === undefined : ev.language === 'en'), JSON.stringify(ev))
        await delay(2000)
        const reset = await client.evaluate(`(() => { const s=document.querySelector('section[aria-labelledby="share-heading"]'); return { btn: s.querySelector('button').textContent, status: s.querySelector('[role=status]').textContent } })()`)
        check(`${label} 2초 뒤 원상 복귀`, reset.btn === T.copy && reset.status === '', JSON.stringify(reset))

        // 복사 실패(클립보드 API 없음)
        await client.evaluate(`Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })`)
        await clickCenter(client, 'section[aria-labelledby="share-heading"] button')
        await delay(300)
        const failed = await client.evaluate(`(() => { const s=document.querySelector('section[aria-labelledby="share-heading"]'); return { btn: s.querySelector('button').textContent, status: s.querySelector('[role=status]').textContent } })()`)
        check(`${label} 복사 실패 → "${T.failed}"·안내 문구(alert 없음)`, failed.btn === T.failed && failed.status === T.ng, JSON.stringify(failed))
        await shot(client, `${d.locale}-${d.kind}-detail-${vp.name}-copy-failed`)

        // X·스레드 클릭 이벤트(새 창은 열리게 두되 막을 필요 없음 — 헤드리스에서 새 타깃만 생긴다)
        await client.evaluate(`window.__dlStart = window.dataLayer.length; document.querySelectorAll('section[aria-labelledby="share-heading"] a').forEach(a => a.addEventListener('click', e => e.preventDefault(), { once: true }))`)
        await clickCenter(client, 'section[aria-labelledby="share-heading"] a:nth-of-type(1)')
        await clickCenter(client, 'section[aria-labelledby="share-heading"] a:nth-of-type(2)')
        await delay(200)
        const methods = await client.evaluate(`window.dataLayer.slice(window.__dlStart).map((x) => Array.from(x)).filter((x) => x[0] === 'event' && x[1] === 'share').map((x) => x[2].method)`)
        check(`${label} GA share 이벤트(x·threads)`, methods.join(',') === 'x,threads', methods.join(','))
      } else {
        await shot(client, `${d.locale}-${d.kind}-detail-${vp.name}`)
      }
    }

    // 2. 피드 갱신 표시
    for (const [locale, path, expectSr] of [
      ['ko', '/?page=4', '최근 갱신: 2026년 11월 8일'],
      ['en', '/en?page=4', 'Recently updated: Nov 8, 2026'],
    ]) {
      const label = `[${vp.name}] ${path}`
      await client.navigate(`${base}${path}`)
      await client.evaluate(CONTRAST_JS)
      const r = await client.evaluate(`(() => {
        const times = [...document.querySelectorAll('[data-slot=card-footer] time[aria-hidden="true"]')]
        return times.map((t) => { const wrap = t.parentElement; const cs = getComputedStyle(wrap); const tcs = getComputedStyle(t)
          return { text: t.textContent, dt: t.getAttribute('dateTime'), sr: wrap.querySelector('.sr-only')?.textContent,
            border: cs.borderTopWidth, bg: cs.backgroundColor, tbg: tcs.backgroundColor, radius: cs.borderRadius, aria: wrap.getAttribute('aria-label'), ratio: __ratio(t),
            sep: wrap.previousElementSibling?.getAttribute('aria-hidden') === 'true' && wrap.previousElementSibling.textContent === '·' } })
      })()`)
      check(`${label} 갱신 표시 카드 ≥ 1`, r.length >= 1, `${r.length}개`)
      check(`${label} 평문(테두리 0·배경 투명·aria-label 없음, P2-1·P2-2)`, r.every((x) => x.border === '0px' && x.bg === 'rgba(0, 0, 0, 0)' && x.tbg === 'rgba(0, 0, 0, 0)' && x.aria === null))
      check(`${label} "·" 구분자 aria-hidden`, r.every((x) => x.sep))
      check(`${label} sr-only 전체 날짜`, r.every((x) => x.sr === expectSr), r.map((x) => x.sr).join(','))
      check(`${label} 갱신 글자 대비 ≥ 4.5`, r.every((x) => x.ratio >= 4.5), r.map((x) => x.ratio).join(','))
      const ax = await axNodes(client)
      const texts = ax.filter((n) => !n.ignored && n.role?.value === 'StaticText').map((n) => n.name?.value ?? '')
      check(`${label} AX 트리에 sr 문구 읽힘·축약 표기 안 읽힘`, texts.includes(expectSr) && !texts.some((t) => /^(\d\d\/\d\d 갱신|Updated [A-Z][a-z]{2} \d+)$/.test(t)))
      await client.evaluate(`document.querySelector('[data-slot=card-footer] time[aria-hidden="true"]').closest('[data-slot=card]').scrollIntoView({block:'center'})`)
      await delay(200)
      await shot(client, `${locale}-feed-renewal-${vp.name}`)
    }

    // 3. 소개·약관
    for (const [locale, path, pending, otherHref] of [
      ['ko', '/about', '연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.', '/terms'],
      ['en', '/en/about', 'Contact channel: pending a decision. This page will be updated once it’s finalized.', '/en/terms'],
      ['ko', '/terms', '연락 창구 준비 중입니다. 확정되면 이 페이지를 갱신합니다.', '/about'],
      ['en', '/en/terms', 'Contact channel: pending a decision. This page will be updated once it’s finalized.', '/en/about'],
    ]) {
      const label = `[${vp.name}] ${path}`
      await client.navigate(`${base}${path}`)
      await client.evaluate(CONTRAST_JS)
      const r = await client.evaluate(`(() => {
        const box = [...document.querySelectorAll('main p.border-dashed')]
        const footer = document.querySelector('footer')
        const fl = [...footer.querySelectorAll('a')].map((a) => ({ href: a.getAttribute('href'), text: a.textContent, ratio: __ratio(a) }))
        const mainLinks = [...document.querySelector('main').querySelectorAll('a')].map((a) => a.getAttribute('href'))
        const low = [...document.querySelectorAll('main *')].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && !e.closest('.sr-only')).map((e) => ({ t: e.textContent.trim().slice(0, 30), r: __ratio(e) })).filter((x) => x.r < 4.5)
        return { invalid: document.documentElement.outerHTML.includes('example.invalid'), mailto: !!document.querySelector('a[href^="mailto:"]'), box: box.map((b) => b.textContent), fl, mainLinks, low, h2: [...document.querySelectorAll('main h2')].map((h) => h.textContent), hscroll: document.documentElement.scrollWidth > document.documentElement.clientWidth, lang: document.documentElement.lang,
          afterH1: (() => { const e = document.querySelector('main h1')?.nextElementSibling; const t = e?.querySelector('time'); return e ? { tag: e.tagName, cls: e.className, text: e.textContent, dt: t?.getAttribute('datetime') ?? null, tt: t?.textContent ?? null } : null })(),
          afterBox: (() => { const e = box[0]?.nextElementSibling; return e ? { tag: e.tagName, cls: e.className, text: e.textContent } : null })() }
      })()`)
      check(`${label} example.invalid·mailto 0`, !r.invalid && !r.mailto)
      check(`${label} 준비 중 상자`, r.box.includes(pending), r.box.join(' | '))
      check(`${label} 상호 링크 → ${otherHref}`, r.mainLinks.includes(otherHref))
      check(`${label} 푸터 약관 링크`, r.fl.some((l) => l.href === (locale === 'en' ? '/en/terms' : '/terms') && l.text === (locale === 'en' ? 'Terms' : '이용약관')))
      check(`${label} 푸터 링크 대비 ≥ 4.5`, r.fl.every((l) => l.ratio >= 4.5), r.fl.map((l) => `${l.text}:${l.ratio}`).join(', '))
      check(`${label} 본문 글자 대비 4.5 미만 0`, r.low.length === 0, JSON.stringify(r.low.slice(0, 3)))
      check(`${label} 가로 스크롤 없음`, !r.hscroll)
      check(`${label} html lang`, r.lang === locale, r.lang)
      if (path.includes('terms')) check(`${label} h2 6개`, r.h2.length === 6, r.h2.join(' / '))
      if (path.includes('terms')) {
        const pre = locale === 'en' ? 'Last updated: ' : '최종 개정: '
        const a = r.afterH1
        check(`${label} 개정일 줄(h1 바로 다음 p.text-xs · time datetime=2026-11-09)`, !!a && a.tag === 'P' && a.cls.split(' ').includes('text-xs') && a.dt === '2026-11-09' && a.tt === '2026-11-09' && a.text === pre + '2026-11-09', JSON.stringify(a))
      } else {
        const exp = locale === 'en' ? 'The handling standards below apply once the contact channel is finalized.' : '아래 처리 기준은 연락 창구가 확정된 뒤부터 적용됩니다.'
        const b = r.afterBox
        check(`${label} 준비 중 상자 바로 아래 처리 기준 문장(p.text-xs)`, !!b && b.tag === 'P' && b.cls.split(' ').includes('text-xs') && b.text.trim() === exp, JSON.stringify(b))
      }
      await shot(client, `${path.replaceAll('/', '_').replace(/^_/, '') || 'root'}-${vp.name}`)
    }
  }
})

console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
process.exit(fail === 0 ? 0 : 1)
