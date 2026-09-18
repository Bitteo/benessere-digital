/** Canonical production origin. Apex already 307-redirects to www. */
export const CANONICAL_ORIGIN = 'https://www.benessere.digital'

/**
 * Public static routes under `src/app/(app)/`.
 * Dynamic article / category / author URLs are assembled in `sitemap.ts`.
 */
export const STATIC_PUBLIC_PATHS = [
  '/',
  '/articoli',
  '/categorie',
  '/chi-siamo',
  '/collabora',
  '/contatti',
  '/newsletter',
  '/privacy',
  '/termini',
  '/cookie',
] as const

export type StaticPublicPath = (typeof STATIC_PUBLIC_PATHS)[number]

const LEGAL_PATHS = new Set<string>(['/privacy', '/termini', '/cookie'])
const HUB_PATHS = new Set<string>(['/', '/articoli', '/categorie'])

/** Absolute www URL for a site-relative path (`/` → origin, no trailing slash). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const pathname = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `${CANONICAL_ORIGIN}${pathname}`
}

export function staticPathPriority(path: string): number {
  if (path === '/') return 1
  if (HUB_PATHS.has(path)) return 0.8
  if (LEGAL_PATHS.has(path)) return 0.3
  return 0.5
}

export function staticPathChangeFrequency(
  path: string,
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (HUB_PATHS.has(path)) return 'weekly'
  if (LEGAL_PATHS.has(path)) return 'yearly'
  return 'monthly'
}
