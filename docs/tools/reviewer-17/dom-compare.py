# 리뷰어 17 — 빌드 산출물 HTML 전 파일을 DOM 토큰 단위로 비교(script/link/meta 제외, class는 따로 집계)
import os,sys,collections
from html.parser import HTMLParser
A,B=sys.argv[1],sys.argv[2]
SKIP={'script','link','meta','style'}
class P(HTMLParser):
    def __init__(s): super().__init__(convert_charrefs=True); s.t=[]; s.c=[]; s.skip=0
    def handle_starttag(s,tag,attrs):
        if tag in SKIP:
            if tag in('script','style'): s.skip+=1
            return
        d=dict(attrs); s.c.append(d.pop('class',None)); s.t.append(('S',tag,tuple(sorted(d.items()))))
    def handle_endtag(s,tag):
        if tag in('script','style'): s.skip-=1; return
        if tag in SKIP: return
        s.t.append(('E',tag))
    def handle_data(s,d):
        if not s.skip and d.strip(): s.t.append(('D',d))
def parse(p):
    x=P(); x.feed(open(p,encoding='utf8').read()); return x
fa=sorted(os.path.relpath(os.path.join(d,f),A) for d,_,fs in os.walk(A) for f in fs if f.endswith('.html'))
fb=sorted(os.path.relpath(os.path.join(d,f),B) for d,_,fs in os.walk(B) for f in fs if f.endswith('.html'))
print('html 파일', len(fa), len(fb), '집합 동일', fa==fb)
nonclass=0; kinds=collections.Counter(); elems=0
for f in fa:
    a,b=parse(os.path.join(A,f)),parse(os.path.join(B,f))
    if a.t!=b.t: nonclass+=1; print('비-class 차이:',f); continue
    elems+=len(a.c)
    for x,y in zip(a.c,b.c):
        if x!=y: kinds[(x,y)]+=1
print('비교 요소 수', elems, '· class 외 차이 파일', nonclass)
for (x,y),n in kinds.items(): print(n,'건 |',x,'→',y)
