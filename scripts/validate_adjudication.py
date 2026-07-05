#!/usr/bin/env python3
"""Schema gate for GCHAR Phase 2a adjudication ruling files (charter v1.0-frozen, §11).

Usage:
    python3 scripts/validate_adjudication.py adjudication/DNN_<slug>.ruling.json

Checks, in order:
  1. JSON parse; mandatory top-level fields; charter_version == 1.0-frozen;
     "evidence_review" precedes "rulings" in the RAW file (§10.2/§11 write-order rule).
  2. Claim set == the dossier's claim list in ADJUDICATION_DOSSIERS.md, each id exactly once.
  3. Per-record structure: scale values; framing_gap arithmetic (§2); ruling_as_written ==
     weakest in-scope component + failing_component_kind consistency (§3 as amended);
     hermeneutic components out of scope and unruled (§9); gap_note records exempt (§1).
  4. Evidence floors: >=2 sources behind accusatory rulings + minority_engagement (§5);
     academic floor on flagged dossiers (§4.6); symmetric floor on well-supported with the
     [common_knowledge] exemption (§7.3).
  5. narrative_ru present, Russian, 3-6 sentences (§11 amendment; sentence count warns only).

Substantive quality (were the sources actually independent, is the steelman honest) is the
orchestrator's and the user's to judge — this gate is structural.

Exit 0 = PASS (0 errors). Exit 1 = FAIL. Warnings never fail the gate.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOSSIERS_MD = os.path.join(ROOT, "ADJUDICATION_DOSSIERS.md")

CHARTER_VERSION = "1.0-frozen"
SCALE = {"discredited": 1, "improbable": 2, "genuinely-open": 3, "probable": 4, "well-supported": 5}
ACCUSATORY = {"discredited", "improbable"}
KINDS = {"fact", "frame", "motive", "hermeneutic"}
FAILING_KINDS = {"fact", "frame", "motive"}
SOURCE_QUALITY = {"academic-full", "academic-partial", "encyclopedic-only"}
CONFIDENCE = {"high", "medium", "low"}
ID_RE = re.compile(r"^GC-\d{2}-\d{3}$")
CYRILLIC_RE = re.compile(r"[а-яА-ЯёЁ]")


class Report:
    def __init__(self):
        self.errors = []
        self.warnings = []

    def err(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)


def load_registry(dossier_id, rep):
    """Parse ADJUDICATION_DOSSIERS.md for the dossier's slug, claim ids, academic_floor."""
    try:
        with open(DOSSIERS_MD, encoding="utf-8") as f:
            text = f.read()
    except OSError as e:
        rep.err(f"cannot read {DOSSIERS_MD}: {e}")
        return None
    sec = re.search(
        rf"^## {dossier_id} — ([a-z0-9\-]+)\b(.*?)(?=^## |\Z)", text, re.M | re.S
    )
    if not sec:
        rep.err(f"dossier {dossier_id} not found in ADJUDICATION_DOSSIERS.md")
        return None
    slug, body = sec.group(1), sec.group(2)
    ids = re.findall(r"^\| (GC-\d{2}-\d{3}) ", body, re.M)
    if not ids:
        rep.err(f"dossier {dossier_id}: no claim ids parsed from its section")
        return None
    floor = False
    row = re.search(rf"^\| {dossier_id} \|(.+)$", text, re.M)
    if row:
        cells = [c.strip() for c in row.group(1).strip().strip("|").split("|")]
        floor = bool(cells) and cells[-1].lower().startswith("yes")
    else:
        rep.warn(f"dossier {dossier_id}: summary-table row not found; academic_floor assumed False")
    return {"slug": slug, "ids": ids, "academic_floor": floor}


def check_top_level(data, raw, rep):
    for field in ("dossier", "slug", "stage", "charter_version", "notes",
                  "evidence_review", "narrative_ru", "rulings"):
        if field not in data:
            rep.err(f"top-level field '{field}' missing")
    if data.get("stage") != "adjudication":
        rep.err(f"stage must be 'adjudication', got {data.get('stage')!r}")
    if data.get("charter_version") != CHARTER_VERSION:
        rep.err(f"charter_version must be '{CHARTER_VERSION}', got {data.get('charter_version')!r}")
    if not (data.get("evidence_review") or "").strip():
        rep.err("evidence_review is empty")
    if "search" not in (data.get("notes") or "").lower():
        rep.warn("notes does not record the approximate search count (§10.3)")

    # §11 write-order rule: evidence review before rulings in the raw file
    pos_er, pos_ru = raw.find('"evidence_review"'), raw.find('"rulings"')
    if pos_er >= 0 and pos_ru >= 0 and pos_er > pos_ru:
        rep.err("'evidence_review' must precede 'rulings' in the file (§10.2/§11 ordering)")

    nru = (data.get("narrative_ru") or "").strip()
    if not nru:
        rep.err("narrative_ru is empty (§11 amendment)")
    else:
        if not CYRILLIC_RE.search(nru):
            rep.err("narrative_ru contains no Cyrillic — must be Russian")
        n_sent = len(re.findall(r"[.!?…](?:\s|$|»|\")", nru))
        if not 3 <= n_sent <= 6:
            rep.warn(f"narrative_ru has ~{n_sent} sentences (charter asks 3-6)")


