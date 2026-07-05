# ADJUDICATION CHARTER — GCHAR Phase 2

**Version:** 1.1-frozen (1.0-frozen + four post-calibration amendments approved by the user 2026-07-05; see §12)
**Status:** Frozen. Amendments only via §12. The D01 calibration gate (§10.5) is passed: D01 approved by the user 2026-07-05, batch processing of D02–D23 unlocked. D01's ruling file stands as issued under 1.0-frozen (grandfathered; none of the 1.1 amendments invalidates it).
**Scope of application:** the 97 claims carrying final (defense-adjusted) verdict `disputed`, enumerated and grouped in `ADJUDICATION_DOSSIERS.md`. That enumeration is frozen together with this charter.

---

## 0. Purpose and standing

The pipeline's `disputed` verdict was designed as a stopping rule: "qualified disagreement exists; do not guess." It deliberately collapsed very different situations — a genuine 50/50 scholarly standoff, a clear-preponderance case with a live but weak minority, and a claim the verifier could not finish researching within budget. Phase 2 adjudication re-opens only these 97 claims and replaces the single `disputed` label with a graded ruling.

Standing rules:

1. Adjudication **adds a layer; it never rewrites history.** Original verification and defense files are immutable. Rulings are written to new files under `adjudication/` (naming in §11).
2. Prior pipeline rationales (verifier, defender) are available to the adjudicator **as positions and as source leads, never as authority.** Every ruling must stand on its own evidence base (§10).
3. All epistemic rules of `CLAUDE.md` remain in force, including the untrusted-content rule, the 2-independent-source floor for accusatory outcomes, and the academic-source escalation on doctrinally central topics.
4. The unit of research is the **dossier** (a group of claims sharing one evidence pool); the unit of ruling is the **claim** (and its components, §3).

---

## 1. Ruling scale

Five ordered values replace the binary true/false frame. Numeric codes are fixed for gap arithmetic (§2): `discredited` = 1, `improbable` = 2, `genuinely-open` = 3, `probable` = 4, `well-supported` = 5.

| Ruling | Operational definition |
|---|---|
| **well-supported** | Clear preponderance of independent academic evidence for the claim. Counter-positions are absent, marginal, or fail on evidential quality. A documented counterexample to the claim's quantifier (§6) does not exist. |
| **probable** | Balance of independent academic evidence favors the claim. Live counter-positions exist but are weaker on evidential quality or narrower in scope; no documented counterexample defeats the claim as written. |
| **genuinely-open** | Qualified scholars disagree on the basis of **comparable evidential quality**, and the disagreement does not reduce to confessional alignment on either side. Current evidence underdetermines the answer. This ruling requires positive documentation of the disagreement (named positions on both sides with their evidence); it is never a default. |
| **improbable** | Clear preponderance of independent academic evidence against the claim. Named counter-positions (defenses of the claim) exist and were engaged, but fail on evidential quality — dating, provenance, circularity, superseded data — **not on the confession of their authors**. No single decisive refutation exists, or a weakened version survives (§2). |
| **discredited** | The claim as written is defeated by documented counterexamples or decisive primary evidence read in scholarly context. No methodologically sound published defense survives engagement (§5). |

Ancillary requirements:

- Every ruling carries a `confidence` tag (`high`/`medium`/`low`) reflecting the depth and convergence of the evidence actually examined, not the adjudicator's prior.
- **No forced rulings.** If the dossier's research budget (§10) is exhausted before the evidence supports any ruling, the claim is returned to the queue with a `gap_note` describing what is missing. Insufficient research must never masquerade as `genuinely-open`.

---

## 2. Dual ruling rule

Every claim receives **two rulings**:

1. **As written (`ruling_as_written`).** The claim with its actual absolutes, framing, and rhetorical force as printed in GC 1911 ("all Christians", "not one", "solely by the study of the Scriptures", "stands without impeachment").
2. **Strongest defensible weakened version (`ruling_weakened`).** The adjudicator first states, in one or two sentences, the strongest version of the claim that the evidence could plausibly sustain (the steelman rewrite), then rules on it. The rewrite must stay recognizably the same claim — same subject, same direction of assertion — with quantifiers, dating precision, or motive attributions relaxed. A rewrite that changes the subject is not a weakened version; in that case `ruling_weakened` is marked `n/a`.

