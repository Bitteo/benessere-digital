import type { MetadataRoute } from 'next'
import { getArticles, getAuthors, getCategories } from '@/lib/content'
import {
  STATIC_PUBLIC_PATHS,
  absoluteUrl,
  staticPathChangeFrequency,
  staticPathPriority,
} from '@/lib/seo/site'

const ARTICLE_PAGE_SIZE = 100

async function getPublishedArticles() {
  const first = await getArticles({ page: 1, limit: ARTICLE_PAGE_SIZE, status: 'published' })
  const articles = [...first.docs]

  for (let page = 2; page <= first.totalPages; page += 1) {
    const next = await getArticles({ page, limit: ARTICLE_PAGE_SIZE, status: 'published' })
    articles.push(...next.docs)
  }

  return articles.filter((article) => article.status === 'published' && !article.seo?.noIndex)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [publishedArticles, catalogCategories, catalogAuthors] = await Promise.all([
    getPublishedArticles(),
    getCategories(),
    getAuthors(),
  ])

  const usedCategorySlugs = new Set(
    publishedArticles.flatMap(
      (article) => article.categories?.map((category) => category.slug) ?? [],
    ),
  )

  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: staticPathChangeFrequency(path),
    priority: staticPathPriority(path),
  }))

  const articleEntries: MetadataRoute.Sitemap = publishedArticles.map((article) => ({
    url: absoluteUrl(`/articoli/${article.slug}`),
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryEntries: MetadataRoute.Sitemap = catalogCategories
    .filter((category) => usedCategorySlugs.has(category.slug))
    .map((category) => ({
      url: absoluteUrl(`/categoria/${category.slug}`),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

  const authorEntries: MetadataRoute.Sitemap = catalogAuthors.map((author) => ({
    url: absoluteUrl(`/autore/${author.slug}`),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticEntries, ...articleEntries, ...categoryEntries, ...authorEntries]
}
