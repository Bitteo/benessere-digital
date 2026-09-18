import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },
  async redirects() {
    // Webflow orphan slugs reported as GSC 404s: never imported after
    // the file-based migration. Map both /post and /articoli aliases to
    // the closest live topical article (specific rules must precede
    // the generic /post/:slug catch-all).
    const webflowOrphans: { from: string; to: string }[] = [
      {
        from: 'disinformazione-e-polarizzazione-nell-era-digitale',
        to: 'limpatto-dei-social-media-sul-benessere-e-come-gestirlo-in-modo-consapevole',
      },
      {
        from: 'la-luce-blu-e-il-sonno',
        to: 'come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica',
      },
      {
        from: 'benefici-terapeutici-e-neuroplasticita-correlati-all-uso-sano-della-tecnologia',
        to: 'come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica',
      },
      {
        from: 'vantaggi-correlati-all-uso-sano-del-digitale',
        to: 'come-il-benessere-digitale-influisce-sulla-salute-mentale-e-fisica',
      },
      {
        from: 'rischi-relativi-all-uso-problematico-del-digitale',
        to: 'limpatto-dei-social-media-sul-benessere-e-come-gestirlo-in-modo-consapevole',
      },
    ]

    return [
      {
        source: '/categoria/digital-wellness',
        destination: '/categoria/benessere-digitale',
        permanent: true,
      },
      {
        source: '/categoria/mental-health',
        destination: '/categoria/salute-mentale',
        permanent: true,
      },
      {
        source: '/categoria/famiglia-tecnologia',
        destination: '/categoria/genitori-e-scuola',
        permanent: true,
      },
      ...webflowOrphans.flatMap(({ from, to }) => [
        { source: `/post/${from}`, destination: `/articoli/${to}`, permanent: true },
        { source: `/articoli/${from}`, destination: `/articoli/${to}`, permanent: true },
      ]),
      { source: '/post/:slug', destination: '/articoli/:slug', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
    ]
  },
}

export default nextConfig
