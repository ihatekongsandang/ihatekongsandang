#!/usr/bin/env python3
"""candidates.csv / candidates-by-post.csv 생성.
사용(저장소 루트): SURVEY_DIR=<스크래치 폴더> python3 docs/tools/planner-14/build_csv.py
입력: $SURVEY_DIR/targets.json(collect.py list), og.json(collect.py og),
      docs/tools/planner-14/judgments.json(육안 판정·A 후보; 이 폴더에 저장)
출력: docs/tools/planner-14/candidates.csv (게시물×B후보 행), candidates-by-post.csv (게시물 1행)"""
import os, json, csv
SD = os.environ["SURVEY_DIR"]; HERE = os.path.dirname(os.path.abspath(__file__))
T = json.load(open(os.path.join(SD, "targets.json"))); OG = json.load(open(os.path.join(SD, "og.json")))
J = json.load(open(os.path.join(HERE, "judgments.json")))
A = J["A"]; B = J["B"]; P = J["post"]
cols = ["id", "A_url", "A_page", "A_license", "B_outlet", "B_url", "B_hotlink", "faces", "minor_victim", "fit", "note", "B_article", "B_best", "excl7_hit"]
rows = []; byp = []
for t in T:
    pid = t["id"]; a = A.get(pid, {})
    cands = []
    for s in t["press"]:
        o = OG.get(s["url"], {}); b = B.get(s["url"], {})
        hot = f'{o.get("hot_code","-")} {o.get("hot_type","-")}' if o.get("og") else "og:image 없음"
        cands.append(dict(url=s["url"], name=s["name"], og=o.get("og"), hot=hot, **b))
    best = P.get(pid, {}).get("best_B")
    for c in cands:
        rows.append([pid, a.get("img", ""), a.get("page", ""), a.get("license", ""), c["name"].split(" — ")[0], c["og"] or "", c["hot"],
                     c.get("faces", ""), c.get("minor_victim", ""), c.get("fit", ""), c.get("note", ""), c["url"],
                     "Y" if best == c["url"] else "", c.get("excl7", "")])
    if not cands:
        rows.append([pid, a.get("img", ""), a.get("page", ""), a.get("license", ""), "", "", "언론 출처 없음", "", "", "", P.get(pid, {}).get("note", ""), "", "", ""])
    pp = P.get(pid, {}); bb = B.get(best, {}) if best else {}
    byp.append([pid, pp.get("class", ""), a.get("img", ""), a.get("license", ""), best or "", (OG.get(best, {}) or {}).get("og", "") if best else "",
                bb.get("faces", ""), bb.get("minor_victim", ""), bb.get("fit", ""), pp.get("faces_rule", ""), pp.get("note", "")])
w = csv.writer(open(os.path.join(HERE, "candidates.csv"), "w", newline="", encoding="utf-8-sig")); w.writerow(cols); w.writerows(rows)
w = csv.writer(open(os.path.join(HERE, "candidates-by-post.csv"), "w", newline="", encoding="utf-8-sig"))
w.writerow(["id", "class(A|B|none)", "A_img", "A_license", "B_best_article", "B_best_og", "B_faces", "B_minor_victim", "B_fit", "face_rule_result", "note"]); w.writerows(byp)
print(len(rows), "rows;", len(byp), "posts")
