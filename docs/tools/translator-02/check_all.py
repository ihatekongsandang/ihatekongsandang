# 사용: 저장소 루트에서 python3 docs/tools/translator-02/check_all.py
# ids.txt 78건 전수: 파일 존재·id·translatedAt·description ≤160·(in Korean)·/tag/·"not translated"·imageAlt/imageCaption/speakerAffiliation 누락·attribution 핸들·불릿 수를 검사한다.
import re, os, yaml
here = os.path.dirname(__file__)
ids = open(os.path.join(here, 'ids.txt')).read().split()
bad = []
for i in ids:
    p = f'content/posts-en/{i}.md'
    if not os.path.exists(p): bad.append((i, ['missing'])); continue
    t = open(p, encoding='utf-8').read()
    fm = yaml.safe_load(re.match(r'---\n(.*?)\n---', t, re.S).group(1)); body = t.split('---', 2)[2]
    kt = open(f'content/posts/{i}.md', encoding='utf-8').read()
    ko = yaml.safe_load(re.match(r'---\n(.*?)\n---', kt, re.S).group(1)); kbody = kt.split('---', 2)[2]
    iss = []
    if fm.get('id') != i: iss.append('id')
    if str(fm.get('translatedAt')) != '2026-09-30': iss.append('translatedAt')
    if len(fm['description']) > 160: iss.append('desc>160')
    if re.search(r'\]\([^)]*\)\s*\(in Korean\)', body): iss.append('inKorean-after-link')
    if '/tag/' in body: iss.append('tag-link')
    if 'not translated' in t: iss.append('not translated')
    if ko.get('image') and 'imageAlt' not in fm: iss.append('imageAlt')
    if (ko.get('image') or {}).get('caption') and 'imageCaption' not in fm: iss.append('imageCaption')
    if (ko.get('speaker') or {}).get('affiliation') and 'speakerAffiliation' not in fm: iss.append('speakerAffiliation')
    if re.findall(r'@[\w.]+', ko.get('attribution', '')) != re.findall(r'@[\w.]+', fm.get('attribution', '')): iss.append('handle')
    kb = len(re.findall(r'^\s*- ', kbody, re.M)); eb = len(re.findall(r'^\s*- ', body, re.M))
    if kb != eb: iss.append(f'bullets {kb}/{eb}')
    if iss: bad.append((i, iss))
print(f'checked {len(ids)} ids, issues: {bad}')
