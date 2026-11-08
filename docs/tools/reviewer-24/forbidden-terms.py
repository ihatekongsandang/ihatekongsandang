# 리뷰어 24 — 금지 표현(PRD v0.7 §6⑥(나)) 전수 재측정. 요청 없음, 읽기 전용.
# 실행(저장소 루트): python3 -I docs/tools/reviewer-24/forbidden-terms.py > docs/tools/reviewer-24/forbidden-terms-output.txt
# 각 출현을 위치(frontmatter 필드 / 본문)로 분류해, 운영자가 직접 쓰는 자리(title·description·summary 류·본문)에 있는 것을 따로 보인다.
import os, re
from collections import Counter, defaultdict
TERMS = ['기자', '속보', '본지', '편집국', '바이라인']
EN_TERMS = ['reporter', 'byline', 'breaking', 'newsroom', 'editorial desk', 'wire desk']
roots = ['src', 'content']
files = []
for r in roots:
    for d, _, fs in os.walk(r):
        for f in fs:
            files.append(os.path.join(d, f))
files.sort()
def field_of(lines, i):
    # frontmatter 안이면 가장 가까운 위쪽 최상위 키, sources 블록이면 sources[].키
    fm_end = None
    if lines and lines[0].strip() == '---':
        for j in range(1, len(lines)):
            if lines[j].strip() == '---':
                fm_end = j; break
    if fm_end is None or i > fm_end:
        return 'body'
    top = None; sub = None
    for j in range(i, 0, -1):
        m = re.match(r'^([A-Za-z_]+):', lines[j])
        if m:
            top = m.group(1); break
        m2 = re.match(r'^\s+-?\s*([A-Za-z_]+):', lines[j])
        if m2 and sub is None:
            sub = m2.group(1)
    return f'{top}.{sub}' if sub and top in ('sources', 'media', 'gallery', 'speaker') else (top or '?')
tot = {}
for t in TERMS + EN_TERMS:
    nfile = 0; ncount = 0; byfield = Counter(); bysrc = Counter(); hits = []
    for p in files:
        try: txt = open(p, encoding='utf-8').read()
        except Exception: continue
        flag = re.IGNORECASE if t in EN_TERMS else 0
        if not re.search(re.escape(t), txt, flag): continue
        nfile += 1
        lines = txt.split('\n')
        for i, l in enumerate(lines):
            for m in re.finditer(re.escape(t), l, flag):
                ncount += 1
                f = field_of(lines, i) if p.startswith('content') else 'src'
                byfield[f] += 1
                bysrc[p.split('/')[0] + '/' + p.split('/')[1]] += 1
                s = max(0, m.start() - 25); e = min(len(l), m.end() + 25)
                hits.append((p, i + 1, f, l[s:e].replace('\t', ' ')))
    print(f'=== {t}: 파일 {nfile} · 건수 {ncount} · 위치별 {dict(byfield)} · 폴더별 {dict(bysrc)}')
    for h in hits:
        if t in ('기자', '속보', 'reporter', 'breaking'):
            print(f'  {h[0]}:{h[1]} [{h[2]}] …{h[3]}…')
