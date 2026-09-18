import Image from 'next/image'
import Link from 'next/link'

export function GoogleWellbeingBanner() {
  return (
    <section className="section-md" aria-labelledby="google-wellbeing-heading">
      <div className="container-lg padding-global">
        <div
          className="rounded-xl p-8 md:p-6 grid grid-cols-[1.4fr_1fr] md:grid-cols-1 gap-8 items-center overflow-hidden"
          style={{ backgroundColor: '#19242e' }}
        >
          <div className="flex flex-col gap-3">
            <h2
              id="google-wellbeing-heading"
              className="text-h2 sm:text-h3 text-white leading-tight"
              style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
            >
              Scopri il corso Google di introduzione al{' '}
              <span className="text-pixel">Digital Wellbeing</span>
            </h2>
            <p className="text-md text-white opacity-60">
              Costruisci abitudini tecnologiche sane e migliora il tuo stile di vita digitale!
            </p>
            <p className="text-sm text-white opacity-50">Durata: 19min</p>
            <div>
              <Link
                href="https://skillshop.exceedlms.com/student/path/690424-benessere-digitale"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Vai al corso
              </Link>
            </div>
          </div>
          <div className="relative md:hidden min-h-[18rem] self-stretch rounded-lg overflow-hidden bg-white">
            <Image
              src="/images/google-wellbeing-banner.png"
              alt="Illustrazione corso Google Digital Wellbeing"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 0px, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
