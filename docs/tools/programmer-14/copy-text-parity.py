"""프로그래머 14 — 소개·약관(ko·en) 화면 글자 불변 확인.
사용: python3 docs/tools/programmer-14/copy-text-parity.py <변경 전 server/app 사본> <변경 후 server/app(.next/server/app)>
각 페이지 <main>…</main>의 보이는 글자(태그·스크립트 제거, 공백 정규화)를 글자 단위로 비교한다. 다르면 첫 차이 주변을 출력하고 종료 코드 1.
"""
import html, re, sys
before, after = sys.argv[1:3]
PAGES = ['about.html', 'terms.html', 'en/about.html', 'en/terms.html']
def text(path):
    raw = open(path, encoding='utf-8').read()
    m = re.search(r'<main[^>]*>(.*?)</main>', raw, flags=re.S)
    body = re.sub(r'<script.*?</script>', ' ', m.group(1), flags=re.S)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', body))).strip()
fail = 0
for p in PAGES:
    a, b = text(f'{before}/{p}'), text(f'{after}/{p}')
    if a == b:
        print(f'PASS  {p} — 같음({len(a)}자)')
    else:
        fail += 1
        i = next((k for k in range(min(len(a), len(b))) if a[k] != b[k]), min(len(a), len(b)))
        print(f'FAIL  {p} @{i}\n  전: {a[max(0,i-60):i+60]!r}\n  후: {b[max(0,i-60):i+60]!r}')
print(f'합계 {len(PAGES)}건 · PASS {len(PAGES)-fail} · FAIL {fail}')
sys.exit(1 if fail else 0)
