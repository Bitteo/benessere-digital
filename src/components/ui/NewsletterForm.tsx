'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'

type Props = {
  layout?: 'inline' | 'stacked'
  placeholder?: string
  /** Banner su fondo scuro: il testo della notice deve restare leggibile. */
  tone?: 'default' | 'onDark'
}

export function NewsletterForm({
  layout = 'stacked',
  placeholder = 'La tua email',
  tone = 'default',
}: Props) {
  const inputId = useId()
  const consentId = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<
    'checking' | 'disabled' | 'idle' | 'loading' | 'success' | 'error'
  >('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data: { enabled?: boolean }) => {
        if (cancelled) return
        setStatus(data.enabled ? 'idle' : 'disabled')
      })
      .catch(() => {
        if (!cancelled) setStatus('disabled')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'disabled' || status === 'checking') return
    if (!consent) {
      setStatus('error')
      setMessage('Per iscriverti conferma di voler ricevere la newsletter.')
      return
    }

    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setStatus(res.status === 503 ? 'disabled' : 'error')
        setMessage(data.error || 'Qualcosa è andato storto. Riprova.')
        return
      }

      setStatus('success')
      setEmail('')
      setConsent(false)
      trackEvent(ANALYTICS_EVENTS.newsletterSubmit)
    } catch {
      setStatus('error')
      setMessage('Qualcosa è andato storto. Riprova.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-md px-4 py-3 text-sm font-semibold"
        style={{ backgroundColor: '#cef5ca', color: '#114e0b' }}
        role="status"
      >
        Quasi fatto! Controlla la tua email per confermare l&apos;iscrizione.
      </div>
    )
  }

  const disabled = status === 'disabled' || status === 'checking' || status === 'loading'
  const noticeClass =
    tone === 'onDark'
      ? 'text-sm leading-snug text-white/80'
      : 'text-sm leading-snug text-primary/80'
  const linkClass =
    tone === 'onDark'
      ? 'underline decoration-white/60 underline-offset-2 hover:text-white'
      : 'underline decoration-primary/40 underline-offset-2 hover:text-cta-blue'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-wrap ${layout === 'inline' ? 'flex-col gap-3 md:flex-row md:gap-2 sm:flex-col' : 'flex-col gap-3'}`}
      aria-label="Iscriviti alla newsletter"
    >
      <div className={layout === 'inline' ? 'min-w-0 flex-1' : 'w-full'}>
        <label htmlFor={inputId} className="sr-only">
          Indirizzo email
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={disabled}
          className="w-full rounded-md border-[1.5px] border-border px-4 py-2.5 text-lg text-primary transition-colors placeholder:text-base placeholder:text-placeholder focus:border-placeholder focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontSize: '1.125rem' }}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="btn-primary-lg flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'loading' ? 'Invio…' : 'Iscriviti'}
      </button>

      <div className="flex w-full basis-full items-start gap-2">
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          aria-required="true"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          disabled={disabled}
          className={`mt-0.5 h-4 w-4 shrink-0 ${tone === 'onDark' ? 'accent-white' : 'accent-primary'}`}
        />
        <p className={noticeClass}>
          <label htmlFor={consentId}>
            Iscrivendoti accetti di ricevere la newsletter di benessere.digital. Puoi disiscriverti
            in ogni momento.
          </label>{' '}
          <Link href="/privacy" className={linkClass}>
            Leggi l&apos;informativa privacy.
          </Link>
        </p>
      </div>

      {status === 'disabled' && (
        <p
          className={`w-full basis-full text-sm ${tone === 'onDark' ? 'text-white/80' : 'text-primary opacity-70'}`}
          role="status"
        >
          Iscrizioni temporaneamente non disponibili. Torna a trovarci a breve.
        </p>
      )}

      {status === 'error' && (
        <p
          className="w-full basis-full rounded px-3 py-2 text-sm"
          style={{ backgroundColor: '#f8e4e4', color: '#3b0b0b' }}
          role="alert"
        >
          {message || 'Qualcosa è andato storto. Riprova.'}
        </p>
      )}
    </form>
  )
}
