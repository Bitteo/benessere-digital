import Link from 'next/link'
import { HeroSection } from '@/components/sections/HeroSection'
import { SectionNavTabs } from '@/components/sections/SectionNavTabs'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import { GoogleWellbeingBanner } from '@/components/sections/GoogleWellbeingBanner'
import {
  AppsStrip,
  BooksStrip,
  CreatorsStrip,
  PodcastsStrip,
  VideosStrip,
} from '@/components/sections/HubStrips'
import { FaqSection } from '@/components/sections/FaqSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { getArticles, getApps, getBooks, getCreators } from '@/lib/content'
import type { Metadata } from 'next'

// Literal: Next segment config cannot import this. Re-checks publishedAt after deploy.
export const revalidate = 300

export const metadata: Metadata = {
  title: 'benessere.digital — Benessere Digitale per le Nuove Generazioni',
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const [{ docs: latestArticles }, apps, books, creators] = await Promise.all([
    getArticles({ limit: 4 }),
    getApps(),
    getBooks(),
    getCreators(),
  ])

  return (
    <main>
      <HeroSection />
      <SectionNavTabs />

      <section
        id="blog"
        className="section-md scroll-mt-24 bg-white"
        aria-label="Consigli dal nostro blog"
      >
        <div className="container-nav padding-global">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-h3 sm:text-h4">
              Consigli dal nostro <span className="text-pixel">blog</span>
            </h2>
            <Link
              href="/articoli"
              className="shrink-0 text-base font-semibold text-accent hover:text-accent-hover"
            >
              Tutti gli articoli
            </Link>
          </div>

          {latestArticles.length > 0 ? (
            <div className="flex max-w-3xl flex-col gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-10">
              <h3 className="mb-3 text-h4">I contenuti stanno arrivando</h3>
              <p className="max-w-xl text-lg text-muted">
                Stiamo pubblicando i nostri primi articoli. Iscriviti alla newsletter per essere il
                primo a leggerli.
              </p>
            </div>
          )}
        </div>
      </section>

      <GoogleWellbeingBanner />
      <CreatorsStrip creators={creators} />
      <VideosStrip />
      <PodcastsStrip />
      <AppsStrip apps={apps} />
      <BooksStrip books={books} />
      <ContactSection />
      <FaqSection />
      <NewsletterBanner />
    </main>
  )
}
