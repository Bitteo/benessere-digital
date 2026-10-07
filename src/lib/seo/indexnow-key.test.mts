import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

const publicDir = new URL('../../../public/', import.meta.url)

function keyFileNames(): string[] {
  return readdirSync(publicDir).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name))
}

test('IndexNow key file is exactly 32 hex chars and has no trailing newline', () => {
  const names = keyFileNames()
  assert.equal(names.length, 1)
  const key = names[0].slice(0, -'.txt'.length)
  const bytes = readFileSync(new URL(names[0], publicDir))
  assert.equal(bytes.length, 32)
  assert.equal(bytes.toString('utf8'), key)
})

test('.env.example INDEXNOW_KEY matches the public key file', () => {
  const key = keyFileNames()[0].slice(0, -'.txt'.length)
  const example = readFileSync(new URL('../../../.env.example', import.meta.url), 'utf8')
  assert.match(example, new RegExp(`^INDEXNOW_KEY=${key}$`, 'm'))
  assert.match(example, /^# CRON_SECRET=$/m)
  assert.match(example, /^# INDEXNOW_SUBMIT_SECRET=$/m)
})

test('public/llms.txt is absent so the app route is the index', () => {
  const names = readdirSync(publicDir)
  assert.equal(names.includes('llms.txt'), false)
})
