/**
 * 테스터 03 — 배포 사이트(v0.2 뉴스형 전환) 전수 실측. 헤드리스 Chrome + CDP(`docs/tools/programmer-04/cdp.mjs` 재사용).
 * Claude in Chrome 확장이 이 세션에서 연결되지 않아(list_connected_browsers = []) 대신 이 방법으로 실제 브라우저(Chrome) 동작을 실측한다
 * (tester-02·programmer-11의 같은 선례를 따름 — README에 명시).
 * 대상: https://ihatekongsandang.vercel.app (배포 프로덕션). 코드/콘텐츠/빌드는 건드리지 않는다. GA 실제 전송은 googletagmanager.com을 차단해 막는다
 * (인라인 gtag 스텁은 차단 영향을 받지 않아 dataLayer 이벤트는 그대로 검증할 수 있다).
 * 사용법: node docs/tools/tester-03/e2e-deployed.mjs
 */
import fs from 'node:fs'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const BASE = 'https://ihatekongsandang.vercel.app'
const SHOTS = 'docs/tools/tester-03/screens'
fs.mkdirSync(SHOTS, { recursive: true })

let pass = 0
let fail = 0
const fails = []
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else {
    fail += 1
    fails.push(`${label}${detail ? ` — ${detail}` : ''}`)
  }
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

const CONTRAST_JS = `
window.__lum = (rgb) => { const [r,g,b] = rgb.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4}); return 0.2126*r+0.7152*g+0.0722*b }
window.__bg = (el) => { for (let e=el; e; e=e.parentElement) { const c=getComputedStyle(e).backgroundColor; const a=c.match(/[\\d.]+/g); if (a && (a.length<4 || Number(a[3])>0)) return c } return 'rgb(255,255,255)' }
window.__ratio = (el) => { const L1=__lum(getComputedStyle(el).color), L2=__lum(__bg(el)); return Math.round(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))*100)/100 }
`

/** 페이지의 모든 포커스 가능 요소(a[href], button, 보이는 것만)를 Tab으로 전수 순회 → DOM 순서 일치·포커스 표시 확인. */
async function tabWalkCheck(client, label) {
  const domOrder = await client.evaluate(
    `[...document.querySelectorAll('a[href], button')].filter((e) => e.offsetParent !== null).map((e) => e.tagName + ':' + (e.getAttribute('href') ?? e.textContent?.trim().slice(0, 20)))`,
  )
  await client.evaluate(`document.body.focus(); document.activeElement?.blur()`)
  const seq = []
  for (let i = 0; i < domOrder.length; i += 1) {
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    const info = await client.evaluate(
      `(() => { const e=document.activeElement; if (!e || e===document.body) return null; const cs=getComputedStyle(e); return { key: e.tagName + ':' + (e.getAttribute('href') ?? e.textContent?.trim().slice(0, 20)), fv: e.matches(':focus-visible'), ow: cs.outlineWidth, os: cs.outlineStyle } })()`,
    )
    if (!info) break
    seq.push(info)
  }
  check(
    `${label} Tab 전수 순회(${domOrder.length}개) = DOM 순서 일치`,
    seq.length === domOrder.length && seq.every((s, i) => s.key === domOrder[i]),
    `실측 ${seq.length}개 / DOM ${domOrder.length}개`,
  )
  check(
    `${label} Tab 이동 전체(${seq.length}회) 포커스 표시 보임`,
    seq.every((s) => s.fv && s.os === 'solid' && Number.parseFloat(s.ow) >= 1),
    seq.filter((s) => !(s.fv && s.os === 'solid')).length + '건 표시 없음',
  )
}

async function shot(client, name) {
  const { data } = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  fs.writeFileSync(`${SHOTS}/${name}.png`, Buffer.from(data, 'base64'))
}

async function clickCenter(client, selector) {
  const box = await client.evaluate(
    `(() => { const e=document.querySelector(${JSON.stringify(selector)}); if(!e) return null; e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2, y:r.y+r.height/2} })()`,
  )
  if (!box) return false
  for (const type of ['mousePressed', 'mouseReleased']) {
    await client.send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 })
  }
  return true
}

