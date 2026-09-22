import { NewsletterForm } from '../ui/NewsletterForm'
import { HeroVisual } from './HeroVisual'

export function HeroSection() {
  return (
    <section
      className="h-[60vh] border-b border-border md:h-auto"
      aria-labelledby="hero-heading"
    >
      <div className="container-lg padding-global h-full md:h-auto">
        {/* Webflow .layout4_component: height 60vh, place-items center end */}
        <div className="flex h-full items-stretch gap-12 md:h-auto md:flex-col md:items-center md:gap-8 md:py-10 sm:gap-5 sm:py-6">
          {/* Content */}
          <div className="flex max-w-[37.5rem] flex-1 flex-col justify-center gap-6 sm:gap-4">
            <div>
              <h1
                id="hero-heading"
                className="text-[4.5rem] leading-[1.1] sm:text-3xl"
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
