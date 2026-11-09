// (1) §2.4 ko 6줄이 계획·v0.9에서 연속된 한 덩어리로 같은 순서인지, en 6줄이 계획에서 같은 순서인지
// (2) ko 1·3·4번이 계획·v0.9(작업 트리)·v0.9(HEAD, 표준입력으로 받음) 사이에 같은지
// 실행: git show HEAD:planning/v0.9-copy-and-code-list.md | node docs/tools/reviewer-34-1/contiguity-and-items.mjs
import { readFileSync } from 'node:fs';
const head = readFileSync(0, 'utf8').split('\n');
const review = readFileSync('docs/reviews/planner-16-q1-q2-plan-review.md', 'utf8').split('\n');
const plan = readFileSync('planning/q1-redirect-q2-sns-image-plan.md', 'utf8').split('\n');
const v09 = readFileSync('planning/v0.9-copy-and-code-list.md', 'utf8').split('\n');
const strip = l => l.replace(/^>\s?/, '');
const s = review.findIndex(l => l.startsWith('### 2.4'));
const e = review.findIndex((l, i) => i > s && l.startsWith('절 제목은'));
const blk = review.slice(s, e); const ei = blk.findIndex(l => l.startsWith('**en**'));
const ko = blk.slice(0, ei).filter(l => l.startsWith('>')).map(strip).filter(x => x.trim());
const en = blk.slice(ei).filter(l => l.startsWith('>')).map(strip).filter(x => x.trim());
const contiguous = (arr, lines) => { const i = arr.indexOf(lines[0]); return i >= 0 && lines.every((l, k) => arr[i + k] === l) ? i + 1 : -1; };
console.log('ko 연속 일치 시작 행 — 계획:', contiguous(plan, ko), '· v0.9:', contiguous(v09, ko));
const planEn = plan.map(strip);
const enRowIdx = en.map(l => planEn.indexOf(l));
console.log('en 각 줄의 계획 행(1부터):', enRowIdx.map(i => i + 1).join(','), '· 오름차순:', enRowIdx.every((v, i, a) => i === 0 || v > a[i - 1]));
const item = (arr, n) => arr.find(l => l.startsWith(`${n}. `));
for (const n of [1, 3, 4]) {
  const p = item(plan.slice(plan.findIndex(l => l.startsWith('### 2.2'))), n);
  const w = item(v09.slice(v09.findIndex(l => l.startsWith('### 2.2'))), n);
  const h = item(head.slice(head.findIndex(l => l.startsWith('### 2.2'))), n);
  console.log(`ko ${n}번 — 계획=v0.9작업트리: ${p === w} · v0.9작업트리=v0.9 HEAD: ${w === h}`);
}
