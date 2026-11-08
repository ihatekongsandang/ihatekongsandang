# 프로그래머 10 — 인스타그램 수집 재현(guide §3 현재 명령 그대로). 저장소 루트에서:
#   python3 docs/tools/programmer-10/reproduce.py <원문 저장 폴더(저장소 밖)> > docs/tools/programmer-10/reproduce-output.tsv
#   (원문을 이미 받았으면 끝에 --measure-only 를 붙여 요청 없이 재측정)
# 요청: 코드당 A(embed/captioned curl) 1회 + B(og:draft, /p/{code}/) 1회. 요청 사이 4초 대기.
# 원문 HTML·이미지·캡션은 저장소 밖 폴더에만 저장하고, 여기에는 측정값만 출력한다.
import html, os, re, subprocess, sys, time

raw_dir = sys.argv[1]
MEASURE_ONLY = '--measure-only' in sys.argv  # 이미 받은 원문으로 측정만 다시 한다(요청 0회)
os.makedirs(raw_dir, exist_ok=True)
codes = [l.split() for l in open('docs/tools/programmer-10/codes.txt', encoding='utf-8') if l.strip() and not l.startswith('#')]

def curl(url, out, ua='Mozilla/5.0'):
    r = subprocess.run(['curl', '-sL', '-A', ua, '-o', out, '-w', '%{http_code}\t%{url_effective}\t%{size_download}', url],
                       capture_output=True, text=True, timeout=40)
    return r.stdout.split('\t')

def measure_embed(path):
    t = open(path, encoding='utf-8', errors='replace').read()
    img = re.search(r'<img[^>]*class="EmbeddedMediaImage"[^>]*>', t)
    img_cdn = bool(img and re.search(r'src="https://[^"]*(cdninstagram|fbcdn)', img.group(0)))
    cap = re.search(r'<div class="Caption">(.*?)</div>', t, re.S)
    user = bool(re.search(r'class="CaptionUsername"', t))
    cap_len = 0
    if cap:
        inner = re.sub(r'<a class="CaptionUsername".*?</a>', '', cap.group(1), flags=re.S)
        inner = re.sub(r'<div class="CaptionComments".*', '', inner, flags=re.S)
        cap_len = len(html.unescape(re.sub(r'<[^>]+>', '', inner)).strip())
    return dict(img=img_cdn, caption=bool(cap), caption_chars=cap_len, username=user,
                gql='gql_data' in t, video_url='video_url' in t, sidecar='"isSidecar":true' in t,
                sorry='may be broken' in t or 'EmbedSorryMessage' in t)

print('\t'.join(['kind', 'code', 'A_http', 'A_final_url_changed', 'A_bytes', 'A_img_cdn', 'A_caption_div', 'A_caption_chars',
                 'A_username', 'A_gql_data', 'A_video_url', 'A_sidecar', 'A_sorry', 'B_og_title', 'B_og_desc', 'B_og_image', 'B_stderr']))
for kind, code in codes:
    url = f'https://www.instagram.com/p/{code}/embed/captioned/'
    out = os.path.join(raw_dir, f'A_{code}.html')
    meta_path = os.path.join(raw_dir, f'A_{code}.meta')
    if MEASURE_ONLY:
        http, final, size = open(meta_path).read().split('\t')
    else:
        http, final, size = curl(url, out)
        open(meta_path, 'w').write('\t'.join([http, final, size]))
    m = measure_embed(out)
    b_path = os.path.join(raw_dir, f'B_{code}.txt')
    if MEASURE_ONLY:
        class B: pass
        b = B(); b.stdout = open(b_path, encoding='utf-8').read(); b.stderr = open(b_path + '.err', encoding='utf-8').read() if os.path.exists(b_path + '.err') else ''
    else:
        time.sleep(4)
        b = subprocess.run(['npm', 'run', '--silent', 'og:draft', '--', f'https://www.instagram.com/p/{code}/'],
                           capture_output=True, text=True, timeout=60)
        open(b_path, 'w', encoding='utf-8').write(b.stdout)
        open(b_path + '.err', 'w', encoding='utf-8').write(b.stderr)
    og = {k: bool(re.search(rf'^  {k}: "(?!")', b.stdout, re.M)) for k in ('title', 'description', 'image')}
    og['title'] = og['title'] and not re.search(r'^  title: "Instagram"$', b.stdout, re.M)  # 일반 제목 "Instagram" 은 내용 없음으로 본다
    err = 'warn' if '🟡' in b.stderr else 'ok'
    print('\t'.join(map(str, [kind, code, http, final != url, size, m['img'], m['caption'], m['caption_chars'], m['username'],
                              m['gql'], m['video_url'], m['sidecar'], m['sorry'], og['title'], og['description'], og['image'], err])), flush=True)
    if not MEASURE_ONLY:
        time.sleep(4)
