'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'

type Props = {
  href: string
  className?: string
  children: ReactNode
}

export function CourseCtaLink({ href, className, children }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.courseCtaClick, { link_url: href })
      }}
    >
      {children}
    </Link>
  )
}
