import type { ArticleSourceRef } from '@/content/types'

type Props = {
  sources: ArticleSourceRef[]
}

export function ArticleSources({ sources }: Props) {
  if (!sources.length) return null

  return (
    <section className="mt-10 border-t border-border pt-8" aria-labelledby="article-sources-heading">
      <h2
        id="article-sources-heading"
        className="mb-4 text-meta text-primary opacity-50"
        style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
      >
        Fonti
      </h2>
      <ol className="flex list-decimal flex-col gap-3 pl-5 text-sm leading-relaxed text-primary opacity-80">
        {sources.map((source) => (
          <li key={`${source.title}-${source.url ?? ''}`}>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-border underline-offset-2 hover:opacity-80"
              >
                {source.title}
              </a>
            ) : (
              <span>{source.title}</span>
            )}
            {source.note ? <span className="opacity-70"> — {source.note}</span> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
