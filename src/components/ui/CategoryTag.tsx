import Link from 'next/link'
import type { Category } from '@/lib/content'

type Props = {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryTag({ category, size = 'md' }: Props) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className={`inline-block w-fit rounded-pill border border-text-dark font-semibold text-primary transition-colors duration-100 hover:border-primary hover:bg-primary hover:text-white ${size === 'sm' ? 'px-2 py-0.5 text-tiny' : 'px-3 py-1 text-sm'} `}
    >
      {category.name}
    </Link>
  )
}

/** Plain pill without a link, for display purposes */
export function CategoryPill({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`inline-block w-fit rounded-pill border border-text-dark font-semibold text-primary ${size === 'sm' ? 'px-2 py-0.5 text-tiny' : 'px-3 py-1 text-sm'} `}
    >
      {name}
    </span>
  )
}
