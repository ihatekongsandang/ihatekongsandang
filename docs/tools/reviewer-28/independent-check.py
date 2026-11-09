"""리뷰어 28 — 프로그래머 12 약관·소개 문구 #1~#9 독립 대조(프로그래머 도구와 다른 방식).
실행(저장소 루트, 빌드된 .next 필요 · 빌드하지 않는다): python3 docs/tools/reviewer-28/independent-check.py
- 기대값: planning/v0.2-post-release-sync.md §6 표를 직접 읽는다.
- 빌드 HTML: 정규식이 아니라 html.parser로 절(section aria-labelledby)·li·p·strong·h2를 모은다.
- 소스: JSX 엔티티·{' '}·줄바꿈을 JSX 규칙대로 풀어 기대 문구가 소스에 있는지 본다.
- 아포스트로피 목록(en 약관 화면), 직전 커밋 소스와 §6 '현행' 칸의 표기 관례 비교.
- JSON-LD 전체(중첩 포함)에서 date* 키 수집.
- 직전 커밋 대비 단어 단위 diff 조각 전부 출력(범위 이탈 확인용).
"""
import html, json, re, subprocess, sys, pathlib, difflib
from html.parser import HTMLParser

ROOT = pathlib.Path(".")
BASE = "9d969d8"
SYNC = (ROOT / "planning/v0.2-post-release-sync.md").read_text(encoding="utf-8")
sec6 = SYNC[SYNC.index("## 6. 코드 반영 필요 목록"):SYNC.index("## 7. 사용자 결정")]
rows = {}
for line in sec6.splitlines():
    if re.match(r"^\|\s*\d\s*\|", line):
        c = [x.strip() for x in line.strip()[1:-1].split("|")]
        rows[int(c[0])] = {"cur": c[3], "fin": c[4]}
def strip_memo(s):
    s = re.sub(r"\s*\((`#correction` 링크는 선택|링크 선택)\)$", "", s)
    s = re.sub(r"^\(뒤에 추가\)\s*", "", s)
    return s
EXP = {n: strip_memo(rows[n]["fin"]).replace("**", "") for n in range(1, 9)}
BOLD = {n: re.findall(r"\*\*(.+?)\*\*", rows[n]["fin"]) for n in (5, 6)}

class P(HTMLParser):
    """section 단위로 li/p/strong/h2 텍스트와 header 첫 요소 수집."""
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.stack = []; s.sec = None; s.secs = {}; s.cap = []; s.ld = []; s.inld = False; s.ldbuf = ""
        s.header_seq = []; s.in_header = 0; s.h2 = []; s.text_all = []
    def handle_starttag(s, t, a):
        a = dict(a)
        if t == "script" and a.get("type") == "application/ld+json":
            s.inld = True; s.ldbuf = ""; return
        if t == "script": s.stack.append(("script", None)); return
        if t == "section" and "aria-labelledby" in a:
            s.sec = a["aria-labelledby"]; s.secs.setdefault(s.sec, {"li": [], "p": [], "strong": []})
        if t == "header": s.in_header += 1
        if s.in_header and t in ("h1", "p") and len(s.header_seq) < 3:
            s.header_seq.append([t, a.get("class", ""), ""])
        if t in ("li", "p", "strong", "h2"):
            s.cap.append([t, s.sec, "", a.get("class", "")])
        if t == "time": s.cap_time = a
        s.stack.append((t, a))
    def handle_endtag(s, t):
        if s.inld and t == "script":
            s.inld = False; s.ld.append(s.ldbuf); return
        if s.stack and s.stack[-1][0] == "script" and t == "script": s.stack.pop(); return
        for i in range(len(s.cap) - 1, -1, -1):
            if s.cap[i][0] == t:
                tag, sec, txt, cls = s.cap.pop(i)
                txt = re.sub(r"\s+", " ", txt).strip()
                if tag == "h2": s.h2.append(txt)
                elif sec: s.secs[sec][tag].append((txt, cls))
                break
        if t == "header": s.in_header -= 1
        if t == "section": s.sec = None
        if s.stack: s.stack.pop()
    def handle_data(s, d):
        if s.inld: s.ldbuf += d; return
        if s.stack and s.stack[-1][0] == "script": return
        for c in s.cap: c[2] += d
        if s.in_header and s.header_seq: s.header_seq[-1][2] += d
        s.text_all.append(d)

