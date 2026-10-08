import { createHmac, timingSafeEqual } from 'node:crypto'

export const CONFIRM_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7
export const UNSUBSCRIBE_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365 * 2

export type NewsletterTokenPurpose = 'confirm' | 'unsubscribe'

export type NewsletterTokenEnv = {
  NEWSLETTER_TOKEN_SECRET?: string
}

export type NewsletterTokenFailure = 'config' | 'invalid' | 'expired'

type TokenPayload = {
  e: string
  p: NewsletterTokenPurpose
  exp: number
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** Segreto HMAC. Vuoto = fail closed (stesso criterio di CRON_SECRET / INDEXNOW_SUBMIT_SECRET). */
export function resolveNewsletterTokenSecret(env: NewsletterTokenEnv): string {
  return env.NEWSLETTER_TOKEN_SECRET?.trim() ?? ''
}

function ttlFor(purpose: NewsletterTokenPurpose): number {
  return purpose === 'confirm' ? CONFIRM_TOKEN_TTL_SECONDS : UNSUBSCRIBE_TOKEN_TTL_SECONDS
}

export function signNewsletterToken(params: {
  email: string
  purpose: NewsletterTokenPurpose
  secret: string
  now?: number
}): string | null {
  const secret = params.secret.trim()
  if (!secret) return null

  const exp = Math.floor((params.now ?? Date.now()) / 1000) + ttlFor(params.purpose)
  const payload: TokenPayload = {
    e: params.email,
    p: params.purpose,
    exp,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${signature}`
}

export function verifyNewsletterToken(params: {
  token: string
  purpose: NewsletterTokenPurpose
  secret: string
  now?: number
}): { ok: true; email: string } | { ok: false; reason: NewsletterTokenFailure } {
  const secret = params.secret.trim()
  if (!secret) return { ok: false, reason: 'config' }

  const token = params.token.trim()
  const dot = token.lastIndexOf('.')
  if (dot <= 0 || dot === token.length - 1) return { ok: false, reason: 'invalid' }

  const body = token.slice(0, dot)
  const signature = token.slice(dot + 1)
  const expected = createHmac('sha256', secret).update(body).digest('base64url')
  if (!safeEqual(signature, expected)) return { ok: false, reason: 'invalid' }

  let payload: TokenPayload
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TokenPayload
  } catch {
    return { ok: false, reason: 'invalid' }
  }

  if (
    payload.p !== params.purpose ||
    typeof payload.e !== 'string' ||
    typeof payload.exp !== 'number'
  ) {
    return { ok: false, reason: 'invalid' }
  }

  const nowSeconds = Math.floor((params.now ?? Date.now()) / 1000)
  if (payload.exp <= nowSeconds) return { ok: false, reason: 'expired' }

  return { ok: true, email: payload.e }
}
