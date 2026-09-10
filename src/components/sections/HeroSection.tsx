import Link from 'next/link'
import Image from 'next/image'
import { NewsletterForm } from '../ui/NewsletterForm'

export function HeroSection() {
  return (
    <section
      className="border-b border-border"
      style={{ minHeight: '60vh' }}
      aria-labelledby="hero-heading"
    >
      <div className="container-lg padding-global h-full">
        <div className="flex items-center gap-12 md:flex-col md:gap-8 sm:gap-6 min-h-[60vh] md:min-h-[70vh] sm:min-h-[88vh] py-12 md:py-10 sm:py-8">
          {/* Content */}
          <div className="flex-1 flex flex-col gap-6 max-w-[37.5rem]">
            <div>
              <h1
                id="hero-heading"
                className="text-h1 sm:text-3xl leading-tight"
                style={{ fontFamily: 'FuturaPT-Demi, sans-serif', fontWeight: 700 }}
              >
                Il benessere{' '}
                <span className="text-pixel">digitale</span>
                {' '}inizia qui
              </h1>
            </div>
            <p className="text-md text-primary opacity-60 leading-relaxed">
              Articoli, guide e risorse scientifiche sul benessere digitale per giovani, genitori ed educatori.
              Gestione del tempo sullo schermo, salute mentale online, sicurezza digitale.
            </p>

            {/* Inline newsletter form */}
            <div className="mt-2">
              <NewsletterForm layout="inline" />
            </div>

            {/* Social proof / stats */}
            <div className="flex gap-8 sm:gap-6 pt-2">
              <div>
                <p className="text-h4 font-bold text-primary" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  10K+
                </p>
                <p className="text-sm text-primary opacity-60">Lettori al mese</p>
              </div>
              <div>
                <p className="text-h4 font-bold text-primary" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  200+
                </p>
                <p className="text-sm text-primary opacity-60">Articoli pubblicati</p>
              </div>
              <div>
                <p className="text-h4 font-bold text-primary" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  100%
                </p>
                <p className="text-sm text-primary opacity-60">Evidence-based</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="flex-1 relative md:w-full"
            style={{ minHeight: '28rem', borderRadius: '0.25rem 0 0 0.25rem' }}
          >
            <Image
              src="/images/hero-benessere-digital.png"
              alt="Una persona che medita, in pieno controllo della sua mente, fa fluttuare dispositivi elettronici intorno a lui."
              fill
              className="object-cover"
              style={{ borderRadius: '0.25rem 0 0 0.25rem' }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
