#!/usr/bin/env python3
"""HEAD 요청이 405/403 등으로 실패한 og:image를 GET(Range 0-0)으로 재확인한다.
외부 Referer(https://example.org)를 보낸다. 결과를 og.json 의 hot_code2/hot_type2 에 기록. 요청 간 1.2초."""
import os, json, re, subprocess, time
SD = os.environ["SURVEY_DIR"]; p = os.path.join(SD, "og.json"); d = json.load(open(p))
for u, r in d.items():
    if not r.get("og"): continue
    if r.get("hot_code") == "200" and str(r.get("hot_type", "")).lower().startswith("image"): continue
    time.sleep(1.2)
    out = subprocess.run(["curl", "-sL", "--max-time", "25", "-A", "Mozilla/5.0", "-e", "https://example.org", "-r", "0-0", "-o", "/dev/null",
                          "-w", "%{http_code} %{content_type}", r["og"]], capture_output=True).stdout.decode("utf-8", "replace").strip()
    c, _, ct = out.partition(" ")
    r["hot_code2"], r["hot_type2"] = c, ct
    print(u[:70], "->", out)
json.dump(d, open(p, "w"), ensure_ascii=False, indent=1)
