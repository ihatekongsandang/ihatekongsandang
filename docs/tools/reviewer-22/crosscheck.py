# 리뷰어 22 — 프로그래머 10 보고서 재현 표 ↔ reproduce-output.tsv 대조, 집계 재계산, 당시 UA 집계. 요청 없음.
# 실행(저장소 루트): python3 -I docs/tools/reviewer-22/crosscheck.py > docs/tools/reviewer-22/crosscheck-output.txt
import csv
from collections import Counter
D = 'docs/tools/programmer-10/'
rows = list(csv.DictReader(open(D + 'reproduce-output.tsv', encoding='utf-8'), delimiter='\t'))
rep = open(D + 'instagram-collect-report.md', encoding='utf-8').read().splitlines()
T = {'True': '✅', 'False': '❌'}
okA = lambda r: r['A_img_cdn'] == 'True' and r['A_username'] == 'True'
okB = lambda r: r['B_og_title'] == 'True' and r['B_og_desc'] == 'True' and r['B_og_image'] == 'True'
mism = 0
for r in rows:
    line = [l for l in rep if f'`{r["code"]}`' in l and l.startswith('|') and l.count('|') > 15][0]
    c = [x.strip() for x in line.split('|')[1:-1]]
    exp = [r['A_http'], '아니오' if r['A_final_url_changed'] == 'False' else '예', r['A_bytes'], T[r['A_img_cdn']], T[r['A_caption_div']],
           r['A_caption_chars'], T[r['A_username']], T[r['A_gql_data']], T[r['A_video_url']], T[r['A_sidecar']],
           '⚠️' if r['A_sorry'] == 'True' else '–', T[r['B_og_title']], T[r['B_og_desc']], T[r['B_og_image']]]
    judge = ['성공' if okA(r) else '실패', '성공' if (okA(r) or okB(r)) else '실패']
    if c[4:18] != exp or c[18:20] != judge or c[1] != r['kind']:
        mism += 1; print('MISMATCH', r['code'], exp, judge, c[1:20])
print(f'표 행 {len(rows)} · 불일치 {mism} (측정 14열 + 판정 2열 + 구분)')
for k in ('fail18', 'fail-extra', 'control'):
    s = [r for r in rows if r['kind'] == k]
    print(k, '검사', len(s), 'A', sum(map(okA, s)), 'B', sum(map(okB, s)), 'A∨B', sum(okA(r) or okB(r) for r in s))
att = [l.rstrip('\n').split('\t') for l in open(D + 'uploader-attempts-output.tsv', encoding='utf-8')][1:]
print('당시 요청 행', len(att), dict(Counter(a[1] for a in att)))
ch = [a for a in att if a[1] == 'chrome130-full']
print('chrome 첫·끝', ch[0][0], ch[-1][0], '크기 범위', min(int(a[3]) for a in ch), max(int(a[3]) for a in ch))
mk = [a for a in ch if a[4]]
print('마커 출력 있는 chrome 행', len(mk), '전부 0:', all(set(a[4].split(',')) == {'0'} for a in mk), '첫 행', mk[0][0], mk[0][2])
pl = [a for a in att if a[1].startswith('plain')]
print('plain 행', len(pl), '마지막', pl[-1][0])
cc = {a[2] for a in ch}
now = [int(r['A_bytes']) for r in rows if r['code'] in cc and r['A_sorry'] == 'False' and okA(r)]
print('chrome 코드 중 현재 A 성공', len(now), '크기', min(now), max(now))
print('Des0mDXEZbq 당시 행:', [a[:4] for a in att if a[2] == 'Des0mDXEZbq'])
