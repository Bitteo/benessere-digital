import Link from 'next/link'

export function ContactSection() {
  return (
    <section id="contatti" className="section-md border-b border-border scroll-mt-24">
      <div className="container-lg padding-global">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-12">
          <div>
            <h2 className="text-h2 sm:text-h3 mb-4" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
              Teniamoci in <span className="text-pixel">contatto</span>
            </h2>
            <p className="text-md text-primary opacity-60 leading-relaxed mb-6">
              Una domanda, una segnalazione o un&apos;idea di collaborazione: scrivici e ti rispondiamo.
            </p>
            <Link href="/contatti" className="btn-primary inline-flex">
              Vai alla pagina contatti
            </Link>
          </div>
          <div>
            <h3 className="text-h3 mb-6" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
              Perché scriverci?
            </h3>
            <ul className="flex flex-col gap-3 text-base text-primary opacity-80">
              <li>✓ &nbsp; Vuoi collaborare con noi e capire come contribuire al progetto</li>
              <li>✓ &nbsp; Vuoi segnalare un contenuto rilevante da inserire nella pagina</li>
              <li>✓ &nbsp; Sei il proprietario di un contenuto e vorresti che lo rimuovessimo :(</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
