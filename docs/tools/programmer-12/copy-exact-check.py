"""프로그래머 12 — 약관·소개 문구 #1~#9가 빌드 HTML에 글자 그대로 들어갔는지 확인(programmer-11-1/copy-exact-check.py 방식).
실행(저장소 루트, `npm run build` 뒤): python3 docs/tools/programmer-12/copy-exact-check.py
기대 문장은 `planning/v0.2-post-release-sync.md` §6 표의 "최종 문구" 칸을 직접 읽는다(리뷰 27 승인본).
칸에서 빼는 것은 기획 메모뿐이다: 끝의 "(`#correction` 링크는 선택)"·"(링크 선택)", 앞의 "(뒤에 추가) ", 굵게 표시 `**`.
따옴표·아포스트로피는 바꾸지 않고 그대로 비교한다.
"""
import html, re, sys, pathlib, json

ROOT = pathlib.Path(".")
SYNC = (ROOT / "planning/v0.2-post-release-sync.md").read_text(encoding="utf-8")
sec6 = SYNC[SYNC.index("## 6. 코드 반영 필요 목록"):SYNC.index("## 7.")]
rows = {}
for line in sec6.splitlines():
    m = re.match(r"\|\s*(\d)\s*\|", line)
    if m:
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        rows[int(m.group(1))] = {"current": cells[3], "final": cells[4]}
assert sorted(rows) == list(range(1, 10)), sorted(rows)

def clean(s):
    s = re.sub(r"\s*\((?:`#correction` 링크는 선택|링크 선택)\)\s*$", "", s)
    s = re.sub(r"^\(뒤에 추가\)\s*", "", s)
    return s.replace("**", "").strip()

EXP = {n: clean(rows[n]["final"]) for n in range(1, 9)}

def text_of(raw):
    raw = re.sub(r"<script.*?</script>", " ", raw, flags=re.S)
    t = html.unescape(re.sub(r"<[^>]+>", "", raw))
    return re.sub(r"\s+", " ", t)

def load(p):
    raw = (ROOT / ".next/server/app" / p).read_text(encoding="utf-8")
    return raw, text_of(raw)

pages = {k: load(p) for k, p in {"ko_terms": "terms.html", "en_terms": "en/terms.html", "ko_about": "about.html", "en_about": "en/about.html"}.items()}
fail = 0
total = 0
def check(label, ok, detail=""):
    global fail, total
    total += 1
    fail += 0 if ok else 1
    print(f"{'PASS' if ok else 'FAIL'}  {label}" + (f" — {detail}" if detail else ""))

def li_texts(raw, sec_id):
    """해당 절(<section aria-labelledby=id>)의 <li> 텍스트 목록."""
    m = re.search(r'<section aria-labelledby="%s".*?</section>' % sec_id, raw, flags=re.S)
    return [text_of(x).strip() for x in re.findall(r"<li>(.*?)</li>", m.group(0), flags=re.S)] if m else []

def p_texts(raw, sec_id):
    m = re.search(r'<section aria-labelledby="%s".*?</section>' % sec_id, raw, flags=re.S)
    return [text_of(x).strip() for x in re.findall(r"<p[^>]*>(.*?)</p>", m.group(0), flags=re.S)] if m else []

# #1·#2 anonymous 절 마지막 문장
for n, key in ((1, "ko_terms"), (2, "en_terms")):
    ps = p_texts(pages[key][0], "anonymous")
    check(f"#{n} {key} anonymous 절 마지막 문장 = 승인 문구", len(ps) == 1 and ps[0].endswith(EXP[n]), EXP[n])

# #3·#4 correction 절: 준비 중 상자 바로 다음 <p class="text-xs text-muted-foreground">
for n, key in ((3, "ko_about"), (4, "en_about")):
    raw = pages[key][0]
    m = re.search(r'<p class="rounded-\[var\(--radius-card\)\] border border-dashed p-4 text-sm">.*?</p><p class="text-xs text-muted-foreground">(.*?)</p>', raw, flags=re.S)
    got = text_of(m.group(1)).strip() if m else None
    check(f"#{n} {key} 준비 중 상자 바로 아래 text-xs 문장 = 승인 문구", got == EXP[n], repr(got))
    check(f"#{n} {key} 문장 1회만", pages[key][1].count(EXP[n]) == 1)

# #5·#6 sourcing 셋째 <li> 전체 = 승인 문구
for n, key in ((5, "ko_terms"), (6, "en_terms")):
    lis = li_texts(pages[key][0], "sourcing")
    check(f"#{n} {key} sourcing 셋째 <li> 전문 = 승인 문구", len(lis) == 4 and lis[2] == EXP[n], repr(lis[2] if len(lis) > 2 else None))

