# 프로그래머 10 — 업로더 세션 기록(Claude Code 세션 JSONL)에서 인스타그램 embed 요청 명령의 UA와 그때 받은 응답 측정값만 뽑는다.
# 새 요청 없음. 원문 내용은 출력하지 않고 응답 크기·마커 개수 줄만 출력한다.
#   python3 docs/tools/programmer-10/uploader-attempts.py <세션 JSONL 경로> > docs/tools/programmer-10/uploader-attempts-output.tsv
import json, re, sys
uses, rows = {}, []
for line in open(sys.argv[1], encoding='utf-8'):
    try: d = json.loads(line)
    except Exception: continue
    c = d.get('message', {}).get('content')
    if not isinstance(c, list): continue
    for b in c:
        if b.get('type') == 'tool_use':
            s = json.dumps(b.get('input'), ensure_ascii=False)
            if 'instagram.com/p/' in s and 'embed/captioned' in s and 'curl' in s:
                ua = 'chrome130-full' if 'Chrome/130' in s else ('plain-Mozilla/5.0' if re.search(r"-A \\?['\"]Mozilla/5\.0\\?['\"]", s) else 'other')
                m = re.search(r'C=([A-Za-z0-9_-]{11})', s) or re.search(r'/p/([A-Za-z0-9_-]{11})/embed', s)
                uses[b['id']] = (d.get('timestamp', '')[:16] + 'Z', ua, m.group(1) if m else '?')
        elif b.get('type') == 'tool_result' and b.get('tool_use_id') in uses:
            r = b.get('content'); r = r if isinstance(r, str) else json.dumps(r, ensure_ascii=False)
            lines = [x.strip() for x in r.splitlines()]
            size = next((x for x in lines if re.fullmatch(r'\d{5,7}( \S+)?', x)), '')
            size = size.split()[0] if size else ''
            # chrome130 명령의 출력 순서: 크기, Caption 수, mp4 수, EmbeddedMediaImage 수(11/04 이후 형식)
            nums = [x for x in lines if re.fullmatch(r'\d{1,3}', x)]
            denied = 'denied' in r
            rows.append(uses[b['tool_use_id']] + (size, ','.join(nums[:3]), 'denied' if denied else ''))
print('time_utc\tua\tcode\tresp_bytes\tsmall_counts(caption,mp4,img 순 — 11/04 이후 명령만)\tnote')
for r in sorted(rows): print('\t'.join(r))
