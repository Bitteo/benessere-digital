import {
  DEFAULT_NEWSLETTER_FROM,
  NEWSLETTER_FOOTER_LINE,
  PRIVACY_PATH,
} from './newsletter-legal.ts'
import {
  resolveNewsletterTokenSecret,
  signNewsletterToken,
  verifyNewsletterToken,
  type NewsletterTokenPurpose,
} from './newsletter-token.ts'

const RESEND_API = 'https://api.resend.com'

/** Segment "benessere.digital" già creato in Resend. Usato se `RESEND_SEGMENT_ID` è assente. */
export const DEFAULT_RESEND_SEGMENT_ID = '0275e55f-100d-49be-8f47-cfa2452b1263'

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type NewsletterEnv = {
  RESEND_API_KEY?: string
  RESEND_SEGMENT_ID?: string
  NEWSLETTER_WEBHOOK_URL?: string
  NEWSLETTER_FROM?: string
  NEWSLETTER_TOKEN_SECRET?: string
  [key: string]: string | undefined
}

export type NewsletterFailureReason = 'config' | 'invalid' | 'expired' | 'upstream'

export type NewsletterResult =
  | { ok: true }
  | { ok: false; status: number; reason: NewsletterFailureReason }

export type NewsletterContext = {
  /** Origin pubblico della richiesta (link nella email di conferma). */
  origin: string
  fetchImpl?: typeof fetch
  env?: NewsletterEnv
  now?: number
}

type ResendErrorBody = {
  name?: string
  message?: string
  statusCode?: number
}

function readEnv(ctx?: { env?: NewsletterEnv }): NewsletterEnv {
  return ctx?.env ?? process.env
}

export function resendApiKey(env: NewsletterEnv = process.env): string {
  return env.RESEND_API_KEY?.trim() || ''
}

export function resendSegmentId(env: NewsletterEnv = process.env): string {
  return env.RESEND_SEGMENT_ID?.trim() || DEFAULT_RESEND_SEGMENT_ID
}

export function newsletterWebhookUrl(env: NewsletterEnv = process.env): string {
  return env.NEWSLETTER_WEBHOOK_URL?.trim() || ''
}

export function newsletterFromAddress(env: NewsletterEnv = process.env): string {
  return env.NEWSLETTER_FROM?.trim() || DEFAULT_NEWSLETTER_FROM
}

export function newsletterTokenSecret(env: NewsletterEnv = process.env): string {
  return resolveNewsletterTokenSecret(env)
}

/** Il form è attivo solo se possiamo creare il contatto e firmare il link di conferma. */
export function newsletterSignupEnabled(env: NewsletterEnv = process.env): boolean {
  return Boolean(resendApiKey(env) && newsletterTokenSecret(env))
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email)
}

export function normalizeNewsletterEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isExistingContact(status: number, body: ResendErrorBody): boolean {
  if (status === 409) return true
  const message = (body.message ?? '').toLowerCase()
  return message.includes('already exists') || message.includes('already been taken')
}

async function resendJson<T>(res: Response): Promise<T> {
  return (await res.json().catch(() => ({}))) as T
}

function fetchOf(ctx?: NewsletterContext): typeof fetch {
  return ctx?.fetchImpl ?? fetch
}

function upstreamStatus(status: number): number {
  return status === 429 ? 429 : 502
}

