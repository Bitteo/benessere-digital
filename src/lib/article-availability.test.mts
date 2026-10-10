import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { isIndexableArticle, isPubliclyAvailable } from './article-availability.ts'

const past = new Date('2026-09-30T07:00:00.000Z')
const future = new Date('2026-10-20T07:00:00.000Z')

test('drafts stay hidden even when publishedAt is in the past', () => {
  assert.equal(
    isPubliclyAvailable({ status: 'draft', publishedAt: '2026-09-01T09:00:00.000+02:00' }, future),
    false,
  )
})

test('published articles are public at publishedAt and after, hidden before', () => {
  const article = { status: 'published' as const, publishedAt: '2026-10-07T09:00:00.000+02:00' }
  const atInstant = new Date('2026-10-07T07:00:00.000Z')

  assert.equal(isPubliclyAvailable(article, new Date(atInstant.getTime() - 1)), false)
  assert.equal(isPubliclyAvailable(article, atInstant), true)
  assert.equal(isPubliclyAvailable(article, future), true)
})

test('published articles without a parseable publishedAt stay hidden', () => {
  assert.equal(isPubliclyAvailable({ status: 'published' }, past), false)
  assert.equal(isPubliclyAvailable({ status: 'published', publishedAt: '' }, past), false)
  assert.equal(isPubliclyAvailable({ status: 'published', publishedAt: 'not-a-date' }, past), false)
})

function loadArticle(slug: string) {
  return JSON.parse(
    readFileSync(new URL(`../content/articles/${slug}.json`, import.meta.url), 'utf8'),
  ) as { status: 'draft' | 'published'; publishedAt?: string; seo?: { noIndex?: boolean } }
}

test('scheduled published articles stay hidden until their publishedAt instant', () => {
  for (const slug of [
    'smartphone-a-scuola-cosa-funziona',
    'fomo-jomo-social-senza-sparire',
    'videogiochi-e-ragazzi-quando-preoccuparsi',
    'compiti-e-ai-senza-delegare-il-pensiero',
    'sharenting-foto-dei-figli-online',
  ]) {
    const article = loadArticle(slug)
    assert.equal(article.status, 'published')
    const publishedAt = new Date(article.publishedAt ?? '')
    assert.equal(Number.isNaN(publishedAt.getTime()), false)
    assert.equal(isPubliclyAvailable(article, new Date(publishedAt.getTime() - 1)), false)
    assert.equal(isPubliclyAvailable(article, publishedAt), true)
  }
})

test('month-2 articles stay hidden until their publishedAt', () => {
  for (const slug of [
    'doomscrolling-perche-il-pollice-non-si-ferma',
    'controllo-genitori-smartphone-proteggere-senza-spiare',
    'cyberbullismo-a-scuola-oltre-la-denuncia',
    'multitasking-digitale-scuola-e-compiti',
  ]) {
    const article = loadArticle(slug)
    assert.equal(article.status, 'published')
    assert.equal(article.seo?.noIndex, false)
    const publishedAt = new Date(article.publishedAt ?? '')
    assert.equal(Number.isNaN(publishedAt.getTime()), false)
    assert.equal(isPubliclyAvailable(article, new Date(publishedAt.getTime() - 1)), false)
    assert.equal(isPubliclyAvailable(article, publishedAt), true)
    assert.equal(isPubliclyAvailable(article, future), false)
  }
})

test('noIndex keeps a published article out of sitemap and llms.txt', () => {
  const article = {
    status: 'published' as const,
    publishedAt: '2026-09-01T09:00:00.000+02:00',
    seo: { noIndex: true },
  }
  assert.equal(isPubliclyAvailable(article, future), true)
  assert.equal(isIndexableArticle(article, future), false)
  assert.equal(isIndexableArticle({ ...article, seo: { noIndex: false } }, future), true)
})

test('november safety drafts stay off public pages, sitemap and llms.txt', () => {
  for (const slug of [
    'controllo-prime-relazioni-adolescenti',
    'sextortion-foto-intime-primi-minuti',
  ]) {
    const article = loadArticle(slug)
    assert.equal(article.status, 'draft')
    assert.equal(article.seo?.noIndex, true)
    assert.equal(isPubliclyAvailable(article, past), false)
    assert.equal(isPubliclyAvailable(article, future), false)
    assert.equal(isIndexableArticle(article, past), false)
    assert.equal(isIndexableArticle(article, future), false)
  }
})

test('an already-due published article is public', () => {
  const article = loadArticle('accordi-di-schermo-ragazzi-8-14')
  assert.equal(article.status, 'published')
  const publishedAt = new Date(article.publishedAt ?? '')
  assert.equal(isPubliclyAvailable(article, publishedAt), true)
  assert.equal(isPubliclyAvailable(article, past), true)
})
