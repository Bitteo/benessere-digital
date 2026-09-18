'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Articoli', href: '/articoli' },
  { label: 'Categorie', href: '/categorie' },
  { label: 'Chi siamo', href: '/chi-siamo' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 border-b border-border bg-white ${mobileOpen ? 'z-[1002]' : 'z-[999]'}`}
      aria-label="Navigazione principale"
    >
      <div className="container-nav padding-global">
        <div className="flex h-[4.5rem] items-center justify-between md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-2"
            aria-label="benessere.digital — homepage"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/b.d-logo.svg"
              alt=""
              width={43}
              height={24}
              priority
              className="hidden h-6 w-auto sm:block"
            />
            <Image
              src="/images/benessere.digital.svg"
              alt="benessere.digital"
              width={210}
              height={25}
              priority
              className="h-6 w-auto sm:hidden"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="flex items-center gap-1 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-base font-semibold text-primary transition-colors duration-100 hover:text-cta-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/newsletter" className="btn-cta px-4 py-2 text-base">
              Newsletter
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hidden h-11 w-11 flex-col items-center justify-center gap-1.5 lg:flex"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            <span
              className={`block h-0.5 w-6 bg-primary transition-transform duration-200 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary transition-transform duration-200 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Full-viewport mobile drawer — covers page + cookie bar */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[1002] hidden flex-col overflow-y-auto overscroll-contain bg-white lg:flex md:top-16"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          <div className="padding-global flex flex-1 flex-col gap-1 bg-white py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded px-4 py-4 text-lg font-semibold text-nav-link transition-colors hover:bg-surface-hover hover:text-cta-blue"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-border pt-5">
              <Link
                href="/newsletter"
                className="btn-cta w-full py-3 text-center text-base"
                onClick={() => setMobileOpen(false)}
              >
                Newsletter
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
