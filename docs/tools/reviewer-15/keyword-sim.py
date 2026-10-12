# 리뷰어 15 키워드 매칭 시뮬레이터 — 기획서 §3.1 사전을 그대로 옮김
# 사용: RSS 파일을 임시 폴더에 받아 두고 그 폴더에서 python3 keyword-sim.py 실행 (feed_*.xml). 피드 원문은 저장소에 두지 않는다.
import xml.etree.ElementTree as ET,re,html
KO={'미사일':['게임','모바일게임','앱','스팀','콜라보','피규어'],'핵무기':[],'핵실험':[],'핵개발':[],'북핵':[],'핵잠수함':[],
'도발':['축구','야구','농구','선수','세레머니','예능','드라마'],'NLL':[],'DMZ':[],'간첩':['영화','드라마','웹툰','소설','게임'],
'국가보안법':[],'사이버공격':[],'해킹':[],'무인기':[],'탈북':[],'귀순':[],'대북전단':[],'북한군':[],'인민군':[],'포격':[],'NLL침범':[],'공산당':[],'공산화':[]}
EN=['missile','nuclear weapon','nuclear test','provocation','NLL','DMZ','spy','espionage','National Security Act','cyberattack','hacking','drone','defector','defection','leaflet','North Korean military','KPA','shelling','border incursion']
def norm(s): return re.sub(r'[\s\W_]+','',s)
def match(text):
    n=norm(text); hits=[]
    for k,ex in KO.items():
        if k.lower() in n.lower():
            if any(e in n for e in ex): hits.append(('EXCL',k))
            else: hits.append(('HIT',k))
    for k in EN:
        if k=='drone': continue
        if re.search(r'\b'+re.escape(k)+r'\b',text,re.I): hits.append(('HIT',k))
    return hits
import glob
for f in ['feed_unikorea.xml','feed_yna.xml','feed_38north.xml','feed_rfa.xml','feed_dod.xml']:
    items=ET.parse(f).getroot().findall('.//item')
    t_hit=d_hit=excl=0; exlist=[]; kwc={}
    for it in items:
        t=it.findtext('title') or ''; d=re.sub('<[^>]+>','',html.unescape(it.findtext('description') or ''))
        h=match(t)
        if any(x[0]=='HIT' for x in h) and not any(x[0]=='EXCL' for x in h):
            t_hit+=1; [kwc.__setitem__(x[1],kwc.get(x[1],0)+1) for x in h if x[0]=='HIT']
        elif any(x[0]=='EXCL' for x in h): excl+=1; exlist.append([x[1] for x in h])
        else:
            h2=match(t+' '+d)
            if any(x[0]=='HIT' for x in h2) and not any(x[0]=='EXCL' for x in h2): d_hit+=1
            elif any(x[0]=='EXCL' for x in h2): excl+=1; exlist.append([x[1] for x in h2])
    print(f,'items',len(items),'title_hit',t_hit,'desc_only_hit',d_hit,'excluded',excl,exlist,'kw',kwc)
