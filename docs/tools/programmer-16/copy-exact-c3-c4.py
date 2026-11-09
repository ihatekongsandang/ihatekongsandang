"""프로그래머 16 — C3(용어 "주제")·C4(안내문·소개 "인용·저작권"/영어 "Quotes, images and copyright") 문구가
빌드 HTML에 글자 그대로 들어갔는지 확인한다. 기존 38건(`programmer-12/copy-exact-check.py`)과 따로 돌린다.

실행(저장소 루트, `npm run build` 뒤): python3 docs/tools/programmer-16/copy-exact-c3-c4.py [server/app 경로]
기대 문장은 손으로 옮겨 적지 않고 기획 문서에서 직접 읽는다.
- C4 ko·en 소개 문안: `planning/q1-redirect-q2-sns-image-plan.md` §2.2 (ko 목록 1~4, en 인용 블록)
- C4 안내문: `planning/v0.9-copy-and-code-list.md` §2.1 표 "확정" 칸
- C3: `planning/v0.9-copy-and-code-list.md` §1 표 + 같은 절의 원칙("화면·메타만 주제로")
기획 문서에서 빼는 것은 마크다운 표시뿐이다: 목록 기호(`1.`·`-`), 인용 `>`, 굵게 `**`. 따옴표·아포스트로피는 그대로 비교한다.
굵게 범위(`**…**`)는 ko 소개에서 `<strong>` 목록과 따로 대조한다.
"""
import html, re, sys, pathlib

ROOT = pathlib.Path(".")
APP = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / ".next/server/app"
PLAN = (ROOT / "planning/q1-redirect-q2-sns-image-plan.md").read_text(encoding="utf-8")
V09 = (ROOT / "planning/v0.9-copy-and-code-list.md").read_text(encoding="utf-8")

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

def page(p):
    return (APP / p).read_text(encoding="utf-8")

def section(raw, sec_id):
    m = re.search(r'<section aria-labelledby="%s".*?</section>' % sec_id, raw, flags=re.S)
    return m.group(0) if m else ""

def li_tree(sec):
    """절의 바깥 <ul> 아래 목록을 (항목 자체 글자, [하위 항목 글자…])로 돌려준다. 중첩 1단까지."""
    body = re.search(r"<ul[^>]*>(.*)</ul>", sec, flags=re.S).group(1)
    items, depth, start, i = [], 0, None, 0
    toks = list(re.finditer(r"<(/?)(ul|li)\b[^>]*>", body))
    # 바깥 li 범위 찾기
    stack = []
    outer = []
    for m in toks:
        closing, tag = m.group(1) == "/", m.group(2)
        if not closing:
            stack.append((tag, m.start(), m.end()))
        else:
            tag0, s, e = stack.pop()
            if tag0 == "li" and not stack:
                outer.append(body[e:m.start()])
    for inner in outer:
        sub = re.search(r"<ul[^>]*>(.*)</ul>", inner, flags=re.S)
        own = inner[: sub.start()] if sub else inner
        subs = [text_of(x) for x in re.findall(r"<li>(.*?)</li>", sub.group(1), flags=re.S)] if sub else []
        items.append((text_of(own), subs))
    return items

def md_clean(s):
    return re.sub(r"\s+", " ", s.replace("**", "")).strip()

# ---------- 기대값: 계획 §2.2 ko ----------
sec22 = PLAN[PLAN.index("### 2.2 "):PLAN.index("### 2.3 ")]
ko_block = sec22[sec22.index("1. 외부 글은"):sec22.index("**15-1 정정본과 달라진 곳**")]
KO = []  # [(text, [subs]), bolds]
KO_BOLD = re.findall(r"\*\*(.+?)\*\*", ko_block)
for line in ko_block.splitlines():
    m = re.match(r"^(\d)\. (.*)$", line)
    s = re.match(r"^   - (.*)$", line)
    if m:
        KO.append([md_clean(m.group(2)), []])
    elif s:
        KO[-1][1].append(md_clean(s.group(1)))
check("기대값 ko: 목록 4개·2번 하위 5개", len(KO) == 4 and len(KO[1][1]) == 5 and all(not x[1] for i, x in enumerate(KO) if i != 1), repr([len(x[1]) for x in KO]))

# ---------- 기대값: 계획 §2.2 en ----------
en_block = sec22[sec22.index("> **Quotes, images and copyright**"):sec22.index("- 🆕 16-1(리뷰 34")]
EN_TITLE = None
EN = []
for line in en_block.splitlines():
    t = re.match(r"^> \*\*(.+)\*\*$", line)
    m = re.match(r"^> - (.*)$", line)
    s = re.match(r"^>   - (.*)$", line)
    if t:
        EN_TITLE = t.group(1)
    elif m:
        EN.append([md_clean(m.group(1)), []])
    elif s:
        EN[-1][1].append(md_clean(s.group(1)))
