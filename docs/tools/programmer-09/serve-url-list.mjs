// 프로그래머 09 — 대비 전수 측정용 URL 목록을 CORS 허용으로 내주는 임시 서버(포트 3110).
// 사용: node docs/tools/programmer-09/serve-url-list.mjs <urls.json>
// urls.json = chip-html-snapshot.mjs dump 결과의 파일 키를 경로로 바꾼 배열(README 참조).
import http from 'node:http'
import fs from 'node:fs'
const file = process.argv[2]
http
  .createServer((q, r) => {
    r.writeHead(200, { 'access-control-allow-origin': '*', 'content-type': 'application/json' })
    r.end(fs.readFileSync(file))
  })
  .listen(3110)
