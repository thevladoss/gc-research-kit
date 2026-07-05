# ADJUDICATION DOSSIERS — GCHAR Phase 2

**Version:** 1.0-frozen (2026-07-05), frozen together with `ADJUDICATION_CHARTER.md` v1.0-frozen.
**Universe:** the 97 claims whose final (defense-adjusted) verdict is `disputed`.

## Method note

The 97 were recomputed directly from the pipeline files: `verification/gc_ch00–42.verified.json` verdicts, overridden by `adversarial/*.defended.json` `revised_verdict` where the defense result was `defense_succeeded` or `verdict_downgraded`. The recomputation yields exactly 97 disputed claims; all 66 entries of `disputed_scored` in `synthesis/aggregate.json` are among them, plus 31 claims that carried `needs_verification`-era disputed verdicts but were never impact-scored (impact stage only scored high-stakes disputes). Of the 31 unscored, one (GC-05-107) is a defense downgrade from `anachronistic`; the rest are original verifier verdicts.

**Load-bearing count: 20**, not 16 — the 20 `disputed` entries with `load_bearing: true` in `aggregate.json` (16 is the load-bearing count of the *millerite arc* alone). Fifteen of the 20 sit in dossier D01.

Grouping principle: one dossier = one shared evidence pool (the same body of scholarship and primary sources decides every claim in it). Ordering: load-bearing count desc, then scored-impact sum desc, then claim count. `Impact` sums cover scored claims only; unscored claims contribute 0. `academic_floor: yes` marks dossiers on the CLAUDE.md doctrinally-central list (charter §4.6). Claims fitting no shared evidence pool are one-claim dossiers flagged **SINGLETON**.

Two deliberate deviations from `aggregate.json` cluster assignments, both for evidence-pool reasons: GC-02-053 moved from `rome_and_the_bible` to D10 (its evidence is early-church scriptural authority, not medieval vernacular-Bible policy); GC-33-034 assigned to D08 only (its subject is the eternal-torment doctrine, though it name-checks the Sabbath).

## Summary table

| # | Dossier | Claims | LB | Impact (scored) | academic_floor |
|---|---|---|---|---|---|
| D01 | chronology-1844 | 16 | 15 | 238 | yes |
| D02 | sabbath-sunday-origins | 8 | 1 | 71 | yes |
| D03 | millerite-independence-and-1840 | 3 | 1 | 36 | yes |
| D04 | french-revolution-rev11 | 3 | 1 | 29 | no |
| D05 | pella-flight-ad70 | 3 | 1 | 13 | no |
| D06 | eden-sabbath **SINGLETON** | 1 | 1 | 10 | yes |
| D07 | rome-and-the-bible | 6 | 0 | 60 | yes |
| D08 | immortality-genealogy | 3 | 0 | 36 | no |
| D09 | luther-narrative-layer | 4 | 0 | 24 | no |
| D10 | constantinian-fall-and-syncretism | 8 | 0 | 22 | yes (early liturgy/practice) |
| D11 | papal-doctrine-continuity | 3 | 0 | 21 | yes (papal authority) |
| D12 | waldensian-albigensian-character | 7 | 0 | 20 | no |
| D13 | biblical-composition-frame | 5 | 0 | 18 | no |
| D14 | medieval-sabbatarian-residue **SINGLETON** | 1 | 0 | 12 | yes |
| D15 | lisbon-1755 | 3 | 0 | 11 | no |
| D16 | titus-and-the-temple | 4 | 0 | 9 | no |
| D17 | early-persecution-scale | 5 | 0 | 8 | no |
| D18 | martyr-tolls-apostate-power **SINGLETON** | 1 | 0 | 4 | yes (Inquisition tolls) |
| D19 | wesley-membership **SINGLETON** | 1 | 0 | 4 | no |
| D20 | st-bartholomew-extension **SINGLETON** | 1 | 0 | 4 | no |
| D21 | massacre-of-innocents **SINGLETON** | 1 | 0 | 2 | no |
| D22 | hus-bohemia-narrative | 9 | 0 | 0 (all unscored) | no |
| D23 | wycliffe-predecessors **SINGLETON** | 1 | 0 | 0 (unscored) | no |
| | **Total** | **97** | **20** | | |

---