check("기대값 en: 절 제목 = Quotes, images and copyright(오더 지정)", EN_TITLE == "Quotes, images and copyright", repr(EN_TITLE))
check("기대값 en: 목록 4개·2번 하위 5개", len(EN) == 4 and len(EN[1][1]) == 5, repr([len(x[1]) for x in EN]))

# 리뷰 34 §2.4 en 6줄이 기대값(계획 §2.2 en)에 글자 그대로 들어 있는지 — 오더 "§2.4 정정 문안 = 계획 §2.2 en"
REVIEW = (ROOT / "docs/reviews/planner-16-q1-q2-plan-review.md").read_text(encoding="utf-8")
r24 = REVIEW[REVIEW.index("### 2.4"):REVIEW.index("## 3.")]
r_en = r24[r24.index("**en**"):]
r_lines = [md_clean(re.sub(r"^>\s*(?:-\s*)?", "", l.strip()).lstrip("- ").strip()) for l in r_en.splitlines() if re.match(r"^>\s+(\s*)- ", l)]
en_flat = [x[0] for x in EN] + [y for x in EN for y in x[1]]
check(f"리뷰 34 §2.4 en {len(r_lines)}줄 ⊂ 계획 §2.2 en", len(r_lines) == 6 and all(l in en_flat for l in r_lines), repr([l[:30] for l in r_lines if l not in en_flat]))
r_ko = r24[r24.index("**ko 2번**"):r24.index("**en**")]
rk_lines = [md_clean(re.sub(r"^>\s*(?:\d\.\s*|-\s*)?", "", l.strip()).strip()) for l in r_ko.splitlines() if re.match(r"^>\s+(\d\.|\s*-) ", l)]
ko_flat = [KO[1][0]] + KO[1][1]
check(f"리뷰 34 §2.4 ko {len(rk_lines)}줄 = 계획 §2.2 ko 2번", rk_lines == ko_flat, repr(rk_lines))

# ---------- 빌드 대조: ko 소개 ----------
ko_raw = page("about.html")
ko_sec = section(ko_raw, "copyright")
got = li_tree(ko_sec)
check("ko /about 인용·저작권 절 바깥 목록 4개", len(got) == 4, repr(len(got)))
for i, (exp, subs) in enumerate(KO):
    g = got[i] if i < len(got) else ("", [])
    check(f"ko {i+1}번 본문 글자 그대로", g[0] == exp, f"\n   exp={exp}\n   got={g[0]}")
    for j, s in enumerate(subs):
        gs = g[1][j] if j < len(g[1]) else None
        check(f"ko {i+1}번 하위 {j+1} 글자 그대로", gs == s, f"\n   exp={s}\n   got={gs}")
    check(f"ko {i+1}번 하위 항목 수 {len(subs)}", len(g[1]) == len(subs))
strongs = [text_of(s) for s in re.findall(r"<strong[^>]*>(.*?)</strong>", ko_sec, flags=re.S)]
check(f"ko 굵게 범위 = 기획 ** 범위({len(KO_BOLD)}개, 순서 포함)", strongs == KO_BOLD, f"{strongs} vs {KO_BOLD}")
ko_title = re.search(r'<h2 id="copyright"[^>]*>(.*?)</h2>', ko_sec, flags=re.S)
check("ko 절 제목 = 인용·저작권(그대로)", bool(ko_title) and text_of(ko_title.group(1)) == "인용·저작권")

# ---------- 빌드 대조: en 소개 ----------
en_raw = page("en/about.html")
en_sec = section(en_raw, "copyright")
check("en /en/about 에 copyright 절 있음", bool(en_sec))
en_title = re.search(r'<h2 id="copyright"[^>]*>(.*?)</h2>', en_sec, flags=re.S)
check("en 절 제목 글자 그대로", bool(en_title) and text_of(en_title.group(1)) == EN_TITLE, repr(en_title and text_of(en_title.group(1))))
gotn = li_tree(en_sec) if en_sec else []
check("en 바깥 목록 4개", len(gotn) == 4, repr(len(gotn)))
for i, (exp, subs) in enumerate(EN):
    g = gotn[i] if i < len(gotn) else ("", [])
    check(f"en {i+1}번 본문 글자 그대로", g[0] == exp, f"\n   exp={exp}\n   got={g[0]}")
    for j, s in enumerate(subs):
        gs = g[1][j] if j < len(g[1]) else None
        check(f"en {i+1}번 하위 {j+1} 글자 그대로", gs == s, f"\n   exp={s}\n   got={gs}")
