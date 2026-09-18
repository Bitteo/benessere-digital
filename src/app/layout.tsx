import type { Metadata, Viewport } from 'next'
import { CANONICAL_ORIGIN } from '@/lib/seo/site'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: {
    default: 'benessere.digital — Benessere Digitale per le Nuove Generazioni',
    template: '%s | benessere.digital',
  },
  description:
    'La principale piattaforma italiana sul benessere digitale: gestione dello schermo, salute mentale digitale, sicurezza online per giovani, genitori ed educatori.',
  // Preview/local: honor NEXT_PUBLIC_SERVER_URL. Production fallback: canonical www host.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || CANONICAL_ORIGIN),
  icons: {
    icon: '/images/benessere.digital-favicon.png',
    apple: '/images/benessere.digital-webclip.png',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'benessere.digital',
    images: [
      {
        url: '/images/og-image.png',
        alt: 'benessere.digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
