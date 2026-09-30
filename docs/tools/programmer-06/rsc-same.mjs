/**
 * 프로그래머 06 — 두 빌드의 HTML 속 RSC 페이로드(`self.__next_f.push`) 전수 비교, 클라이언트 청크 참조만 정규화.
 *
 * 사용: node docs/tools/programmer-06/rsc-same.mjs <A .next/server/app> <B .next/server/app>   (SHOW=파일.html 이면 첫 차이 출력)
 *
 * 클라이언트 컴포넌트 파일(post-card·card-media·i18n)이 바뀌면 그 청크 번호가 바뀌어 RSC의 모듈 참조 행
 * `I[모듈,["청크","파일",…],"이름"]`의 청크 목록이 모든 피드 페이지에서 달라진다. 이 목록과 빌드 ID만 `*`로 바꾼 뒤
 * 나머지(컴포넌트 트리·props·카드 데이터)가 같은지 본다. 두 빌드는 같은 조건(같은 경로 구조·같은 node_modules)에서 만들어야 한다
 * — 모듈 번호 자체가 경로에 따라 달라진다(스크래치 심볼릭 링크 빌드 ↔ 저장소 빌드는 비교 불가, 실측).
 */
import fs from 'node:fs'
import path from 'node:path'

const [a, b] = process.argv.slice(2)
const list = (root) => {
  const out = []
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name)
      if (e.isDirectory()) walk(f)
      else if (e.name.endsWith('.html')) out.push(path.relative(root, f))
    }
  }
  walk(root)
  return out.sort()
}
const rsc = (html) =>
  [...html.matchAll(/self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g)]
    .map((m) => m[1])
    .join('\n')
    .replace(/I\[\d+,\[[^\]]*\]/g, 'I[*,[*]')
    .replace(/\\"b\\":\\"[A-Za-z0-9_-]+\\"/g, 'BUILD_ID')
    .replace(/\/_next\/static\/[^"'\\)\s]+/g, '/_next/static/*')
const files = list(a)
const bset = new Set(list(b))
let same = 0
const diff = []
for (const f of files) {
  if (!bset.has(f)) continue
  const x = rsc(fs.readFileSync(path.join(a, f), 'utf8'))
  const y = rsc(fs.readFileSync(path.join(b, f), 'utf8'))
  if (x === y) same += 1
  else {
    diff.push(f)
    if (process.env.SHOW === f) {
      let i = 0
      while (x[i] === y[i]) i += 1
      console.log(`== ${f} @${i}\n- ${x.slice(Math.max(0, i - 200), i + 200)}\n+ ${y.slice(Math.max(0, i - 200), i + 200)}`)
    }
  }
}
console.log(`RSC(청크 참조 정규화) 동일 ${same}/${files.length} · 차이 ${diff.length}${diff.length ? ` — ${diff.slice(0, 20).join(', ')}` : ''}`)
process.exit(diff.filter((f) => !(f === 'en.html' || f.startsWith('en/'))).length ? 1 : 0)
