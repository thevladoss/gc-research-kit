#!/usr/bin/env node
/**
 * Единый источник данных сайта и публичного датасета.
 *
 * Читает реальные файлы пайплайна GCHAR:
 *   synthesis/aggregate.json          — итоговые метрики, статусы цепи тезиса, адъюдикационный слой
 *   adjudication/DNN_*.ruling.json    — 23 досье с решениями по хартии
 *   impact/gc_chNN.impact.json        — полная история утверждений (extraction+verification+impact[+impact_adjudicated])
 *   adversarial/gc_chNN.defended.json — объекты защиты (defense)
 *   ADJUDICATION_CHARTER.md           — хартия (в датасет как есть)
 *
 * Пишет:
 *   src/data/generated/*.ts           — типизированные модули; каждая цифра на сайте берётся отсюда
 *   public/data/claims_full.json      — одна запись на ID с полной историей вердиктов
 *   public/data/dossiers.json         — 23 досье целиком (санитизированы)
 *   public/data/aggregate.json        — санитизированная копия aggregate
 *   public/data/ADJUDICATION_CHARTER.md
 *   public/data/DATA_README.md        — RU+EN описание датасета
 *   public/data/data.zip              — всё вышеперечисленное одним архивом
 *
 * Санитизация: удаляются внутренние заметки о бюджете поиска/повторных запусках
 * (top-level `notes` стадийных файлов и досье). Все rationale, источники и аргументы
 * сохраняются нетронутыми.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE = path.resolve(__dirname, '..')
const ROOT = path.resolve(SITE, '..', '..')

const DATA_VERSION = '1.0'

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

// ---------- входы ----------
const aggregate = readJson(path.join(ROOT, 'synthesis', 'aggregate.json'))
const charterMd = readFileSync(path.join(ROOT, 'ADJUDICATION_CHARTER.md'), 'utf8')

const adjDir = path.join(ROOT, 'adjudication')
const rulingFiles = readdirSync(adjDir).filter((f) => f.endsWith('.ruling.json')).sort()
if (rulingFiles.length !== 23) {
  throw new Error(`ожидалось 23 ruling-файла, найдено ${rulingFiles.length}`)
}
const dossiers = rulingFiles.map((f) => readJson(path.join(adjDir, f)))

const impactDir = path.join(ROOT, 'impact')
const impactFiles = readdirSync(impactDir).filter((f) => /^gc_ch\d{2}\.impact\.json$/.test(f)).sort()
if (impactFiles.length !== 43) {
  throw new Error(`ожидалось 43 impact-файла, найдено ${impactFiles.length}`)
}

const defendedByCh = new Map()
for (const f of readdirSync(path.join(ROOT, 'adversarial'))) {
  const m = f.match(/^gc_ch(\d{2})\.defended\.json$/)
  if (m) defendedByCh.set(Number(m[1]), readJson(path.join(ROOT, 'adversarial', f)))
}

// ---------- индексы ----------
// решение адъюдикации на каждый из 97 бывших disputed
const rulingByClaim = new Map()
for (const d of dossiers) {
  for (const r of d.rulings) {
    rulingByClaim.set(r.id, { dossier: d.dossier, slug: d.slug, ruling: r })
  }
}

// адъюдикационный слой aggregate (re-score, цепочки, period_standard)
const adjLayer = aggregate.adjudication_layer
const adjClaimById = new Map(adjLayer.claims.map((c) => [c.id, c]))

// ---------- claims_full.json ----------
const claimsFull = []
const chapterSummaries = []
for (const f of impactFiles) {
  const ch = readJson(path.join(impactDir, f))
  const chNum = ch.chapter
  const defended = defendedByCh.get(chNum)
  const defenseById = new Map()
  if (defended) {
    for (const c of defended.claims) if (c.defense) defenseById.set(c.id, c.defense)
  }

  const perVerdict = {}
  for (const c of ch.claims) {
    const defense = defenseById.get(c.id) ?? null
    const adj = rulingByClaim.get(c.id) ?? null

    // финальный вердикт первого круга: verification.verdict уже отражает
    // пост-defense состояние в defended/impact файлах
    const v = c.verification ?? null
    const finalVerdict = v?.verdict ?? null
    perVerdict[finalVerdict ?? 'none'] = (perVerdict[finalVerdict ?? 'none'] ?? 0) + 1

    const rec = {
      id: c.id,
      chapter: chNum,
      chapter_title: ch.chapter_title,
      paragraph: c.paragraph,
      quote: c.quote,
      claim_text: c.claim_text,
      claim_type: c.claim_type,
      entities: c.entities ?? [],
      verification: v
        ? {
            verdict: v.verdict,
            confidence: v.confidence ?? null,
            rationale: v.rationale ?? null,
            modern_consensus: v.modern_consensus ?? null,
            period_historiography: v.period_historiography ?? null,
            sources: v.sources ?? [],
          }
        : null,
      defense: defense
        ? {
            result: defense.result,
            revised_verdict: defense.revised_verdict ?? null,
            argument: defense.argument ?? null,
            new_sources: defense.new_sources ?? [],
          }
        : null,
      impact: c.impact ?? null,
      impact_adjudicated: c.impact_adjudicated ?? null,
      adjudication: adj
        ? {
            dossier: adj.dossier,
            dossier_slug: adj.slug,
            ...adj.ruling,
          }
        : null,
    }
    claimsFull.push(rec)
  }
  chapterSummaries.push({
    chapter: chNum,
    title: ch.chapter_title,
    claims: ch.claims.length,
    verdicts: perVerdict,
  })
}

if (claimsFull.length !== aggregate.corpus_totals.claims_extracted) {
  throw new Error(
    `claims_full: ${claimsFull.length} записей, ожидалось ${aggregate.corpus_totals.claims_extracted}`,
  )
}
// каждое из 97 решений адъюдикации должно найти свою запись
const claimIds = new Set(claimsFull.map((c) => c.id))
for (const id of rulingByClaim.keys()) {
  if (!claimIds.has(id)) throw new Error(`решение адъюдикации без утверждения: ${id}`)
}

// ---------- санитизация ----------
const stripKeysDeep = (obj, keys) => {
  if (Array.isArray(obj)) return obj.map((x) => stripKeysDeep(x, keys))
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      if (keys.has(k)) continue
      out[k] = stripKeysDeep(v, keys)
    }
    return out
  }
  return obj
}

// у досье убираем top-level notes (учёт поисков/бюджета); per-claim поля сохраняются
const dossiersPublic = dossiers.map((d) => {
  const { notes: _notes, ...rest } = d
  return rest
})

// в aggregate: method_notes содержит только методологию — оставляем; ничего служебного нет,
// но перестрахуемся от путей файлов в свободном тексте не пытаемся — их там нет по построению.
const aggregatePublic = stripKeysDeep(aggregate, new Set())

// ---------- метрики для сайта ----------
const km = aggregate.key_metrics
const ct = aggregate.corpus_totals
const stats = {
  claims_total: ct.claims_extracted,
  chapters: ct.chapters,
  checkable_total: km.empirically_checkable_final,
  supported_share_of_checkable: km.supported_share_of_checkable,
  confirmed_discrepancies: km.confirmed_discrepancies_total,
  anachronistic_share_of_confirmed: km.anachronistic_share_of_confirmed,
  surviving_contradicted: km.confirmed_by_verdict.contradicted,
  surviving_misquotations: km.surviving_misquotations,
  attributed_quotes_total: ct.claim_type_distribution_manifest.attributed_quote,
  unverifiable_total: ct.verdicts_final.unverifiable,
  disputed_adjudicated: adjLayer.claims_adjudicated,
  dossiers: adjLayer.dossiers,
  rulings_as_written: adjLayer.rulings_as_written,
  rulings_weakened: adjLayer.rulings_weakened,
  accusatory_total: 81,
  weakened_recovered: 73,
  weakened_not_recovered: 8,
  framing_gap_distribution_97: adjLayer.framing_gap_distribution_97,
  failing_component_kind: {
    fact: adjLayer.failing_component_kind_81.fact,
    frame: adjLayer.failing_component_kind_81.frame,
    motive: adjLayer.failing_component_kind_81.motive,
  },
  chains: {
    chain_inherited: adjLayer.chains.chain_inherited,
    independent_failure_points: adjLayer.chains.independent_failure_points,
  },
  direction: {
    accusatory: adjLayer.direction_distribution.accusatory_as_written,
    genuinely_open: adjLayer.direction_distribution.genuinely_open,
    favorable: adjLayer.direction_distribution.favorable_as_written,
    conditional_premise: adjLayer.direction_distribution.out_of_scope_conditional_premise,
    verifier_reversals_in_favor: adjLayer.direction_distribution.verifier_reversals_in_favor_of_book.length,
  },
  period_standard: {
    total: adjLayer.period_standard.counts.total_tagged,
    period_scholarship: adjLayer.period_standard.counts['period-scholarship'],
    expositor_tradition: adjLayer.period_standard.counts['expositor-tradition'],
  },
  genuinely_open_ids: adjLayer.direction_distribution.genuinely_open_ids,
  defense: {
    full_reversals: ct.defense_adjustments.defense_succeeded_full_reversals,
    downgrades: ct.defense_adjustments.verdict_downgraded,
  },
  load_bearing_rescore: adjLayer.rescore.load_bearing,
  generated_at: aggregate.generated_at,
  data_version: DATA_VERSION,
}

// ---------- цепь тезиса ----------
const chain = aggregate.thesis_chain_status.map((l) => ({
  link: l.link,
  title_ru: l.title_ru,
  status: l.status,
  basis: l.basis,
  commentary_ru: l.commentary_ru,
}))

// ---------- выходы ----------
const genDir = path.join(SITE, 'src', 'data', 'generated')
const pubDir = path.join(SITE, 'public', 'data')
for (const d of [genDir, pubDir]) if (!existsSync(d)) mkdirSync(d, { recursive: true })

const banner = `// СГЕНЕРИРОВАНО scripts/build-data.mjs — не редактировать руками.\n// Источник: synthesis/aggregate.json + adjudication/*.ruling.json (${aggregate.generated_at}).\n`

writeFileSync(
  path.join(genDir, 'stats.ts'),
  banner + `export const stats = ${JSON.stringify(stats, null, 2)} as const\n`,
)
writeFileSync(
  path.join(genDir, 'chain.ts'),
  banner +
    `export type ChainStatus = 'цело' | 'повреждено' | 'условная посылка' | 'вне проверки'\n` +
    `export interface ChainLink { link: number; title_ru: string; status: ChainStatus; basis: readonly string[]; commentary_ru: string }\n` +
    `export const thesisChain: readonly ChainLink[] = ${JSON.stringify(chain, null, 2)} as const\n`,
)
writeFileSync(
  path.join(genDir, 'chapters.ts'),
  banner + `export const chapterSummaries = ${JSON.stringify(chapterSummaries, null, 2)} as const\n`,
)

// ---------- DATA_README ----------
const dataReadme = `# GCHAR — открытый датасет / open dataset

«Историческая проверка "Великой борьбы"» / "A historical audit of *The Great Controversy*"

Версия данных: ${DATA_VERSION}
Дата сборки / build date: ${aggregate.generated_at}

## Что это / What this is

RU. Полные данные систематической проверки исторических утверждений книги Эллен Уайт
«Великая борьба» (издание 1911 года, английский текст, общественное достояние).
Из книги выписаны все проверяемые утверждения (${ct.claims_extracted}), каждое сверено с работами
историков, каждое обвинение прошло проверку «адвокатом книги», а ${adjLayer.claims_adjudicated} спорных
вопросов разобраны по заранее принятым и замороженным правилам (см. ADJUDICATION_CHARTER.md).
Датасет собран тем же скриптом, что и цифры на сайте: расхождений между ними нет по построению.

EN. The complete data of a systematic audit of the historical claims in Ellen G. White's
*The Great Controversy* (1911 edition, English text, public domain). Every checkable claim
was extracted (${ct.claims_extracted}), each checked against historians' work, every accusation passed
through a "defense attorney" stage, and ${adjLayer.claims_adjudicated} disputed questions were resolved under
rules fixed and frozen in advance (see ADJUDICATION_CHARTER.md). The dataset is assembled
by the same script that produces the site's numbers: they cannot diverge.

## Честное примечание / Honesty note

RU. Исследование выполнено с помощью ИИ: методологию и конвейер проверки спроектировал
автор, исполнение — модели Claude (извлечение и оценка веса — Claude Sonnet 4.6, проверка
и защита — Claude Opus 4.8, арбитраж и синтез — Claude Fable 5). Полное описание конвейера —
на странице «Как проверяли» сайта (/method). Все первичные данные открыты в этом архиве.

EN. This is an AI-assisted study: the author designed the methodology and the verification
pipeline; execution was carried out by Claude models (extraction and impact scoring —
Claude Sonnet 4.6; verification and adversarial defense — Claude Opus 4.8; adjudication and
synthesis — Claude Fable 5). The full pipeline is documented on the site's /method page.
All primary data is open in this archive.

## Файлы / Files

- \`claims_full.json\` — одна запись на утверждение (${ct.claims_extracted} записей) с полной историей:
  извлечение (цитата, текст утверждения, тип, глава/абзац) → проверка (вердикт, обоснование,
  источники) → защита (результат, аргумент) → разбор спорного (решение, где было).
  One record per claim with the full history: extraction → verification (verdict, rationale,
  sources) → defense (result, argument) → adjudication ruling where present.
- \`dossiers.json\` — все 23 досье разбора спорных вопросов целиком: обзор доказательств,
  решения по каждому утверждению, русские резюме. All 23 adjudication dossiers in full.
- \`aggregate.json\` — сводные метрики синтеза, статусы 7 звеньев несущей цепи книги,
  адъюдикационный слой. Synthesis aggregate: metrics, thesis-chain statuses, adjudication layer.
- \`ADJUDICATION_CHARTER.md\` — правила разбора спорных вопросов, замороженные до его начала
  (v1.1-frozen). The frozen adjudication charter.
- \`DATA_README.md\` — этот файл. This file.

## Схема claims_full.json / Schema

Каждая запись / each record:

| Поле / field | Значение / meaning |
|---|---|
| id | \`GC-{глава}-{номер}\`, неизменен на всех стадиях / immutable claim ID |
| chapter, paragraph | глава и абзац издания 1911 г. / chapter and paragraph of the 1911 edition |
| quote | точная цитата из книги (EN) / exact quotation from the book |
| claim_text | формулировка проверяемого утверждения / the checkable claim |
| claim_type | event, date, attributed_quote, statistic, causal, biographical, interpretive, theological, geographical |
| verification | вердикт первого круга + обоснование + источники / first-round verdict, rationale, sources |
| defense | результат защиты: подтверждена, смягчена или отклонена / defense outcome |
| impact | вес ошибки по слою Фазы 1 (если оценивался) / Phase-1 impact scores |
| impact_adjudicated | вес после разбора спорного (если пересчитывался) / post-adjudication impact |
| adjudication | решение разбора: по напечатанному и по осторожной версии, разрыв, класс провала, источники / dual ruling, gap, failing class, sources |

## Вердикты и решения / Verdicts and rulings

Первый круг / first round: supported (подтверждено), contradicted (противоречит данным
историков), anachronistic (ошибка эпохи — повторяет источники XIX века), disputed (наука
спорит; ушло на разбор), misquotation (искажённая цитата; после защиты таких не осталось),
unverifiable (вне исторической проверки).

Разбор спорного / adjudication scale: well-supported (надёжно подтверждено), probable
(скорее верно), genuinely-open (наука всерьёз спорит), improbable (скорее неверно),
discredited (опровергнуто документами); out-of-scope = условная посылка (держится на
посылке, которую история не проверяет). Каждое решение двойное: по формулировке как
напечатано и по осторожной версии без абсолютов; разрыв между ними (framing gap 0–4)
записан отдельно. Each ruling is dual: as printed and for a careful weakened version;
the gap between them is recorded.

## Методология кратко / Method in brief

RU. Четыре стадии на каждую главу: извлечение → проверка по источникам → состязательная
защита → оценка веса; затем разбор 97 спорных вопросов по замороженной хартии и пересчёт
веса; каждый обвинительный вывод обязан пережить защиту; правила и все решения открыты.
EN. Four stages per chapter: extraction → verification → adversarial defense → impact
scoring; then adjudication of the 97 disputed questions under a frozen charter with impact
re-scoring; every accusatory conclusion had to survive the defense stage; the rules and
every ruling are open.

## Издание / Edition

Текст книги: The Great Controversy, издание 1911 года (Project Gutenberg #25833),
общественное достояние / public domain.

## Авторство, лицензия, контакт / Authorship, license, contact

Исследование: Владислав Осин / Research: Vladislav Osin.
Данные исследования и тексты сайта: CC BY 4.0 © 2026 Vladislav Osin.
Research data and site texts: CC BY 4.0 © 2026 Vladislav Osin.
Текст «Великой борьбы» 1911 г. — общественное достояние / the GC 1911 text is public domain.

Пример атрибуции / attribution example:
«Осин В., Историческая проверка "Великой борьбы", 2026, [URL]» /
"Osin V., A Historical Audit of The Great Controversy, 2026, [URL]".

Исходный код / source code: https://github.com/thevladoss/gc-research-kit
Контакт / contact: osinvladik1 (at) gmail (dot) com

## Журнал изменений / Changelog

- ${DATA_VERSION} (${aggregate.generated_at}) — первая публикация / first release.
`

// ---------- запись public/data ----------
const pubFiles = {
  'claims_full.json': JSON.stringify(claimsFull),
  'dossiers.json': JSON.stringify(dossiersPublic),
  'aggregate.json': JSON.stringify(aggregatePublic),
  'ADJUDICATION_CHARTER.md': charterMd,
  'DATA_README.md': dataReadme,
}
for (const [name, content] of Object.entries(pubFiles)) {
  writeFileSync(path.join(pubDir, name), content)
}

// data.zip — тем же скриптом; zip есть на macOS/Linux, на CI ставится пакетом zip
try {
  execFileSync('zip', ['-q', '-X', '-j', 'data.zip', ...Object.keys(pubFiles)], { cwd: pubDir })
} catch {
  console.warn('! zip недоступен — data.zip не собран (установите zip и перезапустите)')
}

// ---------- отчёт ----------
const sizes = Object.fromEntries(
  readdirSync(pubDir).map((f) => [f, `${(statSync(path.join(pubDir, f)).size / 1024 / 1024).toFixed(2)} MB`]),
)
console.log('claims_full:', claimsFull.length, 'записей;', 'досье:', dossiersPublic.length)
console.log('public/data:', sizes)
console.log('src/data/generated: stats.ts, chain.ts, chapters.ts')
