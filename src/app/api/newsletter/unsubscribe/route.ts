import { NextResponse } from 'next/server'
import { newsletterOutcomeEsito, unsubscribeNewsletter } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'private, no-store' }

function redirectOutcome(request: Request, esito: string | null) {
  const destination = new URL('/newsletter/disiscrizione', request.url)
  if (esito) destination.searchParams.set('esito', esito)
  const response = NextResponse.redirect(destination, 303)
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('Referrer-Policy', 'no-referrer')
  return response
}

async function tokenFromPost(request: Request): Promise<string> {
  const fromQuery = new URL(request.url).searchParams.get('token')?.trim() ?? ''
  if (fromQuery) return fromQuery

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/x-www-form-urlencoded')) return ''

  const params = new URLSearchParams(await request.text())
  return params.get('token')?.trim() ?? ''
}

/** Link nel browser: disiscrive e mostra la pagina di conferma. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')?.trim() ?? ''
  if (!token) return redirectOutcome(request, 'non-valido')

  try {
    const result = await unsubscribeNewsletter(token, {
      origin: new URL(request.url).origin,
    })
    return redirectOutcome(request, newsletterOutcomeEsito(result))
  } catch {
    return redirectOutcome(request, 'errore')
  }
}

/**
 * One-click RFC 8058: POST application/x-www-form-urlencoded
 * con body `List-Unsubscribe=One-Click` sull'URL firmato.
 * Il token in query string identifica il contatto.
 */
export async function POST(request: Request) {
  const token = await tokenFromPost(request)
  if (!token) {
    return new NextResponse('Link di disiscrizione non valido.', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', ...NO_STORE },
    })
  }

  try {
    const result = await unsubscribeNewsletter(token, {
      origin: new URL(request.url).origin,
    })
    if (!result.ok) {
      const message =
        result.reason === 'invalid' || result.reason === 'expired'
          ? 'Link di disiscrizione non valido o scaduto.'
          : 'Disiscrizione non riuscita. Riprova più tardi.'
      return new NextResponse(message, {
        status: result.status,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', ...NO_STORE },
      })
    }
  } catch {
    return new NextResponse('Disiscrizione non riuscita. Riprova più tardi.', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', ...NO_STORE },
    })
  }

  return new NextResponse('Disiscrizione completata.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', ...NO_STORE },
  })
}
