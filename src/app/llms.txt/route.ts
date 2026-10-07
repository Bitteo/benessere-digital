import { getIndexableInventory } from '@/lib/seo/indexable'
import { buildLlmsTxt } from '@/lib/seo/llms'
import { CANONICAL_ORIGIN, STATIC_PUBLIC_PATHS } from '@/lib/seo/site'

// Literal: Next segment config cannot import this. Re-checks publishedAt after deploy.
export const revalidate = 300

export async function GET() {
  const { articles, categories } = await getIndexableInventory()
  const body = buildLlmsTxt({
    origin: CANONICAL_ORIGIN,
    staticPaths: STATIC_PUBLIC_PATHS,
    articles,
    categories,
  })

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
