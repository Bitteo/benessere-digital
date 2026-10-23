import Link from 'next/link'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti — benessere.digital',
  description: 'Scrivi al team di benessere.digital per collaborazioni, segnalazioni o richieste.',
  alternates: { canonical: '/contatti' },
}

const reasons = [
  'Vuoi collaborare con noi e capire come contribuire al progetto',
  'Vuoi segnalare un contenuto rilevante da inserire nella pagina',
  'Sei il proprietario di un contenuto e vorresti che lo rimuovessimo',
]

export default function ContattiPage() {
  return (
    <main>
      <section className="section-lg">
        <div className="container-md padding-global">
          <h1 className="mb-5 text-h2 leading-tight sm:text-h3">Teniamoci in contatto</h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted">
            Una domanda, una segnalazione o un&apos;idea di collaborazione: scrivici e ti
            rispondiamo.
          </p>
          <a href="mailto:ciao@benessere.digital" className="btn-primary mb-10 inline-flex">
            Scrivi a ciao@benessere.digital
          </a>
          <div className="mt-10">
            <h2 className="mb-4 text-h4">Perché scriverci?</h2>
            <ul className="flex max-w-2xl flex-col gap-3 text-base leading-relaxed">
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p className="mt-8 text-base text-muted">
              Preferisci presentare una proposta strutturata? Vai alla pagina{' '}
              <Link
                href="/collabora"
                className="font-semibold text-accent underline hover:text-accent-hover"
              >
                Collabora con noi
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <NewsletterBanner />
    </main>
  )
}
