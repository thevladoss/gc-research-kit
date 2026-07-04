#!/usr/bin/env python3
"""Merge a compact per-stage delta file into the previous stage's full claims
file, producing the next stage's full file. Keeps subagents from re-emitting
the entire claims array (which blows output-token limits on long chapters).

Usage:
    python3 scripts/merge_stage.py <prev_full.json> <delta.json> <out_full.json> \
        --stage adversarial|impact|verification --key defense|impact|verification \
        [--notes-from-delta]

Delta file format:
    {
      "chapter": 4,
      "stage": "adversarial",
      "notes": "... optional top-level notes ...",
      "items": { "GC-04-036": { ...defense object... }, ... }
    }

Rules enforced:
  * every delta id must exist in the previous full file (unknown id = error)
  * frozen fields are taken from the previous file verbatim; the delta can only
    ADD the named key (defense/impact/verification) to a claim
  * output gets "stage" set to --stage; other top-level fields carried over
Exit 0 on success, 1 on any error (nothing written on error).
"""
import json
import sys


def main():
    args = sys.argv[1:]
    prev_path, delta_path, out_path = args[0], args[1], args[2]
    stage = args[args.index("--stage") + 1]
    key = args[args.index("--key") + 1]
    take_notes = "--notes-from-delta" in args

    with open(prev_path, encoding="utf-8") as f:
        full = json.load(f)
    with open(delta_path, encoding="utf-8") as f:
        delta = json.load(f)

    if delta.get("chapter") != full.get("chapter"):
        print(f"ERROR: chapter mismatch: delta {delta.get('chapter')} vs full {full.get('chapter')}")
        sys.exit(1)

    by_id = {c["id"]: c for c in full.get("claims", [])}
    items = delta.get("items") or {}
    unknown = [i for i in items if i not in by_id]
    if unknown:
        print(f"ERROR: delta contains ids not present in {prev_path}: {unknown[:10]}")
        sys.exit(1)

    for cid, obj in items.items():
        if not isinstance(obj, dict):
            print(f"ERROR: delta item {cid} is not an object")
            sys.exit(1)
        by_id[cid][key] = obj

    full["stage"] = stage
    if take_notes and delta.get("notes"):
        full["notes"] = (full.get("notes", "") + "\n\n" + delta["notes"]).strip()

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(full, f, indent=2, ensure_ascii=False)
    print(f"merged {len(items)} {key} object(s) -> {out_path} (stage={stage})")


if __name__ == "__main__":
    main()
