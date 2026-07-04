#!/usr/bin/env python3
"""Split the frozen Project Gutenberg 1911 Great Controversy text into
per-chapter working files with [par-N] paragraph prefixes, plus the Appendix
and Footnotes apparatus saved separately.

Input : source/gc_full_1911.txt (verbatim PG download, never edited)
Output: source/chapters/gc_ch00.txt ... gc_ch42.txt   (ch00 = Introduction)
        source/gc_appendix_1911.txt
        source/gc_footnotes_1911.txt
        prints a chapter table; writes scratchpad split_summary.json for the
        manifest generator.

Transformations applied to the DERIVED chapter files only (the frozen full text
is untouched):
  * PG license header/footer stripped
  * front matter (title page, CONTENTS, Preface) dropped
  * hard line-wrapping unwrapped: one source paragraph -> one physical line
  * [Illustration: ...] placeholder blocks dropped (PG markup, not White's prose)
  * inline source-reference markers like (469) are PRESERVED (they map to the
    Footnotes / Appendix apparatus and drive the anachronism check)
  * each paragraph prefixed with [par-N], N sequential within the chapter
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "source", "gc_full_1911.txt")
CH_DIR = os.path.join(ROOT, "source", "chapters")
APPENDIX_OUT = os.path.join(ROOT, "source", "gc_appendix_1911.txt")
FOOTNOTES_OUT = os.path.join(ROOT, "source", "gc_footnotes_1911.txt")
SUMMARY_OUT = os.path.join(
    os.environ.get("SCRATCH", ROOT), "split_summary.json"
)

PAR = "¶"  # ¶  (written into files as [par-N] to stay ASCII-safe on all shells)


def read_body(text):
    """Strip PG header/footer, return the book body."""
    m = re.search(r"\*\*\* START OF THE PROJECT GUTENBERG EBOOK.*?\n", text)
    start = m.end() if m else 0
    m = re.search(r"\*\*\* END OF THE PROJECT GUTENBERG EBOOK", text)
    end = m.start() if m else len(text)
    return text[start:end]


def split_blocks(body):
    """Split into paragraph blocks separated by one or more blank lines.
    Each block is a list of its raw (rstripped) lines."""
    blocks = []
    cur = []
    for line in body.split("\n"):
        if line.strip() == "":
            if cur:
                blocks.append(cur)
                cur = []
        else:
            cur.append(line.rstrip())
    if cur:
        blocks.append(cur)
    return blocks


def is_allcaps_heading(block):
    """A heading block is a single line, all-caps (== its own upper),
    containing at least one letter."""
    if len(block) != 1:
        return False
    line = block[0].strip()
    if not any(c.isalpha() for c in line):
        return False
    return line == line.upper()


CH_HEAD = re.compile(r'^(\d{1,2})\.\s+["“]?[A-Z]')


def classify_heading(block):
    """Return ('intro'|'chapter'|'appendix'|'scripture_index'|'general_index'
    |'footnotes'|None, number_or_None)."""
    if not is_allcaps_heading(block):
        return (None, None)
    line = block[0].strip()
    if line.rstrip(".") == "INTRODUCTION":
        return ("intro", 0)
    if line.rstrip(".") == "APPENDIX":
        return ("appendix", None)
    if line.rstrip(".").startswith("INDEX OF SCRIPTURE REFERENCES"):
        return ("scripture_index", None)
    if line.rstrip(".") == "GENERAL INDEX":
        return ("general_index", None)
    if line.rstrip(".") == "FOOTNOTES":
        return ("footnotes", None)
    m = CH_HEAD.match(line)
    if m:
        n = int(m.group(1))
        if 1 <= n <= 42:
            return ("chapter", n)
    return (None, None)


def unwrap(block):
    """Join a block's lines into one line, collapsing runs of whitespace."""
    return re.sub(r"\s+", " ", " ".join(block)).strip()


def is_illustration(block):
    return len(block) == 1 and block[0].strip().startswith("[Illustration:")


