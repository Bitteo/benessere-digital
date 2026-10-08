import { NextResponse } from 'next/server'
import { confirmNewsletterSubscription, newsletterOutcomeEsito } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

function redirectOutcome(request: Request, esito: string | null) {
  const destination = new URL('/newsletter/confermata', request.url)
  if (esito) destination.searchParams.set('esito', esito)
  const response = NextResponse.redirect(destination, 303)
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('Referrer-Policy', 'no-referrer')
  return response
}

/** Link firmato nell'email di conferma: iscrive il contatto e mostra la pagina di ringraziamento. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')?.trim() ?? ''
  if (!token) return redirectOutcome(request, 'non-valido')

  try {
    const result = await confirmNewsletterSubscription(token, {
      origin: new URL(request.url).origin,
    })
    return redirectOutcome(request, newsletterOutcomeEsito(result))
  } catch {
    return redirectOutcome(request, 'errore')
  }
}
