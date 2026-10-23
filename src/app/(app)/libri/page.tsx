import Image from 'next/image'
import type { Metadata } from 'next'
import { HubFrame } from '@/components/hubs/HubFrame'
import { getBooks, getImageUrl } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Libri sul benessere digitale',
  description:
    'Libri per genitori, educatori e chi vuole un rapporto più consapevole con telefono, social e attenzione.',
  alternates: { canonical: '/libri' },
}

export default async function LibriPage() {
  const books = await getBooks()

  return (
    <HubFrame
      title={
        <>
          Libri per il benessere <span className="text-pixel">digitale</span>
        </>
      }
      lede="Letture per capire il tempo sullo schermo, la dopamina e le abitudini che si possono cambiare."
    >
      <ul className="flex max-w-3xl flex-col">
        {books.map((book) => {
          const href = book.buyUrl || '#'
          const cover = getImageUrl(book.coverImage)
          return (
            <li key={book.id} className="py-4">
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4"
              >
                <span className="relative h-28 w-20 shrink-0 overflow-hidden bg-surface-subtle">
                  <Image src={cover} alt="" fill className="object-cover" sizes="80px" />
                </span>
                <span>
                  <span className="block text-xl font-semibold leading-snug hover:text-accent">
                    {book.title}
                  </span>
                  <span className="mt-1 block text-base text-muted">{book.author}</span>
                  {book.description && (
                    <span className="mt-2 block text-base leading-relaxed text-muted">
                      {book.description}
                    </span>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </HubFrame>
  )
}
