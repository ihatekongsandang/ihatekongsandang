"""리뷰어 33 — content/README.md(C6)를 planning/v0.9-copy-and-code-list.md §2.4 문안과 글자 단위로 대조한다.
§2.4의 각 문안 덩어리(표 행·인용 문단·yaml 블록·목록 줄·영어본 문장)가 README에 글자 그대로 있는지 보고,
없으면 README에서 가장 가까운 줄과의 차이를 보여 준다. 사용(저장소 루트): python3 docs/tools/reviewer-33/readme-vs-plan.py"""
import difflib, re
plan = open('planning/v0.9-copy-and-code-list.md', encoding='utf8').read()
readme = open('content/README.md', encoding='utf8').read()
sec = plan[plan.index('### 2.4'):plan.index('### 2.5')]
lines = sec.split('\n')
units = []
# 표 행·인용·목록·yaml 블록 줄을 하나씩 대조 단위로
in_yaml = False
for ln in lines:
    if ln.startswith('```'):
        in_yaml = not in_yaml
        continue
    if in_yaml:
        units.append(('yaml', ln))
    elif ln.startswith('|') or ln.startswith('> ') or ln.startswith('- '):
        units.append(('line', ln))
    elif ln.startswith('**§9 영어본**') or ln.startswith('(§8의') or ln.startswith('news (') or ln.startswith('public ('):
        units.append(('line', ln))
rlines = readme.split('\n')
same = 0; diff = []
for kind, u in units:
    if u in rlines:
        same += 1
        continue
    best = max(rlines, key=lambda r: difflib.SequenceMatcher(None, u, r).ratio())
    diff.append((u, best))
print(f'§2.4 대조 단위 {len(units)} · README에 글자 그대로 {same} · 다름 {len(diff)}')
for u, b in diff:
    print('--- 기획 §2.4:'); print('   ', u)
    print('+++ README 가장 가까운 줄:'); print('   ', b)
# yaml 블록 단위로도 비교
pb = re.findall(r'```yaml\n(.*?)```', sec, re.S)
rb = re.findall(r'```yaml\n(.*?)```', readme, re.S)
for i, b in enumerate(pb):
    print(f'yaml 블록 {i+1}: README에 같은 블록 있음 = {b in rb}')