def parse(p):
    x = P(); x.feed((ROOT / ".next/server/app" / p).read_text(encoding="utf-8")); x.full = re.sub(r"\s+", " ", "".join(x.text_all)); return x
pg = {"ko_terms": parse("terms.html"), "en_terms": parse("en/terms.html"), "ko_about": parse("about.html"), "en_about": parse("en/about.html")}

tot = fail = 0
def ck(label, ok, info=""):
    global tot, fail
    tot += 1; fail += (not ok)
    print(("PASS " if ok else "FAIL ") + label + (f" — {info}" if info else ""))

print("[A] 빌드 HTML(html.parser) 대조")
for n, k in ((1, "ko_terms"), (2, "en_terms")):
    ps = [t for t, _ in pg[k].secs["anonymous"]["p"]]
    ck(f"#{n} {k} anonymous 절 p 1개·끝 문장 일치", len(ps) == 1 and ps[0].endswith(" " + EXP[n]), EXP[n][:40])
for n, k in ((3, "ko_about"), (4, "en_about")):
    ps = pg[k].secs["correction"]["p"]
    idx = [i for i, (t, c) in enumerate(ps) if t == EXP[n]]
    ok = len(idx) == 1 and "border-dashed" in ps[idx[0] - 1][1] and ps[idx[0]][1] == "text-xs text-muted-foreground"
    ck(f"#{n} {k} correction 절: 준비 중 상자(p.border-dashed) 바로 다음 p.text-xs = 문구", ok, EXP[n])
for n, k in ((5, "ko_terms"), (6, "en_terms")):
    lis = [t for t, _ in pg[k].secs["sourcing"]["li"]]
    ck(f"#{n} {k} sourcing li 4개·셋째 li 전문 일치", len(lis) == 4 and lis[2] == EXP[n])
    st = [t for t, _ in pg[k].secs["sourcing"]["strong"]]
    ck(f"#{n} {k} 굵게 = §6 ** 범위(마침표 밖)", BOLD[n][0] in st and not any(x.endswith(".") for x in st), repr(st))
for n, k in ((7, "ko_terms"), (8, "en_terms")):
    lis = [t for t, _ in pg[k].secs["sourcing"]["li"]]
    tail = rows[n]["cur"].lstrip("…")
    ck(f"#{n} {k} sourcing 둘째 li = …{tail[-12:]} + 덧붙임(끝)", lis[1].endswith(tail + " " + EXP[n]))
