import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getArticles } from '@/lib/payload'
import { fallbackCategory, KNOWN_CATEGORIES } from '@/lib/categories'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ pagina?: string }>
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // Never hit Payload here: a 5xx from /api/categories fails the whole page as HTTP 500.
  const category = fallbackCategory(slug)
  if (!category) return {}

  return {
    title: `${category.name} — Articoli sul Benessere Digitale`,
    description: category.description ?? `Tutti gli articoli nella categoria ${category.name}.`,
    alternates: { canonical: `/categoria/${slug}` },
  }
}

export async function generateStaticParams() {
  return KNOWN_CATEGORIES.map((category) => ({ slug: category.slug }))
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { pagina } = await searchParams
  const page = Number(pagina) || 1

  const category = fallbackCategory(slug) ?? (await getCategoryBySlug(slug).catch(() => null))
  let articles: Awaited<ReturnType<typeof getArticles>>['docs'] = []
  let totalPages = 0

  try {
    const list = await getArticles({ page, limit: 12, category: slug })
    articles = Array.isArray(list.docs) ? list.docs : []
    totalPages = list.totalPages || 0
  } catch {
    // CMS down or invalid filter: still render the known tab, never 500
  }

  if (!category) notFound()

  return (
    <main>
      <div className="container-lg padding-global section-md">
        <nav className="flex items-center gap-2 text-tiny text-primary opacity-50 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <span>/</span>
          <Link href="/categorie" className="hover:opacity-80">Categorie</Link>
          <span>/</span>
          <span className="opacity-100">{category.name}</span>
        </nav>

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

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="grid" />
              ))}
            </div>

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
