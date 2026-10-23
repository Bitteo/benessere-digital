import { SimplePage } from '@/components/ui/SimplePage'
import {
  NEWSLETTER_CONTROLLER_ADDRESS,
  NEWSLETTER_CONTROLLER_NAME,
  NEWSLETTER_CONTROLLER_VAT,
  NEWSLETTER_FOOTER_LINE,
} from '@/lib/newsletter-legal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Protezione dei dati su benessere.digital',
  description:
    'Informativa sulla protezione dei dati personali degli utenti di benessere.digital. Titolare: JIGO SRL.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <SimplePage kicker="Legale" title="Privacy Policy">
      <p>
        Questa informativa descrive come benessere.digital tratta i dati personali di chi visita il
        sito o si iscrive alla newsletter.
      </p>

      <h2 className="text-h5">Titolare del trattamento</h2>
      <p>
        Il titolare è <strong>{NEWSLETTER_CONTROLLER_NAME}</strong>, {NEWSLETTER_CONTROLLER_ADDRESS}
        , P.IVA {NEWSLETTER_CONTROLLER_VAT}.
      </p>
      <p>{NEWSLETTER_FOOTER_LINE}</p>
      <p>
        Per richieste sui tuoi dati scrivi a{' '}
        <a href="mailto:ciao@benessere.digital" className="underline hover:text-cta-blue">
          ciao@benessere.digital
        </a>
        .
      </p>

      <h2 className="text-h5">Newsletter</h2>
      <p>
        Se ti iscrivi, trattiamo il tuo indirizzo email per inviarti la newsletter di
        benessere.digital (articoli, guide e risorse sul benessere digitale). La base giuridica è il
        consenso (art. 6, par. 1, lett. a, del GDPR).
      </p>
      <p>
        Il consenso si perfeziona con il double opt-in. Dopo il modulo ti inviamo un messaggio di
        conferma: l&apos;indirizzo resta non iscritto e fuori dal segmento di invio finché non apri
        il link. L&apos;invio è affidato a Resend, che tratta l&apos;email come responsabile del
        trattamento per conto di {NEWSLETTER_CONTROLLER_NAME}.
      </p>
      <p>
        Puoi revocare il consenso in ogni momento, dal link di disiscrizione presente nelle email
        della newsletter oppure scrivendo a ciao@benessere.digital. La revoca non pregiudica la
        liceità del trattamento svolto fino a quel momento. Conserviamo l&apos;indirizzo per questa
        finalità finché il consenso resta valido.
      </p>

      <h2 className="text-h5">Altri dati</h2>
      <p>
        Possiamo trattare dati tecnici di navigazione (log e cookie necessari al funzionamento) e,
        se ci scrivi, il contenuto del messaggio, per rispondere. I dati non vengono venduti. Per i
        cookie consulta la{' '}
        <a href="/cookie" className="underline hover:text-cta-blue">
          Cookie Policy
        </a>
        .
      </p>

      <h2 className="text-h5">Diritti</h2>
      <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei tuoi dati, e
        opporti al trattamento, scrivendo al titolare. Puoi anche proporre reclamo al Garante per la
        protezione dei dati personali.
      </p>

      <p className="text-sm opacity-60">Ultimo aggiornamento: ottobre 2026.</p>
    </SimplePage>
  )
}
