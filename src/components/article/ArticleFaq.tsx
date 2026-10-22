import type { ArticleFaqItem } from '@/content/types'

type Props = {
  faq: ArticleFaqItem[]
}

/**
 * Visible FAQ. Question and answer strings are the same values emitted as FAQPage JSON-LD.
 * Do not rewrite, summarize, or add items that are not on article.faq.
 */
export function ArticleFaq({ faq }: Props) {
  if (!faq.length) return null

  return (
    <section className="mt-12" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="mb-5 text-2xl font-semibold tracking-tight">
        Domande frequenti
      </h2>
      <dl className="flex flex-col gap-6">
        {faq.map((item) => (
          <div key={item.question}>
            <dt className="text-lg font-semibold leading-snug text-primary">{item.question}</dt>
            <dd className="mt-2 whitespace-pre-line text-base leading-relaxed text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
