import { ArticleCard } from '@/components/ui/ArticleCard'
import { getArticles, getCategories } from '@/lib/content'
import type { Metadata } from 'next'
import Link from 'next/link'

// Literal: Next segment config cannot import this. Re-checks publishedAt after deploy.
export const revalidate = 300

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
        <div className="mb-8 max-w-2xl">
          <h1 className="mb-3 text-h2 sm:text-h3">Articoli</h1>
          <p className="text-lg leading-relaxed text-muted">
            Ricerca evidence-based su benessere digitale, salute mentale online e uso consapevole
            della tecnologia.
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/articoli"
              className={`inline-block rounded-pill px-4 py-1.5 text-base font-semibold transition-colors ${
                !categoria
                  ? 'bg-primary text-white'
                  : 'bg-surface-subtle text-primary hover:bg-surface-hover'
              }`}
            >
              Tutti
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/articoli?categoria=${cat.slug}`}
                className={`inline-block rounded-pill px-4 py-1.5 text-base font-semibold transition-colors ${
                  categoria === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-surface-subtle text-primary hover:bg-surface-hover'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Articles grid */}
        {articles.length > 0 ? (
          <>
            <div className="flex max-w-3xl flex-col gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-2" aria-label="Paginazione articoli">
                {page > 1 && (
                  <Link
                    href={`/articoli?pagina=${page - 1}${categoria ? `&categoria=${categoria}` : ''}`}
                    className="btn-secondary px-5"
                  >
                    ← Precedente
                  </Link>
                )}
                <span className="flex items-center px-4 text-base text-muted">
                  {page} / {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/articoli?pagina=${page + 1}${categoria ? `&categoria=${categoria}` : ''}`}
                    className="btn-secondary px-5"
                  >
                    Successivo →
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg text-muted">
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
