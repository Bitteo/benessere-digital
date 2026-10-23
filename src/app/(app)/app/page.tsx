import Image from 'next/image'
import type { Metadata } from 'next'
import { HubFrame } from '@/components/hubs/HubFrame'
import { getApps, getImageUrl } from '@/lib/content'

export const metadata: Metadata = {
  title: 'App per il benessere digitale',
  description:
    'App per ridurre il tempo sullo schermo, bloccare le distrazioni e riprendere il controllo del telefono.',
  alternates: { canonical: '/app' },
}

export default async function AppPage() {
  const apps = await getApps()

  return (
    <HubFrame
      title={
        <>
          App per <span className="text-pixel">disconnetterti</span>
        </>
      }
      lede="Strumenti per mettere un attrito tra te e le app che si aprono da sole."
    >
      <ul className="flex max-w-3xl flex-col">
        {apps.map((app) => {
          const href = app.appStoreUrl || app.playStoreUrl || '#'
          const icon = getImageUrl(app.icon)
          return (
            <li key={app.id} className="py-4">
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 hover:text-accent"
              >
                <Image
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-md object-cover"
                />
                <span>
                  <span className="block text-xl font-semibold">{app.name}</span>
                  {app.description && (
                    <span className="mt-1 block text-base leading-relaxed text-muted">
                      {app.description}
                    </span>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </HubFrame>
  )
}
