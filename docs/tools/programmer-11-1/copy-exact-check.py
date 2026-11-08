"""프로그래머 11-1 — P2-1·P2-2·P2-4 문구가 빌드 HTML에 글자 그대로 들어갔는지 확인.
실행(저장소 루트, `npm run build` 뒤): python3 docs/tools/programmer-11-1/copy-exact-check.py
기대 문장: P2-1·P2-2 = 오더 11-1 §임무 1·2(리뷰 26 §6 수정 문구 안), P2-4 = 기획자 10 트리거 aboutIntro 전문(트리거 파일에서 직접 읽는다).
"""
import html, re, sys, pathlib

def text_of(path):
    raw = pathlib.Path(path).read_text(encoding="utf-8")
    raw = re.sub(r"<script.*?</script>", " ", raw, flags=re.S)
    t = html.unescape(re.sub(r"<[^>]+>", "", raw))
    return re.sub(r"\s+", " ", t)

trigger = pathlib.Path("docs/triggers/planner-10-en-d1-reconfirm-COMPLETE.md").read_text(encoding="utf-8")
blocks = re.findall(r"```\n(.*?)\n```", trigger, flags=re.S)
about_intro, en_desc = blocks[0].strip(), blocks[1].strip()

P21 = "열람에는 로그인이 필요하지 않고, 회원 가입·댓글·후원 기능이 없습니다. 가입·결제 등을 위해 별도로 개인정보를 받지는 않지만, 방문 통계는 GA4로 집계됩니다."
P22 = "언론사는 「신문 등의 진흥에 관한 법률」에 따라 등록된 신문·인터넷신문을 기준으로 보고, 뉴스통신사는 「뉴스통신 진흥에 관한 법률」, 방송사업자는 「방송법」의 사업자를 기준으로 봅니다. 미등록 매체·1인 미디어·유튜브는 단독 근거로 쓰지 않습니다."
OLD = ["방문자에게서 개인정보를 수집하지 않습니다", "등록된 신문·인터넷신문, 뉴스통신사, 방송사업자를", "We do not state how far the facts have been confirmed"]

ko = text_of(".next/server/app/about.html")
en_raw = pathlib.Path(".next/server/app/en/about.html").read_text(encoding="utf-8")
en = text_of(".next/server/app/en/about.html")
fail = 0
def check(label, ok):
    global fail
    fail += 0 if ok else 1
    print(f"{'PASS' if ok else 'FAIL'}  {label}")

check("P2-1 /about 운영 방식 문장 일치", P21 in ko)
check("P2-2 /about 출처 정책 문장 일치", P22 in ko)
check("P2-4 /en/about 헤더 문단 = 기획자 10 aboutIntro 전문", about_intro in en)
desc = html.unescape(re.search(r'<meta name="description" content="([^"]*)"', pathlib.Path(".next/server/app/en.html").read_text(encoding="utf-8")).group(1))
check(f"SITE_EN.description 불변 = 기획자 10 description 전문 ({len(desc)}자)", desc == en_desc)
for o in OLD:
    for name, t in (("/about", ko), ("/en/about", en)):
        check(f"옛 문구 0: {name} \"{o[:24]}…\"", o not in t)
# en 소개에 같은 취지 문장(개인정보·매체 나열)이 없는지
check("/en/about 개인정보 언급 없음(personal|privacy)", not re.search(r"personal|privacy", en, re.I))
check("/en/about 매체 나열(news agenc|broadcast) 없음", not re.search(r"news agenc|broadcast", en, re.I))
print(f"FAIL {fail}")
sys.exit(1 if fail else 0)