The divergence `framing_gap = code(ruling_weakened) − code(ruling_as_written)` is recorded per claim. **The gap is itself a finding:** a corpus where as-written rulings are low but weakened rulings are high indicts the book's rhetoric, not its facts, and the synthesis stage must report the framing-gap distribution as a first-class result.

---

## 3. Decomposition rule

Bundled claims are split before ruling. A bundle is any claim that welds together components of different kinds:

- **fact** — an event, date, quantity, or attribution that evidence can reach;
- **frame** — an interpretive characterization ("corrupting process", "in effect became the conqueror");
- **motive** — an attribution of intent to historical actors ("in order to promote nominal acceptance", "perceiving that a shared festival would advance the church's power");
- **hermeneutic** — a prophetic-interpretive premise (year-day principle, identification of a prophetic symbol), which is out of scope (§9).

Each component receives its own component-level ruling. The claim-level `ruling_as_written` for a conjunction is the **minimum** (weakest link) across its in-scope components, because the sentence as printed asserts the conjunction. The kind of the weakest in-scope component that set this minimum is recorded per claim as `failing_component_kind` (`fact` / `frame` / `motive`); downstream reporting segments accusatory results by this field (§11). When several in-scope components of different kinds tie at the claim-level minimum, `failing_component_kind` takes the fixed priority **fact > frame > motive**, and the tied kinds are additionally recorded in an optional per-claim array `tied_kinds` (amendment 2026-07-05).

Motive components require direct documentary evidence of intent (letters, decrees, minutes, contemporary testimony); scholarly inference about likely motives supports at most `probable`. Absence of any documentary basis caps the motive component at `improbable` **only when the competing mainstream account of the motive itself has documentary support**. Where the competing account is likewise scholarly inference without documents, the motive component caps at `genuinely-open` instead — the burden rule must not apply to the book's motive claims while exempting rival motive claims (consistent with §5.3).

Where a component is hermeneutic, it is marked `in_scope: false` and excluded from the minimum; the ruling then explicitly states its conditionality (e.g., "conditional on the year-day premise, which this adjudication does not evaluate").

---

## 4. Source-weight hierarchy

Ordered principles for weighing evidence:

1. **Independence and peer validation first.** Peer-reviewed academic scholarship and university-press monographs, plus standard scholarly reference works (Oxford/Cambridge handbooks and dictionaries), outweigh confessional scholarship **of any confession** — Adventist, Catholic, and mainstream-Protestant alike. Bacchiocchi and his critics are both *positions* unless and until a specific work has independent peer validation (e.g., a university-press imprint or peer-reviewed venue), in which case it is weighed as academic while its confessional location is still noted.
2. **Primary sources in scholarly context outweigh proof-texted excerpts.** A primary text counts through a critical edition or scholarly discussion that establishes date, provenance, genre, and bias (Josephus's pro-Flavian slant, Eusebius's apologetic aims). An isolated quotation lifted into a polemic — from either direction — carries no independent weight.
3. **Recency matters where the field has moved.** Where the state of the question demonstrably changed (persecution scale after Ste. Croix/Moss; Waldensian origins after Gieseler through Cameron/Audisio/Biller; purgatory after Le Goff), older scholarship is weighed as superseded unless a current specialist still defends it. Where the field has not moved, age alone does not discount a source.
4. **Independence is genealogical, not numerical.** Two sources descending from the same upstream authority (two encyclopedias both digesting Andrews, two polemics both citing the same 19th-century compendium) count as one. The 2-source floor means two genealogically independent sources.
5. **Apologetic and counter-apologetic websites** remain what CLAUDE.md made them: citable as positions, never as arbiters.
6. **Academic floor.** On dossiers flagged `academic_floor: yes` in `ADJUDICATION_DOSSIERS.md` (Sabbath/Sunday origins, early liturgy, papal authority, Inquisition tolls, vernacular Bible access, Millerite history, 1844), no ruling other than `genuinely-open` may rest on encyclopedic sources alone; at least one genuinely academic source per dossier cluster is mandatory. Every ruling carries a `source_quality` tag: `academic-full` / `academic-partial` / `encyclopedic-only`.

