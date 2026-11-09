"""리뷰어 32 — 기획 문서 frontmatter 예시를 실제 게시물 사본에 끼워 넣는다(저장소 밖 임시 폴더에만 쓴다).

사용(저장소 루트):
  python3 -I docs/tools/reviewer-32/make-variants.py content/posts/{id}.md content/posts-en/{id}.md <임시폴더> <sources[]의 언론 url>

예시 출처:
  u-*        planning/card-image-uploader-steps.md 단계 3
  policy8-*  planning/card-image-policy.md §8
  readme36-* planning/v0.9-copy-and-code-list.md §2.4 (content/README.md §3.6 신설 문안)
"""
import os
import re
import shutil
import sys

base_path, base_en_path, out, real_src = sys.argv[1:5]
os.makedirs(os.path.join(out, "posts"), exist_ok=True)
shutil.copyfile(base_en_path, os.path.join(out, "base-en.md"))
base = open(base_path, encoding="utf-8").read()
blk = re.search(r"^image:\n(?:  .*\n)+", base, re.M)
assert blk, "image 블록을 찾지 못함"

U = '''image:
  kind: news
  src: https://img.example.news/og/abc123.jpg        # 근거 기사 og:image(https) 그대로. 내려받지 않는다
  alt: "국회 본회의장 단상에서 발언하는 정장 차림의 인물"   # 사진에 보이는 것만. 인물의 신원·의혹을 적지 않는다
  caption: "2026-10-07 국회 본회의, 현직 국회의원 ○○○ 의원이 발언하는 모습(원 기사 사진 설명 기준). 사진 속 인물이 이 게시물이 다루는 의혹의 당사자임을 뜻하지 않습니다."
  creditName: 연합뉴스                                  # 사진 권리자 표기(사진 설명의 크레딧). 없으면 기사 매체명
  creditNameEn: Yonhap News Agency
  sourcePageUrl: https://news.example.com/article/12345   # sources[]의 언론 기사 url과 글자 그대로 같아야 함
  retrievedAt: 2026-11-09                                # 확인일(미래 날짜 불가)
  faceNote: 현직 국회의원 — 본회의 발언 — 원 기사 사진 설명    # 공인 판정 근거. 3b 수행원이 정면이면 "수행원 정면 포함(3b)" 덧붙임
'''
P8 = '''image:
  kind: news              # self(생략 시) | public | news
  src: https://…          # news: 근거 기사 og:image(핫링크) / public·self: /images/{id}/…
  alt: "사진에 보이는 사실만"   # 필수
  caption: "…"            # 정책: public·news는 필수(§3.6). 코드 C2 전까지는 업로더가 항상 채운다
  creditName: 연합뉴스     # public·news 필수 — 사진 권리자(§5.2)
  creditNameEn: Yonhap News Agency
  sourcePageUrl: https://…  # public·news 필수. news는 sources[]의 언론 기사 url과 글자 그대로 같을 것
  license: kogl-1         # public만(kogl-1만 허용)
  retrievedAt: 2026-11-09 # 확인일(미래 날짜 불가)
  faceNote: 현직 국회의원 — 상임위 발언 — 원 기사 사진 설명   # public·news 필수(§3.5)
'''
R36 = '''image:
  kind: news                       # self(생략 시) | public | news
  src: https://…/og-image.jpg      # news: 근거 기사 og:image(https 핫링크, 내려받지 않는다) · self·public: /images/{id}/…
  alt: "사진에 보이는 사실만 쓴 문장"
  caption: "촬영 시점·장소, 직위 이름이 …하는 모습(원 기사 사진 설명 기준). …"   # public·news 필수(정책 §3.6). 형식은 정책
  creditName: 연합뉴스               # public·news 필수. 사진 권리자 표기(사진 설명의 크레딧). 없으면 기사 매체명
  creditNameEn: Yonhap News Agency   # public·news 필수
  sourcePageUrl: https://…         # public·news 필수. news는 이 게시물 sources[]의 언론 기사 url과 글자 그대로 같을 것
  license: kogl-1                  # public만 필수. kogl-1만 받는다
  retrievedAt: 2026-11-09          # public·news 필수. 확인일
  faceNote: 현직 국회의원 — 본회의 발언 — 원 기사 사진 설명   # public·news 필수. 얼굴 없으면 "얼굴 없음(건물)"
'''


def drop(text, key):
    return "\n".join(line for line in text.split("\n") if f"{key}:" not in line)


v = {}
v["u-verbatim"] = U
v["u-realsrc"] = U.replace("https://news.example.com/article/12345", real_src)
v["u-real-nocaption"] = drop(v["u-realsrc"], "caption")
v["policy8-verbatim"] = P8
p8real = P8.replace("src: https://…", "src: https://img.example.news/og/abc123.jpg", 1).replace("sourcePageUrl: https://…", f"sourcePageUrl: {real_src}")
v["policy8-real"] = p8real
v["policy8-real-nolicense"] = drop(p8real, "license")
v["readme36-verbatim"] = R36
v["readme36-real-nolicense"] = drop(R36.replace("https://…/og-image.jpg", "https://img.example.news/og-image.jpg").replace("sourcePageUrl: https://…", f"sourcePageUrl: {real_src}"), "license")

for name, text in v.items():
    if not text.endswith("\n"):
        text += "\n"
    with open(os.path.join(out, "posts", f"{name}.md"), "w", encoding="utf-8") as fh:
        fh.write(base.replace(blk.group(0), text))
print(f"{len(v)} variants -> posts/")
