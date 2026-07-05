---
description: Adjudicate one disputed-claims dossier (D01–D23) under ADJUDICATION_CHARTER.md v1.0-frozen
---

Adjudicate dossier $ARGUMENTS of GCHAR Phase 2a (charter: `ADJUDICATION_CHARTER.md` v1.0-frozen; dossier registry: `ADJUDICATION_DOSSIERS.md`).

Steps (strictly sequential):

1. Normalize $ARGUMENTS to `DNN` (e.g. `D01`). Read `manifest.json` → `adjudication.dossiers["DNN"]`. If the entry is missing → stop and report. If `status` is `done` → stop (idempotent; re-adjudication requires an explicit user request). **Calibration gate (charter §10.5):** if the dossier is not `D01` and `adjudication.calibration_approved` is not `true` → STOP and tell the user D01 must be reviewed and approved first.
2. Invoke the **adjudicator** subagent with a FRESH context (charter §10.6 — one dossier per context, never two). The prompt must include: the dossier id and slug from the manifest, the output path `adjudication/DNN_<slug>.ruling.json`, and the instruction to read `ADJUDICATION_CHARTER.md` in full, then its section of `ADJUDICATION_DOSSIERS.md`, then `CLAUDE.md`, before any research.
3. Validate: `python3 scripts/validate_adjudication.py adjudication/DNN_<slug>.ruling.json`. On failure: re-run the adjudicator ONCE with a fresh context, appending the validator's error list verbatim to the prompt; if it fails again, STOP and report to the user. Never hand-patch a ruling file to pass the gate.
4. Update the `adjudication` section of `manifest.json` for this dossier (python3 inline; do not touch other sections): `status` = `done`, or `partial` if any record carries a `gap_note`; ruling distributions (as-written and weakened), framing-gap counts, `failing_component_kind` breakdown for accusatory rulings, approximate search count, timestamp.
5. Commit the ruling file + `manifest.json`. Commit message in Russian: dossier id, slug, ruling distribution one-liner.
6. Report to the user in Russian: распределение решений «как написано» и по ослабленным версиям, framing gaps, на каких компонентах провалы (fact/frame/motive), число поисков, gap_note-остатки, 2–3 самых значимых решения. If the dossier is `D01`: явно скажи, что это калибровочный прогон — дальнейшие досье не запускаются, пока пользователь не разберёт D01; после его одобрения выставить `adjudication.calibration_approved = true` в `manifest.json` (отдельным коммитом).

Rules:

- One dossier per invocation; batches only when the user explicitly asked for a batch (post-calibration plan: batches of 3–4, see PLAN.md Phase 2a).
- Phase-1 files (`extraction/`, `verification/`, `adversarial/`, `impact/`) are immutable.
- Surface anomalies to the user instead of silently continuing: empty or thin `evidence_review`, a fully one-directional ruling batch (§7), `encyclopedic-only` pileup on an `academic_floor` dossier, budget overrun.
