#!/usr/bin/env python3
"""페이지에서 저작권·공공누리 관련 문구 주변을 출력. 사용: python3 grep_notice.py URL... (UTF-8/EUC-KR 자동)"""
import sys, re, subprocess, time, html
for u in sys.argv[1:]:
    time.sleep(1.2)
    b = subprocess.run(["curl", "-sL", "--max-time", "30", "-A", "Mozilla/5.0", u], capture_output=True).stdout
    try: t = b.decode("utf-8")
    except UnicodeDecodeError: t = b.decode("euc-kr", "replace")
    txt = re.sub(r"\s+", " ", html.unescape(re.sub(r"<script.*?</script>|<style.*?</style>|<[^>]+>", " ", t, flags=re.S)))
    print("==", u[:100], len(b))
    hits = [txt[max(0, m.start()-60):m.end()+90] for m in re.finditer(r"공공누리|저작권|Copyright|ⓒ|KOGL", txt, re.I)]
    for h in hits[:4]: print("  -", h)
    print("  kogl-in-html:", sorted(set(re.findall(r"kogl[^\"' >]{0,60}|opentype0\d|type0?[1-4]\.(?:png|gif)", t, re.I)))[:4])
