import { lazy, Suspense, useEffect } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useI18n } from './lib/i18n'
import { useRoute } from './lib/router'
import { Home } from './pages/Home'
import { MapPage } from './pages/MapPage'
import { NotFound } from './pages/Stub'

// recharts и данные досье не грузятся, пока раздел не открыт
const DossiersPage = lazy(() =>
  import('./pages/DossiersPage').then((m) => ({ default: m.DossiersPage })),
)
// таблица утверждений тянет claims_full.json — грузим лениво
const ExplorerPage = lazy(() =>
  import('./pages/ExplorerPage').then((m) => ({ default: m.ExplorerPage })),
)
const ChainPage = lazy(() =>
  import('./pages/ChainPage').then((m) => ({ default: m.ChainPage })),
)
const MethodPage = lazy(() =>
  import('./pages/MethodPage').then((m) => ({ default: m.MethodPage })),
)

const fallback = <main className="mx-auto max-w-6xl px-5 py-24 md:px-8" />

const PAGE_NAV_KEY: Record<string, string> = {
  dossiers: 'nav.dossiers',
  map: 'nav.map',
  explorer: 'nav.explorer',
  method: 'nav.method',
}

export default function App() {
  const route = useRoute()
  const { t, locale } = useI18n()

  // заголовок вкладки: полный на главной, короткий per-page на остальных
  useEffect(() => {
    if (route.page === 'home' || route.page === 'notFound') {
      document.title = t('meta.title')
    } else if (route.page === 'chain') {
      document.title = `${t(`home.chain.links.${route.link}.title`)} — ${t('meta.titleShort')}`
    } else {
      document.title = `${t(PAGE_NAV_KEY[route.page])} — ${t('meta.titleShort')}`
    }
  }, [route, locale, t])

  // якорь при первом открытии страницы по прямой ссылке (method / dossiers)
  useEffect(() => {
    const anchor =
      route.page === 'method' || route.page === 'dossiers' ? route.anchor : undefined
    if (anchor) {
      requestAnimationFrame(() => {
        document.getElementById(anchor)?.scrollIntoView()
      })
    }
    // только при монтировании
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let page
  switch (route.page) {
    case 'home':
      page = <Home />
      break
    case 'chain':
      page = (
        <Suspense fallback={fallback}>
          <ChainPage key={route.link} link={route.link} />
        </Suspense>
      )
      break
    case 'dossiers':
      page = (
        <Suspense fallback={fallback}>
          <DossiersPage anchor={route.anchor} />
        </Suspense>
      )
      break
    case 'map':
      page = <MapPage />
      break
    case 'explorer':
      page = (
        <Suspense fallback={fallback}>
          <ExplorerPage initial={route.params} />
        </Suspense>
      )
      break
    case 'method':
      page = (
        <Suspense fallback={fallback}>
          <MethodPage />
        </Suspense>
      )
      break
    default:
      page = <NotFound />
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header route={route} />
      <div className="grow">{page}</div>
      <Footer />
    </div>
  )
}
