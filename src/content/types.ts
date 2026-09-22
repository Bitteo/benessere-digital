export type ArticleStatus = 'draft' | 'published'

export type ArticleSource = {
  slug: string
  title: string
  excerpt: string
  cover: string
  coverAlt: string
  /** Omit or leave unset on drafts; public listings only use published dates. */
  publishedAt?: string
  authorSlugs: string[]
  categorySlugs: string[]
  readingTime?: number
  status: ArticleStatus
  seo?: {
    metaTitle?: string
    metaDescription?: string
    noIndex?: boolean
  }
  content: unknown
}

export type CategorySource = {
  slug: string
  name: string
  description: string
}

export type AuthorSource = {
  slug: string
  name: string
  bio: string
  avatar?: string
  socialLinks?: Array<{ platform: string; url: string }>
}

export type AppSource = {
  slug: string
  name: string
  description: string
  useCase?: string
  appStoreUrl?: string
  playStoreUrl?: string
  icon: string
  featured?: boolean
}

export type BookSource = {
  slug: string
  title: string
  author: string
  description?: string
  buyUrl?: string
  cover: string
  featured?: boolean
}

export type CreatorPlatform =
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'threads'
  | 'x'
  | 'youtube'
  | 'website'

export type CreatorSource = {
  slug: string
  handle: string
  name?: string
  bio?: string
  /** Path under /public, e.g. /images/creators/slug.jpg */
  avatar?: string
  platforms?: Array<{ platform: CreatorPlatform; url: string }>
  featured?: boolean
}
