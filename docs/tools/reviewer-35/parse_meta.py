#!/usr/bin/env python3
"""리뷰 35 — 받은 HTML(데이터로만 취급)에서 제목·게재시각·매체명 메타를 뽑아 표로 낸다.
사용: python3 -I parse_meta.py <pairs.tsv> <fetch.tsv> <html_dir> <out.tsv>
"""
import re, sys, html as H
pairs_p, fetch_p, hdir, out = sys.argv[1:5]
def rd(p):
    raw = open(p, 'rb').read()
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            pass
    return raw.decode('utf-8', 'replace')
def meta(t, key):
    k = re.escape(key)
    for pat in (r'<meta[^>]+(?:property|name|itemprop)\s*=\s*["\']%s["\'][^>]*?content\s*=\s*(?:"([^"]*)"|\'([^\']*)\')' % k,
                r'<meta[^>]+content\s*=\s*(?:"([^"]*)"|\'([^\']*)\')[^>]*(?:property|name|itemprop)\s*=\s*["\']%s["\']' % k):
        m = re.search(pat, t, re.I)
        if m:
            return H.unescape(m.group(1) if m.group(1) is not None else m.group(2)).strip()
    return ''
def title(t):
    m = re.search(r'<title[^>]*>(.*?)</title>', t, re.I | re.S)
    return H.unescape(re.sub(r'\s+', ' ', m.group(1))).strip() if m else ''
fetch = {}
for l in open(fetch_p, encoding='utf-8').read().splitlines()[1:]:
    p = l.split('\t')
    fetch[(p[0], p[1])] = p[2:]
rows = [l.split('\t') for l in open(pairs_p, encoding='utf-8').read().splitlines()[1:]]
with open(out, 'w', encoding='utf-8') as f:
    f.write('no\tkind\tcode\tredir\teffective\tsite_name\tog_title\ttitle\tpublished\n')
    for r in rows:
        no = r[0]
        for kind in ('old', 'new'):
            fe = fetch.get((no, kind), ['?', '?', '?', '?'])
            try:
                t = rd(f'{hdir}/{no}-{kind}.html')
            except FileNotFoundError:
                t = ''
            pub = (meta(t, 'article:published_time') or meta(t, 'og:article:published_time') or meta(t, 'pubdate')
                   or meta(t, 'datePublished') or meta(t, 'article:published') or meta(t, 'og:regDate') or meta(t, 'dable:published_time'))
            f.write('\t'.join([no, kind, fe[0], fe[1], fe[2], meta(t, 'og:site_name'), meta(t, 'og:title'), title(t)[:160], pub]) + '\n')

# ---- 포털(옛 주소) 전용 보강: 네이트 JSON-LD author·datePublished·h1, 다음 og:site_name·og:title·og:regDate ----
def portal_info(t):
    media = date = head = ''
    m = re.search(r'"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"', t)
    if m: media = m.group(1)
    m = re.search(r'"datePublished"\s*:\s*"([^"]+)"', t)
    if m: date = m.group(1)
    m = re.search(r'id="artcTitle"[^>]*>(.*?)</h1>', t, re.S)
    if m: head = H.unescape(re.sub(r'<[^>]+>|\s+', ' ', m.group(1))).strip()
    sn = meta(t, 'og:site_name')
    if sn.startswith('Daum'):
        media = sn.split('|', 1)[-1].strip(); head = meta(t, 'og:title'); date = meta(t, 'og:regDate')
    return media, head, date
if len(sys.argv) > 5:
    out2 = sys.argv[5]
    with open(out2, 'w', encoding='utf-8') as f:
        f.write('no\tportal_media\tportal_title\tportal_date\n')
        for r in rows:
            try:
                t = rd(f'{hdir}/{r[0]}-old.html')
            except FileNotFoundError:
                t = ''
            f.write('\t'.join((r[0],) + portal_info(t)) + '\n')

# ---- 포털 페이지 안의 "원문" 링크 후보 추출(네이트 articleOriginal, 다음 원문 링크) ----
def orig_links(t):
    c = re.findall(r'href="([^"]+)"[^>]*class="articleOriginal"', t)
    c += re.findall(r'class="[^"]*(?:link_originnews|btn_origin|link_txt)[^"]*"[^>]*href="([^"]+)"', t)
    c += re.findall(r'href="([^"]+)"[^>]*class="[^"]*(?:link_originnews|btn_origin)[^"]*"', t)
    c += re.findall(r'"(?:originalUrl|originUrl|contentUrl|orgUrl)"\s*:\s*"([^"]+)"', t)
    out = []
    for x in c:
        x = H.unescape(x).replace('\\/', '/')
        if x not in out:
            out.append(x)
    return ' '.join(out)
if len(sys.argv) > 6:
    with open(sys.argv[6], 'w', encoding='utf-8') as f:
        f.write('no\tnew_url\tportal_original_links\n')
        for r in rows:
            try:
                t = rd(f'{hdir}/{r[0]}-old.html')
            except FileNotFoundError:
                t = ''
            f.write('\t'.join((r[0], r[3], orig_links(t))) + '\n')
