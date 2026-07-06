#!/usr/bin/env python3
"""
Карта официального русского перевода цитат «Великой борьбы».

Вход:
  source/gc_ru_official.pdf     — официальный перевод (в git НЕ входит)
  source/chapters/gc_chNN.txt   — английские главы с маркерами [¶N]
  report/site/public/data/claims_full.json — 4443 утверждения с цитатами

Выход:
  report/site/content/ru_quotes.json      — claim_id → {ru, para, sents, flag?}
  report/site/content/ru_passages.json    — RU-тексты абзацев семи отрывков цепи
  <scratch>/ru_quotes_report.json         — лог выравнивания и ручные случаи

Алгоритм: извлечение абзацев из PDF по отступам (колонтитулы/номера/маркеры
страниц EGW вычищаются, переносы склеиваются с охраной дефисных частиц) →
DP-выравнивание абзацев RU↔EN с ходами 1:1/1:2/2:1 по якорям-цифрам и длинам →
внутри абзаца соответствие по индексам предложений (при равном счёте — прямое,
иначе пропорциональное с проверкой цифровых якорей; несходящееся — во флаги).
"""
import json
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parents[3]
SITE = ROOT / 'report' / 'site'
PDF = ROOT / 'source' / 'gc_ru_official.pdf'
SCRATCH = Path(
    '/private/tmp/claude-501/-Users-thevladoss-devs-research-gc-research-kit/'
    'dd2cc2ea-3212-406a-b919-818f9b798930/scratchpad'
)

# абзацы семи отрывков «режима вычитания» (глава → номера ¶ EN)
PASSAGE_PARAS = {1: [34], 4: [8, 9], 7: [16], 18: [29], 23: [3], 26: [3], 36: [11]}

# дефис на переносе сохраняется только для настоящих дефисных слов:
# «кое-…» всегда, прочие — по правой части («по-прежнему», «кто-нибудь», …)
HYPHEN_KEEP_NEXT = {
    'то', 'либо', 'нибудь', 'таки', 'прежнему', 'своему', 'моему', 'нашему',
    'вашему', 'другому', 'разному', 'настоящему', 'видимому', 'новому', 'старому',
    'как', 'какой', 'какая', 'какое', 'какие', 'кто', 'что', 'где', 'когда', 'чему',
}


# ---------- 1. Извлечение RU-абзацев из PDF ----------

def extract_ru_chapters() -> dict[int, list[str]]:
    doc = fitz.open(PDF)
    starts: dict[int, int] = {0: 10}  # «Вступление» = английское Introduction
    for i in range(9, len(doc)):
        m = re.search(r'^\s*Глава\s+(\d+)\.', doc[i].get_text(), re.M)
        if m and i > 17:
            starts.setdefault(int(m.group(1)), i)
    order = sorted(starts.items())
    ranges = {
        ch: (st, order[k + 1][1] if k + 1 < len(order) else len(doc))
        for k, (ch, st) in enumerate(order)
    }

    def chapter(ch: int) -> list[str]:
        st, end = ranges[ch]
        paras: list[str] = []
        cur = ''
        for i in range(st, end):
            lines = []
            for b in doc[i].get_text('dict')['blocks']:
                for l in b.get('lines', []):
                    txt = ''.join(s['text'] for s in l['spans'])
                    size = max(s['size'] for s in l['spans'])
                    lines.append((l['bbox'][1], l['bbox'][0], size, txt))
            lines.sort(key=lambda t: (round(t[0]), t[1]))
            for y0, x0, size, txt in lines:
                t = txt.strip()
                if not t or y0 < 62 or size > 16:
                    continue
                if y0 > 728 and re.fullmatch(r'\d+', t):
                    continue
                if re.fullmatch(r'\[\d+\]|\[[xiv]+\]', t):
                    continue
                t = re.sub(r'\s*\[(?:\d+|[xiv]+)\]\s*', ' ', t).strip()
                if not t:
                    continue
                if x0 > 80:  # отступ первой строки → новый абзац
                    if cur:
                        paras.append(cur)
                    cur = t
                else:
                    if cur.endswith('-'):
                        prev = re.findall(r'([А-Яа-яЁё]+)-$', cur)
                        nxt = re.match(r'([а-яё]+)', t)
                        keep = bool(
                            prev and nxt
                            and (prev[0].lower() == 'кое' or nxt.group(1) in HYPHEN_KEEP_NEXT)
                        )
                        cur = (cur if keep else cur[:-1]) + t
                    else:
                        cur += ' ' + t
        if cur:
            paras.append(cur)
        out = []
        for p in paras:
            p = re.sub(r'\s+', ' ', p).replace(' . . .', '...').replace('. . .', '...').strip()
            p = re.sub(r'(?<=[а-яё»”])\d{1,3}(?=[\s.,;:!?)]|$)', '', p)  # надстрочные сноски
            p = re.sub(r'(\d)— (\d)', r'\1—\2', p)  # разорванный диапазон стихов
            if p:
                out.append(p)
        return out

    return {ch: chapter(ch) for ch in ranges}


