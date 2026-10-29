import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/lib/content'
import { getImageUrl } from '@/lib/content'

type Props = {
  author: Author
  variant?: 'card' | 'full'
}

export function AuthorBio({ author, variant = 'card' }: Props) {
  const avatarUrl = getImageUrl(author.avatar)

  if (variant === 'card') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded overflow-hidden flex-shrink-0 bg-surface-subtle">
          <Image
            src={avatarUrl}
            alt={author.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div>
          <Link
            href={`/autore/${author.slug}`}
            className="text-sm font-semibold text-primary hover:text-cta-blue transition-colors"
          >
            {author.name}
          </Link>
        </div>
      </div>
    )
  }

  // Full variant — used in article detail
  return (
    <div className="flex gap-5 p-6 border border-border rounded-xl bg-surface-subtle">
      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-hover">
        <Image
          src={avatarUrl}
          alt={author.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Link
          href={`/autore/${author.slug}`}
          className="font-semibold text-primary hover:text-cta-blue transition-colors"
          style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
        >
          {author.name}
        </Link>
        {author.bio && (
          <p className="text-sm text-primary opacity-70 leading-relaxed">{author.bio}</p>
        )}
        {author.socialLinks && author.socialLinks.length > 0 && (
          <div className="flex gap-3 mt-1">
            {author.socialLinks.map((sl) => (
              <a
                key={sl.url}
                href={sl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cta-blue hover:underline capitalize"
              >
                {sl.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
