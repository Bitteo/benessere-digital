import { NextResponse } from 'next/server'
import {
  isValidEmail,
  notifyNewsletterWebhook,
  resendApiKey,
  subscribeResendContact,
} from '@/lib/newsletter'

export async function GET() {
  return NextResponse.json({ enabled: Boolean(resendApiKey()) })
}

export async function POST(request: Request) {
  if (!resendApiKey()) {
    return NextResponse.json(
      { error: 'Iscrizioni temporaneamente non disponibili.' },
      { status: 503 },
    )
  }

  let email = ''
  try {
    const body = (await request.json()) as { email?: unknown }
    email = typeof body.email === 'string' ? body.email.trim() : ''
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Inserisci un indirizzo email valido.' }, { status: 400 })
  }

  try {
    const result = await subscribeResendContact(email)
    if (!result.ok) {
      return NextResponse.json(
        { error: 'Il servizio newsletter non è al momento raggiungibile. Riprova più tardi.' },
        { status: result.status === 429 ? 429 : 502 },
      )
    }

    await notifyNewsletterWebhook(email)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Il servizio newsletter non è al momento raggiungibile. Riprova più tardi.' },
      { status: 502 },
    )
  }
}
