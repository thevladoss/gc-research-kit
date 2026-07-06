#!/usr/bin/env python3
"""
Слияние переводов аналитических текстов конвейера в content/ru_reasoning.json.

Вход:  <scratch>/tr/in_*.json (исходные задачи) и out_*.json (переводы субагентов).
Выход: report/site/content/ru_reasoning.json — карта "id|field" → русский текст.
       Лог покрытия по полям и по формульным/содержательным обоснованиям.

Служебный ключ _license повторяет статус: переводы выполнены для читаемости,
авторитетная версия анализа — английская (входит в датасет). Файл в data.zip
НЕ включается (см. build-data.mjs).
"""
import json
import re
import glob
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
TR = Path(
    '/private/tmp/claude-501/-Users-thevladoss-devs-research-gc-research-kit/'
    'dd2cc2ea-3212-406a-b919-818f9b798930/scratchpad/tr'
)
FORMULAIC = re.compile(
    r'not empirically (checkable|testable|verifiable)|unverifiable by definition|^\[common_knowledge\]',
    re.I,
)
NOTE = ('Русские переводы аналитических текстов выполнены для читаемости; '
        'авторитетная версия анализа — английская, она входит в датасет. '
        'Russian translations of the analytical texts are provided for readability; '
        'the authoritative version of the analysis is the English one, included in the dataset.')

# исходные задачи: (id, field) → en, + формульность
tasks = {}
formulaic_keys = set()
for f in sorted(glob.glob(str(TR / 'in_*.json'))):
    for it in json.load(open(f)):
        key = f"{it['id']}|{it['field']}"
        tasks[key] = it['en']
        if it['field'] == 'rationale' and FORMULAIC.search(it['en']):
            formulaic_keys.add(key)

# переводы
out = {}
bad = []
for f in sorted(glob.glob(str(TR / 'out_*.json'))):
    try:
        data = json.load(open(f))
    except Exception as e:
        bad.append((Path(f).name, f'нечитаемый JSON: {e}'))
        continue
    for it in data:
        key = f"{it.get('id')}|{it.get('field')}"
        ru = (it.get('ru') or '').strip()
        if key in tasks and ru:
            out[key] = ru

# карта для сайта (без служебных ключей в подсчётах)
mapping = {'_license': NOTE}
mapping.update(out)
(SITE / 'content' / 'ru_reasoning.json').write_text(
    json.dumps(mapping, ensure_ascii=False), encoding='utf-8')

# лог покрытия
by_field_total = {}
by_field_done = {}
for key in tasks:
    fld = key.split('|', 1)[1]
    by_field_total[fld] = by_field_total.get(fld, 0) + 1
    if key in out:
        by_field_done[fld] = by_field_done.get(fld, 0) + 1

print(f'задач всего: {len(tasks)} | переведено: {len(out)} '
      f'({len(out) * 100 // len(tasks)}%)')
for fld in sorted(by_field_total):
    d = by_field_done.get(fld, 0)
    print(f'  {fld:14} {d}/{by_field_total[fld]}')
fdone = sum(1 for k in formulaic_keys if k in out)
print(f'формульных rationale: {fdone}/{len(formulaic_keys)} переведено '
      f'(единой канонической рамкой)')
print(f'содержательных: {len(out) - fdone} индивидуально')
if bad:
    print('ПРОБЛЕМНЫЕ out-файлы:', bad)

# отсутствующие задачи (фолбэк на английский «(англ.)»)
missing = len(tasks) - len(out)
if missing:
    print(f'без перевода (фолбэк EN «(англ.)»): {missing}')
