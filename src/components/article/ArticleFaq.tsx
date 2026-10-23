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
    <section className="mt-10 border-t border-border pt-8" aria-labelledby="article-faq-heading">
      <h2
        id="article-faq-heading"
        className="mb-4 text-meta text-primary opacity-50"
        style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
      >
        Domande frequenti
      </h2>
      <dl className="flex flex-col gap-6">
        {faq.map((item) => (
          <div key={item.question}>
            <dt className="text-base font-semibold leading-relaxed text-primary">{item.question}</dt>
            <dd className="mt-2 whitespace-pre-line text-base leading-relaxed text-primary opacity-80">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
