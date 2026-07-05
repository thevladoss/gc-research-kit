#!/usr/bin/env python3
"""Structural + semantic validator for GCHAR claim files (schema gate).

Usage:
    python3 scripts/validate.py <claims_file.json> [--stage extraction|verification|adversarial|impact]

If --stage is omitted, the stage is taken from the file's own "stage" field.
Runs, in order:
  1. JSON parse
  2. jsonschema validation against schemas/claim.schema.json (if the library is
     installed; it is, per Phase 0 setup) — catches structural drift
  3. GCHAR-specific semantic checks the JSON Schema cannot express:
       * id pattern GC-NN-SSS, chapter number in id == file chapter
       * ids unique and strictly sequential (001, 002, ...)
       * paragraph exists in the chapter's [par-N] range is NOT checked here
         (validator has no chapter text); range sanity only
       * per-stage completeness:
           verification  -> every needs_verification claim has a verification obj;
                            contradicted/disputed/misquotation need >=2 sources;
                            supported needs >=1 source
           adversarial   -> every non-supported claim has a defense obj
           impact        -> every claim whose effective verdict is
                            contradicted/misquotation/anachronistic has an impact
                            obj with impact_score == severity*centrality

Exit code 0 = PASS (errors == 0). Exit code 1 = FAIL. Warnings never fail the gate
but are printed for the orchestrator to eyeball.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_PATH = os.path.join(ROOT, "schemas", "claim.schema.json")

ID_RE = re.compile(r"^GC-(\d{2})-(\d{3})$")
# disputed is deliberately absent: since commit ee626ce the defender skips it
# (CLAUDE.md rule 3), so a missing defense object on disputed is not an error.
DEFENSE_REQUIRED = {"contradicted", "misquotation", "anachronistic"}
CONFIRMED = {"contradicted", "misquotation", "anachronistic"}
MULTI_SOURCE_VERDICTS = {"contradicted", "disputed", "misquotation"}


class Report:
    def __init__(self):
        self.errors = []
        self.warnings = []

    def err(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)


def effective_verdict(claim):
    """Defense-adjusted verdict used by the impact stage."""
    dv = (claim.get("defense") or {}).get("revised_verdict")
    if dv:
        return dv
    return (claim.get("verification") or {}).get("verdict")


def jsonschema_check(data, rep):
    try:
        import jsonschema
    except ImportError:
        rep.warn("jsonschema library not installed - skipped structural schema pass")
        return
    with open(SCHEMA_PATH, encoding="utf-8") as f:
        schema = json.load(f)
    validator = jsonschema.Draft202012Validator(schema)
    for e in sorted(validator.iter_errors(data), key=lambda x: list(x.path)):
        loc = "/".join(str(p) for p in e.path) or "<root>"
        rep.err(f"[schema] {loc}: {e.message}")


def semantic_check(data, stage, rep):
    chapter = data.get("chapter")
    claims = data.get("claims") or []
    if not isinstance(claims, list) or not claims:
        rep.err("claims array is missing or empty")
        return

    seen_ids = set()
    seq_expected = 1
    for idx, c in enumerate(claims):
        cid = c.get("id", f"<index {idx}>")
        m = ID_RE.match(c.get("id", ""))
        if not m:
            rep.err(f"{cid}: id does not match GC-NN-SSS")
        else:
            if chapter is not None and int(m.group(1)) != int(chapter):
                rep.err(f"{cid}: id chapter {m.group(1)} != file chapter {chapter:02d}")
            seq = int(m.group(2))
            if seq != seq_expected:
                rep.warn(f"{cid}: sequence gap/disorder (expected {seq_expected:03d})")
            seq_expected = seq + 1
        if c.get("id") in seen_ids:
            rep.err(f"{cid}: duplicate id")
        seen_ids.add(c.get("id"))

        if not isinstance(c.get("paragraph"), int) or c.get("paragraph", 0) < 0:
            rep.err(f"{cid}: paragraph must be a non-negative integer")
        if not (c.get("quote") or "").strip():
            rep.err(f"{cid}: empty quote")
        if not (c.get("claim_text") or "").strip():
            rep.err(f"{cid}: empty claim_text")

        # ---- stage-specific ----
        if stage in ("verification", "adversarial", "impact"):
            v = c.get("verification")
            if v is None:
                rep.err(f"{cid}: missing verification object (stage {stage})")
            else:
                verdict = v.get("verdict")
                srcs = v.get("sources") or []
                real_srcs = [s for s in srcs if s.get("url")]
                if verdict in MULTI_SOURCE_VERDICTS and len(real_srcs) < 2:
                    rep.err(f"{cid}: verdict '{verdict}' needs >=2 sources, has {len(real_srcs)}")
                if verdict == "supported" and len(real_srcs) < 1 and c.get("needs_verification"):
                    rep.warn(f"{cid}: 'supported' with 0 sources on a needs_verification claim")
                if verdict == "anachronistic" and not (v.get("period_historiography") or "").strip():
                    rep.warn(f"{cid}: 'anachronistic' without period_historiography filled")

        if stage in ("adversarial", "impact"):
            verdict = (c.get("verification") or {}).get("verdict")
            if verdict in DEFENSE_REQUIRED:
                d = c.get("defense")
                if d is None:
                    rep.err(f"{cid}: non-supported verdict '{verdict}' lacks a defense object")
                elif not (d.get("argument") or "").strip():
                    rep.err(f"{cid}: defense object without argument")

        if stage == "impact":
            ev = effective_verdict(c)
            if ev in CONFIRMED:
                im = c.get("impact")
                if im is None:
                    rep.err(f"{cid}: effective verdict '{ev}' but no impact object")
                else:
                    sev, cen = im.get("severity"), im.get("centrality")
                    score = im.get("impact_score")
                    if isinstance(sev, int) and isinstance(cen, int) and score != sev * cen:
                        rep.err(f"{cid}: impact_score {score} != severity*centrality ({sev}*{cen})")

    if stage == "impact":
        confirmed = [c for c in claims if effective_verdict(c) in CONFIRMED]
        scored = [c for c in confirmed if c.get("impact")]
        if confirmed and not scored:
            rep.warn("impact stage: confirmed discrepancies exist but none were scored")


def main():
    args = [a for a in sys.argv[1:]]
    if not args:
        print("usage: validate.py <file.json> [--stage STAGE]", file=sys.stderr)
        sys.exit(2)
    path = args[0]
    stage = None
    if "--stage" in args:
        stage = args[args.index("--stage") + 1]

    rep = Report()
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"FAIL: cannot parse {path}: {e}")
        sys.exit(1)

    if stage is None:
        stage = data.get("stage")
    if stage not in ("extraction", "verification", "adversarial", "impact"):
        rep.err(f"unknown/missing stage: {stage!r}")

    jsonschema_check(data, rep)
    if stage in ("extraction", "verification", "adversarial", "impact"):
        semantic_check(data, stage, rep)

    n_claims = len(data.get("claims") or [])
    print(f"File   : {path}")
    print(f"Stage  : {stage}")
    print(f"Chapter: {data.get('chapter')}  ({data.get('chapter_title')})")
    print(f"Claims : {n_claims}")
    for w in rep.warnings:
        print(f"  WARN  {w}")
    for e in rep.errors:
        print(f"  ERROR {e}")
    print("-" * 50)
    if rep.errors:
        print(f"FAIL: {len(rep.errors)} error(s), {len(rep.warnings)} warning(s)")
        sys.exit(1)
    print(f"PASS: 0 errors, {len(rep.warnings)} warning(s)")
    sys.exit(0)


if __name__ == "__main__":
    main()
