"""리뷰어 26 — PRD v0.7 §1 D1(안 3) 원문과 SITE.description 이 글자 단위로 같은지 확인.
실행(저장소 루트): python3 -I docs/tools/reviewer-26/d1-exact-check.py"""
import re
prd = open('planning/prd.md', encoding='utf-8').read()
d1 = re.search(r'### 🆕 소개 문구.*?\n\n> "(.+?)"\n', prd, re.S).group(1)
cfg = open('src/lib/config.ts', encoding='utf-8').read()
desc = re.search(r"description:\n\s+'(여러[^']+)'", cfg).group(1)
en_meta = re.search(r"description:\n\s+'(A card-style[^']+)'", cfg).group(1)
print('PRD D1 == SITE.description:', d1 == desc, f'({len(d1)}자)')
print('SITE_EN.description 길이:', len(en_meta), '(160 이하:', len(en_meta) <= 160, ')')