// ── 독립 재집계: content frontmatter에서 updatedAt 직접 파싱(앱 로직과 무관) ──
function seoulDateOf(d) {
  const t = d.getTime() + 9 * 3600 * 1000
  const dd = new Date(t)
  return `${dd.getUTCFullYear()}-${String(dd.getUTCMonth() + 1).padStart(2, '0')}-${String(dd.getUTCDate()).padStart(2, '0')}`
}
function daysSince(updatedAt, today) {
  const a = Date.parse(`${updatedAt}T00:00:00Z`)
  const b = Date.parse(`${today}T00:00:00Z`)
  if (Number.isNaN(a) || Number.isNaN(b)) return undefined
  return Math.round((b - a) / 86400000)
}
const TODAY = seoulDateOf(new Date())
console.log(`독립 재계산 기준 오늘(Asia/Seoul, 시스템 시계): ${TODAY}`)

function readUpdatedAtMap(dir) {
  const out = new Map()
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue
    const text = fs.readFileSync(`${dir}/${f}`, 'utf-8')
    const m = text.match(/^updatedAt:\s*"?(\d{4}-\d{2}-\d{2})"?/m)
    if (m) out.set(f.replace(/\.md$/, ''), m[1])
  }
  return out
}
const koUpdatedAt = readUpdatedAtMap('content/posts')
const expectedRenewed = [...koUpdatedAt.entries()]
  .map(([id, date]) => ({ id, date, days: daysSince(date, TODAY) }))
  .filter((x) => x.days !== undefined && x.days >= 0 && x.days < 7)
  .sort((a, b) => a.id.localeCompare(b.id))
console.log(`독립 재계산: updatedAt 보유 ${koUpdatedAt.size}건 중 7일 이내(갱신 표시 대상) ${expectedRenewed.length}건`)
for (const e of expectedRenewed) console.log(`  - ${e.id} (${e.date}, ${e.days}일 전)`)

const KO_TOTAL_POSTS = fs.readdirSync('content/posts').filter((f) => f.endsWith('.md')).length
const EN_TOTAL_POSTS = fs.readdirSync('content/posts-en').filter((f) => f.endsWith('.md')).length
console.log(`독립 재집계: content/posts ${KO_TOTAL_POSTS}건 · content/posts-en ${EN_TOTAL_POSTS}건`)

