import type { ArticleSourceRef } from '@/content/types'

type Props = {
  sources: ArticleSourceRef[]
}

export function ArticleSources({ sources }: Props) {
  if (!sources.length) return null

  return (
    <section className="mt-12" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading" className="mb-4 text-2xl font-semibold tracking-tight">
        Fonti
      </h2>
      <ol className="flex list-decimal flex-col gap-3 pl-5 text-base leading-relaxed text-muted">
        {sources.map((source) => (
          <li key={`${source.title}-${source.url ?? ''}`}>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/40 underline-offset-2 hover:text-accent-hover"
              >
                {source.title}
              </a>
            ) : (
              <span className="text-primary">{source.title}</span>
            )}
            {source.note ? <span> — {source.note}</span> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
