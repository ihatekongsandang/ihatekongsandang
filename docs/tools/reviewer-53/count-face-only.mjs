// 리뷰어 53 — 업로더 03~16 트리거의 ③ 건별 행 전수 집계
// 사용: node docs/tools/reviewer-53/count-face-only.mjs [--rows]
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const dir = 'docs/triggers';
const files = readdirSync(dir).filter(f => /^uploader-(0[3-9]|1[0-6])-sns-image-batch-\d+-COMPLETE\.md$/.test(f)).sort();
const showRows = process.argv.includes('--rows');
let tot = { rows: 0, r2: 0, r3: 0, k9: 0, k2: 0, either: 0, stage0: 0 };
const out = [];
for (const f of files) {
  const up = f.match(/^uploader-(\d+)/)[1];
  const batch = f.match(/batch-(\d+)/)[1];
  const lines = readFileSync(join(dir, f), 'utf8').split('\n');
  let r2 = 0, r3 = 0;
  for (const [i, l] of lines.entries()) {
    const m = l.match(/^\|\s*(\d+)\s*\|\s*(\d{4}-\d{2}-\d{2}-[^|]+?)\s*\|([^|]*)\|([^|]*)\|(.*)$/);
    if (!m) continue;
    const res = m[4];
    const is3 = res.includes('③'), is2 = res.includes('②');
    if (!is3 && !is2) continue;
    tot.rows++;
    if (is2 && !is3) { r2++; continue; }
    r3++;
    const body = m[5];
    const k9 = /9항/.test(body) || /신원 미확인/.test(body);
    const k2 = /2항/.test(body) || /정면 얼굴/.test(body) || /일반 시민/.test(body);
    const s0 = /즉시/.test(res);
    if (k9) tot.k9++; if (k2) tot.k2++; if (k9 || k2) tot.either++; if (s0) tot.stage0++;
    out.push([`b${batch}/u${up}-#${m[1]}`, m[2].trim(), s0 ? 'stage0' : 'B-tried', k9 ? '9' : '-', k2 ? '2' : '-', `L${i + 1}`].join('\t'));
  }
  tot.r2 += r2; tot.r3 += r3;
  console.log(`${f}\t②${r2}\t③${r3}`);
}
console.log(JSON.stringify(tot));
if (showRows) console.log(out.join('\n'));
