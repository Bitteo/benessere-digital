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
      <article className="hover-lift group flex gap-8 overflow-hidden rounded-xl border border-border bg-white md:flex-col">
        {/* Image */}
        <Link
          href={`/articoli/${article.slug}`}
          className="relative min-h-[22rem] flex-1 overflow-hidden md:aspect-[16/9] md:min-h-0"
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
        <div className="flex flex-1 flex-col justify-center gap-4 p-8 md:gap-3 md:p-5 sm:p-4">
          {primaryCategory && <CategoryTag category={primaryCategory} />}
          <h2
            className="text-h3 leading-tight md:text-h4"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            <Link
              href={`/articoli/${article.slug}`}
              className="text-primary transition-colors hover:text-cta-blue"
            >
              {article.title}
            </Link>
          </h2>
          {article.excerpt && (
            <p className="line-clamp-3 text-base leading-relaxed text-primary opacity-70">
              {article.excerpt}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-sm text-primary opacity-60">
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
      <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-md border border-border bg-white">
        {/* Image */}
        <Link
          href={`/articoli/${article.slug}`}
          className="relative flex-shrink-0 overflow-hidden"
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
          className="flex flex-col gap-3 border-b border-l border-r border-border p-8 pb-4 pt-8"
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
              className="text-primary transition-colors hover:text-cta-blue"
            >
              {article.title}
            </Link>
          </h3>

          <Link
            href={`/articoli/${article.slug}`}
            className="mt-auto text-sm font-semibold text-primary transition-colors hover:text-cta-blue"
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
    <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-md border border-border bg-white">
      {/* Image */}
      <Link
        href={`/articoli/${article.slug}`}
        className="relative flex-shrink-0 overflow-hidden"
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
      <div className="flex flex-1 flex-col gap-2.5 px-6 pb-6 pt-2">
        <div className="mt-1 flex items-center justify-between gap-2">
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
            className="text-primary transition-colors hover:text-cta-blue"
          >
            {article.title}
          </Link>
        </h3>

        {article.excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-primary opacity-70">
            {article.excerpt}
          </p>
        )}

        {(primaryAuthor || publishDate) && (
          <div className="mt-auto flex items-center gap-2 pt-2 text-tiny text-primary opacity-60">
            {primaryAuthor && <span className="font-medium">{primaryAuthor.name}</span>}
          </div>
        )}
      </div>
    </article>
  )
}
