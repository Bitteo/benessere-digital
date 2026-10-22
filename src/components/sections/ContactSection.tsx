import Link from 'next/link'

const reasons = [
  'Vuoi collaborare con noi e capire come contribuire al progetto',
  'Vuoi segnalare un contenuto rilevante da inserire nella pagina',
  'Sei il proprietario di un contenuto e vorresti che lo rimuovessimo',
]

export function ContactSection() {
  return (
    <section id="contatti" className="section-md scroll-mt-24 bg-surface-subtle">
      <div className="container-nav padding-global">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-1 md:gap-8">
          <div>
            <h2 className="mb-3 text-h3 sm:text-h4">
              Teniamoci in <span className="text-pixel">contatto</span>
            </h2>
            <p className="mb-6 max-w-md text-lg leading-relaxed text-muted">
              Una domanda, una segnalazione o un&apos;idea di collaborazione: scrivici e ti
              rispondiamo.
            </p>
            <Link href="/contatti" className="btn-primary inline-flex">
              Vai alla pagina contatti
            </Link>
          </div>
          <div>
            <h3 className="mb-4 text-h5">Perché scriverci?</h3>
            <ul className="flex flex-col gap-3 text-base leading-relaxed text-primary">
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
