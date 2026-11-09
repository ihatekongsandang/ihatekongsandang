#!/usr/bin/env python3
"""image-judgments.tsv(육안 판정) + og.json(핫링크) + A 후보표 -> judgments.json 생성.
사용(저장소 루트): SURVEY_DIR=<스크래치 폴더> python3 docs/tools/planner-14/build_judgments.py
판정 로직(파생 규칙)은 이 파일에 모두 드러나 있다."""
import os, re, json, csv
SD = os.environ["SURVEY_DIR"]; HERE = os.path.dirname(os.path.abspath(__file__))
T = json.load(open(os.path.join(SD, "targets.json"))); OG = json.load(open(os.path.join(SD, "og.json")))
IJ = {r["url"]: r for r in csv.DictReader(open(os.path.join(HERE, "image-judgments.tsv"), encoding="utf-8"), delimiter="\t")}

def hot_ok(o):
    if not o.get("og"): return False
    if o.get("hot_code") == "200" and str(o.get("hot_type", "")).lower().startswith("image"): return True
    return o.get("hot_code2") in ("200", "206") and str(o.get("hot_type2", "")).lower().startswith("image")

INCIDENTAL = r"(배석|배경|수행|뒷모습|동행|취재진|스태프|통역|기자단|인터뷰어|경호|원경|소형|불식별|식별 불가|가림|흐림|발만|신체 일부|비노출|일부 노출|일부\))"
def derive(j):
    f, m, tm, note = j["faces"], j["minor_victim"], j["text_marks"], j["note"]
    pub = bool(re.search(r"(?<!비)공인", f)) or "미확인" in f
    priv = "비공인" in f
    unid = bool(re.search(r"신원 미확인|추정|확인 필요", f))
    priv_id = False
    if priv:
        # 비공인 표기 구간에서 부수적(배경·원경·가림 등) 표현이 없으면 '식별 가능한 비공인 얼굴'
        parts = re.split(r"[+·]", f)
        for p in parts:
            if "비공인" in p and not re.search(INCIDENTAL, p): priv_id = True
        if re.match(r"비공인", f) and not re.search(INCIDENTAL, f): priv_id = True
    face_none = f.startswith("없음") or bool(re.match(r"식별 불가", f))
    flags = []
    if "아동" in m: flags.append("어린이")
    if priv_id: flags.append("일반 시민 얼굴")
    if "부상" in m or "피해자" in m: flags.append("부상·피해자")
    if re.search(r"비하|비속|욕설", tm + note): flags.append("비하·비속어")
    if unid: flags.append("미확인 사진(신원 확인 필요)")
    if "출처 확인 필요" in note: flags.append("미확인 사진(출처 확인 필요)")
    if re.search(r"합성|가짜", tm + note): flags.append("가짜·합성 이미지")
    logo_only = "기본 로고" in tm or "기본 이미지" in tm
    caption_claim = bool(re.search(r"단정형|자막\(", tm))
    return dict(pub=pub, priv_id=priv_id, unid=unid, face_none=face_none, flags=flags, logo_only=logo_only, caption=caption_claim)

def faces_label(j, d):
    f = j["faces"]
    if d["face_none"]: return "없음"
    if d["unid"]: return "공인 여부 확인 필요"
    pub = bool(re.search(r"(?<!비)공인", f)); priv = "비공인" in f
    return "공인+비공인" if pub and priv else ("공인" if pub else "비공인")