## D01 — chronology-1844 (16 claims, 15 LB, impact 238) `academic_floor: yes`

Shared evidence pool: Persian regnal-year reckoning for Artaxerxes I (Parker & Dubberstein vs the fall-to-fall accession defense), Ezra 7 dating; Tiberius's 15th year and the baptism date; crucifixion-year scholarship (AD 30/31/33, astronomical calendar data); Acts chronology around AD 34; Daniel 8:14 scholarship (Antiochus IV mainstream reading). The chain is one arithmetic construction: decomposition (§3) must separate calendar-arithmetic components (in scope) from the year-day hermeneutic (out of scope), and rulings on individual anchors must state their dependence on the 457 anchor.

**Research budget: elevated per charter §10.3 — 18–20 searches plus the standard per-claim stragglers allowance (15 of 16 claims are load-bearing).**

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-18-058 | ✔ | 15 | 70 weeks a subset of the 2300 days, common starting point |
| GC-18-060 | ✔ | 15 | Artaxerxes decree (Ezra 7) issued 457 BC (vs 458 standard) |
| GC-18-062 | ✔ | 15 | three kings' decrees jointly mark the start |
| GC-18-063 | ✔ | 15 | decree effective autumn 457 BC |
| GC-18-065 | ✔ | 15 | Christ baptized autumn AD 27 |
| GC-18-069 | | 8 | AD 27–34: gospel especially to the Jews |
| GC-18-071 | ✔ | 15 | crucifixion AD 31 |
| GC-18-073 | ✔ | 15 | 70 weeks ended AD 34 |
| GC-18-078 | ✔ | 15 | 457 BC – AD 34 "fixed beyond question" |
| GC-18-081 | ✔ | 20 | 2300 days terminate in 1844 |
| GC-22-039 | ✔ | 15 | autumn 457 BC as start of the 2300 days |
| GC-23-008 | ✔ | 15 | 2300 days begin autumn 457 BC (re-asserted) |
| GC-23-009 | ✔ | 15 | 483 years to AD 27 "exactly fulfilled" |
| GC-23-010 | ✔ | 15 | crucifixion spring AD 31 |
| GC-23-012 | ✔ | 15 | AD 34: turn to the Gentiles |
| GC-26-069 | ✔ | 15 | 1844 computation "stands without impeachment" |

## D02 — sabbath-sunday-origins (8 claims, 1 LB, impact 71) `academic_floor: yes`

