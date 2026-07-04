#!/usr/bin/env python3
"""Update one chapter's stage status (and optional counts) in manifest.json.

Usage:
    python3 scripts/update_manifest.py <chapter> <stage> <status> \
        [--counts '<json>'] [--ts <iso8601>]

    <stage>  = extract | verify | defend | impact
    <status> = pending | running | done
    --counts merges a small dict into chapters[NN].counts (e.g. verdict tallies)
    --ts     timestamp string (Date.now() is unavailable to tooling; pass it in)

Also usable for global stages:
    python3 scripts/update_manifest.py --global synthesis done
    python3 scripts/update_manifest.py --global report done
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "manifest.json")
STAGES = {"extract", "verify", "defend", "impact"}
STATUSES = {"pending", "running", "done"}


def main():
    argv = sys.argv[1:]
    with open(MANIFEST, encoding="utf-8") as f:
        m = json.load(f)

    if argv and argv[0] == "--global":
        _, name, status = argv[0], argv[1], argv[2]
        m["global_stages"][name] = status
        with open(MANIFEST, "w", encoding="utf-8") as f:
            json.dump(m, f, indent=2, ensure_ascii=False)
        print(f"global_stages.{name} = {status}")
        return

    chapter = int(argv[0])
    stage = argv[1]
    status = argv[2]
    counts = None
    ts = None
    if "--counts" in argv:
        counts = json.loads(argv[argv.index("--counts") + 1])
    if "--ts" in argv:
        ts = argv[argv.index("--ts") + 1]

    assert stage in STAGES, f"bad stage {stage}"
    assert status in STATUSES, f"bad status {status}"

    key = f"{chapter:02d}"
    ch = m["chapters"][key]
    ch["stages"][stage] = status
    if counts:
        ch.setdefault("counts", {})
        ch["counts"][stage] = counts
    if ts:
        ch["updated_at"] = ts

    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(m, f, indent=2, ensure_ascii=False)
    print(f"chapter {key}: {stage} -> {status}"
          + (f"  counts={counts}" if counts else ""))


if __name__ == "__main__":
    main()
