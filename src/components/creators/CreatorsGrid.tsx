'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import type { CreatorItem } from '@/lib/content'
import { getImageUrl } from '@/lib/content'

const TIKTOK_EMBED_SRC = 'https://www.tiktok.com/embed.js'

declare global {
  interface Window {
    tiktokEmbed?: { lib?: { render?: () => void } }
  }
}

/** Module singleton — one embed.js load across all creator cards / remounts. */
let embedScriptPromise: Promise<void> | null = null

function ensureTikTokEmbedScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${TIKTOK_EMBED_SRC}"]`)
  if (existing) {
    window.tiktokEmbed?.lib?.render?.()
    return Promise.resolve()
  }

  if (embedScriptPromise) return embedScriptPromise

  embedScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = TIKTOK_EMBED_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      embedScriptPromise = null
      reject(new Error('Failed to load TikTok embed.js'))
    }
    document.body.appendChild(script)
  })

  return embedScriptPromise
}

function tiktokHandleFromCreator(creator: CreatorItem): string | null {
  const tiktok = creator.platforms?.find((p) => p.platform === 'tiktok' && p.url)
  if (!tiktok?.url) {
    const fromHandle = creator.handle?.replace(/^@/, '')
    return fromHandle || null
  }
  try {
    const match = new URL(tiktok.url).pathname.match(/@([^/?#]+)/)
    if (match?.[1]) return match[1]
  } catch {
    // fall through
  }
  return creator.handle.replace(/^@/, '') || null
}

function platformLabel(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return 'Instagram'
    case 'youtube':
      return 'YouTube'
    case 'tiktok':
      return 'TikTok'
    default:
      return platform
  }
}

function PlatformChips({
  platforms,
  omit,
}: {
  platforms?: Array<{ platform: string; url?: string }>
  /** Platforms already represented by the TikTok embed (hide duplicate TikTok chip). */
  omit?: string[]
}) {
  const links = (platforms ?? []).filter(
    (p) => p.url && !omit?.includes(p.platform.toLowerCase()),
  )
  if (links.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Altre piattaforme">
      {links.map((p) => (
        <li key={`${p.platform}-${p.url}`}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border border-border bg-surface-subtle px-2.5 py-1 text-tiny font-semibold text-primary transition-colors hover:border-cta-blue hover:text-cta-blue"
          >
            {platformLabel(p.platform)}
          </a>
        </li>
      ))}
    </ul>
  )
}

function CreatorCard({ creator }: { creator: CreatorItem }) {
  const tiktokUrl = creator.platforms?.find((p) => p.platform === 'tiktok' && p.url)?.url
  const embedHandle = tiktokUrl ? tiktokHandleFromCreator(creator) : null
  const useEmbed = Boolean(tiktokUrl && embedHandle)
  const avatarUrl = creator.avatar ? getImageUrl(creator.avatar) : null
  const displayHandle = creator.handle.startsWith('@') ? creator.handle : `@${creator.handle}`

  if (useEmbed && embedHandle) {
    return (
      <article className="flex min-w-0 flex-col gap-4 overflow-hidden rounded-xl border border-border bg-white p-5">
        <header className="flex flex-col gap-2">
          <h3 className="text-h5" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
            {displayHandle}
          </h3>
          {creator.name && creator.name !== creator.handle.replace(/^@/, '') && (
            <p className="text-sm text-primary opacity-70">{creator.name}</p>
          )}
          {creator.bio && (
            <p className="text-sm leading-relaxed text-primary opacity-60">{creator.bio}</p>
          )}
          <PlatformChips platforms={creator.platforms} omit={['tiktok']} />
        </header>

        {/* Official TikTok creator embed (same markup as Webflow SoT). */}
        <div className="min-w-0 max-w-full overflow-x-auto [&_.tiktok-embed]:!mx-0 [&_.tiktok-embed]:!max-w-full">
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@${embedHandle}`}
            data-unique-id={embedHandle}
            data-embed-type="creator"
            style={{ maxWidth: 780, minWidth: 288 }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.tiktok.com/@${embedHandle}?refer=creator_embed`}
              >
                @{embedHandle}
              </a>
            </section>
          </blockquote>
        </div>
      </article>
    )
  }

  // Fallback when no TikTok URL: fuller card with optional avatar + all platform links
  const primary = creator.platforms?.find((p) => p.url) ?? creator.platforms?.[0]
  const href = primary?.url

  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-white p-5">
      <div className="flex items-start gap-4">
        {avatarUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-surface-subtle">
            <Image src={avatarUrl} alt={creator.name || displayHandle} fill className="object-cover" sizes="64px" />
          </div>
        ) : (
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-surface-subtle text-lg font-semibold text-primary opacity-40"
            aria-hidden
          >
            {(creator.name || displayHandle).charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-h5" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cta-blue"
              >
                {displayHandle}
              </a>
            ) : (
              displayHandle
            )}
          </h3>
          {creator.name && <p className="text-sm text-primary opacity-70">{creator.name}</p>}
        </div>
      </div>
      {creator.bio && (
        <p className="text-sm leading-relaxed text-primary opacity-60">{creator.bio}</p>
      )}
      <PlatformChips platforms={creator.platforms} />
    </article>
  )
}

/**
 * Creators grid with TikTok official creator embeds.
 *
 * Consent: analytics (GA4) is gated by cookie consent; YouTube/Spotify embeds on this
 * site are not. TikTok embed.js loads after client mount (once) the same way — no
 * separate consent gate invented here. Documented on /cookie.
 */
export function CreatorsGrid({ creators }: { creators: CreatorItem[] }) {
  const needsTikTok = creators.some((c) => c.platforms?.some((p) => p.platform === 'tiktok' && p.url))

  useEffect(() => {
    if (!needsTikTok) return
    void ensureTikTokEmbedScript().catch(() => {
      // Card chrome (handle / bio / chips) remains usable if the script fails.
    })
  }, [needsTikTok])

  return (
    <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  )
}
