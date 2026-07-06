import { useEffect, useState } from 'react'

export type Route =
  | { page: 'home' }
  | { page: 'chain'; link: number }
  | { page: 'dossiers' }
  | { page: 'map' }
  | { page: 'explorer' }
  | { page: 'method' }
  | { page: 'notFound' }

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  const [head, ...rest] = clean.split('/')
  if (!head) return { page: 'home' }
  switch (head) {
    case 'chain': {
      const n = Number(rest[0])
      if (Number.isInteger(n) && n >= 1 && n <= 7) return { page: 'chain', link: n }
      return { page: 'notFound' }
    }
    case 'dossiers':
      return { page: 'dossiers' }
    case 'map':
      return { page: 'map' }
    case 'explorer':
      return { page: 'explorer' }
    case 'method':
      return { page: 'method' }
    default:
      return { page: 'notFound' }
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export const href = {
  home: '#/',
  chain: (n: number) => `#/chain/${n}`,
  dossiers: '#/dossiers',
  map: '#/map',
  explorer: '#/explorer',
  method: '#/method',
}
