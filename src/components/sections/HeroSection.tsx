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
        <div className="flex min-h-[60vh] items-center gap-12 py-12 md:min-h-[70vh] md:flex-col md:gap-8 md:py-10 sm:min-h-[88vh] sm:gap-6 sm:py-8">
          {/* Content */}
          <div className="flex max-w-[37.5rem] flex-1 flex-col gap-6">
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
            <div className="mt-2">
              <NewsletterForm layout="inline" />
            </div>

            {/* Social proof / stats */}
            <div className="flex gap-8 pt-2 sm:gap-6">
              <div>
                <p
                  className="text-h4 font-bold text-primary"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  10K+
                </p>
                <p className="text-sm text-primary opacity-60">Lettori al mese</p>
              </div>
              <div>
                <p
                  className="text-h4 font-bold text-primary"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  200+
                </p>
                <p className="text-sm text-primary opacity-60">Articoli pubblicati</p>
              </div>
              <div>
                <p
                  className="text-h4 font-bold text-primary"
                  style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
                >
                  100%
                </p>
                <p className="text-sm text-primary opacity-60">Evidence-based</p>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
