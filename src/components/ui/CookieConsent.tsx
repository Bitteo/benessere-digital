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
      className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-border bg-white pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-label="Consenso cookie"
      aria-describedby="cookie-consent-copy"
    >
      <div className="container-lg padding-global flex items-center justify-between gap-6 py-5 md:flex-col md:items-stretch md:gap-3 md:py-3 sm:gap-2 sm:py-2.5">
        <div className="min-w-0 max-w-3xl">
          <p
            id="cookie-consent-copy"
            className="text-sm leading-relaxed text-primary opacity-80 md:hidden"
          >
            {FULL_COPY} Consulta la nostra{' '}
            <Link href="/privacy" className="underline hover:text-cta-blue">
              Privacy Policy
            </Link>{' '}
            e la{' '}
            <Link href="/cookie" className="underline hover:text-cta-blue">
              Cookie Policy
            </Link>{' '}
            per ulteriori dettagli.
          </p>

          <p className="hidden text-tiny leading-snug text-primary opacity-80 md:block">
            Usiamo cookie per analizzare il sito e migliorare la navigazione.{' '}
            <Link href="/privacy" className="underline hover:text-cta-blue">
              Privacy Policy
            </Link>
            {' · '}
            <Link href="/cookie" className="underline hover:text-cta-blue">
              Cookie Policy
            </Link>
            .{' '}
            <button
              type="button"
              className="underline hover:text-cta-blue"
              aria-expanded={detailsOpen}
              aria-controls={detailsId}
              onClick={() => setDetailsOpen((open) => !open)}
            >
              {detailsOpen ? 'Nascondi dettagli' : 'Dettagli'}
            </button>
          </p>

          <p
            id={detailsId}
            className={`mt-2 text-tiny leading-relaxed text-primary opacity-70 ${
              detailsOpen ? 'hidden md:block' : 'hidden'
            }`}
          >
            {FULL_COPY}
          </p>
        </div>

        <div className="flex flex-shrink-0 gap-3 md:w-full md:gap-2">
          <button
            type="button"
            className="btn-secondary px-5 md:h-10 md:flex-1 md:px-4 md:text-sm"
            onClick={() => choose('reject')}
          >
            Rifiuto
          </button>
          <button
            type="button"
            className="btn-primary px-5 md:h-10 md:flex-1 md:px-4"
            onClick={() => choose('accept')}
          >
            Accetto
          </button>
        </div>
      </div>
    </div>
  )
}
