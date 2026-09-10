import Link from 'next/link'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collabora con noi — benessere.digital',
  description:
    'Proponi un articolo, una risorsa o una collaborazione editoriale con benessere.digital.',
  alternates: { canonical: '/collabora' },
}

export default function CollaboraPage() {
  return (
    <main>
      <section className="section-lg border-b border-border">
        <div className="container-md padding-global">
          <p className="text-meta text-primary opacity-50 mb-3">Community</p>
          <h1
            className="text-h1 sm:text-h2 mb-6 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Collabora con noi
          </h1>
          <p className="text-md text-primary opacity-60 leading-relaxed max-w-2xl mb-6">
            Cerchiamo autori, ricercatori, educatori e creator che vogliano contribuire a una
            conversazione evidence-based sul benessere digitale in italiano.
          </p>
          <ul className="flex flex-col gap-3 text-base text-primary opacity-80 mb-8 max-w-2xl">
            <li>Articoli e guide originali sul digital wellness</li>
            <li>Segnalazioni di app, libri, video o podcast da inserire nell&apos;hub</li>
            <li>Partnership educative con scuole, associazioni e professionisti</li>
          </ul>
          <a href="mailto:ciao@benessere.digital?subject=Proposta%20di%20collaborazione" className="btn-primary inline-flex">
            Invia una proposta
          </a>
          <p className="mt-8 text-sm text-primary opacity-60">
            Oppure usa la pagina{' '}
            <Link href="/contatti" className="underline hover:text-cta-blue">
              Contatti
            </Link>
            .
          </p>
        </div>
      </section>
      <NewsletterBanner />
    </main>
  )
}
