export const COOKIE_CONSENT_STORAGE_KEY = 'benessere-cookie-consent'
export const COOKIE_CONSENT_ACCEPT = 'accept'
export const COOKIE_CONSENT_REJECT = 'reject'
export const COOKIE_CONSENT_CHANGE_EVENT = 'benessere-cookie-consent-change'

/** Production GA4 stream (www.benessere.digital). Override with NEXT_PUBLIC_GA_MEASUREMENT_ID. */
export const DEFAULT_GA_MEASUREMENT_ID = 'G-SF9NZWHZFZ'

export const ANALYTICS_EVENTS = {
  courseCtaClick: 'course_cta_click',
  newsletterSubmit: 'newsletter_submit',
  articleEngaged: 'article_engaged',
} as const

export type CookieConsentValue = typeof COOKIE_CONSENT_ACCEPT | typeof COOKIE_CONSENT_REJECT

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i

export function getGaMeasurementId(): string {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID
  return GA_ID_PATTERN.test(raw) ? raw : DEFAULT_GA_MEASUREMENT_ID
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === COOKIE_CONSENT_ACCEPT
  } catch {
    return false
  }
}

export function persistCookieConsent(value: CookieConsentValue) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value)
  } catch {
    // private mode / blocked storage
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: value }))
}

const pendingEvents: Array<{ name: string; params?: Record<string, unknown> }> = []

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
    return
  }
  pendingEvents.push({ name, params })
}

export function flushQueuedAnalyticsEvents() {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  while (pendingEvents.length > 0) {
    const event = pendingEvents.shift()
    if (!event) break
    window.gtag('event', event.name, event.params)
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
