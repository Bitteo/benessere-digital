'use client'

import { useEffect, useId, useState } from 'react'

type Props = {
  layout?: 'inline' | 'stacked'
  placeholder?: string
}

export function NewsletterForm({
  layout = 'stacked',
  placeholder = 'La tua email',
}: Props) {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'checking' | 'disabled' | 'idle' | 'loading' | 'success' | 'error'>('checking')
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

    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setStatus(res.status === 503 ? 'disabled' : 'error')
        setMessage(data.error || 'Qualcosa è andato storto. Riprova.')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Qualcosa è andato storto. Riprova.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="px-4 py-3 rounded-md text-sm font-semibold"
        style={{ backgroundColor: '#cef5ca', color: '#114e0b' }}
        role="status"
      >
        Iscrizione confermata! Controlla la tua email.
      </div>
    )
  }

  const disabled = status === 'disabled' || status === 'checking' || status === 'loading'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${layout === 'inline' ? 'flex-col sm:flex-col md:flex-row gap-3 md:gap-2' : 'flex-col gap-3'} w-full`}
      aria-label="Iscriviti alla newsletter"
    >
      <div className={layout === 'inline' ? 'flex-1' : 'w-full'}>
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
          className="w-full px-4 py-2.5 border-[1.5px] border-border rounded-md text-lg text-primary
            placeholder:text-placeholder placeholder:text-base
            focus:outline-none focus:border-placeholder
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ fontSize: '1.125rem' }}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="btn-primary-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Invio…' : 'Iscriviti'}
      </button>

      {status === 'disabled' && (
        <p className="text-sm text-primary opacity-70" role="status">
          Iscrizioni temporaneamente non disponibili. Torna a trovarci a breve.
        </p>
      )}

      {status === 'error' && (
        <p
          className="text-sm px-3 py-2 rounded"
          style={{ backgroundColor: '#f8e4e4', color: '#3b0b0b' }}
          role="alert"
        >
          {message || 'Qualcosa è andato storto. Riprova.'}
        </p>
      )}
    </form>
  )
}
