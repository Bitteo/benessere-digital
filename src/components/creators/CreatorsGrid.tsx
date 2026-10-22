import type { CreatorItem } from '@/lib/content'
import type { CreatorPlatform } from '@/content/types'

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

export function CreatorsGrid({ creators }: { creators: CreatorItem[] }) {
  return (
    <ul className="flex max-w-3xl flex-col">
      {creators.map((creator) => {
        const displayHandle = creator.handle.startsWith('@') ? creator.handle : `@${creator.handle}`
        const links = (creator.platforms ?? []).filter((item) => Boolean(item.url))
        return (
          <li key={creator.id} className="py-5">
            <h2 className="text-xl font-semibold leading-snug">{creator.name || displayHandle}</h2>
            <p className="mt-1 text-[13px] text-muted">{displayHandle}</p>
            {creator.bio && (
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{creator.bio}</p>
            )}
            {links.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {links.map((item) => (
                  <a
                    key={`${item.platform}-${item.url}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-accent hover:text-accent-hover"
                  >
                    {platformLabel(item.platform as CreatorPlatform)}
                  </a>
                ))}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
