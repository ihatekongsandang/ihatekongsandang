// 리뷰 36: C11 moved-ids.ts 가장자리 재현(프로그래머 단위 시험 밖). 저장소 루트에서: npx tsx docs/tools/reviewer-36/c11-edge-checks.ts
// 픽스처는 OS 임시 폴더에 만들고 지운다. 출력에 경로를 쓰지 않는다. id는 zz-* 픽스처만.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  collectMovedIdErrors, movedIdRedirects, parseMovedIds, readMovedIds, readTranslationIds,
} from '../../../src/lib/content/moved-ids'

let total = 0, fails = 0
const check = (label: string, ok: boolean, extra = '') => {
  total++; if (!ok) fails++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${!ok && extra ? `  — ${extra}` : ''}`)
}
const note = (label: string, value: unknown) => console.log(`NOTE  ${label}: ${JSON.stringify(value)}`)

function fixture(opts: { moved: string; retired: string; ko: Record<string, string>; en?: Record<string, string>; images?: string[] }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'r36-'))
  fs.mkdirSync(path.join(root, 'content', 'posts'), { recursive: true })
  fs.writeFileSync(path.join(root, 'content', 'moved-ids.txt'), opts.moved)
  fs.writeFileSync(path.join(root, 'content', 'retired-ids.txt'), opts.retired)
  for (const [name, id] of Object.entries(opts.ko)) fs.writeFileSync(path.join(root, 'content', 'posts', `${name}.md`), `---\nid: ${id}\n---\nbody\n`)
  if (opts.en) {
    fs.mkdirSync(path.join(root, 'content', 'posts-en'), { recursive: true })
    for (const [name, id] of Object.entries(opts.en)) fs.writeFileSync(path.join(root, 'content', 'posts-en', `${name}.md`), `---\nid: ${id}\n---\nbody\n`)
  }
  for (const img of opts.images ?? []) fs.mkdirSync(path.join(root, 'public', 'images', img), { recursive: true })
  return root
}
const cleanup = (root: string) => fs.rmSync(root, { recursive: true, force: true })

// 1. 빈 목록(실제 저장소) → 규칙 0
{
  const moved = readMovedIds()
  const rules = movedIdRedirects(moved, readTranslationIds())
  check('실제 저장소: moved 0건 · 리다이렉트 규칙 0개', moved.size === 0 && rules.length === 0, `${moved.size}/${rules.length}`)
}
// 2. 루프·사슬·자기 자신
{
  check('자기 자신(a a) → [c]', parseMovedIds('zz-a zz-a\n').errors.some((e) => e.includes('[c]')))
  check('2단 순환(a b / b a) → [g]', parseMovedIds('zz-a zz-b\nzz-b zz-a\n').errors.filter((e) => e.includes('[g]')).length >= 1)
  check('사슬(a b / b c) → [g]', parseMovedIds('zz-a zz-b\nzz-b zz-c\n').errors.some((e) => e.includes('[g]')))
  check('3단 순환(a b / b c / c a) → [g]', parseMovedIds('zz-a zz-b\nzz-b zz-c\nzz-c zz-a\n').errors.filter((e) => e.includes('[g]')).length === 3)
  check('두 옛 id → 같은 새 id(a c / b c)는 허용', parseMovedIds('zz-a zz-c\nzz-b zz-c\n').errors.length === 0)
  check('줄 끝 주석·탭 구분 허용', parseMovedIds('zz-a\tzz-c   # 메모\n').entries.length === 1)
  check('CRLF 줄도 받는다', parseMovedIds('zz-a zz-c\r\n').entries.length === 1)
}
// 3. retired 충돌: 새 id가 retired → [f], 옛 id가 retired 아님 → [d]
{
  const root = fixture({ moved: 'zz-old zz-new\n', retired: 'zz-new\n', ko: { 'zz-new': 'zz-new' } })
  const errs = collectMovedIdErrors(root)
  check('새 id가 retired-ids에 있음 → [f]', errs.some((e) => e.includes('[f]') && e.includes('retired')))
  check('옛 id가 retired-ids에 없음 → [d]', errs.some((e) => e.includes('[d]')))
  cleanup(root)
}
// 4. 정상 이전 → 오류 0, 영어 분기
{
  const root = fixture({ moved: 'zz-old zz-new\n', retired: 'zz-old\n', ko: { 'zz-new': 'zz-new' }, en: { 'zz-new': 'zz-new' } })
  check('정상 이전 → 오류 0', collectMovedIdErrors(root).length === 0, JSON.stringify(collectMovedIdErrors(root)))
  const rules = movedIdRedirects(readMovedIds(root), readTranslationIds(root))
  check('규칙 2개 · en→/en/post/새 · 모두 permanent', rules.length === 2 && rules[1]!.destination === '/en/post/zz-new' && rules.every((r) => r.permanent))
  check('규칙 source가 목적지와 같지 않음(자기 이동 0)', rules.every((r) => r.source !== r.destination))
  cleanup(root)
}
// 5. 🔎 f의 판단 근거: 파일명만 새 id이고 frontmatter id가 다른 경우(파일명≠id는 검증에서 경고뿐)
{
  const root = fixture({ moved: 'zz-old zz-new\n', retired: 'zz-old\n', ko: { 'zz-new': 'zz-new-typo' } })
  const errs = collectMovedIdErrors(root)
  note('파일명=zz-new · frontmatter id=zz-new-typo 일 때 collectMovedIdErrors', errs)
  check('[관찰] 새 id 게시물의 frontmatter id가 없으면 f가 막는가', errs.some((e) => e.includes('[f]')), '파일명만으로 f 통과 → /post/zz-new 는 404로 이동(파일명≠id는 경고만)')
  cleanup(root)
}
// 6. readTranslationIds: 영어본 frontmatter가 깨진 경우 next.config 단계에서 던지는가
{
  const root = fixture({ moved: '# 주석뿐\n', retired: '', ko: {}, en: {} })
  fs.writeFileSync(path.join(root, 'content', 'posts-en', 'zz-bad.md'), '---\nid: [unclosed\n---\n')
  let threw = false
  try { readTranslationIds(root) } catch { threw = true }
  note('moved 0건인데 영어본 frontmatter 깨짐 → readTranslationIds 던짐', threw)
  cleanup(root)
}
console.log(`합계 ${total}건 · PASS ${total - fails} · FAIL ${fails}`)
