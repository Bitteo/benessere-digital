import { ORGANIZATION_INSTAGRAM_URL, ORGANIZATION_REDDIT_URL } from '@/lib/seo/site'

const linkClass =
  'font-semibold text-accent underline decoration-accent/40 underline-offset-2 hover:text-accent-hover'

export function ArticleCommunity() {
  return (
    <aside
      className="mt-12 bg-surface-subtle px-5 py-4"
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
      <p className="mt-1 text-base leading-relaxed text-muted">
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
