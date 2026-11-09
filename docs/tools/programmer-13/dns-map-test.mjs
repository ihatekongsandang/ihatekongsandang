/**
 * hotlink-cases.mjs 전용 프리로드(프로그래머 14-1) — `*.example.test` 이름만 127.0.0.1로 풀어 준다.
 * 리뷰 31 P3-2로 news `src`의 사설·루프백 IP 주소가 검증에서 거부되므로, 로컬 https 테스트 서버를
 * IP가 아니라 예약 테스트 도메인 이름(RFC 2606 `.test`)으로 가리키기 위해 쓴다. 다른 이름은 원래 조회로 넘긴다.
 * 운영 코드(`scripts/check-hotlinks.ts`)는 바꾸지 않는다 — 이 파일은 NODE_OPTIONS=--import 로 테스트 실행에만 붙는다.
 */
import dns from 'node:dns'

const original = dns.lookup
dns.lookup = function lookup(hostname, options, callback) {
  const cb = typeof options === 'function' ? options : callback
  const opts = typeof options === 'object' && options !== null ? options : {}
  if (typeof hostname === 'string' && hostname.endsWith('.example.test')) {
    if (opts.all) return process.nextTick(cb, null, [{ address: '127.0.0.1', family: 4 }])
    return process.nextTick(cb, null, '127.0.0.1', 4)
  }
  return original.call(dns, hostname, options, callback)
}
