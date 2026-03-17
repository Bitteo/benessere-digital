import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getArticles, getCategories } from '@/lib/payload'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ pagina?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return {}

  return {
    title: `${category.name} — Articoli sul Benessere Digitale`,
    description: category.description ?? `Tutti gli articoli nella categoria ${category.name}.`,
    alternates: { canonical: `/categoria/${slug}` },
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { pagina } = await searchParams
  const page = Number(pagina) || 1

  const [category, { docs: articles, totalPages }] = await Promise.all([
    getCategoryBySlug(slug),
    getArticles({ page, limit: 12, category: slug }),
  ])

  if (!category) notFound()

  return (
    <main>
      <div className="container-lg padding-global section-md">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-tiny text-primary opacity-50 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <span>/</span>
          <Link href="/categorie" className="hover:opacity-80">Categorie</Link>
          <span>/</span>
          <span className="opacity-100">{category.name}</span>
        </nav>

        {/* Page header */}
        <div className="mb-10 pb-10 border-b border-border">
          <p className="text-meta text-primary opacity-50 mb-2">Categoria</p>
          <h1
            className="text-h1 sm:text-h2 mb-4"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p className="text-md text-primary opacity-60 max-w-xl">{category.description}</p>
          )}
        </div>

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
                aria-label="Paginazione"
              >
                {page > 1 && (
                  <a
                    href={`/categoria/${slug}?pagina=${page - 1}`}
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
                    href={`/categoria/${slug}?pagina=${page + 1}`}
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
              Nessun articolo pubblicato in questa categoria ancora.
            </p>
            <Link href="/articoli" className="btn-primary mt-6 inline-flex">
              Tutti gli articoli
            </Link>
          </div>
        )}
      </div>

      <NewsletterBanner />
    </main>
  )
}
