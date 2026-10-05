export type ArticleStatus = 'draft' | 'published'

/** External or institutional source shown in the Fonti box and available for citations. */
export type ArticleSourceRef = {
  title: string
  url?: string
  note?: string
}

export type ArticleFaqItem = {
  question: string
  answer: string
}

export type ArticleSource = {
  slug: string
  title: string
  excerpt: string
  cover: string
  coverAlt: string
  /** ISO-8601 with offset or Z. Public surfaces require status published and this instant <= now. */
  publishedAt?: string
  /** ISO-8601. When set, shown as "Aggiornato il" and used as sitemap lastModified. */
  updatedAt?: string
  authorSlugs: string[]
  categorySlugs: string[]
  readingTime?: number
  status: ArticleStatus
  /** Structured sources for the Fonti section. Optional; do not invent for legacy articles. */
  sources?: ArticleSourceRef[]
  /** Structured FAQ for visible Q&A + FAQPage JSON-LD. Optional. */
  faq?: ArticleFaqItem[]
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
