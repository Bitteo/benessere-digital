import type { ReactNode } from 'react'

type Props = {
  kicker?: string
  title: string
  children: ReactNode
}

export function SimplePage({ kicker, title, children }: Props) {
  return (
    <main>
      <article className="container-md padding-global section-md">
        {kicker && <p className="text-meta text-primary opacity-50 mb-3">{kicker}</p>}
        <h1
          className="text-h1 sm:text-h2 mb-8 leading-tight"
          style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}
        >
          {title}
        </h1>
        <div className="flex flex-col gap-5 text-base text-primary opacity-80 leading-relaxed max-w-2xl">
          {children}
        </div>
      </article>
    </main>
  )
}
