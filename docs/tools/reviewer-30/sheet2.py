import json, sys, os
from PIL import Image, ImageDraw, ImageFont
base=sys.argv[1]; ids=[int(x.split('\t')[0]) for x in open(base+'/meta/dl2.tsv')]
font=ImageFont.truetype('/System/Library/Fonts/AppleSDGothicNeo.ttc',26,index=6)
W,H=430,290; cols=3; per=9
for s in range(0,len(ids),per):
    ch=ids[s:s+per]; rows=(len(ch)+cols-1)//cols
    sh=Image.new('RGB',(cols*W,rows*(H+34)),'white'); d=ImageDraw.Draw(sh)
    for k,i in enumerate(ch):
        x=(k%cols)*W; y=(k//cols)*(H+34)
        try:
            im=Image.open(f'{base}/img/{i}.bin').convert('RGB'); im.thumbnail((W-8,H-4)); sh.paste(im,(x+4,y+34))
        except Exception as e: d.text((x+8,y+80),'ERR',fill='red',font=font)
        d.text((x+6,y+2),f'#{i}',fill='red',font=font)
    sh.save(f'{base}/sheets/f{s//per}.jpg',quality=80)
