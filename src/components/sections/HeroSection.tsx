import { NewsletterForm } from '../ui/NewsletterForm'
import { HeroVisual } from './HeroVisual'

export function HeroSection() {
  return (
    <section className="bg-white" aria-labelledby="hero-heading">
      <div className="container-nav padding-global">
        <div className="flex min-h-[calc(100dvh-4.5rem)] items-center gap-10 md:min-h-0 md:flex-col md:items-stretch md:gap-6 md:py-6 sm:gap-5 sm:py-5">
          <div className="order-1 flex w-[46%] max-w-[36rem] flex-col justify-center gap-5 md:order-2 md:w-full md:max-w-none md:gap-4">
            <h1
              id="hero-heading"
              className="text-[clamp(1.65rem,3.4vw,3.35rem)] leading-[1.05] tracking-tight"
            >
              Il benessere <span className="text-pixel">digitale</span>{' '}
              <span className="whitespace-nowrap">inizia qui</span>
            </h1>
            <p className="max-w-[38rem] text-lg leading-relaxed text-muted">
              Articoli, guide e risorse scientifiche sul benessere digitale per giovani, genitori ed
              educatori. Gestione del tempo sullo schermo, salute mentale online, sicurezza
              digitale.
            </p>
            <div className="mt-1 max-w-[34rem]">
              <NewsletterForm layout="inline" />
            </div>
          </div>

          <div className="order-2 h-[calc(100dvh-4.5rem)] w-[54%] self-stretch md:order-1 md:h-auto md:w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
