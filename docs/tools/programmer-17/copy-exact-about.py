"""프로그래머 17 — 소개 페이지(ko /about · en /en/about) "인용·저작권" 절에서 SNS 저장 이미지 줄만 빠졌는지 확인한다.

실행(저장소 루트, `npm run build` 뒤): python3 docs/tools/programmer-17/copy-exact-about.py [server/app 경로]
기대값은 손으로 옮기지 않고 `planning/q1-redirect-q2-sns-image-plan.md` §2.2(ko 목록 1~4, en 인용 블록)에서 읽은 뒤
SNS 줄(ko "SNS 게시물을 다룬 글 중 상당수…", en "Many posts about social media posts…") 하나만 뺀다(§2.2 "저장본이 0건이 되면 해당 줄 삭제").
읽기·목록 분해 방식은 `docs/tools/programmer-16/copy-exact-c3-c4.py`와 같다(그 도구는 프로그래머 16 시점 증거라 고치지 않았다).
"""
import html, re, sys, pathlib

ROOT = pathlib.Path(".")
APP = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / ".next/server/app"
PLAN = (ROOT / "planning/q1-redirect-q2-sns-image-plan.md").read_text(encoding="utf-8")
KO_SNS = "SNS 게시물을 다룬 글 중 상당수"
EN_SNS = "Many posts about social media posts"

total = fail = 0
def check(label, ok, detail=""):
    global total, fail
    total += 1
    fail += 0 if ok else 1
    print(f"{'PASS' if ok else 'FAIL'}  {label}" + ("" if ok or not detail else f" — {detail}"))

def text_of(raw):
    raw = re.sub(r"<script.*?</script>", " ", raw, flags=re.S)
    t = html.unescape(re.sub(r"<[^>]+>", "", raw))
    return re.sub(r"\s+", " ", t).strip()

def section(raw, sec_id):
    m = re.search(r'<section aria-labelledby="%s".*?</section>' % sec_id, raw, flags=re.S)
    return m.group(0) if m else ""

def li_tree(sec):
    body = re.search(r"<ul[^>]*>(.*)</ul>", sec, flags=re.S).group(1)
    stack, outer = [], []
    for m in re.finditer(r"<(/?)(ul|li)\b[^>]*>", body):
        if m.group(1) != "/":
            stack.append((m.group(2), m.end()))
        else:
            tag0, e = stack.pop()
            if tag0 == "li" and not stack:
                outer.append(body[e:m.start()])
    items = []
    for inner in outer:
        sub = re.search(r"<ul[^>]*>(.*)</ul>", inner, flags=re.S)
        own = inner[: sub.start()] if sub else inner
        subs = [text_of(x) for x in re.findall(r"<li>(.*?)</li>", sub.group(1), flags=re.S)] if sub else []
        items.append((text_of(own), subs))
    return items

def md_clean(s):
    return re.sub(r"\s+", " ", s.replace("**", "")).strip()

# ---------- 기대값 ----------
sec22 = PLAN[PLAN.index("### 2.2 "):PLAN.index("### 2.3 ")]
ko_block = sec22[sec22.index("1. 외부 글은"):sec22.index("**15-1 정정본과 달라진 곳**")]
KO, KO_BOLD, ko_sns_raw = [], [], None
for line in ko_block.splitlines():
    m = re.match(r"^(\d)\. (.*)$", line)
    s = re.match(r"^   - (.*)$", line)
    if s and md_clean(s.group(1)).startswith(KO_SNS):
        ko_sns_raw = s.group(1)
        continue
    if m or s:
        KO_BOLD += re.findall(r"\*\*(.+?)\*\*", (m or s).group(m and 2 or 1))
    if m:
        KO.append([md_clean(m.group(2)), []])
    elif s:
        KO[-1][1].append(md_clean(s.group(1)))
check("기대값 ko: 계획 §2.2에서 SNS 줄 1개를 찾아 뺌", ko_sns_raw is not None)
check("기대값 ko: 목록 4개·2번 하위 4개(5 − SNS 1)", len(KO) == 4 and len(KO[1][1]) == 4, repr([len(x[1]) for x in KO]))
KO_SNS_BOLD = re.findall(r"\*\*(.+?)\*\*", ko_sns_raw or "")
check("기대값 ko: 빠진 굵게 3개 = SNS 줄의 것", KO_SNS_BOLD == [KO_SNS, "저장해", "정리하기로 했으며"], repr(KO_SNS_BOLD))

en_block = sec22[sec22.index("> **Quotes, images and copyright**"):sec22.index("- 🆕 16-1(리뷰 34")]
EN, en_sns = [], None
for line in en_block.splitlines():
    m = re.match(r"^> - (.*)$", line)
    s = re.match(r"^>   - (.*)$", line)
    if s and md_clean(s.group(1)).startswith(EN_SNS):
        en_sns = md_clean(s.group(1))
        continue
    if m:
        EN.append([md_clean(m.group(1)), []])
    elif s:
        EN[-1][1].append(md_clean(s.group(1)))
check("기대값 en: 계획 §2.2에서 SNS 줄 1개를 찾아 뺌", en_sns is not None)
check("기대값 en: 목록 4개·2번 하위 4개", len(EN) == 4 and len(EN[1][1]) == 4, repr([len(x[1]) for x in EN]))

# ---------- 빌드 대조 ----------
for lang, path, exp, title in (("ko", "about.html", KO, "인용·저작권"), ("en", "en/about.html", EN, "Quotes, images and copyright")):
    raw = (APP / path).read_text(encoding="utf-8")
    sec = section(raw, "copyright")
    check(f"{lang} /{path[:-5]} copyright 절 있음", bool(sec))
    t = re.search(r'<h2 id="copyright"[^>]*>(.*?)</h2>', sec, flags=re.S)
    check(f"{lang} 절 제목 = {title}", bool(t) and text_of(t.group(1)) == title)
    got = li_tree(sec)
    check(f"{lang} 바깥 목록 4개", len(got) == 4, repr(len(got)))
    for i, (e, subs) in enumerate(exp):
        g = got[i] if i < len(got) else ("", [])
        check(f"{lang} {i+1}번 본문 글자 그대로", g[0] == e, f"\n   exp={e}\n   got={g[0]}")
        check(f"{lang} {i+1}번 하위 항목 수 {len(subs)}", len(g[1]) == len(subs), repr(len(g[1])))
        for j, s in enumerate(subs):
            gs = g[1][j] if j < len(g[1]) else None
            check(f"{lang} {i+1}번 하위 {j+1} 글자 그대로", gs == s, f"\n   exp={s}\n   got={gs}")
    whole = text_of(raw)
    for needle in ((KO_SNS, "저장해", "정리하기로 했으며", "이미지(썸네일)") if lang == "ko"
                   else (EN_SNS, "stored on this site", "phase this out")):
        check(f"{lang} 페이지 전체에 '{needle}' 0회", whole.count(needle) == 0, repr(whole.count(needle)))
    if lang == "ko":
        strongs = [text_of(s) for s in re.findall(r"<strong[^>]*>(.*?)</strong>", sec, flags=re.S)]
        check(f"ko 굵게 범위 = 기획 ** 범위 − SNS 줄 3개({len(KO_BOLD)}개, 순서 포함)", strongs == KO_BOLD, f"{strongs} vs {KO_BOLD}")
    else:
        order = [m.group(1) for m in re.finditer(r'<section aria-labelledby="([^"]+)"', raw)]
        check("en 절 순서 translation → copyright → correction", order[:3] == ["translation", "copyright", "correction"], repr(order))

print(f"\n{total - fail}/{total} PASS")
sys.exit(1 if fail else 0)
