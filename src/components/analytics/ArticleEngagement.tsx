'use client'

import { useEffect } from 'react'
import {
  ANALYTICS_EVENTS,
  COOKIE_CONSENT_CHANGE_EVENT,
  hasAnalyticsConsent,
  trackEvent,
} from '@/lib/analytics'

const SCROLL_THRESHOLD = 0.9
const DWELL_MS = 60_000

/** Fires `article_engaged` once per page view at ~90% scroll or ~60s dwell. */
export function ArticleEngagement() {
  useEffect(() => {
    let fired = false
    let reached = false

    const tryFire = () => {
      if (fired || !reached) return
      if (!hasAnalyticsConsent()) return
      fired = true
      trackEvent(ANALYTICS_EVENTS.articleEngaged)
      cleanup()
    }

    const markReached = () => {
      reached = true
      tryFire()
    }

    const onScroll = () => {
      const root = document.documentElement
      const scrollable = root.scrollHeight - root.clientHeight
      const progress = scrollable <= 0 ? 1 : root.scrollTop / scrollable
      if (progress >= SCROLL_THRESHOLD) markReached()
    }

    const timer = window.setTimeout(markReached, DWELL_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, tryFire)
    onScroll()

    function cleanup() {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, tryFire)
    }

    return cleanup
  }, [])

  return null
}
