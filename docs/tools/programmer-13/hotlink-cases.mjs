/**
 * (프로그래머 15 갱신: C2로 news `caption`이 필수가 되어 정상 케이스 픽스처에 caption 한 줄만 넣었다 — 없으면 전부 "검증 실패로 건너뜀"이 된다. 검사 항목·기대값은 같다.)
 * 프로그래머 13 — `check:hotlinks` 판정 경로 전수 확인(정상·404·이미지 아님·HEAD 거부→GET·시간 초과·네트워크 오류).
 * 외부 서버에 묻지 않는다: 127.0.0.1에 자체 서명 https 서버를 띄우고(주소는 `img.example.test` 이름 + DNS 프리로드 — 프로그래머 14-1), 임시 폴더에 그 주소를 쓰는 news 픽스처를 만든 뒤
 * 스크립트를 실행해 출력과 종료 코드를 확인한다(자체 서명 인증서라 이 실행에서만 NODE_TLS_REJECT_UNAUTHORIZED=0).
 * 사용(저장소 루트): node docs/tools/programmer-13/hotlink-cases.mjs   (openssl 필요)
 */
import { execFile, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import https from 'node:https'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hotlink-'))
const key = path.join(tmp, 'key.pem')
const cert = path.join(tmp, 'cert.pem')
execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-keyout', key, '-out', cert, '-days', '1', '-subj', '/CN=127.0.0.1'], { stdio: 'ignore' })

const seen = []
const server = https.createServer({ key: fs.readFileSync(key), cert: fs.readFileSync(cert) }, (req, res) => {
  seen.push(`${req.method} ${req.url} referer=${req.headers.referer ?? '-'}`)
  if (req.url === '/ok.jpg') { res.writeHead(200, { 'content-type': 'image/jpeg' }); res.end(req.method === 'GET' ? Buffer.alloc(10) : undefined); return }
  if (req.url === '/head-405.jpg') {
    if (req.method === 'HEAD') { res.writeHead(405); res.end(); return }
    res.writeHead(200, { 'content-type': 'image/png' }); res.end(Buffer.alloc(10)); return
  }
  if (req.url === '/html.jpg') { res.writeHead(200, { 'content-type': 'text/html' }); res.end('<p>x</p>'); return }
  if (req.url === '/slow.jpg') { setTimeout(() => { res.writeHead(200, { 'content-type': 'image/jpeg' }); res.end() }, 3000); return }
  res.writeHead(404, { 'content-type': 'text/plain' }); res.end('nf')
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const port = server.address().port
// 리뷰 31 P3-2 뒤로 사설·루프백 IP는 검증에서 거부된다 → 예약 테스트 도메인 이름 + DNS 프리로드(dns-map-test.mjs)로 127.0.0.1을 가리킨다(프로그래머 14-1).
const base = `https://img.example.test:${port}`

const postsDir = path.join(tmp, 'posts')
fs.mkdirSync(postsDir)
const cases = { ok: '/ok.jpg', missing: '/missing.jpg', html: '/html.jpg', head405: '/head-405.jpg', slow: '/slow.jpg', dns: null }
for (const [name, p] of Object.entries(cases)) {
  const src = p ? `${base}${p}` : 'https://img.example.invalid/x.jpg'
  fs.writeFileSync(path.join(postsDir, `case-${name}.md`), `---
id: case-${name}
title: 케이스 ${name}
description: 핫링크 점검 케이스
publishedAt: 2026-11-09
sourceType: url
sourceUrl: https://www.example.com/p/${name}
attribution: 예시
image:
  kind: news
  src: ${src}
  alt: 예시
  caption: 2026년 11월 예시 건물 외관(원 기사 사진 설명 기준).
  creditName: 예시일보
  creditNameEn: Example Daily
  sourcePageUrl: https://news.example.org/${name}
  retrievedAt: 2026-11-09
  faceNote: 얼굴 없음
sources:
  - type: 언론
    name: 예시일보
    url: https://news.example.org/${name}
    date: 2026-11-08
---
`)
}
// 검증 실패 news 게시물(건너뜀 표시 확인)
fs.writeFileSync(path.join(postsDir, 'case-invalid.md'), `---
id: case-invalid
title: t
description: d
publishedAt: 2026-11-09
sourceType: url
sourceUrl: https://www.example.com/p
attribution: x
image:
  kind: news
  src: http://insecure.example.org/x.jpg
  alt: a
---
`)

// 이 프로세스가 서버 응답을 맡고 있어 동기 실행(spawnSync)은 쓰지 않는다.
const run = await new Promise((resolve) => {
  execFile('npx', ['tsx', 'scripts/check-hotlinks.ts', postsDir, '--timeout', '1500'],
    { env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0', NEXT_PUBLIC_SITE_URL: 'https://site.example.com', NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --import ${pathToFileURL(path.resolve('docs/tools/programmer-13/dns-map-test.mjs')).href}`.trim() } },
    (error, stdout) => resolve({ code: error ? error.code : 0, stdout }))
})
server.close()
const out = run.stdout.replaceAll(base, '<local>').replaceAll(postsDir, '<tmp>/posts')
console.log(out)
let pass = 0
let fail = 0
const check = (label, ok) => {
  if (ok) pass += 1
  else fail += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
}
check('종료 코드 0(깨진 항목이 있어도)', run.code === 0)
check('점검 6건(검증 실패 1건은 건너뜀)', /점검 6건 · 정상 2건 · 깨짐 4건 · 건너뜀 1건/.test(out))
check('정상: ok(HEAD 200 image/jpeg)', /OK {4}case-ok\.md — HEAD 200 image\/jpeg/.test(out))
check('정상: HEAD 405 → GET 200 image/png', /OK {4}case-head405\.md — GET 200 image\/png/.test(out))
check('깨짐: 404', /BROKEN {2}case-missing\.md .*HTTP 404/.test(out))
check('깨짐: 이미지 아님(text/html)', /BROKEN {2}case-html\.md .*이미지가 아님\(content-type: text\/html\)/.test(out))
check('깨짐: 시간 초과', /BROKEN {2}case-slow\.md .*시간 초과\(1500ms\)/.test(out))
check('깨짐: 네트워크 오류(DNS)', /BROKEN {2}case-dns\.md .*네트워크 오류/.test(out))
check('건너뜀: 검증 실패 news', /case-invalid\.md: 검증 실패로 건너뜀/.test(out))
check('Referer = 사이트 출처만(https://site.example.com/)', seen.length > 0 && seen.every((s) => s.endsWith('referer=https://site.example.com/')))
console.log(`서버가 받은 요청 ${seen.length}건:\n  ${seen.join('\n  ')}`)
console.log(`\n합계 ${pass + fail}건 · PASS ${pass} · FAIL ${fail}`)
fs.rmSync(tmp, { recursive: true, force: true })
if (fail > 0) process.exit(1)
