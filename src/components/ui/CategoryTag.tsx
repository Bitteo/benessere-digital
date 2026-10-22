import Link from 'next/link'
import type { Category } from '@/lib/content'

type Props = {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryTag({ category }: Props) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="text-[13px] font-semibold text-accent hover:text-accent-hover"
    >
      {category.name}
    </Link>
  )
}

export function CategoryPill({ name }: { name: string; size?: 'sm' | 'md' }) {
  return <span className="text-[13px] font-semibold text-accent">{name}</span>
}
