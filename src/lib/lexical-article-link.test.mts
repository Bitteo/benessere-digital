import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  articleFinder,
  lexicalArticleAnchor,
  type CatalogArticle,
} from './lexical-article-link.ts'

const FUTURE_SLUG = 'in-programma'
const PAST_SLUG = 'gia-online'
const FUTURE_AT = '2026-11-11T09:00:00.000+01:00'
const PAST_AT = '2026-09-23T09:00:00.000+02:00'

const catalog: CatalogArticle[] = [
  { slug: FUTURE_SLUG, status: 'published', publishedAt: FUTURE_AT },
  { slug: PAST_SLUG, status: 'published', publishedAt: PAST_AT },
  { slug: 'bozza', status: 'draft', publishedAt: PAST_AT },
]

const findArticle = articleFinder(catalog)
const beforeFuture = new Date(new Date(FUTURE_AT).getTime() - 1)
const atPast = new Date(PAST_AT)

test('future publishedAt renders no anchor', () => {
  for (const url of [
    `/articoli/${FUTURE_SLUG}`,
    `/articoli/${FUTURE_SLUG}/`,
    `/articoli/${FUTURE_SLUG}?ref=corpo`,
    `https://www.benessere.digital/articoli/${FUTURE_SLUG}`,
    `https://www.benessere.digital/articoli/${FUTURE_SLUG}#ancora`,
  ]) {
    assert.deepEqual(lexicalArticleAnchor(url, findArticle, beforeFuture), { kind: 'span' })
  }
})

test('past publishedAt renders an anchor', () => {
  const atPublished = new Date(FUTURE_AT)
  for (const url of [
    `/articoli/${FUTURE_SLUG}`,
    `https://www.benessere.digital/articoli/${FUTURE_SLUG}`,
    `https://www.benessere.digital/articoli/${FUTURE_SLUG}/`,
  ]) {
    assert.deepEqual(lexicalArticleAnchor(url, findArticle, atPublished), {
      kind: 'anchor',
      href: url,
    })
  }

  const relative = `/articoli/${PAST_SLUG}`
  const absolute = `https://www.benessere.digital/articoli/${PAST_SLUG}`
  const withQuery = `/articoli/${PAST_SLUG}?utm=1`
  assert.deepEqual(lexicalArticleAnchor(relative, findArticle, atPast), {
    kind: 'anchor',
    href: relative,
  })
  assert.deepEqual(lexicalArticleAnchor(absolute, findArticle, atPast), {
    kind: 'anchor',
    href: absolute,
  })
  assert.deepEqual(lexicalArticleAnchor(withQuery, findArticle, atPast), {
    kind: 'anchor',
    href: withQuery,
  })
})

test('unknown slug renders no anchor', () => {
  const now = new Date(FUTURE_AT)
  assert.deepEqual(lexicalArticleAnchor('/articoli/non-esiste', findArticle, now), { kind: 'span' })
  assert.deepEqual(
    lexicalArticleAnchor('https://www.benessere.digital/articoli/non-esiste', findArticle, now),
    { kind: 'span' },
  )
})

test('external URL renders an anchor', () => {
  const now = beforeFuture
  for (const url of [
    'https://example.com/articoli/in-programma',
    'https://benessere.digital/articoli/in-programma',
    'http://www.benessere.digital/articoli/in-programma',
    '/chi-siamo',
    '/articoli',
    '/categoria/sicurezza-online',
  ]) {
    assert.deepEqual(lexicalArticleAnchor(url, findArticle, now), { kind: 'anchor', href: url })
  }
})

test('draft articles render no anchor', () => {
  assert.deepEqual(lexicalArticleAnchor('/articoli/bozza', findArticle, atPast), { kind: 'span' })
})

function loadArticle(slug: string): CatalogArticle {
  const article = JSON.parse(
    readFileSync(new URL(`../content/articles/${slug}.json`, import.meta.url), 'utf8'),
  ) as CatalogArticle
  return { slug: article.slug, status: article.status, publishedAt: article.publishedAt }
}

test('file catalog hides the scheduled GSC targets on 2026-10-26 Europe/Rome', () => {
  const find = articleFinder([
    loadArticle('multitasking-digitale-scuola-e-compiti'),
    loadArticle('controllo-genitori-smartphone-proteggere-senza-spiare'),
    loadArticle('smartphone-a-scuola-cosa-funziona'),
  ])
  const romeNoon = new Date('2026-10-26T12:00:00.000+01:00')

  assert.deepEqual(
    lexicalArticleAnchor('/articoli/multitasking-digitale-scuola-e-compiti', find, romeNoon),
    { kind: 'span' },
  )
  assert.deepEqual(
    lexicalArticleAnchor(
      'https://www.benessere.digital/articoli/controllo-genitori-smartphone-proteggere-senza-spiare',
      find,
      romeNoon,
    ),
    { kind: 'span' },
  )
  assert.deepEqual(
    lexicalArticleAnchor('/articoli/smartphone-a-scuola-cosa-funziona', find, romeNoon),
    { kind: 'anchor', href: '/articoli/smartphone-a-scuola-cosa-funziona' },
  )

  const multitaskingLive = new Date('2026-11-11T09:00:00.000+01:00')
  assert.deepEqual(
    lexicalArticleAnchor(
      '/articoli/multitasking-digitale-scuola-e-compiti',
      find,
      multitaskingLive,
    ),
    { kind: 'anchor', href: '/articoli/multitasking-digitale-scuola-e-compiti' },
  )
})
