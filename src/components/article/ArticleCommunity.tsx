import { Montserrat } from 'next/font/google'
import { ORGANIZATION_INSTAGRAM_URL, ORGANIZATION_REDDIT_URL } from '@/lib/seo/site'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

const linkClass =
  'font-semibold text-accent-coral underline decoration-accent-coral/40 underline-offset-2 hover:opacity-80'

export function ArticleCommunity() {
  return (
    <aside
      className={`${montserrat.className} mt-10 rounded-lg border border-l-4 border-border border-l-accent-coral bg-surface-subtle px-5 py-4`}
      aria-label="Community su Instagram e Reddit"
    >
      <p className="text-base font-semibold leading-relaxed text-primary">
        Seguici su{' '}
        <a
          href={ORGANIZATION_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Instagram
        </a>{' '}
        e{' '}
        <a
          href={ORGANIZATION_REDDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Reddit
        </a>
      </p>
      <p className="mt-1 text-sm leading-relaxed text-primary opacity-80">
        Ne parliamo su{' '}
        <a
          href={ORGANIZATION_REDDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          r/benesseredigitale
        </a>
        .
      </p>
    </aside>
  )
}
