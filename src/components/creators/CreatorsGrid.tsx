import Image from 'next/image'
import type { CreatorItem } from '@/lib/content'
import { getImageUrl } from '@/lib/content'
import type { CreatorPlatform } from '@/content/types'

const ICON_SIZE = 18

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase() as CreatorPlatform | string
  const common = { width: ICON_SIZE, height: ICON_SIZE, viewBox: '0 0 24 24', 'aria-hidden': true as const }

  switch (p) {
    case 'instagram':
      return (
        <svg {...common} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common} fill="none">
          <path
            d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.07a8.16 8.16 0 004.77 1.52V7.15a4.85 4.85 0 01-1-.46z"
            fill="currentColor"
          />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common} fill="none">
          <path
            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="9"
            width="4"
            height="12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common} fill="none">
          <path
            d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'threads':
      return (
        <svg {...common} fill="none">
          <path
            d="M12 2c-2.5 0-4.5.8-5.9 2.2C4.6 5.6 4 7.5 4 9.8c0 3.2 1.3 5.4 3.5 6.6.7.4 1.5.7 2.4.9v-2.2c-.4-.1-.8-.3-1.1-.5-1.4-.8-2.2-2.3-2.2-4.8 0-1.7.4-3 1.3-3.9.9-.9 2.2-1.4 3.9-1.4 1.8 0 3.1.5 3.9 1.4.7.7 1.1 1.8 1.2 3.1-1.2-.1-2.4.1-3.4.7-1 .6-1.7 1.6-1.7 3 0 1.1.4 2 1.1 2.6.7.6 1.6.9 2.6.9 1.7 0 3.1-.7 4.1-1.9 1-1.2 1.5-2.9 1.5-4.9 0-2.5-.7-4.5-2.1-5.9C16.5 2.8 14.5 2 12 2zm1.6 12.1c-.4 0-.7-.1-.9-.3-.2-.2-.3-.5-.3-.8 0-.5.2-.8.6-1.1.4-.2 1-.3 1.7-.3.1 1.1-.3 2.5-1.1 2.5z"
            fill="currentColor"
          />
        </svg>
      )
    case 'x':
      return (
        <svg {...common} fill="none">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
            fill="currentColor"
          />
        </svg>
      )
    case 'website':
      return (
        <svg {...common} fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )
    default:
      return (
        <svg {...common} fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
  }
}

function platformLabel(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return 'Instagram'
    case 'tiktok':
      return 'TikTok'
    case 'linkedin':
      return 'LinkedIn'
    case 'youtube':
      return 'YouTube'
    case 'threads':
      return 'Threads'
    case 'x':
      return 'X'
    case 'website':
      return 'Sito web'
    default:
      return platform
  }
}

function CreatorCard({ creator }: { creator: CreatorItem }) {
  const avatarUrl = creator.avatar ? getImageUrl(creator.avatar) : null
  const displayHandle = creator.handle.startsWith('@') ? creator.handle : `@${creator.handle}`
  const links = (creator.platforms ?? []).filter((p) => Boolean(p.url))

  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-white p-5">
      <div className="flex items-start gap-4">
        {avatarUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-surface-subtle">
            <Image
              src={avatarUrl}
              alt={creator.name || displayHandle}
              fill
              className="object-cover"
              sizes="64px"
            />
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
          {creator.name && (
            <h3 className="text-h5 leading-snug" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
              {creator.name}
            </h3>
          )}
          <p className="text-sm text-primary opacity-70">{displayHandle}</p>
        </div>
      </div>

      {creator.bio && (
        <p className="text-sm leading-relaxed text-primary opacity-60">{creator.bio}</p>
      )}

      {links.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-2" aria-label={`Social di ${creator.name || displayHandle}`}>
          {links.map((p) => (
            <li key={`${p.platform}-${p.url}`}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platformLabel(p.platform)}
                title={platformLabel(p.platform)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-subtle text-primary transition-colors hover:border-cta-blue hover:text-cta-blue"
              >
                <SocialIcon platform={p.platform} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export function CreatorsGrid({ creators }: { creators: CreatorItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  )
}
