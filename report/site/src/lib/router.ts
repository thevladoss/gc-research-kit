import { useEffect, useRef, useState } from 'react'

export type Route =
  | { page: 'home' }
  | { page: 'chain'; link: number }
  | { page: 'dossiers' }
  | { page: 'map' }
  | { page: 'explorer'; params: Record<string, string> }
  | { page: 'method'; anchor?: string }
  | { page: 'notFound' }

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  // "#/method#author" → якорь после второго #
  const [pathAndQuery, anchor] = clean.split('#')
  const [pathPart, queryPart] = pathAndQuery.split('?')
  const [head, ...rest] = pathPart.split('/')
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
    case 'explorer': {
      const params: Record<string, string> = {}
      for (const [k, v] of new URLSearchParams(queryPart ?? '')) params[k] = v
      return { page: 'explorer', params }
    }
    case 'method':
      return { page: 'method', anchor }
    default:
      return { page: 'notFound' }
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  const prevPage = useRef(route.page)
  useEffect(() => {
    const onHash = () => {
      const next = parseHash(window.location.hash)
      setRoute(next)
      // наверх — только при смене страницы; смена фильтров/якорей не дёргает скролл
      if (next.page !== prevPage.current) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
      prevPage.current = next.page
      if (next.page === 'method' && next.anchor) {
        requestAnimationFrame(() => {
          document.getElementById(next.anchor!)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
        })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

/** Обновить параметры explorer в адресе без прокрутки и без события hashchange. */
export function replaceExplorerParams(params: Record<string, string>) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== ''))
  const qs = q.toString()
  history.replaceState(null, '', `#/explorer${qs ? `?${qs}` : ''}`)
}

export const href = {
  home: '#/',
  chain: (n: number) => `#/chain/${n}`,
  dossiers: '#/dossiers',
  map: '#/map',
  explorer: '#/explorer',
  explorerWith: (params: Record<string, string>) => {
    const q = new URLSearchParams(params).toString()
    return `#/explorer${q ? `?${q}` : ''}`
  },
  method: '#/method',
}
