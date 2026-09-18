import Link from 'next/link'
import { HeroSection } from '@/components/sections/HeroSection'
import { FormatChooser } from '@/components/sections/FormatChooser'
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

export const metadata: Metadata = {
  title: 'benessere.digital — Benessere Digitale per le Nuove Generazioni',
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const [{ docs: latestArticles }, apps, books, creators] = await Promise.all([
    getArticles({ limit: 6 }),
    getApps(),
    getBooks(),
    getCreators(),
  ])
  const featuredArticle = latestArticles[0]
  const gridArticles = latestArticles.slice(1)

  return (
    <main>
      <HeroSection />
      <FormatChooser />
      <SectionNavTabs />

      <section
        id="blog"
        className="section-md scroll-mt-24 border-b border-border sm:py-8"
        aria-label="Consigli dal nostro blog"
      >
        <div className="container-lg padding-global">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-5 sm:flex-col sm:items-start">
            <h2 className="text-h2 sm:text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
              Consigli dal nostro <span className="text-pixel">blog</span>
            </h2>
            <Link
              href="/articoli"
              className="whitespace-nowrap text-sm font-semibold text-primary transition-colors hover:text-cta-blue"
            >
              Tutti gli articoli →
            </Link>
          </div>

          {featuredArticle && (
            <div className="mb-8 sm:mb-5">
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
          )}

          {gridArticles.length > 0 && (
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="grid" />
              ))}
            </div>
          )}

          {latestArticles.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-meta mb-4 text-primary opacity-40">In arrivo</p>
              <h3 className="mb-4 text-h3" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                I contenuti stanno arrivando
              </h3>
              <p className="text-md text-primary opacity-60">
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
