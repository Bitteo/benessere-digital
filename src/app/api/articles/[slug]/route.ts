import { NextResponse } from 'next/server'
import { getArticleBySlug } from '@/lib/content'

type Props = {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(article)
}