A = {  # 공공누리 표시를 페이지에서 직접 확인한 후보(korea.kr 사진·뉴스는 '텍스트에 한하여' 공공누리이므로 A 불가: summary.md 참조)
 "UNI_JUNG": dict(img="https://unikorea.go.kr/web/unikorea/file/download/uu/df309782341d41d6820257993fce8add", page="https://unikorea.go.kr/web/unikorea/bbs/bbs_0000000000000004/60582",
   license="공공누리 제1유형(출처표시) — 페이지 표시", shot="2026-10-22 면담(게시일 동일)", faces="공인(통일부 장관·EU 특사)+비공인(수행·통역 2)", fit="중", note="장관 일반 사진(사건 현장 사진 아님). 원본 약 13MB, 첨부파일 형태"),
 "UNI_PMJ": dict(img="https://www.unikorea.go.kr/web/unikorea/file/download/uu/2025072513492093621.zip (zip 안 jpg 7장)", page="https://www.unikorea.go.kr/web/unikorea/bbs/bbs_0000000000000004/55815",
   license="공공누리 제1유형(출처표시) — 페이지 표시", shot="2025-07-25 판문점 방문", faces="공인(통일부 장관)+비공인(장병 1~수명 일부 노출)", fit="중", note="판문점 관측시설 장면. 압축파일 약 69MB"),
 "PRES_MEX": dict(img="https://www.president.go.kr/images/2026/09/1790279040803_0_0.jpg", page="https://www.president.go.kr/photos/president/IfxEnUog",
   license="공공누리 제4유형(출처표시·비상업적 이용만·변형 금지) — 페이지 표시", shot="2026-09-25 등록(멕시코 국빈방문 공식환영식)", faces="공인 2(대통령·멕시코 대통령)", fit="상", note="사진 하단 '청와대' 워터마크"),
 "PRES_Y": dict(img="https://www.president.go.kr/images/2026/11/1793777418854_1_0.jpg", page="https://www.president.go.kr/photos/president/1MYqf4zQ",
   license="공공누리 제4유형(출처표시·비상업적 이용만·변형 금지) — 페이지 표시", shot="2026-11-04 등록('대통령의 Y' 녹화)", faces="공인(대통령)+비공인(방송 진행자 1)", fit="중", note="대통령 일반 사진(사건 현장 사진 아님). '청와대' 워터마크"),
 "KHS": dict(img="http://www.khs.go.kr/newopen/cmm/seditor/getImageFile.do?seId=cbe7750c7b184c5a99b34f11d3faa01b", page="https://www.khs.go.kr/newsBbz/selectNewsBbzView.do?newsItemId=155704544&sectionId=b_sec_1&mn=NS_01_02_01",
   license="공공누리 제1유형(출처표시) — 페이지의 'OPEN 공공누리(출처표시)' 표시", shot="2023-12-19 보도자료(기록영상 화면 갈무리)", faces="비공인(공연자 다수 얼굴 노출)", fit="중", note="영상 자막이 박혀 있음. 한국 아리랑 사진이라 중국 지정 건과는 주제 간접 연관"),
 "DOKDO": dict(img="(원본 파일 URL 미확보 — 공공누리 누리집 항목 페이지에서 내려받는 구조)", page="https://www.kogl.or.kr/recommend/recommendDivView.do?recommendIdx=10338&division=img",
   license="공공누리 제1유형(출처표시) — 페이지 표시(보유기관 경상북도 울릉군)", shot="미표시", faces="없음(풍경)", fit="상", note="이미지 내용은 직접 열람하지 못함(확인 필요)"),
}
def weak(a): d = dict(A[a]); d["fit"] = "하"; return d
AMAP = {  # 게시물 id 접두 번호(1..67 순번) -> A 후보
 6: "UNI_JUNG", 7: "UNI_JUNG", 20: "UNI_JUNG", 25: "UNI_JUNG", 31: "UNI_JUNG", 18: "UNI_PMJ", 12: "PRES_MEX", 36: "PRES_Y", 44: "PRES_Y", 56: "PRES_Y", 63: "PRES_Y",
 38: "KHS", 46: "DOKDO"}
AWEAK = {2: "UNI_JUNG", 8: "UNI_PMJ", 10: "UNI_PMJ", 13: "UNI_PMJ", 17: "UNI_PMJ", 23: "UNI_PMJ", 32: "UNI_PMJ", 62: "PRES_Y"}

ORIG = {  # 원래 텍스트 카드를 쓴 사유(게시물 본문에 적힌 것만; 7종 분류에 해당하면 그 이름, 아니면 '기타')
 3: "본문 미기재", 4: "본문 미기재", 5: "본문 미기재", 7: "본문 미기재", 8: "본문 미기재", 10: "본문 미기재", 12: "본문 미기재", 13: "본문 미기재", 17: "본문 미기재",
 57: "본문 미기재", 58: "본문 미기재", 59: "본문 미기재", 60: "본문 미기재", 61: "본문 미기재", 11: "미기재(캡션 기준 정리)", 14: "기타(영문 캡션 기준, 이미지 사유 미기재)",
 15: "일반 시민 얼굴(가해자·행인 얼굴)", 18: "비하(원문 비하 표현)", 19: "본문 미기재(얼굴 언급)", 22: "미확인 사진(사건과 무관한 인물 사진)", 28: "일반 시민 얼굴(참가자·경찰관)",
 36: "기타(사생활 의혹·근거 없는 단정 항목)", 37: "가짜 이미지(합성·연출)", 40: "비속어(욕설)+오해 소지 그림", 42: "일반 시민 얼굴(참가자)", 49: "미확인 사진(기체 확인 불가)",
 52: "기타(AI 제작 홍보 자료 계급장 논란)", 53: "가짜 이미지(AI 가짜 포스터)", 56: "기타(대통령 얼굴 사진 위 문구)", 62: "일반 시민 얼굴(출연자)+비속어", 64: "기타(단정 문구, 장병 다수 사진)",
 66: "미확인 사진(출처 미표시 보도사진)", 67: "일반 시민 얼굴(참석자)", 46: "기타(인물 사진 크게)", 35: "기타(국정원 전면 부인 내용 단정)"}

