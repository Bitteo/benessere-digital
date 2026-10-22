import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/content'
import { getImageUrl, formatDate } from '@/lib/content'

type Props = {
  article: Article
  variant?: 'grid' | 'slider' | 'featured' | 'row'
}

export function ArticleCard({ article }: Props) {
  const imageUrl = getImageUrl(article.featuredImage)
  const primaryAuthor = article.authors?.[0]
  const publishDate = article.publishedAt ? formatDate(article.publishedAt) : null

  return (
    <article>
      <Link
        href={`/articoli/${article.slug}`}
        className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-3"
      >
        <span className="relative aspect-[3/2] overflow-hidden bg-surface-subtle">
          <Image
            src={imageUrl}
            alt={article.featuredImage?.alt ?? ''}
            fill
            className="object-cover"
            sizes="120px"
          />
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-semibold leading-snug text-primary">
            {article.title}
          </span>
          {article.excerpt && (
            <span className="mt-1 line-clamp-2 block text-base leading-relaxed text-muted">
              {article.excerpt}
            </span>
          )}
          {(primaryAuthor || publishDate) && (
            <span className="mt-2 block text-[13px] leading-snug text-muted">
              {primaryAuthor?.name}
              {primaryAuthor && publishDate ? ' · ' : ''}
              {publishDate}
            </span>
          )}
        </span>
      </Link>
    </article>
  )
}
