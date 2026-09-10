/**
 * Payload CMS data fetching utilities for benessere.digital.
 * All functions fetch from the Payload REST API and are designed for use in
 * Next.js Server Components with appropriate revalidation tags.
 */

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// ---------------------------------------------------------------------------
// Types (mirrors Payload collections — kept lean for UI use)
// ---------------------------------------------------------------------------

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
  content?: unknown // Lexical rich text
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

export type Page = {
  id: string
  title: string
  slug: string
  content?: unknown
  seo?: {
    metaTitle?: string
    metaDescription?: string
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
  platforms?: Array<{ platform: string; url?: string }>
  avatar?: MediaItem | null
  featured?: boolean
}

// ---------------------------------------------------------------------------
// Fetcher
// ---------------------------------------------------------------------------

async function payloadFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<{ docs: T[]; totalDocs: number; totalPages: number; page: number } | T | null> {
  try {
    const res = await fetch(`${API_BASE}/api${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

export async function getArticles(params?: {
  page?: number
  limit?: number
  category?: string
  status?: 'published' | 'draft'
}): Promise<{ docs: Article[]; totalDocs: number; totalPages: number; page: number }> {
  const { page = 1, limit = 12, category, status = 'published' } = params ?? {}

  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    'where[status][equals]': status,
    depth: '2',
    sort: '-publishedAt',
  })

  if (category) {
    const categoryDoc = await getCategoryBySlug(category)
    // Nested `categories.slug` filters 500 on Payload 3 hasMany relationships.
    // Skip the articles query until the category exists in CMS.
    if (!categoryDoc) {
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    }
    qs.set('where[categories][in]', categoryDoc.id)
  }

  const result = await payloadFetch<Article>(`/articles?${qs}`, {
    next: { tags: ['articles'], revalidate: 60 },
  })

  return (result as { docs: Article[]; totalDocs: number; totalPages: number; page: number }) ?? {
    docs: [],
    totalDocs: 0,
    totalPages: 0,
    page: 1,
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const qs = new URLSearchParams({
    'where[slug][equals]': slug,
    depth: '2',
    limit: '1',
  })

  const result = await payloadFetch<Article>(`/articles?${qs}`, {
    next: { tags: [`article-${slug}`], revalidate: 60 },
  })

  const list = result as { docs: Article[] } | null
  return list?.docs?.[0] ?? null
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const result = await payloadFetch<Category>(`/categories?limit=100&depth=1`, {
    next: { tags: ['categories'], revalidate: 3600 },
  })
  return (result as { docs: Category[] })?.docs ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const qs = new URLSearchParams({ 'where[slug][equals]': slug, limit: '1', depth: '1' })
  const result = await payloadFetch<Category>(`/categories?${qs}`, {
    next: { tags: ['categories'], revalidate: 3600 },
  })
  return (result as { docs: Category[] })?.docs?.[0] ?? null
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const qs = new URLSearchParams({ 'where[slug][equals]': slug, limit: '1', depth: '1' })
  const result = await payloadFetch<Author>(`/authors?${qs}`, {
    next: { tags: [`author-${slug}`], revalidate: 3600 },
  })
  return (result as { docs: Author[] })?.docs?.[0] ?? null
}

export async function getApps(): Promise<AppItem[]> {
  const qs = new URLSearchParams({ limit: '20', depth: '1', sort: 'name' })
  const result = await payloadFetch<AppItem>(`/apps?${qs}`, {
    next: { tags: ['apps'], revalidate: 300 },
  })
  return (result as { docs: AppItem[] })?.docs ?? []
}

export async function getBooks(): Promise<BookItem[]> {
  const qs = new URLSearchParams({ limit: '20', depth: '1', sort: 'title' })
  const result = await payloadFetch<BookItem>(`/books?${qs}`, {
    next: { tags: ['books'], revalidate: 300 },
  })
  return (result as { docs: BookItem[] })?.docs ?? []
}

export async function getCreators(): Promise<CreatorItem[]> {
  const qs = new URLSearchParams({ limit: '20', depth: '1', sort: 'handle' })
  const result = await payloadFetch<CreatorItem>(`/creators?${qs}`, {
    next: { tags: ['creators'], revalidate: 300 },
  })
  return (result as { docs: CreatorItem[] })?.docs ?? []
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const qs = new URLSearchParams({ 'where[slug][equals]': slug, limit: '1', depth: '2' })
  const result = await payloadFetch<Page>(`/pages?${qs}`, {
    next: { tags: [`page-${slug}`], revalidate: 300 },
  })
  return (result as { docs: Page[] })?.docs?.[0] ?? null
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getImageUrl(media: MediaItem | null | undefined): string {
  if (!media?.url) return '/images/placeholder.jpg'
  if (media.url.startsWith('http')) return media.url
  return `${API_BASE}${media.url}`
}

export function formatDate(dateString: string, locale = 'it-IT'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}
