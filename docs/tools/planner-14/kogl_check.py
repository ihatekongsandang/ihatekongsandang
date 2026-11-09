#!/usr/bin/env python3
"""공공누리 표시 확인기. 사용: python3 kogl_check.py URL [URL...]
페이지에 실제로 적힌 공공누리 유형 문구, 제목, og:image, 본문 이미지 후보를 출력한다(추측 없음).
요청 사이 1.2초 간격."""
import sys, re, subprocess, time, html
for u in sys.argv[1:]:
    time.sleep(1.2)
    t = subprocess.run(["curl", "-sL", "--max-time", "30", "-A", "Mozilla/5.0", u], capture_output=True).stdout.decode("utf-8", "replace")
    print("URL", u, "bytes", len(t))
    print(" title:", html.unescape((re.findall(r"<title>\s*([^<]+)", t) or ["?"])[0].strip())[:120])
    kogl = sorted({re.sub(r"\s+", " ", m.group(0)) for m in re.finditer(r"제\s?[0-4]\s?유형[^<\"]{0,40}|licenseType[1-4]|opentype0[1-4]|type[1-4]\.(?:png|gif|jpg)", t, re.I)})
    alt = sorted(set(re.findall(r"alt=[\"\']([^\"\']*공공누리[^\"\']*)", t)))
    if alt: print(" kogl-alt:", alt)
    print(" kogl:", kogl or "표시 없음")
    txt = re.sub(r"\s+", " ", html.unescape(re.sub(r"<script.*?</script>|<style.*?</style>|<[^>]+>", " ", t, flags=re.S)))
    for m in re.finditer(r"제\s?[0-4]\s?유형", txt):
        print(" ctx:", txt[max(0, m.start()-60):m.end()+70]); break
    for m in re.finditer(r"사진\s?출처[^.]{0,40}|촬영일[^가-힣]{0,20}|ⓒ[^ ]{0,20}|\(사진[=:][^)]{0,20}\)", txt):
        print(" credit:", m.group(0)[:60])
    print(" og:image:", re.findall(r'og:image["\'][^>]*content=["\']([^"\']+)', t)[:2])
    imgs = [i for i in re.findall(r'src=["\']([^"\']+\.(?:jpe?g|png))["\']', t, re.I) if not re.search(r"icon|logo|btn|common|banner|bg_|skin", i, re.I)]
    print(" imgs:", imgs[:6])
