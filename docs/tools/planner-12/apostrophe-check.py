#!/usr/bin/env python3
"""기획자 12 — 리뷰 27 재현 도구의 영문 MISS 2건이 아포스트로피 표기 때문인지 분리 확인.
실행: 저장소 루트에서 `python3 -I docs/tools/planner-12/apostrophe-check.py`
규칙(planning/terms-page-copy.md §C): 문안의 곧은 '는 &rsquo;를 뜻한다. 예외는 SITE_EN.aboutIntro 인용(#8)뿐.
기대: #8은 배포 &apos;와 규칙이 일치(OK), #6은 배포 &apos;가 규칙(&rsquo;)과 1자 다름(DIFF = 대기 항목 D1).
"""
import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parents[3]
src = (ROOT / 'src/app/(en)/en/terms/page.tsx').read_text(encoding='utf-8')
src = re.sub(r"\{' '\}", ' ', src); src = re.sub(r'<[^>]+>', '', src)
n = lambda s: re.sub(r'\s+', '', s)
checks = {
 '#8 (인용, 곧은 \' 예외)': ("outlets registered under Korea&apos;s Act on the Promotion of Newspapers and related laws", "Korea's"),
 '#6 (규칙: &rsquo;)': ("the summaries and text we write never copy a news article&rsquo;s summary or body text", "article's"),
}
for k, (expected_src, _) in checks.items():
    ok = n(expected_src) in n(src)
    print(f'{k}: 규칙대로 쓴 문자열이 배포 소스에 {"있음 -> OK" if ok else "없음 -> DIFF"}')
# 나머지 문장은 도구가 아포스트로피를 정규화해 일치 판정; 여기서는 두 문장의 다른 글자는 같은지 확인
for k, base in (('#8 아포스트로피 외', "outlets registered under Korea&apos;s Act"), ('#6 아포스트로피 외', "never copy a news article&apos;s summary")):
    print(f'{k}: 배포에 &apos; 형태로 존재 -> {n(base) in n(src)}')
print('&apos; 개수(약관 en 소스):', src.count('&apos;'), '/ &rsquo; 개수:', src.count('&rsquo;'))
