# 📋 md오더 시스템 (Instructions / md-Order System)

> **md오더**: 슈퍼바이저(Opus)가 자연어 지시를 받아 담당자 폴더에 .md 파일로 작성 → 해당 담당자 세션이 폴링으로 감지·자동 실행하는 비동기 작업 지시 시스템.

---

## 🎯 목적

- 사용자가 매번 긴 프롬프트를 복붙하지 않도록 자동화
- 슈퍼바이저(Opus) 답변 토큰 절약 (풀 프롬프트는 파일에 저장, 답변엔 요약만)
- 모든 작업 지시의 영구 추적 (파일명 순번으로 한눈 매칭)

---

## 📁 폴더 구조

```
instructions/
├── README.md                       ← 본 문서
├── programmer/                     ← 프로그래머 (Opus 5) 폴링 대상
│   └── processed/                  ← 처리 완료 .md 이동
├── planner/                        ← 기획자 (Sonnet)
│   └── processed/
├── designer/                       ← 디자이너 (Sonnet)
│   └── processed/
├── data-engineer/                  ← 데이터엔지니어 (Sonnet)
│   └── processed/
├── reviewer/                       ← 리뷰어 (Fable 5.1, 간헐 호출)
│   └── processed/
└── tester/                         ← 테스터 (Sonnet)
    └── processed/
```

---

## 🔖 파일명 규칙

### md오더 (지시) 파일명
```
{NN}-{task-slug}.md
```
- `NN` = 담당자별 독립 순번 (01, 02, 03, ... 99)
- `task-slug` = 작업 식별 슬러그 (영문 kebab-case)

**예시**:
- `instructions/programmer/01-v0.1.5-p1-fix.md`
- `instructions/programmer/02-v0.2-cluster-marker.md`
- `instructions/planner/03-list-page-spec.md`

### 작업 완료 파일명 (핸드오프·트리거·리뷰)
**같은 순번 사용** (md오더와 1:1 매칭):

```
docs/handoffs/{role}-{NN}-{task-slug}.md
docs/triggers/{role}-{NN}-{task-slug}-COMPLETE.md
docs/reviews/{role}-{NN}-{task-slug}-review.md
```

**예시**:
- 지시: `instructions/programmer/01-v0.1.5-p1-fix.md`
- 핸드오프: `docs/handoffs/programmer-01-v0.1.5-p1-fix.md`
- 트리거: `docs/triggers/programmer-01-v0.1.5-p1-fix-COMPLETE.md`
- 리뷰: `docs/reviews/programmer-01-v0.1.5-p1-fix-review.md`

→ 파일명만 봐도 "01 지시 → 01 작업"이 즉시 추적 가능.

---

## 🔢 순번 자동 부여 (슈퍼바이저 책임)

새 md오더 파일 생성 시:
```bash
NEXT_NUM=$(ls instructions/{role}/*.md 2>/dev/null | grep -oE '^[0-9]+' | sort -n | tail -1)
NEXT_NUM=$(printf "%02d" $((${NEXT_NUM:-0} + 1)))
# 01, 02, 03, ...
```

순번은 **담당자별 독립** (programmer 01·planner 01 각각 시작).

---

## 🔔 STEP 0 — 세션 가동 시 폴링 시작 (필수)

각 담당자 세션은 가동 직후 본인 폴더 폴링 시작:

```bash
ROLE={programmer|planner|designer|data-engineer|reviewer|tester}
INSTRUCTION_DIR=$HOME/ihatekongsandang/instructions/$ROLE
PROCESSED_DIR=$INSTRUCTION_DIR/processed

echo "🔔 $ROLE 세션 가동 — md오더 모니터링 시작 (5분 간격)"
echo "감지 폴더: $INSTRUCTION_DIR"

while true; do
  # processed/ 제외, README.md 제외, 새 .md 파일 탐색
  NEW_FILES=$(find "$INSTRUCTION_DIR" -maxdepth 1 -name "*.md" -type f 2>/dev/null)
  
  if [ -n "$NEW_FILES" ]; then
    for FILE in $NEW_FILES; do
      FILENAME=$(basename "$FILE")
      echo "✅ md오더 감지: $FILENAME"
      cat "$FILE"
      # → 세션이 파일 내용 읽고 작업 실행
      # → 작업 완료 후 processed/로 이동
      # → 핸드오프·트리거 생성 (같은 NN 사용)
      mv "$FILE" "$PROCESSED_DIR/"
      echo "✅ 처리 완료: $FILENAME → processed/"
    done
  fi
  
  sleep 300
done
```

---

## 🔄 운영 흐름

```
1. [사용자] 슈퍼바이저에게 자연어 지시
   "기획자에게 X 시켜줘"

2. [슈퍼바이저(Opus)] md오더 파일 생성
   instructions/planner/04-{task-slug}.md
   (답변엔 요약 + 파일 경로만, 풀 프롬프트는 파일에)

3. [기획자 세션 (가동 중·폴링 중)] 5분 내 감지
   파일 읽고 작업 시작

4. [기획자] 작업 완료
   docs/handoffs/planner-04-{task-slug}.md 작성
   docs/triggers/planner-04-{task-slug}-COMPLETE.md 생성
   instructions/planner/{filename} → processed/ 이동
   사용자·슈퍼바이저에게 완료 보고

5. [슈퍼바이저] §3 검토 + 리뷰어 호출 (§5)

6. [리뷰어 세션 (호출 시 가동)] 검증
   docs/reviews/planner-04-{task-slug}-review.md 작성

7. [슈퍼바이저] 사용자 보고 + 다음 액션 제안
```

---

## ⚙️ md오더 파일 표준 템플릿

슈퍼바이저(Opus)가 md오더 파일 작성 시 다음 구조 권장:

```markdown
# md오더: {역할} ({모델}) - {NN}-{task-slug}

**작성일**: YYYY-MM-DD HH:MM | **작성자**: 슈퍼바이저 (Opus) | **순번**: NN

---

## 자격·역할 (Required)
{역할명} ({모델}) 자격으로 본 임무 수행. CLAUDE.md §1~§7 준수.

## 선행 검토 문서 (Required)
- 공통: CLAUDE.md, planning/prd.md, history/{최근}.md
- {역할별 추가 문서}

## 임무
{작업 내용 상세}

## 산출물 (Required)
{생성·수정할 파일 경로 목록}

## 핸드오프 (Required)
docs/handoffs/{role}-{NN}-{task-slug}.md
docs/triggers/{role}-{NN}-{task-slug}-COMPLETE.md
처리 후 본 파일 → instructions/{role}/processed/ 이동

## 결정 사항·제약
{사용자 결정·기획 우선순위·기술 제약}

## 완료 보고 양식
- 산출물 경로 목록
- 핸드오프 요약 3줄
- 미해결·이슈 (있으면)
```

---

## 🚫 금지 사항

1. **사용자가 md오더 파일 직접 작성 금지** — 반드시 슈퍼바이저(Opus) 경유
2. **다른 담당자 폴더 침범 금지** — 본인 폴더만 폴링·처리
3. **순번 임의 변경 금지** — 슈퍼바이저가 부여한 NN 유지
4. **processed/ 파일 수정 금지** — 작업 이력 보존

---

## 📝 운영 메모

- 옵션 2 (필요 시 가동): 모든 세션 상시 가동 X. 작업 사이클상 필요한 세션만 가동.
- 작업 없는 세션은 사용자가 명시적 종료 OK (md오더 누적되어 있어도 다음 가동 시 일괄 처리).
- 시스템 구축일: 2026-09-21 (즉시 실사용)
