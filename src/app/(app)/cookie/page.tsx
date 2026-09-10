import { SimplePage } from '@/components/ui/SimplePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — benessere.digital',
  description: 'Informativa sui cookie utilizzati da benessere.digital.',
  alternates: { canonical: '/cookie' },
}

export default function CookiePage() {
  return (
    <SimplePage kicker="Legale" title="Cookie Policy">
      <p>
        Usiamo cookie tecnici necessari al funzionamento del sito (ad esempio per ricordare la tua
        scelta sul banner di consenso). Questi cookie non richiedono un consenso aggiuntivo.
      </p>
      <p>
        Eventuali cookie di misurazione o marketing vengono attivati solo se scegli &quot;Accetto&quot;
        nel banner. Puoi cambiare idea cancellando i dati del browser o rivisitando questa pagina
        dopo aver rimosso la chiave <code>benessere-cookie-consent</code> dal localStorage.
      </p>
      <p>
        Per i dettagli sul trattamento dei dati vedi la{' '}
        <a href="/privacy" className="underline hover:text-cta-blue">
          Privacy Policy
        </a>
        .
      </p>
      <p className="text-sm opacity-60">Ultimo aggiornamento: settembre 2026. Testo da validare legalmente prima del go-live.</p>
    </SimplePage>
  )
}
