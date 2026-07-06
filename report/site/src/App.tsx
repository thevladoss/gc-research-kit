import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useRoute } from './lib/router'
import { Home } from './pages/Home'
import { NotFound, Stub } from './pages/Stub'

export default function App() {
  const route = useRoute()
  let page
  switch (route.page) {
    case 'home':
      page = <Home />
      break
    case 'chain':
      page = <Stub titleKey="nav.home" />
      break
    case 'dossiers':
      page = <Stub titleKey="nav.dossiers" />
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
