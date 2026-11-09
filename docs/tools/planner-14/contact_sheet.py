#!/usr/bin/env python3
"""내려받은 og:image를 번호 라벨 붙은 시트로 묶는다(육안 판정용).
사용: SURVEY_DIR=<스크래치 폴더> python3 contact_sheet.py [한 시트당 장수=6]
출력: $SURVEY_DIR/sheets/sheet_NN.jpg, $SURVEY_DIR/sheets/index.json(시트 번호별 URL·게시물)"""
import os, json, sys
from PIL import Image, ImageDraw
SD = os.environ["SURVEY_DIR"]; per = int(sys.argv[1]) if len(sys.argv) > 1 else 6
og = json.load(open(os.path.join(SD, "og.json")))
items = [(u, r) for u, r in og.items() if r.get("file")]
os.makedirs(os.path.join(SD, "sheets"), exist_ok=True)
W, H = 480, 330; cols = 3
idx = {}
for s in range(0, len(items), per):
    chunk = items[s:s+per]; rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * W, rows * H), "white"); d = ImageDraw.Draw(sheet)
    for k, (u, r) in enumerate(chunk):
        n = s + k + 1
        try:
            im = Image.open(os.path.join(SD, "img", r["file"])); im = im.convert("RGB"); im.thumbnail((W - 6, H - 26))
        except Exception as e:
            im = Image.new("RGB", (W - 6, H - 26), "gray")
        x, y = (k % cols) * W, (k // cols) * H
        sheet.paste(im, (x + 3, y + 22)); d.text((x + 4, y + 4), f"#{n} {r['post'][:42]}", fill="red")
        idx[n] = {"url": u, "post": r["post"], "name": r["name"]}
    sheet.save(os.path.join(SD, "sheets", f"sheet_{s//per+1:02d}.jpg"), quality=88)
json.dump(idx, open(os.path.join(SD, "sheets", "index.json"), "w"), ensure_ascii=False, indent=1)
print(len(items), "images ->", (len(items) + per - 1) // per, "sheets")
