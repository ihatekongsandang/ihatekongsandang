# 리뷰어 25 — X intent에 게시물 제목(text)+URL(url)을 넣을 때 280자(가중치) 초과 건수 전수 측정. 요청 없음.
# 가중치: twitter-text 기본 설정(유니코드 0–4351·8192–8205·8208–8223·8242–8247 범위 1, 그 밖(한글·CJK 등) 2), URL은 t.co 단축 23, 구분 공백 1.
# 실행(저장소 루트): python3 -I docs/tools/reviewer-25/x-title-length.py > docs/tools/reviewer-25/x-title-length-output.txt
import glob, re
def weight(s):
    n = 0
    for ch in s:
        c = ord(ch)
        n += 1 if (c <= 4351 or 8192 <= c <= 8205 or 8208 <= c <= 8223 or 8242 <= c <= 8247) else 2
    return n
for folder in ('content/posts', 'content/posts-en'):
    rows = []
    for p in sorted(glob.glob(f'{folder}/*.md')):
        t = open(p, encoding='utf-8').read()
        m = re.search(r'(?m)^title:\s*(.*)$', t)
        if not m: continue
        s = m.group(1).strip()
        if len(s) >= 2 and s[0] == '"' and s[-1] == '"': s = s[1:-1].replace('\\"', '"')
        rows.append((weight(s) + 1 + 23, p))
    over = [r for r in rows if r[0] > 280]
    print(f'{folder}: 제목 {len(rows)}개 · 최대 {max(r[0] for r in rows)} · 280 초과 {len(over)}')
    for w, p in over: print(f'  {w}\t{p}')
