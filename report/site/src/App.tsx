import { lazy, Suspense } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useRoute } from './lib/router'
import { ChainPage } from './pages/ChainPage'
import { Home } from './pages/Home'
import { NotFound, Stub } from './pages/Stub'

// recharts и данные досье не грузятся, пока раздел не открыт
const DossiersPage = lazy(() =>
  import('./pages/DossiersPage').then((m) => ({ default: m.DossiersPage })),
)

export default function App() {
  const route = useRoute()
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
        <Suspense fallback={<main className="mx-auto max-w-6xl px-5 py-24 md:px-8" />}>
          <DossiersPage />
        </Suspense>
      )
      break
    case 'map':
      page = <Stub titleKey="nav.map" />
      break
    case 'explorer':
      page = <Stub titleKey="nav.explorer" />
      break
    case 'method':
      page = <Stub titleKey="nav.method" />
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
