#!/usr/bin/env python3
"""리뷰어 27 — 약관 문안(planning/terms-page-copy.md) ↔ 배포 소스(src/app/.../terms/page.tsx) 문장 대조 재현.
실행: 저장소 루트에서 `python3 -I docs/tools/reviewer-27/terms-copy-reproduce.py`
정방향: 문안 문장(제목·인용 상자 메모·작성 이력 메모 제외)이 배포 소스에 있는가.
역방향: 배포 화면 문장(JSX 텍스트)이 문안에 없는가 = 문안 밖 문장.
"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[3]
COPY = (ROOT / 'planning/terms-page-copy.md').read_text(encoding='utf-8')
SRC = {
    'ko': (ROOT / 'src/app/(ko)/terms/page.tsx').read_text(encoding='utf-8'),
    'en': (ROOT / 'src/app/(en)/en/terms/page.tsx').read_text(encoding='utf-8'),
}

def section(text, start, end):
    a = text.index(start); b = text.index(end, a + len(start))
    return text[a + len(start):b]

copy_part = {
    'ko': section(COPY, '## 한국어 문안', '## English copy'),
    'en': section(COPY, '## English copy', '## 배포 후 대조 기록'),
}

MEMO = re.compile(r'\s?\((?:09-1 (?:수정|추가)|Added 09-1|Fixed 09-1|fixed 09-1)[^)]*\)')

def norm(s):
    s = s.replace('&ldquo;', '"').replace('&rdquo;', '"').replace('&rsquo;', "'").replace('&lsquo;', "'")
    s = s.replace('“', '"').replace('”', '"').replace('’', "'").replace('‘', "'")
    s = s.replace('**', '')
    return re.sub(r'\s+', '', s)

def split_ko(t):
    return [x.strip() for x in re.split(r'(?<=[다요]\.)\s+', t) if x.strip()]

def split_en(t):
    return [x.strip() for x in re.split(r'(?<=[.])\s+(?=[A-Z"(*“])', t) if x.strip()]

def copy_sentences(lang):
    out = []
    for line in copy_part[lang].splitlines():
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('>') or line == '---':
            continue
        if line.startswith('- '):
            line = line[2:]
        line = MEMO.sub('', line)
        out += (split_ko if lang == 'ko' else split_en)(line)
    return out

def src_visible(lang):
    s = SRC[lang]
    body = s[s.index('return ('):]
    body = re.sub(r"\{' '\}", ' ', body)
    body = re.sub(r'\{SITE\.contactEmail\}', '{EMAIL}', body)
    body = re.sub(r'<JsonLd[^>]*/>', '', body)
    # 태그·JSX 표현식 제거
    body = re.sub(r'<[^>]+>', '\n', body)
    body = re.sub(r'\{[^{}]*\}', '\n', body)
    lines = [l.strip() for l in body.splitlines()]
    # JSX 텍스트 블록: 연속 줄을 공백으로 잇는다
    blocks, cur = [], []
    for l in lines:
        if l and not re.fullmatch(r'[()\s;]*', l):
            cur.append(l)
        else:
            if cur: blocks.append(' '.join(cur)); cur = []
    if cur: blocks.append(' '.join(cur))
    return blocks

ok = True
for lang in ('ko', 'en'):
    sents = copy_sentences(lang)
    nsrc = norm(re.sub(r'<[^>]+>', '', re.sub(r"\{' '\}", ' ', SRC[lang])))
    miss = [x for x in sents if norm(x) not in nsrc]
    print(f'[{lang}] 정방향: 문안 문장 {len(sents)}개 중 배포 일치 {len(sents)-len(miss)}개, 누락·불일치 {len(miss)}개')
    for m in miss: print('   MISS:', m)
    # 역방향
    ncopy = norm(MEMO.sub('', copy_part[lang]))
    vis = []
    for b in src_visible(lang):
        vis += (split_ko if lang == 'ko' else split_en)(b)
    extra = [v for v in vis if norm(v) not in ncopy]
    print(f'[{lang}] 역방향: 배포 화면 문장 조각 {len(vis)}개 중 문안에 없는 것 {len(extra)}개')
    for e in extra: print('   EXTRA:', e)
    ok = ok and not miss
sys.exit(0 if ok else 1)
