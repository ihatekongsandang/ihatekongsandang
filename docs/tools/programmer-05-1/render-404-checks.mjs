/**
 * 프로그래머 05-1 — 404 경로 6개의 하이드레이션 후 화면을 3폭에서 단언한다(리뷰어 10 D1 수정 확인).
 *   node docs/tools/programmer-05-1/render-404-checks.mjs <baseUrl>
 * 경로마다 기대값: `<html lang>` · h1 · 헤더/푸터/main#main 유무 · 배너 유무 · 언어 전환 nav 1개 · 가로 넘침 0 ·
 * 콘솔 오류 0(문서 자체의 404 응답 로그는 제외 — 404 페이지라 당연히 난다).
 * 실패가 하나라도 있으면 종료 코드 1.
 */
import { delay, withChrome } from '../programmer-04/cdp.mjs'

const base = process.argv[2]
if (!base) {
  console.error('사용: node docs/tools/programmer-05-1/render-404-checks.mjs <baseUrl>')
  process.exit(2)
}
const KO = { lang: 'ko', h1: '페이지를 찾을 수 없습니다', banner: true, home: '/' }
const EN = { lang: 'en', h1: 'Page not found', banner: false, home: '/en' }
const cases = [
  ['/?page=999', KO],
  ['/tag/dmz?page=99', KO],
  ['/en?page=99', EN],
  ['/page/999', KO],
  ['/post/no-such', KO],
  ['/en/post/no-such', KO], // 경로 자체가 없는 요청 — 전역 404(정적, 한국어 + 영어 안내 한 줄)
]
const widths = [[320, 640, true], [390, 844, true], [1280, 900, false]]

let passed = 0
const failures = []
function check(name, ok, detail) {
  if (ok) passed += 1
  else failures.push(`${name} — ${detail}`)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : ` — ${detail}`}`)
}

await withChrome(9371, async (client) => {
  let logs = []
  client.on((message) => {
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      logs.push({ text: message.params.args.map((a) => a.value ?? a.description ?? '').join(' '), url: '' })
    }
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
      logs.push({ text: message.params.entry.text, url: message.params.entry.url ?? '' })
    }
    if (message.method === 'Runtime.exceptionThrown') {
      logs.push({ text: message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text, url: '' })
    }
  })
  for (const [width, height, mobile] of widths) {
    await client.setViewport(width, height, mobile)
    for (const [path, want] of cases) {
      logs = []
      const url = base + path
      await client.navigate(url)
      await delay(800)
      const info = await client.evaluate(`(() => ({
        lang: document.documentElement.getAttribute('lang'),
        h1: document.querySelector('h1')?.textContent ?? null,
        h1Count: document.querySelectorAll('h1').length,
        header: document.querySelectorAll('body > header').length,
        footer: document.querySelectorAll('body > footer').length,
        main: document.querySelectorAll('main#main').length,
        skip: document.querySelector('body > a[href="#main"]') !== null,
        banner: document.querySelector('aside[aria-label="외부 링크 안내"]') !== null,
        langNav: document.querySelectorAll('header nav a[hreflang], header nav [aria-current="true"]').length,
        homeLink: [...document.querySelectorAll('main a')].map((a) => a.getAttribute('href')),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }))()`)
      const label = `${path} @${width}`
      check(`${label} lang`, info.lang === want.lang, `실제 ${info.lang}`)
      check(`${label} h1`, info.h1 === want.h1 && info.h1Count === 1, `실제 ${info.h1} (${info.h1Count}개)`)
      check(`${label} 헤더·main·푸터·건너뛰기`, info.header === 1 && info.footer === 1 && info.main === 1 && info.skip, JSON.stringify(info))
      check(`${label} 배너 ${want.banner ? '있음' : '없음'}`, info.banner === want.banner, `실제 ${info.banner}`)
      check(`${label} 언어 전환 nav`, info.langNav === 2, `실제 ${info.langNav}`)
      check(`${label} 홈 링크 ${want.home}`, info.homeLink[0] === want.home, `실제 ${info.homeLink.join(',')}`)
      check(`${label} 가로 넘침 0`, info.overflow <= 0, `실제 ${info.overflow}px`)
      const errors = logs.filter((log) => !(log.url === url && /404/.test(log.text)))
      check(`${label} 콘솔 오류 0`, errors.length === 0, errors.map((e) => `${e.text} ${e.url}`).join(' | '))
    }
  }
})

console.log(`\n검사 ${passed + failures.length}개 · 통과 ${passed} · 실패 ${failures.length}`)
process.exit(failures.length ? 1 : 0)
