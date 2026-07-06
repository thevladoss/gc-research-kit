import { lazy, Suspense, useEffect } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useRoute } from './lib/router'
import { ChainPage } from './pages/ChainPage'
import { Home } from './pages/Home'
import { MapPage } from './pages/MapPage'
import { MethodPage } from './pages/MethodPage'
import { NotFound } from './pages/Stub'

// recharts и данные досье не грузятся, пока раздел не открыт
const DossiersPage = lazy(() =>
  import('./pages/DossiersPage').then((m) => ({ default: m.DossiersPage })),
)
// таблица утверждений тянет claims_full.json — грузим лениво
const ExplorerPage = lazy(() =>
  import('./pages/ExplorerPage').then((m) => ({ default: m.ExplorerPage })),
)

const fallback = <main className="mx-auto max-w-6xl px-5 py-24 md:px-8" />

export default function App() {
  const route = useRoute()

  // якорь при первом открытии страницы метода по прямой ссылке
  useEffect(() => {
    if (route.page === 'method' && route.anchor) {
      requestAnimationFrame(() => {
        document.getElementById(route.anchor!)?.scrollIntoView()
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
      page = <ChainPage key={route.link} link={route.link} />
      break
    case 'dossiers':
      page = (
        <Suspense fallback={fallback}>
          <DossiersPage />
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
      page = <MethodPage />
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
