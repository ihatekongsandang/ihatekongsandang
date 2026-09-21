/**
 * 리뷰어 04 키보드 탐색 실측 — Tab을 N회 눌러 포커스 순서와 포커스 인디케이터(outline)를 기록한다.
 *   node keyboard-tab.mjs <url> <tabCount>
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const DEBUG_PORT = 9334
const [url, tabCountRaw = '14'] = process.argv.slice(2)
const tabCount = Number(tabCountRaw)

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForDevTools() {
  for (let i = 0; i < 100; i += 1) {
    try {
      const r = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)
      if (r.ok) return
    } catch {}
    await delay(100)
  }
  throw new Error('devtools not up')
}

function createClient(socket) {
  let nextId = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const m = JSON.parse(event.data)
    if (m.id !== undefined && pending.has(m.id)) {
      const e = pending.get(m.id)
      pending.delete(m.id)
      m.error ? e.reject(new Error(m.error.message)) : e.resolve(m.result)
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
  }
}

const profileDir = fs.mkdtempSync(path.join(process.env.TMPDIR ?? '/tmp', 'kb-chrome-'))
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profileDir}`, 'about:blank'], { stdio: 'ignore' })

try {
  await waitForDevTools()
  const targets = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()
  const socket = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
  await new Promise((res, rej) => { socket.addEventListener('open', res, { once: true }); socket.addEventListener('error', rej, { once: true }) })
  const c = createClient(socket)
  await c.send('Page.enable')
  await c.send('Runtime.enable')
  await c.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false })
  await c.send('Page.navigate', { url })
  await delay(2500)
  const probe = `(() => {
    const el = document.activeElement
    if (!el) return 'none'
    const cs = getComputedStyle(el)
    const card = el.closest('[data-slot="card"]')
    const cardCs = card ? getComputedStyle(card) : null
    const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\\s+/g,' ').trim().slice(0,40)
    return [el.tagName, el.getAttribute('href') || '', JSON.stringify(text), 'outline=' + cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, card ? 'cardOutline=' + cardCs.outlineStyle + ' ' + cardCs.outlineWidth + ' ' + cardCs.outlineColor : ''].join(' | ')
  })()`
  for (let i = 1; i <= tabCount; i += 1) {
    await c.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await c.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await delay(120)
    const { result } = await c.send('Runtime.evaluate', { expression: probe, returnByValue: true })
    console.log(`Tab ${String(i).padStart(2)}: ${result.value}`)
  }
  socket.close()
} finally {
  const exited = new Promise((r) => chrome.once('exit', r))
  chrome.kill()
  await Promise.race([exited, delay(5000)])
  try { fs.rmSync(profileDir, { recursive: true, force: true }) } catch {}
}