async function resendCall(
  ctx: NewsletterContext,
  path: string,
  init: { method: string; body?: unknown },
): Promise<Response> {
  const apiKey = resendApiKey(readEnv(ctx))
  return fetchOf(ctx)(`${RESEND_API}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  })
}

/**
 * Crea il contatto come non iscritto e fuori dal segmento.
 * Se esiste già non ne cambia lo stato: un POST non autenticato non deve disiscrivere
 * chi è già confermato. L'ingresso nel segmento avviene solo dopo il link di conferma.
 */
async function storePendingContact(
  ctx: NewsletterContext,
  email: string,
): Promise<NewsletterResult> {
  const res = await resendCall(ctx, '/contacts', {
    method: 'POST',
    body: { email, unsubscribed: true },
  })

  if (res.ok) return { ok: true }

  const body = await resendJson<ResendErrorBody>(res)
  if (isExistingContact(res.status, body)) return { ok: true }

  return { ok: false, status: upstreamStatus(res.status), reason: 'upstream' }
}

async function addContactToSegment(
  ctx: NewsletterContext,
  email: string,
): Promise<NewsletterResult> {
  const segmentId = resendSegmentId(readEnv(ctx))
  const res = await resendCall(
    ctx,
    `/contacts/${encodeURIComponent(email)}/segments/${segmentId}`,
    { method: 'POST' },
  )

  if (res.ok || res.status === 409) return { ok: true }
  return { ok: false, status: upstreamStatus(res.status), reason: 'upstream' }
}

async function removeContactFromSegment(ctx: NewsletterContext, email: string): Promise<void> {
  const segmentId = resendSegmentId(readEnv(ctx))
  const res = await resendCall(
    ctx,
    `/contacts/${encodeURIComponent(email)}/segments/${segmentId}`,
    { method: 'DELETE' },
  )
  if (!res.ok && res.status !== 404 && res.status !== 409) {
    console.error('Newsletter segment removal failed', res.status)
  }
}

/** Notifica secondaria opzionale. Parte solo dopo la conferma, mai al submit del form. */
export async function notifyNewsletterWebhook(
  email: string,
  options?: { env?: NewsletterEnv; fetchImpl?: typeof fetch },
): Promise<void> {
  const url = newsletterWebhookUrl(options?.env ?? process.env)
  if (!url) return

  const doFetch = options?.fetchImpl ?? fetch
  try {
    await doFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'benessere.digital' }),
    })
  } catch {
    // Resend resta la fonte di verità: un webhook assente o irraggiungibile non è un errore utente.
  }
}

export function publicSiteUrl(origin: string, path: string): string {
  const base = origin.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildConfirmationEmail(params: { confirmUrl: string; privacyUrl: string }): {
  subject: string
  html: string
  text: string
} {
  const subject = "Conferma l'iscrizione alla newsletter di benessere.digital"
  const text = [
    "Conferma l'iscrizione alla newsletter di benessere.digital.",
    '',
    "Apri questo link per completare l'iscrizione:",
    params.confirmUrl,
    '',
    "Se non hai richiesto tu l'iscrizione, ignora questa email. Senza conferma non riceverai la newsletter.",
    '',
    NEWSLETTER_FOOTER_LINE,
    `Informativa privacy: ${params.privacyUrl}`,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="it">
  <body style="margin:0;padding:24px;background:#ffffff;color:#19242e;font-family:Georgia,sans-serif;font-size:16px;line-height:1.5;">
    <p>Conferma l'iscrizione alla newsletter di benessere.digital.</p>
    <p>
      <a href="${params.confirmUrl}" style="display:inline-block;background:#19242e;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;">Conferma iscrizione</a>
    </p>
    <p>Se il pulsante non funziona, copia questo indirizzo nel browser:<br /><a href="${params.confirmUrl}">${params.confirmUrl}</a></p>
    <p>Se non hai richiesto tu l'iscrizione, ignora questa email. Senza conferma non riceverai la newsletter.</p>
    <hr style="border:none;border-top:1px solid #e1e4e8;margin:24px 0;" />
    <p style="font-size:13px;color:#375066;">
      ${NEWSLETTER_FOOTER_LINE}<br />
      <a href="${params.privacyUrl}">Informativa privacy</a>
    </p>
  </body>
</html>`

  return { subject, html, text }
}

async function sendConfirmationEmail(
  ctx: NewsletterContext,
  email: string,
  token: string,
): Promise<NewsletterResult> {
  const confirmUrl = publicSiteUrl(
    ctx.origin,
    `/api/newsletter/confirm?token=${encodeURIComponent(token)}`,
  )
  const privacyUrl = publicSiteUrl(ctx.origin, PRIVACY_PATH)
  const message = buildConfirmationEmail({ confirmUrl, privacyUrl })
  const res = await resendCall(ctx, '/emails', {
    method: 'POST',
    body: {
      from: newsletterFromAddress(readEnv(ctx)),
      to: [email],
      subject: message.subject,
      html: message.html,
      text: message.text,
    },
  })

  if (res.ok) return { ok: true }
  console.error('Newsletter confirmation email failed', res.status)
  return { ok: false, status: upstreamStatus(res.status), reason: 'upstream' }
}

function assertConfigured(ctx: NewsletterContext): NewsletterResult | null {
  if (!newsletterSignupEnabled(readEnv(ctx))) {
    return { ok: false, status: 503, reason: 'config' }
  }
  return null
}

/**
 * Double opt-in: salva il contatto come non iscritto (fuori dal segmento) e invia
 * l'email di conferma. Non crea broadcast e non iscrive al segmento.
 */
export async function requestNewsletterOptIn(
  email: string,
  ctx: NewsletterContext,
): Promise<NewsletterResult> {
  const blocked = assertConfigured(ctx)
  if (blocked) return blocked

  const normalized = normalizeNewsletterEmail(email)
  if (!isValidEmail(normalized)) return { ok: false, status: 400, reason: 'invalid' }

  const pending = await storePendingContact(ctx, normalized)
  if (!pending.ok) return pending

  const token = signNewsletterToken({
    email: normalized,
    purpose: 'confirm',
    secret: newsletterTokenSecret(readEnv(ctx)),
    now: ctx.now,
  })
  if (!token) return { ok: false, status: 503, reason: 'config' }

  return sendConfirmationEmail(ctx, normalized, token)
}

async function withVerifiedEmail(
  token: string,
  purpose: NewsletterTokenPurpose,
  ctx: NewsletterContext,
  action: (email: string) => Promise<NewsletterResult>,
): Promise<NewsletterResult> {
  const blocked = assertConfigured(ctx)
  if (blocked) return blocked

  const verified = verifyNewsletterToken({
    token,
    purpose,
    secret: newsletterTokenSecret(readEnv(ctx)),
    now: ctx.now,
  })
  if (!verified.ok) {
    const status = verified.reason === 'config' ? 503 : 400
    return { ok: false, status, reason: verified.reason }
  }

  return action(verified.email)
}

/** Il link di conferma iscrive il contatto e lo aggiunge al segmento. */
export async function confirmNewsletterSubscription(
  token: string,
  ctx: NewsletterContext,
): Promise<NewsletterResult> {
  return withVerifiedEmail(token, 'confirm', ctx, async (email) => {
    const patch = await resendCall(ctx, `/contacts/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      body: { unsubscribed: false },
    })

    if (patch.status === 404) {
      const segmentId = resendSegmentId(readEnv(ctx))
      const created = await resendCall(ctx, '/contacts', {
        method: 'POST',
        body: {
          email,
          unsubscribed: false,
          segments: [{ id: segmentId }],
        },
      })
      if (!created.ok) {
        const body = await resendJson<ResendErrorBody>(created)
        if (!isExistingContact(created.status, body)) {
          return { ok: false, status: upstreamStatus(created.status), reason: 'upstream' }
        }
      }
    } else if (!patch.ok) {
      return { ok: false, status: upstreamStatus(patch.status), reason: 'upstream' }
    }

    const segment = await addContactToSegment(ctx, email)
    if (!segment.ok) return segment

    await notifyNewsletterWebhook(email, { env: readEnv(ctx), fetchImpl: ctx.fetchImpl })
    return { ok: true }
  })
}

/**
 * Disiscrizione: contatto unsubscribed e rimosso dal segmento.
 * Idempotente: un contatto assente è già fuori dalla newsletter.
 */
export async function unsubscribeNewsletter(
  token: string,
  ctx: NewsletterContext,
): Promise<NewsletterResult> {
  return withVerifiedEmail(token, 'unsubscribe', ctx, async (email) => {
    const patch = await resendCall(ctx, `/contacts/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      body: { unsubscribed: true },
    })

    if (patch.status !== 404 && !patch.ok) {
      return { ok: false, status: upstreamStatus(patch.status), reason: 'upstream' }
    }

    if (patch.ok) await removeContactFromSegment(ctx, email)
    return { ok: true }
  })
}

/** Body `List-Unsubscribe=One-Click` richiesto da RFC 8058. */
export function isRfc8058OneClick(contentType: string | null, body: string): boolean {
  if (!contentType?.toLowerCase().includes('application/x-www-form-urlencoded')) return false
  return new URLSearchParams(body).get('List-Unsubscribe') === 'One-Click'
}

export function newsletterOutcomeEsito(result: NewsletterResult): string | null {
  if (result.ok) return null
  if (result.reason === 'expired') return 'scaduto'
  if (result.reason === 'invalid') return 'non-valido'
  return 'errore'
}

/** Validazione del POST /api/newsletter. Il consenso deve essere il booleano true. */
export function signupRequestError(input: {
  email: string
  consent: unknown
}): { status: number; error: string } | null {
  const email = normalizeNewsletterEmail(input.email)
  if (!email || !isValidEmail(email)) {
    return { status: 400, error: 'Inserisci un indirizzo email valido.' }
  }
  if (input.consent !== true) {
    return { status: 400, error: 'Per iscriverti conferma di voler ricevere la newsletter.' }
  }
  return null
}
