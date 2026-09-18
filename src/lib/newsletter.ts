const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts'

/** Segment "benessere.digital" già creato in Resend. Usato se `RESEND_SEGMENT_ID` è assente. */
export const DEFAULT_RESEND_SEGMENT_ID = '0275e55f-100d-49be-8f47-cfa2452b1263'

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function resendApiKey(): string {
  return process.env.RESEND_API_KEY?.trim() || ''
}

export function resendSegmentId(): string {
  return process.env.RESEND_SEGMENT_ID?.trim() || DEFAULT_RESEND_SEGMENT_ID
}

export function newsletterWebhookUrl(): string {
  return process.env.NEWSLETTER_WEBHOOK_URL?.trim() || ''
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email)
}

type ResendErrorBody = {
  name?: string
  message?: string
  statusCode?: number
}

function isExistingContact(status: number, body: ResendErrorBody): boolean {
  if (status === 409) return true
  const message = (body.message ?? '').toLowerCase()
  return message.includes('already exists') || message.includes('already been taken')
}

async function resendJson<T>(res: Response): Promise<T> {
  return (await res.json().catch(() => ({}))) as T
}

async function addContactToSegment(
  apiKey: string,
  email: string,
  segmentId: string,
): Promise<{ ok: true } | { ok: false; status: number }> {
  const url = `${RESEND_CONTACTS_URL}/${encodeURIComponent(email)}/segments/${segmentId}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (res.ok || res.status === 409) return { ok: true }

  return { ok: false, status: res.status }
}

/**
 * Crea il contatto su Resend e lo assegna al segmento newsletter.
 * Se il contatto esiste già, lo aggiunge al segmento e considera l'iscrizione riuscita.
 */
export async function subscribeResendContact(
  email: string,
): Promise<{ ok: true } | { ok: false; status: number }> {
  const apiKey = resendApiKey()
  const segmentId = resendSegmentId()

  const res = await fetch(RESEND_CONTACTS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      // Contacts API: assegna il contatto al segmento (SDK: `segments: [{ id }]`; REST: `segment_ids`).
      segments: [{ id: segmentId }],
      segment_ids: [segmentId],
    }),
  })

  if (res.ok) return { ok: true }

  const body = await resendJson<ResendErrorBody>(res)
  if (!isExistingContact(res.status, body)) {
    return { ok: false, status: res.status >= 400 ? res.status : 502 }
  }

  return addContactToSegment(apiKey, email, segmentId)
}

/** Notifica secondaria opzionale. Non deve far fallire l'iscrizione Resend. */
export async function notifyNewsletterWebhook(email: string): Promise<void> {
  const url = newsletterWebhookUrl()
  if (!url) return

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'benessere.digital' }),
    })
  } catch {
    // Resend resta la fonte di verità: un webhook assente o irraggiungibile non è un errore utente.
  }
}
