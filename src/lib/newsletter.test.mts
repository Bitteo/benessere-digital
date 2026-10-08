import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  CONFIRM_TOKEN_TTL_SECONDS,
  signNewsletterToken,
  verifyNewsletterToken,
} from './newsletter-token.ts'
import { DEFAULT_NEWSLETTER_FROM, NEWSLETTER_FOOTER_LINE } from './newsletter-legal.ts'
import {
  buildConfirmationEmail,
  confirmNewsletterSubscription,
  isRfc8058OneClick,
  newsletterFromAddress,
  newsletterSignupEnabled,
  requestNewsletterOptIn,
  signupRequestError,
  unsubscribeNewsletter,
  type NewsletterContext,
  type NewsletterEnv,
} from './newsletter.ts'

const SECRET = 'test-newsletter-token-secret-32b'
const ORIGIN = 'https://www.benessere.digital'
const NOW = 1_700_000_000_000

const ENV: NewsletterEnv = {
  RESEND_API_KEY: 're_test',
  RESEND_SEGMENT_ID: 'seg_test',
  NEWSLETTER_TOKEN_SECRET: SECRET,
}

type Call = { url: string; method: string; body?: string }

function mockFetch(handler: (call: Call) => { status: number; json?: unknown } | undefined) {
  const calls: Call[] = []
  const fetchImpl: typeof fetch = async (input, init) => {
    const call: Call = {
      url: String(input),
      method: init?.method ?? 'GET',
      body: typeof init?.body === 'string' ? init.body : undefined,
    }
    calls.push(call)
    if (call.url.includes('/broadcasts')) {
      throw new Error(`broadcasts must not be called: ${call.method} ${call.url}`)
    }
    const result = handler(call)
    if (!result) throw new Error(`unexpected ${call.method} ${call.url}`)
    return new Response(JSON.stringify(result.json ?? {}), {
      status: result.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return { fetchImpl, calls }
}

function ctx(fetchImpl: typeof fetch, env: NewsletterEnv = ENV): NewsletterContext {
  return { origin: ORIGIN, fetchImpl, env, now: NOW }
}

function confirmToken(email = 'person@example.com', now = NOW): string {
  const token = signNewsletterToken({ email, purpose: 'confirm', secret: SECRET, now })
  assert.ok(token)
  return token
}

test('signup rejects a missing consent flag and an invalid email', () => {
  assert.equal(signupRequestError({ email: 'not-an-email', consent: true })?.status, 400)
  assert.equal(signupRequestError({ email: 'person@example.com', consent: false })?.status, 400)
  assert.equal(signupRequestError({ email: 'person@example.com', consent: 'true' })?.status, 400)
  assert.equal(signupRequestError({ email: ' Person@Example.com ', consent: true }), null)
})

test('the form stays disabled without the HMAC secret', () => {
  assert.equal(newsletterSignupEnabled({ RESEND_API_KEY: 're_test' }), false)
  assert.equal(newsletterSignupEnabled({ NEWSLETTER_TOKEN_SECRET: SECRET }), false)
  assert.equal(newsletterSignupEnabled(ENV), true)
  assert.equal(newsletterFromAddress({}), DEFAULT_NEWSLETTER_FROM)
  assert.equal(
    newsletterFromAddress({ NEWSLETTER_FROM: '  news@benessere.digital ' }),
    'news@benessere.digital',
  )
})

test('confirmation tokens are signed, expire, and are purpose-bound', () => {
  const token = confirmToken()
  assert.deepEqual(verifyNewsletterToken({ token, purpose: 'confirm', secret: SECRET, now: NOW }), {
    ok: true,
    email: 'person@example.com',
  })

  const flipped = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`
  assert.equal(
    verifyNewsletterToken({ token: flipped, purpose: 'confirm', secret: SECRET, now: NOW }).ok,
    false,
  )
  assert.equal(
    verifyNewsletterToken({ token, purpose: 'unsubscribe', secret: SECRET, now: NOW }).ok,
    false,
  )
  assert.equal(signNewsletterToken({ email: 'a@b.co', purpose: 'confirm', secret: '  ' }), null)
  assert.equal(
    verifyNewsletterToken({
      token,
      purpose: 'confirm',
      secret: SECRET,
      now: NOW + (CONFIRM_TOKEN_TTL_SECONDS + 5) * 1000,
    }).ok,
    false,
  )
})

test('opt-in stores an unsubscribed contact and sends the confirmation email', async () => {
  const { fetchImpl, calls } = mockFetch((call) => {
    if (call.method === 'POST' && call.url === 'https://api.resend.com/contacts')
      return { status: 201 }
    if (call.method === 'POST' && call.url === 'https://api.resend.com/emails')
      return { status: 200 }
    return undefined
  })

  const result = await requestNewsletterOptIn(' Person@Example.com ', ctx(fetchImpl))
  assert.deepEqual(result, { ok: true })
  assert.equal(calls.length, 2)

  const contact = JSON.parse(calls[0].body ?? '{}') as Record<string, unknown>
  assert.deepEqual(contact, { email: 'person@example.com', unsubscribed: true })
  assert.equal('segments' in contact || 'segment_ids' in contact, false)

  const email = JSON.parse(calls[1].body ?? '{}') as {
    from: string
    to: string[]
    html: string
    text: string
  }
  assert.equal(email.from, DEFAULT_NEWSLETTER_FROM)
  assert.deepEqual(email.to, ['person@example.com'])
  assert.equal(email.html.includes(NEWSLETTER_FOOTER_LINE), true)
  assert.equal(email.text.includes(NEWSLETTER_FOOTER_LINE), true)
  assert.equal(email.html.includes(`${ORIGIN}/privacy`), true)
  assert.equal(email.html.includes(`${ORIGIN}/api/newsletter/confirm?token=`), true)
  assert.equal(
    calls.some((call) => call.url.includes('/segments/')),
    false,
  )
  assert.equal(
    calls.some((call) => call.url.includes('/broadcasts')),
    false,
  )
})

test('an existing contact is not modified or segmented before confirmation', async () => {
  const { fetchImpl, calls } = mockFetch((call) => {
    if (call.method === 'POST' && call.url === 'https://api.resend.com/contacts') {
      return { status: 409, json: { message: 'Contact already exists' } }
    }
    if (call.method === 'POST' && call.url === 'https://api.resend.com/emails')
      return { status: 200 }
    return undefined
  })

  const result = await requestNewsletterOptIn('person@example.com', ctx(fetchImpl))
  assert.equal(result.ok, true)
  assert.equal(
    calls.some((call) => call.method === 'PATCH'),
    false,
  )
  assert.equal(
    calls.some((call) => call.url.includes('/segments/')),
    false,
  )
})

test('a failed contact create does not send email', async () => {
  const { fetchImpl, calls } = mockFetch((call) => {
    if (call.url === 'https://api.resend.com/contacts') return { status: 500 }
    return undefined
  })
  const result = await requestNewsletterOptIn('person@example.com', ctx(fetchImpl))
  assert.deepEqual(result, { ok: false, status: 502, reason: 'upstream' })
  assert.equal(calls.length, 1)
})

test('missing secret does not call Resend', async () => {
  const { fetchImpl, calls } = mockFetch(() => {
    throw new Error('fetch')
  })
  const result = await requestNewsletterOptIn(
    'person@example.com',
    ctx(fetchImpl, { RESEND_API_KEY: 're_test' }),
  )
  assert.deepEqual(result, { ok: false, status: 503, reason: 'config' })
  assert.equal(calls.length, 0)
})

test('confirmation subscribes the contact, adds the segment, and notifies the webhook', async () => {
  const { fetchImpl, calls } = mockFetch((call) => {
    if (call.url === 'https://hooks.example/newsletter') return { status: 204 }
    return { status: 200 }
  })
  const result = await confirmNewsletterSubscription(
    confirmToken(),
    ctx(fetchImpl, { ...ENV, NEWSLETTER_WEBHOOK_URL: 'https://hooks.example/newsletter' }),
  )
  assert.deepEqual(result, { ok: true })

  const patch = calls.find((call) => call.method === 'PATCH')
  assert.equal(patch?.url, 'https://api.resend.com/contacts/person%40example.com')
  assert.deepEqual(JSON.parse(patch?.body ?? '{}'), { unsubscribed: false })
  assert.equal(
    calls.some(
      (call) =>
        call.method === 'POST' &&
        call.url === 'https://api.resend.com/contacts/person%40example.com/segments/seg_test',
    ),
    true,
  )
  const webhook = calls.find((call) => call.url === 'https://hooks.example/newsletter')
  assert.deepEqual(JSON.parse(webhook?.body ?? '{}'), {
    email: 'person@example.com',
    source: 'benessere.digital',
  })
  assert.equal(
    calls.some((call) => call.url.includes('/emails')),
    false,
  )
  assert.equal(
    calls.some((call) => call.url.includes('/broadcasts')),
    false,
  )
})

test('confirmation recreates a missing contact inside the segment', async () => {
  const { fetchImpl, calls } = mockFetch((call) => {
    if (call.method === 'PATCH') return { status: 404 }
    return { status: 200 }
  })
  const result = await confirmNewsletterSubscription(confirmToken(), ctx(fetchImpl))
  assert.equal(result.ok, true)
  const created = calls.find(
    (call) => call.method === 'POST' && call.url === 'https://api.resend.com/contacts',
  )
  const body = JSON.parse(created?.body ?? '{}') as {
    unsubscribed: boolean
    segments: Array<{ id: string }>
  }
  assert.equal(body.unsubscribed, false)
  assert.deepEqual(body.segments, [{ id: 'seg_test' }])
})

test('an expired confirmation link does not touch Resend', async () => {
  const token = confirmToken('person@example.com', NOW)
  const { fetchImpl, calls } = mockFetch(() => {
    throw new Error('fetch')
  })
  const result = await confirmNewsletterSubscription(token, {
    ...ctx(fetchImpl),
    now: NOW + (CONFIRM_TOKEN_TTL_SECONDS + 5) * 1000,
  })
  assert.deepEqual(result, { ok: false, status: 400, reason: 'expired' })
  assert.equal(calls.length, 0)
})

test('unsubscribe marks the contact and removes the segment', async () => {
  const token = signNewsletterToken({
    email: 'person@example.com',
    purpose: 'unsubscribe',
    secret: SECRET,
    now: NOW,
  })
  assert.ok(token)
  const { fetchImpl, calls } = mockFetch(() => ({ status: 200 }))
  const result = await unsubscribeNewsletter(token, ctx(fetchImpl))
  assert.deepEqual(result, { ok: true })
  const patch = calls.find((call) => call.method === 'PATCH')
  assert.deepEqual(JSON.parse(patch?.body ?? '{}'), { unsubscribed: true })
  assert.equal(
    calls.some(
      (call) =>
        call.method === 'DELETE' &&
        call.url === 'https://api.resend.com/contacts/person%40example.com/segments/seg_test',
    ),
    true,
  )
  assert.equal(
    calls.some((call) => call.url.includes('/emails') || call.url.includes('/broadcasts')),
    false,
  )
})

test('unsubscribe of an unknown contact is already complete', async () => {
  const token = signNewsletterToken({
    email: 'gone@example.com',
    purpose: 'unsubscribe',
    secret: SECRET,
    now: NOW,
  })
  assert.ok(token)
  const { fetchImpl, calls } = mockFetch((call) => {
    if (call.method === 'PATCH') return { status: 404 }
    return undefined
  })
  const result = await unsubscribeNewsletter(token, ctx(fetchImpl))
  assert.deepEqual(result, { ok: true })
  assert.equal(calls.length, 1)
})

test('confirmation email footer carries the controller line', () => {
  const message = buildConfirmationEmail({
    confirmUrl: `${ORIGIN}/api/newsletter/confirm?token=abc`,
    privacyUrl: `${ORIGIN}/privacy`,
  })
  assert.equal(message.html.includes(NEWSLETTER_FOOTER_LINE), true)
  assert.equal(message.text.includes('P.IVA 17075981005'), true)
  assert.equal(message.text.includes('Via Cesare Beccaria 11, Roma'), true)
  assert.equal(message.html.includes(`${ORIGIN}/privacy`), true)
})

test('RFC 8058 one-click body is recognized only as form data', () => {
  assert.equal(
    isRfc8058OneClick(
      'application/x-www-form-urlencoded; charset=UTF-8',
      'List-Unsubscribe=One-Click',
    ),
    true,
  )
  assert.equal(isRfc8058OneClick('application/json', 'List-Unsubscribe=One-Click'), false)
  assert.equal(
    isRfc8058OneClick('application/x-www-form-urlencoded', 'List-Unsubscribe=Something-Else'),
    false,
  )
})
