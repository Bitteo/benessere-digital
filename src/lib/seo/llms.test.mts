import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { categories } from '../../content/catalog.ts'
import { isIndexableArticle } from '../article-availability.ts'
import { buildLlmsTxt } from './llms.ts'
import { CANONICAL_ORIGIN, STATIC_PUBLIC_PATHS, absoluteUrl } from './site.ts'

const NOW = new Date('2026-10-07T08:00:00.000Z')

type ArticleFile = {
  slug: string
  title: string
  status: 'draft' | 'published'
  publishedAt?: string
  categorySlugs?: string[]
  seo?: { noIndex?: boolean }
}

function loadArticles(): ArticleFile[] {
  const dir = new URL('../../content/articles/', import.meta.url)
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(readFileSync(new URL(name, dir), 'utf8')) as ArticleFile)
}

test('llms.txt lists the indexable inventory on www and keeps smartphone-a-scuola', () => {
  const indexable = loadArticles()
    .filter((article) => isIndexableArticle(article, NOW))
    .sort((a, b) => Date.parse(b.publishedAt ?? '') - Date.parse(a.publishedAt ?? ''))

  const used = new Set(indexable.flatMap((article) => article.categorySlugs ?? []))
  const hubs = categories.filter((category) => used.has(category.slug))
  const text = buildLlmsTxt({
    origin: CANONICAL_ORIGIN,
    staticPaths: STATIC_PUBLIC_PATHS,
    articles: indexable.map((article) => ({ title: article.title, slug: article.slug })),
    categories: hubs.map((category) => ({ name: category.name, slug: category.slug })),
  })

  assert.equal(CANONICAL_ORIGIN, 'https://www.benessere.digital')
  assert.doesNotMatch(text, /https:\/\/benessere\.digital/)
  assert.match(text, /https:\/\/www\.benessere\.digital\/sitemap\.xml/)
  assert.match(text, /https:\/\/www\.benessere\.digital\/robots\.txt/)
  assert.match(text, /\/articoli\/smartphone-a-scuola-cosa-funziona\)/)
  assert.doesNotMatch(text, /sharenting-foto-dei-figli-online/)
  assert.doesNotMatch(text, /videogiochi-e-ragazzi-quando-preoccuparsi/)
  assert.doesNotMatch(text, /compiti-e-ai-senza-delegare-il-pensiero/)
  assert.doesNotMatch(text, /fomo-jomo-social-senza-sparire/)
  assert.doesNotMatch(text, /doomscrolling-perche-il-pollice-non-si-ferma/)
  assert.doesNotMatch(text, /cyberbullismo-a-scuola-oltre-la-denuncia/)
  assert.doesNotMatch(text, /primo-smartphone-eta-e-regole/)
  assert.doesNotMatch(text, /controllo-prime-relazioni-adolescenti/)
  assert.doesNotMatch(text, /sextortion-foto-intime-primi-minuti/)
  assert.doesNotMatch(text, /categoria\/sicurezza-online/)
  assert.match(text, /\/categoria\/genitori-e-scuola\)/)

  for (const path of STATIC_PUBLIC_PATHS) {
    assert.ok(text.includes(absoluteUrl(path)), path)
  }

  const legalAt = text.indexOf('## Pagine legali')
  const hubsAt = text.indexOf('## Hub tematici')
  const privacyAt = text.indexOf(absoluteUrl('/privacy'))
  assert.ok(legalAt !== -1 && legalAt < privacyAt && privacyAt < hubsAt)

  const articleSection = text.split('## Articoli pubblicati')[1]?.split('## Crawl')[0] ?? ''
  assert.equal(articleSection.match(/^- /gm)?.length, indexable.length)

  const smartphone = text.indexOf('/articoli/smartphone-a-scuola-cosa-funziona')
  const accordi = text.indexOf('/articoli/accordi-di-schermo-ragazzi-8-14')
  assert.ok(smartphone !== -1 && accordi !== -1 && smartphone < accordi)
})

test('llms.txt does not invent articles that were not passed in', () => {
  const text = buildLlmsTxt({
    origin: CANONICAL_ORIGIN,
    staticPaths: ['/'],
    articles: [],
    categories: [],
  })
  assert.doesNotMatch(text, /## Articoli pubblicati/)
  assert.doesNotMatch(text, /## Hub tematici/)
  assert.match(text, /- \[Home\]\(https:\/\/www\.benessere\.digital\)/)
})
