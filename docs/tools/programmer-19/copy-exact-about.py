"""프로그래머 19 — 소개 페이지(ko /about · en /en/about) "인용·저작권" 절: A-2 자료사진 줄이 기획자 19-2 §3 문안 그대로 들어갔는지,
자체 카드·SNS 저장 줄은 계속 빠져 있는지 확인한다(프로그래머 18 도구 사본 — 하위 목록 기대값만 3개 → 4개로 바꿨다).

실행(저장소 루트, `npm run build` 뒤): python3 docs/tools/programmer-19/copy-exact-about.py [server/app 경로]
- 기대값은 기획 문서에서 읽지 않고 **이 파일에 글자 그대로 적었다**(프로그래머 17 도구가 기획 §2.2 구조에 묶여 FAIL 나던 문제 — 리뷰어 58-1).
- 확인: 절 제목 · 바깥 목록 4개 · 2번 머리글 · 2번 하위 목록 4개(언론 사진 · 공공누리 · A-2 자료사진 · 대체 이미지) 글자 그대로 ·
  ko 하위 목록 굵게 범위 · 옛 문구 2종(SNS 저장 줄 · 자체 카드 줄) 페이지 전체 0회.
- 19-1(슈퍼바이저 판단 2026-11-11): 바깥 3번 줄(인물 기준) 글자 그대로 — "같은 사건 당시" 규칙을 사람이 나오는 사진에 한정.
  옛 문장("사진은 게시물이 다루는 사건과…" / "We use only photos taken at the event…") 페이지 전체 0회.
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
            "장소·건물처럼 사람이 나오지 않는 자료사진은 공공누리·CC 라이선스·퍼블릭 도메인 등 자유 이용이 표시된 것만 쓰며, 사진 아래에 저작자·라이선스와 원문 링크를 적고 해당 사건 당시 사진이 아니라고 밝힙니다.",
            "사진이 없거나 불러오지 못하면 대체 이미지를 보여 줍니다.",
        ],
        "sub_bold": ["언론 기사의 사진을 쓰는 글"],
        "item3": "언론 기사 사진과 공공 사진에 나오는 인물은 정치인 등 공인의 공적 활동(국회·정부 일정, 기자회견, 외교 행사 등)에 한합니다. 공식 일정 사진에는 공무를 수행 중인 수행원·통역·배석자가 함께 나올 수 있습니다. 일반 시민·미성년자·사건 피해자·부상자 등 공인이 아닌 사람이 알아볼 수 있게 나온 사진은 쓰지 않습니다. 사람이 나오는 사진은 게시물이 다루는 사건과 같은 사건 당시의 것만 쓰며, 사진은 게시물 내용의 근거가 아닙니다. 의혹·수사·재판을 다룬 게시물의 사진에는 누가·언제·어디서 찍은 것인지 사진 설명을 붙입니다.",
        "gone": [
            # 19-1: 인물 기준 줄의 옛 문장(A-2 예외와 어긋나던 것)
            "쓰지 않습니다. 사진은 게시물이 다루는 사건과",
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
            "Archive photos with no people in them (such as places and buildings) are used only if they are marked as free to use — for example under KOGL, a Creative Commons license or in the public domain. Below the photo we credit the author, state the license, link to the original, and note that it was not taken at the time of the event.",
            "If a post has no image, or an image fails to load, a replacement image is shown.",
        ],
        "sub_bold": [],
        "item3": "Photos from news articles and public sources show people only in the public activities of public figures (for example, parliamentary or government events, press conferences, diplomatic events). Photos of official events may also show staff, interpreters or attendees performing official duties. We do not use photos in which other private individuals, minors, victims, or injured people can be recognized. Photos showing people are used only if taken at the event the post covers, and a photo is not evidence for what the post says. Photos on posts about allegations, investigations or trials carry a caption saying who took them, when and where.",
        "gone": [
            # 19-1: 인물 기준 줄의 옛 문장
            "We use only photos taken at the event",
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
    item3 = got[2][0] if len(got) > 2 else ""
    check(f"{lang} 3번 줄(인물 기준) 글자 그대로", item3 == exp["item3"], f"\n   exp={exp['item3']}\n   got={item3}")
    whole = text_of(raw)
    for needle in exp["gone"]:
        n = whole.count(needle)
        check(f"{lang} 페이지 전체에 '{needle}' 0회", n == 0, repr(n))

print(f"\n{total - fail}/{total} PASS")
sys.exit(1 if fail else 0)
