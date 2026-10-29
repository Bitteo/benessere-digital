import { SimplePage } from '@/components/ui/SimplePage'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ esito?: string }>
}

function copyFor(esito?: string): { title: string; body: string } {
  switch (esito) {
    case 'scaduto':
      return {
        title: 'Link scaduto',
        body: 'Il link di conferma è scaduto. Iscriviti di nuovo: ti invieremo un nuovo messaggio.',
      }
    case 'non-valido':
      return {
        title: 'Link non valido',
        body: 'Questo link di conferma non è valido. Iscriviti di nuovo dalla pagina newsletter.',
      }
    case 'errore':
      return {
        title: 'Conferma non riuscita',
        body: 'Non siamo riusciti a completare la conferma. Riprova tra qualche minuto oppure iscriviti di nuovo.',
      }
    default:
      return {
        title: 'Iscrizione confermata',
        body: 'Iscrizione confermata. Da ora riceverai la newsletter di benessere.digital.',
      }
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { esito } = await searchParams
  const copy = copyFor(esito)
  return {
    title: `${copy.title} — benessere.digital`,
    robots: { index: false, follow: false },
  }
}

export default async function NewsletterConfirmedPage({ searchParams }: Props) {
  const { esito } = await searchParams
  const copy = copyFor(esito)

  return (
    <SimplePage kicker="Newsletter" title={copy.title}>
      <p>{copy.body}</p>
      <p>
        <Link href="/newsletter" className="underline hover:text-cta-blue">
          Torna alla newsletter
        </Link>
      </p>
    </SimplePage>
  )
}
