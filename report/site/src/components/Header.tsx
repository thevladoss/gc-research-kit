import { useI18n } from '../lib/i18n'
import { href, type Route } from '../lib/router'

const items = [
  { key: 'nav.home', to: href.home, page: 'home' },
  { key: 'nav.dossiers', to: href.dossiers, page: 'dossiers' },
  { key: 'nav.map', to: href.map, page: 'map' },
  { key: 'nav.explorer', to: href.explorer, page: 'explorer' },
  { key: 'nav.method', to: href.method, page: 'method' },
] as const

export function Header({ route }: { route: Route }) {
  const { t, locale, setLocale } = useI18n()
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-8 gap-y-2 px-5 py-4 md:px-8">
        <a href={href.home} className="font-display text-lg leading-tight text-ink no-underline">
          {t('meta.title')}
        </a>
        <nav
          aria-label={locale === 'ru' ? 'Разделы сайта' : 'Site sections'}
          className="-mx-1 flex grow items-baseline gap-x-5 overflow-x-auto px-1 whitespace-nowrap"
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
                {t(it.key)}
              </a>
            )
          })}
        </nav>
        <button
          type="button"
          onClick={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
          aria-label={t('lang.aria')}
          className="min-h-11 cursor-pointer rounded-sm border border-line px-3 py-1 font-mono text-[0.75rem] text-ink-soft uppercase hover:border-binding hover:text-binding"
        >
          {t('lang.toggle')}
        </button>
      </div>
    </header>
  )
}