def check_claim_set(data, registry, rep):
    got = [r.get("id") for r in data.get("rulings") or []]
    dup = {i for i in got if got.count(i) > 1}
    for d in sorted(dup):
        rep.err(f"{d}: duplicate ruling record")
    want = set(registry["ids"])
    for m in sorted(want - set(got)):
        rep.err(f"{m}: claim in dossier but missing from rulings")
    for x in sorted(set(got) - want):
        rep.err(f"{x}: ruling for a claim not in this dossier")
    if data.get("slug") != registry["slug"]:
        rep.warn(f"slug {data.get('slug')!r} != registry slug {registry['slug']!r}")


def has_common_knowledge(rec):
    return "[common_knowledge]" in json.dumps(rec, ensure_ascii=False)


def check_record(rec, dossier_id, floor, rep):
    cid = rec.get("id", "<no id>")
    if not ID_RE.match(rec.get("id") or ""):
        rep.err(f"{cid}: id does not match GC-NN-SSS")
    if rec.get("dossier") != dossier_id:
        rep.err(f"{cid}: record dossier {rec.get('dossier')!r} != file dossier {dossier_id!r}")

    raw_ = rec.get("ruling_as_written")
    gap_note = (rec.get("gap_note") or "").strip() if rec.get("gap_note") else ""

    # §1: gap_note record — returned to queue, exempt from ruling checks
    if raw_ is None:
        if not gap_note:
            rep.err(f"{cid}: neither ruling_as_written nor a non-empty gap_note (§1)")
        else:
            rep.warn(f"{cid}: gap_note (unruled, returns to queue): {gap_note[:80]}")
        return

    if not isinstance(rec.get("quantifier_audit"), list):
        rep.err(f"{cid}: quantifier_audit must be a list (may be empty) (§6)")

    comps = rec.get("components")
    if not isinstance(comps, list) or not comps:
        rep.err(f"{cid}: components must be a non-empty list (§3)")
        comps = []
    in_scope_codes, kinds_at_min = [], set()
    for i, comp in enumerate(comps):
        kind = comp.get("kind")
        if kind not in KINDS:
            rep.err(f"{cid}: component {i}: kind {kind!r} not in {sorted(KINDS)}")
            continue
        if not isinstance(comp.get("in_scope"), bool):
            rep.err(f"{cid}: component {i}: in_scope must be boolean")
        if kind == "hermeneutic":
            if comp.get("in_scope") is True:
                rep.err(f"{cid}: component {i}: hermeneutic component with in_scope true (§9)")
            if comp.get("ruling") in SCALE:
                rep.err(f"{cid}: component {i}: hermeneutic component carries a scale ruling (§9)")
        elif comp.get("in_scope") is True:
            cr = comp.get("ruling")
            if cr not in SCALE:
                rep.err(f"{cid}: component {i}: in-scope component ruling {cr!r} not on the scale")
            else:
                in_scope_codes.append((SCALE[cr], kind))
            if not (comp.get("rationale") or "").strip():
                rep.err(f"{cid}: component {i}: missing rationale")

    if raw_ == "out-of-scope":
        rep.warn(f"{cid}: fully hermeneutic after decomposition — out-of-scope (§9)")
        return
    if raw_ not in SCALE:
        rep.err(f"{cid}: ruling_as_written {raw_!r} not on the scale")
        return

    # §3 weakest-link + failing_component_kind (amendment 1)
    if in_scope_codes:
        min_code = min(c for c, _ in in_scope_codes)
        kinds_at_min = {k for c, k in in_scope_codes if c == min_code}
        if SCALE[raw_] != min_code:
            rep.err(f"{cid}: ruling_as_written {raw_!r} != weakest in-scope component "
                    f"(code {min_code}) under the minimum rule (§3)")
        fck = rec.get("failing_component_kind")
        if fck not in FAILING_KINDS:
            rep.err(f"{cid}: failing_component_kind {fck!r} not in {sorted(FAILING_KINDS)}")
        elif fck not in kinds_at_min:
            rep.err(f"{cid}: failing_component_kind {fck!r} is not the kind of a weakest "
                    f"in-scope component ({sorted(kinds_at_min)})")
    else:
        rep.err(f"{cid}: ruled as written but no in-scope scale-ruled components (§3)")

    # §2 dual ruling + framing_gap
    weak = rec.get("ruling_weakened")
    if not (rec.get("weakened_version") or "").strip():
        rep.err(f"{cid}: weakened_version missing (§2; use 'n/a' if no same-subject rewrite exists)")
    if weak in SCALE:
        gap = rec.get("framing_gap")
        expect = SCALE[weak] - SCALE[raw_]
        if gap != expect:
            rep.err(f"{cid}: framing_gap {gap!r} != code(weakened)-code(as_written) = {expect} (§2)")
        if expect < 0:
            rep.warn(f"{cid}: weakened version ruled LOWER than as-written — check the rewrite (§2)")
    elif weak in (None, "n/a"):
        if rec.get("framing_gap") is not None:
            rep.warn(f"{cid}: framing_gap set but ruling_weakened is {weak!r}")
    else:
        rep.err(f"{cid}: ruling_weakened {weak!r} neither on the scale nor 'n/a'")

    if rec.get("confidence") not in CONFIDENCE:
        rep.err(f"{cid}: confidence {rec.get('confidence')!r} not in {sorted(CONFIDENCE)}")
    if not (rec.get("would_change_this") or "").strip():
        rep.err(f"{cid}: would_change_this missing (§8)")
    sq = rec.get("source_quality")
    if sq not in SOURCE_QUALITY:
        rep.err(f"{cid}: source_quality {sq!r} not in {sorted(SOURCE_QUALITY)}")

    sources = [s for s in (rec.get("sources") or []) if (s.get("ref") or "").strip()]
    n_src = len(sources)
    for s in sources:
        if not (s.get("independence_note") or "").strip():
            rep.warn(f"{cid}: source {s.get('ref', '')[:50]!r} lacks independence_note (§4.4)")

    rulings_here = {raw_} | ({weak} if weak in SCALE else set())
    if rulings_here & ACCUSATORY:
        if n_src < 2:
            rep.err(f"{cid}: accusatory ruling with {n_src} source(s); >=2 independent required (§4)")
        if not (rec.get("minority_engagement") or "").strip():
            rep.err(f"{cid}: accusatory ruling without minority_engagement (§5)")
    if raw_ == "genuinely-open" and n_src < 2:
        rep.warn(f"{cid}: genuinely-open with {n_src} source(s) — §1 wants both positions documented")
    if raw_ == "well-supported":
        if n_src == 0 and not has_common_knowledge(rec):
            rep.err(f"{cid}: well-supported with 0 sources and no [common_knowledge] marker (§7.3)")
        elif n_src < 2 and not has_common_knowledge(rec):
            rep.warn(f"{cid}: well-supported with {n_src} source(s) (§7.3 symmetric floor)")
        if not (rec.get("minority_engagement") or "").strip():
            rep.warn(f"{cid}: well-supported without minority_engagement — fine only if no "
                     f"published minority denies the claim (§5.1)")
    if raw_ == "probable" and n_src < 1:
        rep.warn(f"{cid}: probable with 0 sources")

    # §4.6 academic floor
    if floor and sq == "encyclopedic-only" and raw_ != "genuinely-open":
        rep.err(f"{cid}: academic_floor dossier — ruling {raw_!r} may not rest on "
                f"encyclopedic-only sources (§4.6)")


