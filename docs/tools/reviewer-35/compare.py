#!/usr/bin/env python3
"""리뷰 35 — 59쌍 대조표: 새 주소 HTTP·제목(포털 대 원 매체)·게재일(KST)·name 접두·date.
사용: python3 -I compare.py <pairs.tsv> <meta.tsv> <portal.tsv> <out.tsv>
"""
import sys, re, unicodedata, datetime as D
pairs_p, meta_p, portal_p, out = sys.argv[1:5]
def tsv(p):
    L = open(p, encoding='utf-8').read().splitlines()
    return [l.split('\t') for l in L[1:]]
pairs = tsv(pairs_p)
meta = {(r[0], r[1]): r for r in tsv(meta_p)}
portal = {r[0]: r for r in tsv(portal_p)}
def norm(s):
    s = unicodedata.normalize('NFKC', s.replace('&quot;', '"'))  # 李(U+F9E1 호환 한자) 등
    for a, b in (('‘', "'"), ('’', "'"), ('“', '"'), ('”', '"'), ('″', '"'), ('…', '...'), ('..', '...'), ('……', '...')):
        s = s.replace(a, b)
    s = re.sub(r'\.{3,}', '...', s)
    s = re.sub(r'\s*(\||-|:)\s*(네이트 뉴스|연합뉴스|중앙일보|머니투데이|아주경제|전국 \| 기사 - 더팩트)\s*$', '', s)
    s = re.sub(r'\s*\|\s*(연합뉴스|중앙일보|아주경제)\s*$', '', s)
    s = re.sub(r'\s*<1>\s*$', '', s)
    s = re.sub(r'\s*\[흔들리는 동맹, 불안한 이웃㊤\]\s*$', '', s)  # 중앙일보 og:title은 연재명을 뺀다(#26)
    s = re.sub(r'\s+', '', s)
    return s
def kst(s):
    s = s.strip()
    if not s:
        return ''
    m = re.match(r'^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)', s)
    if m and '-' not in s:
        return f'{m[1]}-{m[2]}-{m[3]}'
    m = re.match(r'^\w{3} (\w{3}) (\d\d) [\d:]+ KST (\d{4})$', s)
    if m:
        return D.datetime.strptime(f'{m[1]} {m[2]} {m[3]}', '%b %d %Y').strftime('%Y-%m-%d')
    m = re.match(r'^(\d{4}-\d\d-\d\d)[T ](\d\d):(\d\d)(?::\d\d(?:\.\d+)?)?(Z|[+-]\d\d:\d\d)?', s)
    if not m:
        return '?' + s
    dt = D.datetime.fromisoformat(f'{m[1]}T{m[2]}:{m[3]}')
    tz = m[4]
    if tz == 'Z':
        dt += D.timedelta(hours=9)
    elif tz and tz != '+09:00':
        h, mi = int(tz[1:3]), int(tz[4:6]); sg = 1 if tz[0] == '+' else -1
        dt = dt - sg * D.timedelta(hours=h, minutes=mi) + D.timedelta(hours=9)
    return dt.strftime('%Y-%m-%d')
with open(out, 'w', encoding='utf-8') as f:
    f.write('no\tfile\tcode\tredir\tname_prefix\tnew_site\tportal_media\tdate\tnew_pub_kst\tportal_kst\ttitle_new_eq_portal\ttitle_name_eq_new\tnew_title\tportal_title\n')
    for p in pairs:
        no, fid, old, new, typ, name, date = p
        m = meta[(no, 'new')]
        po = portal.get(no, [no, '', '', ''])
        if len(name) > 1 and name[0] == '"' and name[-1] == '"':
            name = name[1:-1].replace('\\"', '"')
        prefix = name.split(' — ', 1)[0]
        nt = m[6] or m[7]
        name_title = name.split(' — ', 1)[1] if ' — ' in name else name
        f.write('\t'.join([no, fid, m[2], m[3], prefix, m[5], po[1], date, kst(m[8]), kst(po[3]),
                           str(norm(nt) == norm(po[2])), str(norm(nt) == norm(name_title)), nt, po[2]]) + '\n')
