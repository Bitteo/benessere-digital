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
        body: 'Questo link di disiscrizione è scaduto. Scrivi a ciao@benessere.digital e ti togliamo noi dalla lista.',
      }
    case 'non-valido':
      return {
        title: 'Link non valido',
        body: "Questo link di disiscrizione non è valido. Usa il link presente nell'ultima email della newsletter.",
      }
    case 'errore':
      return {
        title: 'Disiscrizione non riuscita',
        body: 'Non siamo riusciti a completare la disiscrizione. Riprova tra qualche minuto.',
      }
    default:
      return {
        title: 'Disiscrizione completata',
        body: 'Non riceverai più la newsletter di benessere.digital. Se cambi idea puoi iscriverti di nuovo quando vuoi.',
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

export default async function NewsletterUnsubscribePage({ searchParams }: Props) {
  const { esito } = await searchParams
  const copy = copyFor(esito)

  return (
    <SimplePage kicker="Newsletter" title={copy.title}>
      <p>{copy.body}</p>
      <p>
        <Link href="/privacy" className="underline hover:text-cta-blue">
          Informativa privacy
        </Link>
        {' · '}
        <Link href="/newsletter" className="underline hover:text-cta-blue">
          Newsletter
        </Link>
      </p>
    </SimplePage>
  )
}
