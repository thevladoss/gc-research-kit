# GCHAR — историческая проверка «Великой борьбы»

Систематическая проверка исторических утверждений книги Эллен Уайт «Великая борьба»
(издание 1911 года, английский текст, общественное достояние). Из книги выписаны все
проверяемые утверждения — 4443 записи с точной цитатой и адресом «глава + абзац», —
каждое сверено с работами современных историков и отдельно с книгами, доступными
автору в её время; каждое обвинение прошло состязательную защиту, а 97 вопросов,
где наука спорит, разобраны по правилам, записанным и замороженным до начала разбора
(`ADJUDICATION_CHARTER.md`). Итог — двуязычный сайт-лонгрид и открытый датасет,
собираемые одним скриптом: цифры сайта и данные не расходятся по построению.

Методологию и конвейер проверки спроектировал автор; исполнение — модели Claude
(Sonnet 4.6 — извлечение и оценка веса ошибок, Opus 4.8 — верификация и защита,
Fable 5 — разбор спорного, синтез и сайт). Все первичные материалы, правила
и полная история каждого вердикта открыты: ошибку можно найти и предъявить.

**Сайт:** https://thevladoss.github.io/gc-research-kit/

*EN summary. GCHAR is a systematic audit of the historical claims in Ellen G. White's
“The Great Controversy” (1911 edition). All 4,443 checkable claims were extracted,
verified against modern and period historiography, passed through an adversarial
defense, and 97 disputed questions were adjudicated under a pre-registered frozen
charter. The result is a bilingual long-read website and an open dataset produced
by the same script. The author designed the methodology and pipeline; Claude models
executed it; every ruling's full history is open.*

## Структура репозитория

```
CLAUDE.md                  правила пайплайна: стадии, вердикты, эпистемические правила
PLAN.md                    план фаз проекта (история выполнения)
ADJUDICATION_CHARTER.md    замороженная хартия разбора спорных вопросов (v1.1-frozen)
ADJUDICATION_DOSSIERS.md   разбиение 97 спорных утверждений на 23 досье
manifest.json              состояние пайплайна по главам и стадиям
schemas/                   JSON-схема утверждения (контракт между стадиями)
.claude/                   агенты пяти стадий и команды оркестрации
.github/workflows/         автодеплой сайта в GitHub Pages
source/                    текст 1911 года (Gutenberg #25833) и его главы с маркерами [¶N]
scholarship/               локальная научная база с INDEX.md (происхождение и лицензия
                           каждого файла); ориентир для поиска, не источник вердиктов
extraction/  verification/  adversarial/  impact/     четыре стадии по 43 главам
adjudication/              23 ruling-файла разбора спорных вопросов
synthesis/                 aggregate.json + русскоязычные документы синтеза
scripts/                   служебные скрипты пайплайна (merge, validate, manifest)
report/index.html          отчёт Фазы 1 (исторический артефакт; заменён сайтом)
report/site/               сайт (Vite + React + TS); см. report/site/README.md
```

## Сборка сайта

```bash
cd report/site
npm ci
npm run build      # scripts/build-data.mjs → tsc → vite build → dist/
npm run preview    # локальный просмотр
```

Требуется Node 20+ и `zip` в PATH. Структура сайта, дизайн-система и таблица
закреплённых версий с обоснованием — в `report/site/README.md`
и `report/site/DESIGN.md`. Все зависимости зафиксированы точно (без `^`);
правило выбора — последний стабильный мажор возрастом от 2–3 месяцев
без блокеров экосистемы.

## Регенерация данных

- **Датасет и цифры сайта**: `cd report/site && npm run data` — читает
  `synthesis/`, `adjudication/`, `impact/`, `adversarial/` и собирает
  `src/data/generated/*` и `public/data/*` (включая data.zip; архив
  байт-детерминирован между сборками).
- **Карта русских цитат** (`content/ru_quotes.json`):
  `python3 report/site/scripts/build_ru_quotes.py` (нужен PyMuPDF:
  `pip install pymupdf`). Скрипту требуется `source/gc_ru_official.pdf` —
  официальный русский перевод, которого в репозитории нет (охраняемый текст).
  Без PDF шаг пропускается: закоммиченная карта остаётся рабочей, сборка сайта
  от PDF не зависит. Ручные решения спорных сопоставлений —
  `content/ru_quotes.overrides.json`.

## Деплой

Автоматический: push в `main` запускает `.github/workflows/deploy.yml` —
сборка на Node 22 из lock-файла, контроль датасета в артефакте, публикация
в GitHub Pages (Settings → Pages → Source: GitHub Actions). Ручной запуск —
кнопкой Run workflow. Маршрутизация hash-based: 404-конфиг не нужен, глубокие
ссылки и обновление страницы работают с холодной загрузки.

## Лицензии

- **Данные исследования и тексты сайта** — CC BY 4.0 © 2026 Владислав Осин.
  Пример ссылки: «Осин В., Историческая проверка „Великой борьбы“, 2026,
  https://thevladoss.github.io/gc-research-kit/».
- **Английский текст «Великой борьбы» 1911 года** — общественное достояние.
- **Цитаты официального русского перевода** (© Ellen G. White Estate /
  изд. «Источник жизни») приводятся в исследовательских целях и лицензией CC BY 4.0
  не покрываются — в том числе их карта в `report/site/content/ru_quotes.json`
  и `report/site/public/ru_quotes.json`; в скачиваемый датасет (data.zip) они не входят.
- **scholarship/** — материалы третьих сторон; происхождение и лицензионная основа
  каждого файла задокументированы в `scholarship/INDEX.md`.

## Контакт

Владислав Осин — почта указана на странице «Как проверяли» сайта
(собирается скриптом, в исходниках в открытом виде не хранится).
