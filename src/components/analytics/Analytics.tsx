'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  flushQueuedAnalyticsEvents,
  getGaMeasurementId,
  hasAnalyticsConsent,
} from '@/lib/analytics'

/**
 * Loads GA4 only after cookie consent (`benessere-cookie-consent` = accept).
 * Initial render stays empty so SSR HTML is unchanged.
 */
export function Analytics() {
  const [allowed, setAllowed] = useState(false)
  const gaId = getGaMeasurementId()

  useEffect(() => {
    const sync = () => setAllowed(hasAnalyticsConsent())
    sync()
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, sync)
  }, [])

  if (!allowed || !gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive" onReady={flushQueuedAnalyticsEvents}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
