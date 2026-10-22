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
      <section className="section-lg">
        <div className="container-md padding-global">
          <h1 className="mb-5 text-h2 leading-tight sm:text-h3">Collabora con noi</h1>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted">
            Cerchiamo autori, ricercatori, educatori e creator che vogliano contribuire a una
            conversazione evidence-based sul benessere digitale in italiano.
          </p>
          <ul className="mb-8 flex max-w-2xl flex-col gap-3 text-base leading-relaxed">
            <li>Articoli e guide originali sul digital wellness</li>
            <li>Segnalazioni di app, libri, video o podcast da inserire nell&apos;hub</li>
            <li>Partnership educative con scuole, associazioni e professionisti</li>
          </ul>
          <a
            href="mailto:ciao@benessere.digital?subject=Proposta%20di%20collaborazione"
            className="btn-primary inline-flex"
          >
            Invia una proposta
          </a>
          <p className="mt-8 text-base text-muted">
            Oppure usa la pagina{' '}
            <Link
              href="/contatti"
              className="font-semibold text-accent underline hover:text-accent-hover"
            >
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
