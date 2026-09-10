import type { Category } from '@/lib/payload'

/** UX tabs on the homepage + seed taxonomy. Always safe to render even if CMS is empty. */
export const KNOWN_CATEGORIES: Array<Pick<Category, 'slug' | 'name' | 'description'>> = [
  {
    name: 'Schermo e tempo',
    slug: 'schermo-e-tempo',
    description: 'Gestione del tempo sullo schermo per giovani e famiglie.',
  },
  {
    name: 'Salute mentale',
    slug: 'salute-mentale',
    description: 'Impatto del digitale sul benessere psicologico.',
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    description: 'Uso consapevole delle piattaforme social.',
  },
  {
    name: 'Sicurezza online',
    slug: 'sicurezza-online',
    description: 'Privacy, cyberbullismo e sicurezza per i giovani.',
  },
  {
    name: 'Genitori e scuola',
    slug: 'genitori-e-scuola',
    description: 'Risorse per genitori ed educatori.',
  },
  {
    name: 'App e strumenti',
    slug: 'app-e-strumenti',
    description: 'Le migliori app per il benessere digitale.',
  },
  {
    name: 'Benessere Digitale',
    slug: 'benessere-digitale',
    description: "Articoli sul benessere digitale e la salute mentale nell'era tecnologica.",
  },
  {
    name: 'Digital Detox',
    slug: 'digital-detox',
    description: "Strategie e guide per ridurre l'uso della tecnologia e ritrovare l'equilibrio.",
  },
  {
    name: 'Digital Wellness',
    slug: 'digital-wellness',
    description: 'Approcci e pratiche per un uso consapevole e sano della tecnologia.',
  },
  {
    name: 'Mental Health',
    slug: 'mental-health',
    description: "L'impatto della tecnologia sulla salute mentale e come gestirlo.",
  },
  {
    name: 'Famiglia e Tecnologia',
    slug: 'famiglia-tecnologia',
    description: "Consigli per gestire l'uso della tecnologia in famiglia e con i figli.",
  },
]

export function fallbackCategory(slug: string): Category | null {
  const known = KNOWN_CATEGORIES.find((item) => item.slug === slug)
  if (!known) return null
  return {
    id: `fallback-${known.slug}`,
    name: known.name,
    slug: known.slug,
    description: known.description,
  }
}

export function mergeCategories(fromCms: Category[]): Category[] {
  const bySlug = new Map(fromCms.map((item) => [item.slug, item]))
  for (const known of KNOWN_CATEGORIES) {
    if (!bySlug.has(known.slug)) {
      bySlug.set(known.slug, {
        id: `fallback-${known.slug}`,
        name: known.name,
        slug: known.slug,
        description: known.description,
      })
    }
  }
  return Array.from(bySlug.values())
}