# 굵게 범위: 현행 칸의 ** 위치를 승인 문구에서도 유지(굵게 = ** 안 문장)
for n, key in ((5, "ko_terms"), (6, "en_terms")):
    bold = re.findall(r"\*\*(.+?)\*\*", rows[n]["final"])
    raw = pages[key][0]
    sec = re.search(r'<section aria-labelledby="sourcing".*?</section>', raw, flags=re.S).group(0)
    strongs = [re.sub(r"\s+", " ", html.unescape(s)).strip() for s in re.findall(r"<strong[^>]*>(.*?)</strong>", sec, flags=re.S)]
    check(f"#{n} {key} 굵게 범위 = 기획 ** 범위", len(bold) == 1 and bold[0] in strongs, repr(bold))

# #7·#8 sourcing 둘째 <li> = 현행 문장 + " " + 덧붙임
for n, key in ((7, "ko_terms"), (8, "en_terms")):
    lis = li_texts(pages[key][0], "sourcing")
    tail = rows[n]["current"].lstrip("…").strip()
    ok = len(lis) == 4 and lis[1].endswith(tail + " " + EXP[n])
    check(f"#{n} {key} sourcing 둘째 <li> 끝 = 현행 끝 문장 + 덧붙임", ok, EXP[n])

# #8 인용 = SITE_EN.aboutIntro 원문(소스·빌드 /en/about 양쪽)
quote = re.search(r"“(.+?)”", EXP[8]).group(1)
cfg = (ROOT / "src/lib/config.ts").read_text(encoding="utf-8")
about_intro = re.search(r'aboutIntro:\s*\n\s*"(.*?)",\n', cfg, flags=re.S).group(1)
check(f"#8 인용 ⊂ SITE_EN.aboutIntro(소스)", quote in about_intro, quote)
check(f"#8 인용 ⊂ /en/about 빌드 본문", quote in pages["en_about"][1])
check(f"#8 /en/terms 빌드에 인용이 따옴표째 들어감", f"“{quote}”" in pages["en_terms"][1])

# #9 제목 아래 첫 줄
cdate = re.search(r"termsLastUpdated:\s*'([^']+)'", cfg).group(1)
check("#9 상수 termsLastUpdated = 2026-11-09(오더 지정값)", cdate == "2026-11-09", cdate)
for key, label in (("ko_terms", "최종 개정"), ("en_terms", "Last updated")):
    raw = pages[key][0]
    m = re.search(r"<header[^>]*><h1[^>]*>.*?</h1><p([^>]*)>(.*?)</p>", raw, flags=re.S)
    check(f"#9 {key} h1 바로 다음 요소 = 개정일 줄", bool(m))
    if m:
        cls, inner = m.group(1), m.group(2)
        check(f"#9 {key} 문구 = \"{label}: {cdate}\"", text_of(inner).strip() == f"{label}: {cdate}", repr(text_of(inner)))
        check(f"#9 {key} <time datetime> = 상수", f'<time dateTime="{cdate}">{cdate}</time>' in inner, inner)
        check(f"#9 {key} 작은 글씨(text-xs text-muted-foreground)", 'class="text-xs text-muted-foreground"' in cls, cls)
    lds = [json.loads(x) for x in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', raw, flags=re.S)]
    dm = [d.get("dateModified") for d in lds if isinstance(d, dict) and "dateModified" in d]
    check(f"#9 {key} JSON-LD dateModified 없음 또는 상수와 일치(블록 {len(lds)}개, dateModified {len(dm)}개)", all(v == cdate for v in dm), repr(dm))

# 옛 문구 0
OLD = [("ko_terms", "위 4항"), ("en_terms", "Section 4"),
       ("ko_terms", "— 기사 요약이나 본문을 그대로 옮기지 않습니다"), ("en_terms", "— we never copy a news article")]
for key, o in OLD:
    check(f"옛 문구 0: {key} \"{o}\"", o not in pages[key][1])

# 승인 문구 각 1회(중복 삽입 없음)
for n, key in ((1, "ko_terms"), (2, "en_terms"), (5, "ko_terms"), (6, "en_terms"), (7, "ko_terms"), (8, "en_terms")):
    check(f"#{n} {key} 승인 문구 1회", pages[key][1].count(EXP[n]) == 1, str(pages[key][1].count(EXP[n])))

# #3·#4 소스 위치: contactEmail null 분기(`) : (` ~ `)}`) 안에만 있음
for n, f in ((3, "src/app/(ko)/about/page.tsx"), (4, "src/app/(en)/en/about/page.tsx")):
    src = (ROOT / f).read_text(encoding="utf-8")
    flat = re.sub(r"\s+", " ", src)
    m = re.search(r"\{SITE\.contactEmail \? \((.*?)\) : \((.*?)\)\}", flat)
    check(f"#{n} 소스: 문장이 contactEmail null 분기 안에만 있음", bool(m) and EXP[n] in m.group(2) and EXP[n] not in m.group(1) and flat.count(EXP[n]) == 1)

print(f"합계 {total}건 · PASS {total - fail} · FAIL {fail}")
sys.exit(1 if fail else 0)
