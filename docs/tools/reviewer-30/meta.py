import json, re, sys, html as H, os
base=sys.argv[1]
w=json.load(open(base+'/meta/work.json'))
res={}
def dec(b):
    for enc in ('utf-8','euc-kr','cp949'):
        try: return b.decode(enc)
        except: pass
    return b.decode('utf-8','ignore')
for o in w:
    p=f"{base}/html/{o['i']}.html"
    if not os.path.exists(p): continue
    t=dec(open(p,'rb').read())
    def m(prop):
        r=re.search(r'<meta[^>]+(?:property|name)=["\']'+prop+r'["\'][^>]*content=["\']([^"\']*)',t,re.I) or re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]*(?:property|name)=["\']'+prop+r'["\']',t,re.I)
        return H.unescape(r.group(1)).strip() if r else ''
    caps=[]
    for c in re.findall(r'<figcaption[^>]*>(.*?)</figcaption>',t,re.S|re.I)[:3]:
        c=re.sub(r'<[^>]+>','',c); c=H.unescape(re.sub(r'\s+',' ',c)).strip()
        if c: caps.append(c[:220])
    if not caps:
        for c in re.findall(r'(?:alt)=["\']([^"\']{15,200})["\']',t)[:3]: caps.append(H.unescape(c))
    res[o['i']]=dict(title=m('og:title'),desc=m('og:description')[:250],caps=caps)
json.dump(res,open(base+'/meta/artmeta.json','w'),ensure_ascii=False,indent=0)
print(len(res))