---

## 5. Consensus calibration

"Mainstream consensus against" is strong evidence but not a verdict machine. Requirements:

1. Any ruling of `improbable` or `discredited` — and symmetrically any `well-supported` where a published minority denies the claim — must contain a **minority-engagement paragraph**: name the strongest opposing position and its author, summarize its *actual* argument (not a caricature), and state specifically why it fails on evidence (dating, provenance, circularity, superseded data, unrepresentative sampling) **or** concede that it keeps the question open, in which case the ruling is `genuinely-open` or `probable`.
2. Consensus itself must be evidenced, not asserted: cite the works that carry it, or a state-of-the-question survey. "Everyone knows" is not a citation.
3. The confessional identity of a position's author is never, by itself, grounds for dismissal — in either direction. An Adventist chronologist and a Catholic liturgist get the same treatment: their arguments are weighed, their institutional location is noted (§4.1).
4. Head-counting is not weighing. A large majority repeating an unexamined tradition can be outweighed by a small number of specialists who have actually examined the primary evidence; the ruling must say which situation obtains.

---

## 6. Burden rule

The claim as written carries the burden of proof **in proportion to its absoluteness**.

1. Each claim undergoes a **quantifier audit**: universal and exclusive terms are extracted verbatim ("all", "not one", "never", "solely", "in every age", "wherever", "without impeachment", "no progress").
2. An absolute claim requires correspondingly strong evidence: asserting "all X" requires evidence about the population of X, not examples.
3. **Documented counterexamples defeat absolutes.** A single well-provenanced counterexample caps `ruling_as_written` at `improbable`; multiple independent counterexamples, or one decisive and undisputed one, yield `discredited` — even where the weakened version ("most", "many", "typically") is simultaneously ruled `probable` or `well-supported`. The dual-ruling mechanism (§2) exists precisely so that this severity toward rhetoric costs nothing in fairness toward substance.
4. Symmetrically, a *denial* of an absolute claim must engage the claim's own evidence base; the burden rule licenses no shortcuts for the prosecution (§7).

---

## 7. Symmetry guard

Adjudication is a re-examination, not an appeals court for the prosecution.

1. **Rulings move in both directions.** `disputed → probable` and `disputed → well-supported` are legitimate and expected outcomes, exactly as legitimate as `disputed → improbable/discredited`. The adjudicator is explicitly instructed that a batch in which nothing moves toward the claim is as suspicious as one in which nothing moves against it.
2. There are **no quotas in either direction**; the guard is procedural, not distributional. The synthesis stage reports the direction distribution so drift is visible, but no target is set.
3. Favorable rulings obey the same evidence floors as accusatory ones (§4), with one inherited exception in the safe direction: the common-knowledge fast-path of CLAUDE.md rule 1 may support `well-supported` on textbook-level facts, rationale prefixed `[common_knowledge]`, and can never support an accusatory ruling.
4. The defender's Phase-1 arguments for these claims (where a defense pass touched them) must be read and either incorporated or answered — not silently dropped.

---

## 8. Falsifiability line

Every ruling — at claim level, both as-written and weakened — ends with a field `would_change_this`: one or two sentences naming the concrete evidence that would move the ruling, stated realistically (a document class, an archival find, a datable manuscript, a peer-reviewed study of a named kind). Example: "A datable pre-1150 manuscript of the Nobla Leyczon would reopen the antiquity question." A ruling whose author cannot name such evidence is not a ruling; it is a commitment, and it goes back for rework.

---

## 9. Scope boundary

Adjudication covers **only the empirical-historical layer**. The following remain outside, exactly as in Phase 1:

