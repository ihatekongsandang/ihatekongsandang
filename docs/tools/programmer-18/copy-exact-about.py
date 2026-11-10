"""프로그래머 18 — 소개 페이지(ko /about · en /en/about) "인용·저작권" 절에서 자체 카드 줄이 빠졌는지 확인한다.

실행(저장소 루트, `npm run build` 뒤): python3 docs/tools/programmer-18/copy-exact-about.py [server/app 경로]
- 기대값은 기획 문서에서 읽지 않고 **이 파일에 글자 그대로 적었다**(프로그래머 17 도구가 기획 §2.2 구조에 묶여 FAIL 나던 문제 — 리뷰어 58-1).
- 확인: 절 제목 · 바깥 목록 4개 · 2번 머리글 · 2번 하위 목록 3개(언론 사진 · 공공누리 · 대체 이미지) 글자 그대로 ·
  ko 하위 목록 굵게 범위 · 옛 문구 2종(SNS 저장 줄 · 자체 카드 줄) 페이지 전체 0회.
"""
import html, re, sys, pathlib

APP = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(".next/server/app")

EXPECTED = {
    "ko": {
        "path": "about.html",
        "title": "인용·저작권",
        "outer_count": 4,
        "head": "카드의 대표 이미지는 글에 따라 다릅니다.",
        "subs": [
            "언론 기사의 사진을 쓰는 글은 그 사진을 이 사이트에 복제해 두지 않고 원 매체 주소에서 그대로 불러와 보여 줍니다. 사진 아래에 출처(사진 권리자 또는 매체)와 원문 링크를 적습니다.",
            "공공누리로 개방된 공공 사진을 쓸 때는 사진 아래에 공공누리 유형을 적습니다(현재 쓰는 사진은 없습니다).",
            "사진이 없거나 불러오지 못하면 대체 이미지를 보여 줍니다.",
        ],
        "sub_bold": ["언론 기사의 사진을 쓰는 글"],
        "gone": [
            # 자체 카드 줄(프로그래머 18 삭제)
            "이 사이트가 게시물 요지를 정리해 만든 카드 이미지",
            "이 이미지도 차례로 바꿉니다",
            # SNS 저장 줄(프로그래머 17 삭제)
            "SNS 게시물을 다룬 글 중 상당수",
            "저장해",
            "정리하기로 했으며",
            "이미지(썸네일)",
        ],
    },
    "en": {
        "path": "en/about.html",
        "title": "Quotes, images and copyright",
        "outer_count": 4,
        "head": "A card's main image depends on the post.",
        "subs": [
            "When a post uses a photo from a news article, the photo is loaded directly from the news outlet's address rather than copied to this site. Below the photo, we credit the rights holder or outlet and link to the original.",
            "When we use public photos released under the Korea Open Government License (KOGL), the license type is shown below the photo (none are in use now).",
            "If a post has no image, or an image fails to load, a replacement image is shown.",
        ],
        "sub_bold": [],
        "gone": [
            # 자체 카드 줄(프로그래머 18 삭제)
            "card image this site made",
            "These will also be replaced step by step",
            # SNS 저장 줄(프로그래머 17 삭제)
            "Many posts about social media posts",
            "stored on this site",
            "phase this out",
        ],
    },
}

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
    """바깥 <ul>의 <li>마다 (자기 글자, 하위 <li> raw 목록)."""
    m = re.search(r"<ul[^>]*>(.*)</ul>", sec, flags=re.S)
    if not m:
        return []
    body = m.group(1)
    stack, outer = [], []
    for t in re.finditer(r"<(/?)(ul|li)\b[^>]*>", body):
        if t.group(1) != "/":
            stack.append((t.group(2), t.end()))
        else:
            tag0, e = stack.pop()
            if tag0 == "li" and not stack:
                outer.append(body[e:t.start()])
    items = []
    for inner in outer:
        sub = re.search(r"<ul[^>]*>(.*)</ul>", inner, flags=re.S)
        own = inner[: sub.start()] if sub else inner
        subs = re.findall(r"<li>(.*?)</li>", sub.group(1), flags=re.S) if sub else []
        items.append((text_of(own), subs))
    return items

for lang, exp in EXPECTED.items():
    p = APP / exp["path"]
    check(f"{lang} {exp['path']} 있음", p.exists())
    if not p.exists():
        continue
    raw = p.read_text(encoding="utf-8")
    sec = section(raw, "copyright")
    check(f"{lang} copyright 절 있음", bool(sec))
    t = re.search(r'<h2 id="copyright"[^>]*>(.*?)</h2>', sec, flags=re.S)
    check(f"{lang} 절 제목 = {exp['title']}", bool(t) and text_of(t.group(1)) == exp["title"])
    got = li_tree(sec)
    check(f"{lang} 바깥 목록 {exp['outer_count']}개", len(got) == exp["outer_count"], repr(len(got)))
    head, subs_raw = got[1] if len(got) > 1 else ("", [])
    check(f"{lang} 2번 머리글 글자 그대로", head == exp["head"], f"\n   exp={exp['head']}\n   got={head}")
    subs = [text_of(s) for s in subs_raw]
    check(f"{lang} 2번 하위 목록 {len(exp['subs'])}개", len(subs) == len(exp["subs"]), repr(len(subs)))
    for j, s in enumerate(exp["subs"]):
        gs = subs[j] if j < len(subs) else None
        check(f"{lang} 2번 하위 {j+1} 글자 그대로", gs == s, f"\n   exp={s}\n   got={gs}")
    bold = [text_of(b) for s in subs_raw for b in re.findall(r"<strong[^>]*>(.*?)</strong>", s, flags=re.S)]
    check(f"{lang} 2번 하위 굵게 = {exp['sub_bold']}", bold == exp["sub_bold"], repr(bold))
    whole = text_of(raw)
    for needle in exp["gone"]:
        n = whole.count(needle)
        check(f"{lang} 페이지 전체에 '{needle}' 0회", n == 0, repr(n))

print(f"\n{total - fail}/{total} PASS")
sys.exit(1 if fail else 0)