def main():
    if len(sys.argv) < 2:
        print("usage: validate_adjudication.py <adjudication/DNN_<slug>.ruling.json>", file=sys.stderr)
        sys.exit(2)
    path = sys.argv[1]
    rep = Report()
    try:
        with open(path, encoding="utf-8") as f:
            raw = f.read()
        data = json.loads(raw)
    except (OSError, json.JSONDecodeError) as e:
        print(f"FAIL: cannot parse {path}: {e}")
        sys.exit(1)

    check_top_level(data, raw, rep)
    dossier_id = data.get("dossier") or ""
    registry = load_registry(dossier_id, rep) if re.match(r"^D\d{2}$", dossier_id) else None
    if registry is None and re.match(r"^D\d{2}$", dossier_id or ""):
        pass  # registry error already reported
    elif registry is None:
        rep.err(f"top-level dossier {dossier_id!r} does not match D<NN>")

    rulings = data.get("rulings") or []
    if registry:
        check_claim_set(data, registry, rep)
    floor = bool(registry and registry["academic_floor"])
    for rec in rulings:
        check_record(rec, dossier_id, floor, rep)

    dist = {}
    for rec in rulings:
        key = rec.get("ruling_as_written") or ("gap_note" if rec.get("gap_note") else "?")
        dist[key] = dist.get(key, 0) + 1
    print(f"File     : {path}")
    print(f"Dossier  : {dossier_id} ({data.get('slug')})  academic_floor={floor}")
    print(f"Rulings  : {len(rulings)}  as-written: {dist}")
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