# 절 순서: translation → copyright → correction
order = [m.group(1) for m in re.finditer(r'<section aria-labelledby="([^"]+)"', en_raw)]
check("en 절 순서 translation → copyright → correction", order[:3] == ["translation", "copyright", "correction"], repr(order))
check("en copyright 절 글자에 굽은 따옴표(’) 0", "’" not in text_of(en_sec))

# ---------- 옛 문구 0 ----------
OLD = [
    ("about.html", "썸네일은 사용하지 않고"), ("about.html", "그대로 참조(핫링크)"), ("about.html", "제목·요약·썸네일"),
]
for p, o in OLD:
    check(f"옛 문구 0: {p} \"{o}\"", o not in text_of(page(p)))

# ---------- C4 안내문(sourcePreviewNote) ----------
s21 = V09[V09.index("### 2.1 "):V09.index("### 2.2 ")]
note = {}
for line in s21.splitlines():
    m = re.match(r"^\| (ko|en) `sourcePreviewNote` \| (.*?) \| \*\*(.*?)\*\* \|$", line)
    if m:
        note[m.group(1)] = m.group(3)
check("기대값: §2.1 표 ko·en 확정 문구 2개", set(note) == {"ko", "en"})
i18n = (ROOT / "src/lib/i18n.ts").read_text(encoding="utf-8")
for lang in ("ko", "en"):
    check(f"소스 i18n {lang} sourcePreviewNote = 확정 문구", f"'{note.get(lang)}'" in i18n)
# 빌드: 미리보기가 있는 상세 전부에서 문구가 나오는지 + 옛 문구 0
ko_posts = sorted((APP / "post").glob("*.html"))
en_posts = sorted((APP / "en/post").glob("*.html"))
cnt = {"ko": [0, 0, 0, 0], "en": [0, 0, 0, 0]}  # [상세 수, 새 문구 포함, 옛 문구 포함, 원문 미리보기 상자(source-preview-heading) 있음]
for lang, files in (("ko", ko_posts), ("en", en_posts)):
    for f in files:
        txt = text_of(f.read_text(encoding="utf-8"))
        cnt[lang][0] += 1
        cnt[lang][1] += note[lang] in txt
        cnt[lang][3] += 'id="source-preview-heading"' in f.read_text(encoding="utf-8")
        cnt[lang][2] += ("썸네일" in txt and "제목·요약·썸네일" in txt) if lang == "ko" else ("thumbnail)" in txt)
for lang in ("ko", "en"):
    n, new, old, _ = cnt[lang]
    check(f"{lang} 상세 {n}쪽: 옛 안내문 0", old == 0, str(old))
    check(f"{lang} 상세 {n}쪽: 새 안내문이 나온 쪽 수 = 원문 미리보기 상자가 있는 쪽 수", new == cnt[lang][3], f"{new} vs {cnt[lang][3]}")
print(f"  (참고) 상세 쪽 수 ko {cnt['ko'][0]} · en {cnt['en'][0]} · 새 안내문 포함 ko {cnt['ko'][1]} · en {cnt['en'][1]}")

# ---------- C3 ----------
tags_raw = page("tags.html")
tags_txt = text_of(tags_raw)
h1 = re.search(r"<h1[^>]*>(.*?)</h1>", tags_raw, flags=re.S)
check("C3 /tags h1 = 전체 주제", bool(h1) and text_of(h1.group(1)) == "전체 주제")
title = re.search(r"<title>(.*?)</title>", tags_raw, flags=re.S)
check("C3 /tags <title>이 '전체 주제'로 시작", bool(title) and html.unescape(title.group(1)).startswith("전체 주제"), repr(title and title.group(1)))
check("C3 /tags aria-label=\"주제 목록\"", 'aria-label="주제 목록"' in tags_raw)
desc = re.search(r'<meta name="description" content="([^"]*)"', tags_raw)
check("C3 /tags 메타 설명에 '주제 N개'", bool(desc) and re.search(r"의 주제 \d+개를", html.unescape(desc.group(1))) is not None, repr(desc and desc.group(1)))
check("C3 /tags 보조 문장 '주제 N개 · 게시물이 많은 순'", re.search(r"주제 \d+개 · 게시물이 많은 순", tags_txt) is not None)
# 화면 글자·메타에 낱말 '태그' 0 — 전 HTML(.html) 전수. 단 게시물 내용(content/ 원문 글자, 예: "해시태그"·계정 이름)에서 온 것은 뺀다:
# 남은 '태그'마다 앞뒤 글자 창을 잘라 content/ 전체 글자(마크다운·frontmatter)에 같은 창이 있는지 본다. 창이 content에 없으면 화면 문구로 센다.
corpus = ""
for f in sorted((ROOT / "content").rglob("*.md")):
    corpus += re.sub(r"\s+", " ", f.read_text(encoding="utf-8")) + "\n"
