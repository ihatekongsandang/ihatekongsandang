#!/usr/bin/env python3
"""planner-14 수집기.
사용: SURVEY_DIR=<스크래치 폴더> python3 -I collect.py <단계>
  list    : 대상 67건 목록(+언론 출처) 추출 -> $SURVEY_DIR/targets.json
  og      : 언론 기사 og:image 수집, 이미지 내려받기, 핫링크 검사 -> $SURVEY_DIR/og.json
저장소 루트에서 실행. 요청 사이 1.2초 간격."""
import os, sys, re, json, time, subprocess, glob, hashlib
import yaml
SD = os.environ["SURVEY_DIR"]
POSTS = "content/posts"
def load():
    out = []
    for p in sorted(glob.glob(POSTS + "/*.md")):
        t = open(p, encoding="utf-8").read()
        m = re.match(r"---\n(.*?)\n---\n(.*)", t, re.S)
        fm = yaml.safe_load(m.group(1))
        cap = (fm.get("image") or {}).get("caption", "") or ""
        if "자체 제작" in cap or "자체 제작" in m.group(2):
            out.append({"id": fm["id"], "title": fm["title"], "sourceUrl": fm.get("sourceUrl"),
              "caption_self": "자체 제작" in cap,
              "press": [s for s in fm.get("sources", []) if s.get("type") == "언론"],
              "allsrc": [(s.get("type"), s.get("name"), s.get("url")) for s in fm.get("sources", [])]})
    return out
def curl(args):
    time.sleep(1.2)
    return subprocess.run(["curl", "-sL", "--max-time", "25", "-A", "Mozilla/5.0"] + args,
                          capture_output=True).stdout
def og_image(url):
    html = curl([url]).decode("utf-8", "replace")
    open(os.path.join(SD, "html", hashlib.md5(url.encode()).hexdigest() + ".html"), "w").write(html[:400000])
    for pat in (r'og:image["\']\s+content=["\']([^"\']+)',
                r'<meta[^>]+property=["\']og:image["\'][^>]*content=["\']([^"\']+)',
                r'<meta[^>]+content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']'):
        m = re.search(pat, html, re.I)
        if m: return m.group(1).replace("&amp;", "&"), len(html)
    return None, len(html)
def hotlink(img):
    time.sleep(1.2)
    r = subprocess.run(["curl", "-sIL", "--max-time", "25", "-A", "Mozilla/5.0", "-e", "https://example.org", img],
                       capture_output=True).stdout.decode("utf-8", "replace")
    blocks = r.split("\r\n\r\n")
    heads = [b for b in blocks if b.startswith("HTTP")]
    last = heads[-1] if heads else ""
    code = re.match(r"HTTP/[\d.]+ (\d+)", last)
    ct = re.search(r"(?im)^content-type:\s*([^\r\n]+)", last)
    return (code.group(1) if code else "?"), (ct.group(1).strip() if ct else "?")
if __name__ == "__main__":
    step = sys.argv[1]
    os.makedirs(os.path.join(SD, "html"), exist_ok=True); os.makedirs(os.path.join(SD, "img"), exist_ok=True)
    if step == "list":
        t = load(); json.dump(t, open(os.path.join(SD, "targets.json"), "w"), ensure_ascii=False, indent=1, default=str)
        print(len(t), "targets;", sum(len(x["press"]) for x in t), "press sources")
    elif step in ("og", "og-rev"):
        # og-rev: 같은 작업을 뒤에서부터 수행(2개 프로세스 병행용, 결과는 og_rev.json 에 저장 후 merge 단계에서 합침)
        t = json.load(open(os.path.join(SD, "targets.json")))
        if step == "og-rev": t = t[::-1]
        path = os.path.join(SD, "og.json" if step == "og" else "og_rev.json")
        res = json.load(open(path)) if os.path.exists(path) else {}
        for x in t:
            for s in x["press"]:
                u = s["url"]
                if u in res: continue
                if step == "og-rev":
                    try:
                        if u in json.load(open(os.path.join(SD, "og.json"))): continue
                    except Exception: pass
                img, n = og_image(u)
                r = {"post": x["id"], "name": s["name"], "page_bytes": n, "og": img}
                if img:
                    if img.startswith("//"): img = "https:" + img
                    r["og"] = img
                    r["hot_code"], r["hot_type"] = hotlink(img)
                    fn = hashlib.md5(u.encode()).hexdigest() + ".img"
                    open(os.path.join(SD, "img", fn), "wb").write(curl([img]))
                    r["file"] = fn
                res[u] = r
                json.dump(res, open(path, "w"), ensure_ascii=False, indent=1)
                print(x["id"][:40], u[:60], r.get("og"), r.get("hot_code"), flush=True)
    elif step == "merge":
        a = json.load(open(os.path.join(SD, "og.json"))); b = json.load(open(os.path.join(SD, "og_rev.json")))
        for u, r in b.items(): a.setdefault(u, r)
        json.dump(a, open(os.path.join(SD, "og.json"), "w"), ensure_ascii=False, indent=1); print(len(a), "merged")
