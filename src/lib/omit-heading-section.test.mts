import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  lexicalPlainText,
  omitHeadingSection,
  type LexicalLikeNode,
} from './omit-heading-section.ts'

type ArticleFile = {
  slug: string
  faq?: { question: string; answer: string }[]
  content?: { root?: { children?: LexicalLikeNode[] } }
}

function loadArticles(): ArticleFile[] {
  const dir = new URL('../content/articles/', import.meta.url)
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(readFileSync(new URL(name, dir), 'utf8')) as ArticleFile)
}

function headings(children: LexicalLikeNode[]): { tag?: string; text: string }[] {
  return children
    .filter((node) => node.type === 'heading')
    .map((node) => ({ tag: node.tag, text: lexicalPlainText(node).trim() }))
}

test('omitHeadingSection drops only the named section and keeps the following heading', () => {
  const children: LexicalLikeNode[] = [
    { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Prima' }] },
    { type: 'paragraph', children: [{ type: 'text', text: 'Corpo che resta.' }] },
    { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Domande corte' }] },
    { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Domanda?' }] },
    { type: 'paragraph', children: [{ type: 'text', text: 'Risposta duplicata.' }] },
    { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Chiusura' }] },
    { type: 'paragraph', children: [{ type: 'text', text: 'Questo paragrafo resta.' }] },
  ]

  const next = omitHeadingSection(children, 'Domande corte')
  assert.deepEqual(
    headings(next).map((heading) => heading.text),
    ['Prima', 'Chiusura'],
  )
  assert.equal(lexicalPlainText({ children: next }).includes('Risposta duplicata'), false)
  assert.equal(lexicalPlainText({ children: next }).includes('Questo paragrafo resta.'), true)
  assert.equal(lexicalPlainText({ children: next }).includes('Corpo che resta.'), true)
})

test('articles keep a single in-body copy of faq[] and any closing section', () => {
  const articles = loadArticles().filter((article) => article.faq?.length)
  assert.ok(articles.length > 0)

  for (const article of articles) {
    const children = article.content?.root?.children ?? []
    const before = headings(children)
    const inlineIndex = before.findIndex(
      (heading) => heading.tag === 'h2' && heading.text === 'Domande corte',
    )
    const next = omitHeadingSection(children, 'Domande corte')
    const after = headings(next)

    assert.equal(
      after.some((heading) => heading.text === 'Domande corte'),
      false,
      article.slug,
    )

    if (inlineIndex < 0) {
      assert.deepEqual(after, before, article.slug)
      continue
    }

    const closing = before.slice(inlineIndex + 1).find((heading) => heading.tag === 'h2')
    if (closing) {
      assert.ok(
        after.some((heading) => heading.tag === 'h2' && heading.text === closing.text),
        `${article.slug} lost ${closing.text}`,
      )
    }

    const afterTexts = new Set(after.map((heading) => heading.text))
    for (const item of article.faq ?? []) {
      assert.equal(afterTexts.has(item.question), false, `${article.slug}: ${item.question}`)
    }

    assert.deepEqual(after.slice(0, inlineIndex), before.slice(0, inlineIndex), article.slug)
  }
})
