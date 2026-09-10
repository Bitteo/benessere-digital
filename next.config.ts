import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp', '@node-rs/argon2', '@node-rs/bcrypt'],
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
    return [
      { source: '/post/:slug', destination: '/articoli/:slug', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
    ]
  },
}

export default withPayload(nextConfig)
