# 사용: 저장소 루트에서 python3 docs/tools/translator-02/check_desc.py <id> [<id> ...]
# 영어본 description 글자 수(len), 원본/영어 불릿 수, 유보 표현 포함 여부를 출력한다.
import sys, re, yaml
root = 'content'
def fm(p):
    t = open(p, encoding='utf-8').read()
    m = re.match(r'---\n(.*?)\n---\n(.*)', t, re.S)
    return yaml.safe_load(m.group(1)), m.group(2)
def bullets(b): return len(re.findall(r'^\s*- ', b, re.M))
for i in sys.argv[1:]:
    ko, kb = fm(f'{root}/posts/{i}.md'); en, eb = fm(f'{root}/posts-en/{i}.md')
    d = en['description']
    hedge = [w for w in ['reportedly','report','claim','presum','allege','suspicion','says','said'] if w in d.lower()]
    kohedge = [w for w in ['보도','추정','주장','의혹','확인'] if w in ko['description']]
    print(f"{i}\tdesc={len(d)}\tbul={bullets(kb)}/{bullets(eb)}\thedge={hedge}\tKOdesc={kohedge}")
