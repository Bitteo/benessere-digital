import { notFound } from 'next/navigation'
import { getAuthorBySlug, getArticles } from '@/lib/content'
import { AuthorBio } from '@/components/ui/AuthorBio'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

// Literal: Next segment config cannot import this. Re-checks publishedAt after deploy.
export const revalidate = 300

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
      <section className="section-md">
        <div className="container-md padding-global">
          <AuthorBio author={author} variant="full" />
        </div>
      </section>
      {byAuthor.length > 0 && (
        <section className="section-md bg-surface-subtle">
          <div className="container-lg padding-global">
            <h2 className="mb-6 text-h4">Articoli</h2>
            <div className="flex max-w-3xl flex-col gap-6">
              {byAuthor.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
      <NewsletterBanner />
    </main>
  )
}
