'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  COOKIE_CONSENT_ACCEPT,
  COOKIE_CONSENT_REJECT,
  COOKIE_CONSENT_STORAGE_KEY,
  persistCookieConsent,
  type CookieConsentValue,
} from '@/lib/analytics'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
      setVisible(stored !== COOKIE_CONSENT_ACCEPT && stored !== COOKIE_CONSENT_REJECT)
    } catch {
      setVisible(true)
    }
  }, [])

  const choose = (value: CookieConsentValue) => {
    persistCookieConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-border bg-white"
      role="dialog"
      aria-label="Consenso cookie"
    >
      <div className="container-lg padding-global py-5 flex items-center justify-between gap-6 md:flex-col md:items-start">
        <p className="text-sm text-primary opacity-80 leading-relaxed max-w-3xl">
          Facendo clic su &quot;Accetto&quot;, consenti l&apos;uso dei cookie sul tuo dispositivo per
          migliorare la tua esperienza di navigazione, analizzare l&apos;utilizzo del sito e supportare
          la nostra iniziativa. Consulta la nostra{' '}
          <Link href="/privacy" className="underline hover:text-cta-blue">
            Privacy Policy
          </Link>{' '}
          e la{' '}
          <Link href="/cookie" className="underline hover:text-cta-blue">
            Cookie Policy
          </Link>{' '}
          per ulteriori dettagli.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button type="button" className="btn-secondary px-5" onClick={() => choose('reject')}>
            Rifiuto
          </button>
          <button type="button" className="btn-primary px-5" onClick={() => choose('accept')}>
            Accetto
          </button>
        </div>
      </div>
    </div>
  )
}
