# GCHAR — открытый датасет / open dataset

«Историческая проверка "Великой борьбы"» / "A historical audit of *The Great Controversy*"

Версия данных: 1.0
Дата сборки / build date: 2026-07-06

## Что это / What this is

RU. Полные данные систематической проверки исторических утверждений книги Эллен Уайт
«Великая борьба» (издание 1911 года, английский текст, общественное достояние).
Из книги выписаны все проверяемые утверждения (4443), каждое сверено с работами
историков, каждое обвинение прошло проверку «адвокатом книги», а 97 спорных
вопросов разобраны по заранее принятым и замороженным правилам (см. ADJUDICATION_CHARTER.md).
Датасет собран тем же скриптом, что и цифры на сайте: расхождений между ними нет по построению.

EN. The complete data of a systematic audit of the historical claims in Ellen G. White's
*The Great Controversy* (1911 edition, English text, public domain). Every checkable claim
was extracted (4443), each checked against historians' work, every accusation passed
through a "defense attorney" stage, and 97 disputed questions were resolved under
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

- `claims_full.json` — одна запись на утверждение (4443 записей) с полной историей:
  извлечение (цитата, текст утверждения, тип, глава/абзац) → проверка (вердикт, обоснование,
  источники) → защита (результат, аргумент) → разбор спорного (решение, где было).
  One record per claim with the full history: extraction → verification (verdict, rationale,
  sources) → defense (result, argument) → adjudication ruling where present.
- `dossiers.json` — все 23 досье разбора спорных вопросов целиком: обзор доказательств,
  решения по каждому утверждению, русские резюме. All 23 adjudication dossiers in full.
- `aggregate.json` — сводные метрики синтеза, статусы 7 звеньев несущей цепи книги,
  адъюдикационный слой. Synthesis aggregate: metrics, thesis-chain statuses, adjudication layer.
- `ADJUDICATION_CHARTER.md` — правила разбора спорных вопросов, замороженные до его начала
  (v1.1-frozen). The frozen adjudication charter.
- `DATA_README.md` — этот файл. This file.

## Схема claims_full.json / Schema

Каждая запись / each record:

| Поле / field | Значение / meaning |
|---|---|
| id | `GC-{глава}-{номер}`, неизменен на всех стадиях / immutable claim ID |
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

- 1.0 (2026-07-06) — первая публикация / first release.
