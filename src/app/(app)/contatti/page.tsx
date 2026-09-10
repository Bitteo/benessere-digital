import Link from 'next/link'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti — benessere.digital',
  description: 'Scrivi al team di benessere.digital per collaborazioni, segnalazioni o richieste.',
  alternates: { canonical: '/contatti' },
}

export default function ContattiPage() {
  return (
    <main>
      <section className="section-lg border-b border-border">
        <div className="container-md padding-global">
          <p className="text-meta text-primary opacity-50 mb-3">Parliamone</p>
          <h1
            className="text-h1 sm:text-h2 mb-6 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Teniamoci in contatto
          </h1>
          <p className="text-md text-primary opacity-60 leading-relaxed max-w-2xl mb-8">
            Una domanda, una segnalazione o un&apos;idea di collaborazione: scrivici e ti rispondiamo.
          </p>
          <a href="mailto:ciao@benessere.digital" className="btn-primary inline-flex mb-10">
            Scrivi a ciao@benessere.digital
          </a>
          <div className="border-t border-border pt-8">
            <h2 className="text-h3 mb-5" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
              Perché scriverci?
            </h2>
            <ul className="flex flex-col gap-3 text-base text-primary opacity-80">
              <li>✓ &nbsp; Vuoi collaborare con noi e capire come contribuire al progetto</li>
              <li>✓ &nbsp; Vuoi segnalare un contenuto rilevante da inserire nella pagina</li>
              <li>✓ &nbsp; Sei il proprietario di un contenuto e vorresti che lo rimuovessimo :(</li>
            </ul>
            <p className="mt-8 text-base text-primary opacity-70">
              Preferisci presentare una proposta strutturata? Vai alla pagina{' '}
              <Link href="/collabora" className="underline hover:text-cta-blue">
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
