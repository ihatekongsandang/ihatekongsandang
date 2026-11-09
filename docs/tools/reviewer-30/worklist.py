import csv, json, re, sys
R='docs/tools/planner-14/'
tsv=list(csv.DictReader(open(R+'image-judgments.tsv',encoding='utf-8'),delimiter='\t'))
cand=list(csv.DictReader(open(R+'candidates.csv',encoding='utf-8-sig')))
J=json.load(open(R+'judgments.json'))
P=J['post']; n_of={pid:p['n'] for pid,p in P.items()}
by_art={}
for r in cand:
    by_art.setdefault(r['B_article'],[]).append(r)
out=[]
for i,t in enumerate(tsv,1):
    u=t['url']; cs=by_art.get(u,[])
    posts=sorted({n_of[c['id']] for c in cs})
    og=cs[0]['B_url'] if cs else ''
    outlet=cs[0]['B_outlet'] if cs else ''
    f=t['faces']
    pub=bool(re.search(r'(?<!비)공인',f)); unid=bool(re.search(r'신원 미확인|추정|확인 필요',f))
    sel=[]
    for pid,p in P.items():
        if p['B_pub_url']==u and p['class_pub']=='B': sel.append(f"{p['n']}:B")
        if p['B_cond_url']==u and p['class_pub']=='B조건부': sel.append(f"{p['n']}:Bcond")
    tgt=[]
    if pub: tgt.append('PUB')
    if unid: tgt.append('UNID')
    if set(posts)&{49,53,66,67}: tgt.append('REV')
    out.append(dict(i=i,url=u,og=og,outlet=outlet,posts=posts,faces=f,mv=t['minor_victim'],marks=t['text_marks'],fit=t['fit'],note=t['note'],sel=sel,tgt=tgt))
json.dump(out,open(sys.argv[1],'w'),ensure_ascii=False,indent=0)
tg=[o for o in out if o['tgt']]
print('targets',len(tg),'PUB',sum('PUB' in o['tgt'] for o in out),'UNID',sum('UNID' in o['tgt'] for o in out),'REV',sum('REV' in o['tgt'] for o in out))
print('selected images', sum(1 for o in out if o['sel']))
