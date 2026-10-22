import type { Metadata } from 'next'
import { HubFrame } from '@/components/hubs/HubFrame'
import { videoUrl, videos } from '@/content/videos'

export const metadata: Metadata = {
  title: 'Video sul benessere digitale',
  description:
    'Una selezione di video sul digital detox, il tempo sullo schermo e il benessere digitale.',
  alternates: { canonical: '/video' },
}

export default function VideoPage() {
  return (
    <HubFrame
      title={
        <>
          <span className="text-pixel">Video</span> per ispirarti
        </>
      }
      lede="Contenuti da guardare per riprendere in mano il rapporto con telefono, social e attenzione."
    >
      <ul className="flex max-w-3xl flex-col">
        {videos.map((video) => (
          <li key={video.id}>
            <a
              href={videoUrl(video.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 text-xl font-semibold leading-snug hover:text-accent"
            >
              {video.title}
            </a>
          </li>
        ))}
      </ul>
    </HubFrame>
  )
}
