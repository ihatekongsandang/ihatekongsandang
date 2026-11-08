#!/usr/bin/env python3
"""리뷰어 20 — 기획서 §3.2 '오늘의 이슈'(최근 24·48시간 publishedAt 또는 updatedAt) 빈 섹션 일수 실측.
사용: python3 docs/tools/reviewer-20/today-issue-empty-days.py [시작일 YYYY-MM-DD] [끝일 YYYY-MM-DD]
기준: content/posts/*.md frontmatter의 publishedAt·updatedAt 날짜(일 단위). 각 날 D에 대해
  24h = D 당일 게시·갱신 1건 이상, 48h = D 또는 D-1 게시·갱신 1건 이상이면 '채워짐'.
"""
import sys, re, glob, datetime as dt
start = dt.date.fromisoformat(sys.argv[1] if len(sys.argv) > 1 else '2026-10-15')
end = dt.date.fromisoformat(sys.argv[2] if len(sys.argv) > 2 else '2026-11-08')
pub, upd = {}, {}
for f in glob.glob('content/posts/*.md'):
    head = open(f, encoding='utf-8').read().split('---')[1]
    for key, bucket in (('publishedAt', pub), ('updatedAt', upd)):
        m = re.search(rf'^{key}:\s*"?(\d{{4}}-\d{{2}}-\d{{2}})', head, re.M)
        if m:
            d = dt.date.fromisoformat(m.group(1)); bucket[d] = bucket.get(d, 0) + 1
days = (end - start).days + 1
def filled(d, window, src):
    return any(src.get(d - dt.timedelta(i), 0) for i in range(window))
for label, src in (('publishedAt만', pub), ('publishedAt+updatedAt', {k: pub.get(k, 0) + upd.get(k, 0) for k in set(pub) | set(upd)})):
    for w in (1, 2):
        empty = [d for d in (start + dt.timedelta(i) for i in range(days)) if not filled(d, w, src)]
        print(f'[{label}] {w*24}h 창: 기간 {start}~{end} {days}일 중 빈 날 {len(empty)}일 ({len(empty)*100//days}%)')
print('게시일 분포(기간 내):', {str(k): v for k, v in sorted(pub.items()) if start <= k <= end})
print('갱신일 분포(기간 내):', {str(k): v for k, v in sorted(upd.items()) if start <= k <= end})
print('전체 파일 수:', len(glob.glob('content/posts/*.md')))
