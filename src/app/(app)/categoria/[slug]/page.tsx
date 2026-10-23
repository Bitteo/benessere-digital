import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getArticles } from '@/lib/content'
import { fallbackCategory, KNOWN_CATEGORIES } from '@/lib/categories'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ pagina?: string }>
}

export const dynamicParams = true
// Literal: Next segment config cannot import this. Re-checks publishedAt after deploy.
export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = fallbackCategory(slug) ?? (await getCategoryBySlug(slug))
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

  const category = fallbackCategory(slug) ?? (await getCategoryBySlug(slug))
  if (!category) notFound()

  const list = await getArticles({ page, limit: 12, category: slug })
  const articles = list.docs
  const totalPages = list.totalPages

  return (
    <main>
      <div className="container-lg padding-global section-md">
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/categorie" className="hover:text-accent">
            Categorie
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary">{category.name}</span>
        </nav>

        <div className="mb-8 max-w-2xl">
          <h1 className="mb-3 text-h2 sm:text-h3">{category.name}</h1>
          {category.description && (
            <p className="text-lg leading-relaxed text-muted">{category.description}</p>
          )}
        </div>

        {articles.length > 0 ? (
          <>
            <div className="flex max-w-3xl flex-col gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-2" aria-label="Paginazione">
                {page > 1 && (
                  <a href={`/categoria/${slug}?pagina=${page - 1}`} className="btn-secondary px-5">
                    ← Precedente
                  </a>
                )}
                <span className="flex items-center px-4 text-base text-muted">
                  {page} / {totalPages}
                </span>
                {page < totalPages && (
                  <a href={`/categoria/${slug}?pagina=${page + 1}`} className="btn-secondary px-5">
                    Successivo →
                  </a>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg text-muted">
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
