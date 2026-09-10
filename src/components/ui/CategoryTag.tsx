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
      className={`
        inline-block border border-text-dark text-primary font-semibold rounded-pill
        hover:bg-primary hover:text-white hover:border-primary
        transition-colors duration-100
        ${size === 'sm' ? 'text-tiny px-2 py-0.5' : 'text-sm px-3 py-1'}
      `}
    >
      {category.name}
    </Link>
  )
}

/** Plain pill without a link, for display purposes */
export function CategoryPill({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`
        inline-block border border-text-dark text-primary font-semibold rounded-pill
        ${size === 'sm' ? 'text-tiny px-2 py-0.5' : 'text-sm px-3 py-1'}
      `}
    >
      {name}
    </span>
  )
}
