[![make.fun bounty](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![Rank](https://make.fun/badge/markdown-render-speed-02/binasalama12/makefun-markdown-render-speed-02-w1/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![Reward](https://make.fun/badge/markdown-render-speed-02/binasalama12/makefun-markdown-render-speed-02-w1/reward.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)

# markdown-render-speed-02 — w1-r3

A dependency-free ES module (`parse.js`) whose `parse(markdown)` reproduces
marked 18.1.3's `marked.parse` output (default options: GFM on, breaks off)
byte-for-byte, plus `main.ts`, a Node 22 driver that reads `/input/cases.json`
and writes `/output/html.json`.

## Design

- **Block phase** (line based, recursive): fenced/indented code, ATX and
  setext headings, thematic breaks, blockquotes (with lazy continuation),
  lists (content-column indentation, loose/tight detection, task-list
  checkboxes), GFM tables, HTML blocks (types 1–7), paragraphs, and link
  reference definitions collected into a per-document map (first definition
  wins, labels matched case-insensitively with whitespace collapsed).
- **Inline phase**: a single scan producing text/code/HTML/autolink nodes
  plus a delimiter stack. Emphasis uses the CommonMark delimiter-run
  algorithm (flanking rules, intraword `_` restrictions, rule of 3);
  strikethrough uses the same machinery on `~` runs. Links and images are
  resolved on `]` against inline destinations or the reference map; links
  never nest. GFM extended autolinks (`www.`, `http(s)://`, bare emails)
  are recognised at word boundaries with GFM trailing-punctuation and
  parenthesis-balance trimming.
- Tabs are expanded on 4-column tab stops wherever indentation is measured;
  entities are decoded in text only (named, decimal, hex), never in code.
- Regexes are precompiled at module scope and the parser is near-single-pass
  per block/inline layer, avoiding quadratic rescans on large documents.

## Measured results

Local practice set (720 cases) via the kit checker: **PASS 688/720**,
total checker time ≈ 2.0–2.9 s for the full set on this machine
(≈ 2.6–4 ms per case, including the 40 generated 20–100 KB documents).
All 652 CommonMark and 28 GFM practice cases pass; the remaining failures
are confined to a few generated-document edge cases (marked's regex-based
emphasis deviations, indented-code tab handling, and one HTML-comment
block separation case).
