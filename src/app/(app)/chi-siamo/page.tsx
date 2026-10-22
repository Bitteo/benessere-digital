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
      <section className="section-lg bg-white" aria-labelledby="about-heading">
        <div className="container-md padding-global">
          <h1 id="about-heading" className="mb-6 text-h2 leading-tight sm:text-h3">
            Benessere <span className="text-pixel">digitale</span> per tutti
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            benessere.digital nasce con un obiettivo: rendere accessibile la conoscenza scientifica
            sul benessere digitale per aiutare giovani, genitori ed educatori a costruire un
            rapporto sano con la tecnologia.
          </p>
        </div>
      </section>

      <section className="section-md bg-surface-subtle" aria-label="I nostri valori">
        <div className="container-lg padding-global">
          <h2 className="mb-8 text-h3 sm:text-h4">Come lavoriamo</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-1">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="mb-2 text-h5">{v.title}</h3>
                <p className="text-base leading-relaxed text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-md bg-white" aria-label="Il team">
        <div className="container-md padding-global">
          <h2 className="mb-5 text-h3 sm:text-h4">Il team</h2>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted">
            benessere.digital è un progetto di{' '}
            <a
              href="https://jigo.it"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline hover:text-accent-hover"
            >
              Jigo
            </a>
            , un&apos;agenzia digitale italiana specializzata in prodotti web per il settore
            dell&apos;educazione e della salute. Il nostro team editoriale è composto da esperti di
            comunicazione scientifica, psicologi e pedagogi.
          </p>
          <Link href="/contatti" className="btn-primary inline-flex">
            Contattaci
          </Link>
        </div>
      </section>

      <NewsletterBanner />
    </main>
  )
}
