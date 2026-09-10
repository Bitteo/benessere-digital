'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Articoli', href: '/articoli' },
  { label: 'Categorie', href: '/categorie' },
  { label: 'Chi siamo', href: '/chi-siamo' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] bg-white border-b border-border"
      aria-label="Navigazione principale"
    >
      <div className="container-nav padding-global">
        <div className="flex items-center justify-between h-[4.5rem] md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="benessere.digital — homepage">
            <Image
              src="/images/b.d-logo.svg"
              alt=""
              width={43}
              height={24}
              priority
              className="h-6 w-auto hidden sm:block"
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
                className="px-4 py-3 text-base font-semibold text-primary hover:text-cta-blue transition-colors duration-100"
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
            className="hidden lg:flex flex-col justify-center items-center w-11 h-11 gap-1.5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            <span
              className={`block w-6 h-0.5 bg-primary transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="hidden lg:block bg-surface-subtle border-t border-border">
          <div className="padding-global py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-4 text-base font-semibold text-nav-link hover:text-cta-blue hover:bg-surface-hover rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2">
              <Link
                href="/newsletter"
                className="btn-cta w-full text-center py-3 text-base"
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
