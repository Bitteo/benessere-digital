import { NextResponse } from 'next/server'
import { getSitemapEntries } from '@/lib/seo/indexable'
import { authorizationMatchesBearer, submitToIndexNow } from '@/lib/seo/indexnow'
import { CANONICAL_ORIGIN } from '@/lib/seo/site'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const authorized = authorizationMatchesBearer(request.headers.get('authorization'), [
    process.env.CRON_SECRET,
    process.env.INDEXNOW_SUBMIT_SECRET,
  ])

  if (!authorized) {
    return NextResponse.json({ ok: false, error: 'Non autorizzato.' }, { status: 401 })
  }

  try {
    const entries = await getSitemapEntries()
    const result = await submitToIndexNow({
      urls: entries.map((entry) => entry.url),
      origin: CANONICAL_ORIGIN,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
        INDEXNOW_KEY: process.env.INDEXNOW_KEY,
      },
    })

    if (!result.submitted) {
      return NextResponse.json({ ok: true, submitted: false, reason: result.reason })
    }

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          submitted: false,
          status: result.status,
          urlCount: result.urlCount,
          error: 'Invio rifiutato da IndexNow.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      submitted: true,
      urlCount: result.urlCount,
      status: result.status,
    })
  } catch {
    return NextResponse.json(
      { ok: false, submitted: false, error: 'Invio IndexNow non riuscito.' },
      { status: 502 },
    )
  }
}
