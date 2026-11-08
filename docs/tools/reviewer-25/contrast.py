# 리뷰어 25 — 디자이너 02 시안 대비 재계산(WCAG 2.x 상대휘도). 토큰 값은 src/app/globals.css :root에서 읽는다.
# 실행(저장소 루트): python3 -I docs/tools/reviewer-25/contrast.py > docs/tools/reviewer-25/contrast-output.txt
import re
css = open('src/app/globals.css', encoding='utf-8').read()
root = css[css.index(':root'):]
root = root[:root.index('}')]
tok = dict(re.findall(r'--([a-z-]+):\s*(#[0-9a-fA-F]{6})', root))
def lum(h):
    c = [int(h[i:i+2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
def ratio(a, b):
    la, lb = sorted([lum(tok[a]), lum(tok[b])], reverse=True)
    return (la + 0.05) / (lb + 0.05)
print('토큰:', {k: tok[k] for k in ('background','foreground','surface','surface-strong','muted-foreground','border','link','ring')})
pairs = [
 ('foreground','background','버튼·본문 텍스트'),
 ('foreground','surface-strong','Badge 텍스트 / hover 버튼 텍스트'),
 ('muted-foreground','background','보조 텍스트(카드 footer·점선 박스)'),
 ('muted-foreground','surface','보조 텍스트 on surface'),
 ('link','background','링크'),
 ('ring','background','포커스 링(비텍스트 3:1)'),
 ('ring','surface-strong','포커스 링 on hover 배경'),
 ('border','background','outline 버튼 테두리(비텍스트)'),
 ('border','surface-strong','Badge 테두리 on Badge 배경'),
 ('surface-strong','background','Badge·hover 배경 vs 페이지 배경'),
]
for a, b, n in pairs:
    print(f'{n}: --{a} on --{b} = {ratio(a, b):.2f}:1')
