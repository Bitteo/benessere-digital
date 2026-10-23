/**
 * Markdown index for LLM crawlers. Italian tone matches the historical llms.txt.
 * Callers must pass only indexable articles and the category hubs they use.
 */

const INTRO =
  'benessere.digital è la piattaforma italiana di informazione evidence-based sul benessere digitale. Aiutiamo giovani, genitori ed educatori a costruire un rapporto sano con la tecnologia: gestione del tempo sullo schermo, salute mentale online e sicurezza digitale. I contenuti sono informativi e basati su fonti verificabili; non sostituiscono un parere medico.'

const USAGE =
  'Le pagine pubbliche possono essere citate. I contenuti non costituiscono consiglio medico né diagnosi. Per correzioni, segnalazioni o richieste: [ciao@benessere.digital](mailto:ciao@benessere.digital).'

/** Mirrors the legal paths in site.ts. */
const LEGAL_PATHS = new Set(['/privacy', '/termini', '/cookie'])

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/articoli': 'Articoli',
  '/categorie': 'Categorie',
  '/chi-siamo': 'Chi siamo',
  '/collabora': 'Collabora',
  '/contatti': 'Contatti',
  '/newsletter': 'Newsletter',
  '/privacy': 'Privacy Policy',
  '/termini': 'Termini di utilizzo',
  '/cookie': 'Cookie Policy',
}

export type LlmsLink = {
  title: string
  slug: string
}

export type LlmsCategory = {
  name: string
  slug: string
}

function escapeMarkdownLabel(label: string): string {
  return label
    .replace(/[\r\n]+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
}

function absoluteLink(origin: string, path: string): string {
  if (path === '/' || path === '') return origin
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

function bullet(origin: string, path: string, label: string): string {
  return `- [${escapeMarkdownLabel(label)}](${absoluteLink(origin, path)})`
}

function section(title: string, lines: string[]): string | null {
  if (!lines.length) return null
  return [`## ${title}`, '', ...lines].join('\n')
}

export function buildLlmsTxt(input: {
  origin: string
  staticPaths: readonly string[]
  articles: readonly LlmsLink[]
  categories: readonly LlmsCategory[]
}): string {
  const origin = input.origin.replace(/\/$/, '')
  const mainLines = input.staticPaths
    .filter((path) => !LEGAL_PATHS.has(path))
    .map((path) => bullet(origin, path, PAGE_LABELS[path] ?? path))
  const legalLines = input.staticPaths
    .filter((path) => LEGAL_PATHS.has(path))
    .map((path) => bullet(origin, path, PAGE_LABELS[path] ?? path))
  const categoryLines = input.categories.map((category) =>
    bullet(origin, `/categoria/${category.slug}`, category.name),
  )
  const articleLines = input.articles.map((article) =>
    bullet(origin, `/articoli/${article.slug}`, article.title),
  )
  const crawlLines = [
    bullet(origin, '/sitemap.xml', 'sitemap.xml'),
    bullet(origin, '/robots.txt', 'robots.txt'),
  ]

  const parts = [
    `# benessere.digital\n\n${INTRO}`,
    section('Pagine principali', mainLines),
    section('Pagine legali', legalLines),
    section('Hub tematici', categoryLines),
    section('Articoli pubblicati', articleLines),
    section('Crawl', crawlLines),
    `## Utilizzo\n\n${USAGE}`,
  ].filter((part): part is string => Boolean(part))

  return `${parts.join('\n\n')}\n`
}
