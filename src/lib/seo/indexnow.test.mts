import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  INDEXNOW_ENDPOINT,
  authorizationMatchesBearer,
  submitToIndexNow,
} from './indexnow.ts'

const ORIGIN = 'https://www.benessere.digital'
const KEY = 'f32f1aa08dbdec5c749b280c5b313c0e'

function forbidFetch(): typeof fetch {
  return () => {
    throw new Error('IndexNow must not be called')
  }
}

test('bearer auth accepts either secret and fails closed', () => {
  assert.equal(authorizationMatchesBearer(null, ['cron-secret']), false)
  assert.equal(authorizationMatchesBearer('Bearer cron-secret', []), false)
  assert.equal(authorizationMatchesBearer('Bearer cron-secret', [undefined, '']), false)
  assert.equal(authorizationMatchesBearer('Bearer cron-secret', ['cron-secret']), true)
  assert.equal(
    authorizationMatchesBearer('Bearer submit-secret', ['cron-secret', 'submit-secret']),
    true,
  )
  assert.equal(authorizationMatchesBearer('Bearer wrong', ['cron-secret', 'submit-secret']), false)
  assert.equal(authorizationMatchesBearer('Basic cron-secret', ['cron-secret']), false)
})

test('IndexNow is not posted outside production or without a key', async () => {
  const urls = [`${ORIGIN}/`, `${ORIGIN}/articoli`]
  const cases = [
    { env: { NODE_ENV: 'production', VERCEL_ENV: 'preview', INDEXNOW_KEY: KEY }, reason: 'not-production' },
    { env: { NODE_ENV: 'development', INDEXNOW_KEY: KEY }, reason: 'not-production' },
    { env: { NODE_ENV: 'production', VERCEL_ENV: 'production' }, reason: 'missing-key' },
    {
      env: { NODE_ENV: 'production', VERCEL_ENV: 'production', INDEXNOW_KEY: 'not-hex' },
      reason: 'invalid-key',
    },
    {
      env: { NODE_ENV: 'production', VERCEL_ENV: 'production', INDEXNOW_KEY: KEY },
      reason: 'no-urls',
      urls: ['https://example.com/nope'],
    },
  ] as const

  for (const item of cases) {
    const result = await submitToIndexNow({
      urls: 'urls' in item ? [...item.urls] : urls,
      origin: ORIGIN,
      env: item.env,
      fetchImpl: forbidFetch(),
    })
    assert.deepEqual(result, { submitted: false, reason: item.reason })
  }
})

test('production with a key posts sitemap URLs to api.indexnow.org', async () => {
  const calls: Array<{ url: string; body: string }> = []
  const fetchImpl: typeof fetch = async (input, init) => {
    calls.push({ url: String(input), body: String(init?.body ?? '') })
    return new Response(null, { status: 200 })
  }

  const result = await submitToIndexNow({
    urls: [
      ORIGIN,
      `${ORIGIN}/articoli/smartphone-a-scuola-cosa-funziona`,
      `${ORIGIN}/articoli/smartphone-a-scuola-cosa-funziona`,
      'https://benessere.digital/articoli/apex',
    ],
    origin: ORIGIN,
    env: { NODE_ENV: 'production', VERCEL_ENV: 'production', INDEXNOW_KEY: KEY },
    fetchImpl,
  })

  assert.deepEqual(result, { submitted: true, ok: true, status: 200, urlCount: 2 })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, INDEXNOW_ENDPOINT)
  assert.deepEqual(JSON.parse(calls[0].body), {
    host: 'www.benessere.digital',
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList: [ORIGIN, `${ORIGIN}/articoli/smartphone-a-scuola-cosa-funziona`],
  })
})

test('a rejected IndexNow response does not count as submitted', async () => {
  const fetchImpl: typeof fetch = async () => new Response('no', { status: 403 })
  const result = await submitToIndexNow({
    urls: [ORIGIN],
    origin: ORIGIN,
    env: { NODE_ENV: 'production', INDEXNOW_KEY: KEY },
    fetchImpl,
  })
  assert.deepEqual(result, { submitted: true, ok: false, status: 403, urlCount: 1 })
})
