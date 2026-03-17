import Link from 'next/link'

type NavTab = {
  label: string
  description: string
  href: string
  icon: React.ReactNode
}

const tabs: NavTab[] = [
  {
    label: 'Schermo & tempo',
    description: 'Gestione del tempo sullo schermo per giovani e famiglie.',
    href: '/categoria/schermo-e-tempo',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Salute mentale',
    description: 'Impatto del digitale sul benessere psicologico.',
    href: '/categoria/salute-mentale',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Social media',
    description: 'Uso consapevole delle piattaforme social.',
    href: '/categoria/social-media',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 2h-3a5 5 0 00-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Sicurezza online',
    description: 'Privacy, cyberbullismo e sicurezza per i giovani.',
    href: '/categoria/sicurezza-online',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Genitori & scuola',
    description: 'Risorse per genitori ed educatori.',
    href: '/categoria/genitori-e-scuola',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'App & strumenti',
    description: 'Le migliori app per il benessere digitale.',
    href: '/categoria/app-e-strumenti',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export function SectionNavTabs() {
  return (
    <section className="section-md border-b border-border" aria-label="Categorie principali">
      <div className="container-lg padding-global">
        <div className="mb-8">
          <p className="text-meta text-primary opacity-50 mb-2">Esplora per categoria</p>
          <h2
            className="text-h2 sm:text-h3"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Di cosa ci occupiamo
          </h2>
        </div>

        <div className="grid grid-cols-6 lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="
                flex flex-col gap-3 p-6 border border-border rounded-nav-tab
                text-primary hover-lift
                transition-colors duration-100 hover:border-accent-blue
              "
            >
              <span className="text-icon">{tab.icon}</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                  {tab.label}
                </p>
                <p className="text-tiny text-primary opacity-60 leading-relaxed">
                  {tab.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