# ---------- 2. Выравнивание абзацев RU↔EN ----------

def en_paragraphs(ch: int) -> list[str]:
    txt = (ROOT / 'source' / 'chapters' / f'gc_ch{ch:02d}.txt').read_text()
    out = []
    for m in re.finditer(r'\[¶(\d+)\]\s*([\s\S]*?)(?=\n\[¶|\Z)', txt):
        out.append(re.sub(r'\s+', ' ', m.group(2)).strip())
    return out


def digits_of(s: str) -> set[str]:
    return {d for d in re.findall(r'\d{2,4}', s)}


def sim(e: str, r: str) -> float:
    de, dr = digits_of(e), digits_of(r)
    anchor = (2.0 * len(de & dr) / (len(de) + len(dr))) if (de or dr) else 0.35
    ratio = min(len(r), len(e)) / max(len(r), len(e), 1)
    return anchor * 2.0 + ratio


def align_chapter(en: list[str], ru: list[str]):
    """DP: ходы 1:1, 1EN:2RU (разбит), 2EN:1RU (слит). Возвращает en_idx→[ru_idx…]."""
    n, m = len(en), len(ru)
    NEG = float('-inf')
    dp = [[NEG] * (m + 1) for _ in range(n + 1)]
    back: list[list[tuple[int, int] | None]] = [[None] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0.0
    for i in range(n + 1):
        for j in range(m + 1):
            if dp[i][j] == NEG:
                continue
            if i < n and j < m:
                v = dp[i][j] + sim(en[i], ru[j])
                if v > dp[i + 1][j + 1]:
                    dp[i + 1][j + 1], back[i + 1][j + 1] = v, (1, 1)
            if i < n and j + 1 < m:
                v = dp[i][j] + sim(en[i], ru[j] + ' ' + ru[j + 1]) - 0.4
                if v > dp[i + 1][j + 2]:
                    dp[i + 1][j + 2], back[i + 1][j + 2] = v, (1, 2)
            if i + 1 < n and j < m:
                v = dp[i][j] + sim(en[i] + ' ' + en[i + 1], ru[j]) - 0.4
                if v > dp[i + 2][j + 1]:
                    dp[i + 2][j + 1], back[i + 2][j + 1] = v, (2, 1)
    mapping: dict[int, list[int]] = {}
    i, j = n, m
    moves = []
    while i > 0 or j > 0:
        mv = back[i][j]
        if mv is None:
            return None, None  # выравнивание не сошлось
        di, dj = mv
        for k in range(i - di, i):
            mapping[k] = list(range(j - dj, j))
        moves.append((i - di, j - dj, di, dj))
        i, j = i - di, j - dj
    return mapping, moves[::-1]


# ---------- 3. Предложения и карта цитат ----------

RU_ABBR = ['Р. Х', 'н. э', 'т. е', 'т. д', 'т. п', 'см', 'ср', 'Е. Г. У']
EN_ABBR_RE = re.compile(
    r'\b(B\.C|A\.D|St|Dr|Mr|Mrs|Rev|Dan|Gen|Ex|Lev|Num|Deut|Isa|Jer|Ezek|Matt|Rom'
    r'|Cor|Gal|Eph|Phil|Col|Thess|Tim|Heb|Pet|Ps|Prov|Eccl|Zech|Mal|vol|chap|ver|pp?)\.'
)


SENT_BOUNDARY = re.compile(r'([.!?…][»”"’\)\]]*(?:\s*\(\d+\))?)\s+(?=[«“"А-ЯЁA-Z\d])')


def split_sentences(text: str, lang: str) -> list[str]:
    t = text
    if lang == 'ru':
        for a in RU_ABBR:
            t = t.replace(a + '.', a.replace(' ', '⁠') + '⁙')
    else:
        t = EN_ABBR_RE.sub(lambda m: m.group(0)[:-1] + '⁙', t)
    t = SENT_BOUNDARY.sub(lambda m: m.group(1) + '\x00', t)
    out = []
    for p in t.split('\x00'):
        p = p.replace('⁙', '.').replace('⁠', ' ').strip()
        if p:
            out.append(p)
    return out


def matchable(s: str) -> str:
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    s = re.sub(r'\s*\(\d+\)\s*', ' ', s)  # сносочные маркеры (41)
    s = re.sub(r'[—–‐-]', '', s)  # длинные/короткие тире: экстрактор их терял
    return re.sub(r'\s+', ' ', s).strip()


def alnum(s: str) -> str:
    """Агрессивная нормализация для поиска: только буквы/цифры/пробелы, нижний регистр."""
    s = re.sub(r'\s*\(\d+\)\s*', ' ', s)
    s = re.sub(r'[^A-Za-zА-Яа-яЁё0-9 ]+', ' ', s)
    return re.sub(r'\s+', ' ', s).strip().lower()


def _sent_overlap(mp, q, en_sents, norm):
    start = mp.find(q)
    if start >= 0:
        end = start + len(q)
    else:
        # цитата с пропуском: якоримся по голове и хвосту
        parts = [x.strip() for x in re.split(r'\.\.\.|…', q) if len(x.strip()) > 12]
        if len(parts) < 2:
            return None
        s0 = mp.find(parts[0])
        s1 = mp.find(parts[-1], s0 + len(parts[0]) if s0 >= 0 else 0)
        if s0 < 0 or s1 < 0:
            return None
        start, end = s0, s1 + len(parts[-1])
    idx, pos = [], 0
    for k, s in enumerate(en_sents):
        ms = norm(s)
        s_start = mp.find(ms, pos) if ms else pos
        if s_start < 0:
            s_start = pos
        s_end = s_start + len(ms)
        pos = max(pos, s_end)
        if s_start < end - 1 and s_end > start + 1:
            idx.append(k)
    return idx or None


def find_quote_sents(en_para: str, quote: str, en_sents: list[str]):
    """Индексы предложений EN-абзаца, накрывающих цитату (по нормализованным строкам)."""
    idx = _sent_overlap(matchable(en_para), matchable(quote), en_sents, matchable)
    if idx is not None:
        return idx
    # пунктуация цитаты у экстрактора разошлась с источником: alnum-пространство
    return _sent_overlap(alnum(en_para), alnum(quote), en_sents, alnum)


def align_sentences(en_sents: list[str], ru_sents: list[str]):
    """DP-выравнивание предложений внутри абзаца (1:1, 1:2, 2:1) → en_idx→[ru_idx…]."""
    mapping, _ = align_chapter(en_sents, ru_sents)
    return mapping


def main() -> None:
    ru_chapters = extract_ru_chapters()
    claims = json.loads((SITE / 'public' / 'data' / 'claims_full.json').read_text())

    report: dict = {'chapters': {}, 'manual': [], 'stats': {}}
    align_maps: dict[int, dict[int, list[int]]] = {}
    ru_by_ch: dict[int, list[str]] = {}
    en_by_ch: dict[int, list[str]] = {}

    for ch in range(43):
        en, ru = en_paragraphs(ch), ru_chapters[ch]
        en_by_ch[ch], ru_by_ch[ch] = en, ru
        mapping, moves = align_chapter(en, ru)
        if mapping is None:
            print(f'!! глава {ch}: выравнивание не сошлось', file=sys.stderr)
            sys.exit(1)
        align_maps[ch] = mapping
        nontrivial = [mv for mv in moves if mv[2:] != (1, 1)]
        report['chapters'][ch] = {
            'en': len(en), 'ru': len(ru),
            'merges_splits': [{'en¶': mv[0] + 1, 'ru¶': mv[1] + 1, 'move': f'{mv[2]}EN:{mv[3]}RU'} for mv in nontrivial],
        }

    quotes: dict[str, dict] = {}
    flags: list[dict] = []
    para_shifts = 0
    for c in claims:
        ch = c['chapter']
        para_no = c['paragraph']
        en_paras = en_by_ch[ch]
        span = None
        # цитата обязана найтись в своём абзаце; иначе ищем по всей главе (сдвиг ¶)
        candidates = [para_no] + [p for p in range(1, len(en_paras) + 1) if p != para_no]
        for p in candidates:
            if not (1 <= p <= len(en_paras)):
                continue
            sents = split_sentences(en_paras[p - 1], 'en')
            span = find_quote_sents(en_paras[p - 1], c['quote'], sents)
            if span is not None:
                if p != para_no:
                    para_shifts += 1
                para_no, en_para, en_sents = p, en_paras[p - 1], sents
                break
        if span is None:
            flags.append({'id': c['id'], 'why': 'цитата не найдена в главе', 'en': c['quote'][:110]})
            continue

        ru_idx = align_maps[ch].get(para_no - 1, [])
        ru_para = ' '.join(ru_by_ch[ch][j] for j in ru_idx)
        ru_sents = split_sentences(ru_para, 'ru')
        ne, nr = len(en_sents), len(ru_sents)

        if len(span) == ne:  # цитата — весь абзац
            ru_span = list(range(nr))
        elif ne == nr:
            ru_span = span
        else:
            smap = align_sentences(en_sents, ru_sents)
            if smap is None:
                ru_span = None
            else:
                ru_span = sorted({j for k in span for j in smap.get(k, [])})
        if not ru_span:
            flags.append({'id': c['id'], 'why': 'предложения не выровнялись',
                          'en': c['quote'][:110], 'ru': ru_para[:110]})
            continue

        ru_quote = ' '.join(ru_sents[k] for k in ru_span if 0 <= k < nr).strip()
        dq = {d for d in re.findall(r'\d{3,4}', matchable(c['quote']))}
        dr = {d for d in re.findall(r'\d{3,4}', ru_quote)}
        rec = {'ru': ru_quote, 'para': para_no, 'sents': ru_span}
        # якорная проверка: цифры цитаты должны найтись в русском соответствии
        if dq and not dq <= dr:
            rec['flag'] = 'digits'
            flags.append({
                'id': c['id'], 'why': 'digits', 'en_digits': sorted(dq), 'ru_digits': sorted(dr),
                'en': c['quote'][:110], 'ru': ru_quote[:110],
            })
        quotes[c['id']] = rec
    print('para shifts:', para_shifts)

    # RU-тексты абзацев семи отрывков
    passages: dict[str, dict[str, str]] = {}
    for ch, pnos in PASSAGE_PARAS.items():
        passages[str(ch)] = {}
        for p in pnos:
            ru_idx = align_maps[ch].get(p - 1, [])
            passages[str(ch)][str(p)] = ' '.join(ru_by_ch[ch][j] for j in ru_idx)

    report['stats'] = {
        'claims': len(claims), 'mapped': len(quotes),
        'flagged': len(flags),
        'flag_kinds': {},
    }
    for f in flags:
        k = f.get('why', '?')
        report['stats']['flag_kinds'][k] = report['stats']['flag_kinds'].get(k, 0) + 1

    overrides_path = SITE / 'content' / 'ru_quotes.overrides.json'
    if overrides_path.exists():
        overrides = json.loads(overrides_path.read_text())
        for cid, o in overrides.items():
            if cid.startswith('_'):
                continue
            quotes[cid] = {'ru': o['ru'], 'para': o.get('para', quotes.get(cid, {}).get('para')),
                           'sents': [], 'manual': True}
        applied = {k for k in overrides if not k.startswith('_')}
        flags = [f for f in flags if f['id'] not in applied]
        report['stats']['flagged'] = len(flags)
        report['manual_resolved'] = sorted(overrides)
        print('ручные решения применены:', len(applied))

    out_quotes = {'_license': 'Цитаты из официального русского перевода «Великой борьбы» © Ellen G. White Estate / изд. «Источник жизни»; приводятся в исследовательских целях; НЕ покрываются лицензией CC BY 4.0 данного проекта.'}
    out_quotes.update(quotes)
    (SITE / 'content' / 'ru_quotes.json').write_text(
        json.dumps(out_quotes, ensure_ascii=False), encoding='utf-8')
    (SITE / 'content' / 'ru_passages.json').write_text(
        json.dumps(passages, ensure_ascii=False, indent=1), encoding='utf-8')
    (SCRATCH / 'ru_quotes_report.json').write_text(
        json.dumps({**report, 'manual': flags}, ensure_ascii=False, indent=1), encoding='utf-8')
    print('claims:', len(claims), '| mapped:', len(quotes), '| flagged:', len(flags))
    print('flag kinds:', report['stats']['flag_kinds'])
    nontrivial_total = sum(len(v['merges_splits']) for v in report['chapters'].values())
    print('merge/split паросочетаний:', nontrivial_total)


if __name__ == '__main__':
    main()
