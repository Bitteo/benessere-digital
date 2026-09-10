import Link from 'next/link'

const formats = [
  {
    label: 'Articoli',
    description: 'Impara da autori esperti in materia',
    href: '#blog',
  },
  {
    label: 'Creator',
    description: 'Profili da seguire vicini al tema.',
    href: '#profili',
  },
  {
    label: 'Video',
    description: 'Contenuti da guardare per ispirarti.',
    href: '#video',
  },
  {
    label: 'Podcast',
    description: 'Approfondimenti da ascoltare in cuffia.',
    href: '#podcast',
  },
  {
    label: 'App',
    description: 'App per liberarsi dalla dipendenza.',
    href: '#app',
  },
  {
    label: 'Libri',
    description: 'Impara da autori esperti in materia',
    href: '#libri',
  },
]

export function FormatChooser() {
  return (
    <section className="section-md border-b border-border" aria-labelledby="format-chooser-heading">
      <div className="container-lg padding-global">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            id="format-chooser-heading"
            className="text-h2 sm:text-h3 leading-tight"
            style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
          >
            Impara a modo tuo, scegli il <span className="text-pixel">formato</span> che preferisci.
          </h2>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
          {formats.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col gap-2 p-6 border border-border rounded-nav-tab hover-lift"
            >
              <h3 className="text-h5" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
                {item.label}
              </h3>
              <p className="text-sm text-primary opacity-60 leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
