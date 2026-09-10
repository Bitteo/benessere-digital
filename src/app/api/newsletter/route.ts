import { NextResponse } from 'next/server'

function webhookUrl() {
  return process.env.NEWSLETTER_WEBHOOK_URL?.trim() || ''
}

export async function GET() {
  return NextResponse.json({ enabled: Boolean(webhookUrl()) })
}

export async function POST(request: Request) {
  const url = webhookUrl()
  if (!url) {
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

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Inserisci un indirizzo email valido.' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'benessere.digital' }),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Il servizio newsletter non è al momento raggiungibile. Riprova più tardi.' },
        { status: 502 },
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
