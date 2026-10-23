import type { ReactNode } from 'react'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  format?: number
  url?: string
  children?: LexicalNode[]
}

type Props = {
  content: unknown
}

const BOLD = 1
const ITALIC = 2
const STRIKETHROUGH = 4
const UNDERLINE = 8
const CODE = 16

function formatText(text: string, format = 0): ReactNode {
  let node: ReactNode = text
  if (format & CODE) node = <code>{node}</code>
  if (format & BOLD) node = <strong>{node}</strong>
  if (format & ITALIC) node = <em>{node}</em>
  if (format & UNDERLINE) node = <u>{node}</u>
  if (format & STRIKETHROUGH) node = <s>{node}</s>
  return node
}

function renderChildren(children: LexicalNode[] | undefined): ReactNode {
  if (!children?.length) return null
  return children.map((child, index) => renderNode(child, index))
}

function renderNode(node: LexicalNode, key: number): ReactNode {
  switch (node.type) {
    case 'text':
      return <span key={key}>{formatText(node.text ?? '', node.format)}</span>
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const tag = node.tag
      if (tag === 'h1') return <h1 key={key}>{renderChildren(node.children)}</h1>
      if (tag === 'h3') return <h3 key={key}>{renderChildren(node.children)}</h3>
      if (tag === 'h4') return <h4 key={key}>{renderChildren(node.children)}</h4>
      return <h2 key={key}>{renderChildren(node.children)}</h2>
    }
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'list': {
      const ListTag = node.tag === 'ol' || node.tag === 'number' ? 'ol' : 'ul'
      return <ListTag key={key}>{renderChildren(node.children)}</ListTag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>
    case 'link':
      return (
        <a key={key} href={node.url} target="_blank" rel="noopener noreferrer">
          {renderChildren(node.children)}
        </a>
      )
    case 'autolink':
      return (
        <a key={key} href={node.url} target="_blank" rel="noopener noreferrer">
          {renderChildren(node.children)}
        </a>
      )
    default:
      if (node.children?.length) {
        return <div key={key}>{renderChildren(node.children)}</div>
      }
      return null
  }
}

export function LexicalContent({ content }: Props) {
  const root =
    content && typeof content === 'object' && 'root' in content
      ? (content as { root?: LexicalNode }).root
      : null

  if (!root?.children?.length) {
    return <p className="text-primary opacity-50 italic">Contenuto in fase di pubblicazione…</p>
  }

  return <>{renderChildren(root.children)}</>
}
