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
      <section className="section-lg">
        <div className="container-md padding-global">
          <h1 className="mb-5 text-h2 leading-tight sm:text-h3">Newsletter</h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted">
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
