// 리뷰어 36-1 — 프로그래머 16-1 결정 2(gray-matter 캐시) 재현. 사용(저장소 루트): node docs/tools/reviewer-36-1/gray-matter-cache-check.mjs
import matter from 'gray-matter'
const broken = '---\nid: [깨진\n---\nbody\n'
const tryParse = (opts) => { try { opts === undefined ? matter(broken) : matter(broken, opts); return '안 던짐' } catch { return '던짐' } }
matter.clearCache?.()
console.log(`옵션 없음 1회째: ${tryParse()}`)
console.log(`옵션 없음 2회째: ${tryParse()}`)
console.log(`옵션 {} 1회째(옵션 없이 읽은 뒤): ${tryParse({})}`)
console.log(`옵션 {} 2회째: ${tryParse({})}`)
