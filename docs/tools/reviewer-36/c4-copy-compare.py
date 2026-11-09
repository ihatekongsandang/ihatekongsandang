#!/usr/bin/env python3
"""리뷰 36: C4 소개 문구(ko·en)가 계획 §2.2 / 리뷰 34 §2.4와 글자 그대로 같은지 소스(TSX)에서 직접 대조.
기대값은 문서에서 읽는다(하드코딩 없음). 저장소 루트에서 실행: python3 docs/tools/reviewer-36/c4-copy-compare.py"""
import re, html, sys, subprocess

def norm(s):
    s = s.replace('**', '')
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def plan_items(lang):
    doc = open('planning/q1-redirect-q2-sns-image-plan.md', encoding='utf8').read()
    sec = doc[doc.index('### 2.2'):doc.index('### 2.3')]
    if lang == 'ko':
        body = sec[sec.index('**ko 확정 문안'):sec.index('**15-1 정정본과')]
        lines = [l for l in body.split('\n') if re.match(r'^\s*(\d+\.|-)\s', l)]
        return [norm(re.sub(r'^\s*(\d+\.|-)\s', '', l)) for l in lines]
    body = sec[sec.index('> **Quotes, images and copyright**'):]
    lines = [l for l in body.split('\n') if re.match(r'^>\s+\s*-\s', l)]
    return [norm(re.sub(r'^>\s+\s*-\s', '', l)) for l in lines]

def review_items(lang):
    doc = open('docs/reviews/planner-16-q1-q2-plan-review.md', encoding='utf8').read()
    sec = doc[doc.index('### 2.4'):doc.index('## 3.')]
    if lang == 'ko':
        body = sec[:sec.index('**en**')]
    else:
        body = sec[sec.index('**en**'):]
    lines = [l for l in body.split('\n') if re.match(r'^>\s+(\d+\.|-)\s', l)]
    return [norm(re.sub(r'^>\s+(\d+\.|-)\s', '', l)) for l in lines]

total = 0; fails = 0
def check(label, ok, extra=''):
    global total, fails
    total += 1
    if not ok: fails += 1
    print(('PASS' if ok else 'FAIL') + '  ' + label + (('  ' + extra) if extra and not ok else ''))

def flat_tsx(path, title_marker):
    src = open(path, encoding='utf8').read()
    i = src.index(title_marker); j = src.index('</Section>', i)
    block = src[i:j]
    block = re.sub(r'\{/\*.*?\*/\}', '', block, flags=re.S).replace("{' '}", ' ')
    # 부모 li 의 글자를 하위 ul 앞까지만 자르기
    block = re.sub(r'<ul[^>]*list-disc[^>]*>', '</li><li>', block)
    parts = re.split(r'<li[^>]*>', block)[1:]
    out = []
    for p in parts:
        t = html.unescape(re.sub(r'<[^>]+>', '', p))
        t = re.sub(r'\s+', ' ', t).strip()
        if t: out.append(t)
    return out

ko_tsx = flat_tsx('src/app/(ko)/about/page.tsx', '인용·저작권')
en_tsx = flat_tsx('src/app/(en)/en/about/page.tsx', 'Quotes, images and copyright')
ko_plan = plan_items('ko'); en_plan = plan_items('en')
ko_rev = review_items('ko'); en_rev = review_items('en')

print(f'항목 수: ko 소스 {len(ko_tsx)} · ko 계획 {len(ko_plan)} | en 소스 {len(en_tsx)} · en 계획 {len(en_plan)}')
check('ko 항목 수 같음', len(ko_tsx) == len(ko_plan), f'{len(ko_tsx)} vs {len(ko_plan)}')
for k, (a, b) in enumerate(zip(ko_tsx, ko_plan), 1):
    check(f'ko 항목 {k} 글자 같음', a == b, f'\n   소스: {a}\n   계획: {b}')
check('en 항목 수 같음', len(en_tsx) == len(en_plan), f'{len(en_tsx)} vs {len(en_plan)}')
for k, (a, b) in enumerate(zip(en_tsx, en_plan), 1):
    check(f'en 항목 {k} 글자 같음', a == b, f'\n   소스: {a}\n   계획: {b}')
# 리뷰 §2.4 줄이 계획에 글자 그대로 들어 있는지
for k, r in enumerate(ko_rev, 1):
    check(f'리뷰 §2.4 ko 줄 {k} ⊂ 계획 ko', r in ko_plan, r)
for k, r in enumerate(en_rev, 1):
    check(f'리뷰 §2.4 en 줄 {k} ⊂ 계획 en', r in en_plan, r)
# 굵게 범위(ko): 계획 문안의 **…** 조각이 소스 <strong> 조각과 같은지
plan_doc = open('planning/q1-redirect-q2-sns-image-plan.md', encoding='utf8').read()
sec = plan_doc[plan_doc.index('**ko 확정 문안'):plan_doc.index('**15-1 정정본과')]
sec = '\n'.join(l for l in sec.split('\n') if re.match(r'^\s*(\d+\.|-)\s', l))
plan_bold = re.findall(r'\*\*(.+?)\*\*', sec)
src = open('src/app/(ko)/about/page.tsx', encoding='utf8').read()
i = src.index('인용·저작권'); j = src.index('</Section>', i)
src_bold = [re.sub(r'\s+', ' ', b).strip() for b in re.findall(r'<strong[^>]*>(.+?)</strong>', src[i:j], flags=re.S)]
check(f'ko 굵게 조각 같음({len(src_bold)}개)', src_bold == plan_bold, f'{src_bold} vs {plan_bold}')
# 영어 절 제목
check('en 절 제목 = Quotes, images and copyright', 'title="Quotes, images and copyright"' in open('src/app/(en)/en/about/page.tsx', encoding='utf8').read())
# 굽은 따옴표 0(en 새 절)
en_src = open('src/app/(en)/en/about/page.tsx', encoding='utf8').read()
k = en_src.index('Quotes, images and copyright'); e = en_src.index('</Section>', k)
check('en 새 절 굽은 따옴표 0', '’' not in en_src[k:e])
# 약관 변경 0
d = subprocess.run(['git', 'diff', '--stat', '--', 'src/app/(ko)/terms', 'src/app/(en)/en/terms'], capture_output=True, text=True).stdout
check('약관(ko·en) git diff 0', d.strip() == '', d)
print(f'합계 {total}건 · PASS {total-fails} · FAIL {fails}')
sys.exit(1 if fails else 0)
