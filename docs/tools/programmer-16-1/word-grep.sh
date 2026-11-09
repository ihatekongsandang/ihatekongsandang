#!/usr/bin/env bash
# 프로그래머 16-1 — 저장소 독립·실명 grep(프로그래머 16 도구 + 대상에 16-1 폴더·핸드오프·트리거·오더). 대상: 커밋 B 코드·content/README·moved-ids
# + docs/tools/programmer-16·16-1 글자 파일 + 16·16-1 핸드오프·트리거·오더. 검색 문자열 자체는 출력하지 않고 건수만 적는다.
#   ① pre-commit 훅 패턴(.git/hooks/pre-commit의 PATTERN을 그대로 읽는다)
#   ② 홈 디렉터리 절대경로(macOS·Linux 사용자 홈 접두)·임시 경로(macOS 임시 폴더 두 곳). 검색식은 아래 ABS에서 조각을 이어 만든다 —
#      글자 그대로 적으면 이 파일 자신이 커밋 게이트의 홈 접두 검색에 걸린다(리뷰 36 P3-3).
#   ③ 옛 #1 id 문자열(content/posts의 파일명에서 읽는다 — 날짜·계정 핸들·사건 낱말 틀에 맞는 파일 1개)
#   ④ 그 id 안 이름 로마자 토큰(대소문자 무시)
#   양성 대조: ③④는 content/posts 파일명 목록에서 반드시 1건 이상 잡혀야 한다(검색식이 동작함).
# 사용(저장소 루트): bash docs/tools/programmer-16-1/word-grep.sh
set -uo pipefail
FILES=()
while IFS= read -r f; do FILES+=("$f"); done < <( { git diff --name-only -- src next.config.ts scripts content; git ls-files --others --exclude-standard -- src content docs/tools/programmer-16 docs/tools/programmer-16-1 docs/handoffs/programmer-16-* docs/triggers/programmer-16-* instructions/programmer/processed/16-* instructions/programmer/16-1-*; git diff --name-only -- docs/tools/programmer-16; } | sort -u | while read -r f; do [ -f "$f" ] && file -b --mime "$f" | grep -q '^text/' && echo "$f"; done )
echo "대상 글자 파일 ${#FILES[@]}개(16·16-1 word-grep.sh 두 파일은 검색식 글자가 들어 있어 셈에서 뺀다)"
P=$(grep "^PATTERN=" .git/hooks/pre-commit | sed "s/^PATTERN='//; s/'\$//")
OLD=$(ls content/posts | grep -E '^2026-08-06-owloffreedom-.*-sentencing\.md$' | sed 's/\.md$//')
ROM=$(printf '%s' "$OLD" | sed 's/^2026-08-06-owloffreedom-//; s/-sentencing$//')
echo "옛 #1 id 파일 찾음: $( [ -n "$OLD" ] && echo 예 || echo 아니오) · 로마자 토큰 길이 ${#ROM}자"
count() { local n=0; for f in "${FILES[@]}"; do case "$f" in docs/tools/programmer-16/word-grep.sh|docs/tools/programmer-16-1/word-grep.sh) continue;; esac; grep -q "$@" "$f" && { n=$((n+1)); echo "    $f" >&2; }; done; echo $n; }
echo "① 훅 패턴 일치 파일: $(count -E "$P")"
S=/; HOME_MAC="${S}User""s${S}"; HOME_LINUX="${S}hom""e${S}[a-z]"; TMP_MAC="${S}privat""e${S}tmp"; TMP_VAR="${S}va""r${S}folders"
ABS="${HOME_MAC}|${HOME_LINUX}|${TMP_MAC}|${TMP_VAR}"
echo "② 절대·임시 경로 일치 파일: $(count -E "$ABS")"
echo "③ 옛 #1 id 일치 파일: $(count -F "$OLD")"
echo "④ 이름 로마자 토큰 일치 파일: $(count -i -F "$ROM")"
echo "양성 대조: content/posts 파일명 목록에서 ③ $(ls content/posts | grep -c -F "$OLD")건 · ④ $(ls content/posts | grep -c -i -F "$ROM")건"
# ⑤ 두 word-grep.sh 자신: 홈·임시 경로 글자 그대로 0이어야 한다(리뷰 36 P3-3 — 커밋 게이트의 홈 접두 검색)
for g in docs/tools/programmer-16/word-grep.sh docs/tools/programmer-16-1/word-grep.sh; do echo "⑤ $g 안 절대·임시 경로 글자: $(grep -c -E "$ABS" "$g")줄"; done