def parse_contents_titles(body):
    """Parse the CONTENTS block for nice title-case chapter titles."""
    titles = {}
    m = re.search(r"\nCONTENTS\n", body)
    if not m:
        return titles
    seg = body[m.end():]
    for line in seg.split("\n"):
        s = line.strip()
        if s == "PREFACE" or s.startswith("Appendix"):
            break
        mi = re.match(r"^Introduction\.?$", s)
        if mi:
            titles[0] = "Introduction"
            continue
        mc = re.match(r"^(\d{1,2})\.\s+(.+?)\.?$", s)
        if mc:
            titles[int(mc.group(1))] = mc.group(2).strip()
    return titles


def wordcount(s):
    return len(re.findall(r"\S+", s))


def main():
    with open(RAW, encoding="utf-8") as f:
        text = f.read()
    body = read_body(text)
    titles = parse_contents_titles(body)
    blocks = split_blocks(body)

    os.makedirs(CH_DIR, exist_ok=True)

    # Walk blocks, routing to sections. Only start collecting at INTRODUCTION.
    sections = {}          # chapter number (0..42) -> list of prose paragraph strings
    appendix_paras = []
    footnotes_paras = []
    mode = None            # None|'chapter'|'appendix'|'footnotes'|'dead'
    cur_ch = None
    started = False

    for block in blocks:
        kind, num = classify_heading(block)
        if kind == "intro":
            started = True
            mode, cur_ch = "chapter", 0
            sections[0] = []
            continue
        if kind == "chapter":
            mode, cur_ch = "chapter", num
            sections[num] = []
            continue
        if kind == "appendix":
            mode, cur_ch = "appendix", None
            continue
        if kind in ("scripture_index", "general_index"):
            mode = "dead"   # discard indexes
            continue
        if kind == "footnotes":
            mode = "footnotes"
            continue

        if not started or mode in (None, "dead"):
            continue
        if is_illustration(block):
            continue
        para = unwrap(block)
        if not para:
            continue
        if mode == "chapter":
            sections[cur_ch].append(para)
        elif mode == "appendix":
            appendix_paras.append(para)
        elif mode == "footnotes":
            footnotes_paras.append(para)

    # Write chapter files with [par-N] prefixes.
    rows = []
    for n in range(0, 43):
        paras = sections.get(n, [])
        title = titles.get(n, "(untitled)")
        header = "Introduction" if n == 0 else f"Chapter {n}: {title}"
        lines = [header, ""]
        for i, p in enumerate(paras, start=1):
            lines.append(f"[{PAR}{i}] {p}")
            lines.append("")
        content = "\n".join(lines).rstrip() + "\n"
        path = os.path.join(CH_DIR, f"gc_ch{n:02d}.txt")
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        wc = sum(wordcount(p) for p in paras)
        rows.append({"chapter": n, "title": title, "words": wc, "paras": len(paras)})

    with open(APPENDIX_OUT, "w", encoding="utf-8") as f:
        f.write("APPENDIX (General Notes) - The Great Controversy, 1911 edition\n\n")
        f.write("\n\n".join(appendix_paras) + "\n")
    with open(FOOTNOTES_OUT, "w", encoding="utf-8") as f:
        f.write("FOOTNOTES (numbered references) - The Great Controversy, 1911 edition\n\n")
        f.write("\n\n".join(footnotes_paras) + "\n")

    # Print table
    print(f"{'Ch':>3}  {'Title':40}  {'Words':>7}  {'Paras':>5}")
    print("-" * 64)
    total_w = total_p = 0
    for r in rows:
        print(f"{r['chapter']:>3}  {r['title'][:40]:40}  {r['words']:>7}  {r['paras']:>5}")
        total_w += r["words"]
        total_p += r["paras"]
    print("-" * 64)
    print(f"{'':>3}  {'TOTAL (Intro + 42 chapters)':40}  {total_w:>7}  {total_p:>5}")
    print()
    print(f"Appendix paragraphs: {len(appendix_paras)}  (words: {sum(wordcount(p) for p in appendix_paras)})")
    print(f"Footnotes entries:   {len(footnotes_paras)}  (words: {sum(wordcount(p) for p in footnotes_paras)})")

    with open(SUMMARY_OUT, "w", encoding="utf-8") as f:
        json.dump({"chapters": rows,
                   "appendix_paras": len(appendix_paras),
                   "footnotes_paras": len(footnotes_paras),
                   "total_words": total_w,
                   "total_paras": total_p}, f, indent=2, ensure_ascii=False)
    print(f"\nSummary JSON -> {SUMMARY_OUT}")


if __name__ == "__main__":
    main()
