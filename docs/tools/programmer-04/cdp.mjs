/**
 * 헤드리스 Chrome + DevTools 프로토콜 최소 클라이언트(추가 의존성 없음 — Node 내장 WebSocket·fetch).
 * docs/tools/programmer-01/qa-screenshots.mjs 의 방식을 그대로 따른다.
 * ⚠️ macOS 창 최소 폭 때문에 `--window-size`로는 모바일 폭을 만들 수 없어 Emulation으로 뷰포트를 지정한다.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createClient(socket) {
  let nextId = 0
  const pending = new Map()
  const waiters = []
  const listeners = []

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
    for (const listener of listeners) listener(message)
    for (let index = waiters.length - 1; index >= 0; index -= 1) {
      const waiter = waiters[index]
      if (waiter.match(message)) {
        waiters.splice(index, 1)
        waiter.resolve(message.params)
      }
    }
  })

  const client = {
    send(method, params = {}) {
      const id = (nextId += 1)
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject })
        socket.send(JSON.stringify({ id, method, params }))
      })
    },
    on(listener) {
      listeners.push(listener)
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
    /** 페이지 안에서 식을 평가해 값을 돌려받는다. 예외는 그대로 던진다. */
    async evaluate(expression) {
      const result = await client.send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      })
      if (result.exceptionDetails) {
        throw new Error(`평가 실패: ${result.exceptionDetails.exception?.description ?? result.exceptionDetails.text}`)
      }
      return result.result.value
    },
    async setViewport(width, height, mobile) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile,
        screenWidth: width,
        screenHeight: height,
      })
    },
    async navigate(url) {
      // 같은 URL로 다시 이동할 때 networkIdle 수명 주기 이벤트가 오지 않는 경우가 있어(실측) load 이벤트로 기다린다.
      const loaded = client.waitFor((message) => message.method === 'Page.loadEventFired')
      await client.send('Page.navigate', { url })
      await loaded
      // 하이드레이션·저장소 반영 여유.
      await delay(600)
    },
  }
  return client
}

/**
 * Chrome을 띄워 페이지 하나에 붙은 클라이언트를 넘겨주고, 끝나면 Chrome과 임시 프로필을 정리한다.
 * 프로필은 매번 새로 만든다 — sessionStorage 등 이전 상태가 남지 않는다.
 */
export async function withChrome(port, run) {
  if (!fs.existsSync(CHROME)) {
    console.error('🔴 Chrome을 찾지 못했습니다.')
    process.exit(1)
  }
  const profileDir = fs.mkdtempSync(path.join(process.env.TMPDIR ?? '/tmp', 'qa-chrome-'))
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  try {
    let ready = false
    for (let attempt = 0; attempt < 100 && !ready; attempt += 1) {
      try {
        ready = (await fetch(`http://127.0.0.1:${port}/json/version`)).ok
      } catch {
        await delay(100)
      }
    }
    if (!ready) throw new Error('Chrome DevTools 엔드포인트가 열리지 않았습니다.')

    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const target = targets.find((entry) => entry.type === 'page')
    const socket = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true })
      socket.addEventListener('error', reject, { once: true })
    })
    const client = createClient(socket)
    await client.send('Page.enable')
    await client.send('Page.setLifecycleEventsEnabled', { enabled: true })
    await client.send('Runtime.enable')
    await client.send('Log.enable')
    await client.send('Network.enable')
    // 테스트 중 외부로 나가는 요청은 막는다(캠페인 사이트·GA 스크립트).
    await client.send('Network.setBlockedURLs', {
      urls: ['*signforkorea.com*', '*googletagmanager.com*', '*google-analytics.com*'],
    })
    try {
      return await run(client)
    } finally {
      socket.close()
    }
  } finally {
    const exited = new Promise((resolve) => chrome.once('exit', resolve))
    chrome.kill()
    await Promise.race([exited, delay(5000)])
    try {
      fs.rmSync(profileDir, { recursive: true, force: true })
    } catch {
      // 임시 폴더 정리 실패는 결과에 영향이 없다.
    }
  }
}
