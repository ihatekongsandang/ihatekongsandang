#!/usr/bin/env python3
"""40건 대조표 생성: 원본/영어본 불릿 수, description 글자수, reportedly류 유보 표현 비율."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
IDS_FILE = ROOT / "docs" / "tools" / "translator-01" / "ids.txt"

HEDGE_WORDS_KO = ["보도됨", "보도됐", "전해졌", "전해짐", "전했", "알려졌", "알려짐", "전언", "취지로"]
HEDGE_WORDS_EN = ["reportedly", "reports", "reported"]


def count_bullets(text: str) -> int:
    return len(re.findall(r"^\s*-\s+", text, flags=re.MULTILINE))


def get_frontmatter_body(path: Path):
    text = path.read_text(encoding="utf-8")
    parts = text.split("---", 2)
    if len(parts) < 3:
        return "", text
    return parts[1], parts[2]


def get_field(fm: str, field: str) -> str:
    m = re.search(rf'^{field}:\s*"?(.*?)"?\s*$', fm, flags=re.MULTILINE)
    return m.group(1) if m else ""


def main():
    ids = [line.strip() for line in IDS_FILE.read_text(encoding="utf-8").splitlines() if line.strip()]
    rows = []
    for id_ in ids:
        ko_path = ROOT / "content" / "posts" / f"{id_}.md"
        en_path = ROOT / "content" / "posts-en" / f"{id_}.md"
        ko_fm, ko_body = get_frontmatter_body(ko_path)
        en_fm, en_body = get_frontmatter_body(en_path)
        ko_bullets = count_bullets(ko_body)
        en_bullets = count_bullets(en_body)
        desc = get_field(en_fm, "description")
        desc_len = len(desc)
        ko_hedge = sum(ko_body.count(w) for w in HEDGE_WORDS_KO)
        en_hedge = sum(en_body.lower().count(w) for w in HEDGE_WORDS_EN)
        rows.append((id_, ko_bullets, en_bullets, desc_len, ko_hedge, en_hedge))
    print("| id | 불릿 수(한/영) | description 글자수 | 유보표현(한/영) | 비고 |")
    print("|---|---|---|---|---|---|")
    for id_, kb, eb, dl, kh, eh in rows:
        note = ""
        if kb != eb:
            note += "불릿 수 차이(구조 재배열 가능) "
        if dl > 160:
            note += "description 160자 초과 "
        if kh > 0 and eh == 0:
            note += "유보표현 확인 필요 "
        print(f"| {id_} | {kb}/{eb} | {dl} | {kh}/{eh} | {note.strip()} |")


if __name__ == "__main__":
    main()
