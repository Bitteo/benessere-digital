import { SimplePage } from '@/components/ui/SimplePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini di utilizzo — benessere.digital',
  description: 'Condizioni di utilizzo del sito benessere.digital.',
  alternates: { canonical: '/termini' },
}

export default function TerminiPage() {
  return (
    <SimplePage kicker="Legale" title="Termini di utilizzo">
      <p>
        I contenuti di benessere.digital hanno scopo informativo e non sostituiscono parere medico,
        psicologico o legale. Le strategie di digital detox e benessere digitale vanno adattate al
        contesto personale; in caso di disagio consulta un professionista.
      </p>
      <p>
        Testi, marchi e materiali grafici appartengono ai rispettivi titolari. È vietata la
        riproduzione integrale non autorizzata. Link a risorse terze (app store, Amazon, YouTube,
        corsi Google) sono forniti per convenienza; non siamo responsabili dei siti esterni.
      </p>
      <p>
        Il sito può essere aggiornato, sospeso o modificato in qualsiasi momento. Per segnalazioni
        sui contenuti scrivi a{' '}
        <a href="mailto:ciao@benessere.digital" className="underline hover:text-cta-blue">
          ciao@benessere.digital
        </a>
        .
      </p>
      <p className="text-sm opacity-60">Ultimo aggiornamento: settembre 2026. Testo da validare legalmente prima del go-live.</p>
    </SimplePage>
  )
}
