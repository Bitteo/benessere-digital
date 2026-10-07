import { timingSafeEqual } from 'node:crypto'

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

const INDEXNOW_CHUNK_SIZE = 10_000
const INDEXNOW_KEY_PATTERN = /^[a-f0-9]{8,128}$/i

export type IndexNowSkipReason = 'not-production' | 'missing-key' | 'invalid-key' | 'no-urls'

export type IndexNowEnv = {
  NODE_ENV?: string
  VERCEL_ENV?: string
  INDEXNOW_KEY?: string
}

export type IndexNowResult =
  | { submitted: false; reason: IndexNowSkipReason }
  | { submitted: true; ok: true; status: number; urlCount: number }
  | { submitted: true; ok: false; status: number; urlCount: number }

export function resolveIndexNowKey(env: IndexNowEnv): string {
  return env.INDEXNOW_KEY?.trim() ?? ''
}

/** Production on Vercel is VERCEL_ENV, not NODE_ENV (preview builds are also production). */
export function isIndexNowProduction(env: IndexNowEnv): boolean {
  if (env.VERCEL_ENV) return env.VERCEL_ENV === 'production'
  return env.NODE_ENV === 'production'
}

export function indexNowSkipReason(env: IndexNowEnv): IndexNowSkipReason | null {
  if (!isIndexNowProduction(env)) return 'not-production'
  const key = resolveIndexNowKey(env)
  if (!key) return 'missing-key'
  if (!INDEXNOW_KEY_PATTERN.test(key)) return 'invalid-key'
  return null
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** True when Authorization is Bearer CRON_SECRET or INDEXNOW_SUBMIT_SECRET. Fail closed. */
export function authorizationMatchesBearer(
  authorizationHeader: string | null,
  secrets: readonly (string | undefined)[],
): boolean {
  if (!authorizationHeader) return false
  const match = /^Bearer\s+(\S+)\s*$/i.exec(authorizationHeader)
  if (!match) return false
  const token = match[1]
  const configured = secrets.map((secret) => secret?.trim() ?? '').filter((secret) => secret.length > 0)
  if (!configured.length) return false
  return configured.some((secret) => safeEqual(token, secret))
}

function isOnOrigin(url: string, origin: string): boolean {
  return url === origin || url.startsWith(`${origin}/`)
}

export async function submitToIndexNow(params: {
  urls: string[]
  origin: string
  env: IndexNowEnv
  fetchImpl?: typeof fetch
}): Promise<IndexNowResult> {
  const skipped = indexNowSkipReason(params.env)
  if (skipped) return { submitted: false, reason: skipped }

  const origin = params.origin.replace(/\/$/, '')
  const key = resolveIndexNowKey(params.env)
  const seen = new Set<string>()
  const urlList: string[] = []

  for (const url of params.urls) {
    if (!isOnOrigin(url, origin) || seen.has(url)) continue
    seen.add(url)
    urlList.push(url)
  }

  if (!urlList.length) return { submitted: false, reason: 'no-urls' }

  const fetchImpl = params.fetchImpl ?? fetch
  const host = new URL(origin).host
  let lastStatus = 0

  for (let offset = 0; offset < urlList.length; offset += INDEXNOW_CHUNK_SIZE) {
    const chunk = urlList.slice(offset, offset + INDEXNOW_CHUNK_SIZE)
    const response = await fetchImpl(INDEXNOW_ENDPOINT, {
      method: 'POST',
      redirect: 'manual',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${origin}/${key}.txt`,
        urlList: chunk,
      }),
    })
    lastStatus = response.status
    if (!response.ok) {
      return { submitted: true, ok: false, status: response.status, urlCount: urlList.length }
    }
  }

  return { submitted: true, ok: true, status: lastStatus, urlCount: urlList.length }
}
