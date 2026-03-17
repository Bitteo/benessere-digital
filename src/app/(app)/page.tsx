import Link from 'next/link'
import { HeroSection } from '@/components/sections/HeroSection'
import { SectionNavTabs } from '@/components/sections/SectionNavTabs'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { getArticles } from '@/lib/payload'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'benessere.digital — Benessere Digitale per le Nuove Generazioni',
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  const { docs: latestArticles } = await getArticles({ limit: 6 })
  const featuredArticle = latestArticles[0]
  const gridArticles = latestArticles.slice(1)

  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Category nav tabs */}
      <SectionNavTabs />

      {/* Featured article */}
      {featuredArticle && (
        <section className="section-md border-b border-border" aria-label="Articolo in evidenza">
          <div className="container-lg padding-global">
            <div className="mb-8 flex items-end justify-between gap-4 sm:flex-col sm:items-start">
              <div>
                <p className="text-meta text-primary opacity-50 mb-2">In evidenza</p>
                <h2
                  className="text-h2 sm:text-h3"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  L&apos;articolo della settimana
                </h2>
              </div>
            </div>
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>
        </section>
      )}

      {/* Latest articles grid */}
      {gridArticles.length > 0 && (
        <section className="section-md border-b border-border" aria-label="Ultimi articoli">
          <div className="container-lg padding-global">
            <div className="mb-8 flex items-end justify-between gap-4 sm:flex-col sm:items-start">
              <div>
                <p className="text-meta text-primary opacity-50 mb-2">Ultime pubblicazioni</p>
                <h2
                  className="text-h2 sm:text-h3"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  Articoli recenti
                </h2>
              </div>
              <Link
                href="/articoli"
                className="text-sm font-semibold text-primary hover:text-cta-blue transition-colors whitespace-nowrap"
              >
                Tutti gli articoli →
              </Link>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="grid" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state when no articles are published yet */}
      {latestArticles.length === 0 && (
        <section className="section-lg" aria-label="Prossimamente">
          <div className="container-md padding-global text-center">
            <p className="text-meta text-primary opacity-40 mb-4">In arrivo</p>
            <h2
              className="text-h2 sm:text-h3 mb-4"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              I contenuti stanno arrivando
            </h2>
            <p className="text-md text-primary opacity-60">
              Stiamo pubblicando i nostri primi articoli. Iscriviti alla newsletter per essere il primo a leggerli.
            </p>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <NewsletterBanner />
    </main>
  )
}
