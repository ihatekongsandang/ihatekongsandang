"""프로그래머 19 — open(A-2) fixture 게시물·이미지를 **저장소 밖 사본**에 만든다(실제 content에는 넣지 않는다).

사용:
  rsync -a --exclude node_modules --exclude .next --exclude .git --exclude docs --exclude history \
        --exclude instructions --exclude planning --exclude design ./ <사본>/ && ln -s "$PWD/node_modules" <사본>/node_modules
  python3 docs/tools/programmer-19/fixture-setup.py <사본>      # 게시물 5(ko)·영어본 2·이미지 5
  (cd <사본> && npm run validate:content && NEXT_PUBLIC_SITE_URL=https://site.example.com npm run build)
  node docs/tools/programmer-19/fixture-build-check.mjs <사본>
만드는 것:
  a cc-by-4.0  640×360 JPEG(짧은 변 400 미만 경고) · creditNotice · 영어본
  b kcc-donated(CC BY 4.0 표시, donorName, workYear 없음) 800×600 JPEG · 영어본
  c·d·e cc0-1.0 1200×800 PNG — a와 같은 sourcePageUrl → 4번째(e)에서 같은 원본 반복 경고
JPEG는 macOS `sips`로 PNG를 변환한다. 저작자·저작물명은 전부 가상 값이다.
"""
import pathlib, struct, subprocess, sys, zlib

root = pathlib.Path(sys.argv[1])
SAME = 'https://archive.example.org/photo/view/100'

def png(w, h, path):
    raw = b''.join(b'\x00' + b'\x80\x90\xa0' * w for _ in range(h))
    chunk = lambda t, d: struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    data = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(raw)) + chunk(b'IEND', b'')
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)

def jpeg(w, h, path):
    tmp = path.with_suffix('.png')
    png(w, h, tmp)
    subprocess.run(['sips', '-s', 'format', 'jpeg', str(tmp), '--out', str(path)], check=True, capture_output=True)
    tmp.unlink()

img = root / 'public' / 'images'
jpeg(640, 360, img / 'p19-fx-a-ccby' / 'thumb.jpg')
jpeg(800, 600, img / 'p19-fx-b-donated' / 'thumb.jpg')
for n in 'cde':
    png(1200, 800, img / f'p19-fx-{n}-cc0' / 'thumb.png')

def post(id, image, title):
    return f"""---
id: {id}
title: "{title}"
description: "프로그래머 19 fixture — 실제 게시물 아님"
publishedAt: 2026-11-11
sourceType: url
sourceUrl: "https://www.example.com/post/{id}"
attribution: 예시 출처
useSourceImage: false
sources:
  - type: 언론
    name: "예시일보 — 예시 기사"
    url: "https://news.example.org/article/{id}"
    date: 2026-11-10
tags:
  - 예시
image:
{image}
---
"""

def en(id, cap):
    return f"""---
id: {id}
title: "P19 fixture {id}"
description: "Programmer 19 fixture — not a real post"
imageAlt: "Front of the Example Government Complex"
imageCaption: "{cap}"
translatedAt: 2026-11-11
---
"""

A = f"""  kind: open
  src: /images/p19-fx-a-ccby/thumb.jpg
  alt: "예시 청사 건물 정면"
  caption: "자료사진: 예시 청사(2019) — 이 사건 당시 사진이 아닙니다."
  creditName: 예시 작가
  creditNameEn: Example Author
  sourcePageUrl: "{SAME}"
  license: cc-by-4.0
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  workTitle: 예시 청사 전경
  workYear: 2019
  sourceSiteName: 공유마당
  creditNotice: "© 예시 작가 — 보증 없이 제공"
  retrievedAt: 2026-11-11
  faceNote: 얼굴 없음(자료사진·건물)"""
B = """  kind: open
  src: /images/p19-fx-b-donated/thumb.jpg
  alt: "예시 철책 풍경"
  caption: "자료사진: 예시 철책(촬영 연도 미상) — 이 사건 당시 사진이 아닙니다. 현재 모습과 다를 수 있습니다."
  creditName: 예시 기증 작가
  creditNameEn: Example Donor Author
  sourcePageUrl: "https://archive.example.org/photo/view/200"
  license: kcc-donated
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  licenseLabel: CC BY 4.0
  donorName: 예시 기증자
  workTitle: 예시 철책
  sourceSiteName: 공유마당
  retrievedAt: 2026-11-11
  faceNote: 얼굴 없음(자료사진·풍경)"""
C = lambda n: f"""  kind: open
  src: /images/p19-fx-{n}-cc0/thumb.png
  alt: "예시 건물"
  caption: "자료사진: 예시 건물(2020) — 이 사건 당시 사진이 아닙니다."
  creditName: 예시 기관
  creditNameEn: Example Institution
  sourcePageUrl: "{SAME}"
  license: cc0-1.0
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  workTitle: 예시 건물
  workYear: 2020
  sourceSiteName: 예시 아카이브
  retrievedAt: 2026-11-11
  faceNote: 얼굴 없음(자료사진·건물)"""

P = root / 'content' / 'posts'
E = root / 'content' / 'posts-en'
(P / 'p19-fx-a-ccby.md').write_text(post('p19-fx-a-ccby', A, 'P19 fixture A CC BY'))
(E / 'p19-fx-a-ccby.md').write_text(en('p19-fx-a-ccby', 'Archive photo: the Example Government Complex (2019) — not taken at the time of this event.'))
(P / 'p19-fx-b-donated.md').write_text(post('p19-fx-b-donated', B, 'P19 fixture B 기증'))
(E / 'p19-fx-b-donated.md').write_text(en('p19-fx-b-donated', 'Archive photo: an example fence (year unknown) — not taken at the time of this event. It may differ from how it looks today.'))
for n in 'cde':
    (P / f'p19-fx-{n}-cc0.md').write_text(post(f'p19-fx-{n}-cc0', C(n), f'P19 fixture {n.upper()} CC0'))
print('fixture: ko 5 · en 2 · 이미지 5')
