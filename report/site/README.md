# Сайт исследования GCHAR

Двуязычный (RU по умолчанию, EN) статический лонгрид по итогам исторической проверки
«Великой борьбы» (издание 1911 года). Фаза 2c проекта; заменяет `report/index.html` Фазы 1.

## Локальная разработка

```bash
cd report/site
npm ci           # точные версии из package-lock.json
npm run dev      # http://localhost:5173; предварительно прогоняет scripts/build-data.mjs
```

Требуется Node 20+ и утилита `zip` в PATH (для сборки `public/data/data.zip`).

## Сборка

```bash
npm run build    # build-data → tsc → vite build → dist/
npm run preview  # локальный просмотр собранного dist/
```

База путей — `./`, поэтому dist/ работает на GitHub Pages и любом статическом хостинге,
в том числе из подкаталога.

## Деплой на GitHub Pages

1. `npm run build` в `report/site`.
2. Опубликуйте содержимое `report/site/dist/` в ветку `gh-pages` (например,
   `npx gh-pages -d dist`) или включите Pages c actions-артефактом.
3. Ничего настраивать не нужно: маршрутизация hash-based (`#/…`), поэтому 404-конфиг
   и rewrite-правила не требуются; обновление страницы и глубокие ссылки работают
   с холодной загрузки.

## Данные: единый источник

`scripts/build-data.mjs` читает реальные файлы пайплайна (`synthesis/aggregate.json`,
`adjudication/*.ruling.json`, `impact/*.impact.json`, `adversarial/*.defended.json`,
`ADJUDICATION_CHARTER.md`) и генерирует одновременно:

- `src/data/generated/*.ts` — все цифры интерфейса (руками ничего не вписывается);
- `public/data/*` — публичный датасет (claims_full.json, dossiers.json, aggregate.json,
  хартия, DATA_README.md, data.zip);
- `public/ru_quotes.json` — карту русских цитат для таблицы утверждений (в data.zip
  НЕ входит).

Цифры сайта и датасет собираются одним скриптом и не могут разойтись (проверено
побайтовым сравнением сборки с чистого клона). Санитизация: из датасета удаляются
служебные заметки о бюджете поиска; все обоснования, источники и аргументы
сохраняются.

### Регенерация датасета

```bash
npm run data     # или node scripts/build-data.mjs
```

### Регенерация ru_quotes.json (карта официального русского перевода)

```bash
python3 -m pip install pymupdf
python3 scripts/build_ru_quotes.py
```

Скрипту нужен файл `source/gc_ru_official.pdf` — официальный русский перевод,
**которого нет в репозитории** (охраняемый текст, см. «Лицензия»). Без PDF шаг
пропускается: закоммиченная карта `content/ru_quotes.json` остаётся рабочей,
сборка сайта от PDF не зависит. Ручные решения спорных сопоставлений лежат
в `content/ru_quotes.overrides.json` и применяются поверх автоматики.

## Стек и фиксация версий

Правило выбора: последний стабильный мажор, если ему ≥2–3 месяцев и нет блокеров
экосистемы; иначе предыдущий мажор. Все версии зафиксированы точно (без `^`).
Проверено 2026-07-06 через `npm view <pkg> version time`.

| Пакет | Версия | Обоснование |
|---|---|---|
| vite | 8.1.3 | мажор 8.0.0 вышел 2026-03-12 (~4 мес.), экосистема догнала (plugin-react 6 требует vite ^8) |
| @vitejs/plugin-react | 6.0.3 | текущий мажор под vite 8 |
| react / react-dom | 19.2.7 | React 19 стабилен с декабря 2024 |
| typescript | 6.0.3 | мажор 6.0 вышел 2026-03-23 (~3,5 мес.); блокеров нет |
| tailwindcss + @tailwindcss/vite | 4.3.2 | Tailwind 4 стабилен с января 2025; конфигурация CSS-first |
| framer-motion | 12.42.2 | мажор 12 давно стабилен; вся анимация сайта — только через него |
| recharts | 3.9.2 | мажор 3 вышел в июне 2025 (~1 год); используется на «Спорных вопросах» |
| @fontsource/old-standard-tt | 5.2.8 | дисплейная антиква; сабсеты cyrillic + cyrillic-ext проверены |
| @fontsource/ibm-plex-sans | 5.2.8 | текст; cyrillic + cyrillic-ext проверены |
| @fontsource/ibm-plex-mono | 5.2.7 | данные/подписи; cyrillic + cyrillic-ext проверены |

Осознанно НЕ используются: роутер (hash-навигация своя, ~90 строк), стейт-менеджер,
UI-кит — по требованиям проекта.

## Структура

```
content/            ru.json, en.json (весь текст интерфейса; ключи идентичны),
                    glossary.md, ru_quotes.json (+overrides) — карта перевода цитат
scripts/            build-data.mjs (данные), build_ru_quotes.py (карта перевода)
src/
  components/       Header, Footer, Reveal, Counter, ThesisChain, SubtractionPassage,
                    FiveStepScale, QuoteText, DirectionBar, CorpusField
  data/generated/   сгенерированные модули (руками не редактируются)
  lib/              i18n, hash-роутер, стили статусов, типы claims
  pages/            Home, ChainPage, DossiersPage, MapPage, ExplorerPage, MethodPage
  styles/index.css  дизайн-токены (@theme), см. DESIGN.md
public/data/        публичный датасет (генерируется)
public/ru_quotes.json  карта русских цитат (генерируется; вне data.zip)
```

## Язык интерфейса

Правило простого языка: на читательских страницах — только простые эквиваленты
из `content/glossary.md`; терминология конвейера живёт на /method и в датасете.
RU — источник истины (тексты синтеза), EN — перевод той же силы утверждений.
В русской локали цитаты книги приводятся по официальному переводу; у чувствительных
формулировок рядом сохраняется английская ключевая фраза; оригинал 1911 года —
в один клик.

## Лицензия

Данные исследования и тексты сайта — CC BY 4.0 © 2026 Владислав Осин. Английский текст
«Великой борьбы» издания 1911 года — общественное достояние. Лицензия CC BY 4.0
НЕ распространяется на цитаты из охраняемого официального русского перевода
(© Ellen G. White Estate / изд. «Источник жизни»), в том числе на их карту в файлах
`content/ru_quotes.json` и `public/ru_quotes.json`: эти цитаты приводятся
в исследовательских целях и в скачиваемый датасет (data.zip) не входят.
