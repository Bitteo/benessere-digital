import Image from 'next/image'
import { NewsletterForm } from '../ui/NewsletterForm'

export function NewsletterBanner() {
  return (
    <section
      className="section-md"
      aria-labelledby="newsletter-banner-heading"
    >
      <div className="container-lg padding-global">
        <div
          className="rounded-xl p-8 md:p-6 grid grid-cols-[1.4fr_1fr] md:grid-cols-1 gap-8 items-center overflow-hidden"
          style={{ backgroundColor: '#19242e' }}
        >
          <div className="flex flex-col gap-4">
            <h2
              id="newsletter-banner-heading"
              className="text-h2 sm:text-h3 text-white leading-tight"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              Resta aggiornato sul benessere digitale
            </h2>
            <p className="text-md text-white opacity-60 max-w-lg">
              Ricevi ogni settimana i migliori articoli, guide e risorse scientifiche direttamente nella tua email.
            </p>
            <div className="mt-2 max-w-lg">
              <NewsletterForm layout="inline" placeholder="La tua email" />
            </div>
          </div>
          <div className="relative md:hidden min-h-[18rem] self-stretch rounded-lg overflow-hidden bg-white">
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
