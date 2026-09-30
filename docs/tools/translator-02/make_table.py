# 사용: 저장소 루트에서 python3 docs/tools/translator-02/make_table.py
# review-notes.tsv(셀프리뷰 기록)와 실제 파일을 합쳐 핸드오프 대조표(마크다운)를 출력한다.
import re, os, yaml
here = os.path.dirname(__file__)
def fm(p):
    t = open(p, encoding='utf-8').read(); m = re.match(r'---\n(.*?)\n---\n(.*)', t, re.S); return yaml.safe_load(m.group(1)), m.group(2)
def b(x): return len(re.findall(r'^\s*- ', x, re.M))
print('| # | id | 불릿 원본/영어 | description 글자 수 | 체크리스트 셀프리뷰 | 비고 |'); print('|---|---|---|---|---|---|')
for n, l in enumerate(open(os.path.join(here, 'review-notes.tsv'), encoding='utf-8'), 1):
    p = l.rstrip('\n').split('\t'); i = p[0]
    ko, kb = fm(f'content/posts/{i}.md'); en, eb = fm(f'content/posts-en/{i}.md')
    print(f'| {n} | `{i}` | {b(kb)}/{b(eb)} | {len(en["description"])} | {p[1]} | {p[2] if len(p) > 2 else ""} |')
