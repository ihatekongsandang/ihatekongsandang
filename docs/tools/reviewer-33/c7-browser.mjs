/**
 * 리뷰어 33 — 프로그래머 15 C7(깨진 핫링크 → 사진 설명·크레딧 줄 숨김)을 **기존 일반 빌드(.next)** 위에서 실브라우저로 재현한다.
 * 빌드하지 않는다. 실제 content에는 public·news가 0건이라, 실제 상세 1쪽의 응답을 CDP `Fetch`로 받아
 * `MediaFigure`에 넘기는 props(media·children)만 바꿔 준다.
 *  - 문서 응답(SSR): `<figure class="mt-5">` 안 마크업 + 인라인 RSC 조각의 `MediaFigure` props를 news 핫링크 + figcaption으로 바꾼다
 *    → 하이드레이션 전 실패(fail-early, 마운트 시 complete·naturalWidth 확인 경로)·하이드레이션 뒤 실패(fail-late, onError 경로)·정상(ok)
 *  - 클라이언트 이동(RSC 응답, `?_rsc=`): 같은 바꿈을 .rsc 응답에 해 → React가 처음부터 그린 img의 onError 경로(nav-fail)·정상(nav-ok)
 * figcaption 내용은 이 도구가 만든 고정 문구다(C1 문구·순서 자체는 프로그래머 15 단위 검사와 픽스처 빌드가 본다).
 * 이미지 주소는 예시 도메인(img.example.org)만 쓰고, 응답은 그 자리에서 만든 단색 PNG 또는 404다. 화면은 저장하지 않는다
 * (실제 게시물 화면에 가상의 사진 설명이 붙은 그림이 남지 않게).
 * 사용(저장소 루트, `npx next start -p 3933` 실행 중): node docs/tools/reviewer-33/c7-browser.mjs http://127.0.0.1:3933 <post id>
 */
import zlib from 'node:zlib'
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const [base, id, flag] = process.argv.slice(2)
// --old-structure(양성 대조): figcaption을 MediaFigure 밖(바로 뒤 형제)에 두어 같은 검사가 FAIL을 내는지 본다(아래 oldStructure).
const OLD = flag === '--old-structure'
let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
}

function solidPng(width, height) {
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
  const row = Buffer.alloc(1 + width * 3, 128)
  row[0] = 0
  const raw = Buffer.concat(Array.from({ length: height }, () => row))
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}
const PNG = solidPng(320, 180).toString('base64')
const NOT_FOUND = Buffer.from('not found').toString('base64')

const IMG = 'https://img.example.org/r33/og.png'
const TEXT = {
  ko: { caption: '리뷰어 33 시험용 사진 설명 문장', credit: '사진: 리뷰어33예시일보', alt: '리뷰어 33 시험용 대체 텍스트' },
  en: { caption: 'Reviewer 33 test photo caption', credit: 'Photo: R33 Example Daily', alt: 'Reviewer 33 test alt text' },
}
const FIGCAPTION_CLASS = 'mt-1.5 text-[13px] leading-[1.55] text-muted-foreground'
const FRAME_CLASS = 'relative aspect-[16/9] w-full overflow-hidden bg-surface rounded-[var(--radius-card)]'