- the cosmic-conflict frame and all supernatural agency;
- the heavenly sanctuary and the investigative judgment;
- the theological status of the Sabbath and of prophetic interpretation as such;
- the **day-year principle** and any prophetic identification (1260 days = years, "little horn", trumpets);
- predictions about the future.

Operationally: these enter rulings only as `hermeneutic` components under §3, marked `in_scope: false`. The adjudicator rules on calendar arithmetic, regnal-year reckoning, documented events, quotations, and historical causation — never on whether a prophecy is true. Where an entire claim is hermeneutic once decomposed, it is returned with `ruling: out-of-scope` and a note; this is expected to be rare, since the 97 were flagged as empirically disputed, but the escape hatch exists so that theology is never smuggled onto the scale.

---

## 10. Procedure and budget

1. **Order of work:** dossiers are processed in the order of `ADJUDICATION_DOSSIERS.md` (load-bearing weight first). Within a dossier: shared evidence review first, then per-claim rulings.
2. **Dossier evidence review:** one document per dossier establishing the state of the question — the key positions, key primary sources, and what has changed since the 19th century. All per-claim rulings in the dossier cite into this review plus any claim-specific evidence.
3. **Research budget:** 6–12 web searches per dossier scaled by claim count and stakes (load-bearing and academic-floor dossiers at the high end), plus up to 2 claim-specific searches for stragglers the shared pool does not cover. Dossiers containing **8 or more load-bearing claims** (at minimum D01) run on an elevated budget of **18–20 searches**, plus the same stragglers allowance; the elevated budget is noted in `ADJUDICATION_DOSSIERS.md`. WebFetch only when a ruling turns on details absent from snippets, with a token limit. Approximate counts recorded in each output file's `notes`.
4. **Exhausted budget** → `gap_note` and back to the queue (§1); never a forced ruling.
5. **Calibration gate:** after the first dossier (D01) is fully adjudicated, STOP and present results to the user for approval before processing further dossiers — mirroring the Phase-1 calibration gate.
6. **Fresh context per dossier:** each dossier is adjudicated by a fresh subagent context to prevent cross-dossier verdict momentum.

---

## 11. Outputs

Per dossier: `adjudication/DNN_<slug>.ruling.json` with two mandatory top-level fields — `evidence_review` (the dossier evidence review, §10.2) and `narrative_ru` (defined below) — and one record per claim:

```json
{
  "id": "GC-18-060",
  "dossier": "D01",
  "quantifier_audit": ["..."],
  "components": [
    {"component": "...", "kind": "fact|frame|motive|hermeneutic", "in_scope": true,
     "ruling": "improbable", "rationale": "..."}
  ],
  "ruling_as_written": "improbable",
  "failing_component_kind": "fact|frame|motive",
  "tied_kinds": ["fact", "frame"],
  "weakened_version": "one-sentence steelman rewrite",
  "ruling_weakened": "genuinely-open",
  "framing_gap": 1,
  "confidence": "medium",
  "minority_engagement": "required for improbable/discredited/contested well-supported",
  "source_quality": "academic-full",
  "sources": [{"ref": "...", "tier": "...", "independence_note": "..."}],
  "would_change_this": "...",
  "gap_note": null,
  "notes": "..."
}
```

**`narrative_ru`** (mandatory, top-level): 3–6 sentences in Russian for a lay reader — the dossier's question, how the claims fared as written and in their weakened versions, and what evidence would change the picture. It follows the tone rules of the synthesis documents: no prosecutorial and no apologetic drift. The report site renders it directly. The 3–6 sentence range is a hard limit: the validator fails the file outside it (amendment 2026-07-05; D01, issued earlier at ~8 sentences, is grandfathered).

Schema clarifications (amendment 2026-07-05): the per-claim array key is `rulings`; `tied_kinds` is optional and present only when several component kinds tie at the claim minimum (§3).

Downstream mapping (pre-registered so the report cannot be gerrymandered later):

