import { NewsletterForm } from '../ui/NewsletterForm'
import { HeroVisual } from './HeroVisual'

export function HeroSection() {
  return (
    <section
      className="border-b border-border"
      style={{ minHeight: '60vh' }}
      aria-labelledby="hero-heading"
    >
      <div className="container-lg padding-global h-full">
        <div className="flex min-h-[60vh] items-center gap-12 py-12 md:min-h-0 md:flex-col md:gap-8 md:py-10 sm:gap-5 sm:py-6">
          {/* Content */}
          <div className="flex max-w-[37.5rem] flex-1 flex-col gap-6 sm:gap-4">
            <div>
              <h1
                id="hero-heading"
                className="text-h1 leading-tight sm:text-3xl"
                style={{ fontFamily: 'FuturaPT-Demi, sans-serif', fontWeight: 700 }}
              >
                Il benessere <span className="text-pixel">digitale</span> inizia qui
              </h1>
            </div>
            <p className="text-md leading-relaxed text-primary opacity-60">
              Articoli, guide e risorse scientifiche sul benessere digitale per giovani, genitori ed
              educatori. Gestione del tempo sullo schermo, salute mentale online, sicurezza
              digitale.
            </p>

            {/* Inline newsletter form */}
            <div className="mt-2 sm:mt-0">
              <NewsletterForm layout="inline" />
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