Shared evidence pool: day-of-worship practice in the first four centuries (Rordorf, Carson ed. *From Sabbath to Lord's Day*, Bacchiocchi as peer-located minority; Ignatius, Justin, Socrates/Sozomen on eastern Sabbath practice), Constantine's 321 law and episcopal politics, Laodicea canon 29, and the medieval "papacy changed the Sabbath" polemic. One pool because every claim turns on the same question: when, where, and by whose agency Sunday displaced (or coexisted with) Sabbath.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-35-057 | ✔ | 15 | Sunday observance originated with Rome |
| GC-26-014 | | 15 | papal power changed the Sabbath, removing the seal from the law |
| GC-26-025 | | 15 | Roman power made the breach in God's law by changing the Sabbath |
| GC-35-103 | | 12 | Protestant Sunday claims equated with papal fabrications |
| GC-03-032 | | 10 | true Sabbath kept by all Christians in the first centuries *(orig. anachronistic)* |
| GC-35-076 | | 4 | forged Sunday letter originated from the papal palace |
| GC-03-039 | | — | bishops urged Constantine to establish Sunday to fuse Christians and pagans (motive component) |
| GC-03-050 | | — | Sunday observance originated in a corrupting process already operating in Paul's day |

## D03 — millerite-independence-and-1840 (3 claims, 1 LB, impact 36) `academic_floor: yes`

Shared evidence pool: Millerite movement historiography (Numbers, Doan, Rowe), documented transmission of adventist ideas (Lacunza via Irving 1827, reprint circulation), and the 1840 Ottoman crisis (Convention of London) against Litch's prediction.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-20-016 | ✔ | 12 | advent belief reached independently, "solely by the study of the Scriptures" |
| GC-18-119 | | 12 | Litch's 391-years calculation to 11 Aug 1840 |
| GC-18-120 | | 12 | Ottoman "fall" on the predicted date |

## D04 — french-revolution-rev11 (3 claims, 1 LB, impact 29)

Shared evidence pool: French revolutionary religious legislation 1793–1795 (the 3 Ventôse law of 21 Feb 1795), Voltaire scholarship (meaning of *écrasez l'infâme*, attribution habits), Louis XV apocrypha.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-15-142 | ✔ | 15 | toleration restored 3.5 years after the 1793 decrees (Rev 11 match) |
| GC-15-069 | | 12 | "Crush the Wretch" meaning Christ |
| GC-15-113 | | 2 | "After me, the deluge" attributed to Louis XV |

## D05 — pella-flight-ad70 (3 claims, 1 LB, impact 13)

Shared evidence pool: the Pella tradition (Eusebius, Epiphanius) and its historicity debate (Brandon 1951 and successors vs defenders), Josephus on the Cestius retreat window.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-01-079 | ✔ | 9 | not one Christian perished in AD 70 |
| GC-01-084 | | 4 | flight to Pella in Perea |
| GC-01-082 | | — | Cestius's retreat gave Christians the opportunity to flee |

## D06 — eden-sabbath (1 claim, 1 LB, impact 10) **SINGLETON** `academic_floor: yes`

Own evidence pool: Genesis 2:1–3 scholarship (creation ordinance vs Priestly-source etiology), history of Sabbath origins. No other disputed claim shares it.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-25-051 | ✔ | 10 | Sabbath instituted in Eden at creation |

## D07 — rome-and-the-bible (6 claims, 0 LB, impact 60) `academic_floor: yes`

Shared evidence pool: medieval and modern Catholic policy on vernacular Scripture (Toulouse 1229, Tridentine rules, the Index, Leo XIII's *Providentissimus Deus*), documented pre-Reformation vernacular Bibles, 19th–20th-century Catholic practice (the present-tense claims). GC-04-005 rides the same conciliar-censorship record.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-15-028 | | 12 | Rome's policy to keep the Bible locked in an unknown tongue |
| GC-21-082 | | 12 | Rome withheld the Bible; Reformation restored it |
| GC-32-017 | | 12 | papal leaders denied people the privilege of Bible study *(orig. anachronistic)* |
| GC-35-017 | | 12 | Catholic laity not allowed access to the Bible (early 20th c.) |
| GC-37-029 | | 12 | Rome withholds the Bible from the common people (present tense, 1911) |
| GC-04-005 | | — | papal councils decreed burning of records of Rome's cruelty |

## D08 — immortality-genealogy (3 claims, 0 LB, impact 36)

Shared evidence pool: patristic anthropology and the pagan-philosophy-to-church transmission question; history of conditionalism scholarship.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-33-034 | | 12 | eternal-torment doctrine received from Rome like the "false sabbath" |
| GC-33-099 | | 12 | natural immortality borrowed by Rome from paganism |
| GC-36-044 | | 12 | natural immortality as "papal error" opening the door to spiritualism |

## D09 — luther-narrative-layer (4 claims, 0 LB, impact 24)

Shared evidence pool: modern Luther and Reformation-radicals biography (Brecht, Roper; Scott and Goertz on Müntzer), source criticism of D'Aubigné's episodes and late Luther recollections. All four were defense-downgraded from `anachronistic`.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-08-088 | | 8 | wording of Luther's final answer at Worms ("Here I stand" layer) |
| GC-07-036 | | 6 | Scala Sancta voice episode (1544 recollection layer) |
| GC-10-066 | | 6 | charge against Luther re Peasants' War "without the slightest foundation" |
| GC-10-054 | | 4 | Müntzer's motives as personal ambition |

## D10 — constantinian-fall-and-syncretism (8 claims, 0 LB, impact 22) `academic_floor: yes (early liturgy/practice components)`

Shared evidence pool: the "paganization of Christianity" thesis in modern scholarship (MacMullen, Peter Brown on the cult of saints, Le Goff on purgatory), post-Constantinian conversion quality, image/relic veneration origins. Heavy in `frame` and `motive` components — decomposition (§3) will do most of the work here.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-02-053 | | 12 | Bible not accepted as standard of faith in this period *(moved from rome_and_the_bible cluster)* |
| GC-02-050 | | 10 | church pure under persecution, corrupted by ease |
| GC-02-038 | | — | pagans adopted parts of Christianity while rejecting essentials |
| GC-02-041 | | — | most Christians lowered standards; union of Christianity and paganism |
| GC-02-042 | | — | converted idolaters redirected worship to images of Jesus, Mary, saints |
| GC-03-009 | | — | paganism, appearing vanquished, became the conqueror |
| GC-03-027 | | — | images/relics introduced as substitute for idols, to ease nominal conversion (motive) |
| GC-03-088 | | — | purgatory a pagan invention used to terrify believers |

## D11 — papal-doctrine-continuity (3 claims, 0 LB, impact 21) `academic_floor: yes (papal authority)`

Shared evidence pool: development of papal authority claims (Gregory VII's *Dictatus Papae*, *Unam Sanctam*, Vatican I), canon-law treatment of heretics ("no faith with heretics" question, Constance and Hus's safe-conduct), continuity vs development in Catholic self-understanding circa 1911.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-35-110 | | 12 | principles of Gregory VII and Innocent III still Rome's principles |
| GC-35-049 | | 9 | "faith ought not to be kept with heretics" as standing Catholic doctrine |
| GC-03-061 | | — | pope taught as sole earthly mediator, standing in the place of God |

## D12 — waldensian-albigensian-character (7 claims, 0 LB, impact 20)

Shared evidence pool: modern Waldensian scholarship (Cameron, Audisio, Biller) on barbe training, missionary practice, and soteriology; Cathar scholarship on Albigensian doctrine; medieval Catholic soteriology as the baseline for the proto-Protestant question. Only the disputed residue — the confirmed-anachronistic antiquity claims of ch. 4/13 are not re-opened.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-04-113 | | 8 | Waldenses planted the seeds of the Reformation *(orig. anachronistic)* |
| GC-04-082 | | 6 | Waldensian soteriology as proto-Protestant *(orig. anachronistic)* |
| GC-15-043 | | 6 | Albigenses as doctrinal brethren of the Waldenses *(orig. anachronistic)* |
| GC-04-069 | | — | Waldensian youth sent to city institutions of learning in France and Italy |
| GC-04-070 | | — | students carried Scripture manuscripts concealed in prepared garments |
| GC-04-071 | | — | student evangelism untraceable by papal authorities |
| GC-04-081 | | — | medieval Rome taught trust in good works for salvation (control-sample claim) |

## D13 — biblical-composition-frame (5 claims, 0 LB, impact 18)

Shared evidence pool: composition history of the biblical books (Mosaic authorship debate, dating of Deuteronomy and Joel, span of biblical composition) and 19th-century chronological framing.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-00-005 | | 4 | no written revelation for the first 2500 years |
| GC-00-007 | | 4 | written word began with Moses |
| GC-00-008 | | 4 | Bible composed over 1600 years, Moses to John |
| GC-17-066 | | 4 | Joel written 2500 years before 1780 |
| GC-01-097 | | 2 | Deuteronomy warning dated 14 centuries before AD 70 *(orig. anachronistic)* |

## D14 — medieval-sabbatarian-residue (1 claim, 0 LB, impact 12) **SINGLETON** `academic_floor: yes`

Own evidence pool: documented medieval sabbatarianism (Ball, *The Seventh-Day Men*), insabbatati etymology, Andrews's "Dark Ages" chapter. Its evidence-mates (GC-04-046, GC-26-032 etc.) are confirmed anachronistic and not re-opened, leaving this hedged "some of whom" formulation alone.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-35-086 | | 12 | persecuted Waldenses, "some of whom" Sabbath observers |

## D15 — lisbon-1755 (3 claims, 0 LB, impact 11)

Shared evidence pool: modern casualty and event studies of the 1755 Lisbon earthquake (seismological and demographic reassessments vs period figures).

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-17-042 | | 4 | 60,000 dead in six minutes |
| GC-17-049 | | 4 | 90,000 total dead |
| GC-17-044 | | 3 | marble quay sank with all people, no bodies surfaced |

## D16 — titus-and-the-temple (4 claims, 0 LB, impact 9)

Shared evidence pool: the Josephus-vs-Tacitus/Sulpicius Severus debate on Titus's intent toward the temple; Milman as White's conduit.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-01-101 | | 9 | Titus horrified, ordered temple spared |
| GC-01-104 | | — | Titus meant to preserve the temple; orders disregarded |
| GC-01-106 | | — | Titus ordered flames extinguished; soldiers ignored him, massacre followed |
| GC-01-108 | | — | Titus entered the temple, struck by splendor, final attempt to halt fire |

## D17 — early-persecution-scale (5 claims, 0 LB, impact 8)

Shared evidence pool: scale and mechanics of pre-Constantinian persecution (de Ste. Croix, Frend, Moss; Trajan's rescript), catacomb function scholarship, late-antique legal proscription of dissent.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-02-008 | | 6 | great numbers of early martyrs |
| GC-02-022 | | 2 | catacombs as refuge *(orig. anachronistic)* |
| GC-02-004 | | — | pagans mobilized to destroy Christianity foreseeing its triumph (motive) |
| GC-02-018 | | — | Christians hunted down wherever they sought refuge |
| GC-02-054 | | — | advocacy of religious freedom labeled heresy and proscribed |

## D18 — martyr-tolls-apostate-power (1 claim, 0 LB, impact 4) **SINGLETON** `academic_floor: yes (Inquisition tolls)`

Own evidence pool: quantitative scholarship on victims of medieval/early-modern religious persecution. Its statistical siblings are either confirmed anachronistic (Jerusalem, St. Bartholomew numbers) or belong to other pools.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-03-099 | | 4 | millions of martyrs under the apostate power *(orig. anachronistic)* |

## D19 — wesley-membership (1 claim, 0 LB, impact 4) **SINGLETON**

Own evidence pool: Methodist membership records and biographical scholarship on Wesley.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-14-156 | | 4 | Wesley's adherents more than half a million at his death |

## D20 — st-bartholomew-extension (1 claim, 0 LB, impact 4) **SINGLETON**

Own evidence pool: St. Bartholomew's Day massacre scholarship (Holt, Diefendorf) on whether a royal order extended the massacre to the provinces.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-15-058 | | 4 | royal order extended the massacre to the provinces |

## D21 — massacre-of-innocents (1 claim, 0 LB, impact 2) **SINGLETON**

Own evidence pool: historicity scholarship on Matthew 2 (Bethlehem massacre).

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-42-032 | | 2 | Massacre of the Innocents as historical event |

## D22 — hus-bohemia-narrative (9 claims, 0 LB, all unscored)

Shared evidence pool: modern Hus scholarship (Fudge, Spinka, Šmahel) on Hus's early life and the Wycliffite transmission to Prague; source criticism of the Wylie/Bonnechose episode layer (the "two English strangers" and the contrasting pictures; Bethlehem Chapel iconography as the genuine motif behind the legend).

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-06-009 | | — | pre-Huss dissenters hunted in forests; blanket burn-decree |
| GC-06-013 | | — | Hus's mother prized education and fear of God for her son |
| GC-06-015 | | — | widowed mother's kneeling blessing near Prague |
| GC-06-027 | | — | two English scholars arrived in Prague to spread Wycliffism |
| GC-06-028 | | — | open attack on papal supremacy, then other means |
| GC-06-029 | | — | the two contrasting pictures displayed publicly |
| GC-06-030 | | — | pictures drew crowds across social classes |
| GC-06-031 | | — | commotion forced the strangers to depart |
| GC-06-032 | | — | pictures moved Hus to study the Bible and Wycliffe |

## D23 — wycliffe-predecessors (1 claim, 0 LB, unscored) **SINGLETON**

Own evidence pool: Wycliffe's intellectual lineage (Grosseteste, FitzRalph, Marsilius, Ockham). Defense-downgraded from `anachronistic`.

| Claim | LB | Impact | Topic |
|---|---|---|---|
| GC-05-107 | | — | Wycliffe had no predecessors from whose work to shape his reform |

---

## Coverage check

16 multi-claim dossiers hold 90 claims (16+8+3+3+3+6+3+4+8+3+7+5+3+4+5+9); 7 singletons (D06, D14, D18, D19, D20, D21, D23) hold 7. Total 97, each claim assigned exactly once. Load-bearing: D01 ×15, D02–D06 ×1 each = 20.
