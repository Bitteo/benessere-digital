import Link from 'next/link'
import { getCategories } from '@/lib/content'
import { mergeCategories } from '@/lib/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categorie — Benessere Digitale',
  description:
    'Esplora tutti i temi del benessere digitale: schermo, salute mentale, social media, sicurezza online.',
  alternates: { canonical: '/categorie' },
}

export default async function CategoriesPage() {
  const categories = mergeCategories(await getCategories())

  return (
    <main>
      <div className="container-nav padding-global section-md">
        <h1 className="mb-8 text-h2 sm:text-h3">Categorie</h1>

        {categories.length > 0 ? (
          <ul className="flex max-w-3xl flex-col">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="group grid grid-cols-[minmax(12rem,16rem)_1fr] items-baseline gap-8 py-3.5 md:grid-cols-1 md:gap-1"
                >
                  <span className="text-xl font-semibold tracking-tight group-hover:text-accent">
                    {cat.name}
                  </span>
                  {cat.description && (
                    <span className="text-base leading-relaxed text-muted">{cat.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-16 text-lg text-muted">Nessuna categoria disponibile.</p>
        )}
      </div>
    </main>
  )
}
