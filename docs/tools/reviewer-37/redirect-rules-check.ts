// 리뷰어 37: next.config.ts와 같은 경로로 리다이렉트 규칙을 만들어 기대값과 대조한다.
// 옛 id는 git 이력의 삭제된 옛 파일명에서 읽어 변수로만 쓰고 출력에는 "<OLD>"로 가린다.
import { execSync } from 'node:child_process'
import { movedIdRedirects, readMovedIds, readTranslationIds, collectMovedIdErrors } from '../../../src/lib/content/moved-ids'
import type { RedirectRule } from '../../../src/lib/content/moved-ids'

const root = process.cwd()
const NEW = '2026-08-06-owloffreedom-707-commander-sentencing'
// 커밋 뒤에도 동작하도록 git 이력에서 삭제된 #1 옛 파일명을 찾는다(새 id 파일은 제외).
const names = execSync('git log --no-renames --diff-filter=D --format= --name-only -- content/posts/', { encoding: 'utf8' })
  .split('\n').filter((l) => l.includes('2026-08-06-owloffreedom-') && !l.includes(NEW))
const first = names[0]
if (names.length !== 1 || first === undefined) throw new Error(`HEAD 옛 파일 수 ${names.length}`)
const OLD = first.replace(/^.*\//, '').replace(/\.md$/, '')
if (OLD === NEW || OLD === '') throw new Error('옛 id를 찾지 못함')
const mask = (s: string) => s.split(OLD).join('<OLD>')

const moved = readMovedIds(root)
const tids = readTranslationIds(root, moved)
const rules = movedIdRedirects(moved, tids)
console.log('moved entries:', moved.size)
console.log('rules:', rules.length)
for (const r of rules) console.log(mask(JSON.stringify(r)))
const expected = [
  { source: `/post/${OLD}`, destination: `/post/${NEW}` },
  { source: `/en/post/${OLD}`, destination: `/en/post/${NEW}` },
]
let ok = rules.length === 2
for (const e of expected) {
  const hit: RedirectRule | undefined = rules.find((r: RedirectRule) => r.source === e.source)
  const pass = hit !== undefined && hit.destination === e.destination && hit.permanent === true
  console.log(pass ? 'PASS' : 'FAIL', mask(e.source), '->', e.destination)
  ok = ok && pass
}
console.log('en translation exists for new id:', tids.has(NEW))
const errs = collectMovedIdErrors(root)
console.log('collectMovedIdErrors:', errs.length)
console.log(ok && errs.length === 0 ? 'ALL PASS' : 'FAILED')
process.exit(ok && errs.length === 0 ? 0 : 1)
