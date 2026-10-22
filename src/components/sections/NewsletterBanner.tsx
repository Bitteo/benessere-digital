import Image from 'next/image'
import { NewsletterForm } from '../ui/NewsletterForm'

export function NewsletterBanner() {
  return (
    <section className="bg-primary" aria-labelledby="newsletter-banner-heading">
      <div className="container-nav padding-global py-12 md:py-10 sm:py-8">
        <div className="grid grid-cols-[1.3fr_0.8fr] items-center gap-8 md:grid-cols-1">
          <div className="flex flex-col gap-4">
            <h2
              id="newsletter-banner-heading"
              className="text-h3 leading-tight text-white sm:text-h4"
            >
              Resta aggiornato sul benessere digitale
            </h2>
            <p className="max-w-lg text-lg text-white/90">
              Ricevi ogni settimana i migliori articoli, guide e risorse scientifiche direttamente
              nella tua email.
            </p>
            <div className="mt-1 max-w-lg">
              <NewsletterForm layout="inline" placeholder="La tua email" tone="onDark" />
            </div>
          </div>
          <div className="relative min-h-[14rem] self-stretch overflow-hidden bg-white md:hidden">
            <Image
              src="/images/newsletter-banner.png"
              alt="Illustrazione newsletter benessere digitale"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 0px, 36vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