html_files = sorted(APP.rglob("*.html"))
hits, content_hits = [], 0
for f in html_files:
    raw = f.read_text(encoding="utf-8")
    vis = text_of(raw)
    metas = " ".join(html.unescape(x) for x in re.findall(r'<(?:meta|link)[^>]*?(?:content|title)="([^"]*)"', raw))
    ttl = " ".join(html.unescape(x) for x in re.findall(r"<title>(.*?)</title>", raw, flags=re.S))
    aria = " ".join(html.unescape(x) for x in re.findall(r'aria-label="([^"]*)"', raw))
    ld = " ".join(re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', raw, flags=re.S))
    for part in (vis, metas, ttl, aria, ld):
        for m in re.finditer("태그", part):
            win = part[max(0, m.start() - 4):m.end()]  # 앞 4글자 + 태그(뒤쪽은 요소 경계에서 끊기므로 쓰지 않는다)
            if win in corpus:
                content_hits += 1
            else:
                hits.append(f"{f.relative_to(APP)}: …{win}…")
check(f"C3 빌드 HTML {len(html_files)}개 전수: 화면 글자·title·meta·aria-label·JSON-LD의 '태그' 중 content 글자가 아닌 것 0", not hits, f"{len(hits)}개 예: {hits[:5]}")
print(f"  (참고) content 글자에서 온 '태그' {content_hits}회(해시태그·계정 이름 등 — C3 대상 아님)")
# 영어 상세 보조 열 이름 Topics — 영어 상세는 태그 칩 절을 그리지 않는다(post-detail.tsx `!isEnglish`). 그래서 사전 값만 확인하고, 영어 빌드에 그 절이 0쪽임을 사실로 센다.
check("C3 소스 i18n 영어 tags = 'Topics'", "  tags: 'Topics'," in i18n and "  tags: 'Tags'," not in i18n)
en_with_tags = [f for f in en_posts if 'id="tags-heading"' in f.read_text(encoding="utf-8")]
check(f"C3 en 상세 {len(en_posts)}쪽 중 tags-heading 절 0쪽(화면 영향 없음 확인)", len(en_with_tags) == 0, str(len(en_with_tags)))
ko_with_tags = [f for f in ko_posts if 'id="tags-heading"' in f.read_text(encoding="utf-8")]
ok = all(re.search(r'<h2 id="tags-heading"[^>]*>\s*주제\s*</h2>', f.read_text(encoding="utf-8")) for f in ko_with_tags)
check(f"C3 ko 상세 보조 열 {len(ko_with_tags)}쪽 모두 '주제'", bool(ko_with_tags) and ok)
en_tags_word = [str(f.relative_to(APP)) for f in (APP / "en").rglob("*.html") if re.search(r"\bTags\b", text_of(f.read_text(encoding="utf-8")))]
check("C3 en 빌드 화면 글자에 낱말 'Tags' 0", not en_tags_word, repr(en_tags_word[:5]))
# 태그 피드 설명 문장
tag_pages = sorted((APP / "tag").glob("*.html"))
lead_ok = sum(1 for f in tag_pages if "주제로 묶인 게시물입니다." in html.unescape(f.read_text(encoding="utf-8")))
check(f"C3 /tag/* {len(tag_pages)}쪽 모두 메타 설명 '주제로 묶인 게시물입니다.'", lead_ok == len(tag_pages) and lead_ok > 0, f"{lead_ok}/{len(tag_pages)}")
tag_paged = sorted((APP / "tag").glob("*/page/*.html"))
pg_ok = sum(1 for f in tag_paged if re.search(r"주제 게시물 \d+페이지", html.unescape(f.read_text(encoding="utf-8"))))
check(f"C3 /tag/*/page/* {len(tag_paged)}쪽 모두 '주제 게시물 N페이지'", pg_ok == len(tag_paged), f"{pg_ok}/{len(tag_paged)}")
llms = (APP / "llms.txt.body")
if llms.exists():
    body = llms.read_text(encoding="utf-8")
    check("C3 llms.txt '## 주제' 있음·'## 태그' 0", "## 주제" in body and "## 태그" not in body)
else:
    check("C3 llms.txt 빌드 산출물 있음", False, str(llms))

print(f"합계 {total}건 · PASS {total - fail} · FAIL {fail}")
sys.exit(1 if fail else 0)
