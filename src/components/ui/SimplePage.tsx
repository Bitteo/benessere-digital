import type { ReactNode } from 'react'

type Props = {
  kicker?: string
  title: string
  children: ReactNode
}

export function SimplePage({ title, children }: Props) {
  return (
    <main>
      <article className="container-md padding-global section-md">
        <h1 className="mb-8 text-h2 leading-tight sm:text-h3">{title}</h1>
        <div className="flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-primary">
          {children}
        </div>
      </article>
    </main>
  )
}
