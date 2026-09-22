import Image from 'next/image'
import type { AppItem, BookItem, CreatorItem } from '@/lib/content'
import { getImageUrl } from '@/lib/content'
import { CreatorsGrid } from '@/components/creators/CreatorsGrid'
import { podcastEpisodes, podcastShow, type PodcastEmbed } from '@/content/podcasts'

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
    <section id="profili" className="section-md scroll-mt-24 overflow-x-hidden border-b border-border">
      <div className="container-lg padding-global min-w-0">
        <h2 className="mb-8 text-h2 sm:text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          <span className="text-pixel">Creators</span> del benessere
        </h2>
        <CreatorsGrid creators={creators} />
      </div>
    </section>
  )
}

export function VideosStrip() {
  return (
    <section id="video" className="section-md scroll-mt-24 border-b border-border">
      <div className="container-lg padding-global">
        <h2 className="mb-8 text-h2 sm:text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          <span className="text-pixel">Video</span> per ispirarti
        </h2>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-white"
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

function SpotifyEmbed({ podcast }: { podcast: PodcastEmbed }) {
  const iframeTitle = `Player Spotify: ${podcast.title}`

  return (
    <figure className="flex min-w-0 max-w-full flex-col gap-3">
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border bg-white">
        <iframe
          title={iframeTitle}
          src={podcast.embedUrl}
          width="100%"
          height={podcast.height}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="block w-full max-w-full border-0"
          style={{ borderRadius: 12, maxWidth: '100%' }}
        />
      </div>
      <figcaption className="flex flex-col gap-1">
        <p
          className="text-sm font-semibold leading-snug"
          style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
        >
          {podcast.title}
        </p>
        <a
          href={podcast.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-cta-blue hover:underline"
        >
          Apri su Spotify
        </a>
      </figcaption>
    </figure>
  )
}

export function PodcastsStrip() {
  return (
    <section
      id="podcast"
      className="section-md scroll-mt-24 overflow-x-hidden border-b border-border"
    >
      <div className="container-lg padding-global min-w-0">
        <h2 className="mb-4 text-h2 sm:text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          Podcast sul benessere <span className="text-pixel">digitale</span>
        </h2>
        <p className="mb-8 max-w-2xl text-md text-primary opacity-60">
          Una selezione di episodi da ascoltare su Spotify: riflessioni e strategie per un rapporto
          più consapevole con la tecnologia.
        </p>

        <div className="mb-10">
          <SpotifyEmbed podcast={podcastShow} />
        </div>

        <div className="grid min-w-0 grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          {podcastEpisodes.map((episode) => (
            <SpotifyEmbed key={episode.id} podcast={episode} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function AppsStrip({ apps }: { apps: AppItem[] }) {
  if (apps.length === 0) return null

  return (
    <section id="app" className="section-md scroll-mt-24 border-b border-border">
      <div className="container-lg padding-global">
        <h2 className="mb-8 text-h2 sm:text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          App per <span className="text-pixel">disconnetterti</span>
        </h2>
        <div className="grid grid-cols-5 gap-4 lg:grid-cols-3 sm:grid-cols-1">
          {apps.map((app) => {
            const href = app.appStoreUrl || app.playStoreUrl || '#'
            const icon = getImageUrl(app.icon)
            return (
              <a
                key={app.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover-lift flex flex-col items-start gap-3 rounded-xl border border-border p-5"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-md bg-surface-subtle">
                  <Image src={icon} alt={app.name} fill className="object-cover" sizes="56px" />
                </div>
                <p className="font-semibold" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  {app.name}
                </p>
                {app.useCase && (
                  <p className="text-tiny uppercase tracking-wide text-primary opacity-50">
                    {app.useCase}
                  </p>
                )}
                <p className="line-clamp-3 text-sm leading-relaxed text-primary opacity-60">
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
    <section id="libri" className="section-md scroll-mt-24 border-b border-border">
      <div className="container-lg padding-global">
        <h2 className="mb-8 text-h2 sm:text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          Libri per il benessere <span className="text-pixel">digitale</span>
        </h2>
        <div className="grid grid-cols-5 gap-4 lg:grid-cols-3 sm:grid-cols-2">
          {books.map((book) => {
            const href = book.buyUrl || '#'
            const cover = getImageUrl(book.coverImage)
            return (
              <a
                key={book.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover-lift flex flex-col gap-3"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-surface-subtle">
                  <Image src={cover} alt={book.title} fill className="object-cover" sizes="20vw" />
                </div>
                <p
                  className="font-semibold leading-snug"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
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
