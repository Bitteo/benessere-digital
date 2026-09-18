export type PodcastKind = 'show' | 'episode'

export type PodcastEmbed = {
  kind: PodcastKind
  id: string
  title: string
  /** Player ufficiale Spotify (iframe). */
  embedUrl: string
  /** Link testuale di fallback su open.spotify.com. */
  url: string
  /** Altezza iframe consigliata da oEmbed / generatore embed. */
  height: number
}

export const podcastShow: PodcastEmbed = {
  kind: 'show',
  id: '0rnqBvAxj4mL2xTDpiJC1M',
  title: 'Psicologia e benessere | Il podcast di GuidaPsicologi',
  embedUrl: 'https://open.spotify.com/embed/show/0rnqBvAxj4mL2xTDpiJC1M',
  url: 'https://open.spotify.com/show/0rnqBvAxj4mL2xTDpiJC1M',
  height: 352,
}

export const podcastEpisodes: PodcastEmbed[] = [
  {
    kind: 'episode',
    id: '7xffvJVYAXFquK2r5JbOPt',
    title: 'Eccessiva connessione al digitale e strategie di intervento #14',
    embedUrl: 'https://open.spotify.com/embed/episode/7xffvJVYAXFquK2r5JbOPt',
    url: 'https://open.spotify.com/episode/7xffvJVYAXFquK2r5JbOPt',
    height: 152,
  },
  {
    kind: 'episode',
    id: '14UkRwDQnFNdhO1Lc1BD5s',
    title: 'Digital Detox! con Alessio Carciofi DIGITAL WELLBEING [Future-Ready]',
    embedUrl: 'https://open.spotify.com/embed/episode/14UkRwDQnFNdhO1Lc1BD5s',
    url: 'https://open.spotify.com/episode/14UkRwDQnFNdhO1Lc1BD5s',
    height: 152,
  },
  {
    kind: 'episode',
    id: '1by1RQ0QYGuD1woZZ2d6xm',
    title:
      '98- DIGITAL DETOX. Consigli e riflessioni per un nuovo benessere digitale - intervista a Ivan Ferrero',
    embedUrl: 'https://open.spotify.com/embed/episode/1by1RQ0QYGuD1woZZ2d6xm',
    url: 'https://open.spotify.com/episode/1by1RQ0QYGuD1woZZ2d6xm',
    height: 152,
  },
]
