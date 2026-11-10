# 리뷰어 59 — 기사 HTML에서 og:image·게재 시각·사진 설명 후보를 뽑는다. 사용: python3 -I meta.py <저장소 밖 HTML>. 출력에 기자 이름이 섞일 수 있어 저장하지 않는다.
import re,sys,html
t=open(sys.argv[1],'rb').read().decode('utf-8','ignore')
def meta(k):
    m=re.search(r'<meta[^>]+(?:property|name)=["\']'+re.escape(k)+r'["\'][^>]*content=["\']([^"\']+)',t) or re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]*(?:property|name)=["\']'+re.escape(k)+'["\']',t)
    return m.group(1) if m else None
print('og:image',meta('og:image')); print('pub',meta('article:published_time') or (re.search(r'"datePublished"\s*:\s*"([^"]+)"',t) or [None,None])[1])
caps=[]
for m in re.finditer(r'<figcaption[^>]*>(.*?)</figcaption>',t,re.S): caps.append(m.group(1))
for m in re.finditer(r'<(?:p|span|em|div)[^>]*class=["\'][^"\']*(?:caption|cap|img_desc|photo_desc|txt_caption|desc)[^"\']*["\'][^>]*>(.*?)</(?:p|span|em|div)>',t,re.S): caps.append(m.group(1))
seen=set()
for c in caps:
    s=re.sub(r'\s+',' ',html.unescape(re.sub('<[^>]+>',' ',c))).strip()
    if len(s)>8 and s not in seen: seen.add(s); print('CAP',s[:260])
    if len(seen)>=4: break
