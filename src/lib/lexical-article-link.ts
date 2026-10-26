import { isPubliclyAvailable, type PublishableArticle } from './article-availability.ts'
import { CANONICAL_ORIGIN } from './seo/site.ts'

export type CatalogArticle = PublishableArticle & { slug: string }

export type LexicalArticleAnchor = { kind: 'anchor'; href: string | undefined } | { kind: 'span' }

const ARTICLE_PATH = /^\/articoli\/([^/]+)\/?$/

/**
 * Internal article paths only: `/articoli/<slug>` or the same path on the canonical origin.
 * Anything else (external hosts, `/categoria/...`, `/articoli`) is left unchanged.
 */
export function internalArticleSlug(url: string | undefined): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('/')) {
    return slugFromPathname(pathOnly(trimmed))
  }

  if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return null

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    return null
  }

  if (parsed.origin !== CANONICAL_ORIGIN || parsed.protocol !== 'https:') return null
  return slugFromPathname(parsed.pathname)
}

export function articleFinder(
  articles: readonly CatalogArticle[],
): (slug: string) => PublishableArticle | undefined {
  const bySlug = new Map(articles.map((article) => [article.slug, article]))
  return (slug) => bySlug.get(slug)
}

/**
 * Public article links keep their href. Missing or not-yet-public targets render as text,
 * so a crawler is not sent to a 404. Availability is evaluated at `now` (request time
 * on the force-dynamic article page).
 */
export function lexicalArticleAnchor(
  url: string | undefined,
  findArticle: (slug: string) => PublishableArticle | undefined,
  now: Date = new Date(),
): LexicalArticleAnchor {
  const slug = internalArticleSlug(url)
  if (!slug) return { kind: 'anchor', href: url }

  const article = findArticle(slug)
  if (!article || !isPubliclyAvailable(article, now)) return { kind: 'span' }

  return { kind: 'anchor', href: url }
}

function pathOnly(relativeUrl: string): string {
  const end = relativeUrl.search(/[?#]/)
  return end === -1 ? relativeUrl : relativeUrl.slice(0, end)
}

function slugFromPathname(pathname: string): string | null {
  const match = ARTICLE_PATH.exec(pathname)
  if (!match) return null

  let slug = match[1]
  try {
    slug = decodeURIComponent(slug)
  } catch {
    return null
  }

  if (!slug || slug === '.' || slug === '..') return null
  return slug
}
