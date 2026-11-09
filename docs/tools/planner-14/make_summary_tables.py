#!/usr/bin/env python3
"""summary.md 에 붙일 표(게시물별 분류, 기존 제외 사유 대조)를 stdout 으로 출력.
사용(저장소 루트): SURVEY_DIR=<스크래치 폴더> python3 docs/tools/planner-14/make_summary_tables.py"""
import os, json, re
SD = os.environ["SURVEY_DIR"]; HERE = os.path.dirname(os.path.abspath(__file__))
J = json.load(open(os.path.join(HERE, "judgments.json"))); T = json.load(open(os.path.join(SD, "targets.json")))
P, B, A = J["post"], J["B"], J["A"]
CATS = ["어린이", "일반 시민 얼굴", "부상", "비하", "비속", "미확인 사진", "가짜"]
print("## 게시물별 분류표 (67건)\n")
print("| # | 게시물 id | A(상·중) | A(하) | 공인 허용 | 전면 금지 | 선택 B 기사(기준) |\n|---|---|---|---|---|---|---|")
for t in T:
    p = P[t["id"]]; a = A.get(t["id"])
    ag = f'{a["license"][:9]} {a["fit"]}' if a and a["fit"] in ("상", "중") else "-"
    aw = "있음(하)" if a and a["fit"] == "하" else "-"
    best = p["best_B"]; bn = ""
    if best:
        nm = next(s["name"] for s in t["press"] if s["url"] == best).split(" — ")[0]
        rule = "전면금지 가능" if p["B_strict_url"] == best else ("공인 허용" if p["B_pub_url"] == best else "신원 확인 후")
        bn = f"{nm} ({rule}, 적합도 {B[best]['fit']})"
    print(f'| {p["n"]} | {t["id"]} | {ag} | {aw} | {p["class_pub"]} | {p["class_none"]} | {bn or "-"} |')
print("\n## 기존 텍스트 카드 사유와 B 후보 대조 (본문에 사유가 적힌 건만)\n")
print("| # | 게시물 id | 원래 사유(본문) | B 후보 이미지 전체에서 같은 사유 해당 여부 |\n|---|---|---|---|")
for t in T:
    p = P[t["id"]]; o = p["orig"]
    cat = [c for c in CATS if c in o]
    if not cat: continue
    hits = []
    for s in t["press"]:
        fl = B[s["url"]].get("excl7", "")
        if any(c in fl for c in cat): hits.append(s["name"].split(" — ")[0] + " [" + fl + "]")
    nres = sum(1 for s in t["press"] if B[s["url"]].get("fit"))
    print(f'| {p["n"]} | {t["id"]} | {o} | ' + (f'해당 {len(hits)}/{nres}건 ({", ".join(hits)})' if hits else f'해당 없음(0/{nres}건 판정)') + " |")
