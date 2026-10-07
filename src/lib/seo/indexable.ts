import { getArticles, getAuthors, getCategories, type Article, type Author, type Category } from '@/lib/content'
import { isIndexableArticle } from '@/lib/article-availability'
import {
  STATIC_PUBLIC_PATHS,
  absoluteUrl,
  staticPathChangeFrequency,
  staticPathPriority,
} from '@/lib/seo/site'

const ARTICLE_PAGE_SIZE = 100

type ChangeFrequency = ReturnType<typeof staticPathChangeFrequency>

export type SitemapEntry = {
  url: string
  lastModified?: string
  changeFrequency: ChangeFrequency
  priority: number
}

export type IndexableInventory = {
  articles: Article[]
  categories: Category[]
  authors: Author[]
}

/** Published, publishedAt <= now, and not noIndex. Same gate as the sitemap. */
export async function getIndexableArticles(): Promise<Article[]> {
  const first = await getArticles({ page: 1, limit: ARTICLE_PAGE_SIZE, status: 'published' })
  const articles = [...first.docs]

  for (let page = 2; page <= first.totalPages; page += 1) {
    const next = await getArticles({ page, limit: ARTICLE_PAGE_SIZE, status: 'published' })
    articles.push(...next.docs)
  }

  return articles.filter((article) => isIndexableArticle(article))
}

export async function getIndexableInventory(): Promise<IndexableInventory> {
  const articles = await getIndexableArticles()
  const usedCategorySlugs = new Set(
    articles.flatMap((article) => article.categories?.map((category) => category.slug) ?? []),
  )
  const [catalogCategories, authors] = await Promise.all([getCategories(), getAuthors()])

  return {
    articles,
    categories: catalogCategories.filter((category) => usedCategorySlugs.has(category.slug)),
    authors,
  }
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const { articles, categories, authors } = await getIndexableInventory()

  const staticEntries: SitemapEntry[] = STATIC_PUBLIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: staticPathChangeFrequency(path),
    priority: staticPathPriority(path),
  }))

  const articleEntries: SitemapEntry[] = articles.map((article) => ({
    url: absoluteUrl(`/articoli/${article.slug}`),
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryEntries: SitemapEntry[] = categories.map((category) => ({
    url: absoluteUrl(`/categoria/${category.slug}`),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const authorEntries: SitemapEntry[] = authors.map((author) => ({
    url: absoluteUrl(`/autore/${author.slug}`),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticEntries, ...articleEntries, ...categoryEntries, ...authorEntries]
}
