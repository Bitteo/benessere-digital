import { notFound } from 'next/navigation'
import { getAuthorBySlug, getArticles } from '@/lib/content'
import { AuthorBio } from '@/components/ui/AuthorBio'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [{ slug: 'matteo-foroni' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) return {}
  return {
    title: `${author.name} — Autore`,
    description: author.bio ?? `Articoli di ${author.name} su benessere.digital.`,
    alternates: { canonical: `/autore/${slug}` },
  }
}

export default async function AutorePage({ params }: Props) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) notFound()

  const { docs: byAuthor } = await getArticles({ limit: 24, author: author.slug })

  return (
    <main>
      <section className="section-md border-b border-border">
        <div className="container-md padding-global">
          <p className="text-meta text-primary opacity-50 mb-4">Autore</p>
          <AuthorBio author={author} variant="full" />
        </div>
      </section>
      {byAuthor.length > 0 && (
        <section className="section-md">
          <div className="container-lg padding-global">
            <h2 className="text-h3 mb-8" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
              Articoli
            </h2>
            <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
              {byAuthor.map((article) => (
                <ArticleCard key={article.id} article={article} variant="grid" />
              ))}
            </div>
          </div>
        </section>
      )}
      <NewsletterBanner />
    </main>
  )
}
