// 리뷰어 53 — 기획자 17 트리거 "대상 찾는 방법 1"의 키워드(9항·2항·신원 미확인·정면 얼굴)로 ③ 117행 전수 재집계
import { readFileSync, readdirSync } from 'node:fs';
const dir = 'docs/triggers';
const files = readdirSync(dir).filter(f => /^uploader-(0[3-9]|1[0-6])-sns-image-batch-\d+-COMPLETE\.md$/.test(f)).sort();
const kw = { '9항': /(^|[^0-9.])([0-9]+·)*9(·[0-9]+)*항/, '2항': /(^|[^0-9.])2(·[0-9]+)*항/, '신원 미확인': /신원 미확인/, '정면 얼굴': /정면 얼굴/ };
const c = Object.fromEntries(Object.keys(kw).map(k => [k, 0]));
let n3 = 0, k9 = 0, k2 = 0, union = 0; const ids = [];
for (const f of files) {
  const u = f.match(/^uploader-(\d+)/)[1], b = f.match(/batch-(\d+)/)[1];
  for (const l of readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
    const m = l.match(/^\|\s*(\d+)\s*\|\s*(\d{4}-\d{2}-\d{2}-[^|]+?)\s*\|([^|]*)\|([^|]*)\|(.*)$/);
    if (!m || !m[4].includes('③')) continue;
    n3++;
    const body = m[5]; let any = false;
    for (const [k, re] of Object.entries(kw)) if (re.test(body)) { c[k]++; any = true; }
    if (/(^|[^0-9.])([0-9]+·)*9(·[0-9]+)*항/.test(body)) k9++; if (/(^|[^0-9.])2(·[0-9]+)*항/.test(body)) k2++;
    if (any) { union++; ids.push(`b${b}/u${u}-#${m[1]}`); }
  }
}
console.log({ n3, ...c, only9hang: k9, only2hang: k2, union });
console.log(ids.join(' '));
