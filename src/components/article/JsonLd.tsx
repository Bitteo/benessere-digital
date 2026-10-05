type Props = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/** Server component: emits one or more JSON-LD script tags. */
export function JsonLd({ data }: Props) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}