# 절 이름 인용 = 실제 h2
ck("#1 인용 절 이름 = 약관 ko 실제 h2", "정정·삭제 요청 방법과 처리 기준" in pg["ko_terms"].h2 and "‘정정·삭제 요청 방법과 처리 기준’" in EXP[1], repr(pg["ko_terms"].h2))
ck("#2 인용 절 이름 = 약관 en 실제 h2", "How to request a correction or removal, and how we handle it" in pg["en_terms"].h2)
ck("#1·#2 인용 절은 anonymous 절보다 위(문구 '위'·'above')", pg["ko_terms"].h2.index("정정·삭제 요청 방법과 처리 기준") < len(pg["ko_terms"].h2) - 1)
# #5·#6 인용 UI 이름 = i18n 실제 라벨
i18n = (ROOT / "src/lib/i18n.ts").read_text(encoding="utf-8")
ck("#5 ‘원문 미리보기’ = i18n ko sourcePreview", "sourcePreview: '원문 미리보기'" in i18n)
ck("#6 “Original post preview” = i18n en sourcePreview", "sourcePreview: 'Original post preview'" in i18n)
# #8 인용
q = re.search(r"“(.+?)”", EXP[8]).group(1)
cfg = (ROOT / "src/lib/config.ts").read_text(encoding="utf-8")
ck("#8 인용 ⊂ SITE_EN.aboutIntro 소스", q in cfg)
ck("#8 인용 ⊂ /en/about 빌드 화면 텍스트", q in pg["en_about"].full)
# #7 인용 = 한국어 D1
ck("#7 인용 “신문법 등에 따라 등록된 매체” ⊂ /about 빌드 화면", "신문법 등에 따라 등록된 매체" in pg["ko_about"].full)
# #9
cd = re.search(r"termsLastUpdated:\s*'(\d{4}-\d{2}-\d{2})'", cfg).group(1)
for k, lab in (("ko_terms", "최종 개정"), ("en_terms", "Last updated")):
    hs = pg[k].header_seq
    ok = len(hs) >= 2 and hs[0][0] == "h1" and hs[1][0] == "p" and hs[1][1] == "text-xs text-muted-foreground" and re.sub(r"\s+", " ", hs[1][2]).strip() == f"{lab}: {cd}"
    ck(f"#9 {k} header: h1 → p.text-xs '{lab}: {cd}'", ok, repr(hs[:2]))
    raw = (ROOT / ".next/server/app" / ("terms.html" if k == "ko_terms" else "en/terms.html")).read_text(encoding="utf-8")
    ck(f"#9 {k} <time dateTime=상수> 1개", raw.count(f'<time dateTime="{cd}">{cd}</time>') == 1)
    keys = []
    def walk(o, path=""):
        if isinstance(o, dict):
            for kk, v in o.items():
                if "date" in kk.lower(): keys.append((path + "/" + kk, v))
                walk(v, path + "/" + kk)
        elif isinstance(o, list):
            for i, v in enumerate(o): walk(v, f"{path}[{i}]")
    lds = [json.loads(x) for x in pg[k].ld]
    for d in lds: walk(d)
    print(f"  {k} JSON-LD 블록 {len(lds)}개 · @type {[d.get('@type') for d in lds]} · date* 키 {keys}")
    ck(f"#9 {k} JSON-LD date* 키가 상수와 모순 없음", all(v == cd for _, v in keys))
# 옛 문구 0
for k, o in (("ko_terms", "위 4항"), ("en_terms", "Section 4"), ("ko_terms", "— 기사 요약이나"), ("en_terms", "we never copy")):
    ck(f"옛 문구 0: {k} '{o}'", o not in pg[k].full)

print("\n[B] 소스(JSX 규칙으로 풀어 쓴 텍스트) 대조")
ENT = {"&ldquo;": "“", "&rdquo;": "”", "&lsquo;": "‘", "&rsquo;": "’", "&apos;": "'", "&quot;": '"', "&amp;": "&"}
def jsx_text(src):
    lines = src.split("\n")
    out = []
    for ln in lines:  # JSX: 줄 앞뒤 공백 제거, 빈 줄 제거, 줄 사이는 공백 하나
        s = ln.strip()
        if s: out.append(s)
    t = " ".join(out)
    t = t.replace("{' '}", " ")
    t = re.sub(r"<[^>]+>", "", t)  # 태그 제거(줄 사이 공백은 남아 있으므로 아래에서 태그 경계 공백만 정리)
    for a, b in ENT.items(): t = t.replace(a, b)
    return re.sub(r"\s+", " ", t)
srcs = {"ko_terms": "src/app/(ko)/terms/page.tsx", "en_terms": "src/app/(en)/en/terms/page.tsx", "ko_about": "src/app/(ko)/about/page.tsx", "en_about": "src/app/(en)/en/about/page.tsx"}
for n, k in ((1, "ko_terms"), (2, "en_terms"), (3, "ko_about"), (4, "en_about"), (7, "ko_terms"), (8, "en_terms")):
    t = jsx_text((ROOT / srcs[k]).read_text(encoding="utf-8"))
    ck(f"#{n} 소스({srcs[k]}) 풀어 쓴 텍스트에 문구 1회", t.count(EXP[n]) == 1, str(t.count(EXP[n])))
