import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/lib/seo/indexable'

// Literal: Next segment config cannot import this. Re-checks publishedAt after deploy.
export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries()

  return entries.map((entry) => ({
    url: entry.url,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
