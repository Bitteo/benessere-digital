import { ArticleCard } from '@/components/ui/ArticleCard'
import { getArticles, getCategories } from '@/lib/payload'
import { CategoryTag } from '@/components/ui/CategoryTag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articoli sul Benessere Digitale',
  description:
    'Sfoglia tutti gli articoli su gestione dello schermo, salute mentale digitale, social media e sicurezza online.',
  alternates: { canonical: '/articoli' },
}

type Props = {
  searchParams: Promise<{ pagina?: string; categoria?: string }>
}

export default async function ArticoliPage({ searchParams }: Props) {
  const { pagina, categoria } = await searchParams
  const page = Number(pagina) || 1

  const [{ docs: articles, totalPages }, categories] = await Promise.all([
    getArticles({ page, limit: 12, category: categoria }),
    getCategories(),
  ])

  return (
    <main>
      <div className="container-lg padding-global section-md">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-meta text-primary opacity-50 mb-2">Approfondimenti</p>
          <h1
            className="text-h1 sm:text-h2 mb-4"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Articoli
          </h1>
          <p className="text-md text-primary opacity-60 max-w-xl">
            Ricerca evidence-based su benessere digitale, salute mentale online e uso consapevole della tecnologia.
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <a
              href="/articoli"
              className={`inline-block px-4 py-1.5 rounded-pill text-sm font-semibold transition-colors ${
                !categoria
                  ? 'bg-primary text-white'
                  : 'border border-border text-primary hover:bg-surface-hover'
              }`}
            >
              Tutti
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/articoli?categoria=${cat.slug}`}
                className={`inline-block px-4 py-1.5 rounded-pill text-sm font-semibold transition-colors ${
                  categoria === cat.slug
                    ? 'bg-primary text-white'
                    : 'border border-border text-primary hover:bg-surface-hover'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        )}

        {/* Articles grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="grid" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="flex justify-center gap-2 mt-12"
                aria-label="Paginazione articoli"
              >
                {page > 1 && (
                  <a
                    href={`/articoli?pagina=${page - 1}${categoria ? `&categoria=${categoria}` : ''}`}
                    className="btn-secondary px-5"
                  >
                    ← Precedente
                  </a>
                )}
                <span className="flex items-center px-4 text-sm text-primary opacity-60">
                  {page} / {totalPages}
                </span>
                {page < totalPages && (
                  <a
                    href={`/articoli?pagina=${page + 1}${categoria ? `&categoria=${categoria}` : ''}`}
                    className="btn-secondary px-5"
                  >
                    Successivo →
                  </a>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-md text-primary opacity-40">
              {categoria
                ? 'Nessun articolo trovato per questa categoria.'
                : 'Nessun articolo pubblicato ancora. Torna presto!'}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
