import { NextResponse } from 'next/server'
import { getArticles } from '@/lib/content'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 12
  const category = searchParams.get('category') ?? undefined

  const result = await getArticles({ page, limit, category })
  return NextResponse.json(result)
}
