---
description: Run the full 4-stage GCHAR pipeline for one chapter (extract → verify → defend → impact)
---

Process chapter $ARGUMENTS of The Great Controversy through the GCHAR pipeline defined in CLAUDE.md.

Steps (strictly sequential, each via the corresponding subagent with a fresh context):

1. Check `manifest.json` for chapter $ARGUMENTS. Skip stages already marked `done` (idempotent resume). If the chapter file `source/chapters/gc_ch$ARGUMENTS.txt` is missing, stop and report.
2. Stage 1 — invoke the **claim-extractor** subagent. Prompt must include: the chapter file path, the output path `extraction/gc_ch$ARGUMENTS.claims.json`, and a reminder to read CLAUDE.md and the schema first.
3. Validate the output JSON against `schemas/claim.schema.json` (structural check via python3). On failure: re-run stage 1 once; if it fails again, stop and report.
4. Stage 2 — invoke **claim-verifier** (input: extraction file; output: `verification/gc_ch$ARGUMENTS.verified.json`). Validate.
5. Stage 3 — invoke **defender** (input: verification file; output: `adversarial/gc_ch$ARGUMENTS.defended.json`). Validate.
6. Stage 4 — invoke **impact-assessor** (input: adversarial file + chapter path; output: `impact/gc_ch$ARGUMENTS.impact.json`). Validate.
7. After each stage: update `manifest.json` (stage → done, timestamp, claim/verdict counts).
8. Final message to user (in Russian): краткая сводка по главе — сколько утверждений, вердикты, сколько защит успешно, топ-3 несоответствия по impact_score, есть ли load-bearing проблемы.

Delta merging: on long chapters the subagents write compact delta files instead of full arrays (verifier: chapters over ~8k words → `verification/gc_chNN.verified.delta.json`; defender and impact-assessor: chapters with >120 claims → `adversarial/gc_chNN.defenses.delta.json` / `impact/gc_chNN.impact.delta.json`). When a stage returns a delta, merge it yourself:

```
python3 scripts/merge_stage.py <prev_full.json> <delta.json> <out_full.json> \
    --stage verification|adversarial|impact --key verification|defense|impact --notes-from-delta
```

(prev_full = the previous stage's full file, e.g. extraction → verified, verified → defended, defended → impact). ALWAYS run `python3 scripts/validate.py <out_full.json>` after every merge — the merged file, not the delta, is what the schema gate applies to.

Rules: never run two stages of one chapter in parallel; do not modify frozen fields; if any subagent report signals anomalies (zero-claim paragraphs, schema drift, low-confidence pileup), surface them to the user instead of silently continuing.
