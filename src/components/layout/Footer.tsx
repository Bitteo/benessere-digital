import Image from 'next/image'
import Link from 'next/link'
import {
  ORGANIZATION_INSTAGRAM_URL,
  ORGANIZATION_LOGO_PATH,
  ORGANIZATION_REDDIT_URL,
  ORGANIZATION_SAME_AS,
  SITE_NAME,
  SITE_TAGLINE,
} from '@/lib/seo/site'

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
    href: ORGANIZATION_INSTAGRAM_URL,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          ry="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: ORGANIZATION_SAME_AS[1],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.07a8.16 8.16 0 004.77 1.52V7.15a4.85 4.85 0 01-1-.46z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: ORGANIZATION_SAME_AS[2],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="2"
          y="9"
          width="4"
          height="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: 'Reddit',
    href: ORGANIZATION_REDDIT_URL,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer aria-label="Piè di pagina">
      {/* Upper footer */}
      <div className="border-t border-border bg-surface-subtle">
        <div className="container-lg padding-global py-16 md:py-12 sm:py-10">
          <div className="grid grid-cols-[0.5fr_1fr] gap-12 lg:grid-cols-1">
            {/* Brand column */}
            <div className="flex flex-col gap-6">
              <Link href="/" aria-label="Torna alla homepage">
                <Image
                  src={ORGANIZATION_LOGO_PATH}
                  alt={SITE_NAME}
                  width={220}
                  height={26}
                  className="h-6 w-auto"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-primary opacity-70">
                {SITE_TAGLINE}
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
                    className="-m-2 p-2 text-primary transition-colors transition-transform duration-200 hover:-translate-y-1 hover:text-cta-blue-hover"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div className="grid grid-cols-[0.75fr_1fr] gap-8 sm:grid-cols-1">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-1">
                {/* Contenuti */}
                <div>
                  <h3 className="text-meta-small mb-4 text-primary">Contenuti</h3>
                  <ul className="flex flex-col gap-2.5">
                    {footerLinks.contenuti.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="inline-block py-2 text-base font-medium text-primary underline transition-colors hover:text-cta-blue-hover"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Azienda */}
                <div>
                  <h3 className="text-meta-small mb-4 text-primary">Azienda</h3>
                  <ul className="flex flex-col gap-2.5">
                    {footerLinks.azienda.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="inline-block py-2 text-base font-medium text-primary underline transition-colors hover:text-cta-blue-hover"
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
                <h3 className="text-meta-small mb-4 text-primary">Legale</h3>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.legale.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-2 text-base font-medium text-primary underline transition-colors hover:text-cta-blue-hover"
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
            <p className="text-sm text-white opacity-70">
              © {new Date().getFullYear()} benessere.digital. Tutti i diritti riservati.
            </p>
            <p className="flex items-center gap-2 text-sm text-white opacity-50 sm:justify-center">
              Un progetto{' '}
              <a
                href="https://jigo.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline transition-opacity hover:opacity-80"
                aria-label="Jigo"
              >
                <Image
                  src="/images/jigo-logo.svg"
                  alt="Jigo"
                  width={48}
                  height={16}
                  className="h-4 w-auto opacity-80 brightness-0 invert"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