function props(locale) {
  const t = TEXT[locale]
  return {
    media: { kind: 'remote', src: IMG, alt: t.alt, credit: { kind: 'news', creditName: '리뷰어33예시일보', creditNameEn: 'R33 Example Daily', sourcePageUrl: 'https://news.example.org/a/1' } },
    locale,
    className: 'mt-5',
    children: ['$', 'figcaption', null, { 'data-credit': '', className: FIGCAPTION_CLASS, children: [
      ['$', 'p', null, { 'data-image-caption': '', children: t.caption }],
      ['$', 'p', null, { children: t.credit }],
    ] }],
  }
}
const PROPS_RE = /\{"media":\{"kind":"local","src":"[^"]*","alt":"(?:[^"\\]|\\.)*"\},"locale":"(ko|en)","className":"mt-5","children":null\}/
const PROPS_RE_ESC = /\{\\"media\\":\{\\"kind\\":\\"local\\",\\"src\\":\\"[^"\\]*\\",\\"alt\\":\\"(?:[^"\\]|\\[^"])*\\"\},\\"locale\\":\\"(ko|en)\\",\\"className\\":\\"mt-5\\",\\"children\\":null\}/
const BOUNDARY = '"])</script><script>self.__next_f.push([1,"'

let rewrites = { html: 0, rsc: 0 }
function rewriteHtml(html) {
  const joined = html.split(BOUNDARY).join('')
  const m = joined.match(PROPS_RE_ESC)
  if (!m) return null
  const locale = m[1]
  const t = TEXT[locale]
  let out
  if (OLD) {
    const unesc = joined.replace(/\\"/g, '"')
    const o = oldStructure(unesc, { locale })
    if (!o) return null
    const esc = (v) => JSON.stringify(v).slice(1, -1)
    out = joined.replace(ELEMENT_RE_ESC, () => esc(JSON.stringify(o.tree)))
  } else {
    const escaped = JSON.stringify(JSON.stringify(props(locale))).slice(1, -1)
    out = joined.replace(PROPS_RE_ESC, () => escaped)
  }
  const start = out.indexOf('<figure class="mt-5">')
  const end = out.indexOf('</figure>', start)
  if (start < 0 || end < 0) return null
  const ssr = `<figure class="mt-5"><div class="${FRAME_CLASS}"><img src="${IMG}" alt="${t.alt}" loading="eager" decoding="async" class="absolute inset-0 size-full object-cover"/></div>` +
    `<figcaption data-credit="" class="${FIGCAPTION_CLASS}"><p data-image-caption="">${t.caption}</p><p>${t.credit}</p></figcaption></figure>`
  const ssrOld = `<div><figure class="mt-5"><div class="${FRAME_CLASS}"><img src="${IMG}" alt="${t.alt}" loading="eager" decoding="async" class="absolute inset-0 size-full object-cover"/></div></figure>` +
    `<figcaption data-credit="" class="${FIGCAPTION_CLASS}"><p data-image-caption="">${t.caption}</p><p>${t.credit}</p></figcaption></div>`
  out = out.slice(0, start) + (OLD ? ssrOld : ssr) + out.slice(end + '</figure>'.length)
  rewrites.html += 1
  return out
}
/**
 * 양성 대조 구조: 같은 figcaption을 MediaFigure의 children이 아니라 **바로 뒤 형제**로 둔다(깨짐을 모르는 설명 줄).
 * 이때 깨진 뒤에도 사진 설명·크레딧 글자가 화면에 남아야 하고, 검사는 FAIL을 내야 한다.
 */
function oldStructure(text, element) {
  const ref = text.match(/\["\$","\$L([0-9a-f]+)",null,\{"media":\{"kind":"local"/)
  if (!ref) return null
  const p = props(element.locale)
  const tree = ['$', 'div', null, { children: [
    ['$', `$L${ref[1]}`, null, { ...p, children: null }],
    p.children,
  ] }]
  return { tree, refRow: '' }
}
const ELEMENT_RE = /\["\$","\$L[0-9a-f]+",null,(\{"media":\{"kind":"local"[^\n]*?"className":"mt-5","children":null\})\]/
const ELEMENT_RE_ESC = /\[\\"\$\\",\\"\$L[0-9a-f]+\\",null,(\{\\"media\\":\{\\"kind\\":\\"local\\"(?:(?!\\n).)*?\\"className\\":\\"mt-5\\",\\"children\\":null\})\]/
function rewriteRsc(text) {
  const m = text.match(PROPS_RE)
  if (!m) return null
  rewrites.rsc += 1
  if (OLD) {
    const o = oldStructure(text, { locale: m[1] })
    return text.replace(ELEMENT_RE, () => JSON.stringify(o.tree))
  }
  return text.replace(PROPS_RE, () => JSON.stringify(props(m[1])))
}

const STATE_JS = `(() => {
  const figure = document.querySelector('article figure.mt-5')
  if (!figure) return { figure: false, path: location.pathname, text: document.body.innerText.slice(0, 200) }
  const fig = figure.querySelector('figcaption[data-credit]')
  const img = figure.querySelector('img')
  return {
    figure: true,
    failedAttr: figure.hasAttribute('data-media-failed'),
    slot: img ? 'img' : (figure.querySelector('[role=img]') ? 'placeholder' : 'none'),
    src: img ? img.getAttribute('src') : null,
    natural: img ? img.naturalWidth : 0,
    figcaption: Boolean(fig),
    capText: fig?.querySelector('p[data-image-caption]')?.innerText ?? null,
    bodyText: document.body.innerText,
    path: location.pathname,
  }
})()`

await withChrome(9433, async (client) => {
  const errors = []
  client.on((message) => {
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails?.exception?.description ?? message.params.exceptionDetails?.text)
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error' && !/img\.example\.org/.test(message.params.entry.url ?? '') &&
      !/status of 404/.test(message.params.entry.text)) errors.push(message.params.entry.text)
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map((a) => a.value ?? a.description).join(' '))
  })
  await client.send('Network.setCacheDisabled', { cacheDisabled: true })
  await client.send('Fetch.enable', { patterns: [
    { urlPattern: 'https://img.example.org/*', requestStage: 'Request' },
    { urlPattern: `${base}/*post/${id}*`, requestStage: 'Response' },
  ] })
  let mode = 'ok'
  let held = []
  let rewriteOn = false
  client.on(async (message) => {
    if (message.method !== 'Fetch.requestPaused') return
    const { requestId, request, responseStatusCode, responseHeaders } = message.params
    if (request.url.startsWith('https://img.example.org/')) {
      if (mode === 'ok') client.send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'image/png' }], body: PNG })
      else if (mode === 'fail-early') client.send('Fetch.fulfillRequest', { requestId, responseCode: 404, responseHeaders: [{ name: 'Content-Type', value: 'text/plain' }], body: NOT_FOUND })
      else held.push(requestId)
      return
    }
    if (!rewriteOn || responseStatusCode !== 200) return client.send('Fetch.continueRequest', { requestId })
    const { body, base64Encoded } = await client.send('Fetch.getResponseBody', { requestId })
    const text = base64Encoded ? Buffer.from(body, 'base64').toString('utf8') : body
    const isRsc = (responseHeaders ?? []).some((h) => h.name.toLowerCase() === 'content-type' && /text\/x-component/.test(h.value))
    const next = isRsc ? rewriteRsc(text) : rewriteHtml(text)
    if (next === null) return client.send('Fetch.continueRequest', { requestId })
    const headers = (responseHeaders ?? []).filter((h) => !/^(content-length|content-encoding|etag)$/i.test(h.name))
    client.send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: headers, body: Buffer.from(next, 'utf8').toString('base64') })
  })

  for (const width of [375, 1280]) {
    await client.setViewport(width, 900, width < 600)
    for (const locale of ['ko', 'en']) {
      const prefix = locale === 'en' ? '/en' : ''
      const url = `${base}${prefix}/post/${id}`
      const t = TEXT[locale]
      for (const scenario of ['control', 'ok', 'fail-early', 'fail-late', 'nav-ok', 'nav-fail']) {
        const tag = `[${width}] ${locale} ${scenario}`
        mode = scenario === 'nav-fail' ? 'fail-early' : scenario === 'nav-ok' ? 'ok' : scenario
        held = []
        errors.length = 0
        rewriteOn = scenario !== 'control'
        if (scenario === 'control') {
          // 바꾸지 않은 실제 상세: 저장소 이미지(local)·figcaption 없음(self) — 회귀
          await client.navigate(url)
          await delay(800)
          const v = await client.evaluate(STATE_JS)
          check(`${tag} 실제 상세: 저장소 이미지 로드·figcaption 없음·실패 표시 없음`, v.figure && v.slot === 'img' && v.natural > 0 && !v.figcaption && !v.failedAttr, JSON.stringify({ s: v.slot, n: v.natural, f: v.figcaption }))
          check(`${tag} 콘솔 오류·페이지 예외 0`, errors.length === 0, errors.join(' | ').slice(0, 300))
          continue
        }
        if (scenario.startsWith('nav')) {
          // 같은 언어의 홈에서 클라이언트 이동(Next 라우터) → RSC 응답을 바꾼다
          rewriteOn = false
          await client.navigate(`${base}${prefix}/`)
          await delay(1500)
          rewriteOn = true
          const before = rewrites.rsc
          await client.evaluate(`(() => { const a = document.createElement('a'); a.href = '${prefix}/post/${id}'; document.body.appendChild(a); window.next.router.push('${prefix}/post/${id}'); return true })()`)
          for (let i = 0; i < 40; i += 1) {
            await delay(150)
            const p = await client.evaluate('location.pathname')
            if (p === `${prefix}/post/${id}`) break
          }
          await delay(1500)
          check(`${tag} RSC 응답을 바꿨다(클라이언트 이동)`, rewrites.rsc > before, String(rewrites.rsc - before))
        } else if (scenario === 'fail-late') {
          const before = rewrites.html
          const dom = client.waitFor((m) => m.method === 'Page.domContentEventFired')
          await client.send('Page.navigate', { url })
          await dom
          await delay(2500)
          check(`${tag} 문서 응답을 바꿨다`, rewrites.html > before)
          const v0 = await client.evaluate(STATE_JS)
          check(`${tag} 응답 대기 중: 이미지 요청이 잡혀 있음`, held.length >= 1, String(held.length))
          check(`${tag} 응답 대기 중(하이드레이션 뒤): 사진 설명·크레딧 줄이 보인다`, v0.figcaption && v0.capText === t.caption && !v0.failedAttr, JSON.stringify({ f: v0.figcaption, c: v0.capText }))
          for (const requestId of held) await client.send('Fetch.fulfillRequest', { requestId, responseCode: 404, responseHeaders: [{ name: 'Content-Type', value: 'text/plain' }], body: NOT_FOUND })
          await delay(800)
        } else {
          const before = rewrites.html
          await client.navigate(url)
          await delay(1500)
          check(`${tag} 문서 응답을 바꿨다`, rewrites.html > before)
        }
        const v = await client.evaluate(STATE_JS)
        check(`${tag} 상세 사진 자리 있음`, v.figure, v.figure ? v.path : `${v.path ?? ''} ${errors.join(' | ').slice(0, 400)}`)
        if (!v.figure) continue
        if (scenario === 'ok' || scenario === 'nav-ok') {
          check(`${tag} 핫링크 이미지 로드(naturalWidth > 0)`, v.slot === 'img' && v.src === IMG && v.natural > 0, `${v.slot} ${v.src} ${v.natural}`)
          check(`${tag} figcaption·사진 설명 보임 · 실패 표시 없음`, v.figcaption && v.capText === t.caption && !v.failedAttr, String(v.capText))
        } else {
          check(`${tag} 대체 카드로 전환`, v.slot === 'placeholder', v.slot)
          check(`${tag} figcaption 없음(C7)`, !v.figcaption)
          check(`${tag} figure에 data-media-failed`, v.failedAttr)
          check(`${tag} 화면 글자에 사진 설명·크레딧 0`, !v.bodyText.includes(t.caption) && !v.bodyText.includes(t.credit))
        }
        check(`${tag} 콘솔 오류·페이지 예외 0(하이드레이션 불일치 포함)`, errors.length === 0, errors.join(' | ').slice(0, 300))
      }
    }
  }
  check('문서 응답 바꿈 횟수 = 12(ok·fail-early·fail-late × ko/en × 2폭)', rewrites.html === 12, String(rewrites.html))
})
console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
