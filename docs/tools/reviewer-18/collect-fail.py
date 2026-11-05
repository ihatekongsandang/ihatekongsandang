# 리뷰어 18 — history 의 인스타그램 수집 실패 보류(캡처 대기) 전수 추출. 저장소 루트에서 python3 로 실행
import re, glob
out = []
for f in sorted(glob.glob('history/2026-1[01]-*.md')):
    d = f[-13:-3]
    if not ('2026-10-15' <= d <= '2026-11-04'):
        continue
    for line in open(f, encoding='utf-8'):
        if line.startswith('## [') and ('수집 실패' in line or '판단 보류(사용자에게 확인 요청)' in line or '게시 보류, 사용자에게 캡처' in line):
            m = re.search(r'instagram (?:릴스 |게시물 )?(D[A-Za-z0-9_-]{10})', line)
            out.append((d, m.group(1) if m else '?(같은 날 앞 줄 코드 재처리)'))
for d, c in out:
    print(d, c)
codes = sorted(set(c for _, c in out if not c.startswith('?')))
print('history 줄 수:', len(out), '/ 고유 코드:', len(codes))