- `discredited` and `improbable` (as written) → enter the discrepancy analysis; each gets an impact re-score by the impact-assessor before inclusion. The impact re-score, the synthesis stage, and the final report MUST segment these results by `failing_component_kind`: a claim failing on an undocumented motive attribution is a distinct reported class from a claim failing on fact, and the classes are never aggregated into one headline number. The website renders the classes differently.
- `well-supported` and `probable` → leave the disputed bucket; reported as vindicated under adjudication.
- `genuinely-open` → remains the honest residue; reported as such, with the framing-gap distribution alongside.
- `out-of-scope` (fully hermeneutic after decomposition, §9) → reported as a **conditional premise** («условная посылка»), a fourth category: neither vindicated, nor discrepancy, nor open residue. The synthesis and the report present such claims — load-bearing ones included — as resting entirely on hermeneutic premises that historiography does not evaluate (amendment 2026-07-05).
- Synthesis notes (amendment 2026-07-05): where accusatory rulings share a common evidential anchor, the synthesis distinguishes **chain-inherited failures** from **independent evidential failure points** and reports both numbers (for D01: 12 accusatory rulings, 4 independent failure points); the inherited count is never headlined alone. `improbable` rulings whose claim matched the period-standard scholarship of 1844/1911 receive a `period_standard: true` tag in synthesis aggregation, bridging the Phase-1 `anachronistic` vocabulary.
- All Phase-1 files remain untouched; the report reads Phase-2 rulings as the final word on these 97 claims and says so explicitly.

---

## 12. Amendment log

Amendments to this charter require explicit user approval and are logged here with date and rationale. A material rule change invalidates rulings already issued under the old rule for the affected dossiers; those dossiers are re-run. No mid-dossier rule changes.

| Date | Version | Change | Approved by |
|---|---|---|---|
| 2026-07-05 | 0.1-draft | Initial pre-registration draft | — |
| 2026-07-05 | 1.0 | §3+§11: `failing_component_kind` recorded per claim; impact re-score, synthesis, and report segment `improbable`/`discredited` by it — motive-failures never aggregated with fact-failures into one headline number. Rationale: pre-freeze user amendments. | user |
| 2026-07-05 | 1.0 | §3: motive-cap symmetry — undocumented motive attribution caps at `improbable` only when the rival motive account has documentary support; otherwise `genuinely-open` (consistent with §5.3). Rationale: pre-freeze user amendments. | user |
| 2026-07-05 | 1.0 | §10.3: dossiers with ≥8 load-bearing claims (at minimum D01) run 18–20 searches plus the standard stragglers allowance. Rationale: pre-freeze user amendments. | user |
| 2026-07-05 | 1.0 | §11: mandatory top-level `narrative_ru` (3–6 Russian sentences for a lay reader, synthesis-document tone rules) in every ruling file. Rationale: pre-freeze user amendments. | user |
| 2026-07-05 | 1.0-frozen | Charter approved and frozen with the four amendments above | user |
| 2026-07-05 | 1.1-frozen | §11: fourth downstream category — `out-of-scope` rulings reported as «условная посылка / conditional premise», neither vindicated nor discrepancy nor open residue; synthesis and report present them as claims resting entirely on hermeneutic premises historiography does not evaluate. Rationale: post-calibration user decisions; does not invalidate D01. | user |
| 2026-07-05 | 1.1-frozen | §3: tie-break at the claim minimum — `failing_component_kind` takes fixed priority fact > frame > motive; ties additionally recorded in optional `tied_kinds`. D01's recorded choices already conform. Rationale: post-calibration user decisions. | user |
| 2026-07-05 | 1.1-frozen | §11 synthesis notes: chain-inherited failures distinguished from independent evidential failure points, both numbers reported (D01: 12 rulings / 4 independent points), inherited count never headlined alone; period-standard `improbable` claims tagged `period_standard: true` in synthesis aggregation. Rationale: post-calibration user decisions. | user |
| 2026-07-05 | 1.1-frozen | §11 schema: per-claim array key fixed as `rulings`; `narrative_ru` 3–6 sentences becomes a hard validator limit (failure, not warning), D01 grandfathered. Rationale: post-calibration user decisions. | user |
