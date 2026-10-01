/**
 * Public availability for file-based articles.
 *
 * Dates are stored as ISO-8601 with an explicit offset (Europe/Rome, e.g. +02:00)
 * or `Z`. `Date.parse` is the same absolute-instant parse used to sort articles
 * and by `formatDate`'s `new Date(...)`.
 */

export type PublishableArticle = {
  status: 'draft' | 'published'
  publishedAt?: string | null
}

/**
 * How often statically rendered listings and the sitemap re-check `publishedAt`.
 * A deploy before the scheduled instant keeps the article hidden; the next
 * revalidation after that instant includes it. The article route itself is
 * rendered per request so a pre-publish 404 is not cached past `publishedAt`.
 */
export const PUBLIC_ARTICLE_REVALIDATE_SECONDS = 300

export function isPubliclyAvailable(article: PublishableArticle, now: Date = new Date()): boolean {
  if (article.status !== 'published') return false
  if (!article.publishedAt) return false

  const publishedAtMs = Date.parse(article.publishedAt)
  if (Number.isNaN(publishedAtMs)) return false

  return publishedAtMs <= now.getTime()
}
