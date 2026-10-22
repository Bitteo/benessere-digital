import type { Metadata } from 'next'
import { HubFrame } from '@/components/hubs/HubFrame'
import { podcastEpisodes, podcastShow } from '@/content/podcasts'

export const metadata: Metadata = {
  title: 'Podcast sul benessere digitale',
  description:
    'Episodi da ascoltare sul benessere digitale: digital detox, connessione e strategie per un uso più consapevole della tecnologia.',
  alternates: { canonical: '/podcast' },
}

export default function PodcastPage() {
  const episodes = podcastEpisodes

  return (
    <HubFrame
      title={
        <>
          Podcast sul benessere <span className="text-pixel">digitale</span>
        </>
      }
      lede="Una selezione di episodi da ascoltare: riflessioni e strategie per un rapporto più consapevole con la tecnologia."
    >
      <div className="flex max-w-3xl flex-col gap-10">
        <section aria-label={podcastShow.title}>
          <h2 className="mb-3 text-xl font-semibold leading-snug">{podcastShow.title}</h2>
          <div className="overflow-hidden bg-surface-subtle">
            <iframe
              title={`Player Spotify: ${podcastShow.title}`}
              src={podcastShow.embedUrl}
              width="100%"
              height={podcastShow.height}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="block w-full border-0"
            />
          </div>
          <a
            href={podcastShow.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-base font-semibold text-accent hover:text-accent-hover"
          >
            Apri su Spotify
          </a>
        </section>

        <ul className="flex flex-col">
          {episodes.map((episode) => (
            <li key={episode.id} className="py-3">
              <a
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold leading-snug hover:text-accent"
              >
                {episode.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </HubFrame>
  )
}