# #5·#6은 </strong> 다음 줄이 '.'로 시작한다. 이 단순 풀이는 줄 결합 공백을 넣으므로(실제 JSX는 태그 경계 줄바꿈을 지운다)
# 굵게 앞·굵게·뒤 조각으로 본다. 전문 일치는 빌드(A)에서 확인했다.
for n, k in ((5, "ko_terms"), (6, "en_terms")):
    t = jsx_text((ROOT / srcs[k]).read_text(encoding="utf-8"))
    a, b = EXP[n].split(BOLD[n][0])
    ck(f"#{n} 소스: 굵게 앞·굵게·뒤 조각 각 1회", t.count(a.strip()) == 1 and t.count(BOLD[n][0]) == 1 and t.count(b.lstrip(". ").strip()) == 1)
print("\n[C] 아포스트로피 판정 근거")
en_full = pg["en_terms"].full
curly = re.findall(r"\w’\w", en_full); straight = re.findall(r"\w'\w", en_full)
print(f"  /en/terms 화면: 단어 속 ’ {len(curly)}개 {curly} · ' {len(straight)}개 {straight}")
ctx = [en_full[m.start()-25:m.end()+25] for m in re.finditer(r"\w'\w", en_full)]
for c in ctx: print("   ' 위치:", c)
old_en = subprocess.run(["git", "show", f"{BASE}:src/app/(en)/en/terms/page.tsx"], capture_output=True, text=True).stdout
new_en = (ROOT / srcs["en_terms"]).read_text(encoding="utf-8")
print(f"  en 약관 소스 {BASE}: &rsquo; {old_en.count('&rsquo;')} · &apos; {old_en.count('&apos;')} | 현재: &rsquo; {new_en.count('&rsquo;')} · &apos; {new_en.count('&apos;')}")
old6 = jsx_text(old_en)
cur6 = rows[6]["cur"].replace("**", "")
ck("관례 근거: §6 #6 '현행' 칸(곧은 ')은 직전 커밋 소스(’)를 ’→' 로 적은 것", cur6 not in old6 and cur6 in old6.replace("’", "'"))
cur8 = rows[8]["cur"].lstrip("…")
ck("관례 근거: §6 #8 '현행' 칸도 같은 방식(직전 소스 ’ 없음 구간 → 그대로 일치)", cur8 in old6)
print("  §6 머리: 엔티티 관례 `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;` 명시 =", "엔티티 관례: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`" in sec6)
apos_about = (ROOT / "src/app/(en)/en/about/page.tsx").read_text(encoding="utf-8")
intro = re.search(r'aboutIntro:\s*"(.*?)",', cfg, flags=re.S).group(1)
print(f"  en 소개 소스: &rsquo; {apos_about.count('&rsquo;')} · &apos; {apos_about.count('&apos;')} · SITE_EN.aboutIntro 안 곧은 ' {intro.count(chr(39))}개 · ’ {intro.count(chr(8217))}개")

print("\n[D] 직전 커밋 대비 단어 단위 diff 조각(범위 이탈 확인)")
for f in list(srcs.values()) + ["src/lib/config.ts"]:
    old = subprocess.run(["git", "show", f"{BASE}:{f}"], capture_output=True, text=True).stdout.split()
    new = (ROOT / f).read_text(encoding="utf-8").split()
    ops = [o for o in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes() if o[0] != "equal"]
    print(f"  {f}: 조각 {len(ops)}개")
    for tag, i1, i2, j1, j2 in ops:
        print(f"    {tag}: -[{' '.join(old[i1:i2])[:160]}] +[{' '.join(new[j1:j2])[:220]}]")

print(f"\n합계 {tot}건 · PASS {tot - fail} · FAIL {fail}")
sys.exit(1 if fail else 0)
