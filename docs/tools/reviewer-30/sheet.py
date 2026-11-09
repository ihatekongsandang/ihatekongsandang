import json, sys, os
from PIL import Image, ImageDraw, ImageFont
base=sys.argv[1]
w={o['i']:o for o in json.load(open(base+'/meta/work.json'))}
ids=[int(x.split('\t')[0]) for x in open(base+'/meta/dl.tsv')]
font=ImageFont.truetype('/System/Library/Fonts/AppleSDGothicNeo.ttc',28,index=6)
W,Hh=640,400; cols=2; per=4
os.makedirs(base+'/sheets',exist_ok=True)
for s in range(0,len(ids),per):
    chunk=ids[s:s+per]; rows=(len(chunk)+1)//2
    sheet=Image.new('RGB',(cols*W,rows*(Hh+40)),'white'); d=ImageDraw.Draw(sheet)
    for k,i in enumerate(chunk):
        x=(k%cols)*W; y=(k//cols)*(Hh+40)
        try:
            im=Image.open(f'{base}/img/{i}.bin').convert('RGB'); im.thumbnail((W-10,Hh-5))
            sheet.paste(im,(x+5,y+40))
        except Exception as e:
            d.text((x+10,y+100),'ERR '+str(e)[:40],fill='red',font=font)
        d.text((x+8,y+4),f'#{i}  posts {w[i]["posts"]}',fill='red',font=font)
    sheet.save(f'{base}/sheets/s{s//per:02d}.jpg',quality=80)
print(len(ids), (len(ids)+per-1)//per)
