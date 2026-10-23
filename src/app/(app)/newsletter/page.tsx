import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter — benessere.digital',
  description:
    'Iscriviti alla newsletter di benessere.digital: articoli, guide e risorse sul benessere digitale ogni settimana.',
  alternates: { canonical: '/newsletter' },
}

export default function NewsletterPage() {
  return (
    <main>
      <section className="section-lg border-b border-border">
        <div className="container-md padding-global">
          <p className="text-meta text-primary opacity-50 mb-3">Resta aggiornato</p>
          <h1
            className="text-h1 sm:text-h2 mb-6 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Newsletter
          </h1>
          <p className="text-md text-primary opacity-60 leading-relaxed max-w-2xl mb-8">
            Ricevi ogni settimana i migliori articoli, guide e risorse scientifiche sul benessere
            digitale, direttamente nella tua email.
          </p>
          <div className="max-w-lg">
            <NewsletterForm layout="stacked" />
          </div>
        </div>
      </section>
      <NewsletterBanner />
    </main>
  )
}
