/**
 * 프로그래머 15 — 상세 사진 설명(C1)·깨진 핫링크 뒤 설명 줄 숨김(C7) 실브라우저 확인(헤드리스 Chrome + CDP, 추가 의존성 없음).
 * `fixture-build.sh --serve`가 픽스처 포함 빌드를 띄운 뒤 부른다. 사용: node caption-browser.mjs <baseUrl> <화면 폴더>
 *
 * news 픽스처의 핫링크(`https://img.example.org/…` — 예시 도메인, 실제로는 연결되지 않는다)는 CDP `Fetch`로 가로채 응답을 직접 준다.
 *  - ok:         그 자리에서 만든 단색 PNG를 준다 → 사진·사진 설명·크레딧이 보인다
 *  - fail-early: 바로 404 → 하이드레이션 전에 끝난 실패(`CardMedia`의 마운트 시 complete·naturalWidth 확인 경로)
 *  - fail-late:  하이드레이션이 끝날 때까지 응답을 잡아 두었다가 404 → 하이드레이션 뒤 실패(`onError` 경로).
 *                잡아 둔 동안 설명 줄이 보이는지도 먼저 확인한다(서버 HTML에는 설명 줄이 있다)
 * public 픽스처(저장소 이미지)는 가로채지 않는다.
 * 폭 375·1280 × ko/en. 콘솔 오류·페이지 예외(하이드레이션 불일치 포함)도 센다. 실패가 하나라도 있으면 종료 코드 1.
 */
import fs from 'node:fs'
import zlib from 'node:zlib'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const [base, shots] = process.argv.slice(2)
fs.mkdirSync(shots, { recursive: true })
let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

/**
 * 응답 본문: 1200×630 단색(회청색) PNG를 그 자리에서 만든다(zlib 내장, 추가 의존성 없음).
 * 저장소 이미지를 쓰지 않는 이유 — 실존 인물 사진이 가상의 사진 설명과 짝지어진 화면이 남지 않게 한다.
 */
