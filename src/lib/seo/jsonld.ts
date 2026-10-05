import type { Article, Author, Category } from '@/lib/content'
import { absoluteUrl, CANONICAL_ORIGIN } from '@/lib/seo/site'

type FaqItem = { question: string; answer: string }

type SourceRef = { title: string; url?: string; note?: string }

export function buildArticleJsonLd(params: {
  article: Article
  imageUrl: string
  sources?: SourceRef[]
}): Record<string, unknown> {
  const { article, imageUrl, sources } = params
  const pageUrl = absoluteUrl(`/articoli/${article.slug}`)
  const imageAbs = absoluteUrl(imageUrl)

  const authors =
    article.authors?.map((author: Author) => ({
      '@type': 'Person',
      name: author.name,
      url: absoluteUrl(`/autore/${author.slug}`),
    })) ?? []

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? article.seo?.metaDescription ?? undefined,
    image: [imageAbs],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    author: authors.length === 1 ? authors[0] : authors,
    publisher: {
      '@type': 'Organization',
      name: 'benessere.digital',
      url: CANONICAL_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/benessere.digital-webclip.png'),
      },
    },
    inLanguage: 'it-IT',
    isAccessibleForFree: true,
  }

  if (sources?.length) {
    jsonLd.citation = sources.map((source) =>
      source.url
        ? { '@type': 'CreativeWork', name: source.title, url: source.url }
        : { '@type': 'CreativeWork', name: source.title },
    )
  }

  return jsonLd
}

export function buildBreadcrumbJsonLd(params: {
  slug: string
  title: string
  primaryCategory?: Category | null
}): Record<string, unknown> {
  const { slug, title, primaryCategory } = params
  const items: Array<{ '@type': 'ListItem'; position: number; name: string; item: string }> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Articoli', item: absoluteUrl('/articoli') },
  ]

  if (primaryCategory) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: primaryCategory.name,
      item: absoluteUrl(`/categoria/${primaryCategory.slug}`),
    })
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: title,
      item: absoluteUrl(`/articoli/${slug}`),
    })
  } else {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: title,
      item: absoluteUrl(`/articoli/${slug}`),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

export function buildFaqJsonLd(faq: FaqItem[]): Record<string, unknown> | null {
  if (!faq.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
