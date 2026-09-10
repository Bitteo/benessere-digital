import Link from 'next/link'

export function GoogleWellbeingBanner() {
  return (
    <section className="section-md" aria-labelledby="google-wellbeing-heading">
      <div className="container-lg padding-global">
        <div
          className="rounded-xl p-8 md:p-6 flex items-center justify-between gap-8 md:flex-col md:items-start"
          style={{ backgroundColor: '#19242e' }}
        >
          <div className="flex flex-col gap-3 max-w-2xl">
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
                href="https://grow.google/intl/it/courses-and-tools/?category=career&topic=wellbeing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Vai al corso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
