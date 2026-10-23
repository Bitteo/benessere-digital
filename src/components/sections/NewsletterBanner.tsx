import Image from 'next/image'
import { NewsletterForm } from '../ui/NewsletterForm'

export function NewsletterBanner() {
  return (
    <section className="section-md" aria-labelledby="newsletter-banner-heading">
      <div className="container-lg padding-global">
        <div
          className="grid grid-cols-[1.4fr_1fr] items-center gap-8 overflow-hidden rounded-xl p-8 md:grid-cols-1 md:p-6"
          style={{ backgroundColor: '#19242e' }}
        >
          <div className="flex flex-col gap-4">
            <h2
              id="newsletter-banner-heading"
              className="text-h2 leading-tight text-white sm:text-h3"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              Resta aggiornato sul benessere digitale
            </h2>
            <p className="max-w-lg text-md text-white opacity-60">
              Ricevi ogni settimana i migliori articoli, guide e risorse scientifiche direttamente
              nella tua email.
            </p>
            <div className="mt-2 max-w-lg">
              <NewsletterForm layout="inline" placeholder="La tua email" tone="onDark" />
            </div>
          </div>
          <div className="relative min-h-[18rem] self-stretch overflow-hidden rounded-lg bg-white md:hidden">
            <Image
              src="/images/newsletter-banner.png"
              alt="Illustrazione newsletter benessere digitale"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 0px, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
