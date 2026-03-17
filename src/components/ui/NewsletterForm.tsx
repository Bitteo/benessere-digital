'use client'

import { useState } from 'react'

type Props = {
  layout?: 'inline' | 'stacked'
  placeholder?: string
}

export function NewsletterForm({
  layout = 'stacked',
  placeholder = 'La tua email',
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      // TODO: wire up to newsletter provider (Mailchimp / Brevo / ConvertKit)
      await new Promise((r) => setTimeout(r, 600))
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
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

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${layout === 'inline' ? 'flex-row gap-2' : 'flex-col gap-3'} w-full`}
      aria-label="Iscriviti alla newsletter"
    >
      <div className={layout === 'inline' ? 'flex-1' : 'w-full'}>
        <label htmlFor="newsletter-email" className="sr-only">
          Indirizzo email
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === 'loading'}
          className="w-full px-4 py-2.5 border-[1.5px] border-border rounded-md text-lg text-primary
            placeholder:text-placeholder placeholder:text-base
            focus:outline-none focus:border-placeholder
            disabled:opacity-50 transition-colors"
          style={{ fontSize: '1.125rem' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary-lg flex-shrink-0 disabled:opacity-50"
      >
        {status === 'loading' ? 'Invio…' : 'Iscriviti'}
      </button>

      {status === 'error' && (
        <p
          className="text-sm px-3 py-2 rounded"
          style={{ backgroundColor: '#f8e4e4', color: '#3b0b0b' }}
          role="alert"
        >
          Qualcosa è andato storto. Riprova.
        </p>
      )}
    </form>
  )
}
