"""리뷰어 26-1 — 프로그래머 11-1 P2 4건 재확인(빌드·서버 없이 소스와 남아 있는 `.next` 산출물만 읽는다).
실행(저장소 루트): python3 docs/tools/reviewer-26-1/recheck.py
① 소스 글자 대조: 기대 문장은 프로그래머 오더가 아니라 리뷰 26 본문(§6 "**수정**:" 줄·§5.1 인용 줄)과
   기획자 10 산출물(트리거 코드 블록·planning/en-d1-reconfirm.md §4 코드 블록)에서 직접 읽는다.
   about(ko) `<li>`는 JSX 공백 규칙(줄마다 앞뒤 공백 제거·빈 줄 제거·한 칸으로 이음)으로 펼쳐 **완전 일치**를 본다.
② `.next` 빌드 HTML의 X·스레드 href 전수(ko 206 + en 206 상세): text 없는 X href 목록 = share-check url만 목록,
   text 있는 X href의 text = 그 페이지 h1 제목 그대로, 말줄임 생성 0, 스레드 text = h1 제목.
"""
import html, pathlib, re, sys
from urllib.parse import urlsplit, parse_qsl

fail = 0
def check(label, ok):
    global fail
    fail += 0 if ok else 1
    print(f"{'PASS' if ok else 'FAIL'}  {label}")

R = pathlib.Path
review = R("docs/reviews/programmer-11-news-format-v0.2-implement-review.md").read_text(encoding="utf-8")
fixes = re.findall(r"^> \*\*수정\*\*: (.+)$", review, flags=re.M)
P21, P22 = fixes[0], fixes[1]
P24_third = re.search(r"^> (We do not make definitive claims.+)$", review, flags=re.M).group(1)
trig = R("docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md").read_text(encoding="utf-8")
tb = re.findall(r"```\n(.*?)\n```", trig, flags=re.S)
plan = R("planning/en-d1-reconfirm.md").read_text(encoding="utf-8")
pb = re.findall(r"```\n(.*?)\n```", plan, flags=re.S)
check("기획자 10 트리거 aboutIntro = planning §4 aboutIntro", tb[0].strip() == pb[0].strip())
check("기획자 10 트리거 description = planning §4 description", tb[1].strip() == pb[1].strip())
about_final, desc_final = tb[0].strip(), tb[1].strip()
check("기획자 10 aboutIntro 셋째 문장 = 리뷰 26 §5.1 수정 문구 안", about_final.endswith(" " + P24_third))

# ① about(ko) 소스
src = R("src/app/(ko)/about/page.tsx").read_text(encoding="utf-8")
def jsx_text(block):
    lines = [ln.strip() for ln in block.split("\n")]
    return " ".join(ln for ln in lines if ln)
lis = [jsx_text(b) for b in re.findall(r"<li>(.*?)</li>", src, flags=re.S)]
check("P2-1 소스 `<li>` = 리뷰 26 §6 수정 문구(완전 일치)", P21 in lis)
check("P2-2 소스 `<li>` = 리뷰 26 §6 수정 문구(완전 일치)", P22 in lis)
for old in ("방문자에게서 개인정보를 수집하지", "등록된 신문·인터넷신문, 뉴스통신사, 방송사업자를"):
    check(f"옛 문구 0 (소스 about ko): {old}", old not in jsx_text(src))
# config.ts
cfg = R("src/lib/config.ts").read_text(encoding="utf-8")
intro_src = re.search(r'aboutIntro:\s*\n?\s*"((?:[^"\\]|\\.)*)"', cfg).group(1)
en_desc_src = re.search(r"SITE_EN = \{.*?description:\s*\n?\s*'((?:[^'\\]|\\.)*)'", cfg, flags=re.S).group(1)
check("P2-4 SITE_EN.aboutIntro 소스 = 기획자 10 최종 문구(완전 일치)", intro_src == about_final)
check(f"SITE_EN.description 소스 = 기획자 10 description ({len(en_desc_src)}자)", en_desc_src == desc_final)
check("옛 문구 0 (config.ts): We do not state", "We do not state" not in cfg)

# ② 빌드 HTML href 전수
share_out = R("docs/tools/reviewer-26-1/share-check-rerun.txt").read_text(encoding="utf-8")
url_only_expected = set(re.findall(r"^\s+\d+\t(\S+)\t", share_out, flags=re.M))
def h1_of(raw):
    m = re.search(r"<h1[^>]*>(.*?)</h1>", raw, flags=re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))) if m else None
pages = 0
x_no_text = {"ko": set(), "en": set()}
x_text_ok = th_ok = 0
for loc, d in (("ko", "post"), ("en", "en/post")):
    for f in sorted(R(".next/server/app", d).glob("*.html")):
        pages += 1
        raw = f.read_text(encoding="utf-8")
        title = h1_of(raw)
        xs = [html.unescape(h) for h in re.findall(r'href="(https://x\.com/intent/tweet[^"]*)"', raw)]
        ts = [html.unescape(h) for h in re.findall(r'href="(https://www\.threads\.com/intent/post[^"]*)"', raw)]
        if len(xs) != 1 or len(ts) != 1:
            check(f"{loc}/{f.stem} X·스레드 href 각 1개 (X {len(xs)} · 스레드 {len(ts)})", False); continue
        q = parse_qsl(urlsplit(xs[0]).query, keep_blank_values=True)
        keys = [k for k, _ in q]
        if "text" not in keys:
            x_no_text[loc].add(f.stem)
            if keys != ["url"]: check(f"{loc}/{f.stem} url만 쿼리 키 {keys}", False)
        else:
            t = dict(q)["text"]
            if t == title and keys == ["text", "url"] and not (t.endswith("…") and not title.endswith("…")):
                x_text_ok += 1
            else:
                check(f"{loc}/{f.stem} X text ≠ h1", False)
        tq = dict(parse_qsl(urlsplit(ts[0]).query))
        if tq.get("text") == title and tq.get("url") == dict(q)["url"]: th_ok += 1
        else: check(f"{loc}/{f.stem} 스레드 text·url", False)
check(f"빌드 HTML 상세 페이지 수 412 (실측 {pages})", pages == 412)
check(f"ko X text 없는 href 0 (실측 {len(x_no_text['ko'])})", not x_no_text["ko"])
check(f"en X text 없는 href 목록 = share-check url만 목록 ({len(x_no_text['en'])} / {len(url_only_expected)})",
      x_no_text["en"] == url_only_expected and len(url_only_expected) == 24)
check(f"X text = h1 제목 그대로 388 (실측 {x_text_ok})", x_text_ok == 388)
check(f"스레드 text = h1 제목·url = X url 412 (실측 {th_ok})", th_ok == 412)
print(f"FAIL {fail}")
sys.exit(1 if fail else 0)
