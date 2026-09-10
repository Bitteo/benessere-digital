import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/content'
import { getImageUrl, formatDate } from '@/lib/content'
import { CategoryTag } from './CategoryTag'

type Props = {
  article: Article
  variant?: 'grid' | 'slider' | 'featured'
}

export function ArticleCard({ article, variant = 'grid' }: Props) {
  const imageUrl = getImageUrl(article.featuredImage)
  const primaryCategory = article.categories?.[0]
  const primaryAuthor = article.authors?.[0]
  const publishDate = article.publishedAt ? formatDate(article.publishedAt) : null

  if (variant === 'featured') {
    return (
      <article className="group flex md:flex-col gap-8 border border-border rounded-xl overflow-hidden hover-lift bg-white">
        {/* Image */}
        <Link
          href={`/articoli/${article.slug}`}
          className="relative flex-1 overflow-hidden"
          style={{ minHeight: '22rem' }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={imageUrl}
            alt={article.featuredImage?.alt ?? article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center gap-4 p-8 md:p-6">
          {primaryCategory && <CategoryTag category={primaryCategory} />}
          <h2
            className="text-h3 md:text-h4 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            <Link
              href={`/articoli/${article.slug}`}
              className="text-primary hover:text-cta-blue transition-colors"
            >
              {article.title}
            </Link>
          </h2>
          {article.excerpt && (
            <p className="text-base text-primary opacity-70 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm text-primary opacity-60 mt-2">
            {primaryAuthor && <span>{primaryAuthor.name}</span>}
            {primaryAuthor && publishDate && <span>·</span>}
            {publishDate && <time dateTime={article.publishedAt}>{publishDate}</time>}
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'slider') {
    return (
      <article className="group flex flex-col border border-border rounded-md overflow-hidden hover-lift bg-white h-full">
        {/* Image */}
        <Link
          href={`/articoli/${article.slug}`}
          className="relative overflow-hidden flex-shrink-0"
          style={{ height: '20rem' }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={imageUrl}
            alt={article.featuredImage?.alt ?? article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.15]"
            sizes="33vw"
          />
        </Link>

        {/* Content */}
        <div
          className="flex flex-col gap-3 p-8 pt-8 pb-4 border-l border-r border-b border-border"
          style={{
            background: '#fafbfc',
            borderRadius: '0 0 0.5rem 0.5rem',
            minHeight: '12.5rem',
          }}
        >
          <div className="flex items-center justify-between gap-2">
            {primaryCategory && <CategoryTag category={primaryCategory} size="sm" />}
            {publishDate && (
              <time
                dateTime={article.publishedAt}
                className="text-tiny font-semibold text-primary"
                style={{ opacity: 0.6 }}
              >
                {publishDate}
              </time>
            )}
          </div>

          <h3
            className="text-base font-semibold leading-snug"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            <Link
              href={`/articoli/${article.slug}`}
              className="text-primary hover:text-cta-blue transition-colors"
            >
              {article.title}
            </Link>
          </h3>

          <Link
            href={`/articoli/${article.slug}`}
            className="mt-auto text-sm font-semibold text-primary hover:text-cta-blue transition-colors"
            style={{ fontSize: '0.875rem', fontWeight: 600 }}
          >
            Leggi articolo →
          </Link>
        </div>
      </article>
    )
  }

  // Default: grid variant
  return (
    <article className="group flex flex-col border border-border rounded-md overflow-hidden hover-lift bg-white h-full">
      {/* Image */}
      <Link
        href={`/articoli/${article.slug}`}
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: '3 / 2' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageUrl}
          alt={article.featuredImage?.alt ?? article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2.5 px-6 pt-2 pb-6 flex-1">
        <div className="flex items-center justify-between gap-2 mt-1">
          {primaryCategory && <CategoryTag category={primaryCategory} size="sm" />}
          {publishDate && (
            <time
              dateTime={article.publishedAt}
              className="text-tiny font-semibold text-primary"
              style={{ opacity: 0.6 }}
            >
              {publishDate}
            </time>
          )}
        </div>

        <h3
          className="font-semibold leading-snug text-base"
          style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
        >
          <Link
            href={`/articoli/${article.slug}`}
            className="text-primary hover:text-cta-blue transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        {article.excerpt && (
          <p className="text-sm text-primary opacity-70 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {(primaryAuthor || publishDate) && (
          <div className="flex items-center gap-2 text-tiny text-primary opacity-60 mt-auto pt-2">
            {primaryAuthor && <span className="font-medium">{primaryAuthor.name}</span>}
          </div>
        )}
      </div>
    </article>
  )
}
