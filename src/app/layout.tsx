import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'benessere.digital — Benessere Digitale per le Nuove Generazioni',
    template: '%s | benessere.digital',
  },
  description:
    "La principale piattaforma italiana sul benessere digitale: gestione dello schermo, salute mentale digitale, sicurezza online per giovani, genitori ed educatori.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://benessere.digital'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'benessere.digital',
  },
  twitter: {
    card: 'summary_large_image',
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
