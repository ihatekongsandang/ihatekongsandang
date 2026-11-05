#!/bin/bash
# 리뷰어 19 — Google News RSS 질의(제목·매체·날짜만). 사용: bash gnews.sh "질의" [최대건수]
Q=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$1")
curl -sL -A "Mozilla/5.0" "https://news.google.com/rss/search?q=${Q}&hl=ko&gl=KR&ceid=KR:ko" | python3 -c "
import sys,re,email.utils
s=sys.stdin.read()
items=re.findall(r'<item>.*?<title>(.*?)</title>.*?<pubDate>(.*?)</pubDate>.*?<source[^>]*>(.*?)</source>',s,re.S)
items.sort(key=lambda x: email.utils.parsedate_to_datetime(x[1]), reverse=True)
print(len(items),'건 (최신순)')
for t,d,src in items[:int(sys.argv[1])]:
    print(' -',email.utils.parsedate_to_datetime(d).strftime('%Y-%m-%d'),'|',src,'|',t[:100])
" "${2:-6}"
