import type { ReactNode } from 'react'

type Props = {
  title: ReactNode
  lede: string
  children: ReactNode
}

export function HubFrame({ title, lede, children }: Props) {
  return (
    <main>
      <div className="container-nav padding-global section-md">
        <h1 className="mb-4 max-w-3xl text-h2 leading-tight sm:text-h3">{title}</h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
        {children}
      </div>
    </main>
  )
}
