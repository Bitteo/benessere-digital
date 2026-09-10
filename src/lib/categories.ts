import type { Category } from '@/lib/content'
import { categories } from '@/content/catalog'

/** UX tabs on the homepage + published taxonomy. */
export const KNOWN_CATEGORIES: Array<Pick<Category, 'slug' | 'name' | 'description'>> = categories

export function fallbackCategory(slug: string): Category | null {
  const known = KNOWN_CATEGORIES.find((item) => item.slug === slug)
  if (!known) return null
  return {
    id: known.slug,
    name: known.name,
    slug: known.slug,
    description: known.description,
  }
}

export function mergeCategories(fromCatalog: Category[]): Category[] {
  const bySlug = new Map(fromCatalog.map((item) => [item.slug, item]))
  for (const known of KNOWN_CATEGORIES) {
    if (!bySlug.has(known.slug)) {
      bySlug.set(known.slug, {
        id: known.slug,
        name: known.name,
        slug: known.slug,
        description: known.description,
      })
    }
  }
  return Array.from(bySlug.values())
}