B = {}
for t in T:
    for s in t["press"]:
        u = s["url"]; o = OG.get(u, {}); j = IJ.get(u)
        if not j:
            B[u] = dict(faces="", minor_victim="", fit="", note=("봇 확인(Cloudflare) 페이지로 응답 — 수집 불가" if re.search(r"mk\.co\.kr|washingtontimes", u) else "og:image 없음 또는 수집 불가"), excl7="", ok_hot=False)
            continue
        d = derive(j)
        B[u] = dict(faces=faces_label(j, d), minor_victim=j["minor_victim"], fit=j["fit"], excl7=";".join(d["flags"]) if d["flags"] else "",
                    note=("; ".join(x for x in [j["note"], ("표시: " + j["text_marks"]) if j["text_marks"] != "-" else "", ("얼굴 상세: " + j["faces"])] if x)),
                    ok_hot=hot_ok(o), _d=d)
P = {}
for n, t in enumerate(T, 1):
    pid = t["id"]
    cands = []
    for s in t["press"]:
        b = B[s["url"]]
        if b["fit"] not in ("상", "중") or not b["ok_hot"] or "_d" not in b: continue
        d = b["_d"]
        if d["logo_only"]: continue
        bad = [x for x in d["flags"] if not x.startswith("미확인 사진(신원")]  # 신원 확인 필요는 조건부로 따로 판정
        pub_ok = not bad and not d["unid"] and not d["caption"]
        pub_cond = not bad and d["unid"] and not d["caption"]
        none_ok = pub_ok and d["face_none"]
        cands.append((s["url"], b["fit"], pub_ok, pub_cond, none_ok))
    def pick(f):
        c = [x for x in cands if f(x)]
        c.sort(key=lambda x: (x[1] != "상",))
        return c[0][0] if c else None
    pub = pick(lambda x: x[2]); cond = pick(lambda x: x[3]); strict = pick(lambda x: x[4])
    P[pid] = dict(n=n, best_B=strict or pub or cond, B_pub_ok=bool(pub), B_pub_cond=bool(cond), B_strict_ok=bool(strict), B_pub_url=pub, B_cond_url=cond, B_strict_url=strict,
                  orig=ORIG.get(n, "기타(문구 단정·확인 불가 등, 본문 참조)"))
    a = AMAP.get(n); w = AWEAK.get(n)
    P[pid]["A"] = a or (("weak:" + w) if w else "")
Aout = {}
for t in T:
    k = P[t["id"]]["A"]
    if not k: continue
    a = dict(A[k[5:]]) if k.startswith("weak:") else dict(A[k])
    if k.startswith("weak:"): a["fit"] = "하"
    Aout[t["id"]] = a
for pid, p in P.items():
    a = Aout.get(pid)
    a_good = bool(a and a["fit"] in ("상", "중"))
    a_none = bool(a_good and a["faces"].startswith("없음"))
    p["A_good"], p["A_weak"], p["A_noface"] = a_good, bool(a and not a_good), a_none
    # 얼굴 허용(공인 얼굴 허용) 기준 / 전면 금지 기준 분류
    p["class_pub"] = "A" if a_good else ("B" if p["B_pub_ok"] else ("B조건부" if p["B_pub_cond"] else "없음"))
    p["class_none"] = "A" if a_none else ("B" if p["B_strict_ok"] else "없음")
    p["class"] = p["class_pub"]
    p["faces_rule"] = f'공인 얼굴 허용: {p["class_pub"]} / 얼굴 전면 금지: {p["class_none"]}'
    p["note"] = "원래 사유: " + p["orig"] + (" | A 후보 주제 연관 약함(하)" if p["A_weak"] else "")
json.dump(dict(A=Aout, B={u: {k: v for k, v in b.items() if k != "_d"} for u, b in B.items()}, post=P), open(os.path.join(HERE, "judgments.json"), "w"), ensure_ascii=False, indent=1)
print("posts", len(P), "A", len(Aout))
