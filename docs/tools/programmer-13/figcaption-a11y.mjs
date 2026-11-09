/**
 * (프로그래머 14 갱신: 상세 개편으로 figcaption 마크업이 `<figcaption data-credit>`가 되고 링크 문구가 보강안 목업 문구 — 언론 "기사 원문", 공공누리 "원문 페이지"/"Source page" — 로 바뀌어 기대값만 맞췄다. 검사 항목 수는 같다.)
 * 프로그래머 13 — 픽스처 상세의 크레딧 figcaption 실브라우저 확인(헤드리스 Chrome + CDP, 추가 의존성 없음).
 * `p11-build-check.sh --serve`가 픽스처 포함 빌드를 띄운 뒤 부른다. 사용: node figcaption-a11y.mjs <baseUrl> <화면 폴더>
 *  - ko/en × news/public × 375·1280px: figcaption 글자·링크 대비 ≥ 4.5, 링크 AX 이름(문구 + 새 창 안내), 375px 가로 스크롤 없음
 *  - news 핫링크(example.org — 연결 불가)가 깨지면 플레이스홀더로 바뀌는지(현행 동작 유지) + 그때도 크레딧 줄이 남는지 기록
 */
import fs from 'node:fs'
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
const CONTRAST_JS = `
window.__lum = (rgb) => { const [r,g,b] = rgb.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4}); return 0.2126*r+0.7152*g+0.0722*b }
window.__bg = (el) => { for (let e=el; e; e=e.parentElement) { const c=getComputedStyle(e).backgroundColor; const a=c.match(/[\\d.]+/g); if (a && (a.length<4 || Number(a[3])>0)) return c } return 'rgb(255,255,255)' }
window.__ratio = (el) => { const L1=__lum(getComputedStyle(el).color), L2=__lum(__bg(el)); return Math.round(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))*100)/100 }
`
const pages = [
  ['ko', 'news', '/post/zz-fixture-news-image', '기사 원문 (새 창에서 열림)'],
  ['en', 'news', '/en/post/zz-fixture-news-image', 'Source article (opens in a new tab)'],
  ['ko', 'public', '/post/zz-fixture-public-image', '원문 페이지 (새 창에서 열림)'],
  ['en', 'public', '/en/post/zz-fixture-public-image', 'Source page (opens in a new tab)'],
]
await withChrome(9343, async (client) => {
  await client.send('Page.enable')
  await client.send('Runtime.enable')
  await client.send('Accessibility.enable')
  for (const [width, label] of [[375, 'mobile'], [1280, 'desktop']]) {
    await client.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 })
    for (const [lang, kind, p, linkName] of pages) {
      await client.send('Page.navigate', { url: `${base}${p}` })
      await delay(2500)
      await client.send('Runtime.evaluate', { expression: CONTRAST_JS })
      const { result } = await client.send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const fig = document.querySelector('figcaption[data-credit]')
          if (!fig) return null
          fig.scrollIntoView({ block: 'center' })
          const ps = [...fig.querySelectorAll('p')].map((el) => ({ text: el.innerText, ratio: __ratio(el) }))
          const a = fig.querySelector('a')
          const figure = fig.closest('figure')
          return {
            ps, link: a ? { ratio: __ratio(a.querySelector('span')), rel: a.rel, target: a.target } : null,
            img: figure.querySelector('img') ? 'img' : (figure.querySelector('[role=img]') ? 'placeholder' : 'none'),
            hscroll: document.documentElement.scrollWidth > window.innerWidth,
          }
        })()`,
      })
      const v = result.value
      const tag = `[${label}] ${lang} ${kind}`
      check(`${tag} figcaption 있음`, Boolean(v))
      if (!v) continue
      check(`${tag} 글자 대비 ≥ 4.5`, v.ps.every((x) => x.ratio >= 4.5), v.ps.map((x) => x.ratio).join(' / '))
      check(`${tag} 링크 대비 ≥ 4.5`, v.link && v.link.ratio >= 4.5, String(v.link?.ratio))
      check(`${tag} 링크 rel=noopener target=_blank`, v.link?.rel === 'noopener' && v.link?.target === '_blank')
      check(`${tag} 가로 스크롤 없음`, !v.hscroll)
      const { nodes } = await client.send('Accessibility.getFullAXTree')
      const names = nodes.filter((n) => !n.ignored && n.role?.value === 'link').map((n) => n.name?.value ?? '')
      check(`${tag} 링크 AX 이름 "${linkName}"`, names.includes(linkName), names.filter((n) => /사진|Source|Original/.test(n)).join(' | '))
      console.log(`INFO  ${tag} 이미지 슬롯 = ${v.img} · 줄: ${v.ps.map((x) => x.text).join(' ⏎ ')}`)
      if (kind === 'news') check(`${tag} 연결 불가 핫링크 → 플레이스홀더(현행 동작)`, v.img === 'placeholder', v.img)
      const { data } = await client.send('Page.captureScreenshot', { format: 'png' })
      fs.writeFileSync(`${shots}/${lang}-${kind}-${label}.png`, Buffer.from(data, 'base64'))
    }
  }
})
console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
if (fail > 0) process.exit(1)
