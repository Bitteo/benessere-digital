import { SimplePage } from '@/components/ui/SimplePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Protezione dei dati su benessere.digital',
  description:
    'Informativa sulla protezione dei dati personali degli utenti di benessere.digital.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <SimplePage kicker="Legale" title="Privacy Policy">
      <p>
        Questa pagina è una bozza informativa. Il titolare del trattamento dei dati raccolti tramite
        il sito benessere.digital è il progetto editoriale benessere.digital (Jigo).
      </p>
      <p>
        Possiamo trattare dati di navigazione tecnici (log, cookie necessari al funzionamento) e,
        se ti iscrivi alla newsletter o ci scrivi, l&apos;indirizzo email e i contenuti del
        messaggio, per rispondere alle richieste e inviare aggiornamenti che hai chiesto.
      </p>
      <p>
        I dati non vengono venduti a terzi. Eventuali fornitori tecnici (hosting, newsletter,
        analytics) agiscono come responsabili del trattamento nei limiti del servizio.
      </p>
      <p>
        Puoi chiedere accesso, rettifica o cancellazione dei tuoi dati scrivendo a{' '}
        <a href="mailto:ciao@benessere.digital" className="underline hover:text-cta-blue">
          ciao@benessere.digital
        </a>
        . Per i cookie consulta la{' '}
        <a href="/cookie" className="underline hover:text-cta-blue">
          Cookie Policy
        </a>
        .
      </p>
      <p className="text-sm opacity-60">Ultimo aggiornamento: settembre 2026. Testo da validare legalmente prima del go-live.</p>
    </SimplePage>
  )
}
