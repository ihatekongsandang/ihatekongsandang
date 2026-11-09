#!/usr/bin/env python3
"""리뷰 35 — git diff(content/posts)에서 포털→원 매체 교체 쌍을 뽑고, 현재 파일의 sources 항목(name·date)을 붙인다.
사용: python3 -I extract_pairs.py <repo_root> <out.tsv>
"""
import re, subprocess, sys, os
root, out = sys.argv[1], sys.argv[2]
PORTAL = re.compile(r'v\.daum\.net|news\.nate\.com')
diff = subprocess.run(['git', '-C', root, 'diff', '-U0', '--', 'content/posts/'], capture_output=True, text=True).stdout
rows = []
cur = None
olds = []
news = []
def flush():
    global olds, news
    if cur is None:
        return
    if len(olds) != len(news):
        print('MISMATCH', cur, len(olds), len(news), file=sys.stderr)
    for o, n in zip(olds, news):
        rows.append((cur, o, n))
    olds, news = [], []
for line in diff.splitlines():
    m = re.match(r'^\+\+\+ b/content/posts/(.+)\.md$', line)
    if m:
        flush(); cur = m.group(1); continue
    if line.startswith('@@'):
        flush(); continue
    m = re.match(r'^-\s+url:\s*(\S+)', line)
    if m and PORTAL.search(m.group(1)):
        olds.append(m.group(1)); continue
    m = re.match(r'^\+\s+url:\s*(\S+)', line)
    if m:
        news.append(m.group(1)); continue
flush()

def sources(fid):
    txt = open(os.path.join(root, 'content/posts', fid + '.md'), encoding='utf-8').read()
    fm = txt.split('\n---', 1)[0]
    blk = fm.split('\nsources:\n', 1)[1]
    items = []
    curi = None
    for l in blk.splitlines():
        if re.match(r'^\S', l):
            break
        m = re.match(r'^\s+-\s+(\w+):\s*(.*)$', l)
        if m:
            curi = {m.group(1): m.group(2)}; items.append(curi); continue
        m = re.match(r'^\s+(\w+):\s*(.*)$', l)
        if m and curi is not None:
            curi[m.group(1)] = m.group(2)
    return items

with open(out, 'w', encoding='utf-8') as f:
    f.write('no\tfile\told_url\tnew_url\ttype\tname\tdate\n')
    for i, (fid, o, n) in enumerate(rows, 1):
        hit = [s for s in sources(fid) if s.get('url') == n]
        s = hit[0] if hit else {}
        f.write('\t'.join([str(i), fid, o, n, s.get('type', '?'), s.get('name', '?'), s.get('date', '?')]) + '\n')
print('pairs', len(rows), 'files', len({r[0] for r in rows}))
