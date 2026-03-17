import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticles, getImageUrl, formatDate } from '@/lib/payload'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { AuthorBio } from '@/components/ui/AuthorBio'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  const title = article.seo?.metaTitle ?? article.title
  const description = article.seo?.metaDescription ?? article.excerpt ?? ''
  const ogImageUrl = getImageUrl(article.seo?.ogImage ?? article.featuredImage)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl }],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.authors?.map((a) => a.name),
    },
    robots: article.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/articoli/${slug}` },
  }
}

export async function generateStaticParams() {
  const { docs } = await getArticles({ limit: 100 })
  return docs.map((a) => ({ slug: a.slug }))
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const imageUrl = getImageUrl(article.featuredImage)
  const publishDate = article.publishedAt ? formatDate(article.publishedAt) : null

  // Related articles — same category, excluding current
  const primaryCategory = article.categories?.[0]
  const { docs: relatedArticles } = primaryCategory
    ? await getArticles({ limit: 3, category: primaryCategory.slug })
    : { docs: [] }
  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <main>
      {/* Article header */}
      <header className="section-md border-b border-border">
        <div className="container-md padding-global">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-tiny text-primary opacity-50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:opacity-80">Home</Link>
            <span>/</span>
            <Link href="/articoli" className="hover:opacity-80">Articoli</Link>
            {primaryCategory && (
              <>
                <span>/</span>
                <Link href={`/categoria/${primaryCategory.slug}`} className="hover:opacity-80">
                  {primaryCategory.name}
                </Link>
              </>
            )}
          </nav>

          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((cat) => (
                <CategoryTag key={cat.id} category={cat} />
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="text-h1 sm:text-h2 mb-6 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-md text-primary opacity-70 leading-relaxed mb-6 max-w-2xl">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-6 flex-wrap border-t border-border pt-6">
            {article.authors && article.authors.length > 0 && (
              <div className="flex items-center gap-4">
                {article.authors.map((author) => (
                  <AuthorBio key={author.id} author={author} variant="card" />
                ))}
              </div>
            )}
            {publishDate && (
              <time
                dateTime={article.publishedAt}
                className="text-sm text-primary opacity-60"
              >
                {publishDate}
              </time>
            )}
          </div>
        </div>
      </header>

      {/* Featured image */}
      {article.featuredImage && (
        <div className="relative w-full" style={{ height: '30rem' }}>
          <Image
            src={imageUrl}
            alt={article.featuredImage.alt ?? article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Article body */}
      <article className="container-md padding-global section-md">
        {/* Rich text content — TODO: integrate Lexical renderer when available */}
        <div className="prose prose-lg max-w-none text-primary">
          {!article.content && (
            <p className="text-primary opacity-50 italic">Contenuto in fase di pubblicazione…</p>
          )}
        </div>
      </article>

      {/* Author bios */}
      {article.authors && article.authors.length > 0 && (
        <div className="container-md padding-global pb-12">
          <h2 className="text-meta mb-4 text-primary opacity-50">Autore</h2>
          <div className="flex flex-col gap-4">
            {article.authors.map((author) => (
              <AuthorBio key={author.id} author={author} variant="full" />
            ))}
          </div>
        </div>
      )}

      {/* Related articles */}
      {filteredRelated.length > 0 && (
        <section className="section-md border-t border-border" aria-label="Articoli correlati">
          <div className="container-lg padding-global">
            <h2
              className="text-h3 mb-8"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              Articoli correlati
            </h2>
            <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
              {filteredRelated.map((a) => (
                <ArticleCard key={a.id} article={a} variant="grid" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterBanner />
    </main>
  )
}
