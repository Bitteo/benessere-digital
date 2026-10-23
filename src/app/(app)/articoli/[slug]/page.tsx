import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticles, getImageUrl, formatDate } from '@/lib/content'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { AuthorBio } from '@/components/ui/AuthorBio'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import { ArticleEngagement } from '@/components/analytics/ArticleEngagement'
import { LexicalContent } from '@/components/ui/LexicalContent'
import { ArticleCommunity } from '@/components/article/ArticleCommunity'
import { ArticleFaq } from '@/components/article/ArticleFaq'
import { ArticleSources } from '@/components/article/ArticleSources'
import { JsonLd } from '@/components/article/JsonLd'
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from '@/lib/seo/jsonld'
import { absoluteUrl } from '@/lib/seo/site'
import type { Metadata } from 'next'

// Per request, so a hit before publishedAt cannot cache a permanent 404.
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  const title = article.seo?.metaTitle ?? article.title
  const description = article.seo?.metaDescription ?? article.excerpt ?? ''
  const ogImagePath = getImageUrl(article.seo?.ogImage ?? article.featuredImage)
  const ogImageUrl = absoluteUrl(ogImagePath)
  const canonicalPath = `/articoli/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      images: [{ url: ogImageUrl, alt: article.featuredImage?.alt ?? article.title }],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: article.authors?.map((a) => a.name),
      locale: 'it_IT',
      siteName: 'benessere.digital',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: article.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: canonicalPath },
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
  const updatedDate =
    article.updatedAt && article.publishedAt && article.updatedAt !== article.publishedAt
      ? formatDate(article.updatedAt)
      : article.updatedAt && !article.publishedAt
        ? formatDate(article.updatedAt)
        : null

  const primaryCategory = article.categories?.[0]
  const { docs: relatedArticles } = primaryCategory
    ? await getArticles({ limit: 3, category: primaryCategory.slug })
    : { docs: [] }
  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id).slice(0, 3)

  const articleLd = buildArticleJsonLd({
    article,
    imageUrl,
    sources: article.sources,
  })
  const breadcrumbLd = buildBreadcrumbJsonLd({
    slug: article.slug,
    title: article.title,
    primaryCategory,
  })
  const faqLd = article.faq?.length ? buildFaqJsonLd(article.faq) : null
  const jsonLdBlocks = [articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])]

  return (
    <main>
      <JsonLd data={jsonLdBlocks} />
      <ArticleEngagement />
      <header className="pb-8 pt-10 sm:pb-6 sm:pt-6">
        <div className="article-column">
          <nav
            className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/articoli" className="hover:text-accent">
              Articoli
            </Link>
            {primaryCategory && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={`/categoria/${primaryCategory.slug}`} className="hover:text-accent">
                  {primaryCategory.name}
                </Link>
              </>
            )}
          </nav>

          {article.categories && article.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {article.categories.map((cat) => (
                <CategoryTag key={cat.id} category={cat} />
              ))}
            </div>
          )}

          <div className="article-title-wrap">
            <h1
              className="article-title text-primary"
              style={{
                ['--title-scale' as string]: String(Math.min(2.2, 78 / article.title.length)),
              }}
            >
              {article.title}
            </h1>
          </div>

          {article.excerpt && (
            <p className="mb-5 mt-5 text-[18px] leading-relaxed text-muted">{article.excerpt}</p>
          )}

          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${article.excerpt ? '' : 'mt-5'}`}
          >
            {article.authors && article.authors.length > 0 && (
              <div className="flex items-center gap-4">
                {article.authors.map((author) => (
                  <AuthorBio key={author.id} author={author} variant="card" />
                ))}
              </div>
            )}
            {publishDate && (
              <time dateTime={article.publishedAt} className="text-[13px] text-muted">
                {publishDate}
              </time>
            )}
            {updatedDate && (
              <time dateTime={article.updatedAt} className="text-[13px] text-muted">
                Aggiornato il {updatedDate}
              </time>
            )}
          </div>
        </div>
      </header>

      {article.featuredImage && (
        <div className="relative mx-auto aspect-[2/1] w-full max-w-[1100px] bg-surface-subtle md:aspect-video">
          <Image
            src={imageUrl}
            alt={article.featuredImage.alt ?? article.title}
            fill
            className="object-cover md:object-contain"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <article className="article-column section-md">
        <div className="article-body flex flex-col gap-5 text-primary">
          <LexicalContent
            content={article.content}
            omitFromHeading={article.faq?.length ? 'Domande corte' : undefined}
          />
        </div>
        {article.sources && article.sources.length > 0 ? (
          <ArticleSources sources={article.sources} />
        ) : null}
        {article.faq?.length ? <ArticleFaq faq={article.faq} /> : null}
        <ArticleCommunity />
      </article>

      {article.authors && article.authors.length > 0 && (
        <div className="article-column pb-12">
          <div className="flex flex-col gap-4">
            {article.authors.map((author) => (
              <AuthorBio key={author.id} author={author} variant="full" />
            ))}
          </div>
        </div>
      )}

      {filteredRelated.length > 0 && (
        <section className="section-md bg-surface-subtle" aria-label="Articoli correlati">
          <div className="container-md padding-global">
            <h2 className="mb-6 text-h4">Articoli correlati</h2>
            <div className="flex flex-col gap-6">
              {filteredRelated.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterBanner />
    </main>
  )
}