function solidPng(width, height, [r, g, b]) {
  const chunk = (type, data) => {
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(zlib.crc32(body) >>> 0)
    return Buffer.concat([len, body, crc])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 2
  const row = Buffer.alloc(1 + width * 3)
  for (let x = 0; x < width; x += 1) row.set([r, g, b], 1 + x * 3)
  const raw = Buffer.concat(Array.from({ length: height }, () => row))
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}
const IMAGE_BODY = solidPng(1200, 630, [120, 134, 150]).toString('base64')

const KO_NEWS_CAPTION = '2026년 11월 8일 국회 본회의장에서 예시 의원이 발언하는 모습(원 기사 사진 설명 기준).'
const EN_NEWS_CAPTION = 'A sample lawmaker speaking in the plenary hall on Nov. 8, 2026 (per the original photo caption).'
const KO_PUBLIC_CAPTION = '2026년 11월 예시부 청사 전경(원 기사 사진 설명 기준).'
const EN_PUBLIC_CAPTION = 'The Ministry of Example building, November 2026 (per the original photo caption).'
const pages = [
  { lang: 'ko', kind: 'news', path: '/post/zz-fixture-news-image', caption: KO_NEWS_CAPTION, credit: '사진: 예시일보' },
  { lang: 'en', kind: 'news', path: '/en/post/zz-fixture-news-image', caption: EN_NEWS_CAPTION, credit: 'Photo: Example Daily' },
  { lang: 'ko', kind: 'public', path: '/post/zz-fixture-public-image', caption: KO_PUBLIC_CAPTION, credit: '사진: 예시부' },
  { lang: 'en', kind: 'public', path: '/en/post/zz-fixture-public-image', caption: EN_PUBLIC_CAPTION, credit: 'Photo: Ministry of Example' },
]

const CONTRAST_JS = `
window.__lum = (rgb) => { const [r,g,b] = rgb.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4}); return 0.2126*r+0.7152*g+0.0722*b }
window.__bg = (el) => { for (let e=el; e; e=e.parentElement) { const c=getComputedStyle(e).backgroundColor; const a=c.match(/[\\d.]+/g); if (a && (a.length<4 || Number(a[3])>0)) return c } return 'rgb(255,255,255)' }
window.__ratio = (el) => { const L1=__lum(getComputedStyle(el).color), L2=__lum(__bg(el)); return Math.round(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))*100)/100 }
`
/** 상세 사진 자리의 상태. */
const STATE_JS = `(() => {
  const figure = document.querySelector('article figure.mt-5')
  if (!figure) return { figure: false }
  figure.scrollIntoView({ block: 'center' })
  const fig = figure.querySelector('figcaption[data-credit]')
  const img = figure.querySelector('img')
  const cap = fig ? fig.querySelector('p[data-image-caption]') : null
  const credit = fig ? [...fig.querySelectorAll('p')].find((p) => !p.hasAttribute('data-image-caption')) : null
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, height: r.height, width: r.width } }
  return {
    figure: true,
    failedAttr: figure.hasAttribute('data-media-failed'),
    slot: img ? 'img' : (figure.querySelector('[role=img]') ? 'placeholder' : 'none'),
    natural: img ? img.naturalWidth : 0,
    figcaption: Boolean(fig),
    firstP: fig ? (fig.querySelector('p')?.hasAttribute('data-image-caption') ?? false) : false,
    capText: cap ? cap.innerText : null,
    capRatio: cap ? __ratio(cap) : null,
    capBox: box(cap),
    creditText: credit ? credit.innerText : null,
    creditBox: box(credit),
    imgBox: box(figure.firstElementChild),
    bodyText: document.body.innerText,
    hscroll: document.documentElement.scrollWidth > window.innerWidth,
  }
})()`

await withChrome(9351, async (client) => {
  const errors = []
  client.on((message) => {
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails?.exception?.description ?? message.params.exceptionDetails?.text)
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error' && !/img\.example\.org/.test(message.params.entry.url ?? '') &&
      !/Failed to load resource: the server responded with a status of 404/.test(message.params.entry.text)) {
      errors.push(message.params.entry.text)
    }
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map((a) => a.value ?? a.description).join(' '))
  })
  await client.send('Network.setCacheDisabled', { cacheDisabled: true })
  await client.send('Fetch.enable', { patterns: [{ urlPattern: 'https://img.example.org/*', requestStage: 'Request' }] })
  let mode = 'ok'
  let held = []
  let intercepted = 0
  client.on((message) => {
    if (message.method !== 'Fetch.requestPaused') return
    intercepted += 1
    const { requestId } = message.params
    if (mode === 'ok') {
      client.send('Fetch.fulfillRequest', {
        requestId,
        responseCode: 200,
        responseHeaders: [{ name: 'Content-Type', value: 'image/png' }],
        body: IMAGE_BODY,
      })
    } else if (mode === 'fail-early') {
      client.send('Fetch.fulfillRequest', { requestId, responseCode: 404, responseHeaders: [{ name: 'Content-Type', value: 'text/plain' }], body: Buffer.from('not found').toString('base64') })
    } else {
      held.push(requestId)
    }
  })

  for (const width of [375, 1280]) {
    await client.setViewport(width, 900, width < 600)
    for (const page of pages) {
      const scenarios = page.kind === 'news' ? ['ok', 'fail-early', 'fail-late'] : ['local']
      for (const scenario of scenarios) {
        mode = scenario
        held = []
        errors.length = 0
        const tag = `[${width}] ${page.lang} ${page.kind} ${scenario}`
        const url = `${base}${page.path}`
        if (scenario === 'fail-late') {
          // load 이벤트는 잡아 둔 이미지 때문에 오지 않는다 → DOMContentLoaded 뒤 하이드레이션 여유를 두고 본다.
          const dom = client.waitFor((m) => m.method === 'Page.domContentEventFired')
          await client.send('Page.navigate', { url })
          await dom
          await delay(2500)
          await client.send('Runtime.evaluate', { expression: CONTRAST_JS })
          const before = (await client.send('Runtime.evaluate', { returnByValue: true, expression: STATE_JS })).result.value
          check(`${tag} 응답 대기 중: 이미지 요청이 잡혀 있음`, held.length >= 1, `잡힌 요청 ${held.length}`)
          check(`${tag} 응답 대기 중(하이드레이션 뒤): 사진 설명·크레딧 줄이 보인다`, before.figcaption && before.capText === page.caption && before.creditText?.startsWith(page.credit), JSON.stringify({ f: before.figcaption, c: before.capText }))
          for (const requestId of held) {
            await client.send('Fetch.fulfillRequest', { requestId, responseCode: 404, responseHeaders: [{ name: 'Content-Type', value: 'text/plain' }], body: Buffer.from('not found').toString('base64') })
          }
          await delay(800)
        } else {
          await client.navigate(url)
          await delay(1200)
        }
        await client.send('Runtime.evaluate', { expression: CONTRAST_JS })
        const v = (await client.send('Runtime.evaluate', { returnByValue: true, expression: STATE_JS })).result.value
        check(`${tag} 상세 사진 자리 있음`, v.figure)
        if (!v.figure) continue
        if (scenario === 'ok' || scenario === 'local') {
          check(`${tag} 이미지 로드됨(naturalWidth > 0)`, v.slot === 'img' && v.natural > 0, `${v.slot} ${v.natural}`)
          check(`${tag} figcaption 있음 · 실패 표시 없음`, v.figcaption && !v.failedAttr)
          check(`${tag} 사진 설명 글자 그대로`, v.capText === page.caption, String(v.capText))
          check(`${tag} 사진 설명이 figcaption 첫 줄`, v.firstP)
          check(`${tag} 크레딧 줄 "${page.credit}…"`, Boolean(v.creditText?.startsWith(page.credit)), String(v.creditText))
          check(`${tag} 화면 배치: 사진 → 사진 설명 → 크레딧 (위에서 아래)`, v.imgBox.bottom <= v.capBox.top + 0.5 && v.capBox.bottom <= v.creditBox.top + 0.5, JSON.stringify([v.imgBox.bottom, v.capBox.top, v.capBox.bottom, v.creditBox.top]))
          check(`${tag} 사진 설명 보임(높이 > 0, 화면 안)`, v.capBox.height > 0 && v.capBox.top >= 0 && v.capBox.bottom <= 900, JSON.stringify(v.capBox))
          check(`${tag} 사진 설명 글자 대비 ≥ 4.5`, v.capRatio >= 4.5, String(v.capRatio))
        } else {
          check(`${tag} 대체 카드로 전환`, v.slot === 'placeholder', v.slot)
          check(`${tag} figcaption 없음(C7)`, !v.figcaption)
          check(`${tag} figure에 실패 표시(data-media-failed)`, v.failedAttr)
          check(`${tag} 화면 글자에 사진 설명 0`, !v.bodyText.includes(page.caption))
          check(`${tag} 화면 글자에 크레딧 "${page.credit}" 0`, !v.bodyText.includes(page.credit))
        }
        check(`${tag} 가로 스크롤 없음`, !v.hscroll)
        check(`${tag} 콘솔 오류·페이지 예외 0`, errors.length === 0, errors.join(' | ').slice(0, 300))
        const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
        fs.writeFileSync(`${shots}/${page.lang}-${page.kind}-${scenario}-${width}.png`, Buffer.from(data, 'base64'))
      }
    }
  }
  check('핫링크 요청을 실제로 가로챘다(news 3상황 × ko/en × 2폭 = 12회 이상)', intercepted >= 12, String(intercepted))
})
console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
