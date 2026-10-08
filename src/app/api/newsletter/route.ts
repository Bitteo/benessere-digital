import { NextResponse } from 'next/server'
import {
  newsletterSignupEnabled,
  normalizeNewsletterEmail,
  requestNewsletterOptIn,
  signupRequestError,
} from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ enabled: newsletterSignupEnabled() })
}

export async function POST(request: Request) {
  if (!newsletterSignupEnabled()) {
    return NextResponse.json(
      { error: 'Iscrizioni temporaneamente non disponibili.' },
      { status: 503 },
    )
  }

  let email = ''
  let consent: unknown
  try {
    const body = (await request.json()) as { email?: unknown; consent?: unknown }
    email = typeof body.email === 'string' ? body.email : ''
    consent = body.consent
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  const rejection = signupRequestError({ email, consent })
  if (rejection) {
    return NextResponse.json({ error: rejection.error }, { status: rejection.status })
  }

  try {
    const result = await requestNewsletterOptIn(normalizeNewsletterEmail(email), {
      origin: new URL(request.url).origin,
    })
    if (!result.ok) {
      const message =
        result.reason === 'config'
          ? 'Iscrizioni temporaneamente non disponibili.'
          : 'Il servizio newsletter non è al momento raggiungibile. Riprova più tardi.'
      return NextResponse.json(
        { error: message },
        { status: result.status === 429 ? 429 : result.status },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Il servizio newsletter non è al momento raggiungibile. Riprova più tardi.' },
      { status: 502 },
    )
  }
}