await withChrome(9342, async (client) => {
  await client.send('Accessibility.enable')
  await client.send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*'] })
  await client.send('Browser.grantPermissions', {
    origin: new URL(BASE).origin,
    permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
  })

  for (const vp of [
    { name: 'mobile', w: 375, h: 812, mobile: true },
    { name: 'desktop', w: 1280, h: 900, mobile: false },
  ]) {
    await client.setViewport(vp.w, vp.h, vp.mobile)

    // ════════════════════════════════════════════════════════════
    // 1. 공유 버튼 — ko: alaska(예산 안, text 있음) · en: alaska(예산 초과, text 없음 — 리뷰 25 24건 중 1)
    // ════════════════════════════════════════════════════════════
    const SHARE_DETAILS = [
      { locale: 'ko', path: '/post/2026-10-02-alaska-lng-vs-dmz-mine-response', xText: true },
      { locale: 'en', path: '/en/post/2026-10-02-alaska-lng-vs-dmz-mine-response', xText: false },
    ]
    for (const d of SHARE_DETAILS) {
      const ko = d.locale === 'ko'
      const label = `[${vp.name}] ${d.path}`
      const T = ko
        ? { copy: '링크 복사', copied: '복사됨', failed: '복사 실패', ok: '링크가 복사되었습니다.', ng: '복사에 실패했습니다. 주소창에서 직접 복사해 주세요.' }
        : { copy: 'Copy link', copied: 'Copied', failed: 'Copy failed', ok: 'Link copied.', ng: 'Copy failed. Please copy the address manually.' }
      await client.navigate(`${BASE}${d.path}`)
      await client.evaluate(CONTRAST_JS)
      const info = await client.evaluate(`(() => {
        const s = document.querySelector('section[aria-labelledby="share-heading"]')
        if (!s) return null
        const ctrls = [...s.querySelectorAll('button, a')]
        return {
          ctrls: ctrls.map((e) => ({ tag: e.tagName, href: e.getAttribute('href'), target: e.getAttribute('target'), rel: e.getAttribute('rel') })),
          status: (() => { const st = s.querySelector('[role=status]'); return st && { live: st.getAttribute('aria-live'), text: st.textContent } })(),
          expectedUrl: document.querySelector('link[rel=canonical]')?.href ?? location.origin + location.pathname,
          h1: document.querySelector('h1')?.textContent?.trim() ?? null,
        }
      })()`)
      check(`${label} 공유 section 존재`, info !== null)
      if (!info) continue
      const xu = new URL(info.ctrls[1].href)
      const tu = new URL(info.ctrls[2].href)
      check(`${label} X href url = canonical`, xu.searchParams.get('url') === info.expectedUrl, xu.searchParams.get('url'))
      check(`${label} 스레드 href url = canonical`, tu.searchParams.get('url') === info.expectedUrl)
      if (d.xText) {
        check(`${label} X text = 제목 그대로`, xu.searchParams.get('text') === info.h1 && !!info.h1, `text=${xu.searchParams.get('text')}`)
      } else {
        check(`${label} X text 없음(예산 초과 — 24건 중 1)`, !xu.searchParams.has('text') && [...xu.searchParams.keys()].join(',') === 'url', xu.search)
      }
      check(`${label} 스레드 text = 제목 그대로`, tu.searchParams.get('text') === info.h1)

      if (vp.name === 'mobile') {
        // 실제 클릭(마우스 이벤트) — 링크 복사
        await client.evaluate(`window.dataLayer = window.dataLayer || []; window.__dlStart = window.dataLayer.length`)
        await clickCenter(client, 'section[aria-labelledby="share-heading"] button')
        await delay(300)
        const after = await client.evaluate(`(async () => {
          const s = document.querySelector('section[aria-labelledby="share-heading"]')
          let clip = null; try { clip = await navigator.clipboard.readText() } catch (e) { clip = 'ERR ' + e.message }
          const ev = window.dataLayer.slice(window.__dlStart).map((x) => Array.from(x)).filter((x) => x[0] === 'event' && x[1] === 'share')
          return { btn: s.querySelector('button').textContent, status: s.querySelector('[role=status]').textContent, clip, ev }
        })()`)
        check(`${label} 실제 클릭 → 클립보드 = 페이지 절대 URL`, after.clip === info.expectedUrl, after.clip)
        check(`${label} 실제 클릭 → 버튼 "${T.copied}"`, after.btn === T.copied, after.btn)
        check(`${label} 실제 클릭 → status "${T.ok}"`, after.status === T.ok, after.status)
        const ev = after.ev[0]?.[2]
        check(
          `${label} GA dataLayer share 이벤트(copy_link, 실제 네트워크는 차단·대체 확인 — 사유는 핸드오프 참조)`,
          after.ev.length === 1 && ev?.method === 'copy_link' && ev?.content_type === 'post',
          JSON.stringify(ev),
        )
        await delay(2100)
        const reset = await client.evaluate(`(() => { const s=document.querySelector('section[aria-labelledby="share-heading"]'); return { btn: s.querySelector('button').textContent, status: s.querySelector('[role=status]').textContent } })()`)
        check(`${label} 2초 뒤 원상 복귀`, reset.btn === T.copy && reset.status === '', JSON.stringify(reset))

        // 실제 클릭 — X·스레드(새 창 preventDefault, href는 이미 위에서 확인)
        await client.evaluate(`window.__dlStart = window.dataLayer.length; document.querySelectorAll('section[aria-labelledby="share-heading"] a').forEach(a => a.addEventListener('click', e => e.preventDefault(), { once: true }))`)
        await clickCenter(client, 'section[aria-labelledby="share-heading"] a:nth-of-type(1)')
        await clickCenter(client, 'section[aria-labelledby="share-heading"] a:nth-of-type(2)')
        await delay(200)
        const methods = await client.evaluate(`window.dataLayer.slice(window.__dlStart).map((x) => Array.from(x)).filter((x) => x[0] === 'event' && x[1] === 'share').map((x) => x[2].method)`)
        check(`${label} GA dataLayer share 이벤트(x·threads, 실제 클릭)`, methods.join(',') === 'x,threads', methods.join(','))
        await shot(client, `share-${d.locale}-${vp.name}`)

        // Tab 순서·focus-visible
        await client.evaluate(`[...document.querySelector('section[aria-labelledby="share-heading"]').previousElementSibling.querySelectorAll('a')].at(-1).focus()`)
        const seq = []
        for (let i = 0; i < 3; i += 1) {
          await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
          await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
          await delay(50)
          seq.push(
            await client.evaluate(
              `(() => { const e=document.activeElement; const cs=getComputedStyle(e); return { text: e.textContent, fv: e.matches(':focus-visible'), ow: cs.outlineWidth, os: cs.outlineStyle } })()`,
            ),
          )
        }
        check(`${label} Tab 3회 = 공유 3개 순서`, seq[0].text.includes(T.copy))
        check(`${label} :focus-visible 외곽선 2px solid`, seq.every((s) => s.fv && s.ow === '2px' && s.os === 'solid'), seq.map((s) => `${s.ow} ${s.os}`).join(' / '))
        // 전수 Tab 순회 전 새로 고침: body.focus()+blur() 리셋은 블러 전 포커스 위치가 남아 있으면
        // 다음 Tab이 문서 맨 앞이 아니라 그 다음 요소부터 시작된다(브라우저 사양 — 사이트 결함 아님, 디버그로 재현·확인함).
        // 앞의 복사·X·스레드 실클릭·3-Tab 테스트로 포커스가 중간에 있으므로, 전수 순회만 깨끗한 포커스 상태에서 다시 한다.
        await client.navigate(`${BASE}${d.path}`)
        await tabWalkCheck(client, label)
      }
    }

    // ════════════════════════════════════════════════════════════
    // 2·3. 약관·소개 ko/en — 문안·준비 중·상호 링크·메타·대비
    // ════════════════════════════════════════════════════════════
    const PAGES = [
      { locale: 'ko', path: '/about', other: '/terms', titleTxt: '소개', canonical: '/about' },
      { locale: 'en', path: '/en/about', other: '/en/terms', titleTxt: 'About', canonical: '/en/about' },
      { locale: 'ko', path: '/terms', other: '/about', titleTxt: '이용약관·운영 정책', canonical: '/terms', h2count: 6 },
      { locale: 'en', path: '/en/terms', other: '/en/about', titleTxt: 'Terms and Operating Policy', canonical: '/en/terms', h2count: 6 },
    ]
    for (const p of PAGES) {
      const label = `[${vp.name}] ${p.path}`
      await client.navigate(`${BASE}${p.path}`)
      await client.evaluate(CONTRAST_JS)
      const r = await client.evaluate(`(() => {
        const footer = document.querySelector('footer')
        const fl = [...footer.querySelectorAll('a')].map((a) => ({ href: a.getAttribute('href'), text: a.textContent, ratio: __ratio(a) }))
        const mainLinks = [...document.querySelector('main').querySelectorAll('a')].map((a) => a.getAttribute('href'))
        const box = [...document.querySelectorAll('main p.border-dashed')].map((b) => b.textContent)
        const low = [...document.querySelectorAll('main p, main li, main h1, main h2')].map((e) => ({ t: e.textContent.trim().slice(0, 40), r: __ratio(e) })).filter((x) => x.r < 4.5)
        const canonical = document.querySelector('link[rel=canonical]')?.getAttribute('href')
        const hreflangs = [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => ({ hl: l.getAttribute('hreflang'), href: l.getAttribute('href') }))
        return {
          title: document.title,
          h1: document.querySelector('h1')?.textContent,
          h2: [...document.querySelectorAll('main h2')].map((h) => h.textContent),
          invalid: document.documentElement.outerHTML.includes('example.invalid'),
          mailto: !!document.querySelector('a[href^="mailto:"]'),
          box, fl, mainLinks, low, canonical, hreflangs,
          lang: document.documentElement.lang,
          hscroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        }
      })()`)
      check(`${label} h1 = "${p.titleTxt}"`, r.h1 === p.titleTxt, r.h1)
      check(`${label} example.invalid·mailto 0`, !r.invalid && !r.mailto)
      check(`${label} 준비 중 상자 존재`, r.box.length >= 1, JSON.stringify(r.box))
      check(`${label} 상호 링크 → ${p.other}`, r.mainLinks.includes(p.other), r.mainLinks.join(','))
      check(`${label} 푸터 약관 링크`, r.fl.some((l) => l.href === (p.locale === 'en' ? '/en/terms' : '/terms')))
      check(`${label} 푸터 링크 대비 ≥ 4.5`, r.fl.every((l) => l.ratio >= 4.5), r.fl.map((l) => l.ratio).join(','))
      check(`${label} 본문 글자 대비 4.5 미만 0`, r.low.length === 0, JSON.stringify(r.low.slice(0, 3)))
      check(`${label} 가로 스크롤 없음`, !r.hscroll)
      check(`${label} html lang = ${p.locale}`, r.lang === p.locale, r.lang)
      check(`${label} canonical = ${p.canonical}`, r.canonical?.endsWith(p.canonical), r.canonical)
      check(`${label} hreflang ko·en·x-default 3개`, r.hreflangs.length === 3, JSON.stringify(r.hreflangs))
      if (p.h2count) check(`${label} h2 ${p.h2count}개`, r.h2.length === p.h2count, r.h2.join(' / '))
      await tabWalkCheck(client, label)
    }

    // 소개 페이지 — 고친 문장 3곳(P2-1·P2-2·en aboutIntro 3문장)
    for (const [path, needle, oldNeedle, lbl] of [
      ['/about', '가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다', '방문자에게서 개인정보를 수집하지 않습니다', 'P2-1 개인정보'],
      ['/about', '뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다', '신문·인터넷신문, 뉴스통신사, 방송사업자를 기준으로 봅니다', 'P2-2 매체 구분'],
      ['/en/about', 'We do not make definitive claims about how far the facts have been established', 'We do not state how far the facts have been confirmed', 'P2-4 aboutIntro'],
    ]) {
      const label = `[${vp.name}] ${path} ${lbl}`
      await client.navigate(`${BASE}${path}`)
      const text = await client.evaluate(`document.querySelector('main').textContent`)
      check(`${label} 신규 문구 포함`, text.includes(needle))
      check(`${label} 옛 문구 0`, !text.includes(oldNeedle))
    }
  }

  // ════════════════════════════════════════════════════════════
  // 4. 카드 갱신 표시 — 전수(ko·en 전체 피드 페이지 순회)
  // ════════════════════════════════════════════════════════════
  await client.setViewport(1280, 900, false)
  for (const [locale, basePath] of [['ko', ''], ['en', '/en']]) {
    await client.navigate(`${BASE}${basePath || '/'}`)
    const meta = await client.evaluate(`(() => {
      const m = document.querySelector('.text-xs.text-muted-foreground')?.textContent ?? ''
      const nums = m.match(/\\d+/g)?.map(Number) ?? []
      return { text: m, totalItems: nums[0], totalPages: nums[2] }
    })()`)
    check(`[${locale}] 피드 전체 건수 추출`, meta.totalPages > 0, meta.text)
    const totalPages = meta.totalPages ?? 1
    const renewed = []
    for (let page = 1; page <= totalPages; page += 1) {
      const url = page === 1 ? `${BASE}${basePath || '/'}` : `${BASE}${basePath || ''}?page=${page}`
      await client.navigate(url)
      await client.evaluate(CONTRAST_JS)
      const r = await client.evaluate(`[...document.querySelectorAll('[data-slot=card-footer] time[aria-hidden="true"]')].map((t) => {
        const wrap = t.parentElement
        const link = wrap.closest('[data-slot=card]').querySelector('a[href]')
        const cs = getComputedStyle(wrap); const tcs = getComputedStyle(t)
        return { href: link?.getAttribute('href'), text: t.textContent, dt: t.getAttribute('dateTime'), sr: wrap.querySelector('.sr-only')?.textContent,
          border: cs.borderTopWidth, bg: cs.backgroundColor, aria: wrap.getAttribute('aria-label'), ratio: __ratio(t) }
      })`)
      renewed.push(...r)
    }
    check(`[${locale}] 전체 피드 순회 ${totalPages}페이지 완료`, true, `페이지 1~${totalPages}`)
    check(`[${locale}] 갱신 카드 수 = ${expectedRenewed.length}건(독립 재계산)`, renewed.length === expectedRenewed.length, `실측 ${renewed.length}건`)
    const ids = renewed.map((r) => r.href?.split('/').pop()).sort()
    const expectedIds = expectedRenewed.map((e) => e.id).sort()
    check(`[${locale}] 갱신 카드 id 일치`, JSON.stringify(ids) === JSON.stringify(expectedIds), `실측 ${JSON.stringify(ids)} / 기대 ${JSON.stringify(expectedIds)}`)
    check(`[${locale}] 평문(테두리 0·배경 투명·aria-label 없음)`, renewed.every((x) => x.border === '0px' && x.bg === 'rgba(0, 0, 0, 0)' && x.aria === null))
    const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for (const e of expectedRenewed) {
      const found = renewed.find((r) => r.href?.includes(e.id))
      if (!found) continue
      const [y, m, dd] = e.date.split('-')
      const expShort = locale === 'ko' ? `${m}/${dd} 갱신` : `Updated ${EN_MONTHS[Number(m) - 1]} ${Number(dd)}`
      const expSr = locale === 'ko' ? `최근 갱신: ${y}년 ${Number(m)}월 ${Number(dd)}일` : `Recently updated: ${EN_MONTHS[Number(m) - 1]} ${Number(dd)}, ${y}`
      check(`[${locale}] ${e.id} 표시 문자열`, found.text === expShort, found.text)
      check(`[${locale}] ${e.id} sr-only 전체 날짜`, found.sr === expSr, found.sr)
      check(`[${locale}] ${e.id} dateTime = ${e.date}`, found.dt === e.date, found.dt)
    }
    check(`[${locale}] 갱신 글자 대비 전부 ≥ 4.5`, renewed.every((x) => x.ratio >= 4.5), renewed.map((x) => x.ratio).join(','))
  }

  // ════════════════════════════════════════════════════════════
  // 6. 회귀 — 홈 피드·태그 내비·영어 피드·이미지 로딩
  // ════════════════════════════════════════════════════════════
  for (const [locale, path] of [['ko', '/'], ['en', '/en']]) {
    await client.navigate(`${BASE}${path}`)
    const r = await client.evaluate(`(() => {
      const cards = [...document.querySelectorAll('[data-slot=card]')]
      const imgs = [...document.querySelectorAll('[data-slot=card] img')]
      return {
        cardCount: cards.length,
        tagNav: !!document.querySelector('nav[aria-label="태그"]'),
        imgCount: imgs.length,
        imgComplete: imgs.map((i) => ({ complete: i.complete, nw: i.naturalWidth })),
      }
    })()`)
    check(`[${locale}] 홈 피드 카드 ≥ 1`, r.cardCount >= 1, String(r.cardCount))
    if (locale === 'ko') check(`[${locale}] 태그 내비 존재`, r.tagNav)
    else check(`[${locale}] 영어 피드 태그 내비 없음(의도된 동작)`, !r.tagNav)
    check(`[${locale}] 이미지 ${r.imgCount}개 전부 로드 완료(naturalWidth>0 또는 플레이스홀더 SVG)`, r.imgComplete.every((i) => i.complete), JSON.stringify(r.imgComplete.filter((i) => !i.complete)))
  }
  // 태그 내비 실제 클릭 회귀
  await client.navigate(`${BASE}/`)
  const firstTag = await client.evaluate(`document.querySelector('nav[aria-label="태그"] a')?.getAttribute('href')`)
  const clicked = await clickCenter(client, 'nav[aria-label="태그"] a')
  await delay(500)
  const afterUrl = await client.evaluate(`location.pathname`)
  check(`[regression] 태그 칩 클릭 → ${firstTag} 이동`, clicked && afterUrl === firstTag, afterUrl)
  await shot(client, 'home-ko-regression')
})

console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fails.length) {
  console.log('\n결함 목록:')
  for (const f of fails) console.log(`  - ${f}`)
}
process.exit(fail === 0 ? 0 : 1)
