# 사용: 저장소 루트에서 python3 docs/tools/translator-02/check_hedge.py <id> [<id> ...]
# 원본 불릿에 '보도/전해/전함/알려'가 있는데 대응 영어 불릿에 report 계열 표현이 없으면 표시한다(게시자 전언 '전함'은 오탐 가능 — 수동 확인).
import sys, re
root = 'content'
def body(p):
    t = open(p, encoding='utf-8').read(); return re.match(r'---\n.*?\n---\n(.*)', t, re.S).group(1)
def bl(b): return [l for l in b.split('\n') if re.match(r'\s*- ', l)]
for i in sys.argv[1:]:
    kb = bl(body(f'{root}/posts/{i}.md')); eb = bl(body(f'{root}/posts-en/{i}.md'))
    if len(kb) != len(eb): print('COUNT MISMATCH', i, len(kb), len(eb)); continue
    for k, e in zip(kb, eb):
        if re.search('보도|전해|전함|알려', k) and not re.search(r'[Rr]eport|[Aa]ccording to', e): print('MISSING HEDGE', i, '|', e[:120])
        if len(re.findall('보도됨|전해짐|보도됐|보도가 나|보도함', k)) > len(re.findall(r'[Rr]eport', e)): print('FEWER HEDGES', i, '|', e[:120])
