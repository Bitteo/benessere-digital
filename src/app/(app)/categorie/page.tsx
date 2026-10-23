import Link from 'next/link'
import { getCategories } from '@/lib/content'
import { mergeCategories } from '@/lib/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categorie — Benessere Digitale',
  description: 'Esplora tutti i temi del benessere digitale: schermo, salute mentale, social media, sicurezza online.',
  alternates: { canonical: '/categorie' },
}

export default async function CategoriesPage() {
  const categories = mergeCategories(await getCategories())

  return (
    <main>
      <div className="container-lg padding-global section-md">
        <div className="mb-10">
          <p className="text-meta text-primary opacity-50 mb-2">Esplora</p>
          <h1
            className="text-h1 sm:text-h2"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Categorie
          </h1>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="flex flex-col gap-3 p-6 border border-border rounded-xl hover-lift"
              >
                <h2
                  className="text-h5"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-sm text-primary opacity-60 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                )}
                <span className="text-sm font-semibold text-cta-blue mt-auto">
                  Esplora →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-md text-primary opacity-40 py-16 text-center">
            Nessuna categoria disponibile.
          </p>
        )}
      </div>
    </main>
  )
}
