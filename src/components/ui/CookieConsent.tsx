'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import {
  COOKIE_CONSENT_ACCEPT,
  COOKIE_CONSENT_REJECT,
  COOKIE_CONSENT_STORAGE_KEY,
  persistCookieConsent,
  type CookieConsentValue,
} from '@/lib/analytics'

const FULL_COPY =
  'Facendo clic su "Accetto", consenti l\'uso dei cookie sul tuo dispositivo per migliorare la tua esperienza di navigazione, analizzare l\'utilizzo del sito e supportare la nostra iniziativa.'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const detailsId = useId()

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
      setVisible(stored !== COOKIE_CONSENT_ACCEPT && stored !== COOKIE_CONSENT_REJECT)
    } catch {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      document.body.classList.remove('has-cookie-banner')
      return
    }
    document.body.classList.add('has-cookie-banner')
    return () => document.body.classList.remove('has-cookie-banner')
  }, [visible])

  const choose = (value: CookieConsentValue) => {
    persistCookieConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[1000] bg-surface-subtle pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-label="Consenso cookie"
      aria-describedby="cookie-consent-copy"
    >
      <div className="container-nav padding-global flex items-center gap-4 py-3 sm:gap-3 sm:py-2">
        <div className="min-w-0 flex-1">
          <p id="cookie-consent-copy" className="text-[13px] leading-snug text-primary">
            <span className="md:hidden">
              {FULL_COPY} Consulta la{' '}
              <Link href="/privacy" className="underline hover:text-accent">
                Privacy Policy
              </Link>{' '}
              e la{' '}
              <Link href="/cookie" className="underline hover:text-accent">
                Cookie Policy
              </Link>
              .
            </span>
            <span className="hidden md:inline">
              Cookie per statistiche e navigazione.{' '}
              <Link href="/privacy" className="underline hover:text-accent">
                Privacy
              </Link>
              {' · '}
              <Link href="/cookie" className="underline hover:text-accent">
                Cookie
              </Link>
              .{' '}
              <button
                type="button"
                className="underline hover:text-accent"
                aria-expanded={detailsOpen}
                aria-controls={detailsId}
                onClick={() => setDetailsOpen((open) => !open)}
              >
                {detailsOpen ? 'Nascondi' : 'Dettagli'}
              </button>
            </span>
          </p>
          <p
            id={detailsId}
            className={`mt-1 text-[13px] leading-snug text-muted ${detailsOpen ? 'hidden md:block' : 'hidden'}`}
          >
            {FULL_COPY}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="btn-secondary h-10 px-3 text-base"
            onClick={() => choose('reject')}
          >
            Rifiuto
          </button>
          <button
            type="button"
            className="btn-primary h-10 px-3 text-base"
            onClick={() => choose('accept')}
          >
            Accetto
          </button>
        </div>
      </div>
    </div>
  )
}
