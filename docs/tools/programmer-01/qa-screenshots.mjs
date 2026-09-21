/**
 * 로컬 프로덕션 화면 캡처 도구.
 *
 *   node docs/tools/programmer-01/qa-screenshots.mjs <baseUrl> <outDir> <set>
 *   set: main | pagination | hotlink
 *
 * 설치된 Chrome을 헤드리스로 띄우고 DevTools 프로토콜로 뷰포트를 지정해 전체 화면을 캡처한다.
 *
 * ⚠️ `--window-size`만으로는 모바일 폭을 만들 수 없다. macOS에서 창 최소 폭이 500px로 강제되어
 * `--window-size=390`을 줘도 실제 뷰포트는 500px가 되고 스크린샷만 390px로 잘린다(실측 확인).
 * 그래서 Emulation.setDeviceMetricsOverride로 뷰포트를 직접 지정한다.
 * 추가 의존성은 없다 — Node 내장 WebSocket과 fetch만 쓴다.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const DEBUG_PORT = 9333

const TAG = encodeURIComponent('예시사건')

const SETS = {
  main: [
    ['home', '/'],
    ['tag', `/tag/${TAG}`],
    ['post-url', '/post/example-case-a'],
    ['post-photo-text', '/post/example-case-c'],
    ['about', '/about'],
  ],
  pagination: [
    ['feed-page-1', '/'],
    ['feed-page-2', '/?page=2'],
  ],
  hotlink: [
    ['hotlink-card', '/'],
    ['hotlink-detail', '/post/example-hotlink-broken'],
  ],
}

const VIEWPORTS = [
  ['mobile-390', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }],
  ['desktop-1280', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }],
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForDevTools() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)
      if (response.ok) return
    } catch {
      // 아직 안 떴다
    }
    await delay(100)
  }
  throw new Error('Chrome DevTools 엔드포인트가 열리지 않았습니다.')
}

async function firstPageTarget() {
  const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)
  const targets = await response.json()
  const target = targets.find((entry) => entry.type === 'page')
  if (!target) throw new Error('페이지 타깃을 찾지 못했습니다.')
  return target.webSocketDebuggerUrl
}

function createClient(socket) {
  let nextId = 0
  const pending = new Map()
  const waiters = []

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id !== undefined) {
      const entry = pending.get(message.id)
      if (!entry) return
      pending.delete(message.id)
      if (message.error) entry.reject(new Error(`${message.error.message}`))
      else entry.resolve(message.result)
      return
    }
    for (let index = waiters.length - 1; index >= 0; index -= 1) {
      const waiter = waiters[index]
      if (waiter.match(message)) {
        waiters.splice(index, 1)
        waiter.resolve(message.params)
      }
    }
  })

  return {
    send(method, params = {}) {
      const id = (nextId += 1)
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject })
        socket.send(JSON.stringify({ id, method, params }))
      })
    },
    waitFor(match, timeoutMs = 15_000) {
      return new Promise((resolve, reject) => {
        const waiter = { match, resolve }
        waiters.push(waiter)
        setTimeout(() => {
          const index = waiters.indexOf(waiter)
          if (index >= 0) {
            waiters.splice(index, 1)
            reject(new Error('이벤트 대기 시간 초과'))
          }
        }, timeoutMs)
      })
    },
  }
}

async function main() {
  const [baseUrl, outDir, setName = 'main'] = process.argv.slice(2)
  if (!baseUrl || !outDir) {
    console.error('사용법: node qa-screenshots.mjs <baseUrl> <outDir> [main|pagination|hotlink]')
    process.exit(1)
  }
  const targets = SETS[setName]
  if (!targets) {
    console.error(`알 수 없는 세트: ${setName}`)
    process.exit(1)
  }
  if (!fs.existsSync(CHROME)) {
    console.error('🔴 Chrome을 찾지 못했습니다.')
    process.exit(1)
  }

  fs.mkdirSync(outDir, { recursive: true })
  const profileDir = fs.mkdtempSync(path.join(process.env.TMPDIR ?? '/tmp', 'qa-chrome-'))

  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  let count = 0
  try {
    await waitForDevTools()
    const socket = new WebSocket(await firstPageTarget())
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true })
      socket.addEventListener('error', reject, { once: true })
    })
    const client = createClient(socket)
    await client.send('Page.enable')
    await client.send('Page.setLifecycleEventsEnabled', { enabled: true })

    for (const [name, route] of targets) {
      for (const [label, metrics] of VIEWPORTS) {
        await client.send('Emulation.setDeviceMetricsOverride', { ...metrics, screenWidth: metrics.width })
        const loaded = client.waitFor(
          (message) => message.method === 'Page.lifecycleEvent' && message.params.name === 'networkIdle',
        )
        await client.send('Page.navigate', { url: `${baseUrl}${route}` })
        await loaded
        // 폰트·이미지 배치가 끝나고 클라이언트 폴백이 반영될 여유를 준다.
        await delay(600)

        const { cssContentSize } = await client.send('Page.getLayoutMetrics')
        const height = Math.min(Math.ceil(cssContentSize.height), 12_000)
        const { data } = await client.send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width: metrics.width, height, scale: 1 },
        })

        const file = path.join(outDir, `${name}--${label}.png`)
        fs.writeFileSync(file, Buffer.from(data, 'base64'))
        console.log(
          `${path.basename(file)} — ${fs.statSync(file).size.toLocaleString()} bytes (${metrics.width}x${height}) ← ${route}`,
        )
        count += 1
      }
    }
    socket.close()
  } finally {
    // 프로필 폴더는 Chrome이 완전히 종료된 뒤에 지운다(종료 중이면 파일이 다시 생겨 ENOTEMPTY가 난다).
    const exited = new Promise((resolve) => chrome.once('exit', resolve))
    chrome.kill()
    await Promise.race([exited, delay(5000)])
    try {
      fs.rmSync(profileDir, { recursive: true, force: true })
    } catch {
      // 임시 폴더 정리 실패는 캡처 결과에 영향이 없다.
    }
  }

  console.log(`\n캡처 ${count}장 → ${outDir}`)
}

await main()
