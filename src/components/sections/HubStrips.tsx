import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { AppItem, BookItem, CreatorItem } from '@/lib/content'
import { getImageUrl } from '@/lib/content'
import { podcastEpisodes, podcastShow } from '@/content/podcasts'
import { videoUrl, videos } from '@/content/videos'

const PREVIEW = 5

function StripHeader({ title, href }: { title: ReactNode; href: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-h3 sm:text-h4">{title}</h2>
      <Link
        href={href}
        className="shrink-0 text-base font-semibold text-accent hover:text-accent-hover"
      >
        Vedi tutti
      </Link>
    </div>
  )
}

export function CreatorsStrip({ creators }: { creators: CreatorItem[] }) {
  const preview = creators.slice(0, PREVIEW)
  if (preview.length === 0) return null

  return (
    <section id="profili" className="section-md scroll-mt-24 bg-white">
      <div className="container-nav padding-global">
        <StripHeader
          title={
            <>
              <span className="text-pixel">Creator</span> del benessere
            </>
          }
          href="/creator"
        />
        <ul className="flex flex-col">
          {preview.map((creator) => {
            const handle = creator.handle.startsWith('@') ? creator.handle : `@${creator.handle}`
            return (
              <li key={creator.id} className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="text-lg font-semibold">{creator.name || handle}</span>
                <span className="shrink-0 text-[13px] text-muted">{handle}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function VideosStrip() {
  const preview = videos.slice(0, PREVIEW)
  return (
    <section id="video" className="section-md scroll-mt-24 bg-surface-subtle">
      <div className="container-nav padding-global">
        <StripHeader
          title={
            <>
              <span className="text-pixel">Video</span> per ispirarti
            </>
          }
          href="/video"
        />
        <ul className="flex flex-col">
          {preview.map((video) => (
            <li key={video.id}>
              <a
                href={videoUrl(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 text-lg font-semibold leading-snug hover:text-accent"
              >
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PodcastsStrip() {
  const items = [podcastShow, ...podcastEpisodes].slice(0, PREVIEW)
  return (
    <section id="podcast" className="section-md scroll-mt-24 bg-white">
      <div className="container-nav padding-global">
        <StripHeader
          title={
            <>
              Podcast sul benessere <span className="text-pixel">digitale</span>
            </>
          }
          href="/podcast"
        />
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 text-lg font-semibold leading-snug hover:text-accent"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function AppsStrip({ apps }: { apps: AppItem[] }) {
  const preview = apps.slice(0, PREVIEW)
  if (preview.length === 0) return null

  return (
    <section id="app" className="section-md scroll-mt-24 bg-surface-subtle">
      <div className="container-nav padding-global">
        <StripHeader
          title={
            <>
              App per <span className="text-pixel">disconnetterti</span>
            </>
          }
          href="/app"
        />
        <ul className="flex flex-col">
          {preview.map((app) => {
            const icon = getImageUrl(app.icon)
            return (
              <li key={app.id}>
                <Link href="/app" className="flex items-center gap-3 py-2">
                  <Image
                    src={icon}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-md object-cover"
                  />
                  <span className="text-lg font-semibold">{app.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function BooksStrip({ books }: { books: BookItem[] }) {
  const preview = books.slice(0, PREVIEW)
  if (preview.length === 0) return null

  return (
    <section id="libri" className="section-md scroll-mt-24 bg-white">
      <div className="container-nav padding-global">
        <StripHeader
          title={
            <>
              Libri per il benessere <span className="text-pixel">digitale</span>
            </>
          }
          href="/libri"
        />
        <ul className="flex gap-4 overflow-x-auto pb-1">
          {preview.map((book) => {
            const cover = getImageUrl(book.coverImage)
            return (
              <li key={book.id} className="w-32 shrink-0">
                <Link href="/libri" className="flex flex-col gap-2">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-subtle">
                    <Image src={cover} alt="" fill className="object-cover" sizes="128px" />
                  </div>
                  <span className="text-base font-semibold leading-snug">{book.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
