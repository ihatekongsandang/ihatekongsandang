#!/usr/bin/env python3
"""리뷰어 29 — 기획자 12 본문 동기화 독립 대조.
실행: 저장소 루트에서 `python3 -I docs/tools/reviewer-29/body-sync-check.py`
방식: 문안(planning/terms-page-copy.md) 본문 줄에서 바뀐 문장을 직접 잘라 내고, 배포 소스(JSX)를
JSX 공백 규칙(텍스트 노드별로 줄바꿈에 붙은 공백만 trim 후 공백 1칸 결합, 줄바꿈만 있는 노드는 사라짐, {' '}는 공백)으로 풀어 html 엔티티를 되돌린 화면 텍스트와
글자 단위(공백 제거 없이)로 비교한다. 문안의 `**`와 작성 이력 메모 "(09-1 수정 …)"·"(fixed 09-1 …)"는 B9 의도된 차이라 뺀다.
아포스트로피: 규칙(§C)대로 문안의 곧은 '를 ’로 바꾼다. 예외는 #8 인용(곧은 ' 유지).
"""
import html, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parents[3]
doc = (ROOT / 'planning/terms-page-copy.md').read_text(encoding='utf-8')

def jsx_text(path):
    s = (ROOT / path).read_text(encoding='utf-8')
    s = s.replace("{' '}", '\x00')
    out = []
    for blk in re.findall(r'<(?:li|p)[^>]*>(.*?)</(?:li|p)>', s, flags=re.S):
        blk = re.sub(r'\{SITE\.termsLastUpdated\}', '2026-11-09', blk)
        parts = []
        for node in re.split(r'<[^>]+>', blk):  # JSX 텍스트 노드 단위
            if '\n' in node:  # 줄바꿈 포함 노드: 줄마다 trim, 빈 줄 버림, 공백 1칸 결합
                ls = node.split('\n'); n = len(ls)
                ls = [(l if i == 0 else l.lstrip()) for i, l in enumerate(ls)]
                ls = [(l if i == n - 1 else l.rstrip()) for i, l in enumerate(ls)]
                node = ' '.join(l for l in ls if l)  # babel cleanJSXElementLiteralChild 규칙
            parts.append(node)
        t = ''.join(parts).replace('\x00', ' ')
        out.append(html.unescape(t))
    return out

def doc_slice(start, end):
    i = doc.index(start); j = doc.index(end, i) + len(end)
    t = doc[i:j].replace('**', '')
    t = re.sub(r' ?\((?:09-1 수정|fixed 09-1|Fixed 09-1)[^)]*?\)(?=[ .])', '', t)
    return t

def rule(t, keep_straight=False):
    return t if keep_straight else t.replace("'", '’')

ko = jsx_text('src/app/(ko)/terms/page.tsx'); en = jsx_text('src/app/(en)/en/terms/page.tsx')
items = [
 ('#1 ko', 'ko', doc_slice('운영자와의 연락은 위 ‘정정', '가능합니다.'), False),
 ('#2 en', 'en', doc_slice('The only way to reach the operator is through the contact channel in the “', 'section above.'), False),
 ('#5 ko', 'ko', doc_slice('모든 게시물에 원문 출처 링크를 표시합니다.', '밝혀 둡니다.'), False),
 ('#6 en', 'en', doc_slice('Every post links to its original source.', 'with a note saying so.'), False),
 ('#7 ko', 'ko', doc_slice('소개 문구의 “신문법 등', '근거 법령은 위에 적은 대로입니다.'), False),
 ('#8 en', 'en', doc_slice('The phrase “outlets registered', 'the governing laws are as named above.'), True),
]
ok = 0
for name, lang, exp, straight in items:
    exp_r = rule(exp, straight)
    blocks = ko if lang == 'ko' else en
    hit = any(exp_r in b for b in blocks)
    if hit:
        ok += 1; print(f'{name}: OK (글자 단위 일치, {len(exp_r)}자)')
    else:
        # 가장 가까운 블록에서 차이 위치 찾기
        best = max(blocks, key=lambda b: len(set(exp_r.split()) & set(b.split())))
        k = best.find(exp_r[:20]); seg = best[k:k+len(exp_r)] if k >= 0 else ''
        diffs = [(p, a, b) for p, (a, b) in enumerate(zip(exp_r, seg)) if a != b]
        print(f'{name}: DIFF {len(diffs)}자 — ' + '; '.join(f'위치{p} 문안 {a!r} vs 배포 {b!r} (…{exp_r[max(0,p-12):p+4]}…)' for p, a, b in diffs[:5]))
# #9 개정일 줄
cfg = (ROOT / 'src/lib/config.ts').read_text(encoding='utf-8')
date = re.search(r"termsLastUpdated:\s*'([^']+)'", cfg).group(1)
for name, blocks, lab in (('#9 ko', ko, '최종 개정: '), ('#9 en', en, 'Last updated: ')):
    hit = (lab + date) in blocks and f'`{lab}{date}`' in doc
    ok += hit; print(f'{name}: {"OK" if hit else "DIFF"} (상수 {date}, 문안 `{lab}{date}`)')
print(f'합계: {ok}/8 일치 (#1·#2·#5·#6·#7·#8 + #9 ko·en)')
# 규칙 문언 그대로(곧은 ')일 때 #6 이 1자만 다른지
exp6 = doc_slice('Every post links to its original source.', 'with a note saying so.').replace("'", '’')
alt = exp6.replace('article’s', "article's")
print("#6 배포가 'article\\'s'(곧은 ') 1자만 다른가:", any(alt in b for b in en))
print('en 약관 화면 아포스트로피: ’', sum(b.count('’') for b in en), "/ '", sum(b.count("'") for b in en))
