/**
 * 리뷰어 11 — 두 빌드 HTML의 RSC 페이로드에서 문자열 children 값 multiset 차이를 파일마다 뽑아 같은 차이끼리 묶는다(행 재번호에 영향받지 않음).
 *   node docs/tools/reviewer-11/rsc-children-diff.mjs <A app 폴더> <B app 폴더>
 */
import fs from 'node:fs'; import path from 'node:path'
const [a,b]=process.argv.slice(2)
const list=(r)=>{const o=[];const w=(d)=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())w(f);else if(e.name.endsWith('.html'))o.push(path.relative(r,f))}};w(r);return o.sort()}
const vals=(h)=>{const p=[...h.matchAll(/<script>self\.__next_f\.push\(([\s\S]*?)\)<\/script>/g)].map(m=>m[1]).join('');const m=new Map();for(const x of p.matchAll(/\\"children\\":\\"((?:[^"\\]|\\\\.)*?)\\"/g)){const v=x[1];if(v.startsWith('$'))continue;m.set(v,(m.get(v)||0)+1)};return m}
const sig=new Map(); let n=0
for(const f of list(a)){const A=vals(fs.readFileSync(path.join(a,f),'utf8')),B=vals(fs.readFileSync(path.join(b,f),'utf8'));const d=[];for(const [k,c] of A){const cb=B.get(k)||0;if(cb!==c)d.push(`${k}:${c}->${cb}`)}for(const [k,c] of B)if(!A.has(k))d.push(`${k}:0->${c}`);const s=d.sort().join(' | ');sig.set(s,(sig.get(s)||[]).concat(f));n++}
console.log('파일',n); for(const [s,fs2] of sig) console.log(fs2.length+'개', fs2.slice(0,3).join(','), '=>', s||'(차이 없음)')
