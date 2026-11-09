// 리뷰 34 §2.4 정정 문안(ko 2번·en) 줄들이 계획 문서 §2.2·v0.9 §2.2에 글자 그대로 있는지 대조한다.
// 실행: node docs/tools/reviewer-34-1/compare-24-text.mjs (저장소 루트에서)
import { readFileSync } from 'node:fs';
const review = readFileSync('docs/reviews/planner-16-q1-q2-plan-review.md', 'utf8').split('\n');
const plan = readFileSync('planning/q1-redirect-q2-sns-image-plan.md', 'utf8').split('\n');
const v09 = readFileSync('planning/v0.9-copy-and-code-list.md', 'utf8').split('\n');
const start = review.findIndex(l => l.startsWith('### 2.4'));
const end = review.findIndex((l, i) => i > start && l.startsWith('절 제목은'));
const block = review.slice(start, end);
const enIdx = block.findIndex(l => l.startsWith('**en**'));
const strip = l => l.replace(/^>\s?/, '');
const ko = block.slice(0, enIdx).filter(l => l.startsWith('>')).map(strip).filter(s => s.trim());
const en = block.slice(enIdx).filter(l => l.startsWith('>')).map(strip).filter(s => s.trim());
// 계획 문서 §2.2 범위
const s22 = plan.findIndex(l => l.startsWith('### 2.2'));
const s23 = plan.findIndex(l => l.startsWith('### 2.3'));
const planSec = plan.slice(s22, s23);
const planKo = planSec; // ko는 인용부호 없이 본문
const planEn = planSec.filter(l => l.startsWith('>')).map(strip);
const v22 = v09.findIndex(l => l.startsWith('### 2.2'));
const v23 = v09.findIndex(l => l.startsWith('### 2.3'));
const vSec = v09.slice(v22, v23);
const has = (arr, s) => arr.some(l => l === s);
const hasTrim = (arr, s) => arr.some(l => l.trim() === s.trim());
let out = [];
const report = (label, lines, arr) => {
  let exact = 0, trimOnly = 0, miss = 0;
  for (const s of lines) {
    if (has(arr, s)) exact++;
    else if (hasTrim(arr, s)) { trimOnly++; out.push(`  [${label}] 앞뒤 공백만 다름: ${s.slice(0, 40)}…`); }
    else { miss++; out.push(`  [${label}] 없음: ${s.slice(0, 60)}…`); }
  }
  out.unshift(`${label}: 대상 ${lines.length}줄 · 글자 그대로 ${exact} · 공백만 다름 ${trimOnly} · 없음 ${miss}`);
};
report('ko→계획§2.2', ko, planKo);
report('ko→v0.9§2.2', ko, vSec);
report('en→계획§2.2 en', en, planEn);
// 제목
const title = 'Quotes, images and copyright';
out.push(`계획 §2.2 en 제목 줄 "> **${title}**" 존재: ${planEn.includes(`**${title}**`)}`);
// ko 1·3·4번: HEAD v0.9(15-1 정정본)과 같은지
out.push(`ko 줄 수 ${ko.length} · en 줄 수 ${en.length}`);
console.log(out.join('\n'));
