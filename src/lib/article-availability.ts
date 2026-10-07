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

export function isPubliclyAvailable(article: PublishableArticle, now: Date = new Date()): boolean {
  if (article.status !== 'published') return false
  if (!article.publishedAt) return false

  const publishedAtMs = Date.parse(article.publishedAt)
  if (Number.isNaN(publishedAtMs)) return false

  return publishedAtMs <= now.getTime()
}

/** Sitemap, llms.txt and IndexNow: public and not marked noIndex. */
export function isIndexableArticle(
  article: PublishableArticle & { seo?: { noIndex?: boolean } | null },
  now: Date = new Date(),
): boolean {
  if (article.seo?.noIndex) return false
  return isPubliclyAvailable(article, now)
}
