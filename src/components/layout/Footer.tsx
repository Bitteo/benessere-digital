import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  contenuti: [
    { label: 'Articoli', href: '/articoli' },
    { label: 'Categorie', href: '/categorie' },
    { label: 'Newsletter', href: '/newsletter' },
  ],
  azienda: [
    { label: 'Chi siamo', href: '/chi-siamo' },
    { label: 'Contatti', href: '/contatti' },
    { label: 'Collabora con noi', href: '/collabora' },
  ],
  legale: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookie' },
    { label: 'Termini di utilizzo', href: '/termini' },
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/benessere.digital',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@benessere.digital',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.07a8.16 8.16 0 004.77 1.52V7.15a4.85 4.85 0 01-1-.46z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/benessere-digital',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer aria-label="Piè di pagina">
      {/* Upper footer */}
      <div className="bg-surface-subtle border-t border-border">
        <div className="container-lg padding-global py-16 md:py-12 sm:py-10">
          <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-1 gap-12">
            {/* Brand column */}
            <div className="flex flex-col gap-6">
              <Link href="/" aria-label="Torna alla homepage">
                <Image
                  src="/images/benessere.digital.svg"
                  alt="benessere.digital"
                  width={220}
                  height={26}
                  className="h-6 w-auto"
                />
              </Link>
              <p className="text-sm text-primary opacity-70 leading-relaxed max-w-xs">
                La principale piattaforma italiana sul benessere digitale per le nuove generazioni.
              </p>
              {/* Social icons */}
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-primary hover:text-cta-blue-hover transition-colors hover:-translate-y-1 transition-transform duration-200 p-2 -m-2"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div className="grid grid-cols-[0.75fr_1fr] sm:grid-cols-1 gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
                {/* Contenuti */}
                <div>
                  <h3 className="text-meta-small text-primary mb-4">Contenuti</h3>
                  <ul className="flex flex-col gap-2.5">
                    {footerLinks.contenuti.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-base font-medium text-primary underline hover:text-cta-blue-hover transition-colors inline-block py-2"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Azienda */}
                <div>
                  <h3 className="text-meta-small text-primary mb-4">Azienda</h3>
                  <ul className="flex flex-col gap-2.5">
                    {footerLinks.azienda.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-base font-medium text-primary underline hover:text-cta-blue-hover transition-colors inline-block py-2"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Legale */}
              <div>
                <h3 className="text-meta-small text-primary mb-4">Legale</h3>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.legale.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-base font-medium text-primary underline hover:text-cta-blue-hover transition-colors inline-block py-2"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-primary">
        <div className="container-lg padding-global py-8">
          <div className="flex items-center justify-between sm:flex-col sm:gap-3 sm:text-center">
            <p className="text-white text-sm opacity-70">
              © {new Date().getFullYear()} benessere.digital. Tutti i diritti riservati.
            </p>
            <p className="text-white text-sm opacity-50 flex items-center gap-2 sm:justify-center">
              Un progetto{' '}
              <a
                href="https://jigo.it"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80 transition-opacity inline-flex items-center"
                aria-label="Jigo"
              >
                <Image
                  src="/images/jigo-logo.svg"
                  alt="Jigo"
                  width={48}
                  height={16}
                  className="h-4 w-auto brightness-0 invert opacity-80"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
