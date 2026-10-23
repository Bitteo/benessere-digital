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
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-surface-subtle">
          <Image src={avatarUrl} alt="" fill className="object-cover" sizes="36px" />
        </div>
        <Link
          href={`/autore/${author.slug}`}
          className="text-base font-semibold text-primary hover:text-accent"
        >
          {author.name}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex gap-5 bg-surface-subtle p-5">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-surface-hover">
        <Image src={avatarUrl} alt="" fill className="object-cover" sizes="64px" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Link
          href={`/autore/${author.slug}`}
          className="text-lg font-semibold text-primary hover:text-accent"
        >
          {author.name}
        </Link>
        {author.bio && <p className="text-base leading-relaxed text-muted">{author.bio}</p>}
        {author.socialLinks && author.socialLinks.length > 0 && (
          <div className="mt-1 flex gap-3">
            {author.socialLinks.map((sl) => (
              <a
                key={sl.url}
                href={sl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold capitalize text-accent hover:text-accent-hover"
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
