import Image from 'next/image'
import Link from 'next/link'
import type { AppItem, BookItem, CreatorItem } from '@/lib/content'
import { getImageUrl } from '@/lib/content'

const videos = [
  { title: 'Che cosa è il digital detox secondo Fedez ft. Willwoosh', id: 'Xus4ihr2O0s' },
  { title: '30 giorni senza social media', id: 'rZJ9vMF9l14' },
  { title: 'Digital Detox: Come disintossicarsi dalla tecnologia', id: 'P5LspDIWO0E' },
  { title: "Rimanere umani nell'era digitale | Digital Wellbeing", id: '1ImeSWuFYE8' },
  { title: 'Come riprendere in mano la tua vita: dopamine detox', id: 'bo9q6-EeMF4' },
  { title: 'Come non impazzire sui social media (minimalismo digitale)', id: 'BP0KinHOjrA' },
]

export function CreatorsStrip({ creators }: { creators: CreatorItem[] }) {
  if (creators.length === 0) return null

  return (
    <section id="profili" className="section-md border-b border-border scroll-mt-24">
      <div className="container-lg padding-global">
        <h2 className="text-h2 sm:text-h3 mb-8" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          <span className="text-pixel">Creators</span> del benessere
        </h2>
        <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {creators.map((creator) => {
            const primary = creator.platforms?.find((p) => p.url) ?? creator.platforms?.[0]
            const href = primary?.url || '#'
            return (
              <a
                key={creator.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col gap-3 p-6 border border-border rounded-xl hover-lift"
              >
                <p className="text-h5" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  {creator.handle}
                </p>
                {creator.name && (
                  <p className="text-sm text-primary opacity-70">{creator.name}</p>
                )}
                {creator.bio && (
                  <p className="text-sm text-primary opacity-60 leading-relaxed">{creator.bio}</p>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function VideosStrip() {
  return (
    <section id="video" className="section-md border-b border-border scroll-mt-24">
      <div className="container-lg padding-global">
        <h2 className="text-h2 sm:text-h3 mb-8" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          <span className="text-pixel">Video</span> per ispirarti
        </h2>
        <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-border rounded-xl overflow-hidden hover-lift bg-white"
            >
              <div className="relative aspect-video bg-surface-subtle">
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="p-4 text-sm font-semibold leading-snug group-hover:text-cta-blue">
                {video.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PodcastsStrip() {
  return (
    <section id="podcast" className="section-md border-b border-border scroll-mt-24">
      <div className="container-lg padding-global">
        <h2 className="text-h2 sm:text-h3 mb-4" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          Podcast sul benessere <span className="text-pixel">digitale</span>
        </h2>
        <p className="text-md text-primary opacity-60 max-w-2xl mb-6">
          Episodi in arrivo. Iscriviti alla newsletter per ricevere i prossimi approfondimenti da ascoltare.
        </p>
        <Link href="/newsletter" className="btn-primary inline-flex">
          Iscriviti alla newsletter
        </Link>
      </div>
    </section>
  )
}

export function AppsStrip({ apps }: { apps: AppItem[] }) {
  if (apps.length === 0) return null

  return (
    <section id="app" className="section-md border-b border-border scroll-mt-24">
      <div className="container-lg padding-global">
        <h2 className="text-h2 sm:text-h3 mb-8" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          App per <span className="text-pixel">disconnetterti</span>
        </h2>
        <div className="grid grid-cols-5 lg:grid-cols-3 sm:grid-cols-1 gap-4">
          {apps.map((app) => {
            const href = app.appStoreUrl || app.playStoreUrl || '#'
            const icon = getImageUrl(app.icon)
            return (
              <a
                key={app.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-start gap-3 p-5 border border-border rounded-xl hover-lift"
              >
                <div className="relative w-14 h-14 rounded-md overflow-hidden bg-surface-subtle">
                  <Image src={icon} alt={app.name} fill className="object-cover" sizes="56px" />
                </div>
                <p className="font-semibold" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  {app.name}
                </p>
                {app.useCase && (
                  <p className="text-tiny text-primary opacity-50 uppercase tracking-wide">{app.useCase}</p>
                )}
                <p className="text-sm text-primary opacity-60 leading-relaxed line-clamp-3">
                  {app.description}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function BooksStrip({ books }: { books: BookItem[] }) {
  if (books.length === 0) return null

  return (
    <section id="libri" className="section-md border-b border-border scroll-mt-24">
      <div className="container-lg padding-global">
        <h2 className="text-h2 sm:text-h3 mb-8" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          Libri per il benessere <span className="text-pixel">digitale</span>
        </h2>
        <div className="grid grid-cols-5 lg:grid-cols-3 sm:grid-cols-1 gap-4">
          {books.map((book) => {
            const href = book.buyUrl || '#'
            const cover = getImageUrl(book.coverImage)
            return (
              <a
                key={book.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col gap-3 hover-lift"
              >
                <div className="relative aspect-[3/4] border border-border rounded-md overflow-hidden bg-surface-subtle">
                  <Image src={cover} alt={book.title} fill className="object-cover" sizes="20vw" />
                </div>
                <p className="font-semibold leading-snug" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  {book.title}
                </p>
                <p className="text-sm text-primary opacity-60">{book.author}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
