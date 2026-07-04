#!/usr/bin/env python3
"""Generate manifest.json (pipeline state) from the split summary.

Usage: python3 scripts/init_manifest.py <split_summary.json> [--force]

Idempotent-safe: without --force it refuses to overwrite an existing manifest
(so it never clobbers accumulated stage progress).
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "manifest.json")
STAGES = ["extract", "verify", "defend", "impact"]
CREATED = "2026-07-04"  # Date.now() unavailable in tooling; stamped from session date


def main():
    if len(sys.argv) < 2:
        print("usage: init_manifest.py <split_summary.json> [--force]", file=sys.stderr)
        sys.exit(2)
    summary_path = sys.argv[1]
    force = "--force" in sys.argv[2:]
    if os.path.exists(MANIFEST) and not force:
        print(f"manifest.json already exists; refusing to overwrite (use --force). "
              f"Nothing changed.")
        sys.exit(0)

    with open(summary_path, encoding="utf-8") as f:
        summary = json.load(f)

    chapters = {}
    for r in summary["chapters"]:
        n = r["chapter"]
        chapters[f"{n:02d}"] = {
            "title": r["title"],
            "words": r["words"],
            "paragraphs": r["paras"],
            "stages": {s: "pending" for s in STAGES},
            "counts": {},
            "updated_at": None,
        }

    manifest = {
        "project": "GCHAR",
        "edition": "1911",
        "created_at": CREATED,
        "source": {
            "acquired": True,
            "frozen": True,
            "full_text": "source/gc_full_1911.txt",
            "provenance": ("Project Gutenberg eBook #25833 - The Great Controversy "
                           "Between Christ and Satan; 'The Conflict of the Ages in the "
                           "Christian Dispensation'; copyright 1888, 1907, 1911 - "
                           "confirmed 1911 revised edition (has Appendix + source refs)"),
            "appendix": "source/gc_appendix_1911.txt",
            "footnotes": "source/gc_footnotes_1911.txt",
            "total_words": summary["total_words"],
            "total_paragraphs": summary["total_paras"],
            "chapter_files": 43,
            "structure": "Introduction (ch00) + 42 chapters + Appendix + Footnotes",
            "appendix_present": True,
            "note": "source/ is READ-ONLY (chmod a-w). Never edit. Chapter files carry "
                    "[par]N prefixes and preserve inline (N) source-reference markers.",
        },
        "scholarship_baselines": {
            "mcadams_huss": {"present": False, "note": "study of GC Reformation chapters (Huss benchmark)"},
            "rea_white_lie": {"present": False, "note": "Walter Rea, The White Lie"},
            "numbers_prophetess": {"present": False, "note": "Ronald Numbers, Prophetess of Health"},
            "revision_1888_1911": {"present": False, "note": "1888<->1911 revision comparison"},
        },
        "calibration": {
            "chapters": [4, 5, 6],
            "rationale": "history-dense chapters; ch06 (Huss) is the McAdams benchmark",
            "approved": False,
            "note": "STOP after 04/05/06 all-4-stages; await user approval before batch.",
        },
        "stages": STAGES,
        "stage_agents": {
            "extract": "claim-extractor", "verify": "claim-verifier",
            "defend": "defender", "impact": "impact-assessor",
        },
        "global_stages": {"synthesis": "pending", "report": "pending"},
        "chapters": chapters,
    }

    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"Wrote {MANIFEST}: 43 chapters, all stages pending.")


if __name__ == "__main__":
    main()
