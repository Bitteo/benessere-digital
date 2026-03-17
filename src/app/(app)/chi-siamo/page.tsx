import Link from 'next/link'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo — benessere.digital',
  description:
    'benessere.digital è la principale piattaforma italiana di informazione scientifica sul benessere digitale per giovani, genitori ed educatori.',
  alternates: { canonical: '/chi-siamo' },
}

const values = [
  {
    title: 'Evidence-based',
    description:
      'Ogni articolo è basato su ricerca scientifica peer-reviewed. Niente sensazionalismo, solo fatti.',
  },
  {
    title: 'Accessibile',
    description:
      'Rendiamo la ricerca accademica comprensibile a tutti: ragazzi, genitori, insegnanti.',
  },
  {
    title: 'Indipendente',
    description:
      'Non siamo affiliati a nessuna azienda tecnologica. La nostra unica missione è il benessere delle persone.',
  },
  {
    title: 'In italiano',
    description:
      'Contenuti pensati per il contesto culturale italiano ed europeo, non semplici traduzioni.',
  },
]

export default function ChiSiamoPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-lg border-b border-border" aria-labelledby="about-heading">
        <div className="container-md padding-global text-center">
          <p className="text-meta text-primary opacity-50 mb-4">La nostra missione</p>
          <h1
            id="about-heading"
            className="text-h1 sm:text-h2 mb-6 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Benessere digitale{' '}
            <span className="text-pixel">per tutti</span>
          </h1>
          <p className="text-md text-primary opacity-60 leading-relaxed max-w-2xl mx-auto">
            benessere.digital nasce con un obiettivo: rendere accessibile la conoscenza scientifica
            sul benessere digitale per aiutare giovani, genitori ed educatori a costruire un rapporto
            sano con la tecnologia.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-md border-b border-border" aria-label="I nostri valori">
        <div className="container-lg padding-global">
          <div className="mb-10">
            <p className="text-meta text-primary opacity-50 mb-2">I nostri principi</p>
            <h2
              className="text-h2 sm:text-h3"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              Come lavoriamo
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-8 border border-border rounded-xl">
                <h3
                  className="text-h4 mb-3"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  {v.title}
                </h3>
                <p className="text-base text-primary opacity-70 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / background */}
      <section className="section-md border-b border-border" aria-label="Il team">
        <div className="container-md padding-global">
          <div className="mb-10">
            <p className="text-meta text-primary opacity-50 mb-2">Chi c&apos;è dietro</p>
            <h2
              className="text-h2 sm:text-h3"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              Il team
            </h2>
          </div>
          <p className="text-md text-primary opacity-70 leading-relaxed mb-6">
            benessere.digital è un progetto di{' '}
            <a
              href="https://jigo.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta-blue underline hover:text-cta-blue-hover"
            >
              Jigo
            </a>
            , un&apos;agenzia digitale italiana specializzata in prodotti web per il settore
            dell&apos;educazione e della salute. Il nostro team editoriale è composto da esperti
            di comunicazione scientifica, psicologi e pedagogi.
          </p>
          <Link href="/contatti" className="btn-primary inline-flex">
            Contattaci
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="section-md border-b border-border bg-surface-subtle" aria-label="I nostri numeri">
        <div className="container-lg padding-global">
          <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-8 text-center">
            {[
              { value: '10K+', label: 'Lettori al mese' },
              { value: '200+', label: 'Articoli pubblicati' },
              { value: '50+', label: 'Fonti scientifiche' },
              { value: '100%', label: 'Indipendente' },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-h1 sm:text-h2 text-primary mb-1"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-primary opacity-60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBanner />
    </main>
  )
}
