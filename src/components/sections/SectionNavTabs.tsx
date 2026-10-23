import Link from 'next/link'

const categories = [
  {
    label: 'Schermo e tempo',
    description: 'Gestione del tempo sullo schermo per giovani e famiglie.',
    href: '/categoria/schermo-e-tempo',
  },
  {
    label: 'Salute mentale',
    description: 'Impatto del digitale sul benessere psicologico.',
    href: '/categoria/salute-mentale',
  },
  {
    label: 'Social media',
    description: 'Uso consapevole delle piattaforme social.',
    href: '/categoria/social-media',
  },
  {
    label: 'Sicurezza online',
    description: 'Privacy, cyberbullismo e sicurezza per i giovani.',
    href: '/categoria/sicurezza-online',
  },
  {
    label: 'Genitori e scuola',
    description: 'Risorse per genitori ed educatori.',
    href: '/categoria/genitori-e-scuola',
  },
  {
    label: 'App e strumenti',
    description: 'Le migliori app per il benessere digitale.',
    href: '/categoria/app-e-strumenti',
  },
]

export function SectionNavTabs() {
  return (
    <section className="section-md bg-surface-subtle" aria-label="Categorie principali">
      <div className="container-nav padding-global">
        <h2 className="mb-6 text-h3 sm:text-h4">Di cosa ci occupiamo</h2>
        <ul className="flex flex-col">
          {categories.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group grid grid-cols-[minmax(12rem,16rem)_1fr] items-baseline gap-8 py-3.5 md:grid-cols-1 md:gap-1 md:py-3"
              >
                <span className="text-xl font-semibold tracking-tight text-primary group-hover:text-accent sm:text-lg">
                  {item.label}
                </span>
                <span className="text-base leading-relaxed text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
