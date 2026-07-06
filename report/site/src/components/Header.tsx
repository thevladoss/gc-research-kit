import { ChartColumn, FlaskConical, Gavel, Languages, Scale, Table2 } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { href, type Route } from '../lib/router'

const items = [
  { key: 'nav.home', to: href.home, page: 'home', Icon: Scale },
  { key: 'nav.dossiers', to: href.dossiers, page: 'dossiers', Icon: Gavel },
  { key: 'nav.map', to: href.map, page: 'map', Icon: ChartColumn },
  { key: 'nav.explorer', to: href.explorer, page: 'explorer', Icon: Table2 },
  { key: 'nav.method', to: href.method, page: 'method', Icon: FlaskConical },
] as const

/** Логотип: два переплетённых мини-звена — фирменный мотив цепи. */
function ChainMark() {
  return (
    <svg width="28" height="16" aria-hidden="true" className="shrink-0">
      <rect x="12.2" y="3" width="14.5" height="10" rx="5" fill="none" stroke="var(--color-binding)" strokeWidth="2" />
      <rect
        x="1.2"
        y="3"
        width="14.5"
        height="10"
        rx="5"
        fill="none"
        stroke="var(--color-binding)"
        strokeWidth="2"
        pathLength={100}
        strokeDasharray="55 12 33 0"
      />
    </svg>
  )
}

export function Header({ route }: { route: Route }) {
  const { t, locale, setLocale } = useI18n()
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 px-5 py-2 md:px-8">
        {/* бренд: звено + название книги + подпись; целиком — ссылка на главную */}
        <a href={href.home} className="group flex min-h-11 items-center gap-2.5 no-underline">
          <ChainMark />
          <span className="flex flex-col justify-center leading-none">
            <span className="font-display text-[1.2rem] text-ink italic transition-colors group-hover:text-binding">
              {t('header.bookTitle')}
            </span>
            <span className="mt-1 hidden text-[0.625rem] tracking-[0.14em] text-ink-soft md:block">
              {t('header.subtitle')}
            </span>
          </span>
        </a>
        <button
          type="button"
          onClick={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
          aria-label={t('lang.aria')}
          className="order-2 ml-auto min-h-11 cursor-pointer rounded-sm border border-line px-3 py-1 font-mono text-[0.75rem] text-ink-soft uppercase hover:border-binding hover:text-binding md:order-3 md:ml-0"
        >
          <Languages size={13} strokeWidth={1.75} aria-hidden="true" className="mr-1.5 inline-block align-[-2px]" />
          {t('lang.toggle')}
        </button>
        <nav
          aria-label={locale === 'ru' ? 'Разделы сайта' : 'Site sections'}
          className="order-3 -mx-1 flex w-full grow items-baseline gap-x-5 overflow-x-auto px-1 whitespace-nowrap md:order-2 md:w-auto"
        >
          {items.map((it) => {
            const active = route.page === it.page || (it.page === 'home' && route.page === 'chain')
            return (
              <a
                key={it.key}
                href={it.to}
                aria-current={active ? 'page' : undefined}
                className={`inline-block py-2.5 font-mono text-[0.75rem] tracking-wide uppercase no-underline ${
                  active
                    ? 'text-ink underline decoration-brass underline-offset-8'
                    : 'text-ink-soft hover:text-binding'
                }`}
              >
                <it.Icon size={13} strokeWidth={1.75} aria-hidden="true" className="mr-1.5 inline-block align-[-2px]" />
                {t(it.key)}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
