---
id: zz-sanitize
title: "리뷰어 임시 — sanitize 검증"
description: "리뷰어 04 임시 게시물. 본문에 HTML·이벤트 핸들러·javascript 링크·마크다운 이미지를 넣어 렌더 결과를 확인한다."
publishedAt: 2026-09-15
status: 의혹
sourceType: url
attribution: 임시
sources:
  - type: 언론
    name: 임시 출처
    url: "https://example.com/reviewer-temp-2"
    date: 2026-09-15
sourceUrl: "https://example.com/reviewer-temp-2"
---

<!-- REVIEWER_HTML_COMMENT_MARKER -->

문단 REVIEWER_P_MARKER 시작.

<img src="x" onerror="alert('REVIEWER_ONERROR')">

<b onmouseover="alert('REVIEWER_ONMOUSEOVER')">굵게</b>

<a href="https://example.com/raw-html-anchor" target="_blank">REVIEWER_RAW_ANCHOR</a>

[REVIEWER_JS_LINK](javascript:alert('REVIEWER_JS'))

[REVIEWER_DATA_LINK](data:text/html,REVIEWER_DATA)

[REVIEWER_MD_EXTERNAL](https://example.com/md-external)

[REVIEWER_MD_INTERNAL](/about)

![REVIEWER_MD_IMAGE_ALT](https://example.com/md-image.png)

<div style="position:fixed;top:0;left:0;background:red">REVIEWER_STYLE_DIV</div>

`inline code REVIEWER_CODE`
