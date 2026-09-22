/**
 * File-based content layer for benessere.digital.
 * Published inventory lives in src/content — no CMS, no database.
 */

import {
  apps as appSources,
  authors as authorSources,
  books as bookSources,
  categories as categorySources,
  creators as creatorSources,
} from '@/content/catalog'
import { articles as articleSources } from '@/content/articles'
import type { ArticleSource } from '@/content/types'

export type MediaItem = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  filename?: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  parent?: Category | string | null
}

export type Author = {
  id: string
  name: string
  slug: string
  bio?: string
  avatar?: MediaItem | null
  socialLinks?: Array<{ platform: string; url: string }>
}

export type Article = {
  id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: MediaItem | null
  content?: unknown
  authors?: Author[]
  categories?: Category[]
  status: 'draft' | 'published'
  publishedAt?: string
  updatedAt: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: MediaItem | null
    noIndex?: boolean
  }
}

export type AppItem = {
  id: string
  name: string
  slug: string
  description: string
  useCase?: string
  appStoreUrl?: string
  playStoreUrl?: string
  icon?: MediaItem | null
  featured?: boolean
}

export type BookItem = {
  id: string
  title: string
  slug: string
  author: string
  description?: string
  buyUrl?: string
  coverImage?: MediaItem | null
  featured?: boolean
}

export type CreatorItem = {
  id: string
  handle: string
  slug: string
  name?: string
  bio?: string
  platforms?: Array<{ platform: string; url: string }>
  avatar?: MediaItem | null
  featured?: boolean
}

function media(id: string, url: string, alt: string): MediaItem {
  return { id, url, alt, filename: url.split('/').pop() }
}

const categories: Category[] = categorySources.map((item) => ({
  id: item.slug,
  name: item.name,
  slug: item.slug,
  description: item.description,
}))

const categoryBySlug = new Map(categories.map((item) => [item.slug, item]))

const authors: Author[] = authorSources.map((item) => ({
  id: item.slug,
  name: item.name,
  slug: item.slug,
  bio: item.bio,
  avatar: item.avatar ? media(`author-${item.slug}`, item.avatar, item.name) : null,
  socialLinks: item.socialLinks,
}))

const authorBySlug = new Map(authors.map((item) => [item.slug, item]))

function hydrateArticle(source: ArticleSource): Article {
  const featuredImage = source.cover
    ? media(`cover-${source.slug}`, source.cover, source.coverAlt || source.title)
    : null

  return {
    id: source.slug,
    title: source.title,
    slug: source.slug,
    excerpt: source.excerpt,
    featuredImage,
    content: source.content,
    authors: source.authorSlugs
      .map((slug) => authorBySlug.get(slug))
      .filter((item): item is Author => Boolean(item)),
    categories: source.categorySlugs
      .map((slug) => categoryBySlug.get(slug))
      .filter((item): item is Category => Boolean(item)),
    status: source.status,
    publishedAt: source.publishedAt,
    updatedAt: source.publishedAt ?? '',
    seo: {
      metaTitle: source.seo?.metaTitle,
      metaDescription: source.seo?.metaDescription,
      ogImage: featuredImage,
      noIndex: source.seo?.noIndex,
    },
  }
}

const publishedArticles = articleSources
  .filter((item) => item.status === 'published')
  .map(hydrateArticle)
  .sort((a, b) => Date.parse(b.publishedAt ?? '') - Date.parse(a.publishedAt ?? ''))

const apps: AppItem[] = appSources
  .map((item) => ({
    id: item.slug,
    name: item.name,
    slug: item.slug,
    description: item.description,
    useCase: item.useCase,
    appStoreUrl: item.appStoreUrl,
    playStoreUrl: item.playStoreUrl,
    featured: item.featured,
    icon: media(`app-${item.slug}`, item.icon, `Icona ${item.name}`),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'it'))

const books: BookItem[] = bookSources
  .map((item) => ({
    id: item.slug,
    title: item.title,
    slug: item.slug,
    author: item.author,
    description: item.description,
    buyUrl: item.buyUrl,
    featured: item.featured,
    coverImage: media(`book-${item.slug}`, item.cover, item.title),
  }))
  .sort((a, b) => a.title.localeCompare(b.title, 'it'))

const creators: CreatorItem[] = creatorSources
  .map((item) => ({
    id: item.slug,
    handle: item.handle,
    slug: item.slug,
    name: item.name,
    bio: item.bio,
    platforms: item.platforms,
    featured: item.featured,
    avatar: item.avatar
      ? media(`creator-${item.slug}`, item.avatar, item.name || item.handle)
      : null,
  }))
  .sort((a, b) => a.handle.localeCompare(b.handle, 'it'))

function paginate<T>(items: T[], page: number, limit: number) {
  const safePage = Math.max(1, page)
  const start = (safePage - 1) * limit
  const docs = items.slice(start, start + limit)
  const totalDocs = items.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  return { docs, totalDocs, totalPages, page: safePage }
}

export async function getArticles(params?: {
  page?: number
  limit?: number
  category?: string
  status?: 'published' | 'draft'
  author?: string
}): Promise<{ docs: Article[]; totalDocs: number; totalPages: number; page: number }> {
  const { page = 1, limit = 12, category, status = 'published', author } = params ?? {}
  let docs = status === 'published' ? publishedArticles : []

  if (category) {
    docs = docs.filter((article) => article.categories?.some((item) => item.slug === category))
  }
  if (author) {
    docs = docs.filter((article) => article.authors?.some((item) => item.slug === author))
  }

  return paginate(docs, page, limit)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return publishedArticles.find((article) => article.slug === slug) ?? null
}

export async function getCategories(): Promise<Category[]> {
  return categories
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categoryBySlug.get(slug) ?? null
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return authorBySlug.get(slug) ?? null
}

export async function getAuthors(): Promise<Author[]> {
  return authors
}

export async function getApps(): Promise<AppItem[]> {
  return apps
}

export async function getBooks(): Promise<BookItem[]> {
  return books
}

export async function getCreators(): Promise<CreatorItem[]> {
  return creators
}

export function getImageUrl(mediaItem: MediaItem | null | undefined): string {
  if (!mediaItem?.url) return '/images/placeholder.jpg'
  return mediaItem.url
}

export function formatDate(dateString: string, locale = 'it-IT'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}
