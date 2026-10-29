export type LexicalLikeNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalLikeNode[]
}

export function lexicalPlainText(node: LexicalLikeNode): string {
  const parts: string[] = []
  if (typeof node.text === 'string') parts.push(node.text)
  for (const child of node.children ?? []) parts.push(lexicalPlainText(child))
  return parts.join('')
}

function headingLevel(node: LexicalLikeNode): number | null {
  if (node.type !== 'heading') return null
  const match = /^h([1-6])$/.exec(node.tag ?? '')
  return match ? Number(match[1]) : 2
}

/**
 * Removes one heading and the blocks that belong to it, up to the next heading
 * of the same or higher level. Content after that heading stays.
 */
export function omitHeadingSection<T extends LexicalLikeNode>(
  children: T[],
  headingText: string,
): T[] {
  const start = children.findIndex(
    (node) => node.type === 'heading' && lexicalPlainText(node).trim() === headingText,
  )
  if (start < 0) return children

  const level = headingLevel(children[start]) ?? 2
  let end = children.length
  for (let index = start + 1; index < children.length; index++) {
    const nextLevel = headingLevel(children[index])
    if (nextLevel !== null && nextLevel <= level) {
      end = index
      break
    }
  }

  return children.slice(0, start).concat(children.slice(end))
}
